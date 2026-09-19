"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { motion, AnimatePresence } from "framer-motion";

import {
  Bell,
  Check,
  CheckCheck,
  Trash2,
  Star,
  Users,
  MapPin,
  ShieldAlert,
  MessageSquare,
  Clock,
  RefreshCw,
  AlertCircle,
} from "lucide-react";

import { useSession } from "@/lib/auth-client";

// ======================================================
// TYPES
// ======================================================

type NotificationType =
  | "review"
  | "user"
  | "destination"
  | "moderation"
  | "message"
  | "success"
  | "warning"
  | "error"
  | "info"
  | string;

interface ApiNotification {
  _id: string;
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  isRead: boolean;
  createdAt: string;
  link?: string;
}

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  unread: boolean;
  createdAt: string;
  link?: string;
}

interface NotificationItemProps {
  notification: Notification;
  onRead: (id: string) => void;
  onDelete: (id: string) => void;
  actionLoading?: string | null;
}

interface SummaryCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
}

interface EmptyStateProps {
  filter: "all" | "unread";
}

interface IconData {
  icon: React.ReactNode;
  bg: string;
  text: string;
}

// ======================================================
// API URL
// ======================================================

const API_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "") || "";

// ======================================================
// TIME FORMATTER
// ======================================================

function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return "Unknown time";
  }

  const now = new Date();

  const difference = Math.max(
    0,
    now.getTime() - date.getTime()
  );

  const seconds = Math.floor(difference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) {
    return "Just now";
  }

  if (minutes < 60) {
    return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  }

  if (hours < 24) {
    return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  }

  if (days === 1) {
    return "Yesterday";
  }

  if (days < 7) {
    return `${days} days ago`;
  }

  return date.toLocaleDateString();
}

// ======================================================
// MAP API DATA → UI DATA
// ======================================================

function mapNotification(
  notification: ApiNotification
): Notification {
  return {
    id: String(notification._id),
    type: notification.type,
    title: notification.title,
    message: notification.message,
    time: formatRelativeTime(notification.createdAt),
    unread: !notification.isRead,
    createdAt: notification.createdAt,
    link: notification.link,
  };
}

// ======================================================
// MAIN PAGE
// ======================================================

