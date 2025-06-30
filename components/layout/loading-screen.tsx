"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

interface LoadingScreenProps {
  finishLoading: () => void
}

const LoadingScreen = ({ finishLoading }: LoadingScreenProps) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsMounted(true)
    }, 10)

    return () => clearTimeout(timeout)
  }, [])

  useEffect(() => {
    const timeout = setTimeout(() => {
      finishLoading()
    }, 2500) // Adjust timing as needed

    return () => clearTimeout(timeout)
  }, [finishLoading])

  return (
    <AnimatePresence>
      {isMounted && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-b from-[#0f0f1a] to-[#16213e]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <div className="relative flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mb-6"
            >
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DG%20icon-01%20%281%29-Ks4Io86qrVHAA1QYvmBENR1z2Cd8if.png"
                alt="Directors Guild Logo"
                width={120}
                height={120}
                priority
              />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-3xl font-bold mb-8"
            >
              Directors Guild
            </motion.h1>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "200px" }}
              transition={{ delay: 0.6, duration: 1.2, ease: "easeInOut" }}
              className="h-1 bg-green-500 rounded-full"
            />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="mt-4 text-sm text-gray-400"
            >
              A community of visionary filmmakers
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default LoadingScreen
