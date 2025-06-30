import AnimatedPageHeader from "@/components/layout/animated-page-header"
import { DirectoryList } from "@/components/directory/directory-list"

export default function DirectoryPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <AnimatedPageHeader title="Essential Contacts" description="Get skilled assistants and crew members ready to bring your production to life." />

      <div className="container mx-auto px-4 py-12">
        <DirectoryList />
      </div>
    </div>
  )
}
