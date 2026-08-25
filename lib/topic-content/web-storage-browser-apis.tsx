import { CodeBlock } from "@/components/topic/code-block";
import { WebStoragePlayground } from "@/components/topic/js-playgrounds";
import { Callout, Code, H2, H3, Highlight, OL, P, UL } from "@/components/topic/prose";
import { InterviewQuestions } from "@/components/topic/interview-questions";

export default function WebStorageBrowserApisTopic() {
  return (
    <div>
      <P>
        Browsers provide powerful built-in Web Storage APIs allowing web applications to persist data key-value pairs directly in the user&apos;s browser memory — even across page refreshes and browser restarts!
      </P>

      <WebStoragePlayground />

      <H2>1. LocalStorage vs SessionStorage</H2>
      <UL>
        <li>
          <Code>localStorage</Code> — Data persists permanently until explicitly cleared by the user or code (survives tab and browser restarts).
        </li>
        <li>
          <Code>sessionStorage</Code> — Data persists only for the duration of the current tab session (erased when tab is closed).
        </li>
      </UL>

      <H2>2. The Storage API Methods</H2>
      <CodeBlock
        lang="javascript"
        title="localstorage methods"
        code={`// 1. Store item (keys and values are ALWAYS strings!)
localStorage.setItem("userTheme", "dark");

// 2. Retrieve item (returns string or null if missing)
const theme = localStorage.getItem("userTheme");

// 3. Remove single item
localStorage.removeItem("userTheme");

// 4. Clear all storage
localStorage.clear();`}
      />

      <H2>3. Storing Objects with JSON Serialization</H2>
      <P>
        Because Web Storage only stores strings, you must use <Code>JSON.stringify()</Code> when saving objects and <Code>JSON.parse()</Code> when retrieving them:
      </P>

      <CodeBlock
        lang="javascript"
        title="saving objects in storage"
        code={`const settings = { theme: "dark", fontSize: 16 };

// Save:
localStorage.setItem("appSettings", JSON.stringify(settings));

// Load:
const savedRaw = localStorage.getItem("appSettings");
const parsedSettings = savedRaw ? JSON.parse(savedRaw) : null;`}
      />

      <H3>Key Takeaways & Exercise</H3>
      <OL>
        <li>Use <Code>localStorage</Code> for persistent preferences like dark mode or auth tokens.</li>
        <li>Always serialize objects with <Code>JSON.stringify</Code> before saving.</li>
        <li>Test saving and removing persistent key-value entries in the storage inspector playground above!</li>
      </OL>

      <InterviewQuestions questions={STORAGE_QUESTIONS} />
    </div>
  );
}

const STORAGE_QUESTIONS = [
  {
    question: "What is the difference between localStorage, sessionStorage, and Cookies?",
    answer: "- localStorage: Persists data indefinitely until explicitly cleared (5MB limit, origin-isolated, purely client-side).\n- sessionStorage: Persists data ONLY for the duration of the current tab/session (5MB limit, cleared when tab closes).\n- Cookies: Sent automatically to the server on every HTTP request (4KB limit, supports HttpOnly and Secure flags for sensitive auth tokens).",
    difficulty: "Basic" as const,
  },
  {
    question: "Why can storing sensitive Auth Tokens (JWT) in localStorage be dangerous?",
    answer: "Data stored in 'localStorage' is vulnerable to Cross-Site Scripting (XSS). If an attacker successfully executes malicious JS in your app, they can read 'localStorage.getItem(\"jwt\")' and steal user sessions. Storing tokens in 'HttpOnly' cookies prevents JS access.",
    difficulty: "Intermediate" as const,
  },
  {
    question: "Why must objects/arrays be serialized with JSON.stringify() before saving to Web Storage?",
    answer: "Web Storage (localStorage/sessionStorage) can ONLY store plain text Strings. Saving an object directly ('localStorage.setItem(\"user\", obj)') implicitly coerces it to the string '[object Object]', destroying data. Use 'JSON.stringify(obj)' to save and 'JSON.parse(str)' to load.",
    difficulty: "Basic" as const,
  },
  {
    question: "What is IndexedDB and when should it be used instead of localStorage?",
    answer: "IndexedDB is a low-level, high-capacity, asynchronous transactional database built into browsers. Use IndexedDB for storing large structured datasets, files/blobs, or offline-first PWA caching where localStorage's synchronous 5MB limit is insufficient.",
    difficulty: "Intermediate" as const,
  },
  {
    question: "What is the storage event in JavaScript?",
    answer: "The 'storage' event fires on the 'window' object when a 'localStorage' entry is modified or cleared in ANOTHER browser tab or window belonging to the exact same origin, enabling real-time cross-tab synchronization.",
    difficulty: "Intermediate" as const,
  },
  {
    question: "What happens if a user's localStorage quota (5MB) is exceeded?",
    answer: "Attempting to call 'localStorage.setItem()' when the storage capacity limit is exceeded throws a 'DOMException: QuotaExceededError' exception.",
    difficulty: "Basic" as const,
  },
  {
    question: "What is the Geolocation API in Web Browsers?",
    answer: "The Geolocation API ('navigator.geolocation.getCurrentPosition(success, error)') requests user permission to access physical GPS/location coordinates (latitude, longitude) of the device.",
    difficulty: "Basic" as const,
  },
  {
    question: "What is the Notification API and Permission model?",
    answer: "The Notification API ('new Notification(\"Title\", { body: \"Message\" })') allows web applications to display system-level desktop/mobile notifications after requesting permission via 'Notification.requestPermission()'.",
    difficulty: "Intermediate" as const,
  },
  {
    question: "What is the Cache Storage API?",
    answer: "The Cache Storage API ('caches.open(\"v1\")') provides a storage mechanism for HTTP request/response pairs, used extensively by Service Workers for offline PWA asset caching.",
    difficulty: "Advanced" as const,
  },
  {
    question: "Are Web Storage APIs synchronous or asynchronous?",
    answer: "'localStorage' and 'sessionStorage' operations are SYNCHRONOUS. Reading or writing massive amounts of data blocks the main JavaScript UI rendering thread. IndexedDB and Cache API operations are fully ASYNCHRONOUS.",
    difficulty: "Intermediate" as const,
  },
];
