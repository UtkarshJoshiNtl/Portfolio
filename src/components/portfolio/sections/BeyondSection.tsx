import { CodeforcesTile } from "../CodeforcesTile";
import { GithubStatsTile } from "../GithubStatsTile";

export function BeyondSection({ seed }: { seed: number }) {
  return (
    <section className="mt-6 md:mt-8">
      <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-amber mb-3">
        Signals
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 auto-rows-[110px] md:auto-rows-[120px]">
        <div className="col-span-1 md:col-span-2 row-span-2">
          <CodeforcesTile />
        </div>
        <div className="col-span-1 md:col-span-2 row-span-2">
          <GithubStatsTile />
        </div>
      </div>
    </section>
  );
}
