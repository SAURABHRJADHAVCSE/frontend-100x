import { CodeBlock } from "@/components/topic/code-block";
import { StepFlowDiagram } from "@/components/topic/diagrams";
import { MultimediaPlayground } from "@/components/topic/phase1-playgrounds";
import { Callout, Code, H2, H3, Highlight, OL, P, UL } from "@/components/topic/prose";

export default function MultimediaElements() {
  return (
    <div>
      <P>
        For most of the web&apos;s history, embedding video meant relying on a browser plugin like Flash — a
        separate, often insecure piece of software the browser had to hand control to. Modern HTML has native
        elements for video, audio, and embedded content, meaning the browser itself handles playback, keyboard
        controls, and accessibility, with zero plugins and zero extra software.
      </P>

      <MultimediaPlayground />

      <H2>1. Video — native, controllable, accessible</H2>
      <CodeBlock
        lang="html"
        title="a video element"
        code={`<video controls width="640" poster="thumbnail.jpg">\n  <source src="movie.webm" type="video/webm" />\n  <source src="movie.mp4" type="video/mp4" />\n  <track kind="captions" src="captions-en.vtt" srclang="en" label="English" />\n  Your browser doesn't support embedded video.\n</video>`}
      />
      <StepFlowDiagram
        caption="The browser tries each <source> in order and plays the first format it actually supports."
        steps={[
          { label: "source: webm", sub: "tried first" },
          { label: "source: mp4", sub: "fallback" },
          { label: "Fallback text", sub: "if neither plays" },
        ]}
      />
      <UL>
        <li>
          <Code>controls</Code> — shows the browser&apos;s native play/pause/volume/fullscreen UI, which is already
          keyboard-accessible and screen-reader friendly for free.
        </li>
        <li>
          <Code>poster</Code> — an image shown before playback starts, instead of a black rectangle or a jarring
          first video frame.
        </li>
        <li>
          Multiple <Code>{"<source>"}</Code> elements let you offer several formats/codecs — not every browser
          supports every video format, so listing the most efficient one first with older, more universally-supported
          fallbacks after it covers everyone.
        </li>
        <li>
          Text between the opening and closing <Code>{"<video>"}</Code> tags only shows if the browser can&apos;t
          play video at all — a genuine fallback, not filler.
        </li>
      </UL>

      <H2>2. Captions aren&apos;t optional</H2>
      <P>
        <Code>{"<track kind=\"captions\">"}</Code> loads a <Code>.vtt</Code> subtitle file — plain text timestamps
        paired with lines of dialogue. This isn&apos;t just for deaf and hard-of-hearing users: captions are also
        how search engines index spoken video content, and how anyone watching with the sound off (extremely common
        on social feeds) can still follow along.
      </P>
      <CodeBlock
        lang="text"
        title="captions-en.vtt"
        code={`WEBVTT\n\n00:00:00.000 --> 00:00:02.500\nWelcome back to the channel.\n\n00:00:02.500 --> 00:00:05.000\nToday we're covering HTML multimedia.`}
      />

      <H2>3. Audio</H2>
      <CodeBlock
        lang="html"
        title="an audio element"
        code={`<audio controls>\n  <source src="podcast.ogg" type="audio/ogg" />\n  <source src="podcast.mp3" type="audio/mpeg" />\n</audio>`}
      />
      <P>
        Works exactly like <Code>{"<video>"}</Code> conceptually — multiple sources, native controls — just without a
        visual frame. Add the <Code>loop</Code> attribute for background sounds, or <Code>muted</Code> combined with{" "}
        <Code>autoplay</Code> for silent background video loops (browsers generally block audible autoplay entirely,
        specifically to stop sites from blasting sound the instant they load).
      </P>

      <H2>4. Embedding other content with iframe</H2>
      <CodeBlock
        lang="html"
        title="embedding a YouTube video"
        code={`<iframe\n  src="https://www.youtube.com/embed/VIDEO_ID"\n  title="Video title, for accessibility"\n  width="560"\n  height="315"\n  allowfullscreen\n  loading="lazy"\n></iframe>`}
      />
      <P>
        An <Code>{"<iframe>"}</Code> embeds an entirely separate webpage inside yours — a full nested browsing
        context with its own DOM, running independently of the page it&apos;s embedded in. This is how YouTube
        embeds, Google Maps embeds, and payment widgets from other companies get placed on your page without giving
        them any direct access to your page&apos;s own JavaScript or DOM.
      </P>
      <Callout tone="warning">
        <Highlight>
          Always set a real title attribute on every iframe — screen readers announce it to tell users what the
          embedded content actually is before they enter it.
        </Highlight>{" "}
        And treat iframe sources like any other external dependency: only embed content from sources you trust,
        since it runs with real capability inside your page&apos;s tab.
      </Callout>

      <H2>5. Advanced: the picture element, revisited for real media switching</H2>
      <P>
        As covered in the links & images lesson, <Code>{"<picture>"}</Code> can serve genuinely different images per
        viewport, not just different sizes of the same one — a common technique for showing a tightly cropped
        portrait photo on mobile and a wide landscape crop on desktop, both from the exact same <Code>{"<img>"}</Code>{" "}
        fallback tag underneath for accessibility and search engines.
      </P>

      <H3>Try it yourself</H3>
      <OL>
        <li>Embed a short video with <Code>controls</Code> and a <Code>poster</Code> image.</li>
        <li>Write a tiny two-line <Code>.vtt</Code> caption file and attach it with a <Code>{"<track>"}</Code> element.</li>
        <li>
          Embed an iframe (any site that allows embedding) with a proper <Code>title</Code> attribute and{" "}
          <Code>loading=&quot;lazy&quot;</Code>.
        </li>
      </OL>
    </div>
  );
}
