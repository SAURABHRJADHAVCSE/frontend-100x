import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { RESOURCE_HUB } from "@/lib/roadmap-data";

export const metadata: Metadata = {
  title: "Resources — Frontend Roadmap",
  description: "Hand-picked free, paid, and video resources for learning frontend development.",
};

export default function ResourcesPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
      <div className="mb-10 text-center">
        <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground">Verified Resources Hub</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Hand-picked by working developers. The exact resources used at top product companies.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {RESOURCE_HUB.map((category) => (
          <div key={category.category} className="rounded-xl border border-border bg-muted/30 p-5">
            <h2 className="mb-3.5 border-b border-border pb-3 font-heading text-sm font-bold text-foreground">
              {category.category}
            </h2>
            <ul className="space-y-3">
              {category.items.map((item) => (
                <li key={item.name} className="flex items-start gap-2.5 border-b border-border/50 pb-3 last:border-0 last:pb-0">
                  <span className="mt-0.5 text-base" aria-hidden="true">
                    {item.icon}
                  </span>
                  <div className="min-w-0">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm font-semibold text-foreground hover:text-primary"
                    >
                      {item.name}
                      <ExternalLink className="size-3" aria-hidden="true" />
                    </a>
                    <Badge
                      variant={item.tag === "free" ? "outline" : "secondary"}
                      className={
                        item.tag === "free"
                          ? "ml-2 border-success/30 bg-success/10 text-success"
                          : "ml-2"
                      }
                    >
                      {item.tag.toUpperCase()}
                    </Badge>
                    <p className="mt-1 text-xs text-muted-foreground">{item.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
