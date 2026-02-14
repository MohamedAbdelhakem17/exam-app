import { Metadata } from "next";
import { AuthLink } from "../_components";
import LoginForm from "./_components/login-form";

export const metadata: Metadata = {
  title: "Login in",
};

export default function Login() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen">
      {/* Form */}
      <LoginForm />

      {/* Create Account */}
      <AuthLink
        href="/register"
        linkText="Create yours "
        message="Don’t have an account? "
      />
    </section>
  );
}
