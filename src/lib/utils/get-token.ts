import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";
import { AUTH_COOKIE } from "./get-cookie";
export async function getToken() {
  const token = cookies().get(AUTH_COOKIE)?.value;

  if (!token) return null;

  try {
    const jwt = await decode({
      token,
      secret: process.env.NEXTAUTH_SECRET!,
    });

    return jwt;
  } catch (error) {
    void error;

    return null;
  }
}
