"use client";

import { handleExamResult } from "@/app/(dashboard)/@user/(subject)/_actions/check-questions.action";
import { Button } from "@/components/ui/button";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { FolderSearch, RotateCcw } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Pie, PieChart } from "recharts";

export default function ExamResult({
  result,
}: {
  result: ExamResultType | null;
}) {
  // Navigate
  const router = useRouter();
  const pathname = usePathname();
  const [subject_id, exam_id] = pathname.split("/").filter(Boolean);

  // Variables
  const correct = result?.correct ?? 0;
  const wrong = result?.wrong ?? 0;

  const chartData = [
    { name: "Correct", value: correct, fill: "#10b981" },
    { name: "Wrong", value: wrong, fill: "#ef4444" },
  ];

  const chartConfig = {
    correct: {
      label: "correct",
      color: "text-black",
    },
    wrong: {
      label: "Incorrect",
      color: "text-black",
    },
  } satisfies ChartConfig;

  // Functions
  const cleanStorage = () => {
    sessionStorage.clear();
    localStorage.clear();
  };

  const resetExamSession = () => {
    sessionStorage.setItem("currentIndex", "0");
    sessionStorage.setItem("isExamComplete", JSON.stringify(false));
  };

  const handelRestartExam = async () => {
    await handleExamResult();
    cleanStorage();
    resetExamSession();
    router.replace(`/${subject_id}/${exam_id}`);
  };

  const handelExplorerExams = async () => {
    await handleExamResult();
    cleanStorage();
    router.replace("/");
  };

  if (!result) {
    return <p className="py-6 text-gray-600">Loading results...</p>;
  }

  return (
    <>
      {/*Result header */}
      <h2 className="pt-6 pb-4 text-blue-600 font-semibold text-2xl">
        Results:
      </h2>

      <div className="flex flex-col gap-6 items-start md:flex-row">
        {/* Summary with Donut Chart */}
        <div className="w-full md:w-1/4">
          {/* Chart */}
          <ChartContainer
            config={chartConfig}
            className="aspect-square max-h-52 mb-6"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
              />
            </PieChart>
          </ChartContainer>

          {/* Result status */}
          <div>
            {/* Total correct answers */}
            <p className="font-semibold text-sm flex items-center">
              <span className="w-4 h-4 bg-emerald-500 inline-block me-1 mb-2.5" />
              Correct: {correct}
            </p>

            {/* Total wrong answers */}
            <p className="font-semibold text-sm flex items-center">
              <span className="w-4 h-4 bg-red-500 inline-block me-1" />
              Incorrect: {wrong}
            </p>
          </div>
        </div>

        {/* Questions */}
        <div className="w-full md:w-3/4 max-h-answer overflow-y-auto border border-gray-100 p-2 md:p-4 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-gray-50 custom-scroll">
          <ul className="space-y-4">
            {result.WrongQuestions.map((question) => (
              <li key={question.QID}>
                {/* Question header */}
                <p className="font-semibold text-xl text-blue-600 mb-2.5">
                  {question.Question}
                </p>

                {/* Answers */}
                <div className="space-y-2.5">
                  {/* Wrong Answer */}
                  <div className="flex items-center gap-2.5 p-4 border rounded-md bg-red-50">
                    {/* Bullet */}
                    <div className="h-4 w-4 rounded-full border-2 border-red-600 flex items-center justify-center">
                      <div className="h-2.5 w-2.5 rounded-full bg-red-600" />
                    </div>

                    {/* Answer */}
                    <span className="text-gray-800 text-sm">
                      {question.inCorrectAnswer}
                    </span>
                  </div>

                  {/* Correct Answer */}
                  <div className="flex items-center gap-2.5 p-4 border rounded-md bg-green-50">
                    {/* Bullet */}
                    <div className="h-4 w-4  rounded-full border-2 border-green-600 flex items-center justify-center" />

                    {/* Answer */}
                    <span className="text-gray-800 text-sm">
                      {question.correctAnswer}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col items-stretch gap-4 mt-4 py-6 md:flex-row md:items-center">
        {/* Restart */}
        <Button
          variant={"secondary"}
          className="flex-1"
          onClick={handelRestartExam}
        >
          <RotateCcw />
          <span>Restart</span>
        </Button>

        {/* Explore */}
        <Button
          variant={"default"}
          className="flex-1"
          onClick={handelExplorerExams}
        >
          <FolderSearch />
          <span>Explore</span>
        </Button>
      </div>
    </>
  );
}
