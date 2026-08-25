import { CodeBlock } from "@/components/topic/code-block";
import { TableAnatomyDiagram } from "@/components/topic/diagrams";
import { ListsTablesPlayground } from "@/components/topic/phase1-playgrounds";
import { Callout, Code, H2, H3, Highlight, OL, P, UL } from "@/components/topic/prose";
import { InterviewQuestions } from "@/components/topic/interview-questions";

export default function ListsTables() {
  return (
    <div>
      <P>
        Lists and tables both organize related items, but they answer different questions. A list says &quot;here
        are several things, in this order (or not)&quot;. A table says &quot;here is a grid where each item has the
        same set of labeled attributes.&quot; Picking the wrong one isn&apos;t just a style choice — it changes how
        screen readers announce the content and whether the structure even makes sense without the visual styling.
      </P>

      <ListsTablesPlayground />

      <H2>1. Unordered vs ordered lists</H2>
      <CodeBlock
        lang="html"
        title="the two basic lists"
        code={`<ul>\n  <li>Milk</li>\n  <li>Eggs</li>\n  <li>Bread</li>\n</ul>\n\n<ol>\n  <li>Preheat the oven</li>\n  <li>Mix the ingredients</li>\n  <li>Bake for 20 minutes</li>\n</ol>`}
      />
      <P>
        Use <Code>{"<ul>"}</Code> (unordered list) when the sequence doesn&apos;t matter — a shopping list, a set of
        navigation links, tags. Use <Code>{"<ol>"}</Code> (ordered list) when sequence carries meaning — steps in a
        recipe, ranked results, anything where swapping two items would change the meaning.{" "}
        <Highlight>
          Screen readers announce both the total item count and each item&apos;s position (&quot;item 2 of 5&quot;), so
          this distinction is read aloud, not just visual.
        </Highlight>
      </P>

      <H2>2. Description lists — the one people forget exists</H2>
      <CodeBlock
        lang="html"
        title="term/definition pairs"
        code={`<dl>\n  <dt>HTML</dt>\n  <dd>The markup language that structures web content.</dd>\n\n  <dt>CSS</dt>\n  <dd>The language that styles that structure.</dd>\n</dl>`}
      />
      <P>
        A <Code>{"<dl>"}</Code> (description list) pairs terms (<Code>{"<dt>"}</Code>) with their descriptions (
        <Code>{"<dd>"}</Code>) — perfect for glossaries, FAQs, and metadata key/value displays (like a product spec
        sheet), and semantically more correct than reaching for a table just to show two-column key/value pairs.
      </P>

      <H2>3. Nested lists</H2>
      <CodeBlock
        lang="html"
        title="a nested list"
        code={`<ul>\n  <li>\n    Frontend\n    <ul>\n      <li>HTML</li>\n      <li>CSS</li>\n    </ul>\n  </li>\n  <li>Backend</li>\n</ul>`}
      />
      <P>
        A nested list must live entirely <em>inside</em> its parent <Code>{"<li>"}</Code>, not as a sibling of it —
        this is exactly the kind of nesting mistake browsers silently &quot;fix&quot; in ways that can produce a different
        list structure than you intended, so it&apos;s worth writing correctly rather than relying on
        auto-correction.
      </P>

      <H2>4. Tables — for genuinely tabular data only</H2>
      <TableAnatomyDiagram />
      <CodeBlock
        lang="html"
        title="a real data table"
        code={`<table>\n  <thead>\n    <tr>\n      <th scope="col">Plan</th>\n      <th scope="col">Price</th>\n      <th scope="col">Storage</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <th scope="row">Free</th>\n      <td>$0</td>\n      <td>5 GB</td>\n    </tr>\n    <tr>\n      <th scope="row">Pro</th>\n      <td>$9</td>\n      <td>100 GB</td>\n    </tr>\n  </tbody>\n</table>`}
      />
      <UL>
        <li>
          <Code>{"<thead>"}</Code> / <Code>{"<tbody>"}</Code> — group the header row(s) apart from the data rows,
          letting the browser (and screen readers) treat them differently — long tables can even repeat the{" "}
          <Code>{"<thead>"}</Code> when printed across pages.
        </li>
        <li>
          <Code>{"<th>"}</Code> vs <Code>{"<td>"}</Code> — a header cell vs a plain data cell. This isn&apos;t just
          bold styling: screen readers announce the relevant column and/or row header before reading a data cell&apos;s
          value, which is the entire reason a table is understandable when read aloud one cell at a time.
        </li>
        <li>
          <Code>scope=&quot;col&quot;</Code> / <Code>scope=&quot;row&quot;</Code> — tells assistive technology
          exactly which direction a header applies to, essential the moment a table has headers in both the top row
          and the left column (like the pricing table above).
        </li>
      </UL>
      <Callout tone="warning">
        <Highlight>
          Tables were used for entire page layouts in the 1990s and early 2000s — this is now considered a serious
          accessibility failure, since a screen reader tries to announce layout tables as if they were real data
          grids, producing nonsense.
        </Highlight>{" "}
        If you&apos;re not displaying rows of genuinely related, labeled data, reach for CSS Grid or Flexbox instead
        of a table.
      </Callout>

      <H2>5. Captions and footers</H2>
      <CodeBlock
        lang="html"
        title="caption and tfoot"
        code={`<table>\n  <caption>Monthly pricing plans, updated January 2026</caption>\n  <thead>...</thead>\n  <tbody>...</tbody>\n  <tfoot>\n    <tr><td colspan="3">Prices exclude tax.</td></tr>\n  </tfoot>\n</table>`}
      />
      <P>
        <Code>{"<caption>"}</Code> gives a table an accessible title, announced before its content. <Code>{"<tfoot>"}</Code>{" "}
        groups summary rows (totals, footnotes) separately from the main data, and <Code>colspan</Code>/
        <Code>rowspan</Code> let a single cell stretch across multiple columns or rows when needed.
      </P>

      <H3>Try it yourself</H3>
      <OL>
        <li>Build a recipe using an <Code>{"<ol>"}</Code> for the steps and a <Code>{"<ul>"}</Code> for the ingredients.</li>
        <li>
          Build a small comparison table for three products with proper <Code>{"<thead>"}</Code>,{" "}
          <Code>scope</Code> attributes, and a <Code>{"<caption>"}</Code>.
        </li>
        <li>Turn a glossary of 3 terms into a proper <Code>{"<dl>"}</Code>.</li>
      </OL>

      <InterviewQuestions questions={LISTS_TABLES_QUESTIONS} />
    </div>
  );
}

