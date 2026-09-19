"use client";

import { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  Search,
  Check,
  X,
  Eye,
  Trash2,
  Flag,
  Clock3,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Star,
  MapPin,
  CalendarDays,
} from "lucide-react";

/* =========================
   TYPES
========================= */

type ReviewStatus = "Pending" | "Reported" | "Approved" | "Rejected";

type FilterType = "All" | ReviewStatus;

interface Review {
  id: string;
  user: string;
  initials: string;
  destination: string;
  rating: number;
  review: string;
  date: string;
  status: ReviewStatus;
  reported: boolean;
  reportReason: string;
}

interface ApiReview {
  _id?: string;
  name?: string;
  user?: string;
  destination?: string;
  rating?: number;
  reviewText?: string;
  comment?: string;
  date?: string;
  createdAt?: string;
  status?: ReviewStatus;
  reported?: boolean;
  reportReason?: string;
}

interface ModerationStatProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  type: "pending" | "approved" | "reported" | "rejected";
}

interface AvatarProps {
  initials: string;
}

interface RatingProps {
  rating: number;
}

interface StatusBadgeProps {
  status: ReviewStatus;
}

interface ActionButtonProps {
  children: React.ReactNode;
  title: string;
  onClick: () => void;
  success?: boolean;
  danger?: boolean;
}

/* =========================
   ANIMATION
========================= */

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.07,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

/* =========================
   PAGE
========================= */

