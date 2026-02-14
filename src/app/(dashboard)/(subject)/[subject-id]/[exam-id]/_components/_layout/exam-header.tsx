"use client";

import { Progress } from "@/components/ui/progress";

export default function ExamHeader({
  data,
  currentIndex,
}: {
  data: ExamData;
  currentIndex: number;
}) {
  // Variables
  const { subjectName, examName, questions } = data;

  return (
    <div className="flex flex-col">
      {/* Label */}
      <p className="flex items-center justify-between text-sm text-gray-500 font-normal mb-1.5">
        {/* Title */}
        <span>
          {subjectName} - {examName}
        </span>

        {/* Indicator */}
        <p className="flex items-center gap-1">
          {/* Label */}
          <span>Question</span>
          {/* Current question */}
          <span className="text-blue-600 font-bold">{currentIndex + 1}</span>

          {/* Total question */}
          <span>of {questions.length}</span>
        </p>
      </p>

      {/* Progress Bar */}
      <Progress
        value={
          ((currentIndex === questions.length - 1
            ? currentIndex + 1
            : currentIndex) /
            questions.length) *
          100
        }
      />
    </div>
  );
}
