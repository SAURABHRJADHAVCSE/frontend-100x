import { CodeBlock } from "@/components/topic/code-block";
import { VariablePlayground } from "@/components/topic/js-playgrounds";
import { Callout, Code, H2, H3, Highlight, OL, P, UL } from "@/components/topic/prose";
import { InterviewQuestions } from "@/components/topic/interview-questions";

export default function VariablesDataTypesTopic() {
  return (
    <div>
      <P>
        Welcome to JavaScript — the engine and brain of modern web applications! While HTML builds structure and CSS provides visual styling, <Highlight>JavaScript brings web pages to life</Highlight> by processing data, making decisions, and responding to user actions.
      </P>

      <VariablePlayground />

      <H2>1. What is a Variable?</H2>
      <P>
        Think of a variable as a <Highlight>labeled container in computer memory (RAM)</Highlight>. It allows you to store data under a friendly name so you can retrieve, modify, and pass it around your program later.
      </P>

      <CodeBlock
        lang="javascript"
        title="declaring variables in js"
        code={`let userScore = 100;
const MAX_PLAYERS = 4;
var legacyName = "Old Way";`}
      />

      <H2>2. let vs const vs var (The Golden Rules)</H2>
      <P>
        JavaScript provides three keywords to declare variables. Knowing when to use which is essential:
      </P>
      <UL>
        <li>
          <Code>const</Code> — <strong>Constant binding</strong>. Use this by default for 90%+ of your variables. Once assigned, you cannot re-assign it to a new value.
        </li>
        <li>
          <Code>let</Code> — <strong>Reassignable variable</strong>. Use when you explicitly know the value will change over time (e.g. counters, loop iterators, toggles).
        </li>
        <li>
          <Code>var</Code> — <strong>Legacy declaration</strong>. Function-scoped and hoisted. <Highlight>Avoid using var in modern JavaScript</Highlight> to prevent unexpected scope bugs.
        </li>
      </UL>

      <Callout tone="note">
        Rule of thumb: Always start with <Code>const</Code>. Switch to <Code>let</Code> only when you need to reassign the variable!
      </Callout>

      <H2>3. The Primitive Data Types</H2>
      <P>
        JavaScript features 7 primitive data types. Primitives are immutable and stored directly by value:
      </P>
      <UL>
        <li><Code>Number</Code> — Integers and floating point numbers (e.g. <Code>42</Code>, <Code>3.14</Code>).</li>
        <li><Code>String</Code> — Textual data wrapped in quotes (e.g. <Code>&quot;Hello World&quot;</Code>, <Code>&apos;JavaScript&apos;</Code>, <Code>`Template`</Code>).</li>
        <li><Code>Boolean</Code> — Logical flags with only two possible values: <Code>true</Code> or <Code>false</Code>.</li>
        <li><Code>Undefined</Code> — A variable that has been declared but not yet assigned a value.</li>
        <li><Code>Null</Code> — Represents an explicit intentional absence of any object value.</li>
        <li><Code>Symbol</Code> &amp; <Code>BigInt</Code> — Unique identifiers and arbitrarily large integers.</li>
      </UL>

      <H2>4. Checking Types with typeof</H2>
      <CodeBlock
        lang="javascript"
        title="inspecting types"
        code={`console.log(typeof 42);          // "number"
console.log(typeof "Frontend");   // "string"
console.log(typeof true);       // "boolean"
console.log(typeof undefined);  // "undefined"
console.log(typeof null);       // "object" (famous historical JS quirk!)`}
      />

      <H3>Key Takeaways & Exercise</H3>
      <OL>
        <li>Variables store data in RAM under a named reference.</li>
        <li>Default to <Code>const</Code>, use <Code>let</Code> when re-assignment is needed, avoid <Code>var</Code>.</li>
        <li>Test different values in the playground above and inspect how their primitive type is inferred in memory!</li>
      </OL>

      <InterviewQuestions questions={VARIABLES_JS_QUESTIONS} />
    </div>
  );
}

const VARIABLES_JS_QUESTIONS = [
  {
    question: "What is the difference between var, let, and const in JavaScript?",
    answer: "- var: Function-scoped (or global), hoisted to top of scope initialized with 'undefined', can be re-declared and re-assigned.\n- let: Block-scoped ({}), hoisted but placed in Temporal Dead Zone (TDZ), cannot be re-declared in same scope, can be re-assigned.\n- const: Block-scoped ({}), hoisted in TDZ, cannot be re-declared or re-assigned (though properties of const objects/arrays CAN be mutated).",
    difficulty: "Basic" as const,
  },
  {
    question: "What are the 7 Primitive Data Types in JavaScript?",
    answer: "1. String\n2. Number\n3. Boolean\n4. Undefined\n5. Null\n6. Symbol\n7. BigInt\n(All primitive values are immutable and passed by value).",
    difficulty: "Basic" as const,
  },
  {
    question: "Why does typeof null return 'object' in JavaScript?",
    answer: "This is a famous historical bug from the first version of JavaScript (1995). Values were represented with a type tag and a value. Objects had a type tag of 0, and 'null' was represented as the null pointer (0x00), leading 'typeof null' to mistakenly return 'object'. It is preserved for backwards compatibility.",
    difficulty: "Intermediate" as const,
  },
  {
    question: "What is the Temporal Dead Zone (TDZ)?",
    answer: "The Temporal Dead Zone is the period between entering a scope and the line where a 'let' or 'const' variable is declared. Accessing the variable during TDZ throws a ReferenceError.",
    difficulty: "Intermediate" as const,
  },
  {
    question: "What is the difference between null and undefined?",
    answer: "- undefined: Indicates a variable has been declared but not yet assigned any value (or a function missing a return statement).\n- null: An explicit assignment representing an intentional absence of any value.",
    difficulty: "Basic" as const,
  },
  {
    question: "What is Hoisting in JavaScript?",
    answer: "Hoisting is JavaScript's default behavior of moving variable and function declarations to the top of their containing scope during the compilation phase before code execution.",
    difficulty: "Basic" as const,
  },
  {
    question: "What is the difference between Pass by Value vs Pass by Reference?",
    answer: "- Primitives (numbers, strings, booleans) are passed BY VALUE (copied independently).\n- Non-primitives (Objects, Arrays, Functions) are passed BY REFERENCE (pointing to the same memory address in heap).",
    difficulty: "Intermediate" as const,
  },
  {
    question: "What is Symbol used for in JavaScript?",
    answer: "A Symbol is a unique and immutable primitive value commonly used as object property keys to prevent naming collisions in libraries or to create hidden/private object properties.",
    difficulty: "Advanced" as const,
  },
  {
    question: "Why is BigInt needed in JavaScript?",
    answer: "Standard JavaScript Numbers are 64-bit floats with a maximum safe integer limit of Number.MAX_SAFE_INTEGER (2^53 - 1). BigInt allows working with arbitrarily large integers beyond this limit (e.g. 9007199254740991n).",
    difficulty: "Advanced" as const,
  },
  {
    question: "Does const make an object immutable in JavaScript?",
    answer: "NO. 'const' only prevents re-assigning the variable identifier reference to a new object. The contents/properties inside the const object CAN be modified. To make an object immutable, use 'Object.freeze(obj)'.",
    difficulty: "Intermediate" as const,
  },
];
