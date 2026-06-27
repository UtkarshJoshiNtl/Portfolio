import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ExternalLink, ChevronDown, Loader2 } from "lucide-react";
import { PanelShell } from "../PanelShell";
import { projects, sStreamCycle } from "@/lib/portfolio-data";
import { getGithubReadme } from "@/lib/github-readme.functions";

const project = projects.find((p) => p.name === "S-Stream")!;

export function SStreamPanel({ onClose }: { onClose: () => void }) {
  const [showReadme, setShowReadme] = useState(false);
  const { data: readme } = useQuery({
    queryKey: ["readme", project.repo],
    queryFn: () => getGithubReadme({ repo: project.repo }),
    enabled: showReadme,
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  return (
    <PanelShell id="s-stream" onClose={onClose}>
      <div className="relative">
        <div className="absolute -top-6 -left-6 w-64 h-24 pointer-events-none opacity-[0.04]" aria-hidden="true">
          <svg viewBox="0 0 300 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            {[0, 1, 2].map((i) => (
              <path
                key={i}
                d={`M0 ${40 + i * 8}C50 ${20 + i * 12} 100 ${60 - i * 8} 150 ${40 + i * 6}C200 ${20 + i * 14} 250 ${60 - i * 6} 300 ${40 + i * 4}`}
                stroke="currentColor"
                strokeWidth="0.4"
                className="text-amber"
                opacity={0.6 - i * 0.15}
              />
            ))}
          </svg>
        </div>

        <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber">Project</div>
        <h2 className="mt-2 text-4xl md:text-5xl font-semibold">S-Stream</h2>
        <p className="mt-2 text-lg text-muted-foreground">
          2D Lattice Boltzmann Fluid Simulation Workbench
        </p>

        <div className="mt-5 flex flex-wrap gap-2 font-mono text-[11px]">
          {project.tech.map((t) => (
            <span key={t} className="px-2 py-1 border border-border text-muted-foreground">
              {t}
            </span>
          ))}
        </div>

        <p className="mt-8 leading-relaxed text-foreground/90">{project.description}</p>

        <div className="mt-8 grid grid-cols-2 gap-3">
          {sStreamCycle.map((item, i) => (
            <div key={i} className="border border-border p-4 bg-tile/30">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-amber/60" />
                <span className="font-mono text-[10px] text-amber uppercase tracking-[0.15em]">
                  Capability {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{item}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 border border-border">
          <button
            onClick={() => setShowReadme(!showReadme)}
            className="w-full flex items-center justify-between px-5 py-4 font-mono text-[11px] uppercase tracking-[0.15em] text-amber hover:bg-tile-alt transition-colors"
          >
            <span>GitHub README</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${showReadme ? "rotate-180" : ""}`} />
          </button>
          {showReadme && (
            <div className="border-t border-border px-5 py-6 bg-background/50">
              {readme?.html ? (
                <div className="prose prose-invert prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: readme.html }} />
              ) : readme?.error ? (
                <div className="font-mono text-xs text-muted-foreground">Could not load README: {readme.error}</div>
              ) : (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="font-mono text-xs">Loading README…</span>
                </div>
              )}
            </div>
          )}
        </div>

        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-flex items-center gap-2 px-5 py-3 bg-amber text-primary-foreground font-mono text-xs uppercase tracking-[0.15em] hover:opacity-85 transition-all"
        >
          View on GitHub <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </PanelShell>
  );
}
