const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/+$/, "");

export async function fetchHotels() {
  const res = await fetch(`${API_URL}/api/hotels`);
  return res.json();
}

export async function fetchHotelBySlug(slug: string) {
  const res = await fetch(`${API_URL}/api/hotels/${slug}`);
  return res.json();
}
