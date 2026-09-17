"use client";

import { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  Plus,
  Eye,
  Pencil,
  Trash2,
  MapPin,
  Star,
  EyeIcon,
  X,
  ChevronLeft,
  ChevronRight,
  Globe2,
} from "lucide-react";

type Destination = {
  id: string;
  name: string;
  location: string;
  category: string;
  rating: number;
  views: number;
  status: string;
  featured: boolean;
  image: string;
  description: string;
};

type DestinationApiItem = {
  _id?: string;
  id?: string;
  name?: string;
  title?: string;
  location?: string;
  category?: string;
  rating?: number;
  views?: number;
  status?: string;
  featured?: boolean;
  image?: string;
  thumbnail?: string;
  description?: string;
};

type StatProps = {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  variants?: any | Variants;
};



const ITEMS_PER_PAGE = 6;

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.07,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
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

export default function DestinationsPage() {
 const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedDestination, setSelectedDestination] =
  useState<Destination | null>(null);
  const [deleteDestination, setDeleteDestination] =
  useState<Destination | null>(null);


  const [showDestinationModal, setShowDestinationModal] =
  useState(false);

const [editingDestination, setEditingDestination] =
  useState<Destination | null>(null);

const [destinationForm, setDestinationForm] = useState({
  name: "",
  location: "",
  category: "Nature",
  rating: 0,
  views: 0,
  status: "Active",
  featured: false,
  image: "",
  description: "",
});

