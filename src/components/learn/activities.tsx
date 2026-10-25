"use client";

import { useId, useMemo, useState } from "react";
import { Check, RotateCcw, X } from "lucide-react";
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
