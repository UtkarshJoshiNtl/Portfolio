import { Mail, Check } from "lucide-react";
import { toast } from "sonner";
import { PanelShell } from "../PanelShell";
import { links } from "@/lib/portfolio-data";

export function ContactPanel({ onClose }: { onClose: () => void }) {
  const copyEmail = () => {
    navigator.clipboard.writeText(links.email).then(() => {
      toast.success("Email copied to clipboard");
    });
  };

  return (
    <PanelShell id="contact" onClose={onClose}>
      <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber">Contact</div>
      <h2 className="mt-2 text-3xl md:text-5xl font-semibold">Get in touch</h2>
      <p className="mt-2 text-sm text-muted-foreground">Reach out directly via email.</p>

      <div className="mt-10 max-w-md">
        <div className="border border-border p-6 bg-tile-alt">
          <div className="flex items-center gap-3">
            <Mail className="w-6 h-6 text-amber shrink-0" />
            <div>
              <div className="font-mono text-sm break-all">{links.email}</div>
              <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground mt-1">
                Email
              </div>
            </div>
          </div>
          <button
            onClick={copyEmail}
            className="mt-4 w-full inline-flex items-center justify-center gap-2 border border-amber text-amber hover:bg-amber hover:text-black transition-colors px-4 py-3 font-mono text-[11px] uppercase tracking-[0.15em]"
          >
            <Check className="w-4 h-4" />
            Copy email
          </button>
        </div>

        <div className="mt-6 font-mono text-xs text-muted-foreground leading-relaxed">
          Prefer LinkedIn?{" "}
          <a
            href={links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber underline"
          >
            Connect there
          </a>
          .
        </div>
      </div>
    </PanelShell>
  );
}
