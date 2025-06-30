"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import FeaturedArticle from "@/components/news/featured-article"
import NewsGrid from "@/components/news/news-grid"
import type { NewsArticle } from "@/lib/types"

interface NewsFilterProps {
  articles: NewsArticle[]
}

export default function NewsFilter({ articles }: NewsFilterProps) {
  const [filteredArticles, setFilteredArticles] = useState<NewsArticle[]>(articles)
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [yearFilter, setYearFilter] = useState("all")

  // Extract unique categories
  const categories = ["all", ...new Set(articles.map((article) => article.category))]

  // Extract unique years from articles
  const years = [
    "all",
    ...Array.from(
      new Set(
        articles
          .map((article) => {
            const year = new Date(article.date).getFullYear()
            return year.toString()
          })
          .filter(Boolean),
      ),
    ).sort((a, b) => b.localeCompare(a)),
  ] // Sort years in descending order

  // Check if any filters are active
  const hasActiveFilters = searchQuery !== "" || categoryFilter !== "all" || yearFilter !== "all"

  useEffect(() => {
    const filtered = articles.filter((article) => {
      const matchesSearch =
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = categoryFilter === "all" || article.category === categoryFilter
      const articleYear = new Date(article.date).getFullYear().toString()
      const matchesYear = yearFilter === "all" || articleYear === yearFilter
      return matchesSearch && matchesCategory && matchesYear
    })

    setFilteredArticles(filtered)
  }, [searchQuery, categoryFilter, yearFilter, articles])

  return (
    <>
      {/* Filters Section */}
      <section className="py-8 bg-zinc-900/70 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-center max-w-4xl mx-auto">
            {/* Search Bar */}
            <div className="w-full lg:w-96">
              <label className="text-sm text-zinc-400 font-medium block mb-2">Search</label>
              <Input
                type="text"
                placeholder="Search news..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-400"
              />
            </div>

            {/* Filter Dropdowns */}
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              {/* Category Filter */}
              <div className="flex flex-col gap-2 min-w-[160px]">
                <label className="text-sm text-zinc-400 font-medium">Category</label>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-800 border-zinc-700">
                    {categories.map((category) => (
                      <SelectItem
                        key={category}
                        value={category}
                        className="text-white hover:bg-zinc-700 focus:bg-zinc-700 capitalize"
                      >
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Year Filter */}
              <div className="flex flex-col gap-2 min-w-[120px]">
                <label className="text-sm text-zinc-400 font-medium">Year</label>
                <Select value={yearFilter} onValueChange={setYearFilter}>
                  <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-800 border-zinc-700">
                    {years.map((year) => (
                      <SelectItem key={year} value={year} className="text-white hover:bg-zinc-700 focus:bg-zinc-700">
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Clear Filters Button - Show only when filters are active */}
          {hasActiveFilters && (
            <div className="mt-4 flex justify-center">
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("")
                  setCategoryFilter("all")
                  setYearFilter("all")
                }}
                className="bg-transparent border-zinc-600 text-zinc-300 hover:bg-zinc-800"
              >
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Featured Article - only show if NO filters are active and we have articles */}
      {!hasActiveFilters && filteredArticles.length > 0 && <FeaturedArticle article={filteredArticles[0]} />}

      {/* News Grid */}
      <NewsGrid
        articles={hasActiveFilters ? filteredArticles : filteredArticles.slice(1)}
        resetFilters={() => {
          setSearchQuery("")
          setCategoryFilter("all")
          setYearFilter("all")
        }}
        showNoResultsMessage={hasActiveFilters}
      />
    </>
  )
}
