import { CodeBlock } from "@/components/topic/code-block";
import { PseudoSelectorPlayground } from "@/components/topic/css-playgrounds";
import { Callout, Code, H2, H3, Highlight, OL, P, UL } from "@/components/topic/prose";
import { InterviewQuestions } from "@/components/topic/interview-questions";

export default function PseudoClassesElementsTopic() {
  return (
    <div>
      <P>
        Pseudo-classes target elements based on state or position, while pseudo-elements let you insert and style virtual sub-parts of elements without extra HTML elements.
      </P>

      <PseudoSelectorPlayground />

      <H2>1. Structural & State Pseudo-Classes</H2>
      <UL>
        <li>
          <Code>:focus-visible</Code> — Shows focus rings only when navigated via keyboard, preventing ugly focus rings on mouse clicks!
        </li>
        <li>
          <Code>:nth-child(an+b)</Code> — Formula selector (e.g. <Code>:nth-child(2n+1)</Code> for odd rows).
        </li>
        <li>
          <Code>:user-valid</Code> / <Code>:user-invalid</Code> — Applies validation styles only after the user interacts with an input field.
        </li>
      </UL>

      <H2>2. Pseudo-Elements (::before & ::after)</H2>
      <CodeBlock
        lang="css"
        title="Custom Decorative Badge via ::before"
        code={`.status-pill::before {
  content: "";
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #22c55e;
  margin-right: 6px;
}`}
      />

      <H2>3. Utility Pseudo-Elements</H2>
      <UL>
        <li>
          <Code>::selection</Code> — Styles highlighted text background and color.
        </li>
        <li>
          <Code>::placeholder</Code> — Styles input placeholder text.
        </li>
      </UL>

      <H3>Best Practices</H3>
      <OL>
        <li>Use <Code>:focus-visible</Code> instead of <Code>:focus</Code> for accessible button focus rings.</li>
        <li>Always include <Code>content: ""</Code> when using <Code>::before</Code> or <Code>::after</Code>.</li>
        <li>Use <Code>:user-valid</Code> over <Code>:valid</Code> to prevent premature red error states on fresh forms.</li>
      </OL>

      <InterviewQuestions questions={PSEUDO_QUESTIONS} />
    </div>
  );
}

const PSEUDO_QUESTIONS = [
  {
    question: "What is the syntactic and conceptual difference between a Pseudo-class and a Pseudo-element?",
    answer: "- Pseudo-class (single colon :): Selects existing DOM elements based on state or document location (e.g. :hover, :focus, :nth-child(2)).\n- Pseudo-element (double colon ::): Styles specific sub-parts of an element or creates virtual elements in the tree (e.g. ::before, ::after, ::placeholder, ::selection).",
    difficulty: "Basic" as const,
  },
  {
    question: "Why is the content property mandatory when using ::before and ::after?",
    answer: "Without the 'content' property (e.g. 'content: \"\"' or 'content: attr(data-tooltip)'), the browser will not generate or render the ::before or ::after pseudo-element box in the DOM tree.",
    difficulty: "Basic" as const,
  },
  {
    question: "What is the difference between :focus and :focus-visible?",
    answer: "- :focus: Triggers whenever an element receives focus (including via mouse click, touch, or keyboard).\n- :focus-visible: Triggers ONLY when the browser detects keyboard navigation (Tab key) or input modes that require a visual focus indicator, keeping design clean for mouse clicks.",
    difficulty: "Basic" as const,
  },
  {
    question: "What does the ::selection pseudo-element style?",
    answer: "'::selection' styles the background color and text color when a user highlights/selects text on a webpage with their cursor.",
    difficulty: "Basic" as const,
  },
  {
    question: "What is the difference between :first-child and :first-of-type?",
    answer: "- :first-child: Matches the element ONLY if it is the absolute very first child inside its parent container.\n- :first-of-type: Matches the first occurrence of that specific HTML tag type among siblings, regardless of preceding different tags.",
    difficulty: "Intermediate" as const,
  },
  {
    question: "How do ::before and ::after pseudo-elements position relative to their parent element?",
    answer: "By default, ::before and ::after render as inline pseudo-children inside the parent element (before or after its text content). Setting 'position: relative' on the parent allows positioning ::before/::after with 'position: absolute' relative to the parent box.",
    difficulty: "Intermediate" as const,
  },
  {
    question: "What is the :not() pseudo-class?",
    answer: "':not(selector)' is a negation pseudo-class that matches all elements except those matching the specified selector (e.g. 'button:not(.disabled)' styles all buttons except those with class 'disabled').",
    difficulty: "Basic" as const,
  },
  {
    question: "Can pseudo-elements (::before / ::after) be attached to void self-closing tags like <img> or <input>?",
    answer: "NO. Void self-closing tags (like <img>, <input>, <br>) cannot contain child content, so browsers do not support rendering ::before or ::after pseudo-elements on them.",
    difficulty: "Advanced" as const,
  },
  {
    question: "What is the ::placeholder pseudo-element?",
    answer: "'::placeholder' selects and styles the hint placeholder text inside an empty <input> or <textarea> element.",
    difficulty: "Basic" as const,
  },
  {
    question: "What is the :empty pseudo-class?",
    answer: "':empty' matches elements that have zero children (including text nodes or whitespace). It is often used to hide empty alert boxes or card containers when no content is present.",
    difficulty: "Intermediate" as const,
  },
];
