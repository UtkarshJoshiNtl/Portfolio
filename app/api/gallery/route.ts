import { NextResponse } from "next/server";

interface ArticArtwork {
  id: number;
  title: string;
  artist_display: string;
  image_id: string | null;
}

export async function GET() {
  try {
    const response = await fetch(
      "https://api.artic.edu/api/v1/artworks/search?q=painting&fields=id,title,artist_display,image_id&limit=12",
      { next: { revalidate: 86400 } },
    );

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch gallery" }, { status: response.status });
    }

    const data = (await response.json()) as { data?: ArticArtwork[] };
    const artworks = (data.data ?? []).filter((a) => a.image_id);

    const items = artworks.map((a) => ({
      id: a.id,
      title: a.title,
      artist: a.artist_display || "Unknown artist",
      imageUrl: `https://www.artic.edu/iiif/2/${a.image_id}/full/843,/0/default.jpg`,
    }));

    return NextResponse.json({ items });
  } catch {
    return NextResponse.json({ error: "Failed to fetch gallery" }, { status: 500 });
  }
}
