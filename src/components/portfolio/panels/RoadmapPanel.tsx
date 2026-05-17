import { PanelShell } from "../PanelShell";
import { dailyStructure, phases, roadmapRules } from "@/lib/portfolio-data";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function RoadmapPanel({ onClose }: { onClose: () => void }) {
  return (
    <PanelShell id="roadmap" onClose={onClose}>
      <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber">
        Roadmap
      </div>
      <h2 className="mt-2 text-3xl md:text-5xl font-semibold">
        Technical Roadmap — May to October 2026
      </h2>
      <p className="mt-3 font-mono text-sm text-muted-foreground">
        “Become technically legible. Not impressive. Legible.”
      </p>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-3">
        {roadmapRules.map((r, i) => (
          <div key={i} className="border border-border p-4 bg-tile-alt">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-amber">
              Rule {i + 1}
            </div>
            <div className="mt-2 font-semibold">{r.title}</div>
            <p className="mt-1 text-sm text-muted-foreground">{r.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber mb-3">
          Daily structure (summer)
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
          {dailyStructure.map((d, i) => (
            <div key={i} className="border border-border p-4 bg-tile-alt">
              <div className="font-mono text-amber text-lg">{d.hours}</div>
              <div className="mt-1 font-semibold text-sm">{d.title}</div>
              <p className="mt-2 text-xs text-muted-foreground">{d.body}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12">
        <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber mb-3">
          Seven phases
        </div>
        <Accordion type="single" collapsible className="border border-border divide-y divide-border">
          {phases.map((p, i) => (
            <AccordionItem key={i} value={`p${i}`} className="border-b-0">
              <AccordionTrigger className="px-4 hover:no-underline hover:text-amber">
                <div className="flex flex-wrap items-center gap-3 text-left">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-amber">
                    {p.n}
                  </span>
                  <span className="font-mono text-[11px] text-muted-foreground">{p.when}</span>
                  <span className="font-semibold">{p.title}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-5">
                <p className="text-sm leading-relaxed text-foreground/85">{p.body}</p>
                <div className="mt-3 flex flex-wrap gap-1.5 font-mono text-[10px]">
                  {p.tags.map((t) => (
                    <span key={t} className="px-2 py-1 border border-border text-muted-foreground">
                      {t}
                    </span>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </PanelShell>
  );
}
