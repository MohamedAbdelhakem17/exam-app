"use client";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import useCheckQuestions from "@/app/(dashboard)/(subject)/_hooks/use-check-questions";
import { ApiFeedback } from "@/components/shared";
import {
  questionsSchema,
  questionsValues,
} from "@/lib/schemes/questions.schema";
import ExamTimer from "./../exam-timer";

type QuestionsFormProps = {
  currentQuestion: QuestionType;
  currentIndex: number;
  setCurrentIndex: (val: number | ((prev: number) => number)) => void;
  setIsExamComplete: (val: boolean) => void;
  setExamResult: (result: ExamResultType) => void;
  totalQuestions: number;
  timer: number;
  totalDurationSeconds: number;
};

export default function QuestionsForm({
  currentQuestion,
  currentIndex,
  setCurrentIndex,
  totalQuestions,
  setIsExamComplete,
  setExamResult,
  timer,
  totalDurationSeconds,
}: QuestionsFormProps) {
  // State
  const [answers, setAnswers] = useState<Answer[]>([]);
  const hasSubmittedRef = useRef(false);

  // Hooks
  const { isPending, error, checkQuestions } = useCheckQuestions();
  // Form and validation
  const form = useForm<questionsValues>({
    defaultValues: {
      answer:
        answers.find((a) => a.questionId === currentQuestion?._id)?.correct ||
        "",
    },
    resolver: zodResolver(questionsSchema),
  });

  // Functions
  const saveAnswer = (answer: string) => {
    if (!answer) return;

    setAnswers((prev) => {
      // check if answer for current question already exists
      const existingIndex = prev.findIndex(
        (a) => a.questionId === currentQuestion._id,
      );

      // if  exist
      if (existingIndex !== -1) {
        // update existing answer
        const newAnswers = [...prev];

        // set new answers
        newAnswers[existingIndex] = {
          ...newAnswers[existingIndex],
          correct: answer,
        };

        // return updated answers
        return newAnswers;
      }

      // else add new answer
      return [...prev, { questionId: currentQuestion._id, correct: answer }];
    });
  };

  const handleBackToPreviousQuestion = () => {
    // get answer
    saveAnswer(form.getValues("answer"));

    // go back
    setCurrentIndex(currentIndex - 1);
  };

  const buildAnswersWithCurrent = useCallback(
    (currentAnswer: string) => {
      const nextAnswers = [...answers];
      if (!currentAnswer) return nextAnswers;

      const existingIndex = nextAnswers.findIndex(
        (a) => a.questionId === currentQuestion._id,
      );

      if (existingIndex !== -1) {
        nextAnswers[existingIndex] = {
          ...nextAnswers[existingIndex],
          correct: currentAnswer,
        };
        return nextAnswers;
      }

      return [
        ...nextAnswers,
        { questionId: currentQuestion._id, correct: currentAnswer },
      ];
    },
    [answers, currentQuestion._id],
  );

  const submitExam = useCallback(
    (currentAnswer?: string) => {
      if (hasSubmittedRef.current) return;

      const answer = currentAnswer ?? form.getValues("answer");
      const allAnswers = buildAnswersWithCurrent(answer);
      const elapsedSeconds = Math.max(0, totalDurationSeconds - timer);

      hasSubmittedRef.current = true;

      checkQuestions(
        {
          answers: allAnswers,
          time: elapsedSeconds,
        },
        {
          onSuccess: (payload) => {
            setExamResult(payload as ExamResultType);
            setIsExamComplete(true);
          },
          onError: () => {
            hasSubmittedRef.current = false;
          },
        },
      );
    },
    [
      buildAnswersWithCurrent,
      checkQuestions,
      form,
      setExamResult,
      setIsExamComplete,
      timer,
      totalDurationSeconds,
    ],
  );

  const onSubmit = (values: questionsValues) => {
    // get answer
    const answer = values.answer;

    // Update or add the answer
    saveAnswer(answer);

    // Move to next question or submit
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Submit exam logic
      submitExam(answer);
    }
  };

  // Handle saved old answers
  useEffect(() => {
    // Get stored answer
    const storedAnswer =
      answers.find((a) => a.questionId === currentQuestion._id)?.correct || "";

    // set form value
    form.reset({ answer: storedAnswer });
  }, [answers, currentQuestion._id, form]);

  useEffect(() => {
    if (timer <= 0 && !isPending) {
      submitExam();
    }
  }, [timer, isPending, submitExam]);

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-6 p-4"
      >
        <>
          {/* Question */}
          <h2 className="md:text-2xl text:xl text-blue-600 font-semibold pt-6">
            {currentQuestion.question}
          </h2>

          {/* Answer field */}
          <FormField
            control={form.control}
            name="answer"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormControl>
                  {/* Input */}
                  <RadioGroup
                    value={field.value}
                    onValueChange={field.onChange}
                    className="flex flex-col gap-3"
                  >
                    {currentQuestion.answers.map((ans) => (
                      // Options
                      <FormItem
                        key={ans.key}
                        className="p-0 bg-gray-50 hover:bg-gray-100 cursor-pointer rounded"
                      >
                        {/* Answer label */}
                        <FormLabel
                          htmlFor={ans.key}
                          className="flex items-center gap-2.5 p-4 w-full cursor-pointer"
                        >
                          {/*  */}
                          <FormControl>
                            <RadioGroupItem id={ans.key} value={ans.key} />
                          </FormControl>

                          {/* title */}
                          <span className="font-normal  line-clamp-5">
                            {ans.answer}
                          </span>
                        </FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* API feedback */}
          <ApiFeedback>{error?.message as string}</ApiFeedback>

          {/* Actions */}
          <div className="flex justify-between items-center gap-4">
            {/* Previous */}
            <Button
              type="button"
              variant="secondary"
              disabled={currentIndex === 0}
              onClick={handleBackToPreviousQuestion}
            >
              {/* Icon */}
              <ChevronLeft className="me-1" />
              {/* label */}
              Previous
            </Button>

            {/* Timer */}
            <ExamTimer
              remainingSeconds={timer}
              totalSeconds={totalDurationSeconds}
            />

            {/* Submit / Next */}
            <Button
              type="submit"
              pending={isPending}
              disabled={!!error || !form.getValues("answer") || isPending}
            >
              {/* Label */}
              {currentIndex === totalQuestions - 1 ? "Submit" : "Next"}

              {/* icon */}
              <ChevronRight className="ms-1" />
            </Button>
          </div>
        </>
      </form>
    </FormProvider>
  );
}
