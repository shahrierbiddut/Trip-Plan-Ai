
export const sylhetData = {
  slug: "sylhet",
  name: "Sylhet",
  country: "Bangladesh",
  subtitle: "Waterfalls and Greenery.",
  description: "Discover Sylhet through waterfalls and tea estates. Experience the best of what nature has to offer.",
  heroImage: "/assets/Sylhet/cover-1.jpg",
  rating: 4.7,
  reviewCount: "850",
  aiMatch: 92,
  recommendedStay: "2-4 Days",
  estimatedBudget: 6500,
  popularSeason: "Oct - Mar",
  tags: ["Nature","Adventure","Family"],

  overview: {
    title: "About Sylhet",
    content: [
      "Sylhet is one of the most stunning destinations in Bangladesh, famous for its waterfalls and tea estates.",
      "Whether you're looking for an adventure or a peaceful retreat, Sylhet offers breathtaking landscapes and unforgettable experiences for every traveler."
    ],
    image: "/assets/Sylhet/cover-1.jpg",
    videoUrl: "https://www.youtube.com/embed/bpA-aWDh6zU?autoplay=1&controls=1&mute=0"
  },

  whyLoveIt: [
    { id: 1, title: "Stunning Views", description: "Breathtaking landscapes.", icon: "mountain" },
    { id: 2, title: "Local Culture", description: "Experience indigenous traditions.", icon: "users" },
    { id: 3, title: "Peaceful Environment", description: "Escape the city noise.", icon: "leaf" },
    { id: 4, title: "Adventure Trails", description: "Perfect for hiking & exploring.", icon: "map" }
  ],

  aiGuide: {
    match: 92,
    bestFor: ["Nature","Adventure","Family"],
    idealTrip: "3 Days",
    travelStyle: "Nature & Adventure",
    recommendation: "Choose Sylhet if you want a trip filled with waterfalls and tea estates."
  },

  bestTime: [
    { season: "Oct - Mar", weather: "Pleasant & cool.", recommended: true, icon: "sun" },
    { season: "Apr - Sep", weather: "Rainy & lush green.", recommended: false, icon: "cloudRain" },
    { season: "Oct - Dec", weather: "Cool & comfortable, perfect for travel and sightseeing.", recommended: false, icon: "leaf" }
  ],

  thingsToDo: [
    { id: 1, title: "Sightseeing", description: "Explore the main attractions.", time: "2-4 hrs", image: "/assets/Sylhet/thinking/Sightseeing.jfif", type: "Nature" },
    { id: 2, title: "Local Food", description: "Taste traditional dishes.", time: "1-2 hrs", image: "/assets/Sylhet/thinking/Local Food.jpg", type: "Culinary" },
    { id: 3, title: "Photography", description: "Capture memories.", time: "Flexible", image: "/assets/Sylhet/thinking/Photography.jfif", type: "Creative" }
  ],

  placesToExplore: [
    {
      id: 1,
      slug: "ratargul-swamp-forest",
      title: "Ratargul Swamp Forest",
      description: "The only freshwater swamp forest in Bangladesh.",
      longDescription: "Ratargul is a magnificent freshwater swamp forest located in Sylhet. Known as the 'Amazon of Bangladesh', the forest is mostly submerged during the monsoon, making it perfect for a serene boat ride among the dense, lush green trees.",
      image: "/assets/Sylhet/cover-1.jpg",
      rating: 4.8,
      tags: ["Nature", "Photography", "Must Visit"]
    },
    {
      id: 2,
      slug: "bholaganj-sada-pathor",
      title: "Bholaganj Sada Pathor",
      description: "Crystal clear water rushing over white stones.",
      longDescription: "Bholaganj Sada Pathor is one of the most attractive tourist spots in Sylhet. The combination of the Meghalaya mountains, crystal clear river water, and the white stones scattered across the riverbed creates an incredibly photogenic and relaxing environment.",
      image: "/assets/Sylhet/cover-1.jpg",
      rating: 4.7,
      tags: ["Relaxation", "Scenic", "Nature"]
    },
    {
      id: 3,
      slug: "lalakhal",
      title: "Lalakhal",
      description: "A wide canal with stunning blue-green water.",
      longDescription: "Lalakhal offers a magical boat ride experience on water that naturally shifts colors from blue to green. Flowing down from the Cherrapunji hills of India, it is surrounded by lush tea gardens and provides a peaceful retreat from the busy city.",
      image: "/assets/Sylhet/cover-1.jpg",
      rating: 4.6,
      tags: ["Boat Ride", "Peaceful", "Photography"]
    }
  ],

  marineDriveFeature: {
    title: "The Journey to Sylhet",
    description: "The road to Sylhet is as beautiful as the destination itself.",
    image: "/assets/Sylhet/cover-1.jpg",
    highlights: ["Scenic routes", "Photo stops", "Nature views", "Local life", "Memorable journey"]
  },

  itinerary: [
    { day: "DAY 01", title: "Arrival & Exploration", description: "Check in and explore nearby areas.", image: "/assets/Sylhet/cover-1.jpg" },
    { day: "DAY 02", title: "Main Attractions", description: "Visit the top spots.", image: "/assets/Sylhet/cover-1.jpg" },
    { day: "DAY 03", title: "Relaxation & Departure", description: "Enjoy a quiet morning before leaving.", image: "/assets/Sylhet/cover-1.jpg" }
  ],

  budget: {
    baseTransport: 2500,
    baseStay: 3500,
    baseFood: 2000,
    baseActivities: 1000,
    baseMisc: 500
  },

  hotels: [
    { id: 1, name: "Premium Resort", category: "Luxury", rating: 4.8, location: "Central Area", priceFrom: 5000, image: "/assets/Sylhet/resort/Premium Resort.jfif", amenities: ["Views", "WiFi", "Pool"] },
    { id: 2, name: "Eco Lodge", category: "Budget", rating: 4.5, location: "Nature Trail", priceFrom: 2500, image: "/assets/Sylhet/resort/Eco Lodge.jfif", amenities: ["Nature Walk", "Breakfast"] }
  ],

  foods: [
    { id: 1, title: "Traditional Thali", description: "Local authentic meal.", price: "$$", image: "/assets/Sylhet/taste/Traditional Thali.jfif", type: "Lunch" },
    { id: 2, title: "BBQ Dinner", description: "Enjoy BBQ under the stars.", price: "$$$", image: "/assets/Sylhet/taste/BBQ Dinner.jfif", type: "Dinner" }
  ],

  reviews: {
    overall: 4.7,
    count: 850,
    breakdown: { 5: 60, 4: 30, 3: 5, 2: 3, 1: 2 },
    list: [
      { id: 1, name: "Sarah M.", avatar: "/assets/avatar-1.svg", rating: 5, date: "2 months ago", tripType: "Solo Trip", text: "Absolutely stunning place! The waterfalls and tea estates are mesmerizing." },
      { id: 2, name: "Rahul D.", avatar: "/assets/avatar-2.svg", rating: 4, date: "3 months ago", tripType: "Family Trip", text: "Great experience, highly recommended for Nature." }
    ],
    aiSummary: {
      loved: ["Natural beauty", "Local food", "Peaceful environment", "Friendly locals", "Stunning landscapes"],
      concerns: ["Peak-season crowds", "Transportation delays"],
      verdict: "Best suited for travelers looking for an escape into nature, especially couples and families."
    }
  },

  gallery: [
    "/assets/Sylhet/cover-1.jpg",
    "/assets/Sylhet/cover-2.jpg",
    "/assets/Sylhet/cover-3.jpg",
    "/assets/Sylhet/thinking/Sightseeing.jfif"
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
    { slug: "sylhet", name: "Sylhet", rating: 4.8, aiMatch: 94, budget: "৳8,500", image: "/assets/Sylhet/cover-1.jpg" }
  ]
};
