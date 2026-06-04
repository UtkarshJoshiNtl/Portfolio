import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
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
import { DetailMobilePanel } from "@/components/portfolio/DetailPanel";
import type { DetailId } from "@/components/portfolio/DetailPanel";
import { ThemeSwitcher } from "@/components/theme/ThemeSwitcher";

export const Route = createFileRoute("/")({ component: Index });

function Index() {
  const [detail, setDetail] = useState<DetailId | null>(null);
  const close = () => setDetail(null);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-6 md:py-8">
        <div className="flex items-center justify-end gap-2 mb-4">
          <ThemeSwitcher />
        </div>

        <IdentitySection onSelect={setDetail} />
        <TimelineBand />
        <WorkSection onSelect={setDetail} />
        <ConnectSection onSelect={setDetail} />
        <BeyondSection onSelect={setDetail} />
      </div>

      <AnimatePresence>
        {detail === "astrosis" && <AstrosisPanel key="astrosis" onClose={close} />}
        {detail === "quip" && <QuipPanel key="quip" onClose={close} />}
        {detail === "cufloda" && <CuFlodaPanel key="cufloda" onClose={close} />}
        {detail === "about" && <AboutPanel key="about" onClose={close} />}
        {detail === "contact" && <ContactPanel key="contact" onClose={close} />}
        {detail === "codeforces" && (
          <DetailMobilePanel key="codeforces" id="codeforces" onClose={close} />
        )}
        {detail === "github" && <DetailMobilePanel key="github" id="github" onClose={close} />}
      </AnimatePresence>
    </main>
  );
}