export default function NotificationsPage() {
  // ====================================================
  // BETTER AUTH SESSION
  // ====================================================

  const {
    data: session,
    isPending: sessionLoading,
  } = useSession();

  const userId = session?.user?.id;

  // ====================================================
  // STATE
  // ====================================================

  const [notifications, setNotifications] = useState<
    Notification[]
  >([]);

  const [filter, setFilter] =
    useState<"all" | "unread">("all");

  const [loading, setLoading] = useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  const [error, setError] = useState<string | null>(
    null
  );

  const [actionLoading, setActionLoading] =
    useState<string | null>(null);

  // ====================================================
  // FETCH NOTIFICATIONS
  // ====================================================

  const fetchNotifications = useCallback(
    async (showLoader = true) => {
      if (!userId) {
        return;
      }

      if (!API_URL) {
        setError(
          "API URL is not configured. Please check NEXT_PUBLIC_API_URL."
        );
        setLoading(false);
        setRefreshing(false);
        return;
      }

      try {
        if (showLoader) {
          setRefreshing(true);
        }

        setError(null);

        const response = await fetch(
          `${API_URL}/api/notifications/${userId}`,
          {
            method: "GET",
            credentials: "include",
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch notifications (${response.status})`
          );
        }

        const result = await response.json();

        if (
          !result?.success ||
          !Array.isArray(result?.data)
        ) {
          throw new Error(
            "Invalid notifications API response"
          );
        }

        const mappedNotifications =
          result.data.map(
            (notification: ApiNotification) =>
              mapNotification(notification)
          );

        setNotifications(mappedNotifications);
      } catch (err) {
        console.error(
          "Failed to fetch notifications:",
          err
        );

        setError(
          err instanceof Error
            ? err.message
            : "Failed to load notifications."
        );
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [userId]
  );

  // ====================================================
  // INITIAL FETCH
  // ====================================================

  useEffect(() => {
    // Wait until Better Auth finishes checking session
    if (sessionLoading) {
      return;
    }

    // Session finished but no user
    if (!userId) {
      setLoading(false);
      setError("User session not found.");
      return;
    }

    fetchNotifications(true);
  }, [
    userId,
    sessionLoading,
    fetchNotifications,
  ]);

  // ====================================================
  // REFRESH WHEN PAGE GETS FOCUS
  // ====================================================

  useEffect(() => {
    const handleFocus = () => {
      if (userId) {
        fetchNotifications(false);
      }
    };

    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener(
        "focus",
        handleFocus
      );
    };
  }, [userId, fetchNotifications]);

  // ====================================================
  // REFRESH WHEN HEADER UPDATES NOTIFICATIONS
  // ====================================================

  useEffect(() => {
    const handleNotificationUpdate = () => {
      if (userId) {
        fetchNotifications(false);
      }
    };

    window.addEventListener(
      "notifications:updated",
      handleNotificationUpdate
    );

    return () => {
      window.removeEventListener(
        "notifications:updated",
        handleNotificationUpdate
      );
    };
  }, [userId, fetchNotifications]);

  // ====================================================
  // UNREAD COUNT
  // ====================================================

  const unreadCount = useMemo(() => {
    return notifications.filter(
      (notification) => notification.unread
    ).length;
  }, [notifications]);

  // ====================================================
  // FILTER
  // ====================================================

  const filteredNotifications = useMemo(() => {
    if (filter === "unread") {
      return notifications.filter(
        (notification) => notification.unread
      );
    }

    return notifications;
  }, [notifications, filter]);

  // ====================================================
  // MARK ONE AS READ
  // ====================================================

  const markAsRead = async (id: string) => {
    try {
      setActionLoading(id);
      setError(null);

      const response = await fetch(
        `${API_URL}/api/notifications/${id}/read`,
        {
          method: "PATCH",
          credentials: "include",
        }
      );

      const result = await response.json();

      if (!response.ok || !result?.success) {
        throw new Error(
          result?.message ||
            "Failed to mark notification as read."
        );
      }

      // Update UI immediately
      setNotifications((previous) =>
        previous.map((notification) =>
          notification.id === id
            ? {
                ...notification,
                unread: false,
              }
            : notification
        )
      );

      // Update header badge
      window.dispatchEvent(
        new CustomEvent("notifications:updated")
      );
    } catch (err) {
      console.error(
        "Failed to mark notification as read:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Failed to mark notification as read."
      );
    } finally {
      setActionLoading(null);
    }
  };

  // ====================================================
  // MARK ALL AS READ
  // ====================================================

  const markAllAsRead = async () => {
    if (!userId || unreadCount === 0) {
      return;
    }

    try {
      setActionLoading("all");
      setError(null);

      const response = await fetch(
        `${API_URL}/api/notifications/user/${userId}/read-all`,
        {
          method: "PATCH",
          credentials: "include",
        }
      );

      const result = await response.json();

      if (!response.ok || !result?.success) {
        throw new Error(
          result?.message ||
            "Failed to mark all notifications as read."
        );
      }

      // Update UI immediately
      setNotifications((previous) =>
        previous.map((notification) => ({
          ...notification,
          unread: false,
        }))
      );

      // Update header badge
      window.dispatchEvent(
        new CustomEvent("notifications:updated")
      );
    } catch (err) {
      console.error(
        "Failed to mark all notifications as read:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Failed to mark all notifications as read."
      );
    } finally {
      setActionLoading(null);
    }
  };

  // ====================================================
  // DELETE ONE
  // ====================================================

  const deleteNotification = async (
    id: string
  ) => {
    try {
      setActionLoading(`delete-${id}`);
      setError(null);

      const response = await fetch(
        `${API_URL}/api/notifications/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const result = await response.json();

      if (!response.ok || !result?.success) {
        throw new Error(
          result?.message ||
            "Failed to delete notification."
        );
      }

      // Remove from UI
      setNotifications((previous) =>
        previous.filter(
          (notification) =>
            notification.id !== id
        )
      );

      // Update header badge
      window.dispatchEvent(
        new CustomEvent("notifications:updated")
      );
    } catch (err) {
      console.error(
        "Failed to delete notification:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Failed to delete notification."
      );
    } finally {
      setActionLoading(null);
    }
  };

  // ====================================================
  // CLEAR ALL
  // ====================================================

  const clearAll = async () => {
    if (!userId || notifications.length === 0) {
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete all notifications?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setActionLoading("clear-all");
      setError(null);

      const response = await fetch(
        `${API_URL}/api/notifications/user/${userId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const result = await response.json();

      if (!response.ok || !result?.success) {
        throw new Error(
          result?.message ||
            "Failed to clear notifications."
        );
      }

      setNotifications([]);

      // Update header badge
      window.dispatchEvent(
        new CustomEvent("notifications:updated")
      );
    } catch (err) {
      console.error(
        "Failed to clear notifications:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Failed to clear notifications."
      );
    } finally {
      setActionLoading(null);
    }
  };

  // ====================================================
  // SESSION LOADING
  // ====================================================

  if (sessionLoading) {
    return (
      <div className="mt-[95px] w-full min-w-0 overflow-x-hidden p-4 sm:p-6 lg:p-8">
        <div className="flex min-h-[400px] items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <RefreshCw
              size={28}
              className="animate-spin text-green-600"
            />

            <p className="text-sm text-gray-500">
              Checking session...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ====================================================
  // LOADING STATE
  // ====================================================

  if (loading) {
    return (
      <div className="mt-[95px] w-full min-w-0 overflow-x-hidden p-4 sm:p-6 lg:p-8">
        <div className="flex min-h-[400px] items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <RefreshCw
              size={28}
              className="animate-spin text-green-600"
            />

            <p className="text-sm text-gray-500">
              Loading notifications...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ====================================================
  // NO USER
  // ====================================================

  if (!userId) {
    return (
      <div className="mt-[95px] w-full min-w-0 overflow-x-hidden p-4 sm:p-6 lg:p-8">
        <div className="flex min-h-[400px] items-center justify-center">
          <div className="rounded-2xl border border-red-100 bg-red-50 p-6 text-center">
            <AlertCircle
              size={32}
              className="mx-auto text-red-500"
            />

            <h3 className="mt-3 font-bold text-gray-800">
              User session not found
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Please log in again to view notifications.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ====================================================
  // PAGE
  // ====================================================

  return (
    <div className="mt-[95px] w-full min-w-0 overflow-x-hidden p-4 sm:p-6 lg:p-8">

      {/* ================================================
          HEADER
      ================================================= */}

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="mb-7"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-center gap-3">

            <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-600">
              <Bell size={23} />

              {unreadCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-400 px-1 text-[10px] font-bold text-white">
                  {unreadCount > 99
                    ? "99+"
                    : unreadCount}
                </span>
              )}
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Notifications
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Stay updated with the latest admin activities.
              </p>
            </div>

          </div>

          <div className="flex items-center gap-3">

            {/* REFRESH */}
            <button
              type="button"
              onClick={() => fetchNotifications(true)}
              disabled={refreshing}
              className="
                flex
                w-fit
                cursor-pointer
                items-center
                gap-2
                rounded-xl
                border
                border-gray-200
                bg-white
                px-4
                py-2.5
                text-sm
                font-medium
                text-gray-600
                transition
                hover:bg-gray-50
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              <RefreshCw
                size={16}
                className={
                  refreshing
                    ? "animate-spin"
                    : ""
                }
              />

              Refresh
            </button>

            {/* MARK ALL */}
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={markAllAsRead}
                disabled={actionLoading === "all"}
                className="
                  flex
                  w-fit
                  cursor-pointer
                  items-center
                  gap-2
                  rounded-xl
                  bg-green-50
                  px-4
                  py-2.5
                  text-sm
                  font-medium
                  text-green-600
                  transition
                  hover:bg-green-100
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                <CheckCheck size={16} />

                {actionLoading === "all"
                  ? "Updating..."
                  : "Mark all as read"}
              </button>
            )}

          </div>
        </div>
      </motion.div>

      {/* ================================================
          ERROR
      ================================================= */}

      {error && (
        <div className="mb-6 flex items-center justify-between gap-4 rounded-xl border border-red-100 bg-red-50 px-4 py-3">

          <div className="flex items-center gap-2">
            <AlertCircle
              size={18}
              className="shrink-0 text-red-500"
            />

            <p className="text-sm text-red-600">
              {error}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setError(null)}
            className="text-xs font-semibold text-red-500 hover:text-red-700"
          >
            Dismiss
          </button>

        </div>
      )}

      {/* ================================================
          SUMMARY CARDS
      ================================================= */}

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">

        <SummaryCard
          icon={<Bell size={19} />}
          label="Total Notifications"
          value={notifications.length}
        />

        <SummaryCard
          icon={<Clock size={19} />}
          label="Unread"
          value={unreadCount}
        />

        <SummaryCard
          icon={<Check size={19} />}
          label="Read"
          value={
            notifications.length -
            unreadCount
          }
        />

      </div>

      {/* ================================================
          NOTIFICATION CARD
      ================================================= */}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.15,
          duration: 0.45,
        }}
        className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
      >

        {/* TOP BAR */}

        <div
          className="
            flex
            flex-col
            gap-4
            border-b
            border-gray-100
            p-4
            sm:flex-row
            sm:items-center
            sm:justify-between
            sm:p-5
          "
        >

          <div className="flex items-center gap-2">

            {/* ALL */}
            <button
              type="button"
              onClick={() => setFilter("all")}
              className={`
                cursor-pointer
                rounded-lg
                px-3
                py-2
                text-xs
                font-semibold
                transition
                ${
                  filter === "all"
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                }
              `}
            >
              All
            </button>

            {/* UNREAD */}
            <button
              type="button"
              onClick={() => setFilter("unread")}
              className={`
                cursor-pointer
                rounded-lg
                px-3
                py-2
                text-xs
                font-semibold
                transition
                ${
                  filter === "unread"
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                }
              `}
            >
              Unread

              {unreadCount > 0 && (
                <span className="ml-1.5">
                  ({unreadCount})
                </span>
              )}
            </button>

          </div>

          {/* CLEAR ALL */}
          {notifications.length > 0 && (
            <button
              type="button"
              onClick={clearAll}
              disabled={
                actionLoading === "clear-all"
              }
              className="
                flex
                w-fit
                cursor-pointer
                items-center
                gap-2
                text-xs
                font-medium
                text-red-500
                transition
                hover:text-red-600
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              <Trash2 size={15} />

              {actionLoading === "clear-all"
                ? "Clearing..."
                : "Clear all"}
            </button>
          )}

        </div>

        {/* LIST */}

        <div className="divide-y divide-gray-100">

          <AnimatePresence mode="popLayout">

            {filteredNotifications.length > 0 ? (
              filteredNotifications.map(
                (notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onRead={markAsRead}
                    onDelete={deleteNotification}
                    actionLoading={actionLoading}
                  />
                )
              )
            ) : (
              <EmptyState filter={filter} />
            )}

          </AnimatePresence>

        </div>

      </motion.div>

    </div>
  );
}

// ======================================================
// NOTIFICATION ITEM
// ======================================================

function NotificationItem({
  notification,
  onRead,
  onDelete,
  actionLoading,
}: NotificationItemProps & {
  actionLoading: string | null;
}) {
  const iconData =
    getNotificationIcon(notification.type);

  return (
    <motion.div
      layout
      initial={{
        opacity: 0,
        x: -20,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      exit={{
        opacity: 0,
        x: 30,
        height: 0,
        paddingTop: 0,
        paddingBottom: 0,
      }}
      transition={{
        duration: 0.25,
      }}
      className={`
        group
        relative
        flex
        gap-3
        p-4
        transition
        sm:gap-4
        sm:p-5
        ${
          notification.unread
            ? "bg-green-50/40"
            : "bg-white"
        }
        hover:bg-gray-50
      `}
    >

      {/* UNREAD INDICATOR */}

      {notification.unread && (
        <span className="absolute left-0 top-0 h-full w-1 bg-green-500" />
      )}

      {/* ICON */}

      <div
        className={`
          flex
          h-10
          w-10
          shrink-0
          items-center
          justify-center
          rounded-xl
          ${iconData.bg}
          ${iconData.text}
          sm:h-11
          sm:w-11
        `}
      >
        {iconData.icon}
      </div>

      {/* CONTENT */}

      <div className="min-w-0 flex-1">

        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">

          <h3
            className={`
              text-sm
              ${
                notification.unread
                  ? "font-bold text-gray-900"
                  : "font-semibold text-gray-700"
              }
            `}
          >
            {notification.title}
          </h3>

          <span className="shrink-0 text-[11px] text-gray-400">
            {notification.time}
          </span>

        </div>

        <p className="mt-1 max-w-2xl text-xs leading-5 text-gray-500 sm:text-sm">
          {notification.message}
        </p>

        {/* ACTIONS */}

        <div className="mt-3 flex items-center gap-3">

          {/* MARK AS READ */}
          {notification.unread && (
            <button
              type="button"
              onClick={() =>
                onRead(notification.id)
              }
              disabled={
                actionLoading ===
                notification.id
              }
              className="
                flex
                cursor-pointer
                items-center
                gap-1.5
                text-[11px]
                font-semibold
                text-green-600
                transition
                hover:text-green-700
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              <Check size={14} />

              {actionLoading ===
              notification.id
                ? "Updating..."
                : "Mark as read"}
            </button>
          )}

          {/* DELETE */}
          <button
            type="button"
            onClick={() =>
              onDelete(notification.id)
            }
            disabled={
              actionLoading ===
              `delete-${notification.id}`
            }
            className="
              flex
              cursor-pointer
              items-center
              gap-1.5
              text-[11px]
              font-medium
              text-gray-400
              transition
              hover:text-red-500
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            <Trash2 size={14} />

            {actionLoading ===
            `delete-${notification.id}`
              ? "Deleting..."
              : "Delete"}
          </button>

        </div>

      </div>

    </motion.div>
  );
}

// ======================================================
// SUMMARY CARD
// ======================================================

function SummaryCard({
  icon,
  label,
  value,
}: SummaryCardProps) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="
        rounded-2xl
        border
        border-gray-100
        bg-white
        p-4
        shadow-sm
        transition
        hover:shadow-md
      "
    >
      <div className="flex items-center gap-3">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600">
          {icon}
        </div>

        <div>
          <p className="text-xs text-gray-400">
            {label}
          </p>

          <p className="mt-0.5 text-xl font-bold text-gray-900">
            {value}
          </p>
        </div>

      </div>
    </motion.div>
  );
}

// ======================================================
// EMPTY STATE
// ======================================================

function EmptyState({
  filter,
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.95,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      className="flex flex-col items-center justify-center px-6 py-16 text-center"
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-500">
        <Bell size={28} />
      </div>

      <h3 className="mt-4 text-base font-bold text-gray-800">
        {filter === "unread"
          ? "No unread notifications"
          : "No notifications"}
      </h3>

      <p className="mt-1 max-w-sm text-sm text-gray-400">
        {filter === "unread"
          ? "You're all caught up! There are no unread notifications."
          : "You're all caught up. New notifications will appear here."}
      </p>
    </motion.div>
  );
}

// ======================================================
// ICON HANDLER
// ======================================================

function getNotificationIcon(
  type: NotificationType
): IconData {
  switch (type) {
    case "review":
      return {
        icon: <Star size={19} />,
        bg: "bg-yellow-50",
        text: "text-yellow-500",
      };

    case "user":
      return {
        icon: <Users size={19} />,
        bg: "bg-blue-50",
        text: "text-blue-500",
      };

    case "destination":
      return {
        icon: <MapPin size={19} />,
        bg: "bg-green-50",
        text: "text-green-600",
      };

    case "moderation":
      return {
        icon: <ShieldAlert size={19} />,
        bg: "bg-red-50",
        text: "text-red-500",
      };

    case "message":
      return {
        icon: <MessageSquare size={19} />,
        bg: "bg-purple-50",
        text: "text-purple-500",
      };

    case "success":
      return {
        icon: <Check size={19} />,
        bg: "bg-green-50",
        text: "text-green-600",
      };

    case "warning":
      return {
        icon: <AlertCircle size={19} />,
        bg: "bg-yellow-50",
        text: "text-yellow-500",
      };

    case "error":
      return {
        icon: <AlertCircle size={19} />,
        bg: "bg-red-50",
        text: "text-red-500",
      };

    case "info":
      return {
        icon: <Bell size={19} />,
        bg: "bg-blue-50",
        text: "text-blue-500",
      };

    default:
      return {
        icon: <Bell size={19} />,
        bg: "bg-gray-50",
        text: "text-gray-500",
      };
  }
}