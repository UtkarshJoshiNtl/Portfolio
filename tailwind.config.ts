import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0a",
        foreground: "#f0f0f0",
        "foreground-secondary": "rgba(255,255,255,0.4)",
        "foreground-tertiary": "rgba(255,255,255,0.2)",
        surface: "rgba(255,255,255,0.02)",
        "surface-hover": "rgba(255,255,255,0.04)",
        "surface-active": "rgba(255,255,255,0.08)",
        border: "transparent",
        "border-hover": "transparent",
        glass: "rgba(255,255,255,0.02)",
        "glass-hover": "rgba(255,255,255,0.05)",
        "glass-active": "rgba(255,255,255,0.08)",
        "glass-border": "transparent",
        "glass-border-hover": "transparent",
        gblue: "#4285F4",
        gred: "#EA4335",
        gyellow: "#FBBC05",
        ggreen: "#34A853",
      },
      borderRadius: {
        DEFAULT: "0.75rem",
        lg: "1rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        full: "9999px",
      },
      fontFamily: {
        sans: ["Recursive", "sans-serif"],
        mono: ["Recursive", "monospace"],
      },
      fontSize: {
        "display-lg": ["56px", { lineHeight: "1.0", letterSpacing: "-0.03em", fontWeight: "700" }],
        "display": ["46px", { lineHeight: "1.05", letterSpacing: "-0.02em", fontWeight: "700" }],
        "heading": ["32px", { lineHeight: "1.15", letterSpacing: "-0.02em", fontWeight: "700" }],
        "subheading": ["22px", { lineHeight: "1.25", letterSpacing: "-0.01em", fontWeight: "600" }],
        "body": ["15px", { lineHeight: "1.7", letterSpacing: "0.01em", fontWeight: "500" }],
        "small": ["13px", { lineHeight: "1.6", letterSpacing: "0.01em", fontWeight: "500" }],
        "label": ["11px", { lineHeight: "1", letterSpacing: "0.06em", fontWeight: "600" }],
        "micro": ["10px", { lineHeight: "1", letterSpacing: "0.12em", fontWeight: "600" }],
      },
      backgroundImage: {
        "gradient-google": "linear-gradient(90deg, #4285F4, #EA4335, #FBBC05, #34A853)",
        "gradient-google-vertical": "linear-gradient(180deg, #4285F4, #EA4335, #FBBC05, #34A853)",
      },
      boxShadow: {
        glow: "0 0 24px rgba(66,133,244,0.12)",
        "glow-google": "0 0 24px rgba(66,133,244,0.08), 0 0 48px rgba(234,67,53,0.04)",
        glass: "0 8px 32px rgba(0,0,0,0.3)",
      },
    },
  },
  plugins: [],
} satisfies Config;
