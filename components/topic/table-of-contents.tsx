"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Heading = { id: string; text: string };

export function TableOfContents({ articleId }: { articleId: string }) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const article = document.getElementById(articleId);
    if (!article) return;

    const elements = Array.from(article.querySelectorAll<HTMLHeadingElement>("[data-toc-heading]"));
    // The heading list only exists in the DOM after this static content has mounted — there is no
    // React state to derive it from, so this is a one-time read from an external system (the DOM),
    // not a subscription that should live in a callback.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHeadings(elements.map((el) => ({ id: el.id, text: el.textContent ?? "" })));

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: "-96px 0px -70% 0px", threshold: 0 },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [articleId]);

  if (headings.length === 0) return null;

  return (
    <nav aria-label="On this page" className="sticky top-20 hidden max-h-[calc(100vh-6rem)] overflow-y-auto xl:block">
      <p className="mb-3 font-heading text-xs font-semibold tracking-widest text-muted-foreground uppercase">
        On this page
      </p>
      <ul className="space-y-1.5 border-l border-border">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className={cn(
                "-ml-px block border-l-2 py-0.5 pl-3 text-[13px] leading-snug transition-colors",
                activeId === h.id
                  ? "border-primary font-medium text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
