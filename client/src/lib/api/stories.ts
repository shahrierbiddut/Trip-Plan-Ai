const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/+$/, "");

export async function fetchStories() {
  const res = await fetch(`${API_URL}/api/stories`);
  return res.json();
}
