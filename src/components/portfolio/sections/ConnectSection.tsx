import { motion } from "framer-motion";
import { User, Send } from "lucide-react";
import { Tile } from "../Tile";

export function ConnectSection({
  seed,
  onOpenAbout,
  onOpenContact,
}: {
  seed: number;
  onOpenAbout: () => void;
  onOpenContact: () => void;
}) {
  return (
    <section className="mt-2">
      <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-amber mb-3">
        Connect
      </div>
      <div className="grid grid-cols-2 gap-2 md:gap-3 auto-rows-[110px] md:auto-rows-[120px]">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="col-span-1 row-span-1"
        >
          <Tile label="About" onClick={onOpenAbout} className="h-full" bg="bg-tile">
            <User className="w-5 h-5 text-amber" />
            <div className="mt-auto pb-6 font-mono text-xs">education · background</div>
          </Tile>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="col-span-1 row-span-1"
        >
          <Tile label="Contact" onClick={onOpenContact} className="h-full" bg="bg-tile-alt">
            <Send className="w-5 h-5 text-amber" />
            <div className="mt-auto pb-6 font-mono text-xs">get in touch</div>
          </Tile>
        </motion.div>
      </div>
    </section>
  );
}
