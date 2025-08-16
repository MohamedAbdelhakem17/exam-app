"use client";

import { Button } from "@/components/ui/button";

type MainButtonProps = {
    children: React.ReactNode;
    handle?: () => void;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
};

export default function MainButton({
    children,
    handle,
    disabled = false,
    type = "submit",
}: MainButtonProps) {
    return (
        <Button
            type={type}
            className="w-full h-12 p-4 mt-8 text-white rounded-none bg-blue-600 hover:bg-blue-700 disabled:bg-gray-200 disabled:text-gray-400"
            onClick={handle}
            disabled={disabled}
        >
            {children}
        </Button>
    );
}
