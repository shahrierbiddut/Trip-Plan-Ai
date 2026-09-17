import type { TourPackage } from "@/types/tour-package";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

type ApiResponse<T> = {
  success: boolean;
  message?: string;
  data: T;
};

export async function fetchTourPackages(filters?: {
  featured?: boolean;
  upcoming?: boolean;
}): Promise<TourPackage[]> {
  const query = new URLSearchParams();

  if (filters?.featured !== undefined) {
    query.set("featured", String(filters.featured));
  }
  if (filters?.upcoming !== undefined) {
    query.set("upcoming", String(filters.upcoming));
  }

  const suffix = query.size ? `?${query.toString()}` : "";
  const response = await fetch(`${API_URL}/api/tour-packages${suffix}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Tour packages could not be loaded.");
  }

  const result = (await response.json()) as ApiResponse<TourPackage[]>;

  if (!result.success || !Array.isArray(result.data)) {
    throw new Error(result.message || "Tour packages could not be loaded.");
  }

  return result.data;
}

export async function fetchTourPackageBySlug(
  slug: string
): Promise<TourPackage | null> {
  const response = await fetch(
    `${API_URL}/api/tour-packages/${encodeURIComponent(slug)}`,
    { cache: "no-store" }
  );

  if (response.status === 404) return null;

  if (!response.ok) {
    throw new Error("Tour package details could not be loaded.");
  }

  const result = (await response.json()) as ApiResponse<TourPackage>;
  return result.success ? result.data : null;
}
