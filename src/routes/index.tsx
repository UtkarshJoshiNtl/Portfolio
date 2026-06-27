import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { AppLayout, type SectionId } from "@/components/AppLayout";
import { AboutSection } from "@/components/portfolio/sections/AboutSection";
import { ProjectsSection } from "@/components/portfolio/sections/ProjectsSection";
import { ContactSection } from "@/components/portfolio/sections/ContactSection";

export const Route = createFileRoute("/")({ component: Index });

const sectionComponents: Record<SectionId, React.FC> = {
  about: AboutSection,
  projects: ProjectsSection,
  contact: ContactSection,
};

function Index() {
  const [section, setSection] = useState<SectionId>("about");

  const SectionComponent = sectionComponents[section];

  return (
    <AppLayout activeSection={section} onNavigate={setSection}>
      <AnimatePresence mode="wait">
        <motion.div
          key={section}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          <SectionComponent />
        </motion.div>
      </AnimatePresence>
    </AppLayout>
  );
}
