"use client";

import { useState } from "react";
import { Sliders, RefreshCw, Layers, Sparkles, Check, Move, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";

/** 1. Box Model Playground */
export function BoxModelPlayground() {
  const [boxSizing, setBoxSizing] = useState<"border-box" | "content-box">("border-box");
  const [width, setWidth] = useState(240);
  const [height, setHeight] = useState(120);
  const [padding, setPadding] = useState(20);
  const [border, setBorder] = useState(8);
  const [margin, setMargin] = useState(16);

  const computedWidth = boxSizing === "border-box" ? width : width + padding * 2 + border * 2;
  const computedHeight = boxSizing === "border-box" ? height : height + padding * 2 + border * 2;

  return (
    <div className="my-8 rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <h4 className="flex items-center gap-2 font-heading text-sm font-semibold text-foreground">
          <Sliders className="size-4 text-primary" /> Interactive Box Model Visualizer
        </h4>
        <span className="rounded bg-primary/10 px-2 py-0.5 font-mono text-xs font-medium text-primary">
          Live Playground
        </span>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Controls */}
        <div className="space-y-4 text-xs">
          <div>
            <label className="mb-1.5 font-medium text-foreground block">
              box-sizing: <span className="font-mono text-primary">{boxSizing}</span>
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setBoxSizing("border-box")}
                className={`rounded px-3 py-1.5 font-mono text-xs border transition ${
                  boxSizing === "border-box"
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-muted border-border hover:bg-accent"
                }`}
              >
                border-box (Industry Standard)
              </button>
              <button
                type="button"
                onClick={() => setBoxSizing("content-box")}
                className={`rounded px-3 py-1.5 font-mono text-xs border transition ${
                  boxSizing === "content-box"
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-muted border-border hover:bg-accent"
                }`}
              >
                content-box (Legacy Default)
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-muted-foreground mb-1">
                <span>CSS Width: {width}px</span>
                <span>CSS Height: {height}px</span>
              </div>
              <input
                type="range"
                min="160"
                max="320"
                value={width}
                onChange={(e) => setWidth(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>

            <div>
              <div className="flex justify-between text-muted-foreground mb-1">
                <span>Padding: {padding}px</span>
                <span>Border: {border}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="40"
                value={padding}
                onChange={(e) => setPadding(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>

            <div>
              <div className="flex justify-between text-muted-foreground mb-1">
                <span>Margin: {margin}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="40"
                value={margin}
                onChange={(e) => setMargin(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>
          </div>

          <div className="rounded-lg bg-muted/60 p-3 font-mono text-[11px] leading-relaxed text-foreground">
            <div>Total On-Screen Width: <strong>{computedWidth}px</strong></div>
            <div>Total On-Screen Height: <strong>{computedHeight}px</strong></div>
          </div>
        </div>

        {/* Visual Box */}
        <div className="flex items-center justify-center rounded-lg bg-muted/40 p-4 border border-dashed border-border min-h-[260px] overflow-hidden">
          <div
            style={{ margin: `${margin}px` }}
            className="transition-all duration-150 rounded bg-amber-500/20 p-2 text-center"
          >
            <span className="block font-mono text-[10px] uppercase text-amber-600 dark:text-amber-400 font-semibold mb-1">
              Margin ({margin}px)
            </span>
            <div
              style={{ borderWidth: `${border}px` }}
              className="border-solid border-emerald-500/80 bg-emerald-500/10 p-2 rounded"
            >
              <span className="block font-mono text-[10px] uppercase text-emerald-600 dark:text-emerald-400 font-semibold mb-1">
                Border ({border}px)
              </span>
              <div
                style={{ padding: `${padding}px` }}
                className="bg-blue-500/20 rounded"
              >
                <span className="block font-mono text-[10px] uppercase text-blue-600 dark:text-blue-400 font-semibold mb-1">
                  Padding ({padding}px)
                </span>
                <div
                  style={{
                    width: boxSizing === "border-box" ? `${width - padding * 2 - border * 2}px` : `${width}px`,
                    height: boxSizing === "border-box" ? `${height - padding * 2 - border * 2}px` : `${height}px`,
                  }}
                  className="flex items-center justify-center bg-primary text-primary-foreground font-mono text-xs rounded font-bold shadow-inner mx-auto transition-all"
                >
                  Content
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** 2. Specificity Calculator */
export function SpecificityCalculator() {
  const [selector, setSelector] = useState("header nav ul li.active a:hover#main-link");

  function calculateSpecificity(sel: string) {
    let inline = 0;
    let ids = 0;
    let classes = 0;
    let elements = 0;

    const tokens = sel.trim().split(/\s+/).filter(Boolean);

    for (const token of tokens) {
      if (token.includes("style=")) inline++;
      ids += (token.match(/#[a-zA-Z0-9_-]+/g) || []).length;
      classes += (token.match(/\.[a-zA-Z0-9_-]+/g) || []).length;
      classes += (token.match(/\[[^\]]+\]/g) || []).length;
      classes += (token.match(/:[a-zA-Z0-9_-]+/g) || []).filter((p) => p !== ":where").length;
      elements += (token.match(/^[a-zA-Z0-9]+|(?<=[\s>+~])[a-zA-Z0-9]+/g) || []).length;
    }

    return { inline, ids, classes, elements };
  }

  const result = calculateSpecificity(selector);

  return (
    <div className="my-8 rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <h4 className="flex items-center gap-2 font-heading text-sm font-semibold text-foreground">
          <Sparkles className="size-4 text-primary" /> Specificity Score Calculator
        </h4>
        <span className="rounded bg-primary/10 px-2 py-0.5 font-mono text-xs font-medium text-primary">
          Live Interactive
        </span>
      </div>

      <div className="mt-4 space-y-4">
        <div>
          <label className="mb-1 text-xs font-medium text-foreground block">
            Enter CSS Selector:
          </label>
          <input
            type="text"
            value={selector}
            onChange={(e) => setSelector(e.target.value)}
            placeholder="e.g. #nav .menu-item:hover a"
            className="w-full rounded-md border border-input bg-background px-3 py-2 font-mono text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="grid grid-cols-4 gap-3 text-center">
          <div className="rounded-lg border border-purple-500/30 bg-purple-500/10 p-3">
            <span className="text-[10px] uppercase font-bold text-purple-600 dark:text-purple-400 block">Inline</span>
            <span className="font-mono text-xl font-extrabold text-foreground">{result.inline}</span>
          </div>
          <div className="rounded-lg border border-blue-500/30 bg-blue-500/10 p-3">
            <span className="text-[10px] uppercase font-bold text-blue-600 dark:text-blue-400 block">IDs</span>
            <span className="font-mono text-xl font-extrabold text-foreground">{result.ids}</span>
          </div>
          <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3">
            <span className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400 block">Classes / Attributes / Pseudos</span>
            <span className="font-mono text-xl font-extrabold text-foreground">{result.classes}</span>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-3">
            <span className="text-[10px] uppercase font-bold text-amber-600 dark:text-amber-400 block">Elements</span>
            <span className="font-mono text-xl font-extrabold text-foreground">{result.elements}</span>
          </div>
        </div>

        <div className="flex items-center justify-between rounded-lg bg-muted p-3 font-mono text-xs">
          <span>Specificity Tuple Format:</span>
          <span className="font-bold text-primary text-sm">
            ({result.inline}, {result.ids}, {result.classes}, {result.elements})
          </span>
        </div>
      </div>
    </div>
  );
}

/** 3. Color & Units Studio */
export function ColorUnitsStudio() {
  const [hue, setHue] = useState(210);
  const [saturation, setSaturation] = useState(85);
  const [lightness, setLightness] = useState(55);
  const [remSize, setRemSize] = useState(1.25);

  const hslColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

  return (
    <div className="my-8 rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <h4 className="flex items-center gap-2 font-heading text-sm font-semibold text-foreground">
          <Sliders className="size-4 text-primary" /> Modern Colors & Units Studio
        </h4>
        <span className="rounded bg-primary/10 px-2 py-0.5 font-mono text-xs font-medium text-primary">
          Live Studio
        </span>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="space-y-4 text-xs">
          <div>
            <div className="flex justify-between font-mono mb-1">
              <span>Hue: {hue}°</span>
              <span>Sat: {saturation}%</span>
              <span>Light: {lightness}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="360"
              value={hue}
              onChange={(e) => setHue(Number(e.target.value))}
              className="w-full accent-primary"
            />
          </div>

          <div>
            <label className="mb-1 font-medium text-foreground block">
              Font Size in rem: <span className="font-mono text-primary">{remSize}rem</span> ({remSize * 16}px at 16px root)
            </label>
            <input
              type="range"
              min="0.75"
              max="2.5"
              step="0.125"
              value={remSize}
              onChange={(e) => setRemSize(Number(e.target.value))}
              className="w-full accent-primary"
            />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-border p-4 bg-muted/20">
          <div
            style={{ backgroundColor: hslColor }}
            className="size-20 rounded-full shadow-md transition-all border-4 border-background"
          />
          <div
            style={{ fontSize: `${remSize}rem`, color: hslColor }}
            className="font-bold font-heading text-center transition-all"
          >
            Dynamic Typography ({remSize}rem)
          </div>
          <div className="font-mono text-[11px] text-muted-foreground bg-muted px-2.5 py-1 rounded">
            CSS: {hslColor}
          </div>
        </div>
      </div>
    </div>
  );
}

/** 4. Typography Playground */
export function TypographyPlayground() {
  const [lineHeight, setLineHeight] = useState(1.6);
  const [letterSpacing, setLetterSpacing] = useState(0);
  const [fontWeight, setFontWeight] = useState(400);
  const [textWrap, setTextWrap] = useState<"auto" | "balance" | "pretty">("balance");

  return (
    <div className="my-8 rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <h4 className="flex items-center gap-2 font-heading text-sm font-semibold text-foreground">
          <Sliders className="size-4 text-primary" /> Typography & Text Wrapping Studio
        </h4>
        <span className="rounded bg-primary/10 px-2 py-0.5 font-mono text-xs font-medium text-primary">
          Live Demo
        </span>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="space-y-4 text-xs">
          <div>
            <label className="mb-1 font-medium text-foreground block">
              line-height: <span className="font-mono text-primary">{lineHeight}</span>
            </label>
            <input
              type="range"
              min="1.0"
              max="2.2"
              step="0.1"
              value={lineHeight}
              onChange={(e) => setLineHeight(Number(e.target.value))}
              className="w-full accent-primary"
            />
          </div>

          <div>
            <label className="mb-1 font-medium text-foreground block">
              letter-spacing: <span className="font-mono text-primary">{letterSpacing}px</span>
            </label>
            <input
              type="range"
              min="-2"
              max="6"
              step="0.5"
              value={letterSpacing}
              onChange={(e) => setLetterSpacing(Number(e.target.value))}
              className="w-full accent-primary"
            />
          </div>

          <div>
            <label className="mb-1 font-medium text-foreground block">
              font-weight: <span className="font-mono text-primary">{fontWeight}</span>
            </label>
            <input
              type="range"
              min="300"
              max="900"
              step="100"
              value={fontWeight}
              onChange={(e) => setFontWeight(Number(e.target.value))}
              className="w-full accent-primary"
            />
          </div>

          <div>
            <label className="mb-1.5 font-medium text-foreground block">
              text-wrap: <span className="font-mono text-primary">{textWrap}</span>
            </label>
            <div className="flex gap-2">
              {(["auto", "balance", "pretty"] as const).map((wrap) => (
                <button
                  key={wrap}
                  type="button"
                  onClick={() => setTextWrap(wrap)}
                  className={`rounded px-3 py-1 font-mono text-xs border transition ${
                    textWrap === wrap
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-muted border-border hover:bg-accent"
                  }`}
                >
                  {wrap}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-muted/20 p-5">
          <h3
            style={{
              lineHeight,
              letterSpacing: `${letterSpacing}px`,
              fontWeight,
              textWrap,
            }}
            className="font-heading text-xl text-foreground"
          >
            Crafting Industry-Grade Frontends with Precision & Polish
          </h3>
          <p
            style={{ lineHeight, letterSpacing: `${letterSpacing}px` }}
            className="mt-3 text-xs text-muted-foreground"
          >
            Good typography improves readability, establishes visual hierarchy, and makes user interfaces feel premium and intentional.
          </p>
        </div>
      </div>
    </div>
  );
}

/** 5. Positioning Playground */
export function PositioningPlayground() {
  const [position, setPosition] = useState<"relative" | "absolute" | "fixed" | "sticky">("relative");
  const [top, setTop] = useState(20);
  const [left, setLeft] = useState(20);
  const [zIndex, setZIndex] = useState(10);

  return (
    <div className="my-8 rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <h4 className="flex items-center gap-2 font-heading text-sm font-semibold text-foreground">
          <Move className="size-4 text-primary" /> CSS Positioning & Stacking Context Sandbox
        </h4>
        <span className="rounded bg-primary/10 px-2 py-0.5 font-mono text-xs font-medium text-primary">
          Live Interactive
        </span>
      </div>

      <div className="mt-4 space-y-4">
        <div className="flex flex-wrap gap-2 text-xs">
          {(["relative", "absolute", "sticky"] as const).map((pos) => (
            <button
              key={pos}
              type="button"
              onClick={() => setPosition(pos)}
              className={`rounded px-3 py-1.5 font-mono text-xs border transition ${
                position === pos
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-muted border-border hover:bg-accent"
              }`}
            >
              position: {pos}
            </button>
          ))}
        </div>

        <div className="relative h-48 overflow-y-auto rounded-lg border border-dashed border-border bg-muted/30 p-4">
          <div className="h-96 space-y-3">
            <div className="rounded bg-muted p-2 font-mono text-xs text-muted-foreground">
              Scroll container (parent context)
            </div>

            <div
              style={{
                position,
                top: `${top}px`,
                left: `${left}px`,
                zIndex,
              }}
              className="w-48 rounded-lg bg-primary p-3 text-primary-foreground shadow-lg transition-all font-mono text-xs"
            >
              <div className="font-bold">Target Box</div>
              <div>position: {position}</div>
              <div>top: {top}px</div>
              <div>left: {left}px</div>
            </div>

            <div className="rounded bg-card p-3 border border-border font-mono text-xs text-muted-foreground">
              Normal Flow Element A
            </div>
            <div className="rounded bg-card p-3 border border-border font-mono text-xs text-muted-foreground">
              Normal Flow Element B
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** 6. Flexbox Playground */
export function FlexboxPlayground() {
  const [direction, setDirection] = useState<"row" | "column">("row");
  const [justify, setJustify] = useState<"flex-start" | "center" | "flex-end" | "space-between" | "space-around">("space-between");
  const [align, setAlign] = useState<"flex-start" | "center" | "flex-end" | "stretch">("center");
  const [gap, setGap] = useState(16);
  const [itemCount, setItemCount] = useState(4);

  return (
    <div className="my-8 rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <h4 className="flex items-center gap-2 font-heading text-sm font-semibold text-foreground">
          <Sliders className="size-4 text-primary" /> Interactive Flexbox Visualizer
        </h4>
        <span className="rounded bg-primary/10 px-2 py-0.5 font-mono text-xs font-medium text-primary">
          1D Layout Engine
        </span>
      </div>

      <div className="mt-4 space-y-4 text-xs">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <label className="mb-1 font-medium block text-foreground">flex-direction</label>
            <select
              value={direction}
              onChange={(e) => setDirection(e.target.value as any)}
              className="w-full rounded border border-input bg-background p-1.5 font-mono text-xs"
            >
              <option value="row">row</option>
              <option value="column">column</option>
            </select>
          </div>

          <div>
            <label className="mb-1 font-medium block text-foreground">justify-content</label>
            <select
              value={justify}
              onChange={(e) => setJustify(e.target.value as any)}
              className="w-full rounded border border-input bg-background p-1.5 font-mono text-xs"
            >
              <option value="flex-start">flex-start</option>
              <option value="center">center</option>
              <option value="flex-end">flex-end</option>
              <option value="space-between">space-between</option>
              <option value="space-around">space-around</option>
            </select>
          </div>

          <div>
            <label className="mb-1 font-medium block text-foreground">align-items</label>
            <select
              value={align}
              onChange={(e) => setAlign(e.target.value as any)}
              className="w-full rounded border border-input bg-background p-1.5 font-mono text-xs"
            >
              <option value="flex-start">flex-start</option>
              <option value="center">center</option>
              <option value="flex-end">flex-end</option>
              <option value="stretch">stretch</option>
            </select>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: direction,
            justifyContent: justify,
            alignItems: align,
            gap: `${gap}px`,
          }}
          className="min-h-[200px] rounded-lg border border-dashed border-border bg-muted/30 p-4 transition-all"
        >
          {Array.from({ length: itemCount }).map((_, i) => (
            <div
              key={i}
              className="flex h-16 w-20 items-center justify-center rounded-lg bg-primary font-mono text-xs font-bold text-primary-foreground shadow-sm transition-all"
            >
              Item {i + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** 7. CSS Grid Playground */
export function CssGridPlayground() {
  const [columns, setColumns] = useState("repeat(3, 1fr)");
  const [gap, setGap] = useState(16);
  const [itemCount, setItemCount] = useState(6);

  return (
    <div className="my-8 rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <h4 className="flex items-center gap-2 font-heading text-sm font-semibold text-foreground">
          <Layers className="size-4 text-primary" /> Interactive CSS Grid Builder
        </h4>
        <span className="rounded bg-primary/10 px-2 py-0.5 font-mono text-xs font-medium text-primary">
          2D Layout Engine
        </span>
      </div>

      <div className="mt-4 space-y-4 text-xs">
        <div>
          <label className="mb-1.5 font-medium block text-foreground">
            grid-template-columns preset:
          </label>
          <div className="flex flex-wrap gap-2">
            {[
              "repeat(3, 1fr)",
              "repeat(auto-fit, minmax(140px, 1fr))",
              "200px 1fr",
              "1fr 2fr 1fr",
            ].map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => setColumns(preset)}
                className={`rounded px-3 py-1 font-mono text-xs border transition ${
                  columns === preset
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-muted border-border hover:bg-accent"
                }`}
              >
                {preset}
              </button>
            ))}
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: columns,
            gap: `${gap}px`,
          }}
          className="min-h-[220px] rounded-lg border border-dashed border-border bg-muted/30 p-4 transition-all"
        >
          {Array.from({ length: itemCount }).map((_, i) => (
            <div
              key={i}
              className="flex min-h-[70px] items-center justify-center rounded-lg border border-border bg-card p-3 font-mono text-xs font-semibold text-foreground shadow-xs"
            >
              Card {i + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** 8. Responsive Container Playground */
export function ResponsiveContainerPlayground() {
  const [width, setWidth] = useState(500);

  return (
    <div className="my-8 rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <h4 className="flex items-center gap-2 font-heading text-sm font-semibold text-foreground">
          <Maximize2 className="size-4 text-primary" /> Container Queries vs Media Queries Simulator
        </h4>
        <span className="rounded bg-primary/10 px-2 py-0.5 font-mono text-xs font-medium text-primary">
          Modern Responsive
        </span>
      </div>

      <div className="mt-4 space-y-4 text-xs">
        <div>
          <label className="mb-1 font-medium block text-foreground">
            Resize Card Container Width: <span className="font-mono text-primary">{width}px</span>
          </label>
          <input
            type="range"
            min="280"
            max="680"
            value={width}
            onChange={(e) => setWidth(Number(e.target.value))}
            className="w-full accent-primary"
          />
        </div>

        <div className="flex justify-center rounded-lg border border-dashed border-border bg-muted/30 p-4">
          <div
            style={{ width: `${width}px` }}
            className={`transition-all duration-200 rounded-xl border border-border bg-card p-4 shadow-sm ${
              width > 480 ? "flex items-center justify-between gap-4" : "block space-y-3"
            }`}
          >
            <div>
              <div className="font-heading font-bold text-foreground">Component Card</div>
              <div className="text-muted-foreground text-xs">
                {width > 480 ? "Wide layout triggered by container size" : "Stacked layout triggered by narrow container"}
              </div>
            </div>
            <Button size="sm" className="w-full sm:w-auto">
              Action
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

/** 9. Custom Properties Playground */
export function CustomPropertiesPlayground() {
  const [themeColor, setThemeColor] = useState("#3b82f6");

  return (
    <div className="my-8 rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <h4 className="flex items-center gap-2 font-heading text-sm font-semibold text-foreground">
          <Sparkles className="size-4 text-primary" /> Dynamic CSS Token & Variable Editor
        </h4>
        <span className="rounded bg-primary/10 px-2 py-0.5 font-mono text-xs font-medium text-primary">
          Design Tokens
        </span>
      </div>

      <div className="mt-4 space-y-4 text-xs">
        <div className="flex items-center gap-3">
          <label className="font-medium text-foreground">Pick Accent Token (--brand-accent):</label>
          <input
            type="color"
            value={themeColor}
            onChange={(e) => setThemeColor(e.target.value)}
            className="size-8 cursor-pointer rounded border border-border bg-transparent p-0"
          />
          <span className="font-mono text-xs text-muted-foreground">{themeColor}</span>
        </div>

        <div
          style={{ "--brand-accent": themeColor } as React.CSSProperties}
          className="rounded-lg border border-border bg-muted/20 p-5 space-y-3"
        >
          <div style={{ color: "var(--brand-accent)" }} className="font-heading font-bold text-lg">
            Headline styled with var(--brand-accent)
          </div>
          <button
            style={{ backgroundColor: "var(--brand-accent)" }}
            className="rounded px-4 py-2 text-white font-mono text-xs font-medium shadow-xs"
          >
            Button styled with var(--brand-accent)
          </button>
        </div>
      </div>
    </div>
  );
}

/** 10. Pseudo Selector Playground */
export function PseudoSelectorPlayground() {
  const [formula, setFormula] = useState("2n+1");

  return (
    <div className="my-8 rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <h4 className="flex items-center gap-2 font-heading text-sm font-semibold text-foreground">
          <Sliders className="size-4 text-primary" /> :nth-child(an+b) Formula Visualizer
        </h4>
        <span className="rounded bg-primary/10 px-2 py-0.5 font-mono text-xs font-medium text-primary">
          Pseudo Selector
        </span>
      </div>

      <div className="mt-4 space-y-4 text-xs">
        <div className="flex flex-wrap gap-2">
          {["2n", "2n+1", "3n", "odd", "even", "n+4"].map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFormula(f)}
              className={`rounded px-3 py-1 font-mono text-xs border transition ${
                formula === f
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-muted border-border hover:bg-accent"
              }`}
            >
              :nth-child({f})
            </button>
          ))}
        </div>

        <div className="grid grid-cols-6 gap-2">
          {Array.from({ length: 12 }).map((_, idx) => {
            const n = idx + 1;
            let matched = false;
            if (formula === "2n") matched = n % 2 === 0;
            else if (formula === "2n+1" || formula === "odd") matched = n % 2 !== 0;
            else if (formula === "even") matched = n % 2 === 0;
            else if (formula === "3n") matched = n % 3 === 0;
            else if (formula === "n+4") matched = n >= 4;

            return (
              <div
                key={idx}
                className={`flex h-12 items-center justify-center rounded border font-mono text-xs transition ${
                  matched
                    ? "bg-primary text-primary-foreground font-bold border-primary shadow-sm"
                    : "bg-muted text-muted-foreground border-border"
                }`}
              >
                {n}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/** 11. Animation Studio */
export function AnimationStudio() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [duration, setDuration] = useState(1.5);
  const [timing, setTiming] = useState("cubic-bezier(0.4, 0, 0.2, 1)");

  return (
    <div className="my-8 rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <h4 className="flex items-center gap-2 font-heading text-sm font-semibold text-foreground">
          <RefreshCw className="size-4 text-primary" /> Keyframe & Transition Studio
        </h4>
        <span className="rounded bg-primary/10 px-2 py-0.5 font-mono text-xs font-medium text-primary">
          CSS Motion
        </span>
      </div>

      <div className="mt-4 space-y-4 text-xs">
        <div className="flex items-center gap-3">
          <Button size="sm" onClick={() => setIsAnimating(!isAnimating)}>
            {isAnimating ? "Reset Animation" : "Play Animation"}
          </Button>
          <span className="font-mono text-xs text-muted-foreground">
            Duration: {duration}s · {timing}
          </span>
        </div>

        <div className="relative h-24 rounded-lg border border-dashed border-border bg-muted/30 p-4">
          <div
            style={{
              transition: `transform ${duration}s ${timing}`,
              transform: isAnimating ? "translateX(calc(100% - 64px)) scale(1.1)" : "translateX(0) scale(1)",
            }}
            className="size-16 rounded-xl bg-primary flex items-center justify-center font-mono text-xs font-bold text-primary-foreground shadow-md"
          >
            Box
          </div>
        </div>
      </div>
    </div>
  );
}

/** 12. CSS Functions Lab */
export function CssFunctionsLab() {
  const [minVal, setMinVal] = useState(16);
  const [prefVal, setPrefVal] = useState(4);
  const [maxVal, setMaxVal] = useState(32);

  return (
    <div className="my-8 rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <h4 className="flex items-center gap-2 font-heading text-sm font-semibold text-foreground">
          <Sliders className="size-4 text-primary" /> CSS clamp(min, pref, max) Lab
        </h4>
        <span className="rounded bg-primary/10 px-2 py-0.5 font-mono text-xs font-medium text-primary">
          Math Functions
        </span>
      </div>

      <div className="mt-4 space-y-4 text-xs">
        <div className="rounded bg-muted p-3 font-mono text-xs text-foreground">
          clamp({minVal}px, {prefVal}vw, {maxVal}px)
        </div>

        <div className="rounded-lg border border-border bg-card p-4 text-center">
          <div
            style={{
              fontSize: `clamp(${minVal}px, ${prefVal}vw, ${maxVal}px)`,
            }}
            className="font-heading font-bold text-foreground transition-all"
          >
            Fluid Clamp Heading
          </div>
        </div>
      </div>
    </div>
  );
}

/** 13. Tailwind Sandbox */
export function TailwindSandbox() {
  const [classes, setClasses] = useState("p-4 rounded-xl bg-primary text-primary-foreground font-bold shadow-md text-center");

  return (
    <div className="my-8 rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <h4 className="flex items-center gap-2 font-heading text-sm font-semibold text-foreground">
          <Sparkles className="size-4 text-primary" /> Tailwind CSS Utility Sandbox
        </h4>
        <span className="rounded bg-primary/10 px-2 py-0.5 font-mono text-xs font-medium text-primary">
          Tailwind v4
        </span>
      </div>

      <div className="mt-4 space-y-4 text-xs">
        <div>
          <label className="mb-1 font-medium block text-foreground">Edit Utility Classes:</label>
          <input
            type="text"
            value={classes}
            onChange={(e) => setClasses(e.target.value)}
            className="w-full rounded border border-input bg-background p-2 font-mono text-xs focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="rounded-lg border border-dashed border-border bg-muted/30 p-6 flex items-center justify-center">
          <div className={classes}>Live Tailwind Rendered Component</div>
        </div>
      </div>
    </div>
  );
}
