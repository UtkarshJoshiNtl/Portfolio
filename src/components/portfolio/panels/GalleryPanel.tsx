import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { PanelShell } from "../PanelShell";
import { getRandomArt } from "@/lib/gallery.functions";

export function GalleryPanel({ onClose }: { onClose: () => void }) {
  const { data } = useQuery({
    queryKey: ["art"],
    queryFn: () => getRandomArt(),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
  const items = data?.items ?? [];
  const [i, setI] = useState(0);
  const cur = items[i];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setI((v) => (items.length ? (v + 1) % items.length : 0));
      if (e.key === "ArrowLeft")
        setI((v) => (items.length ? (v - 1 + items.length) % items.length : 0));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [items.length]);

  return (
    <PanelShell id="gallery" onClose={onClose}>
      <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber">
        Gallery
      </div>
      <h2 className="mt-2 text-3xl md:text-5xl font-semibold">Art Institute of Chicago</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Rotating selection of public-domain works. Use ← → to navigate.
      </p>

      {cur ? (
        <div className="mt-8 relative">
          <img
            src={cur.imageUrl}
            alt={cur.title}
            className="w-full max-h-[70vh] object-contain bg-tile-alt"
          />
          <div className="mt-3 flex items-center justify-between gap-4">
            <div>
              <div className="font-semibold text-lg">{cur.title}</div>
              <div className="font-mono text-xs text-muted-foreground">
                {cur.artist ?? "Unknown"}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  setI((v) => (items.length ? (v - 1 + items.length) % items.length : 0))
                }
                aria-label="Previous"
                className="w-10 h-10 border border-border flex items-center justify-center hover:border-amber hover:text-amber transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="font-mono text-xs text-muted-foreground tabular-nums">
                {i + 1} / {items.length}
              </div>
              <button
                onClick={() => setI((v) => (items.length ? (v + 1) % items.length : 0))}
                aria-label="Next"
                className="w-10 h-10 border border-border flex items-center justify-center hover:border-amber hover:text-amber transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-8 h-[50vh] flex items-center justify-center bg-tile-alt">
          <Loader2 className="w-8 h-8 text-amber animate-spin" />
        </div>
      )}

      <div className="mt-10 grid grid-cols-3 md:grid-cols-6 gap-2">
        {items.map((it, idx) => (
          <button
            key={it.id}
            onClick={() => setI(idx)}
            className={`aspect-square overflow-hidden border relative ${
              idx === i ? "border-amber" : "border-border"
            }`}
          >
            <img src={it.imageUrl} alt={it.title} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </PanelShell>
  );
}
