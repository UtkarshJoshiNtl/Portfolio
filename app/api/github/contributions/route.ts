import { NextResponse } from "next/server";

const GITHUB_USERNAME = "UtkarshJoshiNtl";

export async function GET() {
  try {
    const response = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`,
      { next: { revalidate: 3600 } },
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch GitHub contributions" },
        { status: response.status },
      );
    }

    const data = (await response.json()) as {
      contributions?: { date: string; count: number }[];
      total?: Record<string, number>;
    };

    const contributions = data.contributions ?? [];

    return NextResponse.json({ contributions, username: GITHUB_USERNAME });
  } catch {
    return NextResponse.json({ error: "Failed to fetch GitHub contributions" }, { status: 500 });
  }
}
