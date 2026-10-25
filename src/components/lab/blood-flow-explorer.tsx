"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { flowSteps, heartPartById, type HeartPartId } from "@/content/anatomy";
import { HeartDiagram } from "@/components/heart/heart-diagram";
import { useProgress } from "@/lib/progress";
import { Button, Pill, cx } from "@/components/ui";

type Filter = "all" | "rich" | "poor";

export function BloodFlowExplorer() {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [filter, setFilter] = useState<Filter>("all");
  const [chamber, setChamber] = useState<HeartPartId | null>(null);
  const { markLabVisited } = useProgress();

  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => setStep((s) => (s + 1) % flowSteps.length), 2200);
    return () => clearInterval(t);
  }, [playing]);

  const current = flowSteps[step];
  const highlight =
    chamber ?? (current.part !== "body" && current.part !== "lungs" ? (current.part as HeartPartId) : null);
  const go = (n: number) => {
    setStep((n + flowSteps.length) % flowSteps.length);
    setChamber(null);
    markLabVisited("blood-flow");
  };

  const selectedInfo = chamber ? heartPartById[chamber] : null;

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
      <div className="rounded-3xl border border-line bg-bg-elev p-4 sm:p-6">
        <div role="radiogroup" aria-label="Show blood" className="mb-3 flex flex-wrap gap-2">
          {(
            [
              ["all", "All blood"],
              ["rich", "Oxygen-rich only"],
              ["poor", "Oxygen-poor only"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              role="radio"
              aria-checked={filter === id}
              onClick={() => setFilter(id)}
              className={cx(
                "rounded-full border px-3 py-1 text-xs font-bold",
                filter === id ? "border-cyan bg-cyan/15" : "border-line text-fg-muted hover:text-fg",
              )}
            >
              {label}
            </button>
          ))}
        </div>
        <HeartDiagram
          highlight={highlight}
          onSelect={(id) => {
            setChamber(id);
            setPlaying(false);
            markLabVisited("blood-flow");
            const idx = flowSteps.findIndex((s) => s.part === id);
            if (idx >= 0) setStep(idx);
          }}
          showFlow
          flowFilter={filter}
          className="mx-auto w-full max-w-md"
          title="Blood flow diagram. Select a chamber or vessel to learn about it."
        />
        <p className="mt-2 text-center text-xs text-fg-muted">
          Moving dots show the direction of flow.{" "}
          <span className="font-semibold text-red-ink">Red = oxygen-rich</span>,{" "}
          <span className="font-semibold text-[color:var(--oxy-poor)]">blue = oxygen-poor</span> (real blood is always
          red).
        </p>
      </div>

      <div className="space-y-5">
        <div>
          <div className="flex items-center justify-between text-sm text-fg-muted">
            <span>
              Step {step + 1} of {flowSteps.length}
            </span>
            <span aria-hidden>{Math.round(((step + 1) / flowSteps.length) * 100)}%</span>
          </div>
          <div
            className="mt-2 h-2 overflow-hidden rounded-full bg-bg-sunken"
            role="progressbar"
            aria-valuemin={1}
            aria-valuemax={flowSteps.length}
            aria-valuenow={step + 1}
            aria-label="Blood flow tour progress"
          >
            <div className="h-full rounded-full bg-cyan transition-all" style={{ width: `${((step + 1) / flowSteps.length) * 100}%` }} />
          </div>
        </div>

        <div aria-live="polite" className="rounded-3xl border border-line bg-bg-elev p-6">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-display text-3xl font-extrabold uppercase">{selectedInfo?.name ?? current.title}</h3>
            {(selectedInfo?.oxygen ?? current.oxygen) === "rich" && <Pill tone="red">Oxygen-rich</Pill>}
            {(selectedInfo?.oxygen ?? current.oxygen) === "poor" && <Pill tone="cyan">Oxygen-poor</Pill>}
            {selectedInfo?.oxygen === "both" && <Pill>Both sides</Pill>}
          </div>
          <p className="mt-2 text-fg-muted">{selectedInfo ? selectedInfo.function : current.text}</p>
          {selectedInfo && <p className="mt-2 text-sm text-fg-muted">{selectedInfo.athletics}</p>}
        </div>

        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" onClick={() => go(step - 1)}>
            <ChevronLeft aria-hidden className="size-4" /> Back
          </Button>
          <Button variant="secondary" onClick={() => go(step + 1)}>
            Next <ChevronRight aria-hidden className="size-4" />
          </Button>
          <Button
            variant="cyan"
            aria-pressed={playing}
            onClick={() => {
              setPlaying((p) => !p);
              setChamber(null);
              markLabVisited("blood-flow");
            }}
          >
            {playing ? <Pause aria-hidden className="size-4" /> : <Play aria-hidden className="size-4" />}
            {playing ? "Pause" : "Play tour"}
          </Button>
        </div>

        <ol className="grid gap-1 text-sm sm:grid-cols-2">
          {flowSteps.map((s, i) => (
            <li key={s.title}>
              <button
                type="button"
                onClick={() => go(i)}
                aria-current={i === step ? "step" : undefined}
                className={cx(
                  "flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left",
                  i === step ? "bg-cyan/15 font-bold" : "text-fg-muted hover:bg-bg-sunken",
                )}
              >
                <span
                  aria-hidden
                  className="size-2.5 shrink-0 rounded-full"
                  style={{ background: s.oxygen === "rich" ? "var(--oxy-rich)" : "var(--oxy-poor)" }}
                />
                {i + 1}. {s.title}
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
