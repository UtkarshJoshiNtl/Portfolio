import { useRef } from "react";
import { useAnimationFrame } from "framer-motion";

type Commit = {
  x: number;
  y: number;
  r: number;
  parent: number | null;
  branch: number;
};

const COMMITS: Commit[] = [
  { x: 30, y: 160, r: 4, parent: null, branch: 0 },
  { x: 70, y: 130, r: 3.5, parent: 0, branch: 0 },
  { x: 110, y: 100, r: 3.5, parent: 1, branch: 0 },
  { x: 110, y: 170, r: 3, parent: 1, branch: 1 },
  { x: 150, y: 80, r: 3, parent: 2, branch: 0 },
  { x: 150, y: 200, r: 3, parent: 3, branch: 1 },
  { x: 190, y: 60, r: 3, parent: 4, branch: 0 },
  { x: 190, y: 220, r: 2.5, parent: 5, branch: 1 },
  { x: 230, y: 110, r: 2.5, parent: 6, branch: 0 },
  { x: 230, y: 180, r: 2.5, parent: 7, branch: 1 },
  { x: 270, y: 140, r: 3, parent: 9, branch: 1 },
  { x: 310, y: 170, r: 2.5, parent: 10, branch: 1 },
  { x: 350, y: 150, r: 2, parent: 11, branch: 1 },
  { x: 370, y: 120, r: 2.5, parent: 8, branch: 0 },
];

export function CJitBg() {
  const cursorRef = useRef<SVGRectElement>(null);

  useAnimationFrame((t) => {
    const blink = Math.sin(t / 300) > 0;
    if (cursorRef.current) {
      cursorRef.current.style.opacity = blink ? "1" : "0";
    }
  });

  return (
    <svg
      className="absolute inset-0 h-full w-full opacity-20"
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        <linearGradient id="cjGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="oklch(0.55 0.15 260)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="oklch(0.55 0.15 260)" stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect width="400" height="300" fill="url(#cjGrad)" rx="4" />

      {/* Branch lines */}
      {COMMITS.map((c, i) => {
        if (c.parent === null) return null;
        const p = COMMITS[c.parent];
        return (
          <line
            key={`edge-${i}`}
            x1={p.x}
            y1={p.y}
            x2={c.x}
            y2={c.y}
            stroke={c.branch === 0 ? "oklch(0.55 0.15 260 / 0.6)" : "oklch(0.65 0.1 280 / 0.4)"}
            strokeWidth="1"
          />
        );
      })}

      {/* Commits */}
      {COMMITS.map((c, i) => (
        <circle
          key={`commit-${i}`}
          cx={c.x}
          cy={c.y}
          r={c.r}
          fill={i === COMMITS.length - 1 ? "oklch(0.55 0.15 260)" : "oklch(0.45 0.1 260 / 0.6)"}
          stroke="oklch(0.55 0.15 260 / 0.3)"
          strokeWidth="0.5"
        />
      ))}

      {/* HEAD label */}
      <text
        x={COMMITS[COMMITS.length - 2].x + 8}
        y={COMMITS[COMMITS.length - 2].y + 3}
        fontFamily="monospace"
        fontSize="7"
        fill="oklch(0.55 0.15 260 / 0.7)"
      >
        HEAD
      </text>

      {/* Blinking cursor on tip */}
      <rect
        ref={cursorRef}
        x={COMMITS[COMMITS.length - 1].x + 6}
        y={COMMITS[COMMITS.length - 1].y - 3}
        width="4"
        height="8"
        fill="oklch(0.55 0.15 260)"
      />
    </svg>
  );
}
