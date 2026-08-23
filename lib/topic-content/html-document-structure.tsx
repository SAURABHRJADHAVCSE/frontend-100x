import { CodeBlock } from "@/components/topic/code-block";
import { DomTreeDiagram } from "@/components/topic/diagrams";
import { HtmlDocumentPlayground } from "@/components/topic/phase1-playgrounds";
import { Callout, Code, H2, H3, Highlight, OL, P, UL } from "@/components/topic/prose";

export default function HtmlDocumentStructure() {
  return (
    <div>
      <P>
        HTML (HyperText Markup Language) is not a programming language — it has no logic, no loops, no variables.
        It&apos;s a <Code>markup</Code> language: plain text with labels wrapped around it that tell the browser what
        each piece of content <em>is</em>. &quot;This is a heading. This is a paragraph. This is a link.&quot; The
        browser reads those labels and decides how to render, structure, and expose the content — to sighted users,
        to screen readers, and to search engines, all from the exact same markup.
      </P>

      <HtmlDocumentPlayground />

      <H2>1. Every document is one tree</H2>
      <P>
        Before memorizing tags, internalize this: an HTML document is not a flat list — it&apos;s a single nested
        tree, starting from one root element. Every tag lives inside exactly one parent, and can contain any number
        of children. This tree is what the browser actually builds in memory and calls the{" "}
        <Code>DOM</Code> (Document Object Model) — the live, in-memory version of your page that JavaScript and
        DevTools&apos; Elements panel both manipulate directly.
      </P>
      <DomTreeDiagram />

      <H2>2. The skeleton, line by line</H2>
      <CodeBlock
        lang="html"
        title="index.html"
        code={`<!doctype html>\n<html lang="en">\n  <head>\n    <meta charset="UTF-8" />\n    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n    <title>My Page</title>\n  </head>\n  <body>\n    <h1>Hello, world</h1>\n  </body>\n</html>`}
      />
      <UL>
        <li>
          <Code>{"<!doctype html>"}</Code> — not a tag, a one-time instruction telling the browser &quot;render this
          using the modern HTML5 rules&quot;, not some ancient 1990s quirks mode. Every HTML file needs exactly one,
          at the very top.
        </li>
        <li>
          <Code>{"<html lang=\"en\">"}</Code> — the root of the entire tree. The <Code>lang</Code> attribute isn&apos;t
          decoration: screen readers use it to choose the correct pronunciation, and browsers use it to offer
          translation.
        </li>
        <li>
          <Code>{"<head>"}</Code> — metadata about the page that isn&apos;t rendered as visible content itself: the
          title, character encoding, linked stylesheets, fonts, and SEO tags.
        </li>
        <li>
          <Code>{"<body>"}</Code> — everything a visitor actually sees and interacts with. Exactly one per document.
        </li>
      </UL>

      <H3>Charset and viewport — two meta tags you can&apos;t skip</H3>
      <P>
        <Code>{'<meta charset="UTF-8" />'}</Code> tells the browser how to decode the raw bytes of your file into
        text — without it, special characters, emoji, and non-English text can render as garbled symbols. It should
        be the very first thing inside <Code>{"<head>"}</Code>, since the browser needs it before it can correctly
        read anything after it.
      </P>
      <P>
        <Code>{'<meta name="viewport" content="width=device-width, initial-scale=1.0" />'}</Code> is what makes a
        page mobile-friendly at all. Without it, mobile browsers assume your page was built for a desktop, render it
        at roughly 980px wide, and shrink the whole thing down — text becomes tiny and users have to pinch-zoom to
        read anything.
      </P>
      <Callout tone="warning">
        <Highlight>
          Forgetting the viewport meta tag is the single most common reason a site looks fine on desktop but broken
          on mobile.
        </Highlight>{" "}
        If you only remember one meta tag, make it this one.
      </Callout>

      <H2>3. Elements, tags, and attributes — the vocabulary</H2>
      <P>
        An <Code>element</Code> is the full unit: an opening tag, its content, and a closing tag —{" "}
        <Code>{"<p>text</p>"}</Code>. A <Code>tag</Code> is just the bracketed part, <Code>{"<p>"}</Code> or{" "}
        <Code>{"</p>"}</Code>. An <Code>attribute</Code> lives inside the opening tag and adds extra information:{" "}
        <Code>{'<a href="/about">'}</Code> — here <Code>href</Code> is the attribute name and{" "}
        <Code>&quot;/about&quot;</Code> is its value. Some elements are <Code>self-closing</Code> because they can
        never contain content: <Code>{"<img />"}</Code>, <Code>{"<br />"}</Code>, <Code>{"<input />"}</Code>.
      </P>

      <H2>4. Nesting rules actually matter</H2>
      <P>
        HTML tolerates a surprising amount of sloppiness — browsers try their best to fix broken markup silently —
        but relying on that is a mistake. Invalid nesting (like a block-level <Code>{"<div>"}</Code> inside an inline{" "}
        <Code>{"<span>"}</Code>&apos;s expected content model, or a <Code>{"<p>"}</Code> inside another{" "}
        <Code>{"<p>"}</Code>) produces unpredictable results across browsers and breaks CSS/JS that assumes a
        specific structure.
      </P>
      <CodeBlock
        lang="html"
        title="valid vs invalid nesting"
        code={`<!-- valid: tags close in the reverse order they opened -->\n<p>Some <strong>bold</strong> text.</p>\n\n<!-- invalid: crossed tags -->\n<p>Some <strong>bold text.</p></strong>`}
      />

      <H2>5. Comments and whitespace</H2>
      <P>
        <Code>{"<!-- this is a comment -->"}</Code> is never rendered and never runs — useful for leaving notes for
        other developers directly in the markup. Multiple spaces, tabs, and line breaks in your HTML source all
        collapse down to a single space when rendered — this is why indenting your HTML nicely for readability
        never affects how the page actually looks.
      </P>

      <H2>6. Advanced: how the browser actually builds the page</H2>
      <OL>
        <li>The browser reads your HTML bytes and, using the charset, decodes them into characters.</li>
        <li>
          It parses those characters into tokens (start tags, end tags, text), then builds the nested tree structure
          — the <Code>DOM</Code> — exactly as described above.
        </li>
        <li>
          In parallel, it builds a similar tree from your CSS, called the <Code>CSSOM</Code>.
        </li>
        <li>
          The DOM and CSSOM are combined into a <Code>render tree</Code> — only the parts that will actually be
          visible, with their computed styles attached.
        </li>
        <li>The browser calculates exact positions and sizes (layout), then paints actual pixels to the screen.</li>
      </OL>
      <Callout>
        This is why a <Code>{"<script>"}</Code> tag placed carelessly in the middle of your HTML can block the whole
        page from rendering — the browser pauses parsing to download and run it before it can continue building the
        tree. This is exactly why scripts are conventionally placed at the end of <Code>{"<body>"}</Code>, or loaded
        with the <Code>defer</Code> attribute.
      </Callout>

      <H3>Try it yourself</H3>
      <OL>
        <li>Create a blank <Code>index.html</Code> file with the full skeleton shown above.</li>
        <li>
          Open it in a browser, then open DevTools&apos; Elements panel and compare what you see to the tree diagram
          above.
        </li>
        <li>Remove the viewport meta tag, reload on a phone (or DevTools&apos; device toolbar), and see the difference.</li>
      </OL>
    </div>
  );
}
