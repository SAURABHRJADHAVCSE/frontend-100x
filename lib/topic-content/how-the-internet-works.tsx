import { CodeBlock } from "@/components/topic/code-block";
import { ClientServerDiagram, DnsLookupDiagram, PacketSwitchingDiagram } from "@/components/topic/diagrams";
import { InternetSimulator } from "@/components/topic/phase0-playgrounds";
import { Callout, Code, H2, H3, Highlight, OL, P, UL } from "@/components/topic/prose";

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
        People use these words interchangeably, but they&apos;re not the same thing, and knowing the difference will
        make everything else in this lesson click into place.
      </P>
      <UL>
        <li>
          The <Code>internet</Code> is the physical + logical network itself — the cables, routers, satellites, and
          addressing system that lets any two devices exchange data.
        </li>
        <li>
          The <Code>Web (WWW)</Code> is just one application that runs on top of the internet — pages linked together
          with HTTP and HTML. Email, video calls, online gaming, and file transfer are other applications running on
          the exact same underlying internet.
        </li>
      </UL>
      <Callout>
        The internet is the road network. The Web is one type of vehicle driving on it. Email and video calls are
        other vehicles on the same roads.
      </Callout>

      <H2>1. The 30-second version</H2>
      <P>
        You type a website address. Your computer asks a phone-book-like system (<Code>DNS</Code>) for the numeric
        address of that site. Your computer chops your request into small packets and sends them across a relay of
        routers until they reach the destination. The server sends its response back the same way. Your browser
        reassembles the packets and paints the page. Everything below is just zooming into each of those steps, one
        at a time, until you can picture exactly what&apos;s happening every time you load a page.
      </P>

      <H2>2. Every device needs an address — IP addresses</H2>
      <P>
        For two computers to exchange data, each one needs a unique address on the network — exactly like a street
        address for physical mail. This is an <Code>IP address</Code> (Internet Protocol address). It looks like{" "}
        <Code>142.250.183.14</Code> — this style is called <Code>IPv4</Code>. The problem: IPv4 only allows about 4.3
        billion unique addresses, and we ran out of new ones years ago. The fix is <Code>IPv6</Code>, e.g.{" "}
        <Code>2001:4860:4860::8888</Code>, which has so many possible addresses (340 undecillion) that every device
        humanity will ever build could have trillions of its own.
      </P>
      <UL>
        <li>Every internet-connected device — phone, laptop, server, smart fridge — has an IP address.</li>
        <li>
          Your home router has one public IP address; every device inside your house shares it via a translation
          trick called <Code>NAT</Code> (Network Address Translation) — this is also why two people on the same wifi
          appear to websites as coming from the same address.
        </li>
        <li>Servers usually keep a fixed, unchanging IP address so they can always be found in the same place.</li>
      </UL>

      <H2>3. Names are for humans — DNS</H2>
      <P>
        Nobody wants to memorize <Code>142.250.183.14</Code> to visit Google. So we use domain names like{" "}
        <Code>google.com</Code> instead, and a system called <Code>DNS</Code> (Domain Name System) translates the
        name into the real IP address behind it — the internet&apos;s phone book, except it&apos;s a whole hierarchy
        of phone books that ask each other questions.
      </P>
      <P>When you type a domain into your browser, here&apos;s the actual chain of events:</P>
      <OL>
        <li>Your browser checks its own memory — &quot;have I looked this up recently?&quot;</li>
        <li>
          If not, it asks a <Code>DNS resolver</Code> (usually run by your ISP, or a public one like Cloudflare&apos;s{" "}
          <Code>1.1.1.1</Code> or Google&apos;s <Code>8.8.8.8</Code>).
        </li>
        <li>
          The resolver, if it doesn&apos;t already know the answer, asks a <Code>root server</Code> — one of only 13
          logical root servers on Earth — &quot;who handles the <Code>.com</Code> ending?&quot;
        </li>
        <li>
          The root server doesn&apos;t know the answer either, but it knows who does: it points to the{" "}
          <Code>.com TLD server</Code>, which in turn points to the <Code>authoritative server</Code> for
          google.com specifically.
        </li>
        <li>That authoritative server finally answers with the real IP address.</li>
      </OL>
      <DnsLookupDiagram />
      <Callout>
        This entire chain usually takes <Code>10–50ms</Code> and happens invisibly — and the answer gets{" "}
        <Code>cached</Code> at multiple points along the way (your browser, your OS, your resolver), so it almost
        never has to repeat the full journey. Domains set a <Code>TTL</Code> (time to live) that controls how long
        each cache is allowed to hold onto the answer before checking again.
      </Callout>

      <H3>Try it yourself</H3>
      <CodeBlock lang="bash" title="terminal" code={`dig google.com\n\n# or, more readable output:\nnslookup google.com`} />

      <H2>4. Packets & packet switching</H2>
      <P>
        Here&apos;s something most people never think about: the internet never sends your data as one continuous
        stream. Instead, it chops everything into small pieces called <Code>packets</Code> — typically around 1,500
        bytes each — stamps every packet with the destination address (like writing an address on every single page
        of a letter, then mailing each page separately), and sends them off independently. This is{" "}
        <Code>packet switching</Code>, and{" "}
        <Highlight>it&apos;s arguably the single most important design decision in the internet&apos;s history</Highlight>.
      </P>
      <PacketSwitchingDiagram />
      <P>
        Different packets belonging to the exact same request can travel completely different physical routes across
        the world — one through an undersea cable to Europe, another through a satellite link — and still all arrive
        and get reassembled correctly at the destination, in the right order. This is what makes the internet
        resilient: if a cable gets physically cut or a router goes down, traffic is automatically rerouted around the
        damage within seconds. Nobody has to manually redirect anything, and no central authority plans the routes in
        advance — routers constantly share information about what paths are available and pick the best one on the
        fly.
      </P>

      <H2>5. TCP vs UDP — how packets actually get delivered reliably</H2>
      <P>
        Packet switching solves getting data across the network, but it doesn&apos;t guarantee packets arrive in
        order, or arrive at all. That job belongs to a <Code>transport protocol</Code>. There are two you need to
        know:
      </P>
      <UL>
        <li>
          <Code>TCP</Code> (Transmission Control Protocol) — <Highlight>reliable delivery</Highlight>. Every packet
          is numbered; the receiver confirms each one arrived, and anything lost or corrupted gets automatically
          re-sent. Used for web pages, emails, file downloads, and anywhere correctness matters more than raw speed.
        </li>
        <li>
          <Code>UDP</Code> (User Datagram Protocol) — <Highlight>fast but unreliable</Highlight>. No confirmations,
          no re-sending, no guaranteed order. Used for live video calls, streaming, and online games, where a
          dropped packet just means a tiny glitch — and by the time a lost packet could be re-sent, that moment in
          the call has already passed anyway, so retrying would be pointless.
        </li>
      </UL>
      <P>
        Before any TCP data flows, the two sides perform a <Code>three-way handshake</Code> — think of it like a
        phone call: you dial, the other person picks up and says &quot;hello?&quot;, and you reply &quot;hey, it&apos;s
        me&quot; before the actual conversation begins.
      </P>
      <CodeBlock
        lang="text"
        title="TCP three-way handshake"
        code={`Client  →  SYN         "Can we talk?"\nServer  →  SYN-ACK     "Yes, go ahead."\nClient  →  ACK         "Great, starting now."`}
      />

      <H2>6. The client-server model</H2>
      <P>
        Almost everything on the internet follows the same basic shape: a <Code>client</Code> (your browser, your
        phone&apos;s app) asks for something, and a <Code>server</Code> — a computer that&apos;s always on, always
        listening — answers. This is the <Code>request → response</Code> cycle, and it repeats constantly: loading a
        page might trigger dozens of these cycles in parallel for the HTML, the images, the fonts, and every API
        call the page makes.
      </P>
      <ClientServerDiagram />

      <H2>7. HTTP & HTTPS — the language of the Web</H2>
      <P>
        Once a TCP connection exists between your browser and a server, they still need a shared vocabulary to ask
        for a webpage and understand the answer. That shared language is <Code>HTTP</Code> (HyperText Transfer
        Protocol) — and despite feeling like magic, a real HTTP request is nothing more than structured plain text:
      </P>
      <CodeBlock
        lang="http"
        title="raw HTTP request/response"
        code={`GET /index.html HTTP/1.1\nHost: example.com\nUser-Agent: Mozilla/5.0\nAccept: text/html\n\nHTTP/1.1 200 OK\nContent-Type: text/html; charset=UTF-8\nContent-Length: 1256\n\n<!doctype html>...`}
      />
      <P>
        Read that like a conversation: &quot;GET me <Code>/index.html</Code>, and by the way here&apos;s the host
        I&apos;m asking and what I&apos;m willing to accept back.&quot; The server replies with a{" "}
        <Code>status code</Code> (<Code>200</Code> means success — you&apos;ll also meet <Code>404</Code> not found
        and <Code>500</Code> server error), some headers describing the response, and finally the actual content.
      </P>
      <P>
        <Code>HTTPS</Code> is the exact same conversation, wrapped inside an encryption layer called{" "}
        <Code>TLS</Code>. Without it, anyone sharing your network — café wifi, your ISP, a malicious actor on the
        same router — could read or silently tamper with every request and response in plain text, including
        passwords typed into forms. With HTTPS,{" "}
        <Highlight>the entire conversation is scrambled end-to-end</Highlight>, and a{" "}
        <Code>certificate</Code> — cryptographically verified by a trusted authority — proves the server really is
        who it claims to be, not an impostor intercepting your connection.
      </P>

      <H3>The same request, from JavaScript</H3>
      <CodeBlock
        lang="js"
        title="fetch example"
        code={`const response = await fetch("https://example.com/api/users");\nconst data = await response.json();\n\nconsole.log(response.status); // 200\nconsole.log(data);`}
      />

      <H2>8. Putting it all together — what happens when you hit Enter</H2>
      <P>Here is the entire journey, start to finish, with every concept above in its place:</P>
      <OL>
        <li>Browser checks its cache, then resolves the domain to an IP address via DNS.</li>
        <li>Browser opens a TCP connection to that IP address (the three-way handshake).</li>
        <li>
          If it&apos;s HTTPS, a TLS handshake happens right after — certificates get verified, encryption keys get
          agreed on, and only then does any real data get sent.
        </li>
        <li>Browser sends an HTTP request over that now-encrypted connection.</li>
        <li>
          The server processes the request — maybe querying a database, running some business logic — and sends
          back an HTTP response.
        </li>
        <li>
          The browser receives the HTML first, then discovers and requests every CSS file, script, image, and font
          it references — each one is its own full request/response cycle, and modern browsers run many of them in
          parallel to save time.
        </li>
        <li>
          The browser parses the HTML into the <Code>DOM</Code>, applies the CSS, executes the JavaScript, and
          finally paints pixels onto your screen.
        </li>
      </OL>
      <Callout tone="warning">
        All of that — DNS lookup, two separate handshakes, multiple round trips, dozens of parallel requests —
        typically finishes in well under a second. That&apos;s precisely why every extra millisecond of network
        latency compounds so heavily, and why performance-minded developers obsess over reducing round trips.
      </Callout>

      <H2>9. Advanced: making all of this fast at global scale</H2>
      <UL>
        <li>
          <Code>CDNs</Code> (Content Delivery Networks) — copies of a site&apos;s static files (images, CSS, JS) are
          stored on servers physically distributed close to users worldwide, so the data has a much shorter physical
          distance to travel.
        </li>
        <li>
          <Code>Load balancers</Code> — sit in front of a fleet of servers and spread incoming requests across them,
          so no single machine gets overwhelmed and a failing server can be silently taken out of rotation.
        </li>
        <li>
          <Code>Caching</Code> — browsers, CDNs, and servers all keep copies of recent responses so repeat requests
          for unchanged content skip the full round trip entirely.
        </li>
      </UL>

      <H2>10. Why this matters when you&apos;re building things</H2>
      <P>
        This isn&apos;t just trivia — it directly explains things you&apos;ll run into as a developer. That mysterious{" "}
        <Code>CORS error</Code> in your console? It&apos;s the browser enforcing a security rule about which servers
        your JavaScript is allowed to talk to. The <Code>Network</Code> tab in DevTools? It&apos;s a literal
        timeline of every request/response cycle from this lesson, including how long DNS, TCP, and TLS each took.
        Slow page loads on mobile? Often it&apos;s extra round trips and handshakes adding up on a high-latency
        connection.{" "}
        <Highlight>
          Once you can see the request/response cycle in your head, debugging &quot;why is my app slow&quot; or
          &quot;why isn&apos;t this API call working&quot; stops being a guessing game.
        </Highlight>
      </P>

      <H3>See it yourself in one command</H3>
      <CodeBlock
        lang="bash"
        title="terminal"
        code={`curl -v https://example.com\n\n# -v (verbose) prints the DNS lookup, TCP connect, TLS handshake,\n# and the full request + response headers — the entire lesson in one command.`}
      />
    </div>
  );
}
