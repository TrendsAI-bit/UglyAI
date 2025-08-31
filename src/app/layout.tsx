import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

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
      <body>
        <main className="min-h-dvh p-4 sm:p-6 md:p-10 grid place-items-center">
          <section className="crt w-full max-w-6xl">
            <div className="crt-bezel">
              {/* headline in pixel font */}
              <h1 className="h-pixel text-2xl sm:text-3xl md:text-4xl crt-glow mb-4">
                UGLY AI — PROFILE PIC FACTORY
              </h1>

              {children}
            </div>
          </section>
        </main>
        <Toaster />
      </body>
    </html>
  );
}
