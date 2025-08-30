import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "../../_actions/auth.action";
import { CreatePasswordValues } from "@/lib/schemes/auth.schema";
import { CreatePasswordResponse } from "@/lib/types/auth";

export default function useResetPassword() {
    const { mutate, isPending, error  } = useMutation({
        mutationFn: async (data: CreatePasswordValues) => {
            const payload: ApiResponse<CreatePasswordResponse> = await resetPassword(data)
            if ("code" in payload) {
                throw new Error(payload.message)
            }
        }
    });

    return { isPending, error, resetPassword: mutate};
}
