import { CodeBlock } from "@/components/topic/code-block";
import { CommandAnatomyDiagram, ShellStackDiagram } from "@/components/topic/diagrams";
import { Callout, Code, H2, H3, Highlight, OL, P, UL } from "@/components/topic/prose";

export default function TerminalCommandLineBasics() {
  return (
    <div>
      <P>
        A graphical interface is an automatic transmission car: comfortable, forgiving, hides the mechanics from you.
        The terminal is a manual transmission: a little intimidating at first, but it gives you direct, precise
        control over the machine — and it&apos;s dramatically faster once your hands learn it. Every click you make
        in a file explorer has an equivalent command you can type instead, and typing it is almost always quicker,
        more repeatable, and scriptable. This is why every professional developer, sysadmin, and data scientist ends
        up living in a terminal window.
      </P>

      <H2>1. Terminal vs shell vs command line — three words, three different things</H2>
      <UL>
        <li>
          <Code>Terminal</Code> — the app/window you open (Terminal.app, Windows Terminal, iTerm2). It&apos;s purely
          the display: it draws text on screen and captures your keystrokes. It does no thinking of its own.
        </li>
        <li>
          <Code>Shell</Code> — the actual program running inside that window that reads what you type, interprets
          it, and executes it (<Code>bash</Code>, <Code>zsh</Code>, <Code>PowerShell</Code>). This is where the real
          logic lives.
        </li>
        <li>
          <Code>Command line / CLI</Code> — the general term for the whole style of interacting with a computer via
          typed text instead of a mouse.
        </li>
      </UL>
      <ShellStackDiagram />
      <Callout>
        This is why switching from <Code>bash</Code> to <Code>zsh</Code> feels different even though you&apos;re
        still using the exact same terminal app — you changed the interpreter, not the window.
      </Callout>

      <H2>2. Finding your way around — the filesystem</H2>
      <P>
        Every file and folder on your computer lives in one giant tree structure starting from a single root. Three
        commands get you moving through it:
      </P>
      <CodeBlock
        lang="bash"
        title="terminal"
        code={`pwd          # print working directory — "where am I right now?"\nls           # list what's in the current folder\ncd Desktop   # change directory — step into "Desktop"\ncd ..        # step up one folder, toward the root\ncd ~         # jump straight to your home folder\ncd /         # jump to the very root of the entire filesystem\ncd -         # jump back to whichever folder you were just in`}
      />
      <Callout>
        <Code>.</Code> means &quot;this folder&quot;, <Code>..</Code> means &quot;the parent folder&quot;, and{" "}
        <Code>~</Code> means &quot;my home folder&quot;. These three symbols show up constantly in paths, and
        combining them is completely normal: <Code>../../assets</Code> means &quot;go up two levels, then into
        assets&quot;.
      </Callout>

      <H3>Absolute vs relative paths</H3>
      <P>
        An <Code>absolute path</Code> always starts from the root and always points to the exact same place no
        matter where you currently are — like a full postal address: <Code>/Users/alex/projects/app</Code>. A{" "}
        <Code>relative path</Code> is written from wherever you&apos;re currently standing —{" "}
        <Code>../projects/app</Code> only means something once you know your starting point. Scripts and config
        files almost always prefer relative paths so they still work when the whole project folder gets moved or
        cloned onto a different machine.
      </P>

      <H2>3. Creating, viewing, and removing things</H2>
      <CodeBlock
        lang="bash"
        title="terminal"
        code={`mkdir notes           # create a new folder called "notes"\nmkdir -p a/b/c        # create nested folders in one shot, even if "a" and "b" don't exist yet\ntouch todo.txt        # create a new empty file (or update its timestamp if it exists)\ncat todo.txt          # dump a file's full contents to the screen\nless todo.txt         # view a long file one page at a time (arrow keys to scroll, q to quit)\ncp todo.txt done.txt  # copy a file\ncp -r src/ backup/    # copy an entire folder and everything inside it\nmv todo.txt notes/    # move a file into a folder (or rename it, in the same folder)\nrm done.txt           # delete a file — no recycle bin, no undo\nrm -r notes           # delete a folder and everything inside it, recursively`}
      />
      <Callout tone="warning">
        <Highlight>
          <Code>rm</Code> does not move things to a trash bin — it deletes immediately and permanently, no
          confirmation dialog.
        </Highlight>{" "}
        The command <Code>rm -rf /</Code> (delete everything, forcibly, from the root) has wiped out more machines
        than any virus. Always double-check the path — especially the current folder — before pressing enter on any{" "}
        <Code>rm -r</Code> command.
      </Callout>

      <H2>4. Anatomy of a command</H2>
      <P>
        Almost every command you&apos;ll ever type follows the same shape: the command itself, optional{" "}
        <Code>flags</Code> (also called options) that change its behavior, and optional <Code>arguments</Code> that
        tell it what to act on.
      </P>
      <CommandAnatomyDiagram />
      <P>
        Flags come in a short form (<Code>-l</Code>) and often a long, more readable form that does the same thing (
        <Code>--all</Code>) — short form is faster to type, long form is easier to remember and read back later in a
        script. Short flags can usually be combined: <Code>ls -la</Code> is shorthand for <Code>ls -l -a</Code>.
        Whenever you&apos;re unsure what a command&apos;s flags do, run <Code>man ls</Code> or <Code>ls --help</Code>{" "}
        — the manual is always one command away.
      </P>

      <H2>5. Piping and redirection — chaining tiny commands into powerful ones</H2>
      <P>
        This is where the terminal stops being &quot;a slower file explorer&quot; and becomes genuinely powerful.{" "}
        <Highlight>Unix philosophy says: write small commands that each do one thing well, then combine them.</Highlight>{" "}
        A{" "}
        <Code>pipe</Code> (<Code>|</Code>) feeds the output of one command in as the input to the next, letting you
        build a mini assembly line out of simple parts. <Code>Redirection</Code> (<Code>&gt;</Code>) sends output
        into a file instead of the screen.
      </P>
      <CodeBlock
        lang="bash"
        title="terminal"
        code={`ls -la | grep ".txt"       # list files, then filter for only the ones containing ".txt"\nhistory | tail -5          # show your last 5 commands\ncat access.log | wc -l     # count how many lines are in a log file\n\necho "hello" > file.txt    # write "hello" into file.txt — this OVERWRITES the file\necho "again" >> file.txt   # append "again" to the end of file.txt, keeping what's already there\nsort names.txt > sorted.txt   # sort a file's lines and save the result into a new file`}
      />
      <Callout>
        Notice the pattern: nothing in that block is a complicated tool — <Code>grep</Code>,{" "}
        <Code>sort</Code>, and <Code>wc</Code> each do one small job. The power comes entirely from chaining them
        with <Code>|</Code>. This is the same mental model behind data pipelines in every language you&apos;ll ever
        learn.
      </Callout>

      <H2>6. Environment variables & PATH</H2>
      <P>
        An <Code>environment variable</Code> is a named value the shell and every program running inside it can
        read — think of it as global settings for your terminal session. The single most important one is{" "}
        <Code>PATH</Code>: an ordered list of folders the shell searches through, top to bottom, whenever you type a
        command name, looking for the actual program file to run.
      </P>
      <CodeBlock
        lang="bash"
        title="terminal"
        code={`echo $PATH          # see the list of folders the shell searches for commands\nwhich node          # show exactly which file runs when you type "node"\nexport EDITOR=code  # set an environment variable for the rest of this session`}
      />
      <Callout>
        This is exactly why installing a new tool sometimes requires &quot;restarting your terminal&quot; — the
        installer added a new folder to disk, but your currently-running shell already loaded its copy of{" "}
        <Code>PATH</Code> into memory and doesn&apos;t know to re-check it until it starts fresh.
      </Callout>

      <H2>7. Permissions — who&apos;s allowed to do what</H2>
      <P>
        Every file has permissions controlling who can read it, write to it, or execute it as a program. Running{" "}
        <Code>ls -l</Code> reveals them as a 10-character string like <Code>-rwxr-xr--</Code>, split into four
        groups:
      </P>
      <CodeBlock
        lang="text"
        title="reading -rwxr-xr--"
        code={`-   rwx        r-x        r--\ntype  owner      group      everyone\n\nr = read, w = write, x = execute — one group of 3 permissions for each of: owner / group / everyone else`}
      />
      <CodeBlock
        lang="bash"
        title="terminal"
        code={`chmod +x script.sh     # add execute permission — needed before you can run "./script.sh"\nchmod 644 file.txt     # set exact permissions: owner can read/write, everyone else read-only\nsudo mv a.txt /etc/    # "sudo" temporarily borrows admin privileges for one command`}
      />

      <H2>8. Advanced: job control & running things in the background</H2>
      <UL>
        <li>
          <Code>./script.sh</Code> runs a script sitting in the current folder — it needs execute permission first (
          <Code>chmod +x</Code>), and the <Code>./</Code> is required because, unlike <Code>PATH</Code> folders, the
          current folder is intentionally not searched automatically for security reasons.
        </li>
        <li>
          <Code>Ctrl + C</Code> interrupts and stops whatever is currently running in the foreground.
        </li>
        <li>
          Appending <Code>&amp;</Code> runs a command in the background and immediately hands your terminal back:{" "}
          <Code>npm run dev &amp;</Code>. Bring it back to the foreground later with <Code>fg</Code>, or list every
          background job with <Code>jobs</Code>.
        </li>
        <li>
          <Code>ps aux</Code> lists every running process on the machine; <Code>kill &lt;pid&gt;</Code> stops one by
          its process ID.
        </li>
      </UL>

      <H2>9. Working faster — the habits that separate beginners from power users</H2>
      <UL>
        <li>
          <Highlight>
            <Code>Tab</Code> auto-completes file names, folder names, and even flags.
          </Highlight>{" "}
          Press it constantly — it&apos;s both faster and prevents typo-related disasters.
        </li>
        <li>
          <Code>↑</Code> (up arrow) cycles back through your command history; <Code>Ctrl + R</Code> opens a reverse
          search so you can type a fragment of a past command and jump straight to it.
        </li>
        <li>
          <Code>Ctrl + A</Code> / <Code>Ctrl + E</Code> jump your cursor to the start / end of the line;{" "}
          <Code>Ctrl + U</Code> clears everything before the cursor — much faster than holding backspace.
        </li>
        <li>
          An <Code>alias</Code> gives a long command a short nickname, saved in your shell&apos;s config file (
          <Code>~/.zshrc</Code> or <Code>~/.bashrc</Code>): add <Code>alias gs=&quot;git status&quot;</Code> once,
          and <Code>gs</Code> works in every new terminal from then on.
        </li>
      </UL>

      <H3>Try it yourself</H3>
      <OL>
        <li>Open a terminal and run <Code>pwd</Code> to see exactly where you are.</li>
        <li>Run <Code>mkdir playground &amp;&amp; cd playground</Code> to create and enter a new folder in one line.</li>
        <li>
          Run <Code>touch a.txt b.txt &amp;&amp; ls -l</Code> and read the permissions column for each file you just
          created.
        </li>
        <li>
          Run <Code>{`echo "alias ll='ls -la'" >> ~/.zshrc`}</Code>, restart your terminal, then try your new{" "}
          <Code>ll</Code> shortcut.
        </li>
      </OL>
    </div>
  );
}
