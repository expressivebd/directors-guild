import { Asset, createClient, Entry } from 'contentful';
import type { DirectoryEntry, NewsArticle, Partner, FeaturedWork, Event, CarouselItem, FeaturedNews, Legends} from './types';
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


//fetching featured news for home news-section
export async function fetchFeaturedNews(): Promise<FeaturedNews[]> {
  try {
    const client = getContentfulClient();
    const entries = await client.getEntries({ 
      content_type: 'homeFeaturedNews',
      'fields.isFeatured': true, 
    });

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
        description: documentToPlainTextString(fields.description), // Rich Text (Document)
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
        agenda: documentToPlainTextString(fields.agenda), // Rich Text (Document)
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

//fetching carousel items for home page hero section
export async function fetchCarouselItems(): Promise<CarouselItem[]> {
  try {
    console.log('🎠 Starting to fetch carousel items...');
    const client = getContentfulClient();
    console.log('✅ Contentful client created for carousel items');
    
    const res = await client.getEntries({
      content_type: 'carouselItems', // Content type ID from your Contentful
      'fields.isFeatured': true, // Only fetch items where isFeatured is true
    });

    console.log('🎠 Carousel items response:', {
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
      description: item.fields.description || '',
      image: item.fields.image?.fields?.file?.url
        ? `https:${item.fields.image.fields.file.url}`
        : '/placeholder.svg?height=500&width=1200',
      link: item.fields.link || '#',
      isFeatured: item.fields.isFeatured || false,
    }));

    console.log('🎠 Mapped carousel items data:', mappedData.length, 'items');
    return mappedData;
  } catch (error) {
    console.error('❌ Error fetching carousel items:', error);
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

// Test function to debug carousel items
// export async function testCarouselConnection() {
//   try {
//     console.log('🧪 Testing carousel items connection...');
//     const client = getContentfulClient();
    
//     // Test: Get all entries from carouselItems (without filters)
//     const allEntries = await client.getEntries({ content_type: 'carouselItems' });
//     console.log('📦 All carousel entries:', {
//       total: allEntries.total,
//       items: allEntries.items.length,
//       entries: allEntries.items.map(item => ({
//         id: item.sys.id,
//         title: item.fields?.title,
//         isFeatured: item.fields?.isFeatured,
//         fields: Object.keys(item.fields || {})
//       }))
//     });
    
//     return true;
//   } catch (error) {
//     console.error('❌ Carousel connection test failed:', error);
//     return false;
//   }
// }

// Fetching Legends for Tribute Section

export async function fetchLegends(): Promise<Legends[]> {
  try {
    const client = getContentfulClient();
    const entries = await client.getEntries({
      content_type: 'legends',
    });

    console.log(JSON.stringify(entries.items, null, 2));
    return entries.items.map((item: any) => ({
      id: item.sys.id,
      name: item.fields.name,
      genre: item.fields.workGenre,
      lifespan: item.fields.lifespan,
      image: item.fields.profilePhoto?.fields?.file?.url
        ? `https:${item.fields.profilePhoto.fields.file.url}`
        : '/placeholder.svg?height=600&width=400',
      bio: item.fields.biography,
      famousWorks: item.fields.famousWorks || [],
    }));
  } catch (error) {
    console.error('Error fetching legends:', error);
    return [];
  }
}
