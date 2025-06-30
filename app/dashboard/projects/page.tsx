"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/components/ui/use-toast"
import { fetchUserProjects, deleteUserProject } from "@/lib/api"
import type { Project } from "@/lib/types"
import DashboardLayout from "@/components/dashboard/layout"
import { PlusIcon, MoreHorizontal, Pencil, Trash2, Eye } from "lucide-react"

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  const [projectsRef, projectsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchUserProjects()
        setProjects(data)
        setLoading(false)
      } catch (error) {
        console.error("Error loading projects:", error)
        setLoading(false)
      }
    }

    loadProjects()
  }, [])

  const handleDeleteProject = async (id: string) => {
    if (confirm("Are you sure you want to delete this project? This action cannot be undone.")) {
      try {
        await deleteUserProject(id)
        setProjects((prev) => prev.filter((project) => project.id !== id))
        toast({
          title: "Project deleted",
          description: "Your project has been deleted successfully.",
        })
      } catch (error) {
        toast({
          title: "Error",
          description: "There was an error deleting your project. Please try again.",
          variant: "destructive",
        })
      }
    }
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Your Projects</h1>
          <Button asChild>
            <Link href="/dashboard/projects/new">
              <PlusIcon className="mr-2 h-4 w-4" />
              Add Project
            </Link>
          </Button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, index) => (
              <Card key={index} className="bg-zinc-800 animate-pulse h-[350px]">
                <CardContent className="p-0"></CardContent>
              </Card>
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className="bg-zinc-900 rounded-lg p-8 text-center">
            <div className="mx-auto w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mb-4">
              <PlusIcon className="h-8 w-8 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold mb-2">No projects yet</h2>
            <p className="text-gray-400 mb-6">Start showcasing your work by adding your first project.</p>
            <Button asChild>
              <Link href="/dashboard/projects/new">Add Your First Project</Link>
            </Button>
          </div>
        ) : (
          <div ref={projectsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={projectsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-zinc-900 overflow-hidden h-full">
                  <div className="relative h-[200px]">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="bg-black/50 hover:bg-black/70 rounded-full">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                          <DropdownMenuItem asChild>
                            <Link href={`/dashboard/projects/${project.id}`} className="cursor-pointer">
                              <Eye className="mr-2 h-4 w-4" />
                              <span>View</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/dashboard/projects/${project.id}/edit`} className="cursor-pointer">
                              <Pencil className="mr-2 h-4 w-4" />
                              <span>Edit</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDeleteProject(project.id)}
                            className="text-red-500 focus:text-red-500 cursor-pointer"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Delete</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold">{project.title}</h3>
                      <span className="text-sm text-gray-400">{project.year}</span>
                    </div>
                    <div className="mb-3">
                      <span className="inline-block bg-green-600/20 text-green-500 text-xs px-2 py-1 rounded-full">
                        {project.status}
                      </span>
                      <span className="inline-block ml-2 text-xs text-gray-400">{project.category}</span>
                    </div>
                    <p className="text-sm text-gray-300 line-clamp-3 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, i) => (
                        <span key={i} className="bg-zinc-800 text-xs px-2 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
