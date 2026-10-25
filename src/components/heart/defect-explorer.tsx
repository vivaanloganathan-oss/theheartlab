"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin } from "lucide-react";
import { defectTypes } from "@/content/congenital";
import { cx } from "@/components/ui";

/**
 * Simplified block schematic (not to scale). The heart's right side is on the viewer's left.
 * Pass id="typical" to draw a heart with no defect.
 */
export function DefectDiagram({ id, flow = false, paused = false }: { id: string; flow?: boolean; paused?: boolean }) {
  const show = (...ids: string[]) => ids.includes(id);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    if (paused) svg.pauseAnimations();
    else svg.unpauseAnimations();
  }, [paused, id]);
  const ring = "fill-none stroke-cyan [stroke-width:4]";
  const label =
    id === "typical"
      ? "Simplified schematic of a typical heart"
      : `Simplified heart schematic highlighting: ${defectTypes.find((d) => d.id === id)?.where}`;
  return (
    <svg
      ref={svgRef}
      viewBox="0 0 320 300"
      className={cx("w-full", paused && "[&_*]:[animation-play-state:paused]")}
      role="img"
      aria-label={label}
    >
      {/* chambers */}
      <rect x="40" y="70" width="110" height="80" rx="18" fill="var(--oxy-poor)" fillOpacity="0.25" stroke="var(--oxy-poor)" strokeWidth="3" />
      <rect x="150" y="70" width="110" height="80" rx="18" fill="var(--oxy-rich)" fillOpacity="0.22" stroke="var(--oxy-rich)" strokeWidth="3" />
      <path d="M40 152 H150 V285 Q90 285 60 240 Q40 210 40 180 Z" fill="var(--oxy-poor)" fillOpacity="0.25" stroke="var(--oxy-poor)" strokeWidth={show("tof") ? 8 : 3} />
      <path d="M150 152 H260 V190 Q258 250 210 280 Q180 295 150 290 Z" fill="var(--oxy-rich)" fillOpacity="0.22" stroke="var(--oxy-rich)" strokeWidth="5" />
      {/* septum */}
      <line x1="150" y1="72" x2="150" y2="288" stroke="var(--fg)" strokeWidth="5" />
      {show("asd") && <rect x="144" y="92" width="12" height="34" rx="6" fill="var(--bg-elev)" />}
      {show("vsd", "tof") && <rect x="144" y="170" width="12" height="40" rx="6" fill="var(--bg-elev)" />}
      {/* pulmonary artery from right ventricle */}
      <path d="M118 160 V30 M118 30 H40" stroke="var(--oxy-poor)" strokeWidth="16" strokeLinecap="round" fill="none" />
      <path d="M118 30 H160" stroke="var(--oxy-poor)" strokeWidth="12" strokeLinecap="round" fill="none" />
      {/* aorta from left ventricle */}
      <path
        d={show("tof") ? "M152 165 V28 Q152 12 175 12 H262 Q285 12 285 35 V140" : "M190 165 V28 Q190 12 212 12 H262 Q285 12 285 35 V140"}
        stroke="var(--oxy-rich)"
        strokeWidth="16"
        strokeLinecap="round"
        fill="none"
      />
      {show("pda") && <path d="M160 30 H182" stroke="#20C7E8" strokeWidth="8" strokeLinecap="round" />}
      {/* narrowing */}
      {show("pulmonary-stenosis", "tof") && (
        <path d="M106 150 Q118 138 130 150" stroke="var(--fg)" strokeWidth="5" fill="none" strokeLinecap="round" />
      )}
      {show("coarctation") && (
        <g fill="var(--bg-elev)">
          <path d="M275 58 Q283 70 275 82 Z" />
          <path d="M295 58 Q287 70 295 82 Z" />
        </g>
      )}

      {/* labels */}
      <g aria-hidden className="fill-fg text-[11px] font-bold">
        <text x="95" y="114" textAnchor="middle">RA</text>
        <text x="205" y="114" textAnchor="middle">LA</text>
        <text x="95" y="230" textAnchor="middle">RV</text>
        <text x="205" y="230" textAnchor="middle">LV</text>
        <text x="6" y="56" className="fill-fg-muted text-[10px] font-semibold">Pulmonary artery</text>
        <text x="215" y="34" className="fill-fg-muted text-[10px] font-semibold">Aorta</text>
      </g>

      {flow && <BloodFlow id={id} />}

      {/* highlight rings */}
      <g className="motion-safe:animate-pulse">
        {show("asd") && <circle cx="150" cy="109" r="26" className={ring} />}
        {show("vsd", "tof") && <circle cx="150" cy="190" r="28" className={ring} />}
        {show("pda") && <ellipse cx="171" cy="30" rx="26" ry="18" className={ring} />}
        {show("pulmonary-stenosis", "tof") && <circle cx="118" cy="150" r="22" className={ring} />}
        {show("coarctation") && <circle cx="285" cy="70" r="24" className={ring} />}
        {show("tof") && <circle cx="152" cy="40" r="20" className={ring} />}
        {show("tof") && <circle cx="58" cy="215" r="22" className={ring} />}
      </g>
    </svg>
  );
}

