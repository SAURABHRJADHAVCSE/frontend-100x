"use client";

import { Progress } from "@/components/ui/progress";
import { useRoadmapProgress } from "@/lib/use-roadmap-progress";

export function OverviewProgress() {
  const { totalDone, totalTopics, remaining, percent } = useRoadmapProgress();

  return (
    <div className="mt-5 max-w-md">
      <div className="mb-2 flex items-baseline justify-between text-sm">
        <span className="font-medium text-foreground">
          {totalDone} / {totalTopics} completed
        </span>
        <span className="text-muted-foreground">
          {remaining === 0 ? "all done 🎉" : `${remaining} left`}
        </span>
      </div>
      <Progress value={percent} />
    </div>
  );
}
