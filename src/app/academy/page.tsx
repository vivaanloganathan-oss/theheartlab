import type { Metadata } from "next";
import { Award } from "lucide-react";
import { ButtonLink, Callout, Container, PageHero, Section } from "@/components/ui";
import { AcademyOverview } from "@/components/learn/academy-overview";
import { badges } from "@/content/academy";

export const metadata: Metadata = {
  title: "Learning Academy",
  description: "Three levels and twelve short modules on heart science and safety for student-athletes, with quizzes and badges.",
};

export default function AcademyPage() {
  return (
    <>
      <PageHero
        eyebrow="Learning Academy"
        title={
          <>
            Rookie to <span className="text-heart">ambassador</span>
          </>
        }
        intro="Each module has a short lesson, an interactive activity, and a five-question quiz. Pass with 4 out of 5 to complete it. No sign-up — progress is saved only in this browser."
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/academy/heart-anatomy">Start Level 1</ButtonLink>
          <ButtonLink href="/dashboard" variant="onDark">
            My dashboard
          </ButtonLink>
        </div>
      </PageHero>

      <Section>
        <Container>
          <AcademyOverview />

          <div className="mt-16 rounded-3xl border border-line bg-bg-elev p-6 sm:p-8">
            <h2 className="font-display text-3xl font-extrabold uppercase">Badges you can earn</h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {badges.map((b) => (
                <li key={b.id} className="rounded-2xl bg-bg-sunken p-4">
                  <Award aria-hidden className="size-7 text-amber-500" />
                  <p className="mt-2 font-display text-xl font-bold uppercase">{b.name}</p>
                  <p className="text-sm text-fg-muted">{b.description}</p>
                </li>
              ))}
            </ul>
            <Callout tone="warning" title="About certificates" className="mt-6">
              Completion certificates are educational achievements. They are <strong>not</strong> CPR certification,
              medical qualifications, or sports participation clearance.
            </Callout>
          </div>
        </Container>
      </Section>
    </>
  );
}
