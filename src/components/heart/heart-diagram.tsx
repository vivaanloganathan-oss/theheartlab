"use client";

import type { KeyboardEvent, ReactNode } from "react";
import type { HeartPartId } from "@/content/anatomy";
import { heartPartById } from "@/content/anatomy";

/**
 * Schematic (not to scale) front view of the heart. As in medical diagrams,
 * the heart's RIGHT side appears on the viewer's LEFT.
 */

const POOR_ROUTE =
  "M110 44 V200 C110 250 115 300 125 330 C140 360 172 330 178 300 L178 262 C178 210 184 160 186 128 C160 112 100 112 26 118";
const RICH_ROUTE =
  "M404 196 H300 C300 260 300 300 290 340 C275 380 240 360 232 320 L228 262 C228 200 212 150 214 110 C216 62 300 52 318 92 C326 110 326 128 326 150";

const AORTA = "M228 262 C228 200 212 150 214 110 C216 62 300 52 318 92 C326 110 326 128 326 150";
const PA_TRUNK = "M178 262 C178 210 184 160 186 128";
const PA_RIGHT = "M186 128 C160 112 100 112 26 118";
const PA_LEFT = "M186 128 C230 120 300 116 404 112";

interface Props {
  selected?: HeartPartId | null;
  /** Additional parts to emphasise (e.g. current step in the blood-flow explorer). */
  highlight?: HeartPartId | null;
  onSelect?: (id: HeartPartId) => void;
  showFlow?: boolean;
  flowFilter?: "all" | "rich" | "poor";
  className?: string;
  title?: string;
}

export function HeartDiagram({
  selected = null,
  highlight = null,
  onSelect,
  showFlow = false,
  flowFilter = "all",
  className,
  title = "Schematic diagram of the heart's four chambers, valves, and major blood vessels",
}: Props) {
  const focus = highlight ?? selected;
  const state = (id: HeartPartId) => (focus === null ? "idle" : focus === id ? "on" : "dim");

  return (
    <svg viewBox="0 0 430 470" className={className} role="group" aria-label={title}>
      <defs>
        <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="5" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Vena cavae (labelled, not selectable) */}
      <g opacity={focus ? 0.35 : 0.8} aria-hidden>
        <path d="M110 30 V160" stroke="var(--oxy-poor)" strokeWidth="22" strokeLinecap="round" fill="none" />
        <path d="M36 460 V262 Q36 232 66 226" stroke="var(--oxy-poor)" strokeWidth="20" strokeLinecap="round" fill="none" />
        <text aria-hidden x="126" y="34" className="fill-fg-muted text-[11px]">Superior vena cava</text>
        <text aria-hidden x="52" y="458" className="fill-fg-muted text-[11px]">Inferior vena cava</text>
      </g>

      <Part id="aorta" label="Aorta" state={state("aorta")} onSelect={onSelect}>
        <path d={AORTA} stroke="var(--oxy-rich)" strokeWidth="24" strokeLinecap="round" fill="none" />
        <text aria-hidden x="250" y="46" className="fill-fg text-[13px] font-bold">Aorta</text>
      </Part>

      <Part id="pulmonary-arteries" label="Pulmonary arteries" state={state("pulmonary-arteries")} onSelect={onSelect}>
        <path d={PA_TRUNK} stroke="var(--oxy-poor)" strokeWidth="22" strokeLinecap="round" fill="none" />
        <path d={PA_RIGHT} stroke="var(--oxy-poor)" strokeWidth="16" strokeLinecap="round" fill="none" />
        <path d={PA_LEFT} stroke="var(--oxy-poor)" strokeWidth="16" strokeLinecap="round" fill="none" />
        <text aria-hidden x="18" y="98" className="fill-fg text-[12px] font-bold">Pulmonary arteries</text>
      </Part>
      <g aria-hidden>
        <text x="20" y="140" className="fill-fg-muted text-[10px]">to right lung</text>
        <text x="352" y="100" className="fill-fg-muted text-[10px]">to left lung</text>
      </g>

      <Part id="pulmonary-veins" label="Pulmonary veins" state={state("pulmonary-veins")} onSelect={onSelect}>
        <path d="M418 172 H352" stroke="var(--oxy-rich)" strokeWidth="13" strokeLinecap="round" fill="none" />
        <path d="M418 222 H352" stroke="var(--oxy-rich)" strokeWidth="13" strokeLinecap="round" fill="none" />
        <text aria-hidden x="372" y="252" className="fill-fg text-[11px] font-bold">
          <tspan x="372">Pulmonary </tspan>
          <tspan x="372" dy="13">veins</tspan>
        </text>
      </Part>

      <Part id="right-atrium" label="Right atrium" state={state("right-atrium")} onSelect={onSelect}>
        <rect x="58" y="150" width="114" height="96" rx="30" fill="var(--bg)" />
        <rect x="58" y="150" width="114" height="96" rx="30" fill="var(--oxy-poor)" fillOpacity="0.28" stroke="var(--oxy-poor)" strokeWidth="3" />
        <ChamberLabel x={115} y={196} lines={["Right", "atrium"]} />
      </Part>

      <Part id="left-atrium" label="Left atrium" state={state("left-atrium")} onSelect={onSelect}>
        <rect x="248" y="150" width="114" height="96" rx="30" fill="var(--bg)" />
        <rect x="248" y="150" width="114" height="96" rx="30" fill="var(--oxy-rich)" fillOpacity="0.25" stroke="var(--oxy-rich)" strokeWidth="3" />
        <ChamberLabel x={305} y={196} lines={["Left", "atrium"]} />
      </Part>

      <Part id="right-ventricle" label="Right ventricle" state={state("right-ventricle")} onSelect={onSelect}>
        <path d="M58 256 H196 V404 Q150 412 110 372 Q58 324 58 286 Z" fill="var(--bg)" />
        <path
          d="M58 256 H196 V404 Q150 412 110 372 Q58 324 58 286 Z"
          fill="var(--oxy-poor)"
          fillOpacity="0.28"
          stroke="var(--oxy-poor)"
          strokeWidth="3"
        />
        <ChamberLabel x={130} y={316} lines={["Right", "ventricle"]} />
      </Part>

      <Part id="left-ventricle" label="Left ventricle" state={state("left-ventricle")} onSelect={onSelect}>
        <path d="M206 256 H362 V300 Q360 368 302 410 Q262 440 228 438 Q206 436 206 412 Z" fill="var(--bg)" />
        <path
          d="M206 256 H362 V300 Q360 368 302 410 Q262 440 228 438 Q206 436 206 412 Z"
          fill="var(--oxy-rich)"
          fillOpacity="0.25"
          stroke="var(--oxy-rich)"
          strokeWidth="6"
        />
        <ChamberLabel x={282} y={330} lines={["Left", "ventricle"]} />
      </Part>

      <Part id="valves" label="Heart valves" state={state("valves")} onSelect={onSelect}>
        {/* tricuspid, mitral (point down: atria → ventricles); pulmonary, aortic (point up: out of ventricles) */}
        <Valve x={115} y={251} dir="down" />
        <Valve x={305} y={251} dir="down" />
        <Valve x={178} y={268} dir="up" />
        <Valve x={228} y={268} dir="up" />
        <text aria-hidden x="196" y="300" textAnchor="middle" className="fill-fg-muted text-[10px] font-semibold">valves</text>
      </Part>

      {showFlow && (
        <g aria-hidden className="motion-reduce:hidden">
          {flowFilter !== "rich" &&
            [0, 1, 2, 3, 4].map((i) => (
              <circle key={`p${i}`} r="5" fill="#fff" stroke="var(--oxy-poor)" strokeWidth="3">
                <animateMotion dur="5s" repeatCount="indefinite" begin={`${i}s`} path={POOR_ROUTE} />
              </circle>
            ))}
          {flowFilter !== "poor" &&
            [0, 1, 2, 3, 4].map((i) => (
              <circle key={`r${i}`} r="5" fill="#fff" stroke="var(--oxy-rich)" strokeWidth="3">
                <animateMotion dur="5s" repeatCount="indefinite" begin={`${i}s`} path={RICH_ROUTE} />
              </circle>
            ))}
        </g>
      )}
    </svg>
  );
}

