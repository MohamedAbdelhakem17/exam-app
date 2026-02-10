"use client";

import { AlertCircle, AlertTriangle, Check, Info } from "lucide-react";
import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: <Check className="text-green-600" />,
        error: <AlertCircle className="text-red-600" />,
        warning: <AlertTriangle className="text-yellow-600" />,
        info: <Info className="text-blue-600" />,
      }}
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          success:
            "group-[.toaster]:bg-gray-800 group-[.toaster]:text-white group-[.toaster]:border-none",
          error:
            "group-[.toaster]:bg-gray-800 group-[.toaster]:text-white group-[.toaster]:border-none",
          warning:
            "group-[.toaster]:bg-gray-800 group-[.toaster]:text-white group-[.toaster]:border-none",
          info: "group-[.toaster]:bg-gray-800 group-[.toaster]:text-white group-[.toaster]:border-none",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
