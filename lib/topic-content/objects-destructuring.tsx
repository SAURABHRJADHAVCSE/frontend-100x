import { CodeBlock } from "@/components/topic/code-block";
import { ObjectDestructuringPlayground } from "@/components/topic/js-playgrounds";
import { Callout, Code, H2, H3, Highlight, OL, P, UL } from "@/components/topic/prose";
import { InterviewQuestions } from "@/components/topic/interview-questions";

export default function ObjectsDestructuringTopic() {
  return (
    <div>
      <P>
        Objects are collections of key-value pairs used to store structured data and complex entities. Destructuring provides a clean, modern syntax to extract values directly out of objects and arrays into standalone variables.
      </P>

      <ObjectDestructuringPlayground />

      <H2>1. Object Literals &amp; Property Access</H2>
      <CodeBlock
        lang="javascript"
        title="object syntax"
        code={`const user = {
  id: 101,
  username: "alex99",
  isVerified: true,
  address: { city: "Mumbai", zip: "400001" }
};

// Dot notation:
console.log(user.username); // "alex99"

// Bracket notation (useful for dynamic keys):
const key = "isVerified";
console.log(user[key]);     // true`}
      />

      <H2>2. Object Destructuring</H2>
      <P>
        Instead of typing <Code>const name = user.name;</Code> and <Code>const city = user.address.city;</Code>, destructuring lets you unpack properties in a single line:
      </P>

      <CodeBlock
        lang="javascript"
        title="clean destructuring"
        code={`// Unpack properties directly:
const { username, isVerified } = user;

// Rename during destructuring:
const { id: userId } = user;

// Nested destructuring:
const { address: { city } } = user;
console.log(city); // "Mumbai"`}
      />

      <H2>3. Array Destructuring</H2>
      <CodeBlock
        lang="javascript"
        title="unpacking arrays"
        code={`const coords = [19.076, 72.877];
const [latitude, longitude] = coords;

console.log(latitude);  // 19.076
console.log(longitude); // 72.877`}
      />

      <H3>Key Takeaways & Exercise</H3>
      <OL>
        <li>Destructuring dramatically cleans up component props and API response handling.</li>
        <li>Use bracket notation when property names contain spaces or are stored in variables.</li>
        <li>Try editing name and role fields in the unpacker playground above to see live destructuring variable updates!</li>
      </OL>

      <InterviewQuestions questions={OBJECTS_QUESTIONS} />
    </div>
  );
}

const OBJECTS_QUESTIONS = [
  {
    question: "What is Object and Array Destructuring in ES6?",
    answer: "Destructuring is a syntax feature that allows unpacking values from arrays or properties from objects directly into distinct declared variables in a single expression (e.g. 'const { name, age } = user;').",
    difficulty: "Basic" as const,
  },
  {
    question: "How do you rename variables during Object Destructuring?",
    answer: "Use the colon ':' syntax: 'const { originalName: newName } = object;' (e.g., 'const { first_name: firstName } = user;').",
    difficulty: "Basic" as const,
  },
  {
    question: "How do default values work in destructuring?",
    answer: "Assign defaults using '=': 'const { role = \"Guest\" } = user;'. The default value is used ONLY if the property key is missing or explicitly undefined (NOT if it is null or false).",
    difficulty: "Basic" as const,
  },
  {
    question: "What is the difference between Shallow Copy and Deep Copy of an Object?",
    answer: "- Shallow Copy ({ ...obj } or Object.assign({}, obj)): Copies top-level primitive properties, BUT nested object properties still share the SAME memory reference.\n- Deep Copy (structuredClone(obj) or JSON.parse(JSON.stringify(obj))): Recursively duplicates all nested objects/arrays creating a 100% independent memory hierarchy.",
    difficulty: "Intermediate" as const,
  },
  {
    question: "What is the native structuredClone() API in modern JavaScript?",
    answer: "'structuredClone(object)' is a native browser API for creating deep clones of complex objects (handling circular references, Dates, Sets, Maps, and ArrayBuffers) without needing Lodash or JSON hacks.",
    difficulty: "Intermediate" as const,
  },
  {
    question: "What are Object.keys(), Object.values(), and Object.entries()?",
    answer: "- Object.keys(obj): Returns an array of enumerable property names (strings).\n- Object.values(obj): Returns an array of property values.\n- Object.entries(obj): Returns an array of [key, value] pairs.",
    difficulty: "Basic" as const,
  },
  {
    question: "What is the difference between Dot Notation vs Bracket Notation for object property access?",
    answer: "- Dot Notation (obj.key): Clean, but requires static identifier syntax.\n- Bracket Notation (obj[expression]): Allows dynamic property access using variables, dynamic strings, or keys with spaces ('user[\"first-name\"]').",
    difficulty: "Basic" as const,
  },
  {
    question: "How does Object.freeze() differ from Object.seal()?",
    answer: "- Object.freeze(obj): Prevents adding, deleting, or modifying existing property values (fully immutable top-level).\n- Object.seal(obj): Prevents adding or deleting properties, BUT permits modifying values of existing properties.",
    difficulty: "Advanced" as const,
  },
  {
    question: "How does property shorthand syntax work in ES6 object literals?",
    answer: "If the property key name matches the variable name in scope, you can omit the value: 'const name = \"Alice\"; const user = { name };' (shorthand for '{ name: name }').",
    difficulty: "Basic" as const,
  },
  {
    question: "What is Object.hasOwn() vs Object.prototype.hasOwnProperty()?",
    answer: "'Object.hasOwn(obj, 'prop')' is the modern ES2022 replacement for 'hasOwnProperty'. It safely checks if a property exists directly on an object without failing on null-prototype objects created via 'Object.create(null)'.",
    difficulty: "Advanced" as const,
  },
];
