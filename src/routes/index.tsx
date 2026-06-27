import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { WorkSection } from "@/components/portfolio/sections/WorkSection";
import type { DetailId } from "@/components/portfolio/DetailPanel";

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
  const handleSelect = (id: string) => setDetail(id as DetailId);

  return (
    <AppLayout activePage="work">
      <div className="px-space-lg py-space-lg">
        <WorkSection onSelect={handleSelect} />
      </div>

      <Suspense>
        {detail === "astrosis" && (
          <Suspense key="astrosis" fallback={null}>
            <AstrosisPanel onClose={close} />
          </Suspense>
        )}
      </Suspense>
    </AppLayout>
  );
}
