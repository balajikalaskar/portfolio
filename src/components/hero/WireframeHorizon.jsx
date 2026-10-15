// Static wireframe globe. The axis is tilted away from the viewer and rolled toward
// the orbit's diagonal, so both poles sit off-screen and the grid wraps around the
// sphere instead of converging on a visible apex.
const DEG = Math.PI / 180;
const sphere = { x: 1200, y: 1450, radius: 840, tilt: -24 * DEG, roll: -30 * DEG };

const latitudes = [-24, -12, 0, 12, 24, 36, 48, 60, 72];
const meridians = [-90, -75, -60, -45, -30, -15, 0, 15, 30, 45, 60, 75, 90];

// Lines fade as they turn toward the limb; three bands keep the DOM small.
const DEPTH_BANDS = [0.28, 0.55];


function project(latitude, longitude) {
  const lat = latitude * DEG;
  const lon = longitude * DEG;
  const x = Math.cos(lat) * Math.sin(lon);
  const y = Math.sin(lat);
  const z = Math.cos(lat) * Math.cos(lon);

  const tiltedY = y * Math.cos(sphere.tilt) - z * Math.sin(sphere.tilt);
  const depth = y * Math.sin(sphere.tilt) + z * Math.cos(sphere.tilt);
  const rolledX = x * Math.cos(sphere.roll) - tiltedY * Math.sin(sphere.roll);
  const rolledY = x * Math.sin(sphere.roll) + tiltedY * Math.cos(sphere.roll);

  return { x: sphere.x + sphere.radius * rolledX, y: sphere.y - sphere.radius * rolledY, depth };
}

function band(depth) {
  return DEPTH_BANDS.filter((limit) => depth > limit).length;
}

const paths = ['', '', ''];

function trace(sample, steps) {
  let previous = sample(0);
  let previousBand = -1;

  for (let step = 1; step <= steps; step += 1) {
    const point = sample(step / steps);
    if (previous.depth >= 0 && point.depth >= 0) {
      const current = band((previous.depth + point.depth) / 2);
      if (current !== previousBand) paths[current] += `M${previous.x.toFixed(1)} ${previous.y.toFixed(1)}`;
      paths[current] += `L${point.x.toFixed(1)} ${point.y.toFixed(1)}`;
      previousBand = current;
    } else {
      previousBand = -1;
    }
    previous = point;
  }
}

latitudes.forEach((lat) => trace((progress) => project(lat, progress * 360 - 180), 240));
meridians.forEach((lon) => trace((progress) => project(progress * 180 - 90, lon), 180));

const surfacePoints = [
  [6, -38], [18, 22], [30, -8], [42, 40], [10, 58],
].map(([lat, lon]) => project(lat, lon));

const waypoint = { x: 1236, y: 548 };

export default function WireframeHorizon() {
  return (
    <svg
      className="wireframe-hero absolute inset-0 z-10 h-full w-full"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMaxYMax slice"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="orbit-stroke" x1="520" y1="900" x2="1440" y2="404" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="var(--horizon-neutral)" stopOpacity="0.04" />
          <stop offset="0.45" stopColor="var(--horizon-neutral)" stopOpacity="0.24" />
          <stop offset="0.78" stopColor="var(--accent-text)" stopOpacity="0.8" />
          <stop offset="1" stopColor="var(--accent-text)" stopOpacity="0.2" />
        </linearGradient>
      </defs>

      <circle className="globe-line globe-contour" cx={sphere.x} cy={sphere.y} r={sphere.radius} />
      <g className="globe-line">
        {paths.map((d, index) => (
          <path className={`globe-grid globe-depth-${index}`} d={d} key={index} />
        ))}
      </g>
      {surfacePoints.map(({ x, y }, index) => (
        <circle className="globe-point" cx={x.toFixed(1)} cy={y.toFixed(1)} r="2" key={index} />
      ))}

      <path
        className="orbit-path"
        d={`M 520 900 C 820 800 1090 640 ${waypoint.x} ${waypoint.y} S 1400 430 1440 404`}
        stroke="url(#orbit-stroke)"
      />
      <circle className="orbit-waypoint-halo" cx={waypoint.x} cy={waypoint.y} r="16" />
      <rect className="orbit-waypoint" x={waypoint.x - 5} y={waypoint.y - 5} width="10" height="10" rx="1.5" />
      <path
        className="orbit-tick"
        d={`M${waypoint.x - 18} ${waypoint.y}h8m20 0h8M${waypoint.x} ${waypoint.y - 18}v8m0 20v8`}
      />
    </svg>
  );
}
