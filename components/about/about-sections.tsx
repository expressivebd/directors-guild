"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Image from "next/image"

export default function AboutSections() {
  const [missionRef, missionInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [visionRef, visionInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <>
      {/* Mission Section */}
      <section ref={missionRef} className="py-16 bg-transparent">
        <motion.div
          className="container mx-auto px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={missionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-gray-300 mb-6">
                The Directors Guild is dedicated to advancing the art and craft of directing in film, television, and
                other media. We strive to protect creative rights, promote fair working conditions, and foster
                excellence in directing.
              </p>
              <p className="text-lg text-gray-300">
                Through education, advocacy, and community building, we empower directors to realize their artistic
                visions and contribute to the cultural landscape.
              </p>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Directors Guild Mission"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Vision Section */}
      <section ref={visionRef} className="py-16 bg-zinc-900/70 backdrop-blur-sm">
        <motion.div
          className="container mx-auto px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={visionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Directors Guild Vision"
                fill
                className="object-cover"
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Vision</h2>
              <p className="text-lg text-gray-300 mb-6">
                We envision a world where directors are recognized and valued for their unique contributions to
                storytelling and visual arts. Our vision is to create a global community of directors who inspire and
                support each other.
              </p>
              <p className="text-lg text-gray-300">
                By fostering innovation, diversity, and excellence in directing, we aim to elevate the art form and
                ensure its continued relevance and impact in a rapidly evolving media landscape.
              </p>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  )
}
