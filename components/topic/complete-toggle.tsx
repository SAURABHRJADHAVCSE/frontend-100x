"use client";

import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRoadmapProgress } from "@/lib/use-roadmap-progress";
import { cn } from "@/lib/utils";

export function CompleteToggle({ slug }: { slug: string }) {
  const { isDone, toggle } = useRoadmapProgress();
  const done = isDone(slug);

  return (
    <Button
      variant={done ? "default" : "outline"}
      size="sm"
      onClick={() => toggle(slug, !done)}
      className={cn(done && "bg-success text-success-foreground hover:bg-success/90")}
    >
      <Check className="size-4" aria-hidden="true" />
      {done ? "Completed" : "Mark as complete"}
    </Button>
  );
}
