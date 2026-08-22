import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TableOfContents } from "@/components/topic/table-of-contents";
import { findTopicBySlug, getAllTopicSlugs } from "@/lib/roadmap-data";
import { getTopicContent } from "@/lib/topic-content/registry";

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

  const TopicContent = getTopicContent(topicId);

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-10">
      <Button variant="ghost" size="sm" className="-ml-2" render={<Link href="/" />}>
        <ArrowLeft className="size-4" aria-hidden="true" />
        Back to roadmap
      </Button>

      <div className="mt-6 grid grid-cols-1 gap-12 xl:grid-cols-[minmax(0,1fr)_220px]">
        <article id="topic-article" className="min-w-0">
          <span className="font-heading text-xs font-semibold tracking-widest text-muted-foreground uppercase">
            Phase {found.phase.number} · {found.phase.title}
          </span>
          <h1 className="mt-1 mb-8 font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {found.topic.title}
          </h1>

          {TopicContent ? (
            // eslint-disable-next-line react-hooks/static-components -- TOPIC_CONTENT holds stable, module-level component references, never created during render
            <TopicContent />
          ) : (
            <p className="text-sm text-muted-foreground">Notes for this topic haven&apos;t been written yet.</p>
          )}
        </article>

        <TableOfContents articleId="topic-article" />
      </div>
    </main>
  );
}
