import Link from "next/link"
import { Button } from "@/components/ui/button"
import { fetchFeaturedProjects, fetchUpcomingEvents, fetchNewsArticles } from "@/lib/api"
import HomeCarousel from "@/components/home/carousel"
import FeaturedSection from "@/components/home/featured-section"
import EventsSection from "@/components/home/events-section"
import NewsSection from "@/components/home/news-section" // Added import
import PollSection from "@/components/home/poll-section"
import TributeSection from "@/components/home/tribute-section"
import WideAdPanel from "@/components/ads/wide-ad-panel"



export default async function Home() {
  // Fetch data on the server
  const featuredProjects = await fetchFeaturedProjects()
  const upcomingEvents = await fetchUpcomingEvents()
  const newsArticles = await fetchNewsArticles()

  return (
    <div className="relative">
      {/* Full Screen Carousel Section */}
      <section className="h-screen w-full relative overflow-hidden" id="carousel-section">
        <HomeCarousel fullScreen={true} />
      </section>

      {/* Ad Panel 1 */}
      <WideAdPanel />

      {/* Poll Section */}
      <section className="py-12 bg-transparent">
        <div className="container mx-auto px-4">
          <PollSection />
        </div>
      </section>

      {/* Ad Panel 2 */}
      <WideAdPanel />

      {/* Featured Projects Section */}
      <section className="py-20 bg-gradient-to-b from-transparent to-zinc-900/70 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Works</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Discover exceptional projects from our talented directors
            </p>
          </div>

          <div className="relative -mx-4">
            <FeaturedSection />
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg">
              <Link href="/projects">View All Projects</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Ad Panel 3 */}
      <WideAdPanel />

      {/* Events Section */}
      <section className="py-20 bg-zinc-900/70 backdrop-blur-sm relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Upcoming Events</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Join us for exclusive screenings, workshops, and networking opportunities
            </p>
          </div>

          <EventsSection events={upcomingEvents} />

          <div className="text-center mt-12">
            <Button asChild size="lg">
              <Link href="/events">View All Events</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Ad Panel 4 */}
      <WideAdPanel />

      {/* News Section - Added */}
      <section className="py-20 bg-zinc-900/70 backdrop-blur-sm relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Latest News</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Stay updated with the latest announcements, achievements, and industry insights
            </p>
          </div>

          <NewsSection articles={newsArticles.slice(0, 3)} />

          <div className="text-center mt-12">
            <Button asChild size="lg">
              <Link href="/news">View All News</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Ad Panel 5 */}
      <WideAdPanel />

      {/* Tribute Section */}
      <TributeSection />

      {/* Ad Panel 5 */}
      <WideAdPanel />

      {/* Call to Action */}
      <section className="py-20 bg-transparent">
        <div className="container mx-auto px-4">
          <div className="bg-zinc-900/80 backdrop-blur-md rounded-xl p-8 md:p-12 text-center max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Community</h2>
            <p className="text-xl text-gray-300 mb-8">
              Connect with fellow directors, access exclusive resources, and advance your career
            </p>
            <Button asChild size="lg">
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Bottom padding to prevent content from being hidden behind fixed marquee */}
      <div className="h-16"></div>
    </div>
  )
}
