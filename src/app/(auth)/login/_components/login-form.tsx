"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { ApiFeedback } from "@/components/shared";
import { loginSchema, LoginValues } from "@/lib/schemes/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { AuthLink, FormLayout } from "../../_components";
import useLogin from "./../_hooks/use-login";

export default function LoginForm() {
  // Mutation
  const { login, error, isPending } = useLogin();

  // Form and Validation
  const form = useForm<LoginValues>({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  // Functions
  const onSubmit: SubmitHandler<LoginValues> = (data) => {
    login(data, {
      onSuccess: () => {
        location.href =
          new URLSearchParams(location.search).get("callbackUrl") || "/";
      },
    });
  };

  // variables
  const { isValid, isSubmitted } = form.formState;

  return (
    <FormLayout label="Login">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 ">
          {/* Email */}
          <FormField
            name="username"
            control={form.control}
            render={({ field }) => (
              <FormItem className="mb-4">
                {/* Label */}
                <FormLabel>username</FormLabel>

                {/* Field */}
                <FormControl>
                  <Input type="text" placeholder="User" {...field} />
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
                <AuthLink
                  href="/forgot-password"
                  linkText="Forgot your password?"
                />
              </FormItem>
            )}
          />

          {/* Api feedback */}
          <ApiFeedback>{error?.message}</ApiFeedback>

          {/* Submit */}
          <Button
            disabled={(isSubmitted && !isValid) || isPending}
            className="mt-10 mb-9"
            pending={isPending}
          >
            Login
          </Button>
        </form>
      </Form>
    </FormLayout>
  );
}
