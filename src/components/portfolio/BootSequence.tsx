import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

type BootLine = {
  status: string;
  label: string;
  delay: number;
  duration: number;
};

const bootLines: BootLine[] = [
  { status: "  ok  ", label: "Initializing orbital mechanics stack...", delay: 200, duration: 40 },
  { status: "  ok  ", label: "Loading shell environment (C99/POSIX)...", delay: 600, duration: 50 },
  { status: "  ok  ", label: "Establishing peer connections...", delay: 1200, duration: 35 },
  { status: " done ", label: "Systems online. Welcome, operator.", delay: 1800, duration: 45 },
];

function useTypewriter(text: string, speed: number, startDelay: number) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => setStarted(true), startDelay);
    return () => clearTimeout(startTimer);
  }, [startDelay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [started, text, speed]);

  return { displayed, done: displayed.length >= text.length };
}

function BootLineRow({ line, index }: { line: BootLine; index: number }) {
  const { displayed, done } = useTypewriter(line.label, line.duration, line.delay);

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: done ? 1 : 0.7, x: 0 }}
      className="flex items-center gap-3 font-mono text-xs md:text-sm"
    >
      <span
        className={`w-14 shrink-0 text-center ${
          line.status === "done" ? "text-amber" : "text-amber/70"
        }`}
      >
        [{line.status}]
      </span>
      <span className="text-muted-foreground">
        {displayed}
        {!done && <span className="animate-pulse ml-0.5 text-amber">_</span>}
      </span>
    </motion.div>
  );
}

export function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [visible, setVisible] = useState(true);
  const lastLine = bootLines[bootLines.length - 1];
  const lastTotalDelay = lastLine.delay + lastLine.label.length * lastLine.duration + 600;

  const handleComplete = useCallback(() => {
    setVisible(false);
    setTimeout(onComplete, 500);
  }, [onComplete]);

  useEffect(() => {
    const timer = setTimeout(handleComplete, lastTotalDelay);
    return () => clearTimeout(timer);
  }, [lastTotalDelay, handleComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="boot"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
          className="py-8 md:py-12"
        >
          <div className="space-y-2">
            {bootLines.map((line, i) => (
              <BootLineRow key={i} line={line} index={i} />
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: lastTotalDelay / 1000 - 0.3, duration: 0.3 }}
            className="mt-4 font-mono text-[10px] uppercase tracking-[0.3em] text-amber/40"
          >
            Press any key to continue...
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
