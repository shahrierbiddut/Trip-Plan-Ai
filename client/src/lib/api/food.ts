const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/+$/, "");

export async function fetchFood() {
  const res = await fetch(`${API_URL}/api/food`);
  return res.json();
}

export async function fetchFoodBySlug(slug: string) {
  const res = await fetch(`${API_URL}/api/food/${slug}`);
  return res.json();
}
