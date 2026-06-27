import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ExternalLink, ChevronDown, Loader2 } from "lucide-react";
import { PanelShell } from "../PanelShell";
import { projects } from "@/lib/portfolio-data";
import { getGithubReadme } from "@/lib/github-readme.functions";

const project = projects.find((p) => p.name === "CTorrent")!;

export function CTorrentPanel({ onClose }: { onClose: () => void }) {
  const [showReadme, setShowReadme] = useState(false);
  const { data: readme } = useQuery({
    queryKey: ["readme", project.repo],
    queryFn: () => getGithubReadme({ repo: project.repo }),
    enabled: showReadme,
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  return (
    <PanelShell id="ctorrent" onClose={onClose}>
      <div className="relative">
        <div className="absolute -top-6 -left-6 w-56 h-32 pointer-events-none opacity-[0.04]" aria-hidden="true">
          <svg viewBox="0 0 250 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            {[
              [[20, 60], [80, 20], [140, 60]],
              [[140, 60], [200, 20], [240, 60]],
              [[20, 60], [80, 100], [140, 60]],
              [[140, 60], [200, 100], [240, 60]],
              [[20, 60], [140, 60]],
              [[140, 60], [240, 60]],
            ].map((segments, i) => (
              <path key={i} d={segments.map((p, j) => `${j === 0 ? "M" : "L"}${p[0]} ${p[1]}`).join(" ")} stroke="currentColor" strokeWidth="0.3" className="text-amber" opacity={0.4 + (i % 3) * 0.15} />
            ))}
          </svg>
        </div>

        <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber">Project</div>
        <h2 className="mt-2 text-4xl md:text-5xl font-semibold">CTorrent</h2>
        <p className="mt-2 text-lg text-muted-foreground">Educational CLI BitTorrent Client in C</p>

        <div className="mt-5 flex flex-wrap gap-2 font-mono text-[11px]">
          {project.tech.map((t) => (
            <span key={t} className="px-2 py-1 border border-border text-muted-foreground">
              {t}
            </span>
          ))}
        </div>

        <p className="mt-8 leading-relaxed text-foreground/90">{project.description}</p>

        <div className="mt-8">
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber mb-3">Protocol Stack</div>
          <div className="space-y-1.5 font-mono text-xs">
            {[
              ["application", "BitTorrent peer wire protocol"],
              ["transport", "TCP (POSIX sockets)"],
              ["network", "Tracker HTTP/HTTPS announce"],
              ["data", "SHA-1 integrity · bencode"],
            ].map(([layer, desc]) => (
              <div key={layer} className="flex items-center gap-3 border border-border p-2.5">
                <span className="text-amber uppercase tracking-[0.15em] text-[10px] w-20 shrink-0">{layer}</span>
                <span className="text-muted-foreground">{desc}</span>
              </div>
            ))}
          </div>
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
