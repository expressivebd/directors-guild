import { Suspense } from "react"
import PageHeader from "@/components/layout/page-header"
import GalleryGrid from "@/components/gallery/gallery-grid"
import GalleryFilter from "@/components/gallery/gallery-filter"
import LoadingSpinner from "@/components/ui/loading-spinner"
import { getGalleryEvents } from "@/lib/gallery-data"

export const metadata = {
  title: "Gallery | Directors Guild",
  description: "Browse our collection of behind-the-scenes photos, event highlights, and member projects.",
}

export default function GalleryPage() {
  // Get gallery events with their images
  const events = getGalleryEvents()

  return (
    <div className="min-h-screen">
      <PageHeader
        title="Gallery"
        description="Browse our collection of behind-the-scenes photos, event highlights, and member projects."
      />

      <section className="container mx-auto px-4 py-12">
        <Suspense fallback={<LoadingSpinner />}>
          <GalleryFilter />
          <GalleryGrid events={events} />
        </Suspense>
      </section>
    </div>
  )
}
