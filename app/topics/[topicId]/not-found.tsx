import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function TopicNotFound() {
  return (
    <main className="flex w-full flex-1 flex-col items-start justify-center px-4 py-24 sm:px-6 lg:px-10 xl:px-16">
      <h1 className="font-heading text-xl font-bold tracking-tight text-foreground">Topic not found</h1>
      <Button className="mt-4" render={<Link href="/" />}>
        Back to roadmap
      </Button>
    </main>
  );
}
