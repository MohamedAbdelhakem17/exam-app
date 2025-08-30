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
import {
    InputOTP,
    InputOTPSlot,
} from "@/components/ui/input-otp";
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
    // Retrieve user's email from sessionStorage
    const userEmail = sessionStorage.getItem("email");
    const router = useRouter()

    // use mutation
    const { isPending, error, verifyOtp } = useVerifyOtp()
    const { error: resendOtpError, sendOtp } = useSendOtp();


    // Initialize timer
    const [timer, setTimer] = useState<number>(() => {
        const storeTime = sessionStorage.getItem("otp-timer");
        return storeTime ? parseInt(storeTime) : 60;
    });

    const form = useForm<OtpValues>({
        defaultValues: { resetCode: "" },
        resolver: zodResolver(otpSchema)
    }
    );

    const onSubmit: SubmitHandler<OtpValues> = (data) => {
        verifyOtp(data,
            {
                onSuccess: () => {
                    sessionStorage.setItem("otpVerified", "true")
                    toast.custom(() => <AppToaster massage="otp verify successfully reset your password now" />, {
                        duration: 1000,
                    });
                    setTimeout(() => router.push("/forgot-password/create-password"), 1200)
                },
            }
        );
    };

    // Function to update timer in both sessionStorage and local state
    const updateTimer = (time: number) => {
        sessionStorage.setItem("otp-timer", time.toString());
        setTimer(time);
    };

    // Function to resend OTP
    const resendOTP = async (email: string) => {
        sendOtp(
            { email },
            {
                onSuccess: (response) => {
                    toast.custom(() => <AppToaster massage={response as string} />, {
                        duration: 1000,
                    });
                    updateTimer(60);
                },
            }
        );
    };


    // handle countdown timer
    useEffect(() => {
        if (!sessionStorage.getItem("otp-timer")) {
            sessionStorage.setItem("otp-timer", "60");
        }
        const countDown = setInterval(() => {
            const storeTime = sessionStorage.getItem("otp-timer");
            const time = storeTime ? parseInt(storeTime) : 60;
            if (time <= 0) {
                clearInterval(countDown);
                setTimer(0);
                return;
            }
            const newTime = time - 1;
            updateTimer(newTime);
        }, 1000);
        return () => clearInterval(countDown);
    }, [timer]);


    const { isValid, isSubmitted, errors: { resetCode } } = form.formState


    return (
        <>
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
                        {/* OTP inout  */}
                        <FormField
                            control={form.control}
                            name="resetCode"
                            // eslint-disable-next-line @typescript-eslint/no-unused-vars
                            render={({ field }) => (
                                <FormItem>
                                    {/* Input */}
                                    <FormControl>
                                        <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS} {...field}>
                                            {Array.from({ length: 6 }).map((_, index) => (
                                                <InputOTPSlot key={index} index={index} isError={Boolean(resetCode)} />
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
                            <p className="text-sm font-medium text-gray-600 text-center mt-6">
                                Didn’t receive the code?{" "}
                                <span
                                    className="text-blue-600 cursor-pointer"
                                    onClick={() => resendOTP(userEmail as string)}
                                >
                                    Resend
                                </span>
                            </p>
                        ) : (
                            <p className="text-sm font-medium text-gray-600 text-center mt-6">
                                You can request another code in: {timer}s
                            </p>
                        )}

                        {(resendOtpError || error) && (
                            <ApiError>
                                {resendOtpError?.message as string || error?.message as string}
                            </ApiError>
                        )}

                        {/* Verify code submit button */}
                        <Button className="mt-10 mb-9" disabled={(isSubmitted && !isValid) || isPending}>Verify Code</Button>

                        {/* Link to create account */}
                        <AuthLink
                            href="/signup"
                            linkText="Create yours "
                            message="Don’t have an account? "
                        />
                    </form>
                </Form>
            </FormLayout >
        </>
    );
}
