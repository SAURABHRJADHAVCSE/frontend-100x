"use client";

import { useState } from "react";
import { Terminal, Globe, GitBranch, GitPullRequest, Code, Search, Send, Play, Folder, File, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

/** 1. Internet Simulator */
export function InternetSimulator() {
  const [domain, setDomain] = useState("developer.mozilla.org");
  const [step, setStep] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const steps = [
    { title: "Browser Cache Check", desc: "Checking local browser cache for cached response..." },
    { title: "DNS Lookup", desc: "Resolving domain name to IP address 104.16.249.249 via Root & TLD servers..." },
    { title: "TCP / TLS Handshake", desc: "Establishing secure HTTPS connection (SYN -> SYN-ACK -> ACK)..." },
    { title: "HTTP Request Sent", desc: "Sending GET /en-US/docs/Web/HTML HTTP/1.1 request..." },
    { title: "200 OK Response Received", desc: "Server streams back HTML document payload (Content-Type: text/html)!" },
  ];

  function handleSendRequest() {
    setLoading(true);
    setStep(1);
    const interval = setInterval(() => {
      setStep((prev) => {
        if (prev >= 5) {
          clearInterval(interval);
          setLoading(false);
          return 5;
        }
        return prev + 1;
      });
    }, 900);
  }

  return (
    <div className="my-8 rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <h4 className="flex items-center gap-2 font-heading text-sm font-semibold text-foreground">
          <Globe className="size-4 text-primary" /> Interactive HTTP Request & DNS Packet Flow Simulator
        </h4>
        <span className="rounded bg-primary/10 px-2 py-0.5 font-mono text-xs font-medium text-primary">
          Network Simulator
        </span>
      </div>

      <div className="mt-4 space-y-4 text-xs">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <span className="absolute left-3 top-2.5 font-mono text-muted-foreground text-xs">https://</span>
            <input
              type="text"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className="w-full rounded-md border border-input bg-background pl-16 pr-3 py-2 font-mono text-xs text-foreground focus:ring-2 focus:ring-primary"
            />
          </div>
          <Button size="sm" onClick={handleSendRequest} disabled={loading}>
            <Send className="mr-1 size-3.5" /> {loading ? "Tracing..." : "Send Request"}
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-2 md:grid-cols-5">
          {steps.map((s, idx) => {
            const stepNum = idx + 1;
            const isActive = step >= stepNum;
            const isCurrent = step === stepNum;
            return (
              <div
                key={s.title}
                className={`rounded-lg border p-3 transition-all ${
                  isCurrent
                    ? "border-primary bg-primary/10 ring-2 ring-primary/30"
                    : isActive
                    ? "border-emerald-500/50 bg-emerald-500/10"
                    : "border-border bg-muted/20 opacity-50"
                }`}
              >
                <div className="font-mono text-[10px] font-bold text-muted-foreground uppercase mb-1">
                  Step {stepNum}
                </div>
                <div className="font-bold font-heading text-foreground mb-1">{s.title}</div>
                <div className="text-[11px] text-muted-foreground">{s.desc}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/** 2. Terminal Simulator */
export function TerminalSimulator() {
  const [history, setHistory] = useState<Array<{ cmd: string; output: string }>>([
    { cmd: "pwd", output: "/users/student/frontend-project" },
    { cmd: "ls", output: "index.html  style.css  app.js  package.json" },
  ]);
  const [inputCmd, setInputCmd] = useState("");
  const [currentDir, setCurrentDir] = useState("/users/student/frontend-project");

  function handleCommand(e: React.FormEvent) {
    e.preventDefault();
    const raw = inputCmd.trim();
    if (!raw) return;

    let out = "";
    const parts = raw.split(" ");
    const command = parts[0].toLowerCase();

    if (command === "help") {
      out = "Available commands: pwd, ls, mkdir <dir>, cd <dir>, touch <file>, cat <file>, clear";
    } else if (command === "pwd") {
      out = currentDir;
    } else if (command === "ls") {
      out = "index.html  style.css  app.js  package.json  README.md";
    } else if (command === "mkdir") {
      out = `Created directory '${parts[1] || "new-folder"}'`;
    } else if (command === "touch") {
      out = `Created empty file '${parts[1] || "file.txt"}'`;
    } else if (command === "cd") {
      const dest = parts[1] || "~";
      setCurrentDir(dest === ".." ? "/users/student" : `${currentDir}/${dest}`);
      out = "";
    } else if (command === "cat") {
      out = parts[1] === "index.html" ? "<!DOCTYPE html>\n<html><body><h1>Hello World</h1></body></html>" : `Content of ${parts[1] || "file"}`;
    } else if (command === "clear") {
      setHistory([]);
      setInputCmd("");
      return;
    } else {
      out = `command not found: ${command}. Type 'help' for available commands.`;
    }

    setHistory((prev) => [...prev, { cmd: raw, output: out }]);
    setInputCmd("");
  }

  return (
    <div className="my-8 overflow-hidden rounded-xl border border-border bg-slate-950 font-mono shadow-md text-xs">
      <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900 px-4 py-2 text-slate-400">
        <div className="flex items-center gap-2">
          <div className="size-3 rounded-full bg-rose-500/80" />
          <div className="size-3 rounded-full bg-amber-500/80" />
          <div className="size-3 rounded-full bg-emerald-500/80" />
          <span className="ml-2 text-[11px]">bash — {currentDir}</span>
        </div>
        <span className="text-[10px] text-slate-500">Interactive Terminal</span>
      </div>

      <div className="p-4 space-y-3 min-h-[180px] max-h-[300px] overflow-y-auto text-slate-200">
        {history.map((h, i) => (
          <div key={i} className="space-y-1">
            <div className="flex items-center gap-2 text-slate-400">
              <span className="text-emerald-400">user@frontend</span>:<span className="text-blue-400">~</span>$ {h.cmd}
            </div>
            {h.output && <div className="pl-4 text-slate-300 whitespace-pre-wrap">{h.output}</div>}
          </div>
        ))}

        <form onSubmit={handleCommand} className="flex items-center gap-2 pt-1">
          <span className="text-emerald-400">user@frontend</span>:<span className="text-blue-400">~</span>${" "}
          <input
            type="text"
            value={inputCmd}
            onChange={(e) => setInputCmd(e.target.value)}
            placeholder="Type 'help', 'ls', 'pwd', 'mkdir src'..."
            className="flex-1 bg-transparent text-slate-100 outline-none placeholder:text-slate-600"
          />
        </form>
      </div>
    </div>
  );
}

/** 3. Git Visualizer Playground */
export function GitVisualizerPlayground() {
  const [stagedFiles, setStagedFiles] = useState<string[]>([]);
  const [commits, setCommits] = useState<Array<{ hash: string; msg: string }>>([
    { hash: "a1b2c3d", msg: "Initial commit" },
  ]);
  const [currentBranch, setCurrentBranch] = useState("main");

  function handleStage() {
    if (!stagedFiles.includes("index.html")) {
      setStagedFiles(["index.html", "style.css"]);
    }
  }

  function handleCommit() {
    if (stagedFiles.length === 0) return;
    const hash = Math.random().toString(16).substring(2, 9);
    setCommits((prev) => [...prev, { hash, msg: `Update ${stagedFiles.join(", ")}` }]);
    setStagedFiles([]);
  }

  return (
    <div className="my-8 rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <h4 className="flex items-center gap-2 font-heading text-sm font-semibold text-foreground">
          <GitBranch className="size-4 text-primary" /> Interactive Git Staging & Commit Tree Visualizer
        </h4>
        <span className="rounded bg-primary/10 px-2 py-0.5 font-mono text-xs font-medium text-primary">
          Git Simulator
        </span>
      </div>

      <div className="mt-4 space-y-4 text-xs">
        <div className="flex flex-wrap gap-2">
          <Button size="sm" onClick={handleStage} disabled={stagedFiles.length > 0}>
            git add . (Stage Changes)
          </Button>
          <Button size="sm" onClick={handleCommit} disabled={stagedFiles.length === 0}>
            git commit -m &quot;...&quot;
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setCurrentBranch(currentBranch === "main" ? "feature/nav" : "main")}
          >
            git checkout {currentBranch === "main" ? "feature/nav" : "main"}
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-border bg-muted/20 p-3">
            <div className="font-bold text-foreground mb-2 flex items-center justify-between">
              <span>Working Directory</span>
              <span className="text-[10px] text-muted-foreground">Unstaged</span>
            </div>
            <div className="space-y-1 font-mono text-[11px] text-amber-600 dark:text-amber-400">
              <div>M index.html</div>
              <div>M style.css</div>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-muted/20 p-3">
            <div className="font-bold text-foreground mb-2 flex items-center justify-between">
              <span>Staging Area</span>
              <span className="text-[10px] text-muted-foreground">Staged</span>
            </div>
            {stagedFiles.length > 0 ? (
              <div className="space-y-1 font-mono text-[11px] text-emerald-600 dark:text-emerald-400">
                {stagedFiles.map((f) => (
                  <div key={f}>+ {f}</div>
                ))}
              </div>
            ) : (
              <div className="text-[11px] text-muted-foreground italic">No staged files</div>
            )}
          </div>

          <div className="rounded-lg border border-border bg-muted/20 p-3">
            <div className="font-bold text-foreground mb-2 flex items-center justify-between">
              <span>Commit History ({currentBranch})</span>
              <span className="text-[10px] text-primary font-mono">{commits.length} Commits</span>
            </div>
            <div className="space-y-1.5 font-mono text-[11px]">
              {commits.map((c) => (
                <div key={c.hash} className="flex items-center gap-2">
                  <div className="size-2 rounded-full bg-primary" />
                  <span className="text-primary font-bold">{c.hash}</span>
                  <span className="text-foreground truncate">{c.msg}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** 4. GitHub Flow Playground */
export function GithubFlowPlayground() {
  const [prStatus, setPrStatus] = useState<"draft" | "open" | "merged">("open");

  return (
    <div className="my-8 rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <h4 className="flex items-center gap-2 font-heading text-sm font-semibold text-foreground">
          <GitPullRequest className="size-4 text-primary" /> Interactive GitHub Pull Request & Code Review Simulator
        </h4>
        <span className="rounded bg-primary/10 px-2 py-0.5 font-mono text-xs font-medium text-primary">
          GitHub Flow
        </span>
      </div>

      <div className="mt-4 space-y-4 text-xs">
        <div className="rounded-lg border border-border bg-muted/30 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GitPullRequest className={`size-4 ${prStatus === "merged" ? "text-purple-500" : "text-emerald-500"}`} />
              <span className="font-heading font-bold text-foreground text-sm">
                PR #42: Add responsive navigation bar
              </span>
            </div>
            <span
              className={`rounded-full px-2.5 py-0.5 font-mono text-[11px] font-medium uppercase ${
                prStatus === "merged"
                  ? "bg-purple-500/10 text-purple-600 dark:text-purple-400"
                  : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
              }`}
            >
              {prStatus}
            </span>
          </div>

          <div className="font-mono text-muted-foreground text-[11px]">
            feature/nav-bar -&gt; main (2 commits · 4 files changed)
          </div>

          <div className="flex gap-2 pt-2">
            <Button
              size="sm"
              disabled={prStatus === "merged"}
              onClick={() => setPrStatus("merged")}
            >
              {prStatus === "merged" ? "Merged into main" : "Squash & Merge PR"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

/** 5. VS Code Shortcuts Studio */
export function VsCodeShortcutsStudio() {
  const [activeTab, setActiveTab] = useState<"shortcuts" | "settings">("shortcuts");

  return (
    <div className="my-8 rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <h4 className="flex items-center gap-2 font-heading text-sm font-semibold text-foreground">
          <Code className="size-4 text-primary" /> VS Code Pro Shortcuts & Settings Studio
        </h4>
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => setActiveTab("shortcuts")}
            className={`rounded px-2.5 py-1 text-xs border ${
              activeTab === "shortcuts" ? "bg-primary text-primary-foreground border-primary" : "bg-muted border-border"
            }`}
          >
            Shortcuts
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("settings")}
            className={`rounded px-2.5 py-1 text-xs border ${
              activeTab === "settings" ? "bg-primary text-primary-foreground border-primary" : "bg-muted border-border"
            }`}
          >
            settings.json
          </button>
        </div>
      </div>

      <div className="mt-4 text-xs">
        {activeTab === "shortcuts" ? (
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <div className="flex justify-between items-center rounded border p-2 bg-muted/20">
              <span>Quick Open File</span>
              <kbd className="rounded bg-muted px-2 py-0.5 font-mono text-[10px] border">Ctrl + P</kbd>
            </div>
            <div className="flex justify-between items-center rounded border p-2 bg-muted/20">
              <span>Command Palette</span>
              <kbd className="rounded bg-muted px-2 py-0.5 font-mono text-[10px] border">Ctrl + Shift + P</kbd>
            </div>
            <div className="flex justify-between items-center rounded border p-2 bg-muted/20">
              <span>Duplicate Line Down</span>
              <kbd className="rounded bg-muted px-2 py-0.5 font-mono text-[10px] border">Shift + Alt + Down</kbd>
            </div>
            <div className="flex justify-between items-center rounded border p-2 bg-muted/20">
              <span>Toggle Integrated Terminal</span>
              <kbd className="rounded bg-muted px-2 py-0.5 font-mono text-[10px] border">Ctrl + `</kbd>
            </div>
          </div>
        ) : (
          <div className="rounded-lg bg-slate-950 p-4 font-mono text-slate-200 leading-relaxed text-[11px]">
            {`{\n  "editor.formatOnSave": true,\n  "editor.defaultFormatter": "esbenp.prettier-vscode",\n  "editor.bracketPairColorization.enabled": true\n}`}
          </div>
        )}
      </div>
    </div>
  );
}

/** 6. DevTools Inspector Playground */
export function DevtoolsInspectorPlayground() {
  const [activeTab, setActiveTab] = useState<"elements" | "console" | "network">("elements");

  return (
    <div className="my-8 rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <h4 className="flex items-center gap-2 font-heading text-sm font-semibold text-foreground">
          <Search className="size-4 text-primary" /> Browser DevTools Inspector Simulator
        </h4>
        <div className="flex gap-1 font-mono text-xs">
          {(["elements", "console", "network"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setActiveTab(t)}
              className={`rounded px-2.5 py-1 capitalize border ${
                activeTab === t ? "bg-primary text-primary-foreground border-primary" : "bg-muted border-border"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 text-xs font-mono">
        {activeTab === "elements" && (
          <div className="rounded-lg border bg-slate-950 p-4 text-slate-200 space-y-1">
            <div className="text-slate-400">&lt;!DOCTYPE html&gt;</div>
            <div>&lt;<span className="text-rose-400">html</span> lang=&quot;<span className="text-emerald-300">en</span>&quot;&gt;</div>
            <div className="pl-4">&lt;<span className="text-rose-400">body</span> class=&quot;<span className="text-emerald-300">bg-slate-900</span>&quot;&gt;</div>
            <div className="pl-8 text-amber-300">&lt;<span className="text-rose-400">h1</span>&gt;Main Heading&lt;/<span className="text-rose-400">h1</span>&gt;</div>
            <div className="pl-4">&lt;/<span className="text-rose-400">body</span>&gt;</div>
            <div>&lt;/<span className="text-rose-400">html</span>&gt;</div>
          </div>
        )}

        {activeTab === "console" && (
          <div className="rounded-lg border bg-slate-950 p-4 text-slate-200 space-y-2">
            <div className="text-emerald-400">&gt; console.log(&quot;DevTools Ready&quot;)</div>
            <div className="text-slate-300">DevTools Ready</div>
            <div className="text-blue-400">&gt; document.title</div>
            <div className="text-slate-300">&quot;Frontend Roadmap 2026&quot;</div>
          </div>
        )}

        {activeTab === "network" && (
          <div className="rounded-lg border bg-card p-3 space-y-2">
            <div className="grid grid-cols-4 font-bold border-b pb-1 text-muted-foreground text-[11px]">
              <span>Name</span>
              <span>Status</span>
              <span>Type</span>
              <span>Size</span>
            </div>
            <div className="grid grid-cols-4 text-[11px]">
              <span className="text-primary">index.html</span>
              <span className="text-emerald-600 font-bold">200 OK</span>
              <span>document</span>
              <span>1.2 KB</span>
            </div>
            <div className="grid grid-cols-4 text-[11px]">
              <span className="text-primary">styles.css</span>
              <span className="text-emerald-600 font-bold">200 OK</span>
              <span>stylesheet</span>
              <span>4.8 KB</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
