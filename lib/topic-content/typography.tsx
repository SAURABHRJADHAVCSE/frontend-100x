import { CodeBlock } from "@/components/topic/code-block";
import { TypographyPlayground } from "@/components/topic/css-playgrounds";
import { Callout, Code, H2, H3, Highlight, OL, P, UL } from "@/components/topic/prose";

export default function TypographyTopic() {
  return (
    <div>
      <P>
        Typography accounts for over 90% of visual content on the web. Proper hierarchy, line length, variable font performance, and text wrapping are central to great web UX.
      </P>

      <TypographyPlayground />

      <H2>1. Font Rendering Core Properties</H2>
      <UL>
        <li>
          <Code>font-family</Code> — Declares font stacks with fallbacks (e.g. <Code>font-family: Inter, system-ui, sans-serif;</Code>).
        </li>
        <li>
          <Code>line-height</Code> — Unitless numbers (e.g. <Code>line-height: 1.5;</Code>) are preferred over static pixel values so line spacing scales proportionally.
        </li>
        <li>
          <Code>letter-spacing</Code> — Adjusts tracking between characters. Tighten tracking (<Code>-0.02em</Code>) for large bold headings; expand tracking (<Code>0.05em</Code>) for small uppercase labels.
        </li>
      </UL>

      <H2>2. Modern Text Wrapping: text-wrap: balance & pretty</H2>
      <CodeBlock
        lang="css"
        title="Modern Headlines & Paragraph Wrapping"
        code={`/* Prevents lonely single words (orphans) on headings */
h1, h2, h3 {
  text-wrap: balance;
}

/* Optimizes body paragraphs to prevent awkward line breaks */
p {
  text-wrap: pretty;
}`}
      />

      <H2>3. Web Font Optimization & font-display</H2>
      <P>
        Loading custom web fonts can cause FOIT (Flash of Invisible Text) or FOUT (Flash of Unstyled Text). Use <Code>font-display: swap</Code> so text renders immediately with fallback fonts.
      </P>

      <CodeBlock
        lang="css"
        title="@font-face Declaration"
        code={`@font-face {
  font-family: 'Inter';
  src: url('/fonts/Inter-Variable.woff2') format('woff2-variations');
  font-weight: 100 900;
  font-display: swap;
}`}
      />

      <H3>Best Practices</H3>
      <OL>
        <li>Limit line length of reading text to <strong>45 to 75 characters</strong> (<Code>max-width: 65ch</Code>).</li>
        <li>Always use unitless <Code>line-height</Code> (1.2 for headings, 1.5–1.7 for body text).</li>
        <li>Use <Code>text-wrap: balance</Code> for card titles and hero headlines.</li>
      </OL>
    </div>
  );
}