function Part({
  id,
  label,
  state,
  onSelect,
  children,
}: {
  id: HeartPartId;
  label: string;
  state: "idle" | "on" | "dim";
  onSelect?: (id: HeartPartId) => void;
  children: ReactNode;
}) {
  const interactive = !!onSelect;
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect?.(id);
    }
  };
  return (
    <g
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={interactive ? label : undefined}
      aria-pressed={interactive ? state === "on" : undefined}
      onClick={interactive ? () => onSelect(id) : undefined}
      onKeyDown={interactive ? onKeyDown : undefined}
      filter={state === "on" ? "url(#glow)" : undefined}
      style={{ opacity: state === "dim" ? 0.3 : 1, transition: "opacity 250ms" }}
      className={interactive ? "cursor-pointer outline-none [&:focus-visible>*]:stroke-cyan" : undefined}
    >
      {children}
    </g>
  );
}

function ChamberLabel({ x, y, lines }: { x: number; y: number; lines: string[] }) {
  return (
    <text aria-hidden x={x} y={y} textAnchor="middle" className="pointer-events-none fill-fg text-[13px] font-bold">
      {lines.map((l, i) => (
        <tspan key={l} x={x} dy={i === 0 ? 0 : 16}>
          {i < lines.length - 1 ? `${l} ` : l}
        </tspan>
      ))}
    </text>
  );
}

function Valve({ x, y, dir }: { x: number; y: number; dir: "up" | "down" }) {
  const d = dir === "down" ? `M${x - 16} ${y - 4} L${x} ${y + 6} L${x + 16} ${y - 4}` : `M${x - 12} ${y + 4} L${x} ${y - 6} L${x + 12} ${y + 4}`;
  return <path d={d} fill="none" stroke="var(--fg)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />;
}

export function partName(id: HeartPartId) {
  return heartPartById[id].name;
}
