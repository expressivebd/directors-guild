// Type definitions for the application

// Project type
export interface Project {
  id: string
  title: string
  description: string
  image?: string
  year: string
  director?: string
  category: string
  tags: string[]
  status?: "In Development" | "Pre-production" | "In Production" | "Post-production" | "Completed" | "Released"
}

// Event type
export interface Event {
  id: string
  title: string
  description: string
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
  agenda?: string[]
  speakers?: string[]
  requirements?: string
  contact?: string
}

// Member type
export interface Member {
  id: string
  name: string
  specialty: string
  image?: string
  bio: string
  tags?: string[]
  email?: string
  phone?: string
  location?: string
  website?: string
  socialLinks?: Record<string, string>
  coverImage?: string
  awards?: Award[]
  filmography?: FilmographyItem[]
  showreelUrl?: string
  showreelThumbnail?: string
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
  featuredCoverPhoto?: {
    fields: {
      file: {
        url: string;
      };
    };
  };
};





// Carousel Item type
export interface CarouselItem {
  id: string
  title: string
  description: string
  image: string
  link: string
}

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

// Partner type (formerly Incentive)
export interface Partner {
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

export interface GalleryImage {
  id: string
  title: string
  description: string
  url: string
  category: string
  date: string
  tags: string[]
}
