"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import {
  questionsSchema,
  questionsValues,
} from "@/lib/schemes/questions.schema";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ExamTimer from "./exam-timer";
import useCheckQuestions from "../_hooks/use-check-questions";
import { ApiError } from "@/app/(auth)/_components";
import { useQuestions } from "../_hooks/use-questions";
import { handleGoToExamResult } from "../_actions/check-questions.action";
import { usePathname, useRouter } from "next/navigation";

export default function QuestionForm({ data }: { data: ExamData }) {
  // Navigation
  const router = useRouter();
  const pathname = usePathname();
  const [subject_id, exam_id] = pathname.split("/").filter(Boolean);

  // Hooks
  const { isPending, error, checkQuestions } = useCheckQuestions();
  const {
    saveAnswers,
    answers,
    currentQuestion,
    currentIndex,
    handleNextQuestion,
    handlePreviousQuestion,
  } = useQuestions();

  // Form and Validation
  const form = useForm<questionsValues>({
    defaultValues: {
      answer:
        answers.find((a) => a.questionId === currentQuestion?._id)?.correct ||
        "",
    },
    resolver: zodResolver(questionsSchema),
  });

  // Variables
  const { duration, questions } = data;
  const { isSubmitting } = form.formState;

  // Functions
  const examSubmit = () => {
    checkQuestions(
      { answers, time: Number(duration) },
      {
        onSuccess: async (res) => {
          await handleGoToExamResult();

          localStorage.setItem("examResult", JSON.stringify(res));
          sessionStorage.removeItem("answers");
          sessionStorage.removeItem("examTime");

          router.replace(`/${subject_id}/${exam_id}/result`);
        },
      }
    );
  };

  const onSubmit: SubmitHandler<questionsValues> = (data) => {
    saveAnswers(data);

    if (currentIndex < questions.length - 1) {
      handleNextQuestion((value) => {
        form.reset({ answer: value });
      });
    } else {
      examSubmit();
    }
  };

  if (!currentQuestion) return <p>No questions found.</p>;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        {/* Question */}
        <h2 className="text-2xl text-blue-600 font-semibold pt-6">
          {currentQuestion.question}
        </h2>

        {/* Answer field */}
        <FormField
          control={form.control}
          name="answer"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="flex flex-col gap-3"
                >
                  {/* Answers selection */}
                  {currentQuestion.answers.map((ans) => (
                    <FormItem
                      key={ans.key}
                      className="p-0 bg-gray-50 hover:bg-gray-100 cursor-pointer rounded"
                    >
                      {/* Label */}
                      <FormLabel
                        htmlFor={ans.key}
                        className="flex items-center gap-2.5 p-4 w-full cursor-pointer"
                      >
                        {/* Input */}
                        <FormControl>
                          <RadioGroupItem id={ans.key} value={ans.key} />
                        </FormControl>

                        <span className="font-normal">{ans.answer}</span>
                      </FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>

              {/* Feedback */}
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Api feedback */}
        {error && <ApiError>{error.message}</ApiError>}

        {/* Actions button */}
        <div className="flex justify-between items-center gap-4">
          {/* Previous question button */}
          <Button
            type="button"
            variant="secondary"
            disabled={currentIndex === 0}
            onClick={() => {
              handlePreviousQuestion((value) => {
                form.reset({ answer: value });
              });
            }}
          >
            <ChevronLeft /> Previous
          </Button>

          {/* Exam timer  */}
          <ExamTimer
            duration={Number(duration)}
            examSubmit={() => console.log("")}
          />

          {/* submit and next question button */}
          <Button
            type="submit"
            disabled={isSubmitting || !form.getValues("answer") || isPending}
          >
            {currentIndex === questions.length - 1 ? "Finish" : "Next"}{" "}
            <ChevronRight />
          </Button>
        </div>
      </form>
    </Form>
  );
}
