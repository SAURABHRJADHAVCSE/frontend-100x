import { CodeBlock } from "@/components/topic/code-block";
import { ResponsiveContainerPlayground } from "@/components/topic/css-playgrounds";
import { Callout, Code, H2, H3, Highlight, OL, P, UL } from "@/components/topic/prose";
import { InterviewQuestions } from "@/components/topic/interview-questions";

export default function ResponsiveDesignTopic() {
  return (
    <div>
      <P>
        Responsive Web Design ensures websites adapt seamlessly across mobile phones, tablets, laptops, and ultra-wide desktops.
      </P>

      <ResponsiveContainerPlayground />

      <H2>1. Mobile-First Methodology</H2>
      <P>
        Write baseline styles for narrow mobile screens first without media queries, then layer enhancements using <Code>min-width</Code> media queries as screen space increases.
      </P>

      <CodeBlock
        lang="css"
        title="Modern Range Syntax Media Queries"
        code={`/* Baseline Mobile Styles */
.container {
  padding: 1rem;
}

/* Tablet Breakpoint (768px and up) */
@media (width >= 768px) {
  .container {
    padding: 2rem;
  }
}

/* Desktop Breakpoint (1024px and up) */
@media (width >= 1024px) {
  .container {
    max-width: 1200px;
    margin-inline: auto;
  }
}`}
      />

      <H2>2. The Container Query Revolution (@container)</H2>
      <P>
        Traditional media queries listen to the global viewport width. <Highlight>Container Queries</Highlight> allow individual components to adapt based on the size of their parent container, enabling reusable modular design components!
      </P>

      <CodeBlock
        lang="css"
        title="Container Query Syntax"
        code={`/* 1. Declare container context */
.card-wrapper {
  container-type: inline-size;
  container-name: card-container;
}

/* 2. Style component based on container width */
@container card-container (width >= 400px) {
  .card {
    display: flex;
    flex-direction: row;
  }
}`}
      />

      <H2>3. User Preference Media Features</H2>
      <UL>
        <li>
          <Code>prefers-color-scheme: dark</Code> — Respects OS-level dark theme preference.
        </li>
        <li>
          <Code>prefers-reduced-motion: reduce</Code> — Disables heavy scroll animations for users sensitive to motion sickness.
        </li>
      </UL>

      <H3>Best Practices</H3>
      <OL>
        <li>Always adopt a mobile-first workflow (<Code>min-width</Code> queries).</li>
        <li>Use Container Queries for reusable design system components (cards, widgets, sidebars).</li>
        <li>Always respect <Code>prefers-reduced-motion</Code> for smooth accessibility compliance.</li>
      </OL>

      <InterviewQuestions questions={RESPONSIVE_QUESTIONS} />
    </div>
  );
}

const RESPONSIVE_QUESTIONS = [
  {
    question: "What is Mobile-First Responsive Web Design and why is min-width preferred over max-width?",
    answer: "Mobile-First design means writing base CSS styles for mobile devices first without media queries, then using 'min-width' media queries to add progressive enhancements for tablet and desktop viewports. It reduces default CSS bundle sizes on mobile and leads to cleaner, scalable stylesheets.",
    difficulty: "Basic" as const,
  },
  {
    question: "What is the difference between Media Queries (@media) and Container Queries (@container)?",
    answer: "- Media Queries (@media): Listen to global browser VIEWPORT dimensions. A component changes layout based on the full screen width.\n- Container Queries (@container): Listen to the specific PARENT CONTAINER dimensions. A card component changes layout based on how much width its parent slot gives it (ideal for reusable design systems).",
    difficulty: "Intermediate" as const,
  },
  {
    question: "What is the prefers-reduced-motion media query and why is it important?",
    answer: "'@media (prefers-reduced-motion: reduce)' detects if the user has requested the operating system to minimize non-essential animations due to vestibular disorders or motion sickness. Developers should disable heavy parallax or zoom transitions when active.",
    difficulty: "Basic" as const,
  },
  {
    question: "What is modern range media query syntax in CSS?",
    answer: "Modern CSS Range syntax allows writing intuitive comparison operators instead of 'min-width' / 'max-width':\n- Legacy: @media (min-width: 600px) and (max-width: 1024px)\n- Modern Range: @media (600px <= width <= 1024px)",
    difficulty: "Intermediate" as const,
  },
  {
    question: "What are common Breakpoints used in modern responsive web design?",
    answer: "Standard breakpoint thresholds commonly used in frameworks like Tailwind CSS:\n- sm: 640px (large phones)\n- md: 768px (tablets)\n- lg: 1024px (laptops/desktops)\n- xl: 1280px (large screens)\n- 2xl: 1536px (ultra-wide monitors)",
    difficulty: "Basic" as const,
  },
  {
    question: "What is Fluid Typography and how does clamp(min, val, max) work?",
    answer: "Fluid typography smoothly scales font size continuously between a minimum and maximum threshold based on viewport width (e.g. 'font-size: clamp(1rem, 2.5vw, 2.5rem);'), eliminating abrupt breakpoint font jumps.",
    difficulty: "Intermediate" as const,
  },
  {
    question: "How does prefers-color-scheme work?",
    answer: "'@media (prefers-color-scheme: dark)' detects if the user has selected dark mode in their OS or browser settings, allowing automatic switching of CSS color variables.",
    difficulty: "Basic" as const,
  },
  {
    question: "What is aspect-ratio property in CSS and how does it prevent Cumulative Layout Shift (CLS)?",
    answer: "The 'aspect-ratio' property (e.g. 'aspect-ratio: 16 / 9') reserves vertical layout space for responsive cards or video containers before assets load, preventing sudden layout reflows.",
    difficulty: "Intermediate" as const,
  },
  {
    question: "What is pointer and hover media features?",
    answer: "- @media (hover: hover): Detects if the primary input mechanism allows hovering (desktop mouse).\n- @media (pointer: coarse): Detects if the primary input is inaccurate (touchscreen finger), prompting larger tap target sizes.",
    difficulty: "Advanced" as const,
  },
  {
    question: "Why should you avoid hardcoding rigid pixel widths on structural layout containers?",
    answer: "Hardcoding static pixel widths (e.g. 'width: 1200px') causes horizontal scrollbars on smaller screens. Use relative max-width ('max-width: 1200px; width: 100%;') or fluid percentage/flex/grid tracks instead.",
    difficulty: "Basic" as const,
  },
];
