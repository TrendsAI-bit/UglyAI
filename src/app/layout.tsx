import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Ugly AI - Create Awful Profile Pictures",
  description: "Create intentionally awful, pixelated, and cursed profile pictures",
  keywords: ["avatar", "ugly", "cursed", "pixelated", "profile picture"],
  authors: [{ name: "Ugly AI Team" }],
  openGraph: {
    title: "Ugly AI - Create Awful Profile Pictures",
    description: "Create intentionally awful profile pictures",
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
      <body>
        <main className="min-h-screen p-4 sm:p-6 md:p-8">
          <div className="max-w-4xl mx-auto">
            {children}
          </div>
        </main>
        <Toaster />
      </body>
    </html>
  );
}
