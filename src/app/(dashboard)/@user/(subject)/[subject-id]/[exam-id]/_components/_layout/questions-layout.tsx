"use client";

import { useExamSession } from "@/hooks/use-exam-session";
import { useState } from "react";
import ExamResult from "../_steps/exam-result";
import QuestionsForm from "../_steps/questions-form";
import ExamHeader from "./exam-header";

export default function QuestionsLayout({ data }: { data: ExamData }) {
  const [examResult, setExamResult] = useState<ExamResultType | null>(null);
  const durationSeconds = Number.isFinite(Number(data.duration))
    ? Math.max(0, Math.floor(Number(data.duration) * 60))
    : 0;

  const {
    currentIndex,
    setCurrentIndex,
    isExamComplete,
    setIsExamComplete,
    timer,
    isLoaded,
  } = useExamSession({ timerDuration: durationSeconds });
  const STEPS = {
    question: (
      <QuestionsForm
        currentQuestion={data.questions[currentIndex]}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        totalQuestions={data.questions.length}
        setIsExamComplete={setIsExamComplete}
        setExamResult={setExamResult}
        timer={timer}
        totalDurationSeconds={durationSeconds}
      />
    ),
    result: <ExamResult result={examResult} />,
  };

  const currentStep = isExamComplete ? STEPS.result : STEPS.question;

  if (!isLoaded) {
    return <div>Loading exam...</div>;
  }

  return (
    <section className="flex flex-col gap-6 min-w-full ">
      <ExamHeader currentIndex={currentIndex} data={data} />

      {/* Content */}
      <div className="md:px-5 bg-white my-2 px-3">{currentStep}</div>
    </section>
  );
}
