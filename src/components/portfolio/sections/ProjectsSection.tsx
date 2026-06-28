import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, ExternalLink, ChevronDown, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { AstrosisBg } from "../AstrosisBg";
import { QuipBg } from "../QuipBg";
import { SStreamBg } from "../SStreamBg";
import { CJitBg } from "../CJitBg";
import { EnCripBg } from "../EnCripBg";
import { CTorrentBg } from "../CTorrentBg";
import { CurrentBg } from "../CurrentBg";
import { VisageBg } from "../VisageBg";
import { JustLandedBg } from "../JustLandedBg";

import { projects, benchmarks, astrosisHighlights } from "@/lib/portfolio-data";
import { getGithubReadme } from "@/lib/github-readme.functions";

type ProjectId = "astrosis" | "quip" | "s-stream" | "encrip" | "ctorrent" | "current" | "visage" | "justLanded" | "cjit";

const projectList = [
  { id: "astrosis" as const, name: "Astrosis", tag: "Featured", icon: "✦", desc: "GPU-Accelerated Orbital Propagation and Conjunction Analysis Engine" },
  { id: "quip" as const, name: "Quip", icon: "〉", desc: "Unix shell in C99 — built from scratch, zero dependencies" },
  { id: "s-stream" as const, name: "S-Stream", icon: "◈", desc: "Lattice Boltzmann fluid simulation with GPU acceleration" },
  { id: "visage" as const, name: "Visage", icon: "◉", desc: "Real-time system performance TUI dashboard" },
  { id: "encrip" as const, name: "EnCrip", icon: "◐", desc: "Distributed execution framework with HMAC-SHA256 auth" },
  { id: "current" as const, name: "Current", icon: "◎", desc: "Concurrent TTL hash map — C++17 performance study" },
  { id: "ctorrent" as const, name: "CTorrent", icon: "⇄", desc: "Educational CLI BitTorrent client in C" },
  { id: "justLanded" as const, name: "justLanded", icon: "⊕", desc: "Local co-op 3D physics game — Godot 4" },
  { id: "cjit" as const, name: "cjit", icon: "⊡", desc: "Version control in C — content-addressed storage" },
];

const bgMap: Record<string, React.ReactNode> = {
  quip: <QuipBg />,
  "s-stream": <SStreamBg />,
  cjit: <CJitBg />,
  encrip: <EnCripBg />,
  ctorrent: <CTorrentBg />,
  current: <CurrentBg />,
  visage: <VisageBg />,
  justLanded: <JustLandedBg />,
};

// Benchmark images for S-Stream carousel (placeholder - will show simulations)
const sStreamImages = [
  { label: "Cylinder Flow", desc: "Von Kármán vortex street visualization" },
  { label: "Multiphase Flow", desc: "Shan-Chen liquid-gas interface dynamics" },
  { label: "Cavity Flow", desc: "Driven cavity benchmark simulation" },
];

