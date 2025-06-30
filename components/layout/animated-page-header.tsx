"use client"

import { motion } from "framer-motion"

interface AnimatedPageHeaderProps {
  title: string
  description?: string
}

export default function AnimatedPageHeader({ title, description }: AnimatedPageHeaderProps) {
  return (
    <section className="bg-transparent pt-32 pb-16">
      <div className="container mx-auto px-4 text-center">
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {title}
        </motion.h1>

        {description && (
          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {description}
          </motion.p>
        )}
      </div>
    </section>
  )
}
