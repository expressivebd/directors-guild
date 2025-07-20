import { fetchUserProfile, fetchUserSchedule, fetchUserProjects, fetchNotifications } from "@/lib/api"
import DashboardLayout from "@/components/dashboard/layout"
import DashboardContent from "@/components/dashboard/dashboard-content"

export default async function DashboardPage() {
  // Fetch data on the server
  const userProfile = await fetchUserProfile()
  const userSchedule = await fetchUserSchedule()
  const userProjects = await fetchUserProjects()
  const userNotifications = await fetchNotifications()

  // Extract dates from schedule for calendar highlighting
  const scheduleDates = userSchedule.map((item) => new Date(item.date))

  return (
    <DashboardLayout>
      <DashboardContent
        profile={userProfile}
        schedule={userSchedule}
        projects={userProjects}
        notifications={userNotifications}
        scheduleDates={scheduleDates}
      />
    </DashboardLayout>
  )
}
