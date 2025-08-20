"use client"

import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff } from "lucide-react"

type PasswordInputProps = React.ComponentProps<typeof Input>

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
    ({ ...props }, ref) => {
        const [isPasswordVisible, setIsPasswordVisible] = useState(false)

        const togglePasswordVisibility = () => {
            setIsPasswordVisible((prev) => !prev)
        }

        return (
            <div className="relative">
                {/* Input */}
                <Input
                    {...props}
                    ref={ref}
                    type={isPasswordVisible ? "text" : "password"}
                    placeholder="Enter your password"
                    className={`border-gray-200 rounded-none shadow-none aria-[invalid=true]:border-destructive`}
                />

                {/* Toggle Visibility Button */}
                <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    aria-label={isPasswordVisible ? "Hide password" : "Show password"}
                    className="absolute right-2 top-2/4 -translate-y-1/2"
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
)

PasswordInput.displayName = "PasswordInput"

export default PasswordInput
