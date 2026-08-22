import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PhaseChecklist } from "@/components/roadmap/phase-checklist";
import { ROADMAP_PHASES, getAdjacentPhases, getPhaseById } from "@/lib/roadmap-data";

type PhasePageProps = {
  params: Promise<{ phaseId: string }>;
};

export function generateStaticParams() {
  return ROADMAP_PHASES.map((phase) => ({ phaseId: phase.id }));
}

export async function generateMetadata({ params }: PhasePageProps): Promise<Metadata> {
  const { phaseId } = await params;
  const phase = getPhaseById(phaseId);
  if (!phase) return {};
  return {
    title: `${phase.title} — Frontend Roadmap`,
    description: `Phase ${phase.number}: ${phase.title}. ${phase.items.length} topics to master.`,
  };
}

export default async function PhasePage({ params }: PhasePageProps) {
  const { phaseId } = await params;
  const phase = getPhaseById(phaseId);
  if (!phase) notFound();

  const { previous, next } = getAdjacentPhases(phaseId);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
      <PhaseChecklist phase={phase} previous={previous} next={next} />
    </div>
  );
}
