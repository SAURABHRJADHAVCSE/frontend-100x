import { CodeBlock } from "@/components/topic/code-block";
import { TabOrderDiagram } from "@/components/topic/diagrams";
import { AccessibilityTreePlayground } from "@/components/topic/phase1-playgrounds";
import { Callout, Code, H2, H3, Highlight, OL, P, UL } from "@/components/topic/prose";
import { InterviewQuestions } from "@/components/topic/interview-questions";

export default function HtmlAccessibilityBasics() {
  return (
    <div>
      <P>
        Over a billion people worldwide have a disability that affects how they use a computer — low vision,
        blindness, motor impairments that make a mouse difficult, or cognitive differences that make cluttered
        interfaces hard to parse. Accessibility isn&apos;t a checklist bolted on at the end of a project; it&apos;s
        mostly a byproduct of writing the correct, semantic HTML you&apos;ve already been learning in this phase —
        plus a handful of specific, learnable techniques.
      </P>

      <AccessibilityTreePlayground />

      <H2>1. The four principles, in plain English (WCAG&apos;s POUR)</H2>
      <UL>
        <li>
          <Code>Perceivable</Code> — can people actually sense the content, through sight, sound, or touch? (Images
          need <Code>alt</Code> text; video needs captions.)
        </li>
        <li>
          <Code>Operable</Code> — can every interaction be done without a mouse, and given enough time to complete?
        </li>
        <li>
          <Code>Understandable</Code> — is the content readable and does the interface behave predictably?
        </li>
        <li>
          <Code>Robust</Code> — does it work correctly across different browsers and assistive technologies, now and
          as they evolve?
        </li>
      </UL>

      <H2>2. Keyboard access — the single biggest test</H2>
      <P>
        <Highlight>
          If you can unplug your mouse and still fully use a page — every link, button, and form field — using only
          Tab, Shift+Tab, Enter, and Space, you have already fixed the majority of real accessibility problems.
        </Highlight>{" "}
        This matters for screen reader users, people with motor impairments who can&apos;t use a mouse precisely,
        and power users who simply prefer the keyboard.
      </P>
      <TabOrderDiagram />
      <P>
        Tab order follows <em>DOM order</em> — the order elements appear in your HTML — not their visual position on
        screen. This is exactly why using CSS to visually reorder content (without also reordering the underlying
        HTML) can create a confusing experience: the page might look correct but Tab through it in an order that
        makes no sense.
      </P>

      <H2>3. Native elements are keyboard-accessible for free</H2>
      <CodeBlock
        lang="html"
        title="don't rebuild what already works"
        code={`<!-- Do this: -->\n<button onclick="submit()">Submit</button>\n\n<!-- Not this: -->\n<div onclick="submit()">Submit</div>`}
      />
      <P>
        A real <Code>{"<button>"}</Code> is automatically focusable with Tab and automatically activates on both
        Enter and Space. A <Code>{"<div>"}</Code> with a click handler gets none of that — you&apos;d have to
        manually add <Code>tabindex=&quot;0&quot;</Code>, listen for keyboard events yourself, and add{" "}
        <Code>role=&quot;button&quot;</Code> just to claw back what a real button gives you automatically. This is
        the recurring theme of accessible HTML:{" "}
        <Highlight>the native element is almost always less work and more robust than recreating its behavior.</Highlight>
      </P>

      <H2>4. Focus must be visible</H2>
      <CodeBlock
        lang="css"
        title="never do this"
        code={`/* This removes the visual indicator of keyboard focus for EVERYONE */\n*:focus {\n  outline: none;\n}`}
      />
      <Callout tone="warning">
        Removing the focus outline without providing a replacement is one of the most common and most damaging
        accessibility mistakes on the web — it makes a page completely unusable for anyone navigating by keyboard,
        because they lose all visual indication of where they currently are on the page.
      </Callout>
      <P>
        If the default outline clashes with your design, replace it with your own visible style instead of deleting
        it — and consider <Code>:focus-visible</Code>, which shows the ring only for keyboard users and not for
        mouse clicks, satisfying both design and accessibility.
      </P>

      <H2>5. Skip links — for people who tab through everything</H2>
      <CodeBlock
        lang="html"
        title="a skip link"
        code={`<a href="#main-content" class="skip-link">Skip to main content</a>\n<!-- ... header, nav with 15 links ... -->\n<main id="main-content">...</main>`}
      />
      <P>
        Without one, a keyboard user has to Tab through every single navigation link on every single page load just
        to reach the actual content — a skip link, usually visually hidden until it receives focus, lets them jump
        straight past it in one keystroke.
      </P>

      <H2>6. Alt text, labels, and announcing state</H2>
      <UL>
        <li>
          Every meaningful <Code>{"<img>"}</Code> needs descriptive <Code>alt</Code> text; every form input needs a
          real, associated <Code>{"<label>"}</Code> — both covered in depth in earlier lessons, and both are the
          foundation of an accessible page.
        </li>
        <li>
          <Code>aria-label</Code> provides an accessible name when there&apos;s no visible text to use it — e.g. an
          icon-only close button: <Code>{'<button aria-label="Close dialog">×</button>'}</Code>.
        </li>
        <li>
          <Code>aria-live=&quot;polite&quot;</Code> on a container makes screen readers automatically announce
          content that changes dynamically inside it — essential for things like a &quot;3 items added to cart&quot;
          confirmation that appears without a page reload.
        </li>
      </UL>

      <H2>7. Color contrast and not relying on color alone</H2>
      <P>
        Text needs sufficient contrast against its background to be readable by people with low vision or color
        blindness — WCAG AA requires a contrast ratio of at least 4.5:1 for normal text. Separately, never use color
        as the <em>only</em> way to convey information — &quot;fields in red are required&quot; excludes anyone who
        can&apos;t distinguish red; pairing it with an icon or the word &quot;required&quot; fixes it for everyone.
      </P>

      <H2>8. Testing what you build</H2>
      <UL>
        <li>Try navigating your own page with only the keyboard, as described above.</li>
        <li>
          Run an automated checker like <Code>axe DevTools</Code> or Lighthouse&apos;s accessibility audit — they
          catch missing alt text, poor contrast, and missing labels automatically.
        </li>
        <li>
          Turn on a real screen reader (VoiceOver on Mac, NVDA on Windows, both free) and try using your page with
          your eyes closed for two minutes — nothing teaches this faster than direct experience.
        </li>
      </UL>

      <H3>Try it yourself</H3>
      <OL>
        <li>Unplug your mouse (or just don&apos;t touch it) and try fully using a site you built recently.</li>
        <li>Find one icon-only button in a project and give it a proper <Code>aria-label</Code>.</li>
        <li>Add a skip link to a page with a long navigation menu.</li>
      </OL>

      <InterviewQuestions questions={A11Y_QUESTIONS} />
    </div>
  );
}

