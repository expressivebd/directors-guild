// app/layout.tsx
import AuthProvider from "@/lib/auth-provider";
import "./globals.css";

export const metadata = {
  title: "Directors Guild",
  description:
    "A platform for directors to manage their projects and collaborate with teams",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
