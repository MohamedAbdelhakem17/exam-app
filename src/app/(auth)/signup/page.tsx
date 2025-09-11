import { Metadata } from "next";
import { FormLayout } from "../_components";
import SignupForm from "./_components/signup-form";

export const metadata: Metadata = {
  title: "Sign up",
};

export default function SignUp() {
  return (
    <section className="flex flex-col items-center justify-center">
      <FormLayout label=" Create Account">
        <SignupForm />
      </FormLayout>
    </section>
  );
}
