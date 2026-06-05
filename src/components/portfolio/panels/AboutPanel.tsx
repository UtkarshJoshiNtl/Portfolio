import { PanelShell } from "../PanelShell";

export function AboutPanel({ onClose }: { onClose: () => void }) {
  return (
    <PanelShell id="about" onClose={onClose}>
      <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber">About</div>
      <h2 className="mt-2 text-3xl md:text-5xl font-semibold">Utkarsh Joshi</h2>

      <div className="mt-6">
        <img
          src="/avatar.jpg"
          alt="Utkarsh Joshi"
          width={160}
          height={160}
          className="w-32 h-32 md:w-40 md:h-40 object-cover grayscale hover:grayscale-0 transition-all duration-500"
        />
      </div>

      <div className="mt-6 space-y-5 text-foreground/90 leading-relaxed max-w-3xl">
        <p>
          Started with hardware in 2020 — CPU overclocking, tech YouTube, the AMD Ryzen livestream
          where they beat Intel in single-core for the first time. I wanted to understand what a
          computer was actually doing, so I moved up the stack until I hit the bottom. That's where
          I stayed.
        </p>
        <p>
          Astrosis went through four lives — React frontend → CLI → TUI → CUDA. Each rewrite taught
          me that performance isn't an afterthought, it's the design. Some projects you build to
          ship, some you build to see how fast you can make something go.
        </p>
        <p>
          I work in C, C++, CUDA, and Python. I also use Blender, FL Studio, and whatever else lets
          me build things that didn't exist before.
        </p>
      </div>

      <div className="mt-8">
        <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber mb-3">
          Education
        </div>
        <div className="border border-border p-5">
          <div className="font-semibold text-lg">Graphic Era Hill University, Bhimtal</div>
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
          {[
            "CS:APP (Computer Systems: A Programmer's Perspective)",
            "The Missing Semester (MIT)",
          ].map((item) => (
            <span
              key={item}
              className="font-mono text-[10px] uppercase tracking-[0.15em] px-2 py-1 border border-border text-muted-foreground"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-10 grid grid-cols-2 max-w-md font-mono text-xs">
        <div className="text-muted-foreground uppercase tracking-[0.15em]">Location</div>
        <div>Nainital, India</div>
        <div className="text-muted-foreground uppercase tracking-[0.15em] mt-2">Status</div>
        <div className="mt-2">Open to work & internships</div>
      </div>
    </PanelShell>
  );
}
