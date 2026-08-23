import type { ReactNode } from "react";

type FigureProps = {
  caption: string;
  children: ReactNode;
};

function Figure({ caption, children }: FigureProps) {
  return (
    <figure className="my-6 rounded-lg border border-border bg-muted/30 p-4">
      {children}
      <figcaption className="mt-3 text-center text-xs text-muted-foreground">{caption}</figcaption>
    </figure>
  );
}

/** Browser <-> Internet <-> Server, with an animated packet travelling each way. */
export function ClientServerDiagram() {
  return (
    <Figure caption="A browser (client) sends a request over the internet; a server sends back a response.">
      <svg viewBox="0 0 480 140" className="mx-auto w-full max-w-md text-foreground" aria-hidden="true">
        <rect x="10" y="45" width="110" height="50" rx="8" className="fill-card stroke-border" strokeWidth="1.5" />
        <text x="65" y="75" textAnchor="middle" className="fill-foreground text-[13px] font-medium">
          Browser
        </text>

        <rect x="360" y="45" width="110" height="50" rx="8" className="fill-card stroke-border" strokeWidth="1.5" />
        <text x="415" y="75" textAnchor="middle" className="fill-foreground text-[13px] font-medium">
          Server
        </text>

        <line x1="120" y1="60" x2="360" y2="60" className="stroke-border" strokeWidth="1.5" />
        <circle cx="120" cy="60" r="4" className="fill-primary">
          <animate attributeName="cx" values="120;360" dur="1.8s" repeatCount="indefinite" />
        </circle>
        <text x="240" y="52" textAnchor="middle" className="fill-muted-foreground text-[10px]">
          request
        </text>

        <line x1="120" y1="85" x2="360" y2="85" className="stroke-border" strokeWidth="1.5" />
        <circle cx="360" cy="85" r="4" className="fill-primary">
          <animate attributeName="cx" values="360;120" dur="1.8s" begin="0.9s" repeatCount="indefinite" />
        </circle>
        <text x="240" y="103" textAnchor="middle" className="fill-muted-foreground text-[10px]">
          response
        </text>
      </svg>
    </Figure>
  );
}

/** The five hops of a DNS lookup, drawn as a flow. */
export function DnsLookupDiagram() {
  const steps = ["Browser", "Resolver", "Root server", "TLD server (.com)", "Authoritative server"];
  return (
    <Figure caption="Each step answers 'who do I ask next?' until the resolver gets a final IP address.">
      <svg viewBox="0 0 560 90" className="mx-auto w-full text-foreground" aria-hidden="true">
        {steps.map((label, i) => {
          const x = 10 + i * 138;
          return (
            <g key={label}>
              <rect x={x} y="20" width="118" height="44" rx="7" className="fill-card stroke-border" strokeWidth="1.5" />
              <text x={x + 59} y="46" textAnchor="middle" className="fill-foreground text-[10.5px] font-medium">
                {label}
              </text>
              {i < steps.length - 1 && (
                <line
                  x1={x + 118}
                  y1="42"
                  x2={x + 138}
                  y2="42"
                  className="stroke-muted-foreground"
                  strokeWidth="1.5"
                  markerEnd="url(#arrow)"
                />
              )}
            </g>
          );
        })}
        <defs>
          <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" className="fill-muted-foreground" />
          </marker>
        </defs>
      </svg>
    </Figure>
  );
}

