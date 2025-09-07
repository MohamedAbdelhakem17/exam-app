import { useMutation } from "@tanstack/react-query";
import { checkQuestions } from "../_actions/check-questions.action";


export default function useCheckQuestions() {
    const { mutate, isPending, error, data: checkQuestionsResult } = useMutation({
        mutationFn: async (data: AnswerCheck) => {
            const payload = await checkQuestions(data)
            if ("code" in payload) {
                throw new Error(payload.message)
            }
            return payload
        }
    })

    return { isPending, error, checkQuestions: mutate, checkQuestionsResult };

}
