"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useSession } from "@/lib/auth-client";

export interface Bookmark {
  _id?: string;
  userId: string;
  destinationSlug: string;
  destinationData: any; // Storing the basic destination info
  createdAt: string;
}

interface BookmarksContextType {
  bookmarks: Bookmark[];
  isBookmarked: (slug: string) => boolean;
  toggleBookmark: (destination: any) => Promise<void>;
  loading: boolean;
}

const BookmarksContext = createContext<BookmarksContextType | undefined>(undefined);

export function BookmarksProvider({ children }: { children: ReactNode }) {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setBookmarks([]);
      setLoading(false);
      return;
    }

    const fetchBookmarks = async () => {
      try {
        const res = await fetch(`${(process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/+$/, "")}/api/bookmarks/${userId}`);
        const data = await res.json();
        if (data.success) {
          setBookmarks(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch bookmarks", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, [userId]);

  const isBookmarked = (slug: string) => {
    return bookmarks.some((b) => b.destinationSlug === slug);
  };

  const toggleBookmark = async (destination: any) => {
    if (!userId) {
      // Typically you'd redirect to login, or show a toast here
      alert("Please login to save destinations");
      return;
    }

    const slug = destination.slug || (destination as any).id;
    const existing = bookmarks.find((b) => b.destinationSlug === slug);

    try {
      if (existing) {
        // Optimistic UI update
        setBookmarks((prev) => prev.filter((b) => b.destinationSlug !== slug));
        
        // Server delete
        await fetch(`${(process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/+$/, "")}/api/bookmarks/${existing._id}`, {
          method: "DELETE",
        });
      } else {
        const newBookmark = {
          userId,
          destinationSlug: slug,
          destinationData: destination,
          createdAt: new Date().toISOString(),
        };

        // Server add
        const res = await fetch(`${(process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/+$/, "")}/api/bookmarks`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newBookmark),
        });
        const data = await res.json();
        
        if (data.success) {
          setBookmarks((prev) => [...prev, data.data]);
        }
      }
    } catch (error) {
      console.error("Failed to toggle bookmark", error);
      // Revert if error occurs? Handled simply for now.
    }
  };

  return (
    <BookmarksContext.Provider value={{ bookmarks, isBookmarked, toggleBookmark, loading }}>
      {children}
    </BookmarksContext.Provider>
  );
}

export function useBookmarks() {
  const context = useContext(BookmarksContext);
  if (context === undefined) {
    throw new Error("useBookmarks must be used within a BookmarksProvider");
  }
  return context;
}
