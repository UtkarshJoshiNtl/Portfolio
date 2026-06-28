import React, { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { projects } from "@/lib/portfolio-data";

export function ProjectsSection() {
  const featuredProjects = projects.filter((p) => p.tileSize === "large");
  const smallProjects = projects.filter((p) => p.tileSize !== "large");

  return (
    <section className="space-y-8">
      {/* Featured Projects */}
      <div>
        <div className="mb-4">
          <p className="font-mono text-micro uppercase tracking-[0.15em] text-foreground-tertiary" style={{ fontVariationSettings: '"MONO" 1, "CASL" 0' }}>
            Featured Work
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
          {featuredProjects.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="group rounded-lg bg-glass-hover border border-glass-border hover:bg-glass-active hover:border-glass-border-hover shadow-glass hover:shadow-glow transition-all p-5 space-y-3"
            >
              <div>
                <h3 className="text-base font-semibold text-foreground mb-1.5">
                  {p.name}
                </h3>
                <p className="text-sm text-foreground-secondary leading-relaxed">
                  {p.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {p.tech.slice(0, 5).map((t) => (
                  <span
                    key={t}
                    className="px-2 py-1 rounded bg-gblue/10 text-gblue text-xs font-mono uppercase tracking-widest"
                    style={{ fontVariationSettings: '"MONO" 1, "CASL" 0' }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              <a
                href={p.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-gblue hover:text-gblue/80 transition-colors mt-1 group/link"
              >
                <Github className="w-4 h-4" strokeWidth={1.5} />
                View on GitHub
                <ExternalLink className="w-3 h-3 opacity-0 group-hover/link:opacity-100 transition-opacity" strokeWidth={1.5} />
              </a>
            </motion.div>
          ))}
        </div>
      </div>

      {/* All Projects Grid */}
      <div>
        <div className="mb-4">
          <p className="font-mono text-micro uppercase tracking-[0.15em] text-foreground-tertiary" style={{ fontVariationSettings: '"MONO" 1, "CASL" 0' }}>
            All Projects
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-4xl">
          {smallProjects.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.2 + i * 0.05 }}
              className="group rounded-lg bg-glass-hover border border-glass-border hover:bg-glass-active hover:border-glass-border-hover shadow-glass hover:shadow-glow transition-all p-4 space-y-2.5"
            >
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-1">
                  {p.name}
                </h4>
                <p className="text-xs text-foreground-secondary leading-relaxed line-clamp-2">
                  {p.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-1">
                {p.tech.slice(0, 3).map((t) => (
                  <span
                    key={t}
                    className="px-1.5 py-0.5 rounded text-gblue/70 text-[11px] font-mono uppercase tracking-wide"
                    style={{ fontVariationSettings: '"MONO" 1, "CASL" 0' }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              <a
                href={p.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-gblue hover:text-gblue/80 transition-colors group/link"
              >
                <Github className="w-3.5 h-3.5" strokeWidth={1.5} />
                GitHub
                <ExternalLink className="w-2.5 h-2.5 opacity-0 group-hover/link:opacity-100 transition-opacity" strokeWidth={1.5} />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
