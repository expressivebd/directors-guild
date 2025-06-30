// This file contains API functions for fetching data
// In a real application, these would make actual API calls to your backend

import type {
  Project,
  Event,
  Member,
  TeamMember,
  NewsArticle,
  CarouselItem,
  UserProfile,
  ScheduleItem,
  Notification,
  Partner,
  GalleryImage,
} from "./types";
import { fetchMemberById as getMemberById } from "./members-data";

// Mock data for carousel items
const carouselItems: CarouselItem[] = [
  {
    id: "1",
    title: "Discover the Art of Directing",
    description:
      "Join our community of visionary directors and take your craft to the next level.",
    image: "/placeholder.svg?height=500&width=1200",
    link: "/about",
  },
  {
    id: "2",
    title: "Upcoming Masterclass Series",
    description:
      "Learn from industry veterans in our exclusive masterclass series starting next month.",
    image: "/placeholder.svg?height=500&width=1200",
    link: "/events",
  },
  {
    id: "3",
    title: "New Member Spotlight",
    description:
      "Discover the work of our newest members and their contributions to the directing community.",
    image: "/placeholder.svg?height=500&width=1200",
    link: "/members",
  },
];

// Mock data for featured projects (version-5 data)
const featuredProjects: Project[] = [
  {
    id: "1",
    title: "The Silent Echo",
    description:
      "A psychological thriller exploring the depths of human consciousness.",
    image: "/placeholder.svg?height=400&width=600",
    year: "2023",
    director: "Jane Smith",
    category: "Film",
    tags: ["Thriller", "Drama"],
    status: "Completed",
  },
  {
    id: "2",
    title: "Beyond the Horizon",
    description:
      "An epic sci-fi adventure set in a distant future where humanity faces extinction.",
    image: "/placeholder.svg?height=400&width=600",
    year: "2022",
    director: "Michael Johnson",
    category: "Film",
    tags: ["Sci-Fi", "Adventure"],
    status: "Post-production",
  },
  {
    id: "3",
    title: "Urban Rhythms",
    description:
      "A documentary series exploring underground music scenes in major cities around the world.",
    image: "/placeholder.svg?height=400&width=600",
    year: "2023",
    director: "David Chen",
    category: "Television",
    tags: ["Documentary", "Music"],
    status: "In Production",
  },
  {
    id: "4",
    title: "The Last Sunset",
    description:
      "A western drama about a town's last stand against corporate takeover.",
    image: "/placeholder.svg?height=400&width=600",
    year: "2021",
    director: "Sarah Williams",
    category: "Film",
    tags: ["Western", "Drama"],
    status: "Released",
  },
];

// Mock data for upcoming events (version-5 data)
const upcomingEvents: Event[] = [
  {
    id: "1",
    title: "Annual Directors Symposium",
    description:
      "Join us for our annual symposium featuring panel discussions, workshops, and networking opportunities.",
    image: "/placeholder.svg?height=400&width=600",
    date: "2025-05-15",
    time: "9:00 AM - 5:00 PM",
    location: "Directors Guild Headquarters, Los Angeles",
    type: "Conference",
    tags: ["Networking", "Workshop", "Panel"],
  },
  {
    id: "2",
    title: "Masterclass: Visual Storytelling",
    description:
      "An intensive workshop on visual storytelling techniques led by award-winning director Christopher Nolan.",
    image: "/placeholder.svg?height=400&width=600",
    date: "2025-06-10",
    time: "2:00 PM - 6:00 PM",
    location: "Virtual Event",
    type: "Workshop",
    tags: ["Education", "Filmmaking"],
  },
  {
    id: "3",
    title: "Screening Series: New Voices",
    description:
      "A showcase of films from emerging directors, followed by Q&A sessions with the filmmakers.",
    image: "/placeholder.svg?height=400&width=600",
    date: "2025-07-05",
    time: "7:00 PM - 10:00 PM",
    location: "Cinema Arts Theater, New York",
    type: "Screening",
    tags: ["Indie Film", "Q&A"],
  },
];

// Mock data for team members
const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Robert Anderson",
    position: "President",
    image: "/placeholder.svg?height=400&width=400",
    bio: "Robert has been leading the Directors Guild for over 10 years, bringing his extensive experience as a director of both film and television projects.",
  },
  {
    id: "2",
    name: "Maria Garcia",
    position: "Vice President",
    image: "/placeholder.svg?height=400&width=400",
    bio: "With a background in independent filmmaking, Maria advocates for diverse voices and innovative approaches to directing.",
  },
  {
    id: "3",
    name: "James Wilson",
    position: "Secretary",
    image: "/placeholder.svg?height=400&width=400",
    bio: "James has worked in the industry for over 20 years, specializing in documentary filmmaking and educational initiatives.",
  },
  {
    id: "4",
    name: "Sophia Lee",
    position: "Treasurer",
    image: "/placeholder.svg?height=400&width=400",
    bio: "Sophia brings her financial expertise and passion for the arts to ensure the Guild's continued growth and stability.",
  },
  {
    id: "5",
    name: "Daniel Martinez",
    position: "Membership Director",
    image: "/placeholder.svg?height=400&width=400",
    bio: "Daniel focuses on expanding our membership and creating valuable opportunities for directors at all stages of their careers.",
  },
  {
    id: "6",
    name: "Emily Johnson",
    position: "Events Coordinator",
    image: "/placeholder.svg?height=400&width=400",
    bio: "Emily organizes our workshops, screenings, and networking events, creating spaces for directors to connect and learn.",
  },
];

