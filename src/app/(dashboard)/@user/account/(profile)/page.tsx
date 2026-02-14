import { getServerSession } from "next-auth";
import EditUserDataForm from "./_components/edit-user-data-fom";
import { authOption } from "@/auth";
import { redirect } from "next/navigation";

export default async function Profile() {
  const session = await getServerSession(authOption);

  if (!session) {
    return redirect("/signin");
  }

  return (
    <EditUserDataForm
      userData={{
        firstName: session.firstName,
        lastName: session.lastName,
        email: session.email,
        username: session.username,
        phone: session.phone,
      }}
    />
  );
}
