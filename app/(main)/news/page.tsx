import { fetchNewsArticles } from "@/lib/contentful";
import PageHeader from "@/components/layout/page-header";
import NewsFilter from "@/components/news/news-filter";
import NewsletterSection from "@/components/news/newsletter-section";

export default async function NewsPage() {
  const articles = await fetchNewsArticles();

  return (
    <div className="min-h-screen">
      <PageHeader
        title="News & Updates"
        description="Stay informed with the latest news, announcements, and updates from the Directors Guild."
      />
      <NewsFilter articles={articles} />
      <NewsletterSection />
    </div>
  );
}
