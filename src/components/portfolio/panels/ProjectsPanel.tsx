import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { PanelShell } from "../PanelShell";
import { projects } from "@/lib/portfolio-data";
import { ExternalLink, ChevronDown, Loader2 } from "lucide-react";
import { getGithubReadme } from "@/lib/github-readme.functions";

export function ProjectsPanel({ onClose }: { onClose: () => void }) {
  return (
    <PanelShell id="projects" onClose={onClose}>
      <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber">
        Projects
      </div>
      <h2 className="mt-2 text-4xl md:text-5xl font-semibold">Selected work</h2>
      <p className="mt-2 text-muted-foreground">
        Systems code, simulation, and tools — written from first principles.
      </p>

      <div className="mt-10 grid gap-4">
        {projects.map((p) => (
          <ProjectCard key={p.name} project={p} />
        ))}
      </div>
    </PanelShell>
  );
}

function ProjectCard({
  project,
}: {
  project: {
    name: string;
    repo: string;
    tech: readonly string[] | string[];
    description: string;
    github: string;
  };
}) {
  const [expanded, setExpanded] = useState(false);
  const { data: readme } = useQuery({
    queryKey: ["readme", project.repo],
    queryFn: () => getGithubReadme({ repo: project.repo }),
    enabled: expanded,
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  return (
    <div className="border border-border bg-tile-alt overflow-hidden">
      <div className="p-5 md:p-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <h3 className="text-2xl font-semibold">{project.name}</h3>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground hover:text-amber inline-flex items-center gap-1.5"
          >
            GitHub <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5 font-mono text-[10px]">
          {project.tech.map((t) => (
            <span key={t} className="px-2 py-1 border border-border text-muted-foreground">
              {t}
            </span>
          ))}
        </div>
        <p className="mt-4 text-sm md:text-[15px] leading-relaxed text-foreground/85">
          {project.description}
        </p>
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-4 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground hover:text-amber flex items-center gap-2 transition-colors"
        >
          <ChevronDown
            className={`w-3 h-3 transition-transform ${expanded ? "rotate-180" : ""}`}
          />
          {expanded ? "Hide README" : "Show README"}
        </button>
      </div>

      {expanded && (
        <div className="border-t border-border px-5 md:px-6 py-6 bg-background/50">
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
  );
}
