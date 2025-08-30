import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ugly AI - The Ultimate Cursed Avatar Factory",
  description: "Create intentionally awful, pixelated, and cursed profile pictures using AI generation or apply retro filters to your existing images.",
  keywords: ["avatar", "ai", "ugly", "cursed", "pixelated", "retro", "profile picture"],
  authors: [{ name: "Ugly AI Team" }],
  openGraph: {
    title: "Ugly AI - The Ultimate Cursed Avatar Factory",
    description: "Create intentionally awful, pixelated, and cursed profile pictures",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geist.variable} ${geistMono.variable} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
