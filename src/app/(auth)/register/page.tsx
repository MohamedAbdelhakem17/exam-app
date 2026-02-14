import { Metadata } from "next";
import { AuthLink } from "../_components";
import RegisterLayout from "./_components/register-layout";

export const metadata: Metadata = {
  title: "Register",
};

export default function Register() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen">
      {/* Form */}
      <RegisterLayout />

      {/* Footer */}
      <div className="col-span-full">
        <AuthLink
          href="/login"
          linkText="Login"
          message="Already have an account? "
        />
      </div>
    </section>
  );
}
