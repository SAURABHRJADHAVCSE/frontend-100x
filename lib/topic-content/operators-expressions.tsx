import { CodeBlock } from "@/components/topic/code-block";
import { OperatorPlayground } from "@/components/topic/js-playgrounds";
import { Callout, Code, H2, H3, Highlight, OL, P, UL } from "@/components/topic/prose";
import { InterviewQuestions } from "@/components/topic/interview-questions";

export default function OperatorsExpressionsTopic() {
  return (
    <div>
      <P>
        Operators are the symbols that tell JavaScript to perform specific mathematical, logical, or comparison operations on data operands. Expressions combine variables and operators to evaluate into a single value.
      </P>

      <OperatorPlayground />

      <H2>1. Arithmetic Operators</H2>
      <P>
        JavaScript supports standard mathematical operations:
      </P>
      <CodeBlock
        lang="javascript"
        title="arithmetic operations"
        code={`let sum = 10 + 5;        // 15
let difference = 10 - 5; // 5
let product = 10 * 5;    // 50
let quotient = 10 / 4;   // 2.5
let remainder = 10 % 3;  // 1 (Modulo operator)
let exponent = 2 ** 3;   // 8 (2 to the power of 3)`}
      />

      <H2>2. Strict (===) vs Loose (==) Equality</H2>
      <P>
        One of the most important concepts for JavaScript beginners is understanding equality operators:
      </P>
      <UL>
        <li>
          <Code>===</Code> (Strict Equality) — Checks both <Highlight>value and data type</Highlight> without converting types.
        </li>
        <li>
          <Code>==</Code> (Loose Equality) — Performs automatic implicit type coercion before comparing.
        </li>
      </UL>

      <Callout tone="warning">
        <Code>5 == &quot;5&quot;</Code> evaluates to <Code>true</Code> because JS converts the string to a number.
        <br />
        <Code>5 === &quot;5&quot;</Code> evaluates to <Code>false</Code> because number and string are different types! Always use <Code>===</Code> and <Code>!==</Code>.
      </Callout>

      <H2>3. Logical Operators &amp; Short-Circuiting</H2>
      <UL>
        <li><Code>&amp;&amp;</Code> (AND) — Returns true only if both operands are true.</li>
        <li><Code>||</Code> (OR) — Returns true if at least one operand is true.</li>
        <li><Code>!</Code> (NOT) — Inverts a boolean value (<Code>!true === false</Code>).</li>
        <li><Code>??</Code> (Nullish Coalescing) — Returns the right-hand operand only if the left-hand is <Code>null</Code> or <Code>undefined</Code>.</li>
      </UL>

      <CodeBlock
        lang="javascript"
        title="nullish coalescing vs OR"
        code={`let userCount = 0;
let displayCount1 = userCount || 10; // 10 (0 is falsy!)
let displayCount2 = userCount ?? 10; // 0 (0 is not nullish!)`}
      />

      <H3>Key Takeaways & Exercise</H3>
      <OL>
        <li>Never use loose equality (<Code>==</Code>); always enforce strict equality (<Code>===</Code>).</li>
        <li>Use <Code>??</Code> when dealing with numbers where <Code>0</Code> is a valid value.</li>
        <li>Test expression evaluations and coercion alerts in the tester playground above!</li>
      </OL>

      <InterviewQuestions questions={OPERATORS_JS_QUESTIONS} />
    </div>
  );
}

const OPERATORS_JS_QUESTIONS = [
  {
    question: "What is the difference between == (loose equality) and === (strict equality)?",
    answer: "- == (Loose Equality): Performs type coercion before comparing values (e.g., '5' == 5 returns true, 0 == false returns true).\n- === (Strict Equality): Compares both value AND data type without implicit coercion ('5' === 5 returns false). Always default to ===.",
    difficulty: "Basic" as const,
  },
  {
    question: "What is the difference between the || (Logical OR) and ?? (Nullish Coalescing) operators?",
    answer: "- || (Logical OR): Returns right operand if left operand is ANY FALSY value (false, 0, \"\", null, undefined, NaN).\n- ?? (Nullish Coalescing): Returns right operand ONLY if left operand is NULL or UNDEFINED (allowing 0 and \"\" to be treated as valid values).",
    difficulty: "Intermediate" as const,
  },
  {
    question: "What is Type Coercion in JavaScript?",
    answer: "Type Coercion is the automatic or implicit conversion of values from one data type to another by the JS engine during an operation (e.g. '5' + 2 evaluates to '52' via string concatenation, but '5' - 2 evaluates to 3 via numeric coercion).",
    difficulty: "Basic" as const,
  },
  {
    question: "What are the 6 Falsy values in JavaScript?",
    answer: "1. false\n2. 0 (and -0, 0n)\n3. \"\" (empty string)\n4. null\n5. undefined\n6. NaN",
    difficulty: "Basic" as const,
  },
  {
    question: "What does the Optional Chaining operator (?.) do?",
    answer: "'?. ' safely reads nested property values of an object without throwing a TypeError if an intermediate reference is null or undefined (e.g. 'user?.profile?.avatar' returns undefined instead of crashing).",
    difficulty: "Basic" as const,
  },
  {
    question: "What is Short-Circuit Evaluation in logical operators (&& and ||)?",
    answer: "Short-circuit evaluation stops evaluating expressions as soon as the result is guaranteed:\n- A && B: If A is falsy, stops and returns A immediately without evaluating B.\n- A || B: If A is truthy, stops and returns A immediately without evaluating B.",
    difficulty: "Intermediate" as const,
  },
  {
    question: "What is the unary + operator used for?",
    answer: "The unary plus operator ('+value') converts its operand into a Number (e.g. +'42' returns 42, +true returns 1). It is a clean shorthand for Number(val).",
    difficulty: "Basic" as const,
  },
  {
    question: "What is NaN and why does NaN === NaN return false?",
    answer: "NaN stands for 'Not-a-Number', representing an unrepresentable math result (e.g. 0 / 0 or 'abc' * 2). According to IEEE 754 float specs, NaN is unequal to everything, including itself. Use 'Number.isNaN(val)' to test for NaN.",
    difficulty: "Intermediate" as const,
  },
  {
    question: "What is the difference between prefix ++i and postfix i++?",
    answer: "- prefix ++i: Increments the variable first, then returns the updated value.\n- postfix i++: Returns the current original value first, then increments the variable.",
    difficulty: "Basic" as const,
  },
  {
    question: "How does the ternary operator (? :) work and when should it replace if/else?",
    answer: "The ternary operator ('condition ? exprIfTrue : exprIfFalse') is a compact inline expression for evaluating conditional assignments or React JSX rendering.",
    difficulty: "Basic" as const,
  },
];
