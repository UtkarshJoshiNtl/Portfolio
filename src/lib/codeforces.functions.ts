type CFStats = {
  handle: string;
  rating: number | null;
  maxRating: number | null;
  rank: string | null;
  maxRank: string | null;
  error: string | null;
};

let statsCache: { at: number; data: CFStats } | null = null;
const STATS_MIN_INTERVAL_MS = 2000;

export async function getCodeforcesStats({
  handle,
}: {
  handle: string;
}): Promise<CFStats> {
  const now = Date.now();
  if (
    statsCache &&
    now - statsCache.at < STATS_MIN_INTERVAL_MS &&
    statsCache.data.handle === handle
  ) {
    return statsCache.data;
  }
  try {
    const res = await fetch(
      `https://codeforces.com/api/user.info?handles=${encodeURIComponent(handle)}`,
    );
    if (!res.ok) {
      const fallback: CFStats = {
        handle,
        rating: null,
        maxRating: null,
        rank: null,
        maxRank: null,
        error: `HTTP ${res.status}`,
      };
      statsCache = { at: now, data: fallback };
      return fallback;
    }
    const json = (await res.json()) as {
      status: string;
      result?: Array<{
        handle: string;
        rating?: number;
        maxRating?: number;
        rank?: string;
        maxRank?: string;
      }>;
    };
    const u = json.result?.[0];
    const out: CFStats = {
      handle,
      rating: u?.rating ?? null,
      maxRating: u?.maxRating ?? null,
      rank: u?.rank ?? null,
      maxRank: u?.maxRank ?? null,
      error: null,
    };
    statsCache = { at: now, data: out };
    return out;
  } catch (e) {
    const fallback: CFStats = {
      handle,
      rating: null,
      maxRating: null,
      rank: null,
      maxRank: null,
      error: e instanceof Error ? e.message : "fetch failed",
    };
    statsCache = { at: now, data: fallback };
    return fallback;
  }
}

type RatingEntry = { rating: number };

let ratingCache: { at: number; data: RatingEntry[] } | null = null;

export async function getCodeforcesRatingHistory({
  handle,
}: {
  handle: string;
}): Promise<RatingEntry[]> {
  const now = Date.now();
  if (ratingCache && now - ratingCache.at < 60000) {
    return ratingCache.data;
  }
  try {
    const res = await fetch(
      `https://codeforces.com/api/user.rating?handle=${encodeURIComponent(handle)}`,
    );
    if (!res.ok) return [];
    const json = (await res.json()) as {
      status: string;
      result?: Array<{ newRating: number }>;
    };
    if (json.status !== "OK" || !json.result) return [];
    const data = json.result.map((r) => ({ rating: r.newRating }));
    ratingCache = { at: now, data };
    return data;
  } catch {
    return [];
  }
}
