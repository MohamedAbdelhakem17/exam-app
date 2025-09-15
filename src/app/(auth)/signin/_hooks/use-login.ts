import { useMutation } from "@tanstack/react-query";
import { LoginValues } from "@/lib/schemes/auth.schema";
import { signIn } from "next-auth/react";

export default function useLogin() {
  const { mutate, isPending, error } = useMutation({
    mutationFn: async (data: LoginValues) => {
      const response = await signIn("credentials", {
        email: data?.email,
        password: data?.password,
        redirect: false,
      });

      if (response?.error) {
        throw new Error(response.error);
      }
      setTimeout(() => {
        window.location.href =
          new URLSearchParams(location.search).get("callbackUrl") || "/";
      }, 2000);
    },
  });
  return { isPending, error, Login: mutate };
}
