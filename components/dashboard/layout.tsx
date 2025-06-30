"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-provider"
import { LayoutDashboard, User, Film, Calendar, Bell, Settings, LogOut, Menu, X, ChevronRight } from "lucide-react"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const pathname = usePathname()
  const { signOut } = useAuth()

  // Close sidebar on route change on mobile
  useEffect(() => {
    setIsSidebarOpen(false)
  }, [pathname])

  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      name: "Profile",
      href: "/dashboard/profile",
      icon: <User className="h-5 w-5" />,
    },
    {
      name: "Projects",
      href: "/dashboard/projects",
      icon: <Film className="h-5 w-5" />,
    },
    {
      name: "Schedule",
      href: "/dashboard/schedule",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      name: "Notifications",
      href: "/dashboard/notifications",
      icon: <Bell className="h-5 w-5" />,
    },
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ]

  return (
    <div className="min-h-screen bg-black pt-16">
      {/* Mobile Sidebar Toggle */}
      <div className="fixed bottom-4 right-4 z-40 md:hidden">
        <Button
          variant="default"
          size="icon"
          className="rounded-full shadow-lg"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-16 left-0 z-30 h-[calc(100vh-4rem)] w-64 transform bg-zinc-900 transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex-1 overflow-y-auto py-6 px-4">
            <nav className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                    pathname === item.href
                      ? "bg-green-600/20 text-green-500"
                      : "text-gray-300 hover:bg-zinc-800 hover:text-white"
                  }`}
                >
                  {item.icon}
                  <span className="ml-3">{item.name}</span>
                  {pathname === item.href && <ChevronRight className="ml-auto h-4 w-4" />}
                </Link>
              ))}
            </nav>
          </div>

          <div className="border-t border-zinc-800 p-4">
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-300 hover:bg-zinc-800 hover:text-white"
              onClick={signOut}
            >
              <LogOut className="mr-3 h-5 w-5" />
              Log out
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="md:pl-64">
        <main className="min-h-[calc(100vh-4rem)]">{children}</main>
      </div>
    </div>
  )
}
