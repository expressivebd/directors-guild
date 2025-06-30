export default function HistorySection() {
  return (
    <section className="py-16 bg-zinc-900/70 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">Our History</h2>
          <div className="space-y-8">
            <div className="relative pl-8 border-l-2 border-green-600">
              <div className="absolute w-4 h-4 bg-green-600 rounded-full -left-[9px] top-1"></div>
              <h3 className="text-xl font-bold mb-2">2005 - Foundation</h3>
              <p className="text-gray-300">
                The Directors Guild was established by a group of visionary filmmakers committed to advancing the art of
                directing and protecting creative rights.
              </p>
            </div>
            <div className="relative pl-8 border-l-2 border-green-600">
              <div className="absolute w-4 h-4 bg-green-600 rounded-full -left-[9px] top-1"></div>
              <h3 className="text-xl font-bold mb-2">2010 - Expansion</h3>
              <p className="text-gray-300">
                The Guild expanded its membership to include television and new media directors, reflecting the evolving
                landscape of visual storytelling.
              </p>
            </div>
            <div className="relative pl-8 border-l-2 border-green-600">
              <div className="absolute w-4 h-4 bg-green-600 rounded-full -left-[9px] top-1"></div>
              <h3 className="text-xl font-bold mb-2">2015 - Global Reach</h3>
              <p className="text-gray-300">
                We established international partnerships and expanded our reach to support directors worldwide,
                creating a truly global community.
              </p>
            </div>
            <div className="relative pl-8">
              <div className="absolute w-4 h-4 bg-green-600 rounded-full -left-[9px] top-1"></div>
              <h3 className="text-xl font-bold mb-2">Today</h3>
              <p className="text-gray-300">
                The Directors Guild continues to evolve, embracing new technologies and platforms while remaining
                committed to our core mission of supporting directors and their creative vision.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
