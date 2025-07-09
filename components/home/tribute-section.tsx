"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useEffect, useState } from "react"
import { Star, Calendar, Film } from "lucide-react"

import type { Legends } from "@/lib/types"
import { fetchLegends } from "@/lib/contentful"


export default function TributeSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  const [legends, setLegends] = useState<Legends[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)

  // Fetch legends data

  useEffect(() =>{
    const loadLegends = async () =>{
      const data = await fetchLegends()
      setLegends(data)
    }

    loadLegends()
  }, [])

  // Auto-slide functionality
  useEffect(() => {
    if (!inView || legends.length === 0) return
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % legends.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [inView, legends])

  

  return (
    <section className="py-20 bg-gradient-to-b from-zinc-900/70 to-black relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Honoring the Legends</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Celebrating the visionary directors who shaped cinema and continue to inspire generations of filmmakers
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative overflow-hidden lg:px-8">
          <motion.div
            className="flex transition-transform duration-1000 ease-in-out lg:gap-8"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {legends.map((legend, index) => (
              <motion.div
                key={legend.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative bg-zinc-900/50 backdrop-blur-sm rounded-xl overflow-hidden border border-zinc-800 hover:border-amber-500/50 transition-all duration-300 flex-shrink-0 snap-start
                  w-[calc(100%-2rem)] lg:w-[500px] xl:w-[672px]
                  h-[360px] sm:h-[360px] md:h-[380px] mx-4 lg:mx-0"
              >
                {/* Upper Section - Yellowish Background with Photo and Info */}
                <div className="relative bg-gradient-to-r from-amber-400/90 via-yellow-400/90 to-amber-500/90 p-3 sm:p-4 md:p-5 h-32 sm:h-36">

                  {/* Lifespan in top-right corner */}
                  <div className="absolute top-3 right-3 bg-black/20 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-black text-sm font-medium flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {legend.lifespan}
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    {/* Profile Photo - Bigger */}
                    <div className="relative flex-shrink-0">
                      <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-3 border-black/20 shadow-lg">

                        <Image
                          src={legend.image || "/placeholder.svg"}
                          alt={legend.name}
                          width={112}
                          height={112}
                          className="object-contain grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-black rounded-full flex items-center justify-center">
                        <Star className="w-3 h-3 text-amber-400" />
                      </div>
                    </div>

                    {/* Name and Genre */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-black mb-1 truncate">{legend.name}</h3>
                      <p className="text-black/80 text-sm font-medium">{legend.genre} Director</p>
                    </div>
                  </div>
                </div>

                {/* Lower Section - Biography and Notable Works */}
                <div className="p-5 flex flex-col h-[244px]">
                  {/* Biography */}
                  <div className="mb-4 flex-1 overflow-y-auto max-h-[110px] pr-1">
                    <p className="text-gray-100 text-xs sm:text-sm md:text-base leading-relaxed">
                      {legend.bio}
                    </p>
                  </div>

                  {/* Notable Works */}
                  <div className="border-t border-zinc-700 pt-4 mt-auto">
                    <div className="flex items-center gap-2 mb-3">
                      <Film className="w-4 h-4 text-amber-400" />
                      <h4 className="text-sm font-semibold text-white">Notable Works</h4>
                    </div>
                      <div className="flex gap-2 overflow-x-auto whitespace-nowrap pr-1 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
                        {legend.famousWorks.map((work, workIndex) => (
                          <span
                            key={workIndex}
                            className="px-2 py-1 bg-amber-500/10 text-xs text-amber-300 rounded border border-amber-500/20 hover:border-amber-500/40 transition-colors whitespace-nowrap mb-2"
                          >
                            {work}
                          </span>
                        ))}
                      </div>

                  </div>
                </div>

                {/* Decorative gradient line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Progress Indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {legends.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-amber-500 scale-125" : "bg-gray-600 hover:bg-gray-500"
              }`}
            />
          ))}
        </div>

        {/* Decorative quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <blockquote className="text-xl md:text-2xl text-gray-400 italic max-w-4xl mx-auto">
            "Cinema is a matter of what's in the frame and what's out."
          </blockquote>
          <cite className="text-amber-400 text-sm mt-2 block">— Martin Scorsese</cite>
        </motion.div>
      </div>
    </section>
  )
}
