import { CodeBlock } from "@/components/topic/code-block";
import { PositioningPlayground } from "@/components/topic/css-playgrounds";
import { Callout, Code, H2, H3, Highlight, OL, P, UL } from "@/components/topic/prose";

export default function DisplayPositioningTopic() {
  return (
    <div>
      <P>
        The <Code>display</Code> property dictates how an element behaves in block flow, while <Code>position</Code> allows precise placement, overlaying, and sticky scroll behaviors.
      </P>

      <PositioningPlayground />

      <H2>1. Display Types Demystified</H2>
      <UL>
        <li>
          <Code>block</Code> — Takes up 100% available container width, starts on a new line. (e.g. <Code>&lt;div&gt;</Code>, <Code>&lt;p&gt;</Code>).
        </li>
        <li>
          <Code>inline</Code> — Flow inside text without breaking lines. Respects horizontal padding/margin but ignores vertical height/width! (e.g. <Code>&lt;span&gt;</Code>, <Code>&lt;a&gt;</Code>).
        </li>
        <li>
          <Code>inline-block</Code> — Flows like inline text, but respects custom width, height, and vertical padding.
        </li>
        <li>
          <Code>contents</Code> — <Highlight>Removes the container box itself from layout</Highlight>, rendering children directly inside the parent grid or flexbox!
        </li>
      </UL>

      <H2>2. Positioning Schemes</H2>
      <CodeBlock
        lang="css"
        title="Positioning Reference Rules"
        code={`/* Relative: Keeps original space in flow, offsets visually */
.relative-box {
  position: relative;
  top: 10px;
}

/* Absolute: Removes from flow, positions relative to nearest ancestor with position != static */
.modal-overlay {
  position: absolute;
  inset: 0;
}

/* Sticky: Behaves relative until scroll threshold, then pins like fixed */
.table-header {
  position: sticky;
  top: 0;
  z-index: 10;
}`}
      />

      <H2>3. Z-Index & Stacking Context</H2>
      <P>
        <Code>z-index</Code> only works on positioned elements (<Code>relative</Code>, <Code>absolute</Code>, <Code>fixed</Code>, <Code>sticky</Code>) or flex/grid items.
      </P>
      <Callout tone="warning">
        A high <Code>z-index: 9999</Code> inside a child container cannot render above a sibling if the parent container has a lower stacking context! Create explicit stacking bounds using <Code>isolation: isolate</Code>.
      </Callout>

      <H3>Best Practices</H3>
      <OL>
        <li>Use <Code>position: absolute</Code> inside a <Code>position: relative</Code> parent container.</li>
        <li>Use <Code>inset: 0</Code> as modern shorthand for <Code>top: 0; right: 0; bottom: 0; left: 0;</Code>.</li>
        <li>Use <Code>isolation: isolate</Code> on component wrappers to avoid z-index leak issues.</li>
      </OL>
    </div>
  );
}
