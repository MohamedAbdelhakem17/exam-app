import SideBar from "./_components/sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
        {children}
      </section>
    </main>
  );
}
