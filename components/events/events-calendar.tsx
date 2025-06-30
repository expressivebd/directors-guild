"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"

interface EventsCalendarProps {
  eventDates: Date[]
  selectedDate: Date | undefined
  setSelectedDate: (date: Date | undefined) => void
}

export default function EventsCalendar({ eventDates, selectedDate, setSelectedDate }: EventsCalendarProps) {
  return (
    <Card className="bg-zinc-900 sticky top-24">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarIcon size={20} />
          <span>Event Calendar</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          className="bg-zinc-800 rounded-lg p-4"
          modifiers={{
            event: eventDates,
          }}
          modifiersClassNames={{
            event: "bg-green-900 text-white font-bold",
          }}
        />

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-400 mb-2">
            {selectedDate ? `Events for ${format(selectedDate, "MMMM d, yyyy")}` : "Select a date to filter events"}
          </p>

          {selectedDate && (
            <Button variant="outline" size="sm" onClick={() => setSelectedDate(undefined)}>
              Clear Selection
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
