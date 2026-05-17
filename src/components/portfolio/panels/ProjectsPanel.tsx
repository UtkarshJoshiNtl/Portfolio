import { PanelShell } from "../PanelShell";
import { projects } from "@/lib/portfolio-data";
import { ExternalLink } from "lucide-react";

export function ProjectsPanel({ onClose }: { onClose: () => void }) {
  return (
    <PanelShell id="projects" onClose={onClose}>
      <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber">Projects</div>
      <h2 className="mt-2 text-4xl md:text-5xl font-semibold">Selected work</h2>
      <p className="mt-2 text-muted-foreground">
        Systems code, simulation, and tools — written from first principles.
      </p>

      <div className="mt-10 grid gap-4">
        {projects.map((p) => (
          <div key={p.name} className="border border-border p-5 md:p-6 bg-tile-alt">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <h3 className="text-2xl font-semibold">{p.name}</h3>
              <a
                href={p.github}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground hover:text-amber inline-flex items-center gap-1.5"
              >
                GitHub <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5 font-mono text-[10px]">
              {p.tech.map((t) => (
                <span key={t} className="px-2 py-1 border border-border text-muted-foreground">
                  {t}
                </span>
              ))}
            </div>
            <p className="mt-4 text-sm md:text-[15px] leading-relaxed text-foreground/85">
              {p.description}
            </p>
          </div>
        ))}
      </div>
    </PanelShell>
  );
}
