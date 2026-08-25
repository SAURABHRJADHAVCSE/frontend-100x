import { CodeBlock } from "@/components/topic/code-block";
import { ClientServerDiagram, DnsLookupDiagram, PacketSwitchingDiagram } from "@/components/topic/diagrams";
import { InternetSimulator } from "@/components/topic/phase0-playgrounds";
import { Callout, Code, H2, H3, Highlight, OL, P, UL } from "@/components/topic/prose";
import { InterviewQuestions } from "@/components/topic/interview-questions";

const INTERVIEW_QUESTIONS = [
  {
    question: "What happens step-by-step when you type a URL into a browser and press Enter?",
    answer: "1. The browser checks local cache for the IP. If not cached, it queries DNS servers to translate the domain into an IP address.\n2. A TCP 3-way handshake (SYN, SYN-ACK, ACK) establishes a connection with the server.\n3. If using HTTPS, a TLS handshake takes place to establish encryption keys.\n4. The browser sends an HTTP GET request to the server.\n5. The server processes the request and returns an HTTP response containing HTML.\n6. The browser parses the HTML into the DOM, fetches assets (CSS, JS, images), builds the CSSOM, and renders pixels on screen.",
    difficulty: "Basic" as const,
  },
  {
    question: "Explain the difference between TCP and UDP with real-world examples.",
    answer: "TCP (Transmission Control Protocol) is connection-oriented, reliable, guarantees packet ordering, and automatically retransmits lost packets (used for Web, Email, File downloads). UDP (User Datagram Protocol) is connectionless, fast, lightweight, but offers no guarantee of delivery or ordering (used for Live Video, VoIP calls, and Online Gaming where speed matters more than lost frames).",
    difficulty: "Basic" as const,
  },
  {
    question: "What is DNS and how does DNS resolution work?",
    answer: "DNS (Domain Name System) acts as the phonebook of the internet. It maps human-readable domain names (e.g. google.com) to machine-readable IP addresses (e.g. 142.250.190.46). Resolution starts at the browser cache -> OS cache -> Resolver ISP -> Root Nameservers -> TLD Nameservers (.com) -> Authoritative Nameservers.",
    difficulty: "Basic" as const,
  },
  {
    question: "What is the difference between HTTP and HTTPS?",
    answer: "HTTP transfers data in plain unencrypted text over TCP port 80. HTTPS (HTTP Secure) wraps HTTP requests inside TLS (Transport Layer Security) encryption over port 443. HTTPS protects data integrity, prevents man-in-the-middle eavesdropping, and uses SSL/TLS certificates to authenticate identity.",
    difficulty: "Intermediate" as const,
  },
  {
    question: "What is a Content Delivery Network (CDN) and why is it used?",
    answer: "A CDN is a globally distributed network of edge servers that cache static assets (images, CSS, JS, videos) close to end users. CDNs reduce latency (geographical distance), lower origin server load, improve page load times, and offer DDoS protection.",
    difficulty: "Intermediate" as const,
  },
  {
    question: "What is the TCP 3-Way Handshake?",
    answer: "The 3-way handshake establishes a reliable TCP connection between client and server before data transfer:\n1. SYN: Client sends SYN packet ('Can we establish connection?').\n2. SYN-ACK: Server responds with SYN-ACK packet ('Connection accepted, can you hear me?').\n3. ACK: Client sends ACK packet ('Connection established, sending data now').",
    difficulty: "Intermediate" as const,
  },
  {
    question: "What are HTTP status codes? Group them by their leading digits.",
    answer: "HTTP status codes indicate the result of a server response:\n- 1xx: Informational (e.g., 100 Continue)\n- 2xx: Success (e.g., 200 OK, 201 Created)\n- 3xx: Redirection (e.g., 301 Moved Permanently, 304 Not Modified)\n- 4xx: Client Errors (e.g., 400 Bad Request, 404 Not Found, 401 Unauthorized, 403 Forbidden)\n- 5xx: Server Errors (e.g., 500 Internal Server Error, 502 Bad Gateway, 504 Gateway Timeout)",
    difficulty: "Basic" as const,
  },
  {
    question: "What is CORS (Cross-Origin Resource Sharing)?",
    answer: "CORS is a browser security feature based on the Same-Origin Policy. It blocks web pages from making HTTP requests to a different domain, port, or protocol unless the target server explicitly sends HTTP response headers like 'Access-Control-Allow-Origin'.",
    difficulty: "Advanced" as const,
  },
  {
    question: "How does Latency differ from Bandwidth?",
    answer: "Bandwidth is the maximum capacity/volume of data that can be transmitted over a network per second (measured in Mbps/Gbps). Latency is the time delay (round-trip time in milliseconds) it takes for a single packet of data to travel from client to server and back.",
    difficulty: "Basic" as const,
  },
  {
    question: "What is a Reverse Proxy vs Forward Proxy?",
    answer: "A Forward Proxy acts on behalf of clients (hiding client IP addresses and bypassing geographic firewalls). A Reverse Proxy acts on behalf of servers (sitting in front of web servers to handle load balancing, SSL termination, caching, and security).",
    difficulty: "Advanced" as const,
  },
];

