"use client";

import { useState } from "react";
import { Pause, Play } from "lucide-react";
import { EcgLine, SourceList, cx } from "@/components/ui";

function EchoArt() {
  return (
    <svg viewBox="0 0 200 140" className="h-36 w-full" aria-hidden>
      {/* probe */}
      <rect x="88" y="4" width="24" height="18" rx="5" className="fill-fg-muted" />
      {/* sound waves fanning down from the probe */}
      {[0, 0.8, 1.6].map((delay) => (
        <path
          key={delay}
          d="M60 40 Q100 62 140 40"
          fill="none"
          stroke="#20C7E8"
          strokeWidth="3"
          strokeLinecap="round"
          className="sonar-wave"
          style={{ animationDelay: `${delay}s` }}
        />
      ))}
      {/* heart outline, beating */}
      <g className="heart-pulse">
        <path
          d="M100 132 C 70 112, 52 96, 52 78 C 52 64, 62 54, 76 54 C 86 54, 95 60, 100 69 C 105 60, 114 54, 124 54 C 138 54, 148 64, 148 78 C 148 96, 130 112, 100 132 Z"
          fill="var(--oxy-rich)"
          fillOpacity="0.18"
          stroke="var(--oxy-rich)"
          strokeWidth="3"
        />
        {/* chambers seen on the "image" */}
        <path d="M100 72 V124 M68 88 H132" stroke="var(--fg)" strokeOpacity="0.5" strokeWidth="2" />
      </g>
    </svg>
  );
}

function PulseOxArt() {
  return (
    <svg viewBox="0 0 200 140" className="h-36 w-full" aria-hidden>
      {/* finger */}
      <rect x="20" y="58" width="150" height="34" rx="17" fill="#d9a07e" />
      <rect x="150" y="62" width="16" height="26" rx="8" fill="#e8bfa3" />
      {/* clip */}
      <rect x="96" y="40" width="54" height="70" rx="12" className="fill-navy-2" stroke="#20C7E8" strokeWidth="2" />
      {/* light passing through */}
      <circle cx="123" cy="75" r="9" fill="#F04452" className="sensor-glow" />
      {/* signal bars */}
      <g className="sensor-glow">
        <rect x="104" y="48" width="6" height="8" rx="2" fill="#20C7E8" />
        <rect x="113" y="45" width="6" height="11" rx="2" fill="#20C7E8" />
        <rect x="122" y="42" width="6" height="14" rx="2" fill="#20C7E8" />
      </g>
    </svg>
  );
}

const tests = [
  {
    id: "ekg",
    name: "EKG (ECG)",
    shows: "The heart's rhythm",
    art: <EcgLine className="h-36 w-full text-heart" />,
    text: "Sticky sensors record the heart's electrical signals to check the rhythm of the heartbeat. It shows rhythm, not structure, so a normal EKG can't rule out a structural heart defect.",
  },
  {
    id: "echo",
    name: "Echocardiogram (echo)",
    shows: "The heart's structure",
    art: <EchoArt />,
    text: "A painless test that uses sound waves to create moving pictures of the heart, so doctors can see its chambers, walls, and valves as it beats.",
  },
  {
    id: "pulse-ox",
    name: "Pulse oximetry",
    shows: "Oxygen in the blood",
    art: <PulseOxArt />,
    text: "A small clip on a finger shines light through the skin to estimate how much oxygen is in the blood.",
  },
];

export function HeartTests() {
  const [paused, setPaused] = useState(false);
  return (
    <div>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-pressed={paused}
          className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm font-bold hover:border-cyan"
        >
          {paused ? <Play aria-hidden className="size-4" /> : <Pause aria-hidden className="size-4" />}
          {paused ? "Play animations" : "Pause animations"}
        </button>
      </div>
      <ul className={cx("mt-4 grid gap-5 md:grid-cols-3", paused && "[&_*]:[animation-play-state:paused]")}>
        {tests.map((t) => (
          <li key={t.id} className="flex flex-col rounded-3xl border border-line bg-bg-elev p-5">
            <div className="rounded-2xl bg-bg-sunken p-3">{t.art}</div>
            <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-cyan-ink">Shows: {t.shows}</p>
            <h3 className="mt-1 font-display text-2xl font-extrabold uppercase">{t.name}</h3>
            <p className="mt-2 text-sm text-fg-muted">{t.text}</p>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-sm text-fg-muted">
        Doctors decide which tests someone needs. These animations are illustrations, not real test results.
      </p>
      <SourceList ids={["nhlbi-chd-diagnosis"]} className="mt-3" />
    </div>
  );
}
