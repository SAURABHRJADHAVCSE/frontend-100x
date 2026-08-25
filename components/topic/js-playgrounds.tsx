"use client";

import { useState } from "react";
import { Sliders, Play, Code, Cpu, Database, Eye, Terminal, Zap, ShieldAlert, Clock, RefreshCw, Sparkles, Layers, Box, Globe, HardDrive } from "lucide-react";
import { Button } from "@/components/ui/button";

/** Helper function to safely evaluate code in browser playground environment */
function executePlaygroundJS(code: string): { output: string; logs: string[]; error: string | null } {
  const logs: string[] = [];
  const customConsole = {
    log: (...args: unknown[]) => {
      logs.push(args.map((a) => (typeof a === "object" ? JSON.stringify(a, null, 2) : String(a))).join(" "));
    },
    error: (...args: unknown[]) => {
      logs.push("[ERROR] " + args.map((a) => (typeof a === "object" ? JSON.stringify(a, null, 2) : String(a))).join(" "));
    },
    warn: (...args: unknown[]) => {
      logs.push("[WARN] " + args.map((a) => (typeof a === "object" ? JSON.stringify(a, null, 2) : String(a))).join(" "));
    },
  };

  try {
    const runner = new Function("console", code);
    const result = runner(customConsole);
    const lastOutput = result !== undefined ? (typeof result === "object" ? JSON.stringify(result, null, 2) : String(result)) : "";
    return { output: lastOutput, logs, error: null };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return { output: "", logs, error: errorMsg };
  }
}

