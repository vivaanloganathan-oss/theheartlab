"use client";

import { QuizEngine } from "./quiz-engine";
import { congenitalQuiz } from "@/content/congenital";
import { useProgress } from "@/lib/progress";

export function CongenitalQuiz() {
  const { recordQuiz } = useProgress();
  return <QuizEngine questions={congenitalQuiz} onFinish={(score, total) => recordQuiz("congenital", score, total)} />;
}
