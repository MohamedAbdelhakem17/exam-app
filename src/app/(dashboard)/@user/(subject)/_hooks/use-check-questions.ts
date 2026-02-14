import { checkQuestions } from "@/app/(dashboard)/@user/(subject)/_actions/check-questions.action";
import { useMutation } from "@tanstack/react-query";

export default function useCheckQuestions() {
  const {
    mutate,
    isPending,
    error,
    data: checkQuestionsResult,
  } = useMutation({
    mutationKey: ["check-answers"],

    mutationFn: async (data: AnswerCheck) => {
      // Use Action
      const payload = await checkQuestions(data);

      //   Error case
      if ("code" in payload) {
        throw new Error(payload.message);
      }

      //   Success case
      return payload;
    },
  });

  return { isPending, error, checkQuestions: mutate, checkQuestionsResult };
}
