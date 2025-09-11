"use server";

import { REQUEST_HEADERS } from "@/lib/constants/request-headers.constant";
import {
  CreatePasswordValues,
  ForgotPasswordValues,
  OtpValues,
  RegisterValues,
} from "@/lib/schemes/auth.schema";
import {
  CreatePasswordResponse,
  ForgotPasswordResponse,
  RegisterResponse,
} from "@/lib/types/auth";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Handel go to forgot password
export async function handelGoToForgotPassword() {
  cookies().set("fromLogin", "true", {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 5,
  });

  redirect("/forgot-password");
}

// Handel Register
export async function register(data: RegisterValues) {
  const url = process.env.BASE_API_URL + "/auth/signup";

  const phone = parsePhoneNumberFromString(data.phone);

  if (phone?.isValid()) {
    data.phone = 0 + phone.nationalNumber;
  }

  const response = await fetch(url, {
    method: "POST",
    headers: {
      ...REQUEST_HEADERS,
    },

    body: JSON.stringify(data),
  });

  const payload: ApiResponse<RegisterResponse> = await response.json();

  return payload;
}

// Handel Forgot Password
export async function sendOtp(data: ForgotPasswordValues) {
  const url = process.env.BASE_API_URL + "/auth/forgotPassword";

  const response = await fetch(url, {
    method: "POST",
    headers: {
      ...REQUEST_HEADERS,
    },
    body: JSON.stringify(data),
  });

  const payload: ApiResponse<ForgotPasswordResponse> = await response.json();

  return payload;
}

// Handel Verify OTP
export async function verifyOtp(data: OtpValues) {
  const url = process.env.BASE_API_URL + "/auth/verifyResetCode";

  const response = await fetch(url, {
    method: "Post",
    headers: {
      ...REQUEST_HEADERS,
    },
    body: JSON.stringify(data),
  });

  const payload: ApiResponse<null> = await response.json();

  return payload;
}

export async function resetPassword(data: CreatePasswordValues) {
  const url = process.env.BASE_API_URL + "/auth/resetPassword";

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      ...REQUEST_HEADERS,
    },
    body: JSON.stringify({
      email: data.email,
      newPassword: data.password,
    }),
  });

  const payload: ApiResponse<CreatePasswordResponse> = await response.json();

  cookies().delete("fromLogin");

  return payload;
}
