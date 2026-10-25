"use client";

import { useMemo, useState } from "react";
import { CartesianGrid, Line, LineChart, ReferenceArea, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { intensityLevels, recoverySummary, simulateSession, type IntensityId } from "@/lib/recovery-model";
import { useProgress } from "@/lib/progress";
import { Slider } from "@/components/learn/topic-widgets";
import { Callout, cx } from "@/components/ui";

const EXERCISE_MIN = 8;

export function RecoveryExplorer() {
  const [rest, setRest] = useState(65);
  const [intensity, setIntensity] = useState<IntensityId>("hard");
  const [recovery, setRecovery] = useState(5);
  const [showTable, setShowTable] = useState(false);
  const { markLabVisited } = useProgress();

  const data = useMemo(
    () => simulateSession({ restingBpm: rest, intensity, recoveryMinutes: recovery, exerciseMinutes: EXERCISE_MIN }),
    [rest, intensity, recovery],
  );
  const summary = recoverySummary(data);
  const end = 2 + EXERCISE_MIN;
  const visit = () => markLabVisited("recovery");

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[20rem_1fr]">
        <div className="space-y-6 rounded-3xl border border-line bg-bg-elev p-6">
          <Slider
            label="Illustrative starting heart rate"
            value={rest}
            min={45}
            max={95}
            unit="bpm"
            onChange={(v) => {
              setRest(v);
              visit();
            }}
          />
          <fieldset>
            <legend className="text-sm font-semibold">Exercise intensity</legend>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {intensityLevels.map((l) => (
                <button
                  key={l.id}
                  type="button"
                  aria-pressed={intensity === l.id}
                  onClick={() => {
                    setIntensity(l.id);
                    visit();
                  }}
                  className={cx(
                    "rounded-xl border px-3 py-2 text-sm font-bold",
                    intensity === l.id ? "border-heart bg-heart text-navy" : "border-line text-fg-muted hover:text-fg",
                  )}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </fieldset>
          <Slider
            label="Recovery duration"
            value={recovery}
            min={1}
            max={10}
            unit="min"
            onChange={(v) => {
              setRecovery(v);
              visit();
            }}
          />
          <dl className="grid grid-cols-3 gap-2 text-center" aria-live="polite">
            <div className="rounded-xl bg-bg-sunken p-2">
              <dt className="text-[11px] text-fg-muted">End of exercise</dt>
              <dd className="font-display text-2xl font-bold">{summary.peak}</dd>
            </div>
            <div className="rounded-xl bg-bg-sunken p-2">
              <dt className="text-[11px] text-fg-muted">Drop at 1 min</dt>
              <dd className="font-display text-2xl font-bold">{summary.dropAt1 ?? "—"}</dd>
            </div>
            <div className="rounded-xl bg-bg-sunken p-2">
              <dt className="text-[11px] text-fg-muted">At end</dt>
              <dd className="font-display text-2xl font-bold">{summary.final}</dd>
            </div>
          </dl>
          <p className="text-xs text-fg-muted">All values are simulated beats per minute from a simple teaching model.</p>
        </div>

        <div className="rounded-3xl border border-line bg-bg-elev p-4 sm:p-6">
          <div
            className="h-80"
            role="img"
            aria-label={`Simulated heart-rate chart. Starts at ${rest} bpm, rises during ${EXERCISE_MIN} minutes of ${intensity.replace("-", " ")} exercise to about ${summary.peak} bpm, then falls during ${recovery} minutes of recovery to about ${summary.final} bpm.`}
          >
            <ResponsiveContainer>
              <LineChart data={data} margin={{ top: 10, right: 16, left: -8, bottom: 10 }}>
                <ReferenceArea x1={2} x2={end} fill="#F04452" fillOpacity={0.08} label={{ value: "Exercise", fill: "var(--fg-muted)", fontSize: 12, position: "insideTop" }} />
                <ReferenceArea x1={end} x2={end + recovery} fill="#20C7E8" fillOpacity={0.1} label={{ value: "Recovery", fill: "var(--fg-muted)", fontSize: 12, position: "insideTop" }} />
                <CartesianGrid stroke="var(--chart-grid)" strokeDasharray="3 3" />
                <XAxis
                  dataKey="minute"
                  type="number"
                  domain={[0, end + recovery]}
                  tick={{ fill: "var(--fg-muted)", fontSize: 12 }}
                  label={{ value: "Time (minutes)", position: "insideBottom", offset: -6, fill: "var(--fg-muted)", fontSize: 12 }}
                />
                <YAxis domain={[40, 200]} tick={{ fill: "var(--fg-muted)", fontSize: 12 }} />
                <Tooltip
                  formatter={(v) => [`${v} bpm (simulated)`, "Heart rate"]}
                  labelFormatter={(l) => `Minute ${l}`}
                  contentStyle={{ background: "var(--bg-elev)", border: "1px solid var(--border)", borderRadius: 12, color: "var(--fg)" }}
                />
                <Line type="monotone" dataKey="bpm" stroke="#F04452" strokeWidth={3} dot={false} isAnimationActive={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <button
            type="button"
            onClick={() => setShowTable((s) => !s)}
            aria-expanded={showTable}
            className="mt-2 text-sm font-semibold text-cyan-ink underline underline-offset-2"
          >
            {showTable ? "Hide" : "Show"} data table
          </button>
          {showTable && (
            <div className="mt-3 max-h-64 overflow-y-auto rounded-xl border border-line">
              <table className="w-full text-sm">
                <caption className="sr-only">Simulated heart rate by minute</caption>
                <thead className="sticky top-0 bg-bg-elev">
                  <tr>
                    <th scope="col" className="p-2 text-left">Minute</th>
                    <th scope="col" className="p-2 text-left">Phase</th>
                    <th scope="col" className="p-2 text-right">Simulated bpm</th>
                  </tr>
                </thead>
                <tbody>
                  {data.filter((p) => Number.isInteger(p.minute)).map((p) => (
                    <tr key={p.minute} className="border-t border-line">
                      <td className="p-2">{p.minute}</td>
                      <td className="p-2">{p.phase === "Warm-up" ? "Rest" : p.phase}</td>
                      <td className="p-2 text-right">{p.bpm}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-line bg-bg-elev p-5">
          <h3 className="font-bold">What does recovery mean?</h3>
          <p className="mt-1 text-sm text-fg-muted">
            When you stop exercising, your nervous system shifts back toward “rest and digest,” and heart rate falls —
            quickly at first, then more gradually. Harder efforts usually take longer to settle. Heat, hydration, sleep,
            illness, and fitness all affect recovery.
          </p>
        </div>
        <Callout tone="danger" title="This simulator can't assess you">
          It cannot assess individual fitness, diagnose illness, or establish sports clearance. Real heart rates vary
          widely between healthy people. If you have symptoms such as chest pain, fainting, or a racing heart with
          dizziness, stop and get evaluated by a healthcare professional.
        </Callout>
      </div>
    </div>
  );
}
