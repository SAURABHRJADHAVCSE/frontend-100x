"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { PHASES } from "@/lib/roadmap-data";
import { useRoadmapProgress } from "@/lib/use-roadmap-progress";
import { cn } from "@/lib/utils";

export function PhaseGrid() {
  const { isDone, toggle, getPhaseProgress } = useRoadmapProgress();

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
      {PHASES.map((phase) => {
        const { done, total } = getPhaseProgress(phase.id);
        return (
          <Card key={phase.id} className="h-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <span className="font-heading text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                  Phase {phase.number}
                </span>
                <span className="font-mono text-[11px] tabular-nums text-muted-foreground">
                  {done}/{total}
                </span>
              </div>
              <CardTitle className="text-lg font-semibold tracking-tight">{phase.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="flex flex-col divide-y divide-border/60">
                {phase.topics.map((t, i) => {
                  const checked = isDone(t.slug);
                  return (
                    <li key={t.slug} className="-mx-2 flex items-center gap-2.5 rounded-md px-2 py-2 hover:bg-muted">
                      <Checkbox
                        checked={checked}
                        onCheckedChange={(value) => toggle(t.slug, value === true)}
                        aria-label={`Mark "${t.title}" as complete`}
                      />
                      <Link href={`/topics/${t.slug}`} className="group flex min-w-0 flex-1 items-baseline gap-2.5">
                        <span className="font-mono text-[11px] tabular-nums text-muted-foreground/70">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={cn(
                            "text-[13.5px] leading-snug font-medium transition-colors group-hover:text-foreground",
                            checked ? "text-muted-foreground line-through" : "text-foreground/85",
                          )}
                        >
                          {t.title}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
