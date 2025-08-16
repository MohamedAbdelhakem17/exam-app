import { FormLayout } from "../_components";
import SignupForm from "./_components/signup-form";


export default function SignUp() {
  return (
    <section className="flex flex-col items-center justify-center">
      <FormLayout label=" Create Account">
        <SignupForm />
      </FormLayout>
    </section>
  )
}
