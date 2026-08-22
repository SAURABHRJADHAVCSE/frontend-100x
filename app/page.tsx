import { GlobalProgress } from "@/components/roadmap/global-progress";
import { PhaseGrid } from "@/components/roadmap/phase-grid";
import { TOTAL_TOPIC_COUNT, ROADMAP_PHASES } from "@/lib/roadmap-data";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-primary/5 to-transparent px-4 py-16 text-center sm:px-6">
        <span className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 font-heading text-[11px] font-semibold uppercase tracking-widest text-primary">
          2026 Edition · Top 1% Roadmap
        </span>
        <h1 className="mx-auto max-w-2xl font-heading text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          Go From Zero to Frontend Master
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground sm:text-base">
          {TOTAL_TOPIC_COUNT} topics across {ROADMAP_PHASES.length} phases. Pick a phase below to start learning — your
          progress saves automatically in this browser.
        </p>
        <div className="mt-10">
          <GlobalProgress />
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
        <h2 className="font-heading text-xl font-bold text-foreground">The 12-Phase Roadmap</h2>
        <p className="mb-6 text-sm text-muted-foreground">
          Follow phases in order — each builds on the last. Open a phase to see its checklist and resources.
        </p>
        <PhaseGrid />
      </section>
    </div>
  );
}
