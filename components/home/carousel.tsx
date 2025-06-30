"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { fetchCarouselItems } from "@/lib/api"
import type { CarouselItem } from "@/lib/types"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface HomeCarouselProps {
  fullScreen?: boolean
}

export default function HomeCarousel({ fullScreen = false }: HomeCarouselProps) {
  const [items, setItems] = useState<CarouselItem[]>([])
  const [activeIndex, setActiveIndex] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchCarouselItems()
        setItems(data)
        setLoading(false)
      } catch (error) {
        console.error("Error loading carousel items:", error)
        setLoading(false)
      }
    }

    loadData()
  }, [])

  useEffect(() => {
    if (items.length === 0) return

    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % items.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [items])

  const goToSlide = (index: number) => {
    setActiveIndex(index)
  }

  const goToPrevSlide = () => {
    setActiveIndex((current) => (current === 0 ? items.length - 1 : current - 1))
  }

  const goToNextSlide = () => {
    setActiveIndex((current) => (current + 1) % items.length)
  }

  if (loading) {
    return <div className={`${fullScreen ? "h-screen" : "h-[500px]"} bg-zinc-900 animate-pulse rounded-lg`}></div>
  }

  if (items.length === 0) {
    return null
  }

  return (
    <div className={`relative ${fullScreen ? "h-screen" : "h-[500px]"} overflow-hidden`}>
      {/* Carousel Items */}
      {items.map((item, index) => (
        <div
          key={item.id}
          className={`absolute inset-0 transition-opacity duration-500 carousel-item ${
            index === activeIndex ? "active" : ""
          }`}
        >
          <div className="relative h-full">
            <Image
              src={item.image || "/placeholder.svg"}
              alt={item.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-black/50 flex items-center">
              <div className="container mx-auto px-4">
                <motion.div
                  className="max-w-2xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                >
                  <h2 className="text-3xl md:text-5xl font-bold mb-4">{item.title}</h2>
                  <p className="text-lg md:text-xl text-gray-200 mb-6">{item.description}</p>
                  <Button asChild size="lg">
                    <Link href={item.link}>Learn More</Link>
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-2 rounded-full transition-colors z-10"
        onClick={goToPrevSlide}
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-2 rounded-full transition-colors z-10"
        onClick={goToNextSlide}
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${index === activeIndex ? "bg-white" : "bg-white/50"}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll indicator for full screen mode */}
      {fullScreen && (
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white flex flex-col items-center z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <span className="text-sm mb-2">Scroll Down</span>
          <ChevronDown className="h-6 w-6" />
        </motion.div>
      )}
    </div>
  )
}

// Add missing import
import { ChevronDown } from "lucide-react"
