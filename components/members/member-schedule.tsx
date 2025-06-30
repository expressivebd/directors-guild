"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  format,
  isSameDay,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isToday,
} from "date-fns"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { fetchMemberSchedule } from "@/lib/api"
import type { ScheduleItem } from "@/lib/types"
import { CalendarIcon, ChevronLeft, ChevronRight, MapPin, Users, Tag } from "lucide-react"

interface MemberScheduleProps {
  memberId: string
}

export default function MemberSchedule({ memberId }: MemberScheduleProps) {
  const [schedule, setSchedule] = useState<ScheduleItem[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date())
  const [view, setView] = useState<"calendar" | "list">("calendar")

  useEffect(() => {
    const loadData = async () => {
      try {
        const scheduleData = await fetchMemberSchedule(memberId)
        setSchedule(scheduleData)
        setLoading(false)
      } catch (error) {
        console.error("Error loading schedule data:", error)
        setLoading(false)
      }
    }

    loadData()
  }, [memberId])

  // Filter schedule items for selected date
  const filteredSchedule = schedule.filter((item) => {
    const itemDate = new Date(item.date)
    return isSameDay(itemDate, selectedDate)
  })

  // Navigate to previous month
  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
  }

  // Navigate to next month
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }

  // Get days in current month
  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd })

  // Check if a date has events
  const hasEvents = (date: Date) => {
    return schedule.some((item) => isSameDay(new Date(item.date), date))
  }

  // Get events count for a date
  const getEventsCount = (date: Date) => {
    return schedule.filter((item) => isSameDay(new Date(item.date), date)).length
  }

  if (loading) {
    return (
      <Card className="bg-zinc-900">
        <CardContent className="p-6 flex justify-center items-center h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-zinc-900">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="flex items-center gap-2">
          <CalendarIcon size={20} />
          <span>Schedule</span>
        </CardTitle>
        <div className="flex items-center gap-2">
          <Button variant={view === "calendar" ? "default" : "outline"} size="sm" onClick={() => setView("calendar")}>
            Calendar
          </Button>
          <Button variant={view === "list" ? "default" : "outline"} size="sm" onClick={() => setView("list")}>
            List
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <AnimatePresence mode="wait">
          {view === "calendar" ? (
            <motion.div
              key="calendar-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between mb-4">
                <Button variant="outline" size="icon" onClick={prevMonth}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <h2 className="text-xl font-bold">{format(currentMonth, "MMMM yyyy")}</h2>
                <Button variant="outline" size="icon" onClick={nextMonth}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-7 gap-1 text-center">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div key={day} className="text-xs font-medium text-gray-400 py-2">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: monthStart.getDay() }).map((_, index) => (
                  <div key={`empty-start-${index}`} className="h-14 p-1" />
                ))}

                {daysInMonth.map((day) => {
                  const isSelected = isSameDay(day, selectedDate)
                  const hasSchedule = hasEvents(day)
                  const eventCount = getEventsCount(day)
                  const isCurrentMonth = isSameMonth(day, currentMonth)
                  const isCurrentDay = isToday(day)

                  return (
                    <button
                      key={day.toString()}
                      onClick={() => setSelectedDate(day)}
                      className={`h-14 p-1 relative rounded-md transition-colors ${
                        !isCurrentMonth
                          ? "text-gray-500"
                          : isSelected
                            ? "bg-green-600/20 text-green-400 font-bold"
                            : isCurrentDay
                              ? "bg-zinc-800 text-white"
                              : "hover:bg-zinc-800"
                      }`}
                    >
                      <div className="flex flex-col items-center justify-center h-full">
                        <span className="text-sm">{format(day, "d")}</span>
                        {hasSchedule && (
                          <div className="mt-1 flex gap-0.5">
                            {Array.from({ length: Math.min(eventCount, 3) }).map((_, i) => (
                              <div
                                key={i}
                                className={`w-1 h-1 rounded-full ${isSelected ? "bg-green-400" : "bg-green-600"}`}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    </button>
                  )
                })}

                {Array.from({
                  length: 6 * 7 - (monthStart.getDay() + daysInMonth.length),
                }).map((_, index) => (
                  <div key={`empty-end-${index}`} className="h-14 p-1" />
                ))}
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-bold mb-4">Events for {format(selectedDate, "MMMM d, yyyy")}</h3>

                {filteredSchedule.length === 0 ? (
                  <div className="text-center py-8 bg-zinc-800 rounded-lg">
                    <p className="text-gray-400">No scheduled events for this date.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredSchedule.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="bg-zinc-800 p-4 rounded-lg"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-bold">{item.title}</h4>
                          <Badge variant="outline" className="bg-green-600/20 text-green-400">
                            {item.time}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                          <MapPin size={14} />
                          <span>{item.location}</span>
                        </div>
                        <p className="text-sm text-gray-300">{item.description}</p>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="list-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {schedule.length === 0 ? (
                <div className="text-center py-8 bg-zinc-800 rounded-lg">
                  <p className="text-gray-400">No scheduled events.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Group events by month */}
                  {Object.entries(
                    schedule.reduce(
                      (acc, event) => {
                        const month = format(new Date(event.date), "MMMM yyyy")
                        if (!acc[month]) acc[month] = []
                        acc[month].push(event)
                        return acc
                      },
                      {} as Record<string, ScheduleItem[]>,
                    ),
                  ).map(([month, events]) => (
                    <div key={month}>
                      <h3 className="text-lg font-bold mb-4 border-b border-zinc-800 pb-2">{month}</h3>
                      <div className="space-y-4">
                        {events
                          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                          .map((item, index) => (
                            <motion.div
                              key={item.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.05 }}
                              className="bg-zinc-800 p-4 rounded-lg"
                            >
                              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-2">
                                <div>
                                  <h4 className="font-bold">{item.title}</h4>
                                  <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                                    <CalendarIcon size={14} />
                                    <span>{format(new Date(item.date), "EEEE, MMMM d, yyyy")}</span>
                                  </div>
                                </div>
                                <Badge variant="outline" className="bg-green-600/20 text-green-400 w-fit">
                                  {item.time}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                                <MapPin size={14} />
                                <span>{item.location}</span>
                              </div>
                              <p className="text-sm text-gray-300 mb-3">{item.description}</p>
                              <div className="flex flex-wrap gap-2">
                                {item.tags &&
                                  item.tags.map((tag, i) => (
                                    <div key={i} className="flex items-center text-xs text-gray-400">
                                      <Tag size={12} className="mr-1" />
                                      <span>{tag}</span>
                                    </div>
                                  ))}
                                {item.attendees && (
                                  <div className="flex items-center text-xs text-gray-400">
                                    <Users size={12} className="mr-1" />
                                    <span>{item.attendees} attendees</span>
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}
