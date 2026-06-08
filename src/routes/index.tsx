import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useState } from "react";
import { AnimatePresence } from "framer-motion";
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
const CuFlodaPanel = lazy(() =>
  import("@/components/portfolio/panels/CuFlodaPanel").then((m) => ({
    default: m.CuFlodaPanel,
  })),
);
const EnCripPanel = lazy(() =>
  import("@/components/portfolio/panels/EnCripPanel").then((m) => ({
    default: m.EnCripPanel,
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

  return (
    <main className="min-h-screen bg-background text-foreground">
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
        {detail === "cufloda" && (
          <Suspense key="cufloda" fallback={null}>
            <CuFlodaPanel onClose={close} />
          </Suspense>
        )}
        {detail === "encrip" && (
          <Suspense key="encrip" fallback={null}>
            <EnCripPanel onClose={close} />
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
