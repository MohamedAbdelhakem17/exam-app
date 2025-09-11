"use client"

import React from 'react'
import { useQuestions } from '../_hooks/use-questions'
import { Progress } from "@/components/ui/progress"

export default function ExamHeader({ data }: { data: ExamData }) {
    const { subjectName, examName, questions } = data
    const { currentIndex } = useQuestions()

    return (
        <div className="flex flex-col">
            {/* Label */}
            <p className="flex items-center justify-between text-sm text-gray-500 font-normal mb-1.5">
                <span>{subjectName} - {examName}</span>
                <span>
                    Question <span className="text-blue-600 font-bold">{currentIndex + 1}</span> of {questions.length}
                </span>
            </p>

            {/* Progress Bar */}
            <Progress value={((currentIndex === questions.length - 1 ? currentIndex + 1 : currentIndex) / questions.length) * 100} />
        </div>
    )
}
