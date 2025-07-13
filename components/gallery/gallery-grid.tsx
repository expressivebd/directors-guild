"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  X,
  Download,
  Share,
  ChevronDown,
  ChevronUp,
  Play,
  Pause,
  Volume2,
  VolumeX,
  RotateCcw,
} from "lucide-react";
import type { GalleryMedia, GalleryEvent } from "@/lib/types";

interface GalleryGridProps {
  events: GalleryEvent[];
}

export default function GalleryGrid({ events }: GalleryGridProps) {
  const [selectedMedia, setSelectedMedia] = useState<GalleryMedia | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [allMedia, setAllMedia] = useState<GalleryMedia[]>([]);
  const [expandedEvents, setExpandedEvents] = useState<Set<string>>(new Set(events.map((e) => e.id)));
  const [allExpanded, setAllExpanded] = useState(true);
  const [showVideoControls, setShowVideoControls] = useState(false);

  // Video state
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  // 🔄 Generate thumbnail from video
  const generateThumbnailFromVideo = async (videoUrl: string): Promise<string | null> => {
    return new Promise((resolve) => {
      const video = document.createElement("video");
      video.src = videoUrl;
      video.crossOrigin = "anonymous";
      video.muted = true;
      video.currentTime = 1;

      video.addEventListener("loadeddata", () => {
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d");
        if (!ctx) return resolve(null);

        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const thumbnail = canvas.toDataURL("image/jpeg");
        resolve(thumbnail);
      });

      video.addEventListener("error", () => {
        resolve(null);
      });
    });
  };

  // 🧠 Patch missing video thumbnails
  useEffect(() => {
    const patchVideoThumbnails = async () => {
      for (const event of events) {
        for (const media of event.media) {
          if (media.type === "video" && !media.thumbnailUrl) {
            const thumb = await generateThumbnailFromVideo(media.url);
            media.thumbnailUrl = thumb ?? media.url;
          }
        }
      }
      // Trigger re-render
      setAllMedia(events.flatMap((e) => e.media));
    };

    patchVideoThumbnails();
  }, [events]);

  // Handlers
  const handleMediaClick = (media: GalleryMedia, eventMedia: GalleryMedia[], index: number) => {
    setSelectedMedia(media);
    setAllMedia(eventMedia);
    setCurrentIndex(index);
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % allMedia.length;
    setSelectedMedia(allMedia[nextIndex]);
    setCurrentIndex(nextIndex);
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const handlePrevious = () => {
    const prevIndex = (currentIndex - 1 + allMedia.length) % allMedia.length;
    setSelectedMedia(allMedia[prevIndex]);
    setCurrentIndex(prevIndex);
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const toggleEvent = (eventId: string) => {
    const newExpanded = new Set(expandedEvents);
    newExpanded.has(eventId) ? newExpanded.delete(eventId) : newExpanded.add(eventId);
    setExpandedEvents(newExpanded);
    setAllExpanded(newExpanded.size === events.length);
  };

  const toggleAllEvents = () => {
    if (allExpanded) {
      setExpandedEvents(new Set());
      setAllExpanded(false);
    } else {
      setExpandedEvents(new Set(events.map((e) => e.id)));
      setAllExpanded(true);
    }
  };

  // Video controls
  const togglePlayPause = () => {
    if (videoRef.current) {
      isPlaying ? videoRef.current.pause() : videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) videoRef.current.volume = newVolume;
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) setDuration(videoRef.current.duration);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (videoRef.current) videoRef.current.currentTime = newTime;
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const resetVideo = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      setCurrentTime(0);
      setIsPlaying(false);
    }
  };

  return (
    <>
      <div className="space-y-8">
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

        {events.map((event) => (
          <div key={event.id} className="space-y-4">
            <div
              className="flex items-center justify-between p-4 bg-zinc-900/30 rounded-lg border border-zinc-800/50 cursor-pointer hover:bg-zinc-800/30 transition-colors"
              onClick={() => toggleEvent(event.id)}
            >
              <div>
                <h2 className="text-xl font-semibold text-white">{event.name}</h2>
                <p className="text-gray-400 text-sm mt-1">{event.description}</p>
                <p className="text-gray-500 text-xs mt-1">
                  {event.date} • {event.media.length} items
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
                    {event.media.map((media, index) => (
                      <motion.div
                        key={media.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="group relative aspect-square overflow-hidden rounded-lg bg-zinc-900/50 cursor-pointer"
                        onClick={() => handleMediaClick(media, event.media, index)}
                      >
                        <Image
                          src={media.type === "video" ? media.thumbnailUrl || media.url : media.url}
                          alt={media.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        />

                        {media.type === "video" && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-black/60 rounded-full p-3 group-hover:bg-black/80 transition-colors">
                              <Play className="h-6 w-6 text-white fill-white" />
                            </div>
                          </div>
                        )}

                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                          <h3 className="text-white font-medium text-sm">{media.title}</h3>
                          <p className="text-gray-300 text-xs">
                            {media.category} • {media.date} • {media.type}
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

      {/* MODAL: unchanged */}
      {/* ...keep your existing dialog/modal code here */}
    </>
  );
}
