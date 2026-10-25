import type { Metadata } from "next";
import { Suspense } from "react";
import { ChevronDown } from "lucide-react";
import { Container, PageHero, ReviewBadge, Section, SectionHeading, SourceList, ButtonLink } from "@/components/ui";
import { AnatomyExplorer } from "@/components/heart/anatomy-explorer";
import { CirculationLoop } from "@/components/heart/circulation-loop";
import { anatomyMeta } from "@/content/anatomy";

export const metadata: Metadata = {
  title: "Explore Your Heart",
  description: "An interactive, labeled heart diagram and animated circulation loop for student-athletes.",
};

const explainers = [
  {
    id: "pumping",
    title: "How the heart pumps blood",
    basic:
      "Each heartbeat has two main phases. First the atria squeeze, topping up the ventricles. Then the ventricles squeeze, pushing blood out to the lungs and body. Then the heart relaxes and fills again.",
    advanced:
      "An electrical signal starts in the sinoatrial (SA) node in the right atrium and spreads across the atria. It pauses briefly at the atrioventricular (AV) node, giving the ventricles time to fill, then travels down specialized pathways so the ventricles contract together. The relaxing phase is called diastole; the contracting phase is called systole.",
  },
  {
    id: "oxygen",
    title: "Oxygen delivery",
    basic:
      "Oxygen you breathe in moves from your lungs into your blood. Your heart pumps that oxygen-rich blood to your muscles, which use the oxygen to make energy.",
    advanced:
      "Most oxygen in blood is carried by hemoglobin inside red blood cells. In tiny vessels called capillaries, oxygen moves from blood into tissues where it's used by mitochondria to produce energy (ATP). During exercise, working muscles extract more oxygen from each unit of blood.",
  },
  {
    id: "circulation",
    title: "Blood circulation",
    basic:
      "Blood travels in two loops: a short loop through the lungs to pick up oxygen and a long loop through the body to deliver it.",
    advanced:
      "The pulmonary circulation (right ventricle → lungs → left atrium) runs at lower pressure. The systemic circulation (left ventricle → body → right atrium) runs at higher pressure, which is why the left ventricle wall is thicker.",
  },
  {
    id: "heart-rate",
    title: "Heart rate",
    basic:
      "Heart rate is how many times your heart beats per minute. It goes up when you exercise and down when you rest. Healthy people can have quite different heart rates.",
    advanced:
      "The autonomic nervous system controls heart rate. Sympathetic (\"fight or flight\") activity and adrenaline speed it up; parasympathetic (\"rest and digest\") activity, mainly through the vagus nerve, slows it down. A heart-rate reading alone can't rule out heart disease.",
  },
  {
    id: "cardiac-output",
    title: "Cardiac output",
    basic:
      "Cardiac output is how much blood your heart pumps each minute. It's heart rate multiplied by the amount pumped per beat.",
    advanced:
      "Cardiac output = heart rate × stroke volume. During hard exercise, both rise, so cardiac output can increase to several times its resting value. Stroke volume depends on how well the ventricle fills, how forcefully it contracts, and the pressure it pumps against.",
  },
  {
    id: "adaptation",
    title: "Exercise adaptation",
    basic:
      "With regular training, your heart can pump more blood with each beat, so it may not need to beat as fast at rest or at the same workload.",
    advanced:
      "Endurance training can increase blood volume, stroke volume, muscle capillary density, and mitochondrial content. Some athletes develop changes in heart size or wall thickness. Telling these healthy adaptations apart from heart conditions requires clinical evaluation.",
  },
];

export default function ExploreYourHeartPage() {
  return (
    <>
      <PageHero
        eyebrow="Explore your heart"
        title={
          <>
            Inside the <span className="text-heart">engine</span>
          </>
        }
        intro="Select each chamber, valve, and vessel to see what it does, why it matters, and how it helps you perform."
      />

      <Section aria-labelledby="anatomy-heading">
        <Container>
          <SectionHeading id="anatomy-heading" eyebrow="Interactive anatomy" title="Your heart, part by part" />
          <div className="mt-10">
            <Suspense fallback={<div className="h-[32rem] animate-pulse rounded-3xl bg-bg-sunken" />}>
              <AnatomyExplorer />
            </Suspense>
          </div>
        </Container>
      </Section>

      <Section tone="elevated" aria-labelledby="circ-heading">
        <Container>
          <SectionHeading
            id="circ-heading"
            eyebrow="Blood circulation"
            title="Body → right heart → lungs → left heart → body"
            intro="Blood makes this loop over and over, all day, every day. Step through each stage or let the tour play."
          />
          <div className="mt-10">
            <CirculationLoop />
          </div>
        </Container>
      </Section>

      <Section aria-labelledby="how-heading">
        <Container className="max-w-4xl">
          <SectionHeading
            id="how-heading"
            eyebrow="How it works"
            title="The science, simply"
            intro="Start with the basics. Open “Go deeper” for the advanced explanation."
          />
          <div className="mt-10 space-y-4">
            {explainers.map((e) => (
              <article key={e.id} id={e.id} className="rounded-2xl border border-line bg-bg-elev p-6">
                <h3 className="font-display text-2xl font-bold uppercase">{e.title}</h3>
                <p className="mt-2 text-fg-muted">{e.basic}</p>
                <details className="group mt-4">
                  <summary className="inline-flex cursor-pointer list-none items-center gap-1 rounded-full text-sm font-bold text-cyan-ink [&::-webkit-details-marker]:hidden">
                    Go deeper
                    <ChevronDown aria-hidden className="size-4 transition group-open:rotate-180" />
                  </summary>
                  <p className="mt-3 border-l-2 border-cyan pl-4 text-fg-muted">{e.advanced}</p>
                </details>
              </article>
            ))}
          </div>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SourceList ids={anatomyMeta.sources} />
            <ReviewBadge review={anatomyMeta.review} />
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="/heart-lab#blood-flow">Try the Blood Flow Explorer</ButtonLink>
            <ButtonLink href="/quiz" variant="secondary">
              Test yourself in the quiz
            </ButtonLink>
          </div>
        </Container>
      </Section>
    </>
  );
}
