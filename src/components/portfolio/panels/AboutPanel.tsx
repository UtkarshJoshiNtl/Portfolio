import { PanelShell } from "../PanelShell";

export function AboutPanel({ onClose }: { onClose: () => void }) {
  return (
    <PanelShell id="about" onClose={onClose}>
      <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber">About</div>
      <h2 className="mt-2 text-3xl md:text-5xl font-semibold">Utkarsh Joshi</h2>

      <div className="mt-8 space-y-5 text-foreground/90 leading-relaxed max-w-3xl">
        <p>
          I am a first-year computer science undergraduate drawn to high-performance computing, GPU
          work, simulation, and low-level systems. The common thread is simple: I like making
          technically interesting things fast, understandable, and real.
        </p>
        <p>
          The projects range from C tooling and shells to simulation experiments and CUDA kernels.
          Astrosis is one proof point, not the whole identity: the broader obsession is performance,
          graphics, systems, and cool builds that force me to learn the machinery underneath.
        </p>
        <p>
          Currently deepening CUDA, OpenGL, C++, Linux tooling, and parallel computing while keeping
          the work concrete enough that someone can inspect it quickly.
        </p>
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
