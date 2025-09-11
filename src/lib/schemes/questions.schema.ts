import { z } from "zod";

export const questionsSchema = z.object({
  answer: z.string(),
});

export type questionsValues = z.infer<typeof questionsSchema>;
