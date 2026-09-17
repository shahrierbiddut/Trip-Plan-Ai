"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { BookOpen, Plus, Send } from "lucide-react";

export default function StoriesPage() {
  const [stories, setStories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isWriting, setIsWriting] = useState(false);
  const { data: session } = useSession();

  // Form state
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [location, setLocation] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const fetchStories = async (userId: string) => {
    try {
      const response = await fetch(`${(process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/+$/, "")}/api/stories/user/${userId}`);
      const data = await response.json();
      if (data.success) setStories(data.data);
    } catch (error) {
      console.error("Failed to fetch stories", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session?.user?.id) {
      fetchStories(session.user.id);
    }
  }, [session]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content || !session?.user?.id) return;

    try {
      const response = await fetch(`${(process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/+$/, "")}/api/stories`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: session.user.id,
          authorName: session.user.name,
          title,
          content,
          location,
          image: imageUrl || "/images/placeholder.jpg",
        })
      });
      const data = await response.json();
      if (data.success) {
        setStories([data.data, ...stories]);
        setIsWriting(false);
        setTitle("");
        setContent("");
        setLocation("");
        setImageUrl("");
      }
    } catch (error) {
      console.error("Failed to submit story", error);
    }
  };

  if (loading) return <div className="p-10 text-center">Loading stories...</div>;

  return (
    <div className="p-6 h-full w-full max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-[#14151a] flex items-center gap-2">
          <BookOpen className="text-primary" />
          My Travel Stories
        </h1>
        <button 
          onClick={() => setIsWriting(!isWriting)}
          className="bg-primary text-white flex items-center gap-2 px-4 py-2 rounded-lg"
        >
          <Plus size={18} />
          {isWriting ? "Cancel" : "Write a Story"}
        </button>
      </div>

      {isWriting && (
        <div className="mb-8 border-2 border-primary/20 shadow-md bg-white rounded-2xl overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Share Your Experience</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Story Title</label>
                <input 
                  type="text"
                  placeholder="E.g. A Magical Weekend in Sylhet" 
                  value={title} 
                  onChange={(e: any) => setTitle(e.target.value)} 
                  required
                  className="w-full rounded-lg border p-2"
                />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="text-sm font-medium">Location</label>
                  <input 
                    type="text"
                    placeholder="E.g. Sylhet, Bangladesh" 
                    value={location} 
                    onChange={(e: any) => setLocation(e.target.value)} 
                    className="w-full rounded-lg border p-2"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-sm font-medium">Cover Image URL (Optional)</label>
                  <input 
                    type="text"
                    placeholder="https://example.com/image.jpg" 
                    value={imageUrl} 
                    onChange={(e: any) => setImageUrl(e.target.value)} 
                    className="w-full rounded-lg border p-2"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Your Story</label>
                <textarea 
                  placeholder="Tell us about your amazing journey..." 
                  value={content} 
                  onChange={(e: any) => setContent(e.target.value)} 
                  rows={6}
                  required
                  className="w-full rounded-lg border p-2"
                />
              </div>
              <div className="flex justify-end">
                <button type="submit" className="bg-primary text-white flex items-center gap-2 px-4 py-2 rounded-lg">
                  <Send size={18} />
                  Submit for Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}


      {stories.length === 0 && !isWriting ? (
        <div className="text-center text-gray-500 py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
          <BookOpen className="mx-auto h-12 w-12 text-gray-300 mb-3" />
          <p className="text-lg font-medium text-gray-900">No stories yet</p>
          <p className="mt-1">Share your first travel experience with the community!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {stories.map(story => (
            <div key={story._id} className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-0">
                <div className="relative h-48 w-full">
                  <img
                    alt={story.title}
                    className="object-cover w-full h-full rounded-b-none"
                    src={story.image}
                  />
                  <div className="absolute top-3 right-3 z-10">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm ${
                      story.status === 'Approved' ? 'bg-green-500' :
                      story.status === 'Rejected' ? 'bg-red-500' : 'bg-yellow-500'
                    }`}>
                      {story.status}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-sm text-primary font-semibold mb-1">{story.location}</p>
                  <h3 className="font-bold text-xl mb-2 line-clamp-1">{story.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-4">{story.content}</p>
                  <p className="text-xs text-gray-400">Submitted on {new Date(story.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
