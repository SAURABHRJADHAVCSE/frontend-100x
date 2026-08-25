import { CodeBlock } from "@/components/topic/code-block";
import { SearchResultAnatomyDiagram } from "@/components/topic/diagrams";
import { SeoMetaPreviewer } from "@/components/topic/phase1-playgrounds";
import { Callout, Code, H2, H3, Highlight, OL, P, UL } from "@/components/topic/prose";
import { InterviewQuestions } from "@/components/topic/interview-questions";

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

      <InterviewQuestions questions={SEO_QUESTIONS} />
    </div>
  );
}

const SEO_QUESTIONS = [
  {
    question: "What is Meta Description and what is its optimal character length?",
    answer: "A meta description tag ('<meta name=\"description\" content=\"...\">') provides a concise 150-160 character summary of a webpage. Search engines display it below the title tag in Search Engine Results Pages (SERPs) to improve Click-Through Rate (CTR).",
    difficulty: "Basic" as const,
  },
  {
    question: "What are Open Graph (og:) meta tags and why are they used?",
    answer: "Open Graph meta tags (e.g. og:title, og:image, og:description) are a protocol introduced by Facebook. They control how a webpage is rendered as a rich link preview card when shared on social media platforms (LinkedIn, Twitter/X, WhatsApp, Slack).",
    difficulty: "Basic" as const,
  },
  {
    question: "What is a canonical URL tag and what problem does it solve?",
    answer: "A canonical link tag ('<link rel=\"canonical\" href=\"https://example.com/page\">') tells search engines which URL is the single master/authoritative copy of a webpage. It prevents SEO duplicate content penalties when the same page is accessible via multiple parameters (e.g. ?ref=twitter or ?sort=asc).",
    difficulty: "Intermediate" as const,
  },
  {
    question: "What is the difference between robots meta tag values index/noindex and follow/nofollow?",
    answer: "- index / noindex: Controls whether search engines are allowed to store and display the page in search results.\n- follow / nofollow: Controls whether crawlers should follow link URLs found on that page to index secondary pages.",
    difficulty: "Intermediate" as const,
  },
  {
    question: "What is structured data (JSON-LD) and how does it affect Search Results?",
    answer: "JSON-LD (JavaScript Object Notation for Linked Data) is a standardized schema.org format embedded in a <script type=\"application/ld+json\"> tag. It gives search engines explicit structural metadata about products, reviews, recipes, or events, enabling 'Rich Snippets' (star ratings, prices, event dates) in search results.",
    difficulty: "Advanced" as const,
  },
  {
    question: "What is robots.txt vs sitemap.xml?",
    answer: "- robots.txt: A plain text file at the root of a domain instructing search engine crawlers which paths they are allowed or forbidden to crawl.\n- sitemap.xml: An XML file listing all public URLs on a website along with modification dates, helping search engine spiders discover all pages efficiently.",
    difficulty: "Basic" as const,
  },
  {
    question: "How do Core Web Vitals (LCP, INP, CLS) impact SEO rankings?",
    answer: "Google incorporates Core Web Vitals into its official search ranking algorithm. Pages with fast Largest Contentful Paint (<2.5s), low Interaction to Next Paint (<200ms), and minimal Cumulative Layout Shift (<0.1) are rewarded with higher search rankings over slow competitors.",
    difficulty: "Intermediate" as const,
  },
  {
    question: "What is the difference between Client-Side Rendering (CSR) and Server-Side Rendering (SSR) for SEO?",
    answer: "In CSR (plain React/SPA), initial HTML is empty and populated via JS, which can delay or hinder search engine indexing. In SSR (Next.js), full HTML content is rendered on the server before sending to the browser, ensuring web crawlers index content instantly.",
    difficulty: "Advanced" as const,
  },
  {
    question: "What is Twitter Cards meta data?",
    answer: "Twitter Cards meta tags (e.g. <meta name=\"twitter:card\" content=\"summary_large_image\">) specify custom rich media card preview formats specifically optimized for sharing on Twitter/X.",
    difficulty: "Basic" as const,
  },
  {
    question: "Why should every page have a unique <title> tag?",
    answer: "The <title> tag is the single most important on-page SEO element. It defines the clickable blue title link in search engine results and browser tab names, directly driving search relevancy and user clicks.",
    difficulty: "Basic" as const,
  },
];
