"use client";

import dynamic from "next/dynamic"

// Lazy-load Google Maps iframe to avoid blocking
const MapIframe = dynamic(
  () =>
    Promise.resolve(() => (
      <iframe
        title="Directors Guild HQ"
        className="w-full h-full rounded-md border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3303.9725809799884!2d-118.32871288478242!3d34.0928091805966!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2bea560ce2cd5%3A0x6e2e2b8d52b5a3c7!2sHollywood%20Blvd!5e0!3m2!1sen!2sus!4v1685568732142!5m2!1sen!2sus"
      />
    )),
  { ssr: false },
)

export default function MapSection() {
  return (
    <div className="w-full h-[420px] overflow-hidden relative rounded-md">
      {/* fallback placeholder while iframe loads */}
      <img
        src="/placeholder.svg?height=420&width=800"
        alt="Map placeholder"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <MapIframe />
    </div>
  )
}
