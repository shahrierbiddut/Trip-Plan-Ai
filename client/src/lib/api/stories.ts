import type { PublishedStory } from "@/types/publishedStory";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/+$/, "");

type ApiResponse<T> = {
  success: boolean;
  data: T;
  message?: string;
};

async function readApiResponse<T>(response: Response): Promise<ApiResponse<T>> {
  const payload = (await response.json()) as ApiResponse<T>;

  if (!response.ok || !payload.success) {
    throw new Error(payload.message || `Request failed with status ${response.status}`);
  }

  return payload;
}


export type StoryDraftPayload = {
  userId: string;
  authorName?: string | null;
  authorEmail?: string | null;
  name: string;
  destination: string;
  title: string;
  month: string;
  story: string;
  lesson: string;
  status: "Draft";
  clientDraftKey: string;
  image?: {
    name: string;
    type: string;
    size: number;
    dataUrl: string;
  } | null;
};

export async function saveStoryDraft(payload: StoryDraftPayload) {
  const response = await fetch(`${API_URL}/api/stories`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const result = await readApiResponse<Record<string, unknown>>(response);
  return result.data;
}

export async function fetchStories() {
  const response = await fetch(`${API_URL}/api/stories`);
  return response.json();
}

export async function fetchPublishedStories(): Promise<PublishedStory[]> {
  const response = await fetch(`${API_URL}/api/stories/published`, { cache: "no-store" });
  const payload = await readApiResponse<PublishedStory[]>(response);
  return Array.isArray(payload.data) ? payload.data : [];
}

export async function fetchPublishedStoryBySlug(slug: string): Promise<PublishedStory | null> {
  const response = await fetch(`${API_URL}/api/stories/published/${encodeURIComponent(slug)}`, {
    cache: "no-store",
  });

  if (response.status === 404) return null;

  const payload = await readApiResponse<PublishedStory>(response);
  return payload.data ?? null;
}
