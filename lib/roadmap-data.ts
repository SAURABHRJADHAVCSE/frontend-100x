export type RoadmapItem = {
  id: string;
  title: string;
  description: string;
};

export type RoadmapResource = {
  label: string;
  url: string;
  free: boolean;
};

export type RoadmapPhase = {
  id: string;
  number: string;
  title: string;
  duration: string;
  /** CSS variable name (defined in globals.css) used as this phase's accent color */
  accentVar: string;
  items: RoadmapItem[];
  resources: RoadmapResource[];
};

export const ROADMAP_PHASES: RoadmapPhase[] = [
  {
    id: "dev-setup",
    number: "00",
    title: "Dev Setup & Internet Basics",
    duration: "1 week",
    accentVar: "--phase-0",
    items: [
      { id: "p0a", title: "How the internet works", description: "TCP/IP, DNS, HTTP/HTTPS, request-response cycle, browsers & servers" },
      { id: "p0b", title: "Terminal / command line basics", description: "navigation (cd, ls, mkdir), file ops, basic shell commands" },
      { id: "p0c", title: "Git fundamentals", description: "init, add, commit, push, pull, branches, merge, rebase basics" },
      { id: "p0d", title: "GitHub essentials", description: "repos, branches, pull requests, issues, GitHub Pages, README" },
      { id: "p0e", title: "VS Code setup & extensions", description: "Prettier, ESLint, GitLens, Live Server, Emmet, Path Intellisense" },
      { id: "p0f", title: "Browser DevTools", description: "Elements, Console, Network, Performance, Application panels" },
    ],
    resources: [
      { label: "roadmap.sh/frontend", url: "https://roadmap.sh/frontend", free: true },
      { label: "The Odin Project: Foundations", url: "https://www.theodinproject.com/paths/foundations", free: true },
    ],
  },
  {
    id: "html",
    number: "01",
    title: "HTML — The Skeleton",
    duration: "2 weeks",
    accentVar: "--phase-1",
    items: [
      { id: "p1a", title: "HTML document structure", description: "doctype, html, head, body, charset, viewport meta tag" },
      { id: "p1b", title: "Semantic elements", description: "header, nav, main, section, article, aside, footer — and why they matter" },
      { id: "p1c", title: "Text & typography elements", description: "h1-h6, p, span, strong, em, blockquote, code, pre, abbr" },
      { id: "p1d", title: "Links & images", description: "anchor, href, target, relative vs absolute paths, alt, srcset, lazy loading" },
      { id: "p1e", title: "HTML forms", description: "input types, label, placeholder, required, pattern, fieldset, legend" },
      { id: "p1f", title: "Lists & tables", description: "ul, ol, li, dl, table, thead, tbody, tr, th, td, scope attribute" },
      { id: "p1g", title: "Multimedia elements", description: "video, audio, iframe, picture, source — and when to use each" },
      { id: "p1h", title: "Meta tags & SEO basics", description: "title, description, open graph tags, canonical, robots, structured data" },
      { id: "p1i", title: "HTML accessibility basics", description: "ARIA roles, alt text, tabindex, label for, landmark roles, skip links" },
    ],
    resources: [
      { label: "MDN: Learn HTML", url: "https://developer.mozilla.org/en-US/docs/Learn/HTML", free: true },
      { label: "freeCodeCamp: Responsive Web Design", url: "https://www.freecodecamp.org/learn/2022/responsive-web-design/", free: true },
    ],
  },
  {
    id: "css",
    number: "02",
    title: "CSS — The Skin",
    duration: "3-4 weeks",
    accentVar: "--phase-2",
    items: [
      { id: "p2a", title: "Box model", description: "margin, padding, border, content, box-sizing: border-box explained" },
      { id: "p2b", title: "Selectors & specificity", description: "class, id, attribute, pseudo-class, combinators, specificity rules" },
      { id: "p2c", title: "Colors, units & values", description: "hex, rgb, hsl, px, em, rem, vh, vw, %, clamp(), ch unit" },
      { id: "p2d", title: "Typography", description: "font-family, size, weight, line-height, letter-spacing, Google Fonts" },
      { id: "p2e", title: "Display & positioning", description: "block, inline, inline-block, static, relative, absolute, fixed, sticky" },
      { id: "p2f", title: "Flexbox (complete)", description: "flex-direction, wrap, justify-content, align-items, align-self, gap" },
      { id: "p2g", title: "CSS Grid (complete)", description: "grid-template, fr unit, grid-column/row, grid-area, auto-fill, minmax()" },
      { id: "p2h", title: "Responsive design & media queries", description: "mobile-first approach, min/max-width breakpoints, fluid layouts" },
      { id: "p2i", title: "CSS custom properties", description: "defining variables on :root, fallbacks, dynamic theming, scoped vars" },
      { id: "p2j", title: "Pseudo-classes & pseudo-elements", description: ":hover, :focus, :nth-child, :not, ::before, ::after, ::placeholder" },
      { id: "p2k", title: "CSS animations & transitions", description: "@keyframes, animation shorthand, transition, timing functions, will-change" },
      { id: "p2l", title: "CSS functions", description: "calc(), clamp(), min(), max(), var(), env() — write intrinsic layouts" },
      { id: "p2m", title: "Tailwind CSS basics", description: "utility classes, responsive prefixes, dark mode, config, @apply directive" },
    ],
    resources: [
      { label: "CSS-Tricks: Complete Guide to Flexbox", url: "https://css-tricks.com/snippets/css/a-guide-to-flexbox/", free: true },
      { label: "Kevin Powell — YouTube", url: "https://www.youtube.com/@KevinPowell", free: true },
      { label: "Tailwind CSS Docs", url: "https://tailwindcss.com/docs", free: true },
    ],
  },
  {
    id: "javascript",
    number: "03",
    title: "JavaScript — The Brain",
    duration: "6-8 weeks",
    accentVar: "--phase-3",
    items: [
      { id: "p3a", title: "Variables & data types", description: "var/let/const differences, string, number, boolean, null, undefined, object, array" },
      { id: "p3b", title: "Operators & expressions", description: "arithmetic, comparison, logical, ternary, nullish coalescing (??)" },
      { id: "p3c", title: "Control flow", description: "if/else, switch, for, while, for...of, for...in, break, continue" },
      { id: "p3d", title: "Functions", description: "declaration, expression, arrow functions, default params, rest params, IIFE" },
      { id: "p3e", title: "Scope & closures", description: "global, function, block scope, lexical scope, closure patterns, hoisting" },
      { id: "p3f", title: "DOM manipulation", description: "querySelector, createElement, innerHTML, classList, style, dataset, events" },
      { id: "p3g", title: "Event handling", description: "addEventListener, event object, bubbling & capturing, delegation, preventDefault" },
      { id: "p3h", title: "Arrays & array methods", description: "map, filter, reduce, find, findIndex, forEach, some, every, flat, sort" },
      { id: "p3i", title: "Objects & destructuring", description: "object methods, spread, rest, destructuring, optional chaining, nullish assign" },
      { id: "p3j", title: "ES6+ features", description: "template literals, modules (import/export), classes, symbols, generators" },
      { id: "p3k", title: "Error handling", description: "try/catch/finally, Error types, custom errors, async error handling patterns" },
      { id: "p3l", title: "Promises & async/await", description: "Promise API, .then/.catch/.finally, async functions, await, Promise.all" },
      { id: "p3m", title: "Fetch API & REST APIs", description: "GET/POST/PUT/DELETE, headers, JSON, status codes, AbortController" },
      { id: "p3n", title: "Web Storage & browser APIs", description: "localStorage, sessionStorage, cookies, Intersection Observer, History API" },
    ],
    resources: [
      { label: "JavaScript.info", url: "https://javascript.info", free: true },
      { label: "freeCodeCamp: JS Algorithms", url: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/", free: true },
      { label: "JavaScript30 by Wes Bos", url: "https://javascript30.com", free: true },
    ],
  },
  {
    id: "react",
    number: "04",
    title: "React — The Architecture",
    duration: "4-6 weeks",
    accentVar: "--phase-4",
    items: [
      { id: "p4a", title: "React concepts & Virtual DOM", description: "component-based architecture, reconciliation, rendering, why React exists" },
      { id: "p4b", title: "JSX syntax", description: "JSX rules, expressions in JSX, fragments, self-closing tags, className vs class" },
      { id: "p4c", title: "Functional components & props", description: "passing data down, prop drilling, default props, children prop" },
      { id: "p4d", title: "useState & event handling", description: "state updates, immutability, complex state objects, synthetic events" },
      { id: "p4e", title: "useEffect & lifecycle", description: "dependencies array, cleanup functions, data fetching, subscriptions" },
      { id: "p4f", title: "Conditional rendering", description: "&&, ternary, early return patterns, null/undefined rendering" },
      { id: "p4g", title: "Lists & keys", description: "rendering arrays, key prop importance, stable keys, dynamic lists" },
      { id: "p4h", title: "Forms in React", description: "controlled components, onChange, onSubmit, form state, multiple fields" },
      { id: "p4i", title: "useRef", description: "DOM refs, mutable values without re-render, forwardRef, useImperativeHandle" },
      { id: "p4j", title: "Context API", description: "createContext, Provider, useContext, when to use vs prop drilling" },
      { id: "p4k", title: "Custom hooks", description: "extracting reusable logic, useFetch, useDebounce, custom hook patterns" },
      { id: "p4l", title: "React Router v6", description: "BrowserRouter, Routes, Route, Link, NavLink, useParams, useNavigate" },
      { id: "p4m", title: "Performance optimization", description: "React.memo, useMemo, useCallback, React.lazy, Suspense, code splitting" },
      { id: "p4n", title: "Error boundaries", description: "ErrorBoundary class component, fallback UI, componentDidCatch" },
    ],
    resources: [
      { label: "React Official Docs", url: "https://react.dev", free: true },
      { label: "Scrimba: Learn React", url: "https://scrimba.com/learn-react-c0e", free: true },
      { label: "Frontend Masters: Complete React v9", url: "https://frontendmasters.com/courses/complete-react-v9/", free: false },
    ],
  },
  {
    id: "typescript",
    number: "05",
    title: "TypeScript — The Safety Net",
    duration: "2-3 weeks",
    accentVar: "--phase-5",
    items: [
      { id: "p5a", title: "Basic types", description: "string, number, boolean, any, void, never, unknown, literal types" },
      { id: "p5b", title: "Arrays, tuples & enums", description: "typed arrays, readonly arrays, tuple syntax, const/numeric/string enums" },
      { id: "p5c", title: "Interfaces & type aliases", description: "interface vs type, extending, implementing, declaration merging" },
      { id: "p5d", title: "Union & intersection types", description: "| , &, discriminated unions, type guards, type narrowing" },
      { id: "p5e", title: "Generics", description: "generic functions, generic interfaces, constraints with extends, defaults" },
      { id: "p5f", title: "Utility types", description: "Partial, Required, Pick, Omit, Record, Readonly, ReturnType, Parameters" },
      { id: "p5g", title: "TypeScript with React", description: "FC type, event types, prop typing, useRef types, typed custom hooks" },
      { id: "p5h", title: "tsconfig & strict mode", description: "strict, target, lib, paths, moduleResolution, noImplicitAny" },
    ],
    resources: [
      { label: "TypeScript Official Docs", url: "https://www.typescriptlang.org/docs/", free: true },
      { label: "Total TypeScript (Matt Pocock)", url: "https://www.totaltypescript.com", free: true },
      { label: "TypeScript Deep Dive (free book)", url: "https://basarat.gitbook.io/typescript", free: true },
    ],
  },
  {
    id: "nextjs",
    number: "06",
    title: "Next.js — The Full-Stack Bridge",
    duration: "3-4 weeks",
    accentVar: "--phase-6",
    items: [
      { id: "p6a", title: "App Router fundamentals", description: "layout.tsx, page.tsx, loading.tsx, error.tsx, not-found.tsx files" },
      { id: "p6b", title: "Server vs client components", description: '"use client" directive, when to use each, RSC benefits, composition' },
      { id: "p6c", title: "Data fetching strategies", description: "fetch() with caching, time-based revalidation, cache(), unstable_cache" },
      { id: "p6d", title: "SSG vs SSR vs ISR", description: "static generation, server-side rendering, incremental revalidation explained" },
      { id: "p6e", title: "Server Actions", description: "form actions, mutations, useFormState, useFormStatus, useOptimistic" },
      { id: "p6f", title: "Route handlers (API routes)", description: "route.ts files, GET/POST/PUT/DELETE, NextRequest, NextResponse" },
      { id: "p6g", title: "Next.js middleware", description: "middleware.ts, matchers, redirects, auth guards, geo-routing" },
      { id: "p6h", title: "next/image & next/font", description: "Image component, priority, sizes, formats; next/font for zero FOUT" },
      { id: "p6i", title: "Metadata & SEO API", description: "generateMetadata, static metadata, opengraph, twitter card, robots.txt" },
      { id: "p6j", title: "Parallel & intercepting routes", description: "slot folders (@), parallel route UI, intercepting for modals pattern" },
    ],
    resources: [
      { label: "Next.js Official Docs", url: "https://nextjs.org/docs", free: true },
      { label: "Next.js Learn (interactive)", url: "https://nextjs.org/learn", free: true },
    ],
  },
  {
    id: "styling",
    number: "07",
    title: "Styling & Design Systems",
    duration: "2 weeks",
    accentVar: "--phase-7",
    items: [
      { id: "p7a", title: "Tailwind CSS v4 deep dive", description: "responsive, dark mode, custom config, @apply, arbitrary values, plugins" },
      { id: "p7b", title: "shadcn/ui", description: "component library on Radix UI, theming with CSS variables, customization" },
      { id: "p7c", title: "CSS Modules", description: "scoped styles, :local/:global, composes, how they work in Next.js & Vite" },
      { id: "p7d", title: "Design tokens", description: "color, typography, spacing, shadow systems — keeping UI consistent at scale" },
      { id: "p7e", title: "Storybook", description: "component documentation, stories, controls, addon-a11y, visual regression" },
      { id: "p7f", title: "Responsive design mastery", description: "container queries, fluid typography, intrinsic web design, clamp()" },
    ],
    resources: [
      { label: "shadcn/ui Docs", url: "https://ui.shadcn.com", free: true },
      { label: "Storybook Docs", url: "https://storybook.js.org/docs", free: true },
    ],
  },
  {
    id: "state-management",
    number: "08",
    title: "State Management & Data Fetching",
    duration: "1-2 weeks",
    accentVar: "--phase-8",
    items: [
      { id: "p8a", title: "Zustand", description: "store creation, slices pattern, devtools, persist middleware, shallow comparison" },
      { id: "p8b", title: "TanStack Query (React Query)", description: "useQuery, useMutation, caching, invalidation, optimistic updates" },
      { id: "p8c", title: "Redux Toolkit", description: "createSlice, createAsyncThunk, RTK Query — when this is the right tool" },
      { id: "p8d", title: "SWR", description: "stale-while-revalidate pattern, useSWR, mutation, real-time updates" },
      { id: "p8e", title: "Jotai / Recoil basics", description: "atomic state, derived atoms, async atoms — granular reactivity" },
    ],
    resources: [
      { label: "Zustand Docs", url: "https://docs.pmnd.rs/zustand", free: true },
      { label: "TanStack Query Docs", url: "https://tanstack.com/query/latest", free: true },
    ],
  },
  {
    id: "build-tools-testing",
    number: "09",
    title: "Build Tools & Testing",
    duration: "2 weeks",
    accentVar: "--phase-9",
    items: [
      { id: "p9a", title: "Vite & module bundlers", description: "Vite config, HMR, plugins, build optimization, code splitting, chunking" },
      { id: "p9b", title: "Package managers", description: "npm vs pnpm vs yarn, package.json, scripts, lock files, monorepo basics" },
      { id: "p9c", title: "ESLint & Prettier", description: "rules, configs, plugins, .eslintrc, .prettierrc, husky + lint-staged" },
      { id: "p9d", title: "Unit testing with Vitest", description: "describe, it, expect, mocking, coverage reports, snapshot testing" },
      { id: "p9e", title: "React Testing Library", description: "render, getByRole, userEvent, screen, async queries, accessibility-first" },
      { id: "p9f", title: "E2E testing with Playwright", description: "page.goto, locators, assertions, visual comparisons, parallel tests" },
      { id: "p9g", title: "CI/CD basics", description: "GitHub Actions workflows, automated tests on PRs, preview deploys on Vercel" },
    ],
    resources: [
      { label: "Vitest Docs", url: "https://vitest.dev", free: true },
      { label: "Testing Library Docs", url: "https://testing-library.com/docs/", free: true },
      { label: "Playwright Docs", url: "https://playwright.dev", free: true },
    ],
  },
  {
    id: "performance-accessibility",
    number: "10",
    title: "Performance & Accessibility",
    duration: "2 weeks",
    accentVar: "--phase-10",
    items: [
      { id: "p10a", title: "Core Web Vitals", description: "LCP, INP, CLS — what each measures, real-world thresholds, fixing each metric" },
      { id: "p10b", title: "Lighthouse audits", description: "performance, accessibility, best practices, SEO — interpreting scores in CI" },
      { id: "p10c", title: "Code splitting & lazy loading", description: "dynamic import(), React.lazy, Suspense, route-based splitting strategies" },
      { id: "p10d", title: "Image optimization", description: "WebP/AVIF, srcset, sizes, lazy attribute, aspect-ratio to prevent layout shift" },
      { id: "p10e", title: "Font optimization", description: "font-display, preload, FOUT/FOIT, variable fonts, subsetting, next/font" },
      { id: "p10f", title: "WCAG 2.2 accessibility", description: "perceivable, operable, understandable, robust — achieving Level AA" },
      { id: "p10g", title: "Keyboard navigation & focus", description: "focus management, focus traps, skip links, visible focus ring styles" },
      { id: "p10h", title: "Screen reader testing", description: "NVDA, VoiceOver, ARIA live regions, axe DevTools, announcements" },
    ],
    resources: [
      { label: "web.dev (Google)", url: "https://web.dev", free: true },
      { label: "MDN Accessibility Guide", url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility", free: true },
    ],
  },
  {
    id: "advanced",
    number: "11",
    title: "Advanced & Pro Level",
    duration: "Ongoing",
    accentVar: "--phase-11",
    items: [
      { id: "p11a", title: "Framer Motion animations", description: "motion components, variants, layout animations, AnimatePresence, page transitions" },
      { id: "p11b", title: "GSAP animations", description: "timeline, ScrollTrigger, morphing, advanced easing, React integration" },
      { id: "p11c", title: "Browser Web APIs", description: "Intersection Observer, ResizeObserver, Web Workers, Service Workers" },
      { id: "p11d", title: "Progressive Web Apps", description: "service worker, manifest.json, offline support, caching strategies, push" },
      { id: "p11e", title: "Real-time features", description: "WebSocket API, Socket.io, SSE (Server-Sent Events), real-time UI patterns" },
      { id: "p11f", title: "GraphQL with Apollo", description: "queries, mutations, subscriptions, Apollo Client cache, fragments" },
      { id: "p11g", title: "Frontend system design", description: "component architecture, state design, module federation, micro-frontends" },
      { id: "p11h", title: "AI/LLM integration in React", description: "Vercel AI SDK, streaming responses, RAG UI, tool use, Claude/OpenAI APIs" },
      { id: "p11i", title: "Design patterns", description: "compound, container/presenter, observer, factory — study patterns.dev" },
      { id: "p11j", title: "Open source contribution", description: "reading real codebases, first PR, maintainer mindset, documentation culture" },
    ],
    resources: [
      { label: "patterns.dev", url: "https://www.patterns.dev", free: true },
      { label: "Vercel AI SDK Docs", url: "https://sdk.vercel.ai/docs", free: true },
      { label: "Frontend Masters (paid)", url: "https://frontendmasters.com", free: false },
    ],
  },
];

export type ResourceItem = {
  icon: string;
  name: string;
  url: string;
  tag: "free" | "paid" | "yt";
  description: string;
};

export type ResourceCategory = {
  category: string;
  items: ResourceItem[];
};

export const RESOURCE_HUB: ResourceCategory[] = [
  {
    category: "🆓 Free Resources — Tier 1",
    items: [
      { icon: "🗺️", name: "roadmap.sh/frontend", url: "https://roadmap.sh/frontend", tag: "free", description: "Community-approved visual roadmap. Your north star for direction." },
      { icon: "⚒️", name: "The Odin Project", url: "https://www.theodinproject.com", tag: "free", description: "Best complete free curriculum — real projects, no hand-holding." },
      { icon: "🏕️", name: "freeCodeCamp", url: "https://www.freecodecamp.org", tag: "free", description: "Structured lessons + certifications. Great for beginners." },
      { icon: "📖", name: "MDN Web Docs", url: "https://developer.mozilla.org", tag: "free", description: "The reference bible. Keep open while coding at all times." },
      { icon: "🧩", name: "JavaScript.info", url: "https://javascript.info", tag: "free", description: "Best JS deep-dive on the internet. Treat it as a textbook." },
      { icon: "🌐", name: "web.dev", url: "https://web.dev", tag: "free", description: "Google's hub for performance, accessibility & web standards." },
      { icon: "🎨", name: "CSS-Tricks", url: "https://css-tricks.com", tag: "free", description: "Flexbox & Grid guides, CSS almanac, layout deep-dives." },
      { icon: "💻", name: "Scrimba (free tier)", url: "https://scrimba.com", tag: "free", description: "Interactive coding — you edit code in the video. Learn by doing." },
    ],
  },
  {
    category: "💎 Paid — Worth Every Rupee",
    items: [
      { icon: "🎓", name: "Frontend Masters", url: "https://frontendmasters.com", tag: "paid", description: "$39/mo — Kyle Simpson, Scott Moss, Brian Holt. The best platform." },
      { icon: "🎬", name: "Scrimba Pro", url: "https://scrimba.com", tag: "paid", description: "$24.50/mo — interactive coding. Best for React & JavaScript." },
      { icon: "🔷", name: "Total TypeScript", url: "https://www.totaltypescript.com", tag: "paid", description: "Matt Pocock. The single best resource for mastering TypeScript." },
      { icon: "📚", name: "Udemy", url: "https://www.udemy.com", tag: "paid", description: "$10-15/course by Maximilian Schwarzmüller — always wait for sale." },
    ],
  },
  {
    category: "📺 YouTube — Free & Elite",
    items: [
      { icon: "🎨", name: "Kevin Powell", url: "https://www.youtube.com/@KevinPowell", tag: "yt", description: "CSS god. Watch everything. Best CSS teacher on the internet." },
      { icon: "⚡", name: "Fireship", url: "https://www.youtube.com/@Fireship", tag: "yt", description: "Fast, dense, entertaining. Perfect concept explainers." },
      { icon: "🚀", name: "Theo — t3.gg", url: "https://www.youtube.com/@t3dotgg", tag: "yt", description: "Modern React, TypeScript, Next.js. Opinionated and usually right." },
      { icon: "⚛️", name: "Jack Herrington", url: "https://www.youtube.com/@jherr", tag: "yt", description: "Advanced React patterns, micro-frontends, TypeScript mastery." },
      { icon: "🛠️", name: "Traversy Media", url: "https://www.youtube.com/@TraversyMedia", tag: "yt", description: "Comprehensive project tutorials covering all major stacks." },
    ],
  },
  {
    category: "🏋️ Practice Platforms",
    items: [
      { icon: "🎯", name: "Frontend Mentor", url: "https://www.frontendmentor.io", tag: "free", description: "Build from real Figma designs — the best portfolio builder." },
      { icon: "⚔️", name: "CSS Battle", url: "https://cssbattle.dev", tag: "free", description: "Gamified CSS challenges — trains your precision and creativity." },
      { icon: "🏆", name: "JavaScript30", url: "https://javascript30.com", tag: "free", description: "30 vanilla JS projects by Wes Bos. Legendary, completely free." },
      { icon: "🥋", name: "Codewars", url: "https://www.codewars.com", tag: "free", description: "Kata challenges — sharpen your JS algorithm & problem-solving." },
    ],
  },
];

export function getPhaseById(id: string): RoadmapPhase | undefined {
  return ROADMAP_PHASES.find((phase) => phase.id === id);
}

export function getAdjacentPhases(id: string) {
  const index = ROADMAP_PHASES.findIndex((phase) => phase.id === id);
  return {
    previous: index > 0 ? ROADMAP_PHASES[index - 1] : undefined,
    next: index >= 0 && index < ROADMAP_PHASES.length - 1 ? ROADMAP_PHASES[index + 1] : undefined,
  };
}

export const TOTAL_TOPIC_COUNT = ROADMAP_PHASES.reduce((sum, phase) => sum + phase.items.length, 0);

const LEVELS: [number, string][] = [
  [0, "Initiate 🌱"],
  [12, "Apprentice 🔧"],
  [25, "Developer 💻"],
  [40, "Builder 🏗️"],
  [55, "Engineer ⚡"],
  [70, "Senior Dev 🚀"],
  [86, "Pro 🎯"],
  [100, "Frontend Master 👑"],
];

export function getLevelLabel(percent: number): string {
  let label = LEVELS[0][1];
  for (const [threshold, name] of LEVELS) {
    if (percent >= threshold) label = name;
  }
  return label;
}
