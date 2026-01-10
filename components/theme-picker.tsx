"use client"

import { useEffect, useState } from "react"

const themes = [
  { name: "purple", color: "#a855f7" },
  { name: "cyan", color: "#00d9ff" },
  { name: "green", color: "#00ff88" },
  { name: "orange", color: "#ff6b35" },
  { name: "red", color: "#ff3333" },
]

export function ThemePicker() {
  const [currentTheme, setCurrentTheme] = useState("purple")

  useEffect(() => {
    // Load saved theme
    const saved = localStorage.getItem("portfolio-accent")
    if (saved) {
      setCurrentTheme(saved)
      document.documentElement.setAttribute("data-accent", saved)
    }
  }, [])

  const changeTheme = (themeName: string) => {
    setCurrentTheme(themeName)
    document.documentElement.setAttribute("data-accent", themeName)
    localStorage.setItem("portfolio-accent", themeName)
  }

  return (
    <div className="fixed top-8 right-8 z-50 flex gap-3">
      {themes.map((theme) => (
        <button
          key={theme.name}
          onClick={() => changeTheme(theme.name)}
          className={`w-6 h-6 border-2 transition-all ${
            currentTheme === theme.name
              ? "border-foreground scale-110"
              : "border-foreground/30 hover:border-foreground hover:scale-105"
          }`}
          style={{ backgroundColor: theme.color }}
          aria-label={`Switch to ${theme.name} theme`}
        />
      ))}
    </div>
  )
}
