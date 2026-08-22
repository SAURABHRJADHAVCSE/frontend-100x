import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PhaseNotFound() {
  return (
    <div className="mx-auto flex max-w-md flex-1 flex-col items-center justify-center gap-4 px-4 py-24 text-center">
      <h1 className="font-heading text-2xl font-bold text-foreground">Phase not found</h1>
      <p className="text-sm text-muted-foreground">This roadmap phase doesn&apos;t exist. Head back to the full roadmap.</p>
      <Button render={<Link href="/" />}>Back to roadmap</Button>
    </div>
  );
}