/** Packets taking independent paths across the network and reassembling at the destination. */
export function PacketSwitchingDiagram() {
  return (
    <Figure caption="Data is split into packets that can travel different routes and get reassembled at the destination.">
      <svg viewBox="0 0 480 160" className="mx-auto w-full max-w-md text-foreground" aria-hidden="true">
        <rect x="10" y="60" width="90" height="40" rx="8" className="fill-card stroke-border" strokeWidth="1.5" />
        <text x="55" y="85" textAnchor="middle" className="fill-foreground text-[12px] font-medium">
          Sender
        </text>

        <rect x="380" y="60" width="90" height="40" rx="8" className="fill-card stroke-border" strokeWidth="1.5" />
        <text x="425" y="85" textAnchor="middle" className="fill-foreground text-[12px] font-medium">
          Receiver
        </text>

        {[
          { cy: 30, delay: "0s" },
          { cy: 80, delay: "0.5s" },
          { cy: 130, delay: "1s" },
        ].map((p, i) => (
          <g key={i}>
            <path
              d={`M100,80 Q240,${p.cy} 380,80`}
              fill="none"
              className="stroke-border"
              strokeWidth="1.2"
              strokeDasharray="4 3"
            />
            <circle r="5" className="fill-primary">
              <animateMotion dur="2.4s" begin={p.delay} repeatCount="indefinite" path={`M100,80 Q240,${p.cy} 380,80`} />
            </circle>
          </g>
        ))}
      </svg>
    </Figure>
  );
}

/** Breaks a shell command into command / flag / argument parts. */
export function CommandAnatomyDiagram() {
  const parts = [
    { label: "command", text: "ls", x: 10, w: 70, tone: "primary" as const },
    { label: "flag", text: "-l", x: 92, w: 60, tone: "muted" as const },
    { label: "flag", text: "-a", x: 164, w: 60, tone: "muted" as const },
    { label: "argument", text: "~/projects", x: 236, w: 150, tone: "accent" as const },
  ];
  const fill: Record<string, string> = {
    primary: "fill-primary/15 stroke-primary/50",
    muted: "fill-muted stroke-border",
    accent: "fill-foreground/10 stroke-foreground/30",
  };
  return (
    <Figure caption="A command's flags change how it behaves; arguments tell it what to act on.">
      <svg viewBox="0 0 410 90" className="mx-auto w-full max-w-md text-foreground" aria-hidden="true">
        {parts.map((p) => (
          <g key={p.label + p.text}>
            <rect x={p.x} y="20" width={p.w} height="34" rx="6" className={fill[p.tone]} strokeWidth="1.5" />
            <text x={p.x + p.w / 2} y="42" textAnchor="middle" className="fill-foreground font-mono text-[12px]">
              {p.text}
            </text>
            <text x={p.x + p.w / 2} y="70" textAnchor="middle" className="fill-muted-foreground text-[9.5px] uppercase tracking-wide">
              {p.label}
            </text>
          </g>
        ))}
      </svg>
    </Figure>
  );
}

/** You (typing) -> Shell (interprets) -> Operating System (does the work). */
export function ShellStackDiagram() {
  const layers = [
    { label: "You", sub: "type a command" },
    { label: "Shell", sub: "bash / zsh / PowerShell — parses & runs it" },
    { label: "Operating System", sub: "actually reads files, starts programs" },
  ];
  return (
    <Figure caption="The shell is the translator between what you type and what the OS actually does.">
      <svg viewBox="0 0 420 180" className="mx-auto w-full max-w-sm text-foreground" aria-hidden="true">
        {layers.map((l, i) => {
          const y = 10 + i * 58;
          return (
            <g key={l.label}>
              <rect x="10" y={y} width="400" height="46" rx="8" className="fill-card stroke-border" strokeWidth="1.5" />
              <text x="26" y={y + 20} className="fill-foreground text-[13px] font-semibold">
                {l.label}
              </text>
              <text x="26" y={y + 36} className="fill-muted-foreground text-[10px]">
                {l.sub}
              </text>
              {i < layers.length - 1 && (
                <line
                  x1="210"
                  y1={y + 46}
                  x2="210"
                  y2={y + 58}
                  className="stroke-muted-foreground"
                  strokeWidth="1.5"
                  markerEnd="url(#arrow-v)"
                />
              )}
            </g>
          );
        })}
        <defs>
          <marker id="arrow-v" markerWidth="8" markerHeight="8" refX="3" refY="6" orient="auto">
            <path d="M0,0 L3,6 L6,0 Z" className="fill-muted-foreground" />
          </marker>
        </defs>
      </svg>
    </Figure>
  );
}

