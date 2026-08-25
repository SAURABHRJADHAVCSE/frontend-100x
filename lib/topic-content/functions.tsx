import { CodeBlock } from "@/components/topic/code-block";
import { FunctionPlayground } from "@/components/topic/js-playgrounds";
import { Callout, Code, H2, H3, Highlight, OL, P, UL } from "@/components/topic/prose";
import { InterviewQuestions } from "@/components/topic/interview-questions";

export default function FunctionsTopic() {
  return (
    <div>
      <P>
        Functions are the fundamental building blocks of JavaScript. A function is a reusable block of code designed to perform a specific task, take inputs (parameters), process logic, and optional return an output.
      </P>

      <FunctionPlayground />

      <H2>1. Function Declarations vs Expressions vs Arrow Functions</H2>
      <P>
        JavaScript provides multiple syntax choices for defining functions:
      </P>

      <CodeBlock
        lang="javascript"
        title="three ways to write functions"
        code={`// 1. Function Declaration (Hoisted!)
function greet(name) {
  return \`Hello, \${name}!\`;
}

// 2. Function Expression
const greetExp = function(name) {
  return \`Hello, \${name}!\`;
};

// 3. Modern Arrow Function (Concise syntax)
const greetArrow = (name) => \`Hello, \${name}!\`;`}
      />

      <H2>2. Parameters, Arguments &amp; Default Values</H2>
      <P>
        <strong>Parameters</strong> are the named placeholders defined in a function signature. <strong>Arguments</strong> are the actual values passed into the function when invoking it.
      </P>

      <CodeBlock
        lang="javascript"
        title="default parameters"
        code={`function createPlayer(username, level = 1) {
  return { username, level, health: 100 };
}

console.log(createPlayer("ShadowKnight")); // { username: "ShadowKnight", level: 1, health: 100 }`}
      />

      <H2>3. The Return Statement</H2>
      <P>
        The <Code>return</Code> statement immediately terminates function execution and specifies the value to be returned back to the caller. If no return statement is specified, the function returns <Code>undefined</Code> by default.
      </P>

      <H3>Key Takeaways & Exercise</H3>
      <OL>
        <li>Functions make code DRY (Don&apos;t Repeat Yourself) and modular.</li>
        <li>Arrow functions are the standard syntax for callbacks and modern React components.</li>
        <li>Try editing and running custom functions in the execution lab playground above!</li>
      </OL>

      <InterviewQuestions questions={FUNCTIONS_JS_QUESTIONS} />
    </div>
  );
}

const FUNCTIONS_JS_QUESTIONS = [
  {
    question: "What is the difference between Function Declaration and Function Expression?",
    answer: "- Function Declaration: 'function foo() {}' — Hoisted completely to the top of its scope and can be called before its definition in code.\n- Function Expression: 'const foo = function() {}' — Hoisted as a variable but stays uninitialized in TDZ, cannot be called before definition.",
    difficulty: "Basic" as const,
  },
  {
    question: "How do Arrow Functions (() => {}) differ from traditional function declarations?",
    answer: "1. 'this' Binding: Arrow functions do NOT have their own 'this'; they lexically inherit 'this' from the enclosing parent scope.\n2. No 'arguments' object.\n3. Cannot be used as constructor functions with 'new'.\n4. Implicit return syntax for single expression bodies.",
    difficulty: "Intermediate" as const,
  },
  {
    question: "What is a Higher-Order Function (HOF)?",
    answer: "A Higher-Order Function is a function that either takes one or more functions as arguments (callbacks) or returns a function as its result (e.g. Array.prototype.map, filter, reduce, or debounce wrappers).",
    difficulty: "Intermediate" as const,
  },
  {
    question: "What is an IIFE (Immediately Invoked Function Expression) and why was it used?",
    answer: "An IIFE is a function that runs immediately upon creation: '(function() { ... })();'. Before ES6 let/const and ES modules, IIFEs were used to create private scope blocks and prevent global variable pollution.",
    difficulty: "Basic" as const,
  },
  {
    question: "What is Default Parameter Syntax in ES6?",
    answer: "Default parameters ('function greet(name = \"Guest\")') allow setting default values for arguments if none are passed or if 'undefined' is explicitly passed.",
    difficulty: "Basic" as const,
  },
  {
    question: "What is the Rest Parameter (...args) syntax in functions?",
    answer: "Rest parameters ('function sum(...numbers)') collect an indefinite number of trailing arguments into a true Array, replacing the legacy 'arguments' object.",
    difficulty: "Basic" as const,
  },
  {
    question: "What is pure function vs impure function?",
    answer: "- Pure Function: Always returns the exact same output given the same input arguments, and produces ZERO side effects (does not mutate global state, DOM, or files).\n- Impure Function: Produces side effects or relies on non-deterministic external state (Math.random(), Date.now(), mutating external arrays).",
    difficulty: "Intermediate" as const,
  },
  {
    question: "What is Function Currying?",
    answer: "Currying is a technique of translating a function with multiple arguments into a sequence of functions that each take a single argument: 'const add = a => b => a + b; add(2)(3); // 5'.",
    difficulty: "Advanced" as const,
  },
  {
    question: "What happens if a function does not contain an explicit return statement?",
    answer: "In JavaScript, any function that completes execution without encountering an explicit 'return' statement automatically returns 'undefined'.",
    difficulty: "Basic" as const,
  },
  {
    question: "What is the arguments object in traditional functions?",
    answer: "'arguments' is an Array-like object available inside traditional non-arrow functions containing all passed argument values indexed numerically. It lacks array methods like map() or filter().",
    difficulty: "Intermediate" as const,
  },
];
