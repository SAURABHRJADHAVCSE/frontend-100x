import { CodeBlock } from "@/components/topic/code-block";
import { TypographyElementsPlayground } from "@/components/topic/phase1-playgrounds";
import { Callout, Code, H2, H3, Highlight, OL, P, UL } from "@/components/topic/prose";

export default function TextTypographyElements() {
  return (
    <div>
      <P>
        Almost everything a visitor reads on a page passes through a small set of text elements. Getting these right
        isn&apos;t about decoration — each one carries real meaning that browsers, search engines, and assistive
        technology all read and act on differently.
      </P>

      <TypographyElementsPlayground />

      <H2>1. Paragraphs and headings — the backbone</H2>
      <CodeBlock
        lang="html"
        title="basic structure"
        code={`<h1>Page title</h1>\n<p>A paragraph is a self-contained block of text.</p>\n<h2>A major section</h2>\n<p>Another paragraph, inside that section.</p>`}
      />
      <P>
        There should be exactly one <Code>{"<h1>"}</Code> per page — it&apos;s the page&apos;s main title, and both
        SEO tools and screen readers treat it as the definitive answer to &quot;what is this page about?&quot;. Every
        other heading nests underneath it in a logical outline, as covered in the semantic elements lesson.
      </P>

      <H2>2. Inline text elements and what they actually mean</H2>
      <UL>
        <li>
          <Code>{"<span>"}</Code> — a generic inline container with no meaning of its own, purely for styling or
          scripting hooks. The inline equivalent of <Code>{"<div>"}</Code>.
        </li>
        <li>
          <Code>{"<strong>"}</Code> vs <Code>{"<b>"}</Code> — both render bold, but <Code>{"<strong>"}</Code> tells a
          screen reader &quot;this is important&quot; (it may be announced with vocal emphasis), while{" "}
          <Code>{"<b>"}</Code> is purely visual with no semantic weight.
        </li>
        <li>
          <Code>{"<em>"}</Code> vs <Code>{"<i>"}</Code> — the same split for italics: <Code>{"<em>"}</Code> changes
          the stressed meaning of a sentence, <Code>{"<i>"}</Code> is for things like foreign phrases or ship names
          that are conventionally italic but carry no extra emphasis.
        </li>
        <li>
          <Code>{"<small>"}</Code> — fine print: legal disclaimers, copyright, side comments — not just
          &quot;smaller text&quot;.
        </li>
        <li>
          <Code>{"<abbr title=\"HyperText Markup Language\">HTML</abbr>"}</Code> — marks an abbreviation and gives
          browsers a full expansion to show on hover and screen readers to announce.
        </li>
        <li>
          <Code>{"<sub>"}</Code> / <Code>{"<sup>"}</Code> — subscript and superscript, for things like{" "}
          <Code>H₂O</Code> or <Code>x²</Code> where the position carries actual mathematical/chemical meaning.
        </li>
      </UL>

      <H2>3. Quoting text correctly</H2>
      <CodeBlock
        lang="html"
        title="quotes"
        code={`<blockquote cite="https://example.com/source">\n  <p>A long quotation set apart as its own block.</p>\n</blockquote>\n\n<p>She said <q>this is a short inline quote</q> during the call.</p>`}
      />
      <P>
        <Code>{"<blockquote>"}</Code> is for a longer quotation, set apart as its own block (browsers indent it by
        default). <Code>{"<q>"}</Code> is for a short quotation inline within a sentence — browsers automatically
        add quotation marks around it, and importantly, the correct style of quotation marks for the page&apos;s
        language.
      </P>

      <H2>4. Code and preformatted text</H2>
      <CodeBlock
        lang="html"
        title="displaying code"
        code={`<p>Run <code>npm install</code> to install dependencies.</p>\n\n<pre><code>function greet() {\n  console.log("hi");\n}</code></pre>`}
      />
      <UL>
        <li>
          <Code>{"<code>"}</Code> — marks inline text as computer code, typically rendered in a monospace font.
        </li>
        <li>
          <Code>{"<pre>"}</Code> — preformatted text: unlike every other HTML element, whitespace and line breaks
          inside it are preserved exactly as written instead of being collapsed. Combining it with{" "}
          <Code>{"<code>"}</Code> is the standard way to show a whole code block.
        </li>
      </UL>
      <Callout>
        <Highlight>
          Every syntax-highlighted code block you&apos;ve seen on this site is built exactly this way underneath —
          a styled `pre` and `code` pairing.
        </Highlight>
      </Callout>

      <H2>5. Line breaks and horizontal rules</H2>
      <P>
        <Code>{"<br />"}</Code> forces a single line break inside a block of text — reserve it for genuinely
        meaningful breaks like a mailing address, never for adding visual spacing (that&apos;s a CSS{" "}
        <Code>margin</Code>&apos;s job). <Code>{"<hr />"}</Code> represents a thematic break between paragraphs — a
        scene change in a story, a shift to a new topic — and by default renders as a horizontal line.
      </P>

      <H2>6. Advanced: internationalization and typography edge cases</H2>
      <UL>
        <li>
          <Code>{"<bdi>"}</Code> — isolates a piece of text whose reading direction might differ from its
          surroundings, useful when displaying user-generated content that could be in a right-to-left language like
          Arabic embedded inside an English sentence.
        </li>
        <li>
          <Code>{"<wbr />"}</Code> — a &quot;word break opportunity&quot;: a hint to the browser that it&apos;s
          allowed to wrap the line here if needed, useful inside very long unbroken strings like URLs.
        </li>
        <li>
          Non-breaking space (<Code>&amp;nbsp;</Code>) prevents a line break between two words that should always
          stay together, like a number and its unit: <Code>10&amp;nbsp;km</Code>.
        </li>
      </UL>

      <H3>Try it yourself</H3>
      <OL>
        <li>
          Write a short paragraph using at least one <Code>{"<strong>"}</Code>, one <Code>{"<em>"}</Code>, and one{" "}
          <Code>{"<abbr>"}</Code> correctly.
        </li>
        <li>Format a short code snippet using a proper <Code>{"<pre><code>"}</Code> pairing.</li>
        <li>Add a blockquote citing a real source using the <Code>cite</Code> attribute.</li>
      </OL>
    </div>
  );
}