type FlowStep = { label: string; sub?: string };

/** A generic horizontal step-by-step flow — reused for Git areas, the GitHub PR flow, and DevTools panels. */
export function StepFlowDiagram({ caption, steps }: { caption: string; steps: FlowStep[] }) {
  const boxWidth = 140;
  const gap = 24;
  const width = steps.length * boxWidth + (steps.length - 1) * gap + 20;
  const hasSub = steps.some((s) => s.sub);
  const height = hasSub ? 76 : 56;

  return (
    <Figure caption={caption}>
      <svg viewBox={`0 0 ${width} ${height}`} className="mx-auto w-full text-foreground" aria-hidden="true">
        {steps.map((step, i) => {
          const x = 10 + i * (boxWidth + gap);
          return (
            <g key={step.label}>
              <rect
                x={x}
                y="6"
                width={boxWidth}
                height={height - 12}
                rx="8"
                className="fill-card stroke-border"
                strokeWidth="1.5"
              />
              <text
                x={x + boxWidth / 2}
                y={hasSub ? "30" : "34"}
                textAnchor="middle"
                className="fill-foreground text-[12px] font-semibold"
              >
                {step.label}
              </text>
              {step.sub && (
                <text x={x + boxWidth / 2} y="48" textAnchor="middle" className="fill-muted-foreground text-[9px]">
                  {step.sub}
                </text>
              )}
              {i < steps.length - 1 && (
                <line
                  x1={x + boxWidth}
                  y1={(height - 12) / 2 + 6}
                  x2={x + boxWidth + gap}
                  y2={(height - 12) / 2 + 6}
                  className="stroke-muted-foreground"
                  strokeWidth="1.5"
                  markerEnd="url(#step-arrow)"
                />
              )}
            </g>
          );
        })}
        <defs>
          <marker id="step-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" className="fill-muted-foreground" />
          </marker>
        </defs>
      </svg>
    </Figure>
  );
}

/** main branch with a feature branch splitting off and merging back in. */
export function BranchGraphDiagram() {
  const mainY = 100;
  const featureY = 40;
  const mainCommits = [40, 120, 320];
  const featureCommits = [200, 260];

  return (
    <Figure caption="A branch is just an alternate line of commits that can be merged back into main.">
      <svg viewBox="0 0 360 130" className="mx-auto w-full max-w-md text-foreground" aria-hidden="true">
        <line x1="20" y1={mainY} x2="340" y2={mainY} className="stroke-border" strokeWidth="2" />
        <line x1={mainCommits[1]} y1={mainY} x2={featureCommits[0]} y2={featureY} className="stroke-border" strokeWidth="1.5" strokeDasharray="3 3" />
        <line x1={featureCommits[0]} y1={featureY} x2={featureCommits[1]} y2={featureY} className="stroke-border" strokeWidth="2" />
        <line x1={featureCommits[1]} y1={featureY} x2={mainCommits[2]} y2={mainY} className="stroke-primary" strokeWidth="1.5" strokeDasharray="3 3" />

        {mainCommits.map((x, i) => (
          <circle key={`main-${i}`} cx={x} cy={mainY} r="6" className="fill-foreground" />
        ))}
        {featureCommits.map((x, i) => (
          <circle key={`feat-${i}`} cx={x} cy={featureY} r="6" className="fill-primary" />
        ))}

        <text x="20" y={mainY + 20} className="fill-muted-foreground text-[10px] font-medium">
          main
        </text>
        <text x={featureCommits[0]} y={featureY - 12} textAnchor="middle" className="fill-primary text-[10px] font-medium">
          feature branch
        </text>
        <text x={mainCommits[2]} y={mainY + 20} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          merge commit
        </text>
      </svg>
    </Figure>
  );
}

