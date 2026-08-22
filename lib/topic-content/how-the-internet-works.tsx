import { CodeBlock } from "@/components/topic/code-block";
import { ClientServerDiagram, DnsLookupDiagram, PacketSwitchingDiagram } from "@/components/topic/diagrams";
import { Callout, Code, H2, H3, OL, P, UL } from "@/components/topic/prose";

export default function HowTheInternetWorks() {
  return (
    <div>
      <P>
        The internet is not one thing — it&apos;s a huge, dumb, well-behaved network of networks. No single company
        owns it. It&apos;s just millions of computers agreeing to speak the same handful of languages (called{" "}
        <Code>protocols</Code>) so they can pass tiny chunks of data to each other. Everything else — websites, apps,
        video calls, this page loading — is built on top of that one idea.
      </P>

      <H2>1. The 30-second version</H2>
      <P>
        You type a website address. Your computer asks a phone-book-like system (<Code>DNS</Code>) for the numeric
        address of that website. Your computer chops your request into small packets and sends them across a chain
        of routers until they reach the destination server. The server sends its response back the same way. Your
        browser reassembles the packets and draws the page. That&apos;s it — everything below is just zooming into
        each of those steps.
      </P>

      <H2>2. Every device needs an address — IP addresses</H2>
      <P>
        For any two computers to talk, each needs an address — just like a postal address. This is called an{" "}
        <Code>IP address</Code> (Internet Protocol address). It looks like <Code>142.250.183.14</Code> (called{" "}
        <Code>IPv4</Code>). There are only about 4.3 billion possible IPv4 addresses, and we&apos;ve run out, so a
        newer format called <Code>IPv6</Code> exists too, e.g. <Code>2001:4860:4860::8888</Code> — it has so many
        possible addresses that every grain of sand on Earth could have trillions of its own.
      </P>
      <UL>
        <li>Every device connected to the internet — phone, laptop, server, smart fridge — has an IP address.</li>
        <li>Your home router has one public IP; every device inside your home shares it (via NAT).</li>
        <li>Servers usually have a fixed IP address so they can always be found at the same place.</li>
      </UL>

      <H2>3. Names are for humans — DNS</H2>
      <P>
        Nobody wants to memorize <Code>142.250.183.14</Code> to visit Google. So we use domain names like{" "}
        <Code>google.com</Code> instead. The system that translates a name into an IP address is called{" "}
        <Code>DNS</Code> (Domain Name System) — think of it as the internet&apos;s phone book.
      </P>
      <P>When you type a domain into your browser, here&apos;s what actually happens behind the scenes:</P>
      <OL>
        <li>Your browser checks its own cache — &quot;have I looked this up recently?&quot;</li>
        <li>If not, it asks a <Code>DNS resolver</Code> (usually run by your ISP or a public one like 1.1.1.1).</li>
        <li>The resolver asks a <Code>root server</Code> — &quot;who handles .com?&quot;</li>
        <li>The root server points it to the <Code>.com TLD server</Code>, which points it to the{" "}
          <Code>authoritative server</Code> for google.com.</li>
        <li>That authoritative server finally answers with the real IP address.</li>
      </OL>
      <DnsLookupDiagram />
      <Callout>
        This whole chain usually takes <Code>10–50ms</Code> and is invisible to you — and the answer gets cached
        along the way so it doesn&apos;t have to happen again for a while.
      </Callout>

      <H3>Try it yourself</H3>
      <CodeBlock lang="bash" title="terminal" code={`dig google.com\n\n# or, more readable:\nnslookup google.com`} />

      <H2>4. Packets & packet switching</H2>
      <P>
        The internet doesn&apos;t send your data as one big blob. It chops it into small pieces called{" "}
        <Code>packets</Code> (usually ~1,500 bytes each), stamps each one with the destination address, and sends
        them off independently. This is called <Code>packet switching</Code>. Different packets from the same
        request can even travel completely different physical routes across the world and still arrive — they get
        reordered and reassembled at the destination.
      </P>
      <PacketSwitchingDiagram />
      <P>
        This design is what makes the internet resilient: if one path is congested or a cable gets cut, packets are
        automatically rerouted through a different path. No central authority decides the route in advance.
      </P>

      <H2>5. TCP vs UDP — how packets are delivered</H2>
      <P>
        Packets travel using rules called <Code>transport protocols</Code>. The two big ones:
      </P>
      <UL>
        <li>
          <Code>TCP</Code> (Transmission Control Protocol) — reliable. It numbers every packet, confirms each one
          arrived, and re-sends anything lost. Used for web pages, emails, file downloads — anywhere correctness
          matters more than speed.
        </li>
        <li>
          <Code>UDP</Code> (User Datagram Protocol) — fast but unreliable. No confirmations, no re-sending. Used for
          video calls, live streaming, online games — where a dropped packet just means a tiny glitch, and
          re-sending old data would be pointless anyway.
        </li>
      </UL>
      <P>
        Before any TCP data is sent, the two sides perform a <Code>three-way handshake</Code> to agree they&apos;re
        both ready:
      </P>
      <CodeBlock
        lang="text"
        title="TCP three-way handshake"
        code={`Client  →  SYN         "Can we talk?"\nServer  →  SYN-ACK     "Yes, go ahead."\nClient  →  ACK         "Great, starting now."`}
      />

      <H2>6. The client-server model</H2>
      <P>
        Almost everything on the web follows the same pattern: a <Code>client</Code> (your browser, phone app) asks
        for something, and a <Code>server</Code> (a computer that&apos;s always on, waiting for requests) answers.
        This is the <Code>request → response</Code> cycle.
      </P>
      <ClientServerDiagram />

      <H2>7. HTTP & HTTPS — the language of the web</H2>
      <P>
        Once a TCP connection exists between your browser and a server, they still need a shared language to ask for
        a webpage. That language is <Code>HTTP</Code> (HyperText Transfer Protocol). A real HTTP request is just
        plain text:
      </P>
      <CodeBlock
        lang="http"
        title="raw HTTP request/response"
        code={`GET /index.html HTTP/1.1\nHost: example.com\nUser-Agent: Mozilla/5.0\nAccept: text/html\n\nHTTP/1.1 200 OK\nContent-Type: text/html; charset=UTF-8\nContent-Length: 1256\n\n<!doctype html>...`}
      />
      <P>
        <Code>HTTPS</Code> is the same thing, wrapped in an encryption layer called <Code>TLS</Code>. Without it,
        anyone on the same network (café wifi, your ISP) could read or tamper with your data in plain text. With
        HTTPS, the connection is encrypted end-to-end, and a <Code>certificate</Code> proves the server is really who
        it claims to be.
      </P>

      <H3>The same request, from JavaScript</H3>
      <CodeBlock
        lang="js"
        title="fetch example"
        code={`const response = await fetch("https://example.com/api/users");\nconst data = await response.json();\n\nconsole.log(response.status); // 200\nconsole.log(data);`}
      />

      <H2>8. Putting it all together — what happens when you hit Enter</H2>
      <OL>
        <li>Browser checks cache, then resolves the domain to an IP address via DNS.</li>
        <li>Browser opens a TCP connection to that IP (three-way handshake).</li>
        <li>If it&apos;s HTTPS, a TLS handshake happens too — certificates are checked, encryption keys are agreed on.</li>
        <li>Browser sends an HTTP request over that encrypted connection.</li>
        <li>Server processes the request (maybe hits a database) and sends back an HTTP response.</li>
        <li>Browser receives the HTML, then requests the CSS, JS, images, and fonts it references — each is its own request/response cycle, often running in parallel.</li>
        <li>Browser parses the HTML into the DOM, applies CSS, runs JS, and paints pixels on your screen.</li>
      </OL>
      <Callout tone="warning">
        All of this — DNS lookup, handshakes, multiple round trips — typically happens in under a second. That&apos;s
        why every millisecond of latency matters for a fast website.
      </Callout>

      <H2>9. Advanced: making it fast at scale</H2>
      <UL>
        <li>
          <Code>CDNs</Code> (Content Delivery Networks) — copies of a website&apos;s static files are stored on
          servers physically close to users worldwide, so data travels a shorter distance.
        </li>
        <li>
          <Code>Load balancers</Code> — sit in front of many servers and spread incoming requests across them so no
          single server gets overwhelmed.
        </li>
        <li>
          <Code>Caching</Code> — browsers, CDNs, and servers all keep copies of recent responses so repeat requests
          don&apos;t need to redo the full round trip.
        </li>
      </UL>

      <H3>See it yourself in one command</H3>
      <CodeBlock
        lang="bash"
        title="terminal"
        code={`curl -v https://example.com\n\n# -v shows the full handshake + request/response headers`}
      />
    </div>
  );
}
