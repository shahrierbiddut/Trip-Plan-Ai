export type TripStatus = "Upcoming" | "Completed" | "Draft" | "Cancelled";

export type Trip = {
  id: string;
  title: string;
  destination: string;
  image: string;
  startDate: string;
  endDate: string;
  durationString: string;
  travelStyle: string;
  budget: number;
  status: TripStatus;
  aiMatch: number;
};

export type SavedDestination = {
  id: string;
  name: string;
  region: string;
  image: string;
  match: number;
};

export type ActivityItem = {
  id: string;
  timeLabel: string;
  description: string;
  type: "generated" | "saved" | "updated" | "completed" | "submitted";
};

export const dashboardData = {
  user: {
    name: "Rifat Ahmed",
    firstName: "Rifat",
    role: "Traveler",
    avatar: "https://ui-avatars.com/api/?name=Rifat+Ahmed&background=F4A934&color=073D31", // Fixed 404 image link
  },
  stats: {
    upcomingTrips: {
      count: 1,
      detail: "Next trip in 3 days",
    },
    savedDestinations: {
      count: 14,
      detail: "+3 this month",
    },
    tripsCompleted: {
      count: 8,
      detail: "Since joining TripPlan AI",
    },
    totalBudget: {
      amount: "৳86,500",
      detail: "Across 8 trips",
    },
  },
  nextAdventure: {
    destination: "Cox's Bazar",
    startDate: "24",
    endDate: "26 August 2026",
    duration: "3 Days • 2 Nights",
    group: "Family Trip",
    budget: "৳15,000 – ৳18,000",
    aiMatch: 94,
    image: "/assets/Coxs/cover-4.jpg",
  },
  quickSuggestions: [
    "Weekend Escape",
    "Mountain Adventure",
    "Beach Getaway",
    "Nature Retreat",
  ],
  myTrips: [
    {
      id: "trip-1",
      title: "3 Days in Sajek Valley",
      destination: "Sajek Valley",
      image: "/assets/Sajek/cover-2.jpg",
      startDate: "18",
      endDate: "20 September 2026",
      durationString: "3 Days",
      travelStyle: "Adventure",
      budget: 12500,
      status: "Upcoming",
      aiMatch: 91,
    },
    {
      id: "trip-2",
      title: "Cox's Bazar Getaway",
      destination: "Cox's Bazar",
      image: "/assets/Coxs/cover-2.jpg",
      startDate: "24",
      endDate: "26 August 2026",
      durationString: "3 Days",
      travelStyle: "Family",
      budget: 15000,
      status: "Upcoming",
      aiMatch: 94,
    },
    {
      id: "trip-3",
      title: "Bandarban Escape",
      destination: "Bandarban",
      image: "/assets/Bandarban/images 1.jfif",
      startDate: "12",
      endDate: "15 July 2026",
      durationString: "4 Days",
      travelStyle: "Nature",
      budget: 18000,
      status: "Completed",
      aiMatch: 89,
    },
  ] as Trip[],
  budgetOverview: {
    total: 25000,
    spent: 17450,
    remaining: 7550,
    usedPercentage: 72,
    breakdown: [
      { category: "Accommodation", amount: 8000, percentage: 32, color: "#F4A934" },
      { category: "Transport", amount: 4500, percentage: 18, color: "#E89425" },
      { category: "Food", amount: 2950, percentage: 12, color: "#087F5B" },
      { category: "Activities", amount: 2000, percentage: 8, color: "#8FE0C2" },
      { category: "Other", amount: 0, percentage: 0, color: "#1F4F42" },
    ],
  },
  aiInsight: {
    title: "Your AI Travel Insight ✨",
    description:
      "Based on your previous trips, you usually prefer 3–5 day nature escapes with a mid-range budget.",
    recommendation: {
      name: "Bandarban",
      match: 96,
      tags: ["Nature", "Adventure", "Mid-range", "3–5 Days"],
      image: "/assets/Bandarban/images 2.jfif",
    },
  },
  savedForLater: [
    {
      id: "saved-1",
      name: "Cox's Bazar",
      region: "Chittagong",
      image: "/assets/Coxs/cover-4.jpg",
      match: 94,
    },
    {
      id: "saved-2",
      name: "Sajek Valley",
      region: "Rangamati",
      image: "/assets/Sajek/cover-1.jpg",
      match: 91,
    },
    {
      id: "saved-3",
      name: "Bandarban",
      region: "Chittagong",
      image: "/assets/Bandarban/images 1.jfif",
      match: 89,
    },
    {
      id: "saved-4",
      name: "Saint Martin",
      region: "Cox's Bazar",
      image: "/assets/Saintmartin/cover-1.jpg",
      match: 88,
    },
  ] as SavedDestination[],
  recentActivity: [
    {
      id: "act-1",
      timeLabel: "Today",
      description: "Generated a new trip to Cox's Bazar",
      type: "generated",
    },
    {
      id: "act-2",
      timeLabel: "Yesterday",
      description: "Saved Sajek Valley",
      type: "saved",
    },
    {
      id: "act-3",
      timeLabel: "3 days ago",
      description: "Updated travel profile",
      type: "updated",
    },
    {
      id: "act-4",
      timeLabel: "5 days ago",
      description: "Completed your Bandarban trip",
      type: "completed",
    },
    {
      id: "act-5",
      timeLabel: "1 week ago",
      description: "Submitted a story for review",
      type: "submitted",
    },
  ] as ActivityItem[],
};
