import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function H2({ children }: { children: ReactNode }) {
  return (
    <h2 className="font-heading mt-10 mb-3 text-xl font-bold tracking-tight text-foreground first:mt-0">
      {children}
    </h2>
  );
}

export function H3({ children }: { children: ReactNode }) {
  return <h3 className="mt-6 mb-2 text-base font-semibold text-foreground">{children}</h3>;
}

export function P({ children }: { children: ReactNode }) {
  return <p className="mb-4 text-[15px] leading-relaxed text-foreground/85">{children}</p>;
}

export function UL({ children }: { children: ReactNode }) {
  return <ul className="mb-4 ml-1 list-disc space-y-1.5 pl-4 text-[15px] leading-relaxed text-foreground/85">{children}</ul>;
}

export function OL({ children }: { children: ReactNode }) {
  return (
    <ol className="mb-4 ml-1 list-decimal space-y-1.5 pl-4 text-[15px] leading-relaxed text-foreground/85">
      {children}
    </ol>
  );
}

export function Code({ children }: { children: ReactNode }) {
  return (
    <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.85em] text-foreground">{children}</code>
  );
}

type CalloutProps = {
  children: ReactNode;
  tone?: "note" | "warning";
};

export function Callout({ children, tone = "note" }: CalloutProps) {
  return (
    <div
      className={cn(
        "my-5 rounded-lg border-l-4 bg-muted/40 px-4 py-3 text-[14px] leading-relaxed",
        tone === "note" ? "border-primary/60" : "border-destructive/60",
      )}
    >
      {children}
    </div>
  );
}
