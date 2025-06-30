import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
// import "./globals.css";
import "./globals.css";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/lib/auth-provider";
import FloatingShapes from "@/components/layout/floating-shapes";
import AppInitializer from "@/components/layout/app-initializer";
import AdPopupManager from "@/components/ads/ad-popup-manager";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Directors Guild - A Community of Visionary Filmmakers",
  description:
    "The Directors Guild is a prestigious organization dedicated to supporting and promoting the art of directing in film, television, and other media.",
  keywords: [
    "directors guild",
    "filmmakers",
    "directors",
    "film",
    "television",
    "events",
    "community",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://directorsguild.org",
    title: "Directors Guild - A Community of Visionary Filmmakers",
    description:
      "The Directors Guild is a prestigious organization dedicated to supporting and promoting the art of directing in film, television, and other media.",
    siteName: "Directors Guild",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} text-white min-h-screen flex flex-col overflow-x-hidden`}
      >
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
          >
            <AppInitializer>
              {/* FloatingShapes is now outside the main content div to ensure it's behind everything */}
              <FloatingShapes />
              <div className="flex flex-col min-h-screen relative z-10">
                <Navbar />
                <main className="flex-1 relative">{children}</main>
                <Footer />
              </div>
              <Toaster />
              <AdPopupManager />
            </AppInitializer>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
