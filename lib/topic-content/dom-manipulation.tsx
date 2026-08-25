import { CodeBlock } from "@/components/topic/code-block";
import { DomManipulationPlayground } from "@/components/topic/js-playgrounds";
import { Callout, Code, H2, H3, Highlight, OL, P, UL } from "@/components/topic/prose";
import { InterviewQuestions } from "@/components/topic/interview-questions";

export default function DomManipulationTopic() {
  return (
    <div>
      <P>
        The Document Object Model (DOM) is an object-based tree representation of your HTML web page. JavaScript uses DOM APIs to read elements, change text and styles, append new HTML nodes, and remove elements dynamically.
      </P>

      <DomManipulationPlayground />

      <H2>1. Selecting DOM Elements</H2>
      <P>
        Before you can change an element on screen, you must select it using a query selector:
      </P>

      <CodeBlock
        lang="javascript"
        title="modern DOM selection"
        code={`// Select single element (returns Node or null)
const heading = document.querySelector("#main-title");
const submitBtn = document.querySelector(".btn-submit");

// Select multiple elements (returns static NodeList)
const allCards = document.querySelectorAll(".card");`}
      />

      <H2>2. Modifying Content &amp; Attributes</H2>
      <CodeBlock
        lang="javascript"
        title="updating content & classes"
        code={`// Update text safely
heading.textContent = "Updated via JavaScript!";

// Modify CSS classes cleanly
submitBtn.classList.add("active");
submitBtn.classList.remove("disabled");
submitBtn.classList.toggle("highlight");

// Set attributes
const link = document.querySelector("a");
link.setAttribute("href", "https://developer.mozilla.org");`}
      />

      <H2>3. Creating and Appending Nodes</H2>
      <CodeBlock
        lang="javascript"
        title="dynamically adding html"
        code={`const newLi = document.createElement("li");
newLi.textContent = "New Dynamic Item";
newLi.classList.add("list-item");

const ulContainer = document.querySelector("ul");
ulContainer.appendChild(newLi);`}
      />

      <H3>Key Takeaways & Exercise</H3>
      <OL>
        <li>Prefer <Code>textContent</Code> over <Code>innerHTML</Code> for updating text to prevent XSS vulnerabilities.</li>
        <li>Use <Code>classList</Code> methods (<Code>add</Code>, <Code>remove</Code>, <Code>toggle</Code>) for CSS modifications instead of inline styles.</li>
        <li>Test creating and styling DOM nodes dynamically in the interactive tree sandbox above!</li>
      </OL>

      <InterviewQuestions questions={DOM_QUESTIONS} />
    </div>
  );
}

const DOM_QUESTIONS = [
  {
    question: "What is the DOM (Document Object Model)?",
    answer: "The DOM is a tree-like object representation of the HTML document created by the browser memory. It provides a programming interface (API) that allows JavaScript to inspect, manipulate, add, or delete HTML elements and attributes dynamically.",
    difficulty: "Basic" as const,
  },
  {
    question: "What is the difference between innerHTML, textContent, and innerText?",
    answer: "- innerHTML: Parses and returns full HTML markup tags inside an element (RISK OF XSS IF UNPARSED USER INPUT IS INSERTED).\n- textContent: Returns all raw text content inside an element (including hidden elements and script tags), fast and XSS-safe.\n- innerText: Returns human-readable rendered text as visually displayed on screen (respects CSS styling like display:none and forces layout calculation).",
    difficulty: "Basic" as const,
  },
  {
    question: "Why is innerHTML considered a major security risk (XSS)?",
    answer: "Assigning un-sanitized user input strings directly to 'innerHTML' allows attackers to inject malicious <script> tags or <img src=x onerror=\"badCode()\"> handlers, executing arbitrary JavaScript in the victim's session (Cross-Site Scripting).",
    difficulty: "Intermediate" as const,
  },
  {
    question: "What is a DocumentFragment and why is it used for batch DOM updates?",
    answer: "A DocumentFragment is a lightweight, off-screen minimal document object. Appending 100 new <li> items to a DocumentFragment and then appending the fragment to the real DOM triggers only ONE layout reflow/repaint instead of 100 separate reflows.",
    difficulty: "Intermediate" as const,
  },
  {
    question: "What is the difference between querySelector and getElementById?",
    answer: "- querySelector: Takes any valid CSS selector string (e.g. '.card > button:first-child'), flexible, returns the first matching Element.\n- getElementById: Takes a plain ID string ('header'), faster lookups via internal browser hash tables.",
    difficulty: "Basic" as const,
  },
  {
    question: "What is the difference between HTMLCollection and NodeList?",
    answer: "- HTMLCollection (returned by getElementsByClassName/TagName): LIVE collection that automatically updates when DOM elements are added or removed; only contains Element nodes; cannot use forEach().\n- NodeList (returned by querySelectorAll): STATIC snapshot of elements; can contain any Node type (text, comments); natively supports forEach().",
    difficulty: "Intermediate" as const,
  },
  {
    question: "What is the difference between removeChild() and remove()?",
    answer: "- parentNode.removeChild(childNode): Legacy method requiring reference to both parent container and target child.\n- childNode.remove(): Modern clean method called directly on the target element node itself.",
    difficulty: "Basic" as const,
  },
  {
    question: "How do classList methods (add, remove, toggle, contains) simplify CSS manipulation?",
    answer: "'classList' provides a clean API for manipulating element class strings without manually concatenating 'element.className' strings. 'element.classList.toggle('active')' adds the class if absent, or removes it if present.",
    difficulty: "Basic" as const,
  },
  {
    question: "What is dataset / data-* attributes in HTML5 DOM manipulation?",
    answer: "HTML5 'data-*' attributes allow storing custom data directly on DOM nodes (e.g. '<div data-user-id=\"42\">'). JavaScript reads and writes these values cleanly using 'element.dataset.userId'.",
    difficulty: "Basic" as const,
  },
  {
    question: "What happens when you append an existing DOM node to a new parent in the DOM?",
    answer: "In the DOM, a node can exist in only ONE position at a time. Appending an existing DOM node to a new parent container MOVES the element from its old position to the new position without making a duplicate copy.",
    difficulty: "Intermediate" as const,
  },
];
