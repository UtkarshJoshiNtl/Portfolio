import { motion } from "framer-motion";
import { Tile } from "../Tile";
import { CyclingText } from "../CyclingText";
import { AstrosisBg } from "../AstrosisBg";
import { QuipBg } from "../QuipBg";
import { CuFlodaBg } from "../CuFlodaBg";
import { TechStackBar } from "../TechStackBar";
import { astrosisDesc, quipCycle, cuflodaCycle } from "@/lib/portfolio-data";

export function WorkSection({ onSelect }: { onSelect: (id: string) => void }) {
  return (
    <section className="mt-2">
      <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-amber mb-3">Work</div>
      <div
        className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 auto-rows-[110px] md:auto-rows-[120px]"
        style={{ perspective: 1400 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="col-span-2 row-span-2"
          style={{ transformStyle: "preserve-3d" }}
        >
          <Tile
            id="astrosis"
            label="Astrosis"
            onClick={() => onSelect("astrosis")}
            className="h-full"
            bg="bg-tile"
          >
            <AstrosisBg />
            <div className="relative z-10 flex flex-col h-full">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-amber">
                Featured
              </div>
              <div className="mt-auto pb-6">
                <div className="text-xl md:text-2xl font-semibold leading-snug max-w-md">
                  {astrosisDesc}
                </div>
              </div>
            </div>
          </Tile>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="col-span-1 row-span-2"
          style={{ transformStyle: "preserve-3d" }}
        >
          <Tile
            id="quip"
            label="Quip"
            onClick={() => onSelect("quip")}
            className="h-full"
            bg="bg-tile-alt"
          >
            <QuipBg />
            <div className="relative z-10 flex flex-col h-full">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Project
              </div>
              <div className="mt-auto pb-6">
                <CyclingText
                  items={quipCycle}
                  className="text-lg md:text-xl font-semibold leading-snug"
                />
              </div>
            </div>
          </Tile>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="col-span-1 row-span-2"
          style={{ transformStyle: "preserve-3d" }}
        >
          <Tile
            id="cufloda"
            label="CuFloda"
            onClick={() => onSelect("cufloda")}
            className="h-full"
            bg="bg-tile"
          >
            <CuFlodaBg />
            <div className="relative z-10 flex flex-col h-full">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Project
              </div>
              <div className="mt-auto pb-6">
                <CyclingText
                  items={cuflodaCycle}
                  className="text-lg md:text-xl font-semibold leading-snug"
                />
              </div>
            </div>
          </Tile>
        </motion.div>
      </div>

      <div className="mt-2 md:mt-3">
        <TechStackBar />
      </div>
    </section>
  );
}
