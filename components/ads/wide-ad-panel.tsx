"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import type { AdItem } from "@/lib/types"

interface WideAdPanelProps {
  ad?: AdItem
  className?: string
}

export default function WideAdPanel({ ad, className = "" }: WideAdPanelProps) {
  if (!ad) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className={`w-full py-8 ${className}`}
    >
      <div className="container mx-auto px-4">
        <Link href={ad.link || "#"} target="_blank" rel="noopener noreferrer">
          <div className="relative w-full h-32 md:h-40 lg:h-44 xl:h-52 overflow-hidden rounded-xl bg-zinc-900 flex items-center justify-center">
            <Image
              src={ad.imageUrl}
              alt="Advertisement"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 728px"
              priority
            />
          </div>
        </Link>
      </div>
    </motion.div>
  )
}
