import type { Metadata } from "next";
import { Container, PageHero, Section } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How The Heart Lab handles information. No accounts, no ads, no trackers.",
};

const sections = [
  {
    title: "The short version",
    body: [
      "The Heart Lab does not require an account, does not show ads, and does not include third-party trackers or analytics by default.",
      "Your learning progress (knowledge checks passed, labs explored, quiz scores, and theme preference) is stored only in your own browser using local storage. It is never sent to us or anyone else.",
    ],
  },
  {
    title: "What we don't collect",
    body: [
      "We do not ask for or collect names, email addresses, exact birth dates, school names, medical history, heart-rate readings, or any other personal health information.",
      "Interactive tools — such as the pulse math widget or the sleep and cardiac output sliders — work entirely in your browser. Values you type are not saved or transmitted.",
    ],
  },
  {
    title: "Local storage",
    body: [
      "Two local storage entries are used: one for anonymous learning progress and one for your light/dark theme preference. You can erase your progress anytime from the Dashboard, or by clearing your browser's site data.",
    ],
  },
  {
    title: "Hosting and external links",
    body: [
      "Like any website, the server that hosts The Heart Lab may keep standard technical logs (such as IP address and pages requested) for security and reliability. The site operator should describe its hosting provider's practices here before public launch.",
      "References link to external websites (for example, government and medical organizations). Those sites have their own privacy policies.",
    ],
  },
  {
    title: "Children and students",
    body: [
      "The Heart Lab is designed for students, including those under 13, and is built to avoid collecting personal information. Before adding any feature that collects information — such as accounts, teacher dashboards, or analytics — the operator must assess applicable children's privacy and student-data laws (for example, COPPA and FERPA in the United States, and relevant state laws) and update this policy.",
    ],
  },
  {
    title: "Contact",
    body: [
      "Before public launch, the site operator should add a contact method here for privacy questions.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Privacy" title="Privacy policy" intro={`Last updated ${site.contentUpdated}.`} />
      <Section>
        <Container className="max-w-3xl space-y-10">
          {sections.map((s) => (
            <section key={s.title}>
              <h2 className="font-display text-3xl font-extrabold uppercase">{s.title}</h2>
              <div className="mt-3 space-y-3 text-lg text-fg-muted">
                {s.body.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </section>
          ))}
        </Container>
      </Section>
    </>
  );
}
