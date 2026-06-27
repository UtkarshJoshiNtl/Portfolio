import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ExternalLink, ChevronDown, Loader2 } from "lucide-react";
import { PanelShell } from "../PanelShell";
import { projects } from "@/lib/portfolio-data";
import { getGithubReadme } from "@/lib/github-readme.functions";

const project = projects.find((p) => p.name === "justLanded")!;

const terrainPath = "M0 40 Q20 20 40 35 T80 25 T120 38 T160 20 T200 35 T240 22 T280 38 T320 30 T360 40 L360 60 L0 60Z";

export function JustLandedPanel({ onClose }: { onClose: () => void }) {
  const [showReadme, setShowReadme] = useState(false);
  const { data: readme } = useQuery({
    queryKey: ["readme", project.repo],
    queryFn: () => getGithubReadme({ repo: project.repo }),
    enabled: showReadme,
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  return (
    <PanelShell id="justLanded" onClose={onClose}>
      <div className="relative">
        <div className="absolute -bottom-2 left-0 right-0 h-16 pointer-events-none opacity-[0.06]" aria-hidden="true">
          <svg viewBox="0 0 360 60" fill="currentColor" className="text-amber w-full h-full">
            <path d={terrainPath} />
          </svg>
        </div>

        <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber">Project</div>
        <h2 className="mt-2 text-4xl md:text-5xl font-semibold tracking-tight">justLanded</h2>
        <p className="mt-2 text-lg text-muted-foreground">Local Co-op 3D Physics Game — Godot 4</p>

        <div className="mt-5 flex flex-wrap gap-2 font-mono text-[11px]">
          {project.tech.map((t) => (
            <span key={t} className="px-2 py-1 border border-border text-muted-foreground">
              {t}
            </span>
          ))}
        </div>

        <p className="mt-8 leading-relaxed text-foreground/90">{project.description}</p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            ["Co-op Chaos", "Stranded astronauts must cooperate to scavenge debris and build escape vehicles. Communication is key."],
            ["Twisted Controls", "Randomized control bindings per seed force players to adapt to unfamiliar mappings each run."],
            ["Scrapyard Engineering", "Vehicle construction from scrounged parts with Godot 4's 3D physics engine."],
            ["Procedural Island", "Per-seed world generation with unique part spawns, terrain layout, and environmental challenges."],
          ].map(([title, desc]) => (
            <div key={title} className="border border-border p-4 bg-tile/30">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="font-mono text-xs text-amber tracking-[0.1em]">◆</span>
                <span className="font-mono text-xs uppercase tracking-[0.1em] text-amber">{title}</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
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
