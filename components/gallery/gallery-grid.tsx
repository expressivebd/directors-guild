"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, X, Download, Share, ChevronDown, ChevronUp } from "lucide-react"
import type { GalleryImage } from "@/lib/types"
import type { GalleryEvent } from "@/lib/gallery-data"

interface GalleryGridProps {
  events: GalleryEvent[]
}

export default function GalleryGrid({ events }: GalleryGridProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [allImages, setAllImages] = useState<GalleryImage[]>([])
  const [expandedEvents, setExpandedEvents] = useState<Set<string>>(new Set(events.map((e) => e.id)))
  const [allExpanded, setAllExpanded] = useState(true)

  const handleImageClick = (image: GalleryImage, eventImages: GalleryImage[], imageIndex: number) => {
    setSelectedImage(image)
    setAllImages(eventImages)
    setCurrentIndex(imageIndex)
  }

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % allImages.length
    setSelectedImage(allImages[nextIndex])
    setCurrentIndex(nextIndex)
  }

  const handlePrevious = () => {
    const prevIndex = (currentIndex - 1 + allImages.length) % allImages.length
    setSelectedImage(allImages[prevIndex])
    setCurrentIndex(prevIndex)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") handleNext()
    if (e.key === "ArrowLeft") handlePrevious()
    if (e.key === "Escape") setSelectedImage(null)
  }

  const toggleEvent = (eventId: string) => {
    const newExpanded = new Set(expandedEvents)
    if (newExpanded.has(eventId)) {
      newExpanded.delete(eventId)
    } else {
      newExpanded.add(eventId)
    }
    setExpandedEvents(newExpanded)
    setAllExpanded(newExpanded.size === events.length)
  }

  const toggleAllEvents = () => {
    if (allExpanded) {
      setExpandedEvents(new Set())
      setAllExpanded(false)
    } else {
      setExpandedEvents(new Set(events.map((e) => e.id)))
      setAllExpanded(true)
    }
  }

  return (
    <>
      <div className="space-y-8">
        {/* Toggle All Button */}
        <div className="flex justify-end">
          <Button
            onClick={toggleAllEvents}
            variant="outline"
            className="border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800/50"
          >
            {allExpanded ? (
              <>
                <ChevronUp className="h-4 w-4 mr-2" />
                Collapse All
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4 mr-2" />
                Expand All
              </>
            )}
          </Button>
        </div>

        {/* Event Sections */}
        {events.map((event) => (
          <div key={event.id} className="space-y-4">
            {/* Event Header */}
            <div
              className="flex items-center justify-between p-4 bg-zinc-900/30 rounded-lg border border-zinc-800/50 cursor-pointer hover:bg-zinc-800/30 transition-colors"
              onClick={() => toggleEvent(event.id)}
            >
              <div>
                <h2 className="text-xl font-semibold text-white">{event.name}</h2>
                <p className="text-gray-400 text-sm mt-1">{event.description}</p>
                <p className="text-gray-500 text-xs mt-1">
                  {event.date} • {event.images.length} photos
                </p>
              </div>
              <div className="flex items-center space-x-2">
                {expandedEvents.has(event.id) ? (
                  <ChevronUp className="h-5 w-5 text-gray-400" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                )}
              </div>
            </div>

            {/* Event Images */}
            <AnimatePresence>
              {expandedEvents.has(event.id) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pl-4">
                    {event.images.map((image, index) => (
                      <motion.div
                        key={image.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="group relative aspect-square overflow-hidden rounded-lg bg-zinc-900/50 cursor-pointer"
                        onClick={() => handleImageClick(image, event.images, index)}
                      >
                        <Image
                          src={image.url || "/placeholder.svg"}
                          alt={image.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                          <h3 className="text-white font-medium text-sm">{image.title}</h3>
                          <p className="text-gray-300 text-xs">
                            {image.category} • {image.date}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
        <DialogContent
          className="max-w-5xl w-[90vw] h-[90vh] p-0 bg-black/95 border-zinc-800"
          onKeyDown={handleKeyDown}
        >
          <div className="relative h-full flex flex-col">
            {/* Close button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Navigation buttons */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                handlePrevious()
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleNext()
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Image */}
            <div className="flex-1 flex items-center justify-center p-4">
              {selectedImage && (
                <div className="relative h-full w-full">
                  <Image
                    src={selectedImage.url || "/placeholder.svg"}
                    alt={selectedImage.title}
                    fill
                    className="object-contain"
                    sizes="90vw"
                  />
                </div>
              )}
            </div>

            {/* Image info */}
            {selectedImage && (
              <div className="p-4 border-t border-zinc-800">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-medium">{selectedImage.title}</h2>
                    <p className="text-gray-400 text-sm">
                      {selectedImage.category} • {selectedImage.date}
                    </p>
                    <p className="text-gray-300 mt-2">{selectedImage.description}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="border-zinc-700">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                    <Button variant="outline" size="sm" className="border-zinc-700">
                      <Share className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
