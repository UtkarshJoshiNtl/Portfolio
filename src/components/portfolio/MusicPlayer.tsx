import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Headphones } from "lucide-react";
import { getCuratedTracks } from "@/lib/music.functions";

export function MusicPlayer() {
  const { data } = useQuery({
    queryKey: ["music-curated"],
    queryFn: () => getCuratedTracks(),
    staleTime: 60 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
  const tracks = data?.items ?? [];

  const [idx, setIdx] = useState(0);
  const current = tracks[idx];

  useEffect(() => {
    if (!tracks.length) return;
    const t = setInterval(() => setIdx((v) => (v + 1) % tracks.length), 7000);
    return () => clearInterval(t);
  }, [tracks.length]);

  return (
    <div className="h-full bg-tile-purple bg-pattern-waves border border-transparent hover:border-amber transition-colors p-5 relative overflow-hidden flex flex-col">
      {/* Spinning vinyl record */}
      <div className="absolute inset-0 flex items-center justify-center opacity-30 md:opacity-40">
        <div className="relative w-28 h-28 md:w-36 md:h-36">
          <div
            className="absolute inset-0 rounded-full animate-spin-slow"
            style={{
              background:
                "repeating-radial-gradient(circle at center, #111 0px, #111 2px, #1a1a1a 2px, #1a1a1a 4px)",
              boxShadow: "0 0 40px rgba(0,0,0,0.6)",
            }}
          >
            <div className="absolute inset-3 rounded-full border border-gray-800" />
            <div className="absolute inset-6 rounded-full border border-gray-800" />
            <div className="absolute inset-9 rounded-full border border-gray-800" />
          </div>
          <div className="absolute inset-[30%] rounded-full overflow-hidden border-2 border-white/10 shadow-lg">
            {current?.artworkUrl && (
              <img src={current.artworkUrl} alt="" className="w-full h-full object-cover" />
            )}
          </div>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
      <div className="relative z-10 flex items-center gap-2">
        <Headphones className="w-4 h-4 text-amber" />
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-amber">
          Music
        </span>
      </div>
      <div className="relative z-10 mt-auto flex flex-col">
        <div className="font-mono text-sm font-semibold truncate text-white">
          {current?.title ?? "Loading…"}
        </div>
        <div className="font-mono text-[11px] text-white/70 truncate">
          {current?.artist ?? "—"}
        </div>
        <div className="font-mono text-[10px] text-white/50 truncate">
          {current?.album ?? ""}
        </div>
      </div>
      <div className="relative z-10 mt-2 font-mono text-[10px] tracking-[0.15em] uppercase text-white/40">
        {tracks.length ? `${idx + 1}/${tracks.length}` : "—"}
      </div>
    </div>
  );
}
