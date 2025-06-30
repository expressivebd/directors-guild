"use client"

import type React from "react"

import { useState } from "react"
import LoadingScreen from "@/components/layout/loading-screen"

interface AppInitializerProps {
  children: React.ReactNode
}

export default function AppInitializer({ children }: AppInitializerProps) {
  const [loading, setLoading] = useState(true)

  // Handle loading screen
  const handleFinishLoading = () => {
    setLoading(false)
  }

  return (
    <>
      {loading && <LoadingScreen finishLoading={handleFinishLoading} />}
      {children}
    </>
  )
}
