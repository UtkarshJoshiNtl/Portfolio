import { useAnimationFrame } from "framer-motion";
import { useRef } from "react";

export function JustLandedBg() {
  const terrainRef = useRef<SVGPathElement>(null);
  const tRef = useRef(0);

  useAnimationFrame((t) => {
    tRef.current = t / 1000;
    if (terrainRef.current) {
      const pts = Array.from({ length: 20 }, (_, i) => {
        const x = i * 21;
        const y = 200 + Math.sin(t / 600 + i * 0.7) * 20 + Math.sin(i * 1.2) * 15;
        return `${x},${y}`;
      }).join(" L ");
      terrainRef.current.setAttribute("d", `M0,300 L0,200 L${pts} L400,200 L400,300 Z`);
    }
  });

  return (
    <svg
      className="absolute inset-0 h-full w-full opacity-15"
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        <linearGradient id="jlGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.65 0.15 160)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="oklch(0.65 0.15 160)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#jlGrad)" rx="4" />
      {/* Wavy terrain */}
      <path
        ref={terrainRef}
        d="M0,300 L0,200 L400,200 L400,300 Z"
        fill="oklch(0.65 0.15 160 / 0.15)"
      />
      {/* Stars */}
      {Array.from({ length: 15 }, (_, i) => (
        <circle
          key={i}
          cx={20 + Math.random() * 360}
          cy={20 + Math.random() * 120}
          r="1"
          fill="oklch(0.65 0.15 160)"
          opacity={0.2 + Math.random() * 0.5}
        />
      ))}
    </svg>
  );
}
