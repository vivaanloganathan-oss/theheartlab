"use client";

import Link from "next/link";
import { ArrowRight, Award, CheckCircle2, Clock, Lock } from "lucide-react";
import { badges, levels, moduleById } from "@/content/academy";
import { isModuleComplete, useHydrated, useProgress } from "@/lib/progress";
import { earnedBadges } from "@/lib/badges";
import { Pill, cx } from "@/components/ui";

export function AcademyOverview() {
  const { progress } = useProgress();
  const hydrated = useHydrated();
  const earned = hydrated ? earnedBadges(progress).map((b) => b.id) : [];

  return (
    <div className="space-y-14">
      {levels.map((level) => {
        const done = hydrated ? level.modules.filter((id) => isModuleComplete(progress.modules[id])).length : 0;
        const badge = badges.find((b) => b.id === level.badge)!;
        return (
          <section key={level.id} aria-labelledby={`level-${level.id}`}>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="font-display text-sm font-bold uppercase tracking-[0.2em] text-cyan-ink">Level {level.number}</p>
                <h2 id={`level-${level.id}`} className="font-display text-5xl font-extrabold uppercase leading-none">
                  {level.name}
                </h2>
                <p className="mt-2 max-w-2xl text-fg-muted">{level.audience}</p>
              </div>
              <div className="min-w-56">
                <div className="flex justify-between text-sm">
                  <span className="font-semibold">{done} / {level.modules.length} complete</span>
                  <span className={cx("inline-flex items-center gap-1", earned.includes(badge.id) ? "text-amber-600 dark:text-amber-300" : "text-fg-muted")}>
                    {earned.includes(badge.id) ? <Award aria-hidden className="size-4" /> : <Lock aria-hidden className="size-3.5" />}
                    {badge.name}
                  </span>
                </div>
                <div
                  className="mt-2 h-2 overflow-hidden rounded-full bg-bg-sunken"
                  role="progressbar"
                  aria-label={`${level.name} progress`}
                  aria-valuemin={0}
                  aria-valuemax={level.modules.length}
                  aria-valuenow={done}
                >
                  <div className="h-full rounded-full bg-emerald-500" style={{ width: `${(done / level.modules.length) * 100}%` }} />
                </div>
              </div>
            </div>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {level.modules.map((id, i) => {
                const m = moduleById[id];
                const mp = progress.modules[id];
                const complete = hydrated && isModuleComplete(mp);
                const started = hydrated && !!mp && !complete;
                return (
                  <li key={id}>
                    <Link
                      href={`/academy/${id}`}
                      className="group flex h-full flex-col rounded-2xl border border-line bg-bg-elev p-5 transition hover:-translate-y-1 hover:border-cyan"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-display text-sm font-bold text-fg-muted">
                          {level.number}.{i + 1}
                        </span>
                        {complete ? (
                          <Pill tone="green"><CheckCircle2 aria-hidden className="size-3" /> Complete</Pill>
                        ) : started ? (
                          <Pill tone="cyan">In progress</Pill>
                        ) : null}
                      </div>
                      <h3 className="mt-2 font-display text-2xl font-bold uppercase leading-tight">{m.title}</h3>
                      <p className="mt-2 flex-1 text-sm text-fg-muted">{m.summary}</p>
                      <div className="mt-4 flex items-center justify-between text-sm">
                        <span className="inline-flex items-center gap-1 text-fg-muted">
                          <Clock aria-hidden className="size-3.5" /> {m.minutes} min
                        </span>
                        <span className="inline-flex items-center gap-1 font-bold text-red-ink">
                          {complete ? "Review" : started ? "Continue" : "Start"}
                          <ArrowRight aria-hidden className="size-4 transition group-hover:translate-x-1" />
                        </span>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
