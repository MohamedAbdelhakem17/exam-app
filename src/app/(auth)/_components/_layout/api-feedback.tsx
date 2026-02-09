import { CircleX } from "lucide-react";
import React from "react";

type ApiFeedbackProps = React.HTMLAttributes<HTMLDivElement>;

export default function ApiFeedback({
  children,
  ...props
}: ApiFeedbackProps): JSX.Element | null {
  if (!children) return null;

  return (
    <div
      {...props}
      className={`relative my-9 border border-red-600 bg-red-50 py-2 text-center text-red-600 ${props.className ?? ""}`}
    >
      <CircleX
        strokeWidth={1}
        className="absolute left-1/2 top-0 h-5 w-5 -translate-x-1/2 -translate-y-1/2 fill-white"
      />

      <p>{children}</p>
    </div>
  );
}
