import { fetchNewsArticles } from "@/lib/api"
import PageHeader from "@/components/layout/page-header"
import NewsFilter from "@/components/news/news-filter"
import NewsletterSection from "@/components/news/newsletter-section"

export default async function NewsPage() {
  // Fetch data on the server
  const articles = await fetchNewsArticles()

  return (
    <div className="min-h-screen">
      <PageHeader
        title="News & Updates"
        description="Stay informed with the latest news, announcements, and updates from the Directors Guild."
      />

      {/* Filters Section - Client Component */}
      <NewsFilter articles={articles} />

      {/* Newsletter Section */}
      <NewsletterSection />
    </div>
  )
}
