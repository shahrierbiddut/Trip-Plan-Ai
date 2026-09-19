
export const bandarbanData = {
  slug: "bandarban",
  name: "Bandarban",
  country: "Bangladesh",
  subtitle: "The Roof of Bangladesh.",
  description: "Discover Bandarban through high peaks and indigenous tribes. Experience the best of what nature has to offer.",
  heroImage: "/assets/Bandarban/images 1.jfif",
  rating: 4.7,
  reviewCount: "850",
  aiMatch: 92,
  recommendedStay: "2-4 Days",
  estimatedBudget: 6500,
  popularSeason: "Oct - Mar",
  tags: ["Nature","Adventure","Cultural"],

  overview: {
    title: "About Bandarban",
    content: [
      "Bandarban is one of the most stunning destinations in Bangladesh, famous for its high peaks and indigenous tribes.",
      "Whether you're looking for an adventure or a peaceful retreat, Bandarban offers breathtaking landscapes and unforgettable experiences for every traveler."
    ],
    image: "/assets/Bandarban/images 1.jfif",
    videoUrl: "https://www.youtube.com/embed/rn0nkEZdoRg?autoplay=1&controls=1&mute=0"
  },

  whyLoveIt: [
    { id: 1, title: "Stunning Views", description: "Breathtaking landscapes.", icon: "mountain" },
    { id: 2, title: "Local Culture", description: "Experience indigenous traditions.", icon: "users" },
    { id: 3, title: "Peaceful Environment", description: "Escape the city noise.", icon: "leaf" },
    { id: 4, title: "Adventure Trails", description: "Perfect for hiking & exploring.", icon: "map" }
  ],

  aiGuide: {
    match: 92,
    bestFor: ["Nature","Adventure","Cultural"],
    idealTrip: "3 Days",
    travelStyle: "Nature & Adventure",
    recommendation: "Choose Bandarban if you want a trip filled with high peaks and indigenous tribes."
  },

  bestTime: [
    { season: "Oct - Mar", weather: "Pleasant & cool.", recommended: true, icon: "sun" },
    { season: "Apr - Sep", weather: "Rainy & lush green.", recommended: false, icon: "cloudRain" },
    { season: "Oct - Dec", weather: "Cool & comfortable, perfect for travel and sightseeing.", recommended: false, icon: "leaf" }
  ],

  thingsToDo: [
    { id: 1, title: "Sightseeing", description: "Explore the main attractions.", time: "2-4 hrs", image: "/assets/Bandarban/Thinking/Sightseeing.jpg", type: "Nature" },
    { id: 2, title: "Local Food", description: "Taste traditional dishes.", time: "1-2 hrs", image: "/assets/Bandarban/Thinking/Local Food.webp", type: "Culinary" },
    { id: 3, title: "Photography", description: "Capture memories.", time: "Flexible", image: "/assets/Bandarban/Thinking/Photography.jpg", type: "Creative" }
  ],

  placesToExplore: [
    {
      id: 1,
      slug: "nilgiri",
      title: "Nilgiri Resort",
      description: "Touch the clouds from one of the highest peaks.",
      longDescription: "Nilgiri is one of the tallest peaks and most beautiful tourist spots in Bangladesh. Managed by the army, this pristine location lets you literally walk among the clouds, offering a panoramic view of the hilly landscape.",
      image: "/assets/Bandarban/images 1.jfif",
      rating: 4.9,
      tags: ["Scenic", "Must Visit", "Photography"]
    },
    {
      id: 2,
      slug: "chimbuk-hill",
      title: "Chimbuk Hill",
      description: "Known as the Darjeeling of Bengal.",
      longDescription: "Chimbuk is the third highest mountain in Bangladesh. The winding roads leading to it are an adventure in themselves. Once at the top, you are rewarded with breathtaking views of the zigzagging Sangu River and endless green hills.",
      image: "/assets/Bandarban/images 2.jfif",
      rating: 4.7,
      tags: ["Adventure", "Nature", "Photography"]
    },
    {
      id: 3,
      slug: "nafakhum-waterfall",
      title: "Nafakhum Waterfall",
      description: "The Niagara of Bangladesh.",
      longDescription: "Nafakhum is one of the largest and most spectacular waterfalls in the country. Reaching it requires a thrilling boat ride on the Sangu River followed by a trek, making it the ultimate destination for adventure seekers.",
      image: "/assets/Bandarban/images 3.jfif",
      rating: 4.8,
      tags: ["Adventure", "Nature", "Must Visit"]
    }
  ],

  marineDriveFeature: {
    title: "The Journey to Bandarban",
    description: "The road to Bandarban is as beautiful as the destination itself.",
    image: "/assets/Bandarban/images 2.jfif",
    highlights: ["Scenic routes", "Photo stops", "Nature views", "Local life", "Memorable journey"]
  },

  itinerary: [
    { day: "DAY 01", title: "Arrival & Exploration", description: "Check in and explore nearby areas.", image: "/assets/Bandarban/images 1.jfif" },
    { day: "DAY 02", title: "Main Attractions", description: "Visit the top spots.", image: "/assets/Bandarban/images 2.jfif" },
    { day: "DAY 03", title: "Relaxation & Departure", description: "Enjoy a quiet morning before leaving.", image: "/assets/Bandarban/images 3.jfif" }
  ],

  budget: {
    baseTransport: 2500,
    baseStay: 3500,
    baseFood: 2000,
    baseActivities: 1000,
    baseMisc: 500
  },

  hotels: [
    { id: 1, name: "Sairu Hill Resort", category: "Luxury", rating: 4.8, location: "Chimbuk Road", priceFrom: 8500, image: "/assets/Bandarban/Resort/Sairu Hill Resort.jfif", amenities: ["Views", "WiFi", "Infinity Pool"] },
    { id: 2, name: "Boga Lake Eco Camp", category: "Budget", rating: 4.5, location: "Boga Lake", priceFrom: 1500, image: "/assets/Bandarban/Resort/Boga Lake Eco Camp.webp", amenities: ["Nature Walk", "Local Food", "Campfire"] }
  ],

  foods: [
    { id: 1, title: "Pahari Thali", description: "Authentic indigenous meal with fresh local ingredients.", price: "$$", image: "/assets/Bandarban/Taste/Pahari Thali.jfif", type: "Lunch" },
    { id: 2, title: "Bamboo Chicken", description: "Traditional chicken cooked inside bamboo.", price: "$$$", image: "/assets/Bandarban/Taste/Bamboo Chicken.jfif", type: "Dinner" }
  ],

  reviews: {
    overall: 4.7,
    count: 850,
    breakdown: { 5: 60, 4: 30, 3: 5, 2: 3, 1: 2 },
    list: [
      { id: 1, name: "Sarah M.", avatar: "/assets/avatar-1.svg", rating: 5, date: "2 months ago", tripType: "Solo Trip", text: "Absolutely stunning place! The high peaks and indigenous tribes are mesmerizing." },
      { id: 2, name: "Rahul D.", avatar: "/assets/avatar-2.svg", rating: 4, date: "3 months ago", tripType: "Family Trip", text: "Great experience, highly recommended for Nature." }
    ],
    aiSummary: {
      loved: ["Natural beauty", "Local food", "Peaceful environment", "Friendly locals", "Stunning landscapes"],
      concerns: ["Peak-season crowds", "Transportation delays"],
      verdict: "Best suited for travelers looking for an escape into nature, especially couples and families."
    }
  },

  gallery: [
    "/assets/Bandarban/images 1.jfif",
    "/assets/Bandarban/images 2.jfif",
    "/assets/Bandarban/images 3.jfif",
    "/assets/Bandarban/images 4.jfif"
  ],

  travelInfo: {
    gettingThere: { air: "Nearest airport available.", road: "Accessible via direct buses." },
    gettingAround: { options: "Local transport and jeeps available." },
    weather: "Generally tropical, heavy rain in monsoon.",
    safety: "Safe for tourists, standard precautions advised.",
    internet: "Mobile network varies, WiFi in hotels.",
    currency: "Bangladeshi Taka (BDT). Carry cash."
  },

  travelTips: [
    "Book accommodations in advance during peak season.",
    "Carry cash as ATMs might be scarce.",
    "Pack comfortable walking shoes.",
    "Respect local culture and traditions."
  ],

  relatedDestinations: [
    { slug: "bandarban", name: "Bandarban", rating: 4.8, aiMatch: 94, budget: "৳8,500", image: "/assets/Bandarban/images 1.jfif" }
  ]
};
