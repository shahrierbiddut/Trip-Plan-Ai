"use client";

import { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Star,
  Eye,
  Trash2,
  X,
  Check,
  Clock,
  MessageSquare,
  MapPin,
  User,
} from "lucide-react";



const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const itemVariants = {
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

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const [selectedReview, setSelectedReview] = useState(null);
  const [deleteReview, setDeleteReview] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`${(process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/+$/, "")}/api/reviews`);
        if (response.ok) {
          const result = await response.json();
          if (result.success && result.data) {
            const mappedData = result.data.map(item => ({
              id: item._id,
              user: item.name || item.user || "Anonymous User",
              destination: item.destination || "Unknown Destination",
              rating: item.rating || 5,
              date: new Date(item.date || item.createdAt || Date.now()).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
              comment: item.reviewText || item.comment || "No comment provided.",
              status: item.status || "Pending",
              avatar: item.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(item.name || item.user || "A")}&background=random`
            }));
            setReviews(mappedData);
          }
        }
      } catch (error) {
        console.error("Failed to fetch reviews", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  const filteredReviews = useMemo(() => {
    return reviews.filter((review) => {
      const searchValue = search
        .toLowerCase()
        .trim();

      const matchesSearch =
        review.user
          .toLowerCase()
          .includes(searchValue) ||
        review.destination
          .toLowerCase()
          .includes(searchValue) ||
        review.comment
          .toLowerCase()
          .includes(searchValue);

      const matchesFilter =
        filter === "All" ||
        review.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [reviews, search, filter]);

  const totalReviews = reviews.length;

  const publishedReviews = reviews.filter(
    (review) => review.status === "Published"
  ).length;

  const pendingReviews = reviews.filter(
    (review) => review.status === "Pending"
  ).length;

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce(
            (sum, review) =>
              sum + review.rating,
            0
          ) / reviews.length
        ).toFixed(1)
      : "0.0";

  const handleApprove = async (id) => {
    try {
      const response = await fetch(`${(process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/+$/, "")}/api/reviews/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Published" })
      });
      if (response.ok) {
        setReviews((current) =>
          current.map((review) =>
            review.id === id ? { ...review, status: "Published" } : review
          )
        );
      }
    } catch (error) {
      console.error("Failed to approve review:", error);
    }
  };

  const handleDelete = async () => {
    if (!deleteReview) return;

    try {
      const response = await fetch(`${(process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/+$/, "")}/api/reviews/${deleteReview.id}`, {
        method: "DELETE"
      });
      if (response.ok) {
        setReviews((current) =>
          current.filter((review) => review.id !== deleteReview.id)
        );
        setDeleteReview(null);
      }
    } catch (error) {
      console.error("Failed to delete review:", error);
    }
  };

  return (
    <div className="w-full min-w-0 overflow-x-hidden p-4 sm:p-6 lg:p-8">

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
        className="mb-7"
      >
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Reviews
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Manage and moderate customer reviews and ratings.
        </p>
      </motion.div>

      {/* ================= STATS ================= */}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="
          mb-6
          grid
          grid-cols-1
          gap-4
          sm:grid-cols-2
          xl:grid-cols-4
        "
      >
        <StatCard
          title="Total Reviews"
          value={totalReviews}
          icon={<MessageSquare size={21} />}
        />

        <StatCard
          title="Published"
          value={publishedReviews}
          icon={<Check size={21} />}
        />

        <StatCard
          title="Pending"
          value={pendingReviews}
          icon={<Clock size={21} />}
        />

        <StatCard
          title="Average Rating"
          value={`${averageRating}/5`}
          icon={<Star size={21} />}
        />
      </motion.div>

      {/* ================= MAIN CARD ================= */}

      <motion.div
        initial={{
          opacity: 0,
          y: 25,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.55,
          delay: 0.1,
        }}
        className="
          overflow-hidden
          rounded-2xl
          border
          border-gray-100
          bg-white
          shadow-sm
        "
      >

        {/* SEARCH + FILTER */}

        <div className="
          flex
          flex-col
          gap-3
          border-b
          border-gray-100
          p-4
          sm:p-5
          md:flex-row
          md:items-center
          md:justify-between
        ">

          {/* SEARCH */}

          <div className="
            relative
            w-full
            md:max-w-md
          ">
            <Search
              size={18}
              className="
                absolute
                left-3.5
                top-1/2
                -translate-y-1/2
                text-gray-400
              "
            />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search reviews..."
              className="
                h-11
                w-full
                rounded-xl
                border
                border-gray-200
                bg-gray-50
                pl-10
                pr-4
                text-sm
                outline-none
                transition
                focus:border-green-500
                focus:bg-white
                focus:ring-4
                focus:ring-green-50
              "
            />
          </div>

          {/* FILTER */}

          <div className="
            flex
            w-full
            gap-2
            md:w-auto
          ">

            {["All", "Published", "Pending"].map(
              (item) => (
                <button
                  key={item}
                  onClick={() =>
                    setFilter(item)
                  }
                  className={`
                    flex-1
                    cursor-pointer
                    rounded-xl
                    px-4
                    py-2.5
                    text-sm
                    font-medium
                    transition
                    md:flex-none
                    ${
                      filter === item
                        ? "bg-green-600 text-white"
                        : "bg-gray-50 text-gray-500 hover:bg-green-50 hover:text-green-600"
                    }
                  `}
                >
                  {item}
                </button>
              )
            )}

          </div>
        </div>

        {/* ================= DESKTOP TABLE ================= */}

        <div className="hidden overflow-x-auto lg:block">

          <table className="w-full min-w-[900px]">

            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/70">

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                  User
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Destination
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Rating
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Review
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Status
                </th>

                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Actions
                </th>

              </tr>
            </thead>

            <tbody>

              <AnimatePresence mode="popLayout">

                {filteredReviews.map(
                  (review, index) => (
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
                        x: 20,
                      }}
                      transition={{
                        duration: 0.35,
                        delay: index * 0.04,
                      }}
                      whileHover={{
                        backgroundColor:
                          "rgba(240,253,244,0.7)",
                      }}
                      className="border-b border-gray-50"
                    >

                      {/* USER */}

                      <td className="px-6 py-4">

                        <div className="flex items-center gap-3">

                          <div className="
                            flex
                            h-10
                            w-10
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            bg-green-50
                            font-semibold
                            text-green-600
                          ">
                            {review.user
                              .charAt(0)
                              .toUpperCase()}
                          </div>

                          <div className="min-w-0">

                            <p className="
                              truncate
                              text-sm
                              font-semibold
                              text-gray-800
                            ">
                              {review.user}
                            </p>

                            <p className="
                              truncate
                              text-xs
                              text-gray-400
                            ">
                              {review.email}
                            </p>

                          </div>

                        </div>

                      </td>

                      {/* DESTINATION */}

                      <td className="px-6 py-4">

                        <div className="flex items-center gap-2">

                          <MapPin
                            size={15}
                            className="text-green-500"
                          />

                          <span className="text-sm font-medium text-gray-700">
                            {review.destination}
                          </span>

                        </div>

                      </td>

                      {/* RATING */}

                      <td className="px-6 py-4">

                        <RatingStars
                          rating={review.rating}
                        />

                      </td>

                      {/* REVIEW */}

                      <td className="
                        max-w-[280px]
                        px-6
                        py-4
                      ">

                        <p className="
                          line-clamp-2
                          text-sm
                          leading-5
                          text-gray-500
                        ">
                          {review.comment}
                        </p>

                      </td>

                      {/* STATUS */}

                      <td className="px-6 py-4">

                        <StatusBadge
                          status={review.status}
                        />

                      </td>

                      {/* ACTIONS */}

                      <td className="px-6 py-4">

                        <div className="
                          flex
                          items-center
                          justify-end
                          gap-1
                        ">

                          <ActionButton
                            icon={<Eye size={17} />}
                            onClick={() =>
                              setSelectedReview(
                                review
                              )
                            }
                            type="green"
                          />

                          {review.status ===
                            "Pending" && (
                            <ActionButton
                              icon={
                                <Check size={17} />
                              }
                              onClick={() =>
                                handleApprove(
                                  review.id
                                )
                              }
                              type="blue"
                            />
                          )}

                          <ActionButton
                            icon={
                              <Trash2 size={17} />
                            }
                            onClick={() =>
                              setDeleteReview(
                                review
                              )
                            }
                            type="red"
                          />

                        </div>

                      </td>

                    </motion.tr>
                  )
                )}

              </AnimatePresence>

            </tbody>
          </table>
        </div>

        {/* ================= MOBILE / TABLET ================= */}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="
            grid
            grid-cols-1
            gap-4
            p-4
            sm:grid-cols-2
            lg:hidden
          "
        >

          <AnimatePresence mode="popLayout">

            {filteredReviews.map((review) => (
              <motion.div
                key={review.id}
                layout
                variants={itemVariants}
                initial="hidden"
                animate="show"
                exit={{
                  opacity: 0,
                  scale: 0.95,
                }}
                whileHover={{
                  y: -4,
                }}
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

                {/* USER */}

                <div className="
                  flex
                  items-center
                  justify-between
                  gap-3
                ">

                  <div className="
                    flex
                    min-w-0
                    items-center
                    gap-3
                  ">

                    <div className="
                      flex
                      h-11
                      w-11
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-green-50
                      font-semibold
                      text-green-600
                    ">
                      {review.user
                        .charAt(0)
                        .toUpperCase()}
                    </div>

                    <div className="min-w-0">

                      <h3 className="
                        truncate
                        text-sm
                        font-bold
                        text-gray-800
                      ">
                        {review.user}
                      </h3>

                      <p className="
                        truncate
                        text-xs
                        text-gray-400
                      ">
                        {review.date}
                      </p>

                    </div>

                  </div>

                  <StatusBadge
                    status={review.status}
                  />

                </div>

                {/* DESTINATION */}

                <div className="
                  mt-4
                  flex
                  items-center
                  gap-2
                  text-sm
                  font-medium
                  text-gray-600
                ">
                  <MapPin
                    size={15}
                    className="text-green-500"
                  />

                  {review.destination}
                </div>

                {/* RATING */}

                <div className="mt-3">
                  <RatingStars
                    rating={review.rating}
                  />
                </div>

                {/* COMMENT */}

                <p className="
                  mt-3
                  line-clamp-3
                  text-sm
                  leading-6
                  text-gray-500
                ">
                  {review.comment}
                </p>

                {/* ACTIONS */}

                <div className="
                  mt-4
                  flex
                  gap-2
                ">

                  <motion.button
                    whileTap={{
                      scale: 0.95,
                    }}
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
                      bg-green-50
                      py-2
                      text-xs
                      font-semibold
                      text-green-700
                      transition
                      hover:bg-green-100
                    "
                  >
                    <Eye size={14} />
                    View
                  </motion.button>

                  {review.status ===
                    "Pending" && (
                    <motion.button
                      whileTap={{
                        scale: 0.95,
                      }}
                      onClick={() =>
                        handleApprove(
                          review.id
                        )
                      }
                      className="
                        flex
                        flex-1
                        cursor-pointer
                        items-center
                        justify-center
                        gap-1.5
                        rounded-lg
                        bg-blue-50
                        py-2
                        text-xs
                        font-semibold
                        text-blue-600
                        transition
                        hover:bg-blue-100
                      "
                    >
                      <Check size={14} />
                      Approve
                    </motion.button>
                  )}

                  <motion.button
                    whileTap={{
                      scale: 0.95,
                    }}
                    onClick={() =>
                      setDeleteReview(review)
                    }
                    className="
                      flex
                      flex-1
                      cursor-pointer
                      items-center
                      justify-center
                      gap-1.5
                      rounded-lg
                      bg-red-50
                      py-2
                      text-xs
                      font-semibold
                      text-red-500
                      transition
                      hover:bg-red-100
                    "
                  >
                    <Trash2 size={14} />
                    Delete
                  </motion.button>

                </div>

              </motion.div>
            ))}

          </AnimatePresence>
        </motion.div>

        {/* EMPTY */}

        {filteredReviews.length === 0 && (
          <div className="
            px-5
            py-16
            text-center
          ">

            <MessageSquare
              size={38}
              className="mx-auto text-green-500"
            />

            <h3 className="
              mt-4
              font-semibold
              text-gray-800
            ">
              No reviews found
            </h3>

            <p className="
              mt-1
              text-sm
              text-gray-400
            ">
              Try changing your search or filter.
            </p>

          </div>
        )}

      </motion.div>

      {/* ================= VIEW MODAL ================= */}

      <AnimatePresence>
        {selectedReview && (
          <ModalOverlay
            onClose={() =>
              setSelectedReview(null)
            }
          >

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.9,
                y: 20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.95,
              }}
              className="
                w-full
                max-w-md
                rounded-2xl
                bg-white
                p-6
                shadow-2xl
              "
            >

              <div className="
                flex
                items-start
                justify-between
              ">

                <div className="
                  flex
                  items-center
                  gap-3
                ">

                  <div className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-full
                    bg-green-50
                    font-bold
                    text-green-600
                  ">
                    {selectedReview.user
                      .charAt(0)
                      .toUpperCase()}
                  </div>

                  <div>

                    <h2 className="
                      font-bold
                      text-gray-900
                    ">
                      {selectedReview.user}
                    </h2>

                    <p className="
                      text-xs
                      text-gray-400
                    ">
                      {selectedReview.email}
                    </p>

                  </div>

                </div>

                <button
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

              <div className="
                mt-5
                rounded-xl
                bg-gray-50
                p-4
              ">

                <div className="
                  flex
                  items-center
                  justify-between
                  gap-3
                ">

                  <div className="
                    flex
                    items-center
                    gap-2
                    text-sm
                    font-medium
                    text-gray-700
                  ">
                    <MapPin
                      size={16}
                      className="text-green-500"
                    />

                    {selectedReview.destination}
                  </div>

                  <RatingStars
                    rating={selectedReview.rating}
                  />

                </div>

              </div>

              <p className="
                mt-5
                text-sm
                leading-7
                text-gray-600
              ">
                {selectedReview.comment}
              </p>

              <div className="
                mt-5
                flex
                items-center
                justify-between
              ">

                <span className="
                  text-xs
                  text-gray-400
                ">
                  {selectedReview.date}
                </span>

                <StatusBadge
                  status={selectedReview.status}
                />

              </div>

              {selectedReview.status ===
                "Pending" && (
                <motion.button
                  whileTap={{
                    scale: 0.96,
                  }}
                  onClick={() => {
                    handleApprove(
                      selectedReview.id
                    );
                    setSelectedReview(null);
                  }}
                  className="
                    mt-5
                    flex
                    w-full
                    cursor-pointer
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-green-600
                    py-2.5
                    text-sm
                    font-semibold
                    text-white
                    transition
                    hover:bg-green-700
                  "
                >
                  <Check size={17} />
                  Approve Review
                </motion.button>
              )}

            </motion.div>

          </ModalOverlay>
        )}
      </AnimatePresence>

      {/* ================= DELETE MODAL ================= */}

      <AnimatePresence>
        {deleteReview && (
          <ModalOverlay
            onClose={() =>
              setDeleteReview(null)
            }
          >

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.9,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 0.95,
              }}
              className="
                w-full
                max-w-sm
                rounded-2xl
                bg-white
                p-6
                text-center
                shadow-2xl
              "
            >

              <div className="
                mx-auto
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-full
                bg-red-50
                text-red-500
              ">
                <Trash2 size={24} />
              </div>

              <h3 className="
                mt-4
                text-lg
                font-bold
                text-gray-900
              ">
                Delete Review?
              </h3>

              <p className="
                mt-2
                text-sm
                leading-6
                text-gray-500
              ">
                Are you sure you want to delete
                this review from{" "}
                <b className="text-gray-700">
                  {deleteReview.user}
                </b>
                ?
              </p>

              <div className="
                mt-6
                flex
                gap-3
              ">

                <button
                  onClick={() =>
                    setDeleteReview(null)
                  }
                  className="
                    flex-1
                    cursor-pointer
                    rounded-xl
                    border
                    border-gray-200
                    py-2.5
                    text-sm
                    font-semibold
                    text-gray-600
                    transition
                    hover:bg-gray-50
                  "
                >
                  Cancel
                </button>

                <motion.button
                  whileTap={{
                    scale: 0.95,
                  }}
                  onClick={handleDelete}
                  className="
                    flex-1
                    cursor-pointer
                    rounded-xl
                    bg-red-500
                    py-2.5
                    text-sm
                    font-semibold
                    text-white
                    transition
                    hover:bg-red-600
                  "
                >
                  Delete
                </motion.button>

              </div>

            </motion.div>

          </ModalOverlay>
        )}
      </AnimatePresence>

    </div>
  );
}


