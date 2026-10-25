"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { useSafeReducedMotion } from "@/lib/motion";
import { activityStates } from "@/content/labs";
import { useProgress } from "@/lib/progress";
import { SimulationLabel, cx } from "@/components/ui";

/** Stylised waveform for one beat. `t` is seconds since the beat started. NOT a clinical ECG. */
function wave(t: number, period: number) {
  const s = Math.min(1, period / 0.85); // compress the complex at fast rates
  const g = (center: number, width: number, amp: number) =>
    amp * Math.exp(-((t - center * s) ** 2) / (2 * (width * s) ** 2));
  return (
    g(0.08, 0.025, 0.12) + // P
    g(0.2, 0.008, -0.12) + // Q
    g(0.22, 0.01, 1.0) + // R
    g(0.245, 0.01, -0.25) + // S
    g(0.42, 0.045, 0.28) // T
  );
}

function EcgCanvas({ bpm }: { bpm: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bpmRef = useRef(bpm);
  const reduced = useSafeReducedMotion();
  // With reduced motion the trace is static, so redraw it whenever the rate changes.
  const staticBpm = reduced ? bpm : 0;

  useEffect(() => {
    bpmRef.current = bpm;
  }, [bpm]);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const dpr = window.devicePixelRatio || 1;
    let width = 0;
    let height = 0;
    let buffer: number[] = [];
    let beatTime = 0;
    const speed = 140; // px per second

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buffer = new Array(width).fill(0);
    };

    const pushSamples = (count: number, dtPerSample: number) => {
      for (let i = 0; i < count; i++) {
        const period = 60 / bpmRef.current;
        beatTime += dtPerSample;
        if (beatTime >= period) beatTime -= period;
        buffer.push(wave(beatTime, period));
      }
      if (buffer.length > width) buffer.splice(0, buffer.length - width);
    };

    const draw = () => {
      const styles = getComputedStyle(canvas);
      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = styles.getPropertyValue("--chart-grid") || "#ccc";
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 28) {
        ctx.beginPath();
        ctx.moveTo(x + 0.5, 0);
        ctx.lineTo(x + 0.5, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 28) {
        ctx.beginPath();
        ctx.moveTo(0, y + 0.5);
        ctx.lineTo(width, y + 0.5);
        ctx.stroke();
      }
      ctx.strokeStyle = "#F04452";
      ctx.lineWidth = 2.5;
      ctx.lineJoin = "round";
      ctx.beginPath();
      const base = height * 0.65;
      const amp = height * 0.5;
      buffer.forEach((v, x) => {
        const y = base - v * amp;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();
    };

    resize();
    const ro = new ResizeObserver(() => {
      resize();
      pushSamples(width, 1 / speed);
      draw();
    });
    ro.observe(canvas);
    pushSamples(width, 1 / speed);
    draw();

    if (reduced) return () => ro.disconnect();

    let raf = 0;
    let last = performance.now();
    let carry = 0;
    const tick = (now: number) => {
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      carry += dt * speed;
      const n = Math.floor(carry);
      carry -= n;
      if (n > 0) {
        pushSamples(n, 1 / speed);
        draw();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [reduced, staticBpm]);

  return (
    <canvas
      ref={canvasRef}
      className="h-40 w-full rounded-2xl border border-line bg-bg"
      role="img"
      aria-label={`Stylized ECG-style trace at an illustrative ${bpm} beats per minute. Not a diagnostic recording.`}
    />
  );
}

export function HeartbeatSimulator() {
  const [stateId, setStateId] = useState("rest");
  const reduced = useSafeReducedMotion();
  const { markLabVisited } = useProgress();
  const state = activityStates.find((s) => s.id === stateId)!;
  const period = 60 / state.bpm;

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.3fr]">
      <div className="flex flex-col items-center justify-center rounded-3xl border border-line bg-bg-elev p-6">
        <motion.svg
          key={state.bpm}
          viewBox="0 0 40 36"
          className="h-40 w-44"
          aria-hidden
          animate={reduced ? undefined : { scale: [1, 1.14, 0.98, 1.05, 1] }}
          transition={reduced ? undefined : { duration: period, times: [0, 0.15, 0.3, 0.45, 1], repeat: Infinity, ease: "easeInOut" }}
        >
          <path
            d="M20 34 C 8 25, 1 18, 1 10.5 C 1 5, 5 1, 10.5 1 C 14.5 1, 18 3.5, 20 7 C 22 3.5, 25.5 1, 29.5 1 C 35 1, 39 5, 39 10.5 C 39 18, 32 25, 20 34 Z"
            fill="#F04452"
          />
        </motion.svg>
        <p className="mt-4 font-display text-7xl font-extrabold leading-none" aria-live="polite">
          {state.bpm}
          <span className="ml-2 text-2xl text-fg-muted">BPM</span>
        </p>
        <p className="mt-1 text-sm text-fg-muted">Illustrative value for “{state.label}”</p>
      </div>

      <div className="space-y-5">
        <div role="radiogroup" aria-label="Activity level" className="flex flex-wrap gap-2">
          {activityStates.map((s) => (
            <button
              key={s.id}
              type="button"
              role="radio"
              aria-checked={s.id === stateId}
              onClick={() => {
                setStateId(s.id);
                markLabVisited("heartbeat");
              }}
              className={cx(
                "rounded-full border px-4 py-2 text-sm font-bold",
                s.id === stateId ? "border-heart bg-heart text-navy" : "border-line text-fg-muted hover:text-fg",
              )}
            >
              {s.label}
            </button>
          ))}
        </div>
        <EcgCanvas bpm={state.bpm} />
        <div aria-live="polite" className="rounded-2xl border border-line bg-bg-elev p-5">
          <p className="font-display text-2xl font-bold uppercase">{state.label}</p>
          <p className="mt-1 text-fg-muted">{state.explanation}</p>
        </div>
        <SimulationLabel>
          Simulated, illustrative values and a stylized trace — not your heart rate, not a diagnostic ECG, and not a
          target for anyone.
        </SimulationLabel>
      </div>
    </div>
  );
}
