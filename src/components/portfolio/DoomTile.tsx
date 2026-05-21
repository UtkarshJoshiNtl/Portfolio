import { useEffect, useRef, useState } from "react";
import { Skull, Loader2, X } from "lucide-react";

declare global {
  interface Window {
    Dos: (
      element: HTMLElement,
      opts?: { url?: string },
    ) => Promise<{
      exit: () => Promise<void>;
      mute: () => void;
      unmute: () => void;
      simulateKeyPress: (...keys: number[]) => void;
    }>;
  }
}

type Stage = "idle" | "loading" | "running" | "error";

export function DoomTile({ onOpen }: { onOpen: () => void }) {
  return (
    <button
      onClick={onOpen}
      className="block w-full h-full group bg-tile border border-transparent hover:border-amber transition-colors p-5 relative overflow-hidden text-left"
      aria-label="Launch DOOM"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.25_0.18_25_/_0.25)_0%,transparent_70%)]" />

      <div className="relative z-10 flex flex-col items-center justify-center h-full gap-2">
        <Skull className="w-10 h-10 text-amber group-hover:scale-110 transition-transform" />
        <div
          className="font-mono text-2xl md:text-3xl font-bold tracking-[0.2em] text-amber"
          style={{ textShadow: "0 0 24px oklch(0.55 0.25 25 / 0.6)" }}
        >
          ENTER DOOM
        </div>
        <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          DOOM (1993) · embedded · WASM · ~5 MB
        </div>
      </div>
    </button>
  );
}

export function DoomEmulator({ onExit }: { onExit: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const ciRef = useRef<{ exit: () => Promise<void>; mute: () => void; unmute: () => void } | null>(null);
  const [stage, setStage] = useState<Stage>("loading");
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const el = containerRef.current;
    if (!el) return;

    const init = async () => {
      try {
        if (!window.Dos) {
          const script = document.createElement("script");
          script.src = "/doom/js-dos.js";
          script.async = true;
          await new Promise<void>((resolve, reject) => {
            script.onload = () => resolve();
            script.onerror = () => reject(new Error("Failed to load js-dos.js"));
            document.head.appendChild(script);
          });
        }
        if (cancelled) return;

        const ci = await window.Dos(el, { url: "/doom/doom.jsdos" });
        if (cancelled) {
          ci.exit();
          return;
        }
        ciRef.current = ci;
        setStage("running");
      } catch {
        if (!cancelled) setStage("error");
      }
    };
    init();

    return () => {
      cancelled = true;
      ciRef.current?.exit();
    };
  }, []);

  const stop = () => {
    ciRef.current?.exit();
    ciRef.current = null;
    setStage("idle");
    onExit();
  };

  const toggleMute = () => {
    if (!ciRef.current) return;
    if (muted) ciRef.current.unmute();
    else ciRef.current.mute();
    setMuted((m) => !m);
  };

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4">
      {/* Controls */}
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <button
          onClick={toggleMute}
          className="w-10 h-10 bg-black/60 backdrop-blur border border-border flex items-center justify-center text-white hover:border-amber"
          aria-label={muted ? "Unmute" : "Mute"}
        >
          {muted ? "🔇" : "🔊"}
        </button>
        <button
          onClick={stop}
          className="w-10 h-10 bg-black/60 backdrop-blur border border-border flex items-center justify-center text-white hover:border-amber"
          aria-label="Exit DOOM"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Canvas container — centered, constrained size */}
      <div className="relative w-full max-w-[960px] aspect-[4/3] border border-border shadow-2xl">
        <div ref={containerRef} className="w-full h-full" />

        {/* Overlays on top */}
        {(stage === "loading" || stage === "error") && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/90">
            {stage === "loading" ? (
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="w-8 h-8 text-amber animate-spin" />
                <div className="font-mono text-xl tracking-[0.2em] text-amber">LOADING DOOM…</div>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3 text-center px-4">
                <Skull className="w-10 h-10 text-doom" />
                <div className="font-mono text-2xl font-bold text-doom">DOOM FAILED</div>
                <div className="font-mono text-[10px] text-muted-foreground">
                  Could not start the emulator. Make sure /doom/doom.jsdos exists.
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
