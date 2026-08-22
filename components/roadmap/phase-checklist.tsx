"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useRoadmapProgress } from "@/lib/use-roadmap-progress";
import type { RoadmapPhase } from "@/lib/roadmap-data";
import { cn } from "@/lib/utils";

type PhaseChecklistProps = {
  phase: RoadmapPhase;
  previous?: RoadmapPhase;
  next?: RoadmapPhase;
};

export function PhaseChecklist({ phase, previous, next }: PhaseChecklistProps) {
  const { isItemChecked, toggleItem, getPhaseProgress } = useRoadmapProgress();
  const { done, total, percent } = getPhaseProgress(phase.id);
  const accent = `var(${phase.accentVar})`;

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8 space-y-4">
        <div className="flex items-center justify-between">
          <span
            className="font-heading text-xs font-bold tracking-widest uppercase"
            style={{ color: accent }}
          >
            Phase {phase.number}
          </span>
          <span className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">{phase.duration}</span>
        </div>
        <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground">{phase.title}</h1>
        <div className="flex items-center gap-3">
          <Progress value={percent} className="max-w-xs flex-1" />
          <span className="text-sm tabular-nums text-muted-foreground">
            {done}/{total} topics
          </span>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-border">
        {phase.items.map((item, index) => {
          const checked = isItemChecked(item.id);
          return (
            <div key={item.id}>
              {index > 0 && <Separator />}
              <label
                htmlFor={`item-${item.id}`}
                className="flex cursor-pointer items-start gap-3 px-4 py-3.5 transition-colors hover:bg-muted/50"
              >
                <Checkbox
                  id={`item-${item.id}`}
                  checked={checked}
                  onCheckedChange={(value) => toggleItem(item.id, value === true)}
                  className="mt-0.5"
                />
                <div className="min-w-0 flex-1">
                  <p className={cn("text-sm font-medium text-foreground", checked && "text-muted-foreground line-through")}>
                    {item.title}
                  </p>
                  <p className={cn("mt-0.5 text-xs text-muted-foreground", checked && "text-muted-foreground/60")}>
                    {item.description}
                  </p>
                </div>
              </label>
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {phase.resources.map((resource) => (
          <a
            key={resource.url}
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs transition-colors",
              resource.free
                ? "border-success/30 bg-success/10 text-success hover:bg-success/20"
                : "border-border bg-muted text-muted-foreground hover:text-foreground",
            )}
          >
            {resource.label}
            <ExternalLink className="size-3" aria-hidden="true" />
          </a>
        ))}
      </div>

      <nav className="mt-12 flex items-center justify-between gap-4 border-t border-border pt-6">
        {previous ? (
          <Link
            href={`/roadmap/${previous.id}`}
            className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            <span>
              Phase {previous.number}
              <span className="hidden sm:inline"> — {previous.title}</span>
            </span>
          </Link>
        ) : (
          <Link href="/" className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft className="size-4" aria-hidden="true" />
            Home
          </Link>
        )}
        {next ? (
          <Link
            href={`/roadmap/${next.id}`}
            className="flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-primary"
          >
            <span>
              Phase {next.number}
              <span className="hidden sm:inline"> — {next.title}</span>
            </span>
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        ) : (
          <Badge variant="secondary">Final phase 🎉</Badge>
        )}
      </nav>
    </div>
  );
}
