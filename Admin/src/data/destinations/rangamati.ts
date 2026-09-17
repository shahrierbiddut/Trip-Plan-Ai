
export const rangamatiData = {
  slug: "rangamati",
  name: "Rangamati",
  country: "Bangladesh",
  subtitle: "Lake City.",
  description: "Discover Rangamati through lakes and tribal culture. Experience the best of what nature has to offer.",
  heroImage: "/assets/Sajek/cover-1.jpg",
  rating: 4.7,
  reviewCount: "850",
  aiMatch: 92,
  recommendedStay: "2-4 Days",
  estimatedBudget: 6500,
  popularSeason: "Oct - Mar",
  tags: ["Nature","Family","Cultural"],

  overview: {
    title: "About Rangamati",
    content: [
      "Rangamati is one of the most stunning destinations in Bangladesh, famous for its lakes and tribal culture.",
      "Whether you're looking for an adventure or a peaceful retreat, Rangamati offers breathtaking landscapes and unforgettable experiences for every traveler."
    ],
    image: "/assets/Sajek/cover-1.jpg"
  },

  whyLoveIt: [
    { id: 1, title: "Stunning Views", description: "Breathtaking landscapes.", icon: "mountain" },
    { id: 2, title: "Local Culture", description: "Experience indigenous traditions.", icon: "users" },
    { id: 3, title: "Peaceful Environment", description: "Escape the city noise.", icon: "leaf" },
    { id: 4, title: "Adventure Trails", description: "Perfect for hiking & exploring.", icon: "map" }
  ],

  aiGuide: {
    match: 92,
    bestFor: ["Nature","Family","Cultural"],
    idealTrip: "3 Days",
    travelStyle: "Nature & Adventure",
    recommendation: "Choose Rangamati if you want a trip filled with lakes and tribal culture."
  },

  bestTime: [
    { season: "Oct - Mar", weather: "Pleasant & cool.", recommended: true, icon: "sun" },
    { season: "Apr - Sep", weather: "Rainy & lush green.", recommended: false, icon: "cloudRain" },
    { season: "Oct - Dec", weather: "Cool & comfortable, perfect for travel and sightseeing.", recommended: false, icon: "leaf" }
  ],

  thingsToDo: [
    { id: 1, title: "Sightseeing", description: "Explore the main attractions.", time: "2-4 hrs", image: "/assets/Sajek/cover-1.jpg", type: "Nature" },
    { id: 2, title: "Local Food", description: "Taste traditional dishes.", time: "1-2 hrs", image: "/assets/Sajek/cover-1.jpg", type: "Culinary" },
    { id: 3, title: "Photography", description: "Capture memories.", time: "Flexible", image: "/assets/Sajek/cover-1.jpg", type: "Creative" }
  ],

  placesToExplore: [
    {
      id: 1,
      slug: "rangamati-main-spot",
      title: "Rangamati Main Spot",
      description: "The most famous attraction here.",
      longDescription: "This is the heart of Rangamati, offering incredible views of lakes and tribal culture. Visitors from all over the country come here to experience the serene beauty and majestic atmosphere.",
      image: "/assets/Sajek/cover-1.jpg",
      rating: 4.8,
      tags: ["Must Visit", "Scenic"]
    }
  ],

  marineDriveFeature: {
    title: "The Journey to Rangamati",
    description: "The road to Rangamati is as beautiful as the destination itself.",
    image: "/assets/Sajek/cover-1.jpg",
    highlights: ["Scenic routes", "Photo stops", "Nature views", "Local life", "Memorable journey"]
  },

  itinerary: [
    { day: "DAY 01", title: "Arrival & Exploration", description: "Check in and explore nearby areas.", image: "/assets/Sajek/cover-1.jpg" },
    { day: "DAY 02", title: "Main Attractions", description: "Visit the top spots.", image: "/assets/Sajek/cover-1.jpg" },
    { day: "DAY 03", title: "Relaxation & Departure", description: "Enjoy a quiet morning before leaving.", image: "/assets/Sajek/cover-1.jpg" }
  ],

  budget: {
    baseTransport: 2500,
    baseStay: 3500,
    baseFood: 2000,
    baseActivities: 1000,
    baseMisc: 500
  },

  hotels: [
    { id: 1, name: "Premium Resort", category: "Luxury", rating: 4.8, location: "Central Area", priceFrom: 5000, image: "/assets/Sajek/cover-1.jpg", amenities: ["Views", "WiFi", "Pool"] },
    { id: 2, name: "Eco Lodge", category: "Budget", rating: 4.5, location: "Nature Trail", priceFrom: 2500, image: "/assets/Sajek/cover-1.jpg", amenities: ["Nature Walk", "Breakfast"] }
  ],

  foods: [
    { id: 1, title: "Traditional Thali", description: "Local authentic meal.", price: "$$", image: "/assets/Sajek/cover-1.jpg", type: "Lunch" },
    { id: 2, title: "BBQ Dinner", description: "Enjoy BBQ under the stars.", price: "$$$", image: "/assets/Sajek/cover-1.jpg", type: "Dinner" }
  ],

  reviews: {
    overall: 4.7,
    count: 850,
    breakdown: { 5: 60, 4: 30, 3: 5, 2: 3, 1: 2 },
    list: [
      { id: 1, name: "Sarah M.", avatar: "/assets/Sajek/cover-1.jpg", rating: 5, date: "2 months ago", tripType: "Solo Trip", text: "Absolutely stunning place! The lakes and tribal culture are mesmerizing." },
      { id: 2, name: "Rahul D.", avatar: "/assets/Sajek/cover-1.jpg", rating: 4, date: "3 months ago", tripType: "Family Trip", text: "Great experience, highly recommended for Nature." }
    ],
    aiSummary: {
      loved: ["Natural beauty", "Local food", "Peaceful environment", "Friendly locals", "Stunning landscapes"],
      concerns: ["Peak-season crowds", "Transportation delays"],
      verdict: "Best suited for travelers looking for an escape into nature, especially couples and families."
    }
  },

  gallery: [
    "/assets/Sajek/cover-1.jpg",
    "/assets/Sajek/cover-1.jpg",
    "/assets/Sajek/cover-1.jpg",
    "/assets/Sajek/cover-1.jpg"
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
    { slug: "coxs-bazar", name: "Cox's Bazar", rating: 4.8, aiMatch: 94, budget: "৳8,500", image: "/assets/Coxs/cover-1.jpg" }
  ]
};
