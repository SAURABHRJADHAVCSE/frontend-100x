import { CodeBlock } from "@/components/topic/code-block";
import { BranchGraphDiagram, StepFlowDiagram } from "@/components/topic/diagrams";
import { GitVisualizerPlayground } from "@/components/topic/phase0-playgrounds";
import { Callout, Code, H2, H3, Highlight, OL, P, UL } from "@/components/topic/prose";
import { InterviewQuestions } from "@/components/topic/interview-questions";

const GIT_QUESTIONS = [
  {
    question: "What is Git and how does it differ from a centralized VCS like SVN?",
    answer: "Git is a Distributed Version Control System (DVCS). Unlike centralized VCS (like SVN) where developers rely on a single central server for project history, Git gives every developer a full copy of the entire repository and history locally. This enables offline work, faster operations, and safe branching.",
    difficulty: "Basic" as const,
  },
  {
    question: "Explain the three main states in Git: Working Directory, Staging Area, and Repository.",
    answer: "1. Working Directory: The local folder on your filesystem where you edit files.\n2. Staging Area (Index): A preview area where you stage specific modified files using 'git add' before committing.\n3. Repository (.git folder): The database containing all committed snapshots and version history permanently.",
    difficulty: "Basic" as const,
  },
  {
    question: "What is the difference between git reset and git revert?",
    answer: "'git reset' rewrites history by moving the HEAD pointer back to an earlier commit (dangerous if shared on remote). 'git revert' creates a NEW commit that undoes the changes of a previous commit without deleting history, making it safe for public/shared branches.",
    difficulty: "Intermediate" as const,
  },
  {
    question: "What is the difference between git merge and git rebase?",
    answer: "'git merge' combines two branches by creating a new 'merge commit', preserving the true chronological history of both branches. 'git rebase' rewrites history by moving/replaying your feature branch commits onto the tip of the target branch, creating a clean, linear history.",
    difficulty: "Intermediate" as const,
  },
  {
    question: "What is a merge conflict and how do you resolve it?",
    answer: "A merge conflict occurs when Git cannot automatically reconcile different changes made to the same lines of a file in two merging branches. To resolve it:\n1. Open conflicting files containing '<<<<<<<', '=======', '>>>>>>>'.\n2. Edit the file to keep desired code.\n3. Run 'git add <file>' to mark as resolved.\n4. Complete with 'git commit'.",
    difficulty: "Basic" as const,
  },
  {
    question: "What does git stash do and when would you use it?",
    answer: "'git stash' temporarily saves ('shelves') your dirty uncommitted working directory changes into a stack without committing, giving you a clean working copy. Use it when you need to switch branches urgently to fix a bug before finishing your current task. Run 'git stash pop' to restore your changes later.",
    difficulty: "Intermediate" as const,
  },
  {
    question: "What is HEAD in Git?",
    answer: "HEAD is a pointer that references the currently active checkout commit/branch in your working directory. Usually, HEAD points to the tip of your current branch (e.g., 'refs/heads/main'). In a 'detached HEAD' state, HEAD points directly to a specific commit hash rather than a branch name.",
    difficulty: "Intermediate" as const,
  },
  {
    question: "What is git cherry-pick?",
    answer: "'git cherry-pick <commit-hash>' applies the exact changes introduced by a specific existing commit from another branch onto your current branch as a new commit, without merging the whole branch.",
    difficulty: "Advanced" as const,
  },
  {
    question: "What is .gitignore and why is it essential?",
    answer: ".gitignore is a text file that tells Git which files or directories to intentionally ignore and exclude from version tracking. It prevents committing large dependency folders ('node_modules/'), environment secrets ('.env'), build outputs ('dist/'), and OS cache ('.DS_Store').",
    difficulty: "Basic" as const,
  },
  {
    question: "How does git reflog work and how can it save your code?",
    answer: "Git reflog (Reference Log) tracks every single update made to the HEAD pointer in your local repository (including deleted commits, resets, or lost rebase states). Even if you accidentally run 'git reset --hard', you can use 'git reflog' to find the lost commit hash and restore it with 'git reset --hard <hash>'.",
    difficulty: "Advanced" as const,
  },
];

