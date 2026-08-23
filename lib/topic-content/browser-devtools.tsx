import { CodeBlock } from "@/components/topic/code-block";
import { StepFlowDiagram } from "@/components/topic/diagrams";
import { DevtoolsInspectorPlayground } from "@/components/topic/phase0-playgrounds";
import { Callout, Code, H2, H3, Highlight, OL, P, UL } from "@/components/topic/prose";

export default function BrowserDevtools() {
  return (
    <div>
      <P>
        Every browser ships with a full X-ray machine for the web, built right in and free: DevTools. It lets you
        inspect and edit any page&apos;s HTML and CSS live, run JavaScript directly against the page, watch every
        network request happen in real time, and step through your code line by line — all without installing
        anything. Open it right now with <Code>F12</Code>, <Code>Ctrl+Shift+I</Code>, or by right-clicking anything
        on a page and choosing &quot;Inspect&quot;.
      </P>

      <DevtoolsInspectorPlayground />

      <H2>1. The panels, at a glance</H2>
      <StepFlowDiagram
        caption="Each panel is a different lens on the exact same running page."
        steps={[
          { label: "Elements", sub: "HTML & CSS, live" },
          { label: "Console", sub: "run JS, see logs" },
          { label: "Network", sub: "every request" },
          { label: "Sources", sub: "debug JS" },
          { label: "Application", sub: "storage & cache" },
        ]}
      />

      <H2>2. Elements — inspecting and editing the live DOM</H2>
      <P>
        The <Code>Elements</Code> panel shows the page&apos;s HTML exactly as the browser currently sees it — which
        can differ from &quot;view source&quot;, since JavaScript may have modified it after the page loaded. Click
        any element to select it, edit its text or attributes directly, and see every CSS rule affecting it on the
        right, including which ones are being overridden and struck through.
      </P>
      <Callout>
        <Highlight>
          Anything you change here only affects your own browser, temporarily — refresh the page and it&apos;s gone.
        </Highlight>{" "}
        This makes it a completely safe place to experiment with layout and styling ideas before writing the real
        code.
      </Callout>
      <P>
        The <Code>Computed</Code> tab (next to Styles) shows the exact box model for the selected element — margin,
        border, padding, and content size, visualized as nested boxes with real pixel values — the fastest way to
        answer &quot;why is there a gap here?&quot;.
      </P>

      <H2>3. Console — a live JavaScript playground</H2>
      <P>
        The <Code>Console</Code> does two things: it shows messages your code logs, and it&apos;s a fully working
        JavaScript interpreter running in the context of the current page — meaning you can call the page&apos;s own
        functions and inspect its own variables directly.
      </P>
      <CodeBlock
        lang="js"
        title="things worth knowing in the console"
        code={`console.log("basic message");\nconsole.warn("shows as a yellow warning");\nconsole.error("shows as a red error, with a stack trace");\nconsole.table([{ id: 1, name: "Alex" }, { id: 2, name: "Sam" }]); // renders as an actual table\n\n$0            // references whatever element is currently selected in the Elements panel\ncopy(someVar) // copies a value straight to your clipboard`}
      />

      <H2>4. Network — every request, timed</H2>
      <P>
        This panel is the direct, visual continuation of the request/response cycle from &quot;How the internet
        works&quot;: every HTML file, script, stylesheet, image, and API call the page makes shows up here as its own
        row, with its status code, size, and a timing breakdown showing exactly how long DNS, connecting, waiting for
        the server, and downloading each took.
      </P>
      <UL>
        <li>
          A red row usually means a <Code>4xx</Code> or <Code>5xx</Code> status code — something failed.
        </li>
        <li>
          Click any request to see its full headers, the exact payload sent, and the raw response — this is how you
          debug &quot;why isn&apos;t my API call working?&quot; with certainty instead of guessing.
        </li>
        <li>
          The <Code>Throttling</Code> dropdown simulates a slow 3G connection, so you can feel how your site performs
          for users without fast wifi.
        </li>
      </UL>

      <H2>5. Sources — stepping through your code</H2>
      <P>
        The <Code>Sources</Code> panel is a full debugger for your JavaScript. Click any line number to set a{" "}
        <Code>breakpoint</Code>; when execution reaches that line, the entire page freezes and you can inspect every
        variable&apos;s current value, step through the code one line at a time, and watch exactly how control flows
        through your functions — dramatically faster than sprinkling <Code>console.log</Code> everywhere and
        re-running the page.
      </P>
      <CodeBlock
        lang="js"
        title="or trigger a breakpoint from your own code"
        code={`function calculateTotal(items) {\n  debugger; // execution pauses here automatically if DevTools is open\n  return items.reduce((sum, item) => sum + item.price, 0);\n}`}
      />

      <H2>6. Application — everything the browser stored</H2>
      <P>
        The <Code>Application</Code> panel lets you browse and edit <Code>localStorage</Code>,{" "}
        <Code>sessionStorage</Code>, cookies, and cached files for the current site directly — invaluable for
        debugging &quot;why won&apos;t this stay logged in&quot; or &quot;why is stale data showing up&quot; issues.
      </P>

      <H2>7. Performance & Lighthouse — measuring, not guessing</H2>
      <P>
        The <Code>Performance</Code> panel records everything the browser does while loading or interacting with a
        page — JavaScript execution, layout, and painting — as a timeline you can zoom into to find exactly what&apos;s
        slow. The built-in <Code>Lighthouse</Code> tab runs an automated audit and scores the page on performance,
        accessibility, best practices, and SEO, with specific, actionable fixes for each issue it finds.
      </P>

      <H2>8. The device toolbar — testing responsive design</H2>
      <P>
        <Code>Ctrl+Shift+M</Code> toggles device emulation: the page renders at a simulated phone or tablet size, and
        DevTools even simulates touch input — the fastest way to check a responsive layout without needing a second
        physical device.
      </P>

      <H3>Try it yourself</H3>
      <OL>
        <li>Open DevTools on any website, click the Elements panel, and edit some text directly on the page.</li>
        <li>
          Switch to the Network tab, reload the page, and click the very first request to see its full response
          headers.
        </li>
        <li>
          Open the Console and run <Code>document.querySelectorAll(&quot;a&quot;).length</Code> to count every link
          on the page.
        </li>
      </OL>
    </div>
  );
}
