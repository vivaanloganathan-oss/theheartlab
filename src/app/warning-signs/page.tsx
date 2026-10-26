import type { Metadata } from "next";
import { AlertOctagon, ChevronDown, HeartPulse, Phone, Siren, Zap, ClipboardList, Eye } from "lucide-react";
import {
  ButtonLink,
  Callout,
  Container,
  Eyebrow,
  PageHero,
  ReviewBadge,
  Section,
  SectionHeading,
  SourceList,
} from "@/components/ui";
import {
  arrestVsAttack,
  conditions,
  emergencySources,
  emergencySteps,
  warningMeta,
  warningSigns,
  whatToDo,
} from "@/content/warning-signs";

export const metadata: Metadata = {
  title: "Know the Warning Signs",
  description:
    "Heart symptoms student-athletes should never ignore, what to do about them, and how to respond to a cardiac emergency.",
};

const stepIcons = { recognize: Eye, call: Phone, cpr: HeartPulse, aed: Zap, eap: ClipboardList } as const;

export default function WarningSignsPage() {
  return (
    <>
      <PageHero
        eyebrow="Warning signs & athlete safety"
        title={
          <>
            Know the <span className="text-heart">warning signs</span>
          </>
        }
        intro="Most athletes never have a heart problem. But knowing these signs — and acting on them — can save a life, including your own."
      >
        <div className="flex max-w-3xl gap-4 rounded-2xl border-2 border-heart bg-heart/10 p-5">
          <Siren aria-hidden className="size-8 shrink-0 text-heart" />
          <div>
            <p className="font-display text-2xl font-extrabold uppercase">Emergency? Call 911 now.</p>
            <p className="mt-1 text-white/85">
              If someone collapses and is unresponsive and not breathing normally, call 911 (or your local emergency
              number), start CPR, and use an AED as soon as one is available.{" "}
              <a href="#emergency" className="font-bold text-white underline underline-offset-2">
                See the emergency steps
              </a>
              .
            </p>
          </div>
        </div>
      </PageHero>

      <Section aria-labelledby="signs-heading">
        <Container>
          <SectionHeading
            id="signs-heading"
            eyebrow="Never ignore"
            title="Six signs that need medical attention"
            intro="These symptoms don't always mean a heart problem — but they always deserve a medical evaluation. Don't diagnose yourself, and don't play through them."
          />
          <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {warningSigns.map((w, i) => (
              <li key={w.id} id={w.id} className="scroll-mt-32 rounded-3xl border border-line bg-bg-elev p-6">
                <div className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-full bg-heart font-display text-xl font-extrabold text-navy">
                    {i + 1}
                  </span>
                  <AlertOctagon aria-hidden className="size-5 text-red-ink" />
                </div>
                <h3 className="mt-4 font-display text-2xl font-bold uppercase leading-tight">{w.title}</h3>
                <p className="mt-2">{w.description}</p>
                <p className="mt-3 text-sm text-fg-muted">
                  <strong className="text-fg">Why it matters: </strong>
                  {w.why}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="navy" aria-labelledby="todo-heading">
        <Container>
          <Eyebrow tone="red">If you notice a warning sign</Eyebrow>
          <h2 id="todo-heading" className="mt-2 font-display text-5xl font-extrabold uppercase">
            Stop. Tell. Get checked.
          </h2>
          <ol className="mt-10 grid gap-4 md:grid-cols-4">
            {whatToDo.map((s, i) => (
              <li key={s.title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <p className="font-display text-4xl font-extrabold text-heart">{i + 1}</p>
                <p className="mt-2 font-display text-2xl font-bold uppercase">{s.title}</p>
                <p className="mt-1 text-white/80">{s.text}</p>
              </li>
            ))}
          </ol>
          <p className="mt-8 max-w-3xl text-white/75">
            Only a qualified healthcare professional can evaluate symptoms or decide when an athlete may return to
            sports. YoungHeartz can&apos;t diagnose anyone or clear anyone to play — and a normal heart-rate reading
            never rules out heart disease.
          </p>
        </Container>
      </Section>

      <Section id="arrest-vs-attack" aria-labelledby="ava-heading" className="scroll-mt-28">
        <Container>
          <SectionHeading
            id="ava-heading"
            eyebrow="Not the same thing"
            title="Cardiac arrest vs. heart attack"
            intro="People mix these up all the time. Both are emergencies, but they are different problems."
          />
          <div className="mt-10 overflow-x-auto rounded-3xl border border-line bg-bg-elev">
            <table className="w-full min-w-[40rem] text-left text-sm">
              <caption className="sr-only">Comparison of sudden cardiac arrest and heart attack</caption>
              <thead>
                <tr className="border-b border-line">
                  <th scope="col" className="p-4"><span className="sr-only">Feature</span></th>
                  <th scope="col" className="p-4 font-display text-xl font-bold uppercase text-red-ink">Sudden cardiac arrest</th>
                  <th scope="col" className="p-4 font-display text-xl font-bold uppercase text-cyan-ink">Heart attack</th>
                </tr>
              </thead>
              <tbody>
                {arrestVsAttack.rows.map((r) => (
                  <tr key={r.label} className="border-b border-line last:border-0">
                    <th scope="row" className="p-4 align-top font-bold">{r.label}</th>
                    <td className="p-4 align-top text-fg-muted">{r.arrest}</td>
                    <td className="p-4 align-top text-fg-muted">{r.attack}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <SourceList ids={arrestVsAttack.sources} className="mt-4" />
        </Container>
      </Section>

      <Section tone="elevated" aria-labelledby="conditions-heading">
        <Container className="max-w-4xl">
          <SectionHeading
            id="conditions-heading"
            eyebrow="Learn more"
            title="Conditions and screening"
            intro="Short, plain-language overviews. Only healthcare professionals can diagnose these conditions."
          />
          <div className="mt-10 space-y-3">
            {conditions.map((c) => (
              <details key={c.id} id={c.id} className="group scroll-mt-32 rounded-2xl border border-line bg-bg-elev">
                <summary className="flex cursor-pointer list-none items-start gap-3 p-5 [&::-webkit-details-marker]:hidden">
                  <div className="flex-1">
                    <h3 className="font-display text-2xl font-bold uppercase">{c.name}</h3>
                    <p className="text-fg-muted">{c.summary}</p>
                  </div>
                  <ChevronDown aria-hidden className="mt-2 size-5 shrink-0 transition group-open:rotate-180" />
                </summary>
                <div className="space-y-3 border-t border-line px-5 pb-5 pt-4">
                  <ul className="list-disc space-y-2 pl-5">
                    {c.details.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                  {c.id === "congenital" && (
                    <ButtonLink href="/congenital-heart-conditions" variant="secondary">
                      Congenital heart conditions in athletes
                    </ButtonLink>
                  )}
                  <SourceList ids={c.sources} />
                </div>
              </details>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="emergency" aria-labelledby="emergency-heading" className="scroll-mt-28">
        <Container>
          <SectionHeading
            id="emergency-heading"
            eyebrow="Emergency response awareness"
            title="If someone collapses"
            intro="Fast action matters. You don't need to be a medical professional to help."
          />
          <ol className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {emergencySteps.map((s, i) => {
              const Icon = stepIcons[s.id as keyof typeof stepIcons];
              return (
                <li key={s.id} className="flex flex-col rounded-3xl border border-line bg-bg-elev p-5">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-4xl font-extrabold text-red-ink">{i + 1}</span>
                    <Icon aria-hidden className="size-7 text-cyan-ink" />
                  </div>
                  <h3 className="mt-3 font-display text-2xl font-bold uppercase">{s.title}</h3>
                  <p className="mt-1 text-sm text-fg-muted">{s.text}</p>
                </li>
              );
            })}
          </ol>
          <Callout tone="warning" title="Awareness, not certification" className="mt-8">
            This page builds awareness only. Hands-on CPR and AED training from a recognized provider is the best way to
            be ready. Ask your school, team, or community organizations about classes.
          </Callout>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SourceList ids={[...emergencySources, ...warningMeta.sources.filter((s) => !emergencySources.includes(s))]} />
            <ReviewBadge review={warningMeta.review} />
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/quiz#what-would-you-do">Try “What Would You Do?”</ButtonLink>
            <ButtonLink href="/resources#coaches" variant="secondary">
              Emergency action plan checklist
            </ButtonLink>
          </div>
        </Container>
      </Section>
    </>
  );
}
