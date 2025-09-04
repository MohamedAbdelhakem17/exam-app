import { z } from "zod";

export const questionsSchema = z.object({
    answer: z.string().nonempty("Please select an answer"),
})


export type questionsValues = z.infer<typeof questionsSchema>;
