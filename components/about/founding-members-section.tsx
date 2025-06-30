"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Link from "next/link"
import type { Member } from "@/lib/types"

interface FoundingMembersSectionProps {
  foundingMembers: Member[]
}

export default function FoundingMembersSection({ foundingMembers }: FoundingMembersSectionProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section ref={ref} className="py-16 bg-zinc-900/50 backdrop-blur-sm">
      <motion.div
        className="container mx-auto px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Founding Members</h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Honoring the visionary directors who established our guild and laid the foundation for generations of
            filmmakers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {foundingMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/members/${member.id}`} className="block">
                <div className="bg-zinc-800 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer ring-2 ring-amber-500/30">
                  <div className="relative h-[200px]">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-amber-500 text-black px-2 py-1 rounded text-xs font-bold">
                      FOUNDER
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold mb-1">{member.name}</h3>
                    <p className="text-amber-500 mb-2 text-sm uppercase">{member.specialty}</p>
                    <p className="text-xs text-gray-300 line-clamp-2">{member.bio}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
