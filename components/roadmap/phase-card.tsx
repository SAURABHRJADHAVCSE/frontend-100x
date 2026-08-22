import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { RoadmapPhase } from "@/lib/roadmap-data";

type PhaseCardProps = {
  phase: RoadmapPhase;
  done: number;
  total: number;
  percent: number;
};

export function PhaseCard({ phase, done, total, percent }: PhaseCardProps) {
  const isComplete = total > 0 && done === total;
  const accent = `var(${phase.accentVar})`;

  return (
    <Link href={`/roadmap/${phase.id}`} className="group block">
      <Card
        className="h-full border-l-4 py-0 transition-colors hover:ring-foreground/20"
        style={{ borderLeftColor: accent }}
      >
        <CardHeader className="gap-3 pt-5">
          <div className="flex items-center justify-between">
            <span
              className="font-heading text-[11px] font-bold tracking-widest uppercase"
              style={{ color: accent }}
            >
              Phase {phase.number}
            </span>
            <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] text-muted-foreground">
              {phase.duration}
            </span>
          </div>
          <h3 className="font-heading text-base font-semibold leading-snug text-foreground">
            {phase.title}
          </h3>
        </CardHeader>
        <CardContent className="pb-5">
          {isComplete ? (
            <Badge variant="outline" className="gap-1 border-success/30 bg-success/10 text-success">
              <CheckCircle2 className="size-3" aria-hidden="true" />
              Phase complete
            </Badge>
          ) : (
            <div className="flex items-center gap-3">
              <Progress value={percent} className="flex-1" />
              <span className="text-xs tabular-nums text-muted-foreground">
                {done}/{total}
              </span>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
