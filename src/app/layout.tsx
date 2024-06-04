import { Inter } from "next/font/google";

import { Toaster } from "@/components/ui/sonner";

import type { Metadata } from "next";

import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PetSoft - Pet daycare software",
  description: "Take care of people's pet responsibly with PetSoft.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} min-h-screen bg-default text-sm font-semibold text-zinc-900`}
      >
        {children}

        <Toaster position="top-right" />
      </body>
    </html>
  );
}
