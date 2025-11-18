import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Productivity Hub - Your Personal Tool Collection",
  description: "A collection of productivity tools to help you stay focused and organized",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
