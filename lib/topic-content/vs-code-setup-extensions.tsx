import { CodeBlock } from "@/components/topic/code-block";
import { VsCodeShortcutsStudio } from "@/components/topic/phase0-playgrounds";
import { Callout, Code, H2, H3, Highlight, OL, P, UL } from "@/components/topic/prose";
import { InterviewQuestions } from "@/components/topic/interview-questions";

export default function VsCodeSetupExtensions() {
  return (
    <div>
      <P>
        A carpenter doesn&apos;t just own a hammer — they set up a whole workshop tuned to how they work. Your code
        editor deserves the same investment. VS Code, out of the box, is a decent plain text editor. Configured
        properly, it becomes an environment that catches your mistakes before you run the code, formats everything
        automatically, and lets you navigate a 10,000-file project without ever touching the mouse.
      </P>

      <VsCodeShortcutsStudio />

      <H2>1. The Command Palette — the one shortcut that unlocks everything</H2>
      <P>
        Press <Code>Ctrl+Shift+P</Code> (<Code>Cmd+Shift+P</Code> on Mac) right now. This is the{" "}
        <Code>Command Palette</Code>, and it is the single most important shortcut in the entire editor —{" "}
        <Highlight>
          every feature VS Code has, from changing themes to formatting a file to opening settings, is reachable by
          typing a few letters here
        </Highlight>
        . When you don&apos;t know a shortcut for something, this is always the answer.
      </P>

      <H2>2. Keyboard shortcuts worth memorizing immediately</H2>
      <UL>
        <li>
          <Code>Ctrl+P</Code> — quick-open any file by typing part of its name. This replaces the file tree for 95%
          of navigation once you know it.
        </li>
        <li>
          <Code>Ctrl+`</Code> — toggle the integrated terminal open and closed, right inside the editor.
        </li>
        <li>
          <Code>Ctrl+D</Code> — select the next occurrence of the word under your cursor, adding another cursor —
          press it repeatedly to rename several matches at once.
        </li>
        <li>
          <Code>Alt+Click</Code> (or <Code>Option+Click</Code>) — drop an extra cursor anywhere you click, for
          editing multiple unrelated lines simultaneously.
        </li>
        <li>
          <Code>Ctrl+/</Code> — comment or uncomment the current line or selection.
        </li>
        <li>
          <Code>F12</Code> — jump straight to where a function or variable is defined; <Code>Alt+←</Code> jumps back.
        </li>
        <li>
          <Code>Ctrl+Shift+F</Code> — search across every file in the project, not just the open one.
        </li>
      </UL>

      <H2>3. Extensions worth installing on day one</H2>
      <P>
        VS Code&apos;s real power comes from its extension ecosystem. A handful of extensions cover almost every
        frontend developer&apos;s daily needs:
      </P>
      <UL>
        <li>
          <Code>Prettier</Code> — automatically reformats your code to a consistent style on save. No more
          arguing about tabs vs spaces in code review.
        </li>
        <li>
          <Code>ESLint</Code> — flags bugs and bad patterns directly in your editor, before you even run the code.
        </li>
        <li>
          <Code>GitLens</Code> — shows who last changed each line and why, inline, without leaving the file — a
          superpower for understanding unfamiliar code.
        </li>
        <li>
          <Code>Error Lens</Code> — shows errors and warnings inline at the end of the line instead of only in a
          separate panel, so you can&apos;t miss them.
        </li>
        <li>
          <Code>Path Intellisense</Code> — autocompletes file paths as you type imports.
        </li>
        <li>
          <Code>Tailwind CSS IntelliSense</Code> — autocomplete, linting, and hover previews for Tailwind classes.
        </li>
        <li>
          <Code>Auto Rename Tag</Code> — renaming an opening HTML/JSX tag automatically renames its matching closing
          tag.
        </li>
      </UL>

      <H2>4. Settings — user vs workspace</H2>
      <P>
        <Code>User settings</Code> apply to every project you open on your machine. <Code>Workspace settings</Code>{" "}
        live in a <Code>.vscode/settings.json</Code> file inside a specific project and only apply there — perfect
        for enforcing a formatter or tab width the whole team shares, since that file can be committed to Git.
      </P>
      <CodeBlock
        lang="json"
        title=".vscode/settings.json"
        code={`{\n  "editor.formatOnSave": true,\n  "editor.defaultFormatter": "esbenp.prettier-vscode",\n  "editor.tabSize": 2,\n  "files.trimTrailingWhitespace": true\n}`}
      />
      <Callout>
        Committing a shared <Code>.vscode/settings.json</Code> means every teammate&apos;s editor behaves the same
        way automatically the moment they open the project — nobody has to remember to configure anything by hand.
      </Callout>

      <H2>5. The integrated terminal</H2>
      <P>
        VS Code ships with a full terminal built in (<Code>Ctrl+`</Code>), running whichever shell your system uses.
        You can run your dev server, git commands, and scripts without ever leaving the editor window, and it opens
        already positioned in your project&apos;s folder.
      </P>

      <H2>6. Debugging without console.log everywhere</H2>
      <P>
        VS Code has a real debugger built in: click to the left of a line number to set a <Code>breakpoint</Code>,
        run your app through VS Code&apos;s &quot;Run and Debug&quot; panel, and execution will pause exactly there —
        letting you inspect every variable&apos;s live value, step line by line, and see the full call stack, instead
        of guessing from scattered <Code>console.log</Code> statements.
      </P>

      <H2>7. Advanced: developing inside a consistent environment</H2>
      <P>
        The <Code>Remote Development</Code> extension pack lets VS Code&apos;s interface run locally while the
        actual code executes somewhere else entirely — inside a Docker container, on a remote server over SSH, or
        inside Windows Subsystem for Linux. This solves the classic &quot;works on my machine&quot; problem: everyone
        on a team can develop inside the exact same containerized environment, regardless of what OS their laptop
        runs.
      </P>

      <H3>Try it yourself</H3>
      <OL>
        <li>Open the Command Palette and run &quot;Preferences: Open User Settings (JSON)&quot;.</li>
        <li>Install the Prettier extension, then enable <Code>editor.formatOnSave</Code>.</li>
        <li>
          Open any file, select a word, and press <Code>Ctrl+D</Code> a few times to see multi-cursor editing in
          action.
        </li>
      </OL>

      <InterviewQuestions questions={VSCODE_QUESTIONS} />
    </div>
  );
}

