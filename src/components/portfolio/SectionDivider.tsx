import { motion } from "framer-motion";
import { useId } from "react";

type Props = {
  seed?: number;
};

function mulberry32(a: number) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function SectionDivider({ seed = 0 }: Props) {
  const id = useId();
  const rand = mulberry32(seed);
  const amplitude = 8 + rand() * 8;
  const freq = 0.015 + rand() * 0.01;
  const phase = rand() * Math.PI * 2;
  const width = 1200;
  const height = 40;

  let pathD = `M 0 ${height / 2}`;
  for (let x = 0; x <= width; x += 4) {
    const y =
      height / 2 +
      Math.sin(x * freq + phase) * amplitude +
      Math.sin(x * freq * 2.5 + phase * 1.3) * amplitude * 0.3;
    pathD += ` L ${x} ${y}`;
  }

  return (
    <div className="my-6 md:my-8 flex justify-center">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="section-divider max-w-full"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`fade-${id}`} x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="20%" stopColor="currentColor" stopOpacity="0.15" />
            <stop offset="50%" stopColor="currentColor" stopOpacity="0.25" />
            <stop offset="80%" stopColor="currentColor" stopOpacity="0.15" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <motion.path
          d={pathD}
          fill="none"
          stroke={`url(#fade-${id})`}
          strokeWidth="0.5"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}