/** html -> head/body -> a few common body children, as a tree. */
export function DomTreeDiagram() {
  const node = (x: number, y: number, label: string, tone: "root" | "branch" | "leaf" = "leaf") => ({
    x,
    y,
    label,
    tone,
  });
  const nodes = [
    node(180, 14, "<html>", "root"),
    node(90, 60, "<head>", "branch"),
    node(270, 60, "<body>", "branch"),
    node(30, 108, "<title>", "leaf"),
    node(150, 108, "<meta>", "leaf"),
    node(220, 108, "<header>", "leaf"),
    node(290, 108, "<main>", "leaf"),
    node(355, 108, "<footer>", "leaf"),
  ];
  const edges: [number, number][] = [
    [0, 1],
    [0, 2],
    [1, 3],
    [1, 4],
    [2, 5],
    [2, 6],
    [2, 7],
  ];
  const fill: Record<string, string> = {
    root: "fill-primary/15 stroke-primary/50",
    branch: "fill-card stroke-border",
    leaf: "fill-muted stroke-border",
  };
  return (
    <Figure caption="Every HTML document is one tree: html branches into head and body, which branch further.">
      <svg viewBox="0 0 400 140" className="mx-auto w-full max-w-lg text-foreground" aria-hidden="true">
        {edges.map(([a, b], i) => (
          <line
            key={i}
            x1={nodes[a].x}
            y1={nodes[a].y + 10}
            x2={nodes[b].x}
            y2={nodes[b].y - 10}
            className="stroke-border"
            strokeWidth="1.5"
          />
        ))}
        {nodes.map((n) => (
          <g key={n.label}>
            <rect x={n.x - 32} y={n.y - 10} width="64" height="22" rx="5" className={fill[n.tone]} strokeWidth="1.5" />
            <text x={n.x} y={n.y + 5} textAnchor="middle" className="fill-foreground font-mono text-[9.5px]">
              {n.label}
            </text>
          </g>
        ))}
      </svg>
    </Figure>
  );
}

/** A real page wireframe showing where each landmark element typically sits. */
export function SemanticLayoutDiagram() {
  return (
    <Figure caption="Landmark elements aren't just labels — screen readers use them to let users jump straight to a section.">
      <svg viewBox="0 0 400 260" className="mx-auto w-full max-w-sm text-foreground" aria-hidden="true">
        <rect x="4" y="4" width="392" height="252" rx="8" className="fill-none stroke-border" strokeWidth="1.5" />

        <rect x="14" y="14" width="372" height="40" rx="5" className="fill-primary/10 stroke-primary/40" strokeWidth="1.5" />
        <text x="30" y="38" className="fill-primary font-mono text-[11px] font-semibold">
          {"<header>"}
        </text>

        <rect x="14" y="64" width="90" height="150" rx="5" className="fill-muted stroke-border" strokeWidth="1.5" />
        <text x="24" y="84" className="fill-foreground font-mono text-[10px] font-semibold">
          {"<aside>"}
        </text>
        <text x="24" y="100" className="fill-muted-foreground text-[8.5px]">
          sidebar, related links
        </text>

        <rect x="114" y="64" width="272" height="150" rx="5" className="fill-card stroke-border" strokeWidth="1.5" />
        <text x="126" y="84" className="fill-foreground font-mono text-[11px] font-semibold">
          {"<main>"}
        </text>
        <rect x="126" y="94" width="248" height="52" rx="4" className="fill-muted/70 stroke-border" strokeWidth="1" />
        <text x="136" y="112" className="fill-muted-foreground font-mono text-[9.5px]">
          {"<article>"}
        </text>
        <rect x="126" y="154" width="248" height="52" rx="4" className="fill-muted/70 stroke-border" strokeWidth="1" />
        <text x="136" y="172" className="fill-muted-foreground font-mono text-[9.5px]">
          {"<section>"}
        </text>

        <rect x="14" y="224" width="372" height="32" rx="5" className="fill-primary/10 stroke-primary/40" strokeWidth="1.5" />
        <text x="30" y="244" className="fill-primary font-mono text-[11px] font-semibold">
          {"<footer>"}
        </text>
      </svg>
    </Figure>
  );
}

