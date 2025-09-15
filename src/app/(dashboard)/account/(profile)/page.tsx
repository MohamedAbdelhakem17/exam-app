import { getServerSession } from "next-auth";
import EditUserDataForm from "./_components/edit-user-data-fom";
import { authOptions } from "@/auth";
import { redirect } from "next/navigation";

export default async function Profile() {
  // Session
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/signin");
  }

  return (
    <EditUserDataForm
      userData={{
        firstName: session?.user?.firstName,
        lastName: session?.user?.lastName,
        email: session?.user?.email,
        username: session?.user?.username,
        phone: session?.user?.phone,
      }}
    />
  );
}
