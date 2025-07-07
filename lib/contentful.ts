import { Asset, createClient, Entry } from 'contentful';
import type { DirectoryEntry, NewsArticle, Partner, FeaturedWork, Event } from './types';
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';
import { Document } from "@contentful/rich-text-types"

// Create the client directly
const client = createClient({
  space: 'tvhxelcg8ky4', // Your space ID from .env.local
  accessToken: 'PuJ0iRmh4ma8JjXNNiC7hbaSS2WWnVZTmdgjJh4LWrc', // Your access token from .env.local
});

// Function to create client with proper error handling
function getContentfulClient() {
  const spaceId = process.env.CONTENTFUL_SPACE_ID;
  const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;

  console.log('🔧 Environment check:', {
    spaceId: spaceId ? `${spaceId.substring(0, 8)}...` : 'undefined',
    accessToken: accessToken ? `${accessToken.substring(0, 8)}...` : 'undefined'
  });

  if (!spaceId) {
    console.warn('Using fallback client due to missing environment variables');
    return client; // Use the direct client as fallback
  }

  if (!accessToken) {
    console.warn('Using fallback client due to missing environment variables');
    return client; // Use the direct client as fallback
  }

  return createClient({
    space: spaceId,
    accessToken: accessToken,
  });
}


export async function fetchEntries(contentType: string) {
  try {
    const client = getContentfulClient();
    const entries = await client.getEntries({ content_type: contentType });
    return entries.items;
  } catch (error) {
    console.error('Error fetching entries:', error);
    return [];
  }
}


//fetching news article 
export async function fetchNewsArticles(): Promise<NewsArticle[]> {
  try {
    const client = getContentfulClient();
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
  } catch (error) {
    console.error('Error fetching news articles:', error);
    return [];
  }
}


//fetching Directory entries
export async function fetchDirectoryEntries(): Promise<DirectoryEntry[]> {
  try {
    const client = getContentfulClient();
    const entries = await client.getEntries({ content_type: 'directory' }); 

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
  } catch (error) {
    console.error('Error fetching directory entries:', error);
    return [];
  }
}


//fetching Partner Entries

export async function fetchPartners(): Promise<Partner[]> {
  try {
    const client = getContentfulClient();
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
  } catch (error) {
    console.error('Error fetching partners:', error);
    return [];
  }
}

//fetching hero carousel items  --- failed


//fetching featured work items for home --- failed

// export async function fetchFeaturedWorks(): Promise<FeaturedWork[]> {
//   const entries = await client.getEntries({ content_type: "featuredWork" });

//   const works: FeaturedWork[] = entries.items.map((item: any) => {
//     const fields = item.fields;

//     return {
//       id: item.sys.id,
//       title: fields.title,
//       year: fields.releaseYear,
//       genre: fields.genre || "",
//       tags: fields.tags || [],
//       director: fields.director || "",
//       redirectURL: fields.redirectUrl || "#",
//       image: fields.thumbnail?.fields?.file?.url
//         ? `https:${fields.thumbnail.fields.file.url}`
//         : "/placeholder.svg?height=450&width=300",
//     };
//   });

//   return works;
// }

//fetching events

export const getEvents = async (): Promise<Event[]> => {
  try {
    const client = getContentfulClient();
    const entries = await client.getEntries({
      content_type: "event",
      order: ["-fields.date"],
    })

    const events: Event[] = entries.items.map((item: Entry<any>) => {
      const fields = item.fields as any

      const coverAsset = fields.coverPhoto as Asset | undefined
      const imageUrl =
        coverAsset?.fields?.file?.url
          ? `https:${coverAsset.fields.file.url}`
          : "/placeholder.svg"

      return {
        id: item.sys.id,
        title: fields.eventName,
        description: fields.description, // Rich Text (Document)
        image: imageUrl,
        date: fields.date,
        time: fields.time,
        location: fields.venue,
        type: fields.category,
        tags: fields.tags ?? [],
        attendees: fields.expectedAttendees,
        organizer: fields.organizer,
        venue: fields.venue,
        ticketPrice: fields.ticketPrice?.toString(),
        dresscode: fields.dresscode ?? undefined,
        agenda: fields.agenda, // Rich Text (Document)
        speakers: fields.speakers ?? [],
        requirements: fields.requirements,
        contact: fields.contact,
      }
    })

    return events
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
}

//fetching featured works for home page
export async function fetchFeaturedWorks(): Promise<FeaturedWork[]> {
  try {
    console.log('🔍 Starting to fetch featured works...');
    const client = getContentfulClient();
    console.log('✅ Contentful client created successfully');
    
    const res = await client.getEntries({
      content_type: 'featuredWorks',
    });

    console.log('📊 Featured works response:', {
      total: res.total,
      items: res.items.length,
      firstItem: res.items[0] ? {
        id: res.items[0].sys.id,
        title: res.items[0].fields?.title,
        isFeatured: res.items[0].fields?.isFeatured
      } : 'No items'
    });

    const mappedData = res.items.map((item: any) => ({
      id: item.sys.id,
      title: item.fields.title,
      year: item.fields.releaseYear,
      image: item.fields.thumbnail?.fields?.file?.url
        ? `https:${item.fields.thumbnail.fields.file.url}`
        : '/placeholder.svg?height=600&width=400',
      genre: item.fields.genre || '',
      tags: item.fields.tags || [],
      director: item.fields.director || '',
      redirectURL: item.fields.redirectURL || '#',
    }));

    console.log('🎬 Mapped featured works data:', mappedData.length, 'items');
    return mappedData;
  } catch (error) {
    console.error('❌ Error fetching featured works:', error);
    return [];
  }
}

// Test function to debug Contentful connection
export async function testContentfulConnection() {
  try {
    console.log('🧪 Testing Contentful connection...');
    const client = getContentfulClient();
    
    // Test 1: Get space info
    const space = await client.getSpace();
    console.log('🚀 Space info:', { name: space.name, id: space.sys.id });
    
    // Test 2: Get all content types
    const contentTypes = await client.getContentTypes();
    console.log('📋 Available content types:', contentTypes.items.map(ct => ({ id: ct.sys.id, name: ct.name })));
    
    // Test 3: Get all entries from featuredWorks (without filters)
    const allEntries = await client.getEntries({ content_type: 'featuredWorks' });
    console.log('📦 All featuredWorks entries:', {
      total: allEntries.total,
      items: allEntries.items.length,
      entries: allEntries.items.map(item => ({
        id: item.sys.id,
        title: item.fields?.title,
        isFeatured: item.fields?.isFeatured,
        fields: Object.keys(item.fields || {})
      }))
    });
    
    return true;
  } catch (error) {
    console.error('❌ Contentful connection test failed:', error);
    return false;
  }
}
