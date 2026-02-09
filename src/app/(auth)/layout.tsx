import type { Metadata } from "next";
import AuthContent from "./_components/_layout/auth-sidebar";

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
      <AuthContent />

      {/* Main content */}
      {children}
    </main>
  );
}
