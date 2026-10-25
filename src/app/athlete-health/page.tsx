import type { Metadata } from "next";
import { ChevronDown, Dumbbell, FlaskConical, Star } from "lucide-react";
import { Callout, Container, PageHero, ReviewBadge, Section, SourceList } from "@/components/ui";
import { topics } from "@/content/topics";
import { TopicWidgetView } from "@/components/learn/topic-widgets";
import { KnowledgeCheck } from "@/components/learn/knowledge-check";

export const metadata: Metadata = {
  title: "Athlete Cardiovascular Health",
  description:
    "Resting heart rate, exercise, recovery, endurance, hydration, sleep, nutrition, overtraining, and athletic adaptation — explained for student-athletes.",
};


export default function AthleteHealthPage() {
  return (
    <>
      <PageHero
        eyebrow="Athlete health"
        title={
          <>
            Train your <span className="text-heart">heart</span> like you train your game
          </>
        }
        intro="Ten topics, each with a simple explanation, a real sports example, the deeper science, an interactive illustration, and a quick knowledge check."
      />

      <Section className="pt-10 sm:pt-12">
        <Container className="grid gap-10 lg:grid-cols-[14rem_1fr] [&>*]:min-w-0">
          <nav aria-label="Topics" className="lg:sticky lg:top-32 lg:self-start">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-fg-muted">Topics</p>
            <ol className="mt-3 flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:gap-1 lg:overflow-visible">
              {topics.map((t) => (
                <li key={t.id} className="shrink-0">
                  <a
                    href={`#${t.id}`}
                    className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-fg-muted hover:bg-bg-sunken hover:text-fg"
                  >
                    <span className="font-display font-extrabold text-cyan-ink">{t.letter}</span>
                    {t.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="space-y-6">
            <Callout tone="info" title="Everyone's heart is different">
              Heart rates vary a lot between healthy people. Numbers on this page are examples, not targets — and no
              heart-rate number can rule out a heart condition. <strong>Symptoms always matter.</strong>
            </Callout>

            {topics.map((t) => (
              <article
                key={t.id}
                id={t.id}
                aria-labelledby={`${t.id}-title`}
                className="scroll-mt-32 rounded-3xl border border-line bg-bg-elev p-6 sm:p-8"
              >
                <div className="flex items-start gap-4">
                  <span
                    aria-hidden
                    className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-navy font-display text-2xl font-extrabold text-heart"
                  >
                    {t.letter}
                  </span>
                  <div>
                    <h2 id={`${t.id}-title`} className="font-display text-3xl font-extrabold uppercase leading-none sm:text-4xl">
                      <span className="sr-only">{t.letter}. </span>
                      {t.title}
                    </h2>
                    <p className="mt-3 text-lg">{t.simple}</p>
                  </div>
                </div>

                <div className="mt-6 grid gap-6 lg:grid-cols-2">
                  <div className="space-y-5">
                    <div className="flex gap-3">
                      <Dumbbell aria-hidden className="mt-1 size-5 shrink-0 text-red-ink" />
                      <div>
                        <h3 className="font-bold">Athletic example</h3>
                        <p className="text-fg-muted">{t.example}</p>
                      </div>
                    </div>
                    <details className="group rounded-2xl border border-line p-4" open={t.letter === "A"}>
                      <summary className="flex cursor-pointer list-none items-center gap-2 font-bold [&::-webkit-details-marker]:hidden">
                        <FlaskConical aria-hidden className="size-5 text-cyan-ink" />
                        The science
                        <ChevronDown aria-hidden className="ml-auto size-4 transition group-open:rotate-180" />
                      </summary>
                      <div className="mt-3 space-y-3 text-fg-muted">
                        {t.science.map((p) => (
                          <p key={p}>{p}</p>
                        ))}
                      </div>
                    </details>
                    <div className="flex gap-3 rounded-2xl bg-navy p-4 text-white">
                      <Star aria-hidden className="mt-0.5 size-5 shrink-0 text-heart" />
                      <div>
                        <h3 className="font-bold">Key takeaway</h3>
                        <p className="text-white/80">{t.takeaway}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-5">
                    <section aria-label={`${t.title} interactive illustration`} className="rounded-2xl border border-line p-4">
                      <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-cyan-ink">Try it</h3>
                      <TopicWidgetView widget={t.widget} topicId={t.id} />
                    </section>
                    <KnowledgeCheck question={t.check} topicId={t.id} />
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3 border-t border-line pt-4 sm:flex-row sm:items-end sm:justify-between">
                  <SourceList ids={t.sources} />
                  <ReviewBadge review={t.review} />
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
