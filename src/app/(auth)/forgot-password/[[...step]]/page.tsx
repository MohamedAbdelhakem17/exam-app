import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { CreatePassword, ForgotPassword, VerifyOTP } from "../_components";

type Step = "/" | "verify-otp" | "create-password";

type ForgotPasswordPageProps = {
  params: {
    step?: Step;
  };
};

export default function ForgotPasswordPage({ params }: ForgotPasswordPageProps) {
  const isFromLogin = cookies().get("fromLogin");

  if (!isFromLogin) {
    redirect("/signin");
  }

  const CURRENT_STEP: Step = params.step ?? "/";

  const STEPS_MAP: Record<Step, JSX.Element> = {
    "/": <ForgotPassword />,
    "verify-otp": <VerifyOTP />,
    "create-password": <CreatePassword />,
  };



  return (
    <section className="flex flex-col items-center justify-center">
      {STEPS_MAP[CURRENT_STEP]}
    </section>
  );
}
