import { createContext, useCallback, useContext, useEffect, useState } from "react";

export type ThemeId = "terminal" | "artist" | "noir";

export const THEMES: { id: ThemeId; label: string; tagline: string; swatches: string[] }[] = [
  {
    id: "terminal",
    label: "Terminal",
    tagline: "Dark amber. The default.",
    swatches: ["#252525", "#3a3a3a", "#e0a64b", "#fafafa"],
  },
  {
    id: "artist",
    label: "Digital Canvas",
    tagline: "Painterly. Vivid. Loud.",
    swatches: ["#f3eee2", "#d34b2c", "#3d63c4", "#e8b53a"],
  },
  {
    id: "noir",
    label: "Noir",
    tagline: "Pure black & white.",
    swatches: ["#141414", "#2a2a2a", "#7a7a7a", "#fafafa"],
  },
];

const STORAGE_KEY = "mtf-theme";

type Ctx = { theme: ThemeId; setTheme: (t: ThemeId) => void };
const ThemeCtx = createContext<Ctx>({ theme: "terminal", setTheme: () => {} });

export function useTheme() {
  return useContext(ThemeCtx);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>("terminal");

  // Read persisted choice after hydration. Pre-hydration the FOUC-prevention
  // script in __root.tsx already set the data-theme attribute.
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as ThemeId | null;
      if (stored && THEMES.some((t) => t.id === stored)) {
        setThemeState(stored);
      } else {
        const current = document.documentElement.getAttribute("data-theme") as ThemeId | null;
        if (current && THEMES.some((t) => t.id === current)) setThemeState(current);
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
  }, []);

  return <ThemeCtx.Provider value={{ theme, setTheme }}>{children}</ThemeCtx.Provider>;
}
