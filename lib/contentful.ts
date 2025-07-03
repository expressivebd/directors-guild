import { Asset, createClient, Entry } from 'contentful';
import type { DirectoryEntry, NewsArticle, Partner, FeaturedWork, Event } from './types';
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';
import { Document } from "@contentful/rich-text-types"



const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

console.log("SPACE ID:", process.env.CONTENTFUL_SPACE_ID)
console.log("ACCESS TOKEN:", process.env.CONTENTFUL_ACCESS_TOKEN)


export async function fetchEntries(contentType: string) {
  const entries = await client.getEntries({ content_type: contentType });
  return entries.items;
}


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

//fetching hero carousel items  --- failed


//fetching featured work items for home --- failed

export async function fetchFeaturedWorks(): Promise<FeaturedWork[]> {
  const entries = await client.getEntries({ content_type: "featuredWork" });

  const works: FeaturedWork[] = entries.items.map((item: any) => {
    const fields = item.fields;

    return {
      id: item.sys.id,
      title: fields.title,
      year: fields.releaseYear,
      genre: fields.genre || "",
      tags: fields.tags || [],
      director: fields.director || "",
      redirectURL: fields.redirectUrl || "#",
      image: fields.thumbnail?.fields?.file?.url
        ? `https:${fields.thumbnail.fields.file.url}`
        : "/placeholder.svg?height=450&width=300",
    };
  });

  return works;
}

//fetching events

// export async function fetchEvents(): Promise<Event[]> {
//   const entries = await client.getEntries({ content_type: "event" });

//   return entries.items.map((item) => {
//     const fields = item.fields as any;

//     const imageUrl = fields.coverPhoto?.fields?.file?.url
//       ? `https:${fields.coverPhoto.fields.file.url}`
//       : "/placeholder.svg";

//     const description = fields.description
//       ? documentToPlainTextString(fields.description)
//       : "";

//     const agenda = fields.agenda
//       ? documentToPlainTextString(fields.agenda).split("\n").filter(Boolean)
//       : [];

//     return {
//       id: item.sys.id,
//       title: fields.eventName,
//       description,
//       image: imageUrl,
//       date: fields.date,
//       time: fields.time,
//       location: fields.venue,
//       type: fields.category,
//       tags: fields.tags || [],
//       attendees: fields.expectedAttendees || undefined,
//       actionLink: undefined,
//       organizer: fields.organizer,
//       venue: fields.venue,
//       venueAddress: undefined,
//       ticketPrice: fields.ticketPrice?.toString(),
//       dresscode: undefined,
//       agenda,
//       speakers: fields.speakers || [],
//       requirements: fields.requirements || undefined,
//       contact: fields.contact || undefined,
//     };
//   });
// }

// This function fetches events and MANUALLY MAPS the fields to your Event type
// export const getEvents = async (): Promise<Event[]> => {
//   const entries = await client.getEntries({
//     content_type: "event",
//     order: ["-fields.date"],
//   });

//   console.log(JSON.stringify(entries.items, null, 2));

//   // Transform the fetched data to match your custom Event interface
//   const events: Event[] = entries.items.map((item: any) => {
//     const fields = item.fields as any;
//     const coverAsset = fields.coverPhoto as Asset;
//     const imageUrl =
//       coverAsset?.fields?.file?.url
//         ? `https:${coverAsset.fields.file.url}`
//         : "/placeholder.svg";

//     return {
//       id: item.sys.id,
//       title: fields.eventName,
//       description: fields.description
//         ? documentToPlainTextString(fields.description)
//         : "",
//       image: imageUrl,
//       date: fields.date,
//       time: fields.time,
//       location: fields.venue,
//       type: fields.category,
//       tags: fields.tags ?? [],
//       attendees: fields.expectedAttendees,
//       organizer: fields.organizer,
//       venue: fields.venue,
//       ticketPrice: fields.ticketPrice?.toString(),
//       agenda: fields.agenda
//         ? documentToPlainTextString(fields.agenda).split("\n").filter(Boolean)
//         : [],
//       speakers: fields.speakers ?? [],
//       requirements: fields.requirements,
//       contact: fields.contact,
//     };

//   });

//   return events;
// };




export const getEvents = async (): Promise<Event[]> => {
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
}
