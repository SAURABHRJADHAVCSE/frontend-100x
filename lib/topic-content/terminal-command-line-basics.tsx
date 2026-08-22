import { CodeBlock } from "@/components/topic/code-block";
import { CommandAnatomyDiagram, ShellStackDiagram } from "@/components/topic/diagrams";
import { Callout, Code, H2, H3, OL, P, UL } from "@/components/topic/prose";

export default function TerminalCommandLineBasics() {
  return (
    <div>
      <P>
        The terminal is just a text-based way to talk to your computer instead of clicking icons. Every click you do
        in a file explorer — open a folder, rename a file, run a program — has an equivalent command you can type
        instead. It looks intimidating at first, but it&apos;s really just a handful of short commands you&apos;ll
        use over and over.
      </P>

      <H2>1. Terminal vs shell vs command line — what&apos;s the difference?</H2>
      <UL>
        <li>
          <Code>Terminal</Code> — the app/window you open (Terminal.app, Windows Terminal, iTerm2). It&apos;s just the
          window that displays text.
        </li>
        <li>
          <Code>Shell</Code> — the actual program running inside that window that reads your commands and executes
          them (<Code>bash</Code>, <Code>zsh</Code>, <Code>PowerShell</Code>).
        </li>
        <li>
          <Code>Command line / CLI</Code> — the general term for typing text commands instead of using a GUI.
        </li>
      </UL>
      <ShellStackDiagram />

      <H2>2. Finding your way around — the filesystem</H2>
      <P>
        Every file and folder on your computer lives somewhere in one big tree, starting from a root. Three commands
        get you 90% of the way there:
      </P>
      <CodeBlock
        lang="bash"
        title="terminal"
        code={`pwd          # print working directory — "where am I right now?"\nls           # list what's in the current folder\ncd Desktop   # change directory — move into "Desktop"\ncd ..        # move up one folder\ncd ~         # jump straight to your home folder\ncd /         # jump to the very root of the filesystem`}
      />
      <Callout>
        <Code>.</Code> means &quot;this folder&quot;, <Code>..</Code> means &quot;the parent folder&quot;, and{" "}
        <Code>~</Code> means &quot;my home folder&quot;. You&apos;ll type these constantly.
      </Callout>

      <H3>Absolute vs relative paths</H3>
      <P>
        An <Code>absolute path</Code> starts from the root and always points to the same place, no matter where you
        currently are: <Code>/Users/alex/projects/app</Code>. A <Code>relative path</Code> is written from wherever
        you currently are: <Code>../projects/app</Code>. Relative paths are shorter but only make sense from a
        specific starting folder.
      </P>

      <H2>3. Creating, viewing, and removing things</H2>
      <CodeBlock
        lang="bash"
        title="terminal"
        code={`mkdir notes           # create a new folder called "notes"\ntouch todo.txt        # create a new empty file\ncat todo.txt          # print a file's contents to the screen\nless todo.txt         # view a long file one page at a time (q to quit)\ncp todo.txt done.txt  # copy a file\nmv todo.txt notes/    # move (or rename) a file\nrm done.txt           # delete a file — no trash bin, be careful\nrm -r notes           # delete a folder and everything inside it`}
      />
      <Callout tone="warning">
        <Code>rm</Code> does not send things to a recycle bin — it deletes immediately and permanently. Double-check
        the path before pressing enter, especially with <Code>rm -r</Code>.
      </Callout>

      <H2>4. Anatomy of a command</H2>
      <P>
        Almost every command follows the same shape: the command itself, optional <Code>flags</Code> (also called
        options) that change its behavior, and optional <Code>arguments</Code> that tell it what to act on.
      </P>
      <CommandAnatomyDiagram />
      <P>
        Flags usually come in a short form (<Code>-l</Code>) and a long form (<Code>--long</Code>) that do the same
        thing — long form is easier to read, short form is faster to type. You can usually combine short flags:{" "}
        <Code>ls -la</Code> is the same as <Code>ls -l -a</Code>.
      </P>

      <H2>5. Piping and redirection — chaining commands together</H2>
      <P>
        The real power of the terminal is connecting simple commands together. A <Code>pipe</Code> (<Code>|</Code>)
        sends the output of one command as the input to the next. <Code>Redirection</Code> (<Code>&gt;</Code>) sends
        output into a file instead of the screen.
      </P>
      <CodeBlock
        lang="bash"
        title="terminal"
        code={`ls -la | grep ".txt"      # list files, then filter for only ones containing ".txt"\nhistory | tail -5         # show your last 5 commands\n\necho "hello" > file.txt   # write "hello" into file.txt (overwrites it)\necho "again" >> file.txt  # append "again" to the end of file.txt\nsort names.txt > sorted.txt   # sort a file's lines and save the result`}
      />

      <H2>6. Environment variables & PATH</H2>
      <P>
        An <Code>environment variable</Code> is a named value the shell and programs can read — like global settings
        for your terminal session. The most important one is <Code>PATH</Code>: a list of folders the shell searches
        through whenever you type a command name, to find the actual program to run.
      </P>
      <CodeBlock
        lang="bash"
        title="terminal"
        code={`echo $PATH        # see the list of folders the shell searches for commands\nwhich node        # show exactly which file runs when you type "node"\nexport EDITOR=code   # set an environment variable for this session`}
      />
      <Callout>
        This is why installing a tool sometimes requires &quot;restarting your terminal&quot; — the new program was
        added to a folder, but the shell needs to reload <Code>PATH</Code> to know about it.
      </Callout>

      <H2>7. Permissions (a first look)</H2>
      <P>
        Every file has permissions controlling who can read, write, or execute it. Running <Code>ls -l</Code> shows
        them as a 10-character string like <Code>-rwxr-xr--</Code>:
      </P>
      <CodeBlock
        lang="text"
        title="reading -rwxr-xr--"
        code={`-   rwx        r-x        r--\ntype  owner      group      everyone\n\nr = read, w = write, x = execute — one group of 3 for each of: owner / group / everyone else`}
      />
      <CodeBlock
        lang="bash"
        title="terminal"
        code={`chmod +x script.sh     # make a file executable\nchmod 644 file.txt     # set exact permissions (owner: read/write, others: read-only)`}
      />

      <H2>8. Advanced: running scripts & background jobs</H2>
      <UL>
        <li>
          <Code>./script.sh</Code> runs a script file in the current folder (it needs execute permission first).
        </li>
        <li>
          <Code>Ctrl + C</Code> stops whatever command is currently running.
        </li>
        <li>
          Adding <Code>&amp;</Code> after a command runs it in the background, freeing up your terminal:{" "}
          <Code>npm run dev &amp;</Code>
        </li>
        <li>
          <Code>Tab</Code> auto-completes file and folder names — use it constantly, it prevents typos.
        </li>
      </UL>

      <H3>Try it yourself</H3>
      <OL>
        <li>Open a terminal and run <Code>pwd</Code> to see where you are.</li>
        <li>Run <Code>mkdir playground &amp;&amp; cd playground</Code> to create and enter a new folder.</li>
        <li>
          Run <Code>touch a.txt b.txt &amp;&amp; ls -l</Code> and read the permissions column for each file.
        </li>
      </OL>
    </div>
  );
}
