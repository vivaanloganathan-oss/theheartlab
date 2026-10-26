import type { Metadata } from "next";
import { BookOpenCheck, Eye, HeartHandshake, ShieldCheck, Stethoscope, Target } from "lucide-react";
import { ButtonLink, Callout, Card, Container, PageHero, Section, SectionHeading } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: "The mission, vision, and content standards behind YoungHeartz.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About YoungHeartz"
        title={
          <>
            Know your <span className="text-heart">heart</span>
          </>
        }
        intro={site.tagline}
      />

      <Section>
        <Container className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Mission" title="Heart-smart athletes" />
            <p className="mt-4 text-lg text-fg-muted">
              YoungHeartz empowers student-athletes with accessible, evidence-based cardiovascular health education so
              they can better understand their hearts, recognize potential warning signs, build healthy habits, and know
              when to seek medical help.
            </p>
          </div>
          <div>
            <SectionHeading eyebrow="Vision" title="A culture that speaks up" />
            <p className="mt-4 text-lg text-fg-muted">
              We picture teams where every athlete knows the warning signs, every coach has a rehearsed emergency action
              plan, every family knows its heart history, and reporting a symptom is seen as strength — not weakness.
            </p>
          </div>
        </Container>
      </Section>

      <Section tone="elevated">
        <Container>
          <SectionHeading eyebrow="How we work" title="Our content standards" />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: BookOpenCheck, title: "Evidence-based", text: "Content draws on public guidance from organizations such as the AHA, CDC, NHLBI, AAP, and ACC. Every page lists its sources." },
              { icon: Stethoscope, title: "Clinically reviewed before launch", text: "All medical content is marked “Clinical review: pending” until a qualified clinician has reviewed it. We never claim a review that hasn't happened." },
              { icon: ShieldCheck, title: "Education, not diagnosis", text: "We don't diagnose, assess fitness, or determine sports clearance. Simulations are clearly labeled as illustrations." },
              { icon: Target, title: "Built for every level", text: "Learning paths for middle school, high school, and college athletes, plus resources for parents and coaches." },
              { icon: HeartHandshake, title: "Encouraging, not frightening", text: "We focus on empowerment and action. Stories are fictional composites and avoid graphic content." },
              { icon: Eye, title: "Privacy-first", text: "No accounts, no ads, no trackers. Learning progress stays in your browser." },
            ].map(({ icon: Icon, title, text }) => (
              <Card key={title}>
                <Icon aria-hidden className="size-7 text-cyan-ink" />
                <h3 className="mt-3 font-display text-2xl font-bold uppercase">{title}</h3>
                <p className="mt-1 text-fg-muted">{text}</p>
              </Card>
            ))}
          </div>
          <Callout tone="warning" title="Medical disclaimer" className="mt-10">
            {site.disclaimer} In an emergency, call 911 (or your local emergency number).
          </Callout>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/references">See our references</ButtonLink>
            <ButtonLink href="/privacy" variant="secondary">Privacy policy</ButtonLink>
            <ButtonLink href="/accessibility" variant="secondary">Accessibility</ButtonLink>
          </div>
        </Container>
      </Section>
    </>
  );
}
