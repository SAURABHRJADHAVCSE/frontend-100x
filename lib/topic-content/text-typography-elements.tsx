import { CodeBlock } from "@/components/topic/code-block";
import { TypographyElementsPlayground } from "@/components/topic/phase1-playgrounds";
import { Callout, Code, H2, H3, Highlight, OL, P, UL } from "@/components/topic/prose";
import { InterviewQuestions } from "@/components/topic/interview-questions";

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

      <InterviewQuestions questions={TEXT_TYPO_QUESTIONS} />
    </div>
  );
}

const TEXT_TYPO_QUESTIONS = [
  {
    question: "What is the difference between <pre> and <code> tags?",
    answer: "The <code> element is an inline tag used to mark up a short piece of computer code. The <pre> (preformatted text) element is a block tag that preserves all whitespace, tabs, and line breaks exactly as typed in source code. They are typically nested as <pre><code>...</code></pre> for multi-line code blocks.",
    difficulty: "Basic" as const,
  },
  {
    question: "What is the difference between <blockquote> and <q>?",
    answer: "- <blockquote>: Used for long, multi-line quotations that are rendered as a separate indented block-level box.\n- <q>: Used for short inline quotes that automatically inserts quotation marks surrounding the text depending on language locale.",
    difficulty: "Basic" as const,
  },
  {
    question: "How does <abbr> work and why is the title attribute used with it?",
    answer: "The <abbr> element represents an abbreviation or acronym (e.g. <abbr title=\"HyperText Markup Language\">HTML</abbr>). The 'title' attribute provides the full expanded text, which appears as a tooltip on hover and is announced by screen readers.",
    difficulty: "Basic" as const,
  },
  {
    question: "What is the <time> element and why is the datetime attribute important?",
    answer: "The <time> element represents dates or times. The 'datetime' attribute provides a machine-readable ISO 8601 format (e.g. <time datetime=\"2026-08-24T21:00\">Aug 24</time>), allowing search engines, calendar apps, and screen readers to parse dates accurately regardless of display format.",
    difficulty: "Intermediate" as const,
  },
  {
    question: "What is the difference between <sub> and <sup>?",
    answer: "- <sub>: Renders text as a subscript (lowered, smaller font, e.g. H<sub>2</sub>O for chemical formulas).\n- <sup>: Renders text as a superscript (raised, smaller font, e.g. E = mc<sup>2</sup> for math exponents or footnote numbers).",
    difficulty: "Basic" as const,
  },
  {
    question: "What is <mark> element used for?",
    answer: "The <mark> element represents text highlighted for reference or notation purposes due to its relevance in another context (e.g. highlighting search term matches in query results). Browsers style it with yellow background by default.",
    difficulty: "Basic" as const,
  },
  {
    question: "What is the <bdi> element and when should it be used?",
    answer: "<bdi> (Bi-Directional Isolation) isolates a span of text that might formatted in a different direction (e.g., right-to-left Arabic or Hebrew) from surrounding left-to-right text, preventing bi-directional formatting corruption when displaying user-generated names.",
    difficulty: "Advanced" as const,
  },
  {
    question: "What is the difference between <br> and <wbr>?",
    answer: "- <br>: Forces an immediate hard line break at that exact position.\n- <wbr> (Word Break Opportunity): Specifies a position where the browser MAY wrap the line if necessary inside very long unbroken words or URLs, but doesn't force a line break if there is enough space.",
    difficulty: "Intermediate" as const,
  },
  {
    question: "Why shouldn't you skip heading levels (e.g., jump from <h1> straight to <h3>)?",
    answer: "Heading levels (<h1> to <h6>) construct an automated document outline. Skipping levels breaks document hierarchy for screen reader users who navigate by heading level, making content structure confusing and damaging accessibility audit scores.",
    difficulty: "Basic" as const,
  },
  {
    question: "What is the difference between &nbsp; and standard space in HTML typography?",
    answer: "&nbsp; is a Non-Breaking Space entity. It prevents browsers from automatically breaking a line between two words (e.g. '100&nbsp;MB' or 'Mr.&nbsp;Smith'), ensuring numbers and their units or titles remain on the same line.",
    difficulty: "Intermediate" as const,
  },
];
