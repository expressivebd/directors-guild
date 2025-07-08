"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import type { FeaturedNews } from "@/lib/types"

interface NewsSectionProps {
  articles: FeaturedNews[]
}

export default function NewsSection({ articles }: NewsSectionProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  if (!articles || articles.length === 0) {
    return (
      <div className="mx-auto text-center text-2xl text-red-400">
      
        No featured news articles found!
      </div>
    )
  }

  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {articles.map((article, index) => (
        <motion.div
          key={article.id}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Link href={article.newsUrl} target="_blank" rel="noopener noreferrer">
            <Card className="bg-zinc-800 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full">
              <CardContent className="p-0 h-full flex flex-col">
                <div className="relative h-[200px]">
                  <Image src={article.image || "/placeholder.svg"} alt={article.title} fill className="object-cover" />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="mb-3">
                    <span className="bg-zinc-700 text-white px-2 py-1 rounded-full text-xs uppercase">
                      {article.category}
                    </span>
                    <span className="ml-2 text-gray-400 text-xs">{format(new Date(article.date), "MMM d, yyyy")}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{article.title}</h3>
                  <p className="text-sm text-gray-300 mb-4 flex-grow">{article.shortDescription}</p>
                  <Button variant="link" className="p-0 h-auto w-fit text-green-500 hover:text-green-400">
                    Read More
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}
