"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { X, Calendar, Clock, MapPin, User, Users, DollarSign, Shirt, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import type { Event } from "@/lib/types"

interface EventDetailsModalProps {
  event: Event | null
  isOpen: boolean
  onClose: () => void
  triggerRef?: React.RefObject<HTMLElement>
}

export default function EventDetailsModal({ event, isOpen, onClose, triggerRef }: EventDetailsModalProps) {
  const [triggerPosition, setTriggerPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (isOpen && triggerRef?.current) {
      const rect = triggerRef.current.getBoundingClientRect()
      setTriggerPosition({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      })
    }
  }, [isOpen, triggerRef])

  if (!event) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.1,
              x: triggerPosition.x - window.innerWidth / 2,
              y: triggerPosition.y - window.innerHeight / 2,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              x: 0,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.1,
              x: triggerPosition.x - window.innerWidth / 2,
              y: triggerPosition.y - window.innerHeight / 2,
            }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 300,
            }}
            className="fixed left-4 right-4 top-24 bottom-6 md:inset-12 lg:inset-20 xl:inset-24 bg-zinc-900 rounded-lg overflow-hidden z-50 flex flex-col max-h-[calc(100vh-7rem)]"
          >
            {/* Header with Background Image */}
            <div className="relative h-32 md:h-48 lg:h-64">
              <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

              {/* Close Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="absolute top-2 right-2 md:top-4 md:right-4 bg-black/50 hover:bg-black/70 text-green-500 hover:text-green-400"
              >
                <X size={16} className="md:w-5 md:h-5" />
              </Button>

              {/* Event Header Info */}
              <div className="absolute bottom-2 left-2 right-2 md:bottom-4 md:left-4 md:right-4 text-white">
                <h1 className="text-lg md:text-2xl lg:text-3xl font-bold mb-2 md:mb-3">{event.title}</h1>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-1 md:gap-4 text-xs md:text-sm">
                  <div className="flex items-center gap-1 md:gap-2">
                    <Calendar size={12} className="md:w-3.5 md:h-3.5" />
                    <span className="truncate">{format(new Date(event.date), "MMM d, yyyy")}</span>
                  </div>
                  <div className="flex items-center gap-1 md:gap-2">
                    <Clock size={12} className="md:w-3.5 md:h-3.5" />
                    <span className="truncate">{event.time}</span>
                  </div>
                  <div className="flex items-center gap-1 md:gap-2">
                    <MapPin size={12} className="md:w-3.5 md:h-3.5" />
                    <span className="truncate">{event.location}</span>
                  </div>
                  <div className="flex items-center gap-1 md:gap-2">
                    <User size={12} className="md:w-3.5 md:h-3.5" />
                    <span className="truncate">{event.organizer}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-3 md:p-6">
              <div className="grid lg:grid-cols-3 gap-4 md:gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-3 md:space-y-6">
                  <div>
                    <h2 className="text-base md:text-xl lg:text-2xl font-bold mb-2 md:mb-4 text-white">
                      Event Description
                    </h2>
                    <p className="text-gray-300 leading-relaxed text-sm md:text-base">{event.description}</p>
                  </div>

                  {event.agenda && (
                    <div>
                      <h3 className="text-sm md:text-lg lg:text-xl font-bold mb-2 md:mb-3 text-white">Agenda</h3>
                      <ul className="space-y-1 md:space-y-2">
                        {event.agenda.map((item, index) => (
                          <li key={index} className="text-gray-300 flex items-start gap-2 text-xs md:text-base">
                            <span className="text-green-500 mt-1">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {event.speakers && (
                    <div>
                      <h3 className="text-sm md:text-lg lg:text-xl font-bold mb-2 md:mb-3 text-white">Speakers</h3>
                      <div className="flex flex-wrap gap-1 md:gap-2">
                        {event.speakers.map((speaker, index) => (
                          <span
                            key={index}
                            className="bg-green-600 text-white px-2 md:px-3 py-1 rounded-full text-xs md:text-sm"
                          >
                            {speaker}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Event Details Sidebar */}
                <div className="space-y-3 md:space-y-6">
                  <div className="bg-zinc-800 rounded-lg p-3 md:p-6">
                    <h3 className="text-sm md:text-lg lg:text-xl font-bold mb-2 md:mb-4 text-white">Event Details</h3>
                    <div className="space-y-2 md:space-y-4">
                      <div className="flex items-start gap-2 md:gap-3">
                        <User className="text-green-500 mt-1" size={12} />
                        <div>
                          <p className="text-xs md:text-sm text-gray-400">Organizer</p>
                          <p className="text-white text-xs md:text-base">{event.organizer}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2 md:gap-3">
                        <MapPin className="text-green-500 mt-1" size={12} />
                        <div>
                          <p className="text-xs md:text-sm text-gray-400">Venue</p>
                          <p className="text-white text-xs md:text-base">{event.venue}</p>
                          {event.venueAddress && (
                            <p className="text-xs md:text-sm text-gray-300">{event.venueAddress}</p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-start gap-2 md:gap-3">
                        <Clock className="text-green-500 mt-1" size={12} />
                        <div>
                          <p className="text-xs md:text-sm text-gray-400">Time</p>
                          <p className="text-white text-xs md:text-base">{event.time}</p>
                        </div>
                      </div>

                      {event.attendees && (
                        <div className="flex items-start gap-2 md:gap-3">
                          <Users className="text-green-500 mt-1" size={12} />
                          <div>
                            <p className="text-xs md:text-sm text-gray-400">Expected Attendees</p>
                            <p className="text-white text-xs md:text-base">{event.attendees} people</p>
                          </div>
                        </div>
                      )}

                      {event.ticketPrice && (
                        <div className="flex items-start gap-2 md:gap-3">
                          <DollarSign className="text-green-500 mt-1" size={12} />
                          <div>
                            <p className="text-xs md:text-sm text-gray-400">Ticket Price</p>
                            <p className="text-white text-xs md:text-base">{event.ticketPrice}</p>
                          </div>
                        </div>
                      )}

                      {event.dresscode && (
                        <div className="flex items-start gap-2 md:gap-3">
                          <Shirt className="text-green-500 mt-1" size={12} />
                          <div>
                            <p className="text-xs md:text-sm text-gray-400">Dress Code</p>
                            <p className="text-white text-xs md:text-base">{event.dresscode}</p>
                          </div>
                        </div>
                      )}

                      {event.contact && (
                        <div className="flex items-start gap-2 md:gap-3">
                          <Mail className="text-green-500 mt-1" size={12} />
                          <div>
                            <p className="text-xs md:text-sm text-gray-400">Contact</p>
                            <p className="text-white text-xs md:text-base">{event.contact}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {event.requirements && (
                    <div className="bg-zinc-800 rounded-lg p-3 md:p-6">
                      <h3 className="text-sm md:text-lg font-bold mb-2 md:mb-3 text-white">Requirements</h3>
                      <p className="text-gray-300 text-xs md:text-sm">{event.requirements}</p>
                    </div>
                  )}

                  {/* Tags */}
                  <div>
                    <h3 className="text-sm md:text-lg font-bold mb-2 md:mb-3 text-white">Tags</h3>
                    <div className="flex flex-wrap gap-1 md:gap-2">
                      {event.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-zinc-700 text-white px-2 md:px-3 py-1 rounded-full text-xs md:text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
