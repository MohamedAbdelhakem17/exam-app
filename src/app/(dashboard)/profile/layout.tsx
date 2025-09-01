
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen flex">
      {/* Side content */}
      {/* Main content */}

      <section className="ml-xxl px-6">
        {children}
      </section>
    </main>
  );
}
