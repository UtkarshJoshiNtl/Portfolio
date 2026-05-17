"use client";

import { useCallback, useEffect, useState } from "react";
import { ExternalLink, Skull, X } from "lucide-react";

const DOOM_EMBED_URLS = [
  "https://thedoggybrad.github.io/doom_on_js-dos/",
  "https://js-dos.com/DOOM/",
];

const FALLBACK_URL = DOOM_EMBED_URLS[0];

export function DoomGame() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [urlIndex, setUrlIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  const embedUrl = DOOM_EMBED_URLS[urlIndex] ?? FALLBACK_URL;
  const close = useCallback(() => {
    setIsPlaying(false);
    setUrlIndex(0);
    setLoading(true);
    setFailed(false);
  }, []);

  useEffect(() => {
    if (!isPlaying) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    const timeout = window.setTimeout(() => {
      setLoading((prev) => {
        if (prev) setFailed(true);
        return prev;
      });
    }, 12000);

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      window.clearTimeout(timeout);
    };
  }, [isPlaying, close]);

  const tryNextUrl = () => {
    if (urlIndex < DOOM_EMBED_URLS.length - 1) {
      setUrlIndex((i) => i + 1);
      setLoading(true);
      setFailed(false);
    } else {
      setFailed(true);
    }
  };

  if (isPlaying) {
    return (
      <div className="fixed inset-0 z-[100] flex flex-col bg-black">
        <div className="flex items-center justify-between px-4 py-3 bg-black/90 border-b border-white/10 shrink-0">
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

        <div className="relative flex-1 min-h-0">
          {loading && !failed && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-10 bg-black">
              <div className="h-8 w-8 border-2 border-white/30 border-t-red-500 rounded-full animate-spin" />
              <p className="font-mono text-xs text-white/60 uppercase tracking-wider">Loading…</p>
            </div>
          )}

          {failed ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center">
              <p className="text-white/80 max-w-md">
                Embed blocked in browser. Open Doom in a new tab (desktop recommended).
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <a
                  href={FALLBACK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-red-700 hover:bg-red-600 text-white font-mono text-xs uppercase tracking-wider"
                >
                  <ExternalLink className="h-4 w-4" />
                  Open Doom
                </a>
                {urlIndex < DOOM_EMBED_URLS.length - 1 && (
                  <button
                    type="button"
                    onClick={tryNextUrl}
                    className="px-4 py-2 border border-white/30 text-white font-mono text-xs uppercase tracking-wider hover:bg-white/10"
                  >
                    Retry
                  </button>
                )}
              </div>
            </div>
          ) : (
            <iframe
              key={embedUrl}
              src={embedUrl}
              title="Doom"
              className="w-full h-full border-0"
              allow="fullscreen"
              onLoad={() => setLoading(false)}
              onError={tryNextUrl}
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        setIsPlaying(true);
        setLoading(true);
        setFailed(false);
        setUrlIndex(0);
      }}
      className="w-full h-full flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-red-900 to-black hover:from-red-800 hover:to-gray-900 transition-colors"
      title="Play Doom"
    >
      <Skull className="w-8 h-8 text-red-400" />
      <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-white/60">Play</span>
    </button>
  );
}
