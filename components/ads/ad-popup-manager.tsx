"use client"

import { useEffect, useState, useRef } from "react"
import { usePathname } from "next/navigation"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

/**
 * A single ad slot description.
 */
interface AdCreative {
  id: string
  title: string
  body: string
  cta: string
  href: string
  img: string
}

const ADS: AdCreative[] = [
  {
    id: "cam-rental",
    title: "Need Pro Cameras?",
    body: "Rent RED & ARRI packages at 25 % off – this month only.",
    cta: "Browse Gear",
    href: "https://example.com/camera-rental",
    img: "/placeholder.svg?height=400&width=700",
  },
  {
    id: "festival-sub",
    title: "Submit Your Film",
    body: "Early-bird entry to Bright Lights Festival closes soon.",
    cta: "Submit Now",
    href: "https://example.com/festival",
    img: "/placeholder.svg?height=400&width=700",
  },
  {
    id: "post-house",
    title: "Post-Production Services",
    body: "Colour, VFX & sound finishing from Academy-award winning team.",
    cta: "Get a Quote",
    href: "https://example.com/post",
    img: "/placeholder.svg?height=400&width=700",
  },
  {
    id: "insurance",
    title: "On-Set Insurance",
    body: "Instant cover for crew & gear – starting at $49/day.",
    cta: "Insure Today",
    href: "https://example.com/insurance",
    img: "/placeholder.svg?height=400&width=700",
  },
  {
    id: "casting",
    title: "Find Your Cast",
    body: "10k+ actors ready for your next project. Post a breakdown free.",
    cta: "Post Casting",
    href: "https://example.com/casting",
    img: "/placeholder.svg?height=400&width=700",
  },
]

// Utility: pick a random ad
function getRandomAd() {
  return ADS[Math.floor(Math.random() * ADS.length)]
}

export default function AdPopupManager() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [currentAd, setCurrentAd] = useState<AdCreative>(getRandomAd)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const INTERVAL = 25_00000000000 // 25 s  //should be changed after developement

  // Show ad (and choose a new creative)
  const triggerAd = () => {
    setCurrentAd(getRandomAd())
    setOpen(true)
  }

  // Close & clear any body scroll lock
  const handleClose = () => setOpen(false)

  // Show once on initial mount
  useEffect(() => {
    const t = setTimeout(triggerAd, 1500)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // On every route change, show after a brief delay
  useEffect(() => {
    const t = setTimeout(triggerAd, 800)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  // Interval while user stays on same page
  useEffect(() => {
    timerRef.current && clearInterval(timerRef.current)
    timerRef.current = setInterval(triggerAd, INTERVAL)
    return () => {
      timerRef.current && clearInterval(timerRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="max-w-lg w-[90vw] p-0 border-none bg-zinc-900 text-white overflow-hidden"
        style={{ marginTop: "clamp(4rem, 10vh, 6rem)" }} // always below navbar
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          aria-label="Close advertisement"
          className="absolute top-3 right-3 z-10 rounded-full bg-black/60 hover:bg-black/80 p-1"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Ad image */}
        <img
          src={currentAd.img || "/placeholder.svg"}
          alt={currentAd.title}
          className="w-full h-40 object-cover"
          loading="lazy"
        />

        {/* Content */}
        <div className="p-6 space-y-3">
          <p className="text-xs uppercase tracking-widest text-green-400">Advertisement</p>
          <h3 className="text-2xl font-semibold">{currentAd.title}</h3>
          <p className="text-sm text-gray-300">{currentAd.body}</p>

          <div className="flex gap-2 pt-2">
            <Button asChild size="sm">
              <a href={currentAd.href} target="_blank" rel="noopener noreferrer">
                {currentAd.cta}
              </a>
            </Button>
            <Button variant="secondary" size="sm" onClick={handleClose}>
              Skip
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
