import { OverviewProgress } from "@/components/roadmap/overview-progress";
import { PhaseGrid } from "@/components/roadmap/phase-grid";
import { PHASES } from "@/lib/roadmap-data";

export default function Home() {
  return (
    <main className="w-full px-4 py-10 sm:px-6 lg:px-10 xl:px-16">
      <header className="mb-10 max-w-2xl">
        <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Frontend Roadmap
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {PHASES.reduce((n, p) => n + p.topics.length, 0)} topics across {PHASES.length} phases. Pick a topic to open
          its page.
        </p>
        <OverviewProgress />
      </header>

      <PhaseGrid />
    </main>
  );
}
