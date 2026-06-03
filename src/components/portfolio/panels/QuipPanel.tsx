import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ExternalLink, ChevronDown, Loader2 } from "lucide-react";
import { PanelShell } from "../PanelShell";
import { projects } from "@/lib/portfolio-data";
import { getGithubReadme } from "@/lib/github-readme.functions";

const project = projects.find((p) => p.name === "Quip")!;

export function QuipPanel({ onClose }: { onClose: () => void }) {
  const [showReadme, setShowReadme] = useState(false);
  const { data: readme } = useQuery({
    queryKey: ["readme", project.repo],
    queryFn: () => getGithubReadme({ repo: project.repo }),
    enabled: showReadme,
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  return (
    <PanelShell id="quip" onClose={onClose}>
      <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber">Project</div>
      <h2 className="mt-2 text-4xl md:text-5xl font-semibold">Quip</h2>
      <p className="mt-2 text-lg text-muted-foreground">
        Unix shell in C99 — built from scratch, no dependencies
      </p>

      <div className="mt-5 flex flex-wrap gap-2 font-mono text-[11px]">
        {project.tech.map((t) => (
          <span key={t} className="px-2 py-1 border border-border text-muted-foreground">
            {t}
          </span>
        ))}
      </div>

      <p className="mt-8 leading-relaxed text-foreground/90">{project.description}</p>

      <div className="mt-10 border border-border">
        <button
          onClick={() => setShowReadme(!showReadme)}
          className="w-full flex items-center justify-between px-5 py-4 font-mono text-[11px] uppercase tracking-[0.15em] text-amber hover:bg-tile-alt transition-colors"
        >
          <span>GitHub README</span>
          <ChevronDown
            className={`w-4 h-4 transition-transform ${showReadme ? "rotate-180" : ""}`}
          />
        </button>
        {showReadme && (
          <div className="border-t border-border px-5 py-6 bg-background/50">
            {readme?.html ? (
              <div
                className="prose prose-invert prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: readme.html }}
              />
            ) : readme?.error ? (
              <div className="font-mono text-xs text-muted-foreground">
                Could not load README: {readme.error}
              </div>
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
        className="mt-10 inline-flex items-center gap-2 px-4 py-3 bg-amber text-primary-foreground font-mono text-xs uppercase tracking-[0.15em] hover:opacity-90 transition-opacity"
      >
        View on GitHub <ExternalLink className="w-4 h-4" />
      </a>
    </PanelShell>
  );
}
