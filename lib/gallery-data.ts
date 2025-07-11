// Gallery data - separate from main API file
import type { GalleryImage } from "./types"

export interface GalleryEvent {
  id: string
  name: string
  description: string
  date: string
  images: GalleryImage[]
}

export const galleryEvents: GalleryEvent[] = [
  {
    id: "annual-awards-2023",
    name: "Annual Awards Ceremony 2023",
    description: "Our prestigious annual awards ceremony celebrating excellence in directing",
    date: "Dec 15, 2023",
    images: [
      {
        id: "awards-1",
        title: "Opening Ceremony",
        description: "Grand opening of the annual awards ceremony with industry leaders.",
        url: "/placeholder.svg?height=600&width=800",
        category: "Events",
        date: "Dec 15, 2023",
        tags: ["awards", "ceremony", "opening"],
      },
      {
        id: "awards-2",
        title: "Best Director Award",
        description: "The moment when the Best Director award was announced.",
        url: "/placeholder.svg?height=600&width=800",
        category: "Events",
        date: "Dec 15, 2023",
        tags: ["awards", "ceremony", "best director"],
      },
      {
        id: "awards-3",
        title: "Red Carpet Arrivals",
        description: "Directors arriving at the red carpet for the awards ceremony.",
        url: "/placeholder.svg?height=600&width=800",
        category: "Events",
        date: "Dec 15, 2023",
        tags: ["awards", "red carpet", "arrivals"],
      },
      {
        id: "awards-4",
        title: "Lifetime Achievement Award",
        description: "Honoring a legendary director with the lifetime achievement award.",
        url: "/placeholder.svg?height=600&width=800",
        category: "Events",
        date: "Dec 15, 2023",
        tags: ["awards", "lifetime achievement", "honor"],
      },
      {
        id: "awards-5",
        title: "Winners Group Photo",
        description: "All award winners posing together after the ceremony.",
        url: "/placeholder.svg?height=600&width=800",
        category: "Events",
        date: "Dec 15, 2023",
        tags: ["awards", "winners", "group photo"],
      },
      {
        id: "awards-6",
        title: "Acceptance Speech",
        description: "Emotional acceptance speech by the Best Director winner.",
        url: "/placeholder.svg?height=600&width=800",
        category: "Events",
        date: "Dec 15, 2023",
        tags: ["awards", "speech", "emotional"],
      },
      {
        id: "awards-7",
        title: "Industry Networking",
        description: "Directors networking during the awards ceremony reception.",
        url: "/placeholder.svg?height=600&width=800",
        category: "Events",
        date: "Dec 15, 2023",
        tags: ["awards", "networking", "reception"],
      },
      {
        id: "awards-8",
        title: "Closing Ceremony",
        description: "The grand finale of the awards ceremony with fireworks.",
        url: "/placeholder.svg?height=600&width=800",
        category: "Events",
        date: "Dec 15, 2023",
        tags: ["awards", "closing", "fireworks"],
      },
      {
        id: "awards-9",
        title: "Media Interviews",
        description: "Winners giving interviews to media after the ceremony.",
        url: "/placeholder.svg?height=600&width=800",
        category: "Events",
        date: "Dec 15, 2023",
        tags: ["awards", "media", "interviews"],
      },
      {
        id: "awards-10",
        title: "After Party",
        description: "Celebration continues at the exclusive after party.",
        url: "/placeholder.svg?height=600&width=800",
        category: "Events",
        date: "Dec 15, 2023",
        tags: ["awards", "after party", "celebration"],
      },
    ],
  },
  {
    id: "summer-workshop-2023",
    name: "Summer Workshop Series 2023",
    description: "Intensive workshops on advanced cinematography and directing techniques",
    date: "Jul 22, 2023",
    images: [
      {
        id: "workshop-1",
        title: "Cinematography Masterclass",
        description: "Hands-on cinematography techniques being demonstrated by experts.",
        url: "/placeholder.svg?height=600&width=800",
        category: "Workshops",
        date: "Jul 22, 2023",
        tags: ["workshop", "cinematography", "masterclass"],
      },
      {
        id: "workshop-2",
        title: "Camera Equipment Demo",
        description: "Latest camera equipment being demonstrated to participants.",
        url: "/placeholder.svg?height=600&width=800",
        category: "Workshops",
        date: "Jul 22, 2023",
        tags: ["workshop", "equipment", "demo"],
      },
      {
        id: "workshop-3",
        title: "Student Presentations",
        description: "Workshop participants presenting their creative projects.",
        url: "/placeholder.svg?height=600&width=800",
        category: "Workshops",
        date: "Jul 22, 2023",
        tags: ["workshop", "students", "presentations"],
      },
      {
        id: "workshop-4",
        title: "Lighting Techniques",
        description: "Professional lighting setup demonstration for film production.",
        url: "/placeholder.svg?height=600&width=800",
        category: "Workshops",
        date: "Jul 22, 2023",
        tags: ["workshop", "lighting", "techniques"],
      },
      {
        id: "workshop-5",
        title: "Director's Panel",
        description: "Panel discussion with renowned directors sharing their experiences.",
        url: "/placeholder.svg?height=600&width=800",
        category: "Workshops",
        date: "Jul 22, 2023",
        tags: ["workshop", "panel", "directors"],
      },
      {
        id: "workshop-6",
        title: "Editing Workshop",
        description: "Post-production editing techniques and software training.",
        url: "/placeholder.svg?height=600&width=800",
        category: "Workshops",
        date: "Jul 22, 2023",
        tags: ["workshop", "editing", "post-production"],
      },
      {
        id: "workshop-7",
        title: "Sound Design Session",
        description: "Audio engineering and sound design for filmmakers.",
        url: "/placeholder.svg?height=600&width=800",
        category: "Workshops",
        date: "Jul 22, 2023",
        tags: ["workshop", "sound", "audio"],
      },
      {
        id: "workshop-8",
        title: "Script Analysis",
        description: "Breaking down scripts for effective directing approaches.",
        url: "/placeholder.svg?height=600&width=800",
        category: "Workshops",
        date: "Jul 22, 2023",
        tags: ["workshop", "script", "analysis"],
      },
      {
        id: "workshop-9",
        title: "Group Exercise",
        description: "Collaborative directing exercise with workshop participants.",
        url: "/placeholder.svg?height=600&width=800",
        category: "Workshops",
        date: "Jul 22, 2023",
        tags: ["workshop", "exercise", "collaboration"],
      },
      {
        id: "workshop-10",
        title: "Certificate Ceremony",
        description: "Awarding certificates to workshop completion participants.",
        url: "/placeholder.svg?height=600&width=800",
        category: "Workshops",
        date: "Jul 22, 2023",
        tags: ["workshop", "certificate", "completion"],
      },
    ],
  },
  {
    id: "new-directors-showcase-2023",
    name: "New Directors Showcase 2023",
    description: "Celebrating emerging talent and showcasing films by new directors",
    date: "Sep 5, 2023",
    images: [
      {
        id: "showcase-1",
        title: "Opening Night",
        description: "The grand opening of the New Directors Showcase event.",
        url: "/placeholder.svg?height=600&width=800",
        category: "Events",
        date: "Sep 5, 2023",
        tags: ["showcase", "opening", "new directors"],
      },
      {
        id: "showcase-2",
        title: "Film Screening",
        description: "Screening of debut films by emerging directors.",
        url: "/placeholder.svg?height=600&width=800",
        category: "Events",
        date: "Sep 5, 2023",
        tags: ["showcase", "screening", "debut"],
      },
      {
        id: "showcase-3",
        title: "Q&A Session",
        description: "Directors answering questions from the audience after screenings.",
        url: "/placeholder.svg?height=600&width=800",
        category: "Events",
        date: "Sep 5, 2023",
        tags: ["showcase", "q&a", "audience"],
      },
      {
        id: "showcase-4",
        title: "Emerging Talent Panel",
        description: "Panel discussion with emerging directors sharing their journey.",
        url: "/placeholder.svg?height=600&width=800",
        category: "Events",
        date: "Sep 5, 2023",
        tags: ["showcase", "panel", "emerging talent"],
      },
      {
        id: "showcase-5",
        title: "Networking Reception",
        description: "New directors networking with industry professionals.",
        url: "/placeholder.svg?height=600&width=800",
        category: "Events",
        date: "Sep 5, 2023",
        tags: ["showcase", "networking", "reception"],
      },
      {
        id: "showcase-6",
        title: "Mentorship Meetings",
        description: "One-on-one mentorship sessions with established directors.",
        url: "/placeholder.svg?height=600&width=800",
        category: "Events",
        date: "Sep 5, 2023",
        tags: ["showcase", "mentorship", "guidance"],
      },
      {
        id: "showcase-7",
        title: "Award Presentation",
        description: "Presenting awards to outstanding new directors.",
        url: "/placeholder.svg?height=600&width=800",
        category: "Events",
        date: "Sep 5, 2023",
        tags: ["showcase", "awards", "recognition"],
      },
      {
        id: "showcase-8",
        title: "Industry Pitch Session",
        description: "New directors pitching their upcoming projects to producers.",
        url: "/placeholder.svg?height=600&width=800",
        category: "Events",
        date: "Sep 5, 2023",
        tags: ["showcase", "pitch", "producers"],
      },
      {
        id: "showcase-9",
        title: "Photo Opportunities",
        description: "Professional photo session for new directors and their teams.",
        url: "/placeholder.svg?height=600&width=800",
        category: "Events",
        date: "Sep 5, 2023",
        tags: ["showcase", "photos", "professional"],
      },
      {
        id: "showcase-10",
        title: "Closing Celebration",
        description: "Celebration dinner marking the end of the showcase event.",
        url: "/placeholder.svg?height=600&width=800",
        category: "Events",
        date: "Sep 5, 2023",
        tags: ["showcase", "closing", "celebration"],
      },
    ],
  },
  {
    id: "film-production-bts-2023",
    name: "Behind the Scenes: The Last Light",
    description: "Exclusive behind-the-scenes coverage from the production of 'The Last Light'",
    date: "Nov 3, 2023",
    images: [
      {
        id: "bts-1",
        title: "Director at Work",
        description: "Director Sarah Johnson directing a crucial scene during night shoot.",
        url: "/placeholder.svg?height=600&width=800",
        category: "Behind the Scenes",
        date: "Nov 3, 2023",
        tags: ["production", "director", "night shoot"],
      },
      {
        id: "bts-2",
        title: "Camera Setup",
        description: "Cinematographer setting up the camera for a complex tracking shot.",
        url: "/placeholder.svg?height=600&width=800",
        category: "Behind the Scenes",
        date: "Nov 3, 2023",
        tags: ["production", "camera", "setup"],
      },
      {
        id: "bts-3",
        title: "Cast Rehearsal",
        description: "Actors rehearsing their lines before the actual take.",
        url: "/placeholder.svg?height=600&width=800",
        category: "Behind the Scenes",
        date: "Nov 3, 2023",
        tags: ["production", "cast", "rehearsal"],
      },
      {
        id: "bts-4",
        title: "Lighting Setup",
        description: "Crew members adjusting lighting equipment for the perfect shot.",
        url: "/placeholder.svg?height=600&width=800",
        category: "Behind the Scenes",
        date: "Nov 3, 2023",
        tags: ["production", "lighting", "crew"],
      },
      {
        id: "bts-5",
        title: "Script Discussion",
        description: "Director and actors discussing character motivations and scene interpretation.",
        url: "/placeholder.svg?height=600&width=800",
        category: "Behind the Scenes",
        date: "Nov 3, 2023",
        tags: ["production", "script", "discussion"],
      },
      {
        id: "bts-6",
        title: "Makeup and Wardrobe",
        description: "Actors getting final touches in makeup and wardrobe before filming.",
        url: "/placeholder.svg?height=600&width=800",
        category: "Behind the Scenes",
        date: "Nov 3, 2023",
        tags: ["production", "makeup", "wardrobe"],
      },
      {
        id: "bts-7",
        title: "Action Shot",
        description: "Capturing an intense action sequence with multiple camera angles.",
        url: "/placeholder.svg?height=600&width=800",
        category: "Behind the Scenes",
        date: "Nov 3, 2023",
        tags: ["production", "action", "multiple cameras"],
      },
      {
        id: "bts-8",
        title: "Crew Break",
        description: "Cast and crew taking a well-deserved break between takes.",
        url: "/placeholder.svg?height=600&width=800",
        category: "Behind the Scenes",
        date: "Nov 3, 2023",
        tags: ["production", "break", "crew"],
      },
      {
        id: "bts-9",
        title: "Final Take",
        description: "The emotional final take of a pivotal scene in the film.",
        url: "/placeholder.svg?height=600&width=800",
        category: "Behind the Scenes",
        date: "Nov 3, 2023",
        tags: ["production", "final take", "emotional"],
      },
      {
        id: "bts-10",
        title: "Wrap Party",
        description: "Cast and crew celebrating the successful completion of filming.",
        url: "/placeholder.svg?height=600&width=800",
        category: "Behind the Scenes",
        date: "Nov 3, 2023",
        tags: ["production", "wrap party", "celebration"],
      },
    ],
  },
]

// Function to get all images (for backward compatibility)
export function getAllGalleryImages(): GalleryImage[] {
  return galleryEvents.flatMap((event) => event.images)
}

// Function to get events with their images
export function getGalleryEvents(): GalleryEvent[] {
  return galleryEvents
}
