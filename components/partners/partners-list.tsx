"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import type { Partner } from "@/lib/types"
import { Search, Filter, Percent, Calendar, MapPin, ExternalLink, Building } from "lucide-react"

interface PartnersListProps {
  partners: Partner[]
}

export default function PartnersList({ partners }: PartnersListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [openItems, setOpenItems] = useState<string[]>([])
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const categories = ["all", ...new Set(partners.map((partner) => partner.category))]

  const filteredPartners = partners.filter((partner) => {
    const matchesSearch =
      partner.brandName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partner.description?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === "all" || partner.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const toggleItem = (itemId: string) => {
    setOpenItems((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]))
  }

  const handleCardClick = (itemId: string, e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("a, button")) return
    toggleItem(itemId)
  }

  const handleHeaderClick = (itemId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    if (openItems.includes(itemId)) toggleItem(itemId)
  }

  return (
    <section ref={ref} className="py-16 bg-transparent">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-8 text-center">All Partners</h2>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search partners..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-zinc-800"
              />
            </div>
            <div className="w-full md:w-64">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="bg-zinc-800">
                  <div className="flex items-center">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Filter by category" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Partners List */}
          {filteredPartners.length === 0 ? (
            <div className="text-center py-12 bg-zinc-900 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">No partners found</h3>
              <p className="text-gray-400 mb-6">Try adjusting your search criteria</p>
              <Button
                onClick={() => {
                  setSearchQuery("")
                  setCategoryFilter("all")
                }}
              >
                Reset Filters
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredPartners.map((partner, index) => (
                <motion.div
                  key={partner.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <div className="bg-zinc-900 rounded-lg overflow-hidden">
                    <div
                      className={`flex items-center p-4 cursor-pointer transition-colors ${
                        openItems.includes(partner.id) ? "bg-green-600" : "hover:bg-zinc-800"
                      }`}
                      onClick={(e) =>
                        openItems.includes(partner.id)
                          ? handleHeaderClick(partner.id, e)
                          : handleCardClick(partner.id, e)
                      }
                    >
                      <div className="relative h-16 w-16 md:h-20 md:w-20 bg-white rounded-md flex-shrink-0 mr-4">
                        <Image
                          src={partner.brandLogo || "/placeholder.svg?height=80&width=80"}
                          alt={partner.brandName}
                          fill
                          className="object-contain p-2"
                        />
                      </div>
                      <div className="flex-grow">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                          <h3 className="text-xl font-bold">{partner.brandName}</h3>
                          <Badge
                            className={`w-fit mt-1 md:mt-0 ${
                              openItems.includes(partner.id) ? "bg-white text-green-600" : "bg-green-600 text-white"
                            }`}
                          >
                            {partner.discountPercentage}% OFF
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-400 mt-1">{partner.shortDescription}</p>
                      </div>
                      <div
                        className={`ml-2 transition-transform ${openItems.includes(partner.id) ? "rotate-180" : ""}`}
                      >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>

                    {openItems.includes(partner.id) && (
                      <div className="px-4 pb-4 pt-0">
                        <div className="border-t border-zinc-800 pt-4 mt-2">
                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="font-bold mb-2">Description</h4>
                              <div className="text-gray-300 mb-4" dangerouslySetInnerHTML={{ __html: partner.description }} />

                              {partner.website && (
                                <Button variant="outline" size="sm" className="mt-2" asChild>
                                  <a
                                    href={
                                      partner.website.startsWith("http://") || partner.website.startsWith("https://")
                                        ? partner.website
                                        : `https://${partner.website}`
                                    }
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <ExternalLink className="mr-2 h-4 w-4" />
                                    Visit Website
                                  </a>
                                </Button>
                              )}
                            </div>

                            <div className="space-y-4">
                              <div className="bg-zinc-800 p-4 rounded-lg">
                                <h4 className="font-bold mb-2">Details</h4>
                                <ul className="space-y-2">
                                  <li className="flex items-center text-sm">
                                    <Percent className="mr-2 h-4 w-4 text-green-400" />
                                    <span>
                                      Discount: {partner.discountPercentage}% off {partner.discountDetails}
                                    </span>
                                  </li>
                                  {partner.expiryDate && (
                                    <li className="flex items-center text-sm">
                                      <Calendar className="mr-2 h-4 w-4 text-green-400" />
                                      <span>Valid until: {partner.expiryDate}</span>
                                    </li>
                                  )}
                                  {partner.locations && (
                                    <li className="flex items-start text-sm">
                                      <MapPin className="mr-2 h-4 w-4 text-green-400 mt-0.5" />
                                      <span>Available at: {partner.locations}</span>
                                    </li>
                                  )}
                                </ul>
                              </div>

                              {partner.branches && partner.branches.length > 0 && (
                                <div className="bg-zinc-800 p-4 rounded-lg">
                                  <h4 className="font-bold mb-2">Participating Branches</h4>
                                  <ul className="space-y-2">
                                    {partner.branches.map((branch, idx) => (
                                      <li key={idx} className="flex items-start text-sm">
                                        <Building className="mr-2 h-4 w-4 text-green-400 mt-0.5" />
                                        <div>
                                          <span className="font-medium">{branch.name}</span>
                                          {branch.address && <p className="text-gray-400 text-xs">{branch.address}</p>}
                                          {branch.phone && <p className="text-gray-400 text-xs">{branch.phone}</p>}
                                        </div>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {partner.termsAndConditions && (
                                <div className="bg-zinc-800 p-4 rounded-lg">
                                  <h4 className="font-bold mb-2">Terms & Conditions</h4>
                                  <div className="text-sm text-gray-300" dangerouslySetInnerHTML={{ __html: partner.termsAndConditions }} />
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