/** 1. Variables & Data Types Playground */
export function VariablePlayground() {
  const [keyword, setKeyword] = useState<"let" | "const" | "var">("let");
  const [varName, setVarName] = useState("userScore");
  const [valRaw, setValRaw] = useState("100");

  let parsedType = "string";

  if (valRaw.trim() === "true" || valRaw.trim() === "false") {
    parsedType = "boolean";
  } else if (!isNaN(Number(valRaw)) && valRaw.trim() !== "") {
    parsedType = "number";
  } else if (valRaw.trim() === "null") {
    parsedType = "null (object bug in JS)";
  } else if (valRaw.trim() === "undefined") {
    parsedType = "undefined";
  } else if (valRaw.startsWith("[") && valRaw.endsWith("]")) {
    parsedType = "object (Array)";
  } else if (valRaw.startsWith("{") && valRaw.endsWith("}")) {
    parsedType = "object";
  }

  const isPrimitive = ["number", "string", "boolean", "null", "undefined"].some((t) => parsedType.includes(t));

  return (
    <div className="my-8 rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <h4 className="flex items-center gap-2 font-heading text-sm font-semibold text-foreground">
          <Cpu className="size-4 text-primary" /> Memory & Type Inspector Playground
        </h4>
        <span className="rounded bg-primary/10 px-2 py-0.5 font-mono text-xs font-medium text-primary">
          Live Memory Visualizer
        </span>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="space-y-4 text-xs">
          <div>
            <label className="mb-1 block font-medium text-foreground">Variable Keyword:</label>
            <div className="flex gap-2">
              {(["let", "const", "var"] as const).map((k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => setKeyword(k)}
                  className={`rounded px-3 py-1.5 font-mono text-xs border transition ${
                    keyword === k
                      ? "bg-primary text-primary-foreground border-primary font-bold"
                      : "bg-muted border-border hover:bg-accent"
                  }`}
                >
                  {k}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-1 block font-medium text-foreground">Variable Name:</label>
            <input
              type="text"
              value={varName}
              onChange={(e) => setVarName(e.target.value.replace(/[^a-zA-Z0-9_$]/g, ""))}
              className="w-full rounded border border-input bg-background px-3 py-1.5 font-mono text-xs text-foreground focus:ring-1 focus:ring-primary outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block font-medium text-foreground">Assigned Value:</label>
            <input
              type="text"
              value={valRaw}
              onChange={(e) => setValRaw(e.target.value)}
              placeholder="e.g. 100, 'hello', true, [1, 2], { a: 1 }"
              className="w-full rounded border border-input bg-background px-3 py-1.5 font-mono text-xs text-foreground focus:ring-1 focus:ring-primary outline-none"
            />
          </div>

          <div className="rounded-lg bg-muted/60 p-3 font-mono text-[11px] space-y-1">
            <div>Generated JS: <span className="font-bold text-primary">{keyword} {varName} = {valRaw};</span></div>
            <div>typeof {varName}: <span className="font-bold text-emerald-500">{parsedType}</span></div>
          </div>
        </div>

        {/* Visual Memory Box */}
        <div className="flex flex-col justify-between rounded-lg bg-slate-950 p-4 border border-border text-slate-100 min-h-[220px]">
          <div>
            <span className="font-mono text-[10px] uppercase font-bold text-slate-400 block mb-2">
              RAM Memory Slot Diagram ({isPrimitive ? "Stored by Value on Stack" : "Stored by Reference on Heap"})
            </span>
            <div className="flex items-center justify-between rounded border border-slate-700 bg-slate-900 p-3">
              <div className="space-y-0.5">
                <span className="text-[10px] text-slate-400 font-mono">Variable Tag</span>
                <div className="font-mono text-sm font-bold text-amber-400">{keyword} {varName}</div>
              </div>
              <div className="text-right space-y-0.5">
                <span className="text-[10px] text-slate-400 font-mono">Memory Value</span>
                <div className="font-mono text-sm font-bold text-emerald-400">{String(valRaw)}</div>
              </div>
            </div>
          </div>

          <div className="mt-4 rounded bg-slate-900/80 p-2.5 text-[11px] font-mono text-slate-300">
            {keyword === "const" && "🔒 Const bindings cannot be re-assigned once declared."}
            {keyword === "let" && "✏️ Let allows re-assigning values within block scope."}
            {keyword === "var" && "⚠️ Var function-scoped & hoisted (Legacy - avoid in modern JS)."}
          </div>
        </div>
      </div>
    </div>
  );
}

/** 2. Operators & Expressions Playground */
export function OperatorPlayground() {
  const [val1, setVal1] = useState<string>("5");
  const [op, setOp] = useState<string>("===");
  const [val2, setVal2] = useState<string>('"5"');

  let result: string = "";
  let warning: string | null = null;

  try {
    const fn = new Function(`return (${val1}) ${op} (${val2});`);
    const evalRes = fn();
    result = typeof evalRes === "object" ? JSON.stringify(evalRes) : String(evalRes);
  } catch (err: unknown) {
    result = "Invalid Expression";
  }

  if (op === "==" && val1 !== val2) {
    warning = "⚠️ Type Coercion Alert: Abstract equality (==) converts types before comparing! Prefer strict equality (===).";
  } else if (op === "+" && (val1.includes('"') || val2.includes('"'))) {
    warning = "💡 String Concatenation: Adding strings converts numbers to strings ('5' + 5 = '55').";
  }

  return (
    <div className="my-8 rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <h4 className="flex items-center gap-2 font-heading text-sm font-semibold text-foreground">
          <Zap className="size-4 text-primary" /> Operator & Coercion Tester
        </h4>
        <span className="rounded bg-primary/10 px-2 py-0.5 font-mono text-xs font-medium text-primary">
          Evaluator
        </span>
      </div>

      <div className="mt-4 space-y-4 text-xs">
        <div className="grid grid-cols-3 gap-2">
          <div>
            <label className="mb-1 block font-medium text-foreground">Operand A:</label>
            <input
              type="text"
              value={val1}
              onChange={(e) => setVal1(e.target.value)}
              className="w-full rounded border border-input bg-background px-3 py-1.5 font-mono text-xs"
            />
          </div>
          <div>
            <label className="mb-1 block font-medium text-foreground">Operator:</label>
            <select
              value={op}
              onChange={(e) => setOp(e.target.value)}
              className="w-full rounded border border-input bg-background px-2 py-1.5 font-mono text-xs"
            >
              <option value="===">=== (Strict Equal)</option>
              <option value="==">== (Loose Equal)</option>
              <option value="!==">!== (Strict Not Equal)</option>
              <option value="+">+ (Add / Concat)</option>
              <option value="-">- (Subtract)</option>
              <option value="*">* (Multiply)</option>
              <option value="/">/ (Divide)</option>
              <option value="%">% (Remainder/Modulo)</option>
              <option value="**">** (Exponentiation)</option>
              <option value="&&">&& (Logical AND)</option>
              <option value="||">|| (Logical OR)</option>
              <option value="??">?? (Nullish Coalescing)</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block font-medium text-foreground">Operand B:</label>
            <input
              type="text"
              value={val2}
              onChange={(e) => setVal2(e.target.value)}
              className="w-full rounded border border-input bg-background px-3 py-1.5 font-mono text-xs"
            />
          </div>
        </div>

        <div className="flex items-center justify-between rounded-lg bg-slate-950 p-4 font-mono text-slate-100">
          <div>
            <span className="text-[10px] text-slate-400 block uppercase font-bold">Expression</span>
            <span className="text-sm font-bold text-amber-400">{val1} {op} {val2}</span>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-slate-400 block uppercase font-bold">Evaluation Result</span>
            <span className="text-base font-extrabold text-emerald-400">{result}</span>
          </div>
        </div>

        {warning && (
          <div className="rounded border border-amber-500/30 bg-amber-500/10 p-3 font-mono text-[11px] text-amber-600 dark:text-amber-400">
            {warning}
          </div>
        )}
      </div>
    </div>
  );
}

/** 3. Control Flow Playground */
export function ControlFlowPlayground() {
  const [age, setAge] = useState<number>(20);
  const [hasTicket, setHasTicket] = useState<boolean>(true);

  let branchTaken = "";
  if (age >= 18 && hasTicket) {
    branchTaken = "✅ Access Granted: Adult with valid ticket.";
  } else if (age >= 18 && !hasTicket) {
    branchTaken = "⛔ Access Denied: Adult but no ticket.";
  } else {
    branchTaken = "🛑 Access Denied: Underage (Under 18).";
  }

  return (
    <div className="my-8 rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <h4 className="flex items-center gap-2 font-heading text-sm font-semibold text-foreground">
          <Sliders className="size-4 text-primary" /> Animated Logic Branch Visualizer
        </h4>
        <span className="rounded bg-primary/10 px-2 py-0.5 font-mono text-xs font-medium text-primary">
          Flowchart
        </span>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-2 text-xs">
        <div className="space-y-4">
          <div>
            <label className="mb-1 flex justify-between font-medium text-foreground">
              <span>Age input: {age}</span>
            </label>
            <input
              type="range"
              min="10"
              max="65"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className="w-full accent-primary"
            />
          </div>

          <div>
            <label className="mb-1 block font-medium text-foreground">Ticket Status:</label>
            <Button
              type="button"
              variant={hasTicket ? "default" : "outline"}
              size="sm"
              onClick={() => setHasTicket(!hasTicket)}
            >
              {hasTicket ? "🎟️ Has Valid Ticket: TRUE" : "❌ Has Valid Ticket: FALSE"}
            </Button>
          </div>
        </div>

        <div className="rounded-lg bg-slate-950 p-4 border border-border text-slate-100 font-mono space-y-2">
          <div className="text-[10px] text-slate-400 uppercase font-bold">Execution Path Visualizer</div>
          <div className={`p-2 rounded border text-xs transition ${age >= 18 && hasTicket ? "border-emerald-500 bg-emerald-500/20 text-emerald-300 font-bold" : "border-slate-800 text-slate-500"}`}>
            if (age &gt;= 18 &amp;&amp; hasTicket) &#123; /* Pass */ &#125;
          </div>
          <div className={`p-2 rounded border text-xs transition ${age >= 18 && !hasTicket ? "border-amber-500 bg-amber-500/20 text-amber-300 font-bold" : "border-slate-800 text-slate-500"}`}>
            else if (age &gt;= 18) &#123; /* No ticket */ &#125;
          </div>
          <div className={`p-2 rounded border text-xs transition ${age < 18 ? "border-rose-500 bg-rose-500/20 text-rose-300 font-bold" : "border-slate-800 text-slate-500"}`}>
            else &#123; /* Underage */ &#125;
          </div>
          <div className="pt-2 text-primary font-semibold text-xs border-t border-slate-800">
            {branchTaken}
          </div>
        </div>
      </div>
    </div>
  );
}

/** 4. Function Playground */
export function FunctionPlayground() {
  const [code, setCode] = useState(`function calculateTotal(price, taxRate = 0.1) {\n  const tax = price * taxRate;\n  return price + tax;\n}\n\nconsole.log(calculateTotal(100, 0.15));`);
  const [output, setOutput] = useState<{ logs: string[]; result: string; error: string | null }>({ logs: [], result: "", error: null });

  function handleRun() {
    const res = executePlaygroundJS(code);
    setOutput({ logs: res.logs, result: res.output, error: res.error });
  }

  return (
    <div className="my-8 rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <h4 className="flex items-center gap-2 font-heading text-sm font-semibold text-foreground">
          <Code className="size-4 text-primary" /> Interactive Function & Execution Lab
        </h4>
        <Button size="sm" onClick={handleRun} className="gap-1">
          <Play className="size-3.5" /> Run Code
        </Button>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2 text-xs">
        <div>
          <label className="mb-1 block font-medium text-foreground">JS Function Editor:</label>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            rows={7}
            className="w-full rounded-md border border-input bg-slate-950 p-3 font-mono text-xs text-slate-100 focus:ring-1 focus:ring-primary outline-none"
          />
        </div>

        <div className="flex flex-col rounded-md border border-border bg-slate-950 p-3 font-mono text-slate-100">
          <span className="text-[10px] uppercase font-bold text-slate-400 mb-2 flex items-center gap-1">
            <Terminal className="size-3 text-primary" /> Console & Return Output
          </span>
          {output.error ? (
            <div className="text-rose-400 bg-rose-950/40 p-2 rounded border border-rose-800 text-xs">
              Error: {output.error}
            </div>
          ) : (
            <div className="space-y-1 overflow-y-auto max-h-[140px] text-xs">
              {output.logs.map((log, idx) => (
                <div key={idx} className="text-emerald-400">&gt; {log}</div>
              ))}
              {output.result && <div className="text-amber-400 font-bold">Returned: {output.result}</div>}
              {output.logs.length === 0 && !output.result && (
                <span className="text-slate-500 italic">Click &quot;Run Code&quot; to execute function.</span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/** 5. Scope & Closures Playground */
export function ScopeClosurePlayground() {
  const [count, setCount] = useState<number>(0);
  const [history, setHistory] = useState<string[]>([]);

  function increment() {
    setCount((prev) => prev + 1);
    setHistory((prev) => [...prev, `counter() called -> count inside closure = ${count + 1}`]);
  }

  function reset() {
    setCount(0);
    setHistory([]);
  }

  return (
    <div className="my-8 rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <h4 className="flex items-center gap-2 font-heading text-sm font-semibold text-foreground">
          <Layers className="size-4 text-primary" /> Closure Backpack Visualizer
        </h4>
        <span className="rounded bg-primary/10 px-2 py-0.5 font-mono text-xs font-medium text-primary">
          Lexical Scope
        </span>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-2 text-xs">
        <div className="space-y-3">
          <div className="rounded bg-slate-900 p-3 font-mono text-slate-100 text-xs space-y-1">
            <div className="text-slate-400 text-[10px]">// Factory function returning closure</div>
            <div>function createCounter() &#123;</div>
            <div className="pl-4 text-emerald-400">let count = 0; // Private state retained!</div>
            <div className="pl-4">return function() &#123; return ++count; &#125;</div>
            <div>&#125;</div>
            <div className="pt-2 text-amber-400">const counter = createCounter();</div>
          </div>

          <div className="flex gap-2">
            <Button size="sm" onClick={increment}>Call counter()</Button>
            <Button size="sm" variant="outline" onClick={reset} className="gap-1">
              <RefreshCw className="size-3" /> Reset
            </Button>
          </div>
        </div>

        <div className="rounded-lg bg-slate-950 p-4 border border-border text-slate-100 font-mono space-y-2">
          <span className="text-[10px] text-slate-400 uppercase font-bold block">
            Closure Scope &quot;Backpack&quot; (Encapsulated State)
          </span>
          <div className="rounded border border-emerald-500/40 bg-emerald-500/10 p-3 text-center">
            <span className="text-xs text-emerald-400 font-bold block">count variable in memory:</span>
            <span className="text-2xl font-extrabold text-white">{count}</span>
          </div>

          <div className="max-h-[100px] overflow-y-auto space-y-1 text-[11px] text-slate-400 pt-2 border-t border-slate-800">
            {history.map((h, i) => (
              <div key={i}>📌 {h}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/** 6. DOM Manipulation Playground */
export function DomManipulationPlayground() {
  const [bgColor, setBgColor] = useState<string>("bg-slate-900");
  const [text, setText] = useState<string>("Hello DOM World!");
  const [items, setItems] = useState<string[]>(["Item 1", "Item 2"]);

  function addItem() {
    setItems((prev) => [...prev, `Item ${prev.length + 1}`]);
  }

  return (
    <div className="my-8 rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <h4 className="flex items-center gap-2 font-heading text-sm font-semibold text-foreground">
          <Box className="size-4 text-primary" /> DOM Tree Mutation Sandbox
        </h4>
        <span className="rounded bg-primary/10 px-2 py-0.5 font-mono text-xs font-medium text-primary">
          Live DOM Tree
        </span>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-2 text-xs">
        <div className="space-y-3">
          <div>
            <label className="mb-1 block font-medium text-foreground">Update innerText:</label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full rounded border border-input bg-background px-3 py-1.5 font-mono text-xs"
            />
          </div>

          <div>
            <label className="mb-1 block font-medium text-foreground">Toggle Class List:</label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setBgColor("bg-indigo-950 text-indigo-200 border-indigo-500")}
                className="rounded px-2.5 py-1 bg-indigo-900 text-white font-mono text-xs"
              >
                .theme-indigo
              </button>
              <button
                type="button"
                onClick={() => setBgColor("bg-emerald-950 text-emerald-200 border-emerald-500")}
                className="rounded px-2.5 py-1 bg-emerald-900 text-white font-mono text-xs"
              >
                .theme-emerald
              </button>
              <button
                type="button"
                onClick={() => setBgColor("bg-amber-950 text-amber-200 border-amber-500")}
                className="rounded px-2.5 py-1 bg-amber-900 text-white font-mono text-xs"
              >
                .theme-amber
              </button>
            </div>
          </div>

          <div>
            <Button size="sm" onClick={addItem}>document.createElement(&apos;li&apos;)</Button>
          </div>
        </div>

        {/* Live DOM Node Render */}
        <div className={`rounded-lg p-4 border transition-all ${bgColor} flex flex-col justify-between`}>
          <div>
            <span className="text-[10px] uppercase font-bold font-mono opacity-60 block mb-1">
              Browser Rendered DOM Element Node
            </span>
            <h3 className="text-lg font-bold">{text}</h3>
            <ul className="mt-3 list-disc pl-5 space-y-1 font-mono text-xs">
              {items.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="mt-4 pt-2 border-t border-white/20 font-mono text-[10px] opacity-75">
            node.classList: &quot;{bgColor}&quot;
          </div>
        </div>
      </div>
    </div>
  );
}

/** 7. Event Handling Playground */
export function EventHandlingPlayground() {
  const [logs, setLogs] = useState<string[]>([]);

  function addLog(msg: string) {
    setLogs((prev) => [msg, ...prev.slice(0, 5)]);
  }

  return (
    <div className="my-8 rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <h4 className="flex items-center gap-2 font-heading text-sm font-semibold text-foreground">
          <Eye className="size-4 text-primary" /> Event Listener Inspector
        </h4>
        <Button size="sm" variant="ghost" onClick={() => setLogs([])}>Clear Log</Button>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-2 text-xs">
        <div className="space-y-4">
          <div
            onClick={(e) => addLog(`click -> target: <button>, bubbles: ${e.bubbles}`)}
            onMouseEnter={() => addLog("mouseenter event triggered")}
            className="p-6 rounded-lg border-2 border-dashed border-primary/50 bg-primary/5 text-center cursor-pointer hover:bg-primary/10 transition"
          >
            <span className="font-bold text-foreground block mb-1">Interactive Target Box</span>
            <span className="text-muted-foreground text-[11px]">Click or Hover me to trigger event listeners!</span>
          </div>

          <div>
            <label className="mb-1 block font-medium text-foreground">Keydown Listener Input:</label>
            <input
              type="text"
              placeholder="Type anything here..."
              onKeyDown={(e) => addLog(`keydown -> key: '${e.key}', code: '${e.code}'`)}
              className="w-full rounded border border-input bg-background px-3 py-1.5 font-mono text-xs"
            />
          </div>
        </div>

        <div className="rounded-lg bg-slate-950 p-4 border border-border text-slate-100 font-mono text-xs">
          <span className="text-[10px] text-slate-400 uppercase font-bold block mb-2">Real-Time Event Stream</span>
          <div className="space-y-1 font-mono text-emerald-400">
            {logs.length === 0 ? (
              <span className="text-slate-500 italic">No events captured yet.</span>
            ) : (
              logs.map((l, i) => <div key={i}>⚡ {l}</div>)
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/** 8. Arrays & Array Methods Playground */
export function ArrayMethodsPlayground() {
  const [items] = useState<number[]>([10, 25, 40, 5, 80]);
  const [filterMin, setFilterMin] = useState<number>(20);

  const filtered = items.filter((n) => n >= filterMin);
  const mapped = filtered.map((n) => n * 2);
  const reduced = mapped.reduce((acc, curr) => acc + curr, 0);

  return (
    <div className="my-8 rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <h4 className="flex items-center gap-2 font-heading text-sm font-semibold text-foreground">
          <Sparkles className="size-4 text-primary" /> Array Transformation Pipeline (Filter -&gt; Map -&gt; Reduce)
        </h4>
        <span className="rounded bg-primary/10 px-2 py-0.5 font-mono text-xs font-medium text-primary">
          Pipeline
        </span>
      </div>

      <div className="mt-4 space-y-4 text-xs">
        <div>
          <label className="mb-1 flex justify-between font-medium text-foreground">
            <span>Filter Threshold (.filter(x =&gt; x &gt;= {filterMin})):</span>
          </label>
          <input
            type="range"
            min="0"
            max="50"
            value={filterMin}
            onChange={(e) => setFilterMin(Number(e.target.value))}
            className="w-full accent-primary"
          />
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-4 font-mono text-xs text-center">
          <div className="rounded border border-slate-700 bg-slate-900 p-3">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">1. Initial Array</span>
            <div className="mt-1 font-bold text-slate-200">[{items.join(", ")}]</div>
          </div>
          <div className="rounded border border-blue-500/40 bg-blue-500/10 p-3">
            <span className="text-[10px] text-blue-400 uppercase font-bold block">2. .filter(&gt;= {filterMin})</span>
            <div className="mt-1 font-bold text-blue-300">[{filtered.join(", ")}]</div>
          </div>
          <div className="rounded border border-purple-500/40 bg-purple-500/10 p-3">
            <span className="text-[10px] text-purple-400 uppercase font-bold block">3. .map(x =&gt; x * 2)</span>
            <div className="mt-1 font-bold text-purple-300">[{mapped.join(", ")}]</div>
          </div>
          <div className="rounded border border-emerald-500/40 bg-emerald-500/10 p-3">
            <span className="text-[10px] text-emerald-400 uppercase font-bold block">4. .reduce(sum)</span>
            <div className="mt-1 font-extrabold text-emerald-400 text-base">{reduced}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** 9. Objects & Destructuring Playground */
export function ObjectDestructuringPlayground() {
  const [username, setUsername] = useState("Alex");
  const [role, setRole] = useState("Developer");
  const [country, setCountry] = useState("India");

  return (
    <div className="my-8 rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <h4 className="flex items-center gap-2 font-heading text-sm font-semibold text-foreground">
          <Database className="size-4 text-primary" /> Object Destructuring Unpacker
        </h4>
        <span className="rounded bg-primary/10 px-2 py-0.5 font-mono text-xs font-medium text-primary">
          ES6 Unpacker
        </span>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-2 text-xs">
        <div className="space-y-3">
          <div>
            <label className="mb-1 block font-medium text-foreground">Name:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded border border-input bg-background px-3 py-1.5 font-mono text-xs"
            />
          </div>
          <div>
            <label className="mb-1 block font-medium text-foreground">Role:</label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full rounded border border-input bg-background px-3 py-1.5 font-mono text-xs"
            />
          </div>
          <div>
            <label className="mb-1 block font-medium text-foreground">Country:</label>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full rounded border border-input bg-background px-3 py-1.5 font-mono text-xs"
            />
          </div>
        </div>

        <div className="rounded-lg bg-slate-950 p-4 border border-border text-slate-100 font-mono space-y-3">
          <div className="text-[10px] text-slate-400 uppercase font-bold">Unpacked Destructured Variables</div>
          <div className="p-2 bg-slate-900 rounded border border-slate-800 space-y-1">
            <div>name = <span className="text-emerald-400 font-bold">&quot;{username}&quot;</span></div>
            <div>userRole = <span className="text-amber-400 font-bold">&quot;{role}&quot;</span></div>
            <div>userCountry = <span className="text-blue-400 font-bold">&quot;{country}&quot;</span></div>
          </div>
          <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-800">
            Destructuring unpacks values directly from objects into standalone variables without verbose property lookups!
          </div>
        </div>
      </div>
    </div>
  );
}

/** 10. ES6+ Features Playground */
export function ES6FeaturesPlayground() {
  const [activeTab, setActiveTab] = useState<"template" | "spread" | "arrow">("template");

  return (
    <div className="my-8 rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <h4 className="flex items-center gap-2 font-heading text-sm font-semibold text-foreground">
          <Zap className="size-4 text-primary" /> Modern ES6+ Feature Suite
        </h4>
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => setActiveTab("template")}
            className={`px-2.5 py-1 rounded text-xs font-mono transition ${activeTab === "template" ? "bg-primary text-primary-foreground font-bold" : "bg-muted"}`}
          >
            Template Literals
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("spread")}
            className={`px-2.5 py-1 rounded text-xs font-mono transition ${activeTab === "spread" ? "bg-primary text-primary-foreground font-bold" : "bg-muted"}`}
          >
            Spread Operator
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("arrow")}
            className={`px-2.5 py-1 rounded text-xs font-mono transition ${activeTab === "arrow" ? "bg-primary text-primary-foreground font-bold" : "bg-muted"}`}
          >
            Arrow Functions
          </button>
        </div>
      </div>

      <div className="mt-4 rounded-lg bg-slate-950 p-4 border border-border font-mono text-xs text-slate-100 space-y-2">
        {activeTab === "template" && (
          <div>
            <div className="text-slate-400 text-[10px]">// Backticks allow string interpolation and multiline strings</div>
            <div className="text-amber-400">const user = &quot;Sarah&quot;;</div>
            <div className="text-emerald-400">const greeting = `Welcome back, $&#123;user&#125;!`;</div>
            <div className="pt-2 text-slate-300">Result: &quot;Welcome back, Sarah!&quot;</div>
          </div>
        )}
        {activeTab === "spread" && (
          <div>
            <div className="text-slate-400 text-[10px]">// Spread (...) shallow-copies or merges arrays &amp; objects</div>
            <div className="text-amber-400">const arr1 = [1, 2]; const arr2 = [3, 4];</div>
            <div className="text-emerald-400">const combined = [...arr1, ...arr2, 5];</div>
            <div className="pt-2 text-slate-300">Result: [1, 2, 3, 4, 5]</div>
          </div>
        )}
        {activeTab === "arrow" && (
          <div>
            <div className="text-slate-400 text-[10px]">// Arrow functions offer concise syntax &amp; lexical this</div>
            <div className="text-amber-400">const double = (x) =&gt; x * 2;</div>
            <div className="text-emerald-400">double(5);</div>
            <div className="pt-2 text-slate-300">Result: 10</div>
          </div>
        )}
      </div>
    </div>
  );
}

/** 11. Error Handling Playground */
export function ErrorHandlingPlayground() {
  const [shouldThrow, setShouldThrow] = useState<boolean>(true);
  const [logs, setLogs] = useState<string[]>([]);

  function runTryCatch() {
    const newLogs: string[] = ["1. Entering try block..."];
    try {
      if (shouldThrow) {
        newLogs.push("2. 💥 Throwing TypeError: Cannot read properties of undefined!");
        throw new TypeError("Cannot read properties of undefined (reading 'name')");
      } else {
        newLogs.push("2. ✅ Code executed successfully without errors.");
      }
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      newLogs.push(`3. 🛡️ Caught in catch block: "${errorMsg}"`);
    } finally {
      newLogs.push("4. 🔄 Executing finally block (always runs regardless of error).");
    }
    setLogs(newLogs);
  }

  return (
    <div className="my-8 rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <h4 className="flex items-center gap-2 font-heading text-sm font-semibold text-foreground">
          <ShieldAlert className="size-4 text-primary" /> Try...Catch...Finally Error Shield
        </h4>
        <Button size="sm" onClick={runTryCatch} className="gap-1">
          <Play className="size-3.5" /> Execute Code Block
        </Button>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-2 text-xs">
        <div className="space-y-4">
          <div>
            <label className="mb-1 block font-medium text-foreground">Simulate Runtime Failure?</label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setShouldThrow(true)}
                className={`rounded px-3 py-1.5 font-mono text-xs border transition ${shouldThrow ? "bg-rose-500 text-white border-rose-600 font-bold" : "bg-muted"}`}
              >
                Throw Error (true)
              </button>
              <button
                type="button"
                onClick={() => setShouldThrow(false)}
                className={`rounded px-3 py-1.5 font-mono text-xs border transition ${!shouldThrow ? "bg-emerald-600 text-white border-emerald-700 font-bold" : "bg-muted"}`}
              >
                Safe Execution (false)
              </button>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-slate-950 p-4 border border-border text-slate-100 font-mono text-xs space-y-1.5">
          <span className="text-[10px] text-slate-400 uppercase font-bold block mb-2">Execution Trajectory Log</span>
          {logs.length === 0 ? (
            <span className="text-slate-500 italic">Click &quot;Execute Code Block&quot; to test flow.</span>
          ) : (
            logs.map((l, i) => <div key={i}>{l}</div>)
          )}
        </div>
      </div>
    </div>
  );
}

/** 12. Promises & Async/Await Playground */
export function PromisePlayground() {
  const [status, setStatus] = useState<"idle" | "pending" | "fulfilled" | "rejected">("idle");
  const [result, setResult] = useState<string>("");

  function triggerPromise(shouldSucceed: boolean) {
    setStatus("pending");
    setResult("Promise state: PENDING (Waiting 1.5s timer...)");

    setTimeout(() => {
      if (shouldSucceed) {
        setStatus("fulfilled");
        setResult("✅ Promise RESOLVED with data: { status: 200, data: 'User Data' }");
      } else {
        setStatus("rejected");
        setResult("💥 Promise REJECTED with error: 'Network Connection Timeout'");
      }
    }, 1500);
  }

  return (
    <div className="my-8 rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <h4 className="flex items-center gap-2 font-heading text-sm font-semibold text-foreground">
          <Clock className="size-4 text-primary" /> Async Promise State Machine
        </h4>
        <span className="rounded bg-primary/10 px-2 py-0.5 font-mono text-xs font-medium text-primary">
          Asynchronous Flow
        </span>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-2 text-xs">
        <div className="space-y-3">
          <p className="text-muted-foreground text-xs">
            Promises represent values that may not be available yet. Trigger an asynchronous operation below:
          </p>
          <div className="flex gap-2">
            <Button size="sm" onClick={() => triggerPromise(true)} disabled={status === "pending"}>
              Resolve Promise
            </Button>
            <Button size="sm" variant="destructive" onClick={() => triggerPromise(false)} disabled={status === "pending"}>
              Reject Promise
            </Button>
          </div>
        </div>

        <div className="rounded-lg bg-slate-950 p-4 border border-border text-slate-100 font-mono space-y-3">
          <div className="flex items-center justify-between text-[10px] uppercase font-bold text-slate-400">
            <span>Promise State</span>
            <span className={`px-2 py-0.5 rounded font-bold ${
              status === "pending" ? "bg-amber-500/20 text-amber-400 animate-pulse" :
              status === "fulfilled" ? "bg-emerald-500/20 text-emerald-400" :
              status === "rejected" ? "bg-rose-500/20 text-rose-400" : "bg-slate-800 text-slate-400"
            }`}>
              {status.toUpperCase()}
            </span>
          </div>

          <div className="p-3 bg-slate-900 rounded border border-slate-800 text-xs">
            {result || "Click a button above to start async operation."}
          </div>
        </div>
      </div>
    </div>
  );
}

/** 13. Fetch API Playground */
export function FetchApiPlayground() {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<unknown | null>(null);

  async function fetchSampleUser() {
    setLoading(true);
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users/1");
      const json = await res.json();
      setData(json);
    } catch (err: unknown) {
      setData({ error: "Failed to fetch data from API" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="my-8 rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <h4 className="flex items-center gap-2 font-heading text-sm font-semibold text-foreground">
          <Globe className="size-4 text-primary" /> REST API Live Fetch Console
        </h4>
        <Button size="sm" onClick={fetchSampleUser} disabled={loading} className="gap-1">
          <Globe className="size-3.5" /> {loading ? "Fetching..." : "fetch('/users/1')"}
        </Button>
      </div>

      <div className="mt-4 rounded-lg bg-slate-950 p-4 border border-border text-slate-100 font-mono text-xs">
        <div className="text-[10px] text-slate-400 uppercase font-bold mb-2">HTTP Request &amp; Response Body</div>
        {loading ? (
          <div className="text-amber-400 animate-pulse">GET https://jsonplaceholder.typicode.com/users/1 [200 OK] Loading response JSON...</div>
        ) : data ? (
          <pre className="text-emerald-400 max-h-[160px] overflow-y-auto leading-relaxed">
            {JSON.stringify(data, null, 2)}
          </pre>
        ) : (
          <span className="text-slate-500 italic">Click button above to send a real HTTP fetch request.</span>
        )}
      </div>
    </div>
  );
}

/** 14. Web Storage Playground */
export function WebStoragePlayground() {
  const [key, setKey] = useState<string>("username");
  const [val, setVal] = useState<string>("Saurabh");
  const [storedVal, setStoredVal] = useState<string | null>(null);

  function handleSave() {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, val);
      setStoredVal(localStorage.getItem(key));
    }
  }

  function handleClear() {
    if (typeof window !== "undefined") {
      localStorage.removeItem(key);
      setStoredVal(null);
    }
  }

  return (
    <div className="my-8 rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <h4 className="flex items-center gap-2 font-heading text-sm font-semibold text-foreground">
          <HardDrive className="size-4 text-primary" /> Browser LocalStorage Inspector
        </h4>
        <span className="rounded bg-primary/10 px-2 py-0.5 font-mono text-xs font-medium text-primary">
          Key-Value Storage
        </span>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-2 text-xs">
        <div className="space-y-3">
          <div>
            <label className="mb-1 block font-medium text-foreground">Storage Key:</label>
            <input
              type="text"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              className="w-full rounded border border-input bg-background px-3 py-1.5 font-mono text-xs"
            />
          </div>

          <div>
            <label className="mb-1 block font-medium text-foreground">Storage Value:</label>
            <input
              type="text"
              value={val}
              onChange={(e) => setVal(e.target.value)}
              className="w-full rounded border border-input bg-background px-3 py-1.5 font-mono text-xs"
            />
          </div>

          <div className="flex gap-2">
            <Button size="sm" onClick={handleSave}>localStorage.setItem()</Button>
            <Button size="sm" variant="outline" onClick={handleClear}>localStorage.removeItem()</Button>
          </div>
        </div>

        <div className="rounded-lg bg-slate-950 p-4 border border-border text-slate-100 font-mono space-y-2">
          <span className="text-[10px] text-slate-400 uppercase font-bold block">Persistent LocalStorage State</span>
          <div className="p-3 bg-slate-900 rounded border border-slate-800 text-xs">
            {storedVal !== null ? (
              <div>
                Key: <span className="text-amber-400 font-bold">{key}</span> =&gt; Value: <span className="text-emerald-400 font-bold">&quot;{storedVal}&quot;</span>
              </div>
            ) : (
              <span className="text-slate-500 italic">No value stored under key &quot;{key}&quot;.</span>
            )}
          </div>
          <p className="text-[10px] text-slate-400">
            LocalStorage persists even after closing or refreshing the browser tab!
          </p>
        </div>
      </div>
    </div>
  );
}
