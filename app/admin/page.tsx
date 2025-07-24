"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function AdminPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "loading") return; // Wait for session to load

    if (!session) {
      // Not authenticated, redirect to signin
      router.push("/auth/signin");
    } else if (session.user?.adminRoles?.includes("superAdmin")) {
      // Is admin, redirect to admin dashboard
      router.push("/admin/dashboard");
    } else {
      // Authenticated but not admin, redirect to regular dashboard
      router.push("/dashboard");
    }
  }, [session, status, router]);

  // Show loading while redirecting
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-white">Redirecting...</div>
    </div>
  );
}
