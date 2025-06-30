"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { fetchMemberProjects } from "@/lib/api"
import type { Project } from "@/lib/types"
import { FilmIcon } from "lucide-react"

interface MemberProjectsProps {
  memberId: string
}

export default function MemberProjects({ memberId }: MemberProjectsProps) {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const projectsData = await fetchMemberProjects(memberId)
        setProjects(projectsData)
        setLoading(false)
      } catch (error) {
        console.error("Error loading projects data:", error)
        setLoading(false)
      }
    }

    loadData()
  }, [memberId])

  if (loading) {
    return (
      <Card className="bg-zinc-900">
        <CardContent className="p-6 flex justify-center items-center h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-zinc-900">
      <CardContent className="p-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <FilmIcon size={20} />
            <span>Recent Projects</span>
          </h2>

          {projects.length === 0 ? (
            <p className="text-gray-400">No projects available.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="bg-zinc-800 overflow-hidden h-full">
                    <CardContent className="p-0 h-full flex flex-col">
                      <div className="relative h-[200px]">
                        <Image
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-4 flex flex-col flex-grow">
                        <h3 className="text-lg font-bold mb-1">{project.title}</h3>
                        <p className="text-sm text-gray-400 mb-2">{project.year}</p>
                        <p className="text-sm text-gray-300 line-clamp-3 mb-4">{project.description}</p>
                        <div className="flex flex-wrap gap-2 mt-auto">
                          {project.tags.map((tag, i) => (
                            <span key={i} className="bg-zinc-700 text-xs px-2 py-1 rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </CardContent>
    </Card>
  )
}
