import { useQuery } from "@tanstack/react-query";
import { Trophy } from "lucide-react";
import { getCodeforcesAll } from "@/lib/codeforces.functions";
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

function RatingChart({ ratings }: { ratings: Array<{ rating: number }> }) {
  if (ratings.length < 2) return null;

  const W = 200,
    H = 60,
    PAD = 4;
  const data = ratings.map((r) => r.rating);
  const min = Math.min(...data) - 50;
  const max = Math.max(...data) + 50;
  const range = max - min || 1;

  const points = data.map((v, i) => {
    const x = PAD + (i / (data.length - 1)) * (W - 2 * PAD);
    const y = H - PAD - ((v - min) / range) * (H - 2 * PAD);
    return `${x},${y}`;
  });

  const last = data[data.length - 1];
  const lastY = H - PAD - ((last - min) / range) * (H - 2 * PAD);
  const lastX = W - PAD;

  const areaPoints = [`${PAD},${H - PAD}`, ...points, `${lastX},${H - PAD}`].join(" ");

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="absolute bottom-0 left-0 right-0 w-full h-16 opacity-30"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="cfGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-amber)" stopOpacity="0.4" />
          <stop offset="100%" stopColor="var(--color-amber)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={areaPoints} fill="url(#cfGrad)" />
      <polyline points={points.join(" ")} fill="none" stroke="var(--color-amber)" strokeWidth="1.5" />
      <circle cx={lastX} cy={lastY} r="2.5" fill="var(--color-amber)" />
    </svg>
  );
}

export function CodeforcesTile() {
  const { data } = useQuery({
    queryKey: ["cf-all", links.codeforcesHandle],
    queryFn: () => getCodeforcesAll({ handle: links.codeforcesHandle }),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const stats = data?.stats;
  const ratings = data?.ratings ?? [];
  const rank = stats?.rank ?? "";
  const color = RANK_COLOR[rank?.toLowerCase() ?? ""] ?? "text-amber";

  return (
    <a
      href={links.codeforces}
      target="_blank"
      rel="noopener noreferrer"
      className="block h-full group bg-tile-alt bg-pattern-grid border border-transparent hover:border-amber transition-colors p-5 relative overflow-hidden flex flex-col"
    >
      {ratings.length >= 2 && <RatingChart ratings={ratings} />}

      <div className="flex items-center gap-2">
        <Trophy className="w-4 h-4 text-amber" />
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-amber">
          Codeforces
        </span>
      </div>

      <div className="mt-auto">
        <div className={`font-mono text-4xl md:text-5xl font-semibold tabular-nums leading-none ${color}`}>
          {stats?.rating ?? "—"}
        </div>
        <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
          {rank ?? ""}
        </div>
        {stats?.maxRating != null && (
          <div className="font-mono text-[9px] uppercase tracking-[0.15em] text-muted-foreground/60">
            peak: {stats.maxRating}
          </div>
        )}
      </div>
    </a>
  );
}
