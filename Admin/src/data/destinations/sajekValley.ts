
export const sajekValleyData = {
  slug: "sajek-valley",
  name: "Sajek Valley",
  country: "Bangladesh",
  subtitle: "Clouds, Hills, and Serenity.",
  description: "Discover Sajek Valley through hills and clouds. Experience the best of what nature has to offer.",
  heroImage: "/assets/Sajek/cover-1.jpg",
  rating: 4.7,
  reviewCount: "850",
  aiMatch: 92,
  recommendedStay: "2-4 Days",
  estimatedBudget: 6500,
  popularSeason: "Oct - Mar",
  tags: ["Nature","Adventure","Romantic"],

  overview: {
    title: "About Sajek Valley",
    content: [
      "Sajek Valley is one of the most stunning destinations in Bangladesh, famous for its hills and clouds.",
      "Whether you're looking for an adventure or a peaceful retreat, Sajek Valley offers breathtaking landscapes and unforgettable experiences for every traveler."
    ],
    image: "/assets/Sajek/cover-1.jpg",
    videoUrl: "https://www.youtube.com/embed/cl9DnkuiKZs?autoplay=1&controls=1&mute=0"
  },

  whyLoveIt: [
    { id: 1, title: "Stunning Views", description: "Breathtaking landscapes.", icon: "mountain" },
    { id: 2, title: "Local Culture", description: "Experience indigenous traditions.", icon: "users" },
    { id: 3, title: "Peaceful Environment", description: "Escape the city noise.", icon: "leaf" },
    { id: 4, title: "Adventure Trails", description: "Perfect for hiking & exploring.", icon: "map" }
  ],

  aiGuide: {
    match: 92,
    bestFor: ["Nature","Adventure","Romantic"],
    idealTrip: "3 Days",
    travelStyle: "Nature & Adventure",
    recommendation: "Choose Sajek Valley if you want a trip filled with hills and clouds."
  },

  bestTime: [
    { season: "Oct - Mar", weather: "Pleasant & cool.", recommended: true, icon: "sun" },
    { season: "Apr - Sep", weather: "Rainy & lush green.", recommended: false, icon: "cloudRain" },
    { season: "Oct - Dec", weather: "Cool & comfortable, perfect for travel and sightseeing.", recommended: false, icon: "leaf" }
  ],

  thingsToDo: [
    { id: 1, title: "Sightseeing", description: "Explore the main attractions.", time: "2-4 hrs", image: "/assets/Sajek/Thinking/Sightseeing.webp", type: "Nature" },
    { id: 2, title: "Local Food", description: "Taste traditional dishes.", time: "1-2 hrs", image: "/assets/Sajek/Thinking/Local Food.jfif", type: "Culinary" },
    { id: 3, title: "Photography", description: "Capture memories.", time: "Flexible", image: "/assets/Sajek/Thinking/Photography.jpg", type: "Creative" },
    { id: 4, title: "Chander Gari Ride", description: "Thrilling jeep ride through the hills.", time: "1-2 hrs", image: "/assets/Sajek/Thinking/Chander Gari Ride.jfif", type: "Adventure" },
    { id: 5, title: "Cloud Gazing", description: "Watch clouds play over Konglak Pahar.", time: "Flexible", image: "/assets/Sajek/Thinking/Cloud Gazing.jfif", type: "Relaxation" }
  ],

  placesToExplore: [
    {
      id: 1,
      slug: "sajek-valley-main-spot",
      title: "Sajek Valley Main Spot",
      description: "The most famous attraction here.",
      longDescription: "This is the heart of Sajek Valley, offering incredible views of hills and clouds. Visitors from all over the country come here to experience the serene beauty and majestic atmosphere.",
      image: "/assets/Sajek/Explorer/sajek vally main spot.jfif",
      rating: 4.8,
      tags: ["Must Visit", "Scenic"]
    },
    {
      id: 2,
      slug: "konglak-pahar",
      title: "Konglak Pahar",
      description: "The highest peak in Sajek Valley.",
      longDescription: "Konglak Pahar is the highest point in Sajek Valley, offering a breathtaking 360-degree panoramic view of the surrounding hills, including the distant mountains of Mizoram, India. A short trek to the top rewards visitors with majestic sunrises and sunsets.",
      image: "/assets/Sajek/Explorer/konglak pahar.jpg",
      rating: 4.9,
      tags: ["Trekking", "Viewpoint"]
    },
    {
      id: 3,
      slug: "hazachora-waterfall",
      title: "Hazachora Waterfall",
      description: "A beautiful cascading waterfall on the way.",
      longDescription: "Located just before entering Sajek Valley, Hazachora Waterfall is a popular stopover. Hidden within deep greenery, the crystal-clear water cascades down beautifully, making it an excellent spot for nature lovers to refresh before heading up to the hills.",
      image: "/assets/Sajek/Explorer/hazachor waterfall.jpg",
      rating: 4.7,
      tags: ["Nature", "Waterfall"]
    }
  ],

  marineDriveFeature: {
    title: "The Journey to Sajek Valley",
    description: "The road to Sajek Valley is as beautiful as the destination itself.",
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
    { id: 1, name: "Premium Resort", category: "Luxury", rating: 4.8, location: "Central Area", priceFrom: 5000, image: "/assets/Sajek/Resort/Premium Resort.jfif", amenities: ["Views", "WiFi", "Pool"] },
    { id: 2, name: "Eco Lodge", category: "Budget", rating: 4.5, location: "Nature Trail", priceFrom: 2500, image: "/assets/Sajek/Resort/Eco Lodge.jpg", amenities: ["Nature Walk", "Breakfast"] }
  ],

  foods: [
    { id: 1, title: "Traditional Thali", description: "Local authentic meal.", price: "$$", image: "/assets/Sajek/Taste/Traditional Thali.jfif", type: "Lunch" },
    { id: 2, title: "BBQ Dinner", description: "Enjoy BBQ under the stars.", price: "$$$", image: "/assets/Sajek/Taste/BBQ Dinner.jfif", type: "Dinner" }
  ],

  reviews: {
    overall: 4.7,
    count: 850,
    breakdown: { 5: 60, 4: 30, 3: 5, 2: 3, 1: 2 },
    list: [
      { id: 1, name: "Sarah M.", avatar: "/assets/Sajek/cover-1.jpg", rating: 5, date: "2 months ago", tripType: "Solo Trip", text: "Absolutely stunning place! The hills and clouds are mesmerizing." },
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
    "/assets/Sajek/cover-2.jpg",
    "/assets/Sajek/cover-3.jpg",
    "/assets/Sajek/Explorer/konglak pahar.jpg"
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
    { slug: "sajek-valley", name: "Sajek Valley", rating: 4.7, aiMatch: 92, budget: "৳6,500", image: "/assets/Sajek/cover-1.jpg" }
  ]
};
