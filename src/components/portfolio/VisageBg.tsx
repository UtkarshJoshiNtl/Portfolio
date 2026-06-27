import { useAnimationFrame } from "framer-motion";
import { useRef } from "react";

export function VisageBg() {
  const barRefs = useRef<SVGRectElement[]>([]);

  useAnimationFrame((t) => {
    barRefs.current.forEach((el, i) => {
      const h = 20 + Math.sin(t / 300 + i * 0.8) * 15 + 15;
      el.setAttribute("height", String(h));
      el.setAttribute("y", String(150 - h));
    });
  });

  return (
    <svg
      className="absolute inset-0 h-full w-full opacity-20"
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        <linearGradient id="visGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="oklch(0.6 0.15 300)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="oklch(0.6 0.15 300)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#visGrad)" rx="4" />
      {Array.from({ length: 20 }, (_, i) => (
        <rect
          key={i}
          ref={(el) => {
            if (el) barRefs.current[i] = el;
          }}
          x={15 + i * 18}
          y={80}
          width="8"
          height="40"
          rx="1"
          fill="oklch(0.6 0.15 300 / 0.5)"
          opacity={0.3 + (i % 5) * 0.1}
        />
      ))}
      {/* Grid lines */}
      {[50, 100, 150, 200, 250].map((y) => (
        <line
          key={`g${y}`}
          x1="0"
          y1={y}
          x2="400"
          y2={y}
          stroke="oklch(0.6 0.15 300 / 0.1)"
          strokeWidth="0.5"
        />
      ))}
    </svg>
  );
}
