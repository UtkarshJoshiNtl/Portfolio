export function AstrosisBg() {
  return (
    <svg
      className="absolute inset-0 h-full w-full opacity-70"
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        <ellipse id="orb1" cx="200" cy="150" rx="170" ry="60" />
        <ellipse id="orb2" cx="200" cy="150" rx="140" ry="90" />
        <ellipse id="orb3" cx="200" cy="150" rx="100" ry="40" />
      </defs>
      <g fill="none" stroke="oklch(0.35 0 0)" strokeWidth="0.5">
        <ellipse cx="200" cy="150" rx="170" ry="60" />
        <ellipse cx="200" cy="150" rx="140" ry="90" />
        <ellipse cx="200" cy="150" rx="100" ry="40" />
      </g>
      <circle r="2.5" fill="oklch(0.78 0.16 75)">
        <animateMotion dur="9s" repeatCount="indefinite">
          <mpath href="#orb1" />
        </animateMotion>
      </circle>
      <circle r="2" fill="oklch(0.9 0 0)">
        <animateMotion dur="14s" repeatCount="indefinite">
          <mpath href="#orb2" />
        </animateMotion>
      </circle>
      <circle r="2" fill="oklch(0.78 0.16 75)">
        <animateMotion dur="6s" repeatCount="indefinite">
          <mpath href="#orb3" />
        </animateMotion>
      </circle>
      <circle r="1.5" fill="oklch(0.9 0 0)">
        <animateMotion dur="11s" repeatCount="indefinite" begin="-3s">
          <mpath href="#orb1" />
        </animateMotion>
      </circle>
    </svg>
  );
}
