import { serverQuery } from "../core/server";

// const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function fetchDestinationBySlug(slug: string) {
  return await serverQuery(`/api/destinations/${slug}`);
}

export async function fetchCardDestinations() {
  return await serverQuery(`/api/card-destinations`);
}