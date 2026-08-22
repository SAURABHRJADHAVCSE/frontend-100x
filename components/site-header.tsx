import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="flex h-14 w-full items-center justify-between px-4 sm:px-6 lg:px-10">
        <Link href="/" className="font-heading text-sm font-semibold tracking-tight text-foreground">
          Frontend Roadmap
        </Link>
        <ThemeToggle />
      </div>
    </header>
  );
}
