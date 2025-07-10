import type { Incentive } from "./types"

// Mock incentive data
const incentivesData: Incentive[] = [
  {
    id: "1",
    brandName: "FilmGear Pro",
    brandLogo: "/placeholder.svg?height=80&width=200&text=FilmGear+Pro",
    discountPercentage: 25,
    discountDetails: "all camera equipment and accessories",
    shortDescription: "Professional camera equipment and accessories for filmmakers",
    description:
      "FilmGear Pro offers a comprehensive range of professional camera equipment, lenses, lighting, and accessories. From DSLR cameras to professional cinema cameras, we have everything you need for your next production.",
    category: "Equipment",
    redemptionInstructions: "Show your Directors Guild membership card at checkout or use code DG25 online",
    termsAndConditions:
      "Valid for guild members only. Cannot be combined with other offers. Minimum purchase of $100 required.",
    expiryDate: "December 31, 2025",
    locations: "All FilmGear Pro stores nationwide and online",
    website: "https://filmgearpro.com",
  },
  {
    id: "2",
    brandName: "Creative Insurance Solutions",
    brandLogo: "/placeholder.svg?height=80&width=200&text=Creative+Insurance",
    discountPercentage: 15,
    discountDetails: "production insurance policies",
    shortDescription: "Comprehensive insurance coverage for film and TV productions",
    description:
      "Protect your productions with our comprehensive insurance packages. We offer equipment insurance, general liability, errors & omissions, and cast insurance tailored specifically for the entertainment industry.",
    category: "Insurance",
    redemptionInstructions: "Contact our guild liaison at 1-800-FILM-INS and mention your membership",
    termsAndConditions: "Discount applies to new policies only. Subject to underwriting approval.",
    expiryDate: "June 30, 2025",
    locations: "Available nationwide",
    website: "https://creativeinsurance.com",
  },
  {
    id: "3",
    brandName: "PostPro Studios",
    brandLogo: "/placeholder.svg?height=80&width=200&text=PostPro+Studios",
    discountPercentage: 30,
    discountDetails: "editing and color grading services",
    shortDescription: "Professional post-production services for independent filmmakers",
    description:
      "State-of-the-art post-production facility offering editing, color grading, sound mixing, and visual effects services. Our experienced team has worked on award-winning films and documentaries.",
    category: "Post-Production",
    redemptionInstructions: "Book a consultation and mention your Directors Guild membership for the discount",
    termsAndConditions: "Valid for new clients only. Minimum 10 hours of services required.",
    expiryDate: "March 31, 2026",
    locations: "Los Angeles, New York, Atlanta",
    website: "https://postprostudios.com",
  },
  {
    id: "4",
    brandName: "Festival Circuit",
    brandLogo: "/placeholder.svg?height=80&width=200&text=Festival+Circuit",
    discountPercentage: 20,
    discountDetails: "film festival submission fees",
    shortDescription: "Streamlined film festival submissions and strategy consulting",
    description:
      "Navigate the film festival circuit with confidence. We provide submission services, strategy consulting, and insider knowledge to help your film reach the right audiences and industry professionals.",
    category: "Distribution",
    redemptionInstructions: "Use promo code GUILD20 when creating your submission package",
    termsAndConditions: "Valid for first-time users only. Discount applies to submission packages of $200 or more.",
    expiryDate: "December 31, 2025",
    locations: "Online platform available worldwide",
    website: "https://festivalcircuit.com",
  },
  {
    id: "5",
    brandName: "Casting Central",
    brandLogo: "/placeholder.svg?height=80&width=200&text=Casting+Central",
    discountPercentage: 35,
    discountDetails: "casting services and talent database access",
    shortDescription: "Professional casting services and talent database",
    description:
      "Access our extensive database of professional actors and get expert casting services for your productions. From background extras to lead roles, we help you find the perfect talent for your project.",
    category: "Casting",
    redemptionInstructions: "Register online with your guild membership number to receive the discount",
    termsAndConditions: "Discount applies to annual subscriptions only. Valid for guild members in good standing.",
    expiryDate: "September 30, 2025",
    locations: "Online platform with offices in major film markets",
    website: "https://castingcentral.com",
  },
  {
    id: "6",
    brandName: "Location Scout Pro",
    brandLogo: "/placeholder.svg?height=80&width=200&text=Location+Scout",
    discountPercentage: 18,
    discountDetails: "location scouting and permits",
    shortDescription: "Professional location scouting and permitting services",
    description:
      "Find the perfect locations for your film with our professional scouting services. We handle permits, negotiations, and logistics to ensure your shoot goes smoothly.",
    category: "Locations",
    redemptionInstructions: "Contact our team and provide your guild membership details when requesting a quote",
    termsAndConditions:
      "Discount applies to full-service packages only. Minimum project budget requirements may apply.",
    expiryDate: "August 15, 2025",
    locations: "Available in major metropolitan areas",
    website: "https://locationscoutpro.com",
  },
  {
    id: "7",
    brandName: "Sound Stage Rentals",
    brandLogo: "/placeholder.svg?height=80&width=200&text=Sound+Stage",
    discountPercentage: 22,
    discountDetails: "studio and sound stage rentals",
    shortDescription: "Professional sound stages and studio facilities",
    description:
      "Rent professional sound stages, studios, and production facilities equipped with the latest technology. Our facilities have hosted major film and television productions.",
    category: "Facilities",
    redemptionInstructions: "Book directly through our guild portal or mention membership when calling",
    termsAndConditions:
      "Subject to availability. Minimum 3-day rental required for discount. Peak season restrictions may apply.",
    expiryDate: "November 30, 2025",
    locations: "Los Angeles, Vancouver, Toronto",
    website: "https://soundstagerentals.com",
  },
  {
    id: "8",
    brandName: "Film Finance Partners",
    brandLogo: "/placeholder.svg?height=80&width=200&text=Film+Finance",
    discountPercentage: 12,
    discountDetails: "financing consultation and services",
    shortDescription: "Film financing and investment consultation services",
    description:
      "Navigate the complex world of film financing with our expert consultants. We help secure funding, structure deals, and connect filmmakers with investors and distributors.",
    category: "Finance",
    redemptionInstructions: "Schedule a consultation and mention your guild membership for reduced rates",
    termsAndConditions: "Discount applies to consultation fees only. Success fees are separate and negotiable.",
    expiryDate: "January 31, 2026",
    locations: "Los Angeles, New York, London",
    website: "https://filmfinancepartners.com",
  },
]

export async function fetchIncentives(): Promise<Incentive[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return incentivesData
}