const LISTS_TABLES_QUESTIONS = [
  {
    question: "What is the difference between <ul>, <ol>, and <dl>?",
    answer: "- <ul> (Unordered List): Bulleted list where item sequence order does not matter.\n- <ol> (Ordered List): Numbered list where item sequence order is crucial (e.g. recipe steps or rankings).\n- <dl> (Description List): Key-value pair list containing term <dt> and description <dd> (e.g. metadata or glossaries).",
    difficulty: "Basic" as const,
  },
  {
    question: "Why should <th> elements always include the scope attribute?",
    answer: "The 'scope' attribute (scope=\"col\" or scope=\"row\") explicitly tells screen readers whether a header cell relates to the entire column below it or row next to it, making complex data tables readable for visually impaired users.",
    difficulty: "Basic" as const,
  },
  {
    question: "What is the purpose of <thead>, <tbody>, and <tfoot> in HTML tables?",
    answer: "They semantically divide a table into structural sections:\n- <thead>: Wraps column header rows.\n- <tbody>: Wraps primary data rows.\n- <tfoot>: Wraps summary rows (totals, page averages, footnotes). When printing long tables across pages, browsers can repeat <thead> and <tfoot> headers automatically.",
    difficulty: "Basic" as const,
  },
  {
    question: "What is the difference between colspan and rowspan attributes?",
    answer: "- colspan=\"N\": Spans a single <td> or <th> across N horizontal columns.\n- rowspan=\"N\": Spans a single <td> or <th> across N vertical rows.",
    difficulty: "Basic" as const,
  },
  {
    question: "Why is <table> for page layout considered a major anti-pattern?",
    answer: "Using <table> for multi-column page layout destroys accessibility for screen readers (which read table cells out of natural visual flow), breaks responsiveness on mobile screens, and dramatically inflates DOM size.",
    difficulty: "Basic" as const,
  },
  {
    question: "What is the <caption> element in HTML tables?",
    answer: "The <caption> tag provides an accessible title or summary for the table. It must be placed as the very first child immediately inside the <table> tag.",
    difficulty: "Basic" as const,
  },
  {
    question: "What direct child elements are valid inside a <ul> or <ol>?",
    answer: "Only <li> (list item) elements are valid direct children of <ul> and <ol>. Other tags like <div> or <p> must be placed INSIDE an <li> item, not directly under <ul>/ol>.",
    difficulty: "Intermediate" as const,
  },
  {
    question: "How do you style list markers without destroying list accessibility?",
    answer: "Using CSS 'list-style: none' can sometimes cause Safari VoiceOver screen readers to stop announcing list items as lists. To fix this safely, maintain semantic <ul>/<li> structure or add role=\"list\" / role=\"listitem\" if list-style is removed.",
    difficulty: "Advanced" as const,
  },
  {
    question: "What is the reversed attribute on an <ol>?",
    answer: "The boolean 'reversed' attribute on an <ol> causes list item numbers to count down in descending order (e.g. 5, 4, 3, 2, 1) instead of ascending order.",
    difficulty: "Basic" as const,
  },
  {
    question: "How does <dl> differ from standard key-value objects in HTML?",
    answer: "In a <dl>, multiple <dt> (terms) can share a single <dd> (description), or a single <dt> can have multiple <dd> elements, representing complex one-to-many relationship structures.",
    difficulty: "Intermediate" as const,
  },
];
