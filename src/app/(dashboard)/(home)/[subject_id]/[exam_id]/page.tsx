import { AppBreadcrumb, PageHeader } from '@/components/shared'
import { CircleQuestionMark } from 'lucide-react'
import React from 'react'

export default function QuestionPage({ params: { exam_id, subject_id } }: { params: { exam_id: string, subject_id: string } }) {

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
                    title={`[CSS Quiz] Questions`}
                    back={true}
                    backHref={`/${subject_id}`}
                />
            </div>

        </section>

    )
}