const [savingDestination, setSavingDestination] =
  useState(false);


  useEffect(() => {
  const fetchDestinations = async () => {
    try {
      setLoading(true);

      const API_URL =
        (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/+$/, "");

      const response = await fetch(
        `${API_URL}/api/destinations`
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch destinations: ${response.status}`
        );
      }

      const result = await response.json();

      console.log("Destinations API:", result);

      if (result.success && Array.isArray(result.data)) {
        const mappedData = result.data.map((item:DestinationApiItem) => ({
          id: String(item._id || item.id),
          name:
            item.name ||
            item.title ||
            "Unknown Destination",
          location: item.location || "Unknown",
          category: item.category || "Nature",
          rating: Number(item.rating) || 0,
          views: Number(item.views) || 0,
          status: item.status || "Active",
          featured: Boolean(item.featured),
          image:
            item.image ||
            item.thumbnail ||
            "https://images.unsplash.com/photo-1500534623283-312aade485b7",
          description:
            item.description ||
            "No description provided.",
        }));

        setDestinations(mappedData);
      } else {
        setDestinations([]);
      }
    } catch (error) {
      console.error(
        "Failed to fetch destinations:",
        error
      );

      setDestinations([]);
    } finally {
      setLoading(false);
    }
  };

  fetchDestinations();
}, []);

  const filteredDestinations = useMemo(() => {
    return destinations.filter((destination) => {
      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        destination.name
          .toLowerCase()
          .includes(searchText) ||
        destination.location
          .toLowerCase()
          .includes(searchText);

      const matchesCategory =
        category === "All" ||
        destination.category === category;

      const matchesStatus =
        status === "All" ||
        destination.status === status;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStatus
      );
    });
  }, [destinations, search, category, status]);

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredDestinations.length / ITEMS_PER_PAGE
    )
  );

  const paginatedDestinations =
    filteredDestinations.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
    );

  const totalDestinations = destinations.length;

  const featuredDestinations = destinations.filter(
    (destination) => destination.featured
  ).length;

  const activeDestinations = destinations.filter(
    (destination) => destination.status === "Active"
  ).length;

  const totalViews = destinations.reduce(
    (total, destination) =>
      total + destination.views,
    0
  );

  const handleSearch = (value:string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleCategory = (value:string) => {
    setCategory(value);
    setCurrentPage(1);
  };

  const handleStatus = (value:string) => {
    setStatus(value);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearch("");
    setCategory("All");
    setStatus("All");
    setCurrentPage(1);
  };

  const openAddDestinationModal = () => {
  setEditingDestination(null);

  setDestinationForm({
    name: "",
    location: "",
    category: "Nature",
    rating: 0,
    views: 0,
    status: "Active",
    featured: false,
    image: "",
    description: "",
  });

  setShowDestinationModal(true);
};

const openEditDestinationModal = (
  destination: Destination
) => {
  setEditingDestination(destination);

  setDestinationForm({
    name: destination.name,
    location: destination.location,
    category: destination.category,
    rating: destination.rating,
    views: destination.views,
    status: destination.status,
    featured: destination.featured,
    image: destination.image,
    description: destination.description,
  });

  setShowDestinationModal(true);
};

const handleDestinationFormChange = (
  e: React.ChangeEvent<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >
) => {
  const { name, value, type } = e.target;

  setDestinationForm((prev) => ({
    ...prev,
    [name]:
      type === "checkbox"
        ? (e.target as HTMLInputElement).checked
        : value,
  }));
};

const handleSaveDestination = async (
  e: React.FormEvent
) => {
  e.preventDefault();

  if (!destinationForm.name.trim()) {
    alert("Destination name is required.");
    return;
  }

  if (!destinationForm.location.trim()) {
    alert("Location is required.");
    return;
  }

  try {
    setSavingDestination(true);

    const API_URL =
      (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/+$/, "");

    const payload = {
      name: destinationForm.name.trim(),
      location: destinationForm.location.trim(),
      category: destinationForm.category,
      rating: Number(destinationForm.rating) || 0,
      views: Number(destinationForm.views) || 0,
      status: destinationForm.status,
      featured: destinationForm.featured,
      image:
        destinationForm.image.trim() ||
        "https://images.unsplash.com/photo-1500534623283-312aade485b7",
      description:
        destinationForm.description.trim() ||
        "No description provided.",
    };

    const url = editingDestination
      ? `${API_URL}/api/destinations/${editingDestination.id}`
      : `${API_URL}/api/destinations`;

    const response = await fetch(url, {
      method: editingDestination ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(
        result.message || "Failed to save destination"
      );
    }

    if (editingDestination) {
      // Update existing destination in UI
      setDestinations((prev) =>
        prev.map((destination) =>
          destination.id === editingDestination.id
            ? {
                ...destination,
                ...payload,
              }
            : destination
        )
      );
    } else {
      // Add new destination in UI
      const newDestination: Destination = {
        id: String(result.data?._id),
        ...payload,
      };

      setDestinations((prev) => [
        newDestination,
        ...prev,
      ]);
    }

    setShowDestinationModal(false);
    setEditingDestination(null);

    setDestinationForm({
      name: "",
      location: "",
      category: "Nature",
      rating: 0,
      views: 0,
      status: "Active",
      featured: false,
      image: "",
      description: "",
    });
  } catch (error) {
    console.error(
      "Failed to save destination:",
      error
    );

    alert(
      error instanceof Error
        ? error.message
        : "Failed to save destination"
    );
  } finally {
    setSavingDestination(false);
  }
};

  const handleDelete = async () => {
    if (!deleteDestination) return;

    try {
      const response = await fetch(`${(process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/+$/, "")}/api/destinations/${deleteDestination.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        const updatedDestinations = destinations.filter(
          (dest) => dest.id !== deleteDestination.id
        );

        setDestinations(updatedDestinations);
        setDeleteDestination(null);

        const newTotalPages = Math.max(
          1,
          Math.ceil(
            updatedDestinations.length / ITEMS_PER_PAGE
          )
        );

        if (currentPage > newTotalPages) {
          setCurrentPage(newTotalPages);
        }
      }
    } catch (error) {
      console.error("Failed to delete destination", error);
    }
  };

  return (
    <div className="w-full min-w-0 overflow-x-hidden p-4 sm:p-6 lg:p-8 mt-[95px]">

      {/* =========================
          HEADER
      ========================= */}

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
          flex flex-col gap-4
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        <div className="min-w-0">

          <h1 className="
            text-2xl
            font-bold
            text-gray-900
            sm:text-3xl
          ">
            Destinations
          </h1>

          <p className="
            mt-1
            text-sm
            text-gray-500
          ">
            Manage travel destinations and places.
          </p>

        </div>

        <motion.button
  type="button"
  onClick={openAddDestinationModal}
  whileHover={{
    scale: 1.03,
    y: -2,
  }}
  whileTap={{
    scale: 0.96,
  }}
  className="
    flex
    w-full
    items-center
    justify-center
    gap-2
    rounded-xl
    bg-green-600
    px-4
    py-2.5
    text-sm
    font-semibold
    text-white
    shadow-sm
    shadow-green-200
    transition-colors
    hover:bg-green-700
    sm:w-auto
  "
>
  <Plus size={18} />
  Add Destination
</motion.button>

      </motion.div>

      {/* =========================
          STATS
      ========================= */}

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

        <Stat
          title="Total Destinations"
          value={totalDestinations}
          icon={<Globe2 size={21} />}
          variants={cardVariants}
        />

        <Stat
          title="Featured"
          value={featuredDestinations}
          icon={<Star size={21} />}
          variants={cardVariants}
        />

        <Stat
          title="Active"
          value={activeDestinations}
          icon={<MapPin size={21} />}
          variants={cardVariants}
        />

        <Stat
          title="Total Views"
          value={totalViews.toLocaleString()}
          icon={<EyeIcon size={21} />}
          variants={cardVariants}
        />

      </motion.div>

      {/* =========================
          MAIN CARD
      ========================= */}

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
          delay: 0.2,
        }}
        className="
          w-full
          min-w-0
          overflow-hidden
          rounded-2xl
          border
          border-gray-100
          bg-white
          shadow-sm
        "
      >

        {/* FILTER AREA */}

        <div className="
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
        ">

          {/* Search */}

          <div className="
            relative
            w-full
            lg:max-w-md
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
                handleSearch(e.target.value)
              }
              placeholder="Search destinations..."
              className="
                h-11
                w-full
                rounded-xl
                border
                border-gray-200
                bg-gray-50
                pl-10
                pr-10
                text-sm
                text-gray-700
                outline-none
                transition-all
                duration-300
                placeholder:text-gray-400
                focus:border-green-500
                focus:bg-white
                focus:ring-4
                focus:ring-green-50
              "
            />

            <AnimatePresence>
              {search && (
                <motion.button
                  initial={{
                    opacity: 0,
                    scale: 0.7,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.7,
                  }}
                  onClick={() =>
                    handleSearch("")
                  }
                  className="
                    absolute
                    right-3
                    top-1/2
                    -translate-y-1/2
                    text-gray-400
                    hover:text-gray-700
                  "
                >
                  <X size={16} />
                </motion.button>
              )}
            </AnimatePresence>

          </div>

          {/* Filters */}

          <div className="
            flex
            w-full
            flex-col
            gap-2
            sm:flex-row
            lg:w-auto
          ">

            <div className="
              flex
              items-center
              gap-2
              text-sm
              text-gray-500
            ">
              <SlidersHorizontal size={17} />

              <span className="hidden sm:block">
                Filter
              </span>
            </div>

            <select
              value={category}
              onChange={(e) =>
                handleCategory(e.target.value)
              }
              className="
                h-10
                rounded-xl
                border
                border-gray-200
                bg-white
                px-3
                text-sm
                text-gray-600
                outline-none
                focus:border-green-500
                focus:ring-4
                focus:ring-green-50
              "
            >
              <option value="All">
                All Categories
              </option>

              <option value="Nature">
                Nature
              </option>

              <option value="Beach">
                Beach
              </option>

              <option value="Hill">
                Hill
              </option>

              <option value="Wildlife">
                Wildlife
              </option>
            </select>

            <select
              value={status}
              onChange={(e) =>
                handleStatus(e.target.value)
              }
              className="
                h-10
                rounded-xl
                border
                border-gray-200
                bg-white
                px-3
                text-sm
                text-gray-600
                outline-none
                focus:border-green-500
                focus:ring-4
                focus:ring-green-50
              "
            >
              <option value="All">
                All Status
              </option>

              <option value="Active">
                Active
              </option>

              <option value="Draft">
                Draft
              </option>
            </select>

          </div>

        </div>

        {/* =========================
            DESKTOP TABLE
        ========================= */}

        <div className="
          hidden
          overflow-x-auto
          lg:block
        ">

          <table className="
            w-full
            min-w-[900px]
          ">

            <thead>
              <tr className="
                border-b
                border-gray-100
                bg-gray-50/70
              ">

                <th className="
                  px-6
                  py-4
                  text-left
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wider
                  text-gray-400
                ">
                  Destination
                </th>

                <th className="
                  px-6
                  py-4
                  text-left
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wider
                  text-gray-400
                ">
                  Category
                </th>

                <th className="
                  px-6
                  py-4
                  text-left
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wider
                  text-gray-400
                ">
                  Rating
                </th>

                <th className="
                  px-6
                  py-4
                  text-left
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wider
                  text-gray-400
                ">
                  Views
                </th>

                <th className="
                  px-6
                  py-4
                  text-left
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wider
                  text-gray-400
                ">
                  Status
                </th>

                <th className="
                  px-6
                  py-4
                  text-right
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wider
                  text-gray-400
                ">
                  Actions
                </th>

              </tr>
            </thead>

            <tbody>

              <AnimatePresence mode="popLayout">

                {paginatedDestinations.map(
                  (destination, index) => (

                    <motion.tr
                      key={destination.id}
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
                        delay: index * 0.05,
                      }}
                      whileHover={{
                        backgroundColor:
                          "rgba(240,253,244,0.7)",
                      }}
                      className="
                        border-b
                        border-gray-50
                      "
                    >

                      {/* Destination */}

                      <td className="px-6 py-4">

                        <div className="
                          flex
                          items-center
                          gap-3
                        ">

                          <motion.img
                            whileHover={{
                              scale: 1.06,
                            }}
                            src={destination.image}
                            alt={destination.name}
                            className="
                              h-12
                              w-16
                              shrink-0
                              rounded-lg
                              object-cover
                            "
                          />

                          <div className="min-w-0">

                            <div className="
                              flex
                              items-center
                              gap-2
                            ">

                              <p className="
                                truncate
                                text-sm
                                font-semibold
                                text-gray-800
                              ">
                                {destination.name}
                              </p>

                              {destination.featured && (
                                <Star
                                  size={13}
                                  className="
                                    shrink-0
                                    fill-green-500
                                    text-green-500
                                  "
                                />
                              )}

                            </div>

                            <div className="
                              mt-1
                              flex
                              items-center
                              gap-1
                              text-xs
                              text-gray-400
                            ">
                              <MapPin size={12} />
                              <span className="truncate">
                                {destination.location}
                              </span>
                            </div>

                          </div>

                        </div>

                      </td>

                      {/* Category */}

                      <td className="px-6 py-4">

                        <span className="
                          rounded-full
                          bg-green-50
                          px-3
                          py-1
                          text-xs
                          font-semibold
                          text-green-700
                        ">
                          {destination.category}
                        </span>

                      </td>

                      {/* Rating */}

                      <td className="px-6 py-4">

                        <div className="
                          flex
                          items-center
                          gap-1
                        ">

                          <Star
                            size={15}
                            className="
                              fill-yellow-400
                              text-yellow-400
                            "
                          />

                          <span className="
                            text-sm
                            font-semibold
                            text-gray-700
                          ">
                            {destination.rating}
                          </span>

                        </div>

                      </td>

                      {/* Views */}

                      <td className="px-6 py-4">

                        <span className="
                          text-sm
                          text-gray-600
                        ">
                          {destination.views.toLocaleString()}
                        </span>

                      </td>

                      {/* Status */}

                      <td className="px-6 py-4">

                        <span className={`
                          inline-flex
                          items-center
                          gap-1.5
                          rounded-full
                          px-3
                          py-1
                          text-xs
                          font-semibold
                          ${
                            destination.status ===
                            "Active"
                              ? "bg-green-50 text-green-700"
                              : "bg-gray-100 text-gray-500"
                          }
                        `}>

                          <span className={`
                            h-1.5
                            w-1.5
                            rounded-full
                            ${
                              destination.status ===
                              "Active"
                                ? "bg-green-500"
                                : "bg-gray-400"
                            }
                          `} />

                          {destination.status}

                        </span>

                      </td>

                      {/* Actions */}

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
                              setSelectedDestination(
                                destination
                              )
                            }
                            hover="green"
                          />

                          <ActionButton
  icon={<Pencil size={17} />}
  onClick={() =>
    openEditDestinationModal(destination)
  }
  hover="blue"
/>

                          <ActionButton
                            icon={<Trash2 size={17} />}
                            onClick={() =>
                              setDeleteDestination(
                                destination
                              )
                            }
                            hover="red"
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

        {/* =========================
            MOBILE + TABLET CARDS
        ========================= */}

        <div className="
          grid
          grid-cols-1
          gap-4
          p-4
          sm:grid-cols-2
          lg:hidden
        ">

          <AnimatePresence mode="popLayout">

            {paginatedDestinations.map(
              (destination, index) => (

                <motion.div
                  key={destination.id}
                  layout
                  variants={cardVariants}
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
                    overflow-hidden
                    rounded-2xl
                    border
                    border-gray-100
                    bg-white
                    shadow-sm
                    transition-shadow
                    hover:shadow-md
                  "
                >

                  {/* Image */}

                  <div className="
                    relative
                    h-44
                    overflow-hidden
                  ">

                    <motion.img
                      whileHover={{
                        scale: 1.05,
                      }}
                      transition={{
                        duration: 0.4,
                      }}
                      src={destination.image}
                      alt={destination.name}
                      className="
                        h-full
                        w-full
                        object-cover
                      "
                    />

                    <div className="
                      absolute
                      left-3
                      top-3
                    ">

                      <span className="
                        rounded-full
                        bg-white/90
                        px-2.5
                        py-1
                        text-[10px]
                        font-semibold
                        text-green-700
                        backdrop-blur-sm
                      ">
                        {destination.category}
                      </span>

                    </div>

                    {destination.featured && (
                      <div className="
                        absolute
                        right-3
                        top-3
                        flex
                        h-8
                        w-8
                        items-center
                        justify-center
                        rounded-full
                        bg-white/90
                        backdrop-blur-sm
                      ">
                        <Star
                          size={15}
                          className="
                            fill-yellow-400
                            text-yellow-400
                          "
                        />
                      </div>
                    )}

                  </div>

                  {/* Card Content */}

                  <div className="p-4">

                    <div className="
                      flex
                      items-start
                      justify-between
                      gap-3
                    ">

                      <div className="min-w-0">

                        <h3 className="
                          truncate
                          text-base
                          font-bold
                          text-gray-800
                        ">
                          {destination.name}
                        </h3>

                        <div className="
                          mt-1
                          flex
                          items-center
                          gap-1
                          text-xs
                          text-gray-400
                        ">
                          <MapPin size={12} />

                          <span className="truncate">
                            {destination.location}
                          </span>
                        </div>

                      </div>

                      <div className="
                        flex
                        shrink-0
                        items-center
                        gap-1
                      ">
                        <Star
                          size={14}
                          className="
                            fill-yellow-400
                            text-yellow-400
                          "
                        />

                        <span className="
                          text-xs
                          font-semibold
                          text-gray-700
                        ">
                          {destination.rating}
                        </span>
                      </div>

                    </div>

                    <div className="
                      mt-4
                      grid
                      grid-cols-2
                      gap-3
                    ">

                      <div className="
                        rounded-xl
                        bg-gray-50
                        p-3
                      ">

                        <p className="
                          text-[10px]
                          text-gray-400
                        ">
                          Views
                        </p>

                        <p className="
                          mt-1
                          text-sm
                          font-semibold
                          text-gray-700
                        ">
                          {destination.views.toLocaleString()}
                        </p>

                      </div>

                      <div className="
                        rounded-xl
                        bg-gray-50
                        p-3
                      ">

                        <p className="
                          text-[10px]
                          text-gray-400
                        ">
                          Status
                        </p>

                        <p className={`
                          mt-1
                          text-xs
                          font-semibold
                          ${
                            destination.status ===
                            "Active"
                              ? "text-green-600"
                              : "text-gray-500"
                          }
                        `}>
                          {destination.status}
                        </p>

                      </div>

                    </div>

                    {/* Actions */}

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
                          setSelectedDestination(
                            destination
                          )
                        }
                        className="
                          flex
                          flex-1
                          items-center
                          justify-center
                          gap-1.5
                          rounded-lg
                          bg-green-50
                          py-2
                          text-xs
                          font-semibold
                          text-green-700
                          hover:bg-green-100
                        "
                      >
                        <Eye size={14} />
                        View
                      </motion.button>

                     <motion.button
  type="button"
  whileHover={{
    scale: 1.03,
  }}
  whileTap={{
    scale: 0.95,
  }}
  onClick={() =>
    openEditDestinationModal(destination)
  }
  className="
    flex
    flex-1
    items-center
    justify-center
    gap-1.5
    rounded-lg
    bg-blue-50
    py-2
    text-xs
    font-semibold
    text-blue-600
    hover:bg-blue-100
  "
>
  <Pencil size={14} />
  Edit
</motion.button>

                      <motion.button
                        whileTap={{
                          scale: 0.95,
                        }}
                        onClick={() =>
                          setDeleteDestination(
                            destination
                          )
                        }
                        className="
                          flex
                          flex-1
                          items-center
                          justify-center
                          gap-1.5
                          rounded-lg
                          bg-red-50
                          py-2
                          text-xs
                          font-semibold
                          text-red-500
                          hover:bg-red-100
                        "
                      >
                        <Trash2 size={14} />
                        Delete
                      </motion.button>

                    </div>

                  </div>

                </motion.div>

              )
            )}

          </AnimatePresence>

        </div>

        {/* EMPTY */}

        {paginatedDestinations.length === 0 && (
          <div className="
            px-5
            py-16
            text-center
          ">

            <Globe2
              size={35}
              className="
                mx-auto
                text-green-500
              "
            />

            <h3 className="
              mt-4
              font-semibold
              text-gray-800
            ">
              No destinations found
            </h3>

            <p className="
              mt-1
              text-sm
              text-gray-400
            ">
              Try changing your filters.
            </p>

            <button
              onClick={clearFilters}
              className="
                mt-4
                text-sm
                font-semibold
                text-green-600
              "
            >
              Clear Filters
            </button>

          </div>
        )}

        {/* PAGINATION */}

        {filteredDestinations.length > 0 && (
          <div className="
            flex
            flex-col
            gap-3
            border-t
            border-gray-100
            px-4
            py-4
            sm:flex-row
            sm:items-center
            sm:justify-between
            sm:px-6
          ">

            <p className="
              text-center
              text-xs
              text-gray-400
              sm:text-left
            ">
              Showing{" "}
              <b className="text-gray-600">
                {(currentPage - 1) *
                  ITEMS_PER_PAGE +
                  1}
              </b>{" "}
              to{" "}
              <b className="text-gray-600">
                {Math.min(
                  currentPage *
                    ITEMS_PER_PAGE,
                  filteredDestinations.length
                )}
              </b>{" "}
              of{" "}
              <b className="text-gray-600">
                {filteredDestinations.length}
              </b>
            </p>

            <div className="
              flex
              items-center
              justify-center
              gap-1
            ">

              <button
                disabled={currentPage === 1}
                onClick={() =>
                  setCurrentPage((page) =>
                    Math.max(page - 1, 1)
                  )
                }
                className="
                  rounded-lg
                  p-2
                  text-gray-500
                  hover:bg-green-50
                  hover:text-green-600
                  disabled:opacity-30
                "
              >
                <ChevronLeft size={17} />
              </button>

              {Array.from(
                { length: totalPages },
                (_, index) => index + 1
              ).map((page) => (
                <button
                  key={page}
                  onClick={() =>
                    setCurrentPage(page)
                  }
                  className={`
                    h-8
                    min-w-8
                    rounded-lg
                    px-2
                    text-xs
                    font-semibold
                    ${
                      currentPage === page
                        ? "bg-green-600 text-white"
                        : "text-gray-500 hover:bg-green-50 hover:text-green-600"
                    }
                  `}
                >
                  {page}
                </button>
              ))}

              <button
                disabled={
                  currentPage === totalPages
                }
                onClick={() =>
                  setCurrentPage((page) =>
                    Math.min(
                      page + 1,
                      totalPages
                    )
                  )
                }
                className="
                  rounded-lg
                  p-2
                  text-gray-500
                  hover:bg-green-50
                  hover:text-green-600
                  disabled:opacity-30
                "
              >
                <ChevronRight size={17} />
              </button>

            </div>

          </div>
        )}

      </motion.div>

      {/* =========================
          VIEW MODAL
      ========================= */}

      <AnimatePresence>
        {selectedDestination && (
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
            onClick={() =>
              setSelectedDestination(null)
            }
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
                scale: 0.9,
                y: 25,
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
              onClick={(e) =>
                e.stopPropagation()
              }
              className="
                max-h-[90vh]
                w-full
                max-w-lg
                overflow-y-auto
                rounded-2xl
                bg-white
                shadow-2xl
              "
            >

              <div className="
                relative
                h-52
              ">

                <img
                  src={selectedDestination.image}
                  alt={selectedDestination.name}
                  className="
                    h-full
                    w-full
                    object-cover
                  "
                />

                <button
                  onClick={() =>
                    setSelectedDestination(null)
                  }
                  className="
                    absolute
                    right-3
                    top-3
                    rounded-full
                    bg-white/90
                    p-2
                    text-gray-600
                    backdrop-blur-sm
                  "
                >
                  <X size={18} />
                </button>

              </div>

              <div className="p-6">

                <div className="
                  flex
                  items-start
                  justify-between
                  gap-3
                ">

                  <div>

                    <h2 className="
                      text-xl
                      font-bold
                      text-gray-900
                    ">
                      {selectedDestination.name}
                    </h2>

                    <p className="
                      mt-1
                      flex
                      items-center
                      gap-1
                      text-sm
                      text-gray-400
                    ">
                      <MapPin size={14} />
                      {selectedDestination.location}
                    </p>

                  </div>

                  <span className="
                    rounded-full
                    bg-green-50
                    px-3
                    py-1
                    text-xs
                    font-semibold
                    text-green-700
                  ">
                    {selectedDestination.category}
                  </span>

                </div>

                <p className="
                  mt-5
                  text-sm
                  leading-6
                  text-gray-500
                ">
                  {selectedDestination.description}
                </p>

                <div className="
                  mt-5
                  grid
                  grid-cols-3
                  gap-3
                ">

                  <div className="
                    rounded-xl
                    bg-gray-50
                    p-3
                    text-center
                  ">
                    <Star
                      size={17}
                      className="
                        mx-auto
                        fill-yellow-400
                        text-yellow-400
                      "
                    />
                    <p className="
                      mt-1
                      text-sm
                      font-bold
                      text-gray-800
                    ">
                      {selectedDestination.rating}
                    </p>
                    <p className="
                      text-[10px]
                      text-gray-400
                    ">
                      Rating
                    </p>
                  </div>

                  <div className="
                    rounded-xl
                    bg-gray-50
                    p-3
                    text-center
                  ">
                    <Eye
                      size={17}
                      className="
                        mx-auto
                        text-green-600
                      "
                    />
                    <p className="
                      mt-1
                      text-sm
                      font-bold
                      text-gray-800
                    ">
                      {selectedDestination.views.toLocaleString()}
                    </p>
                    <p className="
                      text-[10px]
                      text-gray-400
                    ">
                      Views
                    </p>
                  </div>

                  <div className="
                    rounded-xl
                    bg-gray-50
                    p-3
                    text-center
                  ">
                    <MapPin
                      size={17}
                      className="
                        mx-auto
                        text-green-600
                      "
                    />
                    <p className="
                      mt-1
                      text-sm
                      font-bold
                      text-gray-800
                    ">
                      {selectedDestination.status}
                    </p>
                    <p className="
                      text-[10px]
                      text-gray-400
                    ">
                      Status
                    </p>
                  </div>

                </div>

              </div>

            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>

{/* =========================
    ADD / EDIT DESTINATION MODAL
========================= */}

<AnimatePresence>
  {showDestinationModal && (
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
      onClick={() =>
        !savingDestination &&
        setShowDestinationModal(false)
      }
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
          scale: 0.9,
          y: 30,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
          scale: 0.95,
          y: 20,
        }}
        transition={{
          duration: 0.3,
          ease: "easeOut",
        }}
        onClick={(e) => e.stopPropagation()}
        className="
          max-h-[90vh]
          w-full
          max-w-2xl
          overflow-y-auto
          rounded-2xl
          bg-white
          shadow-2xl
        "
      >
        {/* Header */}

        <div className="
          flex
          items-center
          justify-between
          border-b
          border-gray-100
          px-6
          py-5
        ">
          <div>
            <h2 className="
              text-lg
              font-bold
              text-gray-900
            ">
              {editingDestination
                ? "Edit Destination"
                : "Add Destination"}
            </h2>

            <p className="
              mt-1
              text-xs
              text-gray-400
            ">
              {editingDestination
                ? "Update destination information."
                : "Add a new travel destination."}
            </p>
          </div>

          <motion.button
            type="button"
            whileHover={{
              scale: 1.08,
              rotate: 90,
            }}
            whileTap={{
              scale: 0.9,
            }}
            disabled={savingDestination}
            onClick={() =>
              setShowDestinationModal(false)
            }
            className="
              cursor-pointer
              rounded-full
              bg-gray-100
              p-2
              text-gray-500
              transition-colors
              hover:bg-gray-200
              disabled:opacity-50
            "
          >
            <X size={18} />
          </motion.button>
        </div>

        {/* Form */}

        <form
          onSubmit={handleSaveDestination}
          className="p-6"
        >
          <div className="
            grid
            grid-cols-1
            gap-4
            sm:grid-cols-2
          ">

            {/* Name */}

            <div className="sm:col-span-2">
              <label className="
                mb-1.5
                block
                text-xs
                font-semibold
                text-gray-600
              ">
                Destination Name *
              </label>

              <input
                type="text"
                name="name"
                value={destinationForm.name}
                onChange={handleDestinationFormChange}
                placeholder="e.g. Jaflong"
                required
                className="
                  h-11
                  w-full
                  rounded-xl
                  border
                  border-gray-200
                  bg-gray-50
                  px-3
                  text-sm
                  text-gray-700
                  outline-none
                  transition-all
                  focus:border-green-500
                  focus:bg-white
                  focus:ring-4
                  focus:ring-green-50
                "
              />
            </div>

            {/* Location */}

            <div className="sm:col-span-2">
              <label className="
                mb-1.5
                block
                text-xs
                font-semibold
                text-gray-600
              ">
                Location *
              </label>

              <input
                type="text"
                name="location"
                value={destinationForm.location}
                onChange={handleDestinationFormChange}
                placeholder="e.g. Sylhet, Bangladesh"
                required
                className="
                  h-11
                  w-full
                  rounded-xl
                  border
                  border-gray-200
                  bg-gray-50
                  px-3
                  text-sm
                  text-gray-700
                  outline-none
                  transition-all
                  focus:border-green-500
                  focus:bg-white
                  focus:ring-4
                  focus:ring-green-50
                "
              />
            </div>

            {/* Category */}

            <div>
              <label className="
                mb-1.5
                block
                text-xs
                font-semibold
                text-gray-600
              ">
                Category
              </label>

              <select
                name="category"
                value={destinationForm.category}
                onChange={handleDestinationFormChange}
                className="
                  h-11
                  w-full
                  rounded-xl
                  border
                  border-gray-200
                  bg-gray-50
                  px-3
                  text-sm
                  text-gray-700
                  outline-none
                  focus:border-green-500
                  focus:bg-white
                  focus:ring-4
                  focus:ring-green-50
                "
              >
                <option value="Nature">Nature</option>
                <option value="Beach">Beach</option>
                <option value="Hill">Hill</option>
                <option value="Wildlife">Wildlife</option>
              </select>
            </div>

            {/* Status */}

            <div>
              <label className="
                mb-1.5
                block
                text-xs
                font-semibold
                text-gray-600
              ">
                Status
              </label>

              <select
                name="status"
                value={destinationForm.status}
                onChange={handleDestinationFormChange}
                className="
                  h-11
                  w-full
                  rounded-xl
                  border
                  border-gray-200
                  bg-gray-50
                  px-3
                  text-sm
                  text-gray-700
                  outline-none
                  focus:border-green-500
                  focus:bg-white
                  focus:ring-4
                  focus:ring-green-50
                "
              >
                <option value="Active">Active</option>
                <option value="Draft">Draft</option>
              </select>
            </div>

            {/* Rating */}

            <div>
              <label className="
                mb-1.5
                block
                text-xs
                font-semibold
                text-gray-600
              ">
                Rating
              </label>

              <input
                type="number"
                name="rating"
                min="0"
                max="5"
                step="0.1"
                value={destinationForm.rating}
                onChange={handleDestinationFormChange}
                className="
                  h-11
                  w-full
                  rounded-xl
                  border
                  border-gray-200
                  bg-gray-50
                  px-3
                  text-sm
                  text-gray-700
                  outline-none
                  focus:border-green-500
                  focus:bg-white
                  focus:ring-4
                  focus:ring-green-50
                "
              />
            </div>

            {/* Views */}

            <div>
              <label className="
                mb-1.5
                block
                text-xs
                font-semibold
                text-gray-600
              ">
                Views
              </label>

              <input
                type="number"
                name="views"
                min="0"
                value={destinationForm.views}
                onChange={handleDestinationFormChange}
                className="
                  h-11
                  w-full
                  rounded-xl
                  border
                  border-gray-200
                  bg-gray-50
                  px-3
                  text-sm
                  text-gray-700
                  outline-none
                  focus:border-green-500
                  focus:bg-white
                  focus:ring-4
                  focus:ring-green-50
                "
              />
            </div>

            {/* Image */}

            <div className="sm:col-span-2">
              <label className="
                mb-1.5
                block
                text-xs
                font-semibold
                text-gray-600
              ">
                Image URL
              </label>

              <input
                type="url"
                name="image"
                value={destinationForm.image}
                onChange={handleDestinationFormChange}
                placeholder="https://..."
                className="
                  h-11
                  w-full
                  rounded-xl
                  border
                  border-gray-200
                  bg-gray-50
                  px-3
                  text-sm
                  text-gray-700
                  outline-none
                  transition-all
                  focus:border-green-500
                  focus:bg-white
                  focus:ring-4
                  focus:ring-green-50
                "
              />
            </div>

            {/* Description */}

            <div className="sm:col-span-2">
              <label className="
                mb-1.5
                block
                text-xs
                font-semibold
                text-gray-600
              ">
                Description
              </label>

              <textarea
                name="description"
                value={destinationForm.description}
                onChange={handleDestinationFormChange}
                rows={4}
                placeholder="Describe this destination..."
                className="
                  w-full
                  resize-none
                  rounded-xl
                  border
                  border-gray-200
                  bg-gray-50
                  px-3
                  py-3
                  text-sm
                  text-gray-700
                  outline-none
                  transition-all
                  focus:border-green-500
                  focus:bg-white
                  focus:ring-4
                  focus:ring-green-50
                "
              />
            </div>

            {/* Featured */}

            <div className="sm:col-span-2">
              <label className="
                flex
                cursor-pointer
                items-center
                gap-3
                rounded-xl
                border
                border-gray-200
                bg-gray-50
                p-3
              ">
                <input
                  type="checkbox"
                  name="featured"
                  checked={destinationForm.featured}
                  onChange={handleDestinationFormChange}
                  className="
                    h-4
                    w-4
                    accent-green-600
                  "
                />

                <div>
                  <p className="
                    text-sm
                    font-semibold
                    text-gray-700
                  ">
                    Featured Destination
                  </p>

                  <p className="
                    text-xs
                    text-gray-400
                  ">
                    Show this destination as featured.
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Buttons */}

          <div className="
            mt-6
            flex
            gap-3
            border-t
            border-gray-100
            pt-5
          ">
            <motion.button
              type="button"
              whileTap={{
                scale: 0.96,
              }}
              disabled={savingDestination}
              onClick={() =>
                setShowDestinationModal(false)
              }
              className="
                flex-1
                rounded-xl
                border
                border-gray-200
                py-2.5
                text-sm
                font-semibold
                text-gray-600
                transition-colors
                hover:bg-gray-50
                disabled:opacity-50
              "
            >
              Cancel
            </motion.button>

            <motion.button
              type="submit"
              whileHover={{
                y: -1,
              }}
              whileTap={{
                scale: 0.96,
              }}
              disabled={savingDestination}
              className="
                flex-1
                rounded-xl
                bg-green-600
                py-2.5
                text-sm
                font-semibold
                text-white
                shadow-sm
                shadow-green-200
                transition-colors
                hover:bg-green-700
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              {savingDestination
                ? "Saving..."
                : editingDestination
                ? "Update Destination"
                : "Add Destination"}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>


      {/* =========================
          DELETE MODAL
      ========================= */}

      <AnimatePresence>
        {deleteDestination && (
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
            onClick={() =>
              setDeleteDestination(null)
            }
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
              onClick={(e) =>
                e.stopPropagation()
              }
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
                Delete Destination?
              </h3>

              <p className="
                mt-2
                text-sm
                leading-6
                text-gray-500
              ">
                Are you sure you want to delete{" "}
                <b className="text-gray-700">
                  {deleteDestination.name}
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
                    setDeleteDestination(null)
                  }
                  className="
                    flex-1
                    rounded-xl
                    border
                    border-gray-200
                    py-2.5
                    text-sm
                    font-semibold
                    text-gray-600
                    hover:bg-gray-50
                  "
                >
                  Cancel
                </button>

                <motion.button
                  whileTap={{
                    scale: 0.96,
                  }}
                  onClick={handleDelete}
                  className="
                    flex-1
                    rounded-xl
                    bg-red-500
                    py-2.5
                    text-sm
                    font-semibold
                    text-white
                    hover:bg-red-600
                  "
                >
                  Delete
                </motion.button>

              </div>

            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}


/* =========================================
   STAT COMPONENT
========================================= */

function Stat({
  title,
  value,
  icon,
  variants,
}:StatProps) {
  return (
    <motion.div
      variants={variants}
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
        transition-shadow
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
              duration: 0.35,
            }}
            className="
              mt-2
              text-2xl
              font-bold
              text-gray-900
            "
          >
            {value}
          </motion.p>

        </div>

        <motion.div
          whileHover={{
            scale: 1.08,
            rotate: 6,
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
   ACTION BUTTON
========================================= */
type ActionButtonProps = {
  icon: React.ReactNode;
  onClick?: () => void;
  hover: "green" | "blue" | "red";
};

function ActionButton({
  icon,
  onClick,
  hover,
}:ActionButtonProps) {
  const hoverClasses = {
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
        rounded-lg
        p-2
        text-gray-400
        transition-colors
        ${hoverClasses[hover]}
      `}
    >
      {icon}
    </motion.button>
  );
}
