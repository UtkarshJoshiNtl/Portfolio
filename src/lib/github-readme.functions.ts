export async function getGithubReadme({
  repo,
}: {
  repo: string;
}): Promise<{ html: string | null; error: string | null }> {
  try {
    const res = await fetch(`https://api.github.com/repos/${encodeURIComponent(repo)}/readme`, {
      headers: { Accept: "application/vnd.github.v3.html" },
    });
    if (!res.ok) return { html: null, error: `HTTP ${res.status}` };
    const html = await res.text();
    return { html, error: null };
  } catch (e) {
    return { html: null, error: e instanceof Error ? e.message : "fetch failed" };
  }
}
