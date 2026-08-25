import { CodeBlock } from "@/components/topic/code-block";
import { FetchApiPlayground } from "@/components/topic/js-playgrounds";
import { Callout, Code, H2, H3, Highlight, OL, P, UL } from "@/components/topic/prose";
import { InterviewQuestions } from "@/components/topic/interview-questions";

export default function FetchApiRestApisTopic() {
  return (
    <div>
      <P>
        Web applications communicate with backend servers over HTTP using REST (Representational State Transfer) APIs. The native browser <Code>Fetch API</Code> allows you to make HTTP requests (GET, POST, PUT, DELETE) to fetch or send JSON data.
      </P>

      <FetchApiPlayground />

      <H2>1. Standard HTTP Verbs in REST</H2>
      <UL>
        <li><Code>GET</Code> — Retrieve data from the server (e.g. fetching a user profile).</li>
        <li><Code>POST</Code> — Create a new resource on the server (e.g. submitting a signup form).</li>
        <li><Code>PUT / PATCH</Code> — Update an existing resource.</li>
        <li><Code>DELETE</Code> — Remove a resource from the server database.</li>
      </UL>

      <H2>2. Making GET Requests</H2>
      <CodeBlock
        lang="javascript"
        title="fetching json data"
        code={`async function getProduct() {
  const response = await fetch("https://api.example.com/products/1");

  // Check HTTP response status:
  if (!response.ok) {
    throw new Error(\`HTTP Error! Status: \${response.status}\`);
  }

  // Parse JSON response stream into JS Object:
  const product = await response.json();
  return product;
}`}
      />

      <H2>3. Making POST Requests with Headers &amp; Body</H2>
      <CodeBlock
        lang="javascript"
        title="sending json data with fetch"
        code={`async function createNewPost(postData) {
  const response = await fetch("https://api.example.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer TOKEN_HERE"
    },
    body: JSON.stringify(postData) // Convert object to JSON string!
  });

  return await response.json();
}`}
      />

      <H3>Key Takeaways & Exercise</H3>
      <OL>
        <li><Code>fetch()</Code> returns a Promise resolving to a <Code>Response</Code> stream.</li>
        <li>Remember to call <Code>await response.json()</Code> to parse the body.</li>
        <li>Click the fetch button in the console playground above to inspect live HTTP API responses!</li>
      </OL>

      <InterviewQuestions questions={FETCH_QUESTIONS} />
    </div>
  );
}

const FETCH_QUESTIONS = [
  {
    question: "Why does fetch() NOT reject on HTTP 404 or 500 status codes?",
    answer: "The 'fetch()' Promise rejects ONLY on network failures or blocked requests (e.g. offline, CORS error, invalid domain). For HTTP 404 or 500 error responses, the Promise FULFILLS successfully. Developers MUST check 'if (!response.ok)' (status 200-299) to handle HTTP errors.",
    difficulty: "Basic" as const,
  },
  {
    question: "What are the primary HTTP verbs/methods in REST API design?",
    answer: "- GET: Retrieves data without side effects.\n- POST: Submits new data to create a resource.\n- PUT: Replaces an entire target resource with a new representation.\n- PATCH: Partially updates specific fields of a resource.\n- DELETE: Removes a specified resource.",
    difficulty: "Basic" as const,
  },
  {
    question: "What is CORS (Cross-Origin Resource Sharing) and why do CORS errors occur?",
    answer: "CORS is a browser security mechanism enforced via HTTP headers. It blocks web pages from making API requests to a different domain/origin unless the target server explicitly responds with the header 'Access-Control-Allow-Origin: *'.",
    difficulty: "Intermediate" as const,
  },
  {
    question: "How do you cancel an ongoing fetch request in JavaScript?",
    answer: "Use an 'AbortController':\n'const controller = new AbortController();'\n'fetch(url, { signal: controller.signal });'\n'controller.abort(); // Cancels the HTTP request immediately'.",
    difficulty: "Intermediate" as const,
  },
  {
    question: "What is the difference between Axios and the native Fetch API?",
    answer: "- Fetch API: Built into browsers; requires 2-step handling (fetch + response.json()); does not throw on HTTP 400/500; requires AbortController for timeouts.\n- Axios: Third-party library; automatically parses JSON; automatically rejects on HTTP 400/500; native timeout support and request/response interceptors.",
    difficulty: "Basic" as const,
  },
  {
    question: "What is a Preflight Request (OPTIONS) in CORS?",
    answer: "A Preflight Request is an automatic HTTP OPTIONS request sent by the browser before the real request whenever a non-simple HTTP method (PUT, DELETE) or custom HTTP header (Authorization) is used, verifying permission from the server.",
    difficulty: "Advanced" as const,
  },
  {
    question: "Why must response.json() be awaited in Fetch API?",
    answer: "The 'fetch()' call resolves as soon as the HTTP headers are received. The response body comes in as a readable stream. Calling 'response.json()' returns a SECOND Promise that reads and parses the stream body to completion.",
    difficulty: "Intermediate" as const,
  },
  {
    question: "What is the difference between Path Parameters vs Query Parameters in REST APIs?",
    answer: "- Path Parameters (/users/42): Used to identify a SPECIFIC resource entity.\n- Query Parameters (/users?role=admin&sort=asc): Used to filter, sort, search, or paginate a collection of resources.",
    difficulty: "Basic" as const,
  },
  {
    question: "What are common HTTP status code ranges?",
    answer: "- 1xx: Informational\n- 2xx: Success (200 OK, 201 Created, 204 No Content)\n- 3xx: Redirection (301 Moved Permanently, 304 Not Modified)\n- 4xx: Client Errors (400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found)\n- 5xx: Server Errors (500 Internal Server Error, 503 Service Unavailable).",
    difficulty: "Basic" as const,
  },
  {
    question: "How do you set custom Authorization Bearer headers in fetch?",
    answer: "Pass a headers object inside fetch options: 'fetch(url, { headers: { \"Authorization\": \"Bearer token123\", \"Content-Type\": \"application/json\" } });'.",
    difficulty: "Basic" as const,
  },
];
