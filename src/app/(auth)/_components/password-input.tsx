"use client"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"

export default function PasswordInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)

    const togglePasswordVisibility = () => {
        setIsPasswordVisible((prev) => !prev)
    }

    return (
        <div className="relative">

            {/* Input */}
            <Input
                {...props}
                type={isPasswordVisible ? "text" : "password"}
                placeholder="Enter your password"
                className="border-gray-200 rounded-none shadow-none"
            />

            {/* Toggle Visibility Button */}
            <button
                type="button"
                onClick={togglePasswordVisibility}
                aria-label={isPasswordVisible ? "Hide password" : "Show password"}
                className="absolute right-2 top-2/4 -translate-y-[50%]"
            >
                {isPasswordVisible ? (
                    <EyeOff strokeWidth={1} className="w-4 h-4" />
                ) : (
                    <Eye strokeWidth={1} className="w-4 h-4" />
                )}
            </button>
        </div>
    )
}
