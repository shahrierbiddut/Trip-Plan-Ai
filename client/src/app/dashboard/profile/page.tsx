"use client";

import React, { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { 
  User, Mail, Phone, MapPin, Briefcase, Camera, 
  Settings, Shield, Heart, Compass, Star, Map, 
  CheckCircle2, AlertCircle, Save, X, Edit2, Key, LogOut 
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

// Travel Style presets
const TRAVEL_STYLES = [
  { id: "Adventure", icon: "🧗" },
  { id: "Beach & Coastal", icon: "🏖️" },
  { id: "Cultural & Heritage", icon: "🏛️" },
  { id: "Nature & Wildlife", icon: "🌿" },
  { id: "Luxury & Spa", icon: "✨" },
  { id: "Budget Backpacking", icon: "🎒" },
  { id: "Foodie & Culinary", icon: "🍜" },
  { id: "Romantic Getaway", icon: "🍷" }
];

const DIETARY = [
  "Halal", "Vegetarian", "Vegan", "Seafood", "No Restrictions"
];

const COVER_PRESETS = [
  "/assets/Coxs/cover-1.jpg",
  "/assets/sreemangal/cover-1.webp",
  "/assets/Sajek/cover-1.jpg",
  "/assets/Sundarban/cover-1.jpg",
  "/assets/Saintmartin/cover-1.jpg"
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<"personal" | "preferences" | "security">("personal");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // Base Auth Session Data
  const [sessionUser, setSessionUser] = useState<any>(null);
  
  // Editable Form State
  const [formData, setFormData] = useState<any>({
    name: "",
    phone: "",
    bio: "",
    location: "",
    passportNationality: "",
    emergencyContact: { name: "", phone: "", relation: "" },
    travelPreferences: {
      travelStyle: [],
      preferredPace: "Balanced",
      budgetTier: "Comfortable",
      dietary: ["No Restrictions"]
    },
    coverImage: COVER_PRESETS[1],
    image: ""
  });
  
  // Real stats from DB
  const [stats, setStats] = useState({
    tripsCount: 0,
    bookmarksCount: 0,
    reviewsCount: 0,
    storiesCount: 0
  });

  // Password Change State
  const [passwordState, setPasswordState] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  // Fetch full profile from our DB
  const fetchProfile = async () => {
    try {
      setLoading(true);
      const { data: session } = await authClient.getSession();
      if (!session?.user?.id) return;
      setSessionUser(session.user);
      
      const url = process.env.NEXT_PUBLIC_API_URL?.replace("localhost", "127.0.0.1") || "http://127.0.0.1:5000";
      const response = await fetch(`${url}/api/users/${session.user.id}`);
      
      if (response.ok) {
        const resData = await response.json();
        if (resData.success && resData.data) {
          const user = resData.data;
          
          setFormData({
            name: user.name || session.user.name || "",
            phone: user.phone || "",
            bio: user.bio || "",
            location: user.location || "",
            passportNationality: user.passportNationality || "",
            emergencyContact: user.emergencyContact || { name: "", phone: "", relation: "" },
            travelPreferences: user.travelPreferences || {
              travelStyle: [], preferredPace: "Balanced", budgetTier: "Comfortable", dietary: ["No Restrictions"]
            },
            coverImage: user.coverImage || COVER_PRESETS[1],
            image: user.image || session.user.image || ""
          });

          if (user.stats) {
            setStats(user.stats);
          }
        }
      }
    } catch (error) {
      console.error("Failed to fetch profile", error);
      toast.error("Failed to load profile data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleSave = async () => {
    if (!sessionUser?.id) return;
    setSaving(true);
    
    try {
      const url = process.env.NEXT_PUBLIC_API_URL?.replace("localhost", "127.0.0.1") || "http://127.0.0.1:5000";
      
      const response = await fetch(`${url}/api/users/${sessionUser.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      
      const resData = await response.json();
      
      if (resData.success) {
        toast.success("Profile updated successfully!");
        
        // Try to update better-auth session if name/image changed
        if (formData.name !== sessionUser.name || formData.image !== sessionUser.image) {
          try {
             await authClient.updateUser({
                name: formData.name,
                image: formData.image
             });
          } catch (e) {
             console.error("Better-Auth update skipped", e);
          }
        }
      } else {
        toast.error(resData.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Save error", error);
      toast.error("An error occurred while saving");
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordState.newPassword !== passwordState.confirmPassword) {
      return toast.error("New passwords do not match!");
    }
    
    const loadingToast = toast.loading("Updating password...");
    try {
      const { error } = await authClient.changePassword({
        currentPassword: passwordState.currentPassword,
        newPassword: passwordState.newPassword,
        revokeOtherSessions: true
      });
      
      if (error) {
        toast.error(error.message || "Failed to change password", { id: loadingToast });
      } else {
        toast.success("Password changed successfully", { id: loadingToast });
        setPasswordState({ currentPassword: "", newPassword: "", confirmPassword: "" });
      }
    } catch (err) {
      toast.error("An error occurred", { id: loadingToast });
    }
  };

  const toggleTravelStyle = (styleId: string) => {
    setFormData((prev: any) => {
      const current = prev.travelPreferences.travelStyle || [];
      const updated = current.includes(styleId)
        ? current.filter((s: string) => s !== styleId)
        : [...current, styleId];
        
      return {
        ...prev,
        travelPreferences: { ...prev.travelPreferences, travelStyle: updated }
      };
    });
  };

  const toggleDietary = (diet: string) => {
    setFormData((prev: any) => {
      let current = prev.travelPreferences.dietary || [];
      
      // If "No Restrictions" is selected, clear others
      if (diet === "No Restrictions") {
        current = ["No Restrictions"];
      } else {
        current = current.filter((d: string) => d !== "No Restrictions");
        if (current.includes(diet)) {
          current = current.filter((d: string) => d !== diet);
        } else {
          current.push(diet);
        }
      }
      
      if (current.length === 0) current = ["No Restrictions"];
      
      return {
        ...prev,
        travelPreferences: { ...prev.travelPreferences, dietary: current }
      };
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image must be less than 5MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center bg-[#F7F7F2]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#087F5B]/20 border-t-[#087F5B] rounded-full animate-spin" />
          <p className="text-gray-500 font-medium">Loading your travel profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full bg-[#F7F7F2] pb-32 lg:pb-48 relative">
      <Toaster position="top-center" />
      
      {/* Dynamic Cover Banner */}
      <div className="relative h-[240px] md:h-[300px] w-full group">
        <img 
          src={formData.coverImage} 
          alt="Profile Cover" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Cover Photo Selector (Hover) */}
        <div className="absolute top-4 right-4 md:right-8 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-white/90 backdrop-blur-md p-2 rounded-xl shadow-lg flex items-center gap-2 border border-white/20">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider px-2">Cover:</span>
            {COVER_PRESETS.map((src, i) => (
              <button 
                key={i}
                onClick={() => setFormData({...formData, coverImage: src})}
                className={`w-8 h-8 rounded-lg overflow-hidden border-2 transition-all ${formData.coverImage === src ? 'border-[#087F5B] scale-110' : 'border-transparent hover:scale-105'}`}
              >
                <img src={src} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 relative -mt-[80px]">
        
        {/* Profile Header Card */}
        <div className="bg-white rounded-3xl shadow-md border border-gray-100 p-6 sm:p-8 flex flex-col md:flex-row gap-6 md:items-end mb-8 relative z-10">
          
          {/* Avatar Section */}
          <div className="relative shrink-0 -mt-20">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-xl overflow-hidden bg-gray-100 relative group">
              {formData.image ? (
                <img src={formData.image} alt={formData.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#087F5B]/20 to-[#087F5B]/5">
                  <User size={64} className="text-[#087F5B]/40" />
                </div>
              )}
              {/* Avatar Edit Overlay */}
              <label className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <Camera className="text-white" size={28} />
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleImageUpload} 
                />
              </label>
            </div>
            {/* Online/Verified Badge */}
            <div className="absolute bottom-2 right-2 md:bottom-4 md:right-4 w-6 h-6 bg-emerald-500 border-4 border-white rounded-full shadow-sm" title="Online" />
          </div>
          
          {/* User Info & Actions */}
          <div className="flex-1 pb-2">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold font-serif text-gray-900 flex items-center gap-2">
                  {formData.name || "Explorer"}
                  {sessionUser?.emailVerified && (
                    <span title="Verified Account">
                      <CheckCircle2 size={24} className="text-[#087F5B] shrink-0" />
                    </span>
                  )}
                </h1>
                <p className="text-gray-500 font-medium mt-1 flex items-center gap-2">
                  <Mail size={16} /> {sessionUser?.email}
                </p>
                <div className="flex flex-wrap items-center gap-2 mt-3">
                  <span className="bg-[#F4A934]/15 text-[#D9861F] text-xs font-bold px-3 py-1 rounded-full border border-[#F4A934]/30 uppercase tracking-wide">
                    Level 3 Globetrotter
                  </span>
                  {formData.location && (
                    <span className="bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
                      <MapPin size={12} /> {formData.location}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="flex flex-col items-end gap-3">
                {/* Top Quick Stats */}
                <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-100 w-full sm:w-auto justify-between">
                  <div className="text-center">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Trips</p>
                    <p className="text-xl font-bold text-[#087F5B]">{stats.tripsCount}</p>
                  </div>
                  <div className="w-px h-8 bg-gray-200" />
                  <div className="text-center">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Saved</p>
                    <p className="text-xl font-bold text-sky-600">{stats.bookmarksCount}</p>
                  </div>
                  <div className="w-px h-8 bg-gray-200" />
                  <div className="text-center">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Reviews</p>
                    <p className="text-xl font-bold text-amber-500">{stats.reviewsCount}</p>
                  </div>
                </div>

                {/* Save Actions */}
                {activeTab !== "security" && (
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => fetchProfile()}
                      className="flex-1 sm:flex-none px-4 py-2 text-xs font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all"
                    >
                      Discard
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={saving}
                      className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2 text-xs font-bold text-white bg-gradient-to-r from-[#073D31] to-[#087F5B] hover:from-[#063026] hover:to-[#066548] rounded-xl shadow-md shadow-[#087F5B]/20 transition-all disabled:opacity-70"
                    >
                      {saving ? (
                        <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <Save size={14} />
                      )}
                      <span>{saving ? "Saving..." : "Save Profile"}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Two Column Layout for Tabs and Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Sidebar Navigation */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 sticky top-28">
              <nav className="flex flex-col gap-2">
                <button
                  onClick={() => setActiveTab("personal")}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-bold transition-all ${
                    activeTab === "personal" 
                      ? "bg-[#087F5B] text-white shadow-md shadow-[#087F5B]/20" 
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <User size={18} /> Personal Info
                </button>
                <button
                  onClick={() => setActiveTab("preferences")}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-bold transition-all ${
                    activeTab === "preferences" 
                      ? "bg-[#087F5B] text-white shadow-md shadow-[#087F5B]/20" 
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <Compass size={18} /> Travel Preferences
                </button>
                <button
                  onClick={() => setActiveTab("security")}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-bold transition-all ${
                    activeTab === "security" 
                      ? "bg-[#087F5B] text-white shadow-md shadow-[#087F5B]/20" 
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <Shield size={18} /> Account & Security
                </button>
              </nav>

              {/* Decorative Travel Achievement */}
              <div className="mt-8 p-4 bg-gradient-to-br from-[#F4A934]/10 to-amber-50 rounded-2xl border border-[#F4A934]/20 text-center">
                <div className="w-12 h-12 bg-[#F4A934]/20 rounded-full flex items-center justify-center mx-auto mb-3 text-[#D9861F]">
                  <Star size={24} className="fill-current" />
                </div>
                <h4 className="text-sm font-bold text-gray-900 mb-1">Explorer Badge</h4>
                <p className="text-[11px] text-gray-500">You&apos;ve unlocked 3 out of 10 achievements.</p>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-9">
            
            {/* 1. PERSONAL INFO TAB */}
            {activeTab === "personal" && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-100">
                  <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                    <User size={20} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Personal Information</h2>
                    <p className="text-xs text-gray-500 mt-0.5">Update your basic profile and contact details.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Full Name</label>
                    <input 
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#087F5B] focus:ring-1 focus:ring-[#087F5B] transition-all"
                      placeholder="Your full name"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Phone Number</label>
                    <input 
                      type="text"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#087F5B] transition-all"
                      placeholder="+880 1..."
                    />
                  </div>

                  {/* Location */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">City / Location</label>
                    <input 
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#087F5B] transition-all"
                      placeholder="e.g. Dhaka, Bangladesh"
                    />
                  </div>

                  {/* Passport Nationality */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Nationality</label>
                    <input 
                      type="text"
                      value={formData.passportNationality}
                      onChange={(e) => setFormData({...formData, passportNationality: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#087F5B] transition-all"
                      placeholder="For visa & travel tips"
                    />
                  </div>

                  {/* Bio */}
                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Traveler Bio</label>
                    <textarea 
                      value={formData.bio}
                      onChange={(e) => setFormData({...formData, bio: e.target.value})}
                      rows={3}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#087F5B] transition-all resize-none"
                      placeholder="Tell us a bit about your travel dreams..."
                    />
                  </div>
                </div>

                {/* Emergency Contact */}
                <div className="mt-10 mb-2">
                  <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <AlertCircle size={16} className="text-rose-500" /> Emergency Contact
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5 bg-rose-50/50 rounded-2xl border border-rose-100">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-gray-500 uppercase">Contact Name</label>
                      <input 
                        type="text"
                        value={formData.emergencyContact?.name || ''}
                        onChange={(e) => setFormData({...formData, emergencyContact: {...(formData.emergencyContact || {}), name: e.target.value}})}
                        className="w-full bg-white border border-rose-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-rose-400"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-gray-500 uppercase">Phone Number</label>
                      <input 
                        type="text"
                        value={formData.emergencyContact?.phone || ''}
                        onChange={(e) => setFormData({...formData, emergencyContact: {...(formData.emergencyContact || {}), phone: e.target.value}})}
                        className="w-full bg-white border border-rose-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-rose-400"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-gray-500 uppercase">Relation</label>
                      <input 
                        type="text"
                        value={formData.emergencyContact?.relation || ''}
                        onChange={(e) => setFormData({...formData, emergencyContact: {...(formData.emergencyContact || {}), relation: e.target.value}})}
                        className="w-full bg-white border border-rose-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-rose-400"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}


            {/* 2. TRAVEL PREFERENCES TAB */}
            {activeTab === "preferences" && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-100">
                  <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600">
                    <Compass size={20} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Travel Preferences</h2>
                    <p className="text-xs text-gray-500 mt-0.5">Customize your AI planner recommendations.</p>
                  </div>
                </div>

                <div className="space-y-8">
                  {/* Travel Styles */}
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-3">Favorite Travel Styles</label>
                    <div className="flex flex-wrap gap-3">
                      {TRAVEL_STYLES.map(style => {
                        const isSelected = formData.travelPreferences.travelStyle?.includes(style.id);
                        return (
                          <button
                            key={style.id}
                            onClick={() => toggleTravelStyle(style.id)}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all border ${
                              isSelected 
                                ? "bg-[#087F5B] text-white border-[#087F5B] shadow-sm" 
                                : "bg-white text-gray-600 border-gray-200 hover:border-[#087F5B]/30 hover:bg-emerald-50"
                            }`}
                          >
                            <span>{style.icon}</span> {style.id}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Preferred Pace */}
                    <div>
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-3">Travel Pace</label>
                      <div className="bg-gray-50 p-1.5 rounded-2xl border border-gray-200 flex">
                        {["Relaxed", "Balanced", "Fast-Paced"].map(pace => (
                          <button
                            key={pace}
                            onClick={() => setFormData({...formData, travelPreferences: {...formData.travelPreferences, preferredPace: pace}})}
                            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
                              formData.travelPreferences.preferredPace === pace
                                ? "bg-white text-[#087F5B] shadow-sm border border-gray-100"
                                : "text-gray-500 hover:text-gray-900"
                            }`}
                          >
                            {pace}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Budget Tier */}
                    <div>
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-3">Accommodation & Budget</label>
                      <select 
                        value={formData.travelPreferences.budgetTier || "Comfortable"}
                        onChange={(e) => setFormData({...formData, travelPreferences: {...formData.travelPreferences, budgetTier: e.target.value}})}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm font-medium focus:outline-none focus:border-[#087F5B]"
                      >
                        <option value="Budget Explorer">Budget Explorer (Hostels & Street Food)</option>
                        <option value="Comfortable">Comfortable (3/4 Star & Nice Dining)</option>
                        <option value="Luxury & Premium">Luxury & Premium (5-Star & Fine Dining)</option>
                      </select>
                    </div>
                  </div>

                  {/* Dietary Requirements */}
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-3 flex items-center gap-2">
                      Dietary Requirements <span className="text-[10px] normal-case font-normal text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">Select multiple</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {DIETARY.map(diet => {
                        const isSelected = formData.travelPreferences.dietary?.includes(diet);
                        return (
                          <button
                            key={diet}
                            onClick={() => toggleDietary(diet)}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                              isSelected 
                                ? "bg-amber-100 text-amber-700 border-amber-200" 
                                : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                            }`}
                          >
                            {diet}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}


            {/* 3. ACCOUNT & SECURITY TAB */}
            {activeTab === "security" && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                {/* Account Details Card */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-100">
                    <div className="w-10 h-10 bg-sky-50 rounded-xl flex items-center justify-center text-sky-600">
                      <Shield size={20} />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">Account Security</h2>
                      <p className="text-xs text-gray-500 mt-0.5">Manage your credentials and login methods.</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 mb-8">
                    <div>
                      <p className="text-sm font-bold text-gray-900">Email Address</p>
                      <p className="text-xs text-gray-500">{sessionUser?.email}</p>
                    </div>
                    {sessionUser?.emailVerified ? (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full">
                        <CheckCircle2 size={12} /> Verified
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-amber-600 bg-amber-100 px-3 py-1 rounded-full">
                        Unverified
                      </span>
                    )}
                  </div>

                  {/* Change Password Form */}
                  <form onSubmit={handlePasswordChange} className="space-y-4 max-w-md">
                    <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Key size={16} className="text-gray-400" /> Change Password
                    </h3>
                    
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-500 uppercase">Current Password</label>
                      <input 
                        type="password"
                        required
                        value={passwordState.currentPassword}
                        onChange={(e) => setPasswordState({...passwordState, currentPassword: e.target.value})}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sky-500"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-500 uppercase">New Password</label>
                      <input 
                        type="password"
                        required
                        value={passwordState.newPassword}
                        onChange={(e) => setPasswordState({...passwordState, newPassword: e.target.value})}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sky-500"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-500 uppercase">Confirm New Password</label>
                      <input 
                        type="password"
                        required
                        value={passwordState.confirmPassword}
                        onChange={(e) => setPasswordState({...passwordState, confirmPassword: e.target.value})}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sky-500"
                      />
                    </div>
                    
                    <button 
                      type="submit"
                      disabled={!passwordState.currentPassword || !passwordState.newPassword}
                      className="mt-2 bg-gray-900 text-white text-xs font-bold px-6 py-3 rounded-xl hover:bg-gray-800 disabled:opacity-50 transition-all"
                    >
                      Update Password
                    </button>
                  </form>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>



    </div>
  );
}
