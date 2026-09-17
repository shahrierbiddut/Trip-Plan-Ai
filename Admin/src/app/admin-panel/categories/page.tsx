
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion,type Variants } from "framer-motion";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  Eye,
  X,
  FolderOpen,
  MapPin,
  Trees,
  Waves,
  Mountain,
  Building2,
  Utensils,
  Camera,
  Heart,
  Compass,
  Globe2,
  Landmark,
  TentTree,
  RefreshCw,
  Check,
  AlertCircle,
  Sparkles,
  ChevronRight,
} from "lucide-react";

/* =========================================================
   TYPES
========================================================= */

type CategoryStatus = "Active" | "Inactive";

type Category = {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  destinations: number;
  status: CategoryStatus;
  lastUpdated: string;
};

type CategoryForm = {
  name: string;
  slug: string;
  icon: string;
  description: string;
  destinations: number;
  status: CategoryStatus;
};
type ToastType = "success" | "error";

type ToastState = {
  type: ToastType;
  message: string;
} | null;



/* =========================================================
   CONFIG
========================================================= */

const API_URL =
  (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/+$/, "");

const CATEGORIES_API = `${API_URL}/api/travel-categories`;

/* =========================================================
   ICONS
========================================================= */

const iconMap: Record<string, React.ElementType> = {
  Trees,
  Waves,
  Mountain,
  Building2,
  Utensils,
  Camera,
  Heart,
  Compass,
  Globe2,
  Landmark,
  TentTree,
  FolderOpen,
};

const iconOptions = [
  { value: "Trees", label: "Nature", icon: Trees },
  { value: "Waves", label: "Beach", icon: Waves },
  { value: "Mountain", label: "Hill", icon: Mountain },
  { value: "Building2", label: "City", icon: Building2 },
  { value: "Utensils", label: "Food", icon: Utensils },
  { value: "Camera", label: "Photography", icon: Camera },
  { value: "Heart", label: "Romantic", icon: Heart },
  { value: "Compass", label: "Adventure", icon: Compass },
  { value: "Globe2", label: "Travel", icon: Globe2 },
  { value: "Landmark", label: "Historical", icon: Landmark },
  { value: "TentTree", label: "Camping", icon: TentTree },
];

/* =========================================================
   ANIMATION
========================================================= */

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const cardVariants: Variants = {
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

const modalVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.94,
    y: 20,
  },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    y: 15,
    transition: {
      duration: 0.2,
    },
  },
};

/* =========================================================
   HELPERS
========================================================= */

const getIconComponent = (iconName: string) => {
  return iconMap[iconName] || Globe2;
};

const getIconStyle = (iconName: string) => {
  const styles: Record<string, string> = {
    Trees: "bg-emerald-50 text-emerald-600 ring-emerald-100",
    Waves: "bg-sky-50 text-sky-600 ring-sky-100",
    Mountain: "bg-teal-50 text-teal-600 ring-teal-100",
    Building2: "bg-violet-50 text-violet-600 ring-violet-100",
    Utensils: "bg-orange-50 text-orange-600 ring-orange-100",
    Camera: "bg-pink-50 text-pink-600 ring-pink-100",
    Heart: "bg-rose-50 text-rose-600 ring-rose-100",
    Compass: "bg-lime-50 text-lime-600 ring-lime-100",
    Globe2: "bg-green-50 text-green-600 ring-green-100",
    Landmark: "bg-amber-50 text-amber-600 ring-amber-100",
    TentTree: "bg-cyan-50 text-cyan-600 ring-cyan-100",
  };

  return (
    styles[iconName] ||
    "bg-green-50 text-green-600 ring-green-100"
  );
};

