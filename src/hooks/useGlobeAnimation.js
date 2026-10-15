import { useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import * as THREE from 'three';
import gsap from 'gsap';

const VIEW_WIDTH = 1440;
const VIEW_HEIGHT = 900;
const CENTER_X = 1060;
const CENTER_Y = 1370;
const RADIUS = 720;

function makeLineMaterial(color, opacity) {
  return new THREE.ShaderMaterial({
    transparent: true,
    depthTest: true,
    depthWrite: false,
    uniforms: {
      uLineColor: { value: color.clone() },
      uOpacity: { value: opacity },
      uReveal: { value: 1 },
    },
    vertexShader: `
      attribute float aReveal;
      varying float vFacing;
      varying float vReveal;
      void main() {
        vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
        vFacing = (modelViewMatrix * vec4(position, 0.0)).z;
        vReveal = aReveal;
        gl_Position = projectionMatrix * viewPosition;
      }
    `,
    fragmentShader: `
      uniform vec3 uLineColor;
      uniform float uOpacity;
      uniform float uReveal;
      varying float vFacing;
      varying float vReveal;
      void main() {
        float lineReveal = smoothstep(vReveal - 0.035, vReveal + 0.035, uReveal);
        float facing = smoothstep(-180.0, 180.0, vFacing);
        float depthOpacity = mix(0.035, 0.68, facing);
        gl_FragColor = vec4(uLineColor, uOpacity * depthOpacity * lineReveal);
      }
    `,
  });
}

function buildWireGeometry(radius) {
  const positions = [];
  const revealValues = [];
  const addPath = (points, reveal) => {
    for (let i = 0; i < points.length - 1; i += 1) {
      for (const point of [points[i], points[i + 1]]) {
        positions.push(point.x, point.y, point.z);
        revealValues.push(reveal);
      }
    }
  };

  const latitudeCount = 18;
  for (let ring = 0; ring < latitudeCount; ring += 1) {
    const theta = THREE.MathUtils.degToRad(10 + ring * 6.5);
    const points = [];
    for (let segment = 0; segment <= 96; segment += 1) {
      const phi = (segment / 96) * Math.PI * 2;
      points.push(new THREE.Vector3(
        radius * Math.sin(theta) * Math.cos(phi),
        radius * Math.cos(theta),
        radius * Math.sin(theta) * Math.sin(phi),
      ));
    }
    addPath(points, 0.12 + (ring / latitudeCount) * 0.64);
  }

  const meridianCount = 20;
  for (let meridian = 0; meridian < meridianCount; meridian += 1) {
    const longitude = (meridian / meridianCount) * Math.PI * 2;
    const points = [];
    for (let segment = 0; segment <= 96; segment += 1) {
      const theta = (segment / 96) * Math.PI;
      points.push(new THREE.Vector3(
        radius * Math.sin(theta) * Math.cos(longitude),
        radius * Math.cos(theta),
        radius * Math.sin(theta) * Math.sin(longitude),
      ));
    }
    addPath(points, 0.38 + (meridian / meridianCount) * 0.57);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('aReveal', new THREE.Float32BufferAttribute(revealValues, 1));
  return geometry;
}

function buildSurfacePoints(radius) {
  const positions = [];
  const samples = [
    [28, 12], [33, 42], [39, 75], [31, 106], [45, 137], [36, 165],
    [51, 195], [43, 224], [57, 252], [34, 282], [48, 311], [61, 335],
    [26, 350], [54, 93], [63, 151], [42, 266],
  ];
  for (const [thetaDegrees, longitudeDegrees] of samples) {
    const theta = THREE.MathUtils.degToRad(thetaDegrees);
    const longitude = THREE.MathUtils.degToRad(longitudeDegrees);
    positions.push(
      radius * Math.sin(theta) * Math.cos(longitude),
      radius * Math.cos(theta),
      radius * Math.sin(theta) * Math.sin(longitude),
    );
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  return geometry;
}

export function useGlobeAnimation(hostRef, haloRef, theme) {
  const sceneState = useRef(null);

  useGSAP(() => {
    const host = hostRef.current;
    if (!host) return undefined;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
    } catch {
      host.dataset.webgl = 'unavailable';
      return undefined;
    }

    host.dataset.webgl = 'ready';
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.domElement.setAttribute('aria-hidden', 'true');
    renderer.domElement.className = 'block h-full w-full';
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 5000);
    camera.position.set(0, 0, 2000);
    camera.lookAt(0, 0, 0);

    const globe = new THREE.Group();
    scene.add(globe);

    const lineElement = makeLineMaterial(new THREE.Color('#ffffff'), 0.25);
    const horizonElement = makeLineMaterial(new THREE.Color('#ffffff'), 0.32);
    lineElement.uniforms.uReveal.value = 0;
    horizonElement.uniforms.uReveal.value = 0;

    const wire = new THREE.LineSegments(buildWireGeometry(RADIUS), lineElement);
    globe.add(wire);

    const horizonPoints = [];
    const horizonTheta = THREE.MathUtils.degToRad(18);
    for (let i = 0; i <= 160; i += 1) {
      const phi = (i / 160) * Math.PI * 2;
      horizonPoints.push(new THREE.Vector3(
        RADIUS * Math.sin(horizonTheta) * Math.cos(phi),
        RADIUS * Math.cos(horizonTheta),
        RADIUS * Math.sin(horizonTheta) * Math.sin(phi),
      ));
    }
    const horizon = new THREE.Line(new THREE.BufferGeometry().setFromPoints(horizonPoints), horizonElement);
    globe.add(horizon);

    const limeColor = new THREE.Color('#d9ff38');
    const pointMaterial = new THREE.PointsMaterial({
      color: limeColor,
      size: 2.2,
      sizeAttenuation: false,
      transparent: true,
      opacity: 0,
      depthTest: true,
      depthWrite: false,
    });
    const points = new THREE.Points(buildSurfacePoints(RADIUS * 1.002), pointMaterial);
    globe.add(points);

    const syncColors = () => {
      const themeRoot = host.closest('[data-theme]') ?? host;
      const styles = getComputedStyle(themeRoot);
      const line = styles.getPropertyValue('--horizon-neutral').trim() || (theme === 'light' ? '#525c50' : '#ffffff');
      const accent = styles.getPropertyValue('--accent-text').trim() || '#d9ff38';
      const lineColor = new THREE.Color(line);
      lineElement.uniforms.uLineColor.value.copy(lineColor);
      horizonElement.uniforms.uLineColor.value.copy(lineColor);
      limeColor.set(accent);
      pointMaterial.color.copy(limeColor);
      const opacity = theme === 'light' ? 0.34 : 0.18;
      lineElement.uniforms.uOpacity.value = opacity;
      horizonElement.uniforms.uOpacity.value = theme === 'light' ? 0.38 : 0.22;
    };
    syncColors();

    const render = () => renderer.render(scene, camera);
    const resize = () => {
      const width = host.clientWidth;
      const height = host.clientHeight;
      if (!width || !height) return;

      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      renderer.setSize(width, height, false);
      camera.left = -width / 2;
      camera.right = width / 2;
      camera.top = height / 2;
      camera.bottom = -height / 2;
      camera.updateProjectionMatrix();

      const scale = Math.min(width / VIEW_WIDTH, height / VIEW_HEIGHT);
      const offsetX = (width - VIEW_WIDTH * scale) / 2;
      const offsetY = (height - VIEW_HEIGHT * scale) / 2;
      const sizeFactor = width <= 767 ? 0.72 : 1;
      globe.scale.setScalar(scale * sizeFactor);
      globe.position.set(
        offsetX + CENTER_X * scale - width / 2,
        height / 2 - offsetY - CENTER_Y * scale + (width <= 767 ? -32 : 0),
        0,
      );
      render();
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);

    let motionTimeline = null;
    let haloTween = null;
    let isVisible = true;
    let pageIsVisible = !document.hidden;
    const canAnimate = () => isVisible && pageIsVisible;
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (canAnimate()) {
        motionTimeline?.resume();
        haloTween?.resume();
        render();
      } else {
        motionTimeline?.pause();
        haloTween?.pause();
      }
    });
    visibilityObserver.observe(host);
    const onVisibilityChange = () => {
      pageIsVisible = !document.hidden;
      if (canAnimate()) {
        motionTimeline?.resume();
        haloTween?.resume();
        render();
      } else {
        motionTimeline?.pause();
        haloTween?.pause();
      }
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    const media = gsap.matchMedia();
    media.add({ reduced: '(prefers-reduced-motion: reduce)', motion: '(prefers-reduced-motion: no-preference)' }, (context) => {
      if (context.conditions?.reduced) {
        lineElement.uniforms.uReveal.value = 1;
        horizonElement.uniforms.uReveal.value = 1;
        pointMaterial.opacity = 0.75;
        render();
        return;
      }

      motionTimeline = gsap.timeline({ onUpdate: render });
      motionTimeline
        .to(horizonElement.uniforms.uReveal, { value: 1, duration: 0.55, ease: 'power1.out' })
        .to(lineElement.uniforms.uReveal, { value: 1, duration: 0.9, ease: 'power1.out' }, '-=0.2')
        .to(pointMaterial, { opacity: 0.75, duration: 0.4, ease: 'power1.out' }, '-=0.15')
        .to(globe.rotation, { y: Math.PI * 2, duration: 120, ease: 'none', repeat: -1 });

      if (haloRef.current) {
        haloTween = gsap.to(haloRef.current, {
          opacity: 0.65,
          scale: 1.1,
          transformOrigin: 'center center',
          duration: 2.5,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        });
      }
      if (!canAnimate()) {
        motionTimeline.pause();
        haloTween?.pause();
      }
    });

    sceneState.current = { pointMaterial, updateColors: syncColors };

    return () => {
      media.revert();
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
      globe.traverse((object) => {
        if (object instanceof THREE.Line || object instanceof THREE.LineSegments || object instanceof THREE.Points) {
          object.geometry.dispose();
          const material = object.material;
          if (Array.isArray(material)) material.forEach((item) => item.dispose());
          else material.dispose();
        }
      });
      renderer.dispose();
      renderer.domElement.remove();
      sceneState.current = null;
    };
  }, { scope: hostRef });

  useEffect(() => {
    sceneState.current?.updateColors();
  }, [theme]);
}
