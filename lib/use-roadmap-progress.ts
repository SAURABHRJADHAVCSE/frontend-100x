"use client";

import { useCallback, useSyncExternalStore } from "react";
import { PHASES } from "@/lib/roadmap-data";

const STORAGE_KEY = "frontend-roadmap-progress";
const EMPTY: CompletedMap = {};

type CompletedMap = Record<string, boolean>;

const listeners = new Set<() => void>();
let cache: CompletedMap | null = null;

function readStorage(): CompletedMap {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CompletedMap) : {};
  } catch {
    return {};
  }
}

function getSnapshot(): CompletedMap {
  if (cache === null) cache = readStorage();
  return cache;
}

function getServerSnapshot(): CompletedMap {
  return EMPTY;
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function commit(next: CompletedMap) {
  cache = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // ignore write failures (private browsing, storage full, etc.)
  }
  for (const listener of listeners) listener();
}

const TOTAL_TOPICS = PHASES.reduce((sum, phase) => sum + phase.topics.length, 0);

export function useRoadmapProgress() {
  const completed = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const isDone = useCallback((slug: string) => Boolean(completed[slug]), [completed]);

  const toggle = useCallback((slug: string, done: boolean) => {
    const next = { ...getSnapshot() };
    if (done) next[slug] = true;
    else delete next[slug];
    commit(next);
  }, []);

  const resetAll = useCallback(() => commit({}), []);

  const getPhaseProgress = useCallback(
    (phaseId: string) => {
      const phase = PHASES.find((p) => p.id === phaseId);
      if (!phase) return { done: 0, total: 0 };
      return { done: phase.topics.filter((t) => completed[t.slug]).length, total: phase.topics.length };
    },
    [completed],
  );

  const totalDone = Object.keys(completed).length;

  return {
    isDone,
    toggle,
    resetAll,
    getPhaseProgress,
    totalDone,
    totalTopics: TOTAL_TOPICS,
    remaining: TOTAL_TOPICS - totalDone,
    percent: TOTAL_TOPICS > 0 ? Math.round((totalDone / TOTAL_TOPICS) * 100) : 0,
  };
}
