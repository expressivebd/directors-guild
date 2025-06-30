"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { CalendarIcon, Clock, MapPin } from "lucide-react"
import type { ScheduleItem } from "@/lib/types"
import { addUserSchedule, updateScheduleItem } from "@/lib/api"

interface ScheduleFormProps {
  onSubmit: (item: ScheduleItem) => void
  onCancel: () => void
  initialDate?: Date
  initialData?: ScheduleItem | null
  isEditing?: boolean
}

export default function ScheduleForm({
  onSubmit,
  onCancel,
  initialDate = new Date(),
  initialData = null,
  isEditing = false,
}: ScheduleFormProps) {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    date: initialData ? new Date(initialData.date) : initialDate,
    time: initialData?.time || "",
    location: initialData?.location || "",
    description: initialData?.description || "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setFormData((prev) => ({ ...prev, date }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      let result: ScheduleItem

      if (isEditing && initialData) {
        // Update existing item
        result = await updateScheduleItem(initialData.id, {
          ...formData,
          date: format(formData.date, "yyyy-MM-dd"),
        })
      } else {
        // Add new item
        result = await addUserSchedule({
          ...formData,
          date: format(formData.date, "yyyy-MM-dd"),
        })
      }

      onSubmit(result)
    } catch (error) {
      console.error("Error saving schedule item:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="bg-zinc-900">
      <CardHeader>
        <CardTitle>{isEditing ? "Edit Schedule Item" : "Add New Schedule Item"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Event Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Meeting, Shoot, Workshop, etc."
                  required
                  className="bg-zinc-800"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    placeholder="e.g. 9:00 AM - 11:00 AM"
                    required
                    className="bg-zinc-800 pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Office, Studio, etc."
                    required
                    className="bg-zinc-800 pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Details about this event..."
                  className="bg-zinc-800 min-h-[120px]"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>
                  <div className="flex items-center">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    <span>Date: {format(formData.date, "MMMM d, yyyy")}</span>
                  </div>
                </Label>
                <Calendar
                  mode="single"
                  selected={formData.date}
                  onSelect={handleDateChange}
                  className="bg-zinc-800 rounded-lg p-4"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : isEditing ? "Update Event" : "Add to Schedule"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
