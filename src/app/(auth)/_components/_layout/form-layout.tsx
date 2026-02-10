import { cn } from "@/lib/utils/cn";
import React from "react";

type FormLayout = {
  label: string;
  resetPassword?: boolean;
  children: React.ReactNode;
};

export default function FormLayout({
  label,
  resetPassword,
  children,
}: FormLayout) {
  return (
    <div className="md:w-lg w-80 py-8 md:py-0">
      {/* Label */}
      <h1
        className={cn([
          resetPassword && "mb-10",
          "pb-6 text-3xl font-bold text-gray-800 font-inter text-center md:text-start",
        ])}
      >
        {label}
      </h1>

      {/* Form  */}
      {children}
    </div>
  );
}
