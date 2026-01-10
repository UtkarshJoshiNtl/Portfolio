import { Hero } from "@/components/hero"
import { Nav } from "@/components/nav"
import { ThemePicker } from "@/components/theme-picker"
import { ProjectsSection } from "@/components/projects-section"
import { LearningSection } from "@/components/learning-section"
import { ContactSection } from "@/components/contact-section"

export default function Home() {
  return (
    <>
      <ThemePicker />
      <Nav />
      <main>
        <Hero />
        <ProjectsSection />
        <LearningSection />
        <ContactSection />
      </main>
    </>
  )
}
