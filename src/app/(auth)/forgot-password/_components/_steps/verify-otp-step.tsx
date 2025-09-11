"use client";

import { ApiError, AuthLink, FormLayout } from "@/app/(auth)/_components";
import { AppToaster } from "@/components/shared";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { InputOTP, InputOTPSlot } from "@/components/ui/input-otp";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import useSendOtp from "../../_hooks/use-send-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { otpSchema, OtpValues } from "@/lib/schemes/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import useVerifyOtp from "../../_hooks/use-verify-otp";
import { useRouter } from "next/navigation";
import BackLink from "../back-link";

export default function VerifyOTP() {
  // Navigation
  const router = useRouter();

  // State
  const [timer, setTimer] = useState<number>(() => {
    const storeTime = sessionStorage.getItem("otp-timer");
    return storeTime ? parseInt(storeTime) : 60;
  });

  // Mutation
  const { isPending, error, verifyOtp } = useVerifyOtp();
  const { error: resendOtpError, sendOtp } = useSendOtp();

  // From and validation
  const form = useForm<OtpValues>({
    defaultValues: { resetCode: "" },

    resolver: zodResolver(otpSchema),
  });

  // Functions
  const onSubmit: SubmitHandler<OtpValues> = (data) => {
    verifyOtp(data, {
      onSuccess: () => {
        sessionStorage.setItem("otpVerified", "true");

        toast.custom(
          () => (
            <AppToaster message="otp verify successfully reset your password now" />
          ),
          {
            duration: 1000,
          }
        );

        setTimeout(() => router.push("/forgot-password/create-password"), 1200);
      },
    });
  };

  const updateTimer = (time: number) => {
    sessionStorage.setItem("otp-timer", time.toString());

    setTimer(time);
  };

  const resendOTP = async (email: string) => {
    sendOtp(
      { email },

      {
        onSuccess: (response) => {
          toast.custom(() => <AppToaster message={response as string} />, {
            duration: 1000,
          });

          updateTimer(60);
        },
      }
    );
  };

  // Variables
  const userEmail = sessionStorage.getItem("email");
  const {
    isValid,
    isSubmitted,
    errors: { resetCode },
  } = form.formState;

  // Effects
  useEffect(() => {
    if (timer <= 0) return;

    const countDown = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(countDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    sessionStorage.setItem("otp-timer", timer.toString());
  }, [timer]);

  return (
    <>
      {/* Navigate to forgot password step */}
      <BackLink path="/forgot-password" />

      <FormLayout label="Verify OTP" resetPassword={true}>
        {/* Info message */}
        <p className="mt-2.5 text-gray-500">
          Please enter the 6-digits code we have sent to:
        </p>

        {/* Show user email and allow editing */}
        <p className="text-sm mb-10">
          <span>{userEmail}.</span>

          <Link
            href="/forgot-password"
            className="text-blue-600 underline font-medium"
          >
            Edit
          </Link>
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {/* OTP Field  */}
            <FormField
              control={form.control}
              name="resetCode"
              render={({ field }) => (
                <FormItem>
                  {/* Input */}
                  <FormControl>
                    <InputOTP
                      maxLength={6}
                      pattern={REGEXP_ONLY_DIGITS}
                      {...field}
                    >
                      {/* Input slots */}
                      {Array.from({ length: 6 }).map((_, index) => (
                        <InputOTPSlot
                          key={index}
                          index={index}
                          isError={Boolean(resetCode)}
                        />
                      ))}
                    </InputOTP>
                  </FormControl>

                  {/* Feedback */}
                  <FormMessage className="text-center" />
                </FormItem>
              )}
            />

            {/* Timer countdown or resend option */}
            {timer === 0 ? (
              //  if available to resend code
              // description
              <p className="text-sm font-medium text-gray-600 text-center mt-6">
                Didn’t receive the code?
                {/* Resend Code Action */}
                <span
                  className="text-blue-600 cursor-pointer"
                  onClick={() => resendOTP(userEmail as string)}
                >
                  Resend
                </span>
              </p>
            ) : (
              // if not available to resend code
              <p className="text-sm font-medium text-gray-600 text-center mt-6">
                You can request another code in: {timer}s
              </p>
            )}

            {/* Api feedback */}
            {(resendOtpError || error) && (
              <ApiError>
                {(resendOtpError?.message as string) ||
                  (error?.message as string)}
              </ApiError>
            )}

            {/* Verify code submit button */}
            <Button
              className="mt-10 mb-9"
              disabled={(isSubmitted && !isValid) || isPending}
            >
              Verify Code
            </Button>

            {/* Link to create account */}
            <AuthLink
              href="/signup"
              linkText="Create yours "
              message="Don’t have an account? "
            />
          </form>
        </Form>
      </FormLayout>
    </>
  );
}
