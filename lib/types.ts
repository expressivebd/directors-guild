// Type definitions for the application

// Event type

import { Document } from "@contentful/rich-text-types"

export interface Project {
  id: string
  title: string
  description: string
  image: string
  year: string
  category: string
  tags: string[]
}


export interface Event {
  id: string
  title: string
  description?: string
  image?: string
  date: string
  time: string
  location: string
  type: string
  tags: string[]
  attendees?: number
  actionLink?: string
  organizer?: string
  venue?: string
  venueAddress?: string
  ticketPrice?: string
  dresscode?: string
  agenda?: string
  speakers?: string[]
  requirements?: string
  contact?: string
}


// Member type
export interface Member {
  id: string
  name: string
  role: string
  image: string
  bio?: string
  email: string
  specialty?: string
  phone: string
  location: string
  website?: string
  joinDate: string
  category: "founding" | "executive" | "lifetime" | "full" | "associate" | "student" | "deceased"
  isExecutive?: boolean
  tags?: string[]
  awards?: Award[]
  projects?: Project[]
  socialLinks?: {
    twitter?: string
    instagram?: string
    linkedin?: string
    website?: string
  }
}

export interface PaymentHistoryItem {
  month: string
  feesAmount: number
  paymentStatus: "paid" | "unpaid"
}

// Team Member type
export interface TeamMember {
  id: string
  name: string
  position: string
  image?: string
  bio: string
}

// News Article type
export type NewsArticle = {
  id: string;
  title: string;
  date: string;
  category: string;
  shortDescription: string;
  newsUrl?: string;
  image: string; // this will be derived from `featuredCoverPhoto`
};

export type FeaturedNews = {
  id: string;
  title: string;
  date: string;
  category: string;
  shortDescription: string;
  newsUrl?: string;
  image: string; // this will be derived from `featuredCoverPhoto`
  isFeatured?: boolean;
};





//Carousel Item type
export interface CarouselItem {
  id: string
  title: string
  description: string
  image: string
  link: string
  isFeatured?: boolean
}

// User Profile type
// User Profile type
export interface UserProfile {
  id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  location?: string
  image?: string
  bio?: string
  specialty?: string
  memberSince: string
  website?: string
  socialLinks?: Record<string, string>
  skills?: string[]
  awards?: Award[]
  filmography?: FilmographyItem[]
}

// Award type
export interface Award {
  id: string,
  title: string
  organization: string
  year: string
}

// Filmography Item type
export interface FilmographyItem {
  title: string
  year: string
  role: string
}

// Schedule Item type
export interface ScheduleItem {
  id: string
  title: string
  date: string
  time: string
  location: string
  description: string
  tags?: string[]
  attendees?: number
}

// Notification type
export interface Notification {
  id: string
  title: string
  message: string
  date: string
  type: "info" | "success" | "warning" | "error"
  read: boolean
  actionLink?: string
  actionText?: string
}

// Branch type
export interface Branch {
  name: string
  address?: string
  phone?: string
  email?: string
}


export interface Incentive {
  id: string
  brandName: string
  brandLogo?: string
  discountPercentage: number
  discountDetails: string
  shortDescription: string
  description: string
  category: string
  redemptionInstructions: string
  termsAndConditions?: string
  expiryDate?: string
  locations?: string
  website?: string
  branches?: Branch[]
}

// Gallery Media type (supports both images and videos)
export interface GalleryMedia {
  id: string;
  title: string;
  description: string;
  type: "image" | "video";
  category: string;
  date: string;
  thumbnailUrl?: string; // Optional for images, required for videos
}

export interface GalleryEvent {
  id: string;
  name: string;
  description: string;
  date: string;
  media: GalleryMedia[];
}

//// new entries

export type DirectoryEntry = {
  id: string;
  name: string;
  role: string;
  yearsOfExperience: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  description: string;
  specializations: string[];
  rates: string;
  availability: boolean;
  equipment: string;
  recentWorks: string[];
  certifications: string;
  image: string;
};

export interface Partner {
  id: string
  brandName: string
  brandLogo: string
  isFeatured: boolean
  shortDescription: string
  description: string
  website?: string
  discountPercentage?: string
  expiryDate?: string
  locations?: string
  redemptionInstructions?: string
  discountDetails?: string
  branches?: {
    name: string
    address?: string
    phone?: string
  }[]
  category?: string
  termsAndConditions?: string
}


export interface FeaturedWork {
  id: string;
  title: string;
  year: number;
  image?: string;
  genre: string; // Changed from string[] to string to match Contentful schema
  tags?: string[];
  director?: string;
  redirectURL: string;
}

export interface Legends {
  id: string
  name: string
  genre: string
  lifespan: string
  image: string
  bio: string
  famousWorks: string[]
}


export interface AdItem {
  id: string;
  imageUrl: string;
  link: string;
  isFeatred?: boolean;
}

export interface AdCreative {
  id: string
  title: string
  body: string
  cta: string
  href: string
  img: string
}


export interface PaymentHistoryItem {
  month: string
  amount: number
  status: "paid" | "unpaid"
}
