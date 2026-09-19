
export const saintMartinData = {
  slug: "saint-martin",
  name: "Saint Martin",
  country: "Bangladesh",
  subtitle: "Coral Island Paradise.",
  description: "Discover Saint Martin through blue waters and corals. Experience the best of what nature has to offer.",
  heroImage: "/assets/Saintmartin/cover-1.jpg",
  rating: 4.7,
  reviewCount: "850",
  aiMatch: 92,
  recommendedStay: "2-4 Days",
  estimatedBudget: 6500,
  popularSeason: "Oct - Mar",
  tags: ["Beach","Romantic","Relaxation"],

  overview: {
    title: "About Saint Martin",
    content: [
      "Saint Martin is one of the most stunning destinations in Bangladesh, famous for its blue waters and corals.",
      "Whether you're looking for an adventure or a peaceful retreat, Saint Martin offers breathtaking landscapes and unforgettable experiences for every traveler."
    ],
    image: "/assets/Saintmartin/cover-1.jpg",
    videoUrl: "https://www.youtube.com/embed/U7JzEl2AGb0?autoplay=1&controls=1&mute=0"
  },

  whyLoveIt: [
    { id: 1, title: "Stunning Views", description: "Breathtaking landscapes.", icon: "mountain" },
    { id: 2, title: "Local Culture", description: "Experience indigenous traditions.", icon: "users" },
    { id: 3, title: "Peaceful Environment", description: "Escape the city noise.", icon: "leaf" },
    { id: 4, title: "Adventure Trails", description: "Perfect for hiking & exploring.", icon: "map" }
  ],

  aiGuide: {
    match: 92,
    bestFor: ["Beach","Romantic","Relaxation"],
    idealTrip: "3 Days",
    travelStyle: "Nature & Adventure",
    recommendation: "Choose Saint Martin if you want a trip filled with blue waters and corals."
  },

  bestTime: [
    { season: "Oct - Mar", weather: "Pleasant & cool.", recommended: true, icon: "sun" },
    { season: "Apr - Sep", weather: "Rainy & lush green.", recommended: false, icon: "cloudRain" },
    { season: "Oct - Dec", weather: "Cool & comfortable, perfect for travel and sightseeing.", recommended: false, icon: "leaf" }
  ],

  thingsToDo: [
    { id: 1, title: "Sightseeing", description: "Explore the main attractions.", time: "2-4 hrs", image: "/assets/Saintmartin/Thinking/Sightseeing.webp", type: "Nature" },
    { id: 2, title: "Local Food", description: "Taste traditional dishes.", time: "1-2 hrs", image: "/assets/Saintmartin/Thinking/Local Food.jfif", type: "Culinary" },
    { id: 3, title: "Photography", description: "Capture memories.", time: "Flexible", image: "/assets/Saintmartin/Thinking/Photography.jfif", type: "Creative" }
  ],

  placesToExplore: [
    {
      id: 1,
      slug: "chera-dwip",
      title: "Chera Dwip",
      description: "The southernmost part of Bangladesh.",
      longDescription: "Chera Dwip is a beautiful, uninhabited coral island separated from the main island of Saint Martin during high tide. The crystal clear water, living corals, and raw, untouched environment make it a top destination.",
      image: "/assets/Saintmartin/cover-1.jpg",
      rating: 4.9,
      tags: ["Must Visit", "Photography", "Relaxation"]
    },
    {
      id: 2,
      slug: "west-beach",
      title: "West Beach",
      description: "The perfect spot to witness breathtaking sunsets.",
      longDescription: "The West Beach of Saint Martin is renowned for its powdery white sand and spectacular sunsets. It is much quieter than the commercial areas, offering a perfect, peaceful retreat by the sea.",
      image: "/assets/Saintmartin/cover-1.jpg",
      rating: 4.7,
      tags: ["Relaxation", "Scenic", "Nature"]
    },
    {
      id: 3,
      slug: "marine-park",
      title: "Saint Martin Marine Park",
      description: "Protecting the rich biodiversity of the island.",
      longDescription: "The Marine Park was established to protect the unique coral reefs and marine life around the island. Snorkeling around this area gives you a glimpse into a vibrant underwater world.",
      image: "/assets/Saintmartin/cover-1.jpg",
      rating: 4.5,
      tags: ["Adventure", "Nature", "Must Visit"]
    }
  ],

  marineDriveFeature: {
    title: "The Journey to Saint Martin",
    description: "The road to Saint Martin is as beautiful as the destination itself.",
    image: "/assets/Saintmartin/cover-1.jpg",
    highlights: ["Scenic routes", "Photo stops", "Nature views", "Local life", "Memorable journey"]
  },

  itinerary: [
    { day: "DAY 01", title: "Arrival & Exploration", description: "Check in and explore nearby areas.", image: "/assets/Saintmartin/cover-1.jpg" },
    { day: "DAY 02", title: "Main Attractions", description: "Visit the top spots.", image: "/assets/Saintmartin/cover-1.jpg" },
    { day: "DAY 03", title: "Relaxation & Departure", description: "Enjoy a quiet morning before leaving.", image: "/assets/Saintmartin/cover-1.jpg" }
  ],

  budget: {
    baseTransport: 2500,
    baseStay: 3500,
    baseFood: 2000,
    baseActivities: 1000,
    baseMisc: 500
  },

  hotels: [
    { id: 1, name: "Premium Resort", category: "Luxury", rating: 4.8, location: "Central Area", priceFrom: 5000, image: "/assets/Saintmartin/resort/Premium Resort.avif", amenities: ["Views", "WiFi", "Pool"] },
    { id: 2, name: "Eco Lodge", category: "Budget", rating: 4.5, location: "Nature Trail", priceFrom: 2500, image: "/assets/Saintmartin/resort/Eco Lodge.jfif", amenities: ["Nature Walk", "Breakfast"] }
  ],

  foods: [
    { id: 1, title: "Traditional Thali", description: "Local authentic meal.", price: "$$", image: "/assets/Saintmartin/taste/Traditional Thali.webp", type: "Lunch" },
    { id: 2, title: "BBQ Dinner", description: "Enjoy BBQ under the stars.", price: "$$$", image: "/assets/Saintmartin/taste/BBQ Dinner.jpg", type: "Dinner" }
  ],

  reviews: {
    overall: 4.7,
    count: 850,
    breakdown: { 5: 60, 4: 30, 3: 5, 2: 3, 1: 2 },
    list: [
      { id: 1, name: "Sarah M.", avatar: "/assets/avatar-1.svg", rating: 5, date: "2 months ago", tripType: "Solo Trip", text: "Absolutely stunning place! The blue waters and corals are mesmerizing." },
      { id: 2, name: "Rahul D.", avatar: "/assets/avatar-2.svg", rating: 4, date: "3 months ago", tripType: "Family Trip", text: "Great experience, highly recommended for Beach." }
    ],
    aiSummary: {
      loved: ["Natural beauty", "Local food", "Peaceful environment", "Friendly locals", "Stunning landscapes"],
      concerns: ["Peak-season crowds", "Transportation delays"],
      verdict: "Best suited for travelers looking for an escape into nature, especially couples and families."
    }
  },

  gallery: [
    "/assets/Saintmartin/cover-1.jpg",
    "/assets/Saintmartin/images 1.jfif",
    "/assets/Saintmartin/image 2.jpg",
    "/assets/Saintmartin/images 3.jfif"
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
    { slug: "saint-martin", name: "Saint Martin", rating: 4.7, aiMatch: 92, budget: "৳6,500", image: "/assets/Saintmartin/cover-1.jpg" }
  ]
};
