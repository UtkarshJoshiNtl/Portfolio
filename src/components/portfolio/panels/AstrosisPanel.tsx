import { PanelShell } from "../PanelShell";
import { astrosisHighlights, benchmarks } from "@/lib/portfolio-data";
import { ExternalLink } from "lucide-react";

export function AstrosisPanel({ onClose }: { onClose: () => void }) {
  return (
    <PanelShell id="astrosis" onClose={onClose}>
      <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber">
        Featured Project
      </div>
      <h2 className="mt-2 text-4xl md:text-5xl font-semibold">Astrosis</h2>
      <p className="mt-2 text-lg text-muted-foreground">
        A performance-heavy simulation project using C++, CUDA, and numerical methods.
      </p>

      <div className="mt-5 flex flex-wrap gap-2 font-mono text-[11px]">
        {["Python", "C++", "CUDA", "RK4", "SGP4", "pybind11", "OpenMP"].map((t) => (
          <span key={t} className="px-2 py-1 border border-border text-muted-foreground">
            {t}
          </span>
        ))}
      </div>

      <p className="mt-8 leading-relaxed text-foreground/90">
        Astrosis started as an orbital mechanics engine, but the real point is performance: taking
        math-heavy simulation code from Python into C++/OpenMP and CUDA, then making the speedups
        visible with benchmarks. It includes RK4 integration, gravity harmonics, drag modeling, and
        a multi-backend architecture that can compare CUDA GPU, C++/OpenMP, NumPy, and pure Python
        paths.
      </p>

      <div className="mt-10">
        <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber mb-3">
          Benchmarks
        </div>
        <div className="overflow-x-auto border border-border">
          <table className="w-full font-mono text-xs md:text-sm">
            <tbody>
              {benchmarks.map((row, ri) => (
                <tr
                  key={ri}
                  className={ri === 0 ? "bg-tile-alt text-amber" : "border-t border-border"}
                >
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-3 py-2 whitespace-nowrap">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-10">
        <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber mb-3">
          Technical Highlights
        </div>
        <ul className="space-y-2">
          {astrosisHighlights.map((h, i) => (
            <li key={i} className="flex gap-3 text-sm md:text-base text-foreground/90">
              <span className="text-amber font-mono mt-0.5">›</span>
              <span>{h}</span>
            </li>
          ))}
        </ul>
      </div>

      <a
        href="https://github.com/UtkarshJoshiNtl/Astrosis"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-10 inline-flex items-center gap-2 px-4 py-3 bg-amber text-primary-foreground font-mono text-xs uppercase tracking-[0.15em] hover:opacity-90 transition-opacity"
      >
        View on GitHub <ExternalLink className="w-4 h-4" />
      </a>
    </PanelShell>
  );
}
