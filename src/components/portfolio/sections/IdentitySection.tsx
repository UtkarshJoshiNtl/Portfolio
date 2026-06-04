import { motion } from "framer-motion";
import { Github, Linkedin, Mail, FileText } from "lucide-react";
import { toast } from "sonner";
import { Tile } from "../Tile";
import { links } from "@/lib/portfolio-data";

const tags = ["GPU", "CUDA", "C++", "SYSTEMS"];

export function IdentitySection({ onSelect }: { onSelect: (id: string) => void }) {
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(links.email);
      toast.success("Email copied to clipboard");
    } catch {
      toast.error("Failed to copy email");
    }
  };

  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 auto-rows-[110px] md:auto-rows-[120px]">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="col-span-2 row-span-2 md:col-span-3 md:row-span-2"
        style={{ transformStyle: "preserve-3d" }}
      >
        <Tile
          id="identity"
          label="Utkarsh Joshi"
          className="h-full"
          bg="bg-tile"
          onClick={() => onSelect("about")}
        >
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber tagline-cursor">
            Systems &amp; Simulation Engineer
          </div>
          <h1 className="mt-2 text-3xl md:text-5xl font-semibold tracking-tight">Utkarsh Joshi</h1>
          <div className="mt-3 flex flex-wrap gap-2">
            {tags.map((t) => (
              <span
                key={t}
                className="font-mono text-xs uppercase tracking-[0.15em] px-3 py-1.5 border border-border text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>
          <div className="mt-2 font-mono text-xs uppercase tracking-[0.15em] text-amber">
            Open to internships in systems / HPC / GPU engineering
          </div>
        </Tile>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.05 }}
        className="col-span-2 row-span-1 md:col-span-1 md:row-span-2"
        style={{ transformStyle: "preserve-3d" }}
      >
        <a href={links.github} target="_blank" rel="noopener noreferrer" className="block h-full">
          <motion.div
            whileHover={{ rotateY: 6, rotateX: -4, scale: 1.015, z: 20 }}
            whileTap={{ scale: 0.985, rotateY: 0, rotateX: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 22 }}
            style={{ minHeight: 0, transformStyle: "preserve-3d" }}
            className="group relative overflow-hidden border border-transparent hover:border-amber cursor-pointer bg-tile-alt h-full"
          >
            <div
              className="relative z-10 h-full w-full p-5 flex flex-col items-center justify-center"
              style={{ transform: "translateZ(20px)" }}
            >
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-amber/30 group-hover:border-amber transition-colors">
                <img src="/avatar.jpg" alt="Utkarsh Joshi" className="w-full h-full object-cover" />
              </div>
              <span className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                @{links.githubUser}
              </span>
            </div>
            <div
              className="absolute bottom-3 left-4 z-20 font-mono text-[10px] tracking-[0.15em] uppercase text-muted-foreground group-hover:text-amber transition-colors"
              style={{ transform: "translateZ(30px)" }}
            >
              GitHub
            </div>
          </motion.div>
        </a>
      </motion.div>

      <ContactTile
        href={links.linkedin}
        Icon={Linkedin}
        label="LinkedIn"
        sub="profile"
        delay={0.1}
      />
      <ContactTile onClick={copyEmail} Icon={Mail} label="Email" sub={links.email} delay={0.15} />
      <ContactTile
        href={links.resume}
        Icon={FileText}
        label="Resume"
        sub="resume.pdf"
        delay={0.2}
        accent
      />
      <ContactTile
        href={links.github}
        Icon={Github}
        label="GitHub"
        sub={links.githubUser}
        delay={0.25}
      />
    </section>
  );
}

function ContactTile({
  href,
  onClick,
  Icon,
  label,
  sub,
  delay,
  accent,
  external = true,
}: {
  href?: string;
  onClick?: () => void;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  sub: string;
  delay: number;
  accent?: boolean;
  external?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="col-span-1 row-span-1"
      style={{ transformStyle: "preserve-3d" }}
    >
      <Tile
        label={label}
        href={href}
        onClick={onClick}
        external={external}
        className={`h-full ${accent ? "border-b-2 border-b-amber" : ""}`}
        bg={accent ? "bg-tile-alt" : "bg-tile"}
      >
        <Icon className="w-5 h-5 text-amber" aria-hidden="true" />
        <div className="mt-auto pb-6 font-mono text-xs break-all">{sub}</div>
      </Tile>
    </motion.div>
  );
}
