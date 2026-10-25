"use client";

import { useId, useMemo, useState } from "react";
import { ArrowDown, ArrowUp, Check, RotateCcw, X } from "lucide-react";
import type { Activity } from "@/content/academy";
import { seededShuffle } from "@/lib/shuffle";
import { Button, cx } from "@/components/ui";

interface ActivityProps {
  seed: string;
  onComplete?: () => void;
}

function Result({ correct, total, onRetry }: { correct: number; total: number; onRetry: () => void }) {
  const all = correct === total;
  return (
    <div
      role="status"
      className={cx(
        "mt-4 flex flex-wrap items-center gap-3 rounded-xl border p-4 text-sm",
        all ? "border-emerald-500/50 bg-emerald-500/10" : "border-amber-500/50 bg-amber-500/10",
      )}
    >
      <p className="flex-1 font-semibold">
        {all ? "All correct — nice work!" : `${correct} of ${total} correct. Items marked ✗ need another look.`}
      </p>
      {!all && (
        <Button variant="secondary" onClick={onRetry}>
          <RotateCcw aria-hidden className="size-4" /> Try again
        </Button>
      )}
    </div>
  );
}

export function SortActivity({
  prompt,
  categories,
  items,
  seed,
  onComplete,
}: ActivityProps & { prompt: string; categories: string[]; items: { text: string; category: string }[] }) {
  const shuffled = useMemo(() => seededShuffle(items, seed), [items, seed]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);
  const groupId = useId();
  const correct = shuffled.filter((i) => answers[i.text] === i.category).length;
  const allAnswered = shuffled.every((i) => answers[i.text]);

  return (
    <div>
      <p className="font-semibold">{prompt}</p>
      <ul className="mt-4 space-y-3">
        {shuffled.map((item, idx) => {
          const chosen = answers[item.text];
          const isRight = checked && chosen === item.category;
          const isWrong = checked && chosen !== item.category;
          return (
            <li
              key={item.text}
              className={cx(
                "rounded-xl border p-3",
                isRight && "border-emerald-500/60",
                isWrong && "border-heart/60",
                !checked && "border-line",
              )}
            >
              <div className="flex flex-wrap items-center gap-3">
                <p id={`${groupId}-${idx}`} className="flex-1 font-medium">
                  {checked && (isRight ? <Check aria-label="Correct" className="mr-1 inline size-4 text-emerald-600" /> : <X aria-label="Incorrect" className="mr-1 inline size-4 text-red-ink" />)}
                  {item.text}
                </p>
                <div role="radiogroup" aria-labelledby={`${groupId}-${idx}`} className="flex flex-wrap gap-2">
                  {categories.map((c) => (
                    <button
                      key={c}
                      type="button"
                      role="radio"
                      aria-checked={chosen === c}
                      disabled={checked}
                      onClick={() => setAnswers((a) => ({ ...a, [item.text]: c }))}
                      className={cx(
                        "rounded-full border px-3 py-1 text-xs font-semibold",
                        chosen === c ? "border-cyan bg-cyan/15 text-fg" : "border-line text-fg-muted hover:text-fg",
                      )}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
              {isWrong && <p className="mt-2 text-xs text-fg-muted">Answer: {item.category}</p>}
            </li>
          );
        })}
      </ul>
      {!checked ? (
        <Button
          className="mt-4"
          disabled={!allAnswered}
          onClick={() => {
            setChecked(true);
            if (shuffled.every((i) => answers[i.text] === i.category)) onComplete?.();
          }}
        >
          Check answers
        </Button>
      ) : (
        <Result
          correct={correct}
          total={shuffled.length}
          onRetry={() => {
            setChecked(false);
            setAnswers({});
          }}
        />
      )}
    </div>
  );
}

export function OrderActivity({ prompt, items, seed, onComplete }: ActivityProps & { prompt: string; items: string[] }) {
  const initial = useMemo(() => seededShuffle(items, seed), [items, seed]);
  const [order, setOrder] = useState(initial);
  const [checked, setChecked] = useState(false);
  const [announce, setAnnounce] = useState("");
  const correct = order.filter((v, i) => v === items[i]).length;

  const move = (from: number, to: number) => {
    if (to < 0 || to >= order.length) return;
    const next = [...order];
    [next[from], next[to]] = [next[to], next[from]];
    setOrder(next);
    setChecked(false);
    setAnnounce(`${next[to]} moved to position ${to + 1}`);
  };

  return (
    <div>
      <p className="font-semibold">{prompt}</p>
      <p className="mt-1 text-sm text-fg-muted">Use the arrow buttons to move items up or down.</p>
      <p className="sr-only" aria-live="polite">
        {announce}
      </p>
      <ol className="mt-4 space-y-2">
        {order.map((item, i) => {
          const ok = checked && item === items[i];
          const bad = checked && item !== items[i];
          return (
            <li
              key={item}
              className={cx(
                "flex items-center gap-3 rounded-xl border bg-bg-elev p-3",
                ok && "border-emerald-500/60",
                bad && "border-heart/60",
                !checked && "border-line",
              )}
            >
              <span className="font-display text-xl font-extrabold text-cyan-ink">{i + 1}</span>
              <span className="flex-1">{item}</span>
              {checked && (ok ? <Check aria-label="Correct position" className="size-4 text-emerald-600" /> : <X aria-label="Wrong position" className="size-4 text-red-ink" />)}
              <button
                type="button"
                onClick={() => move(i, i - 1)}
                disabled={i === 0}
                aria-label={`Move “${item}” up`}
                className="inline-flex size-8 items-center justify-center rounded-full border border-line disabled:opacity-30"
              >
                <ArrowUp aria-hidden className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => move(i, i + 1)}
                disabled={i === order.length - 1}
                aria-label={`Move “${item}” down`}
                className="inline-flex size-8 items-center justify-center rounded-full border border-line disabled:opacity-30"
              >
                <ArrowDown aria-hidden className="size-4" />
              </button>
            </li>
          );
        })}
      </ol>
      {!checked || correct !== items.length ? (
        <Button
          className="mt-4"
          onClick={() => {
            setChecked(true);
            if (order.every((v, i) => v === items[i])) onComplete?.();
          }}
        >
          Check order
        </Button>
      ) : null}
      {checked && (
        <Result correct={correct} total={items.length} onRetry={() => setChecked(false)} />
      )}
    </div>
  );
}

export function MatchActivity({
  prompt,
  pairs,
  seed,
  onComplete,
}: ActivityProps & { prompt: string; pairs: { term: string; definition: string }[] }) {
  const definitions = useMemo(() => seededShuffle(pairs.map((p) => p.definition), seed), [pairs, seed]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);
  const baseId = useId();
  const correct = pairs.filter((p) => answers[p.term] === p.definition).length;

  return (
    <div>
      <p className="font-semibold">{prompt}</p>
      <ul className="mt-4 space-y-3">
        {pairs.map((p, i) => {
          const ok = checked && answers[p.term] === p.definition;
          const bad = checked && !ok;
          return (
            <li
              key={p.term}
              className={cx(
                "grid gap-2 rounded-xl border p-3 sm:grid-cols-[10rem_1fr] sm:items-center",
                ok && "border-emerald-500/60",
                bad && "border-heart/60",
                !checked && "border-line",
              )}
            >
              <label htmlFor={`${baseId}-${i}`} className="font-bold">
                {p.term}
              </label>
              <select
                id={`${baseId}-${i}`}
                value={answers[p.term] ?? ""}
                disabled={checked}
                onChange={(e) => setAnswers((a) => ({ ...a, [p.term]: e.target.value }))}
                className="w-full rounded-lg border border-line bg-bg px-3 py-2 text-sm"
              >
                <option value="">Choose a description…</option>
                {definitions.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
              {bad && <p className="text-xs text-fg-muted sm:col-start-2">Answer: {p.definition}</p>}
            </li>
          );
        })}
      </ul>
      {!checked ? (
        <Button
          className="mt-4"
          disabled={pairs.some((p) => !answers[p.term])}
          onClick={() => {
            setChecked(true);
            if (pairs.every((p) => answers[p.term] === p.definition)) onComplete?.();
          }}
        >
          Check matches
        </Button>
      ) : (
        <Result
          correct={correct}
          total={pairs.length}
          onRetry={() => {
            setChecked(false);
            setAnswers({});
          }}
        />
      )}
    </div>
  );
}

export function ActivityRunner({ activity, seed, onComplete }: { activity: Activity } & ActivityProps) {
  switch (activity.type) {
    case "sort":
      return <SortActivity {...activity} seed={seed} onComplete={onComplete} />;
    case "order":
      return <OrderActivity {...activity} seed={seed} onComplete={onComplete} />;
    case "match":
      return <MatchActivity {...activity} seed={seed} onComplete={onComplete} />;
  }
}
