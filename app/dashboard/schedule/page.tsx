"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { useToast } from "@/components/ui/use-toast"
import { fetchUserSchedule, deleteScheduleItem } from "@/lib/api"
import type { ScheduleItem } from "@/lib/types"
import DashboardLayout from "@/components/dashboard/layout"
import ScheduleForm from "@/components/dashboard/schedule-form"
import { format, isSameDay } from "date-fns"
import { CalendarIcon, PlusIcon, MapPinIcon, Trash2, Edit } from "lucide-react"

export default function SchedulePage() {
  const [schedule, setSchedule] = useState<ScheduleItem[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [scheduleDates, setScheduleDates] = useState<Date[]>([])
  const [showScheduleForm, setShowScheduleForm] = useState(false)
  const [editingItem, setEditingItem] = useState<ScheduleItem | null>(null)
  const { toast } = useToast()

  const [scheduleRef, scheduleInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    const loadSchedule = async () => {
      try {
        const data = await fetchUserSchedule()
        setSchedule(data)

        // Extract dates from schedule for calendar highlighting
        const dates = data.map((item) => new Date(item.date))
        setScheduleDates(dates)

        setLoading(false)
      } catch (error) {
        console.error("Error loading schedule:", error)
        setLoading(false)
      }
    }

    loadSchedule()
  }, [])

  // Filter schedule items for selected date
  const filteredSchedule = schedule.filter((item) => {
    const itemDate = new Date(item.date)
    return isSameDay(itemDate, selectedDate)
  })

  const handleAddSchedule = (newItem: ScheduleItem) => {
    setSchedule((prev) => [...prev, newItem])
    setScheduleDates((prev) => [...prev, new Date(newItem.date)])
    setShowScheduleForm(false)
    setEditingItem(null)

    toast({
      title: "Schedule updated",
      description: "Your schedule has been updated successfully.",
    })
  }

  const handleEditSchedule = (item: ScheduleItem) => {
    setEditingItem(item)
    setShowScheduleForm(true)
    setSelectedDate(new Date(item.date))
  }

  const handleDeleteSchedule = async (id: string) => {
    if (confirm("Are you sure you want to delete this schedule item?")) {
      try {
        await deleteScheduleItem(id)

        const updatedSchedule = schedule.filter((item) => item.id !== id)
        setSchedule(updatedSchedule)

        // Update calendar dates
        const dates = updatedSchedule.map((item) => new Date(item.date))
        setScheduleDates(dates)

        toast({
          title: "Item deleted",
          description: "Schedule item has been deleted successfully.",
        })
      } catch (error) {
        toast({
          title: "Error",
          description: "There was an error deleting the schedule item.",
          variant: "destructive",
        })
      }
    }
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Your Schedule</h1>
          <Button
            onClick={() => {
              setShowScheduleForm(true)
              setEditingItem(null)
            }}
          >
            <PlusIcon className="mr-2 h-4 w-4" />
            Add Event
          </Button>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-zinc-900 animate-pulse h-[400px]" />
            <Card className="bg-zinc-900 animate-pulse h-[400px]" />
          </div>
        ) : (
          <div ref={scheduleRef} className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={scheduleInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-zinc-900">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CalendarIcon className="mr-2 h-5 w-5" />
                    <span>Calendar</span>
                  </CardTitle>
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
                  <p className="text-center mt-4 text-sm text-gray-400">
                    {scheduleDates.length === 0
                      ? "No events scheduled yet"
                      : `${scheduleDates.length} event${scheduleDates.length !== 1 ? "s" : ""} scheduled`}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={scheduleInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-zinc-900">
                <CardHeader>
                  <CardTitle>Events for {format(selectedDate, "MMMM d, yyyy")}</CardTitle>
                </CardHeader>
                <CardContent>
                  {filteredSchedule.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-400">No events scheduled for this date</p>
                      <Button
                        variant="outline"
                        className="mt-4"
                        onClick={() => {
                          setShowScheduleForm(true)
                          setEditingItem(null)
                        }}
                      >
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
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditSchedule(item)}
                              className="h-8 px-2"
                            >
                              <Edit className="h-4 w-4 mr-1" />
                              Edit
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteSchedule(item.id)}
                              className="h-8 px-2 text-red-500 hover:text-red-400"
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        )}

        {showScheduleForm && (
          <div className="mt-6">
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
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
