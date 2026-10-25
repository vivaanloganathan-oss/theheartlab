import type { Metadata } from "next";
import { Container, PageHero, Section } from "@/components/ui";
import { Dashboard } from "@/components/learn/dashboard";

export const metadata: Metadata = {
  title: "My Learning Dashboard",
  description: "Your knowledge checks, labs explored, and quiz results — stored privately in your browser.",
};

export default function DashboardPage() {
  return (
    <>
      <PageHero
        eyebrow="Personal learning dashboard"
        title={
          <>
            Your <span className="text-cyan">progress</span>
          </>
        }
        intro="Everything here lives only on this device. No account, no leaderboards, no health data — just your learning."
      />
      <Section className="pt-10 sm:pt-12">
        <Container>
          <Dashboard />
        </Container>
      </Section>
    </>
  );
}