// Blood-flow routes in the schematic's coordinates.
const POOR = "M95 95 V210 C95 235 118 225 118 185 V30 H40";
const RICH = "M215 95 V210 C215 240 190 230 190 190 V28 Q190 12 212 12 H262 Q285 12 285 35 V140";
const RICH_TOF = "M215 95 V210 C215 240 152 230 152 190 V28 Q152 12 175 12 H262 Q285 12 285 35 V140";

interface Route {
  path: string;
  oxygen: "rich" | "poor";
  /** Extra route caused by the condition (drawn with a cyan outline). */
  extra?: boolean;
  /** Slow the dots down part-way along the route (a narrowing). */
  slow?: { keyPoints: string; keyTimes: string };
  count?: number;
}

function routesFor(id: string): Route[] {
  const pulmonarySlow = { keyPoints: "0;0.45;0.55;1", keyTimes: "0;0.3;0.75;1" };
  switch (id) {
    case "asd":
      return [
        { path: POOR, oxygen: "poor" },
        { path: RICH, oxygen: "rich" },
        { path: "M215 109 H95 V210 C95 235 118 225 118 185 V30 H40", oxygen: "rich", extra: true, count: 3 },
      ];
    case "vsd":
      return [
        { path: POOR, oxygen: "poor" },
        { path: RICH, oxygen: "rich" },
        { path: "M215 192 H128 C118 192 118 185 118 175 V30 H40", oxygen: "rich", extra: true, count: 3 },
      ];
    case "pda":
      return [
        { path: POOR, oxygen: "poor" },
        { path: RICH, oxygen: "rich" },
        { path: "M215 160 C215 185 190 185 190 160 V30 H40", oxygen: "rich", extra: true, count: 3 },
      ];
    case "pulmonary-stenosis":
      return [
        { path: POOR, oxygen: "poor", slow: pulmonarySlow },
        { path: RICH, oxygen: "rich" },
      ];
    case "coarctation":
      return [
        { path: POOR, oxygen: "poor" },
        { path: RICH, oxygen: "rich", slow: { keyPoints: "0;0.84;0.9;1", keyTimes: "0;0.45;0.85;1" } },
      ];
    case "tof":
      return [
        { path: POOR, oxygen: "poor", slow: pulmonarySlow },
        { path: RICH_TOF, oxygen: "rich" },
        {
          path: "M95 150 V200 C95 215 140 205 152 185 V28 Q152 12 175 12 H262 Q285 12 285 35 V140",
          oxygen: "poor",
          extra: true,
          count: 3,
        },
      ];
    default:
      return [
        { path: POOR, oxygen: "poor" },
        { path: RICH, oxygen: "rich" },
      ];
  }
}

/** Animated dots showing the direction of blood flow. Hidden when reduced motion is requested. */
function BloodFlow({ id }: { id: string }) {
  const routes = routesFor(id);
  const DUR = 4;
  return (
    <g aria-hidden className="motion-reduce:hidden">
      {routes.map((r, ri) => {
        const n = r.count ?? 4;
        return Array.from({ length: n }, (_, i) => (
          <circle
            key={`${id}-${ri}-${i}`}
            r={r.extra ? 5 : 4}
            fill={r.oxygen === "rich" ? "var(--oxy-rich)" : "var(--oxy-poor)"}
            stroke={r.extra ? "#20C7E8" : "#fff"}
            strokeWidth={r.extra ? 2.5 : 1.5}
          >
            <animateMotion
              dur={`${DUR}s`}
              begin={`${(i * DUR) / n}s`}
              repeatCount="indefinite"
              path={r.path}
              {...(r.slow ? { calcMode: "linear", keyPoints: r.slow.keyPoints, keyTimes: r.slow.keyTimes } : {})}
            />
          </circle>
        ));
      })}
    </g>
  );
}

export function DefectExplorer() {
  const [id, setId] = useState(defectTypes[0].id);
  const d = defectTypes.find((x) => x.id === id)!;

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
      <div className="rounded-3xl border border-line bg-bg-elev p-5">
        <DefectDiagram id={id} />
        <p className="mt-2 text-center text-xs text-fg-muted">
          Simplified schematic, not to scale. The heart&apos;s right side is on your left. Cyan rings mark the area involved.
        </p>
      </div>
      <div>
        <div role="radiogroup" aria-label="Choose a congenital heart defect" className="grid gap-2 sm:grid-cols-2">
          {defectTypes.map((t) => (
            <button
              key={t.id}
              type="button"
              role="radio"
              aria-checked={t.id === id}
              onClick={() => setId(t.id)}
              className={cx(
                "rounded-2xl border p-3 text-left",
                t.id === id ? "border-cyan bg-cyan/15" : "border-line hover:border-cyan",
              )}
            >
              <span className="block text-sm font-bold">{t.name}</span>
              <span className="block text-xs text-fg-muted">{t.short}</span>
            </button>
          ))}
        </div>
        <article aria-live="polite" className="mt-5 rounded-3xl border border-line bg-bg-elev p-6">
          <h3 className="font-display text-3xl font-extrabold uppercase leading-none">{d.name}</h3>
          <p className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-ink">
            <MapPin aria-hidden className="size-4" /> {d.where}
          </p>
          <p className="mt-3 text-fg-muted">{d.description}</p>
        </article>
        <p className="mt-3 text-xs text-fg-muted">
          These are a few examples — there are many other types. Only a cardiologist can explain a specific person&apos;s
          heart.
        </p>
      </div>
    </div>
  );
}
