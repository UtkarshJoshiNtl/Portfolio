import { useEffect, useState } from "react";

export interface GitHubRepo {
  stargazers_count?: number;
}

interface GitHubStats {
  publicRepos: number;
  followers: number;
  following: number;
  totalStars: number;
  loading: boolean;
  error: string | null;
}

export function useGitHubStats(username: string = "UtkarshJoshiNtl"): GitHubStats {
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
        // Fetch user data
        const userRes = await fetch(`https://api.github.com/users/${username}`, {
          headers: {
            Accept: "application/vnd.github.v3+json",
          },
        });

        if (!userRes.ok) throw new Error("Failed to fetch GitHub user data");

        const userData = await userRes.json();

        // Fetch public repos to calculate total stars
        const reposRes = await fetch(
          `https://api.github.com/users/${username}/repos?per_page=100`,
          {
            headers: {
              Accept: "application/vnd.github.v3+json",
            },
          },
        );

        let totalStars = 0;
        if (reposRes.ok) {
          const repos = (await reposRes.json()) as GitHubRepo[];
          totalStars = repos.reduce(
            (sum: number, repo: GitHubRepo) => sum + (repo.stargazers_count || 0),
            0,
          );
        }

        setStats({
          publicRepos: userData.public_repos || 0,
          followers: userData.followers || 0,
          following: userData.following || 0,
          totalStars,
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
  }, [username]);

  return stats;
}