export default function ModerationPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterType>("All");
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);

  const API_URL = (
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
  ).replace(/\/$/, "");

  /* =========================
     FETCH REVIEWS
  ========================= */

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`${API_URL}/api/reviews`);

        if (!response.ok) {
          throw new Error(`Failed to fetch reviews: ${response.status}`);
        }

        const result = await response.json();

        if (result.success && Array.isArray(result.data)) {
          const mappedData: Review[] = result.data.map(
            (item: ApiReview): Review => ({
              id: item._id || "",
              user: item.name || item.user || "Anonymous",
              initials: (item.name || item.user || "A")
                .substring(0, 2)
                .toUpperCase(),
              destination: item.destination || "Unknown",
              rating: item.rating ?? 5,
              review:
                item.reviewText ||
                item.comment ||
                "No comment provided.",
              date: new Date(
                item.date || item.createdAt || Date.now()
              ).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              }),
              status: item.status || "Pending",
              reported: item.reported ?? false,
              reportReason: item.reportReason || "",
            })
          );

          setReviews(mappedData);
        } else {
          setReviews([]);
        }
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [API_URL]);

  /* =========================
     UPDATE STATUS
  ========================= */

  const updateStatus = async (
    id: string,
    status: ReviewStatus
  ) => {
    try {
      const response = await fetch(
        `${API_URL}/api/reviews/${id}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to update status: ${response.status}`
        );
      }

      setReviews((prev) =>
        prev.map((review) =>
          review.id === id
            ? {
                ...review,
                status,
                reported:
                  status === "Reported"
                    ? review.reported
                    : false,
              }
            : review
        )
      );

      setSelectedReview((prev) =>
        prev && prev.id === id
          ? {
              ...prev,
              status,
              reported:
                status === "Reported"
                  ? prev.reported
                  : false,
            }
          : prev
      );
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  /* =========================
     DELETE REVIEW
  ========================= */

  const deleteReview = async (id: string) => {
    try {
      const response = await fetch(
        `${API_URL}/api/reviews/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to delete review: ${response.status}`
        );
      }

      setReviews((prev) =>
        prev.filter((review) => review.id !== id)
      );

      setSelectedReview((prev) =>
        prev?.id === id ? null : prev
      );
    } catch (error) {
      console.error("Failed to delete review:", error);
    }
  };

  /* =========================
     FILTER
  ========================= */

  const filteredReviews = useMemo(() => {
    const searchTerm = search.toLowerCase().trim();

    return reviews.filter((review) => {
      const matchesSearch =
        review.user.toLowerCase().includes(searchTerm) ||
        review.destination
          .toLowerCase()
          .includes(searchTerm) ||
        review.review.toLowerCase().includes(searchTerm);

      const matchesFilter =
        filter === "All" || review.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [reviews, search, filter]);

  /* =========================
     STATS
  ========================= */

  const pendingCount = reviews.filter(
    (item) => item.status === "Pending"
  ).length;

  const approvedCount = reviews.filter(
    (item) => item.status === "Approved"
  ).length;

  const reportedCount = reviews.filter(
    (item) => item.status === "Reported"
  ).length;

  const rejectedCount = reviews.filter(
    (item) => item.status === "Rejected"
  ).length;

  /* =========================
     LOADING
  ========================= */

  if (loading) {
    return (
      <div className="flex min-h-[400px] w-full items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-9 w-9 animate-spin rounded-full border-4 border-green-100 border-t-green-600" />
          <p className="text-sm text-gray-500">
            Loading reviews...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="
        w-full
        min-w-0
        overflow-x-hidden
        p-4
        sm:p-6
        lg:p-8 mt-[95px]
      "
    >
      {/* ================= HEADER ================= */}

      <motion.div
        initial={{
          opacity: 0,
          y: -20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
        }}
        className="
          mb-7
          flex
          flex-col
          gap-2
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        <div>
          <h1
            className="
              text-2xl
              font-bold
              text-gray-900
              sm:text-3xl
            "
          >
            Moderation
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Review and manage user-generated content.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-400">
          <Clock3 size={15} />
          Last updated just now
        </div>
      </motion.div>

      {/* ================= STATS ================= */}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="
          grid
          grid-cols-1
          gap-4
          sm:grid-cols-2
          xl:grid-cols-4
        "
      >
        <ModerationStat
          title="Pending Review"
          value={pendingCount}
          icon={<Clock3 size={21} />}
          type="pending"
        />

        <ModerationStat
          title="Approved"
          value={approvedCount}
          icon={<CheckCircle2 size={21} />}
          type="approved"
        />

        <ModerationStat
          title="Reported"
          value={reportedCount}
          icon={<Flag size={21} />}
          type="reported"
        />

        <ModerationStat
          title="Rejected"
          value={rejectedCount}
          icon={<XCircle size={21} />}
          type="rejected"
        />
      </motion.div>

      {/* ================= CONTENT ================= */}

      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.25,
          duration: 0.45,
        }}
        className="
          mt-6
          overflow-hidden
          rounded-2xl
          border
          border-gray-100
          bg-white
          shadow-sm
        "
      >
        {/* ================= TOOLBAR ================= */}

        <div
          className="
            flex
            flex-col
            gap-3
            border-b
            border-gray-100
            p-4
            sm:p-5
            lg:flex-row
            lg:items-center
            lg:justify-between
          "
        >
          {/* SEARCH */}

          <div className="relative w-full lg:max-w-md">
            <Search
              size={18}
              className="
                absolute
                left-3
                top-1/2
                -translate-y-1/2
                text-gray-400
              "
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search user, destination or review..."
              className="
                w-full
                rounded-xl
                border
                border-gray-200
                bg-gray-50
                py-2.5
                pl-10
                pr-4
                text-sm
                outline-none
                transition
                focus:border-green-500
                focus:bg-white
                focus:ring-2
                focus:ring-green-100
              "
            />
          </div>

          {/* FILTER */}

          <div
            className="
              flex
              w-full
              overflow-x-auto
              rounded-xl
              border
              border-gray-200
              bg-gray-50
              p-1
              lg:w-auto
            "
          >
            {(
              [
                "All",
                "Pending",
                "Reported",
                "Approved",
                "Rejected",
              ] as FilterType[]
            ).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setFilter(item)}
                className={`
                  cursor-pointer
                  whitespace-nowrap
                  rounded-lg
                  px-3
                  py-2
                  text-xs
                  font-medium
                  transition
                  ${
                    filter === item
                      ? "bg-green-600 text-white shadow-sm"
                      : "text-gray-500 hover:bg-green-50 hover:text-green-600"
                  }
                `}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* ================= DESKTOP TABLE ================= */}

        <div className="hidden overflow-x-auto md:block">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                  User
                </th>

                <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                  Destination
                </th>

                <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                  Review
                </th>

                <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                  Rating
                </th>

                <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                  Status
                </th>

                <th className="px-5 py-4 text-right text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              <AnimatePresence mode="popLayout">
                {filteredReviews.map((review) => (
                  <motion.tr
                    key={review.id}
                    layout
                    initial={{
                      opacity: 0,
                      x: -15,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    exit={{
                      opacity: 0,
                      x: 30,
                    }}
                    transition={{
                      duration: 0.3,
                    }}
                    className="transition hover:bg-green-50/30"
                  >
                    {/* USER */}

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar initials={review.initials} />

                        <div>
                          <p className="whitespace-nowrap text-sm font-semibold text-gray-800">
                            {review.user}
                          </p>

                          <p className="mt-0.5 text-xs text-gray-400">
                            #{review.id.slice(-6)}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* DESTINATION */}

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin
                          size={15}
                          className="text-green-600"
                        />

                        {review.destination}
                      </div>
                    </td>

                    {/* REVIEW */}

                    <td className="max-w-[280px] px-5 py-4">
                      <p className="line-clamp-2 text-sm leading-5 text-gray-500">
                        {review.review}
                      </p>

                      {review.reported && (
                        <span className="mt-1 inline-flex items-center gap-1 text-[11px] font-medium text-red-500">
                          <AlertTriangle size={12} />
                          {review.reportReason}
                        </span>
                      )}
                    </td>

                    {/* RATING */}

                    <td className="px-5 py-4">
                      <Rating rating={review.rating} />
                    </td>

                    {/* STATUS */}

                    <td className="px-5 py-4">
                      <StatusBadge status={review.status} />
                    </td>

                    {/* ACTIONS */}

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-1.5">
                        <ActionButton
                          title="View"
                          onClick={() =>
                            setSelectedReview(review)
                          }
                        >
                          <Eye size={16} />
                        </ActionButton>

                        {review.status !== "Approved" && (
                          <ActionButton
                            title="Approve"
                            success
                            onClick={() =>
                              updateStatus(
                                review.id,
                                "Approved"
                              )
                            }
                          >
                            <Check size={16} />
                          </ActionButton>
                        )}

                        {review.status !== "Rejected" && (
                          <ActionButton
                            title="Reject"
                            danger
                            onClick={() =>
                              updateStatus(
                                review.id,
                                "Rejected"
                              )
                            }
                          >
                            <X size={16} />
                          </ActionButton>
                        )}

                        <ActionButton
                          title="Delete"
                          danger
                          onClick={() =>
                            deleteReview(review.id)
                          }
                        >
                          <Trash2 size={16} />
                        </ActionButton>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {/* ================= MOBILE CARDS ================= */}

        <div className="space-y-3 p-4 md:hidden">
          <AnimatePresence mode="popLayout">
            {filteredReviews.map((review) => (
              <motion.div
                key={review.id}
                layout
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.96,
                }}
                className="
                  rounded-xl
                  border
                  border-gray-100
                  p-4
                  transition
                  hover:border-green-200
                  hover:bg-green-50/20
                "
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <Avatar initials={review.initials} />

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-gray-800">
                        {review.user}
                      </p>

                      <p className="mt-0.5 flex items-center gap-1 text-xs text-gray-400">
                        <MapPin size={11} />
                        {review.destination}
                      </p>
                    </div>
                  </div>

                  <StatusBadge status={review.status} />
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <Rating rating={review.rating} />

                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    <CalendarDays size={12} />
                    {review.date}
                  </span>
                </div>

                <p className="mt-3 text-sm leading-5 text-gray-500">
                  {review.review}
                </p>

                {review.reported && (
                  <div className="mt-3 flex items-center gap-1.5 rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-500">
                    <AlertTriangle size={14} />
                    {review.reportReason}
                  </div>
                )}

                <div className="mt-4 flex items-center gap-2 border-t border-gray-100 pt-3">
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedReview(review)
                    }
                    className="
                      flex
                      flex-1
                      cursor-pointer
                      items-center
                      justify-center
                      gap-1.5
                      rounded-lg
                      bg-gray-50
                      py-2
                      text-xs
                      font-medium
                      text-gray-600
                      transition
                      hover:bg-gray-100
                    "
                  >
                    <Eye size={14} />
                    View
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      updateStatus(
                        review.id,
                        "Approved"
                      )
                    }
                    className="
                      flex
                      cursor-pointer
                      items-center
                      justify-center
                      rounded-lg
                      bg-green-50
                      px-3
                      py-2
                      text-green-600
                      transition
                      hover:bg-green-100
                    "
                  >
                    <Check size={15} />
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      updateStatus(
                        review.id,
                        "Rejected"
                      )
                    }
                    className="
                      flex
                      cursor-pointer
                      items-center
                      justify-center
                      rounded-lg
                      bg-red-50
                      px-3
                      py-2
                      text-red-500
                      transition
                      hover:bg-red-100
                    "
                  >
                    <X size={15} />
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      deleteReview(review.id)
                    }
                    className="
                      flex
                      cursor-pointer
                      items-center
                      justify-center
                      rounded-lg
                      bg-gray-50
                      px-3
                      py-2
                      text-gray-500
                      transition
                      hover:bg-red-50
                      hover:text-red-500
                    "
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* ================= EMPTY STATE ================= */}

        {filteredReviews.length === 0 && (
          <div className="px-5 py-16 text-center">
            <div
              className="
                mx-auto
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-full
                bg-green-50
                text-green-600
              "
            >
              <Search size={24} />
            </div>

            <h3 className="mt-4 text-sm font-semibold text-gray-800">
              No reviews found
            </h3>

            <p className="mt-1 text-xs text-gray-400">
              Try changing your search or filter.
            </p>
          </div>
        )}
      </motion.div>

      {/* ================= VIEW MODAL ================= */}

      <AnimatePresence>
        {selectedReview && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            onClick={() => setSelectedReview(null)}
            className="
              fixed
              inset-0
              z-[100]
              flex
              items-center
              justify-center
              bg-black/40
              p-4
              backdrop-blur-sm
            "
          >
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.94,
                y: 20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.94,
                y: 20,
              }}
              transition={{
                duration: 0.25,
              }}
              onClick={(e) => e.stopPropagation()}
              className="
                w-full
                max-w-lg
                rounded-2xl
                bg-white
                p-5
                shadow-2xl
                sm:p-6
              "
            >
              {/* MODAL HEADER */}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar
                    initials={selectedReview.initials}
                  />

                  <div>
                    <h3 className="text-base font-bold text-gray-800">
                      {selectedReview.user}
                    </h3>

                    <p className="text-xs text-gray-400">
                      {selectedReview.destination}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setSelectedReview(null)
                  }
                  className="
                    cursor-pointer
                    rounded-lg
                    p-2
                    text-gray-400
                    transition
                    hover:bg-gray-100
                    hover:text-gray-700
                  "
                >
                  <X size={18} />
                </button>
              </div>

              {/* REVIEW */}

              <div className="mt-5 rounded-xl bg-gray-50 p-4">
                <div className="flex items-center justify-between">
                  <Rating
                    rating={selectedReview.rating}
                  />

                  <StatusBadge
                    status={selectedReview.status}
                  />
                </div>

                <p className="mt-4 text-sm leading-6 text-gray-600">
                  {selectedReview.review}
                </p>

                <p className="mt-4 flex items-center gap-1.5 text-xs text-gray-400">
                  <CalendarDays size={13} />
                  {selectedReview.date}
                </p>

                {selectedReview.reported && (
                  <div className="mt-4 flex items-center gap-1.5 rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-500">
                    <AlertTriangle size={14} />
                    {selectedReview.reportReason}
                  </div>
                )}
              </div>

              {/* MODAL ACTIONS */}

              <div className="mt-5 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    updateStatus(
                      selectedReview.id,
                      "Approved"
                    );
                    setSelectedReview(null);
                  }}
                  className="
                    flex
                    cursor-pointer
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-green-600
                    py-2.5
                    text-sm
                    font-medium
                    text-white
                    transition
                    hover:bg-green-700
                  "
                >
                  <Check size={16} />
                  Approve
                </button>

                <button
                  type="button"
                  onClick={() => {
                    updateStatus(
                      selectedReview.id,
                      "Rejected"
                    );
                    setSelectedReview(null);
                  }}
                  className="
                    flex
                    cursor-pointer
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-red-50
                    py-2.5
                    text-sm
                    font-medium
                    text-red-600
                    transition
                    hover:bg-red-100
                  "
                >
                  <X size={16} />
                  Reject
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* =========================
   STAT CARD
