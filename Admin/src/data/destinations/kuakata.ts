
export const kuakataData = {
  slug: "kuakata",
  name: "Kuakata",
  country: "Bangladesh",
  subtitle: "The Daughter of the Sea.",
  description: "Discover Kuakata through sunrises and beaches. Experience the best of what nature has to offer.",
  heroImage: "/assets/Kuakata/image 1.webp",
  rating: 4.7,
  reviewCount: "850",
  aiMatch: 92,
  recommendedStay: "2-4 Days",
  estimatedBudget: 6500,
  popularSeason: "Oct - Mar",
  tags: ["Beach","Family","Relaxation"],

  overview: {
    title: "About Kuakata",
    content: [
      "Kuakata is one of the most stunning destinations in Bangladesh, famous for its sunrises and beaches.",
      "Whether you're looking for an adventure or a peaceful retreat, Kuakata offers breathtaking landscapes and unforgettable experiences for every traveler."
    ],
    image: "/assets/Kuakata/image 1.webp",
    videoUrl: "https://www.youtube.com/embed/L82DjOsPcwM?autoplay=1&controls=1&mute=0"
  },

  whyLoveIt: [
    { id: 1, title: "Stunning Views", description: "Breathtaking landscapes.", icon: "mountain" },
    { id: 2, title: "Local Culture", description: "Experience indigenous traditions.", icon: "users" },
    { id: 3, title: "Peaceful Environment", description: "Escape the city noise.", icon: "leaf" },
    { id: 4, title: "Adventure Trails", description: "Perfect for hiking & exploring.", icon: "map" }
  ],

  aiGuide: {
    match: 92,
    bestFor: ["Beach","Family","Relaxation"],
    idealTrip: "3 Days",
    travelStyle: "Nature & Adventure",
    recommendation: "Choose Kuakata if you want a trip filled with sunrises and beaches."
  },

  bestTime: [
    { season: "Oct - Mar", weather: "Pleasant & cool.", recommended: true, icon: "sun" },
    { season: "Apr - Sep", weather: "Rainy & lush green.", recommended: false, icon: "cloudRain" },
    { season: "Oct - Dec", weather: "Cool & comfortable, perfect for travel and sightseeing.", recommended: false, icon: "leaf" }
  ],

  thingsToDo: [
    { id: 1, title: "Sightseeing", description: "Explore the main attractions.", time: "2-4 hrs", image: "/assets/Kuakata/thinking/Sightseeing.webp", type: "Nature" },
    { id: 2, title: "Local Food", description: "Taste traditional dishes.", time: "1-2 hrs", image: "/assets/Kuakata/thinking/local food.jfif", type: "Culinary" },
    { id: 3, title: "Photography", description: "Capture memories.", time: "Flexible", image: "/assets/Kuakata/thinking/Photography.webp", type: "Creative" }
  ],

  placesToExplore: [
    {
      id: 1,
      slug: "gangamati-reserved-forest",
      title: "Gangamati Reserved Forest",
      description: "An evergreen mangrove forest by the sea.",
      longDescription: "Located on the eastern side of Kuakata beach, Gangamati is a dense mangrove forest that protects the coast. You can spot various species of birds, wild fowls, and monkeys here.",
      image: "/assets/Kuakata/image 2.jpg",
      rating: 4.7,
      tags: ["Nature", "Photography", "Adventure"]
    },
    {
      id: 2,
      slug: "fatrar-chor",
      title: "Fatrar Chor",
      description: "A beautiful island that is part of the Sundarbans.",
      longDescription: "Fatrar Chor requires a scenic boat ride to reach. It is a part of the extended Sundarbans mangrove forest, where you can walk through the dense trees and enjoy the absolute tranquility of nature.",
      image: "/assets/Kuakata/image 3.jpg",
      rating: 4.6,
      tags: ["Boat Ride", "Nature", "Relaxation"]
    },
    {
      id: 3,
      slug: "red-crab-beach",
      title: "Red Crab Beach (Lal Kakrar Chor)",
      description: "Thousands of red crabs decorating the sandy shore.",
      longDescription: "A short distance from the main beach lies a secluded area where thousands of red crabs crawl around the sand, making it look like a red carpet. It is an amazing natural phenomenon perfect for photography.",
      image: "/assets/Kuakata/image 4.jfif",
      rating: 4.8,
      tags: ["Scenic", "Wildlife", "Must Visit"]
    }
  ],

  marineDriveFeature: {
    title: "The Journey to Kuakata",
    description: "The road to Kuakata is as beautiful as the destination itself.",
    image: "/assets/Kuakata/image 2.jpg",
    highlights: ["Scenic routes", "Photo stops", "Nature views", "Local life", "Memorable journey"]
  },

  itinerary: [
    { day: "DAY 01", title: "Arrival & Exploration", description: "Check in and explore nearby areas.", image: "/assets/Kuakata/image 1.webp" },
    { day: "DAY 02", title: "Main Attractions", description: "Visit the top spots.", image: "/assets/Kuakata/image 2.jpg" },
    { day: "DAY 03", title: "Relaxation & Departure", description: "Enjoy a quiet morning before leaving.", image: "/assets/Kuakata/image 3.webp" }
  ],

  budget: {
    baseTransport: 2500,
    baseStay: 3500,
    baseFood: 2000,
    baseActivities: 1000,
    baseMisc: 500
  },

  hotels: [
    { id: 1, name: "Premium Resort", category: "Luxury", rating: 4.8, location: "Central Area", priceFrom: 5000, image: "/assets/Kuakata/resort/Premium Resort.jfif", amenities: ["Views", "WiFi", "Pool"] },
    { id: 2, name: "Eco Lodge", category: "Budget", rating: 4.5, location: "Nature Trail", priceFrom: 2500, image: "/assets/Kuakata/resort/Eco Lodge.jpg", amenities: ["Nature Walk", "Breakfast"] }
  ],

  foods: [
    { id: 1, title: "Traditional Thali", description: "Local authentic meal.", price: "$$", image: "/assets/Kuakata/taste/Traditional Thali.jfif", type: "Lunch" },
    { id: 2, title: "BBQ Dinner", description: "Enjoy BBQ under the stars.", price: "$$$", image: "/assets/Kuakata/taste/BBQ Dinner.jfif", type: "Dinner" }
  ],

  reviews: {
    overall: 4.7,
    count: 850,
    breakdown: { 5: 60, 4: 30, 3: 5, 2: 3, 1: 2 },
    list: [
      { id: 1, name: "Sarah M.", avatar: "/assets/avatar-1.svg", rating: 5, date: "2 months ago", tripType: "Solo Trip", text: "Absolutely stunning place! The sunrises and beaches are mesmerizing." },
      { id: 2, name: "Rahul D.", avatar: "/assets/avatar-2.svg", rating: 4, date: "3 months ago", tripType: "Family Trip", text: "Great experience, highly recommended for Beach." }
    ],
    aiSummary: {
      loved: ["Natural beauty", "Local food", "Peaceful environment", "Friendly locals", "Stunning landscapes"],
      concerns: ["Peak-season crowds", "Transportation delays"],
      verdict: "Best suited for travelers looking for an escape into nature, especially couples and families."
    }
  },

  gallery: [
    "/assets/Kuakata/image 1.webp",
    "/assets/Kuakata/image 2.jpg",
    "/assets/Kuakata/image 3.webp",
    "/assets/Kuakata/images 4.jfif"
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
    { slug: "kuakata", name: "Kuakata", rating: 4.8, aiMatch: 94, budget: "৳8,500", image: "/assets/Kuakata/image 1.webp" }
  ]
};
