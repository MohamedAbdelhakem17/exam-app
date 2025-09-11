import { Metadata } from "next";
import { FormLayout } from "../_components";
import SigninForm from "./_components/signin-form";

export const metadata: Metadata = {
  title: "Sign in",
};

export default function SignIn() {
  return (
    <section className="flex flex-col items-center justify-center">
      <FormLayout label="Login">
        <SigninForm />
      </FormLayout>
    </section>
  );
}
