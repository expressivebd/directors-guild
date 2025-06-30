"use client"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { TeamMember } from "@/lib/types"
import { currentExecutiveCommittee, previousExecutiveCommittee } from "@/lib/members-data"

interface TeamSectionProps {
  teamMembers: TeamMember[]
}

export default function TeamSection({ teamMembers }: TeamSectionProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  // Get current year and previous year dynamically
  const currentYear = new Date().getFullYear()
  const previousYear = currentYear - 1

  return (
    <section ref={ref} className="py-20 bg-zinc-900">
      <motion.div
        className="container mx-auto px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Leadership Team</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Meet the dedicated professionals who guide our organization and support our members in achieving excellence
            in directing.
          </p>
        </div>

        {/* Executive Committee Section with Tabs */}
        <div className="mb-20">

          <Tabs defaultValue="current" className="w-full">
            <TabsList className="grid w-full max-w-lg mx-auto grid-cols-2 mb-8">
              <TabsTrigger value="current" className="text-sm">
                Executive Committee {currentYear}
              </TabsTrigger>
              <TabsTrigger value="previous" className="text-sm">
                Executive Committee {previousYear}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="current">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {currentExecutiveCommittee.map((member, index) => (
                  <motion.div
                    key={member.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                  >
                    <ExecutiveMemberCard member={member} />
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="previous">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {previousExecutiveCommittee.map((member, index) => (
                  <motion.div
                    key={member.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                  >
                    <ExecutiveMemberCard member={member} />
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </motion.div>
    </section>
  )
}

// Executive Member Card Component
function ExecutiveMemberCard({ member }: { member: any }) {
  const imageSrc = member.image?.startsWith("/placeholder")
    ? member.image
    : `/placeholder.svg?height=300&width=300&text=${encodeURIComponent(member.name)}`

  return (
    <Link href={`/members/${member.id}`} className="block">
      <div className="bg-zinc-800 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer ring-2 ring-green-500/30">
        <div className="relative h-[250px]">
          <img src={imageSrc || "/placeholder.svg"} alt={member.name} className="w-full h-full object-cover" />
          <div className="absolute top-2 right-2 bg-green-500 text-black px-2 py-1 rounded text-xs font-bold">EXEC</div>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold mb-1">{member.name}</h3>
          <p className="text-green-500 mb-3 text-sm uppercase">{member.specialty}</p>
          <p className="text-sm text-gray-300 line-clamp-3">{member.bio}</p>
          {member.tags && (
            <div className="flex flex-wrap gap-1 mt-3">
              {member.tags.slice(0, 3).map((tag: string) => (
                <span key={tag} className="px-2 py-1 bg-zinc-700 text-xs rounded">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}

// Staff Member Card Component
function StaffMemberCard({ member }: { member: TeamMember }) {
  return (
    <div className="bg-zinc-800 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="relative h-[250px]">
        <img src={member.image || "/placeholder.svg"} alt={member.name} className="w-full h-full object-cover" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-1">{member.name}</h3>
        <p className="text-green-500 mb-3 text-sm uppercase">{member.role}</p>
        <p className="text-sm text-gray-300 line-clamp-3">{member.bio}</p>
        {member.email && (
          <div className="mt-4">
            <a href={`mailto:${member.email}`} className="text-green-400 hover:underline text-sm">
              {member.email}
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
