"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useEffect, useState } from "react"
import { Star, Calendar, Film } from "lucide-react"

interface Legend {
  id: string
  name: string
  genre: string
  lifespan: string
  image: string
  bio: string
  famousWorks: string[]
}

const legends: Legend[] = [
  {
    id: "1",
    name: "Stanley Kubrick",
    genre: "Visionary Director",
    lifespan: "1928 - 1999",
    image: "/placeholder.svg?height=400&width=400",
    bio: "Visionary director known for meticulous attention to detail and groundbreaking visual techniques in films like 2001: A Space Odyssey and The Shining.",
    famousWorks: ["2001: A Space Odyssey", "The Shining", "A Clockwork Orange", "Full Metal Jacket"],
  },
  {
    id: "2",
    name: "Akira Kurosawa",
    genre: "Epic Director",
    lifespan: "1910 - 1998",
    image: "/placeholder.svg?height=400&width=400",
    bio: "Japanese master filmmaker who revolutionized cinema with dynamic camera work and epic storytelling in Seven Samurai and Rashomon.",
    famousWorks: ["Seven Samurai", "Rashomon", "Yojimbo", "Ikiru"],
  },
  {
    id: "3",
    name: "Orson Welles",
    genre: "Innovative Director",
    lifespan: "1915 - 1985",
    image: "/placeholder.svg?height=400&width=400",
    bio: "Pioneering director and actor who changed cinema forever with Citizen Kane, introducing innovative camera techniques and narrative structures.",
    famousWorks: ["Citizen Kane", "Touch of Evil", "The Magnificent Ambersons", "Chimes at Midnight"],
  },
  {
    id: "4",
    name: "Federico Fellini",
    genre: "Surrealist Director",
    lifespan: "1920 - 1993",
    image: "/placeholder.svg?height=400&width=400",
    bio: "Italian maestro known for his distinctive style blending fantasy and reality in masterpieces like 8½ and La Dolce Vita.",
    famousWorks: ["8½", "La Dolce Vita", "Amarcord", "La Strada"],
  },
  {
    id: "5",
    name: "Ingmar Bergman",
    genre: "Psychological Director",
    lifespan: "1918 - 2007",
    image: "/placeholder.svg?height=400&width=400",
    bio: "Swedish director who explored the human condition with unparalleled depth in films like The Seventh Seal and Persona.",
    famousWorks: ["The Seventh Seal", "Persona", "Wild Strawberries", "Cries and Whispers"],
  },
  {
    id: "6",
    name: "Alfred Hitchcock",
    genre: "Suspense Master",
    lifespan: "1899 - 1980",
    image: "/placeholder.svg?height=400&width=400",
    bio: "The Master of Suspense who defined the thriller genre with innovative camera work and psychological storytelling in Psycho and Vertigo.",
    famousWorks: ["Psycho", "Vertigo", "North by Northwest", "Rear Window"],
  },
  {
    id: "7",
    name: "Chirstopher Haland",
    genre: "Comedy Director",
    lifespan: "1956 - 2000",
    image: "/placeholder.svg?height=400&width=400",
    bio: "The Master of comedy who defined the thriller genre with innovative camera work and psychological storytelling in Psycho and Vertigo.",
    famousWorks: ["Comedy King", "Halando", "South by southest", "Rear Window"],
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
                className="group relative bg-zinc-900/50 backdrop-blur-sm rounded-xl overflow-hidden border border-zinc-800 hover:border-amber-500/50 transition-all duration-300 mx-4"
                style={{ width: `${100 / 4}%`, flexShrink: 0, height: "380px" }}
              >
                {/* Upper Section - Yellowish Background with Photo and Info */}
                <div className="relative bg-gradient-to-r from-amber-400/90 via-yellow-400/90 to-amber-500/90 p-5 h-36">
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
                      <div className="w-24 h-24 rounded-full overflow-hidden border-3 border-black/20 shadow-lg">
                        <Image
                          src={legend.image || "/placeholder.svg"}
                          alt={legend.name}
                          width={96}
                          height={96}
                          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-black rounded-full flex items-center justify-center">
                        <Star className="w-3 h-3 text-amber-400" />
                      </div>
                    </div>

                    {/* Name and Genre */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-bold text-black mb-1 truncate">{legend.name}</h3>
                      <p className="text-black/80 text-sm font-medium">{legend.genre}</p>
                    </div>
                  </div>
                </div>

                {/* Lower Section - Biography and Notable Works */}
                <div className="p-5 flex flex-col h-[244px]">
                  {/* Biography */}
                  <div className="mb-4 flex-1">
                    <p className="text-gray-300 text-sm leading-relaxed line-clamp-4">{legend.bio}</p>
                  </div>

                  {/* Notable Works */}
                  <div className="border-t border-zinc-700 pt-4 mt-auto">
                    <div className="flex items-center gap-2 mb-3">
                      <Film className="w-4 h-4 text-amber-400" />
                      <h4 className="text-sm font-semibold text-white">Notable Works</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {legend.famousWorks.map((work, workIndex) => (
                        <span
                          key={workIndex}
                          className="px-2 py-1 bg-amber-500/10 text-xs text-amber-300 rounded border border-amber-500/20 hover:border-amber-500/40 transition-colors"
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
