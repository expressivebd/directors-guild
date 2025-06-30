"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import type { UserProfile, ScheduleItem, Project, Notification } from "@/lib/types"
import { format, isSameDay } from "date-fns"
import { CalendarIcon, FilmIcon, BellIcon, UserIcon, PlusIcon, MapPinIcon } from "lucide-react"
import ScheduleForm from "@/components/dashboard/schedule-form"

interface DashboardContentProps {
  profile: UserProfile
  schedule: ScheduleItem[]
  projects: Project[]
  notifications: Notification[]
  scheduleDates: Date[]
}

export default function DashboardContent({
  profile,
  schedule,
  projects,
  notifications,
  scheduleDates,
}: DashboardContentProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [showScheduleForm, setShowScheduleForm] = useState(false)
  const [editingItem, setEditingItem] = useState<ScheduleItem | null>(null)

  const [statsRef, statsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  // Filter schedule items for selected date
  const filteredSchedule = schedule.filter((item) => {
    const itemDate = new Date(item.date)
    return isSameDay(itemDate, selectedDate)
  })

  const handleAddSchedule = (newItem: ScheduleItem) => {
    // In a real app, this would update the state and make an API call
    setShowScheduleForm(false)
    setEditingItem(null)
  }

  return (
    <div className="p-6">
      {/* Welcome Section */}
      <section className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, {profile?.firstName}</h1>
            <p className="text-gray-400">Here's what's happening with your account today</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button asChild>
              <Link href="/dashboard/profile">
                <UserIcon className="mr-2 h-4 w-4" />
                View Profile
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-zinc-900">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Projects</p>
                    <h3 className="text-3xl font-bold mt-1">{projects.length}</h3>
                  </div>
                  <div className="bg-green-600/20 p-3 rounded-full">
                    <FilmIcon className="h-6 w-6 text-green-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="bg-zinc-900">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Upcoming Events</p>
                    <h3 className="text-3xl font-bold mt-1">{schedule.length}</h3>
                  </div>
                  <div className="bg-red-600/20 p-3 rounded-full">
                    <CalendarIcon className="h-6 w-6 text-red-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="bg-zinc-900">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Notifications</p>
                    <h3 className="text-3xl font-bold mt-1">{notifications.length}</h3>
                  </div>
                  <div className="bg-blue-600/20 p-3 rounded-full">
                    <BellIcon className="h-6 w-6 text-blue-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="bg-zinc-900">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Member Since</p>
                    <h3 className="text-xl font-bold mt-1">
                      {profile?.memberSince ? format(new Date(profile.memberSince), "MMM yyyy") : "N/A"}
                    </h3>
                  </div>
                  <div className="bg-purple-600/20 p-3 rounded-full">
                    <UserIcon className="h-6 w-6 text-purple-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section>
        <Tabs defaultValue="schedule" className="space-y-6">
          <TabsList className="bg-zinc-900">
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          <TabsContent value="schedule" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Your Schedule</h2>
              <Button onClick={() => setShowScheduleForm(true)}>
                <PlusIcon className="mr-2 h-4 w-4" />
                Add Event
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-zinc-900">
                <CardHeader>
                  <CardTitle>Calendar</CardTitle>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => date && setSelectedDate(date)}
                    className="bg-zinc-800 rounded-lg p-4"
                    modifiers={{
                      booked: scheduleDates,
                    }}
                    modifiersClassNames={{
                      booked: "bg-green-900 text-white font-bold",
                    }}
                  />
                </CardContent>
              </Card>

              <Card className="bg-zinc-900">
                <CardHeader>
                  <CardTitle>Events for {format(selectedDate, "MMMM d, yyyy")}</CardTitle>
                </CardHeader>
                <CardContent>
                  {filteredSchedule.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-400">No events scheduled for this date</p>
                      <Button variant="outline" className="mt-4" onClick={() => setShowScheduleForm(true)}>
                        <PlusIcon className="mr-2 h-4 w-4" />
                        Add Event
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {filteredSchedule.map((item) => (
                        <div key={item.id} className="bg-zinc-800 p-4 rounded-lg">
                          <div className="flex justify-between mb-2">
                            <h4 className="font-bold">{item.title}</h4>
                            <span className="text-green-400">{item.time}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                            <MapPinIcon size={14} />
                            <span>{item.location}</span>
                          </div>
                          <p className="text-sm text-gray-300 mb-3">{item.description}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {showScheduleForm && (
              <ScheduleForm
                onSubmit={handleAddSchedule}
                onCancel={() => {
                  setShowScheduleForm(false)
                  setEditingItem(null)
                }}
                initialDate={selectedDate}
                initialData={editingItem}
                isEditing={!!editingItem}
              />
            )}
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Your Projects</h2>
              <Button asChild>
                <Link href="/dashboard/projects/new">
                  <PlusIcon className="mr-2 h-4 w-4" />
                  Add Project
                </Link>
              </Button>
            </div>

            {projects.length === 0 ? (
              <Card className="bg-zinc-900">
                <CardContent className="p-8 text-center">
                  <div className="mx-auto w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mb-4">
                    <FilmIcon className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">No projects yet</h3>
                  <p className="text-gray-400 mb-6">Start adding your directing projects to showcase your work</p>
                  <Button asChild>
                    <Link href="/dashboard/projects/new">
                      <PlusIcon className="mr-2 h-4 w-4" />
                      Add Your First Project
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <Card key={project.id} className="bg-zinc-900 overflow-hidden">
                    <div className="relative h-[200px]">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-1">{project.title}</h3>
                      <p className="text-sm text-gray-400 mb-3">{project.year}</p>
                      <p className="text-sm text-gray-300 line-clamp-3 mb-4">{project.description}</p>
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/dashboard/projects/${project.id}`}>View Details</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <h2 className="text-2xl font-bold">Notifications</h2>

            {notifications.length === 0 ? (
              <Card className="bg-zinc-900">
                <CardContent className="p-8 text-center">
                  <div className="mx-auto w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mb-4">
                    <BellIcon className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">No notifications</h3>
                  <p className="text-gray-400">You're all caught up! Check back later for updates.</p>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-zinc-900">
                <CardContent className="p-0">
                  <div className="divide-y divide-zinc-800">
                    {notifications.map((notification) => (
                      <div key={notification.id} className="p-4 hover:bg-zinc-800">
                        <div className="flex items-start gap-4">
                          <div
                            className={`p-2 rounded-full ${
                              notification.type === "info"
                                ? "bg-blue-600/20 text-blue-500"
                                : notification.type === "success"
                                  ? "bg-green-600/20 text-green-500"
                                  : notification.type === "warning"
                                    ? "bg-yellow-600/20 text-yellow-500"
                                    : "bg-red-600/20 text-red-500"
                            }`}
                          >
                            <BellIcon className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <h4 className="font-medium">{notification.title}</h4>
                              <span className="text-xs text-gray-400">
                                {format(new Date(notification.date), "MMM d, h:mm a")}
                              </span>
                            </div>
                            <p className="text-sm text-gray-300 mt-1">{notification.message}</p>
                            {notification.actionLink && (
                              <Link
                                href={notification.actionLink}
                                className="text-sm text-green-400 hover:text-green-300 mt-2 inline-block"
                              >
                                {notification.actionText || "View Details"}
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </section>
    </div>
  )
}
