import { InputOTP, InputOTPSlot } from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";

type InputOtpSlotProps = {
  isError: boolean;
  length: number;
  field: {
    name: string;
  };
};

export default function InputOtpSlot({
  isError,
  length,
  field,
}: InputOtpSlotProps) {
  return (
    <InputOTP maxLength={length} pattern={REGEXP_ONLY_DIGITS} {...field}>
      {/* Input slots */}
      {Array.from({ length: length }).map((_, index) => (
        <InputOTPSlot key={index} index={index} isError={isError} />
      ))}
    </InputOTP>
  );
}
