import { useRef } from "react";
import { useAnimationFrame } from "framer-motion";

const LINES = [
  "$ ./quip",
  "quip v0.1 — Unix shell",
  "type 'help' for commands",
  "$ echo hello world",
  "hello world",
  "$ ls -la | grep .c",
  "main.c",
  "parser.c",
  "$ ",
];

export function QuipBg() {
  const cursorRef = useRef<SVGRectElement>(null);

  useAnimationFrame((t) => {
    const blink = Math.sin(t / 400) > 0;
    if (cursorRef.current) {
      cursorRef.current.style.opacity = blink ? "1" : "0";
    }
  });

  return (
    <svg
      className="absolute inset-0 h-full w-full opacity-25"
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <rect width="400" height="300" fill="oklch(0.15 0 0)" rx="4" />
      {LINES.map((line, i) => (
        <text
          key={i}
          x="12"
          y={20 + i * 20}
          fontFamily="monospace"
          fontSize="11"
          fill={line.startsWith("$ ") ? "oklch(0.7 0.15 145)" : "oklch(0.65 0 0)"}
        >
          {line}
        </text>
      ))}
      <rect
        ref={cursorRef}
        x="24"
        y={20 + (LINES.length - 1) * 20 - 2}
        width="6"
        height="12"
        fill="oklch(0.7 0.15 145)"
      />
    </svg>
  );
}
