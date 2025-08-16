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
import { AuthLink, PasswordInput } from "../../_components";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import Link from "next/link";

export default function SigninForm() {
    const form = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onSubmit = (values: any) => {
        console.log("Form submitted:", values);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-4">
                {/* Email */}
                <FormField
                    control={form.control}
                    name="email"
                    render={({ ...field }) => (
                        <FormItem>
                            {/* Label */}
                            <FormLabel>Email</FormLabel>

                            {/* Field */}
                            <FormControl>
                                <Input
                                    placeholder="user@example.com"
                                    {...field}
                                    className="border-gray-200 rounded-none shadow-none"
                                />
                            </FormControl>

                            {/* Feedback */}
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Password */}
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            {/* Label */}
                            <FormLabel>Password</FormLabel>

                            {/* Field */}
                            <FormControl>
                                <PasswordInput {...field} />
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
                {/* {error && <ApiError>{error.message}</ApiError> } */}

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
