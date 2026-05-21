export default async function handler(
  req: { query: Record<string, string | string[]> },
  res: {
    setHeader: (k: string, v: string) => void;
    status: (c: number) => { json: (d: unknown) => void };
  },
) {
  const term = req.query.term as string;
  const entity = (req.query.entity as string) ?? "song";
  const limit = (req.query.limit as string) ?? "5";

  const url = `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&entity=${entity}&limit=${limit}`;
  const response = await fetch(url);
  const data = await response.json();

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.status(200).json(data);
}
