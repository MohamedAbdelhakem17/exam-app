"use client";
import { EditUserPasswordValues } from "@/lib/schemes/auth.schema";
import { useMutation } from "@tanstack/react-query";
import { editUserPassword } from "../_actions/account.action";

export default function useEditPassword() {
  const {
    mutate: editPassword,
    isPending,
    error,
  } = useMutation({
    mutationKey: ["edit-profile"],

    mutationFn: async (data: EditUserPasswordValues) => {
      const payload: ApiResponse<{ token: string }> = (await editUserPassword(
        data
      ))!;

      if (!payload) {
        throw new Error("No response from server");
      }

      if ("code" in payload) {
        throw new Error(payload.message);
      }

      return payload;
    },
  });

  return { editPassword, isPending, error };
}
