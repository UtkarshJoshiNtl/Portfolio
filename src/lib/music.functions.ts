import { songs } from "@/lib/portfolio-data";

type Track = {
  id: number;
  title: string;
  artist: string;
  album: string;
  previewUrl: string;
  artworkUrl: string;
};

let cache: { at: number; data: Track[] } | null = null;
const TTL_MS = 60 * 60 * 1000;

export async function getCuratedTracks(): Promise<{
  items: Track[];
  error: string | null;
}> {
  const now = Date.now();
  if (cache && now - cache.at < TTL_MS) {
    return { items: cache.data, error: null };
  }
  try {
    const results = await Promise.allSettled(
      songs.map(async (s) => {
        const term = encodeURIComponent(`${s.artist} ${s.track}`);
        const res = await fetch(
          `https://itunes.apple.com/search?term=${term}&entity=song&limit=5`,
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = (await res.json()) as {
          results: Array<{
            trackId: number;
            trackName: string;
            artistName: string;
            collectionName: string;
            previewUrl?: string;
            artworkUrl100?: string;
          }>;
        };
        const match = json.results.find(
          (r) =>
            r.previewUrl &&
            r.artistName.toLowerCase() === s.artist.toLowerCase() &&
            r.collectionName?.toLowerCase().includes(s.album.toLowerCase()),
        );
        if (!match) throw new Error("no matching track found");
        return {
          id: match.trackId,
          title: match.trackName,
          artist: match.artistName,
          album: match.collectionName,
          previewUrl: match.previewUrl!,
          artworkUrl: (match.artworkUrl100 ?? "").replace("100x100", "600x600"),
        } as Track;
      }),
    );

    const items: Track[] = [];
    for (const r of results) {
      if (r.status === "fulfilled") items.push(r.value);
    }

    if (!items.length) return { items: [], error: "no tracks could be fetched" };

    cache = { at: now, data: items };
    return { items, error: null };
  } catch (e) {
    return { items: [], error: e instanceof Error ? e.message : "fetch failed" };
  }
}
