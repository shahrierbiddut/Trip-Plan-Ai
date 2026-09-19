"use client";

import React, { useState, FormEvent, useEffect } from "react";
import { 
  User, 
  Shield, 
  Settings2, 
  Bell, 
  Save, 
  AlertCircle,
  CheckCircle2,
  Lock,
  Globe,
  Camera,
  Mail,
  Palette,
  CreditCard,
  LogOut,
  Smartphone
} from "lucide-react";
import { useSession } from "@/lib/auth-client";
import Image from "next/image";

type Tab = "profile" | "security" | "preferences";

export default function SettingsPage() {
  const { data: session } = useSession();
  const user = session?.user;

  const [activeTab, setActiveTab] = useState<Tab>("profile");
  
  // States for messages
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Profile State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");

  // Security State
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Preferences State
  const [currency, setCurrency] = useState("USD");
  const [emailNotifs, setEmailNotifs] = useState(true);

  // Initialize data when session loads
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
    }
  }, [user]);

  const clearMessages = () => {
    setSuccessMsg("");
    setErrorMsg("");
  };

  const handleProfileSubmit = async (e: FormEvent) => {
    e.preventDefault();
    clearMessages();
    setIsSubmitting(true);
    
    try {
      const res = await fetch(`${(process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/+$/, "")}/api/user/profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user?.id, name, email, bio })
      });
      
      const data = await res.json();
      if (res.ok) setSuccessMsg("Profile updated successfully!");
      else setErrorMsg(data.message || "Failed to update profile.");
    } catch (error) {
      setErrorMsg("Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSecuritySubmit = async (e: FormEvent) => {
    e.preventDefault();
    clearMessages();
    
    if (newPassword !== confirmPassword) {
      return setErrorMsg("New passwords do not match.");
    }
    
    setIsSubmitting(true);
    try {
      const res = await fetch(`${(process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/+$/, "")}/api/user/password`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user?.email, currentPassword, newPassword })
      });
      
      const data = await res.json();
      if (res.ok) {
        setSuccessMsg("Password changed successfully!");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
      else setErrorMsg(data.message || "Failed to change password.");
    } catch (error) {
      setErrorMsg("Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePreferencesSubmit = async (e: FormEvent) => {
    e.preventDefault();
    clearMessages();
    setIsSubmitting(true);
    
    try {
      const res = await fetch(`${(process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/+$/, "")}/api/user/preferences`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user?.email, currency, emailNotifications: emailNotifs })
      });
      
      const data = await res.json();
      if (res.ok) setSuccessMsg("Preferences saved successfully!");
      else setErrorMsg(data.message || "Failed to update preferences.");
    } catch (error) {
      setErrorMsg("Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-[#FAFAFA] overflow-y-auto selection:bg-[#073D31] selection:text-white">
      {/* Premium Header with Brand Gradients */}
      <div className="relative bg-[#04271C] px-8 py-20 lg:px-12 flex flex-col items-center justify-center shrink-0 overflow-hidden border-b-[6px] border-[#073D31]">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-30%] left-[-10%] w-[50%] h-[150%] rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-500/20 via-transparent to-transparent blur-[100px] transform rotate-12 animate-pulse" style={{ animationDuration: '6s' }} />
          <div className="absolute bottom-[-30%] right-[-10%] w-[60%] h-[150%] rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-500/10 via-transparent to-transparent blur-[100px] transform -rotate-12" />
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03] bg-repeat pointer-events-none" />
        </div>
        
        <div className="relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-emerald-300 text-sm font-semibold mb-6 backdrop-blur-md shadow-lg">
            <Settings2 className="w-4 h-4" /> Personalize Your Experience
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight drop-shadow-md">
            Account Settings
          </h1>
          <p className="text-[#A5C0B5] text-lg max-w-xl mx-auto font-light">
            Manage your profile details, security preferences, and customize how TripPlan AI works for you.
          </p>
        </div>
      </div>

      <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-10 lg:px-12 -mt-10 relative z-20">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar */}
          <div className="w-full lg:w-72 shrink-0 space-y-3">
            <button 
              onClick={() => { setActiveTab("profile"); clearMessages(); }}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-semibold transition-all duration-300 border ${
                activeTab === "profile" 
                  ? "bg-white border-[#073D31]/20 text-[#073D31] shadow-[0_10px_30px_rgba(7,61,49,0.1)] transform scale-[1.02]" 
                  : "bg-white/60 border-transparent text-gray-500 hover:bg-white hover:text-gray-800 hover:shadow-md backdrop-blur-sm"
              }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${activeTab === "profile" ? "bg-[#073D31]/10 text-[#073D31]" : "bg-gray-100 text-gray-400"}`}>
                <User className="w-5 h-5" />
              </div>
              Profile Info
            </button>
            
            <button 
              onClick={() => { setActiveTab("security"); clearMessages(); }}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-semibold transition-all duration-300 border ${
                activeTab === "security" 
                  ? "bg-white border-[#073D31]/20 text-[#073D31] shadow-[0_10px_30px_rgba(7,61,49,0.1)] transform scale-[1.02]" 
                  : "bg-white/60 border-transparent text-gray-500 hover:bg-white hover:text-gray-800 hover:shadow-md backdrop-blur-sm"
              }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${activeTab === "security" ? "bg-[#073D31]/10 text-[#073D31]" : "bg-gray-100 text-gray-400"}`}>
                <Shield className="w-5 h-5" />
              </div>
              Security & Password
            </button>

            <button 
              onClick={() => { setActiveTab("preferences"); clearMessages(); }}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-semibold transition-all duration-300 border ${
                activeTab === "preferences" 
                  ? "bg-white border-[#073D31]/20 text-[#073D31] shadow-[0_10px_30px_rgba(7,61,49,0.1)] transform scale-[1.02]" 
                  : "bg-white/60 border-transparent text-gray-500 hover:bg-white hover:text-gray-800 hover:shadow-md backdrop-blur-sm"
              }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${activeTab === "preferences" ? "bg-[#073D31]/10 text-[#073D31]" : "bg-gray-100 text-gray-400"}`}>
                <Palette className="w-5 h-5" />
              </div>
              Preferences
            </button>

            {/* Decorative App Card with Brand Colors */}
            <div className="mt-8 bg-gradient-to-br from-[#073D31] to-[#04271C] rounded-[24px] p-6 text-white shadow-xl relative overflow-hidden hidden lg:block border border-emerald-800">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-yellow-500/10 rounded-full blur-xl transform -translate-x-1/2 translate-y-1/2" />
              
              <Smartphone className="w-8 h-8 mb-4 text-emerald-300 relative z-10" />
              <h3 className="font-bold text-lg mb-2 relative z-10">Get the App!</h3>
              <p className="text-[#A5C0B5] text-sm leading-relaxed mb-4 relative z-10">Plan trips on the go with the TripPlan AI mobile experience.</p>
              <button className="bg-emerald-500 text-white font-bold text-sm px-4 py-2 rounded-xl hover:bg-emerald-400 shadow-[0_4px_15px_rgba(16,185,129,0.4)] transition-all w-full relative z-10 hover:-translate-y-0.5">
                Download Now
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 bg-white rounded-[32px] p-8 md:p-12 border border-gray-100 shadow-[0_8px_40px_rgba(0,0,0,0.04)] relative overflow-hidden min-h-[500px]">
            
            {/* Global Messages */}
            {successMsg && (
              <div className="mb-8 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 shadow-sm">
                <CheckCircle2 className="w-6 h-6 shrink-0 text-emerald-500" />
                <span className="font-semibold">{successMsg}</span>
              </div>
            )}
            {errorMsg && (
              <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-800 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 shadow-sm">
                <AlertCircle className="w-6 h-6 shrink-0 text-red-500" />
                <span className="font-semibold">{errorMsg}</span>
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-[#073D31]/10 text-[#073D31] rounded-2xl">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Profile Information</h2>
                    <p className="text-gray-500 mt-1">Update your photo and personal details here.</p>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 mb-10 p-6 bg-gradient-to-r from-emerald-50/50 to-gray-50 rounded-[24px] border border-gray-100 shadow-sm">
                  <div className="relative group shrink-0">
                    <div className="w-28 h-28 rounded-full overflow-hidden bg-white border-4 border-white shadow-xl">
                      {user?.image ? (
                        <Image src={user.image} alt="Profile" width={112} height={112} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full bg-[#073D31] flex items-center justify-center text-white text-4xl font-bold">
                          {user?.name?.charAt(0) || "U"}
                        </div>
                      )}
                    </div>
                    <button className="absolute bottom-1 right-1 w-9 h-9 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center text-gray-600 hover:text-[#073D31] hover:scale-110 transition-all">
                      <Camera className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="text-center sm:text-left">
                    <h3 className="font-bold text-gray-900 text-xl mb-1">{name || "Your Name"}</h3>
                    <p className="text-sm text-gray-500 mb-4">{email}</p>
                    <button className="text-sm font-semibold text-[#073D31] bg-white px-4 py-2 rounded-full border border-gray-200 hover:bg-emerald-50 hover:border-emerald-200 hover:shadow-md transition-all">
                      Upload New Photo
                    </button>
                  </div>
                </div>

                <form onSubmit={handleProfileSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="relative">
                      <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Full Name</label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-gray-400 group-focus-within:text-[#073D31] transition-colors" />
                        </div>
                        <input 
                          type="text" 
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full pl-11 pr-4 py-4 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-[#073D31]/10 focus:border-[#073D31] transition-all outline-none text-gray-900 font-medium hover:border-gray-300"
                        />
                      </div>
                    </div>
                    <div className="relative">
                      <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Email Address</label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input 
                          type="email" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full pl-11 pr-4 py-4 rounded-2xl border border-gray-200 bg-gray-100 text-gray-500 font-medium outline-none cursor-not-allowed"
                          readOnly
                        />
                      </div>
                      <p className="text-xs text-gray-400 mt-2 ml-2">Email is managed by your login provider.</p>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Travel Bio</label>
                    <textarea 
                      rows={4}
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      placeholder="e.g. Backpacker, Luxury traveler, Foodie..."
                      className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-[#073D31]/10 focus:border-[#073D31] transition-all outline-none resize-none text-gray-900 font-medium hover:border-gray-300"
                    />
                  </div>

                  <div className="flex justify-end pt-6 border-t border-gray-100">
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="flex items-center gap-2 bg-[#073D31] text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-[#0a4d3e] hover:shadow-[0_10px_20px_rgba(7,61,49,0.2)] hover:-translate-y-1 active:translate-y-0 transition-all duration-300 disabled:opacity-70 disabled:hover:translate-y-0"
                    >
                      {isSubmitting ? "Saving Changes..." : "Save Profile"}
                      <Save className="w-5 h-5" />
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === "security" && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-[#073D31]/10 text-[#073D31] rounded-2xl">
                    <Shield className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Security & Password</h2>
                    <p className="text-gray-500 mt-1">Ensure your account stays secure.</p>
                  </div>
                </div>
                
                <form onSubmit={handleSecuritySubmit} className="space-y-6 max-w-2xl">
                  <div className="p-6 bg-gray-50 rounded-[24px] border border-gray-100 space-y-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Current Password</label>
                      <div className="relative group">
                        <Lock className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-[#073D31] transition-colors" />
                        <input 
                          type="password" 
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 bg-white focus:ring-4 focus:ring-[#073D31]/10 focus:border-[#073D31] transition-all outline-none text-gray-900 font-medium hover:border-gray-300"
                        />
                      </div>
                    </div>
                    
                    <div className="h-px bg-gray-200 my-2"></div>
                    
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">New Password</label>
                      <div className="relative group">
                        <Lock className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-[#073D31] transition-colors" />
                        <input 
                          type="password" 
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 bg-white focus:ring-4 focus:ring-[#073D31]/10 focus:border-[#073D31] transition-all outline-none text-gray-900 font-medium hover:border-gray-300"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Confirm New Password</label>
                      <div className="relative group">
                        <Lock className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-[#073D31] transition-colors" />
                        <input 
                          type="password" 
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 bg-white focus:ring-4 focus:ring-[#073D31]/10 focus:border-[#073D31] transition-all outline-none text-gray-900 font-medium hover:border-gray-300"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-6">
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="flex items-center gap-2 bg-[#073D31] text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-[#0a4d3e] hover:shadow-[0_10px_20px_rgba(7,61,49,0.2)] hover:-translate-y-1 active:translate-y-0 transition-all duration-300 disabled:opacity-70 disabled:hover:translate-y-0"
                    >
                      {isSubmitting ? "Updating..." : "Update Password"}
                      <Shield className="w-5 h-5" />
                    </button>
                  </div>
                </form>

                <div className="mt-12 pt-8 border-t border-gray-100">
                  <div className="flex flex-col sm:flex-row items-center justify-between p-6 bg-red-50 rounded-[24px] border border-red-100 gap-4">
                    <div className="text-center sm:text-left">
                      <h3 className="font-bold text-red-900 text-lg mb-1">Danger Zone</h3>
                      <p className="text-red-700 text-sm">Permanently delete your account and all data.</p>
                    </div>
                    <button className="bg-white text-red-600 font-bold px-6 py-3 rounded-xl border border-red-200 hover:bg-red-600 hover:text-white hover:border-red-600 transition-colors flex items-center gap-2 shadow-sm shrink-0">
                      <LogOut className="w-4 h-4" /> Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Preferences Tab */}
            {activeTab === "preferences" && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-[#073D31]/10 text-[#073D31] rounded-2xl">
                    <Palette className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Preferences</h2>
                    <p className="text-gray-500 mt-1">Customize your TripPlan AI experience.</p>
                  </div>
                </div>
                
                <form onSubmit={handlePreferencesSubmit} className="space-y-8 max-w-2xl">
                  {/* Currency Selection */}
                  <div className="bg-gray-50 rounded-[24px] p-6 sm:p-8 border border-gray-100 hover:border-gray-200 transition-colors">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-[#073D31] shadow-sm border border-gray-100">
                        <CreditCard className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg">Preferred Currency</h3>
                        <p className="text-sm text-gray-500">Used for budget estimates and AI generations.</p>
                      </div>
                    </div>
                    <div className="relative">
                      <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <select 
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-[#073D31]/10 focus:border-[#073D31] transition-all outline-none bg-white font-medium text-gray-900 shadow-sm appearance-none cursor-pointer"
                      >
                        <option value="USD">USD ($) - US Dollar</option>
                        <option value="BDT">BDT (৳) - Bangladeshi Taka</option>
                        <option value="EUR">EUR (€) - Euro</option>
                        <option value="GBP">GBP (£) - British Pound</option>
                        <option value="INR">INR (₹) - Indian Rupee</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                        <span className="text-gray-400 font-bold">▼</span>
                      </div>
                    </div>
                  </div>

                  {/* Notification Toggle */}
                  <div className="bg-gray-50 rounded-[24px] p-6 sm:p-8 border border-gray-100 hover:border-gray-200 transition-colors flex items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-[#073D31] shadow-sm border border-gray-100">
                        <Bell className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg">Email Notifications</h3>
                        <p className="text-sm text-gray-500">Receive trip updates, newsletters, and tips.</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer shrink-0">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={emailNotifs}
                        onChange={(e) => setEmailNotifs(e.target.checked)}
                      />
                      <div className="w-16 h-8 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#073D31] shadow-inner"></div>
                    </label>
                  </div>

                  <div className="flex justify-end pt-6">
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="flex items-center gap-2 bg-[#073D31] text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-[#0a4d3e] hover:shadow-[0_10px_20px_rgba(7,61,49,0.2)] hover:-translate-y-1 active:translate-y-0 transition-all duration-300 disabled:opacity-70 disabled:hover:translate-y-0"
                    >
                      {isSubmitting ? "Saving..." : "Save Preferences"}
                      <Save className="w-5 h-5" />
                    </button>
                  </div>
                </form>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
