import { CodeBlock } from "@/components/topic/code-block";
import { ErrorHandlingPlayground } from "@/components/topic/js-playgrounds";
import { Callout, Code, H2, H3, Highlight, OL, P, UL } from "@/components/topic/prose";
import { InterviewQuestions } from "@/components/topic/interview-questions";

export default function ErrorHandlingTopic() {
  return (
    <div>
      <P>
        Errors are an inevitable part of software development — network requests fail, user inputs are invalid, and properties are missing. Proper error handling using <Code>try...catch</Code> blocks keeps your app from crashing gracefully!
      </P>

      <ErrorHandlingPlayground />

      <H2>1. The try...catch...finally Block</H2>
      <P>
        The <Code>try</Code> block contains code that might throw an exception. If an error occurs, execution jumps immediately into the <Code>catch</Code> block. The <Code>finally</Code> block runs guaranteed regardless of success or failure.
      </P>

      <CodeBlock
        lang="javascript"
        title="try catch structure"
        code={`try {
  console.log("Attempting operation...");
  const data = JSON.parse(invalidJsonString); // Throws SyntaxError!
} catch (error) {
  console.error("Caught an error:", error.name, error.message);
} finally {
  console.log("Cleanup complete (spinner stopped).");
}`}
      />

      <H2>2. Throwing Custom Errors</H2>
      <P>
        You can intentionally throw custom errors using the <Code>throw</Code> statement when business logic validation fails:
      </P>

      <CodeBlock
        lang="javascript"
        title="throwing validation errors"
        code={`function withdrawMoney(amount, balance) {
  if (amount > balance) {
    throw new Error("Insufficient funds for withdrawal.");
  }
  return balance - amount;
}`}
      />

      <H3>Key Takeaways & Exercise</H3>
      <OL>
        <li>Never catch errors silently without logging or notifying the user.</li>
        <li>Use <Code>finally</Code> blocks for cleanup actions like hiding loading spinners.</li>
        <li>Toggle simulated runtime errors in the shield playground above to inspect execution trajectory logs!</li>
      </OL>

      <InterviewQuestions questions={ERROR_QUESTIONS} />
    </div>
  );
}

const ERROR_QUESTIONS = [
  {
    question: "How does try...catch...finally error handling work in JavaScript?",
    answer: "- try: Encloses code that might throw an error.\n- catch (error): Executes ONLY if an error occurs inside try, capturing the Error object.\n- finally: ALWAYS executes regardless of whether an error occurred or was caught (ideal for closing database connections or hiding loading spinners).",
    difficulty: "Basic" as const,
  },
  {
    question: "What are the common built-in Error types in JavaScript?",
    answer: "1. ReferenceError: Accessing an undeclared variable.\n2. TypeError: Performing an operation on an incompatible type (e.g. calling a non-function or accessing property of null).\n3. SyntaxError: Invalid JS code syntax.\n4. RangeError: Numeric value outside allowed bounds (e.g. invalid Array length).\n5. URIError: Malformed URI passed to decodeURI().",
    difficulty: "Basic" as const,
  },
  {
    question: "Can try...catch handle asynchronous errors in asynchronous callbacks or Promises?",
    answer: "Standard 'try...catch' CANNOT catch errors inside asynchronous callbacks (like setTimeout or un-awaited Promises). To catch async errors with try...catch, you MUST use the 'await' keyword inside an 'async function'.",
    difficulty: "Intermediate" as const,
  },
  {
    question: "How do you create a Custom Error class in JavaScript?",
    answer: "Extend the built-in Error class: 'class ValidationError extends Error { constructor(message) { super(message); this.name = \"ValidationError\"; } }'.",
    difficulty: "Intermediate" as const,
  },
  {
    question: "What is Error Cause chaining in ES2022?",
    answer: "ES2022 allows passing an options object with a 'cause' property when instantiating Error: 'throw new Error(\"Order failed\", { cause: originalApiError });'. This preserves lower-level diagnostic stack traces.",
    difficulty: "Advanced" as const,
  },
  {
    question: "What is window.onerror vs window.onunhandledrejection?",
    answer: "- window.onerror: Global event handler catching unhandled synchronous errors and runtime exceptions.\n- window.onunhandledrejection: Global event handler catching unhandled Promise rejections that lacked a .catch() block.",
    difficulty: "Intermediate" as const,
  },
  {
    question: "What happens if a return statement is executed inside BOTH try and finally blocks?",
    answer: "The 'return' statement inside the 'finally' block OVERRIDES any return statement or thrown error from the 'try' or 'catch' blocks!",
    difficulty: "Advanced" as const,
  },
  {
    question: "Why should you throw an Error object ('throw new Error()') instead of raw strings ('throw \"error\"')?",
    answer: "Instantiating a true 'Error' object automatically captures a full Stack Trace (file names, line numbers, function call sequence), whereas throwing raw strings or numbers discards debugging metadata.",
    difficulty: "Basic" as const,
  },
  {
    question: "What are Error Boundaries in React?",
    answer: "Error Boundaries are React component classes that catch JavaScript errors anywhere in their child component tree using 'componentDidCatch' or 'getDerivedStateFromError', rendering a fallback UI instead of crashing the entire app.",
    difficulty: "Intermediate" as const,
  },
  {
    question: "What is defensive programming vs fail-fast principle?",
    answer: "- Defensive Programming: Writing checks to handle invalid inputs gracefully (e.g. default values).\n- Fail-Fast: Throwing an explicit error immediately upon detecting invalid state to prevent corrupted data from propagating.",
    difficulty: "Advanced" as const,
  },
];
