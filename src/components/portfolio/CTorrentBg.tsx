import { useRef } from "react";
import { useAnimationFrame } from "framer-motion";

export function CTorrentBg() {
  const lineRef = useRef<SVGPathElement>(null);
  const tRef = useRef(0);

  useAnimationFrame((t) => {
    tRef.current = t / 1000;
    if (lineRef.current) {
      const phase = Math.sin(t / 400) * 10;
      lineRef.current.setAttribute("d", `M0,150 Q${100 + phase},120 ${200 - phase},150 T400,150`);
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
        <linearGradient id="ctGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="oklch(0.65 0.15 30)" stopOpacity="0" />
          <stop offset="50%" stopColor="oklch(0.65 0.15 30)" stopOpacity="0.4" />
          <stop offset="100%" stopColor="oklch(0.65 0.15 30)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        ref={lineRef}
        d="M0,150 Q100,120 200,150 T400,150"
        fill="none"
        stroke="url(#ctGrad)"
        strokeWidth="2"
      />
      {Array.from({ length: 8 }, (_, i) => (
        <circle
          key={i}
          cx={40 + i * 45}
          cy={140 + (i % 2 === 0 ? -20 : 20)}
          r="3"
          fill="oklch(0.65 0.15 30)"
          opacity={0.3 + i * 0.05}
        />
      ))}
    </svg>
  );
}
