import { createClient, Entry } from 'contentful';
import type { NewsArticle } from './types';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

export async function fetchNewsArticles(): Promise<NewsArticle[]> {
  const entries = await client.getEntries({ content_type: 'news' });

  return entries.items.map((item: any) => {
    const imageUrl =
      item.fields.featuredCoverPhoto?.fields?.file?.url
        ? `https:${item.fields.featuredCoverPhoto.fields.file.url}`
        : "/placeholder.svg";

    return {
      id: item.sys.id,
      title: item.fields.title,
      date: item.fields.date,
      category: item.fields.category,
      shortDescription: item.fields.shortDescription,
      newsUrl: item.fields.newsUrl,
      image: imageUrl, // now always valid
    };
  });
}

export async function fetchEntries(contentType: string) {
  const entries = await client.getEntries({ content_type: contentType });
  return entries.items;
}
