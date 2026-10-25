import type { Metadata } from "next";
import { Callout, Container, PageHero, Section } from "@/components/ui";
import { QuizHub } from "@/components/learn/quiz-hub";

export const metadata: Metadata = {
  title: "Knowledge Challenge",
  description: "Test what you know about heart science and safety, then try the What Would You Do? scenario challenge.",
};

export default function QuizPage() {
  return (
    <>
      <PageHero
        eyebrow="Quiz & knowledge challenge"
        title={
          <>
            Test your <span className="text-heart">heart IQ</span>
          </>
        }
        intro="Multiple-choice, true/false, and scenario questions with instant explanations. Miss one? We'll point you to the right lesson."
      >
        <nav aria-label="Quizzes" className="flex flex-wrap gap-2">
          <a href="#knowledge-challenge" className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold hover:border-cyan">
            Knowledge Challenge
          </a>
          <a href="#what-would-you-do" className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold hover:border-cyan">
            What Would You Do?
          </a>
        </nav>
      </PageHero>
      <Section>
        <Container className="max-w-4xl">
          <Callout tone="info" className="mb-12">
            Scenario answers describe general emergency awareness. In a real emergency, call 911 — dispatchers will guide
            you. Results are saved only in this browser.
          </Callout>
          <QuizHub />
        </Container>
      </Section>
    </>
  );
}
