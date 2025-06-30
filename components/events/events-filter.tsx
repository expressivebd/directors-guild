"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import EventsGrid from "@/components/events/events-grid"
import EventsCalendar from "@/components/events/events-calendar"
import type { Event } from "@/lib/types"
import { isSameDay } from "date-fns"

interface EventsFilterProps {
  events: Event[]
  eventDates: Date[]
}

export default function EventsFilter({ events, eventDates }: EventsFilterProps) {
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(events)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)

  useEffect(() => {
    const filtered = events.filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesDate = !selectedDate || isSameDay(new Date(event.date), selectedDate)

      return matchesSearch && matchesDate
    })

    setFilteredEvents(filtered)
  }, [searchQuery, selectedDate, events])

  // Group events by month
  const groupedEvents = filteredEvents.reduce(
    (groups, event) => {
      const date = new Date(event.date)
      const month = date.toLocaleString("default", { month: "long", year: "numeric" })

      if (!groups[month]) {
        groups[month] = []
      }

      groups[month].push(event)
      return groups
    },
    {} as Record<string, Event[]>,
  )

  const resetFilters = () => {
    setSearchQuery("")
    setSelectedDate(undefined)
  }

  return (
    <section className="py-16 bg-transparent">
      <div className="container mx-auto px-4">
        {/* Filters */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-2">
            <Input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-zinc-800"
            />
          </div>
          <div className="flex justify-end">
            <Button variant="outline" onClick={resetFilters}>
              Reset Filters
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Calendar Sidebar */}
          <div className="md:col-span-1">
            <EventsCalendar eventDates={eventDates} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
          </div>

          {/* Events Grid */}
          <div className="md:col-span-2">
            <EventsGrid groupedEvents={groupedEvents} resetFilters={resetFilters} />
          </div>
        </div>
      </div>
    </section>
  )
}
