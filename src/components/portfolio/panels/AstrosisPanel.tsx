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
        GPU-Accelerated Orbital Propagation and Conjunction Analysis Engine
      </p>

      <div className="mt-5 flex flex-wrap gap-2 font-mono text-[11px]">
        {["Python", "C++", "CUDA", "RK4", "SGP4", "pybind11", "OpenMP"].map((t) => (
          <span key={t} className="px-2 py-1 border border-border text-muted-foreground">
            {t}
          </span>
        ))}
      </div>

      <p className="mt-8 leading-relaxed text-foreground/90">
        I built Astrosis because I wanted to see if I could make orbital mechanics fast enough to be
        useful. It started as an autonomous constellation manager at the NSH hackathon (IIT Delhi) —
        50 satellites calculating their own delta-v and fuel burn to maneuver in LEO. I stripped it
        down, rewrote it four times (React → CLI → TUI → CUDA), and pushed the bottleneck from
        Python to C++ to parallel compute. Each version taught me where the system actually slows
        down.
      </p>
      <p className="mt-4 leading-relaxed text-foreground/90">
        High-fidelity orbital mechanics engine built from first principles. Implements RK4 numerical
        integration with J2, J3, and J4 gravity harmonics, US Standard Atmosphere 1976 drag model
        with Earth-rotation correction, solar radiation pressure with cylindrical shadow modeling,
        and lunisolar third-body effects. Multi-backend architecture with automatic selection
        between CUDA GPU, C++/OpenMP, NumPy, and pure Python.
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
