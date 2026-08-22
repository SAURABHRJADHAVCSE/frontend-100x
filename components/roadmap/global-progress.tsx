"use client";

import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useRoadmapProgress } from "@/lib/use-roadmap-progress";
import { getLevelLabel } from "@/lib/roadmap-data";

export function GlobalProgress() {
  const { totalDone, totalTopics, phasesDone, overallPercent } = useRoadmapProgress();

  return (
    <div className="mx-auto w-full max-w-xl">
      <div className="mb-5 grid grid-cols-3 gap-2.5">
        <StatBox value={totalDone} label="completed" />
        <StatBox value={totalTopics} label="total topics" />
        <StatBox value={phasesDone} label="phases done" />
      </div>
      <div className="mb-2.5 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{overallPercent}%</span> complete
        </p>
        <Badge variant="secondary" className="font-heading text-[11px] font-bold">
          {getLevelLabel(overallPercent)}
        </Badge>
      </div>
      <Progress value={overallPercent} />
    </div>
  );
}

function StatBox({ value, label }: { value: number; label: string }) {
  return (
    <div className="rounded-lg border border-border bg-muted/40 px-4 py-3 text-center">
      <span className="block font-heading text-2xl font-bold leading-tight text-foreground">{value}</span>
      <span className="text-[11px] text-muted-foreground">{label}</span>
    </div>
  );
}
