import { games } from "@/lib/portfolio-data";

type Artwork = {
  id: number;
  title: string;
  artist: string | null;
  imageUrl: string;
};

let cache: { at: number; data: Artwork[] } | null = null;
const TTL_MS = 5 * 60 * 1000;

export async function getRandomArt(): Promise<{
  items: Artwork[];
  error: string | null;
}> {
  const now = Date.now();
  if (cache && now - cache.at < TTL_MS) {
    return { items: cache.data, error: null };
  }
  try {
    const ids = games.map((g) => g.id).join(",");
    const res = await fetch(
      `/api/steam?appids=${ids}`,
    );
    if (!res.ok) return { items: [], error: `HTTP ${res.status}` };
    const json = (await res.json()) as Record<
      string,
      { success: boolean; data?: { name: string; header_image: string } }
    >;

    const items: Artwork[] = [];
    for (const game of games) {
      const entry = json[String(game.id)];
      if (entry?.success && entry.data?.header_image) {
        items.push({
          id: game.id,
          title: game.name,
          artist: game.dev,
          imageUrl: entry.data.header_image,
        });
      }
    }

    cache = { at: now, data: items };
    return { items, error: null };
  } catch (e) {
    return { items: [], error: e instanceof Error ? e.message : "fetch failed" };
  }
}
