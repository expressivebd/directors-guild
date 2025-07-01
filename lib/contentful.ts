import { createClient, Entry } from 'contentful';
import type { DirectoryEntry, NewsArticle } from './types';
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

//fetching news article 
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


//fetching Directory entries
export async function fetchDirectoryEntries(): Promise<DirectoryEntry[]> {
  const entries = await client.getEntries({ content_type: 'directory' }); // update this if 'directory' is not the real API ID

  
  return entries.items.map((item: any) => {
    const photoUrl = item.fields.profilePhoto?.fields?.file?.url
      ? `https:${item.fields.profilePhoto.fields.file.url}`
      : '/placeholder.svg';

    return {
      id: item.sys.id,
      name: item.fields.name,
      role: item.fields.role,
      yearsOfExperience: item.fields.yearsOfExperience,
      email: item.fields.email,
      phone: item.fields.phone,
      location: item.fields.location,
      website: item.fields.website ?? '',
      description: documentToPlainTextString(item.fields.description),
      specializations: item.fields.specializations || [],
      rates: item.fields.ratesPerDay,
      availability: item.fields.availablity,
      equipment: item.fields.equipmentTools ?? "", // double check field API ID
      recentWorks: item.fields.recentWorks || [],
      certifications: item.fields.certifications,
      image: photoUrl,
    };
  });
}

export async function fetchEntries(contentType: string) {
  const entries = await client.getEntries({ content_type: contentType });
  return entries.items;
}
