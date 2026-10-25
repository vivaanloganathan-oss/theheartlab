"use client";

import { QuizEngine } from "./quiz-engine";
import { quizSets } from "@/content/quizzes";
import { useHydrated, useProgress } from "@/lib/progress";

export function QuizHub() {
  const { progress, recordQuiz } = useProgress();
  const hydrated = useHydrated();

  return (
    <div className="space-y-16">
      {quizSets.map((set) => {
        const result = hydrated ? progress.quizzes[set.id] : undefined;
        return (
          <section key={set.id} id={set.id} aria-labelledby={`${set.id}-title`} className="scroll-mt-32">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 id={`${set.id}-title`} className="font-display text-5xl font-extrabold uppercase leading-none">
                  {set.title}
                </h2>
                <p className="mt-2 text-fg-muted">{set.description}</p>
              </div>
              {result && (
                <p className="text-sm text-fg-muted">
                  Best: <strong className="text-fg">{result.best}/{result.total}</strong> · Attempts: {result.attempts}
                </p>
              )}
            </div>
            <QuizEngine questions={set.questions} onFinish={(score, total) => recordQuiz(set.id, score, total)} />
          </section>
        );
      })}
    </div>
  );
}
