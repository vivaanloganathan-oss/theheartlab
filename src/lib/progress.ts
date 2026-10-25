"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Anonymous learning progress, stored only in this browser's localStorage.
 * Nothing here is ever sent to a server. No names, ages, or health data are stored.
 */

const STORAGE_KEY = "heartlab:progress:v1";
export const PASSING_SCORE = 4; // out of 5 module quiz questions

export interface ModuleProgress {
  lessonDone: boolean;
  activityDone: boolean;
  bestScore: number | null;
  lastScore: number | null;
  completedAt: string | null;
}

export interface QuizResult {
  best: number;
  last: number;
  total: number;
  attempts: number;
  updatedAt: string;
}

export interface Progress {
  version: 1;
  modules: Record<string, ModuleProgress>;
  quizzes: Record<string, QuizResult>;
  topicChecks: Record<string, boolean>;
  labsVisited: Record<string, boolean>;
}

const EMPTY: Progress = {
  version: 1,
  modules: {},
  quizzes: {},
  topicChecks: {},
  labsVisited: {},
};

const EMPTY_MODULE: ModuleProgress = {
  lessonDone: false,
  activityDone: false,
  bestScore: null,
  lastScore: null,
  completedAt: null,
};

const listeners = new Set<() => void>();
let cachedRaw: string | null | undefined;
let cachedValue: Progress = EMPTY;

function read(): Progress {
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return EMPTY;
  }
  if (raw === cachedRaw) return cachedValue;
  cachedRaw = raw;
  try {
    const parsed = raw ? (JSON.parse(raw) as Partial<Progress>) : null;
    cachedValue = parsed && parsed.version === 1 ? { ...EMPTY, ...parsed } as Progress : EMPTY;
  } catch {
    cachedValue = EMPTY;
  }
  return cachedValue;
}

function write(next: Progress) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Storage may be unavailable (private mode, quota). Progress simply won't persist.
  }
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function update(fn: (p: Progress) => Progress) {
  write(fn(read()));
}

export function isModuleComplete(m: ModuleProgress | undefined): boolean {
  return !!m && m.lessonDone && m.activityDone && (m.bestScore ?? 0) >= PASSING_SCORE;
}

export function useProgress() {
  const progress = useSyncExternalStore(subscribe, read, () => EMPTY);

  const updateModule = useCallback((id: string, patch: Partial<ModuleProgress>) => {
    update((p) => {
      const prev = p.modules[id] ?? EMPTY_MODULE;
      const merged = { ...prev, ...patch };
      if (!merged.completedAt && isModuleComplete(merged)) {
        merged.completedAt = new Date().toISOString();
      }
      return { ...p, modules: { ...p.modules, [id]: merged } };
    });
  }, []);

  const recordModuleQuiz = useCallback(
    (id: string, score: number) => {
      const prev = read().modules[id] ?? EMPTY_MODULE;
      updateModule(id, {
        lastScore: score,
        bestScore: Math.max(score, prev.bestScore ?? 0),
      });
    },
    [updateModule],
  );

  const recordQuiz = useCallback((id: string, score: number, total: number) => {
    update((p) => {
      const prev = p.quizzes[id];
      return {
        ...p,
        quizzes: {
          ...p.quizzes,
          [id]: {
            best: Math.max(score, prev?.best ?? 0),
            last: score,
            total,
            attempts: (prev?.attempts ?? 0) + 1,
            updatedAt: new Date().toISOString(),
          },
        },
      };
    });
  }, []);

  const markTopicCheck = useCallback((id: string) => {
    update((p) => ({ ...p, topicChecks: { ...p.topicChecks, [id]: true } }));
  }, []);

  const markLabVisited = useCallback((id: string) => {
    update((p) =>
      p.labsVisited[id] ? p : { ...p, labsVisited: { ...p.labsVisited, [id]: true } },
    );
  }, []);

  const reset = useCallback(() => write(EMPTY), []);

  return { progress, updateModule, recordModuleQuiz, recordQuiz, markTopicCheck, markLabVisited, reset };
}

/** True once the component is running in the browser (avoids SSR/client mismatches). */
export function useHydrated() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}
