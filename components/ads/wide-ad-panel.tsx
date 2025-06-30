"use client"

import { motion } from "framer-motion"

interface WideAdPanelProps {
  className?: string
}

export default function WideAdPanel({ className = "" }: WideAdPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className={`w-full py-8 ${className}`}
    >
      <div className="container mx-auto px-4">
        <div className="bg-zinc-900/80 backdrop-blur-md border border-zinc-700 rounded-xl p-8 text-center">
          <p className="text-xs text-zinc-400 mb-4 uppercase tracking-wider">Advertisement</p>
          <div className="bg-zinc-800/50 rounded-lg h-32 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full mx-auto mb-4 opacity-60"></div>
              <p className="text-zinc-400 text-sm">Wide Advertisement Space</p>
              <p className="text-zinc-500 text-xs mt-1">728 x 90</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
