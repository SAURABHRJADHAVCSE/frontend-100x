import { CodeBlock } from "@/components/topic/code-block";
import { ColorUnitsStudio } from "@/components/topic/css-playgrounds";
import { Callout, Code, H2, H3, Highlight, OL, P, UL } from "@/components/topic/prose";

export default function ColorsUnitsValuesTopic() {
  return (
    <div>
      <P>
        CSS offers rich tools for color spaces, fluid typography, and viewport-aware layouts. Mastering units and wide-gamut colors is crucial for modern design systems.
      </P>

      <ColorUnitsStudio />

      <H2>1. Modern Color Spaces: HSL, OKLCH & Wide Gamut P3</H2>
      <P>
        While Hex (<Code>#3b82f6</Code>) and RGB (<Code>rgb(59 130 246)</Code>) are common, modern CSS prefers <Highlight>OKLCH</Highlight> and <Highlight>HSL</Highlight>.
      </P>
      <UL>
        <li>
          <strong>HSL:</strong> <Code>hsl(hue, saturation%, lightness%)</Code> — intuitive for human editing (e.g. creating hover states by tweaking lightness).
        </li>
        <li>
          <strong>OKLCH:</strong> <Code>oklch(lightness chroma hue)</Code> — perceptually uniform across hues. Unlike HSL, changing hue does not produce artificial brightness spikes.
        </li>
        <li>
          <strong>Light-Dark Function:</strong> <Code>color: light-dark(#111, #fff)</Code> adapts automatically to user preference scheme.
        </li>
      </UL>

      <CodeBlock
        lang="css"
        title="Modern OKLCH & Light-Dark Syntax"
        code={`:root {
  color-scheme: light dark;
  --brand-color: oklch(0.64 0.22 250);
  --text-main: light-dark(#0f172a, #f8fafc);
}`}
      />

      <H2>2. Absolute vs Relative Units</H2>
      <UL>
        <li>
          <Code>px</Code> — Absolute pixels. Best for borders and subtle shadows. Avoid using <Code>px</Code> for font sizes because it breaks accessibility when users change browser zoom/font settings!
        </li>
        <li>
          <Code>rem</Code> — Relative to Root (<Code>&lt;html&gt;</Code>) font size (usually 16px). 1.5rem = 24px. Ideal for font-sizes, margins, padding, and layout bounds.
        </li>
        <li>
          <Code>em</Code> — Relative to parent element font size. Ideal for component padding that should scale dynamically with the text inside.
        </li>
      </UL>

      <H2>3. Modern Viewport Units (dvh, svh, lvh)</H2>
      <P>
        Traditional <Code>100vh</Code> on mobile web browsers leads to clipping issues when dynamic browser address bars collapse and expand. Modern CSS defines:
      </P>
      <UL>
        <li>
          <Code>dvh</Code> (Dynamic Viewport Height) — adjusts live as browser controls show/hide.
        </li>
        <li>
          <Code>svh</Code> (Small Viewport Height) — fixed smallest viewport height (address bar expanded).
        </li>
        <li>
          <Code>lvh</Code> (Large Viewport Height) — fixed largest viewport height (address bar hidden).
        </li>
      </UL>

      <Callout tone="note">
        Use <Code>min-height: 100dvh</Code> for mobile full-screen app containers instead of legacy <Code>100vh</Code>!
      </Callout>

      <H3>Best Practices</H3>
      <OL>
        <li>Default to <Code>rem</Code> for typography, spacing, and container widths.</li>
        <li>Adopt <Code>oklch()</Code> for clean color palettes and dark mode variants.</li>
        <li>Use dynamic viewport units (<Code>dvh</Code>) to prevent layout breaking on iOS Safari and mobile Chrome.</li>
      </OL>
    </div>
  );
}
