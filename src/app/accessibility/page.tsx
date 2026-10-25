import type { Metadata } from "next";
import { Container, PageHero, Section } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Accessibility Statement",
  description: "The Heart Lab's accessibility goals, features, and known limitations.",
};

const features = [
  "Keyboard navigation for all menus, labs, quizzes, and activities, with visible focus indicators",
  "A “Skip to main content” link at the top of every page",
  "Screen-reader labels for interactive diagrams, controls, and progress indicators; live announcements for changing results",
  "Text alternatives for charts: descriptive summaries and data tables",
  "Reduced-motion support: animations, flowing blood dots, and the ECG-style trace stop when your device requests reduced motion",
  "Light and dark modes, with text colors chosen to meet WCAG AA contrast",
  "Responsive layouts that work from small phones to large screens, and with browser zoom",
  "Order activities use buttons instead of drag-and-drop, so they work with keyboards and switch devices",
];

const limitations = [
  "The schematic heart diagram is visual by nature. Every structure is also selectable from a button list with full text descriptions.",
  "The site currently has no educational videos. If videos are added, they must include captions and transcripts.",
  "A formal WCAG 2.2 AA audit with assistive-technology users has not yet been completed and is planned before public launch.",
];

export default function AccessibilityPage() {
  return (
    <>
      <PageHero
        eyebrow="Accessibility"
        title="Accessibility statement"
        intro="The Heart Lab aims to meet WCAG 2.2 Level AA so every athlete, parent, and coach can learn here."
      />
      <Section>
        <Container className="max-w-3xl space-y-10">
          <section>
            <h2 className="font-display text-3xl font-extrabold uppercase">What we&apos;ve built in</h2>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-lg text-fg-muted">
              {features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="font-display text-3xl font-extrabold uppercase">Known limitations</h2>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-lg text-fg-muted">
              {limitations.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="font-display text-3xl font-extrabold uppercase">Feedback</h2>
            <p className="mt-3 text-lg text-fg-muted">
              If something doesn&apos;t work for you, we want to know. Before public launch, the site operator should add a
              contact method here for accessibility feedback.
            </p>
            <p className="mt-3 text-sm text-fg-muted">Statement last updated {site.contentUpdated}.</p>
          </section>
        </Container>
      </Section>
    </>
  );
}
