import { AppBreadcrumb, PageHeader } from '@/components/shared';
import { CircleQuestionMark } from 'lucide-react';
import React from 'react';
import { getExamQuestions } from '@/lib/utils/get-questions';
import { ExamHeader, ExamResult, QuestionForm } from './_components';
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { QuestionsProvider } from './_provider/questions-provider';

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

    const data: MapQuestionsResponse | null = await getExamQuestions(exam_id);

    if (!data) {
        return null
    }

    const { subjectName, examName, questions } = data;

    const cookieStore = cookies();
    const examCompletedCookie = cookieStore.get("examCompleted");
    const isExamCompleted = examCompletedCookie?.value === "true";

    const CURRENT_STEP: Step = step || "/";

    if (!isExamCompleted && CURRENT_STEP !== "/") {
        redirect(`/${subject_id}`);
        return null;
    }

    const STEPS_MAP: Record<Step, JSX.Element> = {
        "/": <QuestionForm data={data} />,
        "result": <ExamResult />,
    };

    return (
        <section className="flex flex-col gap-6">
            <AppBreadcrumb
                paths={[
                    { name: "Exams", href: `/${subject_id}` },
                    { name: "Question" },
                ]}
            />
            <div className="px-6">
                <PageHeader
                    Icon={CircleQuestionMark}
                    title={`[${examName}] Questions ${subjectName}`}
                    back={true}
                    backHref={`/${subject_id}`}
                />

                <QuestionsProvider questions={questions}>
                    <section className="m-6 p-6 bg-white">
                        <ExamHeader data={data} />
                        {STEPS_MAP[CURRENT_STEP]}
                    </section>
                </QuestionsProvider>

            </div>
        </section>
    );
}
