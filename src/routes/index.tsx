import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Shuffle } from "lucide-react";
import { IdentitySection } from "@/components/portfolio/sections/IdentitySection";
import { TimelineBand } from "@/components/portfolio/sections/TimelineBand";
import { WorkSection } from "@/components/portfolio/sections/WorkSection";
import { ConnectSection } from "@/components/portfolio/sections/ConnectSection";
import { BeyondSection } from "@/components/portfolio/sections/BeyondSection";
import { AstrosisPanel } from "@/components/portfolio/panels/AstrosisPanel";
import { QuipPanel } from "@/components/portfolio/panels/QuipPanel";
import { CuFlodaPanel } from "@/components/portfolio/panels/CuFlodaPanel";
import { AboutPanel } from "@/components/portfolio/panels/AboutPanel";
import { ContactPanel } from "@/components/portfolio/panels/ContactPanel";
import { ThemeSwitcher } from "@/components/theme/ThemeSwitcher";

export const Route = createFileRoute("/")({ component: Index });

type PanelId = "astrosis" | "quip" | "cufloda" | "about" | "contact" | null;

function Index() {
  const [panel, setPanel] = useState<PanelId>(null);
  const [seed, setSeed] = useState(() => {
    if (typeof window !== "undefined") return Math.floor(Math.random() * 1e9);
    return 0;
  });
  const close = () => setPanel(null);
  const reshuffle = useCallback(() => setSeed(Math.floor(Math.random() * 1e9)), []);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-6 md:py-8">
        <div className="flex items-center justify-end gap-2 mb-4">
          <button
            onClick={reshuffle}
            className="inline-flex items-center gap-2 border border-border hover:border-amber hover:text-amber transition-colors px-3 py-2 font-mono text-[11px] uppercase tracking-[0.15em]"
            aria-label="Reshuffle tile layout"
          >
            <Shuffle className="w-3.5 h-3.5" />
            Reshuffle
          </button>
          <ThemeSwitcher />
        </div>

        <IdentitySection />
        <TimelineBand />
        <WorkSection
          seed={seed}
          onOpenAstrosis={() => setPanel("astrosis")}
          onOpenQuip={() => setPanel("quip")}
          onOpenCufloda={() => setPanel("cufloda")}
        />
        <ConnectSection
          seed={seed}
          onOpenAbout={() => setPanel("about")}
          onOpenContact={() => setPanel("contact")}
        />
        <BeyondSection seed={seed} />
      </div>

      <AnimatePresence>
        {panel === "astrosis" && <AstrosisPanel key="astrosis" onClose={close} />}
        {panel === "quip" && <QuipPanel key="quip" onClose={close} />}
        {panel === "cufloda" && <CuFlodaPanel key="cufloda" onClose={close} />}
        {panel === "about" && <AboutPanel key="about" onClose={close} />}
        {panel === "contact" && <ContactPanel key="contact" onClose={close} />}
      </AnimatePresence>
    </main>
  );
}
