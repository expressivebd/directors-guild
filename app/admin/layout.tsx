import type React from "react"
import { AdminAuthProvider } from "@/lib/admin-auth"
import "./globals.css"

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (

    <html lang="en" suppressHydrationWarning>
          <body>


        <AdminAuthProvider>{children}</AdminAuthProvider>
          </body>

    </html>
    )
}
