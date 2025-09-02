import SideBar from "./_components/side-bar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen flex">
      {/* Side content */}
      <SideBar />

      {/* Main content */}
      <section className="ml-xxl flex-1">
        {children}
      </section>
    </main>
  );
}