========================= */

function ModerationStat({
  title,
  value,
  icon,
  type,
}: ModerationStatProps) {
  const styles = {
    pending: {
      box: "bg-amber-50",
      text: "text-amber-600",
    },
    approved: {
      box: "bg-green-50",
      text: "text-green-600",
    },
    reported: {
      box: "bg-orange-50",
      text: "text-orange-600",
    },
    rejected: {
      box: "bg-red-50",
      text: "text-red-600",
    },
  };

  const style = styles[type];

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{
        y: -4,
      }}
      className="
        rounded-2xl
        border
        border-gray-100
        bg-white
        p-5
        shadow-sm
        transition
        hover:shadow-md
      "
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">
            {title}
          </p>

          <motion.p
            initial={{
              opacity: 0,
              scale: 0.8,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              delay: 0.3,
            }}
            className="mt-2 text-2xl font-bold text-gray-900"
          >
            {value}
          </motion.p>
        </div>

        <div
          className={`
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            ${style.box}
            ${style.text}
          `}
        >
          {icon}
        </div>
      </div>
    </motion.div>
  );
}

/* =========================
   AVATAR
========================= */

function Avatar({ initials }: AvatarProps) {
  return (
    <div
      className="
        flex
        h-10
        w-10
        shrink-0
        items-center
        justify-center
        rounded-full
        bg-green-100
        text-xs
        font-bold
        text-green-700
      "
    >
      {initials}
    </div>
  );
}

