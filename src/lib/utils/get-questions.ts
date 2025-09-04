"use server";

import "server-only";
import { REQUEST_HEADERS } from "@/lib/constants/request-headers.constant";
import { getToken } from '@/lib/utils/get-token';

export type QuestionAnswer = {
    answer: string;
    key: string;
};

export type QuestionType = {
    _id: string;
    createdAt: string;
    answers: QuestionAnswer[];
    correct: string;
    question: string
};

export type ExamData = {
    subjectName: string | null;
    examName: string | null;
    duration: string| null
    questions: QuestionType[];
};

export async function getExamQuestions(examId: string): Promise<ExamData | null> {
    const token = await getToken();
    if (!token) throw new Error("Unauthorized");

    const url = `${process.env.BASE_API_URL}/questions?exam=${examId}`;

    const response = await fetch(url, {
        headers: {
            token: token.token as string,
            ...REQUEST_HEADERS,
        },
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch questions: ${response.status}`);
    }

    const payload = await response.json();

    if (!payload?.questions?.length) {
        return null;
    }

    return {
        subjectName: payload.questions[0]?.subject?.name || null,
        examName: payload.questions[0]?.exam?.title || null,
        duration: payload.questions[0]?.exam?.duration || null ,
            questions: payload.questions.map(
            (q: QuestionType): QuestionType => ({
                question: q.question,
                _id: q._id,
                createdAt: q.createdAt,
                answers: q.answers,
                correct: q.correct,
            })
        ),
    };
}
