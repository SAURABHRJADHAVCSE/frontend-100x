import { CodeBlock } from "@/components/topic/code-block";
import { PromisePlayground } from "@/components/topic/js-playgrounds";
import { Callout, Code, H2, H3, Highlight, OL, P, UL } from "@/components/topic/prose";
import { InterviewQuestions } from "@/components/topic/interview-questions";

export default function PromisesAsyncAwaitTopic() {
  return (
    <div>
      <P>
        JavaScript is single-threaded. Long-running tasks like fetching data over a network or reading files take time. <Highlight>Asynchronous programming</Highlight> allows JS to execute long tasks in the background without freezing the UI!
      </P>

      <PromisePlayground />

      <H2>1. The 3 States of a Promise</H2>
      <P>
        A <strong>Promise</strong> is a container object representing the eventual completion (or failure) of an asynchronous operation. A promise is always in one of three states:
      </P>
      <UL>
        <li><Code>Pending</Code> — Initial state; operation is currently in progress.</li>
        <li><Code>Fulfilled</Code> — The operation succeeded, returning a result value.</li>
        <li><Code>Rejected</Code> — The operation failed, returning an error reason.</li>
      </UL>

      <H2>2. Modern async / await Syntax</H2>
      <P>
        While Promises can use <Code>.then()</Code> and <Code>.catch()</Code>, <Code>async/await</Code> provides a syntax that makes asynchronous code look and read like synchronous code!
      </P>

      <CodeBlock
        lang="javascript"
        title="async await syntax"
        code={`// Mark function with async keyword
async function loadUserData(userId) {
  try {
    // Pause execution until fetch Promise resolves
    const response = await fetch(\`/api/users/\${userId}\`);
    const user = await response.json();
    console.log("User loaded:", user);
  } catch (error) {
    console.error("Failed to load user:", error);
  }
}`}
      />

      <H2>3. Parallel Promises with Promise.all</H2>
      <CodeBlock
        lang="javascript"
        title="concurrent fetch"
        code={`// Run multiple fetch requests in parallel for maximum speed!
const [users, posts] = await Promise.all([
  fetch("/api/users").then(r => r.json()),
  fetch("/api/posts").then(r => r.json())
]);`}
      />

      <H3>Key Takeaways & Exercise</H3>
      <OL>
        <li>Always wrap <Code>await</Code> calls in a <Code>try...catch</Code> block for error safety.</li>
        <li>Use <Code>Promise.all</Code> when fetching multiple independent resources at the same time.</li>
        <li>Test state transitions (Pending -&gt; Fulfilled / Rejected) in the state machine playground above!</li>
      </OL>

      <InterviewQuestions questions={PROMISE_QUESTIONS} />
    </div>
  );
}

const PROMISE_QUESTIONS = [
  {
    question: "What is a Promise in JavaScript and what are its 3 possible states?",
    answer: "A Promise is an object representing the eventual completion or failure of an asynchronous operation. Its 3 mutually exclusive states are:\n1. Pending: Initial state, operation still in progress.\n2. Fulfilled: Operation completed successfully (resolved with value).\n3. Rejected: Operation failed (rejected with reason/error).",
    difficulty: "Basic" as const,
  },
  {
    question: "How does async/await relate to Promises?",
    answer: "'async/await' is syntactical sugar built on top of native Promises. Marking a function 'async' makes it automatically return a Promise, and using 'await' pauses function execution until the awaited Promise settles, making async code read like synchronous code.",
    difficulty: "Basic" as const,
  },
  {
    question: "What is the difference between Promise.all(), Promise.race(), Promise.allSettled(), and Promise.any()?",
    answer: "- Promise.all(): Fulfills when ALL fulfill; rejects IMMEDIATELY if ANY promise rejects (fail-fast).\n- Promise.allSettled(): Waits for ALL to settle regardless of success/failure, returning an array of outcome objects.\n- Promise.race(): Settles (fulfills or rejects) as soon as the FIRST promise settles.\n- Promise.any(): Fulfills as soon as the FIRST promise FULFILLS (ignores rejections unless ALL reject).",
    difficulty: "Intermediate" as const,
  },
  {
    question: "How does the Event Loop handle Microtasks vs Macrotasks?",
    answer: "JavaScript prioritizes execution queues:\n- Microtask Queue: Promise callbacks (.then, .catch, await), MutationObserver, queueMicrotask().\n- Macrotask Queue: setTimeout, setInterval, setImmediate, I/O events.\nAfter every synchronous execution stack finishes, the Event Loop executes ALL pending Microtasks before executing the next single Macrotask.",
    difficulty: "Advanced" as const,
  },
  {
    question: "What happens if an error is thrown inside an async function?",
    answer: "If an error is thrown inside an 'async function', the Promise returned by that function is automatically REJECTED with the thrown error, which can be caught using a 'try...catch' block around the 'await' call or via '.catch()'.",
    difficulty: "Basic" as const,
  },
  {
    question: "Why should you avoid sequential await inside loops when operations are independent?",
    answer: "Writing 'for (const url of urls) { await fetch(url); }' executes requests sequentially, wasting time waiting for each request to finish. Use 'Promise.all(urls.map(url => fetch(url)))' to fetch all URLs concurrently in parallel.",
    difficulty: "Intermediate" as const,
  },
  {
    question: "What is Callback Hell and how do Promises solve it?",
    answer: "Callback Hell (Pyramid of Doom) occurs when deeply nested asynchronous callbacks become unreadable and hard to maintain. Promises flatten nesting by chaining '.then()' methods linearly or flattening with 'async/await'.",
    difficulty: "Basic" as const,
  },
  {
    question: "Is a Promise constructor execution synchronous or asynchronous?",
    answer: "The executor function passed to 'new Promise((resolve, reject) => { ... })' executes SYNCHRONOUSLY immediately when created. Only the '.then()' and '.catch()' callbacks are queued asynchronously in the Microtask queue.",
    difficulty: "Advanced" as const,
  },
  {
    question: "What is queueMicrotask() in JavaScript?",
    answer: "'queueMicrotask(fn)' explicitly queues a microtask function to execute after the current script finishes but before control is returned to the Event Loop, ensuring consistent async callback timing.",
    difficulty: "Advanced" as const,
  },
  {
    question: "How do you handle unhandled Promise rejections globally?",
    answer: "In browser environments, listen to the global 'unhandledrejection' event on window: 'window.addEventListener(\"unhandledrejection\", event => { console.error(event.reason); });'.",
    difficulty: "Intermediate" as const,
  },
];
