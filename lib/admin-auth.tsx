"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useAdminAuth() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const isLoading = status === "loading";
  const isAuthenticated = !!session;
  const hasAdminAccess = session?.user?.adminRoles?.includes("superAdmin");

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/auth/signin");
    } else if (!isLoading && isAuthenticated && !hasAdminAccess) {
      router.push("/dashboard");
    }
  }, [isLoading, isAuthenticated, hasAdminAccess, router]);

  return {
    admin: hasAdminAccess ? session?.user : null,
    isLoading,
    hasPermission: (permission: string) => hasAdminAccess, // For backwards compatibility
    isAuthenticated,
    hasAdminAccess,
  };
}
