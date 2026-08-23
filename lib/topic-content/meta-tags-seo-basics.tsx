import { CodeBlock } from "@/components/topic/code-block";
import { SearchResultAnatomyDiagram } from "@/components/topic/diagrams";
import { SeoMetaPreviewer } from "@/components/topic/phase1-playgrounds";
import { Callout, Code, H2, H3, Highlight, OL, P, UL } from "@/components/topic/prose";

export default function MetaTagsSeoBasics() {
  return (
    <div>
      <P>
        Nobody visits your <Code>{"<head>"}</Code> section directly, yet it quietly decides how your page shows up
        in Google, what it looks like when someone pastes your link into Slack or WhatsApp, and whether search
        engines understand what the page is even about. Meta tags are invisible to visitors and read almost
        entirely by machines — which makes them easy to forget and expensive to get wrong.
      </P>

      <SeoMetaPreviewer />

      <H2>1. The two tags that build your search result</H2>
      <CodeBlock
        lang="html"
        title="the essentials"
        code={`<title>How Semantic HTML Improves Accessibility | Frontend Roadmap</title>\n<meta name="description" content="Learn why landmark elements and headings matter for screen readers, SEO, and long-term maintainability — with real examples." />`}
      />
      <SearchResultAnatomyDiagram />
      <UL>
        <li>
          <Code>{"<title>"}</Code> — becomes the clickable blue link text in search results and the browser tab
          label. It&apos;s the single most important on-page SEO signal there is, and every page on a site should
          have a unique one.
        </li>
        <li>
          <Code>{'<meta name="description">'}</Code> — the snippet paragraph shown under the title. It does{" "}
          <em>not</em> directly affect ranking, but a well-written one directly affects click-through rate — it&apos;s
          your one chance to convince someone scanning results to pick your link over the other nine on the page.
        </li>
      </UL>
      <Callout tone="warning">
        <Highlight>
          Google may ignore your meta description entirely and generate its own snippet from the page content if
          yours is missing, too generic, or doesn&apos;t match what a searcher was actually looking for.
        </Highlight>{" "}
        Write one that specifically and honestly summarizes the page.
      </Callout>

      <H2>2. Open Graph — controlling link previews</H2>
      <CodeBlock
        lang="html"
        title="social share previews"
        code={`<meta property="og:title" content="How Semantic HTML Improves Accessibility" />\n<meta property="og:description" content="Landmark elements, headings, and why they matter." />\n<meta property="og:image" content="https://example.com/og-image.jpg" />\n<meta property="og:url" content="https://example.com/blog/semantic-html" />\n<meta property="og:type" content="article" />`}
      />
      <P>
        <Code>Open Graph</Code> (og:) tags are what Facebook, LinkedIn, WhatsApp, and Slack read to build the
        image-title-description card that appears when someone shares your link. Without them, a shared link often
        renders as bare, unstyled text — a real loss of clicks for anything meant to be shared socially.
      </P>
      <CodeBlock
        lang="html"
        title="Twitter/X-specific card tags"
        code={`<meta name="twitter:card" content="summary_large_image" />\n<meta name="twitter:title" content="How Semantic HTML Improves Accessibility" />\n<meta name="twitter:image" content="https://example.com/og-image.jpg" />`}
      />

      <H2>3. Canonical URLs — telling search engines which copy is real</H2>
      <CodeBlock lang="html" title="canonical" code={`<link rel="canonical" href="https://example.com/blog/semantic-html" />`} />
      <P>
        Many sites accidentally serve the same content at multiple URLs —{" "}
        <Code>example.com/post</Code> and <Code>example.com/post/</Code> and{" "}
        <Code>example.com/post?ref=twitter</Code> might all render identical content. A <Code>canonical</Code> link
        tells search engines &quot;this is the one true version — combine any ranking signal from the duplicates into
        this URL instead of splitting it across all of them.&quot;
      </P>

      <H2>4. robots.txt and the robots meta tag</H2>
      <CodeBlock
        lang="html"
        title="controlling crawling and indexing"
        code={`<meta name="robots" content="noindex, nofollow" />`}
      />
      <P>
        A site-wide <Code>robots.txt</Code> file (at the root of your domain) tells crawlers which paths they&apos;re
        allowed to visit at all. The per-page <Code>robots</Code> meta tag is finer-grained:{" "}
        <Code>noindex</Code> asks search engines to leave this specific page out of results entirely (useful for
        admin pages, thank-you pages, or duplicate content), and <Code>nofollow</Code> asks them not to pass ranking
        credit through the links on this page.
      </P>

      <H2>5. Structured data — speaking the search engine&apos;s language directly</H2>
      <CodeBlock
        lang="json"
        title="JSON-LD structured data"
        code={`<script type="application/ld+json">\n{\n  "@context": "https://schema.org",\n  "@type": "Article",\n  "headline": "How Semantic HTML Improves Accessibility",\n  "datePublished": "2026-01-15",\n  "author": { "@type": "Person", "name": "Jane Doe" }\n}\n</script>`}
      />
      <P>
        <Highlight>
          Structured data doesn&apos;t change what a visitor sees at all — it&apos;s a machine-readable description of the
          page&apos;s content, in a shared vocabulary (schema.org), embedded directly in the HTML.
        </Highlight>{" "}
        This is exactly what powers the rich results you see in search — star ratings, recipe cook times, event
        dates — that go beyond a plain blue link.
      </P>

      <H2>6. Advanced: the SEO fundamentals that aren&apos;t meta tags at all</H2>
      <P>
        A page can have flawless meta tags and still rank poorly, because search engines weigh far more than the
        head section: page load speed (Core Web Vitals), whether the page is genuinely mobile-friendly, real
        semantic HTML structure with a sensible heading outline, and — above everything else — whether the actual
        content answers what someone searching that phrase actually wants to know. Meta tags describe the page
        accurately; they can&apos;t substitute for the page being worth ranking.
      </P>

      <H3>Try it yourself</H3>
      <OL>
        <li>Write a unique, specific <Code>{"<title>"}</Code> and meta description for a real page you&apos;ve built.</li>
        <li>Add Open Graph tags and test the preview using a social share debugger tool.</li>
        <li>
          Add a <Code>canonical</Code> link tag to a page and explain out loud, in one sentence, what problem it
          solves.
        </li>
      </OL>
    </div>
  );
}
