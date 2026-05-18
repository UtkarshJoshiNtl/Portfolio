import { PanelShell } from "../PanelShell";
import { Play } from "lucide-react";

const renders = [
  { title: "Render 01" },
  { title: "Render 02" },
  { title: "Render 03" },
  { title: "Render 04" },
  { title: "Render 05" },
  { title: "Render 06" },
];

const tracks = [
  { title: "Track 01", link: "#" },
  { title: "Track 02", link: "#" },
  { title: "Track 03", link: "#" },
];

export function HobbyPanel({ onClose }: { onClose: () => void }) {
  return (
    <PanelShell id="hobby" onClose={onClose}>
      <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber">
        Hobby Gallery
      </div>
      <h2 className="mt-2 text-3xl md:text-5xl font-semibold">Things made for joy</h2>

      <section className="mt-10">
        <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber mb-3">
          3D Art
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {renders.map((r) => (
            <div key={r.title} className="aspect-square bg-tile-alt border border-border relative">
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground font-mono text-xs">
                [ image ]
              </div>
              <div className="absolute bottom-2 left-2 text-white font-mono text-[10px] uppercase tracking-[0.15em]">
                Blender render — {r.title}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber mb-3">
          Music
        </div>
        <div className="border border-border divide-y divide-border">
          {tracks.map((t) => (
            <a
              key={t.title}
              href={t.link}
              className="flex items-center justify-between px-4 py-3 hover:text-amber transition-colors"
            >
              <span className="font-mono text-sm">{t.title}</span>
              <Play className="w-4 h-4" />
            </a>
          ))}
        </div>
      </section>

      <p className="mt-10 font-mono text-xs text-muted-foreground">
        These are personal projects made outside of engineering work.
      </p>
    </PanelShell>
  );
}