// Mock data for members (version-5 data)
const members: Member[] = [
  {
    id: "1",
    name: "Alexandra Davis",
    specialty: "Film",
    image: "/placeholder.svg?height=400&width=400",
    bio: "Award-winning director known for her visually stunning dramas and character-driven narratives.",
    tags: ["Drama", "Character-driven", "Visual"],
    showreelUrl:
      "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    showreelThumbnail: "/placeholder.svg?height=720&width=1280",
  },
  {
    id: "2",
    name: "Marcus Johnson",
    specialty: "Television",
    image: "/placeholder.svg?height=400&width=400",
    bio: "Television director with credits on several acclaimed series, specializing in complex ensemble dramas.",
    tags: ["Drama", "Series", "Ensemble"],
    showreelUrl:
      "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    showreelThumbnail: "/placeholder.svg?height=720&width=1280",
  },
  {
    id: "3",
    name: "Sophia Chen",
    specialty: "Documentary",
    image: "/placeholder.svg?height=400&width=400",
    bio: "Documentary filmmaker focusing on social justice issues and underrepresented communities.",
    tags: ["Social Justice", "Documentary", "Impact"],
    showreelUrl:
      "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    showreelThumbnail: "/placeholder.svg?height=720&width=1280",
  },
  {
    id: "4",
    name: "David Rodriguez",
    specialty: "Commercial",
    image: "/placeholder.svg?height=400&width=400",
    bio: "Award-winning commercial director known for innovative visual storytelling and brand narratives.",
    tags: ["Commercial", "Branded", "Visual"],
    showreelUrl:
      "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    showreelThumbnail: "/placeholder.svg?height=720&width=1280",
  },
  {
    id: "5",
    name: "Emma Wilson",
    specialty: "Music Video",
    image: "/placeholder.svg?height=400&width=400",
    bio: "Music video director who has worked with major artists, known for her distinctive visual style.",
    tags: ["Music", "Visual", "Artistic"],
    showreelUrl:
      "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    showreelThumbnail: "/placeholder.svg?height=720&width=1280",
  },
  {
    id: "6",
    name: "James Thompson",
    specialty: "Film",
    image: "/placeholder.svg?height=400&width=400",
    bio: "Independent filmmaker specializing in psychological thrillers and genre-bending narratives.",
    tags: ["Thriller", "Independent", "Genre"],
    showreelUrl:
      "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    showreelThumbnail: "/placeholder.svg?height=720&width=1280",
  },
  {
    id: "7",
    name: "Olivia Martinez",
    specialty: "Television",
    image: "/placeholder.svg?height=400&width=400",
    bio: "Television director with experience across multiple genres, from comedy to drama to sci-fi.",
    tags: ["Comedy", "Drama", "Versatile"],
    showreelUrl:
      "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    showreelThumbnail: "/placeholder.svg?height=720&width=1280",
  },
  {
    id: "8",
    name: "Michael Lee",
    specialty: "Documentary",
    image: "/placeholder.svg?height=400&width=400",
    bio: "Documentary director focusing on environmental issues and conservation efforts worldwide.",
    tags: ["Environmental", "Documentary", "Global"],
    showreelUrl:
      "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    showreelThumbnail: "/placeholder.svg?height=720&width=1280",
  },
];

// Mock data for news articles (version-5 data)
const newsArticles: NewsArticle[] = [
  {
    id: "1",
    title: "Directors Guild Announces New Mentorship Program",
    excerpt:
      "The program will pair emerging directors with established industry professionals for one-on-one guidance and support.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl.",
    image: "/placeholder.svg?height=400&width=600",
    date: "2025-04-10",
    author: "Sarah Johnson",
    category: "Announcements",
  },
  {
    id: "2",
    title: "Annual Directors Symposium Dates Announced",
    excerpt:
      "Mark your calendars for our flagship event, featuring workshops, panels, and networking opportunities.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl.",
    image: "/placeholder.svg?height=400&width=600",
    date: "2024-03-28",
    author: "Michael Chen",
    category: "Events",
  },
  {
    id: "3",
    title: "Guild Members Win Big at International Film Festival",
    excerpt:
      "Three of our members took home top prizes at this year's International Film Festival, showcasing the exceptional talent within our community.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl.",
    image: "/placeholder.svg?height=400&width=600",
    date: "2025-03-15",
    author: "David Wilson",
    category: "Awards",
  },
  {
    id: "4",
    title: "New Partnership with Streaming Platform Announced",
    excerpt:
      "Our new partnership will create opportunities for members to develop and pitch original content directly to the platform.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl.",
    image: "/placeholder.svg?height=400&width=600",
    date: "2025-03-05",
    author: "Emma Rodriguez",
    category: "Partnerships",
  },
  {
    id: "5",
    title:
      "Diversity Initiative Launches to Support Underrepresented Directors",
    excerpt:
      "Our new initiative aims to increase opportunities for directors from underrepresented backgrounds through funding, mentorship, and advocacy.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl.",
    image: "/placeholder.svg?height=400&width=600",
    date: "2025-02-20",
    author: "James Thompson",
    category: "Initiatives",
  },
  {
    id: "6",
    title: "Technology Workshop Series to Begin Next Month",
    excerpt:
      "Learn about the latest advancements in filmmaking technology through our hands-on workshop series.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl.",
    image: "/placeholder.svg?height=400&width=600",
    date: "2023-02-10",
    author: "Sophia Lee",
    category: "Education",
  },
];

// Mock data for events (version-5 data)
const events: Event[] = [
  ...upcomingEvents,
  {
    id: "4",
    title: "Networking Mixer: Summer Edition",
    description:
      "Connect with fellow directors and industry professionals in a relaxed social setting.",
    image: "/placeholder.svg?height=400&width=600",
    date: "2025-07-20",
    time: "6:00 PM - 9:00 PM",
    location: "Rooftop Lounge, Downtown LA",
    type: "Networking",
    tags: ["Social", "Networking"],
    attendees: 75,
  },
  {
    id: "5",
    title: "Panel Discussion: The Future of Directing",
    description:
      "Industry leaders discuss emerging trends and the evolving role of directors in the digital age.",
    image: "/placeholder.svg?height=400&width=600",
    date: "2025-08-05",
    time: "7:00 PM - 9:00 PM",
    location: "Directors Guild Headquarters, Los Angeles",
    type: "Panel",
    tags: ["Discussion", "Industry Trends"],
    attendees: 120,
  },
  {
    id: "6",
    title: "Workshop: Directing Actors for Authentic Performances",
    description:
      "Learn techniques for working with actors to achieve natural and compelling performances.",
    image: "/placeholder.svg?height=400&width=600",
    date: "2025-08-15",
    time: "10:00 AM - 4:00 PM",
    location: "Studio Space, New York",
    type: "Workshop",
    tags: ["Acting", "Technique"],
    attendees: 30,
  },
];

