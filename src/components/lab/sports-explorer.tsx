"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { sports } from "@/content/labs";
import { useProgress } from "@/lib/progress";
import { Callout, cx } from "@/components/ui";

const profileLabels = {
  endurance: "Continuous endurance",
  bursts: "Repeated bursts",
  power: "Explosive power",
} as const;

export function SportsExplorer() {
  const params = useSearchParams();
  const initial = sports.find((s) => s.id === params.get("sport"))?.id ?? "basketball";
  const [id, setId] = useState(initial);
  const { markLabVisited } = useProgress();
  const sport = sports.find((s) => s.id === id)!;
  const data = (Object.keys(profileLabels) as (keyof typeof profileLabels)[]).map((k) => ({
    name: profileLabels[k],
    value: sport.profile[k],
  }));

  return (
    <div className="space-y-6">
      <div role="radiogroup" aria-label="Choose a sport" className="flex flex-wrap gap-2">
        {sports.map((s) => (
          <button
            key={s.id}
            type="button"
            role="radio"
            aria-checked={s.id === id}
            onClick={() => {
              setId(s.id);
              markLabVisited("sports");
            }}
            className={cx(
              "rounded-full border px-4 py-2 text-sm font-bold",
              s.id === id ? "border-cyan bg-cyan text-navy" : "border-line text-fg-muted hover:text-fg",
            )}
          >
            {s.name}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <article aria-live="polite" className="rounded-3xl border border-line bg-bg-elev p-6">
          <h3 className="font-display text-4xl font-extrabold uppercase">{sport.name}</h3>
          <dl className="mt-4 space-y-4">
            <div>
              <dt className="font-bold">Movement pattern</dt>
              <dd className="text-fg-muted">{sport.pattern}</dd>
            </div>
            <div>
              <dt className="font-bold">Typical cardiovascular demands</dt>
              <dd className="text-fg-muted">{sport.demands}</dd>
            </div>
            <div>
              <dt className="font-bold">Training adaptations</dt>
              <dd className="text-fg-muted">{sport.adaptations}</dd>
            </div>
            <div>
              <dt className="font-bold">Heart-smart tip</dt>
              <dd className="text-fg-muted">{sport.tip}</dd>
            </div>
          </dl>
        </article>

        <div className="rounded-3xl border border-line bg-bg-elev p-6">
          <h4 className="font-bold">Simplified demand profile</h4>
          <p className="text-xs text-fg-muted">Relative emphasis, 1 (low) to 5 (high). Not heart-rate values.</p>
          <div className="mt-4 h-52" aria-hidden>
            <ResponsiveContainer>
              <BarChart accessibilityLayer={false} data={data} layout="vertical" margin={{ left: 20, right: 16 }}>
                <CartesianGrid stroke="var(--chart-grid)" horizontal={false} />
                <XAxis type="number" domain={[0, 5]} ticks={[0, 1, 2, 3, 4, 5]} tick={{ fill: "var(--fg-muted)", fontSize: 12 }} />
                <YAxis type="category" dataKey="name" width={120} tick={{ fill: "var(--fg)", fontSize: 12 }} />
                <Bar dataKey="value" fill="#20C7E8" radius={[0, 8, 8, 0]} isAnimationActive={false} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <table className="sr-only">
            <caption>{sport.name} simplified demand profile (1 to 5)</caption>
            <tbody>
              {data.map((d) => (
                <tr key={d.name}>
                  <th scope="row">{d.name}</th>
                  <td>{d.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Callout tone="warning" title="Your sport doesn't set your heart rate">
        These are general, simplified descriptions. Actual demands vary with position, level, training, environment,
        and the individual athlete. A sport can&apos;t tell you what any one person&apos;s heart rate is or should be.
      </Callout>
    </div>
  );
}
