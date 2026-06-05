import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
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

export function GithubStatsTile({ onClick }: { onClick?: () => void }) {
  const { data } = useQuery({
    queryKey: ["gh", links.githubUser],
    queryFn: () => getGithubContributions({ user: links.githubUser }),
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const allDays = Array.isArray(data?.days) ? data.days : [];
  const days = allDays.slice(-126);
  const cols: (typeof days)[] = [];
  for (let i = 0; i < days.length; i += 7) cols.push(days.slice(i, i + 7));

  const Wrapper = onClick ? "button" : "a";
  const wrapperProps = onClick
    ? { onClick, className: "block h-full w-full text-left" as const }
    : {
        href: links.github,
        target: "_blank" as const,
        rel: "noopener noreferrer" as const,
        className: "block h-full" as const,
      };

  return (
    <Wrapper {...wrapperProps}>
      <motion.div
        className="h-full group bg-tile-alt hover:bg-tile transition-all duration-300 bg-pattern-dots p-5 relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-2">
          <Github className="w-4 h-4 text-amber" />
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-amber">
            GitHub
          </span>
        </div>

        <div className="mt-3 flex items-baseline gap-4 flex-wrap">
          <div>
            <motion.span
              className="font-mono text-2xl font-semibold text-foreground tabular-nums"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              {data?.total ?? "—"}
            </motion.span>
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground ml-1">
              contributions
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-amber ml-1">
              in the past year
            </span>
          </div>
          {data?.currentStreak != null && data.currentStreak > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <span className="font-mono text-xl font-semibold text-amber tabular-nums">
                {data.currentStreak}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground ml-1">
                day streak
              </span>
            </motion.div>
          )}
        </div>

        <motion.div
          className="mt-3 flex gap-[3px]"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.003 } },
          }}
        >
          {cols.map((col, ci) => (
            <div key={ci} className="flex flex-col gap-[3px]">
              {col.map((d, di) => (
                <motion.div
                  key={d.date}
                  title={`${d.date}: ${d.count}`}
                  className="w-3 h-3"
                  style={{ backgroundColor: LEVEL_VAR[d.level] }}
                  variants={{
                    hidden: { opacity: 0, scale: 0 },
                    visible: { opacity: 1, scale: 1 },
                  }}
                  whileHover={{ scale: 1.8, zIndex: 10, transition: { duration: 0.15 } }}
                />
              ))}
            </div>
          ))}
        </motion.div>
      </motion.div>
    </Wrapper>
  );
}
