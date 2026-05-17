import { NextResponse } from "next/server";

const GITHUB_USERNAME = "UtkarshJoshiNtl";

export async function GET() {
  try {
    const userRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
      headers: { Accept: "application/vnd.github.v3+json" },
      next: { revalidate: 3600 },
    });

    if (!userRes.ok) {
      return NextResponse.json({ error: "Failed to fetch GitHub user data" }, { status: userRes.status });
    }

    const userData = await userRes.json();

    const reposRes = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
      {
        headers: { Accept: "application/vnd.github.v3+json" },
        next: { revalidate: 3600 },
      },
    );

    let totalStars = 0;
    if (reposRes.ok) {
      const repos = (await reposRes.json()) as { stargazers_count?: number }[];
      totalStars = repos.reduce((sum, repo) => sum + (repo.stargazers_count ?? 0), 0);
    }

    return NextResponse.json({
      publicRepos: userData.public_repos ?? 0,
      followers: userData.followers ?? 0,
      following: userData.following ?? 0,
      totalStars,
      username: GITHUB_USERNAME,
    });
  } catch {
    return NextResponse.json({ error: "Failed to fetch GitHub stats" }, { status: 500 });
  }
}
