import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Trophy } from "lucide-react";
import { getCodeforcesStats } from "@/lib/codeforces.functions";
import { links } from "@/lib/portfolio-data";

export function CodeforcesTile() {
  const fn = useServerFn(getCodeforcesStats);
  const { data } = useQuery({
    queryKey: ["cf", links.codeforcesHandle],
    queryFn: () => fn({ data: { handle: links.codeforcesHandle } }),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  return (
    <a
      href={links.codeforces}
      target="_blank"
      rel="noopener noreferrer"
      className="block h-full group bg-tile-alt border border-transparent hover:border-amber transition-colors p-5 relative overflow-hidden"
    >
      <div className="flex items-center gap-2">
        <Trophy className="w-4 h-4 text-amber" />
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-amber">
          Codeforces
        </span>
      </div>

      <div className="mt-auto absolute bottom-4 left-5 right-5">
        <div className="font-mono text-4xl md:text-5xl font-semibold text-amber tabular-nums leading-none">
          {data?.rating ?? "—"}
        </div>
        <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
          @{links.codeforcesHandle} · max {data?.maxRating ?? "—"}
        </div>
      </div>
    </a>
  );
}
