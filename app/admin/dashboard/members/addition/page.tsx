"use client"

import type React from "react"

import { useState } from "react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { UnauthorizedMessage } from "@/components/admin/unauthorized-message"
import { useAdminAuth } from "@/lib/admin-auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { X, Plus, Save, User, Globe, Briefcase } from "lucide-react"
import { toast } from "sonner"

interface Project {
  title: string
  description: string
  year: string
}

interface MemberFormData {
  name: string
  email: string
  phone: string
  location: string
  website: string
  bio: string
  specialty: string
  category: string
  role: string
  joinDate: string
  tags: string[]
  awards: any[]
  projects: Project[]
  isExecutive: boolean
  socialLinks: {
    twitter: string
    instagram: string
    linkedin: string
    facebook: string
  }
}

const initialFormData: MemberFormData = {
  name: "",
  email: "",
  phone: "",
  location: "",
  website: "",
  bio: "",
  specialty: "",
  category: "",
  role: "",
  joinDate: new Date().toISOString().split("T")[0],
  tags: [],
  awards: [],
  projects: [],
  isExecutive: false,
  socialLinks: {
    twitter: "",
    instagram: "",
    linkedin: "",
    facebook: "",
  },
}

const specialties = [
  "Film Director",
  "Television Director",
  "Documentary Director",
  "Commercial Director",
  "Music Video Director",
  "Theater Director",
  "Web Series Director",
  "Short Film Director",
]

const categories = ["Professional", "Emerging", "Student", "Associate", "Honorary"]

const roles = [
  "Director",
  "Assistant Director",
  "Producer-Director",
  "Writer-Director",
  "Director of Photography",
  "Creative Director",
]

