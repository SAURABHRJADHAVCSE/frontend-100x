import { CodeBlock } from "@/components/topic/code-block";
import { CssGridPlayground } from "@/components/topic/css-playgrounds";
import { Callout, Code, H2, H3, Highlight, OL, P, UL } from "@/components/topic/prose";
import { InterviewQuestions } from "@/components/topic/interview-questions";

export default function CssGridCompleteTopic() {
  return (
    <div>
      <P>
        CSS Grid Layout is a 2-dimensional grid system built to handle rows and columns simultaneously with full layout control.
      </P>

      <CssGridPlayground />

      <H2>1. Core Grid Track Definitions</H2>
      <UL>
        <li>
          <Code>fr</Code> (Fractional Unit) — Represents a fraction of free available space in the grid container (e.g. <Code>grid-template-columns: 1fr 2fr 1fr;</Code>).
        </li>
        <li>
          <Code>repeat()</Code> — Duplicates track patterns without repeating code (<Code>repeat(3, 1fr)</Code>).
        </li>
        <li>
          <Code>minmax(min, max)</Code> — Sets size bounds for grid tracks (<Code>minmax(200px, 1fr)</Code>).
        </li>
      </UL>

      <H2>2. The Ultra-Responsive Grid Without Media Queries</H2>
      <P>
        Combine <Code>repeat()</Code>, <Code>auto-fit</Code>, and <Code>minmax()</Code> to build responsive card grids that adapt seamlessly to any screen size without writing a single media query!
      </P>

      <CodeBlock
        lang="css"
        title="Zero Media Query Responsive Grid"
        code={`.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}`}
      />

      <H2>3. Named Grid Areas</H2>
      <P>
        <Code>grid-template-areas</Code> lets you lay out full application shell wireframes visually right in your CSS declaration!
      </P>

      <CodeBlock
        lang="css"
        title="App Shell Grid Areas Layout"
        code={`/* Container */
.app-layout {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  grid-template-columns: 240px 1fr;
  grid-template-rows: auto 1fr auto;
}

/* Children */
header { grid-area: header; }
aside  { grid-area: sidebar; }
main   { grid-area: main; }
footer { grid-area: footer; }`}
      />

      <H3>Best Practices</H3>
      <OL>
        <li>Use CSS Grid for 2D page layouts, dashboard panels, and multi-column card galleries.</li>
        <li>Use <Code>auto-fit</Code> when you want items to stretch across empty rows.</li>
        <li>Name grid areas for complex full-page dashboard structures.</li>
      </OL>

      <InterviewQuestions questions={GRID_QUESTIONS} />
    </div>
  );
}

const GRID_QUESTIONS = [
  {
    question: "What is the difference between CSS Grid and Flexbox?",
    answer: "- CSS Grid: A 2-Dimensional layout system controls rows AND columns simultaneously (layout-driven, ideal for overall page skeletons and card matrices).\n- Flexbox: A 1-Dimensional layout system controls items along a single row OR column (content-driven, ideal for navigation bars, button groups, aligned rows).",
    difficulty: "Basic" as const,
  },
  {
    question: "What is the fr unit in CSS Grid?",
    answer: "The 'fr' (fractional) unit represents a fraction of the remaining available free space in the grid container. For example, 'grid-template-columns: 1fr 2fr' splits free space into 3 parts, giving 1 part to column 1 and 2 parts to column 2.",
    difficulty: "Basic" as const,
  },
  {
    question: "How does minmax(min, max) work in CSS Grid?",
    answer: "'minmax(min, max)' defines a size range for grid tracks. The track will never shrink smaller than 'min' and will never expand larger than 'max' (e.g. 'grid-template-columns: minmax(200px, 1fr)' ensures columns are at least 200px wide).",
    difficulty: "Intermediate" as const,
  },
  {
    question: "What is the difference between auto-fill and auto-fit in repeat()?",
    answer: "- repeat(auto-fill, ...): Creates as many track columns as physically fit into the container, even if some columns remain empty.\n- repeat(auto-fit, ...): Creates track columns that fit, but COLLAPSES any empty track columns to 0px, causing remaining items to stretch and fill the row.",
    difficulty: "Intermediate" as const,
  },
  {
    question: "How do grid-template-areas work?",
    answer: "'grid-template-areas' allows naming regions of a grid using visual string maps (e.g., 'header header', 'sidebar main', 'footer footer'). Child elements assign themselves to these areas using 'grid-area: header'.",
    difficulty: "Intermediate" as const,
  },
  {
    question: "How do you create a fully responsive card layout without writing media queries in CSS Grid?",
    answer: "Use: 'display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem;'. This automatically wraps and resizes columns based on container width.",
    difficulty: "Basic" as const,
  },
  {
    question: "What is subgrid in CSS Grid?",
    answer: "'grid-template-columns: subgrid' allows a nested child grid item to inherit and align directly to the grid track lines of its parent grid container.",
    difficulty: "Advanced" as const,
  },
  {
    question: "How do Grid Lines numbering work in CSS?",
    answer: "Grid lines are numbered 1-indexed starting from the outer edge. You can position items using start/end line numbers (e.g. 'grid-column: 1 / 3' spans from line 1 to line 3). Negative numbers (-1) reference lines counting backwards from the far end.",
    difficulty: "Basic" as const,
  },
  {
    question: "What is implicit grid vs explicit grid?",
    answer: "- Explicit Grid: Tracks defined explicitly using 'grid-template-columns' or 'grid-template-rows'.\n- Implicit Grid: Automatic extra rows/columns created by the browser when content exceeds the explicit grid bounds (styled using 'grid-auto-rows').",
    difficulty: "Advanced" as const,
  },
  {
    question: "How do justify-items and align-items work in CSS Grid?",
    answer: "- justify-items: Aligns grid items horizontally within their assigned grid cell (start, center, end, stretch).\n- align-items: Aligns grid items vertically within their assigned grid cell.",
    difficulty: "Basic" as const,
  },
];
