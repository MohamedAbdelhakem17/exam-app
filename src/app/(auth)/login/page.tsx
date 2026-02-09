import { Metadata } from "next";
import { FormLayout } from "../_components";
import LoginForm from "./_components/login-form";

export const metadata: Metadata = {
  title: "Login in",
};

export default function Login() {
  return (
    <section className="flex flex-col items-center justify-center">
      <FormLayout label="Login">
        <LoginForm />
      </FormLayout>
    </section>
  );
}
