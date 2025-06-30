"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarIcon, MapPinIcon, ClockIcon, UsersIcon, ArrowRight } from "lucide-react"
import { format } from "date-fns"
import type { Event } from "@/lib/types"
import { getEventById } from "@/lib/events-data"
import EventDetailsModal from "./event-details-modal"

interface EventsGridProps {
  groupedEvents: Record<string, Event[]>
  resetFilters: () => void
}

export default function EventsGrid({ groupedEvents, resetFilters }: EventsGridProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const triggerRefs = useRef<Record<string, HTMLButtonElement>>({})

  const handleViewDetails = (eventId: string) => {
    const event = getEventById(eventId)
    if (event) {
      setSelectedEvent(event)
      setIsModalOpen(true)
    }
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedEvent(null)
  }

  return (
    <>
      <div ref={ref}>
        {Object.keys(groupedEvents).length === 0 ? (
          <div className="text-center py-12 bg-zinc-900 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">No events found</h3>
            <p className="text-gray-400 mb-6">Try adjusting your search criteria</p>
            <Button onClick={resetFilters}>Reset Filters</Button>
          </div>
        ) : (
          <div className="space-y-12">
            {Object.entries(groupedEvents).map(([month, monthEvents]) => (
              <motion.div
                key={month}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold mb-6 border-b border-zinc-800 pb-2">{month}</h2>
                <div className="space-y-6">
                  {monthEvents.map((event, index) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card className="bg-zinc-800 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                        <CardContent className="p-0">
                          <div className="grid md:grid-cols-3 gap-0">
                            <div className="relative h-[200px]">
                              <Image
                                src={event.image || "/placeholder.svg"}
                                alt={event.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="md:col-span-2 p-6">
                              <div className="flex flex-wrap gap-2 mb-3">
                                <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm">
                                  {event.type}
                                </span>
                                {event.tags?.map((tag, i) => (
                                  <span key={i} className="bg-zinc-700 text-white px-3 py-1 rounded-full text-sm">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                              <h3 className="text-xl font-bold mb-3">{event.title}</h3>
                              <p className="text-gray-300 mb-4 line-clamp-2">{event.description}</p>
                              <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-4">
                                <div className="flex items-center gap-1">
                                  <CalendarIcon size={16} />
                                  <span>{format(new Date(event.date), "MMMM d, yyyy")}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <ClockIcon size={16} />
                                  <span>{event.time}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <MapPinIcon size={16} />
                                  <span>{event.location}</span>
                                </div>
                                {event.attendees && (
                                  <div className="flex items-center gap-1">
                                    <UsersIcon size={16} />
                                    <span>{event.attendees} attendees</span>
                                  </div>
                                )}
                              </div>
                              <Button
                                ref={(el) => {
                                  if (el) triggerRefs.current[event.id] = el
                                }}
                                onClick={() => handleViewDetails(event.id)}
                                className="bg-green-600 hover:bg-green-700 text-white"
                              >
                                View Details
                                <ArrowRight size={16} className="ml-2" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Event Details Modal */}
      <EventDetailsModal
        event={selectedEvent}
        isOpen={isModalOpen}
        onClose={closeModal}
        triggerRef={selectedEvent ? { current: triggerRefs.current[selectedEvent.id] } : undefined}
      />
    </>
  )
}
