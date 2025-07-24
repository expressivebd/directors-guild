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
import type { UserProfile } from "@/lib/types"
import DashboardLayout from "@/components/dashboard/layout"
import { CameraIcon, SaveIcon, PlusIcon } from "lucide-react"

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [formData, setFormData] = useState<Partial<UserProfile>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [changingPassword, setChangingPassword] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/api/profile')
        if (!response.ok) {
          throw new Error('Failed to fetch profile')
        }
        const userProfile = await response.json()
        setProfile(userProfile)
        setFormData(userProfile)
        setLoading(false)
      } catch (error) {
        console.error("Error loading profile data:", error)
        toast({
          title: "Error loading profile",
          description: "There was an error loading your profile data.",
          variant: "destructive",
        })
        setLoading(false)
      }
    }

    loadData()
  }, [toast])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePreferenceChange = (field: string, value: boolean) => {
    setFormData((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [field]: value,
      },
    }))
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handlePasswordSubmit = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "New password and confirm password do not match.",
        variant: "destructive",
      })
      return
    }

    if (passwordData.newPassword.length < 6) {
      toast({
        title: "Password too short",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      })
      return
    }

    if (!passwordData.currentPassword) {
      toast({
        title: "Current password required",
        description: "Please enter your current password.",
        variant: "destructive",
      })
      return
    }

    setChangingPassword(true)

    try {
      const response = await fetch('/api/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to change password')
      }

      toast({
        title: "Password updated",
        description: "Your password has been changed successfully.",
      })

      // Reset password form
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      })
    } catch (error: any) {
      toast({
        title: "Password change failed",
        description: error.message || "There was an error changing your password.",
        variant: "destructive",
      })
    } finally {
      setChangingPassword(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to update profile')
      }

      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      })

      // Update the profile state with the new data
      setProfile((prev) => ({ ...prev, ...formData }) as UserProfile)
    } catch (error) {
      console.error("Error updating profile:", error)
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

          <TabsContent value="personal" className="space-y-6">
            <form onSubmit={handleSubmit}>
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
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name || ""}
                          onChange={handleChange}
                          className="bg-zinc-800"
                        />
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
                          disabled
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
                        <Label htmlFor="address">Address</Label>
                        <Input
                          id="address"
                          name="address"
                          value={formData.address || ""}
                          onChange={handleChange}
                          className="bg-zinc-800"
                          placeholder="Your full address"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900">
                <CardHeader>
                  <CardTitle>Social Media & Website</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
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

                  <div className="space-y-2">
                    <Label htmlFor="socialMedia">Social Media Links</Label>
                    <Textarea
                      id="socialMedia"
                      name="socialMedia"
                      value={formData.socialMedia || ""}
                      onChange={handleChange}
                      className="bg-zinc-800 min-h-[100px]"
                      placeholder="Add your social media links (Instagram, Twitter, LinkedIn, etc.) one per line or separated by commas"
                    />
                  </div>
                </CardContent>
              </Card>

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
          </TabsContent>

          <TabsContent value="professional" className="space-y-6">
            <form onSubmit={handleSubmit}>
              <Card className="bg-zinc-900">
                <CardHeader>
                  <CardTitle>Professional Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="experience">Experience</Label>
                    <Textarea
                      id="experience"
                      name="experience"
                      value={formData.experience || ""}
                      onChange={handleChange}
                      className="bg-zinc-800 min-h-[100px]"
                      placeholder="Describe your professional experience..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="education">Education</Label>
                    <Textarea
                      id="education"
                      name="education"
                      value={formData.education || ""}
                      onChange={handleChange}
                      className="bg-zinc-800 min-h-[100px]"
                      placeholder="Your educational background..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="biography">Biography</Label>
                    <Textarea
                      id="biography"
                      name="biography"
                      value={formData.biography || ""}
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
                        const skills = e.target.value.split(",").map((skill) => skill.trim()).filter(Boolean)
                        setFormData((prev) => ({ ...prev, skills }))
                      }}
                      className="bg-zinc-800"
                      placeholder="e.g. Cinematography, Screenwriting, Editing"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="awards">Awards (comma separated)</Label>
                    <Input
                      id="awards"
                      name="awards"
                      value={formData.awards?.join(", ") || ""}
                      onChange={(e) => {
                        const awards = e.target.value.split(",").map((award) => award.trim()).filter(Boolean)
                        setFormData((prev) => ({ ...prev, awards }))
                      }}
                      className="bg-zinc-800"
                      placeholder="e.g. Best Director Award 2023, Film Festival Winner"
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
          </TabsContent>

          <TabsContent value="account" className="space-y-6">
              <Card className="bg-zinc-900">
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input 
                        id="currentPassword" 
                        name="currentPassword"
                        type="password" 
                        value={passwordData.currentPassword}
                        onChange={handlePasswordChange}
                        className="bg-zinc-800" 
                        autoComplete="current-password"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input 
                        id="newPassword" 
                        name="newPassword"
                        type="password" 
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        className="bg-zinc-800" 
                        minLength={6}
                        autoComplete="new-password"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input 
                        id="confirmPassword" 
                        name="confirmPassword"
                        type="password" 
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                        className="bg-zinc-800" 
                        autoComplete="new-password"
                      />
                    </div>

                    <Button 
                      type="button"
                      variant="outline" 
                      className="w-full"
                      onClick={handlePasswordSubmit}
                      disabled={changingPassword || !passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword}
                    >
                      {changingPassword ? (
                        <>
                          <span className="animate-spin mr-2">⟳</span>
                          Changing Password...
                        </>
                      ) : (
                        "Change Password"
                      )}
                    </Button>
                  </div>
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
                    <Switch 
                      checked={formData.preferences?.emailNotifications ?? true}
                      onCheckedChange={(checked) => handlePreferenceChange('emailNotifications', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Schedule Reminders</h4>
                      <p className="text-sm text-gray-400">Get reminders about your upcoming schedule</p>
                    </div>
                    <Switch 
                      checked={formData.preferences?.scheduleReminders ?? true}
                      onCheckedChange={(checked) => handlePreferenceChange('scheduleReminders', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Member Updates</h4>
                      <p className="text-sm text-gray-400">Receive updates about other members</p>
                    </div>
                    <Switch 
                      checked={formData.preferences?.memberUpdates ?? false}
                      onCheckedChange={(checked) => handlePreferenceChange('memberUpdates', checked)}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
