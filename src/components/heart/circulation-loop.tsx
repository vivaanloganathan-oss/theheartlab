"use client";

import { useEffect, useState } from "react";
import { Pause, Play, StepForward } from "lucide-react";
import { Button, cx } from "@/components/ui";

const stages = [
  {
    id: "body",
    label: "Body",
    x: 300,
    y: 330,
    text: "Muscles and organs take oxygen out of the blood and add carbon dioxide. Oxygen-poor blood heads back to the heart through the veins.",
  },
  {
    id: "right",
    label: "Right heart",
    x: 90,
    y: 190,
    text: "The right atrium receives oxygen-poor blood; the right ventricle pumps it into the pulmonary arteries.",
  },
  {
    id: "lungs",
    label: "Lungs",
    x: 300,
    y: 50,
    text: "In the lungs, blood releases carbon dioxide (which you breathe out) and picks up oxygen (which you breathe in).",
  },
  {
    id: "left",
    label: "Left heart",
    x: 510,
    y: 190,
    text: "The left atrium receives oxygen-rich blood from the pulmonary veins; the powerful left ventricle pumps it into the aorta.",
  },
] as const;

const POOR = "M300 330 C170 330 90 290 90 190 C90 100 170 50 300 50";
const RICH = "M300 50 C430 50 510 100 510 190 C510 290 430 330 300 330";

export function CirculationLoop() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => setActive((a) => (a + 1) % stages.length), 2600);
    return () => clearInterval(t);
  }, [playing]);

  const stage = stages[active];

  return (
    <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_1fr]">
      <svg viewBox="0 0 600 380" className="w-full" role="img" aria-labelledby="circ-title circ-desc">
        <title id="circ-title">Circulation loop</title>
        <desc id="circ-desc">
          Blood travels from the body to the right heart, to the lungs, to the left heart, and back to the body.
        </desc>
        <path d={POOR} stroke="var(--oxy-poor)" strokeWidth="14" fill="none" strokeLinecap="round" opacity="0.85" />
        <path d={RICH} stroke="var(--oxy-rich)" strokeWidth="14" fill="none" strokeLinecap="round" opacity="0.85" />
        {/* arrowheads */}
        <path d="M118 112 l-4 -22 l20 10 z" fill="var(--oxy-poor)" />
        <path d="M486 270 l4 22 l-20 -10 z" fill="var(--oxy-rich)" />
        <g aria-hidden className="motion-reduce:hidden">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <g key={i}>
              <circle r="6" fill="#fff" stroke="var(--oxy-poor)" strokeWidth="3">
                <animateMotion dur="6s" begin={`${i}s`} repeatCount="indefinite" path={POOR} />
              </circle>
              <circle r="6" fill="#fff" stroke="var(--oxy-rich)" strokeWidth="3">
                <animateMotion dur="6s" begin={`${i}s`} repeatCount="indefinite" path={RICH} />
              </circle>
            </g>
          ))}
        </g>
        {stages.map((s, i) => (
          <g key={s.id} onClick={() => setActive(i)} className="cursor-pointer">
            <circle
              cx={s.x}
              cy={s.y}
              r={i === active ? 46 : 40}
              fill="var(--bg-elev)"
              stroke={i === active ? "#20C7E8" : "var(--border)"}
              strokeWidth={i === active ? 5 : 3}
              style={{ transition: "r 200ms" }}
            />
            <text x={s.x} y={s.y + 5} textAnchor="middle" className="fill-fg text-[15px] font-bold">
              {s.label}
            </text>
          </g>
        ))}
      </svg>

      <div>
        <ol className="flex flex-wrap gap-2" aria-label="Circulation stages">
          {stages.map((s, i) => (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => {
                  setActive(i);
                  setPlaying(false);
                }}
                aria-pressed={i === active}
                className={cx(
                  "rounded-full border px-3 py-1.5 text-sm font-semibold",
                  i === active ? "border-cyan bg-cyan/15 text-fg" : "border-line text-fg-muted hover:text-fg",
                )}
              >
                {i + 1}. {s.label}
              </button>
            </li>
          ))}
        </ol>
        <div aria-live="polite" className="mt-5 min-h-28 rounded-2xl border border-line bg-bg-elev p-5">
          <p className="font-display text-2xl font-bold uppercase">
            Stage {active + 1}: {stage.label}
          </p>
          <p className="mt-2 text-fg-muted">{stage.text}</p>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button variant="secondary" onClick={() => setActive((a) => (a + 1) % stages.length)}>
            <StepForward aria-hidden className="size-4" /> Next stage
          </Button>
          <Button variant="secondary" onClick={() => setPlaying((p) => !p)} aria-pressed={playing}>
            {playing ? <Pause aria-hidden className="size-4" /> : <Play aria-hidden className="size-4" />}
            {playing ? "Pause tour" : "Auto-play tour"}
          </Button>
        </div>
      </div>
    </div>
  );
}
