import type { Metadata } from "next";
import { AlertOctagon, CheckCircle2, HeartHandshake, Phone } from "lucide-react";
import {
  ButtonLink,
  Callout,
  Card,
  Container,
  Eyebrow,
  PageHero,
  ReviewBadge,
  Section,
  SectionHeading,
  SourceList,
} from "@/components/ui";
import { DefectExplorer } from "@/components/heart/defect-explorer";
import { ChecklistCard } from "@/components/resources/checklist-card";
import { CongenitalQuiz } from "@/components/learn/congenital-quiz";
import { athleteChecklists, coachTips, congenitalMeta, quickFacts, sportsPoints } from "@/content/congenital";
import { getReference } from "@/content/references";
import { warningSigns } from "@/content/warning-signs";

export const metadata: Metadata = {
  title: "Congenital Heart Conditions in Athletes",
  description:
    "What congenital heart defects are, how athletes with them can stay active safely with their care team, warning signs, and checklists for athletes, families, and coaches.",
};

export default function CongenitalPage() {
  return (
    <>
      <PageHero
        eyebrow="Congenital heart conditions"
        title={
          <>
            Born with it. <span className="text-heart">Built to play.</span>
          </>
        }
        intro="Congenital heart conditions are differences in the heart's structure that are present from birth. Many athletes with them stay active — with the right plan from their care team."
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="#types">Explore defect types</ButtonLink>
          <ButtonLink href="#sports" variant="onDark">
            Sports & activity
          </ButtonLink>
        </div>
      </PageHero>

      {/* WHAT THEY ARE */}
      <Section aria-labelledby="what-heading">
        <Container>
          <SectionHeading
            id="what-heading"
            eyebrow="The basics"
            title="What is a congenital heart condition?"
            intro="A congenital heart defect is a problem with the heart's structure that is present at birth. It can change how blood flows through the heart and out to the body. Some are found before birth, some at birth, and some not until childhood or even adulthood."
          />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {quickFacts.map((f) => {
              const ref = getReference(f.source);
              return (
                <li key={f.stat}>
                  <Card className="flex h-full flex-col">
                    <p className="font-display text-4xl font-extrabold text-red-ink">{f.stat}</p>
                    <p className="mt-2 flex-1 text-fg-muted">{f.text}</p>
                    <a href={ref.url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex min-h-6 items-center text-xs text-fg-muted underline underline-offset-2 hover:text-fg">
                      Source: {ref.organization}
                      <span className="sr-only"> — {ref.title} (opens in a new tab)</span>
                    </a>
                  </Card>
                </li>
              );
            })}
          </ul>
        </Container>
      </Section>

      {/* TYPES */}
      <Section id="types" tone="elevated" aria-labelledby="types-heading" className="scroll-mt-28">
        <Container>
          <SectionHeading
            id="types-heading"
            eyebrow="Interactive"
            title="Common types, explained"
            intro="Select a defect to see where it is and what it means."
          />
          <div className="mt-10">
            <DefectExplorer />
          </div>
        </Container>
      </Section>

      {/* SPORTS */}
      <Section id="sports" aria-labelledby="sports-heading" className="scroll-mt-28">
        <Container>
          <SectionHeading
            id="sports-heading"
            eyebrow="Sports & activity"
            title="Staying in the game"
            intro="There's no single rule for every athlete. Activity plans are personal — and they're made with your cardiologist."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {sportsPoints.map((p) => (
              <Card key={p.title} className="flex flex-col">
                <CheckCircle2 aria-hidden className="size-7 text-emerald-600" />
                <h3 className="mt-3 font-display text-2xl font-bold uppercase">{p.title}</h3>
                <p className="mt-1 flex-1 text-fg-muted">{p.text}</p>
                <SourceList ids={p.sources} className="mt-4" />
              </Card>
            ))}
          </div>
          <Callout tone="warning" title="The Heart Lab can't clear anyone to play" className="mt-8">
            Only an athlete&apos;s healthcare team can decide which sports are appropriate. Nothing on this page replaces
            that evaluation.
          </Callout>
        </Container>
      </Section>

      {/* WARNING SIGNS */}
      <Section tone="navy" aria-labelledby="ws-heading">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <Eyebrow tone="red">Every athlete, every time</Eyebrow>
            <h2 id="ws-heading" className="mt-2 font-display text-5xl font-extrabold uppercase leading-[0.9]">
              Know when to stop
            </h2>
            <p className="mt-4 text-white/80">
              Athletes with a congenital heart condition should watch for the same warning signs as everyone else — and
              should <strong className="text-white">stop, tell an adult, and get checked</strong> if they notice any. The
              American Academy of Pediatrics lists congenital heart defects — including surgically repaired ones — among
              conditions that can raise the risk of sudden cardiac arrest in young people.
            </p>
            <div className="mt-6 flex gap-3 rounded-2xl border-2 border-heart bg-heart/10 p-4">
              <Phone aria-hidden className="size-6 shrink-0 text-heart" />
              <p className="text-white/90">
                If anyone collapses and isn&apos;t breathing normally: <strong className="text-white">call 911, start CPR, and use an AED</strong>.
              </p>
            </div>
            <ButtonLink href="/warning-signs" className="mt-6">
              All warning signs
            </ButtonLink>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {warningSigns.slice(0, 5).map((w) => (
              <li key={w.id} className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <AlertOctagon aria-hidden className="size-5 shrink-0 text-heart" />
                <span className="font-semibold text-white">{w.title}</span>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* CHECKLISTS + COACHES */}
      <Section aria-labelledby="plan-heading">
        <Container>
          <SectionHeading
            id="plan-heading"
            eyebrow="Make a plan"
            title="Checklists for athletes and families"
            intro="Print or download these and bring them to your next cardiology appointment."
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {athleteChecklists.map((c) => (
              <ChecklistCard key={c.id} checklist={c} />
            ))}
          </div>

          <div className="mt-14 rounded-3xl border border-line bg-bg-elev p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <HeartHandshake aria-hidden className="size-8 text-cyan-ink" />
              <h3 className="font-display text-3xl font-extrabold uppercase">For coaches & teammates</h3>
            </div>
            <ul className="mt-5 grid gap-3 md:grid-cols-2">
              {coachTips.map((t) => (
                <li key={t} className="flex gap-3 rounded-2xl bg-bg-sunken p-4 text-sm">
                  <CheckCircle2 aria-hidden className="mt-0.5 size-4 shrink-0 text-emerald-600" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* QUIZ */}
      <Section tone="elevated" id="check" aria-labelledby="check-heading" className="scroll-mt-28">
        <Container className="max-w-4xl">
          <SectionHeading id="check-heading" eyebrow="Check your knowledge" title="Five quick questions" />
          <div className="mt-8">
            <CongenitalQuiz />
          </div>
          <div className="mt-12 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-end sm:justify-between">
            <SourceList ids={congenitalMeta.sources} />
            <ReviewBadge review={congenitalMeta.review} />
          </div>
        </Container>
      </Section>
    </>
  );
}
