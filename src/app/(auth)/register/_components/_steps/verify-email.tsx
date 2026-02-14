import { FormLayout } from "@/app/(auth)/_components";
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
import { REGISTER_STEEP } from "@/lib/constants/auth.constant";
import {
  VerifyEmailSchema,
  VerifyEmailValues,
} from "@/lib/schemes/auth.schema";

import { ApiFeedback } from "@/components/shared";
import { RegisterStepsType } from "@/lib/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import useVerifyEmail from "./../../_hooks/use-verify-email";

type FormProps = {
  setStep: Dispatch<SetStateAction<RegisterStepsType>>;
  setEmail: Dispatch<SetStateAction<string | null>>;
  email: string;
};
export default function VerifyEmail({ setStep, email, setEmail }: FormProps) {
  // Mutations
  const { verifyEmail, isPending, error } = useVerifyEmail();

  // Form and Validation
  const form = useForm<VerifyEmailValues>({
    defaultValues: {
      email: email || "",
    },

    resolver: zodResolver(VerifyEmailSchema),
  });

  // Function
  const onSubmit: SubmitHandler<VerifyEmailValues> = (data) => {
    verifyEmail(
      { email: data.email },
      {
        onSuccess: (res: ApiResponse<object>) => {
          // Set Email
          setEmail(data.email);

          // success alert
          toast.success(
            res?.message ||
              "Registration completed successfully. You can now log in.",
            {
              duration: 700,
              onAutoClose: () => {
                setStep(REGISTER_STEEP.CONFIRM_EMAIL);
              },
            },
          );
        },
      },
    );
  };

  // Variables
  const { isValid, isSubmitted } = form.formState;

  return (
    <FormLayout label="Enter Email">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* First Name  */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="col-span-1">
                {/* Label */}
                <FormLabel>Email</FormLabel>

                {/* Field */}
                <FormControl>
                  <Input placeholder="use@example.com" {...field} />
                </FormControl>

                {/* Feedback */}
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Api Feedback */}
          <ApiFeedback>{error?.errors[0]?.message as string}</ApiFeedback>

          {/* Submit  */}
          <Button
            disabled={(isSubmitted && !isValid) || isPending}
            pending={isPending}
          >
            Verify Email
          </Button>
        </form>
      </Form>
    </FormLayout>
  );
}
