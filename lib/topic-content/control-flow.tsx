import { CodeBlock } from "@/components/topic/code-block";
import { ControlFlowPlayground } from "@/components/topic/js-playgrounds";
import { Callout, Code, H2, H3, Highlight, OL, P, UL } from "@/components/topic/prose";
import { InterviewQuestions } from "@/components/topic/interview-questions";

export default function ControlFlowTopic() {
  return (
    <div>
      <P>
        Control flow dictates the order in which individual statements and instructions execute in a computer program. By using conditional statements and loops, your code can make decisions and repeat tasks dynamically.
      </P>

      <ControlFlowPlayground />

      <H2>1. Conditional Statements (if, else if, else)</H2>
      <P>
        Conditionals execute specific code blocks based on whether an expression evaluates to <Code>true</Code> or <Code>false</Code>.
      </P>

      <CodeBlock
        lang="javascript"
        title="conditional branching"
        code={`const temperature = 28;

if (temperature > 30) {
  console.log("It's a hot day!");
} else if (temperature >= 20) {
  console.log("Nice and pleasant weather.");
} else {
  console.log("Bundle up, it's cold!");
}`}
      />

      <H2>2. Switch Statements</H2>
      <P>
        When comparing a single variable against multiple exact match values, a <Code>switch</Code> statement provides a cleaner structure:
      </P>

      <CodeBlock
        lang="javascript"
        title="switch statement"
        code={`const userRole = "admin";

switch (userRole) {
  case "admin":
    console.log("Full system access granted.");
    break;
  case "editor":
    console.log("Can edit and publish content.");
    break;
  default:
    console.log("Standard view-only access.");
}`}
      />

      <H2>3. Loops (for, while, for...of)</H2>
      <P>
        Loops execute a block of code repeatedly while a specified condition remains true:
      </P>

      <CodeBlock
        lang="javascript"
        title="javascript loops"
        code={`// Standard counting for loop
for (let i = 0; i < 5; i++) {
  console.log(\`Iteration \${i}\`);
}

// Modern for...of loop over an array
const colors = ["Red", "Green", "Blue"];
for (const color of colors) {
  console.log(\`Color: \${color}\`);
}`}
      />

      <H3>Key Takeaways & Exercise</H3>
      <OL>
        <li>Control flow directs execution based on runtime conditions.</li>
        <li>Always include <Code>break</Code> in switch cases to prevent accidental fallthrough.</li>
        <li>Use <Code>for...of</Code> loops when iterating cleanly over arrays.</li>
      </OL>

      <InterviewQuestions questions={CONTROL_FLOW_QUESTIONS} />
    </div>
  );
}

const CONTROL_FLOW_QUESTIONS = [
  {
    question: "What is the difference between for...of and for...in loops in JavaScript?",
    answer: "- for...of: Iterates over the VALUES of an iterable object (Arrays, Strings, Sets, Maps).\n- for...in: Iterates over the enumerable PROPERTY KEYS / keys of an Object (or array indices).",
    difficulty: "Basic" as const,
  },
  {
    question: "What happens if you omit the break statement in a switch case?",
    answer: "Omitting 'break' causes Case Fallthrough — execution continues executing subsequent case blocks regardless of whether their case expressions match, until a break or return is encountered.",
    difficulty: "Basic" as const,
  },
  {
    question: "What is the difference between break and continue in loops?",
    answer: "- break: Immediately terminates the entire loop and jumps execution out of the loop body.\n- continue: Skips the rest of the current iteration and jumps directly to the next iteration of the loop.",
    difficulty: "Basic" as const,
  },
  {
    question: "What is the difference between while and do...while loops?",
    answer: "- while: Checks the condition BEFORE executing the loop body (may execute 0 times if condition is false).\n- do...while: Executes the loop body FIRST, then checks the condition (ALWAYS executes at least once).",
    difficulty: "Basic" as const,
  },
  {
    question: "How do Labeled Statements work with break and continue in nested loops?",
    answer: "A label identifier ('outerLoop: for (...)') prefixing a loop allows a 'break outerLoop;' or 'continue outerLoop;' command inside a nested loop to target and break out of the top-level parent loop.",
    difficulty: "Advanced" as const,
  },
  {
    question: "Why is for...in not recommended for iterating over arrays?",
    answer: "'for...in' iterates over object keys in arbitrary order (including custom array properties/methods added to Array.prototype) and returns indices as Strings ('0', '1') rather than Numbers, leading to bugs.",
    difficulty: "Intermediate" as const,
  },
  {
    question: "How does JavaScript evaluate truthy and falsy values in if conditions?",
    answer: "The JS engine automatically coerces the condition expression to a Boolean. Any value that is not one of the 6 falsy values (false, 0, \"\", null, undefined, NaN) evaluates to true.",
    difficulty: "Basic" as const,
  },
  {
    question: "What is a guard clause pattern in control flow?",
    answer: "A guard clause is an early return statement at the beginning of a function ('if (!user) return;') that handles edge cases and exits early, avoiding deeply nested if-else blocks.",
    difficulty: "Intermediate" as const,
  },
  {
    question: "Can switch statements evaluate expressions or strict type equality?",
    answer: "YES. Switch statements use strict equality (===) when matching case values against the switch expression. 'switch(true)' can also be used to evaluate complex range conditions in cases.",
    difficulty: "Intermediate" as const,
  },
  {
    question: "What is an infinite loop and how can it crash the browser thread?",
    answer: "An infinite loop occurs when a loop condition never evaluates to false (e.g. 'while (true)'). Because JavaScript is single-threaded, an infinite loop blocks the main event loop thread indefinitely, causing the page to freeze.",
    difficulty: "Basic" as const,
  },
];
