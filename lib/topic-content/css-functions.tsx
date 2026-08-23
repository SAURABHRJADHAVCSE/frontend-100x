import { CodeBlock } from "@/components/topic/code-block";
import { CssFunctionsLab } from "@/components/topic/css-playgrounds";
import { Callout, Code, H2, H3, Highlight, OL, P, UL } from "@/components/topic/prose";

export default function CssFunctionsTopic() {
  return (
    <div>
      <P>
        CSS functions process inputs to perform dynamic calculations, fluid typography math, color mixing, and image gradients.
      </P>

      <CssFunctionsLab />

      <H2>1. Math Functions: calc(), min(), max(), clamp()</H2>
      <UL>
        <li>
          <Code>calc()</Code> — Performs arithmetic calculations (e.g. <Code>width: calc(100% - 32px);</Code>).
        </li>
        <li>
          <Code>min(a, b)</Code> — Picks the smaller value (e.g. <Code>width: min(100%, 800px);</Code> guarantees a max width of 800px while being 100% responsive on smaller screens).
        </li>
        <li>
          <Code>clamp(min, preferred, max)</Code> — Sets a fluid value that scales between a minimum and maximum bound!
        </li>
      </UL>

      <H2>2. Color Mixing via color-mix()</H2>
      <CodeBlock
        lang="css"
        title="Modern color-mix() Utility"
        code={`/* Creates a semi-transparent primary color tint without extra opacity elements */
.tinted-bg {
  background-color: color-mix(in srgb, var(--primary) 15%, transparent);
}`}
      />

      <H2>3. Image & Gradient Functions</H2>
      <CodeBlock
        lang="css"
        title="Multi-Stop Linear & Radial Gradients"
        code={`.hero-banner {
  background-image: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%);
}`}
      />

      <H3>Best Practices</H3>
      <OL>
        <li>Use <Code>clamp()</Code> for fluid font-sizes without requiring media query breakpoints.</li>
        <li>Use <Code>color-mix()</Code> for active state backgrounds and badge tints.</li>
        <li>Combine <Code>min(100%, 1200px)</Code> for clean responsive page wrappers.</li>
      </OL>
    </div>
  );
}
