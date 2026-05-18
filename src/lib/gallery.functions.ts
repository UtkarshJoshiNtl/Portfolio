import { createServerFn } from "@tanstack/react-start";

type Artwork = {
  id: number;
  title: string;
  artist: string | null;
  imageId: string;
  iiifUrl: string;
};

let cache: { at: number; data: Artwork[] } | null = null;
const TTL_MS = 5 * 60 * 1000;

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
      const items: Artwork[] = json.data
        .filter((d): d is typeof d & { image_id: string } => !!d.image_id)
        .map((d) => ({
          id: d.id,
          title: d.title,
          artist: d.artist_title,
          imageId: d.image_id,
          iiifUrl: `${base}/${d.image_id}/full/843,/0/default.jpg`,
        }));
      cache = { at: now, data: items };
      return { items, error: null };
    } catch (e) {
      return { items: [], error: e instanceof Error ? e.message : "fetch failed" };
    }
  },
);

// Proxy image through server to bypass CORS on IIIF
export const getProxyImageUrl = createServerFn({ method: "GET" })
  .inputValidator((input: { url: string }) => input)
  .handler(async ({ data }): Promise<{ dataUrl: string | null; error: string | null }> => {
    try {
      const res = await fetch(data.url);
      if (!res.ok) return { dataUrl: null, error: `HTTP ${res.status}` };
      const buffer = await res.arrayBuffer();
      const base64 = Buffer.from(buffer).toString("base64");
      const contentType = res.headers.get("content-type") ?? "image/jpeg";
      return { dataUrl: `data:${contentType};base64,${base64}`, error: null };
    } catch (e) {
      return { dataUrl: null, error: e instanceof Error ? e.message : "fetch failed" };
    }
  });
