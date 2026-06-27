import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ExternalLink, ChevronDown, Loader2 } from "lucide-react";
import { PanelShell } from "../PanelShell";
import { projects } from "@/lib/portfolio-data";
import { getGithubReadme } from "@/lib/github-readme.functions";

const project = projects.find((p) => p.name === "Current")!;

const benchmarks = [
  ["Operation", "ShardedMutex", "TimedEvict", "SlotMap"],
  ["Insert (1 thread)", "85 ns", "62 ns", "38 ns"],
  ["Lookup (1 thread)", "42 ns", "38 ns", "22 ns"],
  ["Insert (8 threads)", "320 ns", "890 ns", "145 ns"],
  ["Lookup (8 threads)", "180 ns", "410 ns", "68 ns"],
];

const implementations = [
  {
    name: "ShardedMutexMap",
    desc: "N shards each with a std::mutex, per-shard eviction via std::deque. Best all-rounder for moderate contention.",
    color: "oklch(0.7 0.12 145)",
  },
  {
    name: "TimedEvictMap",
    desc: "Single global mutex + std::deque with lazy expiry on access. Lowest memory overhead, simplest correctness model.",
    color: "oklch(0.65 0.15 210)",
  },
  {
    name: "SlotMap",
    desc: "Lock-free slot allocator using atomic CAS (compare-and-swap) with a free-list. Highest throughput under low contention, no blocking on reads.",
    color: "oklch(0.65 0.2 345)",
  },
];

export function CurrentPanel({ onClose }: { onClose: () => void }) {
  const [showReadme, setShowReadme] = useState(false);
  const { data: readme } = useQuery({
    queryKey: ["readme", project.repo],
    queryFn: () => getGithubReadme({ repo: project.repo }),
    enabled: showReadme,
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  return (
    <PanelShell id="current" onClose={onClose}>
      <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber">Project</div>
      <h2 className="mt-2 text-4xl md:text-5xl font-semibold">Current</h2>
      <p className="mt-2 text-lg text-muted-foreground">Concurrent TTL-backed Hash Map — C++17 Performance Study</p>

      <div className="mt-5 flex flex-wrap gap-2 font-mono text-[11px]">
        {project.tech.map((t) => (
          <span key={t} className="px-2 py-1 border border-border text-muted-foreground">
            {t}
          </span>
        ))}
      </div>

      <p className="mt-8 leading-relaxed text-foreground/90">{project.description}</p>

      <div className="mt-8 grid md:grid-cols-3 gap-3">
        {implementations.map((impl) => (
          <div key={impl.name} className="border border-border p-4 relative">
            <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: impl.color }} />
            <div className="font-mono text-xs" style={{ color: impl.color }}>{impl.name}</div>
            <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{impl.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber mb-3">Benchmarks</div>
        <div className="overflow-x-auto border border-border">
          <table className="w-full font-mono text-xs">
            <tbody>
              {benchmarks.map((row, ri) => (
                <tr key={ri} className={ri === 0 ? "bg-tile-alt text-amber" : "border-t border-border"}>
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-3 py-2 whitespace-nowrap">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-10 border border-border">
        <button
          onClick={() => setShowReadme(!showReadme)}
          className="w-full flex items-center justify-between px-5 py-4 font-mono text-[11px] uppercase tracking-[0.15em] text-amber hover:bg-tile-alt transition-colors"
        >
          <span>GitHub README</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${showReadme ? "rotate-180" : ""}`} />
        </button>
        {showReadme && (
          <div className="border-t border-border px-5 py-6 bg-background/50">
            {readme?.html ? (
              <div className="prose prose-invert prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: readme.html }} />
            ) : readme?.error ? (
              <div className="font-mono text-xs text-muted-foreground">Could not load README: {readme.error}</div>
            ) : (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="font-mono text-xs">Loading README…</span>
              </div>
            )}
          </div>
        )}
      </div>

      <a
        href={project.github}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-10 inline-flex items-center gap-2 px-5 py-3 bg-amber text-primary-foreground font-mono text-xs uppercase tracking-[0.15em] hover:opacity-85 transition-all"
      >
        View on GitHub <ExternalLink className="w-4 h-4" />
      </a>
    </PanelShell>
  );
}
