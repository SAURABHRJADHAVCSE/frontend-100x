import { CodeBlock } from "@/components/topic/code-block";
import { ES6FeaturesPlayground } from "@/components/topic/js-playgrounds";
import { Callout, Code, H2, H3, Highlight, OL, P, UL } from "@/components/topic/prose";
import { InterviewQuestions } from "@/components/topic/interview-questions";

export default function ES6FeaturesTopic() {
  return (
    <div>
      <P>
        ES6 (ECMAScript 2015) was the largest modernization update in JavaScript history, introducing game-changing features like template literals, arrow functions, spread/rest operators, modules, and default parameters.
      </P>

      <ES6FeaturesPlayground />

      <H2>1. Template Literals</H2>
      <P>
        Template literals use backticks (<Code>`...`</Code>) instead of quotes, allowing embedded expressions (<Code>$&#123;expression&#125;</Code>) and multiline strings without cumbersome string concatenation.
      </P>

      <CodeBlock
        lang="javascript"
        title="template literal syntax"
        code={`const product = "Laptop";
const price = 999;

// Clean interpolated string:
const summary = \`The price of \${product} is $\${price}.\`;`}
      />

      <H2>2. Spread (...) and Rest (...) Operators</H2>
      <P>
        The three dots <Code>...</Code> serve two crucial roles depending on context:
      </P>
      <UL>
        <li><strong>Spread:</strong> Expands arrays or objects into individual elements (useful for shallow copying and merging).</li>
        <li><strong>Rest:</strong> Gathers multiple individual arguments into a single array parameter.</li>
      </UL>

      <CodeBlock
        lang="javascript"
        title="spread vs rest"
        code={`// 1. Spread Operator (Merging objects)
const defaultSettings = { theme: "dark", notifications: true };
const userSettings = { notifications: false, fontSize: 16 };
const finalConfig = { ...defaultSettings, ...userSettings };

// 2. Rest Operator (Gathering arguments)
function sumAll(...numbers) {
  return numbers.reduce((sum, n) => sum + n, 0);
}`}
      />

      <H2>3. ES Modules (import / export)</H2>
      <CodeBlock
        lang="javascript"
        title="module syntax"
        code={`// In mathUtils.js:
export const add = (a, b) => a + b;
export default function multiply(a, b) { return a * b; }

// In app.js:
import multiply, { add } from "./mathUtils.js";`}
      />

      <H3>Key Takeaways & Exercise</H3>
      <OL>
        <li>Spread <Code>...</Code> creates shallow copies to maintain immutability in React state updates.</li>
        <li>Template literals replace messy string concatenation (<Code>+ &quot; &quot; +</Code>).</li>
        <li>Explore the interactive tabbed suite above to test ES6 features!</li>
      </OL>

      <InterviewQuestions questions={ES6_QUESTIONS} />
    </div>
  );
}

const ES6_QUESTIONS = [
  {
    question: "What is the difference between the Spread operator (...) and Rest parameter (...)?",
    answer: "- Spread (...): Expands/unpacks an array or object into individual elements (e.g., '[...arr1, ...arr2]', '{ ...user, role: \"Admin\" }').\n- Rest (...): Collects multiple individual values/arguments into a single array parameter (e.g. 'function sum(...args)').",
    difficulty: "Basic" as const,
  },
  {
    question: "What is the difference between Named Exports and Default Exports in ES Modules?",
    answer: "- Named Export ('export const add = ...'): Must be imported using exact curly brace names ('import { add } from \"./math\"'). Can have multiple per file.\n- Default Export ('export default function...'): Imported without curly braces under any custom name ('import calc from \"./math\"'). Only ONE default export allowed per file.",
    difficulty: "Basic" as const,
  },
  {
    question: "What are Template Literals and Tagged Template Literals?",
    answer: "- Template Literals: String literals wrapped in backticks (``) allowing multi-line strings and expression interpolation (${expr}).\n- Tagged Templates: Prefixing a template literal with a function name ('styled.div`color: red`'), passing raw string chunks and evaluated expressions to the tag function.",
    difficulty: "Intermediate" as const,
  },
  {
    question: "What is a Map vs plain Object in ES6?",
    answer: "A Map is a key-value collection where:\n1. Keys can be ANY data type (objects, functions, primitives), unlike Objects where keys are coerced to strings.\n2. Maintains insertion order during iteration.\n3. Native '.size' property.",
    difficulty: "Intermediate" as const,
  },
  {
    question: "What is a Set in ES6?",
    answer: "A Set is a collection of UNIQUE values. Duplicate values passed to a Set are automatically ignored (e.g. '[...new Set([1, 2, 2, 3])] // [1, 2, 3]').",
    difficulty: "Basic" as const,
  },
  {
    question: "What is a WeakMap and WeakSet?",
    answer: "WeakMap and WeakSet hold WEAK references to key objects. If an object key has no other references in memory, it is automatically GARBAGE COLLECTED, preventing memory leaks in DOM node metadata storage.",
    difficulty: "Advanced" as const,
  },
  {
    question: "What are ES6 Classes and how do they relate to Prototypes?",
    answer: "ES6 Classes ('class User {}') are syntactical sugar over JavaScript's existing Prototype-based inheritance model, providing cleaner constructor and inheritance ('extends') syntax.",
    difficulty: "Basic" as const,
  },
  {
    question: "What is Promise.allSettled() vs Promise.all()?",
    answer: "- Promise.all(): Rejects immediately if ANY input promise rejects.\n- Promise.allSettled(): Waits for ALL promises to complete (either fulfilled or rejected) and returns an array of status objects for each.",
    difficulty: "Intermediate" as const,
  },
  {
    question: "What is the Symbol.iterator and how does for...of iterate objects?",
    answer: "An object is iterable if it implements the '[Symbol.iterator]()' method returning an iterator object with a '.next()' method. Arrays, Strings, Maps, and Sets natively implement this protocol.",
    difficulty: "Advanced" as const,
  },
  {
    question: "What is Top-Level await in ES Modules?",
    answer: "Top-level await allows using the 'await' keyword directly at the root module level outside of async function blocks, enabling dynamic module loading and database initialization before executing dependent code.",
    difficulty: "Intermediate" as const,
  },
];
