import { AlertOctagon, HeartPulse, Phone, Users, Zap, Eye, ShieldCheck, MessageCircle } from "lucide-react";
import type { Illustration } from "@/content/academy";
import { HeartDiagram } from "@/components/heart/heart-diagram";
import { EcgLine } from "@/components/ui";

function Frame({ caption, children }: { caption: string; children: React.ReactNode }) {
  return (
    <figure className="rounded-2xl border border-line bg-bg-sunken p-4">
      {children}
      <figcaption className="mt-2 text-center text-xs text-fg-muted">{caption}</figcaption>
    </figure>
  );
}

export function LessonIllustration({ kind }: { kind: Illustration }) {
  switch (kind) {
    case "heart-diagram":
      return (
        <Frame caption="Schematic heart (not to scale). The heart's right side appears on your left.">
          <HeartDiagram className="mx-auto w-full max-w-sm" />
        </Frame>
      );
    case "circulation":
      return (
        <Frame caption="The two loops of circulation.">
          <svg viewBox="0 0 400 220" className="mx-auto w-full max-w-md" role="img" aria-label="Body to right heart to lungs to left heart and back to body">
            <path d="M200 190 C90 190 40 150 40 110 C40 60 100 30 200 30" stroke="var(--oxy-poor)" strokeWidth="10" fill="none" />
            <path d="M200 30 C300 30 360 60 360 110 C360 150 310 190 200 190" stroke="var(--oxy-rich)" strokeWidth="10" fill="none" />
            {[
              ["Body", 200, 196],
              ["Right heart", 40, 114],
              ["Lungs", 200, 34],
              ["Left heart", 360, 114],
            ].map(([t, x, y]) => (
              <g key={t as string}>
                <rect x={(x as number) - 52} y={(y as number) - 18} width="104" height="30" rx="15" fill="var(--bg-elev)" stroke="var(--border)" />
                <text x={x as number} y={(y as number) + 2} textAnchor="middle" className="fill-fg text-[13px] font-bold">
                  {t}
                </text>
              </g>
            ))}
          </svg>
        </Frame>
      );
    case "ecg":
      return (
        <Frame caption="Stylized heartbeat line — decorative, not a medical ECG.">
          <EcgLine className="h-20 w-full text-heart" />
        </Frame>
      );
    case "pulse":
      return (
        <Frame caption="Find your pulse at the wrist (below the thumb) or the side of the neck, using two fingers.">
          <div className="flex items-center justify-center gap-6 py-4">
            <HeartPulse aria-hidden className="size-14 text-heart" />
            <p className="font-display text-3xl font-bold">beats in 15 s × 4 = bpm</p>
          </div>
        </Frame>
      );
    case "cardiac-output":
      return (
        <Frame caption="Cardiac output equals heart rate times stroke volume.">
          <p className="py-6 text-center font-display text-2xl font-bold sm:text-3xl">
            <span className="text-red-ink">Heart rate</span> × <span className="text-cyan-ink">Stroke volume</span> ={" "}
            Cardiac output
          </p>
        </Frame>
      );
    case "warning":
      return (
        <Frame caption="Warning signs mean: stop, tell an adult, get checked.">
          <div className="flex flex-wrap items-center justify-center gap-4 py-4 font-display text-2xl font-bold uppercase">
            <span className="inline-flex items-center gap-2"><AlertOctagon aria-hidden className="size-7 text-red-ink" /> Stop</span>
            <span aria-hidden>→</span>
            <span className="inline-flex items-center gap-2"><MessageCircle aria-hidden className="size-7 text-cyan-ink" /> Tell</span>
            <span aria-hidden>→</span>
            <span className="inline-flex items-center gap-2"><ShieldCheck aria-hidden className="size-7 text-emerald-600" /> Get checked</span>
          </div>
        </Frame>
      );
    case "chain-of-survival":
      return (
        <Frame caption="Recognize, call 911, start CPR, use an AED.">
          <ol className="grid grid-cols-2 gap-3 py-2 sm:grid-cols-4">
            {[
              [Eye, "Recognize"],
              [Phone, "Call 911"],
              [HeartPulse, "CPR"],
              [Zap, "AED"],
            ].map(([Icon, label], i) => {
              const I = Icon as typeof Eye;
              return (
                <li key={label as string} className="flex flex-col items-center rounded-xl bg-bg-elev p-3 text-center">
                  <span className="text-xs font-bold text-fg-muted">{i + 1}</span>
                  <I aria-hidden className="size-8 text-red-ink" />
                  <span className="mt-1 font-display text-lg font-bold uppercase">{label as string}</span>
                </li>
              );
            })}
          </ol>
        </Frame>
      );
    case "team":
      return (
        <Frame caption="Teammates look out for each other.">
          <div className="flex items-center justify-center gap-4 py-4">
            <Users aria-hidden className="size-14 text-cyan-ink" />
            <p className="font-display text-2xl font-bold uppercase">Notice · Speak up · Support</p>
          </div>
        </Frame>
      );
  }
}
