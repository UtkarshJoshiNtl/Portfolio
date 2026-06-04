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
          width={96}
          height={96}
          className="w-24 h-24 object-cover grayscale hover:grayscale-0 transition-all duration-500"
        />
      </div>

      <div className="mt-6 space-y-5 text-foreground/90 leading-relaxed max-w-3xl">
        <p>
          I've had a laptop since childhood — probably more screen time than anyone I know. That
          machine was my window into how things work, and I never stopped pulling them apart. In
          2020 I fell into the hardware rabbit hole: tech YouTube, CPU overclocking, the Ryzen
          comeback live stream where AMD beat Intel in single-core for the first time. I wanted to
          be part of that world.
        </p>
        <p>
          Astrosis started as an autonomous constellation manager at the NSH hackathon (IIT Delhi).
          It went through four lives — React frontend → CLI → TUI → CUDA. Each rewrite taught me
          something about where the bottleneck really was. That project is the clearest picture of
          how I think: find the system, find the limit, push past it.
        </p>
        <p>
          I build from first principles — C, C++, CUDA, no wrappers. Self-taught in Blender, FL
          Studio, and how to make things flow.
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
        <div className="mt-2">First year, open to internships</div>
      </div>
    </PanelShell>
  );
}
