"use client";

import { ROADMAP_PHASES } from "@/lib/roadmap-data";
import { useRoadmapProgress } from "@/lib/use-roadmap-progress";
import { PhaseCard } from "@/components/roadmap/phase-card";

export function PhaseGrid() {
  const { getPhaseProgress } = useRoadmapProgress();

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {ROADMAP_PHASES.map((phase) => {
        const { done, total, percent } = getPhaseProgress(phase.id);
        return <PhaseCard key={phase.id} phase={phase} done={done} total={total} percent={percent} />;
      })}
    </div>
  );
}
