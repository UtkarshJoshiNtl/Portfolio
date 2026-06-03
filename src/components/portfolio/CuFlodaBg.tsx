import { useRef } from "react";
import { useAnimationFrame } from "framer-motion";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
};

const PARTICLE_COUNT = 30;
const GRID_SIZE = 30;

function initParticles(): Particle[] {
  return Array.from({ length: PARTICLE_COUNT }, () => ({
    x: Math.random() * 400,
    y: Math.random() * 300,
    vx: (Math.random() - 0.5) * 0.8,
    vy: (Math.random() - 0.5) * 0.8,
  }));
}

export function CuFlodaBg() {
  const particlesRef = useRef(initParticles());
  const circlesRef = useRef<SVGCircleElement[]>([]);

  useAnimationFrame(() => {
    const particles = particlesRef.current;
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > 400) p.vx *= -1;
      if (p.y < 0 || p.y > 300) p.vy *= -1;
      const el = circlesRef.current[i];
      if (el) {
        el.setAttribute("cx", String(p.x));
        el.setAttribute("cy", String(p.y));
      }
    }
  });

  const rows = Math.floor(300 / GRID_SIZE);
  const cols = Math.floor(400 / GRID_SIZE);
  const latticeDots: { x: number; y: number }[] = [];
  for (let r = 0; r <= rows; r++) {
    for (let c = 0; c <= cols; c++) {
      latticeDots.push({ x: c * GRID_SIZE, y: r * GRID_SIZE });
    }
  }

  return (
    <svg
      className="absolute inset-0 h-full w-full opacity-30"
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      {latticeDots.map((dot, i) => (
        <circle
          key={`l${i}`}
          cx={dot.x}
          cy={dot.y}
          r="0.8"
          fill="oklch(0.6 0.12 230)"
          opacity="0.4"
        />
      ))}
      {Array.from({ length: PARTICLE_COUNT }, (_, i) => (
        <circle
          key={`p${i}`}
          ref={(el) => {
            if (el) circlesRef.current[i] = el;
          }}
          r="2.5"
          fill="oklch(0.7 0.15 230)"
          opacity="0.6"
        />
      ))}
    </svg>
  );
}
