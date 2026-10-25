"use client";

import { useState } from "react";
import { Pause, Play } from "lucide-react";
import { defectComparisons, defectTypes } from "@/content/congenital";
import { cx } from "@/components/ui";
import { DefectDiagram } from "./defect-explorer";
import { ComparisonTable } from "./comparison-table";

export function HeartComparison() {
  const [id, setId] = useState(defectTypes[0].id);
  const defect = defectTypes.find((d) => d.id === id)!;
  const comparison = defectComparisons.find((c) => c.defectId === id)!;
  const [paused, setPaused] = useState(false);

  return (
    <div className="space-y-6">
      <div role="radiogroup" aria-label="Compare a typical heart with" className="flex flex-wrap gap-2">
        {defectTypes.map((t) => (
          <button
            key={t.id}
            type="button"
            role="radio"
            aria-checked={t.id === id}
            onClick={() => setId(t.id)}
            className={cx(
              "rounded-full border px-4 py-2 text-sm font-bold",
              t.id === id ? "border-cyan bg-cyan text-navy" : "border-line text-fg-muted hover:text-fg",
            )}
          >
            {t.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2 sm:gap-4">
        <figure className="rounded-2xl border border-emerald-500/50 bg-bg-elev p-2 sm:rounded-3xl sm:p-4">
          <figcaption className="mb-2 flex flex-wrap items-center justify-between gap-1">
            <span className="font-display text-base font-extrabold uppercase sm:text-2xl">Typical heart</span>
            <span className="hidden rounded-full sm:inline bg-emerald-500/15 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
              Reference
            </span>
          </figcaption>
          <DefectDiagram id="typical" flow paused={paused} />
        </figure>
        <figure className="rounded-2xl border border-cyan/60 bg-bg-elev p-2 sm:rounded-3xl sm:p-4" aria-live="polite">
          <figcaption className="mb-2 flex flex-wrap items-center justify-between gap-1">
            <span className="font-display text-base font-extrabold uppercase leading-tight sm:text-2xl">{defect.name}</span>
            <span className="hidden shrink-0 rounded-full sm:inline bg-cyan/15 px-2.5 py-0.5 text-xs font-semibold text-cyan-ink">Congenital</span>
          </figcaption>
          <DefectDiagram id={id} flow paused={paused} />
        </figure>
      </div>
      <div className="flex flex-col gap-3 rounded-2xl border border-line bg-bg-elev p-4 sm:flex-row sm:items-center">
        <p className="flex-1 text-sm" aria-live="polite">
          <strong>What to watch: </strong>
          {comparison.flowNote}
        </p>
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-pressed={paused}
          className="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-line px-4 py-2 text-sm font-bold hover:border-cyan sm:self-auto"
        >
          {paused ? <Play aria-hidden className="size-4" /> : <Pause aria-hidden className="size-4" />}
          {paused ? "Play animation" : "Pause animation"}
        </button>
      </div>
      <p className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-center text-xs text-fg-muted">
        <span className="inline-flex items-center gap-1.5">
          <span aria-hidden className="size-3 rounded-full border border-white bg-[color:var(--oxy-rich)]" /> Oxygen-rich blood
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span aria-hidden className="size-3 rounded-full border border-white bg-[color:var(--oxy-poor)]" /> Oxygen-poor blood
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span aria-hidden className="size-3 rounded-full border-2 border-cyan bg-[color:var(--oxy-rich)]" /> Flow caused by the condition
        </span>
        <span>Simplified schematics, not to scale. The heart&apos;s right side is on your left.</span>
      </p>

      <ComparisonTable conditionLabel={defect.name} rows={comparison.rows} caption={`Typical heart compared with ${defect.name}`} />
    </div>
  );
}
