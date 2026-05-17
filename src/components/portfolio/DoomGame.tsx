"use client";

import { useCallback, useEffect, useState } from "react";
import { Skull, X } from "lucide-react";

const DOOM_EMBED_URL = "https://js-dos.com/dosbox/doom/";

export function DoomGame() {
  const [isPlaying, setIsPlaying] = useState(false);

  const close = useCallback(() => setIsPlaying(false), []);

  useEffect(() => {
    if (!isPlaying) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isPlaying, close]);

  if (isPlaying) {
    return (
      <div className="fixed inset-0 z-[100] flex flex-col bg-black">
        <div className="flex items-center justify-between px-4 py-3 bg-black/90 border-b border-white/10">
          <span className="font-mono text-xs uppercase tracking-[0.15em] text-white/70">Doom</span>
          <button
            type="button"
            onClick={close}
            className="flex items-center gap-2 px-3 py-1.5 text-sm font-mono uppercase tracking-wider text-white bg-red-700 hover:bg-red-600 transition-colors"
            aria-label="Close Doom"
          >
            <X className="h-4 w-4" />
            Close
          </button>
        </div>
        <iframe
          src={DOOM_EMBED_URL}
          title="Doom"
          className="flex-1 w-full border-0"
          allow="fullscreen"
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        setIsPlaying(true);
      }}
      className="w-full h-full flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-red-900 to-black hover:from-red-800 hover:to-gray-900 transition-colors"
      title="Play Doom"
    >
      <Skull className="w-8 h-8 text-red-400" />
      <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-white/60">Play</span>
    </button>
  );
}
