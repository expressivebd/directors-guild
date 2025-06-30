"use client"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import type { Member } from "@/lib/types"
import {
  deceasedMembers,
  lifetimeMembers,
  fullMembers,
  currentExecutiveCommittee,
  generalMembers,
} from "@/lib/members-data"

interface MembersDisplayProps {
  isSearching: boolean
  filteredMembers: Member[]
  resetFilters: () => void
}

export default function MembersDisplay({ isSearching, filteredMembers, resetFilters }: MembersDisplayProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  // If searching/filtering, show search results
  if (isSearching) {
    return (
      <section ref={ref} className="py-16 bg-transparent">
        <motion.div
          className="container mx-auto px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Search Results</h2>
            <p className="text-gray-400">Found {filteredMembers.length} member(s)</p>
          </div>

          {filteredMembers.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-2xl font-bold mb-4">No members found</h3>
              <p className="text-gray-400 mb-6">Try adjusting your search criteria</p>
              <Button onClick={resetFilters}>Reset Filters</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredMembers.map((member, index) => {
                // Check if member is deceased (from In Memoriam section)
                const isDeceased = deceasedMembers.some((deceased) => deceased.id === member.id)

                return (
                  <motion.div
                    key={member.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                  >
                    <MemberCard member={member} isDeceased={isDeceased} />
                  </motion.div>
                )
              })}
            </div>
          )}
        </motion.div>
      </section>
    )
  }

  // Show organized sections when not searching
  return (
    <div className="space-y-16">
      {/* In Memoriam Section */}
      <MemberSection
        title="In Memoriam"
        description="Honoring the legacy of our departed members who shaped the art of directing"
        members={deceasedMembers}
        bgColor="bg-zinc-900/50"
        isMemoriam={true}
      />

      {/* Lifetime Members Section */}
      <MemberSection
        title="Lifetime Members"
        description="Celebrating our distinguished lifetime members and their extraordinary contributions"
        members={lifetimeMembers}
        bgColor="bg-zinc-800/50"
      />

      {/* Full Members Section */}
      <MemberSection
        title="Full Members"
        description="Accomplished directors with full membership status and voting rights"
        members={fullMembers}
        bgColor="bg-zinc-700/50"
      />

      {/* General Members Section */}
      <MemberSection
        title="Primary Members"
        description="Our vibrant community of directors creating the future of cinema"
        members={generalMembers}
        bgColor="bg-zinc-900/30"
      />
    </div>
  )
}

// Member Section Component
function MemberSection({
  title,
  description,
  members,
  bgColor,
  isMemoriam = false,
}: {
  title: string
  description: string
  members: Member[]
  bgColor: string
  isMemoriam?: boolean
}) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section ref={ref} className={`py-16 ${bgColor} backdrop-blur-sm`}>
      <motion.div
        className="container mx-auto px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">{description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {members.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <MemberCard member={member} isDeceased={isMemoriam} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

// Member Card Component
function MemberCard({
  member,
  isDeceased = false,
}: {
  member: Member
  isDeceased?: boolean
}) {
  // Ensure we have a valid placeholder image
  const imageSrc = member.image?.startsWith("/placeholder")
    ? member.image
    : `/placeholder.svg?height=300&width=300&text=${encodeURIComponent(member.name)}`

  // Check if member is current executive (not previous) - this will show badge in all sections
  const isCurrentExecutive = currentExecutiveCommittee.some((exec) => exec.id === member.id)

  const cardContent = (
    <div
      className={`bg-zinc-800 rounded-lg overflow-hidden transition-all duration-300 ${
        !isDeceased ? "hover:shadow-lg hover:-translate-y-1 cursor-pointer" : ""
      } ${isDeceased ? "opacity-80" : ""}`}
    >
      <div className="relative h-[250px]">
        <img src={imageSrc || "/placeholder.svg"} alt={member.name} className="w-full h-full object-cover" />
        {isCurrentExecutive && (
          <div className="absolute top-2 right-2 bg-green-500 text-black px-2 py-1 rounded text-xs font-bold">
            EXEC {new Date().getFullYear()}
          </div>
        )}
        {isDeceased && (
          <div className="absolute top-2 left-2 bg-gray-600 text-white px-2 py-1 rounded text-xs font-bold">
            IN MEMORIAM
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-1">{member.name}</h3>
        <p className="text-green-500 mb-3 text-sm uppercase">{member.specialty}</p>
        <p className="text-sm text-gray-300 line-clamp-3">{member.bio}</p>
        {member.tags && (
          <div className="flex flex-wrap gap-1 mt-3">
            {member.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="px-2 py-1 bg-zinc-700 text-xs rounded">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )

  // If deceased, return non-clickable card
  if (isDeceased) {
    return cardContent
  }

  // Return clickable card for living members
  return (
    <Link href={`/members/${member.id}`} className="block">
      {cardContent}
    </Link>
  )
}
