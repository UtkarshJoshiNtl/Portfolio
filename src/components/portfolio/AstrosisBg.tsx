import { useRef } from "react";
import { useAnimationFrame } from "framer-motion";

function keplerianPosition(
  a: number,
  b: number,
  cx: number,
  cy: number,
  e: number,
  time: number,
  speed: number,
) {
  const M = time * speed;
  let E = M;
  for (let i = 0; i < 8; i++) E = M + e * Math.sin(E);
  const x = cx + a * (Math.cos(E) - e);
  const y = cy + b * Math.sin(E);
  return { x, y };
}

type Orbit = {
  a: number;
  b: number;
  e: number;
  cx: number;
  cy: number;
  speed: number;
  color: string;
  r: number;
  offset?: number;
};

const ORBITS: Orbit[] = [
  { a: 170, b: 60, e: 0.4, cx: 200, cy: 150, speed: 0.5, color: "oklch(0.78 0.16 75)", r: 2.5 },
  { a: 140, b: 90, e: 0.25, cx: 200, cy: 150, speed: 0.35, color: "oklch(0.9 0 0)", r: 2 },
  { a: 100, b: 40, e: 0.6, cx: 200, cy: 150, speed: 0.7, color: "oklch(0.78 0.16 75)", r: 2 },
  {
    a: 170,
    b: 60,
    e: 0.4,
    cx: 200,
    cy: 150,
    speed: 0.45,
    color: "oklch(0.9 0 0)",
    r: 1.5,
    offset: 2,
  },
];

export function AstrosisBg() {
  const timeRef = useRef(0);

  useAnimationFrame((t) => {
    timeRef.current = t / 1000;
    const dots = document.querySelectorAll<SVGCircleElement>(".orbital-dot");
    ORBITS.forEach((orb, i) => {
      const pos = keplerianPosition(
        orb.a,
        orb.b,
        orb.cx,
        orb.cy,
        orb.e,
        timeRef.current + (orb.offset ?? 0),
        orb.speed,
      );
      if (dots[i]) dots[i].setAttribute("cx", String(pos.x));
      if (dots[i]) dots[i].setAttribute("cy", String(pos.y));
    });
  });

  return (
    <svg
      className="absolute inset-0 h-full w-full opacity-85"
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <g fill="none" stroke="oklch(0.35 0 0)" strokeWidth="0.5">
        <ellipse cx="200" cy="150" rx="170" ry="60" />
        <ellipse cx="200" cy="150" rx="140" ry="90" />
        <ellipse cx="200" cy="150" rx="100" ry="40" />
      </g>
      {ORBITS.map((orb, i) => (
        <circle key={i} className="orbital-dot" r={orb.r} fill={orb.color} />
      ))}
    </svg>
  );
}
