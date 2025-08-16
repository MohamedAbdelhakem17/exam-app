import type { Metadata } from "next";
import AuthContent from "./_components/auth-content";

export const metadata: Metadata = {
  title: {
    default: "Exam App Authentication",
    template: "%s | Exam App",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="grid min-h-screen grid-cols-2">
      {/* Side content */}
      <AuthContent />

      {/* Main content */}
      {children}
    </main>
  );
}
