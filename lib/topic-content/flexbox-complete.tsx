import { CodeBlock } from "@/components/topic/code-block";
import { FlexboxPlayground } from "@/components/topic/css-playgrounds";
import { Callout, Code, H2, H3, Highlight, OL, P, UL } from "@/components/topic/prose";
import { InterviewQuestions } from "@/components/topic/interview-questions";

export default function FlexboxCompleteTopic() {
  return (
    <div>
      <P>
        Flexbox (Flexible Box Layout) is a 1-dimensional layout module designed for distributing space along a single axis (either row or column).
      </P>

      <FlexboxPlayground />

      <H2>1. Container Axis Properties</H2>
      <UL>
        <li>
          <Code>flex-direction</Code> — Sets Main Axis direction (<Code>row</Code>, <Code>column</Code>, <Code>row-reverse</Code>).
        </li>
        <li>
          <Code>justify-content</Code> — Aligns items along the <strong>Main Axis</strong> (<Code>flex-start</Code>, <Code>center</Code>, <Code>flex-end</Code>, <Code>space-between</Code>, <Code>space-around</Code>).
        </li>
        <li>
          <Code>align-items</Code> — Aligns items along the <strong>Cross Axis</strong> (<Code>flex-start</Code>, <Code>center</Code>, <Code>flex-end</Code>, <Code>stretch</Code>, <Code>baseline</Code>).
        </li>
        <li>
          <Code>gap</Code> — Defines explicit space between flex items without needing margin hacks.
        </li>
      </UL>

      <H2>2. Item Sizing: flex: grow shrink basis</H2>
      <P>
        The <Code>flex</Code> shorthand controls how items grow or shrink inside available container space:
      </P>

      <CodeBlock
        lang="css"
        title="Flex Shorthand Syntax"
        code={`/* flex: flex-grow flex-shrink flex-basis */
.item-fill {
  flex: 1 1 0%; /* Grows to fill available space evenly */
}

.item-fixed {
  flex: 0 0 250px; /* Fixed 250px width, does not shrink or grow */
}`}
      />

      <H2>3. The Margin Auto Centering Trick</H2>
      <P>
        In flexbox, setting <Code>margin-left: auto</Code> pushes an item all the way to the far right. This is the standard industry pattern for pushing a profile button to the right of a navigation navbar:
      </P>

      <CodeBlock
        lang="css"
        title="Navbar Layout Pattern"
        code={`<nav class="flex items-center gap-4">
  <a href="/">Logo</a>
  <a href="/docs">Docs</a>
  <button class="margin-left: auto">Sign In</button>
</nav>`}
      />

      <H3>Best Practices</H3>
      <OL>
        <li>Use Flexbox for 1-dimensional components (navbars, card headers, toolbar button rows).</li>
        <li>Use unitless <Code>flex: 1</Code> for equal-width columns.</li>
        <li>Use <Code>gap</Code> on the flex container instead of applying margins to flex items.</li>
      </OL>

      <InterviewQuestions questions={FLEXBOX_QUESTIONS} />
    </div>
  );
}

const FLEXBOX_QUESTIONS = [
  {
    question: "What is the Main Axis vs Cross Axis in Flexbox?",
    answer: "- Main Axis: Defined by 'flex-direction'. If row (default), main axis is horizontal (left-to-right). If column, main axis is vertical (top-to-bottom).\n- Cross Axis: Perpendicular to the main axis. If main axis is row, cross axis is vertical.",
    difficulty: "Basic" as const,
  },
  {
    question: "What is the difference between justify-content, align-items, and align-content?",
    answer: "- justify-content: Aligns flex items along the MAIN axis (flex-start, center, flex-end, space-between).\n- align-items: Aligns flex items along the CROSS axis on a SINGLE line.\n- align-content: Aligns MULTIPLE flex lines along the cross axis when flex-wrap is active.",
    difficulty: "Basic" as const,
  },
  {
    question: "What does the flex shorthand property (e.g. flex: 1 0 200px) represent?",
    answer: "Shorthand for flex-grow, flex-shrink, and flex-basis:\n- flex-grow: Ratio of remaining free space the item expands to absorb (e.g. 1).\n- flex-shrink: Ratio the item shrinks if space is tight (0 = never shrink).\n- flex-basis: Default starting size before growing or shrinking (e.g. 200px or auto).",
    difficulty: "Intermediate" as const,
  },
  {
    question: "How do you perfectly center an element vertically and horizontally using Flexbox?",
    answer: "Apply 'display: flex; justify-content: center; align-items: center;' on the parent container.",
    difficulty: "Basic" as const,
  },
  {
    question: "How does margin: auto work inside a Flexbox container?",
    answer: "Auto margins in Flexbox absorb all available free space in that direction. Setting 'margin-left: auto' on a flex item pushes it all the way to the far right of the container (commonly used for navbar login buttons).",
    difficulty: "Intermediate" as const,
  },
  {
    question: "What is the difference between flex-basis: 0 and flex-basis: auto?",
    answer: "- flex-basis: auto: Item starting size is based on its content width.\n- flex-basis: 0: Item starting size is 0px, so remaining container space is divided purely based on flex-grow ratios (creating equal-width columns).",
    difficulty: "Advanced" as const,
  },
  {
    question: "What is align-self in Flexbox?",
    answer: "'align-self' allows an INDIVIDUAL flex item to override the parent container's 'align-items' property along the cross axis.",
    difficulty: "Basic" as const,
  },
  {
    question: "What is the order property in Flexbox?",
    answer: "'order' controls the visual rendering sequence of flex items without modifying the underlying HTML DOM structure. Default is 0; lower values render first, higher values render last.",
    difficulty: "Intermediate" as const,
  },
  {
    question: "Why should you use gap instead of margin on flex items?",
    answer: "The 'gap' property on a flex container applies spacing ONLY between flex items, eliminating the need for complex ':last-child' margin resets or negative margin hacks.",
    difficulty: "Basic" as const,
  },
  {
    question: "When should you choose Flexbox over CSS Grid?",
    answer: "Use Flexbox for 1-Dimensional layouts (content-driven, linear rows or columns like navbars, buttons, lists). Use CSS Grid for 2-Dimensional layouts (layout-driven, strict grid rows AND columns like full page layouts or dashboard grids).",
    difficulty: "Intermediate" as const,
  },
];
