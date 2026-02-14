import { confirmEmail } from "@/app/(auth)/_actions/auth.action";
import { ConfirmEmailValues } from "@/lib/schemes/auth.schema";
import { useMutation } from "@tanstack/react-query";

export default function useConfirmEmail() {
  const { mutate, isPending, error } = useMutation<
    SuccessResponse<object>,
    ErrorResponse,
    ConfirmEmailValues
  >({
    mutationKey: ["confirm-email"],

    mutationFn: async (data: ConfirmEmailValues) => {
      // Confirm Email
      const payload: ApiResponse<object> = await confirmEmail(data);

      // Error case
      if (!payload.status) {
        throw payload;
      }

      return payload;
    },
  });

  return { isPending, error, confirmEmail: mutate };
}
