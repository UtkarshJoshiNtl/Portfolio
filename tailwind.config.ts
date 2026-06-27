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
        border: "rgba(255,255,255,0.04)",
        "border-hover": "rgba(255,255,255,0.08)",
        glass: "rgba(255,255,255,0.02)",
        "glass-hover": "rgba(255,255,255,0.05)",
        "glass-active": "rgba(255,255,255,0.08)",
        "glass-border": "rgba(255,255,255,0.03)",
        "glass-border-hover": "rgba(255,255,255,0.06)",
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
        "display-lg": ["48px", { lineHeight: "1.05", letterSpacing: "-0.03em", fontWeight: "600" }],
        "display": ["40px", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "600" }],
        "heading": ["28px", { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "600" }],
        "subheading": ["20px", { lineHeight: "1.3", letterSpacing: "-0.01em", fontWeight: "500" }],
        "body": ["15px", { lineHeight: "1.6", letterSpacing: "0", fontWeight: "400" }],
        "small": ["13px", { lineHeight: "1.5", letterSpacing: "0", fontWeight: "400" }],
        "label": ["11px", { lineHeight: "1", letterSpacing: "0.05em", fontWeight: "500" }],
        "micro": ["10px", { lineHeight: "1", letterSpacing: "0.1em", fontWeight: "500" }],
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
