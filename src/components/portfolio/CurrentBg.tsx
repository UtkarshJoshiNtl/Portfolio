import { useAnimationFrame } from "framer-motion";
import { useRef } from "react";

export function CurrentBg() {
  const slotsRef = useRef<SVGRectElement[]>([]);

  useAnimationFrame((t) => {
    slotsRef.current.forEach((el, i) => {
      const occupied = Math.sin(t / 500 + i * 1.3) > 0.2;
      el.setAttribute("fill", occupied ? "oklch(0.7 0.12 145 / 0.5)" : "oklch(0.7 0.12 145 / 0.1)");
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
        <linearGradient id="curGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.7 0.12 145)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="oklch(0.7 0.12 145)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#curGrad)" rx="4" />
      {Array.from({ length: 15 }, (_, i) => (
        <rect
          key={i}
          ref={(el) => {
            if (el) slotsRef.current[i] = el;
          }}
          x={20 + (i % 5) * 80}
          y={40 + Math.floor(i / 5) * 80}
          width="50"
          height="30"
          rx="2"
          fill="oklch(0.7 0.12 145 / 0.15)"
          stroke="oklch(0.7 0.12 145 / 0.3)"
          strokeWidth="0.5"
        />
      ))}
    </svg>
  );
}
