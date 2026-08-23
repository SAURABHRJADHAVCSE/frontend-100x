import { CodeBlock } from "@/components/topic/code-block";
import { CssGridPlayground } from "@/components/topic/css-playgrounds";
import { Callout, Code, H2, H3, Highlight, OL, P, UL } from "@/components/topic/prose";

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
    </div>
  );
}