// Mock data for user profile
const userProfile: UserProfile = {
  id: "user-1",
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  phone: "(555) 123-4567",
  location: "Los Angeles, CA",
  image: "/placeholder.svg?height=400&width=400",
  bio: "Award-winning director with over 10 years of experience in film and television. Specializing in character-driven dramas and visually compelling narratives.",
  specialty: "Film",
  memberSince: "2020-03-15",
  website: "https://johndoe.com",
  socialLinks: {
    twitter: "https://twitter.com/johndoe",
    instagram: "https://instagram.com/johndoe",
    linkedin: "https://linkedin.com/in/johndoe",
  },
  skills: ["Directing", "Screenwriting", "Cinematography", "Editing"],
  awards: [
    {
      title: "Best Director",
      organization: "Independent Film Festival",
      year: "2022",
    },
    {
      title: "Outstanding Achievement in Directing",
      organization: "Film Critics Association",
      year: "2021",
    },
  ],
  filmography: [
    {
      title: "The Last Light",
      year: "2022",
      role: "Director",
    },
    {
      title: "Echoes of Tomorrow",
      year: "2020",
      role: "Director/Writer",
    },
    {
      title: "Urban Shadows",
      year: "2018",
      role: "Director",
    },
  ],
};

// Mock data for user schedule
const userSchedule: ScheduleItem[] = [
  {
    id: "1",
    title: "Pre-production Meeting",
    date: "2025-04-20",
    time: "10:00 AM - 12:00 PM",
    location: "Studio Office",
    description:
      "Initial meeting with production team to discuss project timeline and requirements.",
  },
  {
    id: "2",
    title: "Location Scouting",
    date: "2025-04-22",
    time: "9:00 AM - 3:00 PM",
    location: "Downtown Area",
    description:
      "Scouting potential filming locations for the upcoming project.",
  },
  {
    id: "3",
    title: "Casting Session",
    date: "2025-04-25",
    time: "1:00 PM - 5:00 PM",
    location: "Casting Studio",
    description:
      "Reviewing auditions and making casting decisions for supporting roles.",
  },
  {
    id: "4",
    title: "Directors Guild Workshop",
    date: "2025-04-30",
    time: "6:00 PM - 8:00 PM",
    location: "Guild Headquarters",
    description:
      "Attending workshop on advanced visual storytelling techniques.",
  },
];

// Mock data for user projects
const userProjects: Project[] = [
  {
    id: "1",
    title: "The Silent Path",
    description:
      "A psychological thriller about a woman who discovers a hidden truth about her past while hiking a remote mountain trail.",
    image: "/placeholder.svg?height=400&width=600",
    year: "2023",
    category: "Film",
    tags: ["Thriller", "Psychological", "Drama"],
    status: "Completed",
  },
  {
    id: "2",
    title: "City Lights",
    description:
      "A documentary exploring the lives of street performers in major urban centers around the world.",
    image: "/placeholder.svg?height=400&width=600",
    year: "2022",
    category: "Documentary",
    tags: ["Urban", "Arts", "Cultural"],
    status: "Completed",
  },
  {
    id: "3",
    title: "Beyond the Horizon",
    description:
      "A science fiction series about a group of explorers who discover a portal to another dimension.",
    image: "/placeholder.svg?height=400&width=600",
    year: "2024",
    category: "Television",
    tags: ["Sci-Fi", "Adventure", "Series"],
    status: "In Production",
  },
];

// Mock data for notifications
const notifications: Notification[] = [
  {
    id: "1",
    title: "Project Approved",
    message:
      "Your project 'Beyond the Horizon' has been approved for the upcoming showcase.",
    date: "2025-04-15T14:30:00",
    type: "success",
    read: false,
    actionLink: "/dashboard/projects/3",
    actionText: "View Project",
  },
  {
    id: "2",
    title: "New Event Invitation",
    message:
      "You've been invited to speak at the Directors Symposium on May 15.",
    date: "2025-04-14T09:15:00",
    type: "info",
    read: false,
    actionLink: "/events/1",
    actionText: "View Event",
  },
  {
    id: "3",
    title: "Membership Renewal",
    message:
      "Your annual membership will expire in 30 days. Please renew to maintain your benefits.",
    date: "2025-04-10T11:45:00",
    type: "warning",
    read: true,
    actionLink: "/dashboard/membership",
    actionText: "Renew Now",
  },
  {
    id: "4",
    title: "New Message",
    message:
      "You have a new message from Maria Garcia regarding collaboration opportunities.",
    date: "2025-04-08T16:20:00",
    type: "info",
    read: true,
    actionLink: "/dashboard/messages",
    actionText: "Read Message",
  },
];

