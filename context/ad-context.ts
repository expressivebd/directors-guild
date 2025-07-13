// context/ad-context.ts
"use client"

import { createContext, useContext } from "react"
import type { AdItem } from "@/lib/types"

export const AdContext = createContext<AdItem[]>([])

export const useAds = () => useContext(AdContext)
