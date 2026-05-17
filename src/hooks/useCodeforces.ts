import { useEffect, useState } from "react";

export interface CodeforcesStats {
  rating: number;
  maxRating: number;
  rank: string;
  maxRank: string;
  handle: string;
  loading: boolean;
  error: string | null;
}

export function useCodeforces(handle: string = "BakedRajma"): CodeforcesStats {
  const [stats, setStats] = useState<CodeforcesStats>({
    rating: 0,
    maxRating: 0,
    rank: "",
    maxRank: "",
    handle,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchCodeforcesStats = async () => {
      try {
        const res = await fetch(`https://codeforces.com/api/user.info?handles=${handle}`, {
          method: "GET",
        });

        if (!res.ok) throw new Error("Failed to fetch Codeforces data");

        const data = await res.json();

        if (!data.result || data.result.length === 0) {
          throw new Error("User not found");
        }

        const user = data.result[0];

        setStats({
          rating: user.rating || 0,
          maxRating: user.maxRating || 0,
          rank: user.rank || "unrated",
          maxRank: user.maxRank || "unrated",
          handle: user.handle || handle,
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
