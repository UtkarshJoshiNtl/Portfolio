import { createServerFn } from "@tanstack/react-start";

type Artwork = {
  id: number;
  title: string;
  artist: string | null;
  imageUrl: string; // base64 data URL — no CORS issue
};

let cache: { at: number; data: Artwork[] } | null = null;
const TTL_MS = 5 * 60 * 1000;

async function fetchImageAsBase64(url: string): Promise<string | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const buffer = await res.arrayBuffer();
    const base64 = Buffer.from(buffer).toString("base64");
    const contentType = res.headers.get("content-type") ?? "image/jpeg";
    return `data:${contentType};base64,${base64}`;
  } catch {
    return null;
  }
}

export const getRandomArt = createServerFn({ method: "GET" }).handler(
  async (): Promise<{ items: Artwork[]; error: string | null }> => {
    const now = Date.now();
    if (cache && now - cache.at < TTL_MS) {
      return { items: cache.data, error: null };
    }
    try {
      const page = 1 + Math.floor(Math.random() * 20);
      const res = await fetch(
        `https://api.artic.edu/api/v1/artworks?fields=id,title,artist_title,image_id&limit=24&page=${page}`,
      );
      if (!res.ok) return { items: [], error: `HTTP ${res.status}` };
      const json = (await res.json()) as {
        data: Array<{
          id: number;
          title: string;
          artist_title: string | null;
          image_id: string | null;
        }>;
        config: { iiif_url: string };
      };
      const base = json.config.iiif_url;
      const withImages = json.data.filter((d): d is typeof d & { image_id: string } => !!d.image_id);

      const items = (await Promise.all(
        withImages.slice(0, 8).map(async (d) => {
          const url = `${base}/${d.image_id}/full/843,/0/default.jpg`;
          const dataUrl = await fetchImageAsBase64(url);
          return dataUrl
            ? { id: d.id, title: d.title, artist: d.artist_title, imageUrl: dataUrl }
            : null;
        }),
      )).filter(Boolean) as Artwork[];

      cache = { at: now, data: items };
      return { items, error: null };
    } catch (e) {
      return { items: [], error: e instanceof Error ? e.message : "fetch failed" };
    }
  },
);
