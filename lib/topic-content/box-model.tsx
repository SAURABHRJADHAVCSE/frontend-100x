import { CodeBlock } from "@/components/topic/code-block";
import { BoxModelPlayground } from "@/components/topic/css-playgrounds";
import { Callout, Code, H2, H3, Highlight, OL, P, UL } from "@/components/topic/prose";
import { InterviewQuestions } from "@/components/topic/interview-questions";

export default function BoxModelTopic() {
  return (
    <div>
      <P>
        Every single element rendered on a web page is represented as a rectangular box by the browser&apos;s rendering engine.
        Understanding how this box is calculated — the <Highlight>CSS Box Model</Highlight> — is the absolute foundation of layout in web development.
      </P>

      <BoxModelPlayground />

      <H2>1. The Four Layers of the Box Model</H2>
      <P>
        Inside the browser, an element&apos;s box consists of four concentric areas:
      </P>
      <UL>
        <li>
          <Code>Content Box</Code> — The area where text, images, or child elements reside. Its size is defined by <Code>width</Code> and <Code>height</Code>.
        </li>
        <li>
          <Code>Padding Box</Code> — The transparent space wrapping the content area, inside the element&apos;s border. Styled with <Code>padding</Code>.
        </li>
        <li>
          <Code>Border Box</Code> — The line surrounding the padding and content. Styled with <Code>border</Code> properties.
        </li>
        <li>
          <Code>Margin Box</Code> — The transparent outer space pushing surrounding sibling elements away. Styled with <Code>margin</Code>.
        </li>
      </UL>

      <H2>2. The Universal Fix: box-sizing: border-box</H2>
      <P>
        By default, browsers use <Code>box-sizing: content-box</Code>. Under this legacy model, when you set <Code>width: 200px; padding: 20px; border: 5px solid black;</Code>, the total width on screen becomes:
      </P>
      <Callout tone="warning">
        <Code>Total Width = 200px + 20px (left padding) + 20px (right padding) + 5px (left border) + 5px (right border) = 250px!</Code>
        <br />
        This leads to broken grid layouts and unexpected horizontal scrollbars.
      </Callout>

      <P>
        Modern web apps use the universal reset to force <Code>border-box</Code> globally so that declared widths always equal the final visible width on screen:
      </P>

      <CodeBlock
        lang="css"
        title="Universal Box-Sizing Reset"
        code={`*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}`}
      />

      <H2>3. Margin Collapsing Gotchas</H2>
      <P>
        Top and bottom margins of adjacent block elements sometimes combine into a single margin equal to the largest of the two. This is called <Highlight>Margin Collapsing</Highlight>.
      </P>
      <UL>
        <li>
          <strong>Sibling Collapse:</strong> An element with <Code>margin-bottom: 30px</Code> followed by a sibling with <Code>margin-top: 20px</Code> results in a gap of <strong>30px</strong>, not 50px!
        </li>
        <li>
          <strong>Parent-Child Collapse:</strong> If a parent element has no top padding or border, the top margin of its first child escapes and collapses with the parent&apos;s margin.
        </li>
      </UL>

      <H2>4. Outline vs Border</H2>
      <P>
        An <Code>outline</Code> is drawn outside the element border but <Highlight>does not take up any space in the layout box model</Highlight>. This makes outlines ideal for focus indicators (<Code>:focus-visible</Code>) without causing layout shift.
      </P>

      <H3>Key Takeaways & Industry Practice</H3>
      <OL>
        <li>Always apply <Code>box-sizing: border-box</Code> across all elements.</li>
        <li>Use modern gap properties in Flexbox and Grid instead of relying heavily on collapsing vertical margins.</li>
        <li>Use <Code>outline</Code> for accessible focus rings so layouts remain stable.</li>
      </OL>

      <InterviewQuestions questions={BOX_MODEL_QUESTIONS} />
    </div>
  );
}

const BOX_MODEL_QUESTIONS = [
  {
    question: "What are the 4 main layers of the CSS Box Model?",
    answer: "Concentric areas from inside out:\n1. Content: Area containing text, images, or nested elements (width x height).\n2. Padding: Transparent area clearing space around content, inside the border.\n3. Border: Border line surrounding the padding and content.\n4. Margin: Transparent area outside the border pushing adjacent elements away.",
    difficulty: "Basic" as const,
  },
  {
    question: "What is the difference between box-sizing: content-box and box-sizing: border-box?",
    answer: "- content-box (default): Declared width/height applies ONLY to content. Total on-screen width = width + padding-left + padding-right + border-left + border-right.\n- border-box: Declared width/height INCLUDES content, padding, and border. Total on-screen width equals declared width.",
    difficulty: "Basic" as const,
  },
  {
    question: "What is Margin Collapsing and when does it occur?",
    answer: "Margin collapsing occurs when the top and bottom margins of adjacent block elements combine into a single margin equal to the largest individual margin value, rather than adding together. It occurs between adjacent vertical siblings and unpadded parent-child elements.",
    difficulty: "Intermediate" as const,
  },
  {
    question: "How does outline differ from border in CSS?",
    answer: "A 'border' occupies space inside the element box model and affects layout positioning. An 'outline' is drawn outside the element border and DOES NOT take up layout space or trigger layout reflow (making it ideal for :focus-visible indicators).",
    difficulty: "Basic" as const,
  },
  {
    question: "How do inline elements handle padding and margin differently than block elements?",
    answer: "Inline elements (like <span> or <a>) accept horizontal padding/margin (left/right). However, vertical padding/margin (top/bottom) DOES NOT push surrounding line-height or block elements away.",
    difficulty: "Intermediate" as const,
  },
  {
    question: "Why is box-sizing: border-box recommended as a universal CSS reset?",
    answer: "Applying '*, *::before, *::after { box-sizing: border-box; }' ensures element sizing is predictable. Setting a card to width: 300px with 20px padding will keep its visible width at exactly 300px, preventing layout breaks.",
    difficulty: "Basic" as const,
  },
  {
    question: "How can you prevent margin collapsing between a parent and its first child?",
    answer: "Margin collapsing can be prevented by:\n1. Adding a non-zero padding-top or border-top to the parent.\n2. Giving the parent 'display: flex' or 'display: grid'.\n3. Setting 'overflow: hidden' or creating a Block Formatting Context (BFC) on the parent.",
    difficulty: "Advanced" as const,
  },
  {
    question: "What is the CSS box-shadow property and does it affect the Box Model layout dimensions?",
    answer: "'box-shadow' applies visual shadow effects around an element frame. Like outline, box-shadow DOES NOT take up space in the layout box model and does not affect surrounding element placement.",
    difficulty: "Basic" as const,
  },
  {
    question: "What is a Block Formatting Context (BFC) and how does it relate to the Box Model?",
    answer: "A BFC is a mini independent layout region in the browser. Floating elements inside a BFC are contained, external vertical margins do not collapse across BFC boundaries, and BFC containers do not overlap floats.",
    difficulty: "Advanced" as const,
  },
  {
    question: "What is logical property syntax for margin and padding in modern CSS?",
    answer: "Logical properties replace physical directional properties (top, bottom, left, right) with writing-mode aware properties: 'margin-block-start' (top), 'margin-block-end' (bottom), 'margin-inline-start' (left/right start), and 'margin-inline-end', supporting RTL languages.",
    difficulty: "Intermediate" as const,
  },
];
