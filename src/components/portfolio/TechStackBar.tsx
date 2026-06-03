import { techStack } from "@/lib/portfolio-data";

const LANGUAGES = techStack.filter((t) => ["C", "C++", "Python"].includes(t));
const TOOLS = techStack.filter((t) => ["Git", "CMake"].includes(t));
const TECHNOLOGIES = techStack.filter((t) => !["C", "C++", "Python", "Git", "CMake"].includes(t));

const categories = [
  { label: "Languages", items: LANGUAGES },
  { label: "Tools", items: TOOLS },
  { label: "Technologies", items: TECHNOLOGIES },
];

export function TechStackBar() {
  return (
    <div className="relative bg-tile-alt border border-transparent hover:border-amber transition-colors group overflow-hidden">
      <div className="px-4 pt-3 pb-2 flex gap-6 md:gap-10">
        {categories.map((cat) => (
          <div key={cat.label} className="flex flex-col gap-1.5">
            <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-amber">
              {cat.label}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {cat.items.map((t) => (
                <span
                  key={t}
                  className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground hover:text-amber transition-colors"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