/** The browser picks one candidate image from srcset based on the viewport's real width. */
export function ResponsiveImageDiagram() {
  const candidates = [
    { label: "small.jpg", sub: "480w", active: true },
    { label: "medium.jpg", sub: "800w", active: false },
    { label: "large.jpg", sub: "1600w", active: false },
  ];
  return (
    <Figure caption="On a narrow screen, the browser picks the smallest image that still looks sharp — saving bandwidth automatically.">
      <svg viewBox="0 0 360 130" className="mx-auto w-full max-w-md text-foreground" aria-hidden="true">
        <rect x="130" y="10" width="100" height="34" rx="7" className="fill-card stroke-border" strokeWidth="1.5" />
        <text x="180" y="31" textAnchor="middle" className="fill-foreground text-[11px] font-medium">
          Narrow viewport
        </text>

        {candidates.map((c, i) => {
          const x = 10 + i * 120;
          return (
            <g key={c.label}>
              <line
                x1="180"
                y1="44"
                x2={x + 50}
                y2="76"
                className={c.active ? "stroke-primary" : "stroke-border"}
                strokeWidth={c.active ? 2 : 1.2}
                strokeDasharray={c.active ? undefined : "3 3"}
              />
              <rect
                x={x}
                y="78"
                width="100"
                height="38"
                rx="7"
                className={c.active ? "fill-primary/15 stroke-primary/60" : "fill-muted stroke-border"}
                strokeWidth="1.5"
              />
              <text
                x={x + 50}
                y="98"
                textAnchor="middle"
                className={c.active ? "fill-primary font-mono text-[10.5px] font-semibold" : "fill-muted-foreground font-mono text-[10.5px]"}
              >
                {c.label}
              </text>
              <text x={x + 50} y="111" textAnchor="middle" className="fill-muted-foreground text-[8.5px]">
                {c.sub}
              </text>
            </g>
          );
        })}
      </svg>
    </Figure>
  );
}

/** A table's row/column grid, with the header row and thead/tbody grouping highlighted. */
export function TableAnatomyDiagram() {
  const cols = 3;
  const rows = 3;
  const cellW = 90;
  const cellH = 32;
  const width = cols * cellW + 20;
  const theadTop = 16;
  const theadHeight = cellH + 8;
  const tbodyTop = theadTop + theadHeight + 14;
  const tbodyHeight = (rows - 1) * cellH + 8;
  const height = tbodyTop + tbodyHeight + 8;

  return (
    <Figure caption="thead groups the header row; tbody groups the data rows — th cells are header cells, td cells hold data.">
      <svg viewBox={`0 0 ${width} ${height}`} className="mx-auto w-full max-w-sm text-foreground" aria-hidden="true">
        <rect x="6" y={theadTop} width={width - 12} height={theadHeight} rx="6" className="fill-primary/10 stroke-primary/40" strokeWidth="1.5" />
        <text x="14" y={theadTop - 4} className="fill-primary text-[9px] font-semibold uppercase tracking-wide">
          thead
        </text>
        <rect x="6" y={tbodyTop} width={width - 12} height={tbodyHeight} rx="6" className="fill-muted/50 stroke-border" strokeWidth="1.5" />
        <text x="14" y={tbodyTop - 4} className="fill-muted-foreground text-[9px] font-semibold uppercase tracking-wide">
          tbody
        </text>

        {Array.from({ length: rows }).map((_, r) =>
          Array.from({ length: cols }).map((_, c) => {
            const x = 10 + c * cellW;
            const y = r === 0 ? theadTop + 4 : tbodyTop + 4 + (r - 1) * cellH;
            const isHeader = r === 0;
            return (
              <g key={`${r}-${c}`}>
                <rect
                  x={x}
                  y={y}
                  width={cellW - 4}
                  height={cellH - 4}
                  rx="4"
                  className={isHeader ? "fill-primary/15 stroke-primary/50" : "fill-card stroke-border"}
                  strokeWidth="1"
                />
                <text
                  x={x + (cellW - 4) / 2}
                  y={y + (cellH - 4) / 2 + 4}
                  textAnchor="middle"
                  className={isHeader ? "fill-primary font-mono text-[9px] font-semibold" : "fill-muted-foreground font-mono text-[9px]"}
                >
                  {isHeader ? "th" : "td"}
                </text>
              </g>
            );
          }),
        )}
      </svg>
    </Figure>
  );
}

