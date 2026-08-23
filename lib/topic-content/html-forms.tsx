import { CodeBlock } from "@/components/topic/code-block";
import { StepFlowDiagram } from "@/components/topic/diagrams";
import { HtmlFormsPlayground } from "@/components/topic/phase1-playgrounds";
import { Callout, Code, H2, H3, Highlight, OL, P, UL } from "@/components/topic/prose";

export default function HtmlForms() {
  return (
    <div>
      <P>
        Every login screen, search bar, checkout flow, settings page, and comment box on the web is built on the same foundation: <Highlight>HTML Forms</Highlight>.
        Forms allow a webpage to collect data from a user, validate it in real-time, format it into network payloads, and submit it to a server.
      </P>

      <HtmlFormsPlayground />

      <H2>1. Anatomy of the &lt;form&gt; Element &amp; Data Transmission</H2>
      <P>
        The <Code>&lt;form&gt;</Code> tag acts as a wrapper around form controls. When a form is submitted, the browser packages every child element that possesses a <Code>name</Code> attribute into a structured payload.
      </P>

      <CodeBlock
        lang="html"
        title="Form Attributes Breakdown"
        code={`<form
  action="/api/v1/users"
  method="post"
  enctype="multipart/form-data"
  autocomplete="on"
  novalidate
>
  <label for="username">Username</label>
  <input id="username" name="username" type="text" required />

  <button type="submit">Submit</button>
</form>`}
      />

      <UL>
        <li>
          <Code>action</Code> — The target URL endpoint where the form data will be sent.
        </li>
        <li>
          <Code>method</Code> — The HTTP method used to send data:
          <UL>
            <li><Code>GET</Code> — Appends fields to the URL as a query string (<Code>?username=saurabh&email=a@b.com</Code>). Visible in URL bar, bookmarkable. Ideal for search bars &amp; filters. Never use for passwords!</li>
            <li><Code>POST</Code> — Sends data inside the HTTP request body. Invisible in the URL. Required for sensitive data, authentication, and file uploads.</li>
          </UL>
        </li>
        <li>
          <Code>enctype</Code> — Specifies how form data is encoded before transmission:
          <UL>
            <li><Code>application/x-www-form-urlencoded</Code> (Default) — All characters are encoded (<Code>space</Code> becomes <Code>+</Code> or <Code>%20</Code>).</li>
            <li><Code>multipart/form-data</Code> — Required whenever your form contains an <Code>&lt;input type=&quot;file&quot;&gt;</Code> to upload binary files!</li>
            <li><Code>text/plain</Code> — Plain text without encoding (rarely used).</li>
          </UL>
        </li>
        <li>
          <Code>name</Code> attribute — <Highlight>The single most critical attribute on inputs</Highlight>. Without a <Code>name</Code>, the input&apos;s data is silently ignored during form submission!
        </li>
      </UL>

      <H2>2. The 22 HTML Input Types</H2>
      <P>
        Choosing the right <Code>type</Code> attribute gives you native browser validation, accessible screen reader cues, and the correct mobile soft keyboard layout automatically:
      </P>

      <CodeBlock
        lang="html"
        title="HTML5 Input Types Summary"
        code={`<!-- Text & Security -->
<input type="text" name="name" />
<input type="password" name="password" /> <!-- Masked input -->
<input type="email" name="email" />       <!-- Mobile @ key & format check -->
<input type="tel" name="phone" />         <!-- Mobile numeric telephone keypad -->
<input type="url" name="website" />       <!-- Mobile URL keyboard with .com key -->
<input type="search" name="q" />         <!-- Search input with clear (X) button -->

<!-- Numbers & Ranges -->
<input type="number" min="1" max="100" step="1" />
<input type="range" min="0" max="100" />

<!-- Dates & Times -->
<input type="date" />
<input type="time" />
<input type="datetime-local" />
<input type="month" />
<input type="week" />

<!-- Selections & Media -->
<input type="checkbox" name="agree" />
<input type="radio" name="plan" value="pro" /> <!-- Radios with matching names form a single-choice group -->
<input type="file" accept="image/*" />
<input type="color" value="#3b82f6" />
<input type="hidden" name="token" value="xyz" />`}
      />

      <H2>3. Form Controls: Select, DataList, Textarea &amp; Grouping</H2>

      <CodeBlock
        lang="html"
        title="Form Control Elements"
        code={`<!-- Dropdown Select with OptGroup -->
<label for="car-select">Choose a car:</label>
<select id="car-select" name="car">
  <optgroup label="Electric">
    <option value="tesla">Tesla Model 3</option>
    <option value="nissan">Nissan Leaf</option>
  </optgroup>
</select>

<!-- DataList: Input with Auto-complete Suggestions -->
<label for="browser-input">Choose browser:</label>
<input id="browser-input" name="browser" list="browsers" />
<datalist id="browsers">
  <option value="Chrome" />
  <option value="Firefox" />
  <option value="Safari" />
</datalist>

<!-- Grouping related fields -->
<fieldset>
  <legend>Shipping Address</legend>
  <label for="street">Street Address</label>
  <input id="street" name="street" />
</fieldset>`}
      />

      <Callout tone="note">
        Use <Code>&lt;fieldset&gt;</Code> and <Code>&lt;legend&gt;</Code> to group related fields (like credit card details or shipping address). Screen readers announce the <Code>&lt;legend&gt;</Code> title before each field inside the set!
      </Callout>

      <H2>4. Button Types Trap: &lt;button type=&quot;submit&quot;&gt;</H2>
      <P>
        Inside a <Code>&lt;form&gt;</Code>, a <Code>&lt;button&gt;</Code> defaults to <Code>type=&quot;submit&quot;</Code>!
      </P>

      <CodeBlock
        lang="html"
        title="Button Types Distinction"
        code={`<!-- Triggers form submit event & constraint validation -->
<button type="submit">Submit Form</button>

<!-- Resets all form fields to initial HTML values -->
<button type="reset">Reset Fields</button>

<!-- Neutral button: Does NOT submit form. Used for custom JS onClick events -->
<button type="button" onclick="openModal()">Open Modal</button>`}
      />

      <H2>5. HTML5 Constraint Validation API</H2>
      <P>
        Browsers come with built-in validation rules that execute before submission, completely without JavaScript:
      </P>
      <UL>
        <li><Code>required</Code> — Field cannot be left empty.</li>
        <li><Code>minlength</Code> / <Code>maxlength</Code> — String length boundaries.</li>
        <li><Code>min</Code> / <Code>max</Code> / <Code>step</Code> — Numeric &amp; date boundaries.</li>
        <li><Code>pattern=&quot;[A-Z]{3}&quot;</Code> — Regex pattern check.</li>
      </UL>

      <CodeBlock
        lang="css"
        title="CSS Validation Pseudo-Classes"
        code={`/* Styles fields based on validity state */
input:valid {
  border-color: #22c55e;
}

input:invalid {
  border-color: #ef4444;
}

/* User-valid only triggers AFTER user interacts with the input! */
input:user-invalid {
  outline: 2px solid #ef4444;
}`}
      />

      <H2>6. Modern JavaScript Form Handling with FormData API</H2>
      <P>
        Modern single-page applications intercept native form submission with <Code>e.preventDefault()</Code> and send asynchronous requests using <Code>FormData</Code> and <Code>fetch()</Code>:
      </P>

      <CodeBlock
        lang="javascript"
        title="FormData & fetch Submission"
        code={`const form = document.querySelector('form');

form.addEventListener('submit', async (e) => {
  e.preventDefault(); // Stop page reload

  // Automatically extracts all named input fields into a key-value payload!
  const formData = new FormData(form);

  // Send request via fetch API
  const response = await fetch('/api/register', {
    method: 'POST',
    body: formData // Automatically sets correct multipart/form-data headers!
  });

  const result = await response.json();
  console.log('Server response:', result);
});`}
      />

      <H3>Key Takeaways &amp; Industry Standards</H3>
      <OL>
        <li>Always associate every input with a <Code>&lt;label for=&quot;id&quot;&gt;</Code>.</li>
        <li>Always specify <Code>name</Code> on every field you want submitted.</li>
        <li>Always specify explicit <Code>type=&quot;button&quot;</Code> on non-submitting buttons.</li>
        <li>Use <Code>enctype=&quot;multipart/form-data&quot;</Code> for file upload forms.</li>
        <li>Leverage native HTML5 input types for free mobile keypads and validation.</li>
      </OL>
    </div>
  );
}
