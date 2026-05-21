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
    const results = await Promise.allSettled(
      games.map(async (g) => {
        const res = await fetch(`/api/steam?appids=${g.id}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = (await res.json()) as Record<
          string,
          { success: boolean; data?: { name: string; header_image: string } }
        >;
        const entry = json[String(g.id)];
        if (!entry?.success || !entry.data?.header_image) throw new Error("no data");
        return {
          id: g.id,
          title: g.name,
          artist: g.dev,
          imageUrl: entry.data.header_image,
        } as Artwork;
      }),
    );

    const items: Artwork[] = [];
    for (const r of results) {
      if (r.status === "fulfilled") items.push(r.value);
    }

    if (!items.length) return { items: [], error: "no artwork could be fetched" };

    cache = { at: now, data: items };
    return { items, error: null };
  } catch (e) {
    return { items: [], error: e instanceof Error ? e.message : "fetch failed" };
  }
}