export default function GitFundamentals() {
  return (
    <div>
      <P>
        Imagine writing an essay where you could jump back to any previous draft instantly, see exactly what changed
        between any two drafts, and let five people edit different sections at once without ever overwriting each
        other&apos;s work. That&apos;s what Git gives you for code. It&apos;s not a backup tool, and it&apos;s not
        GitHub — Git is a program that runs entirely on your own machine and quietly remembers every version of your
        project you&apos;ve ever told it to remember.
      </P>

      <GitVisualizerPlayground />

      <H2>1. The problem Git actually solves</H2>
      <P>
        Before version control, developers really did save files as <Code>app-final.js</Code>,{" "}
        <Code>app-final-v2.js</Code>, <Code>app-final-ACTUALLY-final.js</Code>. That approach falls apart the moment
        more than one person touches the project, or you need to know <em>why</em> a line changed six months ago.
        Git replaces all of that with a single source of truth: a complete, searchable history of every change,
        who made it, when, and why — plus the ability to safely experiment on a copy without touching the working
        version at all.
      </P>

      <H2>2. The four places your code can live</H2>
      <P>
        The single biggest thing that confuses beginners is not realizing a file exists in up to four different
        &quot;states&quot; at once. Understanding this map removes 90% of Git confusion instantly.
      </P>
      <StepFlowDiagram
        caption="git add moves changes to staging; git commit saves them to history; git push/pull sync with a remote."
        steps={[
          { label: "Working directory", sub: "the files on your disk" },
          { label: "Staging area", sub: "changes marked 'ready'" },
          { label: "Local repository", sub: "saved commits (history)" },
          { label: "Remote repository", sub: "e.g. GitHub" },
        ]}
      />
      <CodeBlock
        lang="bash"
        title="terminal"
        code={`git status              # see what's changed and where it currently sits\ngit add file.js         # working directory -> staging area\ngit commit -m "message" # staging area -> local repository (a permanent snapshot)\ngit push                # local repository -> remote repository`}
      />
      <Callout>
        <Code>git add</Code> lets you choose <em>exactly</em> which changes go into the next commit — you can edit
        five files but only stage and commit two of them. This is intentional and extremely useful once you&apos;re
        used to it: it lets you build clean, focused commits instead of one giant messy one.
      </Callout>

      <H2>3. Commits: Git&apos;s core unit of history</H2>
      <P>
        Here&apos;s the single most important mental model shift:{" "}
        <Highlight>a commit is a full snapshot of your entire project at that moment, not just a diff.</Highlight> Git
        is smart enough to store this efficiently (unchanged files aren&apos;t duplicated), but conceptually, every
        commit is a complete, independent photograph you can jump back to at any time. Each commit gets a unique ID
        (a long hash like <Code>a3f9c2e</Code>) and records the author, timestamp, message, and exactly which
        snapshot came before it.
      </P>
      <CodeBlock
        lang="bash"
        title="terminal"
        code={`git log                 # see the full commit history\ngit log --oneline       # a compact one-line-per-commit view\ngit show a3f9c2e         # see exactly what changed in one specific commit`}
      />
      <H3>Writing good commit messages</H3>
      <P>
        A commit message is a note to your future self and every teammate who runs <Code>git blame</Code> on that
        line in a year. <Code>fix stuff</Code> tells them nothing. <Code>fix null pointer when cart is empty</Code>{" "}
        tells them exactly what problem existed and what changed.
      </P>

      <H2>4. Branches — parallel timelines for your code</H2>
      <P>
        A <Code>branch</Code> is just a movable pointer to a commit — creating one is instant and costs nothing. This
        is what makes Git branching so powerful compared to older systems: you can spin off a branch to try something
        risky, and if it doesn&apos;t work out, delete it with zero consequences to <Code>main</Code>.
      </P>
      <BranchGraphDiagram />
      <CodeBlock
        lang="bash"
        title="terminal"
        code={`git branch                     # list all local branches\ngit switch -c feature/navbar   # create AND switch to a new branch in one step\ngit switch main                # switch back to the main branch\ngit branch -d feature/navbar   # delete a branch once you're done with it`}
      />
      <Callout>
        Older tutorials use <Code>git checkout -b feature/navbar</Code> — it does the same thing.{" "}
        <Code>git switch</Code> is the newer, clearer command introduced specifically to stop overloading{" "}
        <Code>checkout</Code>, which used to also handle restoring files.
      </Callout>

      <H2>5. Merging — bringing branches back together</H2>
      <P>
        Once your feature branch is ready, <Code>git merge</Code> replays its commits back onto the target branch. If
        the two branches changed completely different parts of the code, Git merges them automatically. If they both
        touched the exact same lines, Git can&apos;t guess which version is correct — it pauses and asks you to
        resolve the <Code>merge conflict</Code> by hand.
      </P>
      <CodeBlock
        lang="text"
        title="what a conflict looks like inside the file"
        code={`<<<<<<< HEAD\nconst cartTotal = price * quantity;\n=======\nconst cartTotal = (price * quantity).toFixed(2);\n>>>>>>> feature/navbar`}
      />
      <P>
        Everything between <Code>{"<<<<<<<"}</Code> and <Code>{"======="}</Code> is your current branch&apos;s
        version; everything below down to <Code>{">>>>>>>"}</Code> is the incoming branch&apos;s version. You edit
        the file to keep whichever code is correct (or a combination), delete those marker lines, then{" "}
        <Code>git add</Code> the file and commit to finish the merge.
      </P>

      <H2>6. Remotes — syncing with a server</H2>
      <UL>
        <li>
          <Code>git clone &lt;url&gt;</Code> — download a full copy of a remote repository, including its entire
          history, onto your machine.
        </li>
        <li>
          <Code>git push</Code> — upload your local commits to the remote so others can see them.
        </li>
        <li>
          <Code>git fetch</Code> — download the remote&apos;s latest commits without touching your own working files.
        </li>
        <li>
          <Code>git pull</Code> — a shortcut for <Code>git fetch</Code> immediately followed by merging those
          changes into your current branch.
        </li>
      </UL>
      <Callout>
        <Highlight>
          git fetch is the safe one — it only downloads and never changes your files, which is why experienced
          developers reach for it constantly to see what&apos;s new before deciding whether to merge it in.
        </Highlight>
      </Callout>

      <H2>7. Undoing things — Git&apos;s safety net</H2>
      <CodeBlock
        lang="bash"
        title="terminal"
        code={`git restore file.js          # discard uncommitted changes to a file, back to the last commit\ngit reset --soft HEAD~1      # undo the last commit, keep the changes staged\ngit reset --hard HEAD~1      # undo the last commit AND permanently discard the changes\ngit revert a3f9c2e            # make a NEW commit that undoes an old one — safe for shared history`}
      />
      <Callout tone="warning">
        <Code>git reset --hard</Code> permanently deletes uncommitted work with no undo — treat it exactly like{" "}
        <Code>rm -rf</Code>. When you need to undo something that&apos;s already been pushed and shared with others,
        prefer <Code>git revert</Code>: it adds a new commit instead of rewriting history, so nobody else&apos;s
        copy of the repository breaks.
      </Callout>

      <H2>8. Ignoring files you don&apos;t want tracked</H2>
      <P>
        A <Code>.gitignore</Code> file tells Git which files or folders to never track — build output, dependency
        folders, secrets, OS-generated clutter.
      </P>
      <CodeBlock lang="text" title=".gitignore" code={`node_modules/\n.env\ndist/\n.DS_Store`} />

      <H2>9. Advanced: rebase, stash, and cherry-pick</H2>
      <UL>
        <li>
          <Code>git rebase main</Code> — replays your branch&apos;s commits on top of the latest <Code>main</Code>,
          producing a clean, linear history instead of merge&apos;s extra &quot;merge commit&quot; — powerful, but
          rewrites commit history, so avoid it on branches other people are also working on.
        </li>
        <li>
          <Code>git stash</Code> — temporarily shelves uncommitted changes so you can switch branches with a clean
          working directory, then <Code>git stash pop</Code> brings them back later.
        </li>
        <li>
          <Code>git cherry-pick a3f9c2e</Code> — copies one specific commit from another branch onto your current
          one, without merging everything else.
        </li>
      </UL>

      <H3>Try it yourself</H3>
      <OL>
        <li>Run <Code>git init</Code> inside a new folder to start tracking it.</li>
        <li>
          Create a file, then run <Code>git add .</Code> followed by{" "}
          <Code>git commit -m &quot;first commit&quot;</Code>.
        </li>
        <li>Run <Code>git log --oneline</Code> and see your first entry in the project&apos;s history.</li>
      </OL>

      <InterviewQuestions questions={GIT_QUESTIONS} />
    </div>
  );
}
