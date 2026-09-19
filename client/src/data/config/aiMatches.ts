/* ============================================================
   AI MATCH / MOOD RECOMMENDATION CONFIG

   Maps mood selections to travel style recommendations.
   Separated from JSX so it can easily be replaced with
   a real AI API later.
============================================================ */

import type { LucideIcon } from "lucide-react";
import {
  Camera,
  Heart,
  Leaf,
  Mountain,
  UsersRound,
  Waves,
} from "lucide-react";

/* ============================================================
   TYPES
============================================================ */

export type Mood = {
  id: string;
  label: string;
  icon: LucideIcon;
  color: string;
  activeColor: string;
};

export type AIMatchResult = {
  matchPercentage: number;
  travelStyle: string;
  bestDestinations: string[];
  bestDuration: string;
  estimatedBudget: string;
  explanation: string;
  image: string;
};

/* ============================================================
   MOOD OPTIONS
============================================================ */

export const moods: Mood[] = [
  { id: "relaxed", label: "Relaxed", icon: Waves, color: "text-[#087F5B]", activeColor: "text-[#087F5B]" },
  { id: "adventurous", label: "Adventurous", icon: Mountain, color: "text-[#4A3B32]", activeColor: "text-[#2D241E]" },
  { id: "romantic", label: "Romantic", icon: Heart, color: "text-[#E94E5A]", activeColor: "text-[#D32F2F]" },
  { id: "connected", label: "Connected", icon: UsersRound, color: "text-[#087F5B]", activeColor: "text-[#087F5B]" },
  { id: "inspired", label: "Inspired", icon: Camera, color: "text-[#087F5B]", activeColor: "text-[#087F5B]" },
  { id: "recharged", label: "Recharged", icon: Leaf, color: "text-[#087F5B]", activeColor: "text-[#087F5B]" },
];

/* ============================================================
   MOOD → RECOMMENDATION MAP
============================================================ */

const moodRecommendations: Record<string, AIMatchResult> = {
  relaxed: {
    matchPercentage: 94,
    travelStyle: "Beach Escape",
    bestDestinations: ["Cox's Bazar", "Saint Martin", "Kuakata"],
    bestDuration: "3–5 Days",
    estimatedBudget: "৳10,000 – ৳18,000",
    explanation:
      "You prefer peaceful environments, coastal scenery and slower-paced experiences.",
    image: "/assets/Coxs/cover-1.jpg",
  },
  adventurous: {
    matchPercentage: 96,
    travelStyle: "Mountain Adventure",
    bestDestinations: ["Bandarban", "Sajek", "Khagrachari"],
    bestDuration: "3–5 Days",
    estimatedBudget: "৳8,000 – ৳15,000",
    explanation:
      "You thrive on exploration, rugged terrain and unique outdoor challenges.",
    image: "/assets/Sajek/cover-2.jpg",
  },
  romantic: {
    matchPercentage: 92,
    travelStyle: "Romantic Getaway",
    bestDestinations: ["Saint Martin", "Sajek Valley", "Cox's Bazar"],
    bestDuration: "2–4 Days",
    estimatedBudget: "৳12,000 – ৳22,000",
    explanation:
      "You value intimate settings, scenic sunsets and shared experiences with someone special.",
    image: "/assets/Saintmartin/cover-1.jpg",
  },
  connected: {
    matchPercentage: 90,
    travelStyle: "Cultural Journey",
    bestDestinations: ["Sonargaon", "Bagerhat", "Paharpur"],
    bestDuration: "3–5 Days",
    estimatedBudget: "৳7,000 – ৳14,000",
    explanation:
      "You seek meaningful connections with local communities, heritage sites and cultural traditions.",
    image: "/assets/Sundarban/cover-1.jpg",
  },
  inspired: {
    matchPercentage: 93,
    travelStyle: "Nature Escape",
    bestDestinations: ["Sajek Valley", "Bandarban", "Ratargul"],
    bestDuration: "3–5 Days",
    estimatedBudget: "৳8,000 – ৳15,000",
    explanation:
      "You prefer peaceful environments, natural scenery and slower-paced experiences.",
    image: "/assets/Sajek/cover-1.jpg",
  },
  recharged: {
    matchPercentage: 91,
    travelStyle: "Nature Retreat",
    bestDestinations: ["Sreemangal", "Jaflong", "Sylhet"],
    bestDuration: "2–4 Days",
    estimatedBudget: "৳6,000 – ৳12,000",
    explanation:
      "You need a reset—fresh air, green landscapes and a break from the everyday routine.",
    image: "/assets/sreemangal/image 3.webp",
  },
};

/* ============================================================
   PUBLIC API
============================================================ */

export function getRecommendation(moodId: string): AIMatchResult | null {
  return moodRecommendations[moodId] ?? null;
}
