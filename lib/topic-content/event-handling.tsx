import { CodeBlock } from "@/components/topic/code-block";
import { EventHandlingPlayground } from "@/components/topic/js-playgrounds";
import { Callout, Code, H2, H3, Highlight, OL, P, UL } from "@/components/topic/prose";
import { InterviewQuestions } from "@/components/topic/interview-questions";

export default function EventHandlingTopic() {
  return (
    <div>
      <P>
        Events are signals emitted by the browser when something happens on the page — user clicks a button, types into an input field, submits a form, or scrolls the viewport. JavaScript attaches <Highlight>Event Listeners</Highlight> to react to these events.
      </P>

      <EventHandlingPlayground />

      <H2>1. Adding Event Listeners</H2>
      <P>
        The standard modern method to handle events is <Code>addEventListener(eventType, handlerFunction)</Code>:
      </P>

      <CodeBlock
        lang="javascript"
        title="attaching event listeners"
        code={`const button = document.querySelector("#save-btn");

button.addEventListener("click", (event) => {
  console.log("Button clicked!");
  console.log("Clicked element target:", event.target);
});`}
      />

      <H2>2. The Event Object &amp; preventDefault()</H2>
      <P>
        Browsers automatically pass an event object to your handler function containing crucial metadata (mouse coordinates, pressed keys, form data).
      </P>

      <CodeBlock
        lang="javascript"
        title="stopping form reload with preventDefault"
        code={`const form = document.querySelector("#login-form");

form.addEventListener("submit", (event) => {
  // Prevent default browser full page reload!
  event.preventDefault();

  console.log("Form submission handled asynchronously!");
});`}
      />

      <H2>3. Event Bubbling &amp; Delegation</H2>
      <P>
        When an event fires on an element, it bubbles up through its parent elements up to <Code>document</Code>. <strong>Event Delegation</strong> takes advantage of bubbling by attaching a single event listener to a parent container to manage clicks for hundreds of child elements efficiently!
      </P>

      <H3>Key Takeaways & Exercise</H3>
      <OL>
        <li>Always use <Code>addEventListener</Code> rather than inline HTML event attributes (<Code>onclick</Code>).</li>
        <li>Call <Code>event.preventDefault()</Code> when intercepting form submit actions.</li>
        <li>Interact with the real-time event inspector above to inspect event targets and key parameters!</li>
      </OL>

      <InterviewQuestions questions={EVENT_QUESTIONS} />
    </div>
  );
}

const EVENT_QUESTIONS = [
  {
    question: "What are the 3 phases of Event Propagation in the DOM?",
    answer: "1. Capturing Phase: Event travels down from the Document root to the target element.\n2. Target Phase: Event reaches the target element where the user clicked.\n3. Bubbling Phase: Event bubbles back up from the target element through parent ancestors up to the Document root.",
    difficulty: "Basic" as const,
  },
  {
    question: "What is Event Delegation and why is it useful?",
    answer: "Event Delegation is a technique where a single event listener is attached to a parent container instead of attaching individual listeners to 100 child elements. It leverages Event Bubbling (e.target) to catch events, saving memory and handling dynamically added child elements automatically.",
    difficulty: "Intermediate" as const,
  },
  {
    question: "What is the difference between event.stopPropagation() and event.preventDefault()?",
    answer: "- event.preventDefault(): Prevents the browser's default action for that event (e.g., stops a form from submitting/reloading, or a link from navigating).\n- event.stopPropagation(): Stops the event from propagating (bubbling up or capturing down) to parent/child DOM ancestors.",
    difficulty: "Basic" as const,
  },
  {
    question: "What is the difference between event.target and event.currentTarget?",
    answer: "- event.target: The actual specific DOM element that TRIGGERED the event (where the user physically clicked).\n- event.currentTarget: The DOM element to which the event listener function is currently ATTACHED.",
    difficulty: "Intermediate" as const,
  },
  {
    question: "What is event.stopImmediatePropagation()?",
    answer: "'stopImmediatePropagation()' not only stops the event from bubbling up to parent ancestors, but also prevents any OTHER event listeners attached to the exact SAME element from executing.",
    difficulty: "Advanced" as const,
  },
  {
    question: "What is the difference between Debouncing and Throttling?",
    answer: "- Debouncing: Delays executing a function until N milliseconds have passed SINCE THE LAST TIME the event was fired (ideal for search input autocomplete).\n- Throttling: Ensures a function is executed AT MOST ONCE every N milliseconds, regardless of how many times the event fires (ideal for window scroll/resize handlers).",
    difficulty: "Intermediate" as const,
  },
  {
    question: "How do passive event listeners ({ passive: true }) improve scroll performance?",
    answer: "Passing '{ passive: true }' to addEventListener informs the browser that the handler will NEVER call 'preventDefault()'. This allows the browser compositor thread to scroll the page smoothly without waiting for JavaScript thread execution.",
    difficulty: "Advanced" as const,
  },
  {
    question: "Why is inline event handler syntax (e.g. onclick=\"doSomething()\") an anti-pattern?",
    answer: "Inline handlers mix JavaScript logic directly with HTML markup, violate Content Security Policy (CSP) rules, contaminate global scope, and only allow a single handler per event.",
    difficulty: "Basic" as const,
  },
  {
    question: "What is a CustomEvent in JavaScript?",
    answer: "CustomEvent ('new CustomEvent(\"userLogin\", { detail: { id: 42 } })') allows developers to create and dispatch custom domain-specific events across DOM nodes using 'element.dispatchEvent(event)'.",
    difficulty: "Intermediate" as const,
  },
  {
    question: "Why must you remove event listeners when unmounting UI components?",
    answer: "Failing to remove event listeners (via 'removeEventListener') when elements are destroyed creates memory leaks, as references inside the event listener closure prevent garbage collection.",
    difficulty: "Intermediate" as const,
  },
];
