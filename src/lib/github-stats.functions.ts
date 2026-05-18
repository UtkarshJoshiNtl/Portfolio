type Day = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };
type GHStats = {
  user: string;
  total: number;
  days: Day[];
  error: string | null;
};

export async function getGithubContributions({
  user,
}: {
  user: string;
}): Promise<GHStats> {
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(user)}?y=last`,
    );
    if (!res.ok) {
      return { user, total: 0, days: [], error: `HTTP ${res.status}` };
    }
    const json = (await res.json()) as {
      total: Record<string, number>;
      contributions: Day[];
    };
    const days = json.contributions.slice(-126);
    const total = Object.values(json.total).reduce((a, b) => a + b, 0);
    return { user, total, days, error: null };
  } catch (e) {
    return {
      user,
      total: 0,
      days: [],
      error: e instanceof Error ? e.message : "fetch failed",
    };
  }
}
