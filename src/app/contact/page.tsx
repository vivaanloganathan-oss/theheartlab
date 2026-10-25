import type { Metadata } from "next";
import { Accessibility, BookOpenCheck, Mail, MessageSquare, Phone, ShieldCheck } from "lucide-react";
import { Callout, Card, Container, PageHero, Section } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact & Support",
  description: "How to reach The Heart Lab team with questions, feedback, content corrections, and privacy or accessibility requests.",
};

const topics = [
  { icon: MessageSquare, title: "Questions & feedback", text: "Ideas, bug reports, or help using the website or app." },
  { icon: BookOpenCheck, title: "Content corrections", text: "Spotted something inaccurate or out of date? Tell us which page and what source supports the correction." },
  { icon: ShieldCheck, title: "Privacy", text: "Questions about how the site and app handle information (short version: we don't collect any)." },
  { icon: Accessibility, title: "Accessibility", text: "Something hard to use with a keyboard, screen reader, or other assistive technology." },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact & support"
        title={
          <>
            Get in <span className="text-cyan">touch</span>
          </>
        }
        intro="We read every message and usually reply within a few days."
      />
      <Section>
        <Container className="max-w-4xl space-y-10">
          <Callout tone="danger" title="This is not for medical help">
            <span className="inline-flex items-start gap-1">
              <Phone aria-hidden className="mt-0.5 size-4 shrink-0" />
              <span>
                <strong>In an emergency, call 911</strong> (or your local emergency number). We can&apos;t give medical
                advice, evaluate symptoms, or clear anyone to play — please contact a healthcare professional.
              </span>
            </span>
          </Callout>

          <Card className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <Mail aria-hidden className="size-8 text-red-ink" />
              <div>
                <p className="text-sm text-fg-muted">Email</p>
                <a href={`mailto:${site.contactEmail}`} className="break-all text-xl font-bold underline underline-offset-4">
                  {site.contactEmail}
                </a>
              </div>
            </div>
            <a
              href={`mailto:${site.contactEmail}?subject=${encodeURIComponent("The Heart Lab — feedback")}`}
              className="inline-flex items-center gap-2 rounded-full bg-heart px-5 py-3 text-sm font-bold text-navy hover:bg-[#ff5b68]"
            >
              <Mail aria-hidden className="size-4" /> Send an email
            </a>
          </Card>

          <div>
            <h2 className="font-display text-3xl font-extrabold uppercase">What you can contact us about</h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {topics.map(({ icon: Icon, title, text }) => (
                <li key={title}>
                  <Card className="h-full">
                    <Icon aria-hidden className="size-6 text-cyan-ink" />
                    <h3 className="mt-3 font-bold">{title}</h3>
                    <p className="mt-1 text-sm text-fg-muted">{text}</p>
                  </Card>
                </li>
              ))}
            </ul>
          </div>

          <p className="text-sm text-fg-muted">
            Please don&apos;t include personal health information in your message.
          </p>
        </Container>
      </Section>
    </>
  );
}
