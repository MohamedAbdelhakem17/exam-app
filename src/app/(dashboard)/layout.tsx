import SideBar from "./_components/side-bar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="grid min-h-screen grid-cols-2">
      {/* Side content */}
      <SideBar />
      {/* Main content */}
      {children}
    </main>
  );
}
