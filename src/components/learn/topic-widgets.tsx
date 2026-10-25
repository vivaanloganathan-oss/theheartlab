"use client";

import { useId, useMemo, useState } from "react";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Check } from "lucide-react";
import type { TopicWidget } from "@/content/topics";
import { simulateSession } from "@/lib/recovery-model";
import { SimulationLabel, cx } from "@/components/ui";
import { SortActivity } from "./activities";

function Slider({
  label,
  value,
  min,
  max,
  step = 1,
  unit,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  onChange: (v: number) => void;
}) {
  const id = useId();
  return (
    <div>
      <div className="flex items-baseline justify-between text-sm">
        <label htmlFor={id} className="font-semibold">
          {label}
        </label>
        <output htmlFor={id} className="font-display text-xl font-bold">
          {value}
          {unit && <span className="ml-1 text-sm font-semibold text-fg-muted">{unit}</span>}
        </output>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 w-full accent-[#20C7E8]"
      />
    </div>
  );
}

export { Slider };

function Toggle({ pressed, onClick, children }: { pressed: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={cx(
        "rounded-full border px-3 py-1.5 text-sm font-semibold",
        pressed ? "border-cyan bg-cyan/15 text-fg" : "border-line text-fg-muted hover:text-fg",
      )}
    >
      {pressed && <Check aria-hidden className="mr-1 inline size-3.5" />}
      {children}
    </button>
  );
}

function PulseMath() {
  const [span, setSpan] = useState<15 | 30>(15);
  const [beats, setBeats] = useState(18);
  const factor = span === 15 ? 4 : 2;
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Toggle pressed={span === 15} onClick={() => { setSpan(15); setBeats(18); }}>15-second count</Toggle>
        <Toggle pressed={span === 30} onClick={() => { setSpan(30); setBeats(36); }}>30-second count</Toggle>
      </div>
      <Slider label={`Beats counted in ${span} seconds`} value={beats} min={span === 15 ? 8 : 16} max={span === 15 ? 40 : 80} onChange={setBeats} />
      <p className="rounded-xl bg-bg-sunken p-4 text-center font-display text-3xl font-bold" aria-live="polite">
        {beats} × {factor} = <span className="text-red-ink">{beats * factor}</span> beats per minute
      </p>
      <p className="text-xs text-fg-muted">
        This only shows the math. It isn&apos;t a health assessment, and nothing you enter is saved.
      </p>
    </div>
  );
}

const intensityInfo = [
  { id: "rest", label: "Resting", talk: "Normal conversation, even singing.", level: 1 },
  { id: "moderate", label: "Moderate", talk: "You can talk, but not sing.", level: 2 },
  { id: "vigorous", label: "Vigorous", talk: "Only a few words before pausing for breath.", level: 3 },
];

function TalkTest() {
  const [sel, setSel] = useState(1);
  const info = intensityInfo[sel];
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {intensityInfo.map((i, idx) => (
          <Toggle key={i.id} pressed={sel === idx} onClick={() => setSel(idx)}>
            {i.label}
          </Toggle>
        ))}
      </div>
      <div aria-live="polite" className="rounded-xl bg-bg-sunken p-4">
        <p className="text-sm font-semibold text-fg-muted">Talk test</p>
        <p className="font-display text-2xl font-bold">{info.talk}</p>
        <div className="mt-3 space-y-2 text-sm">
          {[
            ["Heart rate", info.level],
            ["Breathing", info.level],
          ].map(([label, lvl]) => (
            <div key={label as string} className="flex items-center gap-3">
              <span className="w-24">{label}</span>
              <div className="h-3 flex-1 overflow-hidden rounded-full bg-bg-elev" aria-hidden>
                <div className="h-full rounded-full bg-heart transition-all" style={{ width: `${(Number(lvl) / 3) * 100}%` }} />
              </div>
              <span className="w-16 text-right text-xs text-fg-muted">{["", "Low", "Higher", "High"][Number(lvl)]}</span>
            </div>
          ))}
        </div>
      </div>
      <SimulationLabel>Relative illustration — no target numbers. Everyone&apos;s response differs.</SimulationLabel>
    </div>
  );
}

