import { useQuery } from "@tanstack/react-query";
import { Trophy } from "lucide-react";
import { getCodeforcesAll } from "@/lib/codeforces.functions";
import { links } from "@/lib/portfolio-data";

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
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="cfGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-amber)" stopOpacity="0.4" />
          <stop offset="100%" stopColor="var(--color-amber)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={areaPoints} fill="url(#cfGrad)" />
      <polyline
        points={points.join(" ")}
        fill="none"
        stroke="var(--color-amber)"
        strokeWidth="1.5"
      />
      <circle cx={lastX} cy={lastY} r="2.5" fill="var(--color-amber)" />
    </svg>
  );
}

export function CodeforcesTile({ onClick }: { onClick?: () => void }) {
  const { data } = useQuery({
    queryKey: ["cf-all", links.codeforcesHandle],
    queryFn: () => getCodeforcesAll({ handle: links.codeforcesHandle }),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const ratings = data?.ratings ?? [];

  const Wrapper = onClick ? "button" : "a";
  const wrapperProps = onClick
    ? { onClick, className: "block h-full w-full text-left" as const }
    : {
        href: links.codeforces,
        target: "_blank" as const,
        rel: "noopener noreferrer" as const,
        className: "block h-full" as const,
      };

  return (
    <Wrapper {...wrapperProps}>
      <div className="h-full group bg-tile-alt bg-pattern-grid border border-transparent hover:border-amber transition-colors p-5 relative overflow-hidden flex flex-col">
        {ratings.length >= 2 && <RatingChart ratings={ratings} />}

        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-amber" />
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-amber">
            Codeforces
          </span>
        </div>

        <div className="mt-auto">
          <div className="font-mono text-sm text-muted-foreground">@{links.codeforcesHandle}</div>
        </div>
      </div>
    </Wrapper>
  );
}
