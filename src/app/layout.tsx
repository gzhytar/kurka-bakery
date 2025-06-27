import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Vypečená Kůrka - Tradiční kváskový chléb Brno",
  description: "Čerstvý kváskový chléb pečený tradičním způsobem v Brně. Pickup v úterý a pátek na Kopretinova 17, Brno-Jundrov.",
  keywords: ["kváskový chléb", "Brno", "pekárna", "tradiční pečení", "bio chléb"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs" className={inter.variable}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
