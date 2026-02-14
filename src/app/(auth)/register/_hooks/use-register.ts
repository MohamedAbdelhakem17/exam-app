import { RegisterValues } from "@/lib/schemes/auth.schema";
import { RegisterResponse } from "@/lib/types/auth";
import { useMutation } from "@tanstack/react-query";
import { register } from "../../_actions/auth.action";

export default function useRegister() {
  const { mutate, isPending, error } = useMutation<
    ApiResponse<RegisterResponse>,
    ErrorResponse,
    RegisterValues
  >({
    mutationFn: async (data: RegisterValues) => {
      const payload: ApiResponse<RegisterResponse> = await register(data);
      // Error case
      if (!payload.status) {
        throw payload;
      }

      return payload;
    },
  });

  return { isPending, error, register: mutate };
}
