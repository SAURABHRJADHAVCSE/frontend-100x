import { CodeBlock } from "@/components/topic/code-block";
import { ResponsiveContainerPlayground } from "@/components/topic/css-playgrounds";
import { Callout, Code, H2, H3, Highlight, OL, P, UL } from "@/components/topic/prose";

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
    </div>
  );
}