/* =========================
   RATING
========================= */

function Rating({ rating }: RatingProps) {
  const safeRating = Math.max(
    0,
    Math.min(5, Math.round(rating))
  );

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          size={14}
          className={
            index < safeRating
              ? "fill-yellow-400 text-yellow-400"
              : "text-gray-200"
          }
        />
      ))}
    </div>
  );
}

/* =========================
   STATUS
========================= */

function StatusBadge({ status }: StatusBadgeProps) {
  const styles: Record<ReviewStatus, string> = {
    Pending: "bg-amber-50 text-amber-600",
    Approved: "bg-green-50 text-green-600",
    Reported: "bg-orange-50 text-orange-600",
    Rejected: "bg-red-50 text-red-600",
  };

  const icons: Record<ReviewStatus, React.ReactNode> = {
    Pending: <Clock3 size={12} />,
    Approved: <CheckCircle2 size={12} />,
    Reported: <Flag size={12} />,
    Rejected: <XCircle size={12} />,
  };

  return (
    <span
      className={`
        inline-flex
        items-center
        gap-1.5
        whitespace-nowrap
        rounded-full
        px-2.5
        py-1
        text-[11px]
        font-semibold
        ${styles[status]}
      `}
    >
      {icons[status]}
      {status}
    </span>
  );
}

/* =========================
   ACTION BUTTON
========================= */

function ActionButton({
  children,
  title,
  onClick,
  success,
  danger,
}: ActionButtonProps) {
  return (
    <motion.button
      type="button"
      whileHover={{
        scale: 1.08,
      }}
      whileTap={{
        scale: 0.92,
      }}
      title={title}
      onClick={onClick}
      className={`
        flex
        h-8
        w-8
        cursor-pointer
        items-center
        justify-center
        rounded-lg
        transition
        ${
          success
            ? "bg-green-50 text-green-600 hover:bg-green-100"
            : danger
              ? "bg-red-50 text-red-500 hover:bg-red-100"
              : "bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
        }
      `}
    >
      {children}
    </motion.button>
  );
}