const VSCODE_QUESTIONS = [
  {
    question: "What is VS Code and how does its architecture differ from traditional heavy IDEs?",
    answer: "VS Code (Visual Studio Code) is a lightweight code editor built on Electron (Node.js + Chromium). Unlike heavy, monolithic IDEs (like Visual Studio or WebStorm) that bundle full compilers and tooling out of the box, VS Code starts lightweight and expands capabilities on demand via extensions and Language Server Protocol (LSP).",
    difficulty: "Basic" as const,
  },
  {
    question: "What is the Command Palette in VS Code and how do you open it?",
    answer: "The Command Palette is the central hub to access all VS Code commands, settings, and extension actions without touching the mouse. Open it using 'Ctrl+Shift+P' (Windows/Linux) or 'Cmd+Shift+P' (macOS).",
    difficulty: "Basic" as const,
  },
  {
    question: "What is the purpose of the .vscode/settings.json file in a project repository?",
    answer: "A workspace '.vscode/settings.json' file configures project-specific editor settings (e.g. format on save, tab width, linter rules). Committing it to Git ensures all team members share the exact same editor behavior automatically.",
    difficulty: "Intermediate" as const,
  },
  {
    question: "What is Prettier vs ESLint in a frontend VS Code workflow?",
    answer: "Prettier is an opinionated code FORMATTER (handles indentation, quotes, semicolons, line length). ESLint is a code LINTER (analyzes code for potential runtime bugs, unused variables, anti-patterns, and security flaws). They are typically used together.",
    difficulty: "Basic" as const,
  },
  {
    question: "How does Multi-Cursor editing work in VS Code?",
    answer: "Multi-cursor editing allows you to type simultaneously in multiple places. Highlight a word and press 'Ctrl+D' (or 'Cmd+D') to select the next matching instance, or hold 'Alt' (or 'Option') and click anywhere to place additional independent cursors.",
    difficulty: "Basic" as const,
  },
  {
    question: "What is the Language Server Protocol (LSP)?",
    answer: "LSP is an open protocol created by Microsoft that standardizes communication between code editors (like VS Code) and language smart engines (like TypeScript or Python). It provides autocomplete, go-to-definition, and refactoring without editor-specific extensions for every language.",
    difficulty: "Advanced" as const,
  },
  {
    question: "How do Breakpoints work in VS Code built-in Debugger?",
    answer: "Breakpoints allow you to pause JavaScript/TypeScript execution at a specific line of code during runtime. When paused, you can step through execution line by line ('Step Over', 'Step Into'), inspect active scope variables, evaluate expressions in the Debug Console, and view the call stack.",
    difficulty: "Intermediate" as const,
  },
  {
    question: "What is Dev Containers extension in VS Code?",
    answer: "The Dev Containers extension allows you to use a Docker container as your full development environment. It configures tools, Node.js versions, and extensions inside a container, ensuring developers on Windows, macOS, or Linux develop in an identical environment.",
    difficulty: "Advanced" as const,
  },
  {
    question: "What is the difference between workspace settings and user settings in VS Code?",
    answer: "User settings apply globally across all projects opened by your account. Workspace settings apply only to the specific open project folder and override global user settings.",
    difficulty: "Basic" as const,
  },
  {
    question: "What is Emmet and how does it speed up HTML writing in VS Code?",
    answer: "Emmet is a built-in expansion toolkit. It allows writing CSS-like shorthand abbreviations (e.g. 'div.container>ul>li*3') and pressing 'Tab' to instantly expand them into full HTML markup structures.",
    difficulty: "Basic" as const,
  },
];
