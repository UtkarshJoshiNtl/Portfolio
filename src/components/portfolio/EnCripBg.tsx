import { useRef } from "react";
import { useAnimationFrame } from "framer-motion";

type Node_ = {
  cx: number;
  cy: number;
  r: number;
};

type Packet = {
  from: number;
  to: number;
  progress: number;
  speed: number;
};

const NODES: Node_[] = [
  { cx: 60, cy: 80, r: 16 },
  { cx: 340, cy: 80, r: 16 },
  { cx: 60, cy: 220, r: 16 },
  { cx: 340, cy: 220, r: 16 },
  { cx: 200, cy: 150, r: 20 },
];

const CONNECTIONS = [
  [0, 4],
  [1, 4],
  [2, 4],
  [3, 4],
  [0, 1],
  [2, 3],
];

function initPackets(): Packet[] {
  return CONNECTIONS.map(([from, to], i) => ({
    from,
    to,
    progress: (i / CONNECTIONS.length) * 0.8,
    speed: 0.2 + Math.random() * 0.15,
  }));
}

export function EnCripBg() {
  const packetsRef = useRef(initPackets());
  const dotsRef = useRef<SVGCircleElement[]>([]);

  useAnimationFrame((t) => {
    const packets = packetsRef.current;
    for (let i = 0; i < packets.length; i++) {
      const p = packets[i];
      p.progress += p.speed * 0.008;
      if (p.progress > 1) p.progress = 0;

      const from = NODES[p.from];
      const to = NODES[p.to];
      const x = from.cx + (to.cx - from.cx) * p.progress;
      const y = from.cy + (to.cy - from.cy) * p.progress;
      const el = dotsRef.current[i];
      if (el) {
        el.setAttribute("cx", String(x));
        el.setAttribute("cy", String(y));
      }
    }
  });

  return (
    <svg
      className="absolute inset-0 h-full w-full opacity-25"
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        <radialGradient id="encGrad">
          <stop offset="0%" stopColor="oklch(0.65 0.2 345 / 0.15)" />
          <stop offset="100%" stopColor="oklch(0.65 0.2 345 / 0)" />
        </radialGradient>
      </defs>

      <rect width="400" height="300" fill="url(#encGrad)" rx="4" />

      {/* Connection lines */}
      {CONNECTIONS.map(([from, to], i) => (
        <line
          key={`conn-${i}`}
          x1={NODES[from].cx}
          y1={NODES[from].cy}
          x2={NODES[to].cx}
          y2={NODES[to].cy}
          stroke="oklch(0.65 0.2 345 / 0.3)"
          strokeWidth="0.8"
          strokeDasharray="3 3"
        />
      ))}

      {/* Data packets */}
      {CONNECTIONS.map((_, i) => (
        <circle
          key={`packet-${i}`}
          ref={(el) => {
            if (el) dotsRef.current[i] = el;
          }}
          r="2.5"
          fill="oklch(0.65 0.2 345 / 0.7)"
        />
      ))}

      {/* Nodes */}
      {NODES.map((n, i) => (
        <g key={`node-${i}`}>
          <circle
            cx={n.cx}
            cy={n.cy}
            r={n.r}
            fill="oklch(0.65 0.2 345 / 0.08)"
            stroke="oklch(0.65 0.2 345 / 0.25)"
            strokeWidth="1"
          />
          <circle cx={n.cx} cy={n.cy} r={n.r * 0.4} fill="oklch(0.65 0.2 345 / 0.15)" />
        </g>
      ))}
    </svg>
  );
}
