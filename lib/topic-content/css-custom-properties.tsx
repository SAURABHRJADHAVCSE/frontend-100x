import { CodeBlock } from "@/components/topic/code-block";
import { CustomPropertiesPlayground } from "@/components/topic/css-playgrounds";
import { Callout, Code, H2, H3, Highlight, OL, P, UL } from "@/components/topic/prose";
import { InterviewQuestions } from "@/components/topic/interview-questions";

export default function CustomPropertiesTopic() {
  return (
    <div>
      <P>
        Native CSS Custom Properties (CSS Variables) bring dynamic scope, runtime cascading, theme swapping, and JavaScript interop to frontend stylesheets.
      </P>

      <CustomPropertiesPlayground />

      <H2>1. Syntax, Scope & Fallbacks</H2>
      <CodeBlock
        lang="css"
        title="CSS Variables Declaration & Scoping"
        code={`/* Global Scope */
:root {
  --primary-color: #2563eb;
  --radius: 0.5rem;
}

/* Local Component Overrides */
.card-featured {
  --primary-color: #7c3aed; /* Overrides --primary-color for this subtree only */
}

/* Usage with Fallback */
.button {
  background-color: var(--primary-color, #000000);
  border-radius: var(--radius);
}`}
      />

      <H2>2. JavaScript Interop</H2>
      <P>
        Unlike preprocessor variables (Sass/Less) which compile away at build time, CSS Custom Properties live in the browser DOM and can be read or mutated dynamically with JS:
      </P>

      <CodeBlock
        lang="javascript"
        title="Dynamic JS Variable Manipulation"
        code={`// Read variable
const bg = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');

// Mutate variable on mouse move or theme switch
document.documentElement.style.setProperty('--primary-color', '#ef4444');`}
      />

      <H2>3. Typed Custom Properties via @property</H2>
      <P>
        The <Code>@property</Code> CSS rule registers typed variables so browsers can animate gradients and custom token transitions smoothly!
      </P>

      <CodeBlock
        lang="css"
        title="@property Typed Declaration"
        code={`@property --gradient-angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}

.animated-gradient {
  background: linear-gradient(var(--gradient-angle), #3b82f6, #ec4899);
  transition: --gradient-angle 0.5s ease;
}`}
      />

      <H3>Best Practices</H3>
      <OL>
        <li>Define design tokens (<Code>--color-*</Code>, <Code>--space-*</Code>, <Code>--font-*</Code>) on <Code>:root</Code>.</li>
        <li>Scope local variables inside components to keep CSS modular.</li>
        <li>Register animatable properties with <Code>@property</Code>.</li>
      </OL>

      <InterviewQuestions questions={VARIABLES_QUESTIONS} />
    </div>
  );
}

const VARIABLES_QUESTIONS = [
  {
    question: "What are CSS Custom Properties (Variables) and how do they differ from Sass/LESS variables?",
    answer: "- CSS Custom Properties (--var-name): Living DOM-aware variables resolved dynamically at RUNTIME in the browser. They inherit down the cascade, respect media queries, and can be read/written via JavaScript.\n- Sass/LESS Variables ($var): Static preprocessor variables compiled into fixed CSS values at BUILD TIME. They do not exist in the browser.",
    difficulty: "Basic" as const,
  },
  {
    question: "How do you read and update CSS Custom Properties using JavaScript?",
    answer: "- Read: 'getComputedStyle(element).getPropertyValue(\"--primary-color\")'\n- Write: 'element.style.setProperty(\"--primary-color\", \"#ef4444\")'",
    difficulty: "Basic" as const,
  },
  {
    question: "How does fallback value syntax work in var()?",
    answer: "The 'var(--property-name, fallback-value)' function accepts a second parameter fallback value that is used if the custom property is undefined (e.g. 'color: var(--primary, #3b82f6);'). Fallbacks can also nest: 'var(--primary, var(--fallback-color, red))'.",
    difficulty: "Basic" as const,
  },
  {
    question: "What is @property in modern CSS and why is it useful?",
    answer: "'@property' defines a typed, registered CSS custom property. It allows specifying the syntax type (e.g. '<color>', '<angle>', '<number>'), initial value, and inheritance behavior, enabling browsers to smoothly ANIMATE gradient angles or custom values.",
    difficulty: "Advanced" as const,
  },
  {
    question: "Why is declaring variables on :root standard practice?",
    answer: "Declaring variables on the ':root' pseudo-class attaches them to the top-level <html> element. Because of CSS inheritance, any variable defined on :root is globally available to all elements throughout the application.",
    difficulty: "Basic" as const,
  },
  {
    question: "How do CSS Variables simplify Dark Mode implementation?",
    answer: "Instead of duplicating hundreds of component CSS classes for dark theme, you define semantic variable tokens (--bg-primary, --text-color) on :root. In dark mode (@media (prefers-color-scheme: dark) or .dark class), you simply re-assign the variable values at the top level.",
    difficulty: "Intermediate" as const,
  },
  {
    question: "Are CSS Custom Properties case-sensitive?",
    answer: "YES. Unlike standard CSS properties (like 'color' or 'margin'), CSS Custom Properties ARE case-sensitive. '--main-color' and '--Main-Color' are treated as two completely distinct variables.",
    difficulty: "Basic" as const,
  },
  {
    question: "Can CSS variables hold unparsed tokens or media query rules?",
    answer: "CSS variables can hold string tokens, pixel lengths, colors, or math expressions. However, CSS variables CANNOT be used directly inside media query rule definitions (e.g., '@media (min-width: var(--mobile))' is invalid).",
    difficulty: "Intermediate" as const,
  },
  {
    question: "What happens if a CSS variable value is invalid at computed-value time?",
    answer: "If a CSS variable contains an invalid value for the target property (e.g. 'color: var(--invalid)' where variable is '10px'), the browser resets that property to its initial or inherited value ('unset').",
    difficulty: "Advanced" as const,
  },
  {
    question: "How does scoping work with CSS Variables?",
    answer: "CSS variables cascade down the DOM tree. A variable declared inside '.card { --card-bg: white; }' is available only inside '.card' and its descendants, overriding any global --card-bg variable declared on :root.",
    difficulty: "Basic" as const,
  },
];