const createSlug = (value: string) => {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

const formatDate = (date?: string) => {
  if (!date) return "Recently";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return "Recently";
  }

  return parsed.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const emptyForm: CategoryForm = {
  name: "",
  slug: "",
  icon: "Globe2",
  description: "",
  destinations: 0,
  status: "Active",
};

/* =========================================================
   PAGE
========================================================= */

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "All" | CategoryStatus
  >("All");

  const [selectedCategory, setSelectedCategory] =
    useState<Category | null>(null);

  const [editingCategory, setEditingCategory] =
    useState<Category | null>(null);

  const [deleteCategory, setDeleteCategory] =
    useState<Category | null>(null);

  const [isFormOpen, setIsFormOpen] = useState(false);

  const [form, setForm] = useState<CategoryForm>(emptyForm);

  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [toast, setToast] = useState<ToastState>(null);

  /* =======================================================
     TOAST
  ======================================================= */

  const showToast = useCallback(
    (type: ToastType, message: string) => {
      setToast({
        type,
        message,
      });

      window.setTimeout(() => {
        setToast(null);
      }, 3000);
    },
    []
  );

  /* =======================================================
     FETCH CATEGORIES
  ======================================================= */

  const fetchCategories = useCallback(
    async (showRefresh = false) => {
      try {
        if (showRefresh) {
          setRefreshing(true);
        } else {
          setLoading(true);
        }

        const response = await fetch(CATEGORIES_API, {
          method: "GET",
          cache: "no-store",
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(
            result.message || "Failed to fetch categories"
          );
        }

        const mappedCategories: Category[] = (
          result.data || []
        ).map((item: any) => ({
          id: String(item._id || item.id),
          name:
            item.title ||
            item.name ||
            "Untitled Category",
          slug:
            item.slug ||
            createSlug(
              item.title || item.name || "category"
            ),
          icon: item.icon || "Globe2",
          description:
            item.description ||
            "No description provided.",
          destinations: Number(
            item.tripCount ??
              item.destinationCount ??
              item.destinations ??
              0
          ),
          status:
            item.isActive === false
              ? "Inactive"
              : "Active",
          lastUpdated: formatDate(item.updatedAt),
        }));

        setCategories(mappedCategories);
      } catch (error) {
        console.error(
          "Failed to fetch categories:",
          error
        );

        showToast(
          "error",
          "Unable to load categories. Please check your server."
        );
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [showToast]
  );

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  /* =======================================================
     FILTER
  ======================================================= */

  const filteredCategories = useMemo(() => {
    const query = search.toLowerCase().trim();

    return categories.filter((category) => {
      const matchesSearch =
        !query ||
        category.name.toLowerCase().includes(query) ||
        category.slug.toLowerCase().includes(query) ||
        category.description
          .toLowerCase()
          .includes(query);

      const matchesStatus =
        statusFilter === "All" ||
        category.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [categories, search, statusFilter]);

  /* =======================================================
     STATS
  ======================================================= */

  const totalCategories = categories.length;

  const activeCategories = categories.filter(
    (category) => category.status === "Active"
  ).length;

  const inactiveCategories = categories.filter(
    (category) => category.status === "Inactive"
  ).length;

  const totalDestinations = categories.reduce(
    (sum, category) =>
      sum + Number(category.destinations || 0),
    0
  );

  /* =======================================================
     OPEN ADD
  ======================================================= */

  const openAddModal = () => {
    setEditingCategory(null);
    setForm(emptyForm);
    setIsFormOpen(true);
  };

  /* =======================================================
     OPEN EDIT
  ======================================================= */

  const openEditModal = (category: Category) => {
    setEditingCategory(category);

setForm({
  name: category.name,
  slug: category.slug,
  icon: category.icon,
  description: category.description,
  destinations: category.destinations,
  status: category.status,
});
    setIsFormOpen(true);
  };

  /* =======================================================
     CLOSE FORM
  ======================================================= */

  const closeForm = () => {
    if (saving) return;

    setIsFormOpen(false);
    setEditingCategory(null);
    setForm(emptyForm);
  };

  /* =======================================================
     FORM CHANGE
  ======================================================= */

  const updateForm = (
  key: keyof CategoryForm,
  value: string | number
) => {
  setForm((current) => ({
    ...current,
    [key]: value,
  }));
};

  /* =======================================================
     ADD / UPDATE
  ======================================================= */

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const trimmedName = form.name.trim();

    if (!trimmedName) {
      showToast(
        "error",
        "Please enter a category name."
      );
      return;
    }

    if (!form.description.trim()) {
      showToast(
        "error",
        "Please add a short description."
      );
      return;
    }

    try {
      setSaving(true);

      const payload = {
  title: trimmedName,
  name: trimmedName,
  slug:
    form.slug.trim() ||
    createSlug(trimmedName),
  icon: form.icon,
  description: form.description.trim(),
  destinations: Number(form.destinations) || 0,
  isActive: form.status === "Active",
};

      const url = editingCategory
        ? `${CATEGORIES_API}/${editingCategory.id}`
        : CATEGORIES_API;

      const response = await fetch(url, {
        method: editingCategory ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ||
            "Failed to save category."
        );
      }

      await fetchCategories();

      closeForm();

      showToast(
        "success",
        editingCategory
          ? "Category updated successfully."
          : "Category created successfully."
      );
    } catch (error) {
      console.error(
        "Failed to save category:",
        error
      );

      showToast(
        "error",
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setSaving(false);
    }
  };

  /* =======================================================
     DELETE
  ======================================================= */

  const handleDelete = async () => {
    if (!deleteCategory) return;

    try {
      setDeleting(true);

      const response = await fetch(
        `${CATEGORIES_API}/${deleteCategory.id}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ||
            "Failed to delete category."
        );
      }

      setCategories((current) =>
        current.filter(
          (category) =>
            category.id !== deleteCategory.id
        )
      );

      if (
        selectedCategory?.id ===
        deleteCategory.id
      ) {
        setSelectedCategory(null);
      }

      setDeleteCategory(null);

      showToast(
        "success",
        "Category deleted successfully."
      );
    } catch (error) {
      console.error(
        "Failed to delete category:",
        error
      );

      showToast(
        "error",
        error instanceof Error
          ? error.message
          : "Failed to delete category."
      );
    } finally {
      setDeleting(false);
    }
  };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#f7faf8] mt-[70px]">
      {/* =====================================================
          BACKGROUND DECORATION
      ===================================================== */}

      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-emerald-100/40 blur-3xl" />
        <div className="absolute -left-32 top-[45%] h-80 w-80 rounded-full bg-green-100/30 blur-3xl" />
      </div>

      <div className="w-full p-4 sm:p-6 lg:p-8">
        {/* ===================================================
            HEADER
        =================================================== */}

        <motion.div
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-7"
        >
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
                  <Sparkles size={16} />
                </span>

                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600">
                  Travel Management
                </span>
              </div>

              <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Categories
              </h1>

              <p className="mt-1 max-w-xl text-sm leading-6 text-slate-500">
                Organize your travel experiences into
                meaningful categories and keep your
                destination library beautifully structured.
              </p>
            </div>

            <div className="flex gap-2">
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => fetchCategories(true)}
                disabled={refreshing}
                className="flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-600 shadow-sm transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
              >
                <RefreshCw
                  size={16}
                  className={
                    refreshing
                      ? "animate-spin"
                      : ""
                  }
                />
                <span className="hidden sm:inline">
                  Refresh
                </span>
              </motion.button>

              <motion.button
                whileHover={{
                  y: -2,
                  scale: 1.01,
                }}
                whileTap={{ scale: 0.97 }}
                onClick={openAddModal}
                className="flex h-11 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 text-sm font-semibold text-white shadow-lg shadow-emerald-100 transition hover:bg-emerald-700 cursor-pointer"
              >
                <Plus size={18} />
                Add Category
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* ===================================================
            STATS
        =================================================== */}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
        >
          <StatCard
            title="Total Categories"
            value={totalCategories}
            description="All travel categories"
            icon={<FolderOpen size={20} />}
          />

          <StatCard
            title="Active"
            value={activeCategories}
            description="Currently available"
            icon={<Check size={20} />}
          />

          <StatCard
            title="Inactive"
            value={inactiveCategories}
            description="Currently hidden"
            icon={<AlertCircle size={20} />}
          />

          <StatCard
            title="Destinations"
            value={totalDestinations}
            description="Across all categories"
            icon={<MapPin size={20} />}
          />
        </motion.div>

        {/* ===================================================
            MAIN PANEL
        =================================================== */}

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
            duration: 0.5,
            delay: 0.1,
          }}
          className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-[0_10px_40px_rgba(15,23,42,0.04)]"
        >
          {/* ================================================
              SEARCH BAR
          ================================================= */}

          <div className="border-b border-slate-100 p-4 sm:p-5">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="relative w-full lg:max-w-md">
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  placeholder="Search categories..."
                  className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-11 pr-10 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-50"
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
                      onClick={() => setSearch("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                    >
                      <X size={15} />
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex w-full gap-2 overflow-x-auto lg:w-auto">
                {(
                  [
                    "All",
                    "Active",
                    "Inactive",
                  ] as const
                ).map((filter) => (
                  <motion.button
                    key={filter}
                    whileTap={{ scale: 0.96 }}
                    onClick={() =>
                      setStatusFilter(filter)
                    }
                    className={`whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                      statusFilter === filter
                        ? "bg-emerald-600 text-white shadow-md shadow-emerald-100"
                        : "bg-slate-50 text-slate-500 hover:bg-emerald-50 hover:text-emerald-700"
                    }`}
                  >
                    {filter}
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <p className="text-xs text-slate-400">
                Showing{" "}
                <span className="font-semibold text-slate-600">
                  {filteredCategories.length}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-slate-600">
                  {categories.length}
                </span>{" "}
                categories
              </p>

              {(search ||
                statusFilter !== "All") && (
                <button
                  onClick={() => {
                    setSearch("");
                    setStatusFilter("All");
                  }}
                  className="text-xs font-semibold text-emerald-600 hover:text-emerald-700"
                >
                  Clear filters
                </button>
              )}
            </div>
          </div>

          {/* ================================================
              LOADING
          ================================================= */}

          {loading ? (
            <LoadingState />
          ) : (
            <>
              {/* ============================================
                  DESKTOP TABLE
              ============================================= */}

              <div className="hidden overflow-x-auto lg:block">
                {filteredCategories.length > 0 ? (
                  <table className="w-full min-w-[850px]">
                    <thead>
                      <tr className="border-b border-slate-100 bg-slate-50/70">
                        <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
                          Category
                        </th>

                        <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
                          Description
                        </th>

                        <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
                          Destinations
                        </th>

                        <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
                          Status
                        </th>

                        <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
                          Updated
                        </th>

                        <th className="px-6 py-4 text-right text-[11px] font-bold uppercase tracking-wider text-slate-400">
                          Actions
                        </th>
                      </tr>
                    </thead>

                    <motion.tbody
                      variants={containerVariants}
                      initial="hidden"
                      animate="show"
                    >
                      <AnimatePresence mode="popLayout">
                        {filteredCategories.map(
                          (category) => {
                            const Icon =
                              getIconComponent(
                                category.icon
                              );

                            return (
                              <motion.tr
                                key={category.id}
                                layout
                                variants={cardVariants}
                                initial="hidden"
                                animate="show"
                                exit={{
                                  opacity: 0,
                                  x: 30,
                                }}
                                whileHover={{
                                  backgroundColor:
                                    "rgba(236,253,245,0.45)",
                                }}
                                className="border-b border-slate-50 last:border-0"
                              >
                                <td className="px-6 py-5">
                                  <div className="flex items-center gap-3">
                                    <div
                                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ring-1 ${getIconStyle(
                                        category.icon
                                      )}`}
                                    >
                                      <Icon size={19} />
                                    </div>

                                    <div className="min-w-0">
                                      <p className="font-semibold text-slate-800">
                                        {category.name}
                                      </p>

                                      <p className="mt-0.5 text-xs text-slate-400">
                                        /
                                        {category.slug}
                                      </p>
                                    </div>
                                  </div>
                                </td>

                                <td className="max-w-[300px] px-6 py-5">
                                  <p className="truncate text-sm text-slate-500">
                                    {
                                      category.description
                                    }
                                  </p>
                                </td>

                                <td className="px-6 py-5">
                                  <div className="flex items-center gap-2">
                                    <MapPin
                                      size={15}
                                      className="text-emerald-500"
                                    />

                                    <span className="text-sm font-semibold text-slate-700">
                                      {
                                        category.destinations
                                      }
                                    </span>
                                  </div>
                                </td>

                                <td className="px-6 py-5">
                                  <StatusBadge
                                    status={
                                      category.status
                                    }
                                  />
                                </td>

                                <td className="px-6 py-5">
                                  <span className="text-xs text-slate-400">
                                    {
                                      category.lastUpdated
                                    }
                                  </span>
                                </td>

                                <td className="px-6 py-5">
                                  <div className="flex items-center justify-end gap-1">
                                    <ActionButton
                                      type="view"
                                      onClick={() =>
                                        setSelectedCategory(
                                          category
                                        )
                                      }
                                      icon={
                                        <Eye
                                          size={16}
                                        />
                                      }
                                    />

                                    <ActionButton
                                      type="edit"
                                      onClick={() =>
                                        openEditModal(
                                          category
                                        )
                                      }
                                      icon={
                                        <Pencil
                                          size={16}
                                        />
                                      }
                                    />

                                    <ActionButton
                                      type="delete"
                                      onClick={() =>
                                        setDeleteCategory(
                                          category
                                        )
                                      }
                                      icon={
                                        <Trash2
                                          size={16}
                                        />
                                      }
                                    />
                                  </div>
                                </td>
                              </motion.tr>
                            );
                          }
                        )}
                      </AnimatePresence>
                    </motion.tbody>
                  </table>
                ) : (
                  <EmptyState
                    search={search}
                    onAdd={openAddModal}
                  />
                )}
              </div>

              {/* ============================================
                  MOBILE / TABLET
              ============================================= */}

              <div className="p-4 lg:hidden">
                {filteredCategories.length > 0 ? (
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 gap-4 sm:grid-cols-2"
                  >
                    <AnimatePresence mode="popLayout">
                      {filteredCategories.map(
                        (category) => {
                          const Icon =
                            getIconComponent(
                              category.icon
                            );

                          return (
                            <motion.div
                              key={category.id}
                              layout
                              variants={cardVariants}
                              initial="hidden"
                              animate="show"
                              exit={{
                                opacity: 0,
                                scale: 0.95,
                              }}
                              whileHover={{ y: -4 }}
                              className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-emerald-100 hover:shadow-lg hover:shadow-emerald-50"
                            >
                              <div className="flex items-start justify-between gap-3">
                                <div className="flex min-w-0 items-center gap-3">
                                  <div
                                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ring-1 ${getIconStyle(
                                      category.icon
                                    )}`}
                                  >
                                    <Icon size={21} />
                                  </div>

                                  <div className="min-w-0">
                                    <h3 className="truncate text-base font-bold text-slate-800">
                                      {
                                        category.name
                                      }
                                    </h3>

                                    <p className="mt-0.5 truncate text-xs text-slate-400">
                                      /
                                      {
                                        category.slug
                                      }
                                    </p>
                                  </div>
                                </div>

                                <StatusBadge
                                  status={
                                    category.status
                                  }
                                  small
                                />
                              </div>

                              <p className="mt-4 line-clamp-2 text-sm leading-6 text-slate-500">
                                {
                                  category.description
                                }
                              </p>

                              <div className="mt-4 flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2.5">
                                <div className="flex items-center gap-2">
                                  <MapPin
                                    size={15}
                                    className="text-emerald-500"
                                  />

                                  <span className="text-xs font-semibold text-slate-600">
                                    {
                                      category.destinations
                                    }{" "}
                                    destinations
                                  </span>
                                </div>

                                <span className="text-[10px] text-slate-400">
                                  {
                                    category.lastUpdated
                                  }
                                </span>
                              </div>

                              <div className="mt-3 grid grid-cols-3 gap-2">
                                <button
                                  onClick={() =>
                                    setSelectedCategory(
                                      category
                                    )
                                  }
                                  className="flex items-center justify-center gap-1.5 rounded-xl bg-emerald-50 py-2.5 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-100"
                                >
                                  <Eye size={14} />
                                  View
                                </button>

                                <button
                                  onClick={() =>
                                    openEditModal(
                                      category
                                    )
                                  }
                                  className="flex items-center justify-center gap-1.5 rounded-xl bg-sky-50 py-2.5 text-xs font-semibold text-sky-700 transition hover:bg-sky-100"
                                >
                                  <Pencil size={14} />
                                  Edit
                                </button>

                                <button
                                  onClick={() =>
                                    setDeleteCategory(
                                      category
                                    )
                                  }
                                  className="flex items-center justify-center gap-1.5 rounded-xl bg-rose-50 py-2.5 text-xs font-semibold text-rose-600 transition hover:bg-rose-100"
                                >
                                  <Trash2 size={14} />
                                  Delete
                                </button>
                              </div>
                            </motion.div>
                          );
                        }
                      )}
                    </AnimatePresence>
                  </motion.div>
                ) : (
                  <EmptyState
                    search={search}
                    onAdd={openAddModal}
                  />
                )}
              </div>
            </>
          )}
        </motion.div>
      </div>

      {/* =====================================================
          VIEW MODAL
      ===================================================== */}

      <AnimatePresence>
        {selectedCategory && (
          <ModalOverlay
            onClose={() =>
              setSelectedCategory(null)
            }
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl"
            >
              <div className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-green-50 p-6">
                <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-emerald-100/60 blur-2xl" />

                <div className="relative flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-2xl ring-1 ${getIconStyle(
                        selectedCategory.icon
                      )}`}
                    >
                      {(() => {
                        const Icon =
                          getIconComponent(
                            selectedCategory.icon
                          );

                        return <Icon size={25} />;
                      })()}
                    </div>

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-600">
                        Category
                      </p>

                      <h2 className="mt-1 text-xl font-bold text-slate-900">
                        {selectedCategory.name}
                      </h2>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      setSelectedCategory(null)
                    }
                    className="rounded-xl p-2 text-slate-400 transition hover:bg-white hover:text-slate-700"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-sm leading-6 text-slate-600">
                    {
                      selectedCategory.description
                    }
                  </p>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <InfoBox
                    label="Destinations"
                    value={String(
                      selectedCategory.destinations
                    )}
                    icon={
                      <MapPin size={16} />
                    }
                  />

                  <InfoBox
                    label="Status"
                    value={
                      selectedCategory.status
                    }
                    icon={<Check size={16} />}
                  />
                </div>

                <div className="mt-3 rounded-2xl border border-slate-100 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Slug
                  </p>

                  <p className="mt-1 font-mono text-sm text-slate-600">
                    /{selectedCategory.slug}
                  </p>
                </div>

                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() => {
                      openEditModal(
                        selectedCategory
                      );
                      setSelectedCategory(null);
                    }}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
                  >
                    <Pencil size={16} />
                    Edit Category
                  </button>

                  <button
                    onClick={() => {
                      setDeleteCategory(
                        selectedCategory
                      );
                      setSelectedCategory(null);
                    }}
                    className="flex items-center justify-center rounded-xl bg-rose-50 px-4 text-rose-600 transition hover:bg-rose-100"
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              </div>
            </motion.div>
          </ModalOverlay>
        )}
      </AnimatePresence>

      {/* =====================================================
          ADD / EDIT MODAL
      ===================================================== */}

      <AnimatePresence>
        {isFormOpen && (
          <ModalOverlay onClose={closeForm}>
            <motion.form
              variants={modalVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              onSubmit={handleSubmit}
              className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white shadow-2xl"
            >
              <div className="border-b border-slate-100 p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="mb-2 flex items-center gap-2">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
                        {editingCategory ? (
                          <Pencil size={15} />
                        ) : (
                          <Plus size={16} />
                        )}
                      </span>

                      <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-600">
                        Category Manager
                      </span>
                    </div>

                    <h2 className="text-xl font-bold text-slate-900">
                      {editingCategory
                        ? "Edit Category"
                        : "Create Category"}
                    </h2>

                    <p className="mt-1 text-sm text-slate-400">
                      {editingCategory
                        ? "Update the category information below."
                        : "Add a new category to your travel platform."}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={closeForm}
                    className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              <div className="space-y-5 p-6">
                {/* NAME */}

                <FormField label="Category Name">
                  <input
                    type="text"
                    value={form.name}
                    onChange={(event) => {
                      const name =
                        event.target.value;

                      setForm((current) => ({
                        ...current,
                        name,
                        slug:
                          current.slug ===
                            createSlug(
                              current.name
                            ) ||
                          !current.slug
                            ? createSlug(name)
                            : current.slug,
                      }));
                    }}
                    placeholder="e.g. Nature & Wildlife"
                    className="form-input"
                    required
                  />
                </FormField>

                {/* SLUG */}

                <FormField
                  label="Slug"
                  hint="Used for category URLs"
                >
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                      /
                    </span>

                    <input
                      type="text"
                      value={form.slug}
                      onChange={(event) =>
                        updateForm(
                          "slug",
                          createSlug(
                            event.target.value
                          )
                        )
                      }
                      placeholder="nature-wildlife"
                      className="form-input pl-8"
                    />
                  </div>
                </FormField>

                {/* ICON */}

                <FormField label="Category Icon">
                  <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
                    {iconOptions.map(
                      (option) => {
                        const Icon =
                          option.icon;

                        const selected =
                          form.icon ===
                          option.value;

                        return (
                          <button
                            type="button"
                            key={option.value}
                            title={option.label}
                            onClick={() =>
                              updateForm(
                                "icon",
                                option.value
                              )
                            }
                            className={`group flex h-12 items-center justify-center rounded-xl border transition ${
                              selected
                                ? "border-emerald-400 bg-emerald-50 text-emerald-600 ring-4 ring-emerald-50"
                                : "border-slate-200 bg-white text-slate-400 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-600"
                            }`}
                          >
                            <Icon size={19} />
                          </button>
                        );
                      }
                    )}
                  </div>

                  <p className="mt-2 text-xs text-slate-400">
                    Choose an icon that best represents
                    this category.
                  </p>
                </FormField>

                {/* DESCRIPTION */}

                <FormField label="Description">
                  <textarea
                    value={form.description}
                    onChange={(event) =>
                      updateForm(
                        "description",
                        event.target.value
                      )
                    }
                    placeholder="Write a short and meaningful description..."
                    rows={4}
                    className="form-input resize-none py-3"
                    required
                  />

                  <div className="mt-1 text-right text-[10px] text-slate-400">
                    {form.description.length}/300
                  </div>

                </FormField>


{/* DESTINATIONS */}

                <FormField
  label="Destinations"
  hint="Number of destinations"
>
  <div className="relative">
    <MapPin
      size={17}
      className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500"
    />

    <input
      type="number"
      min="0"
      value={form.destinations}
      onChange={(event) =>
        updateForm(
          "destinations",
          Math.max(0, Number(event.target.value))
        )
      }
      placeholder="0"
      className="form-input pl-11"
    />
  </div>

  <p className="mt-2 text-xs text-slate-400">
    Enter the number of destinations in this category.
  </p>
</FormField>

                {/* STATUS */}

                <FormField label="Status">
                  <div className="grid grid-cols-2 gap-2">
                    {(
                      [
                        "Active",
                        "Inactive",
                      ] as const
                    ).map((status) => (
                      <button
                        type="button"
                        key={status}
                        onClick={() =>
                          updateForm(
                            "status",
                            status
                          )
                        }
                        className={`flex items-center justify-center gap-2 rounded-xl border py-3 text-sm font-semibold transition ${
                          form.status === status
                            ? status ===
                              "Active"
                              ? "border-emerald-300 bg-emerald-50 text-emerald-700"
                              : "border-slate-300 bg-slate-100 text-slate-700"
                            : "border-slate-200 bg-white text-slate-400 hover:bg-slate-50"
                        }`}
                      >
                        <span
                          className={`h-2 w-2 rounded-full ${
                            status ===
                            "Active"
                              ? "bg-emerald-500"
                              : "bg-slate-400"
                          }`}
                        />

                        {status}
                      </button>
                    ))}
                  </div>
                </FormField>
              </div>

              {/* ACTIONS */}

              <div className="flex gap-3 border-t border-slate-100 bg-slate-50/50 p-6">
                <button
                  type="button"
                  onClick={closeForm}
                  disabled={saving}
                  className="flex-1 rounded-xl border border-slate-200 bg-white py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
                >
                  Cancel
                </button>

                <motion.button
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  disabled={saving}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-100 transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? (
                    <>
                      <RefreshCw
                        size={16}
                        className="animate-spin"
                      />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Check size={16} />
                      {editingCategory
                        ? "Save Changes"
                        : "Create Category"}
                    </>
                  )}
                </motion.button>
              </div>
            </motion.form>
          </ModalOverlay>
        )}
      </AnimatePresence>

      {/* =====================================================
          DELETE MODAL
      ===================================================== */}

      <AnimatePresence>
        {deleteCategory && (
          <ModalOverlay
            onClose={() => {
              if (!deleting) {
                setDeleteCategory(null);
              }
            }}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="w-full max-w-sm rounded-3xl bg-white p-6 text-center shadow-2xl"
            >
              <motion.div
                initial={{
                  scale: 0,
                  rotate: -10,
                }}
                animate={{
                  scale: 1,
                  rotate: 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 250,
                  damping: 15,
                }}
                className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-50 text-rose-500"
              >
                <Trash2 size={25} />
              </motion.div>

              <h3 className="mt-5 text-xl font-bold text-slate-900">
                Delete Category?
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                You're about to remove{" "}
                <span className="font-semibold text-slate-700">
                  {deleteCategory.name}
                </span>
                . This action cannot be undone.
              </p>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() =>
                    setDeleteCategory(null)
                  }
                  disabled={deleting}
                  className="flex-1 rounded-xl border border-slate-200 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
                >
                  Cancel
                </button>

                <motion.button
                  whileTap={{ scale: 0.96 }}
                  onClick={handleDelete}
                  disabled={deleting}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-rose-500 py-3 text-sm font-semibold text-white transition hover:bg-rose-600 disabled:opacity-60"
                >
                  {deleting ? (
                    <>
                      <RefreshCw
                        size={15}
                        className="animate-spin"
                      />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 size={15} />
                      Delete
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          </ModalOverlay>
        )}
      </AnimatePresence>

      {/* =====================================================
          TOAST
      ===================================================== */}

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{
              opacity: 0,
              y: -20,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: -15,
              scale: 0.95,
            }}
            className="fixed right-4 top-5 z-[200] w-[calc(100%-2rem)] max-w-sm"
          >
            <div
              className={`flex items-center gap-3 rounded-2xl border bg-white p-4 shadow-2xl ${
                toast.type === "success"
                  ? "border-emerald-100"
                  : "border-rose-100"
              }`}
            >
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                  toast.type === "success"
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-rose-50 text-rose-500"
                }`}
              >
                {toast.type === "success" ? (
                  <Check size={17} />
                ) : (
                  <AlertCircle size={17} />
                )}
              </div>

              <p className="text-sm font-semibold text-slate-700">
                {toast.message}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* =========================================================
   STAT CARD
========================================================= */

function StatCard({
  title,
  value,
  description,
  icon,
}: {
  title: string;
  value: number;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -4 }}
      className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:border-emerald-100 hover:shadow-lg hover:shadow-emerald-50"
    >
      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-emerald-50/70 transition group-hover:scale-125" />

      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">
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
            className="mt-2 text-2xl font-bold text-slate-900"
          >
            {value}
          </motion.p>

          <p className="mt-1 text-xs text-slate-400">
            {description}
          </p>
        </div>

        <motion.div
          whileHover={{
            scale: 1.08,
            rotate: 5,
          }}
          className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600"
        >
          {icon}
        </motion.div>
      </div>
    </motion.div>
  );
}


/* =========================================================
   STATUS BADGE
========================================================= */

function StatusBadge({
  status,
  small = false,
}: {
  status: CategoryStatus;
  small?: boolean;
}) {
  const active = status === "Active";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-semibold ${
        small
          ? "px-2.5 py-1 text-[10px]"
          : "px-3 py-1.5 text-xs"
      } ${
        active
          ? "bg-emerald-50 text-emerald-700"
          : "bg-slate-100 text-slate-500"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          active
            ? "bg-emerald-500"
            : "bg-slate-400"
        }`}
      />

      {status}
    </span>
  );
}

