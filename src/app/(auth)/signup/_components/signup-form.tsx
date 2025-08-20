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

export default function SignupForm() {
    const form = useForm({
        defaultValues: {
            firstName: "",
            lastName: "",
            userName: "",
            email: "",
            phone: "",
            password: "",
            confirmPassword: ""
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
                    render={({ field }) => (
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

                        </FormItem>
                    )}
                />

                {/* Error */}
                {/* {error && <ApiError>{error.message}</ApiError> } */}

                {/* Submit */}
                <MainButton>Create Account</MainButton>

                {/* Create Account */}
                <AuthLink
                    href="/signin"
                    linkText="Login"
                    message="Already have an account? "
                />
            </form>
        </Form>
    );
}
