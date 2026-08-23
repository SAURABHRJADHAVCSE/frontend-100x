import { CodeBlock } from "@/components/topic/code-block";
import { AnimationStudio } from "@/components/topic/css-playgrounds";
import { Callout, Code, H2, H3, Highlight, OL, P, UL } from "@/components/topic/prose";

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
    </div>
  );
}
