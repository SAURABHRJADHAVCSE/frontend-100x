"use client";

import { useState } from "react";
import { Code, Layout, Type, Link as LinkIcon, FileText, List, Film, Search, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

/** 7. HTML Document Structure Playground */
export function HtmlDocumentPlayground() {
  const [code, setCode] = useState(
`<!DOCTYPE html>
<html lang="en">
<head>
  <title>My First HTML Page</title>
</head>
<body>
  <h1>Welcome to Web Development!</h1>
  <p>This is a live rendered HTML document structure.</p>
</body>
</html>`
  );

  return (
    <div className="my-8 rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <h4 className="flex items-center gap-2 font-heading text-sm font-semibold text-foreground">
          <Code className="size-4 text-primary" /> Live HTML Document Structure Sandbox
        </h4>
        <span className="rounded bg-primary/10 px-2 py-0.5 font-mono text-xs font-medium text-primary">
          Live Preview
        </span>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2 text-xs">
        <div>
          <label className="mb-1 font-medium block text-foreground">HTML Markup Editor:</label>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            rows={8}
            className="w-full rounded-md border border-input bg-slate-950 p-3 font-mono text-xs text-slate-100 focus:ring-2 focus:ring-primary outline-none"
          />
        </div>

        <div>
          <label className="mb-1 font-medium block text-foreground">Browser Viewport Preview:</label>
          <iframe
            srcDoc={code}
            title="HTML Preview"
            className="w-full h-[175px] rounded-md border border-border bg-white text-black p-2"
          />
        </div>
      </div>
    </div>
  );
}

/** 8. Semantic Landmarks Playground */
export function SemanticLandmarksPlayground() {
  const [showLandmarks, setShowLandmarks] = useState(true);

  return (
    <div className="my-8 rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <h4 className="flex items-center gap-2 font-heading text-sm font-semibold text-foreground">
          <Layout className="size-4 text-primary" /> Semantic HTML vs Screen Reader Landmark Inspector
        </h4>
        <Button size="sm" variant="outline" onClick={() => setShowLandmarks(!showLandmarks)}>
          {showLandmarks ? "Hide Landmark Badges" : "Highlight Landmarks"}
        </Button>
      </div>

      <div className="mt-4 space-y-3 text-xs">
        <div className={`rounded border p-3 bg-amber-500/10 border-amber-500/30 ${showLandmarks ? "ring-2 ring-amber-500/40" : ""}`}>
          {showLandmarks && <span className="font-mono text-[10px] uppercase font-bold text-amber-600 dark:text-amber-400 block mb-1">&lt;header&gt; Landmark</span>}
          <div className="font-bold text-foreground">Header & Logo Navigation Bar</div>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <div className={`md:col-span-2 rounded border p-3 bg-blue-500/10 border-blue-500/30 ${showLandmarks ? "ring-2 ring-blue-500/40" : ""}`}>
            {showLandmarks && <span className="font-mono text-[10px] uppercase font-bold text-blue-600 dark:text-blue-400 block mb-1">&lt;main&gt; Landmark</span>}
            <div className="font-bold text-foreground mb-1">Primary Article Content</div>
            <p className="text-muted-foreground text-xs">Screen readers can jump directly to this landmark!</p>
          </div>

          <div className={`rounded border p-3 bg-purple-500/10 border-purple-500/30 ${showLandmarks ? "ring-2 ring-purple-500/40" : ""}`}>
            {showLandmarks && <span className="font-mono text-[10px] uppercase font-bold text-purple-600 dark:text-purple-400 block mb-1">&lt;aside&gt; Landmark</span>}
            <div className="font-bold text-foreground mb-1">Sidebar Widgets</div>
          </div>
        </div>

        <div className={`rounded border p-3 bg-emerald-500/10 border-emerald-500/30 ${showLandmarks ? "ring-2 ring-emerald-500/40" : ""}`}>
          {showLandmarks && <span className="font-mono text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400 block mb-1">&lt;footer&gt; Landmark</span>}
          <div className="font-bold text-foreground">Footer Copyright & Links</div>
        </div>
      </div>
    </div>
  );
}

/** 9. Typography Elements Playground */
export function TypographyElementsPlayground() {
  return (
    <div className="my-8 rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <h4 className="flex items-center gap-2 font-heading text-sm font-semibold text-foreground">
          <Type className="size-4 text-primary" /> Inline & Block Text Element Sandbox
        </h4>
        <span className="rounded bg-primary/10 px-2 py-0.5 font-mono text-xs font-medium text-primary">
          HTML Text
        </span>
      </div>

      <div className="mt-4 space-y-3 text-xs">
        <div className="rounded border bg-muted/20 p-4 space-y-2">
          <h2 className="text-lg font-bold text-foreground">&lt;h2&gt; Heading Level 2 &lt;/h2&gt;</h2>
          <p className="text-muted-foreground">
            Paragraph text with <strong>&lt;strong&gt; (bold &amp; important)</strong>, <em>&lt;em&gt; (stressed emphasis)</em>, <mark className="bg-amber-300 dark:bg-amber-500/40 px-1 rounded">&lt;mark&gt; (highlighted match)</mark>, and <code className="bg-muted px-1 py-0.5 font-mono text-xs">&lt;code&gt; (inline code)</code> tags.
          </p>
          <blockquote className="border-l-4 border-primary pl-3 italic text-muted-foreground">
            &lt;blockquote&gt; Semantic block quote element for long citations. &lt;/blockquote&gt;
          </blockquote>
        </div>
      </div>
    </div>
  );
}

/** 10. Links & Images Playground */
export function LinksImagesPlayground() {
  const [altText, setAltText] = useState("A scenic mountain landscape at sunrise");
  const [targetBlank, setTargetBlank] = useState(true);

  return (
    <div className="my-8 rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <h4 className="flex items-center gap-2 font-heading text-sm font-semibold text-foreground">
          <LinkIcon className="size-4 text-primary" /> Links & Images Security & Accessibility Tester
        </h4>
        <span className="rounded bg-primary/10 px-2 py-0.5 font-mono text-xs font-medium text-primary">
          Accessible Media
        </span>
      </div>

      <div className="mt-4 space-y-4 text-xs">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 font-medium block text-foreground">Image alt attribute:</label>
            <input
              type="text"
              value={altText}
              onChange={(e) => setAltText(e.target.value)}
              className="w-full rounded border border-input bg-background p-2 font-mono text-xs"
            />
          </div>

          <div className="flex items-center gap-2 pt-5">
            <input
              type="checkbox"
              id="tblk"
              checked={targetBlank}
              onChange={(e) => setTargetBlank(e.target.checked)}
              className="rounded accent-primary"
            />
            <label htmlFor="tblk" className="font-medium text-foreground cursor-pointer">
              target=&quot;_blank&quot; (requires rel=&quot;noopener noreferrer&quot;)
            </label>
          </div>
        </div>

        <div className="rounded-lg border bg-muted/20 p-4 space-y-3 font-mono text-xs">
          <div>
            <span className="text-muted-foreground block mb-1">Generated Image HTML:</span>
            <code className="text-primary font-bold">{`<img src="/landscape.jpg" alt="${altText}" />`}</code>
          </div>

          <div>
            <span className="text-muted-foreground block mb-1">Generated Secure Link HTML:</span>
            <code className="text-primary font-bold">
              {`<a href="https://example.com" ${targetBlank ? 'target="_blank" rel="noopener noreferrer"' : ""}>Visit External Site</a>`}
            </code>
          </div>
        </div>
      </div>
    </div>
  );
}

/** 11. Master HTML Forms Playground & Studio */
export function HtmlFormsPlayground() {
  const [tab, setTab] = useState<"tester" | "payload" | "keypads" | "validation">("tester");

  // Form State
  const [method, setMethod] = useState<"get" | "post">("post");
  const [enctype, setEnctype] = useState<"application/x-www-form-urlencoded" | "multipart/form-data" | "text/plain">("application/x-www-form-urlencoded");
  const [username, setUsername] = useState("saurabh");
  const [email, setEmail] = useState("saurabh@example.com");
  const [password, setPassword] = useState("Secr3t!P@ss");
  const [age, setAge] = useState<number | "">(24);
  const [birthdate, setBirthdate] = useState("2002-05-15");
  const [country, setCountry] = useState("IN");
  const [browserChoice, setBrowserChoice] = useState("Chrome");
  const [plan, setPlan] = useState("pro");
  const [newsletter, setNewsletter] = useState(true);
  const [bio, setBio] = useState("Frontend developer crafting industry-grade web apps.");
  const [fileName, setFileName] = useState("avatar.png");
  const [rangeVal, setRangeVal] = useState(75);
  const [colorVal, setColorVal] = useState("#3b82f6");

  // Validation State
  const [isRequired, setIsRequired] = useState(true);
  const [minLen, setMinLen] = useState(3);
  const [patternRegex, setPatternRegex] = useState("");
  const [novalidate, setNovalidate] = useState(false);
  const [validationResult, setValidationResult] = useState<{ isValid: boolean; message: string } | null>(null);

  // Keypad simulator focus state
  const [activeInputType, setActiveInputType] = useState<string>("text");

  function handleReset() {
    setUsername("");
    setEmail("");
    setPassword("");
    setAge("");
    setBirthdate("");
    setCountry("IN");
    setBrowserChoice("");
    setPlan("free");
    setNewsletter(false);
    setBio("");
    setFileName("");
    setValidationResult(null);
  }

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (novalidate) {
      setValidationResult({ isValid: true, message: "Submitted directly (novalidate active - validation bypassed)" });
      return;
    }

    if (isRequired && (!username || !email)) {
      setValidationResult({ isValid: false, message: "Constraint Validation Failed: ValueMissing (required fields are empty)" });
      return;
    }

    if (username.length < minLen) {
      setValidationResult({ isValid: false, message: `Constraint Validation Failed: TooShort (username must be at least ${minLen} chars)` });
      return;
    }

    if (email && !email.includes("@")) {
      setValidationResult({ isValid: false, message: "Constraint Validation Failed: TypeMismatch (invalid email format)" });
      return;
    }

    setValidationResult({ isValid: true, message: "Form Submission Successful! Data packaged and validated by browser API." });
  }

  const queryPayload = `?username=${encodeURIComponent(username)}&email=${encodeURIComponent(email)}&plan=${encodeURIComponent(plan)}&country=${encodeURIComponent(country)}&newsletter=${newsletter}`;

  return (
    <div className="my-8 rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-3">
        <h4 className="flex items-center gap-2 font-heading text-sm font-semibold text-foreground">
          <FileText className="size-4 text-primary" /> Master HTML Form Visualizer & Payload Inspector
        </h4>
        <div className="flex flex-wrap gap-1 font-mono text-xs">
          {(["tester", "payload", "keypads", "validation"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`rounded px-2.5 py-1 capitalize border transition ${
                tab === t ? "bg-primary text-primary-foreground border-primary font-bold" : "bg-muted border-border hover:bg-accent"
              }`}
            >
              {t === "tester" ? "1. Live Form Studio" : t === "payload" ? "2. Payload & Enctype" : t === "keypads" ? "3. Mobile Keypads" : "4. Validation API"}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 text-xs">
        {/* TAB 1: LIVE FORM STUDIO */}
        {tab === "tester" && (
          <div className="space-y-4">
            <form onSubmit={handleFormSubmit} noValidate={novalidate} className="rounded-lg border border-border bg-muted/20 p-4 space-y-4">
              <div className="flex items-center justify-between border-b pb-2">
                <span className="font-mono text-[11px] font-bold text-muted-foreground uppercase">
                  Interactive HTML5 Form Element (&lt;form action=&quot;/api/submit&quot; method=&quot;{method.toUpperCase()}&quot;&gt;)
                </span>
                <div className="flex items-center gap-2">
                  <label className="flex items-center gap-1 font-mono text-[11px] text-muted-foreground cursor-pointer">
                    <input
                      type="checkbox"
                      checked={novalidate}
                      onChange={(e) => setNovalidate(e.target.checked)}
                      className="rounded accent-primary"
                    />
                    novalidate
                  </label>
                </div>
              </div>

              {/* Fieldset 1: Identity Info */}
              <fieldset className="rounded border border-border p-3 space-y-3 bg-card">
                <legend className="px-2 font-mono text-xs font-bold text-primary">&lt;fieldset&gt; Identity Information &lt;/fieldset&gt;</legend>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label htmlFor="user-name" className="mb-1 font-medium block text-foreground">
                      &lt;label for=&quot;user-name&quot;&gt; Username (type=&quot;text&quot;) {isRequired && <span className="text-rose-500">*</span>}
                    </label>
                    <input
                      id="user-name"
                      name="username"
                      type="text"
                      required={isRequired}
                      minLength={minLen}
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      onFocus={() => setActiveInputType("text")}
                      className="w-full rounded border border-input bg-background p-2 font-mono text-xs focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label htmlFor="user-email" className="mb-1 font-medium block text-foreground">
                      &lt;label for=&quot;user-email&quot;&gt; Email Address (type=&quot;email&quot;) {isRequired && <span className="text-rose-500">*</span>}
                    </label>
                    <input
                      id="user-email"
                      name="email"
                      type="email"
                      required={isRequired}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setActiveInputType("email")}
                      className="w-full rounded border border-input bg-background p-2 font-mono text-xs focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label htmlFor="user-pass" className="mb-1 font-medium block text-foreground">
                      Password (type=&quot;password&quot;)
                    </label>
                    <input
                      id="user-pass"
                      name="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={() => setActiveInputType("password")}
                      className="w-full rounded border border-input bg-background p-2 font-mono text-xs focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label htmlFor="user-age" className="mb-1 font-medium block text-foreground">
                      Age (type=&quot;number&quot; min=&quot;18&quot; max=&quot;99&quot;)
                    </label>
                    <input
                      id="user-age"
                      name="age"
                      type="number"
                      min="18"
                      max="99"
                      value={age}
                      onChange={(e) => setAge(e.target.value === "" ? "" : Number(e.target.value))}
                      onFocus={() => setActiveInputType("number")}
                      className="w-full rounded border border-input bg-background p-2 font-mono text-xs focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
              </fieldset>

              {/* Fieldset 2: Controls & Options */}
              <fieldset className="rounded border border-border p-3 space-y-3 bg-card">
                <legend className="px-2 font-mono text-xs font-bold text-primary">&lt;fieldset&gt; Controls &amp; Choice Elements &lt;/fieldset&gt;</legend>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <div>
                    <label htmlFor="country-select" className="mb-1 font-medium block text-foreground">
                      &lt;select name=&quot;country&quot;&gt; Dropdown:
                    </label>
                    <select
                      id="country-select"
                      name="country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full rounded border border-input bg-background p-2 font-mono text-xs"
                    >
                      <option value="IN">India (IN)</option>
                      <option value="US">United States (US)</option>
                      <option value="UK">United Kingdom (UK)</option>
                      <option value="CA">Canada (CA)</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="browser-datalist" className="mb-1 font-medium block text-foreground">
                      &lt;input list=&quot;browsers&quot;&gt; DataList:
                    </label>
                    <input
                      id="browser-datalist"
                      name="browser"
                      list="browser-options"
                      value={browserChoice}
                      onChange={(e) => setBrowserChoice(e.target.value)}
                      placeholder="Type or select..."
                      className="w-full rounded border border-input bg-background p-2 font-mono text-xs"
                    />
                    <datalist id="browser-options">
                      <option value="Chrome" />
                      <option value="Firefox" />
                      <option value="Safari" />
                      <option value="Edge" />
                      <option value="Brave" />
                    </datalist>
                  </div>

                  <div>
                    <label htmlFor="birth-date" className="mb-1 font-medium block text-foreground">
                      Date Picker (type=&quot;date&quot;):
                    </label>
                    <input
                      id="birth-date"
                      name="birthdate"
                      type="date"
                      value={birthdate}
                      onChange={(e) => setBirthdate(e.target.value)}
                      className="w-full rounded border border-input bg-background p-2 font-mono text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 pt-2 border-t">
                  <div>
                    <span className="mb-1.5 font-medium block text-foreground">Radio Group (shared name=&quot;plan&quot;):</span>
                    <div className="flex gap-4">
                      {["free", "pro", "enterprise"].map((p) => (
                        <label key={p} className="flex items-center gap-1.5 font-mono cursor-pointer capitalize">
                          <input
                            type="radio"
                            name="plan"
                            value={p}
                            checked={plan === p}
                            onChange={(e) => setPlan(e.target.value)}
                            className="accent-primary"
                          />
                          {p}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="mb-1.5 font-medium block text-foreground">Checkbox (type=&quot;checkbox&quot;):</span>
                    <label className="flex items-center gap-2 font-mono cursor-pointer">
                      <input
                        type="checkbox"
                        name="newsletter"
                        checked={newsletter}
                        onChange={(e) => setNewsletter(e.target.checked)}
                        className="rounded accent-primary"
                      />
                      Subscribe to dev newsletter
                    </label>
                  </div>
                </div>

                <div className="pt-2 border-t space-y-2">
                  <label htmlFor="user-bio" className="font-medium block text-foreground">
                    &lt;textarea name=&quot;bio&quot; rows=&quot;2&quot;&gt;
                  </label>
                  <textarea
                    id="user-bio"
                    name="bio"
                    rows={2}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full rounded border border-input bg-background p-2 font-mono text-xs"
                  />
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 pt-2 border-t">
                  <div>
                    <label className="mb-1 font-medium block text-foreground">Range Slider (type=&quot;range&quot;): {rangeVal}</label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={rangeVal}
                      onChange={(e) => setRangeVal(Number(e.target.value))}
                      className="w-full accent-primary"
                    />
                  </div>

                  <div>
                    <label className="mb-1 font-medium block text-foreground">Color Picker (type=&quot;color&quot;): {colorVal}</label>
                    <input
                      type="color"
                      value={colorVal}
                      onChange={(e) => setColorVal(e.target.value)}
                      className="size-8 cursor-pointer border rounded"
                    />
                  </div>

                  <div>
                    <label className="mb-1 font-medium block text-foreground">File Upload (type=&quot;file&quot;):</label>
                    <input
                      type="file"
                      onChange={(e) => setFileName(e.target.files?.[0]?.name || "")}
                      className="w-full font-mono text-[11px]"
                    />
                  </div>
                </div>
              </fieldset>

              {/* Form Action Buttons */}
              <div className="flex flex-wrap gap-2 pt-2">
                <button
                  type="submit"
                  className="rounded bg-primary px-4 py-2 font-mono text-xs font-bold text-primary-foreground shadow-sm hover:opacity-90 transition"
                >
                  &lt;button type=&quot;submit&quot;&gt; Submit Form
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="rounded bg-muted px-4 py-2 font-mono text-xs font-medium border border-border hover:bg-accent transition"
                >
                  &lt;button type=&quot;reset&quot;&gt; Reset Form
                </button>
                <button
                  type="button"
                  onClick={() => alert("Button type='button' executed custom JavaScript event handler!")}
                  className="rounded bg-secondary px-4 py-2 font-mono text-xs font-medium text-secondary-foreground border border-border hover:opacity-90 transition"
                >
                  &lt;button type=&quot;button&quot;&gt; Custom JS Action
                </button>
              </div>
            </form>

            {validationResult && (
              <div
                className={`rounded-lg border p-3.5 font-mono text-xs ${
                  validationResult.isValid
                    ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                    : "border-rose-500/40 bg-rose-500/10 text-rose-700 dark:text-rose-300"
                }`}
              >
                <div className="font-bold">{validationResult.isValid ? "✓ Validation Status: SUCCESS" : "✗ Validation Status: ERROR"}</div>
                <div>{validationResult.message}</div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: PAYLOAD & ENCTYPE */}
        {tab === "payload" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 font-medium block text-foreground">Select HTTP Method:</label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setMethod("get")}
                    className={`rounded px-3 py-1 font-mono border ${method === "get" ? "bg-primary text-primary-foreground border-primary" : "bg-muted"}`}
                  >
                    method=&quot;GET&quot;
                  </button>
                  <button
                    type="button"
                    onClick={() => setMethod("post")}
                    className={`rounded px-3 py-1 font-mono border ${method === "post" ? "bg-primary text-primary-foreground border-primary" : "bg-muted"}`}
                  >
                    method=&quot;POST&quot;
                  </button>
                </div>
              </div>

              <div>
                <label className="mb-1 font-medium block text-foreground">Select Encoding Type (enctype):</label>
                <select
                  value={enctype}
                  onChange={(e) => setEnctype(e.target.value as any)}
                  className="w-full rounded border border-input bg-background p-2 font-mono"
                >
                  <option value="application/x-www-form-urlencoded">application/x-www-form-urlencoded (Default)</option>
                  <option value="multipart/form-data">multipart/form-data (For File Uploads)</option>
                  <option value="text/plain">text/plain (Plain Unencoded)</option>
                </select>
              </div>
            </div>

            <div className="rounded-lg border bg-slate-950 p-4 font-mono text-slate-200 text-xs space-y-3">
              <div className="text-emerald-400 font-bold border-b border-slate-800 pb-1 flex justify-between">
                <span>HTTP Request Package Inspector</span>
                <span className="text-slate-400">Content-Type: {enctype}</span>
              </div>

              {method === "get" ? (
                <div>
                  <span className="text-slate-400 block mb-1">Constructed URL Query String (GET):</span>
                  <div className="text-emerald-300 font-bold break-all bg-slate-900 p-2 rounded border border-slate-800">
                    https://api.domain.com/submit{queryPayload}
                  </div>
                </div>
              ) : (
                <div>
                  <span className="text-slate-400 block mb-1">HTTP POST Request Body Payload:</span>
                  <div className="bg-slate-900 p-3 rounded border border-slate-800 space-y-2">
                    {enctype === "application/x-www-form-urlencoded" && (
                      <div className="text-amber-300 break-all">{queryPayload.substring(1)}</div>
                    )}
                    {enctype === "multipart/form-data" && (
                      <div className="text-purple-300 whitespace-pre-wrap leading-relaxed">
                        {`------WebKitFormBoundary7MA4YWxk\nContent-Disposition: form-data; name="username"\n\n${username}\n------WebKitFormBoundary7MA4YWxk\nContent-Disposition: form-data; name="avatar"; filename="${fileName || "avatar.png"}"\nContent-Type: image/png\n\n[Binary File Buffer Payload]\n------WebKitFormBoundary7MA4YWxk--`}
                      </div>
                    )}
                    {enctype === "text/plain" && (
                      <div className="text-blue-300 whitespace-pre-wrap">
                        {`username=${username}\nemail=${email}\nplan=${plan}\ncountry=${country}`}
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="pt-2 border-t border-slate-800">
                <span className="text-slate-400 block mb-1">JavaScript FormData.entries() Iterable Output:</span>
                <div className="text-slate-300 bg-slate-900 p-2.5 rounded border border-slate-800 space-y-1 text-[11px]">
                  <div>[&quot;username&quot;, &quot;{username}&quot;]</div>
                  <div>[&quot;email&quot;, &quot;{email}&quot;]</div>
                  <div>[&quot;plan&quot;, &quot;{plan}&quot;]</div>
                  <div>[&quot;country&quot;, &quot;{country}&quot;]</div>
                  <div>[&quot;newsletter&quot;, &quot;{newsletter}&quot;]</div>
                  {fileName && <div>[&quot;avatar&quot;, File({fileName})]</div>}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: MOBILE KEYPADS & AUTOCOMPLETE */}
        {tab === "keypads" && (
          <div className="space-y-4">
            <div className="rounded-lg border border-border bg-muted/20 p-4">
              <div className="font-bold text-foreground mb-2">Simulated Soft Keyboard &amp; Autocomplete Behavior</div>
              <p className="text-muted-foreground text-xs mb-3">
                Focus on different input types below to see how smartphones adjust soft keyboard layouts and auto-fill password managers!
              </p>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <div>
                    <label className="font-medium text-foreground block mb-1">type=&quot;email&quot; (autocomplete=&quot;email&quot;):</label>
                    <input
                      type="email"
                      autoComplete="email"
                      placeholder="user@example.com"
                      onFocus={() => setActiveInputType("email")}
                      className="w-full rounded border border-input p-2 font-mono"
                    />
                  </div>
                  <div>
                    <label className="font-medium text-foreground block mb-1">type=&quot;tel&quot; (inputmode=&quot;tel&quot;):</label>
                    <input
                      type="tel"
                      inputMode="tel"
                      placeholder="+1 (555) 000-0000"
                      onFocus={() => setActiveInputType("tel")}
                      className="w-full rounded border border-input p-2 font-mono"
                    />
                  </div>
                  <div>
                    <label className="font-medium text-foreground block mb-1">type=&quot;number&quot; (inputmode=&quot;numeric&quot;):</label>
                    <input
                      type="number"
                      inputMode="numeric"
                      placeholder="123456"
                      onFocus={() => setActiveInputType("numeric")}
                      className="w-full rounded border border-input p-2 font-mono"
                    />
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-slate-900 p-4 text-slate-100 font-mono">
                  <div className="text-[10px] text-slate-400 uppercase font-bold mb-2">Simulated Mobile Soft Keypad</div>
                  <div className="w-full max-w-[220px] rounded-lg bg-slate-800 p-3 space-y-2 border border-slate-700 shadow-md">
                    {activeInputType === "email" && (
                      <div>
                        <div className="grid grid-cols-3 gap-1 text-center font-bold text-xs mb-2">
                          <span className="bg-slate-700 p-1.5 rounded">q</span><span className="bg-slate-700 p-1.5 rounded">w</span><span className="bg-slate-700 p-1.5 rounded">e</span>
                        </div>
                        <div className="flex justify-between bg-primary text-primary-foreground p-1.5 rounded text-[11px] font-bold">
                          <span>@</span><span>.com</span><span>.org</span>
                        </div>
                      </div>
                    )}

                    {(activeInputType === "tel" || activeInputType === "numeric") && (
                      <div className="grid grid-cols-3 gap-1 text-center font-bold text-sm">
                        {["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"].map((k) => (
                          <div key={k} className="bg-slate-700 p-2 rounded shadow-xs">{k}</div>
                        ))}
                      </div>
                    )}

                    {activeInputType !== "email" && activeInputType !== "tel" && activeInputType !== "numeric" && (
                      <div className="text-center text-slate-400 text-[11px] py-4">Standard QWERTY Keyboard</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: CONSTRAINT VALIDATION API */}
        {tab === "validation" && (
          <div className="space-y-4">
            <div className="rounded-lg border border-border bg-card p-4 space-y-3">
              <div className="font-bold text-foreground">Browser Constraint Validation Rules Configurator</div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div>
                  <label className="font-medium text-foreground block mb-1">required attribute:</label>
                  <button
                    type="button"
                    onClick={() => setIsRequired(!isRequired)}
                    className={`w-full rounded px-3 py-1.5 font-mono border ${isRequired ? "bg-emerald-600 text-white" : "bg-muted"}`}
                  >
                    {isRequired ? "required = TRUE" : "required = FALSE"}
                  </button>
                </div>

                <div>
                  <label className="font-medium text-foreground block mb-1">minlength attribute: {minLen}</label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={minLen}
                    onChange={(e) => setMinLen(Number(e.target.value))}
                    className="w-full accent-primary"
                  />
                </div>

                <div>
                  <label className="font-medium text-foreground block mb-1">pattern regex (e.g. ^[A-Z]+$):</label>
                  <input
                    type="text"
                    value={patternRegex}
                    onChange={(e) => setPatternRegex(e.target.value)}
                    placeholder="^[a-zA-Z0-9]+$"
                    className="w-full rounded border border-input p-1.5 font-mono text-xs"
                  />
                </div>
              </div>

              <div className="rounded bg-muted/40 p-3 font-mono text-xs space-y-1">
                <div>&lt;input type=&quot;text&quot; {isRequired ? "required " : ""}{minLen ? `minlength="${minLen}" ` : ""}{patternRegex ? `pattern="${patternRegex}" ` : ""}/&gt;</div>
                <div className="text-muted-foreground text-[11px] pt-1">
                  Evaluates <code className="text-primary font-bold">input.checkValidity()</code> &amp; validity state properties: <code className="text-primary">validity.valueMissing</code>, <code className="text-primary">validity.tooShort</code>, <code className="text-primary">validity.patternMismatch</code>.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/** 12. Lists & Tables Playground */
export function ListsTablesPlayground() {
  return (
    <div className="my-8 rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <h4 className="flex items-center gap-2 font-heading text-sm font-semibold text-foreground">
          <List className="size-4 text-primary" /> Accessible Data Table Builder
        </h4>
        <span className="rounded bg-primary/10 px-2 py-0.5 font-mono text-xs font-medium text-primary">
          Tables &amp; Lists
        </span>
      </div>

      <div className="mt-4 overflow-x-auto text-xs">
        <table className="w-full border-collapse border border-border text-left">
          <thead className="bg-muted">
            <tr>
              <th scope="col" className="border border-border p-2.5 font-bold text-foreground">Student Name</th>
              <th scope="col" className="border border-border p-2.5 font-bold text-foreground">Module</th>
              <th scope="col" className="border border-border p-2.5 font-bold text-foreground">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-border p-2.5">Saurabh</td>
              <td className="border border-border p-2.5 font-mono">Phase 01: HTML</td>
              <td className="border border-border p-2.5 text-emerald-600 font-semibold">Completed</td>
            </tr>
            <tr className="bg-muted/20">
              <td className="border border-border p-2.5">Alex</td>
              <td className="border border-border p-2.5 font-mono">Phase 02: CSS</td>
              <td className="border border-border p-2.5 text-primary font-semibold">In Progress</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

/** 13. Multimedia Playground */
export function MultimediaPlayground() {
  return (
    <div className="my-8 rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <h4 className="flex items-center gap-2 font-heading text-sm font-semibold text-foreground">
          <Film className="size-4 text-primary" /> Responsive &lt;picture&gt; Fallback Simulator
        </h4>
        <span className="rounded bg-primary/10 px-2 py-0.5 font-mono text-xs font-medium text-primary">
          Media Elements
        </span>
      </div>

      <div className="mt-4 space-y-3 text-xs">
        <div className="rounded-lg border bg-slate-950 p-4 font-mono text-slate-200 text-[11px]">
          {`<picture>\n  <source srcset="hero-dark.webp" media="(prefers-color-scheme: dark)" type="image/webp" />\n  <source srcset="hero-large.avif" type="image/avif" />\n  <img src="hero-fallback.jpg" alt="Responsive Hero Banner" />\n</picture>`}
        </div>
      </div>
    </div>
  );
}

/** 14. SEO Meta Previewer */
export function SeoMetaPreviewer() {
  const [title, setTitle] = useState("Complete Frontend Web Development Roadmap 2026");
  const [desc, setDesc] = useState("Learn HTML, CSS, JavaScript, React, TypeScript, and Next.js step-by-step with industry-grade interactive playgrounds.");

  return (
    <div className="my-8 rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <h4 className="flex items-center gap-2 font-heading text-sm font-semibold text-foreground">
          <Search className="size-4 text-primary" /> SEO & Social Share Card Previewer
        </h4>
        <span className="rounded bg-primary/10 px-2 py-0.5 font-mono text-xs font-medium text-primary">
          SEO Meta
        </span>
      </div>

      <div className="mt-4 space-y-4 text-xs">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <div>
            <label className="mb-1 font-medium block text-foreground">&lt;title&gt; tag:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded border border-input bg-background p-2 font-mono text-xs"
            />
          </div>
          <div>
            <label className="mb-1 font-medium block text-foreground">meta name=&quot;description&quot;:</label>
            <input
              type="text"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="w-full rounded border border-input bg-background p-2 font-mono text-xs"
            />
          </div>
        </div>

        <div className="rounded-lg border bg-muted/20 p-4 space-y-2">
          <div className="font-mono text-[10px] uppercase font-bold text-muted-foreground">Google Search Snippet Preview</div>
          <div className="text-blue-600 dark:text-blue-400 font-heading font-semibold text-base hover:underline cursor-pointer">
            {title}
          </div>
          <div className="text-emerald-700 dark:text-emerald-400 font-mono text-[11px]">
            https://frontend-roadmap.dev/learning
          </div>
          <div className="text-muted-foreground text-xs line-clamp-2">
            {desc}
          </div>
        </div>
      </div>
    </div>
  );
}

/** 15. Accessibility Tree Playground */
export function AccessibilityTreePlayground() {
  const [role, setRole] = useState("button");

  return (
    <div className="my-8 rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <h4 className="flex items-center gap-2 font-heading text-sm font-semibold text-foreground">
          <Eye className="size-4 text-primary" /> Accessibility Tree & ARIA Role Inspector
        </h4>
        <span className="rounded bg-primary/10 px-2 py-0.5 font-mono text-xs font-medium text-primary">
          WCAG Accessibility
        </span>
      </div>

      <div className="mt-4 space-y-3 text-xs">
        <div className="flex gap-2">
          {["button", "navigation", "dialog"].map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRole(r)}
              className={`rounded px-3 py-1 font-mono text-xs border ${
                role === r ? "bg-primary text-primary-foreground border-primary" : "bg-muted border-border"
              }`}
            >
              role=&quot;{r}&quot;
            </button>
          ))}
        </div>

        <div className="rounded-lg border bg-muted/20 p-4 font-mono text-xs space-y-2">
          <div><span className="text-muted-foreground">Computed ARIA Role:</span> <strong className="text-primary">{role}</strong></div>
          <div><span className="text-muted-foreground">Focusable:</span> <strong className="text-emerald-600">Yes (Keyboard Tab Accessible)</strong></div>
        </div>
      </div>
    </div>
  );
}
