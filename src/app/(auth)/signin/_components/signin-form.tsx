"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "@/components/ui/form";

import { AuthLink, ApiError } from "../../_components";
import { Input } from "@/components/ui/input";
import { useForm, SubmitHandler } from "react-hook-form";
import { loginSchema, LoginValues } from "@/lib/schemes/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { handelGoToForgotPassword } from "../../_actions/auth.action";
import useLogin from "../_hooks/use-login";
import { toast } from "sonner";
import { AppToaster } from "@/components/shared";

export default function SigninForm() {
  // Form and Validation
  const form = useForm<LoginValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  // variables
  const { isValid, isSubmitted } = form.formState;

  // Hooks
  const { Login, isPending, error } = useLogin();

  // Functions
  const onSubmit: SubmitHandler<LoginValues> = async (data) => {
    Login(data, {
      onSuccess: () => {
        toast.custom(() => <AppToaster message={"Logged In Successfully"} />);
      },
    });
  };

  const goToForgotPassword = async () => {
    await handelGoToForgotPassword();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 ">
        {/* Email */}
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem className="mb-4">
              {/* Label */}
              <FormLabel>Email</FormLabel>

              {/* Field */}
              <FormControl>
                <Input type="email" placeholder="user@example.com" {...field} />
              </FormControl>

              {/* Feedback */}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password */}
        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              {/* Label */}
              <FormLabel>Password</FormLabel>

              {/* Field */}
              <FormControl>
                <Input type="password" placeholder="********" {...field} />
              </FormControl>

              {/* Feedback */}
              <FormMessage />

              {/* Forgot password action */}
              <button
                onClick={goToForgotPassword}
                type="button"
                className="block mt-3 mb-4 text-sm font-medium text-blue-600 text-end select-none ms-auto"
              >
                Forgot your password?
              </button>
            </FormItem>
          )}
        />

        {/* Api feedback */}
        {error && <ApiError message={error.message} />}

        {/* Submit */}
        <Button disabled={isPending || (isSubmitted && !isValid)} className="mt-10 mb-9">
          Login
        </Button>

        {/* Create Account */}
        <AuthLink href="/signup" linkText="Create yours " message="Don’t have an account? " />
      </form>
    </Form>
  );
}
