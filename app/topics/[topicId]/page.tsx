import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { findTopicBySlug, getAllTopicSlugs } from "@/lib/roadmap-data";

type TopicPageProps = {
  params: Promise<{ topicId: string }>;
};

export function generateStaticParams() {
  return getAllTopicSlugs().map((topicId) => ({ topicId }));
}

export async function generateMetadata({ params }: TopicPageProps): Promise<Metadata> {
  const { topicId } = await params;
  const found = findTopicBySlug(topicId);
  if (!found) return {};
  return { title: `${found.topic.title} — Frontend Roadmap` };
}

export default async function TopicPage({ params }: TopicPageProps) {
  const { topicId } = await params;
  const found = findTopicBySlug(topicId);
  if (!found) notFound();

  return (
    <main className="w-full px-4 py-10 sm:px-6 lg:px-10 xl:px-16">
      <Button variant="ghost" size="sm" className="-ml-2" render={<Link href="/" />}>
        <ArrowLeft className="size-4" aria-hidden="true" />
        Back to roadmap
      </Button>

      <div className="mt-6 max-w-3xl">
        <span className="font-heading text-xs font-semibold tracking-widest text-muted-foreground uppercase">
          Phase {found.phase.number} · {found.phase.title}
        </span>
        <h1 className="mt-1 font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {found.topic.title}
        </h1>
      </div>

      <div className="mt-8 max-w-3xl">{/* Write your notes for this topic below. */}</div>
    </main>
  );
}
