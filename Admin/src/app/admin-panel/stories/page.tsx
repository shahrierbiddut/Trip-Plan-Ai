"use client";

import React, { useEffect, useState } from "react";
import { Card, Button, Chip } from "@heroui/react";

type StoryStatus = "Pending" | "Approved" | "Rejected";

interface Story {
  _id: string;
  title: string;
  authorName: string;
  location: string;
  image: string;
  content: string;
  status: StoryStatus;
}

interface ApiStory {
  _id: string;
  title?: string;
  authorName?: string;
  location?: string;
  image?: string;
  content?: string;
  status?: string;
}

interface ApiResponse {
  success: boolean;
  data: ApiStory[];
}

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
).replace(/\/+$/, "");

export default function AdminStoriesPage() {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchStories = async () => {
    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/api/stories`);

      if (!response.ok) {
        throw new Error(`Failed to fetch stories: ${response.status}`);
      }

      const data: ApiResponse = await response.json();

      if (data.success && Array.isArray(data.data)) {
        const formattedStories: Story[] = data.data.map((story) => ({
          _id: story._id,
          title: story.title || "Untitled Story",
          authorName: story.authorName || "Anonymous",
          location: story.location || "Unknown Location",
          image: story.image || "/placeholder.jpg",
          content: story.content || "No content available.",
          status:
            story.status === "Approved" || story.status === "Rejected"
              ? story.status
              : "Pending",
        }));

        setStories(formattedStories);
      } else {
        setStories([]);
      }
    } catch (error) {
      console.error("Failed to fetch stories:", error);
      setStories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  const handleUpdateStatus = async (
    id: string,
    status: "Approved" | "Rejected"
  ) => {
    try {
      const response = await fetch(`${API_URL}/api/stories/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update story: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        await fetchStories();
      }
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this story?")) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/stories/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Failed to delete story: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        await fetchStories();
      }
    } catch (error) {
      console.error("Failed to delete story:", error);
    }
  };

  if (loading) {
    return (
      <div className="p-10 text-center">
        Loading stories...
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        Manage User Stories
      </h1>

      <div className="grid grid-cols-1 gap-4">
        {stories.map((story) => (
          <Card key={story._id} className="w-full">
            <div className="p-5 flex flex-col md:flex-row gap-6">
              {/* Story Image */}
              <div className="w-full md:w-48 h-32 shrink-0">
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>

              {/* Story Content */}
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2 gap-4">
                  <div>
                    <h3 className="text-xl font-bold">
                      {story.title}
                    </h3>

                    <p className="text-sm text-gray-500">
                      By {story.authorName} • {story.location}
                    </p>
                  </div>

                  <Chip
                    variant="soft"
                    className={
                      story.status === "Approved"
                        ? "bg-green-100 text-green-700"
                        : story.status === "Rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }
                  >
                    {story.status}
                  </Chip>
                </div>

                <p className="text-gray-700 text-sm mb-4 line-clamp-2">
                  {story.content}
                </p>

                {/* Actions */}
                <div className="flex gap-2 border-t pt-4">
                  {story.status !== "Approved" && (
                    <Button
                      size="sm"
                      className="bg-green-100 text-green-700 hover:bg-green-200"
                      onPress={() =>
                        handleUpdateStatus(story._id, "Approved")
                      }
                    >
                      Approve
                    </Button>
                  )}

                  {story.status !== "Rejected" && (
                    <Button
                      size="sm"
                      className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                      onPress={() =>
                        handleUpdateStatus(story._id, "Rejected")
                      }
                    >
                      Reject
                    </Button>
                  )}

                  <Button
                    size="sm"
                    className="bg-red-100 text-red-700 hover:bg-red-200"
                    onPress={() => handleDelete(story._id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}

        {stories.length === 0 && (
          <p className="text-center text-gray-500 py-10">
            No stories found.
          </p>
        )}
      </div>
    </div>
  );
}