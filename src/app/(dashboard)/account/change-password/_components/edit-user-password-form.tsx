"use client";
import { ApiFeedback, AppToaster } from "@/components/shared";
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
  editUserPasswordSchema,
  EditUserPasswordValues,
} from "@/lib/schemes/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import useEditPassword from "../../_hooks/use-edit-password";

export default function EditUserPasswordForm() {
  // hook
  const { data: session, update: updateSession } = useSession();

  // mutation
  const { editPassword, isPending, error } = useEditPassword();

  // form and validating
  const form = useForm<EditUserPasswordValues>({
    defaultValues: {
      password: "",
      rePassword: "",
      oldPassword: "",
    },
    resolver: zodResolver(editUserPasswordSchema),
  });

  const onSubmit: SubmitHandler<EditUserPasswordValues> = (data) => {
    editPassword(data, {
      onSuccess: async (res) => {
        await updateSession({
          ...session,
          ...res,
        });
        toast.custom(() => (
          <AppToaster message={"Your password has been updated.."} />
        ));
        setTimeout(() => {
          location.href = "/";
        }, 1200);
      },
    });
  };

  const { isValid, isSubmitted } = form.formState;
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 space-y-4">
        {/* Old password */}
        <FormField
          control={form.control}
          name="oldPassword"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Current Password</FormLabel>
              <FormControl>
                <Input placeholder="********" {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* new password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel> New Password</FormLabel>
              <FormControl>
                <Input placeholder="********" {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Confirm new password */}
        <FormField
          control={form.control}
          name="rePassword"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Confirm New Password</FormLabel>
              <FormControl>
                <Input placeholder="********" {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Api  feedback */}
        {error && <ApiFeedback>{error?.message}</ApiFeedback>}

        {/* Submit button */}
        <Button
          type="submit"
          className="flex-1"
          disabled={(isSubmitted && !isValid) || isPending}
        >
          Update Password
        </Button>
      </form>
    </Form>
  );
}
