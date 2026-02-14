import { verifyEmail } from "@/app/(auth)/_actions/auth.action";
import { VerifyEmailValues } from "@/lib/schemes/auth.schema";
import { useMutation } from "@tanstack/react-query";

export default function useVerifyEmail() {
  const { mutate, isPending, error } = useMutation<
    SuccessResponse<object>,
    ErrorResponse,
    VerifyEmailValues
  >({
    mutationKey: ["verify-email"],

    mutationFn: async (data: VerifyEmailValues) => {
      // Verify Email
      const payload: ApiResponse<object> = await verifyEmail(data);

      // Error case
      if (!payload.status) {
        throw payload;
      }

      return payload;
    },
  });

  return { isPending, error, verifyEmail: mutate };
}
