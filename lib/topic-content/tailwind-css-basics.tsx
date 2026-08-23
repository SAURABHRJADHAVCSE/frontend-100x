import { CodeBlock } from "@/components/topic/code-block";
import { TailwindSandbox } from "@/components/topic/css-playgrounds";
import { Callout, Code, H2, H3, Highlight, OL, P, UL } from "@/components/topic/prose";

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
    </div>
  );
}
