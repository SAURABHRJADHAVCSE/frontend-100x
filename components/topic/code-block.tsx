import { codeToHtml } from "shiki";

type CodeBlockProps = {
  code: string;
  lang: string;
  title?: string;
};

export async function CodeBlock({ code, lang, title }: CodeBlockProps) {
  const html = await codeToHtml(code.trim(), {
    lang,
    theme: "github-dark",
  });

  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <div className="flex items-center justify-between border-b border-border bg-muted px-3.5 py-1.5">
        <span className="font-mono text-[11px] text-muted-foreground">{title ?? lang}</span>
        <span className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground/70">{lang}</span>
      </div>
      <div
        className="overflow-x-auto text-[13px] leading-relaxed [&_pre]:!bg-transparent [&_pre]:p-4"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
