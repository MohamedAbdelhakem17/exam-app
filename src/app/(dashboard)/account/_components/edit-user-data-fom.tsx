"use client";

import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  editUserDataSchema,
  EditUserDataValues,
} from "@/lib/schemes/auth.schema";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/app/(auth)/signup/_components/phone-input";
import { Button } from "@/components/ui/button";
import { parsePhoneNumber } from "react-phone-number-input";

type FormProps = {
  userData: {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
};

export default function EditUserDataForm({ userData }: FormProps) {
  const form = useForm<EditUserDataValues>({
    defaultValues: {
      username: userData?.username,
      firstName: userData?.firstName,
      lastName: userData?.lastName,
      email: userData?.email,
      phone: parsePhoneNumber(userData?.phone, "EG")?.number,
    },
    resolver: zodResolver(editUserDataSchema),
  });

  const onSubmit: SubmitHandler<EditUserDataValues> = (data) => {
    console.log("Updated user data:", data);
  };

  const { errors } = form.formState;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 space-y-4">
        {/* Name fields */}
        <div className="flex items-center justify-center gap-2.5 w-full">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>First name</FormLabel>
                <FormControl>
                  <Input placeholder="Ahmed" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Last name</FormLabel>
                <FormControl>
                  <Input placeholder="Abdullah" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Username */}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="user123" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={form.control}
          disabled={true}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="user@example.com" {...field} />
              </FormControl>
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
                  defaultCountry="EG"
                  error={!!errors.phone}
                  {...field}
                />
              </FormControl>
              {/* Feedback */}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit button */}
        <Button type="submit" className="w-full">
          Save Changes
        </Button>
      </form>
    </Form>
  );
}
