import type React from "react";
import AuthProvider from "@/lib/auth-provider";
import "./globals.css";

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthProvider>{children}</AuthProvider>;
}
