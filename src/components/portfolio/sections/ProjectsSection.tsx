import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { projects } from "@/lib/portfolio-data";
import { CyclingSquares } from "../CyclingSquares";
import { AstrosisBg } from "../AstrosisBg";
import { QuipBg } from "../QuipBg";
import { SStreamBg } from "../SStreamBg";
import { VisageBg } from "../VisageBg";

const FEATURED_BG: Record<string, React.ComponentType> = {
  Astrosis: AstrosisBg,
  Quip: QuipBg,
  "S-Stream": SStreamBg,
  Visage: VisageBg,
};

export function ProjectsSection() {
  const featuredProjects = projects.filter((p) => p.tileSize === "large");

  return (
    <section className="flex flex-col flex-1 min-h-0 gap-5">
      {/* Featured 2x2 Grid */}
      <div className="flex-none">
        <p className="font-mono text-micro uppercase tracking-[0.15em] text-foreground-tertiary mb-3" style={{ fontVariationSettings: '"MONO" 1, "CASL" 0' }}>
          Featured
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {featuredProjects.map((p, i) => {
            const Bg = FEATURED_BG[p.name];
            return (
              <motion.a
                key={p.name}
                href={p.github}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.08 }}
                className="group relative rounded-lg overflow-hidden border border-glass-border hover:border-glass-border-hover shadow-glass hover:shadow-glow transition-all min-h-[220px] flex flex-col"
              >
                {Bg && (
                  <div className="absolute inset-0">
                    <Bg />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
                <div className="relative flex-1 p-5 flex flex-col">
                  <h3 className="text-base font-semibold text-white mb-1">{p.name}</h3>
                  <p className="text-xs text-white/50 leading-relaxed line-clamp-2 mb-3 flex-1">
                    {p.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {p.tech.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="px-1.5 py-0.5 rounded bg-white/10 text-white/60 text-[10px] font-mono uppercase tracking-wider"
                        style={{ fontVariationSettings: '"MONO" 1, "CASL" 0' }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-white/40 group-hover:text-white/70 transition-colors">
                    <Github className="w-3.5 h-3.5" strokeWidth={1.5} />
                    GitHub
                    <ExternalLink className="w-2.5 h-2.5 opacity-0 group-hover/link:opacity-100 transition-opacity" strokeWidth={1.5} />
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>

      {/* Other Projects — Cycling Squares */}
      <div className="flex-1 min-h-0 flex flex-col">
        <p className="font-mono text-micro uppercase tracking-[0.15em] text-foreground-tertiary mb-3" style={{ fontVariationSettings: '"MONO" 1, "CASL" 0' }}>
          Other Projects
        </p>
        <CyclingSquares />
      </div>
    </section>
  );
}
