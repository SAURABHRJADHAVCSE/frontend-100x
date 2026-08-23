import { CodeBlock } from "@/components/topic/code-block";
import { StepFlowDiagram } from "@/components/topic/diagrams";
import { Callout, Code, H2, H3, Highlight, OL, P, UL } from "@/components/topic/prose";

export default function HtmlForms() {
  return (
    <div>
      <P>
        Every login screen, search box, checkout page, and comment box on the web is built from the same handful of
        form elements. Forms are how a webpage stops being read-only and starts collecting information back from a
        person — and a huge amount of that behavior (validation, keyboard navigation, accessibility) comes free from
        the browser if you use the real form elements instead of rebuilding them from styled divs.
      </P>

      <H2>1. The form element and how data actually leaves the page</H2>
      <CodeBlock
        lang="html"
        title="a minimal form"
        code={`<form action="/search" method="get">\n  <input type="text" name="q" />\n  <button type="submit">Search</button>\n</form>`}
      />
      <StepFlowDiagram
        caption="Every named input becomes a name=value pair, packaged and sent according to the form's method."
        steps={[
          { label: "Named inputs", sub: "name + value" },
          { label: "name=value pairs", sub: "collected on submit" },
          { label: "GET or POST", sub: "sent to action URL" },
        ]}
      />
      <UL>
        <li>
          <Code>action</Code> — the URL the data is sent to.
        </li>
        <li>
          <Code>method=&quot;get&quot;</Code> — appends the data to the URL as a query string (
          <Code>?q=hello</Code>). Visible, bookmarkable, and appropriate for searches and filters — never for
          passwords or anything sensitive, since it ends up in browser history and server logs in plain sight.
        </li>
        <li>
          <Code>method=&quot;post&quot;</Code> — sends the data in the request body, invisible in the URL. The
          correct choice for anything that creates, changes, or deletes data, or contains sensitive information.
        </li>
      </UL>
      <Callout tone="warning">
        <Highlight>
          Every field&apos;s name attribute is what actually gets sent — not its id, not its visible label text.
        </Highlight>{" "}
        Forgetting <Code>name</Code> on an input means it silently gets dropped from the submission entirely.
      </Callout>

      <H2>2. Input types — let the browser do the work</H2>
      <CodeBlock
        lang="html"
        title="specialized input types"
        code={`<input type="email" />     <!-- validates email format, shows an email keyboard on mobile -->\n<input type="password" />  <!-- masks characters as you type -->\n<input type="number" />    <!-- numeric keypad on mobile, up/down arrows on desktop -->\n<input type="date" />      <!-- a native date picker, no JavaScript library needed -->\n<input type="tel" />       <!-- a phone-style keypad on mobile -->\n<input type="checkbox" /> <input type="radio" name="plan" />`}
      />
      <P>
        <Highlight>
          Using the specific input type instead of always reaching for type=&quot;text&quot; gets you free
          validation, the correct mobile keyboard, and accessible behavior with zero extra code.
        </Highlight>{" "}
        Radio buttons that should be mutually exclusive must share the exact same <Code>name</Code> — that shared
        name is how the browser knows they belong to one group where only one can be selected.
      </P>

      <H2>3. Labels — not optional, not decoration</H2>
      <CodeBlock
        lang="html"
        title="associating a label"
        code={`<label for="email">Email address</label>\n<input type="email" id="email" name="email" />`}
      />
      <P>
        The <Code>for</Code> attribute must match the input&apos;s <Code>id</Code> exactly. This connection does
        three real things: clicking the label text focuses the input (try it — huge usability win on checkboxes and
        radios with small click targets), screen readers announce the label when the field receives focus, and it
        gives every field a clear, programmatically-associated name instead of just a nearby paragraph of text that
        happens to look like a label.
      </P>
      <Callout tone="warning">
        A <Code>placeholder</Code> is not a substitute for a <Code>{"<label>"}</Code>. Placeholder text disappears
        the moment someone starts typing, has low contrast by design, and isn&apos;t reliably announced by screen
        readers — every input needs a real, visible label.
      </Callout>

      <H2>4. Built-in validation</H2>
      <CodeBlock
        lang="html"
        title="constraint validation, no JavaScript"
        code={`<input type="email" required />\n<input type="text" minlength="3" maxlength="20" required />\n<input type="text" pattern="[0-9]{6}" title="Enter a 6-digit code" />`}
      />
      <P>
        <Code>required</Code>, <Code>minlength</Code>/<Code>maxlength</Code>, <Code>min</Code>/<Code>max</Code> (for
        numbers and dates), and <Code>pattern</Code> (a regular expression) all work without a single line of
        JavaScript — the browser blocks submission and shows a native error message pointing at the offending field.
        This is called the <Code>Constraint Validation API</Code>, and it&apos;s worth using as your first line of
        defense even in apps that also validate with JavaScript and, always, on the server too.
      </P>

      <H2>5. Grouping fields and choosing options</H2>
      <CodeBlock
        lang="html"
        title="fieldset, select, and textarea"
        code={`<fieldset>\n  <legend>Shipping address</legend>\n  <label for="street">Street</label>\n  <input id="street" name="street" />\n</fieldset>\n\n<label for="country">Country</label>\n<select id="country" name="country">\n  <option value="in">India</option>\n  <option value="us">United States</option>\n</select>\n\n<textarea name="message" rows="4"></textarea>`}
      />
      <UL>
        <li>
          <Code>{"<fieldset>"}</Code> + <Code>{"<legend>"}</Code> — groups related fields with a shared, announced
          heading — screen readers read the legend before each field inside, which is invaluable for something like
          a set of radio buttons asking &quot;which plan?&quot;.
        </li>
        <li>
          <Code>{"<select>"}</Code> — a native dropdown; each <Code>{"<option>"}</Code>&apos;s <Code>value</Code> is
          what actually gets submitted, which can differ from the visible text shown to the user.
        </li>
        <li>
          <Code>{"<textarea>"}</Code> — multi-line free text input.
        </li>
      </UL>

      <H2>6. Advanced: submitting without a full page reload</H2>
      <P>
        By default, submitting a form does a full page navigation. Modern apps usually intercept that and send the
        data with JavaScript instead, updating the page without a reload:
      </P>
      <CodeBlock
        lang="js"
        title="intercepting a submit"
        code={`form.addEventListener("submit", async (e) => {\n  e.preventDefault(); // stop the default full-page navigation\n  const data = new FormData(form); // reads every named field automatically\n  await fetch("/api/search", { method: "POST", body: data });\n});`}
      />
      <P>
        <Code>FormData</Code> automatically reads every field&apos;s current <Code>name</Code>/value — you don&apos;t
        have to manually grab each input; this is exactly why getting the <Code>name</Code> attributes right matters
        even in a fully JavaScript-driven form.
      </P>

      <H3>Try it yourself</H3>
      <OL>
        <li>Build a small sign-up form with properly associated labels for name, email, and password fields.</li>
        <li>Add <Code>required</Code> and <Code>type=&quot;email&quot;</Code>, then try submitting it empty.</li>
        <li>
          Group two related fields inside a <Code>{"<fieldset>"}</Code> with a <Code>{"<legend>"}</Code>.
        </li>
      </OL>
    </div>
  );
}
