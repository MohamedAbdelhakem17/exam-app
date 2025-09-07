"use client";

import React, { createContext, ReactNode, useState } from "react";
import { questionsValues } from "@/lib/schemes/questions.schema";

// Context Type
export const QuestionsContext = createContext<{
  currentIndex: number;
  currentQuestion: QuestionType;
  answers: Answer[];
  saveAnswers: (data: questionsValues) => void;
  handleNextQuestion: (callback: (answer: string) => void) => void;
  handlePreviousQuestion: (callback: (answer: string) => void) => void;
  questions: QuestionType[];
} | null>(null);

type ProviderProps = {
  children: ReactNode;
  questions: QuestionType[];
};

/**
 * @summary Context for managing exam questions:
 * - Save user answers
 * - Track the current question index
 * - Navigate between next and previous questions
 *
 * @param param0 React node element (JSX)
 * @param param1 Array of questions with type QuestionType
 *
 * @type QuestionType = {
 *   _id: string;
 *   createdAt: string;
 *   answers: QuestionAnswer[];
 *   correct: string;
 *   question: string;
 * }
 *
 * @returns currentIndex - Index of the currently displayed question
 * @returns answers - Array of user answers retrieved from session storage
 * @returns saveAnswers - Function to save a selected answer and persist it in session storage
 * @returns handleNextQuestion - Function to navigate to the next question
 * @returns handlePreviousQuestion - Function to navigate to the previous question
 */
export const QuestionsProvider = ({ children, questions }: ProviderProps) => {
  const setStorage = (key: string, value: unknown) => {
    sessionStorage.setItem(key, JSON.stringify(value));
  };

  const getStorage = <T,>(key: string, fallback: T): T => {
    const saved = sessionStorage.getItem(key);
    return saved ? (JSON.parse(saved) as T) : fallback;
  };

  const [answers, setAnswers] = useState<Answer[]>(() =>
    getStorage<Answer[]>("answers", [])
  );

  const [currentIndex, setCurrentIndex] = useState<number>(() =>
    getStorage<number>("currentIndex", 0)
  );

  const currentQuestion = questions[currentIndex];

  const saveAnswers = (data: questionsValues) => {
    setAnswers((prev) => {
      const updated = [
        ...prev.filter((a) => a.questionId !== currentQuestion._id),
        { questionId: currentQuestion._id, correct: data.answer },
      ];
      sessionStorage.setItem("answers", JSON.stringify(updated));
      return updated;
    });
  };

  const handleNextQuestion = (callback: (answer: string) => void) => {
    const nextIndex = currentIndex + 1;
    if (nextIndex >= questions.length) return;

    setStorage("currentIndex", nextIndex);
    setCurrentIndex(nextIndex);

    const savedAnswer =
      answers.find((a) => a.questionId === questions[nextIndex]._id)?.correct ||
      "";

    callback(savedAnswer);
  };

  const handlePreviousQuestion = (callback: (answer: string) => void) => {
    const prevIndex = currentIndex - 1;
    if (prevIndex < 0) return;

    setStorage("currentIndex", prevIndex);
    setCurrentIndex(prevIndex);

    const savedAnswer =
      answers.find((a) => a.questionId === questions[prevIndex]._id)?.correct ||
      "";

    callback(savedAnswer);
  };

  return (
    <QuestionsContext.Provider
      value={{
        currentIndex,
        currentQuestion,
        answers,
        saveAnswers,
        handleNextQuestion,
        handlePreviousQuestion,
        questions,
      }}
    >
      {children}
    </QuestionsContext.Provider>
  );
};
