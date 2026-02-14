import { RegisterStepsType } from "@/lib/types/auth";
import { Dispatch, SetStateAction } from "react";

type FormProps = {
  setStep: Dispatch<SetStateAction<RegisterStepsType>>;
};
export default function ConfirmEmail({ setStep }: FormProps) {
  return <div>ConfirmEmail</div>;
}
