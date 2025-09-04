"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import {  useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form"

import {
  RadioGroup, RadioGroupItem,
} from "@/components/ui/radio-group"

import { ExamData } from "@/lib/utils/get-questions";
import { questionsSchema, questionsValues } from "@/lib/schemes/questions.schema"
import { Progress } from "@/components/ui/progress"
import { ChevronLeft, ChevronRight } from "lucide-react"
import ExamTimer from "./exam-timer"

type Answer = {
  questionId: string
  correct: string
}

type AnswerCheck = {
  answers: Answer[],
  time: number
}

export default function MultiQuestionForm({ data }: { data: ExamData }) {
  const { duration, examName, subjectName, questions } = data
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<AnswerCheck>({ answers: [], time: 0 })

  const currentQuestion = questions[currentIndex]

  const form = useForm<questionsValues>({
    defaultValues: {
      answer: answers.answers.find(a => a.questionId === currentQuestion?._id)?.correct || ""
    },
    resolver: zodResolver(questionsSchema),
  })

  const onSubmit: SubmitHandler<questionsValues> = (data) => {
    setAnswers(prev => ({
      ...prev,
      answers: [
        ...prev.answers.filter(a => a.questionId !== currentQuestion._id),
        { questionId: currentQuestion._id, correct: data.answer }
      ]
    }))

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1)
      form.reset({
        answer: answers.answers.find(a => a.questionId === questions[currentIndex + 1]._id)?.correct || ""
      })
    } else {
      console.log("All answers:", answers)
      alert("You finished the exam ✅")
    }
  }
  const { isSubmitting } = form.formState





  if (!currentQuestion) return <p>No questions found.</p>

  return (
    <section className="m-6 p-6">
      {/* Header  */}
      <div className="flex flex-col ">
        {/* Label  */}
        <p className="flex items-center justify-between text-sm text-gray-500 font-normal mb-1.5">
          <span>{subjectName} - {examName}</span>
          <span>Question <span className="text-blue-600 font-bold ">{currentIndex + 1}</span> of {questions.length}</span>
        </p>

        {/* Bar  */}
        <Progress value={((currentIndex === 9 ? currentIndex + 1 : currentIndex) / questions.length) * 100} />
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full  space-y-6">
          <h2 className="text-2xl text-blue-600 font-semibold pt-6">
            {currentQuestion.question}
          </h2>

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
                    {currentQuestion.answers.map((ans) => (
                      <FormItem
                        key={ans.key}
                        className="p-0 bg-gray-50 hover:bg-gray-100 cursor-pointer rounded"
                      >
                        <FormLabel
                          htmlFor={ans.key}
                          className="flex items-center gap-2.5 p-4 w-full cursor-pointer"
                        >
                          <FormControl>
                            <RadioGroupItem id={ans.key} value={ans.key} />
                          </FormControl>
                          <span className="font-normal">{ans.answer}</span>
                        </FormLabel>
                      </FormItem>
                    ))}


                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-between items-center gap-4">
            <Button
              type="button"
              variant="secondary"
              disabled={currentIndex === 0}
              onClick={() => {
                setCurrentIndex(prev => prev - 1)
                form.reset({
                  answer: answers.answers.find(a => a.questionId === questions[currentIndex - 1]._id)?.correct || ""
                })
              }}
            >
              <ChevronLeft />
              Previous
            </Button>

            <ExamTimer duration={Number(duration)} />
            <Button type="submit" disabled={isSubmitting || !form.getValues("answer")}>
              {currentIndex === questions.length - 1 ? "Finish" : "Next"}
              <ChevronRight />
            </Button>
          </div>
        </form>
      </Form>
    </section>

  )
}
