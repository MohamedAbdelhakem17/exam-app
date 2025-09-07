"use client";

import { useEffect, useState } from "react";
import { Pie, PieChart } from "recharts"


import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Button } from "@/components/ui/button";
import { FolderSearch, RotateCcw } from "lucide-react";



export default function ExamResult() {
  const [examResult, setExamResult] = useState<ExamResultType | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("examResult");
    if (saved) {
      try {
        setExamResult(JSON.parse(saved));
      } catch (error) {
        console.error("Invalid JSON in examResult:", error);
      }
    }
  }, []);

  if (!examResult) {
    return (
      <section className="m-6 p-6 text-gray-500">No exam result found.</section>
    );
  }

  const correct = examResult.correct;
  const wrong = examResult.wrong;


  const chartData = [
    { name: "Correct", value: correct, fill: "#10b981" },
    { name: "Wrong", value: wrong, fill: "#ef4444" },
  ]


  const chartConfig = {
    correct: {
      label: "correct",
      color: "text-black",
    },
    wrong: {
      label: "Incorrect",
      color: "text-black",
    },
  } satisfies ChartConfig


  return (
    <>
      <h2 className="pt-6 pb-4 text-blue-600 font-semibold text-2xl">Results: </h2>

      <div className="flex gap-4 items-center">
        {/* Summary with Donut Chart */}
        <div className="w-1/4 ">
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
          <p className="font-semibold text-sm flex items-center">
            <span className="w-4 h-4 bg-emerald-500 inline-block me-1 mb-2.5" />
            Correct: {correct}
          </p>
          <p className="font-semibold text-sm flex items-center">
            <span className="w-4 h-4 bg-red-500 inline-block me-1" />
            Incorrect: {wrong}
          </p>
        </div>

        {/*  Questions */}
        <div className="w-3/4 max-h-answer overflow-y-scroll border border-gray-100 p-2 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-gray-50 custom-scroll">
          <ul className="space-y-4">
            {examResult.WrongQuestions.map((q) => (
              <li key={q.QID}>
                <p className="font-semibold text-xl text-blue-600 mb-2.5">{q.Question}</p>
                <div className="space-y-2.5">
                  {/* Wrong Answer */}
                  <div className="flex items-center gap-2.5 p-4 border rounded-md bg-red-50">
                    <div className="h-4 w-4 rounded-full border-2 border-red-600 flex items-center justify-center">
                      <div className="h-2.5 w-2.5 rounded-full bg-red-600" />
                    </div>
                    <span className="text-gray-800 text-sm">{q.correctAnswer}</span>
                  </div>

                  {/* Correct Answer */}
                  <div className="flex items-center gap-2.5 p-4 border rounded-md bg-green-50">
                    <div className="h-4 w-4  rounded-full border-2 border-green-600 flex items-center justify-center" />
                    <span className="text-gray-800 text-sm">{q.correctAnswer}</span>
                  </div>
                </div>

              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Actions  */}
      <div className="flex items-center gap-4 mt-4 py-6">
        {/*  Restart  */}
        <Button variant={"secondary"} className="flex-1">
          <RotateCcw />
          <span>Restart</span>
        </Button>

        {/* Explore */}
        <Button variant={"default"} className="flex-1">
          <FolderSearch />
          <span>Explore</span>
        </Button>
      </div>
    </>
  );

}



