"use client";

import { REGISTER_STEEP } from "@/lib/constants/auth.constant";
import { RegisterStepsType } from "@/lib/types/auth";
import { useState } from "react";
import RegisterForm from "./_steps/register-form";
import VerifyEmail from "./_steps/verify-email";

export default function RegisterLayout() {
  // State
  const [email, setEmail] = useState<string | null>(null);
  const [step, setStep] = useState<RegisterStepsType>(
    REGISTER_STEEP.VERIFY_EMAIL,
  );

  const steps = {
    [REGISTER_STEEP.VERIFY_EMAIL]: (
      <VerifyEmail
        setStep={setStep}
        email={email as string}
        setEmail={setEmail}
      />
    ),
    [REGISTER_STEEP.CONFIRM_EMAIL]: (
      <h2>
        {" "}
        Verify Email{" "}
        <span onClick={() => setStep(REGISTER_STEEP.REGISTER)}>next</span>
      </h2>
    ),
    [REGISTER_STEEP.REGISTER]: <RegisterForm />,
  };
  return <>{steps[step]}</>;
}
