import type { Metadata } from "next";
import { Megaphone, Users } from "lucide-react";
import { Container, PageHero, ReviewBadge, Section, SectionHeading, SourceList } from "@/components/ui";
import { ChecklistCard, GuideDownload } from "@/components/resources/checklist-card";
import { checklists, coachGuide, parentGuide, resourcesMeta, type GuideSection } from "@/content/resources";

export const metadata: Metadata = {
  title: "Parents & Coaches Resource Center",
  description:
    "Guidance and printable checklists for parents, guardians, coaches, and athletic trainers supporting student-athletes' heart health.",
};

function Guide({ sections }: { sections: GuideSection[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {sections.map((s) => (
        <article key={s.id} className="rounded-3xl border border-line bg-bg-elev p-6">
          <h3 className="font-display text-2xl font-bold uppercase">{s.title}</h3>
          <div className="mt-2 space-y-2 text-fg-muted">
            {s.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="Resource center"
        title={
          <>
            For the adults in <span className="text-cyan">their corner</span>
          </>
        }
        intro="Practical guidance, printable checklists, and conversation starters for parents, guardians, coaches, and athletic trainers."
      >
        <nav aria-label="Audiences" className="flex flex-wrap gap-2">
          <a href="#parents" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-semibold hover:border-cyan">
            <Users aria-hidden className="size-4 text-cyan" /> Parents & guardians
          </a>
          <a href="#coaches" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-semibold hover:border-cyan">
            <Megaphone aria-hidden className="size-4 text-heart" /> Coaches & trainers
          </a>
        </nav>
      </PageHero>

      <Section id="parents" aria-labelledby="parents-heading" className="scroll-mt-28">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading id="parents-heading" eyebrow="Parents & guardians" title="Supporting your athlete" />
            <GuideDownload title="The Heart Lab — Parent & Guardian Guide" sections={parentGuide} filename="heart-lab-parent-guide.txt" />
          </div>
          <div className="mt-10">
            <Guide sections={parentGuide} />
          </div>
          <h3 className="mt-14 font-display text-3xl font-extrabold uppercase">Printable checklists</h3>
          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            {checklists.filter((c) => c.audience === "parents").map((c) => (
              <ChecklistCard key={c.id} checklist={c} />
            ))}
          </div>
        </Container>
      </Section>

      <Section id="coaches" tone="elevated" aria-labelledby="coaches-heading" className="scroll-mt-28">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading id="coaches-heading" eyebrow="Coaches & athletic trainers" title="Leading a heart-safe team" />
            <GuideDownload title="The Heart Lab — Coach & Athletic Trainer Guide" sections={coachGuide} filename="heart-lab-coach-guide.txt" />
          </div>
          <div className="mt-10">
            <Guide sections={coachGuide} />
          </div>
          <h3 className="mt-14 font-display text-3xl font-extrabold uppercase">Printable checklists</h3>
          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            {checklists.filter((c) => c.audience === "coaches").map((c) => (
              <ChecklistCard key={c.id} checklist={c} />
            ))}
          </div>
          <div className="mt-12 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-end sm:justify-between">
            <SourceList ids={resourcesMeta.sources} />
            <ReviewBadge review={resourcesMeta.review} />
          </div>
        </Container>
      </Section>
    </>
  );
}
