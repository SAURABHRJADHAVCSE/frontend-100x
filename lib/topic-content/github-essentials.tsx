import { CodeBlock } from "@/components/topic/code-block";
import { StepFlowDiagram } from "@/components/topic/diagrams";
import { GithubFlowPlayground } from "@/components/topic/phase0-playgrounds";
import { Callout, Code, H2, H3, Highlight, OL, P } from "@/components/topic/prose";
import { InterviewQuestions } from "@/components/topic/interview-questions";

export default function GithubEssentials() {
  return (
    <div>
      <P>
        Git and GitHub get treated as one thing, but they aren&apos;t.{" "}
        <Highlight>Git is the version control tool that runs on your computer; GitHub is a company that hosts
        your Git repositories online and builds collaboration tools on top of them</Highlight> — pull requests,
        issues, code review, project boards, and automation. You could use Git your entire career without ever
        touching GitHub. But GitHub is where the software industry actually collaborates, so knowing it well is a
        career skill, not just a technical one.
      </P>

      <GithubFlowPlayground />

      <H2>1. A repository, hosted</H2>
      <P>
        A GitHub <Code>repository</Code> (or &quot;repo&quot;) is just your Git project, uploaded to GitHub&apos;s
        servers, with a web interface wrapped around it — a README rendered as a webpage, a file browser, a history
        viewer, and a place for other people to see, comment on, and contribute to your code.
      </P>
      <CodeBlock
        lang="bash"
        title="terminal"
        code={`git clone https://github.com/user/repo.git   # download a copy of someone's repo, including full history\ngit remote -v                                # see which remote URL "origin" points to\ngit push origin main                         # upload your local commits to that repo on GitHub`}
      />
      <Callout>
        <Code>origin</Code> is just a nickname — by convention, the name Git gives to the remote you cloned from. You
        can have multiple remotes with different names, which becomes important with forks (below).
      </Callout>

      <H3>HTTPS vs SSH</H3>
      <P>
        GitHub lets you authenticate two ways: <Code>HTTPS</Code> URLs prompt for a username/personal access token;{" "}
        <Code>SSH</Code> URLs use a cryptographic key pair set up once on your machine and never ask for a password
        again. Most professionals set up SSH once and never think about authentication again.
      </P>

      <H2>2. Forking vs cloning — the full contribution flow</H2>
      <P>
        <Code>Cloning</Code> downloads a copy of a repo you already have write access to. <Code>Forking</Code> is
        different: it creates your own personal copy of someone else&apos;s repository <em>on GitHub itself</em>,
        which you then clone and push to freely — this is how you contribute to a project you don&apos;t own.
      </P>
      <StepFlowDiagram
        caption="The standard open-source contribution flow — every step keeps the original project untouched until a maintainer approves your changes."
        steps={[
          { label: "Fork", sub: "your copy on GitHub" },
          { label: "Clone", sub: "download it locally" },
          { label: "Branch", sub: "isolate your change" },
          { label: "Push", sub: "upload to your fork" },
          { label: "Pull Request", sub: "propose the merge" },
        ]}
      />
      <CodeBlock
        lang="bash"
        title="terminal"
        code={`git clone https://github.com/YOU/repo.git\ncd repo\ngit remote add upstream https://github.com/ORIGINAL-OWNER/repo.git\n\n# keep your fork up to date with the original project:\ngit fetch upstream\ngit merge upstream/main`}
      />

      <H2>3. Pull requests — where real collaboration happens</H2>
      <P>
        A <Code>pull request</Code> (PR) is a formal request: &quot;here are my commits on this branch — please
        review them and merge them into yours.&quot; It shows a clean diff of every changed line, lets teammates
        leave inline comments on specific lines, request changes, approve, and run automated checks — all before a
        single line touches the main codebase.
      </P>
      <Callout>
        <Highlight>
          This review step is arguably GitHub&apos;s single biggest contribution to how modern software gets built —
          it turns &quot;one person&apos;s code&quot; into &quot;code the whole team has seen and agreed on&quot;
          before it ships.
        </Highlight>
      </Callout>
      <P>
        A healthy PR is small and focused — reviewers can meaningfully review 200 changed lines; nobody meaningfully
        reviews 4,000. Write a clear description of <em>what</em> changed and <em>why</em>, link the issue it
        addresses, and expect (and welcome) feedback — that&apos;s the entire point.
      </P>

      <H2>4. Issues — tracking bugs and work</H2>
      <P>
        An <Code>issue</Code> is a tracked to-do item, bug report, or feature request, with its own comment thread,
        labels (<Code>bug</Code>, <Code>enhancement</Code>, <Code>good first issue</Code>), assignees, and the
        ability to be linked to the pull request that eventually resolves it. Writing{" "}
        <Code>Closes #42</Code> in a PR description automatically closes issue #42 the moment that PR is merged.
      </P>

      <H2>5. Automating work with GitHub Actions</H2>
      <P>
        <Code>GitHub Actions</Code> runs scripts automatically in response to events in your repo — most commonly,
        running your test suite on every pull request so broken code can&apos;t merge unnoticed. A workflow is just
        a YAML file living in <Code>.github/workflows/</Code>.
      </P>
      <CodeBlock
        lang="yaml"
        title=".github/workflows/test.yml"
        code={`name: Run tests\non: [pull_request]\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: npm install\n      - run: npm test`}
      />

      <H2>6. GitHub Pages — free hosting straight from a repo</H2>
      <P>
        <Code>GitHub Pages</Code> can turn any repository&apos;s static files directly into a live website, for
        free, updating automatically every time you push — a common way to host documentation, portfolios, or small
        projects with zero separate hosting setup.
      </P>

      <H2>7. Why this matters for your career</H2>
      <P>
        Your GitHub profile is a public, verifiable record of real work — the contribution graph, the quality of
        your commit messages, how you write PR descriptions, and how you respond to code review feedback are all
        visible to anyone, including recruiters and hiring managers. Contributing even small fixes to open-source
        projects is one of the highest-signal things you can put on a resume, precisely because the entire process
        — your code, your discussion, your revisions — is public and checkable.
      </P>

      <H3>Try it yourself</H3>
      <OL>
        <li>Create a free GitHub account and make a new repository.</li>
        <li>Clone it locally, add a README.md, commit, and push it back.</li>
        <li>
          Find a small open-source project, fork it, make a tiny fix (even a typo in its docs), and open your first
          pull request.
        </li>
      </OL>

      <InterviewQuestions questions={GITHUB_QUESTIONS} />
    </div>
  );
}

