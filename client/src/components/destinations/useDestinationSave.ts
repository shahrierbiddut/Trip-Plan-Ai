"use client";

import { useState } from "react";
import { useBookmarks } from "@/contexts/BookmarksContext";

export type SavableDestination = {
  slug: string;
  name: string;
  image?: string;
  heroImage?: string;
  country?: string;
  region?: string;
  rating?: number;
  estimatedBudget?: number;
  subtitle?: string;
  description?: string;
  tags?: string[];
  styles?: string[];
};

export function useDestinationSave(destination: SavableDestination) {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const [saving, setSaving] = useState(false);
  const saved = isBookmarked(destination.slug);

  const toggleSave = async () => {
    if (saving) return;
    setSaving(true);
    try {
      await toggleBookmark({
        ...destination,
        image: destination.image || destination.heroImage || "",
        region: destination.region || destination.country || "",
        styles: destination.styles || destination.tags || [],
      });
    } finally {
      setSaving(false);
    }
  };

  return { saved, saving, toggleSave };
}
