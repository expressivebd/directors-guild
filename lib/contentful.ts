import { createClient, Entry } from 'contentful';
import type { DirectoryEntry, NewsArticle, Partner } from './types';
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

  // console.log(JSON.stringify(entries.items, null, 2));          y //TEMPORARY: Check if any entries come

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
      rates: item.fields.rates,
      availability: item.fields.availablity,
      equipment: item.fields.equipmentTools ?? "", // double check field API ID
      recentWorks: item.fields.recentWorks || [],
      certifications: item.fields.certifications,
      image: photoUrl,
    };
  });
}


//fetching Partner Entries

export async function fetchPartners(): Promise<Partner[]> {
  const entries = await client.getEntries({ content_type: 'partners' })

  //console.log(JSON.stringify(entries.items, null, 2));

  return entries.items.map((item: any) => {
    const fields = item.fields
    return {
      id: item.sys.id,
      brandName: fields.name,
      brandLogo: fields.profilePhoto?.fields?.file?.url
        ? `https:${fields.profilePhoto.fields.file.url}`
        : '',
      isFeatured: fields.isFeatured,
      shortDescription: fields.shortBio ?? '',
      description: fields.description
        ? documentToPlainTextString(fields.description)
        : '',
      website: fields.website ?? '',
      discountPercentage: fields.discount ?? '',
      expiryDate: fields.validUntil
        ? new Date(fields.validUntil).toLocaleDateString('en-GB', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })
        : '',
      redemptionInstructions: '', // Add this if you have it in Contentful
      discountDetails: '', // Add if available
      locations: '', // Add if available
      category: fields.category ?? '',
      branches:
        fields.branches?.map((b: any) => ({
          name: b.fields.name,
          address: b.fields.address,
          phone: b.fields.phone,
        })) ?? [],
      termsAndConditions: fields.termsConditions
        ? documentToPlainTextString(fields.termsConditions)
        : '',
    }
  })
}

export async function fetchEntries(contentType: string) {
  const entries = await client.getEntries({ content_type: contentType });
  return entries.items;
}