// Mock data for partners (version-5 data)
const partners: Partner[] = [
  {
    id: "1",
    brandName: "Bengal Camera House",
    brandLogo: "/placeholder.svg?height=140&width=300",
    discountPercentage: 20,
    discountDetails: "all camera equipment and accessories",
    shortDescription: "Exclusive discount on professional camera equipment",
    description:
      "As a Directors Guild member, you can enjoy 20% off all professional camera equipment and accessories from Bengal Camera House, including the latest cinema cameras, lenses, and recording devices.",
    category: "Equipment",
    redemptionInstructions:
      "Present your Directors Guild membership card at any Bengal Camera House branch or use code DG20BCH when shopping online at bengalcamera.com.",
    termsAndConditions:
      "Discount cannot be combined with other offers. Excludes already discounted items and limited editions. Valid for current year members only.",
    expiryDate: "December 31, 2025",
    locations: "All Bengal Camera House branches nationwide",
    website: "https://www.bengalcamera.com",
    branches: [
      {
        name: "Bengal Camera House - Gulshan",
        address: "House 42, Road 11, Gulshan-2, Dhaka 1212",
        phone: "(+880) 2-9883456",
      },
      {
        name: "Bengal Camera House - Dhanmondi",
        address: "House 15, Road 27, Dhanmondi, Dhaka 1209",
        phone: "(+880) 2-9123789",
      },
      {
        name: "Bengal Camera House - Chittagong",
        address: "CDA Avenue, GEC Circle, Chittagong 4000",
        phone: "(+880) 31-651234",
      },
    ],
  },
  {
    id: "2",
    brandName: "Bangla Digital Solutions",
    brandLogo: "/placeholder.svg?height=140&width=300",
    discountPercentage: 40,
    discountDetails: "annual subscriptions",
    shortDescription: "Save on creative software subscriptions for filmmakers",
    description:
      "Get 40% off Bangla Digital Solutions annual subscriptions, including video editing, visual effects, and graphic design software essential for filmmaking and post-production.",
    category: "Software",
    redemptionInstructions:
      "Log in to your Directors Guild member portal and follow the link to Bangla Digital Solutions' special offer page. Use your membership ID to verify eligibility.",
    termsAndConditions:
      "Offer valid for new and existing customers. Discount applies to the first year for new subscribers and one renewal for existing subscribers.",
    expiryDate: "June 30, 2025",
    website: "https://www.bangladigital.com",
    branches: [
      {
        name: "Bangla Digital Solutions - Online Only",
        address: "Digital redemption through member portal",
      },
    ],
  },
  {
    id: "3",
    brandName: "Shonar Bangla Hotels",
    brandLogo: "/placeholder.svg?height=140&width=300",
    discountPercentage: 25,
    discountDetails: "standard room rates",
    shortDescription: "Special rates for film production travel",
    description:
      "Directors Guild members receive 25% off standard room rates at all Shonar Bangla Hotel properties nationwide, making location scouting and production travel more affordable.",
    category: "Travel",
    redemptionInstructions:
      "Book through the Directors Guild travel portal or call Shonar Bangla Hotels directly and mention code DGFILM25.",
    termsAndConditions:
      "Subject to availability. Blackout dates may apply during peak seasons. Discount applies to up to three rooms per booking.",
    locations: "All Shonar Bangla Hotel properties nationwide",
    website: "https://www.shonarbanglahotels.com",
    branches: [
      {
        name: "Shonar Bangla Hotel - Banani",
        address: "Plot 81, Road 11, Banani, Dhaka 1213",
        phone: "(+880) 2-9876543",
      },
      {
        name: "Shonar Bangla Hotel - Sylhet",
        address: "Shahjalal Bridge Gate, Sylhet 3100",
        phone: "(+880) 821-761234",
      },
      {
        name: "Shonar Bangla Hotel - Cox's Bazar",
        address: "Kolatoli Road, Cox's Bazar 4700",
        phone: "(+880) 341-512345",
      },
      {
        name: "Shonar Bangla Hotel - Khulna",
        address: "KDA Avenue, Khulna 9100",
        phone: "(+880) 41-723456",
      },
    ],
  },
  {
    id: "4",
    brandName: "Bangla Script Pro",
    brandLogo: "/placeholder.svg?height=140&width=300",
    discountPercentage: 30,
    discountDetails: "all products",
    shortDescription: "Industry-standard screenwriting software at a discount",
    description:
      "Save 30% on Bangla Script Pro, the industry-standard screenwriting software used by professional screenwriters and directors nationwide. Includes new purchases and upgrades.",
    category: "Software",
    redemptionInstructions:
      "Visit the Bangla Script Pro website and enter promo code DGMEMBER30 at checkout. Verification of membership may be required.",
    website: "https://www.banglascriptpro.com",
    branches: [
      {
        name: "Bangla Script Pro - Online Only",
        address: "Digital redemption through website",
      },
    ],
  },
  {
    id: "5",
    brandName: "Padma Car Rental",
    brandLogo: "/placeholder.svg?height=140&width=300",
    discountPercentage: 15,
    discountDetails: "all rentals",
    shortDescription: "Discounted car rentals for production needs",
    description:
      "Enjoy 15% off all car rentals with Padma Car Rental, plus free upgrades when available. Perfect for production location scouting and transportation needs.",
    category: "Travel",
    redemptionInstructions:
      "Use code DG15PCR when making your reservation online or by phone.",
    termsAndConditions:
      "Valid for rentals nationwide. Insurance and taxes not included.",
    locations: "All Padma Car Rental locations nationwide",
    website: "https://www.padmacarrental.com",
    branches: [
      {
        name: "Padma Car Rental - Hazrat Shahjalal Airport",
        address:
          "Terminal 1, Hazrat Shahjalal International Airport, Dhaka 1229",
        phone: "(+880) 2-8901234",
      },
      {
        name: "Padma Car Rental - Uttara",
        address: "House 22, Road 7, Sector 3, Uttara, Dhaka 1230",
        phone: "(+880) 2-8934567",
      },
      {
        name: "Padma Car Rental - Chittagong Airport",
        address: "Shah Amanat International Airport, Chittagong 4205",
        phone: "(+880) 31-891234",
      },
      {
        name: "Padma Car Rental - Sylhet",
        address: "Osmani International Airport, Sylhet 3100",
        phone: "(+880) 821-724567",
      },
    ],
  },
  {
    id: "6",
    brandName: "Dhaka Film Equipment",
    brandLogo: "/placeholder.svg?height=140&width=300",
    discountPercentage: 10,
    discountDetails: "orders over ৳100,000",
    shortDescription: "Savings on professional film and video equipment",
    description:
      "Directors Guild members receive 10% off orders over ৳100,000 at Dhaka Film Equipment, one of the largest suppliers of professional film and video equipment in Bangladesh.",
    category: "Equipment",
    redemptionInstructions:
      "Create a Dhaka Film Equipment account and link it to your Directors Guild membership through our partner portal. Discount will be automatically applied at checkout.",
    termsAndConditions:
      "Some manufacturer restrictions apply. Cannot be combined with other offers or educational pricing.",
    website: "https://www.dhakafilmequipment.com",
    branches: [
      {
        name: "Dhaka Film Equipment - Niketan",
        address: "House 31, Road 11, Niketan, Gulshan, Dhaka 1212",
        phone: "(+880) 2-9123456",
      },
      {
        name: "Dhaka Film Equipment - Online Store",
        address: "Online orders ship nationwide",
        phone: "(+880) 2-9123457",
      },
    ],
  },

  {
    id: "7",
    brandName: "Jomuna Workspace",
    brandLogo: "/placeholder.svg?height=140&width=300",
    discountPercentage: 20,
    discountDetails: "monthly memberships",
    shortDescription: "Discounted workspace for pre-production planning",
    description:
      "Get 20% off Jomuna Workspace monthly memberships and day passes. Perfect for pre-production meetings, writing sessions, or temporary production offices.",
    category: "Workspace",
    redemptionInstructions:
      "Contact the Directors Guild member services to receive your unique promo code, then apply it when signing up on the Jomuna Workspace website.",
    locations: "All Jomuna Workspace locations nationwide",
    website: "https://www.jomunaworkspace.com",
    branches: [
      {
        name: "Jomuna Workspace - Banani",
        address: "Plot 42, Road 11, Block F, Banani, Dhaka 1213",
        phone: "(+880) 2-9876123",
      },
      {
        name: "Jomuna Workspace - Gulshan",
        address: "House 12, Road 104, Gulshan-2, Dhaka 1212",
        phone: "(+880) 2-9871234",
      },
      {
        name: "Jomuna Workspace - Dhanmondi",
        address: "House 15A, Road 2, Dhanmondi, Dhaka 1205",
        phone: "(+880) 2-9612345",
      },
      {
        name: "Jomuna Workspace - Chittagong",
        address: "Agrabad Commercial Area, Chittagong 4100",
        phone: "(+880) 31-712345",
      },
    ],
  },
  {
    id: "8",
    brandName: "Meghna Media Bank",
    brandLogo: "/placeholder.svg?height=140&width=300",
    discountPercentage: 25,
    discountDetails: "all subscription plans",
    shortDescription: "Stock footage and images for your productions",
    description:
      "Save 25% on all Meghna Media Bank subscription plans, giving you access to thousands of royalty-free images, videos, and music tracks for your productions and presentations.",
    category: "Media Assets",
    redemptionInstructions:
      "Visit the Directors Guild member benefits portal and click through to the Meghna Media Bank offer page to automatically apply your discount.",
    website: "https://www.meghnamediabank.com",
    branches: [
      {
        name: "Meghna Media Bank - Online Only",
        address: "Digital redemption through member portal",
      },
    ],
  },
  {
    id: "9",
    brandName: "Titas Tech",
    brandLogo: "/placeholder.svg?height=140&width=300",
    discountPercentage: 10,
    discountDetails: "select products",
    shortDescription: "Special pricing on tech products for creators",
    description:
      "Directors Guild members receive 10% off select Titas Tech products, including laptops, workstations, and professional displays - essential tools for modern filmmakers.",
    category: "Equipment",
    redemptionInstructions:
      "Shop through the Titas Tech Professional portal using your Directors Guild membership number for verification.",
    termsAndConditions:
      "Discount applies to select products only. Maximum of 5 discounted products per calendar year.",
    website: "https://www.titastech.com",
    branches: [
      {
        name: "Titas Tech - IDB Bhaban",
        address: "Shop 34-35, Level 5, IDB Bhaban, Agargaon, Dhaka 1207",
        phone: "(+880) 2-9183456",
      },
      {
        name: "Titas Tech - Bashundhara City",
        address:
          "Level 4, Block D, Bashundhara City Shopping Complex, Panthapath, Dhaka 1205",
        phone: "(+880) 2-9134567",
      },
      {
        name: "Titas Tech - Jamuna Future Park",
        address: "Level 4, Block C, Jamuna Future Park, Kuril, Dhaka 1229",
        phone: "(+880) 2-8934567",
      },
      {
        name: "Titas Tech - Chittagong",
        address: "Sanmar Ocean City, GEC Circle, Chittagong 4000",
        phone: "(+880) 31-651234",
      },
    ],
  },
  {
    id: "10",
    brandName: "Ruposhi Bangla Film Academy",
    brandLogo: "/placeholder.svg?height=140&width=300",
    discountPercentage: 50,
    discountDetails: "annual membership",
    shortDescription: "Learn from the best directors and filmmakers",
    description:
      "Get 50% off an annual Ruposhi Bangla Film Academy membership, giving you access to filmmaking courses taught by legendary Bangladeshi directors and international filmmakers.",
    category: "Education",
    redemptionInstructions:
      "Access the special Directors Guild landing page through your member portal and sign up with your membership email address.",
    website: "https://www.ruposhibanglafilmacademy.com",
    branches: [
      {
        name: "Ruposhi Bangla Film Academy - BFDC",
        address: "Bangladesh Film Development Corporation, Tejgaon, Dhaka 1208",
        phone: "(+880) 2-9112345",
      },
      {
        name: "Ruposhi Bangla Film Academy - Online Courses",
        address: "Digital access through member portal",
      },
    ],
  },
  {
    id: "11",
    brandName: "Biman Bangladesh Airlines",
    brandLogo: "/placeholder.svg?height=140&width=300",
    discountPercentage: 12,
    discountDetails: "domestic and international flights",
    shortDescription: "Discounted airfare for production travel",
    description:
      "Save 12% on Biman Bangladesh Airlines domestic and international flights for you and your production team. Includes extra baggage allowance for production equipment.",
    category: "Travel",
    redemptionInstructions:
      "Book through the Directors Guild travel portal or use code DGFILM12 when booking on Biman Bangladesh Airlines website.",
    termsAndConditions:
      "Blackout dates apply during holiday periods. Must book at least 14 days in advance.",
    website: "https://www.biman-airlines.com",
    branches: [
      {
        name: "Biman Bangladesh Airlines - Hazrat Shahjalal Airport",
        address:
          "Terminal 1, Hazrat Shahjalal International Airport, Dhaka 1229",
        phone: "(+880) 2-8901212",
      },
      {
        name: "Biman Bangladesh Airlines - Motijheel",
        address: "Balaka Bhaban, 1 Motijheel C/A, Dhaka 1000",
        phone: "(+880) 2-9555271",
      },
      {
        name: "Biman Bangladesh Airlines - Chittagong",
        address: "Shah Amanat International Airport, Chittagong 4205",
        phone: "(+880) 31-891212",
      },
      {
        name: "Biman Bangladesh Airlines - Sylhet",
        address: "Osmani International Airport, Sylhet 3100",
        phone: "(+880) 821-714567",
      },
    ],
  },
  {
    id: "12",
    brandName: "Surma Data Storage",
    brandLogo: "/placeholder.svg?height=140&width=300",
    discountPercentage: 15,
    discountDetails: "professional storage solutions",
    shortDescription: "Reliable storage for your valuable footage",
    description:
      "Directors Guild members receive 15% off all Surma Data Storage professional solutions, including rugged drives, RAID systems, and network storage - essential for protecting your valuable footage.",
    category: "Equipment",
    redemptionInstructions:
      "Purchase through authorized retailers using promo code DGSURMA15 or through the Surma Data Storage Professional Store with your membership ID.",
    website: "https://www.surmadatastorage.com",
    branches: [
      {
        name: "Surma Data Storage - Online Store",
        address: "Online orders ship nationwide",
      },
      {
        name: "Surma Data Storage - Multiplan Center",
        address:
          "Shop 342, Level 3, Multiplan Center, New Elephant Road, Dhaka 1205",
        phone: "(+880) 2-9662345",
      },
      {
        name: "Surma Data Storage - Eastern Plaza",
        address: "Shop 53, Level 4, Eastern Plaza, Hatirpool, Dhaka 1205",
        phone: "(+880) 2-9673456",
      },
    ],
  },
];

