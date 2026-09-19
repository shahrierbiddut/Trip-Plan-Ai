"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { BookOpen, Plus, Send, Wand2, Loader2 } from "lucide-react";

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

  // AI Generator state
  const [showAiGenerator, setShowAiGenerator] = useState(false);
  const [bulletPoints, setBulletPoints] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateStory = async () => {
    if (!bulletPoints) return;
    setIsGenerating(true);
    try {
      const response = await fetch(`${(process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/+$/, "")}/api/stories/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bulletPoints, location })
      });
      const data = await response.json();
      if (data.success && data.data?.content) {
        setContent(data.data.content);
        setShowAiGenerator(false);
        setBulletPoints("");
      } else {
        alert(data.message || "Failed to generate story");
      }
    } catch (error) {
      console.error("Failed to generate story:", error);
      alert("Error generating story. Try again.");
    } finally {
      setIsGenerating(false);
    }
  };

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
          className="bg-[#087F5B] text-white flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-[#063a2f] transition-colors"
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
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Your Story</label>
                  <button
                    type="button"
                    onClick={() => setShowAiGenerator(!showAiGenerator)}
                    className="flex items-center gap-1.5 text-xs font-semibold text-primary hover:bg-primary/10 px-2 py-1.5 rounded-md transition-colors"
                  >
                    <Wand2 size={14} />
                    Auto Generate with AI
                  </button>
                </div>

                {showAiGenerator && (
                  <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mb-2 animate-in fade-in slide-in-from-top-2 duration-300">
                    <label className="text-sm font-semibold text-gray-800 mb-2 block">
                      Give me some bullet points about your trip:
                    </label>
                    <textarea 
                      placeholder="e.g. Rained a lot, climbed the mountain, food was spicy but good..." 
                      value={bulletPoints}
                      onChange={(e) => setBulletPoints(e.target.value)}
                      rows={3}
                      className="w-full rounded-lg border-primary/30 focus:border-primary focus:ring-1 focus:ring-primary p-2.5 text-sm bg-white"
                    />
                    <div className="flex justify-end mt-3">
                      <button
                        type="button"
                        onClick={handleGenerateStory}
                        disabled={!bulletPoints || isGenerating}
                        className="flex items-center gap-2 bg-gradient-to-r from-primary to-[#063a2f] text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 disabled:opacity-50 transition-all shadow-sm"
                      >
                        {isGenerating ? (
                          <>
                            <Loader2 size={16} className="animate-spin" />
                            Generating...
                          </>
                        ) : (
                          <>
                            <Wand2 size={16} />
                            Generate Story
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}

                <textarea 
                  placeholder="Tell us about your amazing journey..." 
                  value={content} 
                  onChange={(e: any) => setContent(e.target.value)} 
                  rows={8}
                  required
                  className="w-full rounded-lg border border-gray-200 focus:border-primary p-3"
                />
              </div>
              <div className="flex justify-end">
                <button type="submit" className="bg-[#087F5B] text-white flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-[#063a2f] transition-colors">
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
                    className="object-cover w-full h-full rounded-b-none bg-gray-100"
                    src={story.image}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1000&auto=format&fit=crop';
                    }}
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
