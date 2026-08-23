import { CodeBlock } from "@/components/topic/code-block";
import { PseudoSelectorPlayground } from "@/components/topic/css-playgrounds";
import { Callout, Code, H2, H3, Highlight, OL, P, UL } from "@/components/topic/prose";

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
    </div>
  );
}
