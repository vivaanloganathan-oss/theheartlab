"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useSafeReducedMotion } from "@/lib/motion";
import { Dumbbell, Lightbulb, Wrench } from "lucide-react";
import { heartParts, heartPartById, type HeartPartId } from "@/content/anatomy";
import { HeartDiagram } from "./heart-diagram";
import { cx, Pill } from "@/components/ui";

const oxygenLabel = {
  rich: { text: "Oxygen-rich blood", tone: "red" },
  poor: { text: "Oxygen-poor blood", tone: "cyan" },
  both: { text: "Both sides of the heart", tone: "neutral" },
} as const;

export function AnatomyExplorer() {
  const params = useSearchParams();
  const initial = params.get("part");
  const [selected, setSelected] = useState<HeartPartId>(
    initial && initial in heartPartById ? (initial as HeartPartId) : "left-ventricle",
  );
  const reduced = useSafeReducedMotion();
  const part = heartPartById[selected];
  const ox = oxygenLabel[part.oxygen];

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
      <div className="rounded-3xl border border-line bg-bg-elev p-4 sm:p-6">
        <HeartDiagram selected={selected} onSelect={setSelected} className="mx-auto w-full max-w-lg" />
        <p className="mt-2 text-center text-xs text-fg-muted">
          Schematic, not to scale. As in medical diagrams, the heart&apos;s <strong>right</strong> side appears on{" "}
          <strong>your left</strong>. Select any structure, or use the buttons.
        </p>
      </div>

      <div>
        <fieldset>
          <legend className="text-sm font-semibold uppercase tracking-wider text-fg-muted">Select a structure</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {heartParts.map((p) => (
              <button
                key={p.id}
                type="button"
                aria-pressed={selected === p.id}
                onClick={() => setSelected(p.id)}
                className={cx(
                  "rounded-full border px-3 py-1.5 text-sm font-semibold transition-colors",
                  selected === p.id ? "border-cyan bg-cyan/15 text-fg" : "border-line text-fg-muted hover:text-fg",
                )}
              >
                {p.name}
              </button>
            ))}
          </div>
        </fieldset>

        <div aria-live="polite" className="mt-6">
          <AnimatePresence mode="wait" initial={false}>
            <motion.article
              key={part.id}
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
              className="rounded-3xl border border-line bg-bg-elev p-6"
            >
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="font-display text-4xl font-extrabold uppercase">{part.name}</h3>
                <Pill tone={ox.tone}>{ox.text}</Pill>
              </div>
              <dl className="mt-5 space-y-5">
                {[
                  { icon: Wrench, label: "What it does", text: part.function },
                  { icon: Lightbulb, label: "Why it matters", text: part.importance },
                  { icon: Dumbbell, label: "In your sport", text: part.athletics },
                ].map(({ icon: Icon, label, text }) => (
                  <div key={label}>
                    <dt className="flex items-center gap-2 font-bold">
                      <Icon aria-hidden className="size-5 shrink-0 text-cyan-ink" />
                      {label}
                    </dt>
                    <dd className="mt-1 pl-7 text-fg-muted">{text}</dd>
                  </div>
                ))}
              </dl>
            </motion.article>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
