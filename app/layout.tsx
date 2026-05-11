import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "MainkoBukittinggi.id — Kota Dua Waktu",
    template: "%s | MainkoBukittinggi.id",
  },
  description:
    "Digital playground berbasis budaya Bukittinggi, Sumatera Barat. Rasakan, mainkan, dan interaksikan dirimu dengan Kota Dua Waktu.",
  keywords: ["Bukittinggi", "Minangkabau", "wisata", "budaya", "Sumatera Barat"],
  openGraph: {
    title: "MainkoBukittinggi.id — Kota Dua Waktu",
    description:
      "Digital playground berbasis budaya Bukittinggi, Sumatera Barat.",
    url: "https://mainkobukittinggi.id",
    siteName: "MainkoBukittinggi.id",
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${geist.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white font-sans text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
        <Navbar />
        <main className="flex flex-1 flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
