type CFStats = {
  handle: string;
  rating: number | null;
  maxRating: number | null;
  rank: string | null;
  maxRank: string | null;
  error: string | null;
};

type RatingEntry = { rating: number };

let combinedCache: { at: number; data: { stats: CFStats; ratings: RatingEntry[] } } | null = null;
const STATS_MIN_INTERVAL_MS = 300_000;

export async function getCodeforcesAll({ handle }: { handle: string }): Promise<{
  stats: CFStats;
  ratings: RatingEntry[];
}> {
  const now = Date.now();
  if (
    combinedCache &&
    now - combinedCache.at < STATS_MIN_INTERVAL_MS &&
    combinedCache.data.stats.handle === handle
  ) {
    return combinedCache.data;
  }

  const [statsResult, ratingsResult] = await Promise.allSettled([
    fetch(`https://codeforces.com/api/user.info?handles=${encodeURIComponent(handle)}`),
    fetch(`https://codeforces.com/api/user.rating?handle=${encodeURIComponent(handle)}`),
  ]);

  let stats: CFStats;
  if (statsResult.status === "fulfilled" && statsResult.value.ok) {
    try {
      const json = (await statsResult.value.json()) as {
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
      stats = {
        handle,
        rating: u?.rating ?? null,
        maxRating: u?.maxRating ?? null,
        rank: u?.rank ?? null,
        maxRank: u?.maxRank ?? null,
        error: null,
      };
    } catch {
      stats = {
        handle,
        rating: null,
        maxRating: null,
        rank: null,
        maxRank: null,
        error: "parse failed",
      };
    }
  } else {
    stats = {
      handle,
      rating: null,
      maxRating: null,
      rank: null,
      maxRank: null,
      error: "HTTP error",
    };
  }

  let ratings: RatingEntry[] = [];
  if (ratingsResult.status === "fulfilled" && ratingsResult.value.ok) {
    try {
      const json = (await ratingsResult.value.json()) as {
        status: string;
        result?: Array<{ newRating: number }>;
      };
      if (json.status === "OK" && json.result) {
        ratings = json.result.map((r) => ({ rating: r.newRating }));
      }
    } catch {
      /* ignore */
    }
  }

  combinedCache = { at: now, data: { stats, ratings } };
  return { stats, ratings };
}
