import { CodeBlock } from "@/components/topic/code-block";
import { SemanticLayoutDiagram } from "@/components/topic/diagrams";
import { SemanticLandmarksPlayground } from "@/components/topic/phase1-playgrounds";
import { Callout, Code, H2, H3, Highlight, OL, P, UL } from "@/components/topic/prose";

export default function SemanticElements() {
  return (
    <div>
      <P>
        You could build an entire website using nothing but <Code>{"<div>"}</Code> tags with class names like{" "}
        <Code>class=&quot;header&quot;</Code> or <Code>class=&quot;nav&quot;</Code> — visually, it would look
        identical. <Highlight>The difference is invisible to your eyes but obvious to a screen reader, a search
        engine crawler, and anyone maintaining the code later.</Highlight> Semantic HTML means choosing tags that
        describe what content <em>means</em>, not just how it should look — and it&apos;s one of the highest-leverage
        habits a frontend developer can build.
      </P>

      <SemanticLandmarksPlayground />

      <H2>1. Why semantics matter more than they look like they should</H2>
      <UL>
        <li>
          <Code>Accessibility</Code> — screen reader users navigate by landmark: they can jump straight to
          &quot;main content&quot; or list every heading on the page in seconds. A page built entirely from{" "}
          <Code>{"<div>"}</Code>s offers none of that; it&apos;s just an undifferentiated wall of content.
        </li>
        <li>
          <Code>SEO</Code> — search engines weigh content inside <Code>{"<article>"}</Code>,{" "}
          <Code>{"<h1>"}</Code>, and similar tags more heavily when figuring out what a page is actually about.
        </li>
        <li>
          <Code>Maintainability</Code> — six months from now, <Code>{"<nav>"}</Code> tells you and every teammate
          exactly what that block is for, at a glance, with zero need to read class names or comments.
        </li>
        <li>
          <Code>Free built-in behavior</Code> — a <Code>{"<button>"}</Code> is keyboard-focusable and clickable with
          Enter/Space for free. A <Code>{"<div onclick>"}</Code> gets none of that unless you rebuild it by hand.
        </li>
      </UL>

      <H2>2. The landmark elements — the skeleton of a page</H2>
      <SemanticLayoutDiagram />
      <UL>
        <li>
          <Code>{"<header>"}</Code> — introductory content for the page or a section: typically a logo, title, and
          top-level navigation. A page can have more than one (e.g. one for the page, one inside an{" "}
          <Code>{"<article>"}</Code>).
        </li>
        <li>
          <Code>{"<nav>"}</Code> — a block of primary navigation links. Not every group of links needs one — only
          major navigation blocks (main menu, breadcrumbs, table of contents).
        </li>
        <li>
          <Code>{"<main>"}</Code> — the primary content of the page, unique to that page. Use it exactly once per
          page; screen readers use it as the &quot;skip straight here&quot; landmark.
        </li>
        <li>
          <Code>{"<aside>"}</Code> — content related to but separate from the main content: a sidebar, a pull-quote,
          related links.
        </li>
        <li>
          <Code>{"<footer>"}</Code> — closing content for the page or section: copyright, contact info, site links.
        </li>
      </UL>

      <H2>3. Article vs section — the distinction everyone gets wrong</H2>
      <P>
        This is the single most-confused pair in all of semantic HTML, and the rule is actually simple once you know
        it:
      </P>
      <Callout>
        <Highlight>
          Ask: &quot;would this content still make sense on its own, syndicated somewhere else entirely?&quot;
        </Highlight>{" "}
        If yes, it&apos;s an <Code>{"<article>"}</Code> (a blog post, a news story, a forum comment, a product
        card). If it&apos;s just a thematic grouping within the current page that depends on its surrounding
        context, it&apos;s a <Code>{"<section>"}</Code> (a chapter, a tab panel, a grouped set of form fields).
      </Callout>
      <CodeBlock
        lang="html"
        title="article vs section, in practice"
        code={`<article>\n  <h2>How Semantic HTML Improves Accessibility</h2>\n  <p>...</p>\n\n  <section>\n    <h3>Why screen readers care</h3>\n    <p>...</p>\n  </section>\n</article>`}
      />
      <P>
        Notice they nest: a blog post is an <Code>{"<article>"}</Code>, and its subsections inside are{" "}
        <Code>{"<section>"}</Code>s. An article can also contain other articles (comments on a blog post are each
        their own <Code>{"<article>"}</Code>, nested inside the post&apos;s <Code>{"<article>"}</Code>).
      </P>

      <H2>4. Heading hierarchy is structure, not font size</H2>
      <P>
        <Code>{"<h1>"}</Code> through <Code>{"<h6>"}</Code> don&apos;t just make text bigger — they define an
        outline of the page, exactly like a document&apos;s table of contents. Screen reader users frequently
        navigate by jumping between headings alone, skipping everything else, so skipping levels (an{" "}
        <Code>{"<h2>"}</Code> straight to an <Code>{"<h4>"}</Code>) breaks that outline the same way a table of
        contents with missing numbers would confuse a reader.
      </P>
      <Callout tone="warning">
        Never choose a heading tag because of how big it looks — that&apos;s CSS&apos;s job (<Code>font-size</Code>).
        Choose it based on where that heading sits in the page&apos;s logical outline, and use CSS to make it look
        however you want afterward.
      </Callout>

      <H2>5. Inline semantics people skip</H2>
      <UL>
        <li>
          <Code>{"<strong>"}</Code> — content of strong importance (also renders bold by default). Different from{" "}
          <Code>{"<b>"}</Code>, which is purely visual bold with no implied importance.
        </li>
        <li>
          <Code>{"<em>"}</Code> — stressed emphasis, changing the meaning of a sentence if read aloud (renders
          italic by default). Different from <Code>{"<i>"}</Code>, which is purely visual italics.
        </li>
        <li>
          <Code>{"<time datetime=\"2026-01-15\">"}</Code> — marks a human-readable date/time in a
          machine-readable format that search engines and calendar apps can actually parse.
        </li>
        <li>
          <Code>{"<mark>"}</Code> — highlighted text relevant to the current context, like a search term match.
        </li>
      </UL>

      <H2>6. Advanced: ARIA is the escape hatch, not the default</H2>
      <P>
        <Code>ARIA</Code> (Accessible Rich Internet Applications) attributes like <Code>role</Code> and{" "}
        <Code>aria-label</Code> can retrofit accessibility onto non-semantic markup. But the first rule of ARIA is:{" "}
        <Highlight>if a native HTML element already gives you the behavior and semantics you need, use it instead
        of reinventing it with ARIA on a div</Highlight> — a native <Code>{"<button>"}</Code> is more robust than a{" "}
        <Code>{'<div role="button">'}</Code> that you then have to manually make focusable and keyboard-operable
        yourself.
      </P>

      <H3>Try it yourself</H3>
      <OL>
        <li>Pick any div-heavy page you&apos;ve built before and rewrite its top-level layout using landmark elements.</li>
        <li>
          Open it in DevTools&apos; Elements panel and check the &quot;Accessibility&quot; tab to see the landmarks
          a screen reader would announce.
        </li>
        <li>Write a short blog post layout using nested article/section correctly, following the rule above.</li>
      </OL>
    </div>
  );
}
