import { CodeBlock } from "@/components/topic/code-block";
import { CustomPropertiesPlayground } from "@/components/topic/css-playgrounds";
import { Callout, Code, H2, H3, Highlight, OL, P, UL } from "@/components/topic/prose";

export default function CustomPropertiesTopic() {
  return (
    <div>
      <P>
        Native CSS Custom Properties (CSS Variables) bring dynamic scope, runtime cascading, theme swapping, and JavaScript interop to frontend stylesheets.
      </P>

      <CustomPropertiesPlayground />

      <H2>1. Syntax, Scope & Fallbacks</H2>
      <CodeBlock
        lang="css"
        title="CSS Variables Declaration & Scoping"
        code={`/* Global Scope */
:root {
  --primary-color: #2563eb;
  --radius: 0.5rem;
}

/* Local Component Overrides */
.card-featured {
  --primary-color: #7c3aed; /* Overrides --primary-color for this subtree only */
}

/* Usage with Fallback */
.button {
  background-color: var(--primary-color, #000000);
  border-radius: var(--radius);
}`}
      />

      <H2>2. JavaScript Interop</H2>
      <P>
        Unlike preprocessor variables (Sass/Less) which compile away at build time, CSS Custom Properties live in the browser DOM and can be read or mutated dynamically with JS:
      </P>

      <CodeBlock
        lang="javascript"
        title="Dynamic JS Variable Manipulation"
        code={`// Read variable
const bg = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');

// Mutate variable on mouse move or theme switch
document.documentElement.style.setProperty('--primary-color', '#ef4444');`}
      />

      <H2>3. Typed Custom Properties via @property</H2>
      <P>
        The <Code>@property</Code> CSS rule registers typed variables so browsers can animate gradients and custom token transitions smoothly!
      </P>

      <CodeBlock
        lang="css"
        title="@property Typed Declaration"
        code={`@property --gradient-angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}

.animated-gradient {
  background: linear-gradient(var(--gradient-angle), #3b82f6, #ec4899);
  transition: --gradient-angle 0.5s ease;
}`}
      />

      <H3>Best Practices</H3>
      <OL>
        <li>Define design tokens (<Code>--color-*</Code>, <Code>--space-*</Code>, <Code>--font-*</Code>) on <Code>:root</Code>.</li>
        <li>Scope local variables inside components to keep CSS modular.</li>
        <li>Register animatable properties with <Code>@property</Code>.</li>
      </OL>
    </div>
  );
}
