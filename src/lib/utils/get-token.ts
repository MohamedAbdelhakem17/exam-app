import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";
export async function getToken() {
  const token = cookies().get("__Secure-next-auth.session-token")?.value;

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
