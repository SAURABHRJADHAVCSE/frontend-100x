import { CodeBlock } from "@/components/topic/code-block";
import { SpecificityCalculator } from "@/components/topic/css-playgrounds";
import { Callout, Code, H2, H3, Highlight, OL, P, UL } from "@/components/topic/prose";

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
    </div>
  );
}
