"use client";
import { useContext } from "react";
import { QuestionsContext } from "../_provider/questions-provider";

export const useQuestions = () => {
  const context = useContext(QuestionsContext);

  if (!context)
    throw new Error(
      "useQuestionsContext must be used within QuestionsProvider"
    );

  return context;
};