export default function MemberAdditionPage() {
  const { admin, hasPermission } = useAdminAuth()
  const [formData, setFormData] = useState<MemberFormData>(initialFormData)
  const [currentTag, setCurrentTag] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!admin) {
    return <div>Loading...</div>
  }

  if (!hasPermission("members", "create")) {
    return (
      <AdminLayout>
        <UnauthorizedMessage
          message="You are not authorized to add new members."
          description="Contact your super admin for access to member addition."
        />
      </AdminLayout>
    )
  }

  const handleInputChange = (field: keyof MemberFormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSocialLinkChange = (platform: keyof MemberFormData["socialLinks"], value: string) => {
    setFormData((prev) => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: value,
      },
    }))
  }

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()],
      }))
      setCurrentTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  const addAward = () => {
    setFormData((prev) => ({
      ...prev,
      awards: [...prev.awards, { title: "", organization: "", year: "" }],
    }))
  }

  const updateAward = (index: number, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      awards: prev.awards.map((award, i) => (i === index ? { ...award, [field]: value } : award)),
    }))
  }

  const removeAward = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      awards: prev.awards.filter((_, i) => i !== index),
    }))
  }

  const addProject = () => {
    setFormData((prev) => ({
      ...prev,
      projects: [...prev.projects, { title: "", description: "", year: "" }],
    }))
  }

  const updateProject = (index: number, field: keyof Project, value: string) => {
    setFormData((prev) => ({
      ...prev,
      projects: prev.projects.map((project, i) => (i === index ? { ...project, [field]: value } : project)),
    }))
  }

  const removeProject = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Validate required fields
      if (!formData.name || !formData.email || !formData.specialty || !formData.category) {
        toast.error("Please fill in all required fields")
        return
      }

      // Simulate API call to add member
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // In a real app, you would make an API call here
      console.log("Adding member:", formData)

      toast.success("Member added successfully!")

      // Reset form
      setFormData(initialFormData)
    } catch (error) {
      toast.error("Failed to add member. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setFormData(initialFormData)
    toast.info("Form has been reset")
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">Add New Member</h1>
            <p className="text-slate-400">Create a new member profile for the Directors Guild</p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={resetForm}
              disabled={isSubmitting}
              className="bg-slate-700 border-slate-600 text-slate-200 hover:bg-slate-600 hover:text-white hover:border-purple-500"
            >
              Reset Form
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white shadow-lg hover:shadow-purple-500/25"
            >
              <Save className="w-4 h-4 mr-2" />
              {isSubmitting ? "Adding Member..." : "Add Member"}
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="border-b border-slate-700">
              <CardTitle className="flex items-center gap-2 text-white">
                <User className="w-5 h-5 text-purple-400" />
                Basic Information
              </CardTitle>
              <CardDescription className="text-slate-400">
                Essential member details and contact information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-slate-200">
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Enter full name"
                    required
                    className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-200">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="Enter email address"
                    required
                    className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-slate-200">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="Enter phone number"
                    className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-slate-200">
                    Location
                  </Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    placeholder="Enter location"
                    className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website" className="text-slate-200">
                    Website
                  </Label>
                  <Input
                    id="website"
                    type="url"
                    value={formData.website}
                    onChange={(e) => handleInputChange("website", e.target.value)}
                    placeholder="https://example.com"
                    className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="joinDate" className="text-slate-200">
                    Join Date
                  </Label>
                  <Input
                    id="joinDate"
                    type="date"
                    value={formData.joinDate}
                    onChange={(e) => handleInputChange("joinDate", e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio" className="text-slate-200">
                  Biography
                </Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => handleInputChange("bio", e.target.value)}
                  placeholder="Enter member biography"
                  rows={4}
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-500 focus:ring-purple-500"
                />
              </div>
            </CardContent>
          </Card>

          {/* Professional Information */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="border-b border-slate-700">
              <CardTitle className="flex items-center gap-2 text-white">
                <Briefcase className="w-5 h-5 text-purple-400" />
                Professional Information
              </CardTitle>
              <CardDescription className="text-slate-400">
                Member's professional details and specialization
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="specialty" className="text-slate-200">
                    Specialty *
                  </Label>
                  <Select value={formData.specialty} onValueChange={(value) => handleInputChange("specialty", value)}>
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white focus:border-purple-500 focus:ring-purple-500">
                      <SelectValue placeholder="Select specialty" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      {specialties.map((specialty) => (
                        <SelectItem key={specialty} value={specialty} className="text-white hover:bg-slate-600">
                          {specialty}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-slate-200">
                    Category *
                  </Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white focus:border-purple-500 focus:ring-purple-500">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      {categories.map((category) => (
                        <SelectItem key={category} value={category} className="text-white hover:bg-slate-600">
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role" className="text-slate-200">
                    Role
                  </Label>
                  <Select value={formData.role} onValueChange={(value) => handleInputChange("role", value)}>
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white focus:border-purple-500 focus:ring-purple-500">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      {roles.map((role) => (
                        <SelectItem key={role} value={role} className="text-white hover:bg-slate-600">
                          {role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Tags */}
              <div className="space-y-2">
                <Label className="text-slate-200">Tags</Label>
                <div className="flex gap-2">
                  <Input
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    placeholder="Add a tag"
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                    className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-500 focus:ring-purple-500"
                  />
                  <Button
                    type="button"
                    onClick={addTag}
                    variant="outline"
                    className="bg-slate-700 border-slate-600 text-slate-200 hover:bg-purple-600 hover:border-purple-500 hover:text-white"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="flex items-center gap-1 bg-purple-600 text-white hover:bg-purple-700"
                    >
                      {tag}
                      <X className="w-3 h-3 cursor-pointer" onClick={() => removeTag(tag)} />
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Executive Status */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isExecutive"
                  checked={formData.isExecutive}
                  onCheckedChange={(checked) => handleInputChange("isExecutive", checked)}
                  className="border-slate-600 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                />
                <Label htmlFor="isExecutive" className="text-slate-200">
                  Executive Member
                </Label>
              </div>
            </CardContent>
          </Card>

          {/* Social Links */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="border-b border-slate-700">
              <CardTitle className="flex items-center gap-2 text-white">
                <Globe className="w-5 h-5 text-purple-400" />
                Social Media Links
              </CardTitle>
              <CardDescription className="text-slate-400">
                Member's social media profiles and online presence
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="twitter" className="text-slate-200">
                    Twitter
                  </Label>
                  <Input
                    id="twitter"
                    value={formData.socialLinks.twitter}
                    onChange={(e) => handleSocialLinkChange("twitter", e.target.value)}
                    placeholder="https://twitter.com/username"
                    className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instagram" className="text-slate-200">
                    Instagram
                  </Label>
                  <Input
                    id="instagram"
                    value={formData.socialLinks.instagram}
                    onChange={(e) => handleSocialLinkChange("instagram", e.target.value)}
                    placeholder="https://instagram.com/username"
                    className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedin" className="text-slate-200">
                    LinkedIn
                  </Label>
                  <Input
                    id="linkedin"
                    value={formData.socialLinks.linkedin}
                    onChange={(e) => handleSocialLinkChange("linkedin", e.target.value)}
                    placeholder="https://linkedin.com/in/username"
                    className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="facebook" className="text-slate-200">
                    Facebook
                  </Label>
                  <Input
                    id="facebook"
                    value={formData.socialLinks.facebook}
                    onChange={(e) => handleSocialLinkChange("facebook", e.target.value)}
                    placeholder="https://facebook.com/username"
                    className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Awards */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="border-b border-slate-700">
              <CardTitle className="flex items-center gap-2 text-white">
                <Briefcase className="w-5 h-5 text-purple-400" />
                Awards & Recognition
              </CardTitle>
              <CardDescription className="text-slate-400">Add member's awards and achievements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              {formData.awards.map((award, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border border-slate-600 rounded-lg bg-slate-700/50"
                >
                  <div className="space-y-2">
                    <Label className="text-slate-200">Award Title</Label>
                    <Input
                      value={award.title}
                      onChange={(e) => updateAward(index, "title", e.target.value)}
                      placeholder="Award title"
                      className="bg-slate-600 border-slate-500 text-white placeholder:text-slate-400 focus:border-purple-500 focus:ring-purple-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-200">Organization</Label>
                    <Input
                      value={award.organization}
                      onChange={(e) => updateAward(index, "organization", e.target.value)}
                      placeholder="Awarding organization"
                      className="bg-slate-600 border-slate-500 text-white placeholder:text-slate-400 focus:border-purple-500 focus:ring-purple-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-200">Year</Label>
                    <Input
                      value={award.year}
                      onChange={(e) => updateAward(index, "year", e.target.value)}
                      placeholder="Year received"
                      className="bg-slate-600 border-slate-500 text-white placeholder:text-slate-400 focus:border-purple-500 focus:ring-purple-500"
                    />
                  </div>
                  <div className="flex items-end">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeAward(index)}
                      className="w-full bg-red-600 border-red-500 text-white hover:bg-red-700"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
              <Button
                type="button"
                onClick={addAward}
                variant="outline"
                className="w-full bg-slate-700 border-slate-600 text-slate-200 hover:bg-purple-600 hover:border-purple-500 hover:text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Award
              </Button>
            </CardContent>
          </Card>

          {/* Projects */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="border-b border-slate-700">
              <CardTitle className="flex items-center gap-2 text-white">
                <Briefcase className="w-5 h-5 text-purple-400" />
                Notable Projects
              </CardTitle>
              <CardDescription className="text-slate-400">Add member's notable projects and works</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              {formData.projects.map((project, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 gap-4 p-4 border border-slate-600 rounded-lg bg-slate-700/50"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-slate-200">Project Title</Label>
                      <Input
                        value={project.title}
                        onChange={(e) => updateProject(index, "title", e.target.value)}
                        placeholder="Project title"
                        className="bg-slate-600 border-slate-500 text-white placeholder:text-slate-400 focus:border-purple-500 focus:ring-purple-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-slate-200">Year</Label>
                      <Input
                        value={project.year}
                        onChange={(e) => updateProject(index, "year", e.target.value)}
                        placeholder="Project year"
                        className="bg-slate-600 border-slate-500 text-white placeholder:text-slate-400 focus:border-purple-500 focus:ring-purple-500"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-200">Description</Label>
                    <Textarea
                      value={project.description}
                      onChange={(e) => updateProject(index, "description", e.target.value)}
                      placeholder="Project description"
                      rows={2}
                      className="bg-slate-600 border-slate-500 text-white placeholder:text-slate-400 focus:border-purple-500 focus:ring-purple-500"
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeProject(index)}
                      className="bg-red-600 border-red-500 text-white hover:bg-red-700"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Remove Project
                    </Button>
                  </div>
                </div>
              ))}
              <Button
                type="button"
                onClick={addProject}
                variant="outline"
                className="w-full bg-slate-700 border-slate-600 text-slate-200 hover:bg-purple-600 hover:border-purple-500 hover:text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Project
              </Button>
            </CardContent>
          </Card>
        </form>
      </div>
    </AdminLayout>
  )
}
