import { PanelShell } from "../PanelShell";
import { astrosisHighlights, benchmarks } from "@/lib/portfolio-data";
import { ExternalLink } from "lucide-react";

const orbitPaths = [
  "M80 60C120 20 200 30 240 70C280 110 280 170 240 200C200 230 120 220 80 180",
  "M60 75C100 30 190 40 230 85C270 130 270 195 230 220C190 245 100 235 60 190",
  "M40 90C80 40 180 55 220 100C260 145 260 210 220 240C180 270 80 255 40 205",
];

export function AstrosisPanel({ onClose }: { onClose: () => void }) {
  return (
    <PanelShell id="astrosis" onClose={onClose}>
      <div className="relative">
        <div className="absolute -top-8 -right-8 w-72 h-72 pointer-events-none opacity-[0.04]" aria-hidden="true">
          <svg viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            {orbitPaths.map((d, i) => (
              <ellipse
                key={i}
                cx="150" cy="150"
                rx={80 + i * 20}
                ry={60 + i * 15}
                stroke="currentColor"
                strokeWidth="0.3"
                className="text-amber"
                transform={`rotate(${i * 15}, 150, 150)`}
              />
            ))}
            <circle cx="150" cy="150" r="3" fill="currentColor" className="text-amber" />
          </svg>
        </div>

        <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber">Featured Project</div>
        <h2 className="mt-2 text-4xl md:text-5xl font-semibold tracking-tight">Astrosis</h2>
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

        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <p className="leading-relaxed text-foreground/90">
            I built Astrosis because I wanted to see if I could make orbital mechanics fast enough to be
            useful. It started as an autonomous constellation manager at the NSH hackathon (IIT Delhi) —
            50 satellites calculating their own delta-v and fuel burn to maneuver in LEO. I stripped it
            down, rewrote it four times (React → CLI → TUI → CUDA), and pushed the bottleneck from
            Python to C++ to parallel compute.
          </p>
          <p className="leading-relaxed text-foreground/90">
            High-fidelity orbital mechanics engine built from first principles. Implements RK4 numerical
            integration with J2–J4 gravity harmonics, US Standard Atmosphere 1976 drag model with
            Earth-rotation correction, solar radiation pressure with cylindrical shadow modeling,
            and lunisolar third-body effects. Multi-backend: CUDA, C++/OpenMP, NumPy, pure Python.
          </p>
        </div>

        <div className="mt-10">
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber mb-3">Benchmarks</div>
          <div className="overflow-x-auto border border-border font-mono text-xs">
            <table className="w-full">
              <tbody>
                {benchmarks.map((row, ri) => (
                  <tr key={ri} className={ri === 0 ? "bg-tile-alt text-amber" : "border-t border-border"}>
                    {row.map((cell, ci) => (
                      <td key={ci} className={`px-4 py-2.5 whitespace-nowrap ${ri > 0 && ci === 0 ? "text-muted-foreground" : ""}`}>
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
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber mb-3">Technical Highlights</div>
          <ul className="space-y-2">
            {astrosisHighlights.map((h, i) => (
              <li key={i} className="flex gap-3 text-sm text-foreground/90">
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
          className="mt-10 inline-flex items-center gap-2 px-5 py-3 bg-amber text-primary-foreground font-mono text-xs uppercase tracking-[0.15em] hover:opacity-85 transition-all"
        >
          View on GitHub <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </PanelShell>
  );
}
