"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface Admin {
  id: string
  name: string
  email: string
  role: string
  permissions: string[]
}

interface AdminAuthContextType {
  admin: Admin | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  hasPermission: (permission: string) => boolean
  isLoading: boolean
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined)

// Mock admin data - replace with real API calls
const mockAdmins: Record<string, { password: string; admin: Admin }> = {
  "superadmin@directorsguild.com": {
    password: "admin123",
    admin: {
      id: "1",
      name: "Super Admin",
      email: "superadmin@directorsguild.com",
      role: "super_admin",
      permissions: ["*"], // All permissions
    },
  },
  "newsadmin@directorsguild.com": {
    password: "admin123",
    admin: {
      id: "2",
      name: "News Admin",
      email: "newsadmin@directorsguild.com",
      role: "news_admin",
      permissions: ["news.read", "news.create", "news.update", "news.delete"],
    },
  },
  "partnersadmin@directorsguild.com": {
    password: "admin123",
    admin: {
      id: "3",
      name: "Partners Admin",
      email: "partnersadmin@directorsguild.com",
      role: "partners_admin",
      permissions: ["partners.read", "partners.create", "partners.update", "partners.delete"],
    },
  },
}

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [admin, setAdmin] = useState<Admin | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored admin session
    const storedAdmin = localStorage.getItem("admin")
    if (storedAdmin) {
      setAdmin(JSON.parse(storedAdmin))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    const mockAdmin = mockAdmins[email]
    if (mockAdmin && mockAdmin.password === password) {
      setAdmin(mockAdmin.admin)
      localStorage.setItem("admin", JSON.stringify(mockAdmin.admin))
      return true
    }
    return false
  }

  const logout = () => {
    setAdmin(null)
    localStorage.removeItem("admin")
  }

  const hasPermission = (permission: string): boolean => {
    if (!admin) return false
    return admin.permissions.includes("*") || admin.permissions.includes(permission)
  }

  return (
    <AdminAuthContext.Provider
      value={{
        admin,
        login,
        logout,
        hasPermission,
        isLoading,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  )
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext)
  if (context === undefined) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider")
  }
  return context
}
