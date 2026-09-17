/* ============================================================
   TRENDING STYLES DATA
   Trending travel styles for the "Trending This Season" section.
   Images use existing photos from public/assets/.
============================================================ */

export type TrendingStyle = {
  id: string;
  title: string;
  destinations: string[];
  destinationCount: number;
  bestFor: string;
  image: string;
  href: string;
};

export const trendingStyles: TrendingStyle[] = [
  {
    id: "beach-escapes",
    title: "Beach Escapes",
    destinations: ["Cox's Bazar", "Saint Martin", "Kuakata"],
    destinationCount: 12,
    bestFor: "Relaxation",
    image: "/assets/Coxs/cover-2.jpg",
    href: "/destinations?category=beach",
  },
  {
    id: "mountain-adventures",
    title: "Mountain Adventures",
    destinations: ["Sajek", "Bandarban", "Khagrachari"],
    destinationCount: 9,
    bestFor: "Adventure",
    image: "/assets/Sajek/cover-2.jpg",
    href: "/destinations?category=adventure",
  },
  {
    id: "nature-retreats",
    title: "Nature Retreats",
    destinations: ["Ratargul", "Jaflong", "Madhabkunda"],
    destinationCount: 14,
    bestFor: "Nature",
    image: "/assets/sreemangal/image 3.webp",
    href: "/destinations?category=nature",
  },
  {
    id: "cultural-journeys",
    title: "Cultural Journeys",
    destinations: ["Sonargaon", "Paharpur", "Bagerhat"],
    destinationCount: 8,
    bestFor: "Culture",
    image: "/assets/Sundarban/cover-1.jpg",
    href: "/destinations?category=culture",
  },
];
