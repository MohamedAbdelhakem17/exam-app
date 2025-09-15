import { redirect } from "next/navigation";
import { getToken } from "../utils/get-token";
import { REQUEST_HEADERS } from "../constants/request-headers.constant";

export async function getSubjects() {
  const token = await getToken();
  if (!token) {
    redirect("/signin");
  }
  const response = await fetch(`${process.env.BASE_API_URL}/subjects?limit=6&page==1`, {
    method: "GET",
    headers: {
      token: token?.token,
      ...REQUEST_HEADERS,
    },
  });

  if (!response.ok) {
    return Error("Failed to fetch subjects");
  }

  const payload = await response.json();

  return payload;
}