/* =========================================================
   ACTION BUTTON
========================================================= */

function ActionButton({
  icon,
  onClick,
  type,
}: {
  icon: React.ReactNode;
  onClick: () => void;
  type: "view" | "edit" | "delete";
}) {
  const styles = {
    view: "hover:bg-emerald-50 hover:text-emerald-600",
    edit: "hover:bg-sky-50 hover:text-sky-600",
    delete: "hover:bg-rose-50 hover:text-rose-500",
  };

  return (
    <motion.button
      whileHover={{
        scale: 1.08,
      }}
      whileTap={{
        scale: 0.9,
      }}
      onClick={onClick}
      className={`rounded-lg p-2 text-slate-400 transition ${styles[type]}`}
    >
      {icon}
    </motion.button>
  );
}

/* =========================================================
   INFO BOX
========================================================= */

function InfoBox({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <div className="flex items-center gap-1.5 text-slate-400">
        {icon}
        <p className="text-[10px] font-bold uppercase tracking-wider">
          {label}
        </p>
      </div>

      <p className="mt-2 text-lg font-bold text-slate-800">
        {value}
      </p>
    </div>
  );
}

/* =========================================================
   FORM FIELD
========================================================= */

function FormField({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label className="text-sm font-semibold text-slate-700">
          {label}
        </label>

        {hint && (
          <span className="text-[10px] text-slate-400">
            {hint}
          </span>
        )}
      </div>

      {children}
    </div>
  );
}

