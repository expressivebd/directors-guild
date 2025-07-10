import PageHeader from "@/components/layout/page-header"
import IncentivesDisplay from "@/components/incentives/incentives-display"
import IncentivesList from "@/components/incentives/incentives-list"
import { fetchIncentives } from "@/lib/incentive-data"

export default async function IncentivesPage() {
  // Fetch incentives data
  const incentives = await fetchIncentives()

  return (
    <div className="min-h-screen">
      <PageHeader
        title="Member Incentives"
        description="Exclusive benefits and discounts available to Directors Guild members."
      />

      {/* Animated display of incentives */}
      <IncentivesDisplay incentives={incentives} />

      {/* Scrollable list of detailed incentives */}
      <IncentivesList incentives={incentives} />
    </div>
  )
}
