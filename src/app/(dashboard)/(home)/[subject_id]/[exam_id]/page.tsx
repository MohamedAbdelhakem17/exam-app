import { AppBreadcrumb, PageHeader } from '@/components/shared'
import { CircleQuestionMark } from 'lucide-react'
import React from 'react'
import { getExamQuestions } from '@/lib/utils/get-questions'
import MultiQuestionForm from './_components/questions-form';

export default async function QuestionPage({ params: { exam_id, subject_id } }: { params: { exam_id: string, subject_id: string } }) {
    const data = await getExamQuestions(exam_id);

    if (!data) {
        throw new Error("Exam not found");
    }

    const { subjectName, examName } = data;

    console.log(data)
    return (
        <section className="flex flex-col gap-6 ">
            <AppBreadcrumb
                paths={[
                    { name: "Exams", href: `/${subject_id}` },
                    { name: "Question" },
                ]}
            />
            <div className=" px-6">

                <PageHeader
                    Icon={CircleQuestionMark}
                    title={`[${examName}] Questions ${subjectName}`}
                    back={true}
                    backHref={`/${subject_id}`}
                />

                <MultiQuestionForm data={data} />
            </div>

        </section>

    )
}
