import { PanelShell } from "../PanelShell";
import { projects } from "@/lib/portfolio-data";
import { ExternalLink } from "lucide-react";

const project = projects.find((p) => p.name === "EnCrip")!;

export function EnCripPanel({ onClose }: { onClose: () => void }) {
  return (
    <PanelShell id="encrip" onClose={onClose}>
      <div className="relative">
        <div className="absolute -top-4 -right-4 w-48 h-48 pointer-events-none opacity-[0.04]" aria-hidden="true">
          <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            {[
              [40, 40, 120, 40],
              [40, 40, 40, 160],
              [40, 160, 160, 160],
              [160, 40, 160, 160],
              [40, 100, 160, 100],
            ].map(([x1, y1, x2, y2], i) => (
              <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="0.3" className="text-amber" />
            ))}
            {[[40, 40], [160, 40], [40, 160], [160, 160], [100, 100]].map(([cx, cy], i) => (
              <circle key={i} cx={cx} cy={cy} r={i === 4 ? 4 : 3} fill="currentColor" className="text-amber" opacity={i === 4 ? 0.8 : 0.4} />
            ))}
          </svg>
        </div>

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
            ["394,922", "HMAC gen ops/sec", "oklch(0.65 0.2 345)"],
            ["526,275", "HMAC verify ops/sec", "oklch(0.65 0.2 345)"],
            ["100%", "replay detection rate", "oklch(0.62 0.15 160)"],
          ].map(([val, label, color]) => (
            <div key={label} className="border border-border p-4 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: color }} />
              <div className="text-xl font-semibold" style={{ color }}>{val}</div>
              <div className="font-mono text-[10px] text-muted-foreground mt-1">{label}</div>
            </div>
          ))}
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
