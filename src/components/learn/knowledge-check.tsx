"use client";

import { useId, useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import type { Question } from "@/content/types";
import { useProgress } from "@/lib/progress";
import { Button, cx } from "@/components/ui";

/** Single-question check with immediate feedback. Records completion locally. */
export function KnowledgeCheck({ question, topicId }: { question: Question; topicId: string }) {
  const [choice, setChoice] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const { markTopicCheck } = useProgress();
  const id = useId();
  const correct = choice === question.answerIndex;

  return (
    <fieldset className="rounded-2xl border border-line bg-bg-sunken p-5">
      <legend className="sr-only">Knowledge check</legend>
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-ink" aria-hidden>
        Knowledge check
      </p>
      <p id={id} className="mt-1 font-semibold">
        {question.prompt}
      </p>
      <div role="radiogroup" aria-labelledby={id} className="mt-3 grid gap-2">
        {question.options.map((opt, i) => {
          const showRight = submitted && i === question.answerIndex;
          const showWrong = submitted && i === choice && !correct;
          return (
            <label
              key={opt}
              className={cx(
                "flex cursor-pointer items-start gap-3 rounded-xl border bg-bg-elev px-3 py-2 text-sm",
                choice === i ? "border-cyan" : "border-line",
                showRight && "border-emerald-500",
                showWrong && "border-heart",
                submitted && "cursor-default",
              )}
            >
              <input
                type="radio"
                name={id}
                className="mt-1 accent-[#20C7E8]"
                checked={choice === i}
                disabled={submitted}
                onChange={() => setChoice(i)}
              />
              <span>{opt}</span>
            </label>
          );
        })}
      </div>
      {!submitted ? (
        <Button
          className="mt-4"
          disabled={choice === null}
          onClick={() => {
            setSubmitted(true);
            if (choice === question.answerIndex) markTopicCheck(topicId);
          }}
        >
          Check answer
        </Button>
      ) : (
        <div role="status" className="mt-4 flex gap-3 text-sm">
          {correct ? (
            <CheckCircle2 aria-hidden className="size-5 shrink-0 text-emerald-600" />
          ) : (
            <XCircle aria-hidden className="size-5 shrink-0 text-red-ink" />
          )}
          <div>
            <p className="font-bold">{correct ? "Correct!" : "Not quite."}</p>
            <p className="text-fg-muted">{question.explanation}</p>
            {!correct && (
              <button
                type="button"
                className="mt-2 font-semibold text-cyan-ink underline underline-offset-2"
                onClick={() => {
                  setSubmitted(false);
                  setChoice(null);
                }}
              >
                Try again
              </button>
            )}
          </div>
        </div>
      )}
    </fieldset>
  );
}
