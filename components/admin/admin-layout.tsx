"use client"

import type React from "react"
import { useAdminAuth } from "@/lib/admin-auth"
import { AdminSidebar } from "./admin-sidebar"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Loader2, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AdminLayoutProps {
  children: React.ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const { admin, isLoading } = useAdminAuth()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    if (!isLoading && !admin) {
      router.push("/admin")
    }
  }, [admin, isLoading, router])

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-900">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-purple-500 mx-auto mb-4" />
          <p className="text-slate-400">Loading admin panel...</p>
        </div>
      </div>
    )
  }

  if (!admin) {
    return null
  }

  return (
    <div className="flex h-screen bg-slate-900 relative">
      {/* Mobile Hamburger Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSidebarOpen(true)}
          className="text-white hover:bg-slate-800"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Sidebar - Hidden on mobile, overlay when open */}
      <div
        className={`
        fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0 md:z-auto
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}
      >
        <AdminSidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-slate-800 w-full md:w-auto">
        <div className="min-h-full bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800">
          <div className="p-4 md:p-6 pt-16 md:pt-6">{children}</div>
        </div>
      </main>
    </div>
  )
}
