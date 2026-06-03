import { PanelShell } from "../PanelShell";

export function AboutPanel({ onClose }: { onClose: () => void }) {
  return (
    <PanelShell id="about" onClose={onClose}>
      <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber">About</div>
      <h2 className="mt-2 text-3xl md:text-5xl font-semibold">Utkarsh Joshi</h2>

      <div className="mt-8 space-y-5 text-foreground/90 leading-relaxed max-w-3xl">
        <p>
          First-year undergraduate building high-performance systems, simulators, and GPU software.
          I write C, C++, CUDA, and Python — from scratch, no wrappers.
        </p>
      </div>

      <div className="mt-8">
        <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber mb-3">
          Education
        </div>
        <div className="border border-border p-5">
          <div className="font-semibold text-lg">Graphic Era Hill University, Dehradun</div>
          <div className="font-mono text-xs text-muted-foreground mt-1">
            B.Tech in Computer Science & Engineering
          </div>
          <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-amber mt-2">
            First Year
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber mb-3">
          Currently Reading / Learning
        </div>
        <div className="flex flex-wrap gap-2">
          {["GPU Gems 3", "Computer Graphics: Principles", "PBRT", "Real-Time Rendering"].map(
            (item) => (
              <span
                key={item}
                className="font-mono text-[10px] uppercase tracking-[0.15em] px-2 py-1 border border-border text-muted-foreground"
              >
                {item}
              </span>
            ),
          )}
        </div>
      </div>

      <div className="mt-10 grid grid-cols-2 max-w-md font-mono text-xs">
        <div className="text-muted-foreground uppercase tracking-[0.15em]">Location</div>
        <div>India</div>
        <div className="text-muted-foreground uppercase tracking-[0.15em] mt-2">Status</div>
        <div className="mt-2">First year, actively building</div>
      </div>
    </PanelShell>
  );
}
