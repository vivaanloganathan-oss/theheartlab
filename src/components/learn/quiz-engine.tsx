"use client";

import Link from "next/link";
import { useId, useRef, useState } from "react";
import { ArrowRight, CheckCircle2, RotateCcw, Trophy, XCircle } from "lucide-react";
import type { Question } from "@/content/types";
import { Button, Pill, cx } from "@/components/ui";

const kindLabel = {
  "multiple-choice": "Multiple choice",
  "true-false": "True / false",
  scenario: "Scenario",
} as const;

interface Props {
  questions: Question[];
  /** Called once per completed attempt. */
  onFinish?: (score: number, total: number) => void;
  passMark?: number;
  finishLabel?: string;
}

export function QuizEngine({ questions, onFinish, passMark, finishLabel = "See results" }: Props) {
  const [index, setIndex] = useState(0);
  const [choice, setChoice] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [results, setResults] = useState<boolean[]>([]);
  const [done, setDone] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const groupId = useId();

  const q = questions[index];
  const score = results.filter(Boolean).length;
  const progress = ((index + (answered ? 1 : 0)) / questions.length) * 100;

  const submit = () => {
    if (choice === null) return;
    setAnswered(true);
    setResults((r) => [...r, choice === q.answerIndex]);
  };

  const next = () => {
    if (index + 1 >= questions.length) {
      setDone(true);
      onFinish?.(score, questions.length);
    } else {
      setIndex((i) => i + 1);
      setChoice(null);
      setAnswered(false);
    }
    requestAnimationFrame(() => headingRef.current?.focus());
  };

  const retry = () => {
    setIndex(0);
    setChoice(null);
    setAnswered(false);
    setResults([]);
    setDone(false);
    requestAnimationFrame(() => headingRef.current?.focus());
  };

  if (done) {
    const passed = passMark === undefined || score >= passMark;
    const missed = questions.filter((_, i) => !results[i]);
    const suggestions = [
      ...new Map(missed.flatMap((m) => (m.related ? [[m.related.href, m.related] as const] : []))).values(),
    ];
    return (
      <div className="rounded-3xl border border-line bg-bg-elev p-6 sm:p-8">
        <h3 ref={headingRef} tabIndex={-1} className="flex items-center gap-3 font-display text-4xl font-extrabold uppercase outline-none">
          <Trophy aria-hidden className={cx("size-9", passed ? "text-amber-500" : "text-fg-muted")} />
          You scored {score} / {questions.length}
        </h3>
        <div className="mt-4 h-3 overflow-hidden rounded-full bg-bg-sunken" aria-hidden>
          <div className={cx("h-full rounded-full", passed ? "bg-emerald-500" : "bg-amber-500")} style={{ width: `${(score / questions.length) * 100}%` }} />
        </div>
        {passMark !== undefined && (
          <p className="mt-3 font-semibold" role="status">
            {passed ? "Passed! " : `You need ${passMark} correct to pass. `}
            {passed ? "Great work." : "Review the explanations and try again."}
          </p>
        )}
        <ol className="mt-6 space-y-2">
          {questions.map((qq, i) => (
            <li key={qq.id} className="flex gap-2 text-sm">
              {results[i] ? (
                <CheckCircle2 aria-label="Correct" className="size-5 shrink-0 text-emerald-600" />
              ) : (
                <XCircle aria-label="Incorrect" className="size-5 shrink-0 text-red-ink" />
              )}
              <span>{qq.prompt}</span>
            </li>
          ))}
        </ol>
        {suggestions.length > 0 && (
          <div className="mt-6 rounded-2xl bg-bg-sunken p-4">
            <p className="font-bold">Suggested review</p>
            <ul className="mt-2 space-y-1">
              {suggestions.map((s) => (
                <li key={s.href}>
                  <Link href={s.href} className="inline-flex items-center gap-1 text-cyan-ink underline underline-offset-2">
                    {s.label} <ArrowRight aria-hidden className="size-3.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
        <Button className="mt-6" variant="secondary" onClick={retry}>
          <RotateCcw aria-hidden className="size-4" /> Retry quiz
        </Button>
      </div>
    );
  }

  const correct = choice === q.answerIndex;

  return (
    <div className="rounded-3xl border border-line bg-bg-elev p-6 sm:p-8">
      <div className="flex items-center justify-between gap-3 text-sm text-fg-muted">
        <span>
          Question {index + 1} of {questions.length}
        </span>
        <span>
          Score: {score}/{results.length}
        </span>
      </div>
      <div
        className="mt-2 h-2 overflow-hidden rounded-full bg-bg-sunken"
        role="progressbar"
        aria-label="Quiz progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress)}
      >
        <div className="h-full rounded-full bg-cyan transition-all" style={{ width: `${progress}%` }} />
      </div>

      <div className="mt-6">
        <Pill tone={q.kind === "scenario" ? "red" : "cyan"}>{kindLabel[q.kind]}</Pill>
        {q.scenario && (
          <p className="mt-4 rounded-2xl border-l-4 border-heart bg-bg-sunken p-4 italic">{q.scenario}</p>
        )}
        <h3 ref={headingRef} tabIndex={-1} id={`${groupId}-q`} className="mt-4 text-xl font-bold outline-none">
          {q.prompt}
        </h3>
        <div role="radiogroup" aria-labelledby={`${groupId}-q`} className="mt-4 grid gap-2">
          {q.options.map((opt, i) => {
            const isRight = answered && i === q.answerIndex;
            const isWrong = answered && i === choice && !correct;
            return (
              <label
                key={opt}
                className={cx(
                  "flex items-start gap-3 rounded-xl border px-4 py-3",
                  !answered && "cursor-pointer hover:border-cyan",
                  choice === i && !answered ? "border-cyan bg-cyan/10" : "border-line",
                  isRight && "border-emerald-500 bg-emerald-500/10",
                  isWrong && "border-heart bg-heart/10",
                )}
              >
                <input
                  type="radio"
                  name={`${groupId}-${q.id}`}
                  checked={choice === i}
                  disabled={answered}
                  onChange={() => setChoice(i)}
                  className="mt-1 accent-[#20C7E8]"
                />
                <span className="flex-1">{opt}</span>
                {isRight && <CheckCircle2 aria-label="Correct answer" className="size-5 text-emerald-600" />}
                {isWrong && <XCircle aria-label="Your answer, incorrect" className="size-5 text-red-ink" />}
              </label>
            );
          })}
        </div>
      </div>

      {answered && (
        <div
          role="status"
          className={cx(
            "mt-5 rounded-2xl border p-4",
            correct ? "border-emerald-500/50 bg-emerald-500/10" : "border-heart/50 bg-heart/10",
          )}
        >
          <p className="font-bold">{correct ? "Correct!" : "Not quite."}</p>
          <p className="mt-1 text-fg-muted">{q.explanation}</p>
        </div>
      )}

      <div className="mt-6">
        {!answered ? (
          <Button onClick={submit} disabled={choice === null}>
            Check answer
          </Button>
        ) : (
          <Button onClick={next}>
            {index + 1 >= questions.length ? finishLabel : "Next question"} <ArrowRight aria-hidden className="size-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
