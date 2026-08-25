import { CodeBlock } from "@/components/topic/code-block";
import { StepFlowDiagram } from "@/components/topic/diagrams";
import { MultimediaPlayground } from "@/components/topic/phase1-playgrounds";
import { Callout, Code, H2, H3, Highlight, OL, P, UL } from "@/components/topic/prose";
import { InterviewQuestions } from "@/components/topic/interview-questions";

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

      <InterviewQuestions questions={MULTIMEDIA_QUESTIONS} />
    </div>
  );
}

const MULTIMEDIA_QUESTIONS = [
  {
    question: "What is the difference between <video> and <iframe> for playing video content?",
    answer: "- <video>: Uses native HTML5 browser media controls to stream video files (MP4/WebM) hosted on your server or CDN directly.\n- <iframe>: Embeds an entire external web page (e.g. YouTube or Vimeo player widget) containing its own complex player controls, analytics, and third-party scripts.",
    difficulty: "Basic" as const,
  },
  {
    question: "Why should you use multiple <source> elements inside <video> and <audio>?",
    answer: "Different browsers support different media codecs and formats (e.g., MP4/H.264, WebM/VP9, Ogg). Providing multiple <source> elements (e.g. <source src=\"video.webm\" type=\"video/webm\">) allows the browser to automatically select and play the first codec format it natively supports.",
    difficulty: "Basic" as const,
  },
  {
    question: "Why is the autoplay attribute restricted on modern browsers?",
    answer: "Modern browsers (Chrome, Safari, Firefox) block audio/video autoplay with sound to protect user experience and prevent data consumption on mobile devices. Autoplay is only permitted if the media is explicitly muted via the 'muted' attribute.",
    difficulty: "Intermediate" as const,
  },
  {
    question: "What is the <track> element and WebVTT format?",
    answer: "The <track> element is used inside <video> or <audio> to attach timed text tracks (subtitles, captions, audio descriptions). Captions are formatted in WebVTT (.vtt) files containing timestamps and text strings.",
    difficulty: "Intermediate" as const,
  },
  {
    question: "What does the poster attribute on a <video> element do?",
    answer: "The 'poster' attribute specifies an image URL to display while the video is downloading or until the user clicks the play button, preventing a blank black box before playback.",
    difficulty: "Basic" as const,
  },
  {
    question: "Why is the title attribute mandatory on <iframe> elements?",
    answer: "The 'title' attribute provides an accessible description of the iframe's embedded content (e.g. <iframe title=\"Interactive Google Map of Mumbai Office\">), allowing screen readers to inform users what the frame contains before they navigate into it.",
    difficulty: "Basic" as const,
  },
  {
    question: "What is the sandbox attribute on an <iframe> and why is it crucial for security?",
    answer: "The 'sandbox' attribute enables an extra set of security restrictions on the embedded iframe content (blocking script execution, form submission, popups, or same-origin cookie access). Specifying sandbox=\"\" blocks all capabilities unless explicitly re-enabled (e.g. sandbox=\"allow-scripts\").",
    difficulty: "Advanced" as const,
  },
  {
    question: "How do preload attribute options (none, metadata, auto) affect video performance?",
    answer: "- preload=\"none\": Browser downloads zero video data until user clicks play (saves maximum bandwidth).\n- preload=\"metadata\": Browser downloads only metadata (duration, aspect ratio, audio track count).\n- preload=\"auto\": Browser downloads the full video file immediately on page load.",
    difficulty: "Intermediate" as const,
  },
  {
    question: "What is the difference between captions and subtitles in <track> kind attribute?",
    answer: "- kind=\"subtitles\": Translations of spoken dialogue for viewers who do not understand the spoken language.\n- kind=\"captions\": Transcription of dialogue PLUS sound effects and speaker identification (e.g. '[music playing]') for deaf or hard-of-hearing viewers.",
    difficulty: "Intermediate" as const,
  },
  {
    question: "What is the allow attribute on <iframe> tags?",
    answer: "The 'allow' attribute specifies a Feature Policy / Permissions Policy string granting or restricting the iframe's access to hardware APIs (e.g. allow=\"camera; microphone; geolocation; fullscreen\").",
    difficulty: "Advanced" as const,
  },
];
