import { motion } from "framer-motion";
import { CodeforcesTile } from "../CodeforcesTile";
import { GithubStatsTile } from "../GithubStatsTile";
import { SectionHeader } from "../SectionHeader";
import { orbitalDisplacement } from "@/lib/grid-pack";

export function BeyondSection({ onSelect }: { onSelect: (id: string) => void }) {
  const cfOffset = orbitalDisplacement(0, 2, 365);
  const ghOffset = orbitalDisplacement(1, 2, 366);

  return (
    <section className="mt-6 md:mt-8 mb-8">
      <SectionHeader label="Activity" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.4, delay: 0.05 }}
          whileHover={{ y: -2, transition: { duration: 0.2 } }}
          className="col-span-1 md:col-span-2"
          style={{
            transformStyle: "preserve-3d",
            perspective: "800px",
            transform: `translate(${cfOffset.dx}px, ${cfOffset.dy}px)`,
          }}
        >
          <CodeforcesTile onClick={() => onSelect("codeforces")} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.4, delay: 0.1 }}
          whileHover={{ y: -2, transition: { duration: 0.2 } }}
          className="col-span-1 md:col-span-2"
          style={{
            transformStyle: "preserve-3d",
            perspective: "800px",
            transform: `translate(${ghOffset.dx}px, ${ghOffset.dy}px)`,
          }}
        >
          <GithubStatsTile onClick={() => onSelect("github")} />
        </motion.div>
      </div>
    </section>
  );
}
