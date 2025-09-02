"use client"

import React from 'react'
import useExams from '../../_hooks/use-exams'
import Link from 'next/link'

export default function ExamList({ subject }: { subject: string }) {
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isError, error, isLoading } = useExams({ subject })
    const allSubjects = data?.pages.flatMap(page => page.exams) || []
    console.log(data)

    const subjectID = subject
    return (
        <div>ExamList

            <ul>
                {allSubjects.map(subject => (
                    <li key={subject?._id}>
                        <Link href={`/${ subjectID }/${subject._id}`}>{subject?.title}</Link>
                    </li>
                ))
                }
            </ul>
        </div>

    )
}