function RecoveryCompare() {
  const [show, setShow] = useState({ a: true, b: true });
  const data = useMemo(() => {
    const a = simulateSession({ restingBpm: 65, intensity: "hard", recoveryMinutes: 5, recoveryTau: 1.0 });
    const b = simulateSession({ restingBpm: 65, intensity: "hard", recoveryMinutes: 5, recoveryTau: 2.2 });
    return a.map((p, i) => ({ minute: p.minute, a: p.bpm, b: b[i].bpm }));
  }, []);
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <Toggle pressed={show.a} onClick={() => setShow((s) => ({ ...s, a: !s.a }))}>Example A: quicker drop</Toggle>
        <Toggle pressed={show.b} onClick={() => setShow((s) => ({ ...s, b: !s.b }))}>Example B: slower drop</Toggle>
      </div>
      <div className="h-56" role="img" aria-label="Two illustrative recovery curves after hard exercise. Example A falls faster in the first minutes than Example B.">
        <ResponsiveContainer>
          <LineChart data={data} margin={{ left: -10, right: 10, top: 10 }}>
            <CartesianGrid stroke="var(--chart-grid)" strokeDasharray="3 3" />
            <XAxis dataKey="minute" type="number" domain={[0, "dataMax"]} tick={{ fill: "var(--fg-muted)", fontSize: 12 }} label={{ value: "minutes", position: "insideBottomRight", offset: -2, fill: "var(--fg-muted)", fontSize: 11 }} />
            <YAxis domain={[50, 200]} tick={{ fill: "var(--fg-muted)", fontSize: 12 }} />
            <Tooltip contentStyle={{ background: "var(--bg-elev)", border: "1px solid var(--border)", borderRadius: 12 }} />
            <Legend />
            {show.a && <Line type="monotone" dataKey="a" name="Example A" stroke="#20C7E8" strokeWidth={3} dot={false} isAnimationActive={false} />}
            {show.b && <Line type="monotone" dataKey="b" name="Example B" stroke="#F04452" strokeWidth={3} strokeDasharray="6 4" dot={false} isAnimationActive={false} />}
          </LineChart>
        </ResponsiveContainer>
      </div>
      <SimulationLabel />
    </div>
  );
}

function CardiacOutput() {
  const [hr, setHr] = useState(70);
  const [sv, setSv] = useState(70);
  const co = (hr * sv) / 1000;
  return (
    <div className="space-y-4">
      <Slider label="Heart rate" value={hr} min={40} max={200} unit="beats/min" onChange={setHr} />
      <Slider label="Stroke volume (blood per beat)" value={sv} min={40} max={160} unit="mL" onChange={setSv} />
      <p className="rounded-xl bg-bg-sunken p-4 text-center" aria-live="polite">
        <span className="block text-sm text-fg-muted">Cardiac output = heart rate × stroke volume</span>
        <span className="font-display text-3xl font-bold">
          {hr} × {sv} mL = <span className="text-red-ink">{co.toFixed(1)} L/min</span>
        </span>
      </p>
      <div className="flex flex-wrap gap-2">
        <Toggle pressed={hr === 70 && sv === 70} onClick={() => { setHr(70); setSv(70); }}>Example: before training</Toggle>
        <Toggle pressed={hr === 55 && sv === 90} onClick={() => { setHr(55); setSv(90); }}>Example: after training</Toggle>
      </div>
      <p className="text-xs text-fg-muted">
        Notice how a bigger stroke volume delivers about the same output with fewer beats. Values are illustrative.
      </p>
    </div>
  );
}

