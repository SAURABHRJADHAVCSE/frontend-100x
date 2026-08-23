import { CodeBlock } from "@/components/topic/code-block";
import { ResponsiveImageDiagram } from "@/components/topic/diagrams";
import { Callout, Code, H2, H3, Highlight, OL, P, UL } from "@/components/topic/prose";

export default function LinksImages() {
  return (
    <div>
      <P>
        Links and images are what turn a document into hypertext — the &quot;hyper&quot; in HyperText Markup
        Language. A link lets a reader jump anywhere on the web in one click; an image embeds visual content
        directly in the flow of a page. Both look simple on the surface, and both have real depth once you get past
        the basics — depth that directly affects performance, accessibility, and SEO.
      </P>

      <H2>1. The anchor tag — more than href</H2>
      <CodeBlock
        lang="html"
        title="links"
        code={`<a href="/about">About us</a>\n<a href="https://example.com" target="_blank" rel="noopener noreferrer">External site</a>\n<a href="#section-2">Jump to Section 2</a>\n<a href="mailto:hello@example.com">Email us</a>\n<a href="tel:+15551234567">Call us</a>`}
      />
      <UL>
        <li>
          <Code>href</Code> — where the link goes: another page, a section on the same page (an <Code>id</Code>{" "}
          prefixed with <Code>#</Code>), an email address, or a phone number.
        </li>
        <li>
          <Code>target=&quot;_blank&quot;</Code> — opens the link in a new tab.{" "}
          <Highlight>
            Always pair it with rel=&quot;noopener noreferrer&quot;
          </Highlight>{" "}
          — without it, the new page gets partial JavaScript access back to your original page (via{" "}
          <Code>window.opener</Code>), which is both a security risk and a real-world exploited vulnerability
          called &quot;tabnabbing&quot;.
        </li>
      </UL>
      <Callout tone="warning">
        A <Code>{"<div onclick=\"navigate()\">"}</Code> is not a link. It can&apos;t be opened in a new tab,
        can&apos;t be middle-clicked, doesn&apos;t show a URL preview on hover, and isn&apos;t keyboard-focusable by
        default. If it navigates somewhere, it should be a real <Code>{"<a>"}</Code>.
      </Callout>

      <H2>2. Absolute vs relative URLs</H2>
      <P>
        An <Code>absolute URL</Code> includes the full address:{" "}
        <Code>https://example.com/blog/post-1</Code>. A <Code>relative URL</Code> is written relative to the current
        page&apos;s location: <Code>../post-1</Code> or <Code>/blog/post-1</Code> (a leading slash means
        &quot;from the site&apos;s root&quot;, regardless of the current page&apos;s folder). Internal links on your
        own site should almost always be relative — the site keeps working correctly if you ever move it to a new
        domain.
      </P>

      <H2>3. Images — the basics</H2>
      <CodeBlock
        lang="html"
        title="images"
        code={`<img src="/logo.png" alt="Acme Corp logo" width="120" height="40" />`}
      />
      <UL>
        <li>
          <Code>src</Code> — where the image file lives.
        </li>
        <li>
          <Code>alt</Code> — a text description read aloud by screen readers and shown if the image fails to load.
          It is not optional decoration:{" "}
          <Highlight>
            legally required for accessibility compliance in many countries, and directly used by search engines to
            understand what an image shows.
          </Highlight>{" "}
          If an image is purely decorative and carries no information, use an empty <Code>alt=&quot;&quot;</Code>{" "}
          (never omit the attribute entirely — that makes screen readers announce the raw filename instead).
        </li>
        <li>
          <Code>width</Code> / <Code>height</Code> — always set these, even though CSS usually controls the final
          display size. The browser uses them to reserve the correct amount of space <em>before</em> the image
          downloads, preventing the rest of the page from jumping around once it loads — a real, measured metric
          called <Code>Cumulative Layout Shift</Code>.
        </li>
      </UL>

      <H2>4. Responsive images — serving the right size, automatically</H2>
      <P>
        A phone doesn&apos;t need a 4000px-wide photo downloaded just to display it at 400px — that&apos;s wasted
        bandwidth and a slower page for no visual benefit. <Code>srcset</Code> lets you offer several sizes of the
        same image and hand the browser the decision of which one to actually download, based on the real screen it&apos;s
        rendering on.
      </P>
      <CodeBlock
        lang="html"
        title="responsive images"
        code={`<img\n  src="medium.jpg"\n  srcset="small.jpg 480w, medium.jpg 800w, large.jpg 1600w"\n  sizes="(max-width: 600px) 100vw, 50vw"\n  alt="A mountain landscape at sunset"\n/>`}
      />
      <ResponsiveImageDiagram />
      <P>
        Read <Code>sizes</Code> as a set of rules: &quot;if the viewport is 600px or narrower, this image will
        display at 100% of the viewport width; otherwise, 50%.&quot; Combined with the widths listed in{" "}
        <Code>srcset</Code>, the browser calculates the actual pixels needed and downloads only the smallest
        candidate that satisfies it — all without a single line of JavaScript.
      </P>

      <H2>5. Lazy loading</H2>
      <CodeBlock lang="html" title="native lazy loading" code={`<img src="photo.jpg" alt="..." loading="lazy" />`} />
      <P>
        <Code>loading=&quot;lazy&quot;</Code> tells the browser not to download an image until it&apos;s about to
        scroll into view — a one-attribute performance win for any image below the fold. Never lazy-load the very
        first, above-the-fold hero image though: doing so actually delays the most important visual content the user
        sees first.
      </P>

      <H2>6. The picture element — full art direction</H2>
      <P>
        <Code>srcset</Code> lets the browser choose a size of the <em>same</em> image. <Code>{"<picture>"}</Code>{" "}
        goes further, letting you serve genuinely <em>different</em> images (a cropped portrait version on mobile, a
        wide landscape version on desktop) or a modern format with a fallback:
      </P>
      <CodeBlock
        lang="html"
        title="format fallback with picture"
        code={`<picture>\n  <source srcset="photo.avif" type="image/avif" />\n  <source srcset="photo.webp" type="image/webp" />\n  <img src="photo.jpg" alt="A mountain landscape at sunset" />\n</picture>`}
      />
      <P>
        The browser tries each <Code>{"<source>"}</Code> top to bottom and uses the first format it actually
        supports, falling back to the plain <Code>{"<img>"}</Code> if none match — letting you ship modern,
        significantly smaller formats like AVIF/WebP without breaking older browsers.
      </P>

      <H3>Try it yourself</H3>
      <OL>
        <li>
          Add an image to a page with a proper descriptive <Code>alt</Code> and explicit <Code>width</Code>/
          <Code>height</Code>.
        </li>
        <li>Open DevTools&apos; Network tab, then add <Code>loading=&quot;lazy&quot;</Code> to an image far down the page and watch when it actually downloads.</li>
        <li>Turn an external link into a safely-opening new tab using the correct rel attribute.</li>
      </OL>
    </div>
  );
}
