export default function WireframeHorizon() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 1440 900"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="globeFade" x1="720" y1="640" x2="1440" y2="900" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="var(--horizon-neutral)" stopOpacity="0.32" />
          <stop offset="40%"  stopColor="#D9FF38"                stopOpacity="0.25" />
          <stop offset="100%" stopColor="var(--horizon-neutral)" stopOpacity="0.03" />
        </linearGradient>

        <linearGradient id="orbitGrad" x1="500" y1="900" x2="1400" y2="400" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="var(--horizon-neutral)" stopOpacity="0.05" />
          <stop offset="45%"  stopColor="var(--horizon-neutral)" stopOpacity="0.25" />
          <stop offset="70%"  stopColor="#D9FF38"                stopOpacity="0.85" />
          <stop offset="100%" stopColor="var(--horizon-neutral)" stopOpacity="0.08" />
        </linearGradient>

        <linearGradient id="subOrbitGrad" x1="400" y1="900" x2="1440" y2="280" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="var(--horizon-neutral)" stopOpacity="0.03" />
          <stop offset="60%"  stopColor="var(--horizon-neutral)" stopOpacity="0.12" />
          <stop offset="100%" stopColor="var(--horizon-neutral)" stopOpacity="0.02" />
        </linearGradient>
      </defs>

      {/* Globe wireframe — .wf-globe-stroke applies stroke: var(--horizon-neutral) via CSS */}
      <g className="wf-globe-stroke" opacity="0.45" stroke="url(#globeFade)" strokeWidth="0.8">
        <ellipse cx="1060" cy="1040" rx="720" ry="380" stroke="var(--horizon-neutral)" strokeOpacity="0.4" strokeWidth="1.2" />
        <ellipse cx="1060" cy="1005" rx="685" ry="345" strokeDasharray="2 3" opacity="0.6" />
        <ellipse cx="1060" cy="970"  rx="645" ry="310" strokeDasharray="1 3" opacity="0.75" />
        <ellipse cx="1060" cy="935"  rx="600" ry="275" opacity="0.5" />
        <ellipse cx="1060" cy="900"  rx="545" ry="238" strokeDasharray="2 4" opacity="0.6" />
        <ellipse cx="1060" cy="865"  rx="480" ry="200" opacity="0.4" />
        <ellipse cx="1060" cy="830"  rx="410" ry="160" strokeDasharray="1 3" opacity="0.4" />
        <ellipse cx="1060" cy="795"  rx="330" ry="120" opacity="0.3" />
        <ellipse cx="1060" cy="760"  rx="240" ry="80"  opacity="0.2" />
        <path d="M 340,1040 C 340,820 700,700 1060,700 C 1420,700 1780,820 1780,1040" strokeDasharray="3 4" opacity="0.4" />
        <path d="M 460,1040 C 460,800 760,680 1060,680 C 1360,680 1660,800 1660,1040" opacity="0.5" />
        <path d="M 600,1040 C 600,770 830,665 1060,665 C 1290,665 1520,770 1520,1040" strokeDasharray="2 3" opacity="0.45" />
        <path d="M 750,1040 C 750,750 900,660 1060,660 C 1220,660 1370,750 1370,1040" opacity="0.6" />
        <path d="M 900,1040 C 900,740 980,658 1060,658 C 1140,658 1220,740 1220,1040" strokeDasharray="1 3" opacity="0.4" />
        <line x1="1060" y1="657" x2="1060" y2="1040" opacity="0.7" />
      </g>

      {/* Accent dots — .wf-dots: lime in dark, olive in light (via CSS) */}
      <g className="wf-dots" opacity="0.75">
        <circle cx="890"  cy="725" r="1.2" />
        <circle cx="945"  cy="710" r="1.5" />
        <circle cx="1020" cy="695" r="1.2" />
        <circle cx="1100" cy="700" r="1.4" />
        <circle cx="1175" cy="720" r="1.2" />
        <circle cx="1250" cy="750" r="1.5" />
        <circle cx="1310" cy="780" r="1.3" />
        <circle cx="820"  cy="760" r="1.5" />
        <circle cx="750"  cy="805" r="1.2" />
        <circle cx="680"  cy="860" r="1.4" />
      </g>

      {/* Primary orbital sweep */}
      <path d="M 430,900 C 680,840 960,670 1380,310" stroke="url(#orbitGrad)" strokeWidth="1.6" />

      {/* Secondary orbital sweep */}
      <path d="M 310,900 C 610,870 940,780 1440,490" stroke="url(#subOrbitGrad)" strokeWidth="1" strokeDasharray="4 6" />

      {/* Waypoint node marker */}
      <g transform="translate(1156 494)">
        <circle cx="0" cy="0" r="18" className="wf-waypoint-halo" fillOpacity="0.12" />
        <circle cx="0" cy="0" r="9"  className="wf-waypoint-halo" fillOpacity="0.25" />
        <rect x="-4.5" y="-4.5" width="9" height="9" fill="#D9FF38" rx="1.5" className="waypoint-node" />
        <line x1="-12" y1="0"   x2="-7"  y2="0"  stroke="#D9FF38" strokeWidth="0.7" opacity="0.7" className="wf-waypoint-line" />
        <line x1="7"   y1="0"   x2="12"  y2="0"  stroke="#D9FF38" strokeWidth="0.7" opacity="0.7" className="wf-waypoint-line" />
        <line x1="0"   y1="-12" x2="0"   y2="-7" stroke="#D9FF38" strokeWidth="0.7" opacity="0.7" className="wf-waypoint-line" />
        <line x1="0"   y1="7"   x2="0"   y2="12" stroke="#D9FF38" strokeWidth="0.7" opacity="0.7" className="wf-waypoint-line" />
      </g>
    </svg>
  );
}