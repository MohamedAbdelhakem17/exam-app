"use client";

import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Form,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { ApiError, AuthLink } from "../../_components";
import { Button } from "@/components/ui/button";
import { PhoneInput } from "./phone-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterValues } from "@/lib/schemes/auth.schema";
import useRegister from "../_hooks/use-register";
import { AppToaster } from "@/components/shared";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function SignupForm() {
    // mutation hook
    const { isPending, error, register } = useRegister();

    const router = useRouter()

    const form = useForm<RegisterValues>({
        defaultValues: {
            firstName: "",
            lastName: "",
            username: "",
            email: "",
            phone: "",
            password: "",
            rePassword: ""
        },
        resolver: zodResolver(registerSchema)
    });

    const onSubmit: SubmitHandler<RegisterValues> = (data) => {
        register(data, {
            onSuccess: () => {
                toast.custom(() => <AppToaster massage={"Registration completed successfully. You can now log in."} />);
                setTimeout(() => (router.push("/signin")), 1200);
            }
        },);
    };

    const { formState: { errors, isValid, isSubmitted } } = form

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-4">

                {/* Name  */}
                <div className="flex items-center  justify-center gap-2.5">

                    {/* First Name  */}
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem>
                                {/* Label */}
                                <FormLabel>First name</FormLabel>

                                {/* Field */}
                                <FormControl>
                                    <Input
                                        placeholder="Ahmed"
                                        {...field}
                                    />
                                </FormControl>

                                {/* Feedback */}
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Last  Name  */}
                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                            <FormItem>
                                {/* Label */}
                                <FormLabel>Last name</FormLabel>

                                {/* Field */}
                                <FormControl>
                                    <Input
                                        placeholder="Abdullah"
                                        {...field}
                                    />
                                </FormControl>

                                {/* Feedback */}
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                </div>

                {/* user name */}
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            {/* Label */}
                            <FormLabel>Username</FormLabel>

                            {/* Field */}
                            <FormControl>
                                <Input
                                    placeholder="user123"
                                    {...field}
                                />
                            </FormControl>

                            {/* Feedback */}
                            <FormMessage />
                        </FormItem>
                    )}
                />

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
                                />
                            </FormControl>

                            {/* Feedback */}
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Phone Number  */}
                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            {/* Label */}
                            <FormLabel>Phone</FormLabel>

                            {/* Field */}
                            <FormControl>
                                <PhoneInput
                                    type="text"

                                    placeholder="01012345678"
                                    error={!!errors.phone}
                                    {...field}
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
                                <Input
                                    type="password"
                                    placeholder="********"
                                    {...field}
                                />
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
                            <FormLabel>Confirm Password</FormLabel>

                            {/* Field */}
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="********"
                                    {...field}
                                />
                            </FormControl>
                            {/* Feedback */}
                            <FormMessage />

                        </FormItem>
                    )}
                />

                {/* Error */}
                {error && <ApiError>{error.message}</ApiError>}

                {/* Submit */}
                <Button disabled={(!isValid && isSubmitted) || isPending}>Create Account</Button>


                {/* Login  */}
                <AuthLink
                    href="/signin"
                    linkText="Login"
                    message="Already have an account? "
                />
            </form>
        </Form>
    );
}
