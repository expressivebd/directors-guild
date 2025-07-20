"use client"

import { Switch } from "@/components/ui/switch"

import type React from "react"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { fetchUserProfile, updateUserProfile } from "@/lib/api"
import type { UserProfile } from "@/lib/types"
import DashboardLayout from "@/components/dashboard/layout"
import { CameraIcon, SaveIcon, PlusIcon } from "lucide-react"

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [formData, setFormData] = useState<Partial<UserProfile>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const loadData = async () => {
      try {
        const userProfile = await fetchUserProfile()
        setProfile(userProfile)
        setFormData(userProfile)
        setLoading(false)
      } catch (error) {
        console.error("Error loading profile data:", error)
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSocialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [name]: value,
      },
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      await updateUserProfile(formData)

      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      })

      // Update the profile state with the new data
      setProfile((prev) => ({ ...prev, ...formData }) as UserProfile)
    } catch (error) {
      toast({
        title: "Update failed",
        description: "There was an error updating your profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-[calc(100vh-200px)]">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Your Profile</h1>

        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList className="bg-zinc-900">
            <TabsTrigger value="personal">Personal Information</TabsTrigger>
            <TabsTrigger value="professional">Professional Details</TabsTrigger>
            <TabsTrigger value="account">Account Settings</TabsTrigger>
          </TabsList>

          <form onSubmit={handleSubmit}>
            <TabsContent value="personal" className="space-y-6">
              <Card className="bg-zinc-900">
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/3 flex flex-col items-center">
                      <div className="relative w-40 h-40 rounded-full overflow-hidden mb-4">
                        <Image
                          src={profile?.image || "/placeholder.svg?height=160&width=160"}
                          alt={profile?.firstName || "Profile"}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <Button variant="ghost" size="icon" className="rounded-full">
                            <CameraIcon className="h-6 w-6" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-400">Click to change profile picture</p>
                    </div>

                    <div className="md:w-2/3 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input
                            id="firstName"
                            name="firstName"
                            value={formData.firstName || ""}
                            onChange={handleChange}
                            className="bg-zinc-800"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input
                            id="lastName"
                            name="lastName"
                            value={formData.lastName || ""}
                            onChange={handleChange}
                            className="bg-zinc-800"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email || ""}
                          onChange={handleChange}
                          className="bg-zinc-800"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone || ""}
                          onChange={handleChange}
                          className="bg-zinc-800"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          name="location"
                          value={formData.location || ""}
                          onChange={handleChange}
                          className="bg-zinc-800"
                          placeholder="City, Country"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900">
                <CardHeader>
                  <CardTitle>Social Media</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="twitter">Twitter</Label>
                      <Input
                        id="twitter"
                        name="twitter"
                        value={formData.socialLinks?.twitter || ""}
                        onChange={handleSocialChange}
                        className="bg-zinc-800"
                        placeholder="https://twitter.com/username"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="instagram">Instagram</Label>
                      <Input
                        id="instagram"
                        name="instagram"
                        value={formData.socialLinks?.instagram || ""}
                        onChange={handleSocialChange}
                        className="bg-zinc-800"
                        placeholder="https://instagram.com/username"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="linkedin">LinkedIn</Label>
                      <Input
                        id="linkedin"
                        name="linkedin"
                        value={formData.socialLinks?.linkedin || ""}
                        onChange={handleSocialChange}
                        className="bg-zinc-800"
                        placeholder="https://linkedin.com/in/username"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="website">Personal Website</Label>
                      <Input
                        id="website"
                        name="website"
                        value={formData.website || ""}
                        onChange={handleChange}
                        className="bg-zinc-800"
                        placeholder="https://yourwebsite.com"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="professional" className="space-y-6">
              <Card className="bg-zinc-900">
                <CardHeader>
                  <CardTitle>Professional Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="specialty">Specialty</Label>
                    <Input
                      id="specialty"
                      name="specialty"
                      value={formData.specialty || ""}
                      onChange={handleChange}
                      className="bg-zinc-800"
                      placeholder="e.g. Film, Television, Documentary"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Biography</Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      value={formData.bio || ""}
                      onChange={handleChange}
                      className="bg-zinc-800 min-h-[200px]"
                      placeholder="Tell us about yourself and your work..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="skills">Skills (comma separated)</Label>
                    <Input
                      id="skills"
                      name="skills"
                      value={formData.skills?.join(", ") || ""}
                      onChange={(e) => {
                        const skills = e.target.value.split(",").map((skill) => skill.trim())
                        setFormData((prev) => ({ ...prev, skills }))
                      }}
                      className="bg-zinc-800"
                      placeholder="e.g. Cinematography, Screenwriting, Editing"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900">
                <CardHeader>
                  <CardTitle>Experience</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 mb-4">Add your professional experience and filmography</p>

                  <Button variant="outline">
                    <PlusIcon className="mr-2 h-4 w-4" />
                    Add Experience
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="account" className="space-y-6">
              <Card className="bg-zinc-900">
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input id="currentPassword" type="password" className="bg-zinc-800" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" className="bg-zinc-800" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input id="confirmPassword" type="password" className="bg-zinc-800" />
                  </div>

                  <Button variant="outline" className="w-full">
                    Change Password
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900">
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Email Notifications</h4>
                      <p className="text-sm text-gray-400">Receive email updates about events and news</p>
                    </div>
                    <Switch checked={true} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Schedule Reminders</h4>
                      <p className="text-sm text-gray-400">Get reminders about your upcoming schedule</p>
                    </div>
                    <Switch checked={true} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Member Updates</h4>
                      <p className="text-sm text-gray-400">Receive updates about other members</p>
                    </div>
                    <Switch checked={false} />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <div className="flex justify-end mt-6">
              <Button type="submit" disabled={saving}>
                {saving ? (
                  <>
                    <span className="animate-spin mr-2">⟳</span>
                    Saving...
                  </>
                ) : (
                  <>
                    <SaveIcon className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </form>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
