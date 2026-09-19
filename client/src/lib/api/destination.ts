const url = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/+$/, "");

export async function fetchDestinations() {
  const response = await fetch(`${url}/api/destinations`);
  const data = await response.json();
  if (!data.success) return null;
  return data.data.map((d: any) => ({
    ...d,
    image: d.heroImage || d.image || "",
    styles: d.styles || d.tags || ["Nature", "Adventure"]
  }));
}

export async function fetchDestinationBySlug(slug: string) {
  const response = await fetch(`${url}/api/destinations/${slug}`);
  const data = await response.json();
  if (!data.success || !data.data) return null;
  return {
    ...data.data,
    image: data.data.heroImage || data.data.image || "",
    styles: data.data.styles || data.data.tags || ["Nature", "Adventure"]
  };
}

export async function fetchCardDestinations() {
  // /api/card-destinations doesn't exist — reuse /api/destinations
  const response = await fetch(`${url}/api/destinations`);
  const data = await response.json();
  if (!data.success) return null;
  return data.data.map((d: any) => ({
    ...d,
    image: d.heroImage || d.image || "",
    styles: d.styles || d.tags || ["Nature", "Adventure"]
  }));
}

export async function fetchPlaceBySlug(slug: string) {
  const response = await fetch(`${url}/api/destinations/place/${slug}`);
  const data = await response.json();
  return data.success ? data.data : null;
}