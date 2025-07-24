import type React from "react";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import AdPopupManager from "@/components/ads/ad-popup-manager";
import AuthProvider from "@/lib/auth-provider";
import NewsMarquee from "@/components/layout/news-marquee";
import { fetchNewsArticles } from "@/lib/contentful";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Directors Guild",
  description: "A community for film directors",
  generator: "v0.dev",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const newsArticles = await fetchNewsArticles();

  return (
    <div className={cn(inter.className, "bg-black text-white")}>
      <AuthProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen relative z-10">
            <Navbar />
            <main className="flex-1 relative">{children}</main>
            <Footer />

            <div className="fixed bottom-0 left-0 right-0 z-40 bg-zinc-900/95 backdrop-blur-md border-t border-zinc-800">
              <NewsMarquee articles={newsArticles} />
            </div>
          </div>
          {/* <AdPopupManager /> */}
        </ThemeProvider>
      </AuthProvider>
    </div>
  );
}