/* =========================================
   STAT CARD
========================================= */

function StatCard({
  title,
  value,
  icon,
}) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{
        y: -5,
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

      <div className="
        flex
        items-center
        justify-between
      ">

        <div>

          <p className="
            text-sm
            font-medium
            text-gray-500
          ">
            {title}
          </p>

          <p className="
            mt-2
            text-2xl
            font-bold
            text-gray-900
          ">
            {value}
          </p>

        </div>

        <motion.div
          whileHover={{
            scale: 1.1,
            rotate: 5,
          }}
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            bg-green-50
            text-green-600
          "
        >
          {icon}
        </motion.div>

      </div>

    </motion.div>
  );
}


/* =========================================
   RATING STARS
========================================= */

function RatingStars({ rating }) {
  return (
    <div className="flex items-center gap-0.5">

      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={15}
          className={
            star <= rating
              ? "fill-yellow-400 text-yellow-400"
              : "text-gray-200"
          }
        />
      ))}

      <span className="
        ml-1
        text-xs
        font-semibold
        text-gray-500
      ">
        {rating}.0
      </span>

    </div>
  );
}


/* =========================================
   STATUS BADGE
========================================= */

function StatusBadge({ status }) {
  const isPublished =
    status === "Published";

  return (
    <span
      className={`
        inline-flex
        items-center
        gap-1.5
        rounded-full
        px-3
        py-1
        text-xs
        font-semibold
        ${
          isPublished
            ? "bg-green-50 text-green-700"
            : "bg-orange-50 text-orange-600"
        }
      `}
    >

      <span
        className={`
          h-1.5
          w-1.5
          rounded-full
          ${
            isPublished
              ? "bg-green-500"
              : "bg-orange-400"
          }
        `}
      />

      {status}

    </span>
  );
}


/* =========================================
   ACTION BUTTON
========================================= */

function ActionButton({
  icon,
  onClick,
  type,
}) {
  const colors = {
    green:
      "hover:bg-green-50 hover:text-green-600",
    blue:
      "hover:bg-blue-50 hover:text-blue-600",
    red:
      "hover:bg-red-50 hover:text-red-500",
  };

  return (
    <motion.button
      whileHover={{
        scale: 1.1,
      }}
      whileTap={{
        scale: 0.9,
      }}
      onClick={onClick}
      className={`
        cursor-pointer
        rounded-lg
        p-2
        text-gray-400
        transition
        ${colors[type]}
      `}
    >
      {icon}
    </motion.button>
  );
}


/* =========================================
   MODAL OVERLAY
========================================= */

function ModalOverlay({
  children,
  onClose,
}) {
  return (
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
      onClick={onClose}
      className="
        fixed
        inset-0
        z-[100]
        flex
        items-center
        justify-center
        overflow-y-auto
        bg-black/40
        p-4
        backdrop-blur-sm
      "
    >
      <div
        onClick={(e) =>
          e.stopPropagation()
        }
        className="flex w-full justify-center"
      >
        {children}
      </div>
    </motion.div>
  );
}
