import { useMutation } from "@tanstack/react-query";
import { sendOtp } from "../../_actions/auth.action";
import { ForgotPasswordValues } from "@/lib/schemes/auth.schema";
import { ForgotPasswordResponse } from "@/lib/types/auth";

export default function useSendOtp() {
    const { mutate, isPending, error  } = useMutation({
        mutationFn: async (data: ForgotPasswordValues) => {
            const payload: ApiResponse<ForgotPasswordResponse> = await sendOtp(data)
            if ("code" in payload) {
                throw new Error(payload.message)
            }

            return payload.info
        }
    });

    return { isPending, error, sendOtp: mutate};
}