// New projects from version-13 (for featured carousel)
const sampleProjects: Project[] = [
  {
    id: "1",
    title: "Monsoon Dreams",
    director: "Rashid Ahmed",
    year: 2024,
    genre: "Drama",
    description:
      "A poignant tale of love and loss set against the backdrop of rural Bangladesh during monsoon season.",
    image: "/placeholder.svg?height=600&width=400",
    tags: ["Drama", "Romance", "Rural"],
    featured: true,
    status: "completed",
  },
  {
    id: "2",
    title: "City of Lights",
    director: "Fatima Khan",
    year: 2024,
    genre: "Thriller",
    description:
      "A gripping thriller following a detective through the neon-lit streets of modern Dhaka.",
    image: "/placeholder.svg?height=600&width=400",
    tags: ["Thriller", "Urban", "Mystery"],
    featured: true,
    status: "completed",
  },
  {
    id: "3",
    title: "River's Edge",
    director: "Karim Hassan",
    year: 2023,
    genre: "Documentary",
    description:
      "An environmental documentary exploring the impact of climate change on Bangladesh's rivers.",
    image: "/placeholder.svg?height=600&width=400",
    tags: ["Documentary", "Environment", "Social"],
    featured: true,
    status: "completed",
  },
  {
    id: "4",
    title: "The Last Rickshaw",
    director: "Nasir Uddin",
    year: 2024,
    genre: "Comedy",
    description:
      "A heartwarming comedy about an aging rickshaw puller and his adventures in old Dhaka.",
    image: "/placeholder.svg?height=600&width=400",
    tags: ["Comedy", "Family", "Traditional"],
    featured: true,
    status: "completed",
  },
  {
    id: "5",
    title: "Digital Bangladesh",
    director: "Sadia Rahman",
    year: 2024,
    genre: "Sci-Fi",
    description:
      "A futuristic vision of Bangladesh in 2050, exploring technology and tradition.",
    image: "/placeholder.svg?height=600&width=400",
    tags: ["Sci-Fi", "Future", "Technology"],
    featured: true,
    status: "completed",
  },
  {
    id: "6",
    title: "Tea Garden Tales",
    director: "Mahmud Ali",
    year: 2023,
    genre: "Drama",
    description:
      "Stories from the tea gardens of Sylhet, exploring the lives of workers and their families.",
    image: "/placeholder.svg?height=600&width=400",
    tags: ["Drama", "Social", "Rural"],
    featured: true,
    status: "completed",
  },
  {
    id: "7",
    title: "Cox's Bazar Nights",
    director: "Ruma Begum",
    year: 2024,
    genre: "Romance",
    description:
      "A romantic drama set against the beautiful beaches of Cox's Bazar.",
    image: "/placeholder.svg?height=600&width=400",
    tags: ["Romance", "Beach", "Tourism"],
    featured: true,
    status: "completed",
  },
  {
    id: "8",
    title: "The Fisherman's Son",
    director: "Abdul Karim",
    year: 2023,
    genre: "Drama",
    description:
      "A coming-of-age story about a young man torn between tradition and modernity.",
    image: "/placeholder.svg?height=600&width=400",
    tags: ["Drama", "Coming-of-age", "Family"],
    featured: true,
    status: "completed",
  },
  {
    id: "9",
    title: "Dhaka Traffic",
    director: "Tanvir Hossain",
    year: 2024,
    genre: "Comedy",
    description:
      "A comedy about the chaotic traffic of Dhaka and the people stuck in it.",
    image: "/placeholder.svg?height=600&width=400",
    tags: ["Comedy", "Urban", "Social"],
    featured: true,
    status: "completed",
  },
  {
    id: "10",
    title: "Village School",
    director: "Salma Khatun",
    year: "2023",
    genre: "Drama",
    description:
      "An inspiring story about education and hope in rural Bangladesh.",
    image: "/placeholder.svg?height=600&width=400",
    tags: ["Drama", "Education", "Inspiration"],
    featured: true,
    status: "completed",
  },
  {
    id: "11",
    title: "Sundarbans Mystery",
    director: "Rafiq Ahmed",
    year: 2024,
    genre: "Adventure",
    description:
      "An adventure thriller set in the mysterious mangrove forests of Sundarbans.",
    image: "/placeholder.svg?height=600&width=400",
    tags: ["Adventure", "Mystery", "Nature"],
    featured: true,
    status: "completed",
  },
  {
    id: "12",
    title: "Rickshaw Art",
    director: "Nasreen Akter",
    year: 2023,
    genre: "Documentary",
    description:
      "A documentary celebrating the vibrant art culture of Bangladeshi rickshaws.",
    image: "/placeholder.svg?height=600&width=400",
    tags: ["Documentary", "Art", "Culture"],
    featured: true,
    status: "completed",
  },
  {
    id: "13",
    title: "Chittagong Chronicles",
    director: "Mizanur Rahman",
    year: 2024,
    genre: "Historical",
    description:
      "A historical drama about the port city of Chittagong and its rich heritage.",
    image: "/placeholder.svg?height=600&width=400",
    tags: ["Historical", "Port", "Heritage"],
    featured: true,
    status: "completed",
  },
  {
    id: "14",
    title: "Street Food Stories",
    director: "Rubina Khan",
    year: 2024,
    genre: "Documentary",
    description:
      "Exploring the rich street food culture of Bangladesh through personal stories.",
    image: "/placeholder.svg?height=600&width=400",
    tags: ["Documentary", "Food", "Culture"],
    featured: true,
    status: "completed",
  },
  {
    id: "15",
    title: "Liberation War Heroes",
    director: "Shahid Alam",
    year: 2023,
    genre: "Historical",
    description:
      "A tribute to the heroes of Bangladesh's Liberation War of 1971.",
    image: "/placeholder.svg?height=600&width=400",
    tags: ["Historical", "War", "Heroes"],
    featured: true,
    status: "completed",
  },
];

