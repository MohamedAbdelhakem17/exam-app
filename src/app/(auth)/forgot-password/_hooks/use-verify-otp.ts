import { useMutation } from "@tanstack/react-query";
import { verifyOtp } from "../../_actions/auth.action";
import { OtpValues } from "@/lib/schemes/auth.schema";

export default function useVerifyOtp() {
  const { mutate, isPending, error } = useMutation({
    mutationFn: async (data: OtpValues) => {
      const payload: ApiResponse<null> = await verifyOtp(data);

      if ("code" in payload) {
        throw new Error(payload.message);
      }

      return payload;
    },
  });

  return { isPending, error, verifyOtp: mutate };
}
