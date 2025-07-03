"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Calendar, Clock, MapPin, User, Users, DollarSign, Shirt, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import type { Event } from "@/lib/types"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

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
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen, triggerRef])

  if (!event) return null

  const description = event.description
  const agenda = event.agenda

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
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
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            exit={{
              opacity: 0,
              scale: 0.1,
              x: triggerPosition.x - window.innerWidth / 2,
              y: triggerPosition.y - window.innerHeight / 2,
            }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed isolate left-4 right-4 top-24 bottom-6 md:inset-12 lg:inset-20 xl:inset-24 bg-zinc-900 rounded-lg overflow-hidden z-[9999] flex flex-col max-h-[calc(100vh-7rem)]"
          >
            {/* Header Info Box */}
            <div className="bg-zinc-800 border border-zinc-700 rounded-md mx-4 mt-4 p-4 relative">
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-3">{event.title}</h1>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 text-xs md:text-sm text-gray-300">
                <div className="flex items-center gap-2">
                  <Calendar size={14} />
                  <span>{format(new Date(event.date), "MMM d, yyyy")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={14} />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={14} />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User size={14} />
                  <span>{event.organizer}</span>
                </div>
              </div>

              {/* Close Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-green-500 hover:text-green-400"
              >
                <X size={18} />
              </Button>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto p-3 md:p-6">
              <div className="grid lg:grid-cols-3 gap-4 md:gap-8">
                {/* Left: Description & Agenda */}
                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <h2 className="text-xl font-bold text-white mb-2">Event Description</h2>
                    <div className="prose prose-invert text-gray-300 max-w-none">
                      {description ? documentToReactComponents(description) : <p>No description available.</p>}
                    </div>
                  </div>

                  {agenda && (
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2">Agenda</h3>
                      <div className="prose prose-invert text-gray-300 max-w-none">
                        {documentToReactComponents(agenda)}
                      </div>
                    </div>
                  )}
                </div>

                {/* Right: Event Sidebar */}
                <div className="space-y-6">
                  <div className="bg-zinc-800 rounded-lg p-4">
                    <h3 className="text-lg font-bold text-white mb-4">Event Details</h3>
                    <div className="space-y-4 text-sm text-gray-300">
                      <div>
                        <p className="text-gray-400">Organizer</p>
                        <p className="text-white">{event.organizer}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Venue</p>
                        <p className="text-white">{event.venue}</p>
                        {event.venueAddress && <p className="text-sm">{event.venueAddress}</p>}
                      </div>
                      <div>
                        <p className="text-gray-400">Time</p>
                        <p className="text-white">{event.time}</p>
                      </div>
                      {event.attendees && (
                        <div>
                          <p className="text-gray-400">Expected Attendees</p>
                          <p className="text-white">{event.attendees} people</p>
                        </div>
                      )}
                      {event.ticketPrice && (
                        <div>
                          <p className="text-gray-400">Ticket Price</p>
                          <p className="text-white">{event.ticketPrice} BDT</p>
                        </div>
                      )}
                      {event.dresscode && (
                        <div>
                          <p className="text-gray-400">Dress Code</p>
                          <p className="text-white">{event.dresscode}</p>
                        </div>
                      )}
                      {event.contact && (
                        <div>
                          <p className="text-gray-400">Contact</p>
                          <p className="text-white">{event.contact}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {event.requirements && (
                    <div className="bg-zinc-800 rounded-lg p-4">
                      <h3 className="text-lg font-bold text-white mb-2">Requirements</h3>
                      <p className="text-sm text-gray-300">{event.requirements}</p>
                    </div>
                  )}

                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {event.tags.map((tag, i) => (
                        <span key={i} className="bg-zinc-700 text-white px-3 py-1 rounded-full text-sm">
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
