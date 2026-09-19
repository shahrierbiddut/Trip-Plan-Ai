
export const sreemangalData = {
  slug: "sreemangal",
  name: "Sreemangal",
  country: "Bangladesh",
  subtitle: "The Tea Capital.",
  description: "Discover Sreemangal through tea gardens and rain forests. Experience the best of what nature has to offer.",
  heroImage: "/assets/sreemangal/image 1.webp",
  rating: 4.7,
  reviewCount: "850",
  aiMatch: 92,
  recommendedStay: "2-4 Days",
  estimatedBudget: 6500,
  popularSeason: "Oct - Mar",
  tags: ["Nature","Relaxation","Family"],

  overview: {
    title: "About Sreemangal",
    content: [
      "Sreemangal is one of the most stunning destinations in Bangladesh, famous for its tea gardens and rain forests.",
      "Whether you're looking for an adventure or a peaceful retreat, Sreemangal offers breathtaking landscapes and unforgettable experiences for every traveler."
    ],
    image: "/assets/sreemangal/image 1.webp",
    videoUrl: "https://www.youtube.com/embed/vueBUA2wpFw?autoplay=1&controls=1&mute=0"
  },

  whyLoveIt: [
    { id: 1, title: "Stunning Views", description: "Breathtaking landscapes.", icon: "mountain" },
    { id: 2, title: "Local Culture", description: "Experience indigenous traditions.", icon: "users" },
    { id: 3, title: "Peaceful Environment", description: "Escape the city noise.", icon: "leaf" },
    { id: 4, title: "Adventure Trails", description: "Perfect for hiking & exploring.", icon: "map" }
  ],

  aiGuide: {
    match: 92,
    bestFor: ["Nature","Relaxation","Family"],
    idealTrip: "3 Days",
    travelStyle: "Nature & Adventure",
    recommendation: "Choose Sreemangal if you want a trip filled with tea gardens and rain forests."
  },

  bestTime: [
    { season: "Oct - Mar", weather: "Pleasant & cool.", recommended: true, icon: "sun" },
    { season: "Apr - Sep", weather: "Rainy & lush green.", recommended: false, icon: "cloudRain" },
    { season: "Oct - Dec", weather: "Cool & comfortable, perfect for travel and sightseeing.", recommended: false, icon: "leaf" }
  ],

  thingsToDo: [
    { id: 1, title: "Sightseeing", description: "Explore the main attractions.", time: "2-4 hrs", image: "/assets/sreemangal/Thinking/Sightseeing.jfif", type: "Nature" },
    { id: 2, title: "Local Food", description: "Taste traditional dishes.", time: "1-2 hrs", image: "/assets/sreemangal/Thinking/Local Food.jpg", type: "Culinary" },
    { id: 3, title: "Photography", description: "Capture memories.", time: "Flexible", image: "/assets/sreemangal/Thinking/Photography.jfif", type: "Creative" }
  ],

  placesToExplore: [
    {
      id: 1,
      slug: "lawachara-national-park",
      title: "Lawachara National Park",
      description: "A major national park and nature reserve.",
      longDescription: "Lawachara National Park is a massive tropical forest renowned for its rich biodiversity. It's home to the endangered Hoolock Gibbon and diverse bird species. Taking a quiet walk through the dense canopy here is truly rejuvenating.",
      image: "/assets/sreemangal/image 3.webp",
      rating: 4.8,
      tags: ["Nature", "Wildlife", "Must Visit"]
    },
    {
      id: 2,
      slug: "madhabpur-lake",
      title: "Madhabpur Lake",
      description: "A serene lake surrounded by hillocks.",
      longDescription: "Madhabpur Lake is arguably one of the most beautiful spots in Sreemangal. Surrounded by high hillocks covered in green tea bushes, the lake shines like a blue sapphire, especially adorned with blooming water lilies.",
      image: "/assets/sreemangal/image 2.jfif",
      rating: 4.7,
      tags: ["Relaxation", "Scenic", "Photography"]
    },
    {
      id: 3,
      slug: "baikka-beel",
      title: "Baikka Beel",
      description: "A paradise for bird watchers.",
      longDescription: "Baikka Beel is a sprawling wetland sanctuary. In the winter, thousands of migratory birds flock here, making it an absolute paradise for bird watchers and photographers.",
      image: "/assets/sreemangal/image 4.webp",
      rating: 4.6,
      tags: ["Nature", "Photography", "Bird Watching"]
    }
  ],

  marineDriveFeature: {
    title: "The Journey to Sreemangal",
    description: "The road to Sreemangal is as beautiful as the destination itself.",
    image: "/assets/sreemangal/images 2.jfif",
    highlights: ["Scenic routes", "Photo stops", "Nature views", "Local life", "Memorable journey"]
  },

  itinerary: [
    { day: "DAY 01", title: "Arrival & Exploration", description: "Check in and explore nearby areas.", image: "/assets/sreemangal/image 1.webp" },
    { day: "DAY 02", title: "Main Attractions", description: "Visit the top spots.", image: "/assets/sreemangal/images 2.jfif" },
    { day: "DAY 03", title: "Relaxation & Departure", description: "Enjoy a quiet morning before leaving.", image: "/assets/sreemangal/image 3.webp" }
  ],

  budget: {
    baseTransport: 2500,
    baseStay: 3500,
    baseFood: 2000,
    baseActivities: 1000,
    baseMisc: 500
  },

  hotels: [
    { id: 1, name: "Premium Resort", category: "Luxury", rating: 4.8, location: "Central Area", priceFrom: 5000, image: "/assets/sreemangal/resort/Premium Resort.jpg", amenities: ["Views", "WiFi", "Pool"] },
    { id: 2, name: "Eco Lodge", category: "Budget", rating: 4.5, location: "Nature Trail", priceFrom: 2500, image: "/assets/sreemangal/resort/Eco Lodge.jpg", amenities: ["Nature Walk", "Breakfast"] }
  ],

  foods: [
    { id: 1, title: "Traditional Thali", description: "Local authentic meal.", price: "$$", image: "/assets/sreemangal/Taste/Traditional Thali.jpeg", type: "Lunch" },
    { id: 2, title: "BBQ Dinner", description: "Enjoy BBQ under the stars.", price: "$$$", image: "/assets/sreemangal/Taste/BBQ Dinner.jfif", type: "Dinner" }
  ],

  reviews: {
    overall: 4.7,
    count: 850,
    breakdown: { 5: 60, 4: 30, 3: 5, 2: 3, 1: 2 },
    list: [
      { id: 1, name: "Sarah M.", avatar: "/assets/avatar-1.svg", rating: 5, date: "2 months ago", tripType: "Solo Trip", text: "Absolutely stunning place! The tea gardens and rain forests are mesmerizing." },
      { id: 2, name: "Rahul D.", avatar: "/assets/avatar-2.svg", rating: 4, date: "3 months ago", tripType: "Family Trip", text: "Great experience, highly recommended for Nature." }
    ],
    aiSummary: {
      loved: ["Natural beauty", "Local food", "Peaceful environment", "Friendly locals", "Stunning landscapes"],
      concerns: ["Peak-season crowds", "Transportation delays"],
      verdict: "Best suited for travelers looking for an escape into nature, especially couples and families."
    }
  },

  gallery: [
    "/assets/sreemangal/image 1.webp",
    "/assets/sreemangal/images 2.jfif",
    "/assets/sreemangal/image 3.webp",
    "/assets/sreemangal/images 4.jfif"
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
    { slug: "sreemangal", name: "Sreemangal", rating: 4.8, aiMatch: 94, budget: "৳8,500", image: "/assets/sreemangal/image 1.webp" }
  ]
};
