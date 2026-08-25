import { CodeBlock } from "@/components/topic/code-block";
import { SpecificityCalculator } from "@/components/topic/css-playgrounds";
import { Callout, Code, H2, H3, Highlight, OL, P, UL } from "@/components/topic/prose";
import { InterviewQuestions } from "@/components/topic/interview-questions";

export default function SelectorsSpecificityTopic() {
  return (
    <div>
      <P>
        CSS selectors determine which HTML elements receive styles. When multiple rules target the same element, the browser resolves conflicts using <Highlight>Specificity</Highlight>, source order, and cascade layers.
      </P>

      <SpecificityCalculator />

      <H2>1. The Specificity Tuple Math (0, 0, 0, 0)</H2>
      <P>
        Specificity is calculated as a 4-part weight tuple: <Code>(Inline, IDs, Classes/Attributes/Pseudos, Elements)</Code>.
      </P>
      <UL>
        <li>
          <strong>Inline styles</strong> — <Code>style=&quot;...&quot;</Code> adds (1, 0, 0, 0).
        </li>
        <li>
          <strong>ID Selectors</strong> — <Code>#header</Code>, <Code>#user-profile</Code> add (0, 1, 0, 0).
        </li>
        <li>
          <strong>Classes, Attributes & Pseudo-classes</strong> — <Code>.btn</Code>, <Code>[type=&quot;checkbox&quot;]</Code>, <Code>:hover</Code> add (0, 0, 1, 0).
        </li>
        <li>
          <strong>Elements & Pseudo-elements</strong> — <Code>h1</Code>, <Code>div</Code>, <Code>::before</Code> add (0, 0, 0, 1).
        </li>
      </UL>

      <Callout tone="warning">
        Universal selector (<Code>*</Code>), combinators (<Code>&gt;</Code>, <Code>+</Code>, <Code>~</Code>), and <Code>:where()</Code> add <strong>(0, 0, 0, 0)</strong> specificity weight!
      </Callout>

      <H2>2. Modern Pseudo-Class Mechanics: :where() vs :is() vs :has()</H2>
      <CodeBlock
        lang="css"
        title="Modern Functional Selectors"
        code={`/* :where() has ZERO specificity weight (0, 0, 0, 0) */
:where(header, footer) a:hover {
  color: var(--primary);
}

/* :is() takes the specificity of its most specific argument */
:is(#main, .sidebar) h2 {
  font-size: 1.5rem;
}

/* :has() is the relational parent selector! */
article:has(img) {
  grid-template-columns: 1fr 300px;
}`}
      />

      <H2>3. Cascade Layers (@layer)</H2>
      <P>
        Modern CSS introduces Cascade Layers (<Code>@layer</Code>) to solve specificity wars in large codebases and design systems.
      </P>

      <CodeBlock
        lang="css"
        title="Cascade Layer Ordering"
        code={`@layer reset, base, components, utilities;

@layer utilities {
  /* Rules here ALWAYS win over components, regardless of selector specificity! */
  .text-center {
    text-align: center;
  }
}`}
      />

      <H3>Best Practices</H3>
      <OL>
        <li>Avoid using <Code>!important</Code> to override styles; use Cascade Layers or cleaner class hierarchies instead.</li>
        <li>Keep specificity low and uniform by styling with classes (<Code>.btn-primary</Code>) rather than long nested chains.</li>
        <li>Use <Code>:where()</Code> for library defaults so consumer applications can easily override them.</li>
      </OL>

      <InterviewQuestions questions={SELECTORS_QUESTIONS} />
    </div>
  );
}

const SELECTORS_QUESTIONS = [
  {
    question: "How is CSS Specificity calculated?",
    answer: "Specificity is calculated as a 4-part tuple (Inline, ID, Class/Attribute/Pseudo-class, Element/Pseudo-element):\n- Inline styles: (1, 0, 0, 0)\n- ID Selectors (#header): (0, 1, 0, 0)\n- Class (.btn), Attribute ([type='text']), and Pseudo-classes (:hover): (0, 0, 1, 0)\n- Elements (div, p) and Pseudo-elements (::before): (0, 0, 0, 1)\nUniversal selector (*) and :where() have (0, 0, 0, 0) specificity.",
    difficulty: "Basic" as const,
  },
  {
    question: "What is the difference between :is() and :where() in CSS?",
    answer: "Both pseudo-classes accept a list of selectors. However, ':is()' takes the specificity of its MOST SPECIFIC argument selector in the list, whereas ':where()' ALWAYS has ZERO specificity (0,0,0,0), making it ideal for reset stylesheets.",
    difficulty: "Intermediate" as const,
  },
  {
    question: "What does the :has() pseudo-class do?",
    answer: "':has()' is the relational 'parent' selector in CSS. It allows styling an element based on its children or descendants (e.g. 'card:has(img)' styles the card ONLY if it contains an image tag).",
    difficulty: "Intermediate" as const,
  },
  {
    question: "What are CSS Cascade Layers (@layer) and what problem do they solve?",
    answer: "Cascade Layers (@layer reset, components, utilities;) allow grouping CSS rules into explicit priority layers. Rules in later layers ALWAYS override rules in earlier layers, regardless of individual selector specificity strength, eliminating specificity wars.",
    difficulty: "Advanced" as const,
  },
  {
    question: "What is the difference between a Combinator (space, >, +, ~) in CSS?",
    answer: "- 'A B' (Descendant): Matches B anywhere inside A.\n- 'A > B' (Direct Child): Matches B only if it is a direct child of A.\n- 'A + B' (Adjacent Sibling): Matches B if it IMMEDIATELY follows A.\n- 'A ~ B' (General Sibling): Matches B if it follows A anywhere as a sibling.",
    difficulty: "Basic" as const,
  },
  {
    question: "Why should you avoid using !important in CSS production code?",
    answer: "'!important' overrides standard specificity calculations, making debugging extremely difficult. The only clean way to override an !important rule is with another !important rule, leading to codebase maintenance nightmare.",
    difficulty: "Basic" as const,
  },
  {
    question: "What is the difference between a Pseudo-class and a Pseudo-element?",
    answer: "- Pseudo-class (:hover, :focus, :nth-child): Selects an element based on its state or DOM position.\n- Pseudo-element (::before, ::after, ::first-line): Styles a specific part of an element or creates virtual elements that don't exist in HTML.",
    difficulty: "Basic" as const,
  },
  {
    question: "How does the universal selector (*) affect CSS Specificity?",
    answer: "The universal selector (*) has zero specificity (0,0,0,0). It matches all elements but will be overridden by any element, class, or ID selector.",
    difficulty: "Basic" as const,
  },
  {
    question: "How does the browser evaluate CSS Selectors (Left-to-Right or Right-to-Left)?",
    answer: "Browsers evaluate CSS selectors RIGHT-TO-LEFT (starting from the key selector). For 'header nav ul li a', the browser first finds all <a> tags on the page, then filters up the DOM tree to check if they sit inside li, ul, nav, and header.",
    difficulty: "Advanced" as const,
  },
  {
    question: "What is the difference between :nth-child() and :nth-of-type()?",
    answer: "- :nth-child(N): Counts all sibling elements regardless of tag type, matching if the Nth element matches the selector.\n- :nth-of-type(N): Counts ONLY elements of that specific HTML tag type among siblings.",
    difficulty: "Intermediate" as const,
  },
];
