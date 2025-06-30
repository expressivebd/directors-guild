"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import type { NewsArticle } from "@/lib/types"

interface NewsMarqueeProps {
  articles: NewsArticle[]
}

export default function NewsMarquee({ articles }: NewsMarqueeProps) {
  const [duplicatedArticles, setDuplicatedArticles] = useState<NewsArticle[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState(0)
  const [contentWidth, setContentWidth] = useState(0)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Duplicate articles to ensure continuous scrolling
    setDuplicatedArticles([...articles, ...articles, ...articles])

    // Measure container and content width for animation
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth)
    }

    if (contentRef.current) {
      setContentWidth(contentRef.current.scrollWidth)
    }

    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth)
      }
      if (contentRef.current) {
        setContentWidth(contentRef.current.scrollWidth)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [articles])

  // Calculate animation duration based on content length
  const animationDuration = contentWidth * 0.02 // Adjust speed as needed

  return (
    <div className="relative overflow-hidden py-3" ref={containerRef}>
      <div className="flex items-center absolute left-0 top-0 bottom-0 bg-gradient-to-r from-zinc-900/95 to-transparent z-10 px-4 py-2">
        <span className="text-green-400 font-bold mr-2 text-sm">LATEST NEWS</span>
        <ArrowRight className="h-3 w-3 text-green-400" />
      </div>

      <motion.div
        ref={contentRef}
        className="flex items-center whitespace-nowrap pl-[140px]" // Reduced padding for better mobile experience
        animate={{
          x: [0, -contentWidth / 3], // Only animate through 1/3 of the content since we duplicated it 3 times
        }}
        transition={{
          duration: animationDuration,
          ease: "linear",
          repeat: Number.POSITIVE_INFINITY,
        }}
      >
        {duplicatedArticles.map((article, index) => (
          <Link
            href={`/news/${article.id}`}
            key={`${article.id}-${index}`}
            className="inline-block mx-6 hover:text-green-400 transition-colors text-sm"
          >
            <span className="text-gray-500 mr-2">{new Date(article.date).toLocaleDateString()}</span>
            <span className="font-medium">{article.title}</span>
          </Link>
        ))}
      </motion.div>
    </div>
  )
}
