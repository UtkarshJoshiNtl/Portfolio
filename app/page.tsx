"use client"

import { Hero } from "@/components/hero"
import { Nav } from "@/components/nav"
import { ProjectsSection } from "@/components/projects-section"
import { LearningSection } from "@/components/learning-section"
import { ContactSection } from "@/components/contact-section"
import { ThemePicker, SoundToggle } from "@/components/theme-picker"
import { Scene3D } from "@/components/scene-3d"
import { SoundProvider } from "@/components/sound-provider"

export default function Home() {
  return (
    <SoundProvider>
      <Scene3D />
      <Nav />
      <ThemePicker />
      <SoundToggle />
      <main className="relative z-10">
        <Hero />
        <ProjectsSection />
        <LearningSection />
        <ContactSection />
      </main>
    </SoundProvider>
  )
}
