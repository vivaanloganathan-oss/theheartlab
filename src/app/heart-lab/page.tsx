import type { Metadata } from "next";
import { Suspense } from "react";
import { Activity, Droplets, HeartPulse, Repeat, Timer } from "lucide-react";
import { Container, PageHero, ReviewBadge, Section, SectionHeading, SourceList } from "@/components/ui";
import { HeartbeatSimulator } from "@/components/lab/heartbeat-simulator";
import { BloodFlowExplorer } from "@/components/lab/blood-flow-explorer";
import { SportsExplorer } from "@/components/lab/sports-explorer";
import { RecoveryExplorer } from "@/components/lab/recovery-explorer";
import { MythFact } from "@/components/lab/myth-fact";
import { labsMeta } from "@/content/labs";

export const metadata: Metadata = {
  title: "Interactive Heart Lab",
  description:
    "Heartbeat simulator, blood-flow explorer, sports demands, heart-rate recovery explorer, and myth-vs-fact cards.",
};

const labNav = [
  { id: "heartbeat", label: "Heartbeat Simulator", icon: HeartPulse },
  { id: "blood-flow", label: "Blood Flow Explorer", icon: Droplets },
  { id: "sports", label: "Exercise & Your Heart", icon: Activity },
  { id: "recovery", label: "Recovery Explorer", icon: Timer },
  { id: "myths", label: "Myth vs. Fact", icon: Repeat },
];

export default function HeartLabPage() {
  return (
    <>
      <PageHero
        eyebrow="Interactive Heart Lab"
        title={
          <>
            Experiment with your <span className="text-cyan">heart science</span>
          </>
        }
        intro="Five hands-on labs. Every number here is a simulated, educational illustration — not a personal measurement, diagnosis, or sports clearance."
      >
        <nav aria-label="Labs">
          <ul className="flex flex-wrap gap-2">
            {labNav.map(({ id, label, icon: Icon }, i) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white/85 hover:border-cyan hover:text-white"
                >
                  <Icon aria-hidden className="size-4 text-cyan" />
                  Lab {i + 1}: {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      <Section id="heartbeat" aria-labelledby="lab1" className="scroll-mt-28">
        <Container>
          <SectionHeading
            id="lab1"
            eyebrow="Lab 1"
            title="Heartbeat Simulator"
            intro="Choose an activity level to see how an illustrative heart rate and a stylized ECG-style trace change."
          />
          <div className="mt-10">
            <HeartbeatSimulator />
          </div>
        </Container>
      </Section>

      <Section id="blood-flow" tone="elevated" aria-labelledby="lab2" className="scroll-mt-28">
        <Container>
          <SectionHeading
            id="lab2"
            eyebrow="Lab 2"
            title="Blood Flow Explorer"
            intro="Follow oxygen-poor and oxygen-rich blood through the heart. Step through the tour, filter by blood type, or select any chamber or vessel."
          />
          <div className="mt-10">
            <BloodFlowExplorer />
          </div>
        </Container>
      </Section>

      <Section id="sports" aria-labelledby="lab3" className="scroll-mt-28">
        <Container>
          <SectionHeading
            id="lab3"
            eyebrow="Lab 3"
            title="Exercise and Your Heart"
            intro="Pick a sport to explore its typical cardiovascular demands and the training adaptations it encourages."
          />
          <div className="mt-10">
            <Suspense fallback={<div className="h-96 animate-pulse rounded-3xl bg-bg-sunken" />}>
              <SportsExplorer />
            </Suspense>
          </div>
        </Container>
      </Section>

      <Section id="recovery" tone="elevated" aria-labelledby="lab4" className="scroll-mt-28">
        <Container>
          <SectionHeading
            id="lab4"
            eyebrow="Lab 4"
            title="Heart Rate Recovery Explorer"
            intro="Adjust the illustrative starting heart rate, exercise intensity, and recovery time. The simulated chart updates instantly."
          />
          <div className="mt-10">
            <RecoveryExplorer />
          </div>
        </Container>
      </Section>

      <Section id="myths" aria-labelledby="lab5" className="scroll-mt-28">
        <Container>
          <SectionHeading
            id="lab5"
            eyebrow="Lab 5"
            title="Myth vs. Fact"
            intro="Think you know the truth? Flip each card to find out."
          />
          <div className="mt-10">
            <MythFact />
          </div>
          <div className="mt-12 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-end sm:justify-between">
            <SourceList ids={labsMeta.sources} />
            <ReviewBadge review={labsMeta.review} />
          </div>
        </Container>
      </Section>
    </>
  );
}
