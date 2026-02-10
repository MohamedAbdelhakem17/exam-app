import type { Metadata } from "next";
import AuthSidebar from "./_components/_layout/auth-sidebar";

export const metadata: Metadata = {
  title: {
    default: "Exam App Authentication",
    template: "%s | Exam App",
  },
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      {/* Side content */}
      <div className="lg:sticky lg:top-0 lg:h-screen lg:overflow-hidden">
        <AuthSidebar />
      </div>

      {/* Main content */}
      <div className="lg:overflow-y-auto lg:h-screen">{children}</div>
    </main>
  );
}
