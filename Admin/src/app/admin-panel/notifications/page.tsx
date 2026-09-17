"use client";

import { useState } from "react";
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
  X,
} from "lucide-react";

const initialNotifications = [
  {
    id: 1,
    type: "review",
    title: "New Review Submitted",
    message:
      "A new review has been submitted for Ratargul Swamp Forest.",
    time: "10 minutes ago",
    unread: true,
  },
  {
    id: 2,
    type: "user",
    title: "New User Registered",
    message:
      "A new user has created an account on Trip Plan AI.",
    time: "35 minutes ago",
    unread: true,
  },
  {
    id: 3,
    type: "destination",
    title: "New Destination Added",
    message:
      "Sajek Valley has been added to the destination list.",
    time: "2 hours ago",
    unread: true,
  },
  {
    id: 4,
    type: "moderation",
    title: "Content Needs Review",
    message:
      "A reported destination description is waiting for moderation.",
    time: "4 hours ago",
    unread: true,
  },
  {
    id: 5,
    type: "message",
    title: "New User Message",
    message:
      "A user has sent a new message regarding their travel plan.",
    time: "Yesterday",
    unread: true,
  },
  {
    id: 6,
    type: "review",
    title: "Review Approved",
    message:
      "Your team approved a review for Jaflong, Sylhet.",
    time: "Yesterday",
    unread: false,
  },
  {
    id: 7,
    type: "user",
    title: "User Account Updated",
    message:
      "An administrator updated a user's account information.",
    time: "2 days ago",
    unread: false,
  },
  {
    id: 8,
    type: "destination",
    title: "Destination Updated",
    message:
      "Destination information for Cox's Bazar was updated.",
    time: "3 days ago",
    unread: false,
  },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] =
    useState(initialNotifications);

  const [filter, setFilter] = useState("all");

  const unreadCount = notifications.filter(
    (notification) => notification.unread
  ).length;

  const filteredNotifications =
    filter === "unread"
      ? notifications.filter(
          (notification) => notification.unread
        )
      : notifications;

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, unread: false }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({
        ...notification,
        unread: false,
      }))
    );
  };

  const deleteNotification = (id) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <div className="w-full min-w-0 overflow-x-hidden p-4 sm:p-6 lg:p-8">

      {/* ================= HEADER ================= */}

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
                  {unreadCount}
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

          {unreadCount > 0 && (
            <button
              type="button"
              onClick={markAllAsRead}
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
              "
            >
              <CheckCheck size={16} />
              Mark all as read
            </button>
          )}

        </div>
      </motion.div>

      {/* ================= SUMMARY CARDS ================= */}

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
          value={notifications.length - unreadCount}
        />

      </div>

      {/* ================= NOTIFICATION CARD ================= */}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.45 }}
        className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
      >

        {/* TOP BAR */}

        <div className="
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
        ">

          <div className="flex items-center gap-2">

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

          {notifications.length > 0 && (
            <button
              type="button"
              onClick={clearAll}
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
              "
            >
              <Trash2 size={15} />
              Clear all
            </button>
          )}

        </div>

        {/* ================= LIST ================= */}

        <div className="divide-y divide-gray-100">

          <AnimatePresence mode="popLayout">

            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onRead={markAsRead}
                  onDelete={deleteNotification}
                />
              ))
            ) : (
              <EmptyState filter={filter} />
            )}

          </AnimatePresence>

        </div>

      </motion.div>
    </div>
  );
}


/* =========================
   NOTIFICATION ITEM
========================= */

function NotificationItem({
  notification,
  onRead,
  onDelete,
}) {
  const iconData = getNotificationIcon(notification.type);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{
        opacity: 0,
        x: 30,
        height: 0,
        paddingTop: 0,
        paddingBottom: 0,
      }}
      transition={{ duration: 0.25 }}
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

          {notification.unread && (
            <button
              type="button"
              onClick={() => onRead(notification.id)}
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
              "
            >
              <Check size={14} />
              Mark as read
            </button>
          )}

          <button
            type="button"
            onClick={() => onDelete(notification.id)}
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
            "
          >
            <Trash2 size={14} />
            Delete
          </button>

        </div>

      </div>

    </motion.div>
  );
}


/* =========================
   SUMMARY CARD
========================= */

function SummaryCard({
  icon,
  label,
  value,
}) {
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


/* =========================
   EMPTY STATE
========================= */

function EmptyState({ filter }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
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


/* =========================
   ICON HANDLER
========================= */

function getNotificationIcon(type) {
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

    default:
      return {
        icon: <Bell size={19} />,
        bg: "bg-gray-50",
        text: "text-gray-500",
      };
  }
}