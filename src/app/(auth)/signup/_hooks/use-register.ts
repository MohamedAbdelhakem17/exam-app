import { useMutation } from "@tanstack/react-query";
import { register } from "../../_actions/auth.action";
import { RegisterValues } from "@/lib/schemes/auth.schema";
import { RegisterResponse } from "@/lib/types/auth";

export default function useRegister() {
  const { mutate, isPending, error } = useMutation({
    mutationFn: async (data: RegisterValues) => {
      const payload: ApiResponse<RegisterResponse> = await register(data)
      if ("code" in payload) {
        throw new Error(payload.message)
      }
    }
  });

  return { isPending, error, register: mutate };
}
