import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Github } from "lucide-react";
import { getGithubContributions } from "@/lib/github-stats.functions";
import { links } from "@/lib/portfolio-data";

const LEVEL_VAR = [
  "var(--gh-cell-0)",
  "var(--gh-cell-1)",
  "var(--gh-cell-2)",
  "var(--gh-cell-3)",
  "var(--gh-cell-4)",
];

export function GithubStatsTile() {
  const fn = useServerFn(getGithubContributions);
  const { data } = useQuery({
    queryKey: ["gh", links.githubUser],
    queryFn: () => fn({ data: { user: links.githubUser } }),
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  // Take last 70 days = 10 weeks of 7 days. Calmer than full year.
  const allDays = data?.days ?? [];
  const days = allDays.slice(-70);
  const cols: typeof days[] = [];
  for (let i = 0; i < days.length; i += 7) cols.push(days.slice(i, i + 7));

  return (
    <a
      href={links.github}
      target="_blank"
      rel="noopener noreferrer"
      className="block h-full group bg-tile border border-transparent hover:border-amber transition-colors p-5 relative overflow-hidden"
    >
      <div className="flex items-center gap-2">
        <Github className="w-4 h-4 text-amber" />
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-amber">
          GitHub
        </span>
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <span className="font-mono text-2xl font-semibold text-foreground tabular-nums">
          {data?.total ?? "—"}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
          contributions · 1y
        </span>
      </div>

      <div className="mt-3 flex gap-[3px]">
        {cols.map((col, ci) => (
          <div key={ci} className="flex flex-col gap-[3px]">
            {col.map((d) => (
              <div
                key={d.date}
                title={`${d.date}: ${d.count}`}
                className="w-2.5 h-2.5"
                style={{ backgroundColor: LEVEL_VAR[d.level] }}
              />
            ))}
          </div>
        ))}
      </div>
    </a>
  );
}
