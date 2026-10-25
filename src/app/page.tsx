import Link from "next/link";
import {
  Activity,
  ArrowRight,
  Award,
  BookOpen,
  Droplets,
  FlaskConical,
  GraduationCap,
  HeartPulse,
  Megaphone,
  Repeat,
  ShieldCheck,
  Timer,
  Users,
  Wind,
  Zap,
} from "lucide-react";
import {
  ButtonLink,
  Card,
  Container,
  CourtLines,
  EcgLine,
  Eyebrow,
  Section,
  SectionHeading,
  SourceList,
} from "@/components/ui";
import { HeartDiagram } from "@/components/heart/heart-diagram";
import { warningSigns } from "@/content/warning-signs";
import { facts } from "@/content/labs";
import { getReference } from "@/content/references";

const journey = [
  { href: "/explore-your-heart", icon: HeartPulse, title: "Explore", text: "Learn the chambers, valves, and vessels, and follow blood around the body.", cta: "Explore your heart" },
  { href: "/athlete-health", icon: BookOpen, title: "Learn", text: "Ten athlete-health topics, each with an interactive tool and a knowledge check.", cta: "Start the topics" },
  { href: "/heart-lab", icon: FlaskConical, title: "Experiment", text: "Five hands-on simulations that make heart science visible.", cta: "Enter the lab" },
  { href: "/quiz", icon: GraduationCap, title: "Prove it", text: "Take the Knowledge Challenge and the What Would You Do? scenarios.", cta: "Take the quiz" },
];

const labs = [
  { href: "/heart-lab#heartbeat", icon: HeartPulse, title: "Heartbeat Simulator", text: "Watch illustrative heart rates change from rest to a sprint." },
  { href: "/heart-lab#blood-flow", icon: Droplets, title: "Blood Flow Explorer", text: "Follow oxygen-rich and oxygen-poor blood, step by step." },
  { href: "/heart-lab#sports", icon: Activity, title: "Exercise & Your Heart", text: "Compare the cardiovascular demands of eight sports." },
  { href: "/heart-lab#recovery", icon: Timer, title: "Recovery Explorer", text: "Adjust intensity and see a simulated recovery curve." },
  { href: "/heart-lab#myths", icon: Repeat, title: "Myth vs. Fact", text: "Flip the cards and bust common heart myths." },
];

