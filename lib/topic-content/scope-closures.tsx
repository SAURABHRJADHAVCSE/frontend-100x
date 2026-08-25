import { CodeBlock } from "@/components/topic/code-block";
import { ScopeClosurePlayground } from "@/components/topic/js-playgrounds";
import { Callout, Code, H2, H3, Highlight, OL, P, UL } from "@/components/topic/prose";
import { InterviewQuestions } from "@/components/topic/interview-questions";

export default function ScopeClosuresTopic() {
  return (
    <div>
      <P>
        Scope determines where variables are accessible in your code. Closures are one of JavaScript&apos;s most powerful features: a function that <Highlight>remembers and retains access to its lexical outer scope</Highlight> even after the outer function has finished executing!
      </P>

      <ScopeClosurePlayground />

      <H2>1. The Three Levels of Scope</H2>
      <UL>
        <li>
          <strong>Global Scope:</strong> Variables declared outside any function or block are accessible from anywhere in the file.
        </li>
        <li>
          <strong>Function Scope:</strong> Variables declared with <Code>var</Code>, <Code>let</Code>, or <Code>const</Code> inside a function are accessible only within that function.
        </li>
        <li>
          <strong>Block Scope:</strong> Variables declared with <Code>let</Code> and <Code>const</Code> inside curly braces <Code>&#123;...&#125;</Code> (e.g. inside an <Code>if</Code> or <Code>for</Code> loop) cannot be accessed outside that block.
        </li>
      </UL>

      <CodeBlock
        lang="javascript"
        title="block scope vs function scope"
        code={`if (true) {
  let blockScoped = "I am safe in block";
  var functionScoped = "I leak outside block!";
}

// console.log(blockScoped); // ❌ ReferenceError!
console.log(functionScoped);   // ✅ "I leak outside block!"`}
      />

      <H2>2. Closures — The Function &quot;Backpack&quot;</H2>
      <P>
        Whenever a function is created inside another function, the inner function creates a closure link to its parent scope environment. When returned, it carries this hidden environment like a persistent &quot;backpack&quot;.
      </P>

      <CodeBlock
        lang="javascript"
        title="classic closure example"
        code={`function createBankAcc(initialBalance) {
  let balance = initialBalance; // Encapsulated private state

  return {
    deposit(amount) { balance += amount; return balance; },
    getBalance() { return balance; }
  };
}

const myAccount = createBankAcc(100);
myAccount.deposit(50);
console.log(myAccount.getBalance()); // 150
// balance variable is completely private and secure!`}
      />

      <H3>Key Takeaways & Exercise</H3>
      <OL>
        <li>Lexical scope searches inside-out until it reaches global scope.</li>
        <li>Closures allow data privacy, encapsulation, and state retention without global variables.</li>
        <li>Test the closure backpack counter above to see private variable retention in action!</li>
      </OL>

      <InterviewQuestions questions={CLOSURE_QUESTIONS} />
    </div>
  );
}

const CLOSURE_QUESTIONS = [
  {
    question: "What is a Closure in JavaScript?",
    answer: "A Closure is a function bundled together with references to its surrounding state (lexical environment). A closure gives an inner function access to an outer function's variables even AFTER the outer function has finished executing and returned.",
    difficulty: "Basic" as const,
  },
  {
    question: "What is Lexical Scope / Scope Chain?",
    answer: "Lexical Scope means variable accessibility is determined by where variables and blocks are physically written in the code. The Scope Chain is the inside-out lookup process where the JS engine searches the current block scope, parent function scope, and global scope.",
    difficulty: "Basic" as const,
  },
  {
    question: "What are practical real-world use cases for Closures?",
    answer: "1. Data Privacy / Private Variables (emulating private class fields).\n2. Function Currying & Partial Application.\n3. Event Listeners retaining state between clicks.\n4. Performance memoization / caching wrappers.",
    difficulty: "Intermediate" as const,
  },
  {
    question: "Why does looping with var in setTimeout print the final index N times, and how does let or closures fix it?",
    answer: "Because 'var' is function-scoped (not block-scoped), all 'setTimeout' callbacks share the single hoisted variable reference. By the time timers fire, the loop has finished and index equals N. Using 'let' creates a new binding for each iteration, while an IIFE closure creates a private scope per iteration.",
    difficulty: "Intermediate" as const,
  },
  {
    question: "What are memory leak risks associated with Closures?",
    answer: "Because closures keep references to variables in their outer lexical scope alive in memory, holding onto a closure for a long time (e.g. unremoved global event listeners) prevents the Garbage Collector from freeing those unneeded outer variables.",
    difficulty: "Advanced" as const,
  },
  {
    question: "What is the Module Pattern in JavaScript?",
    answer: "The Module Pattern uses an IIFE closure to encapsulate private variables and helper methods, returning a public API object containing only the methods exposed to the caller.",
    difficulty: "Intermediate" as const,
  },
  {
    question: "How does the JavaScript Garbage Collector know when to clear variables?",
    answer: "JavaScript uses Mark-and-Sweep garbage collection. If a variable is no longer reachable from the root execution contexts, it is marked for memory deallocation. Variables referenced inside active closures remain reachable and are NOT garbage collected.",
    difficulty: "Advanced" as const,
  },
  {
    question: "What is Block Scope vs Function Scope vs Global Scope?",
    answer: "- Global Scope: Variables declared outside any function/block, accessible everywhere.\n- Function Scope ('var'): Variables accessible anywhere within the declaring function.\n- Block Scope ('let'/'const'): Variables accessible strictly inside the nearest pair of curly braces {}.",
    difficulty: "Basic" as const,
  },
  {
    question: "Can an inner function modify a variable in its outer closure scope?",
    answer: "YES! Closures capture references to variables, not static snapshots of values. Modifying a closed-over variable inside an inner function mutates the variable in the outer scope.",
    difficulty: "Basic" as const,
  },
  {
    question: "How do ES6 Class private fields (#field) relate to Closure private variables?",
    answer: "Closure private variables hide state inside a function scope. ES6 private fields (#privateField) provide native language-level encapsulation inside class instances, throwing a SyntaxError if accessed externally.",
    difficulty: "Advanced" as const,
  },
];
