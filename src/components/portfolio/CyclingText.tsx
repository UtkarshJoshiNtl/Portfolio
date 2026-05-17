import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function CyclingText({
  items,
  interval = 4000,
  className = "",
}: {
  items: string[];
  interval?: number;
  className?: string;
}) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % items.length), interval);
    return () => clearInterval(t);
  }, [items.length, interval]);
  return (
    <div className={`relative ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.35 }}
        >
          {items[i]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
