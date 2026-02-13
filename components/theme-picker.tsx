"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

const themes = [
  { name: "purple", color: "#a855f7" },
  { name: "cyan", color: "#06d6a0" },
  { name: "green", color: "#00ff88" },
  { name: "orange", color: "#ff6b35" },
  { name: "red", color: "#ef4444" },
]

export function ThemePicker() {
  const [currentTheme, setCurrentTheme] = useState("purple")

  useEffect(() => {
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
    <motion.div
      className="fixed top-6 right-6 z-50 flex gap-2"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.5 }}
    >
      {themes.map((theme) => (
        <button
          key={theme.name}
          onClick={() => changeTheme(theme.name)}
          className={`w-5 h-5 rounded-full transition-all duration-300 ${currentTheme === theme.name
              ? "scale-110 ring-2 ring-foreground ring-offset-2 ring-offset-background"
              : "opacity-40 hover:opacity-80 hover:scale-105"
            }`}
          style={{ backgroundColor: theme.color }}
          aria-label={`Switch to ${theme.name} theme`}
        />
      ))}
    </motion.div>
  )
}
