"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, BookOpen, Check, CheckCircle2, ListChecks, Puzzle, Trophy } from "lucide-react";
import { levelOf, moduleById, modules, badges } from "@/content/academy";
import { isModuleComplete, PASSING_SCORE, useProgress, useHydrated } from "@/lib/progress";
import { earnedBadges } from "@/lib/badges";
import { Button, ButtonLink, Callout, Pill, ReviewBadge, SourceList, cx } from "@/components/ui";
import { ActivityRunner } from "./activities";
import { QuizEngine } from "./quiz-engine";
import { LessonIllustration } from "./lesson-illustration";
import { CertificateButton } from "./certificate";

type Step = "lesson" | "activity" | "quiz";

export function ModulePlayer({ moduleId }: { moduleId: string }) {
  const mod = moduleById[moduleId];
  const level = levelOf(moduleId);
  const { progress, updateModule, recordModuleQuiz } = useProgress();
  const hydrated = useHydrated();
  const mp = progress.modules[moduleId];
  const complete = isModuleComplete(mp);
  const [step, setStep] = useState<Step>("lesson");
  const topRef = useRef<HTMLDivElement>(null);

  const goTo = (s: Step) => {
    setStep(s);
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const steps: { id: Step; label: string; icon: typeof BookOpen; done: boolean }[] = [
    { id: "lesson", label: "Lesson", icon: BookOpen, done: !!mp?.lessonDone },
    { id: "activity", label: "Activity", icon: Puzzle, done: !!mp?.activityDone },
    { id: "quiz", label: "Quiz", icon: ListChecks, done: (mp?.bestScore ?? 0) >= PASSING_SCORE },
  ];
  const doneCount = steps.filter((s) => s.done).length;

  const order = modules.map((m) => m.id);
  const nextId = order[order.indexOf(moduleId) + 1];
  const levelBadge = badges.find((b) => b.id === level.badge)!;
  const earned = earnedBadges(progress);

  return (
    <div ref={topRef} className="scroll-mt-32">
      {/* progress indicator */}
      <div className="rounded-3xl border border-line bg-bg-elev p-4 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-semibold">
            Module progress: {hydrated ? doneCount : 0} of 3 steps
            {hydrated && complete && <span className="ml-2"><Pill tone="green"><Check aria-hidden className="size-3" /> Completed</Pill></span>}
          </p>
          {hydrated && mp?.bestScore != null && <p className="text-sm text-fg-muted">Best quiz score: {mp.bestScore}/5</p>}
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-bg-sunken" role="progressbar" aria-label="Module progress" aria-valuemin={0} aria-valuemax={3} aria-valuenow={hydrated ? doneCount : 0}>
          <div className="h-full rounded-full bg-emerald-500 transition-all" style={{ width: `${hydrated ? (doneCount / 3) * 100 : 0}%` }} />
        </div>
        <nav aria-label="Module steps" className="mt-4">
          <ol className="grid grid-cols-3 gap-2">
            {steps.map((s, i) => (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => goTo(s.id)}
                  aria-current={step === s.id ? "step" : undefined}
                  className={cx(
                    "flex w-full items-center justify-center gap-2 rounded-xl border px-2 py-2.5 text-sm font-bold",
                    step === s.id ? "border-cyan bg-cyan/15" : "border-line text-fg-muted hover:text-fg",
                  )}
                >
                  {hydrated && s.done ? (
                    <CheckCircle2 aria-label="done" className="size-4 text-emerald-600" />
                  ) : (
                    <span aria-hidden className="font-display">{i + 1}</span>
                  )}
                  <s.icon aria-hidden className="hidden size-4 sm:block" />
                  {s.label}
                </button>
              </li>
            ))}
          </ol>
        </nav>
      </div>

      <div className="mt-8">
        {step === "lesson" && (
          <article aria-label="Lesson" className="space-y-8">
            {mod.lesson.map((sec) => (
              <section key={sec.heading} className="grid gap-6 lg:grid-cols-[1fr_1fr]">
                <div className={cx(!sec.illustration && "lg:col-span-2")}>
                  <h2 className="font-display text-3xl font-extrabold uppercase">{sec.heading}</h2>
                  <div className="mt-3 space-y-3 text-lg text-fg-muted">
                    {sec.body.map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                  </div>
                </div>
                {sec.illustration && <LessonIllustration kind={sec.illustration} />}
              </section>
            ))}
            <div className="flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-end sm:justify-between">
              <SourceList ids={mod.sources} />
              <ReviewBadge review={mod.review} />
            </div>
            <Button
              onClick={() => {
                updateModule(moduleId, { lessonDone: true });
                goTo("activity");
              }}
            >
              {mp?.lessonDone ? "Continue to activity" : "Mark lesson complete & continue"} <ArrowRight aria-hidden className="size-4" />
            </Button>
          </article>
        )}

        {step === "activity" && (
          <section aria-label="Activity" className="rounded-3xl border border-line bg-bg-elev p-6 sm:p-8">
            <h2 className="font-display text-3xl font-extrabold uppercase">Activity</h2>
            <div className="mt-4">
              <ActivityRunner
                key={moduleId}
                activity={mod.activity}
                seed={moduleId}
                onComplete={() => updateModule(moduleId, { activityDone: true })}
              />
            </div>
            {hydrated && mp?.activityDone && (
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Pill tone="green"><Check aria-hidden className="size-3" /> Activity complete</Pill>
                <Button onClick={() => goTo("quiz")}>
                  Continue to quiz <ArrowRight aria-hidden className="size-4" />
                </Button>
              </div>
            )}
          </section>
        )}

        {step === "quiz" && (
          <section aria-label="Quiz">
            <h2 className="mb-4 font-display text-3xl font-extrabold uppercase">Five-question quiz</h2>
            <p className="mb-6 text-fg-muted">Get at least {PASSING_SCORE} of 5 correct to pass. You can retry as many times as you like.</p>
            <QuizEngine
              key={moduleId}
              questions={mod.quiz}
              passMark={PASSING_SCORE}
              fallbackModule={moduleId}
              onFinish={(score) => recordModuleQuiz(moduleId, score)}
            />
          </section>
        )}
      </div>

      {hydrated && complete && (
        <div className="mt-10 rounded-3xl bg-navy p-6 text-white sm:p-8" role="status">
          <div className="flex items-start gap-4">
            <Trophy aria-hidden className="size-10 shrink-0 text-amber-400" />
            <div className="flex-1">
              <p className="font-display text-3xl font-extrabold uppercase">Module complete!</p>
              <p className="mt-1 text-white/80">
                You finished {mod.title}.{" "}
                {earned.some((b) => b.id === levelBadge.id)
                  ? `You've earned the ${levelBadge.name} badge.`
                  : `Complete every ${level.name} module to earn the ${levelBadge.name} badge.`}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {nextId ? (
                  <ButtonLink href={`/academy/${nextId}`} variant="cyan">
                    Next: {moduleById[nextId].title} <ArrowRight aria-hidden className="size-4" />
                  </ButtonLink>
                ) : (
                  <ButtonLink href="/dashboard" variant="cyan">
                    View your dashboard
                  </ButtonLink>
                )}
                {earned.some((b) => b.id === levelBadge.id) && <CertificateButton badge={levelBadge} earnedOn={mp?.completedAt} />}
              </div>
            </div>
          </div>
        </div>
      )}

      {mod.category === "emergency" && (
        <Callout tone="warning" title="Awareness, not certification" className="mt-8">
          This module builds awareness. It is not CPR certification. Hands-on training from a recognized provider is the
          best way to prepare.
        </Callout>
      )}

      <div className="mt-10">
        <Link href="/academy" className="inline-flex items-center gap-1 text-sm font-semibold text-cyan-ink underline underline-offset-2">
          <ArrowLeft aria-hidden className="size-4" /> All modules
        </Link>
      </div>
    </div>
  );
}
