"use client";
import { ApiError, FormLayout } from "@/app/(auth)/_components";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  createPasswordSchema,
  CreatePasswordValues,
} from "@/lib/schemes/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import useResetPassword from "../../_hooks/use-reset-password";
import { toast } from "sonner";
import { AppToaster } from "@/components/shared";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import BackLink from "../back-link";

export default function CreatePasswordStep() {
  // Navigation
  const router = useRouter();

  //  mutation
  const { isPending, error, resetPassword } = useResetPassword();

  // Form and validation
  const form = useForm<CreatePasswordValues>({
    defaultValues: {
      password: "",
      rePassword: "",
      email: sessionStorage.getItem("email") || "",
    },

    resolver: zodResolver(createPasswordSchema),
  });

  // Functions
  const onSubmit: SubmitHandler<CreatePasswordValues> = async (data) => {
    await resetPassword(data, {
      onSuccess: () => {
        toast.custom(
          () => (
            <AppToaster message="Password successfully updated! You can now sign in." />
          ),
          { duration: 1000 }
        );

        sessionStorage.clear();

        setTimeout(() => {
          location.href = "/signin";
        }, 1200);
      },
    });
  };

  // Variables
  const { isValid, isSubmitted } = form.formState;

  // Effects
  useEffect(() => {
    const isVerified = sessionStorage.getItem("otpVerified");

    if (isVerified !== "true") {
      router.replace("/forgot-password");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <BackLink path="/forgot-password/verify-otp" />

      <FormLayout label="Create a New Password" resetPassword={true}>
        {/* Description */}
        <p className="pb-6 mb-4 mt-2.5 text-gray-500">
          Create a new strong password for your account.
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="mb-4">
                  {/* Label */}
                  <FormLabel>Password</FormLabel>

                  {/* Input */}
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>

                  {/* Feedback */}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Confirm Password */}
            <FormField
              control={form.control}
              name="rePassword"
              render={({ field }) => (
                <FormItem>
                  {/* Label */}
                  <FormLabel>Confirm New Password</FormLabel>

                  {/* Input */}
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>

                  {/* Feedback */}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Api feedback */}
            {error && <ApiError>{error.message}</ApiError>}

            {/* Submit */}
            <Button
              disabled={(isSubmitted && !isValid) || isPending}
              className="mt-10 mb-9"
            >
              Update Password
            </Button>
          </form>
        </Form>
      </FormLayout>
    </>
  );
}
