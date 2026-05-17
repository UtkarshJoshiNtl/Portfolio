import { useEffect, useState } from "react";

export interface CodeforcesStats {
  rating: number | null;
  maxRating: number | null;
  rank: string;
  maxRank: string;
  handle: string;
  loading: boolean;
  error: string | null;
}

export function useCodeforces(handle: string = "BakedRajma"): CodeforcesStats {
  const [stats, setStats] = useState<CodeforcesStats>({
    rating: null,
    maxRating: null,
    rank: "",
    maxRank: "",
    handle,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchCodeforcesStats = async () => {
      try {
        const res = await fetch(`/api/codeforces?handle=${encodeURIComponent(handle)}`);
        if (!res.ok) throw new Error("Failed to fetch Codeforces data");

        const user = await res.json();
        if (user.error) throw new Error(user.error);

        setStats({
          rating: user.rating ?? null,
          maxRating: user.maxRating ?? null,
          rank: user.rank ?? "unrated",
          maxRank: user.maxRank ?? "unrated",
          handle: user.handle ?? handle,
          loading: false,
          error: null,
        });
      } catch (err) {
        setStats((prev) => ({
          ...prev,
          loading: false,
          error: err instanceof Error ? err.message : "Unknown error",
        }));
      }
    };

    fetchCodeforcesStats();
  }, [handle]);

  return stats;
}
