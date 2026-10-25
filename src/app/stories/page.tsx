import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Info } from "lucide-react";
import { Container, PageHero, Pill, Section } from "@/components/ui";
import { stories } from "@/content/stories";

export const metadata: Metadata = {
  title: "Athlete Stories",
  description: "Fictional composite stories about recognizing symptoms, helping in an emergency, and training safely.",
};

export default function StoriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Athlete stories"
        title={
          <>
            Speak up. <span className="text-heart">Step up.</span>
          </>
        }
        intro="Short stories that show heart-smart choices in action."
      >
        <p className="inline-flex max-w-2xl items-start gap-2 rounded-xl border border-white/20 bg-white/5 p-3 text-sm text-white/85">
          <Info aria-hidden className="mt-0.5 size-4 shrink-0 text-cyan" />
          All stories are fictional composites created for education. They are not about real people, and any
          resemblance is coincidental.
        </p>
      </PageHero>

      <Section>
        <Container className="max-w-4xl space-y-10">
          {stories.map((s) => (
            <article key={s.id} id={s.id} aria-labelledby={`${s.id}-title`} className="scroll-mt-32 rounded-3xl border border-line bg-bg-elev p-6 sm:p-10">
              <div className="flex flex-wrap items-center gap-2">
                <Pill tone="cyan">{s.theme}</Pill>
                <Pill>{s.sport}</Pill>
                <Pill>Fictional composite</Pill>
              </div>
              <h2 id={`${s.id}-title`} className="mt-4 font-display text-4xl font-extrabold uppercase leading-none">
                {s.title}
              </h2>
              <p className="mt-1 text-sm font-semibold text-fg-muted">{s.athlete}</p>
              <div className="mt-5 space-y-4 text-lg leading-relaxed">
                {s.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-navy p-5 text-white">
                <p>
                  <span className="font-display text-lg font-bold uppercase text-heart">The lesson: </span>
                  {s.lesson}
                </p>
                <Link href={s.learnMore.href} className="inline-flex items-center gap-1 font-bold text-cyan underline-offset-2 hover:underline">
                  {s.learnMore.label} <ArrowRight aria-hidden className="size-4" />
                </Link>
              </div>
            </article>
          ))}
        </Container>
      </Section>
    </>
  );
}
