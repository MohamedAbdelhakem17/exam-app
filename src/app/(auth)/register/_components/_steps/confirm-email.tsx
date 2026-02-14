import { FormLayout } from "@/app/(auth)/_components";
import useConfirmEmail from "@/app/(auth)/register/_hooks/use-confirm-email";
import { ApiFeedback, InputOtpSlot } from "@/components/shared";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { REGISTER_STEEP } from "@/lib/constants/auth.constant";
import {
  ConfirmEmailSchema,
  ConfirmEmailValues,
} from "@/lib/schemes/auth.schema";
import { RegisterStepsType } from "@/lib/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

type FormProps = {
  setStep: Dispatch<SetStateAction<RegisterStepsType>>;
  email: string;
};
export default function ConfirmEmail({ setStep, email }: FormProps) {
  // Mutations
  const { confirmEmail, isPending, error } = useConfirmEmail();

  // Form and Validation
  const form = useForm<ConfirmEmailValues>({
    defaultValues: {
      code: "",
      email,
    },

    resolver: zodResolver(ConfirmEmailSchema),
  });

  // Function
  const onSubmit: SubmitHandler<ConfirmEmailValues> = (data) => {
    confirmEmail(
      { email: email, code: data.code },
      {
        onSuccess: (res: ApiResponse<object>) => {
          // success alert
          toast.success(
            res?.message || "Email confirmed Successfully , complete Register",
            {
              duration: 700,
              onAutoClose: () => {
                setStep(REGISTER_STEEP.REGISTER);
              },
            },
          );
        },
      },
    );
  };

  // Variables
  const {
    isValid,
    isSubmitted,
    errors: { code },
  } = form.formState;

  return (
    <FormLayout label="Confirm Email">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* OTP Field  */}
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                {/* Input */}
                <FormControl>
                  <InputOtpSlot
                    length={6}
                    isError={Boolean(code)}
                    field={field}
                  />
                </FormControl>

                {/* Feedback */}
                <FormMessage className="text-center" />
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
            Confirm Email
          </Button>
        </form>
      </Form>
    </FormLayout>
  );
}
