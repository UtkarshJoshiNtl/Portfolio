import { games } from "@/lib/portfolio-data";

type Artwork = {
  id: number;
  title: string;
  artist: string | null;
  date: string | null;
  imageUrl: string;
};

let cache: { at: number; data: Artwork[] } | null = null;
const TTL_MS = 60 * 60 * 1000;

export async function getRandomArt(): Promise<{
  items: Artwork[];
  error: string | null;
}> {
  const now = Date.now();
  if (cache && now - cache.at < TTL_MS) {
    return { items: cache.data, error: null };
  }
  try {
    const res = await fetch(
      "https://api.artic.edu/api/v1/artworks?limit=25&fields=id,title,artist_display,date_display,image_id",
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = (await res.json()) as {
      data: Array<{
        id: number;
        title: string;
        artist_display: string;
        date_display: string;
        image_id: string;
      }>;
    };

    const items: Artwork[] = [];
    for (const art of json.data) {
      if (!art.image_id) continue;
      items.push({
        id: art.id,
        title: art.title,
        artist: art.artist_display ? art.artist_display.split("\n")[0].trim() : null,
        date: art.date_display ?? null,
        imageUrl: `https://www.artic.edu/iiif/2/${art.image_id}/full/843,/0/default.jpg`,
      });
    }

    if (!items.length) return { items: [], error: "no artworks could be fetched" };

    cache = { at: now, data: items };
    return { items, error: null };
  } catch (e) {
    return { items: [], error: e instanceof Error ? e.message : "fetch failed" };
  }
}
