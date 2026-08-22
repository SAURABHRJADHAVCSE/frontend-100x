import type { ReactNode } from "react";
import { AlertTriangle, Lightbulb } from "lucide-react";
import { cn, slugify } from "@/lib/utils";

export function H2({ children }: { children: ReactNode }) {
  const id = typeof children === "string" ? slugify(children) : undefined;
  return (
    <h2
      id={id}
      data-toc-heading
      className="font-heading mt-12 mb-4 scroll-mt-24 border-b border-border pb-2 text-xl font-bold tracking-tight text-foreground first:mt-0"
    >
      {children}
    </h2>
  );
}

export function H3({ children }: { children: ReactNode }) {
  return <h3 className="mt-7 mb-2.5 text-[17px] font-semibold tracking-tight text-foreground">{children}</h3>;
}

export function P({ children }: { children: ReactNode }) {
  return <p className="mb-4 max-w-[70ch] text-base leading-[1.75] text-foreground/80">{children}</p>;
}

export function UL({ children }: { children: ReactNode }) {
  return (
    <ul className="mb-4 ml-1 max-w-[70ch] list-disc space-y-2 pl-5 text-base leading-[1.75] text-foreground/80 marker:text-muted-foreground">
      {children}
    </ul>
  );
}

export function OL({ children }: { children: ReactNode }) {
  return (
    <ol className="mb-4 ml-1 max-w-[70ch] list-decimal space-y-2 pl-5 text-base leading-[1.75] text-foreground/80 marker:font-medium marker:text-foreground">
      {children}
    </ol>
  );
}

export function Highlight({ children }: { children: ReactNode }) {
  return (
    <strong className="rounded bg-primary/10 px-1 font-semibold text-foreground box-decoration-clone">
      {children}
    </strong>
  );
}

export function Code({ children }: { children: ReactNode }) {
  return (
    <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.85em] font-medium text-foreground">
      {children}
    </code>
  );
}

type CalloutProps = {
  children: ReactNode;
  tone?: "note" | "warning";
};

export function Callout({ children, tone = "note" }: CalloutProps) {
  const Icon = tone === "note" ? Lightbulb : AlertTriangle;
  return (
    <div
      className={cn(
        "my-6 flex max-w-[70ch] gap-3 rounded-lg border px-4 py-3.5 text-[15px] leading-relaxed",
        tone === "note"
          ? "border-primary/25 bg-primary/[0.06] text-foreground/85"
          : "border-destructive/30 bg-destructive/[0.06] text-foreground/85",
      )}
    >
      <Icon
        className={cn("mt-0.5 size-4 shrink-0", tone === "note" ? "text-primary" : "text-destructive")}
        aria-hidden="true"
      />
      <div>{children}</div>
    </div>
  );
}
