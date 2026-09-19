
"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  MapPin,
  CalendarDays,
  Users,
  Eye,
  Trash2,
  X,
  Check,
  Clock,
  Plane,
  CircleDollarSign,
} from "lucide-react";

/* =========================================
   TYPES
========================================= */

interface Trip {
  id: string;
  title: string;
  destination: string;
  traveler: string;
  email: string;
  date: string;
  duration: string;
  travelers: number;
  budget: string;
  status: "Upcoming" | "Completed" | string;
}

interface ApiTrip {
  _id: string;
  title?: string;
  name?: string;
  destination?: string;
  traveler?: string;
  user?: string;
  userName?: string;
  email?: string;
  userEmail?: string;
  startDate?: string;
  endDate?: string;
  createdAt?: string;
  duration?: string;
  travelers?: number;
  numberOfTravelers?: number;
  budget?: number | string;
  amount?: number | string;
  status?: string;
}

interface StatCardProps {
  title: string;
  value: number;
  icon: ReactNode;
}

interface StatusBadgeProps {
  status: string;
}

interface ActionButtonProps {
  icon: ReactNode;
  onClick: () => void;
  type: "green" | "blue" | "red";
}

interface DetailItemProps {
  icon: ReactNode;
  label: string;
  value: string | number;
}

interface ModalOverlayProps {
  children: ReactNode;
  onClose: () => void;
}

/* =========================================
   ANIMATION VARIANTS
========================================= */

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
      ease: "easeOut" as const,
    },
  },
};

/* =========================================
   HELPER FUNCTIONS
========================================= */

const formatDate = (date?: string) => {
  if (!date) return "N/A";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "N/A";
  }

  return parsedDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const formatBudget = (value?: number | string) => {
  if (value === undefined || value === null || value === "") {
    return "$0";
  }

  if (typeof value === "string" && value.startsWith("$")) {
    return value;
  }

  return `$${value}`;
};

const calculateDuration = (
  startDate?: string,
  endDate?: string,
  existingDuration?: string
) => {
  if (existingDuration) {
    return existingDuration;
  }

  if (!startDate || !endDate) {
    return "N/A";
  }

  const start = new Date(startDate);
  const end = new Date(endDate);

  if (
    Number.isNaN(start.getTime()) ||
    Number.isNaN(end.getTime())
  ) {
    return "N/A";
  }

  const difference =
    Math.ceil(
      (end.getTime() - start.getTime()) /
        (1000 * 60 * 60 * 24)
    ) + 1;

  return `${difference} Days`;
};

/* =========================================
   MAIN PAGE
========================================= */

