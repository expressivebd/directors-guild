"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const categories = [
  { id: "events", label: "Events" },
  { id: "behind-the-scenes", label: "Behind the Scenes" },
  { id: "projects", label: "Projects" },
  { id: "workshops", label: "Workshops" },
  { id: "awards", label: "Awards" },
]

const years = ["2024", "2023", "2022", "2021", "2020"]

export default function GalleryFilter() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedYears, setSelectedYears] = useState<string[]>([])

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const handleYearChange = (year: string) => {
    setSelectedYears((prev) => (prev.includes(year) ? prev.filter((y) => y !== year) : [...prev, year]))
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement search functionality
    console.log("Searching for:", searchQuery)
  }

  const handleReset = () => {
    setSearchQuery("")
    setSelectedCategories([])
    setSelectedYears([])
  }

  return (
    <div className="mb-8 space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <form onSubmit={handleSearch} className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search gallery..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-zinc-900/50 border-zinc-800 focus-visible:ring-green-500"
            />
          </div>
        </form>

        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="border-zinc-800 bg-zinc-900/50">
                <Filter className="h-4 w-4 mr-2" />
                Categories
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-zinc-900 border-zinc-800">
              <DropdownMenuLabel>Filter by Category</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {categories.map((category) => (
                <DropdownMenuCheckboxItem
                  key={category.id}
                  checked={selectedCategories.includes(category.id)}
                  onCheckedChange={() => handleCategoryChange(category.id)}
                >
                  {category.label}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="border-zinc-800 bg-zinc-900/50">
                <Filter className="h-4 w-4 mr-2" />
                Years
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-zinc-900 border-zinc-800">
              <DropdownMenuLabel>Filter by Year</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {years.map((year) => (
                <DropdownMenuCheckboxItem
                  key={year}
                  checked={selectedYears.includes(year)}
                  onCheckedChange={() => handleYearChange(year)}
                >
                  {year}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {(selectedCategories.length > 0 || selectedYears.length > 0 || searchQuery) && (
            <Button variant="ghost" onClick={handleReset} className="text-gray-400 hover:text-white">
              Reset
            </Button>
          )}
        </div>
      </div>

      {/* Active filters display */}
      {(selectedCategories.length > 0 || selectedYears.length > 0) && (
        <div className="flex flex-wrap gap-2 mt-4">
          {selectedCategories.map((category) => (
            <div key={category} className="bg-zinc-800/50 text-sm px-3 py-1 rounded-full flex items-center">
              <span>{categories.find((c) => c.id === category)?.label}</span>
              <button onClick={() => handleCategoryChange(category)} className="ml-2 text-gray-400 hover:text-white">
                ×
              </button>
            </div>
          ))}
          {selectedYears.map((year) => (
            <div key={year} className="bg-zinc-800/50 text-sm px-3 py-1 rounded-full flex items-center">
              <span>{year}</span>
              <button onClick={() => handleYearChange(year)} className="ml-2 text-gray-400 hover:text-white">
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
