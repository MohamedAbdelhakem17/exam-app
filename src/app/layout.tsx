import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistMono = localFont({
  src: "../../public/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const inter = localFont({
  src: "../../public/fonts/Inter.ttf",
  variable: "--font-inter",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: 'Exam App', 
  description: 'A smart exam platform to enhance your learning journey.',
  icons: {
    icon: '/icons/folder-code.svg',
  }
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistMono.className} antialiased ${inter.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
