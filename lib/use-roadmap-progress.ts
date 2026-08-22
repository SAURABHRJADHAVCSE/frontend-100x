"use client";

import { useCallback, useSyncExternalStore } from "react";
import { ROADMAP_PHASES, TOTAL_TOPIC_COUNT } from "@/lib/roadmap-data";

const STORAGE_KEY = "frontend-roadmap-progress";
const EMPTY: CheckedMap = {};

type CheckedMap = Record<string, boolean>;

const listeners = new Set<() => void>();
let cache: CheckedMap | null = null;

function readStorage(): CheckedMap {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CheckedMap) : {};
  } catch {
    return {};
  }
}

function getSnapshot(): CheckedMap {
  if (cache === null) cache = readStorage();
  return cache;
}

function getServerSnapshot(): CheckedMap {
  return EMPTY;
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function commit(next: CheckedMap) {
  cache = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // ignore write failures (private browsing, storage full, etc.)
  }
  for (const listener of listeners) listener();
}

export function useRoadmapProgress() {
  const checked = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggleItem = useCallback((itemId: string, isChecked: boolean) => {
    const next = { ...getSnapshot() };
    if (isChecked) next[itemId] = true;
    else delete next[itemId];
    commit(next);
  }, []);

  const resetAll = useCallback(() => {
    commit({});
  }, []);

  const isItemChecked = useCallback((itemId: string) => Boolean(checked[itemId]), [checked]);

  const getPhaseProgress = useCallback(
    (phaseId: string) => {
      const phase = ROADMAP_PHASES.find((p) => p.id === phaseId);
      if (!phase) return { done: 0, total: 0, percent: 0 };
      const done = phase.items.filter((item) => checked[item.id]).length;
      const total = phase.items.length;
      return { done, total, percent: total > 0 ? Math.round((done / total) * 100) : 0 };
    },
    [checked],
  );

  const totalDone = Object.keys(checked).length;
  const phasesDone = ROADMAP_PHASES.filter((phase) => phase.items.every((item) => checked[item.id])).length;
  const overallPercent = TOTAL_TOPIC_COUNT > 0 ? Math.round((totalDone / TOTAL_TOPIC_COUNT) * 100) : 0;

  return {
    checked,
    isItemChecked,
    toggleItem,
    resetAll,
    getPhaseProgress,
    totalDone,
    totalTopics: TOTAL_TOPIC_COUNT,
    phasesDone,
    overallPercent,
  };
}
