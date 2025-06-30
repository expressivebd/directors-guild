"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import type { NewsArticle } from "@/lib/types"

interface FeaturedArticleProps {
  article: NewsArticle
}

export default function FeaturedArticle({ article }: FeaturedArticleProps) {
  return (
    <section className="py-12 bg-transparent">
      <div className="container mx-auto px-4">
        <Link href={`/news/${article.id}`}>
          <Card className="bg-zinc-900 overflow-hidden">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative h-[300px] md:h-[400px]">
                  <Image src={article.image || "/placeholder.svg"} alt={article.title} fill className="object-cover" />
                </div>
                <div className="p-6 md:p-8 flex flex-col justify-center">
                  <div className="mb-4">
                    <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm uppercase">
                      {article.category}
                    </span>
                    <span className="ml-3 text-gray-400 text-sm">{format(new Date(article.date), "MMMM d, yyyy")}</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">{article.title}</h2>
                  <p className="text-gray-300 mb-6">{article.excerpt}</p>
                  <Button className="w-fit">Read More</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </section>
  )
}