/* =========================================================
   LOADING STATE
========================================================= */

function LoadingState() {
  return (
    <div className="p-5">
      <div className="hidden lg:block">
        <div className="space-y-4">
          {Array.from({ length: 6 }).map(
            (_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay: index * 0.05,
                }}
                className="grid grid-cols-6 gap-5 border-b border-slate-50 py-4"
              >
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
              </motion.div>
            )
          )}
        </div>
      </div>

      <div className="grid gap-4 lg:hidden sm:grid-cols-2">
        {Array.from({ length: 4 }).map(
          (_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * 0.08,
              }}
              className="rounded-2xl border border-slate-100 p-4"
            >
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 animate-pulse rounded-xl bg-slate-100" />

                <div className="flex-1">
                  <div className="h-4 w-32 animate-pulse rounded bg-slate-100" />
                  <div className="mt-2 h-3 w-20 animate-pulse rounded bg-slate-100" />
                </div>
              </div>

              <div className="mt-4 h-10 animate-pulse rounded-xl bg-slate-100" />

              <div className="mt-3 h-9 animate-pulse rounded-xl bg-slate-100" />
            </motion.div>
          )
        )}
      </div>
    </div>
  );
}

function Skeleton() {
  return (
    <div className="h-10 animate-pulse rounded-lg bg-slate-100" />
  );
}

/* =========================================================
   EMPTY STATE
========================================================= */

function EmptyState({
  search,
  onAdd,
}: {
  search: string;
  onAdd: () => void;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 10,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="px-6 py-20 text-center"
    >
      <motion.div
        animate={{
          y: [0, -5, 0],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-500"
      >
        <FolderOpen size={28} />
      </motion.div>

      <h3 className="mt-5 text-lg font-bold text-slate-800">
        No categories found
      </h3>

      <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-400">
        {search
          ? "We couldn't find a category matching your search."
          : "Your travel category collection is empty. Create your first category to get started."}
      </p>

      {!search && (
        <button
          onClick={onAdd}
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
        >
          <Plus size={16} />
          Create Category
        </button>
      )}
    </motion.div>
  );
}

/* =========================================================
   MODAL OVERLAY
========================================================= */

function ModalOverlay({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-slate-950/45 p-4 backdrop-blur-md"
    >
      <div
        onClick={(event) =>
          event.stopPropagation()
        }
        className="flex w-full justify-center"
      >
        {children}
      </div>
    </motion.div>
  );
}