function Hydration() {
  const conditions = [
    { id: "heat", label: "Hot or humid weather", tip: "Your body needs more water in heat. Drink before, during, and after, and use shade and breaks." },
    { id: "long", label: "Long or two-a-day practice", tip: "Plan water breaks throughout and bring a full bottle — refill it between sessions." },
    { id: "sweat", label: "Heavy sweating", tip: "Sweat removes fluid. Replace it steadily; don't wait until you're very thirsty." },
    { id: "sick", label: "Fever, vomiting, or diarrhea", tip: "Illness increases fluid needs. Talk with a parent or healthcare professional before returning to hard training." },
  ];
  const [on, setOn] = useState<string[]>(["heat"]);
  const active = conditions.filter((c) => on.includes(c.id));
  return (
    <div className="space-y-4">
      <p className="text-sm font-semibold">Today&apos;s conditions (select all that apply):</p>
      <div className="flex flex-wrap gap-2">
        {conditions.map((c) => (
          <Toggle key={c.id} pressed={on.includes(c.id)} onClick={() => setOn((o) => (o.includes(c.id) ? o.filter((x) => x !== c.id) : [...o, c.id]))}>
            {c.label}
          </Toggle>
        ))}
      </div>
      <ul className="space-y-2 rounded-xl bg-bg-sunken p-4 text-sm" aria-live="polite">
        <li>💧 Water is a good default choice over sugary or energy drinks.</li>
        {active.map((c) => (
          <li key={c.id}>✅ {c.tip}</li>
        ))}
        <li className="font-semibold">⚠️ Dizziness, confusion, or feeling very unwell in the heat? Stop, cool down, and tell an adult right away.</li>
      </ul>
    </div>
  );
}

const sleepGroups = [
  { id: "6-12", label: "Ages 6–12", min: 9, max: 12 },
  { id: "13-17", label: "Ages 13–17", min: 8, max: 10 },
];

function Sleep() {
  const [group, setGroup] = useState(1);
  const [hours, setHours] = useState(7);
  const g = sleepGroups[group];
  const status = hours < g.min ? "below" : hours > g.max ? "above" : "within";
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {sleepGroups.map((s, i) => (
          <Toggle key={s.id} pressed={group === i} onClick={() => setGroup(i)}>
            {s.label}
          </Toggle>
        ))}
      </div>
      <Slider label="Example night of sleep" value={hours} min={4} max={13} step={0.5} unit="hours" onChange={setHours} />
      <div className="relative h-6 rounded-full bg-bg-sunken" aria-hidden>
        <div
          className="absolute inset-y-0 rounded-full bg-emerald-500/40"
          style={{ left: `${((g.min - 4) / 9) * 100}%`, width: `${((g.max - g.min) / 9) * 100}%` }}
        />
        <div className="absolute inset-y-[-4px] w-1.5 rounded-full bg-heart" style={{ left: `calc(${((hours - 4) / 9) * 100}% - 3px)` }} />
      </div>
      <p className="text-sm" aria-live="polite">
        CDC recommendation for {g.label.toLowerCase()}: <strong>{g.min}–{g.max} hours</strong> per 24 hours. {hours} hours is{" "}
        <strong>{status === "within" ? "within" : status === "below" ? "below" : "above"}</strong> that range.
      </p>
      <p className="text-xs text-fg-muted">For adults (including most college athletes), see the CDC sleep page linked below. Nothing here is saved.</p>
    </div>
  );
}

function Plate() {
  const groups = [
    { id: "veg", label: "Vegetables" },
    { id: "fruit", label: "Fruits" },
    { id: "grain", label: "Whole grains" },
    { id: "protein", label: "Lean protein, beans, or nuts" },
    { id: "dairy", label: "Low-fat dairy or alternative" },
    { id: "water", label: "Water" },
  ];
  const [on, setOn] = useState<string[]>(["grain", "water"]);
  const pct = Math.round((on.length / groups.length) * 100);
  return (
    <div className="space-y-4">
      <p className="text-sm font-semibold">Build an example pre-practice meal:</p>
      <div className="flex flex-wrap gap-2">
        {groups.map((g) => (
          <Toggle key={g.id} pressed={on.includes(g.id)} onClick={() => setOn((o) => (o.includes(g.id) ? o.filter((x) => x !== g.id) : [...o, g.id]))}>
            {g.label}
          </Toggle>
        ))}
      </div>
      <div>
        <div className="h-3 overflow-hidden rounded-full bg-bg-sunken" aria-hidden>
          <div className="h-full rounded-full bg-cyan transition-all" style={{ width: `${pct}%` }} />
        </div>
        <p className="mt-2 text-sm" aria-live="polite">
          {on.length} of {groups.length} heart-healthy food groups included.{" "}
          {on.length >= 4 ? "Great variety!" : "Try adding more variety."}
        </p>
      </div>
      <p className="text-xs text-fg-muted">Needs vary by athlete. A registered dietitian can build a plan for your sport.</p>
    </div>
  );
}

