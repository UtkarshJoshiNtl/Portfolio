import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, ExternalLink, ChevronDown, Loader2 } from "lucide-react";
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
import { TechStackBar } from "../TechStackBar";
import { projects, benchmarks, astrosisHighlights } from "@/lib/portfolio-data";
import { getGithubReadme } from "@/lib/github-readme.functions";

type ProjectId = "astrosis" | "quip" | "s-stream" | "encrip" | "ctorrent" | "current" | "visage" | "justLanded" | "cjit";

const projectList = [
  { id: "astrosis" as const, name: "Astrosis", tag: "Featured", icon: "✦", desc: "GPU-Accelerated Orbital Propagation and Conjunction Analysis Engine" },
  { id: "quip" as const, name: "Quip", icon: "〉", desc: "Unix shell in C99 — built from scratch, zero dependencies" },
  { id: "s-stream" as const, name: "S-Stream", icon: "◈", desc: "Lattice Boltzmann fluid simulation with GPU acceleration" },
  { id: "encrip" as const, name: "EnCrip", icon: "◐", desc: "Distributed execution framework with HMAC-SHA256 auth" },
  { id: "current" as const, name: "Current", icon: "◎", desc: "Concurrent TTL hash map — C++17 performance study" },
  { id: "ctorrent" as const, name: "CTorrent", icon: "⇄", desc: "Educational CLI BitTorrent client in C" },
  { id: "visage" as const, name: "Visage", icon: "◉", desc: "Real-time system performance TUI dashboard" },
  { id: "justLanded" as const, name: "justLanded", icon: "⊕", desc: "Local co-op 3D physics game — Godot 4" },
  { id: "cjit" as const, name: "cjit", icon: "⊡", desc: "Version control in C — content-addressed storage", href: "https://github.com/UtkarshJoshiNtl/cjit" },
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

  const isExternal = "href" in p;

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
              href={isExternal ? (p as typeof p & { href: string }).href : (project?.github ?? "#")}
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
            <div className="rounded-xl bg-glass-hover shadow-glass p-5">
              <div className="font-mono text-micro uppercase tracking-[0.2em] text-foreground-secondary mb-3" style={{ fontVariationSettings: '"MONO" 1, "CASL" 0' }}>
                Benchmarks
              </div>
              <div className="overflow-x-auto rounded-lg">
                <table className="w-full font-mono text-small">
                  <tbody>
                    {benchmarks.map((row, ri) => (
                      <tr key={ri} className={ri === 0 ? "bg-surface text-gblue" : ""}>
                        {row.map((cell, ci) => (
                          <td key={ci} className="px-3 py-1.5 whitespace-nowrap">{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {id === "astrosis" && (
            <div className="rounded-xl bg-glass-hover shadow-glass p-5">
              <div className="font-mono text-micro uppercase tracking-[0.2em] text-foreground-secondary mb-3" style={{ fontVariationSettings: '"MONO" 1, "CASL" 0' }}>
                Highlights
              </div>
              <ul className="space-y-1.5">
                {astrosisHighlights.map((h, i) => (
                  <li key={i} className="flex gap-2 text-small text-foreground-secondary">
                    <span className="text-gblue font-mono mt-0.5" style={{ fontVariationSettings: '"MONO" 1, "CASL" 0' }}>&rsaquo;</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {!isExternal && project?.repo && (
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
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="mb-3 max-w-3xl mx-auto"
        >
          <TechStackBar />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-3xl mx-auto">
          {projectList.slice(0, 6).map((p, i) => {
          const isExternal = "href" in p;
          const isFeatured = p.id === "astrosis";
          const project = projects.find((pd) => pd.name === (
            p.id === "cjit" ? "cjit" : p.id === "quip" ? "Quip" : p.id === "s-stream" ? "S-Stream" : p.id === "encrip" ? "EnCrip" : p.id === "ctorrent" ? "CTorrent" : p.id === "current" ? "Current" : p.id === "visage" ? "Visage" : p.id === "justLanded" ? "justLanded" : "Astrosis"
          ));
          const Wrapper = isExternal ? "a" : "button";
          const wrapperProps = isExternal
            ? { href: (p as typeof p & { href: string }).href, target: "_blank", rel: "noopener noreferrer" as const }
            : { onClick: () => setSelected(p.id) };
          return (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.025, ease: "easeOut" }}
              whileHover={{ y: -3 }}
            >
              <Wrapper {...(wrapperProps as any)} className={`block w-full h-full ${!isExternal ? "text-left" : ""}`}>
                <div className="h-full rounded-xl overflow-hidden flex flex-col group shadow-glass hover:shadow-glow transition-shadow">
                  <div className="relative h-36 shrink-0 bg-background">
                    {p.id === "astrosis" ? <AstrosisBg /> : bgMap[p.id]}
                  </div>
                  <div className="flex-1 p-4 md:p-5 flex flex-col justify-center gap-2 bg-glass backdrop-blur-xl">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          {isFeatured && (
                            <span className="font-mono text-micro uppercase tracking-[0.15em] text-gblue bg-gblue/10 px-2 py-0.5 rounded" style={{ fontVariationSettings: '"MONO" 1, "CASL" 0' }}>
                              Featured
                            </span>
                          )}
                          <span className="font-mono text-sm font-bold text-foreground" style={{ fontVariationSettings: '"MONO" 0, "CASL" 0' }}>
                            {p.name}
                          </span>
                        </div>
                        <p className="text-xs text-foreground-secondary leading-relaxed mt-0.5">{p.desc}</p>
                      </div>
                      {isExternal && (
                        <ArrowUpRight className="w-3.5 h-3.5 text-foreground-secondary shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </div>
                    {project?.tech && (
                      <div className="flex flex-wrap gap-1">
                        {project.tech.slice(0, 4).map((t: string) => (
                          <span key={t} className="text-[9px] font-mono uppercase tracking-[0.1em] text-foreground-tertiary bg-glass px-1.5 py-0.5 rounded" style={{ fontVariationSettings: '"MONO" 1, "CASL" 0' }}>
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Wrapper>
            </motion.div>
          );
        })}
      </div>
      </div>
    </section>
  );
}
