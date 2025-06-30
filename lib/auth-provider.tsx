"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type User = {
  id: string
  name: string
  email: string
  image?: string
  role: "member" | "admin"
}

type AuthContextType = {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string, rememberMe: boolean) => Promise<void>
  signOut: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in from localStorage or session
    const storedUser = localStorage.getItem("dg-user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const signIn = async (email: string, password: string, rememberMe: boolean) => {
    // In a real app, this would make an API call to authenticate
    // For demo purposes, we'll simulate a successful login
    const mockUser: User = {
      id: "user-1",
      name: "John Doe",
      email: email,
      role: "member",
    }

    setUser(mockUser)

    // Store user in localStorage if rememberMe is true
    if (rememberMe) {
      localStorage.setItem("dg-user", JSON.stringify(mockUser))
    }
  }

  const signOut = () => {
    setUser(null)
    localStorage.removeItem("dg-user")
  }

  return <AuthContext.Provider value={{ user, loading, signIn, signOut }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
