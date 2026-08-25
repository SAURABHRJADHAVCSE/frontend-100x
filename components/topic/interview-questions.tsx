"use client";

import { useState } from "react";
import { HelpCircle, ChevronDown, Eye, EyeOff, Sparkles, CheckCircle2, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type QuestionItem = {
  question: string;
  answer: string;
  codeSnippet?: string;
  difficulty?: "Basic" | "Intermediate" | "Advanced";
};

type InterviewQuestionsProps = {
  title?: string;
  questions: QuestionItem[];
};

export function InterviewQuestions({ title = "Top 10 Technical Interview Questions & Answers", questions }: InterviewQuestionsProps) {
  const [openIndices, setOpenIndices] = useState<number[]>([]);
  const [hideAnswers, setHideAnswers] = useState<boolean>(false);

  const allOpen = openIndices.length === questions.length;

  function toggleIndex(idx: number) {
    setOpenIndices((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  }

  function toggleAll() {
    if (allOpen) {
      setOpenIndices([]);
    } else {
      setOpenIndices(questions.map((_, i) => i));
    }
  }

  return (
    <div className="my-12 rounded-xl border border-border bg-card p-6 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-border pb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <HelpCircle className="size-4" />
          </div>
          <div>
            <h3 className="font-heading text-lg font-bold tracking-tight text-foreground">{title}</h3>
            <p className="text-xs text-muted-foreground">Test your knowledge with real-world technical interview questions</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => setHideAnswers(!hideAnswers)}
            className="h-8 gap-1.5 font-mono text-[11px]"
          >
            {hideAnswers ? <Eye className="size-3.5" /> : <EyeOff className="size-3.5" />}
            {hideAnswers ? "Reveal Answers" : "Self-Test Mode"}
          </Button>

          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={toggleAll}
            className="h-8 font-mono text-[11px]"
          >
            {allOpen ? "Collapse All" : "Expand All"}
          </Button>
        </div>
      </div>

      <div className="mt-4 divide-y divide-border/60">
        {questions.map((item, idx) => {
          const isOpen = openIndices.includes(idx);
          const difficulty = item.difficulty || (idx < 3 ? "Basic" : idx < 7 ? "Intermediate" : "Advanced");

          return (
            <div key={idx} className="py-3.5 first:pt-1 last:pb-1">
              <button
                type="button"
                onClick={() => toggleIndex(idx)}
                className="flex w-full items-start justify-between gap-3 text-left group"
              >
                <div className="flex items-start gap-2.5">
                  <span className="font-mono text-xs font-bold text-primary mt-0.5 min-w-[20px]">
                    Q{idx + 1}.
                  </span>
                  <div className="space-y-1">
                    <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors leading-snug block">
                      {item.question}
                    </span>

                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-mono font-medium",
                          difficulty === "Basic" && "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20",
                          difficulty === "Intermediate" && "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20",
                          difficulty === "Advanced" && "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20"
                        )}
                      >
                        {difficulty}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="shrink-0 mt-1">
                  <ChevronDown
                    className={cn(
                      "size-4 text-muted-foreground transition-transform duration-200",
                      isOpen && "rotate-180 text-primary"
                    )}
                  />
                </div>
              </button>

              {isOpen && (
                <div className="mt-3 ml-7 rounded-lg bg-muted/40 p-4 text-xs leading-relaxed text-foreground/90 space-y-3 border border-border/50 animate-in fade-in-50 duration-200">
                  {hideAnswers ? (
                    <div className="flex items-center gap-2 text-muted-foreground italic font-mono text-[11px] py-1">
                      <EyeOff className="size-3.5 text-primary" /> Answer hidden (Self-Test Mode active). Click &quot;Reveal Answers&quot; above or toggle off to view.
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-1.5 font-mono text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="size-3.5" /> Answer &amp; Explanation:
                      </div>

                      <div className="whitespace-pre-line text-sm text-foreground/85 leading-relaxed">
                        {item.answer}
                      </div>

                      {item.codeSnippet && (
                        <div className="overflow-hidden rounded-md border border-slate-800 bg-slate-950 p-3 font-mono text-xs text-slate-100">
                          <pre className="overflow-x-auto whitespace-pre leading-relaxed">
                            {item.codeSnippet}
                          </pre>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
