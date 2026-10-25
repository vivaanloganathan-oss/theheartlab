/**
 * A deliberately simple, ILLUSTRATIVE heart-rate model for teaching the *shape*
 * of exercise and recovery curves. It is not physiologically calibrated, cannot
 * describe any individual, and must never be used to assess fitness or health.
 */

export const intensityLevels = [
  { id: "light", label: "Light", fraction: 0.35 },
  { id: "moderate", label: "Moderate", fraction: 0.55 },
  { id: "hard", label: "Hard", fraction: 0.75 },
  { id: "very-hard", label: "Very hard", fraction: 0.9 },
] as const;

export type IntensityId = (typeof intensityLevels)[number]["id"];

/** Illustrative ceiling used only to scale the chart. Real maximums vary widely. */
const ILLUSTRATIVE_CEILING = 195;

export interface CurvePoint {
  minute: number;
  bpm: number;
  phase: "Warm-up" | "Exercise" | "Recovery";
}

export function simulateSession({
  restingBpm,
  intensity,
  recoveryMinutes,
  exerciseMinutes = 8,
  recoveryTau = 1.4,
}: {
  restingBpm: number;
  intensity: IntensityId;
  recoveryMinutes: number;
  exerciseMinutes?: number;
  /** Time constant (minutes) for the fast recovery component. Larger = slower recovery. */
  recoveryTau?: number;
}): CurvePoint[] {
  const fraction = intensityLevels.find((l) => l.id === intensity)!.fraction;
  const peak = restingBpm + (ILLUSTRATIVE_CEILING - restingBpm) * fraction;
  const step = 0.25;
  const points: CurvePoint[] = [];

  // 2 minutes at rest for context
  for (let t = 0; t <= 2; t += step) points.push({ minute: t, bpm: restingBpm, phase: "Warm-up" });

  // exercise: rise toward peak
  for (let t = step; t <= exerciseMinutes; t += step) {
    const bpm = peak - (peak - restingBpm) * Math.exp(-t / 1.1);
    points.push({ minute: 2 + t, bpm, phase: "Exercise" });
  }
  const end = points[points.length - 1].bpm;
  const settled = restingBpm + (end - restingBpm) * 0.12; // recovery doesn't fully return to rest immediately

  // recovery: fast exponential drop, then slow drift toward a slightly elevated baseline
  for (let t = step; t <= recoveryMinutes + 1e-9; t += step) {
    const fast = (end - settled) * Math.exp(-t / recoveryTau);
    const slow = (settled - restingBpm) * Math.exp(-t / 12);
    points.push({ minute: 2 + exerciseMinutes + t, bpm: restingBpm + fast + slow, phase: "Recovery" });
  }

  return points.map((p) => ({ ...p, minute: Math.round(p.minute * 100) / 100, bpm: Math.round(p.bpm) }));
}

export function recoverySummary(points: CurvePoint[]) {
  const recovery = points.filter((p) => p.phase === "Recovery");
  const exercise = points.filter((p) => p.phase === "Exercise");
  const peak = exercise[exercise.length - 1]?.bpm ?? 0;
  const start = exercise[exercise.length - 1]?.minute ?? 0;
  const at1 = recovery.find((p) => p.minute >= start + 1)?.bpm;
  const last = recovery[recovery.length - 1]?.bpm ?? peak;
  return { peak, dropAt1: at1 !== undefined ? peak - at1 : null, final: last };
}
