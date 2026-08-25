import { CodeBlock } from "@/components/topic/code-block";
import { TailwindSandbox } from "@/components/topic/css-playgrounds";
import { Callout, Code, H2, H3, Highlight, OL, P, UL } from "@/components/topic/prose";
import { InterviewQuestions } from "@/components/topic/interview-questions";

export default function TailwindCssBasicsTopic() {
  return (
    <div>
      <P>
        Tailwind CSS is a utility-first CSS framework for rapidly building custom user interfaces directly in markup without writing custom CSS files.
      </P>

      <TailwindSandbox />

      <H2>1. The Utility-First Paradigm</H2>
      <P>
        Instead of inventing arbitrary class names like <Code>.card-wrapper-inner</Code>, utility classes compose single-purpose styles directly in HTML/JSX.
      </P>

      <CodeBlock
        lang="tsx"
        title="Tailwind Component Composition"
        code={`<div className="flex items-center gap-4 rounded-xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition">
  <div className="size-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
    AI
  </div>
  <div>
    <h3 className="font-heading font-semibold text-foreground">Utility First</h3>
    <p className="text-sm text-muted-foreground">Rapid UI development with zero context switching.</p>
  </div>
</div>`}
      />

      <H2>2. Modifiers: Responsive, Hover & Dark Mode</H2>
      <UL>
        <li>
          <strong>Responsive Modifiers:</strong> <Code>sm:flex-row</Code>, <Code>md:grid-cols-3</Code>, <Code>lg:px-8</Code>.
        </li>
        <li>
          <strong>State Modifiers:</strong> <Code>hover:bg-primary/90</Code>, <Code>focus-visible:ring-2</Code>, <Code>group-hover:translate-x-1</Code>.
        </li>
        <li>
          <strong>Dark Mode Modifier:</strong> <Code>dark:bg-slate-950 dark:text-white</Code>.
        </li>
        <li>
          <strong>Arbitrary Values:</strong> <Code>top-[17px]</Code>, <Code>bg-[#123456]</Code>.
        </li>
      </UL>

      <H2>3. Tailwind CSS v4 Engine Highlights</H2>
      <P>
        Tailwind v4 introduces a CSS-first configuration model using the <Code>@theme</Code> directive in your CSS file, eliminating JavaScript config files while boosting build speed by up to 10x!
      </P>

      <CodeBlock
        lang="css"
        title="Tailwind v4 @theme Configuration"
        code={`@import "tailwindcss";

@theme {
  --font-heading: 'Outfit', sans-serif;
  --color-brand: oklch(0.65 0.24 250);
}`}
      />

      <H3>Best Practices</H3>
      <OL>
        <li>Keep utility order consistent (Layout -&gt; Flex/Grid -&gt; Spacing -&gt; Typography -&gt; Visuals).</li>
        <li>Use helper libraries like <Code>clsx</Code> and <Code>tailwind-merge</Code> (e.g. <Code>cn()</Code>) when merging conditional classes in React.</li>
        <li>Leverage Tailwind v4 CSS-first <Code>@theme</Code> variables for project design tokens.</li>
      </OL>

      <InterviewQuestions questions={TAILWIND_QUESTIONS} />
    </div>
  );
}

const TAILWIND_QUESTIONS = [
  {
    question: "What is Tailwind CSS and how does Utility-First architecture differ from traditional CSS?",
    answer: "Tailwind CSS is a utility-first CSS framework that provides low-level utility classes (e.g. flex, pt-4, text-center, rounded-lg). Instead of inventing custom class names (.card-body-wrapper) and writing CSS rules in separate files, you compose styles directly in HTML/JSX.",
    difficulty: "Basic" as const,
  },
  {
    question: "What are the main advantages of Utility-First CSS?",
    answer: "1. No wasted time naming classes (.wrapper, .container-inner).\n2. Stop writing growing CSS files; CSS bundle size remains flat regardless of codebase size.\n3. Making changes is safe because utility classes are local to the HTML element, eliminating side effects.",
    difficulty: "Basic" as const,
  },
  {
    question: "What is Arbitrary Value Syntax in Tailwind CSS?",
    answer: "Arbitrary value syntax uses square brackets (e.g. 'h-[17px]', 'bg-[#123456]', 'grid-cols-[200px_1fr]') to compile dynamic, one-off CSS values that aren't present in your design system theme palette.",
    difficulty: "Basic" as const,
  },
  {
    question: "How do State Modifiers (hover, focus, group-hover, peer-checked) work in Tailwind?",
    answer: "State modifiers prefix utility classes to apply styles conditionally:\n- hover:bg-blue-600 (applies on hover)\n- focus-visible:ring-2 (applies on keyboard focus)\n- group-hover:block (styles a child element when its parent with 'group' class is hovered)\n- peer-checked:border-blue-500 (styles a sibling element when an input with 'peer' class is checked).",
    difficulty: "Intermediate" as const,
  },
  {
    question: "What is tailwind-merge and why is it essential in React/Next.js component design?",
    answer: "'tailwind-merge' efficiently merges Tailwind CSS classes in JS without class conflicts (e.g. if a component has default 'px-4' and receives prop 'px-8', standard string concatenation keeps both, causing unpredictable overrides. tailwind-merge safely resolves it to 'px-8').",
    difficulty: "Intermediate" as const,
  },
  {
    question: "How does Tailwind CSS v4 differ from Tailwind v3?",
    answer: "Tailwind v4 features a brand new Rust-powered engine (Oxide) that is up to 10x faster and adopts a CSS-first configuration using '@import \"tailwindcss\";' and the '@theme' CSS directive, replacing the legacy JS 'tailwind.config.js' file.",
    difficulty: "Advanced" as const,
  },
  {
    question: "How do responsive variant prefixes (sm:, md:, lg:, xl:) operate in Tailwind?",
    answer: "Tailwind uses a Mobile-First approach. Unprefixed utilities (e.g. 'flex-col') apply to all mobile devices, while prefixed variants ('md:flex-row') apply at that breakpoint threshold and above (min-width: 768px).",
    difficulty: "Basic" as const,
  },
  {
    question: "What is @apply in Tailwind CSS and why should it be used sparingly?",
    answer: "'@apply' extracts Tailwind utility classes into custom CSS rules (e.g. '.btn { @apply px-4 py-2 bg-blue-500; }'). It should be used sparingly because overusing it re-introduces class naming problems and inflates CSS bundle sizes.",
    difficulty: "Intermediate" as const,
  },
  {
    question: "How does Dark Mode work in Tailwind CSS?",
    answer: "Tailwind provides the 'dark:' modifier (e.g. 'bg-white dark:bg-slate-900'). It can be configured to use media queries (@media (prefers-color-scheme: dark)) or a class strategy ('dark' class added to <html> element).",
    difficulty: "Basic" as const,
  },
  {
    question: "How does Just-In-Time (JIT) compilation work in Tailwind?",
    answer: "The JIT engine scans your HTML, JSX, and TSX files on demand, generating ONLY the exact CSS utility classes used in your codebase. This ensures the output production CSS file is tiny (typically under 15KB gzipped).",
    difficulty: "Advanced" as const,
  },
];
