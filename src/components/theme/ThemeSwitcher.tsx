import { useState, useRef, useEffect } from "react";
import { Palette, Check } from "lucide-react";
import { THEMES, useTheme } from "./ThemeProvider";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Switch theme"
        aria-expanded={open}
        className="w-9 h-9 border border-border flex items-center justify-center hover:border-amber hover:text-amber transition-colors"
      >
        <Palette className="w-4 h-4" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 z-50 w-64 bg-popover border border-border shadow-lg p-2 space-y-1">
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground px-2 py-1.5">
            Theme
          </div>
          {THEMES.map((t) => {
            const active = t.id === theme;
            return (
              <button
                key={t.id}
                onClick={() => {
                  setTheme(t.id);
                  setOpen(false);
                }}
                className={`w-full text-left p-2 flex items-center gap-3 border transition-colors ${
                  active
                    ? "border-amber bg-tile-alt"
                    : "border-transparent hover:border-border hover:bg-tile"
                }`}
              >
                <div className="flex shrink-0">
                  {t.swatches.map((c, i) => (
                    <div
                      key={i}
                      className="w-4 h-7 border border-black/20"
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-mono text-xs font-semibold text-foreground">{t.label}</div>
                  <div className="font-mono text-[10px] text-muted-foreground truncate">
                    {t.tagline}
                  </div>
                </div>
                {active && <Check className="w-3.5 h-3.5 text-amber shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
