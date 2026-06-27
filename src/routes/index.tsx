import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useState, useRef } from "react";
import { AnimatePresence, useScroll, useTransform, motion } from "framer-motion";
import { IdentitySection } from "@/components/portfolio/sections/IdentitySection";
import { TimelineBand } from "@/components/portfolio/sections/TimelineBand";
import { WorkSection } from "@/components/portfolio/sections/WorkSection";
import { ConnectSection } from "@/components/portfolio/sections/ConnectSection";
import { BeyondSection } from "@/components/portfolio/sections/BeyondSection";
import type { DetailId } from "@/components/portfolio/DetailPanel";
import { ThemeSwitcher } from "@/components/theme/ThemeSwitcher";
import { OrnamentFrame } from "@/components/portfolio/OrnamentFrame";
import { SectionDivider } from "@/components/portfolio/SectionDivider";

const AstrosisPanel = lazy(() =>
  import("@/components/portfolio/panels/AstrosisPanel").then((m) => ({
    default: m.AstrosisPanel,
  })),
);
const QuipPanel = lazy(() =>
  import("@/components/portfolio/panels/QuipPanel").then((m) => ({
    default: m.QuipPanel,
  })),
);
const SStreamPanel = lazy(() =>
  import("@/components/portfolio/panels/SStreamPanel").then((m) => ({
    default: m.SStreamPanel,
  })),
);
const EnCripPanel = lazy(() =>
  import("@/components/portfolio/panels/EnCripPanel").then((m) => ({
    default: m.EnCripPanel,
  })),
);
const CTorrentPanel = lazy(() =>
  import("@/components/portfolio/panels/CTorrentPanel").then((m) => ({
    default: m.CTorrentPanel,
  })),
);
const CurrentPanel = lazy(() =>
  import("@/components/portfolio/panels/CurrentPanel").then((m) => ({
    default: m.CurrentPanel,
  })),
);
const VisagePanel = lazy(() =>
  import("@/components/portfolio/panels/VisagePanel").then((m) => ({
    default: m.VisagePanel,
  })),
);
const JustLandedPanel = lazy(() =>
  import("@/components/portfolio/panels/JustLandedPanel").then((m) => ({
    default: m.JustLandedPanel,
  })),
);
const AboutPanel = lazy(() =>
  import("@/components/portfolio/panels/AboutPanel").then((m) => ({
    default: m.AboutPanel,
  })),
);
const ContactPanel = lazy(() =>
  import("@/components/portfolio/panels/ContactPanel").then((m) => ({
    default: m.ContactPanel,
  })),
);
const DetailMobilePanel = lazy(() =>
  import("@/components/portfolio/DetailPanel").then((m) => ({
    default: m.DetailMobilePanel,
  })),
);

export const Route = createFileRoute("/")({ component: Index });

function Index() {
  const [detail, setDetail] = useState<DetailId | null>(null);
  const close = () => setDetail(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="grain-overlay" />
      <motion.div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.015]"
        style={{ y: bgY }}
        aria-hidden="true"
      >
        <svg className="w-full h-full" viewBox="0 0 1000 2000" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="200" cy="400" r="300" stroke="currentColor" strokeWidth="0.3" className="text-amber" />
          <circle cx="800" cy="800" r="250" stroke="currentColor" strokeWidth="0.2" className="text-amber" opacity="0.6" />
          <circle cx="500" cy="1400" r="200" stroke="currentColor" strokeWidth="0.25" className="text-amber" opacity="0.4" />
        </svg>
      </motion.div>
      <div ref={mainRef} className="relative z-10">
        <OrnamentFrame />
        <div className="max-w-[1600px] mx-auto px-8 md:px-16 py-6 md:py-10">
        <div className="flex items-center justify-end gap-2 mb-4">
          <ThemeSwitcher />
        </div>

        <IdentitySection onSelect={setDetail} />
        <SectionDivider seed={42} />
        <TimelineBand />
        <SectionDivider seed={137} />
        <WorkSection onSelect={setDetail} />
        <SectionDivider seed={256} />
        <ConnectSection onSelect={setDetail} />
        <SectionDivider seed={365} />
        <BeyondSection onSelect={setDetail} />
      </div>
      </div>

      <AnimatePresence>
        {detail === "astrosis" && (
          <Suspense key="astrosis" fallback={null}>
            <AstrosisPanel onClose={close} />
          </Suspense>
        )}
        {detail === "quip" && (
          <Suspense key="quip" fallback={null}>
            <QuipPanel onClose={close} />
          </Suspense>
        )}
        {detail === "s-stream" && (
          <Suspense key="s-stream" fallback={null}>
            <SStreamPanel onClose={close} />
          </Suspense>
        )}
        {detail === "encrip" && (
          <Suspense key="encrip" fallback={null}>
            <EnCripPanel onClose={close} />
          </Suspense>
        )}
        {detail === "current" && (
          <Suspense key="current" fallback={null}>
            <CurrentPanel onClose={close} />
          </Suspense>
        )}
        {detail === "ctorrent" && (
          <Suspense key="ctorrent" fallback={null}>
            <CTorrentPanel onClose={close} />
          </Suspense>
        )}
        {detail === "visage" && (
          <Suspense key="visage" fallback={null}>
            <VisagePanel onClose={close} />
          </Suspense>
        )}
        {detail === "justLanded" && (
          <Suspense key="justLanded" fallback={null}>
            <JustLandedPanel onClose={close} />
          </Suspense>
        )}
        {detail === "about" && (
          <Suspense key="about" fallback={null}>
            <AboutPanel onClose={close} />
          </Suspense>
        )}
        {detail === "contact" && (
          <Suspense key="contact" fallback={null}>
            <ContactPanel onClose={close} />
          </Suspense>
        )}
        {detail === "codeforces" && (
          <Suspense key="codeforces" fallback={null}>
            <DetailMobilePanel id="codeforces" onClose={close} />
          </Suspense>
        )}
        {detail === "github" && (
          <Suspense key="github" fallback={null}>
            <DetailMobilePanel id="github" onClose={close} />
          </Suspense>
        )}
      </AnimatePresence>
    </main>
  );
}
