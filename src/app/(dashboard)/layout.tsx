import { authOption } from "@/auth";
import SYSTEM_ROLES from "@/lib/constants/system-roles";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import SideBar from "./_components/sidebar";

export default async function RootLayout({
  user,
  admin,
}: Readonly<{
  user: React.ReactNode;
  admin: React.ReactNode;
}>) {
  // Get user session
  const session = await getServerSession(authOption);

  // If not Found user session
  if (!session) {
    redirect("/login");
  }

  // Detect User Role
  const isAdmin = session.role === SYSTEM_ROLES.ADMIN;

  return (
    <main className="min-h-screen flex">
      {/* Sidebar - fixed on mobile, sticky on desktop */}
      <div className="lg:sticky lg:top-0 lg:h-screen z-6">
        <SideBar />
      </div>

      {/* Main content */}
      <section
        id="dashboard-scroll"
        className="lg:overflow-y-auto lg:h-screen flex-1 bg-gray-50 w-full "
      >
        {isAdmin ? admin : user}
      </section>
    </main>
  );
}
