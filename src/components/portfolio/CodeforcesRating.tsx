"use client";

import { useEffect, useState } from "react";

interface CodeforcesUser {
  handle: string;
  rating: number | null;
  maxRating: number | null;
  rank: string | null;
  maxRank: string | null;
}

interface CodeforcesRatingProps {
  username?: string;
}

export function CodeforcesRating({ username = "BakedRajma" }: CodeforcesRatingProps) {
  const [user, setUser] = useState<CodeforcesUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchRating = async () => {
      try {
        const response = await fetch(`/api/codeforces?handle=${encodeURIComponent(username)}`);
        if (!response.ok) throw new Error("Failed to fetch Codeforces data");

        const data = await response.json();
        if (data.error) throw new Error(data.error);

        setUser({
          handle: data.handle,
          rating: data.rating,
          maxRating: data.maxRating,
          rank: data.rank,
          maxRank: data.maxRank,
        });
        setError(false);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchRating();
  }, [username]);

  if (loading) {
    return (
      <div className="flex flex-col gap-1">
        <div className="h-6 w-12 animate-pulse rounded bg-white/20" />
        <div className="text-xs text-white/50">Loading...</div>
      </div>
    );
  }

  if (error || user?.rating == null) {
    return (
      <div className="flex flex-col gap-1">
        <div className="text-sm font-medium text-white/70">Unavailable</div>
        <div className="text-xs text-white/50 uppercase tracking-[0.08em]">@{username}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      <div className="text-lg font-bold text-white">{user.rating}</div>
      <div className="text-xs text-white/60 uppercase tracking-[0.08em]">{user.rank ?? "Rated"}</div>
    </div>
  );
}
