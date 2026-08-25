import { CodeBlock } from "@/components/topic/code-block";
import { ColorUnitsStudio } from "@/components/topic/css-playgrounds";
import { Callout, Code, H2, H3, Highlight, OL, P, UL } from "@/components/topic/prose";
import { InterviewQuestions } from "@/components/topic/interview-questions";

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

      <InterviewQuestions questions={COLORS_UNITS_QUESTIONS} />
    </div>
  );
}

const COLORS_UNITS_QUESTIONS = [
  {
    question: "What is the difference between rem and em units in CSS?",
    answer: "- rem (root em): Relative ONLY to the font-size of the root <html> element (usually 16px). 1.5rem = 24px everywhere.\n- em: Relative to the font-size of its IMMEDIATE parent element. Nesting multiple em font-sizes causes compounding multiplication.",
    difficulty: "Basic" as const,
  },
  {
    question: "Why should you use rem instead of px for typography and layout spacing?",
    answer: "Using 'rem' respects user accessibility settings. If a visually impaired user increases their browser default font size (e.g. from 16px to 24px), all 'rem' values scale up proportionally. Fixed 'px' units ignore user settings.",
    difficulty: "Basic" as const,
  },
  {
    question: "What is the difference between 100vh and 100dvh on mobile browsers?",
    answer: "Legacy '100vh' calculates height based on maximum screen height, ignoring dynamic mobile browser address bars (causing bottom content to get cut off). Modern '100dvh' (Dynamic Viewport Height) automatically resizes as address bars expand or collapse.",
    difficulty: "Intermediate" as const,
  },
  {
    question: "What is OKLCH and why is it superior to RGB or HSL?",
    answer: "OKLCH is a modern perceptual color space. Unlike RGB or HSL where changing hue causes unexpected lightness jumps (e.g. yellow feels much brighter than blue at the same lightness value), OKLCH offers perceptually uniform lightness across all hues, wider color gamuts (P3 screens), and smooth gradient blending.",
    difficulty: "Advanced" as const,
  },
  {
    question: "What is the difference between absolute units and relative units in CSS?",
    answer: "- Absolute units (px, pt, cm, in): Fixed physical sizes that do not change based on screen size or parent container.\n- Relative units (rem, em, %, vw, vh, ch): Scales dynamically based on root font size, parent dimensions, or viewport size.",
    difficulty: "Basic" as const,
  },
  {
    question: "What does the ch unit represent in CSS typography?",
    answer: "The 'ch' unit represents the width of the number zero ('0') character in the element's active font. It is commonly used to set optimal reading line lengths (e.g. 'max-width: 65ch').",
    difficulty: "Intermediate" as const,
  },
  {
    question: "How does currentColor work in CSS?",
    answer: "'currentColor' is a built-in CSS keyword that represents the computed value of the element's active 'color' property. It is commonly used on borders, SVG fills, or box-shadows to inherit text color automatically.",
    difficulty: "Basic" as const,
  },
  {
    question: "What is the difference between Hex, RGB(A), HSL(A), and OKLCH color notations?",
    answer: "- Hex (#ff0000): 6/8-character hexadecimal representation of Red/Green/Blue.\n- RGB (rgb(255, 0, 0)): Red, Green, Blue channel intensity (0-255).\n- HSL (hsl(0, 100%, 50%)): Hue (0-360 deg), Saturation (%), Lightness (%).\n- OKLCH (oklch(0.6 0.25 25)): Lightness (0-1), Chroma (saturation), Hue angle.",
    difficulty: "Intermediate" as const,
  },
  {
    question: "What are svh and lvh viewport units?",
    answer: "- svh (Small Viewport Height): Height when mobile browser UI address bars are fully EXPANDED.\n- lvh (Large Viewport Height): Height when mobile browser UI address bars are fully COLLAPSED/HIDDEN.",
    difficulty: "Intermediate" as const,
  },
  {
    question: "How do percentage (%) widths work on child elements vs parent elements?",
    answer: "Percentage widths are calculated relative to the containing block's content box width. For padding/margin percentages, top/bottom percentages are also calculated relative to the parent's WIDTH, not height.",
    difficulty: "Intermediate" as const,
  },
];
