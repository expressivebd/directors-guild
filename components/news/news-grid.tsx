"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import type { NewsArticle } from "@/lib/types"

interface NewsGridProps {
  articles: NewsArticle[]
  resetFilters: () => void
  showNoResultsMessage?: boolean
}

export default function NewsGrid({ articles, resetFilters, showNoResultsMessage = false }: NewsGridProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })


  return (
    <section ref={ref} className="py-16 bg-transparent">
      <motion.div
        className="container mx-auto px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        {articles.length === 0 && showNoResultsMessage ? (
          <div className="text-center py-12">
            <h3 className="text-2xl font-bold mb-4">No articles found</h3>
            <p className="text-gray-400 mb-6">Try adjusting your search criteria or filters</p>
            <Button onClick={resetFilters} className="bg-green-600 hover:bg-green-700">
              Clear All Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={article.newsUrl ?? "#"} target="_blank" rel="noopener noreferrer">
                  <Card className="bg-zinc-800 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full">
                    <CardContent className="p-0 h-full flex flex-col">
                      <div className="relative h-[200px]">
                        <Image
                          src={article.image || "/placeholder.svg"}
                          alt={article.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-6 flex flex-col flex-grow">
                        <div className="mb-3">
                          <span className="bg-zinc-700 text-white px-2 py-1 rounded-full text-xs uppercase">
                            {article.category}
                          </span>
                          <span className="ml-2 text-gray-400 text-xs">
                            {format(new Date(article.date), "MMM d, yyyy")}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold mb-3">{article.title}</h3>
                        <p className="text-sm text-gray-300 mb-4 flex-grow">{article.shortDescription}</p>

                        <Link href={article.newsUrl ?? "#"} target="_blank" rel="noopener noreferrer">
                          <Button variant="link" className="p-0 h-auto w-fit text-green-500 hover:text-green-400">
                            Read More
                          </Button>

                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </section>
  )
}
