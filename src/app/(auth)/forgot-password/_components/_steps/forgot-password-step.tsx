"use client";
import { ApiError, AuthLink, FormLayout } from "@/app/(auth)/_components";
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
  forgotPasswordSchema,
  ForgotPasswordValues,
} from "@/lib/schemes/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { MoveRightIcon } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import useSendOtp from "../../_hooks/use-send-otp";
import { toast } from "sonner";
import { AppToaster } from "@/components/shared";
import { useRouter } from "next/navigation";

export default function ForgotPasswordStep() {
  // Navigation
  const router = useRouter();

  // Mutation
  const { error, isPending, sendOtp } = useSendOtp();

  // Form and validation
  const form = useForm<ForgotPasswordValues>({
    defaultValues: {
      email: sessionStorage.getItem("email") || "",
    },

    resolver: zodResolver(forgotPasswordSchema),
  });

  // Functions
  const onSubmit: SubmitHandler<ForgotPasswordValues> = async (data) => {
    sendOtp(data, {
      onSuccess: (response) => {
        sessionStorage.setItem("email", data.email);

        toast.custom(() => <AppToaster message={response as string} />, {
          duration: 1000,
        });

        setTimeout(() => router.push("/forgot-password/verify-otp"), 1200);
      },
    });
  };

  // Variables
  const { isValid, isSubmitted } = form.formState;

  return (
    <FormLayout label="Forgot Password" resetPassword={true}>
      {/* Description */}
      <p className="pb-6 mb-4 mt-2.5 text-gray-500">
        Don’t worry, we will help you recover your account.
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                {/* Label  */}
                <FormLabel>Email</FormLabel>

                {/* Input */}
                <FormControl>
                  <Input
                    type="email"
                    {...field}
                    placeholder="user@example.com"
                  />
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
            <span className="me-2.5">Continue</span>
            <MoveRightIcon />
          </Button>

          {/* Create Account */}
          <AuthLink
            href="/signup"
            linkText="Create yours "
            message="Don’t have an account? "
          />
        </form>
      </Form>
    </FormLayout>
  );
}