export default function Home() {
  return (
    <>
      {/* HERO — the id marks the home page for RouteRecovery */}
      <div id="home-page" className="relative overflow-hidden bg-navy text-white">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <CourtLines className="absolute inset-0 h-full w-full text-white/[0.05]" />
          <div className="absolute -left-40 top-20 size-[32rem] rounded-full bg-heart/20 blur-3xl" />
          <div className="absolute -right-20 -top-20 size-[28rem] rounded-full bg-cyan/15 blur-3xl" />
        </div>
        <Container className="relative grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:py-28">
          <div>
            <p className="font-display text-sm font-bold uppercase tracking-[0.25em] text-cyan">
              Train Smart · Play Strong · Know Your Heart
            </p>
            <h1 className="mt-4 font-display text-6xl font-extrabold uppercase leading-[0.85] tracking-tight sm:text-7xl lg:text-8xl">
              Your heart.
              <br />
              Your game.
              <br />
              <span className="text-heart">Your future.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-white/80 text-pretty">
              Every athlete trains their body. Great athletes also understand their heart. Discover the science behind
              cardiovascular health, performance, and playing safely.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/explore-your-heart">
                Explore Your Heart <ArrowRight aria-hidden className="size-4" />
              </ButtonLink>
              <ButtonLink href="/heart-lab" variant="onDark">
                Enter the Heart Lab <FlaskConical aria-hidden className="size-4" />
              </ButtonLink>
            </div>
            <EcgLine className="mt-12 h-14 w-full max-w-xl text-heart" />
          </div>
          <div className="relative mx-auto w-full max-w-md">
            <div aria-hidden className="absolute inset-8 rounded-full bg-heart/20 blur-3xl" />
            <div className="relative rounded-3xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur">
              <div data-theme="dark" className="bg-transparent text-white">
                <HeartDiagram showFlow className="heart-pulse h-auto w-full" />
              </div>
              <p className="mt-2 text-center text-xs text-white/60">
                Schematic heart with animated blood flow ·{" "}
                <span className="text-[color:var(--oxy-rich)]">oxygen-rich</span> /{" "}
                <span className="text-[color:var(--oxy-poor)]">oxygen-poor</span>
              </p>
            </div>
          </div>
        </Container>
      </div>

      {/* A. WHY YOUR HEART MATTERS */}
      <Section aria-labelledby="why-heading">
        <Container>
          <SectionHeading
            id="why-heading"
            eyebrow="Why your heart matters"
            title="The engine behind every play"
            intro="Your cardiovascular system — heart, blood, and blood vessels — delivers the oxygen and fuel your muscles burn, carries away waste, and helps you recover for the next rep."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              { icon: Wind, title: "Delivers oxygen", text: "Every beat pushes oxygen-rich blood from your lungs to working muscles, your brain, and your organs." },
              { icon: Zap, title: "Clears waste", text: "Blood carries carbon dioxide and other by-products away from muscles so they can keep working." },
              { icon: Repeat, title: "Powers recovery", text: "After effort, circulation restores balance, cools you down, and supports repair between sessions." },
            ].map(({ icon: Icon, title, text }) => (
              <Card key={title}>
                <Icon aria-hidden className="size-8 text-red-ink" />
                <h3 className="mt-4 font-display text-2xl font-bold uppercase">{title}</h3>
                <p className="mt-2 text-fg-muted">{text}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* B. HEART HEALTH AND SPORTS */}
      <Section tone="elevated" aria-labelledby="sports-heading">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              id="sports-heading"
              eyebrow="Heart health and sports"
              title="What happens when you hit the field"
              intro="When you start moving, your heart rate climbs, each beat pumps more blood, and blood is redirected toward working muscles. When you stop, your heart rate starts to come back down."
            />
            <ButtonLink href="/athlete-health" variant="secondary" className="mt-8">
              Learn the science <ArrowRight aria-hidden className="size-4" />
            </ButtonLink>
          </div>
          <ol className="grid gap-4">
            {[
              { n: "01", title: "Heart rate rises", text: "Nerve signals and adrenaline speed up the heart to meet demand." },
              { n: "02", title: "Circulation shifts", text: "Vessels in working muscles widen; blood is redirected where it's needed." },
              { n: "03", title: "Oxygen delivery climbs", text: "Heart rate × blood per beat = cardiac output, which can rise several-fold." },
              { n: "04", title: "Recovery follows", text: "After you stop, heart rate falls quickly at first, then gradually." },
            ].map((s) => (
              <li key={s.n} className="flex gap-4 rounded-2xl border border-line bg-bg-elev p-5">
                <span className="font-display text-3xl font-extrabold text-cyan-ink">{s.n}</span>
                <div>
                  <p className="font-bold">{s.title}</p>
                  <p className="text-sm text-fg-muted">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* C. WARNING SIGNS */}
      <Section tone="navy" aria-labelledby="warn-heading" className="relative overflow-hidden">
        <Container className="relative">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <Eyebrow tone="red">Know the warning signs</Eyebrow>
              <h2 id="warn-heading" className="mt-2 font-display text-5xl font-extrabold uppercase leading-[0.9]">
                Symptoms you should <span className="text-heart">never</span> ignore
              </h2>
              <p className="mt-4 text-white/80">
                If you notice any of these, <strong className="text-white">stop the activity, tell a coach or parent, and get evaluated</strong>{" "}
                by a healthcare professional. If someone collapses, call 911.
              </p>
              <ButtonLink href="/warning-signs" className="mt-8">
                See all warning signs <ShieldCheck aria-hidden className="size-4" />
              </ButtonLink>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {warningSigns.map((w) => (
                <li key={w.id} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <p className="font-bold text-white">{w.title}</p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* D. LAB PREVIEW */}
      <Section aria-labelledby="lab-heading">
        <Container>
          <SectionHeading
            id="lab-heading"
            eyebrow="Interactive Heart Lab"
            title="Experiment. Explore. Understand."
            intro="Five hands-on simulations that turn heart science into something you can see and play with."
          />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {labs.map(({ href, icon: Icon, title, text }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="group flex h-full flex-col rounded-2xl border border-line bg-bg-elev p-5 transition hover:-translate-y-1 hover:border-cyan"
                >
                  <Icon aria-hidden className="size-7 text-cyan-ink" />
                  <span className="mt-4 font-display text-xl font-bold uppercase leading-tight">{title}</span>
                  <span className="mt-2 flex-1 text-sm text-fg-muted">{text}</span>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-red-ink">
                    Open lab <ArrowRight aria-hidden className="size-4 transition group-hover:translate-x-1" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* E. LEARNING JOURNEY */}
      <Section tone="elevated" aria-labelledby="journey-heading">
        <Container>
          <SectionHeading
            id="journey-heading"
            eyebrow="Athlete learning journey"
            title="Learn it. Try it. Prove it."
            intro="Follow the path from heart basics to game-day safety. Knowledge checks and quizzes give instant feedback, and your dashboard tracks your progress. No account needed — it all stays on your device."
          />
          <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {journey.map((step, i) => (
              <li key={step.href}>
                <Link
                  href={step.href}
                  className="group flex h-full flex-col rounded-2xl border border-line bg-bg-elev p-6 transition hover:-translate-y-1 hover:border-cyan"
                >
                  <span className="font-display text-sm font-bold uppercase tracking-[0.2em] text-cyan-ink">Step {i + 1}</span>
                  <step.icon aria-hidden className="mt-3 size-8 text-red-ink" />
                  <span className="mt-3 font-display text-3xl font-extrabold uppercase leading-none">{step.title}</span>
                  <span className="mt-2 flex-1 text-sm text-fg-muted">{step.text}</span>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-red-ink">
                    {step.cta} <ArrowRight aria-hidden className="size-4 transition group-hover:translate-x-1" />
                  </span>
                </Link>
              </li>
            ))}
          </ol>
          <ButtonLink href="/dashboard" variant="secondary" className="mt-8">
            View my progress <Award aria-hidden className="size-4" />
          </ButtonLink>
        </Container>
      </Section>

      {/* F. FACTS */}
      <Section aria-labelledby="facts-heading">
        <Container>
          <SectionHeading
            id="facts-heading"
            eyebrow="Featured heart health facts"
            title="Numbers worth knowing"
            intro="Every fact links to its source. Content is awaiting qualified clinical review before public launch."
          />
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {facts.map((f) => {
              const ref = getReference(f.source);
              return (
                <li key={f.id}>
                  <Card className="flex h-full flex-col">
                    <p className="font-display text-5xl font-extrabold text-red-ink">{f.stat}</p>
                    <p className="mt-2 flex-1 text-fg-muted">{f.text}</p>
                    <a
                      href={ref.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 text-xs text-fg-muted underline underline-offset-2 hover:text-fg"
                    >
                      Source: {ref.organization}
                      <span className="sr-only"> — {ref.title} (opens in a new tab)</span>
                    </a>
                  </Card>
                </li>
              );
            })}
          </ul>
        </Container>
      </Section>

      {/* G. PARENTS AND COACHES */}
      <Section tone="elevated" aria-labelledby="adults-heading">
        <Container>
          <SectionHeading
            id="adults-heading"
            eyebrow="Parent and coach resources"
            title="Support the athletes in your life"
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <Card>
              <Users aria-hidden className="size-8 text-cyan-ink" />
              <h3 className="mt-4 font-display text-3xl font-bold uppercase">For parents & guardians</h3>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-fg-muted">
                <li>Gather your family heart history</li>
                <li>Prepare for sports physicals</li>
                <li>Know which symptoms need a doctor</li>
              </ul>
              <ButtonLink href="/resources#parents" variant="secondary" className="mt-6">
                Parent resources <BookOpen aria-hidden className="size-4" />
              </ButtonLink>
            </Card>
            <Card>
              <Megaphone aria-hidden className="size-8 text-red-ink" />
              <h3 className="mt-4 font-display text-3xl font-bold uppercase">For coaches & trainers</h3>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-fg-muted">
                <li>Build and rehearse an emergency action plan</li>
                <li>Make reporting symptoms the norm</li>
                <li>Know your AED locations</li>
              </ul>
              <ButtonLink href="/resources#coaches" variant="secondary" className="mt-6">
                Coach resources <BookOpen aria-hidden className="size-4" />
              </ButtonLink>
            </Card>
          </div>
          <SourceList ids={["aap-sca-young", "aap-sca-schools"]} className="mt-8" />
        </Container>
      </Section>
    </>
  );
}
