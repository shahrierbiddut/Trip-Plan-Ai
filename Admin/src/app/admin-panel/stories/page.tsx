"use client";
import React, { useEffect, useState } from "react";
import { Card, CardBody, Button, Chip } from "@heroui/react";

export default function AdminStoriesPage() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStories = async () => {
    try {
      const response = await fetch(`${(process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/+$/, "")}/api/stories`);
      const data = await response.json();
      if (data.success) {
        setStories(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch stories", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  const handleUpdateStatus = async (id, status) => {
    try {
      const response = await fetch(`${(process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/+$/, "")}/api/stories/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      });
      const data = await response.json();
      if (data.success) {
        fetchStories(); // Refresh list
      }
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this story?")) return;
    try {
      const response = await fetch(`${(process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/+$/, "")}/api/stories/${id}`, {
        method: "DELETE"
      });
      const data = await response.json();
      if (data.success) {
        fetchStories(); // Refresh list
      }
    } catch (error) {
      console.error("Failed to delete story", error);
    }
  };

  if (loading) return <div className="p-10 text-center">Loading stories...</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Manage User Stories</h1>
      <div className="grid grid-cols-1 gap-4">
        {stories.map(story => (
          <Card key={story._id} className="w-full">
            <CardBody className="p-5 flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-48 h-32 shrink-0">
                <img src={story.image} alt={story.title} className="w-full h-full object-cover rounded-xl" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xl font-bold">{story.title}</h3>
                    <p className="text-sm text-gray-500">By {story.authorName} • {story.location}</p>
                  </div>
                  <Chip color={
                    story.status === 'Approved' ? 'success' :
                    story.status === 'Rejected' ? 'danger' : 'warning'
                  } variant="flat">
                    {story.status}
                  </Chip>
                </div>
                <p className="text-gray-700 text-sm mb-4 line-clamp-2">{story.content}</p>
                <div className="flex gap-2 border-t pt-4">
                  {story.status !== 'Approved' && (
                    <Button size="sm" color="success" variant="flat" onPress={() => handleUpdateStatus(story._id, "Approved")}>
                      Approve
                    </Button>
                  )}
                  {story.status !== 'Rejected' && (
                    <Button size="sm" color="warning" variant="flat" onPress={() => handleUpdateStatus(story._id, "Rejected")}>
                      Reject
                    </Button>
                  )}
                  <Button size="sm" color="danger" variant="flat" onPress={() => handleDelete(story._id)}>
                    Delete
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
        {stories.length === 0 && <p className="text-center text-gray-500 py-10">No stories found.</p>}
      </div>
    </div>
  );
}