export default function HowTheInternetWorks() {
  return (
    <div>
      <P>
        Picture the internet as the global postal system, except the letters travel at close to the speed of light
        and get delivered in milliseconds. No single company runs it. No single government owns it. It&apos;s just
        millions of independent networks — home routers, universities, phone companies, giant data centers — all
        agreeing to speak the same handful of languages (called <Code>protocols</Code>) so a message from your
        laptop in Mumbai can reach a server in Virginia and back before you finish blinking. Everything you&apos;ve
        ever done online is built on top of that one idea: agreed-upon rules for passing tiny chunks of data around.
      </P>

      <InternetSimulator />

      <H2>0. The internet is not &quot;the web&quot;</H2>
      <P>
        Before we touch code, clear up the single biggest misunderstanding in computing: <Highlight>the internet</Highlight>{" "}
        is the physical network of connected computers, cables, and routers — the global highway system.{" "}
        <Highlight>The World Wide Web</Highlight> (the &quot;web&quot;) is just one of many services running on top of
        that highway, alongside email (SMTP), file transfers (SFTP), streaming audio/video, and gaming protocols. You
        use the internet when you play a multiplayer game, but you&apos;re only on the web when you open a browser
        and request web pages via HTTP.
      </P>

      <H2>1. IP addresses — the internet&apos;s phone numbers</H2>
      <P>
        Every single device connected to the internet — your phone, your laptop, a smart fridge, a Google server —
        gets assigned a unique numerical address called an <Code>IP address</Code> (Internet Protocol address). Without
        one, data wouldn&apos;t know where to start or where to end up.
      </P>
      <UL>
        <li>
          <Code>IPv4</Code> — the original system created in 1983. Uses four numbers separated by dots (e.g.{" "}
          <Code>142.250.190.46</Code>). Because it uses 32 bits, it allows roughly 4.3 billion unique addresses. We ran out of unassigned IPv4 addresses years ago!
        </li>
        <li>
          <Code>IPv6</Code> — the modern replacement created to solve the shortage. Uses eight groups of hexadecimal
          digits (e.g. <Code>2001:0db8:85a3::8a2e:0370:7334</Code>). It uses 128 bits, providing 340 undecillion
          addresses — enough for every grain of sand on Earth to have its own IP.
        </li>
      </UL>

      <H2>2. DNS — the internet&apos;s contacts list</H2>
      <P>
        Humans are terrible at remembering long lists of numbers like <Code>142.250.190.46</Code>. We prefer names
        like <Code>google.com</Code>. The <Code>DNS</Code> (Domain Name System) is a globally distributed database
        whose only job is to translate human-friendly domain names into machine-friendly IP addresses.
      </P>
      <DnsLookupDiagram />
      <P>
        When you type <Code>google.com</Code> into your browser address bar:
      </P>
      <OL>
        <li>
          Your browser checks its own local cache to see if it looked up <Code>google.com</Code> recently.
        </li>
        <li>If not in browser cache, it checks your operating system&apos;s DNS cache.</li>
        <li>
          If still not found, your computer asks your ISP&apos;s <Code>DNS Resolver</Code> (or a public one like
          Cloudflare&apos;s <Code>1.1.1.1</Code>).
        </li>
        <li>
          The Resolver queries a hierarchy of DNS servers: <Code>Root servers</Code> → <Code>TLD servers (.com)</Code> → <Code>Authoritative servers</Code> until it gets the exact IP address and hands it back to your browser.
        </li>
      </OL>

      <H2>3. Packets — breaking data into bite-sized envelopes</H2>
      <P>
        If you tried to send a 4K movie or a large website over the internet as one single continuous stream of data,
        a single dropped connection would ruin the entire download, and one heavy user would block the entire wire
        for everyone else.
      </P>
      <P>
        Instead, data is chopped into tiny pieces called <Code>packets</Code> (usually around 1,500 bytes each).
        Every packet contains two main parts:
      </P>
      <UL>
        <li>
          <strong>Header:</strong> Metadata including the source IP address, destination IP address, packet sequence
          number, and checksum for error detection.
        </li>
        <li>
          <strong>Payload:</strong> The actual chunk of content (a piece of HTML, a tiny snippet of an image).
        </li>
      </UL>

      <H2>4. Routers and packet switching</H2>
      <P>
        Once packets leave your device, they don&apos;t travel in a single straight line. They travel through a web of{" "}
        <Code>routers</Code> — specialized computers whose entire purpose is inspecting packet headers and deciding
        which connected cable to forward the packet along next.
      </P>
      <PacketSwitchingDiagram />
      <P>
        This mechanism is called <Code>packet switching</Code>. Packets belonging to the exact same website request
        might travel along entirely different physical routes across the world, passing through different undersea
        fiber-optic cables, and arriving out of order. The receiving computer uses the sequence numbers in the packet
        headers to reassemble them perfectly back into the original file.
      </P>

      <H2>5. TCP vs UDP — how packets actually get delivered reliably</H2>
      <UL>
        <li>
          <Code>TCP</Code> (Transmission Control Protocol) — <Highlight>reliable delivery</Highlight>. Every packet
          is numbered; the receiver confirms each one arrived, and anything lost or corrupted gets automatically
          re-sent.
        </li>
        <li>
          <Code>UDP</Code> (User Datagram Protocol) — <Highlight>fast but unreliable</Highlight>. No confirmations,
          no re-sending, no guaranteed order. Used for live streaming and gaming.
        </li>
      </UL>

      <H2>6. The client-server model</H2>
      <ClientServerDiagram />

      <H2>7. HTTP &amp; HTTPS — the language of the Web</H2>
      <CodeBlock
        lang="http"
        title="raw HTTP request/response"
        code={`GET /index.html HTTP/1.1\nHost: example.com\nUser-Agent: Mozilla/5.0\nAccept: text/html\n\nHTTP/1.1 200 OK\nContent-Type: text/html; charset=UTF-8\nContent-Length: 1256\n\n<!doctype html>...`}
      />

      <H3>See it yourself in one command</H3>
      <CodeBlock
        lang="bash"
        title="terminal"
        code={`curl -v https://example.com`}
      />

      <InterviewQuestions questions={INTERVIEW_QUESTIONS} />
    </div>
  );
}
