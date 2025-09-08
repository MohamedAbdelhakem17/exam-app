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
import useEditProfile from "../../_hooks/use-edit-profile";
import { ApiError } from "@/app/(auth)/_components";
import { toast } from "sonner";
import { AppToaster } from "@/components/shared";
import { useSession } from "next-auth/react";
import DeleteUserAccount from "./delete-user-account";

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
  // hooks
  const { data: session, update: updateSession } = useSession();

  // mutation
  const { editProfile, isPending, error } = useEditProfile();

  // form and validating
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
    editProfile(data, {
      onSuccess: async (res) => {
        await updateSession({
          ...session,
          ...res.user,
        });

        toast.custom(() => (
          <AppToaster message={"Data updated completed successfully."} />
        ));
      },
    });
  };

  const { errors, isValid, isSubmitted } = form.formState;

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

        {/* Api  feedback */}
        {error && <ApiError>{error?.message}</ApiError>}

        {/* Actions */}
        <div className="flex items-center justify-center gap-3.5">
          {/* Delete account */}
          <DeleteUserAccount />

          {/* Submit button */}
          <Button
            type="submit"
            className="flex-1"
            disabled={(isSubmitted && !isValid) || isPending}
          >
            Save Changes
          </Button>
        </div>
      </form>
    </Form>
  );
}