// API functions
export async function fetchCarouselItems(): Promise<CarouselItem[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(carouselItems);
    }, 500);
  });
}

export async function fetchFeaturedProjects(): Promise<Project[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(sampleProjects.filter((project) => project.featured));
    }, 500);
  });
}

export async function fetchUpcomingEvents(): Promise<Event[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(upcomingEvents);
    }, 500);
  });
}

export async function fetchTeamMembers(): Promise<TeamMember[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(teamMembers);
    }, 500);
  });
}

export async function fetchMembers(): Promise<Member[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(members);
    }, 500);
  });
}

export async function fetchMemberById(id: string): Promise<Member> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Use the function from members-data.ts
      getMemberById(id)
        .then((member) => {
          if (member) {
            resolve(member);
          } else {
            reject(new Error("Member not found"));
          }
        })
        .catch((error) => {
          reject(error);
        });
    }, 500);
  });
}

export async function fetchMemberProjects(
  memberId: string
): Promise<Project[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Generate some projects for the member
      const projects = [
        {
          id: "m1p1",
          title: "The Silent Echo",
          description:
            "A psychological thriller exploring the depths of human consciousness.",
          image: "/placeholder.svg?height=400&width=600",
          year: "2023",
          director: "Member Name",
          category: "Film",
          tags: ["Thriller", "Drama"],
          status: "Completed",
        },
        {
          id: "m1p2",
          title: "Urban Rhythms",
          description:
            "A documentary series exploring underground music scenes in major cities.",
          image: "/placeholder.svg?height=400&width=600",
          year: "2022",
          director: "Member Name",
          category: "Television",
          tags: ["Documentary", "Music"],
          status: "Released",
        },
        {
          id: "m1p3",
          title: "The Last Sunset",
          description:
            "A western drama about a town's last stand against corporate takeover.",
          image: "/placeholder.svg?height=400&width=600",
          year: "2021",
          director: "Member Name",
          category: "Film",
          tags: ["Western", "Drama"],
          status: "Completed",
        },
      ];
      resolve(projects);
    }, 500);
  });
}

