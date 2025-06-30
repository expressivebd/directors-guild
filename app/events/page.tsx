import { eventsData } from "@/lib/events-data"
import PageHeader from "@/components/layout/page-header"
import EventsFilter from "@/components/events/events-filter"
import HostEventSection from "@/components/events/host-event-section"

export default async function EventsPage() {
  // Use events data from the separate file
  const events = eventsData

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
