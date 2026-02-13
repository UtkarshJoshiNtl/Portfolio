"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useSounds } from "./sound-provider"

const themes = [
  { name: "purple", color: "#a855f7" },
  { name: "cyan", color: "#06d6a0" },
  { name: "green", color: "#00ff88" },
  { name: "orange", color: "#ff6b35" },
  { name: "red", color: "#ef4444" },
]

export function ThemePicker() {
  const [currentTheme, setCurrentTheme] = useState("purple")
  const { playPop } = useSounds()

  useEffect(() => {
    const saved = localStorage.getItem("portfolio-accent")
    if (saved) {
      setCurrentTheme(saved)
      document.documentElement.setAttribute("data-accent", saved)
    }
  }, [])

  const changeTheme = (themeName: string) => {
    playPop()
    setCurrentTheme(themeName)
    document.documentElement.setAttribute("data-accent", themeName)
    localStorage.setItem("portfolio-accent", themeName)
  }

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50 flex gap-2 p-2 code-border"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.4 }}
    >
      {themes.map((theme) => (
        <button
          key={theme.name}
          onClick={() => changeTheme(theme.name)}
          className={`w-4 h-4 rounded-full transition-all duration-300 cursor-pointer ${currentTheme === theme.name
              ? "scale-125 ring-1 ring-white ring-offset-1 ring-offset-black"
              : "opacity-30 hover:opacity-80 hover:scale-110"
            }`}
          style={{ backgroundColor: theme.color }}
          aria-label={`${theme.name} theme`}
        />
      ))}
    </motion.div>
  )
}

export function SoundToggle() {
  const { isMuted, toggleMute, playPop } = useSounds()

  return (
    <motion.button
      className="fixed bottom-6 left-6 z-50 code-border px-3 py-2 text-small font-mono opacity-40 hover:opacity-100 hover:text-accent transition-all-smooth cursor-pointer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.4 }}
      onClick={() => {
        toggleMute()
        if (isMuted) playPop()
      }}
    >
      {isMuted ? "♪ off" : "♪ on"}
    </motion.button>
  )
}