export async function fetchMemberSchedule(
  memberId: string
): Promise<ScheduleItem[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Generate some schedule items for the member
      const schedule = [
        {
          id: "ms1",
          title: "Film Festival Appearance",
          date: "2025-05-15",
          time: "3:00 PM - 5:00 PM",
          location: "Grand Theater",
          description:
            "Q&A session following the screening of 'The Silent Echo'.",
          tags: ["Festival", "Q&A", "Public"],
          attendees: 120,
        },
        {
          id: "ms2",
          title: "Directors Guild Workshop",
          date: "2025-05-20",
          time: "10:00 AM - 2:00 PM",
          location: "Guild Headquarters",
          description: "Leading a workshop on visual storytelling techniques.",
          tags: ["Workshop", "Teaching", "Guild"],
          attendees: 30,
        },
        {
          id: "ms3",
          title: "Production Meeting",
          date: "2025-05-25",
          time: "9:00 AM - 11:00 AM",
          location: "Studio Office",
          description: "Pre-production meeting for upcoming project.",
          tags: ["Production", "Meeting", "Private"],
          attendees: 8,
        },
        {
          id: "ms4",
          title: "Podcast Interview",
          date: "2025-05-25",
          time: "2:00 PM - 3:30 PM",
          location: "Remote (Zoom)",
          description:
            "Interview for 'The Director's Chair' podcast about recent work.",
          tags: ["Interview", "Media", "Remote"],
          attendees: 2,
        },
        {
          id: "ms5",
          title: "Location Scouting",
          date: "2025-05-28",
          time: "All Day",
          location: "Downtown District",
          description:
            "Scouting potential filming locations for 'Urban Nights' project.",
          tags: ["Scouting", "Pre-production"],
          attendees: 4,
        },
        {
          id: "ms6",
          title: "Casting Session",
          date: "2025-06-02",
          time: "10:00 AM - 6:00 PM",
          location: "Casting Studio",
          description:
            "Final casting session for lead roles in upcoming feature.",
          tags: ["Casting", "Pre-production"],
          attendees: 15,
        },
        {
          id: "ms7",
          title: "Industry Panel",
          date: "2025-06-10",
          time: "7:00 PM - 9:00 PM",
          location: "Film Center",
          description: "Speaking on 'The Future of Independent Cinema' panel.",
          tags: ["Panel", "Speaking", "Public"],
          attendees: 75,
        },
      ];
      resolve(schedule);
    }, 500);
  });
}

export async function fetchNewsArticles(): Promise<NewsArticle[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(newsArticles);
    }, 500);
  });
}

export async function fetchEvents(): Promise<Event[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(events);
    }, 500);
  });
}

export async function fetchUserProfile(): Promise<UserProfile> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(userProfile);
    }, 500);
  });
}

export async function fetchUserSchedule(): Promise<ScheduleItem[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(userSchedule);
    }, 500);
  });
}

