import PageHeader from "@/components/layout/page-header"
import PartnersDisplay from "@/components/partners/partners-display"
import PartnersList from "@/components/partners/partners-list"
import { fetchPartners } from "@/lib/api"

export default async function PartnersPage() {
  // Fetch partners data
  const partners = await fetchPartners()

  return (
    <div className="min-h-screen">
      <PageHeader
        title="Guild Partners"
        description="Exclusive benefits and discounts available to Directors Guild members through our industry partners."
      />

      {/* Animated display of featured partners */}
      <PartnersDisplay partners={partners} />

      {/* Scrollable list of detailed partner information */}
      <PartnersList partners={partners} />
    </div>
  )
}
