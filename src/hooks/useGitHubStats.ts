import { useEffect, useState } from "react";

interface GitHubStats {
  publicRepos: number;
  followers: number;
  following: number;
  totalStars: number;
  loading: boolean;
  error: string | null;
}

export function useGitHubStats(): GitHubStats {
  const [stats, setStats] = useState<GitHubStats>({
    publicRepos: 0,
    followers: 0,
    following: 0,
    totalStars: 0,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        const res = await fetch("/api/github/stats");
        if (!res.ok) throw new Error("Failed to fetch GitHub user data");

        const data = await res.json();

        setStats({
          publicRepos: data.publicRepos ?? 0,
          followers: data.followers ?? 0,
          following: data.following ?? 0,
          totalStars: data.totalStars ?? 0,
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

    fetchGitHubStats();
  }, []);

  return stats;
}
