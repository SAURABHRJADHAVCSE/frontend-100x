export type Topic = {
  slug: string;
  title: string;
};

export type Phase = {
  id: string;
  number: string;
  title: string;
  topics: Topic[];
};

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function topic(title: string): Topic {
  return { slug: slugify(title), title };
}

export const PHASES: Phase[] = [
  {
    id: "dev-setup",
    number: "00",
    title: "Dev Setup & Internet Basics",
    topics: [
      topic("How the internet works"),
      topic("Terminal / command line basics"),
      topic("Git fundamentals"),
      topic("GitHub essentials"),
      topic("VS Code setup & extensions"),
      topic("Browser DevTools"),
    ],
  },
  {
    id: "html",
    number: "01",
    title: "HTML — The Skeleton",
    topics: [
      topic("HTML document structure"),
      topic("Semantic elements"),
      topic("Text & typography elements"),
      topic("Links & images"),
      topic("HTML forms"),
      topic("Lists & tables"),
      topic("Multimedia elements"),
      topic("Meta tags & SEO basics"),
      topic("HTML accessibility basics"),
    ],
  },
  {
    id: "css",
    number: "02",
    title: "CSS — The Skin",
    topics: [
      topic("Box model"),
      topic("Selectors & specificity"),
      topic("Colors, units & values"),
      topic("Typography"),
      topic("Display & positioning"),
      topic("Flexbox (complete)"),
      topic("CSS Grid (complete)"),
      topic("Responsive design & media queries"),
      topic("CSS custom properties"),
      topic("Pseudo-classes & pseudo-elements"),
      topic("CSS animations & transitions"),
      topic("CSS functions"),
      topic("Tailwind CSS basics"),
    ],
  },
  {
    id: "javascript",
    number: "03",
    title: "JavaScript — The Brain",
    topics: [
      topic("Variables & data types"),
      topic("Operators & expressions"),
      topic("Control flow"),
      topic("Functions"),
      topic("Scope & closures"),
      topic("DOM manipulation"),
      topic("Event handling"),
      topic("Arrays & array methods"),
      topic("Objects & destructuring"),
      topic("ES6+ features"),
      topic("Error handling"),
      topic("Promises & async/await"),
      topic("Fetch API & REST APIs"),
      topic("Web Storage & browser APIs"),
    ],
  },
  {
    id: "react",
    number: "04",
    title: "React — The Architecture",
    topics: [
      topic("React concepts & Virtual DOM"),
      topic("JSX syntax"),
      topic("Functional components & props"),
      topic("useState & event handling"),
      topic("useEffect & lifecycle"),
      topic("Conditional rendering"),
      topic("Lists & keys"),
      topic("Forms in React"),
      topic("useRef"),
      topic("Context API"),
      topic("Custom hooks"),
      topic("React Router v6"),
      topic("Performance optimization"),
      topic("Error boundaries"),
    ],
  },
  {
    id: "typescript",
    number: "05",
    title: "TypeScript — The Safety Net",
    topics: [
      topic("Basic types"),
      topic("Arrays, tuples & enums"),
      topic("Interfaces & type aliases"),
      topic("Union & intersection types"),
      topic("Generics"),
      topic("Utility types"),
      topic("TypeScript with React"),
      topic("tsconfig & strict mode"),
    ],
  },
  {
    id: "nextjs",
    number: "06",
    title: "Next.js — The Full-Stack Bridge",
    topics: [
      topic("App Router fundamentals"),
      topic("Server vs client components"),
      topic("Data fetching strategies"),
      topic("SSG vs SSR vs ISR"),
      topic("Server Actions"),
      topic("Route handlers (API routes)"),
      topic("Next.js middleware"),
      topic("next/image & next/font"),
      topic("Metadata & SEO API"),
      topic("Parallel & intercepting routes"),
    ],
  },
  {
    id: "styling",
    number: "07",
    title: "Styling & Design Systems",
    topics: [
      topic("Tailwind CSS v4 deep dive"),
      topic("shadcn/ui"),
      topic("CSS Modules"),
      topic("Design tokens"),
      topic("Storybook"),
      topic("Responsive design mastery"),
    ],
  },
  {
    id: "state-management",
    number: "08",
    title: "State Management & Data Fetching",
    topics: [
      topic("Zustand"),
      topic("TanStack Query (React Query)"),
      topic("Redux Toolkit"),
      topic("SWR"),
      topic("Jotai / Recoil basics"),
    ],
  },
  {
    id: "build-tools-testing",
    number: "09",
    title: "Build Tools & Testing",
    topics: [
      topic("Vite & module bundlers"),
      topic("Package managers"),
      topic("ESLint & Prettier"),
      topic("Unit testing with Vitest"),
      topic("React Testing Library"),
      topic("E2E testing with Playwright"),
      topic("CI/CD basics"),
    ],
  },
  {
    id: "performance-accessibility",
    number: "10",
    title: "Performance & Accessibility",
    topics: [
      topic("Core Web Vitals"),
      topic("Lighthouse audits"),
      topic("Code splitting & lazy loading"),
      topic("Image optimization"),
      topic("Font optimization"),
      topic("WCAG 2.2 accessibility"),
      topic("Keyboard navigation & focus"),
      topic("Screen reader testing"),
    ],
  },
  {
    id: "advanced",
    number: "11",
    title: "Advanced & Pro Level",
    topics: [
      topic("Framer Motion animations"),
      topic("GSAP animations"),
      topic("Browser Web APIs"),
      topic("Progressive Web Apps"),
      topic("Real-time features"),
      topic("GraphQL with Apollo"),
      topic("Frontend system design"),
      topic("AI/LLM integration in React"),
      topic("Design patterns"),
      topic("Open source contribution"),
    ],
  },
];

export function getAllTopicSlugs(): string[] {
  return PHASES.flatMap((phase) => phase.topics.map((t) => t.slug));
}

export function findTopicBySlug(slug: string): { phase: Phase; topic: Topic } | undefined {
  for (const phase of PHASES) {
    const topic = phase.topics.find((t) => t.slug === slug);
    if (topic) return { phase, topic };
  }
  return undefined;
}
