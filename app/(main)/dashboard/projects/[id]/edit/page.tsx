"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import DashboardLayout from "@/components/dashboard/layout"
import ProjectForm from "@/components/dashboard/project-form"
import type { Project } from "@/lib/types"
import { fetchProjectById, updateUserProject } from "@/lib/api"

export default function EditProjectPage() {
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const projectId = params.id as string

  useEffect(() => {
    const loadProject = async () => {
      try {
        const data = await fetchProjectById(projectId)
        setProject(data)
        setLoading(false)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load project. Please try again.",
          variant: "destructive",
        })
        router.push("/dashboard/projects")
      }
    }

    loadProject()
  }, [projectId, router, toast])

  const handleSubmit = async (projectData: Omit<Project, "id">) => {
    setIsSubmitting(true)

    try {
      await updateUserProject(projectId, projectData)

      toast({
        title: "Project updated",
        description: "Your project has been updated successfully.",
      })

      router.push("/dashboard/projects")
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error updating your project. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="p-6">
          <div className="h-[600px] flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  if (!project) {
    return (
      <DashboardLayout>
        <div className="p-6">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-2">Project Not Found</h2>
            <p className="text-gray-400 mb-6">
              The project you're looking for doesn't exist or you don't have access to it.
            </p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Edit Project</h1>
        <ProjectForm
          onSubmit={handleSubmit}
          onCancel={() => router.push("/dashboard/projects")}
          initialData={project}
          isEditing={true}
        />
      </div>
    </DashboardLayout>
  )
}
