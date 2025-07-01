"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ChevronDown, ChevronUp, Mail, Phone, MapPin, Globe, Award, Briefcase, Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { DirectoryEntry } from "@/lib/types"
import { BLOCKS } from "@contentful/rich-text-types"

interface DirectoryListProps {
  members?: DirectoryEntry[] // <-- make it optional just in case
}

export function DirectoryList({ members }: DirectoryListProps) {
  const [expandedMembers, setExpandedMembers] = useState<Set<string>>(new Set())
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")

  const allMembers = members ?? []
  const roles = Array.from(new Set(allMembers.map((m) => m.role)))

  const filteredMembers = useMemo(() => {
    return allMembers.filter((member) => {
      const matchesSearch =
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.specializations.some((spec) => spec.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesRole = roleFilter === "all" || member.role === roleFilter

      return matchesSearch && matchesRole
    })
  }, [allMembers, searchQuery, roleFilter])

  const toggleMember = (memberId: string) => {
    const newExpanded = new Set(expandedMembers)
    if (newExpanded.has(memberId)) {
      newExpanded.delete(memberId)
    } else {
      newExpanded.add(memberId)
    }
    setExpandedMembers(newExpanded)
  }

  return (
    <div className="space-y-6">
      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 bg-zinc-900 p-4 rounded-lg">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search by name, role, or specialization..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-zinc-800 border-zinc-700 text-white placeholder-gray-400"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="text-gray-400 w-4 h-4" />
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-full sm:w-48 bg-zinc-800 border-zinc-700 text-white">
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-800 border-zinc-700">
              <SelectItem value="all" className="text-white hover:bg-zinc-700">
                All Roles
              </SelectItem>
              {roles.map((role) => (
                <SelectItem key={role} value={role} className="text-white hover:bg-zinc-700">
                  {role}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-gray-400 text-sm">
        Showing {filteredMembers.length} of {allMembers.length} professionals
      </div>

      {/* Directory Cards */}
      <div className="space-y-4">
        {filteredMembers.map((member) => (
          <DirectoryCard
            key={member.id}
            member={member}
            isExpanded={expandedMembers.has(member.id)}
            onToggle={() => toggleMember(member.id)}
          />
        ))}
      </div>

      {filteredMembers.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <p className="text-lg">No professionals found matching your criteria.</p>
          <p className="text-sm mt-2">Try adjusting your search or filter options.</p>
        </div>
      )}
    </div>
  )
}

interface DirectoryCardProps {
  member: DirectoryEntry
  isExpanded: boolean
  onToggle: () => void
}

function DirectoryCard({ member, isExpanded, onToggle }: DirectoryCardProps) {
  return (
    <motion.div
      layout
      className="bg-zinc-900 rounded-lg overflow-hidden border-b-2 border-green-500 cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onClick={!isExpanded ? onToggle : undefined}
    >
      <AnimatePresence mode="wait">
        {!isExpanded ? (
          <motion.div
            key="collapsed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="p-4 flex items-center justify-between gap-4"
          >
            <div className="flex items-center space-x-4 w-full min-w-0">
              <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-white truncate">{member.name}</h3>
                <p className="text-green-400 text-sm font-medium">{member.role}</p>
                <div className="hidden sm:flex sm:flex-col lg:flex-row lg:items-center lg:space-x-4 mt-1 text-sm text-gray-400 space-y-1 lg:space-y-0">
                  {member.email && (
                    <div className="flex items-center space-x-1">
                      <Mail className="w-3 h-3 flex-shrink-0" />
                      <span className="break-all">{member.email}</span>
                    </div>
                  )}
                  {member.phone && (
                    <div className="flex items-center space-x-1">
                      <Phone className="w-3 h-3 flex-shrink-0" />
                      <span>{member.phone}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <ChevronDown className="w-5 h-5 text-green-400 flex-shrink-0" />
          </motion.div>
        ) : (
          <motion.div
            key="expanded"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-green-600 p-4 md:p-6 cursor-pointer" onClick={onToggle}>
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center space-x-4 md:space-x-6 w-full min-w-0">
                  <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 border-white flex-shrink-0">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-xl md:text-2xl font-bold text-white">{member.name}</h2>
                    <p className="text-green-100 text-base md:text-lg font-medium">{member.role}</p>
                    <p className="text-green-100 text-sm mt-1">{member.yearsOfExperience} years of experience</p>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 mt-3 text-white space-y-2 sm:space-y-0">
                      {member.email && (
                        <div className="flex items-center space-x-2">
                          <Mail className="w-4 h-4 flex-shrink-0" />
                          <span className="text-sm break-all">{member.email}</span>
                        </div>
                      )}
                      {member.phone && (
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4 flex-shrink-0" />
                          <span className="text-sm">{member.phone}</span>
                        </div>
                      )}
                      {member.location && (
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 flex-shrink-0" />
                          <span className="text-sm">{member.location}</span>
                        </div>
                      )}
                    </div>
                    {member.website && (
                      <div className="flex items-center space-x-2 mt-2 text-white">
                        <Globe className="w-4 h-4 flex-shrink-0" />
                        <a
                          href={`https://${member.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-green-200 text-sm break-all"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {member.website}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
                <ChevronUp className="w-5 h-5 text-white flex-shrink-0" />
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="p-4 md:p-6 bg-zinc-800"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="space-y-4 md:space-y-6">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.2 }}>
                  <h3 className="text-lg md:text-xl font-semibold text-white mb-3">About</h3>
                  <p className="text-gray-300 leading-relaxed mb-4 text-sm md:text-base">{member.description}</p>

                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-400 mb-2">Specializations</h4>
                    <div className="flex flex-wrap gap-2">
                      {member.specializations.map((spec, index) => (
                        <motion.span
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                          className="px-2 py-1 bg-green-600 text-white text-xs rounded-full"
                        >
                          {spec}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.4 }}>
                      <h4 className="text-sm font-medium text-gray-400 mb-1">Rates</h4>
                      <p className="text-white text-sm md:text-base">{member.rates}</p>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.5 }}>
                      <h4 className="text-sm font-medium text-gray-400 mb-1">Availability</h4>
                      <p className={`font-medium text-sm md:text-base ${member.availability ? "text-green-400" : "text-yellow-400"}`}>
                        {member.availability ? "Available" : "Unavailable"}
                        
                      </p>
                    </motion.div>
                  </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.3 }} className="space-y-4">
                  {member.equipment && (
                    <div>
                      <h3 className="text-lg md:text-xl font-semibold text-white mb-3 flex items-center">
                        <Briefcase className="w-5 h-5 mr-2 text-green-400" />
                        Equipment & Tools
                      </h3>
                      <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: 0.4 }}
                        className="bg-zinc-900 p-3 rounded text-gray-300 text-sm md:text-base">
                        {member.equipment}
                      </motion.div>
                    </div>
                  )}

                  {member.recentWorks.length > 0 && (
                    <div>
                      <h3 className="text-lg md:text-xl font-semibold text-white mb-3 flex items-center">
                        <Award className="w-5 h-5 mr-2 text-green-400" />
                        Recent Work
                      </h3>
                      <div className="space-y-2">
                        {member.recentWorks.map((work, index) => (
                          <motion.div key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }} className="bg-zinc-900 p-2 rounded-lg">
                            <p className="text-white text-sm">{work}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {member.certifications && (
                    <div>
                      <h3 className="text-lg md:text-xl font-semibold text-white mb-3">Certifications</h3>
                      <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: 0.6 }}
                        className="bg-zinc-900 p-3 rounded text-gray-300 text-sm md:text-base">
                        {member.certifications}
                      </motion.div>
                    </div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
