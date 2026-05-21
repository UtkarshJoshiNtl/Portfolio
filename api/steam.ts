export default async function handler(
  req: { query: Record<string, string | string[]> },
  res: {
    setHeader: (k: string, v: string) => void;
    status: (c: number) => { json: (d: unknown) => void };
  },
) {
  const appids = req.query.appids as string;

  const url = `https://store.steampowered.com/api/appdetails?appids=${appids}`;
  const response = await fetch(url);
  const data = await response.json();

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.status(200).json(data);
}