const GITHUB_QUESTIONS = [
  {
    question: "What is GitHub and how does it differ from Git?",
    answer: "Git is an open-source command-line tool for local version control. GitHub is a cloud-based hosting service and platform built around Git that provides code collaboration, pull requests, issue tracking, CI/CD (GitHub Actions), and user permissions.",
    difficulty: "Basic" as const,
  },
  {
    question: "What is a Pull Request (PR) and how does the review process work?",
    answer: "A Pull Request is a request to merge code from a topic/feature branch into a target branch (like 'main'). It provides a diff view for team members to review code, leave comments, request changes, run automated CI checks, and finally approve and merge.",
    difficulty: "Basic" as const,
  },
  {
    question: "What is the difference between Forking and Branching on GitHub?",
    answer: "Branching creates an isolated pointer within the SAME repository (used for internal team collaboration). Forking creates a complete personal COPY of someone else's entire repository under your own GitHub account (used for open-source contributions without needing write access to the original repo).",
    difficulty: "Intermediate" as const,
  },
  {
    question: "What are GitHub Actions and what are they used for?",
    answer: "GitHub Actions is a built-in CI/CD (Continuous Integration & Continuous Deployment) platform that automates software workflows. It automatically runs tests, linters, builds, and deploys applications directly from GitHub upon events like 'git push' or opening a PR.",
    difficulty: "Intermediate" as const,
  },
  {
    question: "What is the difference between SSH keys and Personal Access Tokens (PAT) for GitHub authentication?",
    answer: "SSH keys use asymmetric cryptography (public/private keypair) configured once on your machine for frictionless Git pushes without typing passwords. Personal Access Tokens (PATs) act as granular passwords used for HTTPS Git operations or API integrations with expiration dates and specific scope permissions.",
    difficulty: "Intermediate" as const,
  },
  {
    question: "How do GitHub Issues and Projects help in Agile/Scrum development?",
    answer: "GitHub Issues track bugs, tasks, and feature requests. GitHub Projects provides Kanban boards and roadmaps where issues can be moved through columns ('To Do', 'In Progress', 'Done') for Agile sprint planning and team project tracking.",
    difficulty: "Basic" as const,
  },
  {
    question: "What is a protected branch in GitHub?",
    answer: "A protected branch enforces security rules on key branches (like 'main' or 'production'). Rules can require passing CI build checks, requiring 1+ code reviews from designated CODEOWNERS, and preventing force pushes ('git push --force') or branch deletion.",
    difficulty: "Advanced" as const,
  },
  {
    question: "What is squash merging vs standard merge on GitHub?",
    answer: "A standard merge preserves all individual commits from the feature branch. A squash merge combines ('squashes') all commits from a PR into a single clean commit on the target branch, keeping the main branch commit log tidy.",
    difficulty: "Intermediate" as const,
  },
  {
    question: "What is CODEOWNERS file in a GitHub repository?",
    answer: "A CODEOWNERS file defines individuals or teams responsible for specific files or directories in a repository. When a PR modifies those files, GitHub automatically assigns the specified code owners as required reviewers.",
    difficulty: "Advanced" as const,
  },
  {
    question: "How do GitHub Releases and Tags work?",
    answer: "Git tags create immutable markers at specific commits in history (e.g. 'v1.0.0'). GitHub Releases package those tags with release notes, changelogs, and compiled binary/zip assets for end-user distribution.",
    difficulty: "Basic" as const,
  },
];
