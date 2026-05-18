import { techStack } from "@/lib/portfolio-data";

// Single-character or short symbol for each tech. Calmer than a marquee.
const SYMBOL: Record<string, string> = {
  C: "C",
  "C++": "++",
  CUDA: "▣",
  Python: "py",
  OpenGL: "◇",
  NumPy: "Σ",
  PyGame: "▶",
  POSIX: "$",
  Bash: ">_",
  Linux: "🐧",
  OpenMP: "‖",
  Git: "⎇",
};

export function TechStackBar() {
  return (
    <div className="relative bg-tile-alt border border-transparent hover:border-amber transition-colors h-[72px] flex items-center px-4 group overflow-hidden">
      <div className="absolute left-4 top-2 font-mono text-[10px] uppercase tracking-[0.2em] text-amber pointer-events-none">
        Tech Stack
      </div>
      <div className="mt-6 flex flex-wrap gap-1.5 w-full">
        {techStack.map((t) => (
          <div
            key={t}
            className="flex items-center gap-1.5 px-2 py-1 border border-border bg-tile font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground hover:text-amber hover:border-amber transition-colors"
            title={t}
          >
            <span className="text-amber text-[11px] font-semibold leading-none">
              {SYMBOL[t] ?? t.charAt(0)}
            </span>
            <span>{t}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
