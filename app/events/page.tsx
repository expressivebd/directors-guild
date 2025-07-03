// 1. Remove static data import
// import { eventsData } from "@/lib/events-data"

// 2. Import the fetching function from Contentful
import { getEvents } from "@/lib/contentful"

import PageHeader from "@/components/layout/page-header"
import EventsFilter from "@/components/events/events-filter"
import HostEventSection from "@/components/events/host-event-section"

export default async function EventsPage() {
  // 3. Fetch live data from Contentful
  const events = await getEvents()

  // Extract dates from events for calendar highlighting
  const eventDates = events.map((event) => new Date(event.date))

  return (
    <div className="min-h-screen">
      <PageHeader
        title="Events"
        description="Discover upcoming screenings, workshops, networking events, and more from the Directors Guild."
      />

      {/* Events Filter and Grid - Client Component */}
      <EventsFilter events={events} eventDates={eventDates} />

      {/* Host an Event Section */}
      <HostEventSection />
    </div>
  )
}