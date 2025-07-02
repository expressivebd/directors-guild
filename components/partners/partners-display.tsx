"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Partner } from "@/lib/types"
import { Tag, Calendar, MapPin } from "lucide-react"

interface PartnersDisplayProps {
  partners: Partner[]
}

export default function PartnersDisplay({ partners }: PartnersDisplayProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="py-16 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DG%20icon-01%20%281%29-Ks4Io86qrVHAA1QYvmBENR1z2Cd8if.png"
            alt="Directors Guild Logo"
            width={100}
            height={100}
          />
        </motion.div>
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-xl font-bold mb-4"
        >
          Loading Partner Information
        </motion.h2>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "200px" }}
          transition={{ delay: 0.5, duration: 1, ease: "easeInOut" }}
          className="h-1 bg-green-500 rounded-full"
        />
      </div>
    )
  }

  // Filter only featured partners (from Contentful field)
  const featuredPartners = partners.filter((partner) => partner.isFeatured)

  return (
    <section ref={ref} className="py-12 bg-zinc-900/70 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Featured Partners</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredPartners.map((partner, index) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-zinc-800 h-full overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-t-4 border-t-green-500">
                <CardContent className="p-0 h-full">
                  <div className="relative h-[140px]">
                    <Image
                      src={partner.brandLogo || "/placeholder.svg?height=140&width=300"}
                      alt={partner.brandName}
                      fill
                      className="object-contain p-4 bg-white"
                    />
                  </div>
                  <div className="p-6 flex flex-col h-[calc(100%-140px)]">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold">{partner.brandName}</h3>
                      <Badge variant="outline" className="bg-green-600/20 text-green-400 border-green-500">
                        {partner.discountPercentage}% OFF
                      </Badge>
                    </div>
                    <p className="text-gray-300 mb-4 flex-grow">{partner.shortDescription}</p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      <div className="flex items-center text-sm text-gray-400">
                        <Tag className="mr-1 h-4 w-4" />
                        <span>{partner.category}</span>
                      </div>
                      {partner.branches && partner.branches.length > 0 && (
                        <div className="flex items-center text-sm text-gray-400">
                          <MapPin className="mr-1 h-4 w-4" />
                          <span>{partner.branches.length} branches</span>
                        </div>
                      )}
                      {partner.expiryDate && (
                        <div className="flex items-center text-sm text-gray-400">
                          <Calendar className="mr-1 h-4 w-4" />
                          <span>Expires: {partner.expiryDate}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
