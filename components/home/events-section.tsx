"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarIcon, MapPinIcon, ClockIcon } from "lucide-react"
import type { Event } from "@/lib/types"
import { format } from "date-fns"

interface EventsSectionProps {
  events: Event[]
}

export default function EventsSection({ events }: EventsSectionProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  if (!events || events.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, index) => (
          <Card key={index} className="bg-zinc-800 animate-pulse h-[350px]">
            <CardContent className="p-0"></CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {events.map((event, index) => (
        <motion.div
          key={event.id}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className="bg-zinc-800 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full">
            <CardContent className="p-0 h-full flex flex-col">
              <div className="relative h-[200px]">
                <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
                <div className="absolute top-4 left-4">
                  <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm">{event.type}</span>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold mb-3">{event.title}</h3>
                <p className="text-sm text-gray-300 mb-4 flex-grow">{event.description}</p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-400">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    <span>{format(new Date(event.date), "MMMM d, yyyy")}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-400">
                    <ClockIcon className="mr-2 h-4 w-4" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-400">
                    <MapPinIcon className="mr-2 h-4 w-4" />
                    <span>{event.location}</span>
                  </div>
                </div>
                <Button asChild>
                  <Link href={`/events/${event.id}`}>Register Now</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
