import { fetchTeamMembers } from "@/lib/api"
import { foundingMembers } from "@/lib/members-data"
import PageHeader from "@/components/layout/page-header"
import AboutSections from "@/components/about/about-sections"
import TeamSection from "@/components/about/team-section"
import HistorySection from "@/components/about/history-section"
import FoundingMembersSection from "@/components/about/founding-members-section"

export default async function AboutPage() {
  // Fetch data on the server
  const teamMembers = await fetchTeamMembers()

  return (
    <div className="min-h-screen">
      <PageHeader
        title="About Us"
        description="Learn about the Directors Guild, our mission, vision, and the team behind our organization."
      />

      {/* Mission and Vision Sections */}
      <AboutSections />

      {/* Founding Members Section */}
      <FoundingMembersSection foundingMembers={foundingMembers} />

      {/* Team Section */}
      <TeamSection teamMembers={teamMembers} />

      {/* History Section */}
      <HistorySection />
    </div>
  )
}
