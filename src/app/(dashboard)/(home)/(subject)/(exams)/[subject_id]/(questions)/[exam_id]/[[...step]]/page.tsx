import { AppBreadcrumb, PageHeader } from "@/components/shared";
import { CircleQuestionMark } from "lucide-react";
import React, { Suspense } from "react";
import { getExamQuestions } from "@/lib/utils/get-questions";
import {
  ExamHeader,
  ExamResult,
  QuestionForm,
  QuizQuestionSkeleton,
  ResultsSkeleton,
} from "./_components";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { QuestionsProvider } from "./_provider/questions-provider";

type Step = "/" | "result";

type QuestionPageProps = {
  params: {
    exam_id: string;
    subject_id: string;
    step?: Step;
  };
};

export default async function QuestionPage({
  params: { exam_id, subject_id, step },
}: QuestionPageProps) {
  // Query
  const data: MapQuestionsResponse | null = await getExamQuestions(exam_id);

  // No data
  if (!data) {
    return null;
  }

  // Variables
  const { subjectName, examName, questions } = data;
  const cookieStore = cookies();
  const examCompletedCookie = cookieStore.get("examCompleted");
  const isExamCompleted = examCompletedCookie?.value === "true";
  const CURRENT_STEP: Step = step || "/";

  // Prevent access to result if exam not completed
  if (!isExamCompleted && CURRENT_STEP !== "/") {
    redirect(`/${subject_id}`);
    return null;
  }

  // Steps
  const STEPS_MAP: Record<Step, JSX.Element> = {
    "/": (
      <Suspense fallback={<QuizQuestionSkeleton />}>
        <QuestionForm data={data} />
      </Suspense>
    ),
    result: (
      <Suspense fallback={<ResultsSkeleton />}>
        <ExamResult />
      </Suspense>
    ),
  };

  return (
    <section className="flex flex-col gap-6">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-gray-50 space-y-6">
        {/* Breadcrumb */}
        <AppBreadcrumb
          paths={[
            { name: "Exams", href: `/${subject_id}` },
            { name: "Questions" },
          ]}
        />

        {/* Page header */}
        <PageHeader
          Icon={CircleQuestionMark}
          title={`[${examName}] Questions - ${subjectName}`}
          back={true}
          backHref={`/${subject_id}`}
        />
      </header>

      {/* Content */}
      <div className="px-6 pb-6">
        <QuestionsProvider questions={questions}>
          <section className="p-6 bg-white rounded-lg shadow-sm">
            <ExamHeader data={data} />
            {STEPS_MAP[CURRENT_STEP]}
          </section>
        </QuestionsProvider>
      </div>
    </section>
  );
}
