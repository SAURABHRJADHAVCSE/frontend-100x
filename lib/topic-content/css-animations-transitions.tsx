import { CodeBlock } from "@/components/topic/code-block";
import { AnimationStudio } from "@/components/topic/css-playgrounds";
import { Callout, Code, H2, H3, Highlight, OL, P, UL } from "@/components/topic/prose";
import { InterviewQuestions } from "@/components/topic/interview-questions";

export default function AnimationsTransitionsTopic() {
  return (
    <div>
      <P>
        CSS animations and transitions bring interfaces to life, providing micro-feedback and visual continuity.
      </P>

      <AnimationStudio />

      <H2>1. Transitions vs Keyframe Animations</H2>
      <UL>
        <li>
          <strong>Transitions:</strong> Smoothly interpolate state changes (e.g. hover, focus). Requires a trigger.
        </li>
        <li>
          <strong>Keyframe Animations (@keyframes):</strong> Complex multi-stage animation sequences that can run automatically or infinitely.
        </li>
      </UL>

      <H2>2. High-Performance Hardware Acceleration</H2>
      <Callout tone="warning">
        Animating layout properties like <Code>width</Code>, <Code>height</Code>, <Code>margin</Code>, or <Code>top</Code> triggers expensive browser <strong>Reflow (Layout)</strong> and <strong>Repaint</strong>, causing frame drops on mobile devices.
      </Callout>

      <P>
        Only animate composite properties handled directly by the GPU:
      </P>
      <UL>
        <li><Code>transform</Code> (translate, scale, rotate)</li>
        <li><Code>opacity</Code></li>
        <li><Code>filter</Code></li>
      </UL>

      <CodeBlock
        lang="css"
        title="Hardware-Accelerated Pulse Animation"
        code={`@keyframes pulse-glow {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.pulse-card {
  animation: pulse-glow 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  will-change: transform, opacity;
}`}
      />

      <H3>Best Practices</H3>
      <OL>
        <li>Stick to <Code>transform</Code> and <Code>opacity</Code> for 60fps buttery smooth performance.</li>
        <li>Use custom easing curves (<Code>cubic-bezier</Code>) for natural physical movement.</li>
        <li>Provide <Code>@media (prefers-reduced-motion: reduce)</Code> fallbacks.</li>
      </OL>

      <InterviewQuestions questions={ANIMATIONS_QUESTIONS} />
    </div>
  );
}

const ANIMATIONS_QUESTIONS = [
  {
    question: "What is the difference between CSS Transitions and CSS Animations (@keyframes)?",
    answer: "- Transitions: Smoothly interpolate property values between TWO states (triggered by state changes like :hover, :focus, or JS class toggles).\n- Keyframe Animations (@keyframes): Complex multi-step animation sequences with precise percentage keyframes (0%, 50%, 100%), looping capability (infinite), and automatic trigger on render.",
    difficulty: "Basic" as const,
  },
  {
    question: "Why should you only animate transform and opacity properties for 60fps performance?",
    answer: "Animating 'transform' and 'opacity' bypasses layout recalculation (Reflow) and paint cycles, offloading composite calculations directly to the GPU (Composite thread). Animating properties like width, height, margin, or top forces heavy CPU Reflow and Repaint on every single frame.",
    difficulty: "Intermediate" as const,
  },
  {
    question: "What is the difference between Reflow (Layout) and Repaint?",
    answer: "- Reflow (Layout): Browser recalculates element geometry, size, and positioning for affected DOM nodes.\n- Repaint: Browser redraws visual pixels (colors, shadows, background) without changing layout geometry. Reflow ALWAYS triggers a Repaint, making it much more expensive.",
    difficulty: "Intermediate" as const,
  },
  {
    question: "What does the will-change CSS property do and how should it be used?",
    answer: "'will-change: transform, opacity;' hints to the browser rendering engine in advance that a specific property will animate, prompting it to promote the element to a dedicated GPU layer. It should be used sparingly, as overusing it consumes excessive GPU memory.",
    difficulty: "Advanced" as const,
  },
  {
    question: "What is easing (transition-timing-function) and how does cubic-bezier() work?",
    answer: "Easing controls the acceleration and deceleration rate of an animation over time (e.g. ease-in, ease-out, linear). 'cubic-bezier(x1, y1, x2, y2)' lets developers define custom mathematical Bezier curve acceleration points for springy or realistic physical movement.",
    difficulty: "Intermediate" as const,
  },
  {
    question: "What does animation-fill-mode: forwards do?",
    answer: "'animation-fill-mode: forwards' forces the element to retain the styling state defined in the LAST keyframe (100%) after the animation completes, preventing it from snapping back to its original pre-animation styles.",
    difficulty: "Basic" as const,
  },
  {
    question: "What is the transition shorthand property syntax?",
    answer: "Syntax: 'transition: property duration timing-function delay;' (e.g. 'transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0.1s;').",
    difficulty: "Basic" as const,
  },
  {
    question: "How do you restart a CSS keyframe animation using JavaScript?",
    answer: "To restart an animation: remove the CSS animation class, trigger a DOM reflow (by reading 'element.offsetWidth'), and then re-add the animation class.",
    difficulty: "Advanced" as const,
  },
  {
    question: "What is animation-direction: alternate?",
    answer: "'animation-direction: alternate' causes the animation cycle to alternate direction on every iteration, playing forward on odd cycles and backward on even cycles.",
    difficulty: "Basic" as const,
  },
  {
    question: "How do step-based timing functions (steps(N)) work in CSS?",
    answer: "'transition-timing-function: steps(N)' divides the animation duration into N discrete equal-length steps, producing a frame-by-frame mechanical or pixel-art sprite animation instead of smooth interpolation.",
    difficulty: "Intermediate" as const,
  },
];