const A11Y_QUESTIONS = [
  {
    question: "What does WCAG stand for and what are its 4 main POUR principles?",
    answer: "WCAG stands for Web Content Accessibility Guidelines. Its 4 core principles are POUR:\n1. Perceivable: Information must be presentable to users in ways they can sense (visual, auditory, tactile).\n2. Operable: User interface components must be navigable and usable by keyboard.\n3. Understandable: Information and UI operation must be clear, predictable, and readable.\n4. Robust: Content must remain compatible across current and future assistive technologies.",
    difficulty: "Basic" as const,
  },
  {
    question: "What is WAI-ARIA and when should you use it?",
    answer: "WAI-ARIA (Web Accessibility Initiative - Accessible Rich Internet Applications) is a set of attributes (roles, states, properties) that extend HTML to express accessibility semantics for complex dynamic UI widgets (like modals, tabs, accordions) when native HTML elements are insufficient.",
    difficulty: "Intermediate" as const,
  },
  {
    question: "Why is *:focus { outline: none; } considered a major accessibility violation?",
    answer: "Removing the focus outline without providing a visible custom focus indicator makes the webpage completely unusable for keyboard users (who rely on Tab navigation), as they lose all visual indication of which element currently has focus.",
    difficulty: "Basic" as const,
  },
  {
    question: "What is a Skip Link ('Skip to Main Content') and why is it used?",
    answer: "A Skip Link is an anchor link placed at the very top of the HTML (visually hidden until focused) that lets keyboard and screen reader users bypass repetitive header navigation links and jump directly to the primary <main> content in one keystroke.",
    difficulty: "Basic" as const,
  },
  {
    question: "What is the minimum WCAG AA contrast ratio requirement for normal text?",
    answer: "WCAG 2.1 AA requires a contrast ratio of at least 4.5:1 for normal text (under 18pt/24px) and at least 3:1 for large text (18pt+ or 14pt bold) against its background.",
    difficulty: "Basic" as const,
  },
  {
    question: "What is the difference between aria-label, aria-labelledby, and aria-describedby?",
    answer: "- aria-label: Provides a direct text string label when no visible text exists (e.g. <button aria-label=\"Close dialog\">X</button>).\n- aria-labelledby: Points to the ID of ANOTHER visible DOM element to use as its accessible name.\n- aria-describedby: Points to the ID of an element providing additional description or helper text.",
    difficulty: "Intermediate" as const,
  },
  {
    question: "What is aria-live and what is the difference between aria-live=\"polite\" and aria-live=\"assertive\"?",
    answer: "aria-live creates a live region that screen readers automatically announce when its content changes dynamically:\n- polite: Waits until the screen reader finishes speaking its current sentence before announcing the update (used for status messages/toasts).\n- assertive: Immediately interrupts the screen reader to announce the update (used for critical system alerts/errors).",
    difficulty: "Advanced" as const,
  },
  {
    question: "What does tabindex=\"0\" vs tabindex=\"-1\" vs tabindex=\"1\" do?",
    answer: "- tabindex=\"0\": Inserts an element into natural keyboard tab order based on DOM position.\n- tabindex=\"-1\": Makes an element programmatically focusable via JS ('element.focus()'), but removes it from keyboard tab order.\n- tabindex=\">0\": Forces a custom tab order (CONSIDERED AN ANTI-PATTERN because it disrupts logical DOM tab sequence).",
    difficulty: "Intermediate" as const,
  },
  {
    question: "Why shouldn't color be used as the sole indicator of information?",
    answer: "Using color alone (e.g., 'fields in red are required' or green/red status dots) excludes users with color blindness (protanopia, deuteranopia). Always pair color with text labels, icons, or patterns.",
    difficulty: "Basic" as const,
  },
  {
    question: "What automated and manual tools should you use to test web accessibility?",
    answer: "Use automated testing tools (axe DevTools, Lighthouse, WAVE) to catch 40-50% of structural errors (missing alt, low contrast). Combine with manual keyboard navigation testing (Tab/Enter/Space) and real screen reader testing (VoiceOver on macOS/iOS, NVDA/JAWS on Windows).",
    difficulty: "Intermediate" as const,
  },
];
