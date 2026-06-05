import { PanelShell } from "../PanelShell";
import { projects } from "@/lib/portfolio-data";

const project = projects.find((p) => p.name === "EnCrip")!;

export function EnCripPanel({ onClose }: { onClose: () => void }) {
  return (
    <PanelShell id="encrip" onClose={onClose}>
      <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber">Project</div>
      <h2 className="mt-2 text-4xl md:text-5xl font-semibold">EnCrip</h2>
      <p className="mt-2 text-lg text-muted-foreground">Secure Distributed Execution Framework</p>

      <div className="mt-5 flex flex-wrap gap-2 font-mono text-[11px]">
        {project.tech.map((t) => (
          <span key={t} className="px-2 py-1 border border-border text-muted-foreground">
            {t}
          </span>
        ))}
      </div>

      <p className="mt-8 leading-relaxed text-foreground/90">{project.description}</p>

      <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-3 max-w-2xl">
        {[
          ["394,922", "HMAC gen ops/sec"],
          ["526,275", "HMAC verify ops/sec"],
          ["100%", "replay detection rate"],
        ].map(([val, label]) => (
          <div key={label} className="border border-border p-4">
            <div className="text-xl font-semibold text-amber">{val}</div>
            <div className="font-mono text-[10px] text-muted-foreground mt-1">{label}</div>
          </div>
        ))}
      </div>

      <a
        href={project.github}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-10 inline-flex items-center gap-2 px-4 py-3 bg-amber text-primary-foreground font-mono text-xs uppercase tracking-[0.15em] hover:opacity-90 transition-opacity"
      >
        View on GitHub →
      </a>
    </PanelShell>
  );
}
