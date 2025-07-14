"use client"

import { useEffect, useState, useRef } from "react"
import { usePathname } from "next/navigation"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { AdCreative } from "@/lib/types"
import { fetchPopUpAds } from "@/lib/contentful"

export default function AdPopupManager() {
  const pathname = usePathname()
  const [ads, setAds] = useState<AdCreative[]>([])
  const [currentAd, setCurrentAd] = useState<AdCreative | null>(null)
  const [open, setOpen] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const INTERVAL = 25000 // 25s

  // Utility: pick a random ad
  function getRandomAd(adList: AdCreative[]) {
    return adList[Math.floor(Math.random() * adList.length)]
  }

  // Show ad (and choose a new creative)
  const triggerAd = () => {
    if (ads.length === 0) return
    setCurrentAd(getRandomAd(ads))
    setOpen(true)
  }

  // Close & clear any body scroll lock
  const handleClose = () => setOpen(false)

  // Initial load: fetch ads and show first popup
  useEffect(() => {
    async function loadAds() {
      const fetchedAds = await fetchPopUpAds()
      setAds(fetchedAds)
      setCurrentAd(getRandomAd(fetchedAds))
      setOpen(true)
    }

    const t = setTimeout(loadAds, 1500)
    return () => clearTimeout(t)
  }, [])

  // On every route change, show ad
  useEffect(() => {
    const t = setTimeout(triggerAd, 800)
    return () => clearTimeout(t)
  }, [pathname])

  // Recurring ad popup
  useEffect(() => {
    timerRef.current && clearInterval(timerRef.current)
    timerRef.current = setInterval(triggerAd, INTERVAL)
    return () => {
      timerRef.current && clearInterval(timerRef.current)
    }
  }, [pathname, ads])

  return currentAd ? (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="max-w-lg w-[90vw] p-0 border-none bg-zinc-900 text-white overflow-hidden"
        style={{ marginTop: "clamp(4rem, 10vh, 6rem)" }}
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
  ) : null
}
