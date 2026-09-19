
export const jaflongData = {
  slug: "jaflong",
  name: "Jaflong",
  country: "Bangladesh",
  subtitle: "Stones and River Views.",
  description: "Discover Jaflong through rivers and hills. Experience the best of what nature has to offer.",
  heroImage: "/assets/Jaflong/cover-1.jpg",
  rating: 4.7,
  reviewCount: "850",
  aiMatch: 92,
  recommendedStay: "2-4 Days",
  estimatedBudget: 6500,
  popularSeason: "Oct - Mar",
  tags: ["Nature","Adventure","Backpacking"],

  overview: {
    title: "About Jaflong",
    content: [
      "Jaflong is one of the most stunning destinations in Bangladesh, famous for its rivers and hills.",
      "Whether you're looking for an adventure or a peaceful retreat, Jaflong offers breathtaking landscapes and unforgettable experiences for every traveler."
    ],
    image: "/assets/Jaflong/cover-1.jpg",
    videoUrl: "https://www.youtube.com/embed/KvJGjTE3RKo?autoplay=1&controls=1&mute=0"
  },

  whyLoveIt: [
    { id: 1, title: "Stunning Views", description: "Breathtaking landscapes.", icon: "mountain" },
    { id: 2, title: "Local Culture", description: "Experience indigenous traditions.", icon: "users" },
    { id: 3, title: "Peaceful Environment", description: "Escape the city noise.", icon: "leaf" },
    { id: 4, title: "Adventure Trails", description: "Perfect for hiking & exploring.", icon: "map" }
  ],

  aiGuide: {
    match: 92,
    bestFor: ["Nature","Adventure","Backpacking"],
    idealTrip: "3 Days",
    travelStyle: "Nature & Adventure",
    recommendation: "Choose Jaflong if you want a trip filled with rivers and hills."
  },

  bestTime: [
    { season: "Oct - Mar", weather: "Pleasant & cool.", recommended: true, icon: "sun" },
    { season: "Apr - Sep", weather: "Rainy & lush green.", recommended: false, icon: "cloudRain" },
    { season: "Oct - Dec", weather: "Cool & comfortable, perfect for travel and sightseeing.", recommended: false, icon: "leaf" }
  ],

  thingsToDo: [
    { id: 1, title: "Sightseeing", description: "Explore the main attractions.", time: "2-4 hrs", image: "/assets/Jaflong/Sightseeing.jfif", type: "Nature" },
    { id: 2, title: "Local Food", description: "Taste traditional dishes.", time: "1-2 hrs", image: "/assets/Jaflong/Thinking/local food.jpg", type: "Culinary" },
    { id: 3, title: "Photography", description: "Capture memories.", time: "Flexible", image: "/assets/Jaflong/Photography.jpg", type: "Creative" }
  ],

  placesToExplore: [
    {
      id: 1,
      slug: "sangrampunji-waterfall",
      title: "Sangrampunji Waterfall",
      description: "A stunning waterfall cascading down the hills.",
      longDescription: "Located very close to the Jaflong zero point, Sangrampunji Waterfall (also known as Mayabi Waterfall) offers a refreshing escape. The lush green surroundings and the cold mountain water make it a perfect spot for nature lovers.",
      image: "/assets/Jaflong/cover-1.jpg",
      rating: 4.7,
      tags: ["Nature", "Scenic", "Must Visit"]
    },
    {
      id: 2,
      slug: "piyain-river",
      title: "Piyain River",
      description: "Crystal clear water with colorful stones.",
      longDescription: "The Piyain River is famous for its transparent water and the collection of beautiful, colorful stones at the riverbed. Taking a boat ride here while viewing the distant Meghalaya mountains is an unforgettable experience.",
      image: "/assets/Jaflong/cover-1.jpg",
      rating: 4.8,
      tags: ["Boat Ride", "Photography", "Relaxation"]
    },
    {
      id: 3,
      slug: "khasi-village",
      title: "Khasi Village",
      description: "Experience the unique lifestyle of the Khasi tribe.",
      longDescription: "Visit the nearby Khasi village to learn about the indigenous Khasi people, their unique matriarchal society, and their traditional betel leaf cultivation. It provides a rich cultural perspective to your trip.",
      image: "/assets/Jaflong/cover-1.jpg",
      rating: 4.6,
      tags: ["Culture", "Must Visit", "Photography"]
    }
  ],

  marineDriveFeature: {
    title: "The Journey to Jaflong",
    description: "The road to Jaflong is as beautiful as the destination itself.",
    image: "/assets/Jaflong/cover-1.jpg",
    highlights: ["Scenic routes", "Photo stops", "Nature views", "Local life", "Memorable journey"]
  },

  itinerary: [
    { day: "DAY 01", title: "Arrival & Exploration", description: "Check in and explore nearby areas.", image: "/assets/Jaflong/cover-1.jpg" },
    { day: "DAY 02", title: "Main Attractions", description: "Visit the top spots.", image: "/assets/Jaflong/cover-1.jpg" },
    { day: "DAY 03", title: "Relaxation & Departure", description: "Enjoy a quiet morning before leaving.", image: "/assets/Jaflong/cover-1.jpg" }
  ],

  budget: {
    baseTransport: 2500,
    baseStay: 3500,
    baseFood: 2000,
    baseActivities: 1000,
    baseMisc: 500
  },

  hotels: [
    { id: 1, name: "Premium Resort", category: "Luxury", rating: 4.8, location: "Central Area", priceFrom: 5000, image: "/assets/Jaflong/Rersort/Premium Resort.jfif", amenities: ["Views", "WiFi", "Pool"] },
    { id: 2, name: "Eco Lodge", category: "Budget", rating: 4.5, location: "Nature Trail", priceFrom: 2500, image: "/assets/Jaflong/Rersort/Eco Lodge.jpg", amenities: ["Nature Walk", "Breakfast"] }
  ],

  foods: [
    { id: 1, title: "Traditional Thali", description: "Local authentic meal.", price: "$$", image: "/assets/Jaflong/Taste/Traditional Thali.jfif", type: "Lunch" },
    { id: 2, title: "BBQ Dinner", description: "Enjoy BBQ under the stars.", price: "$$$", image: "/assets/Jaflong/BBQ Dinner.jfif", type: "Dinner" }
  ],

  reviews: {
    overall: 4.7,
    count: 850,
    breakdown: { 5: 60, 4: 30, 3: 5, 2: 3, 1: 2 },
    list: [
      { id: 1, name: "Sarah M.", avatar: "/assets/avatar-1.svg", rating: 5, date: "2 months ago", tripType: "Solo Trip", text: "Absolutely stunning place! The rivers and hills are mesmerizing." },
      { id: 2, name: "Rahul D.", avatar: "/assets/avatar-2.svg", rating: 4, date: "3 months ago", tripType: "Family Trip", text: "Great experience, highly recommended for Nature." }
    ],
    aiSummary: {
      loved: ["Natural beauty", "Local food", "Peaceful environment", "Friendly locals", "Stunning landscapes"],
      concerns: ["Peak-season crowds", "Transportation delays"],
      verdict: "Best suited for travelers looking for an escape into nature, especially couples and families."
    }
  },

  gallery: [
    "/assets/Jaflong/cover-1.jpg",
    "/assets/Jaflong/Photography.jpg",
    "/assets/Jaflong/Sightseeing.jfif",
    "/assets/Jaflong/Thinking/local food.jpg"
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
    { slug: "jaflong", name: "Jaflong", rating: 4.8, aiMatch: 94, budget: "৳8,500", image: "/assets/Jaflong/cover-1.jpg" }
  ]
};
