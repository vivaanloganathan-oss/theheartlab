"use client";

import { useState } from "react";
import { RotateCcw } from "lucide-react";
import { myths } from "@/content/labs";
import { getReference } from "@/content/references";
import { useProgress } from "@/lib/progress";
import { cx } from "@/components/ui";

export function MythFact() {
  const [flipped, setFlipped] = useState<Record<string, boolean>>({});
  const { markLabVisited } = useProgress();
  const count = Object.values(flipped).filter(Boolean).length;

  return (
    <div>
      <p className="text-sm text-fg-muted" aria-live="polite">
        {count} of {myths.length} cards flipped
      </p>
      <ul className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {myths.map((m) => {
          const isFlipped = !!flipped[m.id];
          return (
            <li key={m.id} className="[perspective:1200px]">
              <button
                type="button"
                aria-pressed={isFlipped}
                onClick={() => {
                  setFlipped((f) => ({ ...f, [m.id]: !f[m.id] }));
                  markLabVisited("myths");
                }}
                className={cx(
                  "relative h-80 w-full rounded-3xl text-left transition-transform duration-500 [transform-style:preserve-3d] motion-reduce:transition-none",
                  isFlipped && "[transform:rotateY(180deg)]",
                )}
              >
                <span aria-hidden={isFlipped} className="absolute inset-0 flex flex-col rounded-3xl border border-line bg-navy p-6 text-white [backface-visibility:hidden]">
                  <span className="font-display text-sm font-bold uppercase tracking-[0.2em] text-heart">Myth</span>
                  <span className="mt-3 flex-1 font-display text-2xl font-bold uppercase leading-tight">“{m.myth}”</span>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-cyan">
                    <RotateCcw aria-hidden className="size-4" /> Tap to reveal the fact
                  </span>
                </span>
                <span aria-hidden={!isFlipped} className="absolute inset-0 flex flex-col overflow-y-auto rounded-3xl border border-cyan bg-bg-elev p-6 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                  <span className="font-display text-sm font-bold uppercase tracking-[0.2em] text-cyan-ink">Fact</span>
                  <span className="mt-3 flex-1 text-sm">{m.fact}</span>
                  <span className="mt-3 text-[11px] text-fg-muted">
                    Source: {m.sources.map((s) => getReference(s).organization).join("; ")}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
