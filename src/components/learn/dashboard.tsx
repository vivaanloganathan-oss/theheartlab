"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, CheckCircle2, Circle, FlaskConical, ListChecks, Trash2, Trophy } from "lucide-react";
import { quizSets } from "@/content/quizzes";
import { topics } from "@/content/topics";
import { useHydrated, useProgress } from "@/lib/progress";
import { Button, ButtonLink, Card } from "@/components/ui";

const quizList = [
  ...quizSets.map((q) => ({ id: q.id, title: q.title, href: `/quiz#${q.id}`, description: q.description })),
  {
    id: "congenital",
    title: "Congenital Hearts Check",
    href: "/congenital-heart-conditions#check",
    description: "Five questions on congenital heart conditions in athletes.",
  },
];

const labs = [
  { id: "heartbeat", name: "Heartbeat Simulator" },
  { id: "blood-flow", name: "Blood Flow Explorer" },
  { id: "sports", name: "Exercise & Your Heart" },
  { id: "recovery", name: "Recovery Explorer" },
  { id: "myths", name: "Myth vs. Fact" },
];

export function Dashboard() {
  const hydrated = useHydrated();
  const { progress, reset } = useProgress();
  const [confirming, setConfirming] = useState(false);

  if (!hydrated) {
    return <div className="h-96 animate-pulse rounded-3xl bg-bg-sunken" aria-label="Loading your progress" />;
  }

  const checksDone = topics.filter((t) => progress.topicChecks[t.id]);
  const labsDone = labs.filter((l) => progress.labsVisited[l.id]);
  const quizzesTaken = quizList.filter((q) => progress.quizzes[q.id]);
  const total = topics.length + labs.length + quizList.length;
  const pct = Math.round(((checksDone.length + labsDone.length + quizzesTaken.length) / total) * 100);

  const recommended = [
    ...topics
      .filter((t) => !progress.topicChecks[t.id])
      .map((t) => ({ href: `/athlete-health#${t.id}`, title: `${t.letter}. ${t.title}`, text: "Athlete Health knowledge check" })),
    ...labs
      .filter((l) => !progress.labsVisited[l.id])
      .map((l) => ({ href: `/heart-lab#${l.id}`, title: l.name, text: "Heart Lab simulation" })),
    ...quizList
      .filter((q) => !progress.quizzes[q.id])
      .map((q) => ({ href: q.href, title: q.title, text: q.description })),
  ].slice(0, 3);

  return (
    <div className="space-y-10">
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { icon: ListChecks, label: "Topic checks passed", value: `${checksDone.length} / ${topics.length}` },
          { icon: FlaskConical, label: "Labs explored", value: `${labsDone.length} / ${labs.length}` },
          { icon: Trophy, label: "Quizzes taken", value: `${quizzesTaken.length} / ${quizList.length}` },
        ].map(({ icon: Icon, label, value }) => (
          <Card key={label}>
            <Icon aria-hidden className="size-6 text-cyan-ink" />
            <p className="mt-3 font-display text-4xl font-extrabold">{value}</p>
            <p className="text-sm text-fg-muted">{label}</p>
          </Card>
        ))}
      </div>

      <Card>
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl font-bold uppercase">Learning progress</h2>
          <span className="font-display text-2xl font-bold">{pct}%</span>
        </div>
        <div
          className="mt-3 h-3 overflow-hidden rounded-full bg-bg-sunken"
          role="progressbar"
          aria-label="Overall learning progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={pct}
        >
          <div className="h-full rounded-full bg-gradient-to-r from-cyan to-heart" style={{ width: `${pct}%` }} />
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div>
            <p className="font-bold">Athlete Health knowledge checks</p>
            <ul className="mt-2 space-y-1 text-sm">
              {topics.map((t) => (
                <li key={t.id}>
                  <Link href={`/athlete-health#${t.id}`} className="inline-flex min-h-6 items-center gap-2 hover:underline">
                    {progress.topicChecks[t.id] ? (
                      <CheckCircle2 aria-label="Passed" className="size-4 text-emerald-600" />
                    ) : (
                      <Circle aria-label="Not yet" className="size-4 text-fg-muted" />
                    )}
                    {t.letter}. {t.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-bold">Heart Lab simulations</p>
            <ul className="mt-2 space-y-1 text-sm">
              {labs.map((l) => (
                <li key={l.id}>
                  <Link href={`/heart-lab#${l.id}`} className="inline-flex min-h-6 items-center gap-2 hover:underline">
                    {progress.labsVisited[l.id] ? (
                      <CheckCircle2 aria-label="Explored" className="size-4 text-emerald-600" />
                    ) : (
                      <Circle aria-label="Not yet" className="size-4 text-fg-muted" />
                    )}
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <h2 className="font-display text-2xl font-bold uppercase">Recommended next</h2>
          {recommended.length === 0 ? (
            <p className="mt-3 text-fg-muted">You&apos;ve done it all. Try beating your best quiz scores!</p>
          ) : (
            <ul className="mt-4 space-y-3">
              {recommended.map((r) => (
                <li key={r.href}>
                  <Link href={r.href} className="group flex items-center gap-3 rounded-xl border border-line p-3 hover:border-cyan">
                    <div className="flex-1">
                      <p className="font-bold">{r.title}</p>
                      <p className="text-sm text-fg-muted">{r.text}</p>
                    </div>
                    <ArrowRight aria-hidden className="size-4 text-red-ink transition group-hover:translate-x-1" />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card>
          <h2 className="font-display text-2xl font-bold uppercase">Quiz results</h2>
          <ul className="mt-4 space-y-3">
            {quizList.map((q) => {
              const r = progress.quizzes[q.id];
              return (
                <li key={q.id} className="flex items-center justify-between gap-3 rounded-xl bg-bg-sunken p-3">
                  <div>
                    <p className="font-bold">{q.title}</p>
                    <p className="text-sm text-fg-muted">
                      {r
                        ? `Best ${r.best}/${r.total} · Last ${r.last}/${r.total} · ${r.attempts} attempt${r.attempts === 1 ? "" : "s"}`
                        : "Not attempted yet"}
                    </p>
                  </div>
                  <ButtonLink href={q.href} variant="secondary" className="shrink-0">
                    {r ? "Retry" : "Start"}
                  </ButtonLink>
                </li>
              );
            })}
          </ul>
        </Card>
      </div>

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
            <p className="font-semibold">Erase all progress and quiz scores on this device?</p>
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
