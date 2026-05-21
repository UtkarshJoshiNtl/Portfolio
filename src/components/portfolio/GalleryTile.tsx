import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Monitor } from "lucide-react";
import { getRandomArt } from "@/lib/gallery.functions";

export function GalleryTile({ onOpen }: { onOpen: () => void }) {
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
    if (!items.length) return;
    const t = setInterval(() => setI((v) => (v + 1) % items.length), 6000);
    return () => clearInterval(t);
  }, [items.length]);

  return (
    <button
      onClick={onOpen}
      className="block w-full h-full relative overflow-hidden bg-black border border-transparent hover:border-amber transition-colors group text-left"
    >
      {/* CRT screen glow */}
      <div className="absolute inset-0 pointer-events-none z-20 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(0,0,0,0.35)_100%)]" />

      {/* CRT scan lines */}
      <div
        className="absolute inset-0 pointer-events-none z-20 opacity-40"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.2) 2px, rgba(0,0,0,0.2) 4px)",
          backgroundSize: "100% 4px",
        }}
      />

      {/* Power LED */}
      <div className="absolute top-3 right-3 z-20 flex items-center gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.7)]" />
        <span className="font-mono text-[7px] text-green-500/50 uppercase tracking-[0.2em]">
          ON
        </span>
      </div>

      <AnimatePresence mode="popLayout">
        {cur && (
          <motion.img
            key={cur.id}
            src={cur.imageUrl}
            alt={cur.title}
            initial={{ opacity: 0, filter: "blur(6px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(6px)" }}
            transition={{ opacity: { duration: 0.5 }, filter: { duration: 0.3 } }}
            className="absolute inset-0 w-full h-full object-cover scale-105"
          />
        )}
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
      {!cur && (
        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
          <Monitor className="w-8 h-8" />
        </div>
      )}
      <div className="absolute top-4 left-4 z-10">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-amber">
          Gallery
        </span>
      </div>
      <div className="absolute bottom-3 left-4 right-4 z-10">
        <div className="font-semibold text-white text-base md:text-lg truncate">
          {cur?.title ?? "Loading…"}
        </div>
        <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/70 truncate">
          {cur?.artist ?? "Steam"}
        </div>
      </div>
    </button>
  );
}
