"use client";

import React, { useEffect, useState, useMemo } from "react";
import { authClient } from "@/lib/auth-client";
import { 
  Bell, Check, Trash2, CheckCircle2, 
  Info, AlertTriangle, MapPin, Settings, RefreshCw, X 
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { 
  Notification, 
  fetchNotifications, 
  markNotificationAsRead, 
  markAllNotificationsAsRead, 
  deleteNotification, 
  createTestNotification 
} from "@/lib/api/notifications";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";

export default function NotificationsPage() {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"all" | "unread">("all");

  const loadNotifications = async () => {
    if (!user?.id) return;
    try {
      setLoading(true);
      const data = await fetchNotifications(user.id);
      setNotifications(data);
    } catch (error) {
      toast.error("Failed to load notifications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      loadNotifications();
    }
  }, [user?.id]);

  const handleMarkAsRead = async (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await markNotificationAsRead(id);
      setNotifications(prev => 
        prev.map(n => n._id === id ? { ...n, isRead: true } : n)
      );
    } catch (error) {
      toast.error("Could not mark as read");
    }
  };

  const handleMarkAllAsRead = async () => {
    if (!user?.id) return;
    try {
      await markAllNotificationsAsRead(user.id);
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
      toast.success("All caught up!");
    } catch (error) {
      toast.error("Failed to mark all as read");
    }
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await deleteNotification(id);
      setNotifications(prev => prev.filter(n => n._id !== id));
      toast.success("Notification deleted");
    } catch (error) {
      toast.error("Failed to delete notification");
    }
  };

  const handleGenerateTest = async () => {
    if (!user?.id) return;
    try {
      const newNotif = await createTestNotification(user.id);
      setNotifications(prev => [newNotif, ...prev]);
      toast.success("Test notification generated");
    } catch (error) {
      toast.error("Failed to generate test notification");
    }
  };

  const filteredNotifications = useMemo(() => {
    if (activeTab === "unread") return notifications.filter(n => !n.isRead);
    return notifications;
  }, [notifications, activeTab]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getIconForType = (type: string) => {
    switch(type) {
      case "success": return <CheckCircle2 size={20} className="text-emerald-500" />;
      case "warning": return <AlertTriangle size={20} className="text-amber-500" />;
      case "trip": return <MapPin size={20} className="text-indigo-500" />;
      case "system": return <Settings size={20} className="text-gray-500" />;
      default: return <Info size={20} className="text-blue-500" />;
    }
  };

  const getBgForType = (type: string) => {
    switch(type) {
      case "success": return "bg-emerald-100/50";
      case "warning": return "bg-amber-100/50";
      case "trip": return "bg-indigo-100/50";
      case "system": return "bg-gray-100/50";
      default: return "bg-blue-100/50";
    }
  };

  if (loading) {
    return (
      <div className="flex h-[80vh] items-center justify-center bg-[#F7F7F2]">
        <div className="w-10 h-10 border-4 border-[#087F5B]/20 border-t-[#087F5B] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F7F2] pb-24">
      <Toaster position="top-center" />

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#073D31] to-[#087F5B] pt-12 pb-24 px-6 md:px-12 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-10 opacity-10">
          <Bell size={180} />
        </div>
        
        <div className="max-w-4xl mx-auto relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-2">Notifications</h1>
            <p className="text-emerald-100/80 font-medium">Stay updated with your trips and account activities.</p>
          </div>
          <div className="flex items-center gap-3 bg-black/10 p-1.5 rounded-2xl backdrop-blur-md border border-white/10">
            <button 
              onClick={() => setActiveTab("all")}
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${
                activeTab === "all" ? "bg-white text-[#073D31] shadow-sm" : "text-emerald-50 hover:text-white"
              }`}
            >
              All
            </button>
            <button 
              onClick={() => setActiveTab("unread")}
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
                activeTab === "unread" ? "bg-white text-[#073D31] shadow-sm" : "text-emerald-50 hover:text-white"
              }`}
            >
              Unread
              {unreadCount > 0 && (
                <span className={`flex h-5 items-center justify-center rounded-full px-2 text-[10px] ${
                  activeTab === "unread" ? "bg-rose-500 text-white" : "bg-rose-500/80 text-white"
                }`}>
                  {unreadCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 -mt-12 relative z-20">
        <div className="bg-white rounded-3xl shadow-xl shadow-black/5 border border-gray-100 overflow-hidden">
          
          {/* Action Bar */}
          <div className="p-4 md:p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gray-50/50">
            <div className="flex items-center gap-2 text-sm font-bold text-gray-700">
              <span className="w-2 h-2 rounded-full bg-[#087F5B]"></span>
              {filteredNotifications.length} {activeTab === "all" ? "Total" : "Unread"} Notifications
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={handleGenerateTest}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-xl text-xs font-bold transition-all border border-indigo-100"
              >
                <RefreshCw size={14} /> Generate Test
              </button>
              {unreadCount > 0 && (
                <button 
                  onClick={handleMarkAllAsRead}
                  className="flex items-center gap-2 px-4 py-2 bg-[#087F5B]/10 text-[#087F5B] hover:bg-[#087F5B]/20 rounded-xl text-xs font-bold transition-all"
                >
                  <Check size={14} /> Mark all as read
                </button>
              )}
            </div>
          </div>

          {/* Notifications List */}
          <div className="divide-y divide-gray-100">
            {filteredNotifications.length === 0 ? (
              <div className="py-20 flex flex-col items-center justify-center text-center px-4">
                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                  <Bell size={40} className="text-gray-300" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">You're all caught up!</h3>
                <p className="text-gray-500 text-sm max-w-sm">
                  {activeTab === "unread" 
                    ? "You don't have any unread notifications right now."
                    : "When you get notifications about your trips, they'll show up here."}
                </p>
              </div>
            ) : (
              filteredNotifications.map((notif) => {
                const isUnread = !notif.isRead;
                const notificationContent = (
                    <div className="flex gap-4 md:gap-6">
                      
                      {/* Icon */}
                      <div className="shrink-0 mt-1 relative">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${getBgForType(notif.type)} border border-white shadow-sm`}>
                          {getIconForType(notif.type)}
                        </div>
                        {isUnread && (
                          <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-rose-500 border-2 border-white rounded-full animate-pulse" />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4 mb-1">
                          <h4 className={`text-base font-bold truncate ${isUnread ? "text-gray-900" : "text-gray-700"}`}>
                            {notif.title}
                          </h4>
                          <span className="text-[11px] font-semibold text-gray-400 whitespace-nowrap">
                            {formatDistanceToNow(new Date(notif.createdAt), { addSuffix: true })}
                          </span>
                        </div>
                        <p className={`text-sm line-clamp-2 ${isUnread ? "text-gray-700 font-medium" : "text-gray-500"}`}>
                          {notif.message}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="shrink-0 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        {isUnread && (
                          <button 
                            onClick={(e) => handleMarkAsRead(notif._id, e)}
                            className="p-2 text-gray-400 hover:text-[#087F5B] hover:bg-[#087F5B]/10 rounded-xl transition-all"
                            title="Mark as read"
                          >
                            <Check size={18} />
                          </button>
                        )}
                        <button 
                          onClick={(e) => handleDelete(notif._id, e)}
                          className="p-2 text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
                          title="Delete notification"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                );

                const wrapperClassName = `group block p-4 md:p-6 transition-all hover:bg-gray-50 cursor-pointer ${
                  isUnread ? "bg-blue-50/30" : "bg-white"
                }`;

                return notif.link ? (
                  <Link key={notif._id} href={notif.link} className={wrapperClassName}>
                    {notificationContent}
                  </Link>
                ) : (
                  <div key={notif._id} className={wrapperClassName}>
                    {notificationContent}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
