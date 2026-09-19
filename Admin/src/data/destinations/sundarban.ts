
export const sundarbanData = {
  slug: "sundarban",
  name: "Sundarban",
  country: "Bangladesh",
  subtitle: "The Mangrove Kingdom.",
  description: "Discover Sundarban through mangrove forests and wildlife. Experience the best of what nature has to offer.",
  heroImage: "/assets/Sundarban/cover-1.jpg",
  rating: 4.7,
  reviewCount: "850",
  aiMatch: 92,
  recommendedStay: "2-4 Days",
  estimatedBudget: 6500,
  popularSeason: "Oct - Mar",
  tags: ["Nature","Adventure","Cultural"],

  overview: {
    title: "About Sundarban",
    content: [
      "Sundarban is one of the most stunning destinations in Bangladesh, famous for its mangrove forests and wildlife.",
      "Whether you're looking for an adventure or a peaceful retreat, Sundarban offers breathtaking landscapes and unforgettable experiences for every traveler."
    ],
    image: "/assets/Sundarban/cover-1.jpg",
    videoUrl: "https://www.youtube.com/embed/Bs62IZb7KAU?autoplay=1&controls=1&mute=0"
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
    recommendation: "Choose Sundarban if you want a trip filled with mangrove forests and wildlife."
  },

  bestTime: [
    { season: "Oct - Mar", weather: "Pleasant & cool.", recommended: true, icon: "sun" },
    { season: "Apr - Sep", weather: "Rainy & lush green.", recommended: false, icon: "cloudRain" },
    { season: "Oct - Dec", weather: "Cool & comfortable, perfect for travel and sightseeing.", recommended: false, icon: "leaf" }
  ],

  thingsToDo: [
    { id: 1, title: "Sightseeing", description: "Explore the main attractions.", time: "2-4 hrs", image: "/assets/Sundarban/thinking/Sightseeing.webp", type: "Nature" },
    { id: 2, title: "Local Food", description: "Taste traditional dishes.", time: "1-2 hrs", image: "/assets/Sundarban/thinking/Local Food.jfif", type: "Culinary" },
    { id: 3, title: "Photography", description: "Capture memories.", time: "Flexible", image: "/assets/Sundarban/thinking/Photography.jfif", type: "Creative" }
  ],

  placesToExplore: [
    {
      id: 1,
      slug: "karamjal",
      title: "Karamjal Wildlife Center",
      description: "The gateway to the world's largest mangrove forest.",
      longDescription: "Karamjal is one of the most accessible parts of the Sundarbans. It serves as a wildlife breeding center where you can see deer, crocodiles, and monkeys up close, making it an excellent spot for a quick yet immersive forest experience.",
      image: "/assets/Sundarban/thinking/Top Places to Explore.jpg",
      rating: 4.6,
      tags: ["Nature", "Family", "Must Visit"]
    },
    {
      id: 2,
      slug: "kotka-beach",
      title: "Kotka Beach",
      description: "A pristine beach where the forest meets the sea.",
      longDescription: "Kotka is a serene and remote sanctuary inside the deep Sundarbans. It features a beautiful sandy beach where you might spot deer grazing or even catch a glimpse of a Royal Bengal Tiger if you're lucky.",
      image: "/assets/Sundarban/thinking/Top Places to Explore.jpg",
      rating: 4.8,
      tags: ["Relaxation", "Adventure", "Scenic"]
    },
    {
      id: 3,
      slug: "hiron-point",
      title: "Hiron Point",
      description: "A top spot for wildlife spotting.",
      longDescription: "Also known as Nilkamal, Hiron Point is a protected sanctuary perfect for spotting tigers, deer, and diverse bird species. The wooden walkways provide a safe and spectacular view of the dense mangrove ecosystem.",
      image: "/assets/Sundarban/thinking/Top Places to Explore.jpg",
      rating: 4.9,
      tags: ["Adventure", "Photography", "Nature"]
    }
  ],

  marineDriveFeature: {
    title: "The Journey to Sundarban",
    description: "The road to Sundarban is as beautiful as the destination itself.",
    image: "/assets/Sundarban/cover-1.jpg",
    highlights: ["Scenic routes", "Photo stops", "Nature views", "Local life", "Memorable journey"]
  },

  itinerary: [
    { day: "DAY 01", title: "Arrival & Exploration", description: "Check in and explore nearby areas.", image: "/assets/Sundarban/cover-1.jpg" },
    { day: "DAY 02", title: "Main Attractions", description: "Visit the top spots.", image: "/assets/Sundarban/cover-1.jpg" },
    { day: "DAY 03", title: "Relaxation & Departure", description: "Enjoy a quiet morning before leaving.", image: "/assets/Sundarban/cover-1.jpg" }
  ],

  budget: {
    baseTransport: 2500,
    baseStay: 3500,
    baseFood: 2000,
    baseActivities: 1000,
    baseMisc: 500
  },

  hotels: [
    { id: 1, name: "Premium Resort", category: "Luxury", rating: 4.8, location: "Central Area", priceFrom: 5000, image: "/assets/Sundarban/Resort/Premium Resort.jfif", amenities: ["Views", "WiFi", "Pool"] },
    { id: 2, name: "Eco Lodge", category: "Budget", rating: 4.5, location: "Nature Trail", priceFrom: 2500, image: "/assets/Sundarban/Resort/Eco Lodge.jpg", amenities: ["Nature Walk", "Breakfast"] }
  ],

  foods: [
    { id: 1, title: "Traditional Thali", description: "Local authentic meal.", price: "$$", image: "/assets/Sundarban/Taste/Traditional Thali.jpeg", type: "Lunch" },
    { id: 2, title: "BBQ Dinner", description: "Enjoy BBQ under the stars.", price: "$$$", image: "/assets/Sundarban/Taste/BBQ Dinner.jfif", type: "Dinner" }
  ],

  reviews: {
    overall: 4.7,
    count: 850,
    breakdown: { 5: 60, 4: 30, 3: 5, 2: 3, 1: 2 },
    list: [
      { id: 1, name: "Sarah M.", avatar: "/assets/avatar-1.svg", rating: 5, date: "2 months ago", tripType: "Solo Trip", text: "Absolutely stunning place! The mangrove forests and wildlife are mesmerizing." },
      { id: 2, name: "Rahul D.", avatar: "/assets/avatar-2.svg", rating: 4, date: "3 months ago", tripType: "Family Trip", text: "Great experience, highly recommended for Nature." }
    ],
    aiSummary: {
      loved: ["Natural beauty", "Local food", "Peaceful environment", "Friendly locals", "Stunning landscapes"],
      concerns: ["Peak-season crowds", "Transportation delays"],
      verdict: "Best suited for travelers looking for an escape into nature, especially couples and families."
    }
  },

  gallery: [
    "/assets/Sundarban/cover-1.jpg",
    "/assets/Sundarban/cover-2.jpg",
    "/assets/Sundarban/cover-3.jpg",
    "/assets/Sundarban/thinking/Top Places to Explore.jpg"
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
    { slug: "sundarban", name: "Sundarban", rating: 4.8, aiMatch: 94, budget: "৳8,500", image: "/assets/Sundarban/cover-2.jpg" }
  ]
};
