import { motion } from "framer-motion";

export function OrbitalBg() {
  const orbits = [
    {
      id: 1,
      radius: 40,
      duration: 8,
      opacity: 0.4,
      dotSize: 3,
    },
    {
      id: 2,
      radius: 65,
      duration: 12,
      opacity: 0.25,
      dotSize: 2,
    },
    {
      id: 3,
      radius: 90,
      duration: 16,
      opacity: 0.15,
      dotSize: 1.5,
    },
  ];

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <svg width="100%" height="100%" className="absolute inset-0" style={{ overflow: "visible" }}>
        {orbits.map((orbit) => (
          <g key={orbit.id}>
            <circle
              cx="50%"
              cy="50%"
              r={orbit.radius}
              fill="none"
              stroke="white"
              strokeWidth="0.5"
              opacity={orbit.opacity * 0.3}
              strokeDasharray="2,4"
            />
            <motion.g
              animate={{ rotate: 360 }}
              transition={{
                duration: orbit.duration,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <circle
                cx="50%"
                cy={`calc(50% - ${orbit.radius}px)`}
                r={orbit.dotSize}
                fill="white"
                opacity={orbit.opacity}
              />
            </motion.g>
          </g>
        ))}
      </svg>
    </div>
  );
}
