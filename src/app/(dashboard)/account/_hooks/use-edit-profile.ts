"use client";
import { EditUserDataValues } from "@/lib/schemes/auth.schema";
import { useMutation } from "@tanstack/react-query";
import { editUserData } from "../_actions/account.action";

export default function useEditProfile() {
  const {
    mutate: editProfile,
    isPending,
    error,
  } = useMutation({
    mutationKey: ["edit-profile"],

    mutationFn: async (data: EditUserDataValues) => {
      const payload: ApiResponse<EditProfileResponse> = (await editUserData(
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

  return { editProfile, isPending, error };
}