type Day = "hard" | "easy" | "rest";
const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function TrainingWeek() {
  const [week, setWeek] = useState<Day[]>(["hard", "hard", "hard", "hard", "hard", "hard", "hard"]);
  const cycle = (i: number) =>
    setWeek((w) => w.map((d, idx) => (idx === i ? (d === "hard" ? "easy" : d === "easy" ? "rest" : "hard") : d)));
  const rest = week.filter((d) => d === "rest").length;
  let maxHardRun = 0;
  let run = 0;
  for (const d of [...week, ...week]) {
    run = d === "hard" ? run + 1 : 0;
    maxHardRun = Math.max(maxHardRun, Math.min(run, 7));
  }
  const messages: string[] = [];
  if (rest === 0) messages.push("No rest days — recovery can't keep up with training.");
  if (maxHardRun >= 3) messages.push(`${maxHardRun} hard days in a row — try placing easy or rest days between hard sessions.`);
  if (messages.length === 0) messages.push("This week mixes hard work with recovery. Nice balance!");

  return (
    <div className="space-y-4">
      <p className="text-sm text-fg-muted">Tap each day to switch between Hard, Easy, and Rest.</p>
      <ul className="grid grid-cols-7 gap-1.5">
        {week.map((d, i) => (
          <li key={dayNames[i]}>
            <button
              type="button"
              onClick={() => cycle(i)}
              className={cx(
                "flex h-20 w-full flex-col items-center justify-center rounded-xl border text-xs font-bold uppercase",
                d === "hard" && "border-heart bg-heart/20",
                d === "easy" && "border-cyan bg-cyan/15",
                d === "rest" && "border-line bg-bg-sunken",
              )}
            >
              <span>{dayNames[i]}</span>{" "}
              <span className="mt-1 font-display text-base">{d}</span>
              <span className="sr-only">. Activate to change.</span>
            </button>
          </li>
        ))}
      </ul>
      <ul className="space-y-1 text-sm" aria-live="polite">
        {messages.map((m) => (
          <li key={m}>• {m}</li>
        ))}
      </ul>
      <SimulationLabel>A teaching example, not a training prescription. Follow your coach and athletic trainer.</SimulationLabel>
    </div>
  );
}

export function TopicWidgetView({ widget, topicId }: { widget: TopicWidget; topicId: string }) {
  switch (widget) {
    case "pulse-math":
      return <PulseMath />;
    case "talk-test":
      return <TalkTest />;
    case "recovery-compare":
      return <RecoveryCompare />;
    case "cardiac-output":
      return <CardiacOutput />;
    case "energy-sort":
      return (
        <SortActivity
          seed={topicId}
          prompt="Which energy system does each activity rely on most?"
          categories={["Mostly aerobic", "Mostly anaerobic"]}
          items={[
            { text: "Long, steady swim", category: "Mostly aerobic" },
            { text: "Easy 30-minute jog", category: "Mostly aerobic" },
            { text: "Long bike ride", category: "Mostly aerobic" },
            { text: "100 m sprint", category: "Mostly anaerobic" },
            { text: "Vertical jump", category: "Mostly anaerobic" },
            { text: "Heavy lift", category: "Mostly anaerobic" },
          ]}
        />
      );
    case "hydration":
      return <Hydration />;
    case "sleep":
      return <Sleep />;
    case "plate":
      return <Plate />;
    case "training-week":
      return <TrainingWeek />;
    case "adaptation-sort":
      return (
        <SortActivity
          seed={topicId}
          prompt="Sort each observation. (Only clinicians can evaluate an individual athlete.)"
          categories={["Often a normal training response", "Needs medical evaluation"]}
          items={[
            { text: "Lower resting heart rate after months of training", category: "Often a normal training response" },
            { text: "Breathing hard after sprints, recovering with rest", category: "Often a normal training response" },
            { text: "Heart rate settling after a cool-down", category: "Often a normal training response" },
            { text: "Fainting during exercise", category: "Needs medical evaluation" },
            { text: "Chest pain during exercise", category: "Needs medical evaluation" },
            { text: "Racing heartbeat with dizziness", category: "Needs medical evaluation" },
          ]}
        />
      );
  }
}
