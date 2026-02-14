"use server";

import { REQUEST_HEADERS } from "@/lib/constants/request-headers.constant";
import {
  EditUserDataValues,
  EditUserPasswordValues,
} from "@/lib/schemes/auth.schema";
import { getToken } from "@/lib/utils/get-token";
import parsePhoneNumberFromString from "libphonenumber-js";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function editUserData(data: EditUserDataValues) {
  const token = await getToken();

  if (!token) {
    return null;
  }

  const url = process.env.BASE_API_URL + "/auth/editProfile";
  const phone = parsePhoneNumberFromString(data.phone);

  if (phone?.isValid()) {
    data.phone = 0 + phone.nationalNumber;
  }

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      ...REQUEST_HEADERS,
      token: token.token,
    },
    body: JSON.stringify(data),
  });

  const payload: ApiResponse<EditProfileResponse> = await response.json();

  return payload;
}

export async function deleteUserAccount(): Promise<ApiResponse<null> | null> {
  const token = await getToken();

  if (!token) {
    return null;
  }

  const url = process.env.BASE_API_URL + "/auth/deleteMe";

  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      ...REQUEST_HEADERS,
      token: token.token,
    },
  });

  const payload: ApiResponse<null> = await response.json();

  if ("code" in payload) {
    return payload;
  }

  const cookieStore = await cookies();
  const allCookies: { name: string; value: string }[] = cookieStore.getAll();

  allCookies.forEach((cookie: { name: string; value: string }) => {
    cookieStore.delete(cookie.name);
  });

  redirect("/");
}

export async function editUserPassword(data: EditUserPasswordValues) {
  const token = await getToken();

  if (!token) {
    return null;
  }

  const url = process.env.BASE_API_URL + "/auth/changePassword";

  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      ...REQUEST_HEADERS,
      token: token.token,
    },
    body: JSON.stringify(data),
  });

  const payload: ApiResponse<{ token: string }> = await response.json();

  return payload;
}
