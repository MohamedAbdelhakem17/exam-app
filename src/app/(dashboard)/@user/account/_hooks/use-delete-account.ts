"use client";
import { useMutation } from "@tanstack/react-query";
import { deleteUserAccount } from "../_actions/account.action";

export default function useDeleteAccount() {
  const {
    mutate: deleteProfile,
    isPending,
    error,
  } = useMutation({
    mutationKey: ["edit-profile"],

    mutationFn: async () => {
      const payload: ApiResponse<null> = (await deleteUserAccount())!;

      if ("code" in payload) {
        throw new Error(payload.message);
      }
    },

    onSuccess: () => {
      localStorage.clear();
      sessionStorage.clear();
    },
  });

  return { deleteProfile, isPending, error };
}
