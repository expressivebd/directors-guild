"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useEffect, useState } from "react"

interface Legend {
  id: string
  name: string
  years: string
  image: string
  contribution: string[]
  bio: string
}

const legends: Legend[] = [
  {
    id: "1",
    name: "Stanley Kubrick",
    years: "1928 - 1999",
    image: "/placeholder.svg?height=400&width=400",
    contribution: ["Cinematography", "Visual Storytelling", "Perfectionism"],
    bio: "Visionary director known for meticulous attention to detail and groundbreaking visual techniques in films like 2001: A Space Odyssey and The Shining.",
  },
  {
    id: "2",
    name: "Akira Kurosawa",
    years: "1910 - 1998",
    image: "/placeholder.svg?height=400&width=400",
    contribution: ["Samurai Films", "Camera Movement", "Weather as Character"],
    bio: "Japanese master filmmaker who revolutionized cinema with dynamic camera work and epic storytelling in Seven Samurai and Rashomon.",
  },
  {
    id: "3",
    name: "Orson Welles",
    years: "1915 - 1985",
    image: "/placeholder.svg?height=400&width=400",
    contribution: ["Deep Focus", "Narrative Innovation", "Radio Drama"],
    bio: "Pioneering director and actor who changed cinema forever with Citizen Kane, introducing innovative camera techniques and narrative structures.",
  },
  {
    id: "4",
    name: "Federico Fellini",
    years: "1920 - 1993",
    image: "/placeholder.svg?height=400&width=400",
    contribution: ["Surrealism", "Dream Sequences", "Italian Neorealism"],
    bio: "Italian maestro known for his distinctive style blending fantasy and reality in masterpieces like 8½ and La Dolce Vita.",
  },
  {
    id: "5",
    name: "Ingmar Bergman",
    years: "1918 - 2007",
    image: "/placeholder.svg?height=400&width=400",
    contribution: ["Psychological Drama", "Existential Themes", "Close-ups"],
    bio: "Swedish director who explored the human condition with unparalleled depth in films like The Seventh Seal and Persona.",
  },
  {
    id: "6",
    name: "Alfred Hitchcock",
    years: "1899 - 1980",
    image: "/placeholder.svg?height=400&width=400",
    contribution: ["Suspense", "Camera Techniques", "Psychological Thriller"],
    bio: "The Master of Suspense who defined the thriller genre with innovative camera work and psychological storytelling in Psycho and Vertigo.",
  },
]

export default function TributeSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [currentIndex, setCurrentIndex] = useState(0)

  // Auto-slide functionality
  useEffect(() => {
    if (!inView) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % legends.length)
    }, 4000) // Slide every 4 seconds

    return () => clearInterval(interval)
  }, [inView])

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
        <div className="relative overflow-hidden">
          <motion.div
            className="flex transition-transform duration-1000 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / 3)}%)`,
              width: `${(legends.length * 100) / 3}%`,
            }}
          >
            {legends.map((legend, index) => (
              <motion.div
                key={legend.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative bg-zinc-900/50 backdrop-blur-sm rounded-xl overflow-hidden border border-zinc-800 hover:border-zinc-600 transition-all duration-300 mx-4"
                style={{ width: `${100 / 3}%`, flexShrink: 0 }}
              >
                <div className="relative h-80 overflow-hidden">
                  <Image
                    src={legend.image || "/placeholder.svg"}
                    alt={legend.name}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                  {/* Years overlay */}
                  <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-white text-sm font-medium">{legend.years}</span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{legend.name}</h3>

                  {/* Contribution tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {legend.contribution.map((contrib, i) => (
                      <span
                        key={i}
                        className="bg-amber-500/20 text-amber-300 text-xs px-2 py-1 rounded-full border border-amber-500/30"
                      >
                        {contrib}
                      </span>
                    ))}
                  </div>

                  <p className="text-gray-300 text-sm leading-relaxed">{legend.bio}</p>
                </div>

                {/* Decorative element */}
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
