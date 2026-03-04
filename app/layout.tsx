import MainNavigation from "../components/navigation/main-navigation";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Book Shelf Project",
  description: "An app for reviews of Google books",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <MainNavigation />
        {children}
      </body>
    </html>
  );
}
