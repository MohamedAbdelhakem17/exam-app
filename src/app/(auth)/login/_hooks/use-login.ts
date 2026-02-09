import { LoginValues } from "@/lib/schemes/auth.schema";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";

const useLogin = () => {
  const {
    mutate: login,
    error,
    isPending,
  } = useMutation({
    mutationKey: ["login"],

    mutationFn: async (data: LoginValues) => {
      const response = await signIn("credentials", {
        email: data?.email,
        password: data?.password,
        redirect: false,
      });

      if (response?.error) {
        throw new Error("not able to login with provided credentials.");
      } else if (!response?.ok) {
        throw new Error("An unknown error occurred during login.");
      }

      return response;
    },
  });

  return { login, error, isPending };
};

export default useLogin;
