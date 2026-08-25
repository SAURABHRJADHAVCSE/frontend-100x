import { CodeBlock } from "@/components/topic/code-block";
import { ArrayMethodsPlayground } from "@/components/topic/js-playgrounds";
import { Callout, Code, H2, H3, Highlight, OL, P, UL } from "@/components/topic/prose";
import { InterviewQuestions } from "@/components/topic/interview-questions";

export default function ArraysArrayMethodsTopic() {
  return (
    <div>
      <P>
        Arrays are ordered lists used to store multiple items under a single variable name. Modern JavaScript heavily relies on functional array methods like <Code>map</Code>, <Code>filter</Code>, and <Code>reduce</Code> to transform data pipelines immutably.
      </P>

      <ArrayMethodsPlayground />

      <H2>1. Essential Array Operations</H2>
      <CodeBlock
        lang="javascript"
        title="array basics"
        code={`const fruits = ["Apple", "Banana", "Cherry"];

fruits.push("Date");       // Add to end
fruits.pop();              // Remove from end
console.log(fruits[0]);    // "Apple" (0-indexed)
console.log(fruits.length);// 3`}
      />

      <H2>2. Iterating &amp; Transforming (forEach vs map)</H2>
      <UL>
        <li><Code>.forEach()</Code> — Runs a callback for each item (returns nothing; used for side effects).</li>
        <li><Code>.map()</Code> — Transforms each item and <Highlight>returns a brand new array</Highlight> of equal length!</li>
      </UL>

      <CodeBlock
        lang="javascript"
        title="using map & filter"
        code={`const prices = [10, 20, 30, 40];

// Double every price:
const doubled = prices.map(price => price * 2); // [20, 40, 60, 80]

// Filter items > 25:
const expensive = prices.filter(price => price > 25); // [30, 40]`}
      />

      <H2>3. Aggregating with reduce</H2>
      <P>
        <Code>.reduce()</Code> processes an array and boils it down into a single summary value (e.g. calculating total cart price):
      </P>

      <CodeBlock
        lang="javascript"
        title="reducing array to sum"
        code={`const cartPrices = [29.99, 9.99, 49.99];

const totalCost = cartPrices.reduce((accumulator, price) => {
  return accumulator + price;
}, 0); // 0 is initial accumulator value

console.log(totalCost); // 89.97`}
      />

      <H3>Key Takeaways & Exercise</H3>
      <OL>
        <li>Use <Code>.map()</Code> when rendering dynamic HTML lists or React components.</li>
        <li>Use <Code>.filter()</Code> for search inputs or removing items from state.</li>
        <li>Adjust the filter slider in the pipeline visualizer playground above to watch array transformations in real-time!</li>
      </OL>

      <InterviewQuestions questions={ARRAY_QUESTIONS} />
    </div>
  );
}

const ARRAY_QUESTIONS = [
  {
    question: "What is the difference between map(), forEach(), and filter()?",
    answer: "- map(): Transforms each item and returns a NEW array of equal length without mutating original array.\n- filter(): Evaluates a condition for each item and returns a NEW array containing only items that returned true.\n- forEach(): Executes a side-effect callback for each item; returns 'undefined' and cannot be chained.",
    difficulty: "Basic" as const,
  },
  {
    question: "How does Array.prototype.reduce() work?",
    answer: "'reduce((accumulator, currentValue) => ..., initialValue)' iterates over array elements, carrying forward an accumulator calculation to boil the array down to a single value (e.g. sum, object dictionary, or flattened array).",
    difficulty: "Intermediate" as const,
  },
  {
    question: "What is the difference between mutating and non-mutating array methods?",
    answer: "- Mutating (modifies original array in place): push(), pop(), shift(), unshift(), splice(), sort(), reverse().\n- Non-Mutating (returns new array/value): map(), filter(), slice(), concat(), reduce(), find(), flat(). Always use non-mutating methods in React state updates.",
    difficulty: "Basic" as const,
  },
  {
    question: "What is the difference between find() and filter()?",
    answer: "- find(): Returns the FIRST matching element itself (or undefined if not found), stopping iteration immediately.\n- filter(): Evaluates ALL elements and returns an ARRAY of all matching items (or empty array [] if none match).",
    difficulty: "Basic" as const,
  },
  {
    question: "What is the difference between slice() and splice()?",
    answer: "- slice(start, end): Non-mutating method that copies a section of an array into a new array.\n- splice(start, deleteCount, ...items): Mutating method that removes, replaces, or inserts new elements into the original array.",
    difficulty: "Intermediate" as const,
  },
  {
    question: "What are modern immutable array methods toSorted(), toReversed(), and toSpliced()?",
    answer: "Introduced in ES2023, these methods perform sort, reverse, or splice operations by returning a BRAND NEW array copy without mutating the original array.",
    difficulty: "Advanced" as const,
  },
  {
    question: "What is the difference between Array.from() and Array.of()?",
    answer: "- Array.from(): Converts array-like or iterable objects (NodeList, Arguments, Set) into a real Array.\n- Array.of(1, 2, 3): Creates a new Array from variable arguments (avoiding single-numeric-argument array constructor pitfalls).",
    difficulty: "Intermediate" as const,
  },
  {
    question: "How do flat() and flatMap() work?",
    answer: "- flat(depth): Flattens nested sub-array structures up to specified depth.\n- flatMap(): Maps each item using a mapping function and then flattens the result by 1 level in a single efficient pass.",
    difficulty: "Intermediate" as const,
  },
  {
    question: "What is the difference between includes() and indexOf()?",
    answer: "- includes(val): Returns boolean true/false, cleanly handling NaN checks.\n- indexOf(val): Returns the numeric index position of the item, or -1 if not found.",
    difficulty: "Basic" as const,
  },
  {
    question: "What is the difference between some() and every()?",
    answer: "- some(predicate): Returns true if AT LEAST ONE element satisfies the condition.\n- every(predicate): Returns true ONLY IF ALL elements satisfy the condition.",
    difficulty: "Basic" as const,
  },
];
