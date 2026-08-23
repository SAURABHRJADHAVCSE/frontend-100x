import { CodeBlock } from "@/components/topic/code-block";
import { FlexboxPlayground } from "@/components/topic/css-playgrounds";
import { Callout, Code, H2, H3, Highlight, OL, P, UL } from "@/components/topic/prose";

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
    </div>
  );
}
