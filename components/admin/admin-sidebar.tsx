"use client"

import { useAdminAuth } from "@/lib/admin-auth"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Users,
  UserPlus,
  CreditCard,
  BookOpen,
  Handshake,
  Gift,
  Newspaper,
  Settings,
  LogOut,
  Shield,
  Home,
  X,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navigationItems = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: Home,
    permission: null,
  },
  {
    title: "Member Approval",
    href: "/admin/dashboard/members/approval",
    icon: Users,
    permission: "members.approve",
  },
  {
    title: "Member Addition",
    href: "/admin/dashboard/members/addition",
    icon: UserPlus,
    permission: "members.create",
  },
  {
    title: "Payment Dashboard",
    href: "/admin/dashboard/members/payments",
    icon: CreditCard,
    permission: "payments.read",
  },
  {
    title: "Directory Control",
    href: "/admin/dashboard/directory",
    icon: BookOpen,
    permission: "directory.read",
  },
  {
    title: "Partners Control",
    href: "/admin/dashboard/partners",
    icon: Handshake,
    permission: "partners.read",
  },
  {
    title: "Incentives Control",
    href: "/admin/dashboard/incentives",
    icon: Gift,
    permission: "incentives.read",
  },
  {
    title: "News Control",
    href: "/admin/dashboard/news",
    icon: Newspaper,
    permission: "news.read",
  },
]

interface AdminSidebarProps {
  onClose?: () => void
}

export function AdminSidebar({ onClose }: AdminSidebarProps) {
  const { admin, logout, hasPermission } = useAdminAuth()
  const pathname = usePathname()

  if (!admin) return null

  return (
    <div className="flex h-full w-64 flex-col bg-slate-900 border-r border-slate-700">
      {/* Header with close button for mobile */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-slate-700 bg-gradient-to-r from-purple-600 to-violet-600">
        <div className="flex items-center space-x-2">
          <Shield className="h-5 w-5 text-white" />
          <span className="text-sm font-semibold text-white">Admin Panel</span>
        </div>
        {onClose && (
          <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/10 md:hidden">
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <nav className="space-y-1 p-3">
            {navigationItems.map((item) => {
              const canAccess = !item.permission || hasPermission(item.permission) || hasPermission("*")
              const isActive = pathname === item.href

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-gradient-to-r from-purple-500 to-violet-500 text-white shadow-lg shadow-purple-500/25"
                      : canAccess
                        ? "text-slate-300 hover:bg-slate-800 hover:text-white hover:shadow-md"
                        : "text-slate-600 cursor-not-allowed",
                  )}
                  onClick={(e) => {
                    if (!canAccess) {
                      e.preventDefault()
                    } else if (onClose) {
                      onClose()
                    }
                  }}
                >
                  <item.icon className="h-4 w-4" />
                  <span className="truncate">{item.title}</span>
                  {!canAccess && <span className="ml-auto text-xs text-red-400">🔒</span>}
                </Link>
              )
            })}
          </nav>
        </ScrollArea>
      </div>

      <div className="border-t border-slate-700 p-3 space-y-2 bg-slate-800/50">
        {admin.role === "super_admin" && (
          <Link href="/admin/dashboard/admins" onClick={onClose}>
            <Button
              variant="outline"
              size="sm"
              className="w-full bg-slate-700 border-slate-600 text-slate-200 hover:bg-slate-600 hover:text-white hover:border-purple-500 transition-all duration-200"
            >
              <Settings className="mr-2 h-3 w-3" />
              <span className="text-xs">Manage Admins</span>
            </Button>
          </Link>
        )}
        <Button
          variant="destructive"
          size="sm"
          className="w-full bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-red-500/25 transition-all duration-200"
          onClick={() => {
            logout()
            if (onClose) onClose()
          }}
        >
          <LogOut className="mr-2 h-3 w-3" />
          <span className="text-xs">Logout</span>
        </Button>
      </div>
    </div>
  )
}
