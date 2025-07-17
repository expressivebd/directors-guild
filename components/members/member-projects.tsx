"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { FilmIcon } from "lucide-react"
import { fetchMemberProjects } from "@/lib/api"
import type { Project } from "@/lib/types"

interface MemberProjectsProps {
  memberId: string
  onProjectAdd: (newProject: Omit<Project, "id">) => void
}

export default function MemberProjects({ memberId, onProjectAdd }: MemberProjectsProps) {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [newProjectTitle, setNewProjectTitle] = useState("")
  const [newProjectDescription, setNewProjectDescription] = useState("")
  const [newProjectYear, setNewProjectYear] = useState("")
  const [newProjectImage, setNewProjectImage] = useState("")
  const [newProjectTags, setNewProjectTags] = useState("")

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

  const handleAddProject = () => {
    if (!newProjectTitle.trim()) return

    const newProject: Omit<Project, "id"> = {
      title: newProjectTitle,
      description: newProjectDescription,
      year: newProjectYear,
      image: newProjectImage || "/placeholder.svg?height=200&width=300",
      category: "Film",
      tags: newProjectTags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    }

    // Add to local state immediately
    const projectWithId = { ...newProject, id: Date.now().toString() }
    setProjects([projectWithId, ...projects])

    // Call parent handler
    onProjectAdd(newProject)

    // Clear form
    setNewProjectTitle("")
    setNewProjectDescription("")
    setNewProjectYear("")
    setNewProjectImage("")
    setNewProjectTags("")
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Recent Projects - Left Side */}
      <div className="lg:col-span-3">
        <Card className="bg-zinc-900">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <FilmIcon size={20} />
              <span>Recent Projects</span>
            </h2>

            {projects.length === 0 ? (
              <p className="text-gray-400 text-center py-8">No projects available.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {projects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="bg-zinc-800 overflow-hidden h-full hover:bg-zinc-750 transition-colors">
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
                          <p className="text-sm text-gray-300 line-clamp-3 mb-4 flex-grow">{project.description}</p>
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
          </CardContent>
        </Card>
      </div>

      {/* Add New Project - Right Side */}
      <div className="lg:col-span-1">
        <Card className="bg-zinc-900 sticky top-6">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-4">Add New Project</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <Input
                  type="text"
                  placeholder="Project title"
                  value={newProjectTitle}
                  onChange={(e) => setNewProjectTitle(e.target.value)}
                  className="bg-zinc-800 text-white border-zinc-700"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <Textarea
                  placeholder="Project description"
                  value={newProjectDescription}
                  onChange={(e) => setNewProjectDescription(e.target.value)}
                  className="bg-zinc-800 text-white border-zinc-700 min-h-[100px]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Year</label>
                <Input
                  type="text"
                  placeholder="2024"
                  value={newProjectYear}
                  onChange={(e) => setNewProjectYear(e.target.value)}
                  className="bg-zinc-800 text-white border-zinc-700"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Image URL</label>
                <Input
                  type="text"
                  placeholder="https://example.com/image.jpg"
                  value={newProjectImage}
                  onChange={(e) => setNewProjectImage(e.target.value)}
                  className="bg-zinc-800 text-white border-zinc-700"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Tags (comma separated)</label>
                <Input
                  type="text"
                  placeholder="Drama, Thriller, Independent"
                  value={newProjectTags}
                  onChange={(e) => setNewProjectTags(e.target.value)}
                  className="bg-zinc-800 text-white border-zinc-700"
                />
              </div>

              <Button
                className="w-full bg-red-600 hover:bg-red-700 text-white"
                onClick={handleAddProject}
                disabled={!newProjectTitle.trim()}
              >
                Post Project
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
