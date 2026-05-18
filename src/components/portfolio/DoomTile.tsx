import { useEffect, useRef, useState } from "react";
import { Skull, Loader2, X, Volume2, VolumeX } from "lucide-react";

declare global {
  interface Window {
    Dos?: (
      canvas: HTMLCanvasElement,
      opts?: { wdosboxUrl?: string },
    ) => {
      ready: (
        cb: (
          fs: { extract: (url: string) => Promise<void> },
          main: (args: string[]) => Promise<{ exit: () => void }>,
        ) => void,
      ) => void;
    };
  }
}

type Stage = "idle" | "loading" | "running" | "error";

export function DoomTile() {
  const [stage, setStage] = useState<Stage>("idle");
  const [muted, setMuted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ciRef = useRef<{ exit: () => void } | null>(null);

  const launch = async () => {
    if (stage !== "idle") return;
    setStage("loading");
    try {
      // Inject the js-dos script + stylesheet if not already present.
      if (!window.Dos) {
        await Promise.all([
          loadScript("/doom/js-dos.js"),
          loadStylesheet("/doom/js-dos.css"),
        ]);
      }
      if (!window.Dos || !canvasRef.current) throw new Error("js-dos failed to load");
      const dos = window.Dos(canvasRef.current, { wdosboxUrl: "/doom/wdosbox.js" });
      dos.ready((fs, main) => {
        fs.extract("/doom/doom.jsdos").then(async () => {
          const ci = await main(["-c", "DOOM.EXE"]);
          ciRef.current = ci;
          setStage("running");
          // Trap arrow keys etc. — focus the canvas.
          canvasRef.current?.focus();
        });
      });
    } catch (e) {
      console.error("[DOOM] failed", e);
      setStage("error");
    }
  };

  const stop = () => {
    try {
      ciRef.current?.exit();
    } catch {
      /* ignore */
    }
    ciRef.current = null;
    setStage("idle");
  };

  useEffect(() => () => stop(), []);

  return (
    <section className="mt-6 md:mt-8">
      <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-amber mb-3">
        Bonus Level
      </div>
      <div
        className="relative w-full bg-tile border border-border overflow-hidden"
        style={{
          aspectRatio: stage === "running" ? "4 / 3" : "16 / 5",
          maxHeight: stage === "running" ? "min(70vh, 800px)" : "260px",
        }}
      >
        {/* Canvas is always present so js-dos can attach to it */}
        <canvas
          ref={canvasRef}
          tabIndex={0}
          className={`w-full h-full block outline-none ${
            stage === "running" ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        />

        {/* Idle / loading / error overlay */}
        {stage !== "running" && (
          <button
            onClick={launch}
            disabled={stage === "loading"}
            className="absolute inset-0 group flex items-center justify-center text-foreground bg-[radial-gradient(ellipse_at_center,oklch(0.25_0.18_25_/_0.35)_0%,transparent_70%)] hover:bg-[radial-gradient(ellipse_at_center,oklch(0.35_0.22_25_/_0.5)_0%,transparent_70%)] transition-colors"
            aria-label="Launch DOOM"
          >
            <div className="flex flex-col items-center gap-3 px-4 text-center">
              {stage === "loading" ? (
                <Loader2 className="w-8 h-8 text-amber animate-spin" />
              ) : (
                <Skull className="w-10 h-10 text-amber group-hover:scale-110 transition-transform" />
              )}
              <div
                className="font-mono text-2xl md:text-4xl font-bold tracking-[0.2em] text-amber"
                style={{ textShadow: "0 0 24px oklch(0.55 0.25 25 / 0.6)" }}
              >
                {stage === "loading"
                  ? "LOADING…"
                  : stage === "error"
                    ? "DOOM FAILED"
                    : "ENTER DOOM"}
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                {stage === "error"
                  ? "Could not start emulator — refresh and try again"
                  : "DOOM (1993) · embedded · WASM · ~5 MB"}
              </div>
            </div>
          </button>
        )}

        {/* Controls when running */}
        {stage === "running" && (
          <div className="absolute top-2 right-2 flex gap-1 z-10">
            <button
              onClick={() => setMuted((m) => !m)}
              className="w-8 h-8 bg-black/60 backdrop-blur border border-border flex items-center justify-center text-white hover:border-amber"
              aria-label={muted ? "Unmute" : "Mute"}
            >
              {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <button
              onClick={stop}
              className="w-8 h-8 bg-black/60 backdrop-blur border border-border flex items-center justify-center text-white hover:border-amber"
              aria-label="Exit DOOM"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) return resolve();
    const s = document.createElement("script");
    s.src = src;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.head.appendChild(s);
  });
}

function loadStylesheet(href: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`link[href="${href}"]`);
    if (existing) return resolve();
    const l = document.createElement("link");
    l.rel = "stylesheet";
    l.href = href;
    l.onload = () => resolve();
    l.onerror = () => reject(new Error(`Failed to load ${href}`));
    document.head.appendChild(l);
  });
}
