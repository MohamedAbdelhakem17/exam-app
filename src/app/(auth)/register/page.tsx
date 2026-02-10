import { Metadata } from "next";
import { FormLayout } from "../_components";
import RegisterForm from "./_components/signup-form";

export const metadata: Metadata = {
  title: "Register",
};

export default function Register() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen">
      <FormLayout label=" Create Account">
        <RegisterForm />
      </FormLayout>
    </section>
  );
}