export default function TripsPage() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const [selectedTrip, setSelectedTrip] =
    useState<Trip | null>(null);

  const [deleteTrip, setDeleteTrip] =
    useState<Trip | null>(null);

  /* =========================================
     FETCH TRIPS
  ========================================= */

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const baseUrl =
          (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/+$/, "");

        const response = await fetch(
          `${baseUrl}/api/trips`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch trips");
        }

        const result = await response.json();

        if (result.success && Array.isArray(result.data)) {
          const mappedData: Trip[] = result.data.map(
            (item: ApiTrip) => ({
              id: item._id,

              title:
                item.title ||
                item.name ||
                "Unknown Trip",

              destination:
                item.destination ||
                "Unknown Destination",

              traveler:
                item.traveler ||
                item.userName ||
                item.user ||
                "Unknown User",

              email:
                item.email ||
                item.userEmail ||
                "N/A",

              date: formatDate(
                item.startDate || item.createdAt
              ),

              duration: calculateDuration(
                item.startDate,
                item.endDate,
                item.duration
              ),

              travelers:
                item.travelers ||
                item.numberOfTravelers ||
                1,

              budget: formatBudget(
                item.budget ?? item.amount
              ),

              status:
                item.status === "Completed"
                  ? "Completed"
                  : "Upcoming",
            })
          );

          setTrips(mappedData);
        } else {
          setTrips([]);
        }
      } catch (error) {
        console.error(
          "Failed to fetch trips:",
          error
        );

        setTrips([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  /* =========================================
     FILTERED TRIPS
  ========================================= */

  const filteredTrips = useMemo(() => {
    const searchValue = search
      .toLowerCase()
      .trim();

    return trips.filter((trip) => {
      const matchesSearch =
        trip.title
          .toLowerCase()
          .includes(searchValue) ||
        trip.destination
          .toLowerCase()
          .includes(searchValue) ||
        trip.traveler
          .toLowerCase()
          .includes(searchValue) ||
        trip.email
          .toLowerCase()
          .includes(searchValue);

      const matchesFilter =
        filter === "All" ||
        trip.status === filter;

      return (
        matchesSearch &&
        matchesFilter
      );
    });
  }, [trips, search, filter]);

  /* =========================================
     STATS
  ========================================= */

  const totalTrips = trips.length;

  const upcomingTrips = trips.filter(
    (trip) => trip.status === "Upcoming"
  ).length;

  const completedTrips = trips.filter(
    (trip) => trip.status === "Completed"
  ).length;

  const totalTravelers = trips.reduce(
    (total, trip) =>
      total + trip.travelers,
    0
  );

  /* =========================================
     COMPLETE TRIP
  ========================================= */

  const handleComplete = async (
    id: string
  ) => {
    try {
      const baseUrl =
        (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/+$/, "");

      const response = await fetch(
        `${baseUrl}/api/trips/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            status: "Completed",
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          "Failed to update trip"
        );
      }

      setTrips((current) =>
        current.map((trip) =>
          trip.id === id
            ? {
                ...trip,
                status: "Completed",
              }
            : trip
        )
      );
    } catch (error) {
      console.error(
        "Failed to update trip:",
        error
      );
    }
  };

  /* =========================================
     DELETE TRIP
  ========================================= */

  const handleDelete = async () => {
    if (!deleteTrip) return;

    try {
      const baseUrl =
        (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/+$/, "");

      const response = await fetch(
        `${baseUrl}/api/trips/${deleteTrip.id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(
          "Failed to delete trip"
        );
      }

      setTrips((current) =>
        current.filter(
          (trip) =>
            trip.id !== deleteTrip.id
        )
      );

      setDeleteTrip(null);
    } catch (error) {
      console.error(
        "Failed to delete trip:",
        error
      );
    }
  };

  /* =========================================
     RENDER
  ========================================= */

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
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600">
            <Plane size={22} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Trips
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Manage and monitor all planned trips.
            </p>
          </div>
        </div>
      </motion.div>

      {/* ================= STATS ================= */}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        <StatCard
          title="Total Trips"
          value={totalTrips}
          icon={<Plane size={21} />}
        />

        <StatCard
          title="Upcoming"
          value={upcomingTrips}
          icon={<Clock size={21} />}
        />

        <StatCard
          title="Completed"
          value={completedTrips}
          icon={<Check size={21} />}
        />

        <StatCard
          title="Total Travelers"
          value={totalTravelers}
          icon={<Users size={21} />}
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
        className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
      >

        {/* SEARCH + FILTER */}

        <div className="flex flex-col gap-3 border-b border-gray-100 p-4 sm:p-5 md:flex-row md:items-center md:justify-between">

          <div className="relative w-full md:max-w-md">
            <Search
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search trips..."
              className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm outline-none transition focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-50"
            />
          </div>

          <div className="flex w-full gap-2 md:w-auto">
            {[
              "All",
              "Upcoming",
              "Completed",
            ].map((item) => (
              <button
                key={item}
                onClick={() =>
                  setFilter(item)
                }
                className={`flex-1 cursor-pointer rounded-xl px-4 py-2.5 text-sm font-medium transition md:flex-none ${
                  filter === item
                    ? "bg-green-600 text-white"
                    : "bg-gray-50 text-gray-500 hover:bg-green-50 hover:text-green-600"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* ================= LOADING ================= */}

        {loading ? (
          <div className="px-5 py-16 text-center">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-green-600" />

            <p className="mt-4 text-sm text-gray-500">
              Loading trips...
            </p>
          </div>
        ) : (
          <>
            {/* ================= DESKTOP TABLE ================= */}

            <div className="hidden overflow-x-auto lg:block">
              <table className="w-full min-w-[1050px]">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/70">
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Trip
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Traveler
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Date
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Travelers
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Budget
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
                    {filteredTrips.map(
                      (trip, index) => (
                        <motion.tr
                          key={trip.id}
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
                            delay:
                              index * 0.04,
                          }}
                          whileHover={{
                            backgroundColor:
                              "rgba(240,253,244,0.7)",
                          }}
                          className="border-b border-gray-50"
                        >
                          {/* TRIP */}

                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-600">
                                <MapPin
                                  size={19}
                                />
                              </div>

                              <div className="min-w-0">
                                <p className="max-w-[220px] truncate text-sm font-semibold text-gray-800">
                                  {trip.title}
                                </p>

                                <p className="mt-0.5 text-xs text-gray-400">
                                  {
                                    trip.destination
                                  }
                                </p>
                              </div>
                            </div>
                          </td>

                          {/* TRAVELER */}

                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-gray-600">
                                {trip.traveler
                                  .charAt(0)
                                  .toUpperCase()}
                              </div>

                              <div>
                                <p className="text-sm font-medium text-gray-700">
                                  {
                                    trip.traveler
                                  }
                                </p>

                                <p className="text-xs text-gray-400">
                                  {trip.email}
                                </p>
                              </div>
                            </div>
                          </td>

                          {/* DATE */}

                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <CalendarDays
                                size={16}
                                className="text-green-500"
                              />

                              <div>
                                <p>
                                  {trip.date}
                                </p>

                                <p className="text-xs text-gray-400">
                                  {
                                    trip.duration
                                  }
                                </p>
                              </div>
                            </div>
                          </td>

                          {/* TRAVELERS */}

                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                              <Users
                                size={16}
                                className="text-gray-400"
                              />

                              {
                                trip.travelers
                              }
                            </div>
                          </td>

                          {/* BUDGET */}

                          <td className="px-6 py-4">
                            <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-700">
                              <CircleDollarSign
                                size={16}
                                className="text-green-500"
                              />

                              {
                                trip.budget
                              }
                            </div>
                          </td>

                          {/* STATUS */}

                          <td className="px-6 py-4">
                            <StatusBadge
                              status={
                                trip.status
                              }
                            />
                          </td>

                          {/* ACTIONS */}

                          <td className="px-6 py-4">
                            <div className="flex items-center justify-end gap-1">
                              <ActionButton
                                icon={
                                  <Eye
                                    size={17}
                                  />
                                }
                                type="green"
                                onClick={() =>
                                  setSelectedTrip(
                                    trip
                                  )
                                }
                              />

                              {trip.status ===
                                "Upcoming" && (
                                <ActionButton
                                  icon={
                                    <Check
                                      size={
                                        17
                                      }
                                    />
                                  }
                                  type="blue"
                                  onClick={() =>
                                    handleComplete(
                                      trip.id
                                    )
                                  }
                                />
                              )}

                              <ActionButton
                                icon={
                                  <Trash2
                                    size={
                                      17
                                    }
                                  />
                                }
                                type="red"
                                onClick={() =>
                                  setDeleteTrip(
                                    trip
                                  )
                                }
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

            {/* ================= MOBILE CARDS ================= */}

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:hidden"
            >
              <AnimatePresence mode="popLayout">
                {filteredTrips.map((trip) => (
                  <motion.div
                    key={trip.id}
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
                    className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition hover:shadow-md"
                  >
                    {/* TOP */}

                    <div className="flex items-start justify-between gap-3">
                      <div className="flex min-w-0 gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-600">
                          <MapPin
                            size={19}
                          />
                        </div>

                        <div className="min-w-0">
                          <h3 className="line-clamp-2 text-sm font-bold text-gray-800">
                            {trip.title}
                          </h3>

                          <p className="mt-1 text-xs text-gray-400">
                            {
                              trip.destination
                            }
                          </p>
                        </div>
                      </div>

                      <StatusBadge
                        status={trip.status}
                      />
                    </div>

                    {/* TRAVELER */}

                    <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
                      <Users
                        size={15}
                        className="text-gray-400"
                      />

                      <span>
                        {trip.traveler}
                      </span>
                    </div>

                    {/* DETAILS */}

                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <div className="rounded-xl bg-gray-50 p-3">
                        <div className="flex items-center gap-1.5 text-xs text-gray-400">
                          <CalendarDays
                            size={14}
                          />
                          Date
                        </div>

                        <p className="mt-1 text-xs font-semibold text-gray-700">
                          {trip.date}
                        </p>
                      </div>

                      <div className="rounded-xl bg-gray-50 p-3">
                        <div className="flex items-center gap-1.5 text-xs text-gray-400">
                          <CircleDollarSign
                            size={14}
                          />
                          Budget
                        </div>

                        <p className="mt-1 text-xs font-semibold text-gray-700">
                          {trip.budget}
                        </p>
                      </div>
                    </div>

                    {/* ACTIONS */}

                    <div className="mt-4 flex gap-2">
                      <motion.button
                        whileTap={{
                          scale: 0.95,
                        }}
                        onClick={() =>
                          setSelectedTrip(
                            trip
                          )
                        }
                        className="flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-lg bg-green-50 py-2 text-xs font-semibold text-green-700 transition hover:bg-green-100"
                      >
                        <Eye size={14} />
                        View
                      </motion.button>

                      {trip.status ===
                        "Upcoming" && (
                        <motion.button
                          whileTap={{
                            scale: 0.95,
                          }}
                          onClick={() =>
                            handleComplete(
                              trip.id
                            )
                          }
                          className="flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-lg bg-blue-50 py-2 text-xs font-semibold text-blue-600 transition hover:bg-blue-100"
                        >
                          <Check size={14} />
                          Complete
                        </motion.button>
                      )}

                      <motion.button
                        whileTap={{
                          scale: 0.95,
                        }}
                        onClick={() =>
                          setDeleteTrip(
                            trip
                          )
                        }
                        className="flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-lg bg-red-50 py-2 text-xs font-semibold text-red-500 transition hover:bg-red-100"
                      >
                        <Trash2 size={14} />
                        Delete
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* ================= EMPTY ================= */}

            {filteredTrips.length === 0 && (
              <div className="px-5 py-16 text-center">
                <Plane
                  size={40}
                  className="mx-auto text-green-500"
                />

                <h3 className="mt-4 font-semibold text-gray-800">
                  No trips found
                </h3>

                <p className="mt-1 text-sm text-gray-400">
                  Try changing your search or
                  filter.
                </p>
              </div>
            )}
          </>
        )}
      </motion.div>

      {/* ================= VIEW MODAL ================= */}

      <AnimatePresence>
        {selectedTrip && (
          <ModalOverlay
            onClose={() =>
              setSelectedTrip(null)
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
              className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-green-600">
                    Trip Details
                  </p>

                  <h2 className="mt-1 text-xl font-bold text-gray-900">
                    {
                      selectedTrip.title
                    }
                  </h2>
                </div>

                <button
                  onClick={() =>
                    setSelectedTrip(null)
                  }
                  className="cursor-pointer rounded-lg p-2 text-gray-400 transition hover:bg-gray-100"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <DetailItem
                  icon={
                    <MapPin size={17} />
                  }
                  label="Destination"
                  value={
                    selectedTrip.destination
                  }
                />

                <DetailItem
                  icon={
                    <Users size={17} />
                  }
                  label="Traveler"
                  value={
                    selectedTrip.traveler
                  }
                />

                <DetailItem
                  icon={
                    <CalendarDays
                      size={17}
                    />
                  }
                  label="Date"
                  value={
                    selectedTrip.date
                  }
                />

                <DetailItem
                  icon={
                    <Clock size={17} />
                  }
                  label="Duration"
                  value={
                    selectedTrip.duration
                  }
                />

                <DetailItem
                  icon={
                    <Users size={17} />
                  }
                  label="Travelers"
                  value={`${selectedTrip.travelers} people`}
                />

                <DetailItem
                  icon={
                    <CircleDollarSign
                      size={17}
                    />
                  }
                  label="Budget"
                  value={
                    selectedTrip.budget
                  }
                />

                <DetailItem
                  icon={
                    <Users size={17} />
                  }
                  label="Email"
                  value={
                    selectedTrip.email
                  }
                />
              </div>

              <div className="mt-5 flex items-center justify-between rounded-xl bg-gray-50 p-4">
                <span className="text-sm font-medium text-gray-500">
                  Trip Status
                </span>

                <StatusBadge
                  status={
                    selectedTrip.status
                  }
                />
              </div>

              {selectedTrip.status ===
                "Upcoming" && (
                <motion.button
                  whileTap={{
                    scale: 0.96,
                  }}
                  onClick={async () => {
                    await handleComplete(
                      selectedTrip.id
                    );
                    setSelectedTrip(null);
                  }}
                  className="mt-5 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-green-600 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700"
                >
                  <Check size={17} />
                  Mark as Completed
                </motion.button>
              )}
            </motion.div>
          </ModalOverlay>
        )}
      </AnimatePresence>

      {/* ================= DELETE MODAL ================= */}

      <AnimatePresence>
        {deleteTrip && (
          <ModalOverlay
            onClose={() =>
              setDeleteTrip(null)
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
              className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-2xl"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-500">
                <Trash2 size={24} />
              </div>

              <h3 className="mt-4 text-lg font-bold text-gray-900">
                Delete Trip?
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Are you sure you want to delete
                this trip?
              </p>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() =>
                    setDeleteTrip(null)
                  }
                  className="flex-1 cursor-pointer rounded-xl border border-gray-200 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
                >
                  Cancel
                </button>

                <motion.button
                  whileTap={{
                    scale: 0.95,
                  }}
                  onClick={handleDelete}
                  className="flex-1 cursor-pointer rounded-xl bg-red-500 py-2.5 text-sm font-semibold text-white transition hover:bg-red-600"
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
}: StatCardProps) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{
        y: -5,
      }}
      className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:shadow-md"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">
            {title}
          </p>

          <p className="mt-2 text-2xl font-bold text-gray-900">
            {value}
          </p>
        </div>

        <motion.div
          whileHover={{
            scale: 1.1,
            rotate: 5,
          }}
          className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600"
        >
          {icon}
        </motion.div>
      </div>
    </motion.div>
  );
}

/* =========================================
   STATUS BADGE
========================================= */

function StatusBadge({
  status,
}: StatusBadgeProps) {
  const isCompleted =
    status === "Completed";

  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${
        isCompleted
          ? "bg-blue-50 text-blue-600"
          : "bg-green-50 text-green-700"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          isCompleted
            ? "bg-blue-500"
            : "bg-green-500"
        }`}
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
}: ActionButtonProps) {
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
      className={`cursor-pointer rounded-lg p-2 text-gray-400 transition ${colors[type]}`}
    >
      {icon}
    </motion.button>
  );
}

/* =========================================
   DETAIL ITEM
========================================= */

function DetailItem({
  icon,
  label,
  value,
}: DetailItemProps) {
  return (
    <div className="rounded-xl bg-gray-50 p-3.5">
      <div className="flex items-center gap-2 text-xs text-gray-400">
        <span className="text-green-500">
          {icon}
        </span>

        {label}
      </div>

      <p className="mt-1.5 text-sm font-semibold text-gray-700">
        {value}
      </p>
    </div>
  );
}

/* =========================================
   MODAL OVERLAY
========================================= */

function ModalOverlay({
  children,
  onClose,
}: ModalOverlayProps) {
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
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/40 p-4 backdrop-blur-sm"
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

