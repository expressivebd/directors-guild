"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import type { Incentive } from "@/lib/types"
import { Search, Filter, Percent, Calendar, MapPin, ExternalLink } from "lucide-react"

interface IncentivesListProps {
  incentives: Incentive[]
}

export default function IncentivesList({ incentives }: IncentivesListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  // Extract unique categories
  const categories = ["all", ...new Set(incentives.map((incentive) => incentive.category))]

  // Filter incentives based on search and category
  const filteredIncentives = incentives.filter((incentive) => {
    const matchesSearch =
      incentive.brandName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      incentive.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === "all" || incentive.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  return (
    <section ref={ref} className="py-16 bg-transparent">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-8 text-center">All Member Incentives</h2>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search incentives..."
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

          {/* Incentives List */}
          {filteredIncentives.length === 0 ? (
            <div className="text-center py-12 bg-zinc-900 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">No incentives found</h3>
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
            <Accordion type="single" collapsible className="space-y-4">
              {filteredIncentives.map((incentive, index) => (
                <motion.div
                  key={incentive.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <AccordionItem value={incentive.id} className="border-none">
                    <div className="bg-zinc-900 rounded-lg overflow-hidden">
                      <div className="flex items-center p-4">
                        <div className="relative h-16 w-16 md:h-20 md:w-20 bg-white rounded-md flex-shrink-0 mr-4">
                          <Image
                            src={incentive.brandLogo || "/placeholder.svg?height=80&width=80"}
                            alt={incentive.brandName}
                            fill
                            className="object-contain p-2"
                          />
                        </div>
                        <div className="flex-grow">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                            <h3 className="text-xl font-bold">{incentive.brandName}</h3>
                            <Badge className="bg-green-600 text-white w-fit mt-1 md:mt-0">
                              {incentive.discountPercentage}% OFF
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-400 mt-1">{incentive.shortDescription}</p>
                        </div>
                        <AccordionTrigger className="ml-2" />
                      </div>
                      <AccordionContent className="px-4 pb-4 pt-0">
                        <div className="border-t border-zinc-800 pt-4 mt-2">
                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="font-bold mb-2">Description</h4>
                              <p className="text-gray-300 mb-4">{incentive.description}</p>

                              <h4 className="font-bold mb-2">How to Redeem</h4>
                              <p className="text-gray-300 mb-4">{incentive.redemptionInstructions}</p>

                              {incentive.website && (
                                <Button variant="outline" size="sm" className="mt-2" asChild>
                                  <a href={incentive.website} target="_blank" rel="noopener noreferrer">
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
                                      Discount: {incentive.discountPercentage}% off {incentive.discountDetails}
                                    </span>
                                  </li>
                                  {incentive.expiryDate && (
                                    <li className="flex items-center text-sm">
                                      <Calendar className="mr-2 h-4 w-4 text-green-400" />
                                      <span>Valid until: {incentive.expiryDate}</span>
                                    </li>
                                  )}
                                  {incentive.locations && (
                                    <li className="flex items-start text-sm">
                                      <MapPin className="mr-2 h-4 w-4 text-green-400 mt-0.5" />
                                      <span>Available at: {incentive.locations}</span>
                                    </li>
                                  )}
                                </ul>
                              </div>

                              {incentive.termsAndConditions && (
                                <div className="bg-zinc-800 p-4 rounded-lg">
                                  <h4 className="font-bold mb-2">Terms & Conditions</h4>
                                  <p className="text-sm text-gray-300">{incentive.termsAndConditions}</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </AccordionContent>
                    </div>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          )}
        </motion.div>
      </div>
    </section>
  )
}
