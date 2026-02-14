"use client";

import { REGISTER_STEEP } from "@/lib/constants/auth.constant";
import { RegisterStepsType } from "@/lib/types/auth";
import { useState } from "react";
import ConfirmEmail from "./_steps/confirm-email";
import RegisterForm from "./_steps/register-form";
import VerifyEmail from "./_steps/verify-email";

export default function RegisterLayout() {
  // State
  const [email, setEmail] = useState<string | null>(
    "mohamed.abdelhakem3200@gmail.com",
  );
  const [step, setStep] = useState<RegisterStepsType>(REGISTER_STEEP.REGISTER);

  const steps = {
    [REGISTER_STEEP.VERIFY_EMAIL]: (
      <VerifyEmail
        setStep={setStep}
        email={email as string}
        setEmail={setEmail}
      />
    ),
    [REGISTER_STEEP.CONFIRM_EMAIL]: (
      <ConfirmEmail setStep={setStep} email={email as string} />
    ),
    [REGISTER_STEEP.REGISTER]: <RegisterForm email={email as string} />,
  };
  return <>{steps[step]}</>;
}
