import { CodeBlock } from "@/components/topic/code-block";
import { TypographyPlayground } from "@/components/topic/css-playgrounds";
import { Callout, Code, H2, H3, Highlight, OL, P, UL } from "@/components/topic/prose";
import { InterviewQuestions } from "@/components/topic/interview-questions";

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

      <InterviewQuestions questions={TYPOGRAPHY_QUESTIONS} />
    </div>
  );
}

const TYPOGRAPHY_QUESTIONS = [
  {
    question: "Why should line-height always be unitless in CSS (e.g. line-height: 1.5 instead of line-height: 24px)?",
    answer: "Unitless line-height (e.g. 1.5) acts as a multiplier relative to the element's current font-size. When child elements inherit a unitless line-height, it recalculates proportionally for their specific font size. A fixed '24px' unit would be inherited unchanged, causing text overlap on larger child headings.",
    difficulty: "Basic" as const,
  },
  {
    question: "What is font-display: swap and why is it important for Web Performance?",
    answer: "'font-display: swap' instructs the browser to immediately render text using a system fallback font while the custom web font is downloading, and swap in the custom font once ready. This prevents FOIT (Flash of Invisible Text) and improves Largest Contentful Paint (LCP).",
    difficulty: "Intermediate" as const,
  },
  {
    question: "What are Variable Fonts and how do they differ from static web fonts?",
    answer: "Variable Fonts package an entire font family (multiple weights from 100 to 900, widths, and slants) into a single font file (.woff2). Instead of downloading 5 separate files for Light, Regular, Bold, ExtraBold, and Italic, a single variable font file handles all weight interpolation.",
    difficulty: "Intermediate" as const,
  },
  {
    question: "What does text-wrap: balance do in modern CSS?",
    answer: "'text-wrap: balance' automatically balances line lengths across multi-line headings so each line has equal width, eliminating awkward single-word typographic orphans at the end of headlines.",
    difficulty: "Basic" as const,
  },
  {
    question: "What is font-smoothing / -webkit-font-smoothing?",
    answer: "Font smoothing (-webkit-font-smoothing: antialiased) controls subpixel font antialiasing on macOS/iOS screens, rendering text with thinner, crisp vector strokes.",
    difficulty: "Intermediate" as const,
  },
  {
    question: "What is the difference between FOIT and FOUT?",
    answer: "- FOIT (Flash of Invisible Text): Text remains completely invisible while custom font downloads.\n- FOUT (Flash of Unstyled Text): Text renders immediately with a fallback font, then visibly flashes into the custom font once loaded.",
    difficulty: "Basic" as const,
  },
  {
    question: "What is the optimal character length for comfortable body text reading?",
    answer: "Optimal typographic line length for comfortable body text reading is 45 to 75 characters per line (achieved in CSS using 'max-width: 65ch').",
    difficulty: "Basic" as const,
  },
  {
    question: "How does font-size-adjust help prevent Cumulative Layout Shift (CLS)?",
    answer: "'font-size-adjust' adjusts the font's x-height (height of lowercase letters) relative to its cap-height, ensuring that fallback fonts match the physical height of the custom web font, eliminating layout shifts when fonts swap.",
    difficulty: "Advanced" as const,
  },
  {
    question: "What is the difference between font-weight: 700 vs font-weight: bold?",
    answer: "'font-weight: 700' and 'font-weight: bold' are functionally identical. Numerical values (100 to 900) allow precise selection when using variable fonts or multi-weight font families.",
    difficulty: "Basic" as const,
  },
  {
    question: "What is font-feature-settings and font-variant-numeric used for?",
    answer: "They unlock advanced OpenType font features such as tabular (monospaced) numbers for financial data grids ('font-variant-numeric: tabular-nums'), ligatures, and small caps.",
    difficulty: "Advanced" as const,
  },
];
