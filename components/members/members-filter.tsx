"use client"

import { useState, useEffect, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import MembersDisplay from "@/components/members/members-display"
import type { Member } from "@/lib/types"
import { getAllMembers } from "@/lib/members-data"

interface MembersFilterProps {
  members: Member[]
}

export default function MembersFilter({ members }: MembersFilterProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [specialtyFilter, setSpecialtyFilter] = useState("all")
  const [filteredMembers, setFilteredMembers] = useState<Member[]>([])

  // Memoize all members to prevent infinite loops
  const allMembers = useMemo(() => getAllMembers(), [])

  // Memoize specialties to prevent recalculation
  const specialties = useMemo(() => {
    return ["all", ...new Set(allMembers.map((member) => member.specialty.toLowerCase()))]
  }, [allMembers])

  // Determine if we're in search mode
  const isSearching = useMemo(() => {
    return searchQuery.trim() !== "" || specialtyFilter !== "all"
  }, [searchQuery, specialtyFilter])

  // Filter members when search criteria change
  useEffect(() => {
    if (isSearching) {
      const filtered = allMembers.filter((member) => {
        const matchesSearch =
          member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          member.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
          member.tags?.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
        const matchesSpecialty = specialtyFilter === "all" || member.specialty.toLowerCase() === specialtyFilter
        return matchesSearch && matchesSpecialty
      })
      setFilteredMembers(filtered)
    }
  }, [searchQuery, specialtyFilter, isSearching, allMembers])

  const resetFilters = () => {
    setSearchQuery("")
    setSpecialtyFilter("all")
  }

  return (
    <>
      {/* Filters Section */}
      <section className="py-8 bg-zinc-900/70 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
            <div className="w-full md:w-1/2 max-w-md">
              <Input
                type="text"
                placeholder="Search members..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-zinc-800"
              />
            </div>
            <div className="w-full md:w-1/4 max-w-xs">
              <Select value={specialtyFilter} onValueChange={setSpecialtyFilter}>
                <SelectTrigger className="bg-zinc-800">
                  <SelectValue placeholder="Filter by specialty" />
                </SelectTrigger>
                <SelectContent>
                  {specialties.map((specialty) => (
                    <SelectItem key={specialty} value={specialty}>
                      {specialty.charAt(0).toUpperCase() + specialty.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Members Display */}
      <MembersDisplay isSearching={isSearching} filteredMembers={filteredMembers} resetFilters={resetFilters} />
    </>
  )
}
