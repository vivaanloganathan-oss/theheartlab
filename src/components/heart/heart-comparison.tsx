"use client";

import { useState } from "react";
import { defectComparisons, defectTypes } from "@/content/congenital";
import { cx } from "@/components/ui";
import { DefectDiagram } from "./defect-explorer";
import { ComparisonTable } from "./comparison-table";

export function HeartComparison() {
  const [id, setId] = useState(defectTypes[0].id);
  const defect = defectTypes.find((d) => d.id === id)!;
  const comparison = defectComparisons.find((c) => c.defectId === id)!;

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
          <DefectDiagram id="typical" />
        </figure>
        <figure className="rounded-2xl border border-cyan/60 bg-bg-elev p-2 sm:rounded-3xl sm:p-4" aria-live="polite">
          <figcaption className="mb-2 flex flex-wrap items-center justify-between gap-1">
            <span className="font-display text-base font-extrabold uppercase leading-tight sm:text-2xl">{defect.name}</span>
            <span className="hidden shrink-0 rounded-full sm:inline bg-cyan/15 px-2.5 py-0.5 text-xs font-semibold text-cyan-ink">Congenital</span>
          </figcaption>
          <DefectDiagram id={id} />
        </figure>
      </div>
      <p className="text-center text-xs text-fg-muted">
        Simplified schematics, not to scale. The heart&apos;s right side is on your left. Cyan rings mark what&apos;s different.
      </p>

      <ComparisonTable conditionLabel={defect.name} rows={comparison.rows} caption={`Typical heart compared with ${defect.name}`} />
    </div>
  );
}