function BenchmarkDisplay() {
  return (
    <div className="rounded-xl bg-glass-hover shadow-glass p-5">
      <div className="font-mono text-micro uppercase tracking-[0.2em] text-foreground-secondary mb-3" style={{ fontVariationSettings: '"MONO" 1, "CASL" 0' }}>
        Performance Benchmarks
      </div>
      <div className="overflow-x-auto rounded-lg">
        <table className="w-full font-mono text-small">
          <tbody>
            {benchmarks.map((row, ri) => (
              <tr key={ri} className={ri === 0 ? "bg-surface text-gblue" : ""}>
                {row.map((cell, ci) => (
                  <td key={ci} className="px-3 py-1.5 whitespace-nowrap text-xs">{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function HighlightsDisplay() {
  return (
    <div className="rounded-xl bg-glass-hover shadow-glass p-5">
      <div className="font-mono text-micro uppercase tracking-[0.2em] text-foreground-secondary mb-3" style={{ fontVariationSettings: '"MONO" 1, "CASL" 0' }}>
        Technical Highlights
      </div>
      <ul className="space-y-2">
        {astrosisHighlights.map((h, i) => (
          <li key={i} className="flex gap-2 text-small text-foreground-secondary">
            <span className="text-gblue font-mono shrink-0 mt-0.5" style={{ fontVariationSettings: '"MONO" 1, "CASL" 0' }}>&rsaquo;</span>
            <span className="leading-snug">{h}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ImageCarousel() {
  const [current, setCurrent] = useState(0);
  
  return (
    <div className="space-y-3">
      <div className="relative rounded-lg overflow-hidden bg-background h-48 flex items-center justify-center border border-glass-border">
        <div className="absolute inset-0">
          <SStreamBg />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="relative text-center text-white">
          <div className="text-sm font-mono uppercase tracking-[0.1em]" style={{ fontVariationSettings: '"MONO" 1, "CASL" 0' }}>
            {sStreamImages[current].label}
          </div>
          <div className="text-xs text-foreground-secondary mt-1">{sStreamImages[current].desc}</div>
        </div>
        
        <button
          onClick={() => setCurrent((c) => (c - 1 + sStreamImages.length) % sStreamImages.length)}
          className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-black/40 hover:bg-black/60 transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={() => setCurrent((c) => (c + 1) % sStreamImages.length)}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-black/40 hover:bg-black/60 transition-all"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      
      <div className="flex gap-2 justify-center">
        {sStreamImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all ${i === current ? "bg-gblue w-6" : "bg-foreground-tertiary"}`}
          />
        ))}
      </div>
    </div>
  );
}

function ProjectDetail({ id, onBack }: { id: ProjectId; onBack: () => void }) {
  const p = projectList.find((x) => x.id === id)!;
  const project = projects.find((pd) => pd.name === (
    id === "cjit" ? "cjit" : id === "quip" ? "Quip" : id === "s-stream" ? "S-Stream" : id === "encrip" ? "EnCrip" : id === "ctorrent" ? "CTorrent" : id === "current" ? "Current" : id === "visage" ? "Visage" : id === "justLanded" ? "justLanded" : "Astrosis"
  ));
  const [showReadme, setShowReadme] = useState(false);
  const { data: readme } = useQuery({
    queryKey: ["readme", project?.repo],
    queryFn: () => getGithubReadme({ repo: project?.repo ?? "" }),
    enabled: showReadme && !!project?.repo,
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <button
        onClick={onBack}
        className="flex items-center gap-2 font-mono text-micro uppercase tracking-[0.15em] text-foreground-secondary hover:text-foreground transition-colors mb-5"
        style={{ fontVariationSettings: '"MONO" 1, "CASL" 0' }}
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        All projects
      </button>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-8">
        <div className="md:col-span-3">
          <div className="rounded-xl bg-glass shadow-glass p-6 md:p-8">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-lg" style={{ opacity: 0.4 }}>{p.icon}</span>
              <span className="font-mono text-micro uppercase tracking-[0.2em] text-foreground-secondary" style={{ fontVariationSettings: '"MONO" 1, "CASL" 0' }}>
                {p.tag ?? "Project"}
              </span>
            </div>

            <h2 className="text-2xl md:text-4xl font-bold tracking-tight" style={{ fontVariationSettings: '"MONO" 0, "CASL" 0' }}>
              {p.name}
            </h2>

            <p className="mt-2 text-foreground-secondary text-sm md:text-base">{p.desc}</p>

            {project?.description && (
              <p className="mt-5 text-sm text-foreground-secondary leading-relaxed">
                {project.description}
              </p>
            )}

            {project?.tech && (
              <div className="flex flex-wrap gap-2 mt-4">
                {project.tech.map((t: string) => (
                  <span key={t} className="tag-pill">{t}</span>
                ))}
              </div>
            )}

            <a
              href={project?.github ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-gblue/15 text-foreground hover:bg-gblue/25 transition-all font-mono text-micro uppercase tracking-[0.15em]"
              style={{ fontVariationSettings: '"MONO" 1, "CASL" 0' }}
            >
              View on GitHub <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        <div className="md:col-span-2 space-y-4">
          {id === "astrosis" && (
            <>
              <BenchmarkDisplay />
              <HighlightsDisplay />
            </>
          )}

          {id === "s-stream" && (
            <ImageCarousel />
          )}

          {project?.repo && (
            <div className="rounded-xl bg-glass-hover shadow-glass p-5">
              <button
                onClick={() => setShowReadme(!showReadme)}
                className="flex items-center gap-2 font-mono text-micro uppercase tracking-[0.15em] text-foreground-secondary hover:text-foreground transition-colors"
                style={{ fontVariationSettings: '"MONO" 1, "CASL" 0' }}
              >
                <ChevronDown className={`w-3 h-3 transition-transform ${showReadme ? "rotate-180" : ""}`} />
                README
              </button>
              {showReadme && (
                <div className="mt-3 pt-4">
                  {readme?.html ? (
                    <div className="prose prose-invert prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: readme.html }} />
                  ) : readme?.error ? (
                    <div className="font-mono text-small text-foreground-secondary" style={{ fontVariationSettings: '"MONO" 1, "CASL" 0' }}>
                      {readme.error}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-foreground-secondary">
                      <Loader2 className="w-3 h-3 animate-spin" />
                      <span className="font-mono text-small">Loading&hellip;</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function ProjectsSection() {
  const [selected, setSelected] = useState<ProjectId | null>(null);

  if (selected) {
    return <ProjectDetail id={selected} onBack={() => setSelected(null)} />;
  }

  // Define tile grid positions: large (2x2), medium (2x1 or 1x2), small (1x1)
  const tiledProjects: Array<{ project: typeof projectList[0]; cols: number; rows: number }> = [
    // Row 1: Astrosis (2x2 hero)
    { project: projectList[0], cols: 2, rows: 2 },
    // Row 1 continued: S-Stream (2x1) + Visage (1x1)
    { project: projectList[2], cols: 2, rows: 1 },
    { project: projectList[3], cols: 1, rows: 1 },
    // Row 2 continued: Quip (1x1) + Encrip (1x1) + Current (1x1)
    { project: projectList[1], cols: 1, rows: 1 },
    { project: projectList[4], cols: 1, rows: 1 },
    { project: projectList[5], cols: 1, rows: 1 },
    // Row 3: CTorrent + JustLanded + cjit (all 1x1)
    { project: projectList[6], cols: 1, rows: 1 },
    { project: projectList[7], cols: 1, rows: 1 },
    { project: projectList[8], cols: 1, rows: 1 },
  ];

  return (
    <section className="relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        <div
          className="absolute inset-0"
          style={{
            opacity: 0.04,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundSize: '512px 512px',
            backgroundRepeat: 'repeat',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at 20% 0%, rgba(66,133,244,0.06) 0%, transparent 50%),
              radial-gradient(ellipse at 80% 30%, rgba(234,67,53,0.04) 0%, transparent 50%),
              radial-gradient(ellipse at 50% 100%, rgba(52,168,83,0.04) 0%, transparent 50%)
            `,
          }}
        />
      </div>

      <div className="relative" style={{ zIndex: 1 }}>
        <div 
          className="grid gap-3 max-w-4xl mx-auto"
          style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gridAutoFlow: 'dense'
          }}
        >
          {tiledProjects.map((item, i) => {
            const p = item.project;
            const project = projects.find((pd) => pd.name === (
              p.id === "cjit" ? "cjit" : p.id === "quip" ? "Quip" : p.id === "s-stream" ? "S-Stream" : p.id === "encrip" ? "EnCrip" : p.id === "ctorrent" ? "CTorrent" : p.id === "current" ? "Current" : p.id === "visage" ? "Visage" : p.id === "justLanded" ? "justLanded" : "Astrosis"
            ));
            const isFeatured = p.id === "astrosis";
            const isLarge = p.id === "astrosis" || p.id === "s-stream" || p.id === "quip" || p.id === "visage";

            return (
              <motion.button
                key={p.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.03, ease: "easeOut" }}
                onClick={() => setSelected(p.id)}
                className="w-full group rounded-xl overflow-hidden shadow-glass hover:shadow-glow transition-all cursor-pointer flex flex-col"
                style={{ 
                  minHeight: isLarge ? '280px' : '200px',
                  gridColumn: isLarge && i === 0 ? 'span 2' : isFeatured && i !== 0 ? 'span 2' : 'span 1',
                  gridRow: isLarge && i === 0 ? 'span 2' : 'span 1'
                }}
              >
                <div className={`relative ${isLarge ? 'h-44' : 'h-28'} shrink-0 bg-background overflow-hidden`}>
                  <div className="absolute inset-0 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                    {p.id === "astrosis" ? <AstrosisBg /> : bgMap[p.id]}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>

                <div className="flex-1 p-4 md:p-5 flex flex-col justify-between bg-glass backdrop-blur-xl">
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="min-w-0">
                        {isFeatured && (
                          <div className="font-mono text-micro uppercase tracking-[0.15em] text-gblue mb-1" style={{ fontVariationSettings: '"MONO" 1, "CASL" 0' }}>
                            Featured
                          </div>
                        )}
                        <div className="font-semibold text-sm md:text-base text-foreground" style={{ fontVariationSettings: '"MONO" 0, "CASL" 0' }}>
                          {p.name}
                        </div>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-foreground-secondary shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="text-xs md:text-sm text-foreground-secondary leading-snug">{p.desc}</p>
                  </div>

                  {project?.tech && (
                    <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-glass-border">
                      {project.tech.slice(0, isLarge ? 5 : 3).map((t: string) => (
                        <span 
                          key={t} 
                          className="text-[10px] md:text-xs font-mono uppercase tracking-[0.1em] text-foreground-tertiary bg-background rounded px-2 py-1"
                          style={{ fontVariationSettings: '"MONO" 1, "CASL" 0' }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
