"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Award, BookOpen, FlaskConical, ListChecks, Lock, Trash2 } from "lucide-react";
import { badges, levels, moduleById, modules } from "@/content/academy";
import { quizSets } from "@/content/quizzes";
import { topics } from "@/content/topics";
import { isModuleComplete, useHydrated, useProgress } from "@/lib/progress";
import { completedModuleIds, earnedBadges, recommendedModules } from "@/lib/badges";
import { Button, ButtonLink, Card, Pill, cx } from "@/components/ui";
import { CertificateButton } from "./certificate";

const labNames: Record<string, string> = {
  heartbeat: "Heartbeat Simulator",
  "blood-flow": "Blood Flow Explorer",
  sports: "Exercise & Your Heart",
  recovery: "Recovery Explorer",
  myths: "Myth vs. Fact",
};

export function Dashboard() {
  const hydrated = useHydrated();
  const { progress, reset } = useProgress();
  const [confirming, setConfirming] = useState(false);

  if (!hydrated) {
    return <div className="h-96 animate-pulse rounded-3xl bg-bg-sunken" aria-label="Loading your progress" />;
  }

  const completed = completedModuleIds(progress);
  const earned = earnedBadges(progress);
  const recommended = recommendedModules(progress);
  const pct = Math.round((completed.length / modules.length) * 100);
  const checks = topics.filter((t) => progress.topicChecks[t.id]).length;
  const labs = Object.keys(labNames).filter((k) => progress.labsVisited[k]);

  const completedAtFor = (badgeId: string) => {
    const b = badges.find((x) => x.id === badgeId)!;
    const dates = b.requires.map((id) => progress.modules[id]?.completedAt).filter(Boolean) as string[];
    return dates.sort().at(-1) ?? null;
  };

  return (
    <div className="space-y-10">
      {/* summary */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: BookOpen, label: "Modules completed", value: `${completed.length} / ${modules.length}` },
          { icon: Award, label: "Badges earned", value: `${earned.length} / ${badges.length}` },
          { icon: ListChecks, label: "Topic checks passed", value: `${checks} / ${topics.length}` },
          { icon: FlaskConical, label: "Labs explored", value: `${labs.length} / 5` },
        ].map(({ icon: Icon, label, value }) => (
          <Card key={label}>
            <Icon aria-hidden className="size-6 text-cyan-ink" />
            <p className="mt-3 font-display text-4xl font-extrabold">{value}</p>
            <p className="text-sm text-fg-muted">{label}</p>
          </Card>
        ))}
      </div>

      {/* overall progress */}
      <Card>
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl font-bold uppercase">Learning progress</h2>
          <span className="font-display text-2xl font-bold">{pct}%</span>
        </div>
        <div className="mt-3 h-3 overflow-hidden rounded-full bg-bg-sunken" role="progressbar" aria-label="Overall academy progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct}>
          <div className="h-full rounded-full bg-gradient-to-r from-cyan to-heart" style={{ width: `${pct}%` }} />
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {levels.map((l) => (
            <div key={l.id}>
              <p className="font-bold">
                Level {l.number}: {l.name}
              </p>
              <ul className="mt-2 space-y-1 text-sm">
                {l.modules.map((id) => {
                  const mp = progress.modules[id];
                  const done = isModuleComplete(mp);
                  return (
                    <li key={id} className="flex items-center justify-between gap-2">
                      <Link href={`/academy/${id}`} className="truncate hover:underline">
                        {moduleById[id].title}
                      </Link>
                      {done ? (
                        <Pill tone="green">Done</Pill>
                      ) : mp?.bestScore != null ? (
                        <Pill tone="cyan">Quiz {mp.bestScore}/5</Pill>
                      ) : mp ? (
                        <Pill tone="cyan">Started</Pill>
                      ) : (
                        <Pill>Not started</Pill>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* recommended */}
        <Card>
          <h2 className="font-display text-2xl font-bold uppercase">Recommended next</h2>
          {recommended.length === 0 ? (
            <p className="mt-3 text-fg-muted">You&apos;ve completed every module. Try the Knowledge Challenge or revisit the labs!</p>
          ) : (
            <ul className="mt-4 space-y-3">
              {recommended.map((m) => (
                <li key={m.id}>
                  <Link href={`/academy/${m.id}`} className="group flex items-center gap-3 rounded-xl border border-line p-3 hover:border-cyan">
                    <div className="flex-1">
                      <p className="font-bold">{m.title}</p>
                      <p className="text-sm text-fg-muted">{m.summary}</p>
                    </div>
                    <ArrowRight aria-hidden className="size-4 text-red-ink transition group-hover:translate-x-1" />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Card>

        {/* quiz results */}
        <Card>
          <h2 className="font-display text-2xl font-bold uppercase">Quiz results</h2>
          <ul className="mt-4 space-y-3">
            {quizSets.map((q) => {
              const r = progress.quizzes[q.id];
              return (
                <li key={q.id} className="flex items-center justify-between gap-3 rounded-xl bg-bg-sunken p-3">
                  <div>
                    <p className="font-bold">{q.title}</p>
                    <p className="text-sm text-fg-muted">
                      {r ? `Best ${r.best}/${r.total} · Last ${r.last}/${r.total} · ${r.attempts} attempt${r.attempts === 1 ? "" : "s"}` : "Not attempted yet"}
                    </p>
                  </div>
                  <ButtonLink href={`/quiz#${q.id}`} variant="secondary" className="shrink-0">
                    {r ? "Retry" : "Start"}
                  </ButtonLink>
                </li>
              );
            })}
            {modules
              .filter((m) => progress.modules[m.id]?.bestScore != null)
              .map((m) => (
                <li key={m.id} className="flex items-center justify-between rounded-xl px-3 text-sm">
                  <span>{m.title} quiz</span>
                  <span className="font-semibold">Best {progress.modules[m.id]!.bestScore}/5</span>
                </li>
              ))}
          </ul>
        </Card>
      </div>

      {/* badges & certificates */}
      <Card>
        <h2 className="font-display text-2xl font-bold uppercase">Badges & certificates</h2>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {badges.map((b) => {
            const has = earned.some((e) => e.id === b.id);
            return (
              <li
                key={b.id}
                className={cx("flex flex-col rounded-2xl border p-4", has ? "border-amber-500/60 bg-amber-500/10" : "border-dashed border-line")}
              >
                {has ? <Award aria-hidden className="size-8 text-amber-500" /> : <Lock aria-hidden className="size-7 text-fg-muted" />}
                <p className="mt-2 font-display text-xl font-bold uppercase">{b.name}</p>
                <p className="flex-1 text-sm text-fg-muted">{b.description}</p>
                <p className="mt-2 text-xs font-semibold">{has ? "Earned" : "Locked"}</p>
                {has && (
                  <div className="mt-3">
                    <CertificateButton badge={b} earnedOn={completedAtFor(b.id)} />
                  </div>
                )}
              </li>
            );
          })}
        </ul>
        <p className="mt-4 text-xs text-fg-muted">
          Certificates are educational achievements only — not CPR certification, medical qualifications, or sports
          clearance.
        </p>
      </Card>

      {/* privacy / reset */}
      <Card className="border-dashed">
        <h2 className="font-display text-2xl font-bold uppercase">Your data</h2>
        <p className="mt-2 text-fg-muted">
          Progress is stored only in this browser&apos;s local storage. It isn&apos;t sent to any server, and we never ask
          for your name, age, or health information. Clearing your browser data — or the button below — erases it.
        </p>
        {!confirming ? (
          <Button variant="secondary" className="mt-4" onClick={() => setConfirming(true)}>
            <Trash2 aria-hidden className="size-4" /> Reset my progress
          </Button>
        ) : (
          <div className="mt-4 flex flex-wrap items-center gap-3" role="alert">
            <p className="font-semibold">Erase all progress, scores, and badges on this device?</p>
            <Button
              onClick={() => {
                reset();
                setConfirming(false);
              }}
            >
              Yes, erase
            </Button>
            <Button variant="secondary" onClick={() => setConfirming(false)}>
              Cancel
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}