/** Maps a search-result snippet back to the meta tags that produced each part. */
export function SearchResultAnatomyDiagram() {
  return (
    <Figure caption="Search engines build the result snippet almost entirely from your <title> and meta description.">
      <svg viewBox="0 0 400 130" className="mx-auto w-full max-w-md text-foreground" aria-hidden="true">
        <rect x="4" y="4" width="392" height="122" rx="8" className="fill-card stroke-border" strokeWidth="1.5" />

        <text x="20" y="30" className="fill-muted-foreground text-[9.5px]">
          example.com › blog › post-1
        </text>
        <text x="20" y="52" className="fill-primary text-[13px] font-medium">
          How Semantic HTML Improves Accessibility
        </text>
        <text x="20" y="76" className="fill-foreground/80 text-[10.5px]">
          Learn why landmark elements and headings matter for screen readers,
        </text>
        <text x="20" y="90" className="fill-foreground/80 text-[10.5px]">
          SEO, and long-term maintainability — with real examples.
        </text>

        <text x="220" y="52" className="fill-muted-foreground font-mono text-[9px]">
          ← {"<title>"}
        </text>
        <text x="220" y="90" className="fill-muted-foreground font-mono text-[9px]">
          ← meta description
        </text>
      </svg>
    </Figure>
  );
}

/** Tab-key focus order flowing through a page's interactive elements, in DOM order. */
export function TabOrderDiagram() {
  const stops = [
    { x: 40, y: 20, label: "Skip link" },
    { x: 150, y: 20, label: "Nav link" },
    { x: 260, y: 20, label: "Nav link" },
    { x: 260, y: 80, label: "Submit button" },
    { x: 150, y: 80, label: "Input field" },
    { x: 40, y: 80, label: "Input field" },
  ];
  return (
    <Figure caption="Pressing Tab moves focus through every focusable element in DOM order — not visual order.">
      <svg viewBox="0 0 340 110" className="mx-auto w-full max-w-md text-foreground" aria-hidden="true">
        {stops.map((s, i) => (
          <g key={i}>
            {i < stops.length - 1 && (
              <line
                x1={s.x}
                y1={s.y}
                x2={stops[i + 1].x}
                y2={stops[i + 1].y}
                className="stroke-primary/50"
                strokeWidth="1.5"
                strokeDasharray="3 3"
                markerEnd="url(#tab-arrow)"
              />
            )}
          </g>
        ))}
        {stops.map((s, i) => (
          <g key={s.label + i}>
            <circle cx={s.x} cy={s.y} r="14" className="fill-primary/15 stroke-primary/60" strokeWidth="1.5" />
            <text x={s.x} y={s.y + 4} textAnchor="middle" className="fill-primary text-[10px] font-bold">
              {i + 1}
            </text>
            <text x={s.x} y={s.y + 28} textAnchor="middle" className="fill-muted-foreground text-[8px]">
              {s.label}
            </text>
          </g>
        ))}
        <defs>
          <marker id="tab-arrow" markerWidth="7" markerHeight="7" refX="5" refY="2.5" orient="auto">
            <path d="M0,0 L5,2.5 L0,5 Z" className="fill-primary/50" />
          </marker>
        </defs>
      </svg>
    </Figure>
  );
}
