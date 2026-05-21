import { createContext, useCallback, useContext, useEffect, useState } from "react";

export type ThemeId = "terminal" | "artist" | "noir" | "retro" | "blueprint" | "vaporwave";

const THEME_COLORS: Record<ThemeId, string> = {
  terminal: "#252525",
  artist: "#f3eee2",
  noir: "#141414",
  retro: "#0d0d00",
  blueprint: "oklch(0.25 0.12 240)",
  vaporwave: "#0d0221",
};

type ThemeDef = {
  id: ThemeId;
  label: string;
  tagline: string;
  swatches: string[];
  fontClass: string;
};

export const THEMES: ThemeDef[] = [
  {
    id: "terminal",
    label: "Terminal",
    tagline: "Dark amber. The default.",
    swatches: ["#252525", "#3a3a3a", "#e0a64b", "#fafafa"],
    fontClass: "",
  },
  {
    id: "artist",
    label: "Digital Canvas",
    tagline: "Painterly. Vivid. Loud.",
    swatches: ["#f3eee2", "#d34b2c", "#3d63c4", "#e8b53a"],
    fontClass: "font-display",
  },
  {
    id: "noir",
    label: "Noir",
    tagline: "Pure black & white.",
    swatches: ["#141414", "#2a2a2a", "#7a7a7a", "#fafafa"],
    fontClass: "",
  },
  {
    id: "retro",
    label: "Retro",
    tagline: "1980s home computer",
    swatches: ["#0d0d00", "#1a1a00", "#ff8c00", "#0d0d00"],
    fontClass: "font-mono",
  },
  {
    id: "blueprint",
    label: "Blueprint",
    tagline: "Engineering blueprint",
    swatches: ["oklch(0.25 0.12 240)", "#ffffff", "oklch(0.90 0.05 200)", "#ffffff"],
    fontClass: "font-mono",
  },
  {
    id: "vaporwave",
    label: "Vaporwave",
    tagline: "Synthwave sunset",
    swatches: ["#0d0221", "#1a0533", "oklch(0.70 0.32 345)", "#0d1a66"],
    fontClass: "font-display",
  },
];

const STORAGE_KEY = "mtf-theme";
const FONT_CLASS_KEY = "mtf-font";

type Ctx = { theme: ThemeId; setTheme: (t: ThemeId) => void };
const ThemeCtx = createContext<Ctx>({ theme: "terminal", setTheme: () => {} });

export function useTheme() {
  return useContext(ThemeCtx);
}

function updateMetaThemeColor(theme: ThemeId) {
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", THEME_COLORS[theme]);
}

function updateFontClass(fontClass: string) {
  const prev = document.documentElement.getAttribute(FONT_CLASS_KEY);
  if (prev) document.documentElement.classList.remove(prev);
  if (fontClass) {
    document.documentElement.classList.add(fontClass);
    document.documentElement.setAttribute(FONT_CLASS_KEY, fontClass);
  } else {
    document.documentElement.removeAttribute(FONT_CLASS_KEY);
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>("terminal");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as ThemeId | null;
      if (stored && THEMES.some((t) => t.id === stored)) {
        setThemeState(stored);
        updateFontClass(THEMES.find((t) => t.id === stored)?.fontClass ?? "");
      } else {
        const current = document.documentElement.getAttribute("data-theme") as ThemeId | null;
        if (current && THEMES.some((t) => t.id === current)) {
          setThemeState(current);
          updateFontClass(THEMES.find((t) => t.id === current)?.fontClass ?? "");
        } else {
          const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
          const fallback: ThemeId = prefersDark ? "terminal" : "artist";
          setThemeState(fallback);
          document.documentElement.setAttribute("data-theme", fallback);
          updateFontClass(THEMES.find((t) => t.id === fallback)?.fontClass ?? "");
        }
      }
    } catch {
      /* ignore */
    }
  }, []);

  const setTheme = useCallback((t: ThemeId) => {
    setThemeState(t);
    try {
      localStorage.setItem(STORAGE_KEY, t);
    } catch {
      /* ignore */
    }
    document.documentElement.setAttribute("data-theme", t);
    updateFontClass(THEMES.find((th) => th.id === t)?.fontClass ?? "");
    updateMetaThemeColor(t);
  }, []);

  return <ThemeCtx.Provider value={{ theme, setTheme }}>{children}</ThemeCtx.Provider>;
}
