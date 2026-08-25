import { CodeBlock } from "@/components/topic/code-block";
import { PositioningPlayground } from "@/components/topic/css-playgrounds";
import { Callout, Code, H2, H3, Highlight, OL, P, UL } from "@/components/topic/prose";
import { InterviewQuestions } from "@/components/topic/interview-questions";

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

      <InterviewQuestions questions={DISPLAY_POSITION_QUESTIONS} />
    </div>
  );
}

const DISPLAY_POSITION_QUESTIONS = [
  {
    question: "What is the difference between display: block, inline, and inline-block?",
    answer: "- block: Starts on a new line and stretches to 100% width of parent. Accepts all width, height, padding, and margin.\n- inline: Flows inline within surrounding text. Ignores width, height, and top/bottom padding/margin.\n- inline-block: Flows inline within text like an inline element, BUT respects width, height, top/bottom padding, and margin.",
    difficulty: "Basic" as const,
  },
  {
    question: "What is the difference between position: relative, absolute, fixed, and sticky?",
    answer: "- static (default): Normal document flow.\n- relative: Positioned relative to its normal flow position without affecting surrounding elements.\n- absolute: Removed from normal flow, positioned relative to its nearest positioned ancestor (non-static).\n- fixed: Removed from flow, positioned relative to the browser viewport (stays fixed during scroll).\n- sticky: Toggles between relative and fixed depending on scroll threshold.",
    difficulty: "Basic" as const,
  },
  {
    question: "What is a Stacking Context in CSS and how does z-index work?",
    answer: "A Stacking Context is a 3D layering model in the browser. An element with a higher 'z-index' renders in front of lower ones, BUT z-index values are only compared within the SAME stacking context. A child with z-index: 9999 cannot stack above an element outside if its parent's stacking context is stacked lower.",
    difficulty: "Intermediate" as const,
  },
  {
    question: "What CSS properties trigger the creation of a new Stacking Context?",
    answer: "Creating a new Stacking Context happens when an element has:\n1. 'position: relative/absolute' with a non-auto 'z-index'\n2. 'position: fixed' or 'sticky'\n3. 'opacity' less than 1\n4. 'transform', 'filter', or 'perspective' properties set\n5. 'isolation: isolate'",
    difficulty: "Advanced" as const,
  },
  {
    question: "What does display: none do vs visibility: hidden and opacity: 0?",
    answer: "- display: none: Completely removes element from document layout flow (takes 0 space, un-focusable, skipped by screen readers).\n- visibility: hidden: Hides element visually, BUT it still occupies space in layout flow (not focusable).\n- opacity: 0: Makes element 100% transparent, BUT it still occupies layout space AND remains interactive/focusable.",
    difficulty: "Basic" as const,
  },
  {
    question: "What is the modern inset property shorthand?",
    answer: "'inset: 0' is the modern shorthand equivalent for specifying 'top: 0; right: 0; bottom: 0; left: 0;'. 'inset: 10px 20px' sets top/bottom to 10px and left/right to 20px.",
    difficulty: "Basic" as const,
  },
  {
    question: "What is isolation: isolate used for?",
    answer: "'isolation: isolate' explicitly creates a new, independent stacking context on the element without needing transform or z-index hacks, preventing child z-index values from leaking into or interacting with external page layers.",
    difficulty: "Advanced" as const,
  },
  {
    question: "Why does position: sticky sometimes fail to stick?",
    answer: "Position sticky fails to stick if:\n1. No threshold offset (e.g. 'top: 0') is defined.\n2. An ancestor container has 'overflow: hidden', 'overflow: auto', or 'overflow: scroll'.\n3. The sticky container height matches the child height, leaving no room to scroll within.",
    difficulty: "Intermediate" as const,
  },
  {
    question: "What happens when an element has float: left set?",
    answer: "The element is removed from normal flow and shifted to the left edge of its container, allowing text and inline content to wrap around its right side. Using 'clear: both' or BFC prevents layout collapse.",
    difficulty: "Basic" as const,
  },
  {
    question: "What is the containing block for a position: fixed element?",
    answer: "Normally, the viewport is the containing block for a position: fixed element. However, if an ancestor element has a 'transform', 'perspective', or 'filter' property set, that ancestor becomes the containing block instead of the viewport!",
    difficulty: "Advanced" as const,
  },
];
