import { NextResponse } from "next/server";

const CODEFORCES_HANDLE = "BakedRajma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const handle = searchParams.get("handle") ?? CODEFORCES_HANDLE;

  try {
    const response = await fetch(
      `https://codeforces.com/api/user.info?handles=${encodeURIComponent(handle)}`,
      { next: { revalidate: 3600 } },
    );

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch Codeforces data" }, { status: response.status });
    }

    const data = (await response.json()) as {
      status: string;
      result?: {
        handle: string;
        rating?: number;
        maxRating?: number;
        rank?: string;
        maxRank?: string;
      }[];
    };

    if (data.status !== "OK" || !data.result?.[0]) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const user = data.result[0];

    return NextResponse.json({
      handle: user.handle,
      rating: user.rating ?? null,
      maxRating: user.maxRating ?? null,
      rank: user.rank ?? null,
      maxRank: user.maxRank ?? null,
    });
  } catch {
    return NextResponse.json({ error: "Failed to fetch Codeforces data" }, { status: 500 });
  }
}
