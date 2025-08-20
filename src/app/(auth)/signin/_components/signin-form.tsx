"use client";

import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Form,
} from "@/components/ui/form";

import { MainButton } from "@/components/shared";
import { AuthLink, ApiError, PasswordInput } from "../../_components";
import { Input } from "@/components/ui/input";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import { loginSchema, LoginValues } from "@/lib/schemes/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function SigninForm() {

    const [apiError, setApiError] = useState<string>("")

    const form = useForm<LoginValues>({
        defaultValues: {
            email: "",
            password: "",
        },
        resolver: zodResolver(loginSchema)
    });

    const onSubmit: SubmitHandler<LoginValues> = async (data) => {
        const response = await signIn("credentials", {
            email: data?.email,
            password: data?.password,
            redirect: false
        })

        if (response?.error) {
            setApiError(response.error)
            return
        }

        location.href = new URLSearchParams(location.search).get("callbackUrl") || "/"
        console.log(response)
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-4">
                {/* Email */}
                <FormField
                    name="email"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            {/* Label */}
                            <FormLabel className="text-gray-800">Email</FormLabel>

                            {/* Field */}
                            <FormControl>
                                <Input
                                    placeholder="user@example.com"
                                    {...field}
                                    className="border-gray-200 rounded-none shadow-none aria-[invalid=true]:border-destructive"
                                />
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
                            <FormLabel className="text-gray-800">Password</FormLabel>

                            {/* Field */}
                            <FormControl>
                                <PasswordInput {...field} className="" />
                            </FormControl>

                            {/* Feedback */}
                            <FormMessage />

                            <Link
                                href="/forgot-password"
                                className="block mt-3 mb-4 text-sm font-medium text-blue-600 text-end"
                            >
                                {" "}
                                Forgot your password?{" "}
                            </Link>
                        </FormItem>
                    )}
                />

                {/* Error */}
                {apiError && <ApiError>{apiError}</ApiError>}

                {/* Submit */}
                <MainButton>Login</MainButton>

                {/* Create Account */}
                <AuthLink
                    href="/signup"
                    linkText="Create yours "
                    message="Don’t have an account? "
                />
            </form>
        </Form>
    );
}
