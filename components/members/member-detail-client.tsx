"use client"

import { useState, useCallback } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  ArrowLeftIcon,
  FilmIcon,
  LinkIcon,
  MapPin,
  Mail,
  Phone,
  Calendar,
  Award,
  Edit,
  Save,
  X,
  Plus,
  Trash2,
} from "lucide-react"
import MemberShowreel from "./member-showreel"
import MemberProjects from "./member-projects"
import MemberPayment from "./member-payment"
import type { Member, Award as AwardType, Project } from "@/lib/types"

interface MemberDetailClientProps {
  member: Member
}

export default function MemberDetailClient({ member }: MemberDetailClientProps) {
  const [activeTab, setActiveTab] = useState("about")
  const [isEditingBio, setIsEditingBio] = useState(false)
  const [editedBio, setEditedBio] = useState(member.bio || "")
  const [awards, setAwards] = useState<AwardType[]>(member.awards || [])
  const [editingAwardId, setEditingAwardId] = useState<string | null>(null)
  const [newAward, setNewAward] = useState({ title: "", organization: "", year: "" })
  const [isAddingAward, setIsAddingAward] = useState(false)

  const handleSaveBio = useCallback(() => {
    console.log("Saving bio:", editedBio)
    setIsEditingBio(false)
  }, [editedBio])

  const handleAddAward = useCallback(() => {
    const award: AwardType = {
      id: Date.now().toString(),
      title: newAward.title,
      organization: newAward.organization,
      year: newAward.year,
    }
    setAwards([...awards, award])
    setNewAward({ title: "", organization: "", year: "" })
    setIsAddingAward(false)
  }, [awards, newAward])

  const handleEditAward = useCallback(
    (id: string, updatedAward: Partial<AwardType>) => {
      setAwards(awards.map((award) => (award.id === id ? { ...award, ...updatedAward } : award)))
      setEditingAwardId(null)
    },
    [awards],
  )

  const handleDeleteAward = useCallback(
    (id: string) => {
      setAwards(awards.filter((award) => award.id !== id))
    },
    [awards],
  )

  const handleProjectAdd = useCallback((newProject: Omit<Project, "id">) => {
    console.log("Adding new project:", newProject)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-500 p-6 sm:p-12 lg:p-20 pt-20 sm:pt-12 lg:pt-20">
        <div className="container mx-auto px-4">
          {/* Back to Members Link */}
          <div className="mb-6 sm:mb-8">
            <Link
              href="/members"
              className="inline-flex items-center text-white/90 hover:text-white transition-colors text-sm sm:text-lg"
            >
              <ArrowLeftIcon size={16} className="mr-2 sm:w-5 sm:h-5" />
              Back to Members
            </Link>
          </div>

          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 sm:gap-8 lg:gap-12">
            {/* Profile Photo */}
            <div className="flex-shrink-0">
              <div className="w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden bg-white/20 backdrop-blur-sm border-4 border-white/30 shadow-2xl">
                <img
                  src={member.image || "/placeholder.svg?height=320&width=320&query=profile"}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Member Information */}
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 text-white leading-tight">{member.name}</h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-white/90 mb-4 sm:mb-6 font-medium">{member.specialty} Director</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8 justify-center lg:justify-start">
                {member.tags?.map((tag, index) => (
                  <Badge
                    key={index}
                    className="bg-white/20 backdrop-blur-sm text-white border-white/30 px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium hover:bg-white/30 transition-colors"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Bio Preview */}
              <p className="text-sm sm:text-base lg:text-lg text-white/80 max-w-3xl leading-relaxed">
                {member.bio || "No biography available."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Director's Showreel Section */}
      <section className="py-8 sm:py-12 bg-zinc-900">
        <div className="container mx-auto px-4 ">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 flex items-center px-20">
            <FilmIcon size={24} className="mr-3 text-green-400 sm:w-7 sm:h-7" />
            Director's Showreel
          </h2>
          <MemberShowreel member={member} />
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-8 sm:py-12 bg-black">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-zinc-900 mb-6 sm:mb-8">
              <TabsTrigger value="about" className="text-sm sm:text-lg py-2 sm:py-3">
                About
              </TabsTrigger>
              <TabsTrigger value="projects" className="text-sm sm:text-lg py-2 sm:py-3">
                Projects
              </TabsTrigger>
              <TabsTrigger value="payment" className="text-sm sm:text-lg py-2 sm:py-3">
                Payment
              </TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6 sm:space-y-8">
                  {/* Biography Section */}
                  <Card className="bg-zinc-900 border-zinc-800">
                    <CardContent className="p-4 sm:p-6 lg:p-8">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-3">
                        <h2 className="text-xl sm:text-2xl font-bold">Biography</h2>
                        {!isEditingBio ? (
                          <Button variant="outline" size="sm" onClick={() => setIsEditingBio(true)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </Button>
                        ) : (
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={handleSaveBio}>
                              <Save className="w-4 h-4 mr-2" />
                              Save
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setIsEditingBio(false)
                                setEditedBio(member.bio || "")
                              }}
                            >
                              <X className="w-4 h-4 mr-2" />
                              Cancel
                            </Button>
                          </div>
                        )}
                      </div>
                      {!isEditingBio ? (
                        <p className="text-gray-300 leading-relaxed text-sm sm:text-base lg:text-lg">
                          {member.bio || "No biography available."}
                        </p>
                      ) : (
                        <Textarea
                          value={editedBio}
                          onChange={(e) => setEditedBio(e.target.value)}
                          className="bg-zinc-800 text-white min-h-[150px] text-sm sm:text-base lg:text-lg"
                          placeholder="Enter biography..."
                        />
                      )}
                    </CardContent>
                  </Card>

                  {/* Awards Section */}
                  <Card className="bg-zinc-900 border-zinc-800">
                    <CardContent className="p-4 sm:p-6 lg:p-8">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-3">
                        <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2 sm:gap-3">
                          <Award className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" />
                          Awards & Recognition
                        </h2>
                        <Button variant="outline" size="sm" onClick={() => setIsAddingAward(true)}>
                          <Plus className="w-4 h-4 mr-2" />
                          <span className="hidden sm:inline">Add Award</span>
                          <span className="sm:hidden">Add</span>
                        </Button>
                      </div>

                      {/* Add New Award Form */}
                      {isAddingAward && (
                        <Card className="bg-zinc-800 mb-4 sm:mb-6 border-zinc-700">
                          <CardContent className="p-4 sm:p-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4">
                              <Input
                                placeholder="Award Title"
                                value={newAward.title}
                                onChange={(e) => setNewAward({ ...newAward, title: e.target.value })}
                                className="bg-zinc-700 text-white border-zinc-600"
                              />
                              <Input
                                placeholder="Organization"
                                value={newAward.organization}
                                onChange={(e) => setNewAward({ ...newAward, organization: e.target.value })}
                                className="bg-zinc-700 text-white border-zinc-600"
                              />
                              <Input
                                placeholder="Year"
                                value={newAward.year}
                                onChange={(e) => setNewAward({ ...newAward, year: e.target.value })}
                                className="bg-zinc-700 text-white border-zinc-600"
                              />
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" onClick={handleAddAward}>
                                <Save className="w-4 h-4 mr-2" />
                                Save
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setIsAddingAward(false)
                                  setNewAward({ title: "", organization: "", year: "" })
                                }}
                              >
                                <X className="w-4 h-4 mr-2" />
                                Cancel
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      )}

                      {/* Awards List */}
                      <div className="space-y-3 sm:space-y-4">
                        {awards.length === 0 ? (
                          <p className="text-gray-400 text-center py-6 sm:py-8">No awards available.</p>
                        ) : (
                          awards.map((award) => (
                            <Card key={award.id} className="bg-zinc-800 border-zinc-700">
                              <CardContent className="p-4 sm:p-6">
                                {editingAwardId === award.id ? (
                                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4">
                                    <Input
                                      defaultValue={award.title}
                                      onChange={(e) => handleEditAward(award.id, { title: e.target.value })}
                                      className="bg-zinc-700 text-white border-zinc-600"
                                    />
                                    <Input
                                      defaultValue={award.organization}
                                      onChange={(e) => handleEditAward(award.id, { organization: e.target.value })}
                                      className="bg-zinc-700 text-white border-zinc-600"
                                    />
                                    <Input
                                      defaultValue={award.year}
                                      onChange={(e) => handleEditAward(award.id, { year: e.target.value })}
                                      className="bg-zinc-700 text-white border-zinc-600"
                                    />
                                  </div>
                                ) : (
                                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                                    <div className="flex-1">
                                      <h3 className="font-semibold text-lg sm:text-xl mb-1">{award.title}</h3>
                                      <p className="text-gray-400 text-sm sm:text-base lg:text-lg">{award.organization}</p>
                                      <p className="text-xs sm:text-sm text-gray-500 mt-1">{award.year}</p>
                                    </div>
                                    <div className="flex gap-2">
                                      <Button variant="outline" size="sm" onClick={() => setEditingAwardId(award.id)}>
                                        <Edit className="w-4 h-4" />
                                      </Button>
                                      <Button variant="outline" size="sm" onClick={() => handleDeleteAward(award.id)}>
                                        <Trash2 className="w-4 h-4" />
                                      </Button>
                                    </div>
                                  </div>
                                )}
                              </CardContent>
                            </Card>
                          ))
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Contact Info Sidebar */}
                <div className="lg:col-span-1">
                  <Card className="bg-zinc-900 border-zinc-800 sticky top-6">
                    <CardContent className="p-4 sm:p-6">
                      <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Contact Information</h3>
                      <div className="space-y-3 sm:space-y-4">
                        {member.email && (
                          <div className="flex items-center gap-2 sm:gap-3">
                            <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                            <span className="text-xs sm:text-sm text-gray-300 break-all">{member.email}</span>
                          </div>
                        )}
                        {member.phone && (
                          <div className="flex items-center gap-2 sm:gap-3">
                            <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                            <span className="text-xs sm:text-sm text-gray-300">{member.phone}</span>
                          </div>
                        )}
                        {member.location && (
                          <div className="flex items-center gap-2 sm:gap-3">
                            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                            <span className="text-xs sm:text-sm text-gray-300">{member.location}</span>
                          </div>
                        )}
                        {member.joinDate && (
                          <div className="flex items-center gap-2 sm:gap-3">
                            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                            <span className="text-xs sm:text-sm text-gray-300">Joined {member.joinDate}</span>
                          </div>
                        )}
                        {member.website && (
                          <div className="flex items-center gap-2 sm:gap-3">
                            <LinkIcon className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                            <a
                              href={member.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs sm:text-sm text-green-400 hover:text-green-300 transition-colors break-all"
                            >
                              {member.website.replace(/^https?:\/\//, "")}
                            </a>
                          </div>
                        )}
                      </div>

                      {member.socialLinks && (
                        <div className="mt-6 sm:mt-8">
                          <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Social Media</h4>
                          <div className="flex flex-wrap gap-2">
                            {Object.entries(member.socialLinks).map(([platform, url]) => (
                              <a
                                key={platform}
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs sm:text-sm bg-zinc-800 px-2 py-1 sm:px-3 sm:py-2 rounded-md text-gray-300 hover:text-green-400 hover:bg-zinc-700 transition-colors capitalize"
                              >
                                {platform}
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="projects" className="mt-0">
              <MemberProjects memberId={member.id} onProjectAdd={handleProjectAdd} />
            </TabsContent>

            <TabsContent value="payment" className="mt-0">
              <MemberPayment memberId={member.id} />
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  )
}
