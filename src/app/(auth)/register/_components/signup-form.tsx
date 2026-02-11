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
import { registerSchema, RegisterValues } from "@/lib/schemes/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { ApiFeedback } from "@/components/shared";
import { AuthLink } from "../../_components";
import useRegister from "../_hooks/use-register";
import { PhoneInput } from "./phone-input";

export default function RegisterForm() {
  // Navigation
  const router = useRouter();

  // mutation
  const { isPending, error, register } = useRegister();

  // Form and Validations
  const form = useForm<RegisterValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      phone: "",
      password: "",
      rePassword: "",
    },

    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterValues> = (data) => {
    register(data, {
      onSuccess: () => {
        toast.success(
          "Registration completed successfully. You can now log in.",
          {
            onAutoClose: () => {
              router.push("/signin");
            },
          },
        );
      },
    });
  };

  // Variables
  const { errors, isValid, isSubmitted } = form.formState;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-4 gap-4 grid grid-cols-1 md:grid-cols-2"
      >
        {/* First Name  */}
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem className="col-span-1">
              {/* Label */}
              <FormLabel>First name</FormLabel>

              {/* Field */}
              <FormControl>
                <Input placeholder="Mohamed" {...field} />
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
            <FormItem className="col-span-1">
              {/* Label */}
              <FormLabel>Last name</FormLabel>

              {/* Field */}
              <FormControl>
                <Input placeholder="Abdelhakem" {...field} />
              </FormControl>

              {/* Feedback */}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* user name */}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="col-span-full">
              {/* Label */}
              <FormLabel>Username</FormLabel>

              {/* Field */}
              <FormControl>
                <Input placeholder="user123" {...field} />
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
            <FormItem className="col-span-full">
              {/* Label */}
              <FormLabel>Email</FormLabel>

              {/* Field */}
              <FormControl>
                <Input placeholder="user@example.com" {...field} />
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
            <FormItem className="col-span-full">
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
            <FormItem className="col-span-full">
              {/* Label */}
              <FormLabel>Password</FormLabel>

              {/* Field */}
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
            <FormItem className="col-span-full">
              {/* Label */}
              <FormLabel>Confirm Password</FormLabel>

              {/* Field */}
              <FormControl>
                <Input type="password" placeholder="********" {...field} />
              </FormControl>
              {/* Feedback */}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Api feedback */}
        <ApiFeedback>{error?.message}</ApiFeedback>

        {/* Submit */}
        <Button
          disabled={(!isValid && isSubmitted) || isPending}
          pending={isPending}
          className="col-span-full"
        >
          Create Account
        </Button>

        {/* Login  */}
        <div className="col-span-full">
          <AuthLink
            href="/login"
            linkText="Login"
            message="Already have an account? "
          />
        </div>
      </form>
    </Form>
  );
}
