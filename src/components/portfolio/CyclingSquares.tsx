import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { projects } from "@/lib/portfolio-data";
import { QuipBg } from "./QuipBg";
import { CJitBg } from "./CJitBg";
import { EnCripBg } from "./EnCripBg";
import { CTorrentBg } from "./CTorrentBg";
import { CurrentBg } from "./CurrentBg";
import { JustLandedBg } from "./JustLandedBg";

const BG_MAP: Record<string, React.ComponentType> = {
  Quip: QuipBg,
  cjit: CJitBg,
  EnCrip: EnCripBg,
  CTorrent: CTorrentBg,
  Current: CurrentBg,
  justLanded: JustLandedBg,
};

const CYCLE_INTERVAL = 4000;

const smallProjects = projects.filter((p) => p.tileSize !== "large");

export function CyclingSquares() {
  const [index, setIndex] = useState(0);

  const advance = useCallback(() => {
    setIndex((i) => (i + 1) % smallProjects.length);
  }, []);

  useEffect(() => {
    const id = setInterval(advance, CYCLE_INTERVAL);
    return () => clearInterval(id);
  }, [advance]);

  const current = smallProjects[index];
  const BgComponent = BG_MAP[current.name];

  return (
    <div className="flex-1 min-h-0">
      <div className="relative rounded-xl overflow-hidden border border-glass-border bg-glass-hover shadow-glass h-full min-h-[180px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            {BgComponent && <BgComponent />}
          </motion.div>
        </AnimatePresence>

        {/* Gradient scrim for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Project info overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between">
          <div>
            <AnimatePresence mode="wait">
              <motion.h4
                key={current.name}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.3 }}
                className="text-lg font-semibold text-white mb-1.5"
              >
                {current.name}
              </motion.h4>
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <motion.div
                key={current.name + "-tech"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, delay: 0.05 }}
                className="flex flex-wrap gap-1.5"
              >
                {current.tech.slice(0, 4).map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded bg-white/10 text-white/70 text-[11px] font-mono uppercase tracking-wider"
                    style={{ fontVariationSettings: '"MONO" 1, "CASL" 0' }}
                  >
                    {t}
                  </span>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <a
            href={current.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-white/60 hover:text-white transition-colors shrink-0 ml-4"
          >
            <Github className="w-4 h-4" strokeWidth={1.5} />
            <ExternalLink className="w-3 h-3" strokeWidth={1.5} />
          </a>
        </div>

        {/* Dot indicators */}
        <div className="absolute top-4 right-4 flex gap-1.5">
          {smallProjects.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                i === index ? "bg-white/80 scale-125" : "bg-white/25 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
