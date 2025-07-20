"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import DashboardLayout from "@/components/dashboard/layout"
import ProjectForm from "@/components/dashboard/project-form"
import type { Project } from "@/lib/types"
import { addUserProject } from "@/lib/api"

export default function NewProjectPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (projectData: Omit<Project, "id">) => {
    setIsSubmitting(true)

    try {
      await addUserProject(projectData)

      toast({
        title: "Project added",
        description: "Your project has been added successfully.",
      })

      router.push("/dashboard/projects")
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error adding your project. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Add New Project</h1>
        <ProjectForm onSubmit={handleSubmit} onCancel={() => router.push("/dashboard/projects")} isEditing={false} />
      </div>
    </DashboardLayout>
  )
}
