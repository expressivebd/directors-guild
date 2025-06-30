import Link from "next/link"
import { Button } from "@/components/ui/button"
import { fetchMembers } from "@/lib/api"
import PageHeader from "@/components/layout/page-header"
import MembersFilter from "@/components/members/members-filter"

export default async function MembersPage() {
  // Fetch data on the server
  const members = await fetchMembers()

  return (
    <div className="min-h-screen">
      <PageHeader
        title="Our Members"
        description="Meet the talented directors who make up our diverse and creative community."
      />

      {/* Filters Section - Client Component */}
      <MembersFilter members={members} />

      {/* Join Section */}
      <section className="py-16 bg-zinc-900/70 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Community</h2>
            <p className="text-lg text-gray-300 mb-8">
              The Directors Guild welcomes talented directors who are committed to advancing the art of directing and
              contributing to our vibrant community.
            </p>
            <Button asChild size="lg">
              <Link href="/contact">Contact Us to Learn More</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
