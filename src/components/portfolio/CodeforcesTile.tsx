import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Trophy } from "lucide-react";
import { getCodeforcesStats } from "@/lib/codeforces.functions";
import { links } from "@/lib/portfolio-data";

const RANK_COLOR: Record<string, string> = {
  newbie: "text-gray-400",
  pupil: "text-green-400",
  specialist: "text-cyan-400",
  expert: "text-blue-400",
  "candidate master": "text-purple-400",
  master: "text-orange-400",
  "international master": "text-orange-400",
  grandmaster: "text-red-400",
  "international grandmaster": "text-red-400",
  "legendary grandmaster": "text-red-400",
};

export function CodeforcesTile() {
  const fn = useServerFn(getCodeforcesStats);
  const { data } = useQuery({
    queryKey: ["cf", links.codeforcesHandle],
    queryFn: () => fn({ data: { handle: links.codeforcesHandle } }),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const rank = data?.rank ?? "";
  const color = RANK_COLOR[rank?.toLowerCase() ?? ""] ?? "text-amber";

  return (
    <a
      href={links.codeforces}
      target="_blank"
      rel="noopener noreferrer"
      className="block h-full group bg-tile-alt border border-transparent hover:border-amber transition-colors p-5 relative overflow-hidden flex flex-col"
    >
      <div className="flex items-center gap-2">
        <Trophy className="w-4 h-4 text-amber" />
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-amber">
          Codeforces
        </span>
      </div>

      <div className="mt-auto">
        <div className={`font-mono text-4xl md:text-5xl font-semibold tabular-nums leading-none ${color}`}>
          {data?.rating ?? "—"}
        </div>
        <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
          {rank ?? ""}
        </div>
      </div>
    </a>
  );
}