export async function fetchUserProjects(): Promise<Project[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(userProjects);
    }, 500);
  });
}

export async function fetchProjectById(id: string): Promise<Project | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const project = userProjects.find((p) => p.id === id);
      resolve(project || null);
    }, 500);
  });
}

export async function fetchNotifications(): Promise<Notification[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(notifications);
    }, 500);
  });
}

export async function updateUserProfile(
  profileData: Partial<UserProfile>
): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // In a real app, this would update the user profile in the database
      resolve();
    }, 500);
  });
}

export async function addUserProject(
  projectData: Omit<Project, "id">
): Promise<Project> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // In a real app, this would add the project to the database
      const newProject: Project = {
        id: `project-${Date.now()}`,
        ...projectData,
      };
      resolve(newProject);
    }, 500);
  });
}

export async function updateUserProject(
  id: string,
  projectData: Omit<Project, "id">
): Promise<Project> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // In a real app, this would update the project in the database
      const updatedProject: Project = {
        id,
        ...projectData,
      };
      resolve(updatedProject);
    }, 500);
  });
}

export async function deleteUserProject(id: string): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // In a real app, this would delete the project from the database
      resolve();
    }, 500);
  });
}

export async function addUserSchedule(
  scheduleData: Omit<ScheduleItem, "id">
): Promise<ScheduleItem> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // In a real app, this would add the schedule item to the database
      const newScheduleItem: ScheduleItem = {
        id: `schedule-${Date.now()}`,
        ...scheduleData,
      };
      resolve(newScheduleItem);
    }, 500);
  });
}

export async function updateScheduleItem(
  id: string,
  scheduleData: Omit<ScheduleItem, "id">
): Promise<ScheduleItem> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // In a real app, this would update the schedule item in the database
      const updatedScheduleItem: ScheduleItem = {
        id,
        ...scheduleData,
      };
      resolve(updatedScheduleItem);
    }, 500);
  });
}

export async function deleteScheduleItem(id: string): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // In a real app, this would delete the schedule item from the database
      resolve();
    }, 500);
  });
}

export async function fetchPartners(): Promise<Partner[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(partners);
    }, 500);
  });
}

export async function fetchGalleryImages(): Promise<GalleryImage[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "1",
          title: "Annual Awards Ceremony 2023",
          description:
            "Highlights from our prestigious annual awards ceremony celebrating excellence in directing.",
          url: "/placeholder.svg?height=600&width=800",
          category: "Events",
          date: "Dec 15, 2023",
          tags: ["awards", "ceremony", "2023"],
        },
        {
          id: "2",
          title: "Behind the Scenes: 'The Last Light'",
          description:
            "Exclusive behind-the-scenes photos from the production of 'The Last Light', directed by member Sarah Johnson.",
          url: "/placeholder.svg?height=600&width=800",
          category: "Behind the Scenes",
          date: "Nov 3, 2023",
          tags: ["production", "film", "night shoot"],
        },
        {
          id: "3",
          title: "Summer Workshop Series",
          description:
            "Our popular summer workshop series on advanced cinematography techniques.",
          url: "/placeholder.svg?height=600&width=800",
          category: "Workshops",
          date: "Jul 22, 2023",
          tags: ["workshop", "education", "cinematography"],
        },
        {
          id: "4",
          title: "New Directors Showcase",
          description:
            "Celebrating emerging talent at our annual New Directors Showcase event.",
          url: "/placeholder.svg?height=600&width=800",
          category: "Events",
          date: "Sep 5, 2023",
          tags: ["new talent", "showcase", "emerging directors"],
        },
        {
          id: "5",
          title: "Location Scouting: Mountain Series",
          description:
            "Our team scouting breathtaking mountain locations for upcoming productions.",
          url: "/placeholder.svg?height=600&width=800",
          category: "Behind the Scenes",
          date: "Aug 12, 2023",
          tags: ["location scouting", "mountains", "pre-production"],
        },
        {
          id: "6",
          title: "Industry Networking Night",
          description:
            "Members connecting with industry professionals at our quarterly networking event.",
          url: "/placeholder.svg?height=600&width=800",
          category: "Events",
          date: "Oct 18, 2023",
          tags: ["networking", "industry", "connections"],
        },
        {
          id: "7",
          title: "Documentary Filmmaking Panel",
          description:
            "Expert panel discussion on the art and challenges of documentary filmmaking.",
          url: "/placeholder.svg?height=600&width=800",
          category: "Workshops",
          date: "Jun 30, 2023",
          tags: ["documentary", "panel", "discussion"],
        },
        {
          id: "8",
          title: "International Film Festival Delegation",
          description:
            "Our members representing the guild at the International Film Festival.",
          url: "/placeholder.svg?height=600&width=800",
          category: "Events",
          date: "May 15, 2023",
          tags: ["festival", "international", "delegation"],
        },
        {
          id: "9",
          title: "Studio Tour: Pinewood",
          description:
            "Exclusive tour of Pinewood Studios facilities for our members.",
          url: "/placeholder.svg?height=600&width=800",
          category: "Events",
          date: "Apr 22, 2023",
          tags: ["studio tour", "facilities", "pinewood"],
        },
        {
          id: "10",
          title: "VFX Masterclass",
          description:
            "Advanced visual effects techniques demonstrated by industry experts.",
          url: "/placeholder.svg?height=600&width=800",
          category: "Workshops",
          date: "Mar 11, 2023",
          tags: ["vfx", "masterclass", "visual effects"],
        },
        {
          id: "11",
          title: "Women in Directing Symposium",
          description:
            "Annual symposium celebrating and supporting women directors in the industry.",
          url: "/placeholder.svg?height=600&width=800",
          category: "Events",
          date: "Feb 8, 2023",
          tags: ["women directors", "symposium", "diversity"],
        },
        {
          id: "12",
          title: "Equipment Showcase 2023",
          description:
            "Latest camera and production equipment showcase for our members.",
          url: "/placeholder.svg?height=600&width=800",
          category: "Events",
          date: "Jan 25, 2023",
          tags: ["equipment", "technology", "cameras"],
        },
      ]);
    }, 500);
  });
}
