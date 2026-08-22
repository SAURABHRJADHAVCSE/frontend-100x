import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
      </header>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {PHASES.map((phase) => (
          <Card key={phase.id} className="h-full">
            <CardHeader>
              <span className="font-heading text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                Phase {phase.number}
              </span>
              <CardTitle className="text-lg font-semibold tracking-tight">{phase.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="flex flex-col divide-y divide-border/60">
                {phase.topics.map((t, i) => (
                  <li key={t.slug}>
                    <Link
                      href={`/topics/${t.slug}`}
                      className="group -mx-2 flex items-baseline gap-2.5 rounded-md px-2 py-2 transition-colors hover:bg-muted"
                    >
                      <span className="font-mono text-[11px] tabular-nums text-muted-foreground/70">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[13.5px] leading-snug font-medium text-foreground/85 transition-colors group-hover:text-foreground">
                        {t.title}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
