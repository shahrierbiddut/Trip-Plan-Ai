"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { toast } from "react-hot-toast";
import { authClient, useSession } from "@/lib/auth-client";
import { API_BASE_URL } from "@/lib/api/config";

export interface Bookmark {
  _id: string;
  userId: string;
  destinationSlug: string;
  destinationData: Record<string, any>;
  createdAt: string;
}

interface BookmarksContextType {
  bookmarks: Bookmark[];
  isBookmarked: (slug: string) => boolean;
  toggleBookmark: (destination: Record<string, any>) => Promise<void>;
  loading: boolean;
  error: string | null;
  refreshBookmarks: () => Promise<void>;
}

const BookmarksContext = createContext<BookmarksContextType | undefined>(undefined);

function uniqueBookmarks(bookmarks: Bookmark[]): Bookmark[] {
  const seen = new Set<string>();
  return bookmarks.filter((bookmark) => {
    if (seen.has(bookmark.destinationSlug)) return false;
    seen.add(bookmark.destinationSlug);
    return true;
  });
}

export function BookmarksProvider({ children }: { children: ReactNode }) {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const requestVersion = useRef(0);
  const pendingSlugs = useRef(new Set<string>());

  async function fetchBookmarksFor(id: string, version: number) {
    const response = await fetch(`${API_BASE_URL}/api/bookmarks/${encodeURIComponent(id)}`, {
      credentials: "include",
      cache: "no-store",
    });
    if (!response.ok) throw new Error(`Bookmark request failed (${response.status})`);
    const result: { success: boolean; data?: Bookmark[] } = await response.json();
    if (!result.success || !Array.isArray(result.data)) throw new Error("Invalid bookmarks response");
    if (version === requestVersion.current) {
      setBookmarks(uniqueBookmarks(result.data));
      setError(null);
    }
  }

  useEffect(() => {
    const version = ++requestVersion.current;
    if (!userId) {
      setBookmarks([]);
      setError(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    fetchBookmarksFor(userId, version)
      .catch((cause: unknown) => {
        if (version !== requestVersion.current) return;
        console.error("Failed to fetch bookmarks", cause);
        setError("Could not load saved destinations. Please try again.");
      })
      .finally(() => {
        if (version === requestVersion.current) setLoading(false);
      });

    return () => { requestVersion.current++; };
  }, [userId]);

  const refreshBookmarks = async () => {
    if (!userId) return;
    const version = ++requestVersion.current;
    setLoading(true);
    try {
      await fetchBookmarksFor(userId, version);
    } catch (cause) {
      console.error("Failed to refresh bookmarks", cause);
      setError("Could not load saved destinations. Please try again.");
    } finally {
      if (version === requestVersion.current) setLoading(false);
    }
  };

  const isBookmarked = (slug: string) => bookmarks.some((b) => b.destinationSlug === slug);

  const toggleBookmark = async (destination: Record<string, any>) => {
    const slug = destination.slug || destination.id;
    if (typeof slug !== "string" || !slug.trim()) {
      toast.error("This destination cannot be saved right now.");
      return;
    }
    if (pendingSlugs.current.has(slug)) return;

    pendingSlugs.current.add(slug);
    let mutationVersion: number | undefined;
    try {
      // A user can click the heart before useSession has finished loading.
      const activeUserId = userId || (await authClient.getSession()).data?.user?.id;
      if (!activeUserId) {
        toast.error("Please log in to save destinations.");
        return;
      }

      const existing = bookmarks.find((b) => b.destinationSlug === slug);
      const response = existing
        ? await fetch(`${API_BASE_URL}/api/bookmarks/${existing._id}`, {
            method: "DELETE",
            credentials: "include",
          })
        : await fetch(`${API_BASE_URL}/api/bookmarks`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: activeUserId, destinationSlug: slug, destinationData: destination }),
          });

      const result: { success?: boolean; message?: string } = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.message || `Bookmark update failed (${response.status})`);
      }

      // Read back the persisted list so the heart and dashboard show the same data.
      mutationVersion = ++requestVersion.current;
      await fetchBookmarksFor(activeUserId, mutationVersion);
      toast.success(existing ? "Removed from saved destinations" : "Saved to your dashboard");
    } catch (cause) {
      console.error("Failed to toggle bookmark", cause);
      toast.error("Could not update saved destinations. Please try again.");
    } finally {
      pendingSlugs.current.delete(slug);
      if (mutationVersion === requestVersion.current) setLoading(false);
    }
  };

  return (
    <BookmarksContext.Provider value={{ bookmarks, isBookmarked, toggleBookmark, loading, error, refreshBookmarks }}>
      {children}
    </BookmarksContext.Provider>
  );
}

export function useBookmarks() {
  const context = useContext(BookmarksContext);
  if (!context) throw new Error("useBookmarks must be used within a BookmarksProvider");
  return context;
}
