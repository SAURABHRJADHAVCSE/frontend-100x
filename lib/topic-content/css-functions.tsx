import { CodeBlock } from "@/components/topic/code-block";
import { CssFunctionsLab } from "@/components/topic/css-playgrounds";
import { Callout, Code, H2, H3, Highlight, OL, P, UL } from "@/components/topic/prose";
import { InterviewQuestions } from "@/components/topic/interview-questions";

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

      <InterviewQuestions questions={FUNCTIONS_QUESTIONS} />
    </div>
  );
}

const FUNCTIONS_QUESTIONS = [
  {
    question: "What is the difference between calc(), min(), max(), and clamp() in CSS?",
    answer: "- calc(expr): Evaluates mathematical calculations combining different units (e.g. 'width: calc(100% - 40px)').\n- min(A, B): Chooses the SMALLEST value among arguments.\n- max(A, B): Chooses the LARGEST value among arguments.\n- clamp(MIN, VAL, MAX): Constrains a fluid value between an absolute minimum and maximum boundary.",
    difficulty: "Basic" as const,
  },
  {
    question: "How does clamp(MIN, VAL, MAX) work for Fluid Typography?",
    answer: "In 'font-size: clamp(1rem, 2.5vw, 2.5rem);', the text scales dynamically at 2.5% of the viewport width ('val'), but will never shrink smaller than 1rem (16px) on small phones or grow larger than 2.5rem (40px) on large screens.",
    difficulty: "Intermediate" as const,
  },
  {
    question: "What is color-mix() in modern CSS?",
    answer: "'color-mix(in srgb, var(--primary) 20%, transparent)' mixes two colors together in a specified color space. It allows creating semi-transparent color variants, hover tints, or dark mode shades directly in CSS without extra variables.",
    difficulty: "Intermediate" as const,
  },
  {
    question: "Can you combine different CSS units inside calc() (e.g. % and px)?",
    answer: "YES! 'calc()' explicitly allows combining different physical and relative units (e.g. 'height: calc(100vh - 80px);' or 'width: calc(50% + 2rem);'). Operands around '+' and '-' operators MUST be separated by whitespace.",
    difficulty: "Basic" as const,
  },
  {
    question: "What is the env() function in CSS?",
    answer: "'env()' retrieves user-agent environment variables configured by the OS or browser. The most common use case is handling mobile screen safe areas (notches/home bars): 'padding-bottom: env(safe-area-inset-bottom);'.",
    difficulty: "Intermediate" as const,
  },
  {
    question: "What does attr() function do in CSS?",
    answer: "'attr(data-attribute-name)' extracts the value of an HTML attribute on the element and uses it in CSS (most commonly used inside ::before/::after content: attr(data-tooltip)).",
    difficulty: "Basic" as const,
  },
  {
    question: "How do linear-gradient(), radial-gradient(), and conic-gradient() differ?",
    answer: "- linear-gradient(): Transitions colors along a straight directional line/angle.\n- radial-gradient(): Transitions colors radially outward from a center point.\n- conic-gradient(): Transitions colors rotated around a central pivot point (used for pie charts or color wheels).",
    difficulty: "Basic" as const,
  },
  {
    question: "What is fit-content() in CSS Grid?",
    answer: "'fit-content(max_size)' clamps the grid track width to the content size, up to a specified maximum size parameter limit.",
    difficulty: "Advanced" as const,
  },
  {
    question: "How does url() function work for SVGs and images?",
    answer: "'url(\"/images/hero.jpg\")' loads external image assets into properties like 'background-image', 'list-style-image', or 'cursor'. SVG strings can also be embedded directly via data URIs.",
    difficulty: "Basic" as const,
  },
  {
    question: "What is path() in CSS motion path / clip-path?",
    answer: "'path(\"M 10 80 Q 52.5 10, 95 80\")' uses standard SVG vector path syntax to define custom clipping shapes or motion trajectories for animated elements.",
    difficulty: "Advanced" as const,
  },
];
