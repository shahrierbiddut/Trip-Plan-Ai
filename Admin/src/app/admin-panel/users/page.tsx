"use client";

import { useMemo, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  Eye,
  Trash2,
  UserPlus,
  Users,
  UserCheck,
  UserX,
  ChevronLeft,
  ChevronRight,
  X,
  Mail,
  Phone,
  MapPin,
  Pencil
} from "lucide-react";

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 25,
    scale: 0.98,
  },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: index * 0.08,
      duration: 0.45,
      ease: "easeOut",
    },
  }),
};

const ITEMS_PER_PAGE = 8;

type UserStatus = "Active" | "Inactive";
type UserRole = "admin" | "Registered User";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  joined: string;
  trips: number;
  status: UserStatus;
  role: UserRole;
}

interface ApiUser {
  _id?: string;
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
  location?: string;
  createdAt?: string;
  trips?: number;
  status?: UserStatus;
  role?: string;
}

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: "easeOut" as const,
    },
  },
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [deleteUser, setDeleteUser] = useState<User | null>(null);

  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const baseUrl =
    (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/+$/, "");

    const [showUserModal, setShowUserModal] = useState(false);
const [editingUser, setEditingUser] = useState<User | null>(null);

const [userForm, setUserForm] = useState({
  name: "",
  email: "",
  phone: "",
  location: "",
  role: "Registered User",
  status: "Active" as UserStatus,
});

const [formLoading, setFormLoading] = useState(false);

  /* =========================================================
      FETCH USERS
  ========================================================= */

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);

        const response = await fetch(`${baseUrl}/api/users`);

        if (!response.ok) {
          throw new Error(`Failed to fetch users: ${response.status}`);
        }

        const result = await response.json();

        if (result.success && Array.isArray(result.data)) {
          const mappedUsers: User[] = result.data.map(
            (user: ApiUser): User => ({
              id: user._id || user.id || crypto.randomUUID(),
              name: user.name || "Unknown User",
              email: user.email || "No email available",
              phone: user.phone || "+880 0000-000000",
              location: user.location || "Bangladesh",
              joined: (() => {
                if (!user.createdAt) return "Unknown";
                const d = new Date(user.createdAt);
                return isNaN(d.getTime())
                  ? "Unknown"
                  : d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
              })(),
              trips: typeof user.trips === "number" ? user.trips : 0,
              status: user.status === "Inactive" ? "Inactive" : "Active",
              role: user.role?.toLowerCase() === "admin" ? "admin" : "Registered User",
            })
          );

          setUsers(mappedUsers);
        } else {
          setUsers([]);
        }
      } catch (error) {
        console.error("Failed to fetch users:", error);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [baseUrl]);

  /* =========================================================
      FILTER USERS
  ========================================================= */

  const filteredUsers = useMemo(() => {
    const searchValue = search.toLowerCase().trim();

    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchValue) ||
        user.email.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "All" ||
        (statusFilter === "Admin"
          ? user.role === "admin"
          : user.status === statusFilter);

      return matchesSearch && matchesStatus;
    });
  }, [users, search, statusFilter]);

  /* =========================================================
      PAGINATION
  ========================================================= */

  const totalPages = Math.max(
    1,
    Math.ceil(filteredUsers.length / ITEMS_PER_PAGE)
  );

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  /* =========================================================
      STATISTICS
  ========================================================= */

  const activeUsers = users.filter(
    (user) => user.status === "Active"
  ).length;

  const inactiveUsers = users.filter(
    (user) => user.status === "Inactive"
  ).length;

  const adminUsers = users.filter(
    (user) => user.role === "admin"
  ).length;

  /* =========================================================
      SEARCH
  ========================================================= */

  const handleSearch = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  /* =========================================================
      FILTER
  ========================================================= */

  const handleFilter = (value: string) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  /* =========================================================
      CLEAR FILTERS
  ========================================================= */

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("All");
    setCurrentPage(1);
  };

  /* =========================================================
      UPDATE USER ROLE
  ========================================================= */

  const handleRoleUpdate = async (id: string, newRole: UserRole) => {
    try {
      setActionLoading(id);

      const response = await fetch(`${baseUrl}/api/users/${id}/role`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role: newRole }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to update user role");
      }

      setUsers((currentUsers) =>
        currentUsers.map((user) =>
          user.id === id ? { ...user, role: newRole } : user
        )
      );

      setSelectedUser((currentUser) => {
        if (!currentUser || currentUser.id !== id) {
          return currentUser;
        }

        return {
          ...currentUser,
          role: newRole,
        };
      });
    } catch (error) {
      console.error("Failed to update role:", error);
    } finally {
      setActionLoading(null);
    }
  };

  /* =========================================================
      UPDATE USER STATUS
  ========================================================= */

  const handleStatusUpdate = async (
    id: string,
    currentStatus: UserStatus
  ) => {
    const newStatus: UserStatus =
      currentStatus === "Active" ? "Inactive" : "Active";

    try {
      setActionLoading(id);

      const response = await fetch(`${baseUrl}/api/users/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to update user status");
      }

      setUsers((currentUsers) =>
        currentUsers.map((user) =>
          user.id === id
            ? {
                ...user,
                status: newStatus,
              }
            : user
        )
      );

      setSelectedUser((currentUser) => {
        if (!currentUser || currentUser.id !== id) {
          return currentUser;
        }

        return {
          ...currentUser,
          status: newStatus,
        };
      });
    } catch (error) {
      console.error("Failed to update status:", error);
    } finally {
      setActionLoading(null);
    }
  };

  /* =========================================================
    ADD / EDIT USER
========================================================= */

const handleUserSubmit = async (
  e: React.FormEvent<HTMLFormElement>
) => {
  e.preventDefault();

  try {
    setFormLoading(true);

    const isEditing = Boolean(editingUser);

    const url = isEditing
      ? `${baseUrl}/api/users/${editingUser?.id}`
      : `${baseUrl}/api/users`;

    const response = await fetch(url, {
      method: isEditing ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userForm),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(
        result.message ||
          `Failed to ${isEditing ? "update" : "create"} user`
      );
    }

    const apiUser: ApiUser = result.data;

    const mappedUser: User = {
      id:
        apiUser._id ||
        apiUser.id ||
        editingUser?.id ||
        crypto.randomUUID(),

      name: apiUser.name || userForm.name,

      email: apiUser.email || userForm.email,

      phone: apiUser.phone || userForm.phone,

      location:
        apiUser.location || userForm.location || "Bangladesh",

      joined: apiUser.createdAt
        ? new Date(apiUser.createdAt).toLocaleDateString(
            "en-US",
            {
              month: "short",
              day: "numeric",
              year: "numeric",
            }
          )
        : editingUser?.joined ||
          new Date().toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),

      trips:
        typeof apiUser.trips === "number"
          ? apiUser.trips
          : editingUser?.trips || 0,

      status:
        apiUser.status === "Inactive"
          ? "Inactive"
          : userForm.status,

      role:
        (apiUser.role?.toLowerCase() === "admin" || userForm.role.toLowerCase() === "admin")
          ? "admin"
          : "Registered User",
    };

    if (isEditing) {
      setUsers((currentUsers) =>
        currentUsers.map((user) =>
          user.id === editingUser?.id
            ? mappedUser
            : user
        )
      );

      setSelectedUser((currentUser) =>
        currentUser?.id === editingUser?.id
          ? mappedUser
          : currentUser
      );
    } else {
      setUsers((currentUsers) => [
        mappedUser,
        ...currentUsers,
      ]);

      setCurrentPage(1);
    }

    setShowUserModal(false);
    setEditingUser(null);

    setUserForm({
      name: "",
      email: "",
      phone: "",
      location: "",
      role: "Registered User",
      status: "Active",
    });
  } catch (error) {
    console.error(
      `Failed to ${editingUser ? "update" : "create"} user:`,
      error
    );
  } finally {
    setFormLoading(false);
  }
};

  /* =========================================================
      DELETE USER
  ========================================================= */

  const handleDelete = async () => {
    if (!deleteUser) return;

    try {
      setDeleteLoading(true);

      const response = await fetch(
        `${baseUrl}/api/users/${deleteUser.id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      const updatedUsers = users.filter(
        (user) => user.id !== deleteUser.id
      );

      setUsers(updatedUsers);
      setDeleteUser(null);

      const newTotalPages = Math.max(
        1,
        Math.ceil(
          updatedUsers.filter((user) => {
            const searchValue = search.toLowerCase().trim();

            const matchesSearch =
              user.name.toLowerCase().includes(searchValue) ||
              user.email.toLowerCase().includes(searchValue);

            const matchesStatus =
              statusFilter === "All" ||
              (statusFilter === "Admin"
                ? user.role === "admin"
                : user.status === statusFilter);

            return matchesSearch && matchesStatus;
          }).length / ITEMS_PER_PAGE
        )
      );

      if (currentPage > newTotalPages) {
        setCurrentPage(newTotalPages);
      }
    } catch (error) {
      console.error("Failed to delete user:", error);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="min-h-full p-4 sm:p-6 lg:p-8 mt-[100px]">
      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

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
        className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Users
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage and monitor all registered users.
          </p>
        </div>

       <motion.button
  type="button"
  whileHover={{
    scale: 1.03,
    y: -2,
  }}
  whileTap={{
    scale: 0.96,
  }}
  onClick={() => {
    setEditingUser(null);

    setUserForm({
      name: "",
      email: "",
      phone: "",
      location: "",
      role: "Registered User",
      status: "Active",
    });

    setShowUserModal(true);
  }}
  className="
    flex cursor-pointer items-center justify-center gap-2
    rounded-xl bg-green-600
    px-4 py-2.5
    text-sm font-semibold text-white
    shadow-sm shadow-green-200
    transition-colors duration-300
    hover:bg-green-700
  "
>
  <UserPlus size={18} />
  Add User
</motion.button>
      </motion.div>

      {/* =====================================================
          STATISTICS
      ===================================================== */}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3"
      >
        {/* Total Users */}

        <motion.div
          variants={itemVariants}
          whileHover={{
            y: -5,
            transition: {
              duration: 0.2,
            },
          }}
          className="
            group rounded-2xl
            border border-gray-100
            bg-white p-5
            shadow-sm
            transition-shadow duration-300
            hover:shadow-md
          "
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Total Users
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
                  delay: 0.35,
                }}
                className="mt-2 text-2xl font-bold text-gray-900"
              >
                {users.length}
              </motion.p>
            </div>

            <motion.div
              whileHover={{
                rotate: 8,
                scale: 1.08,
              }}
              className="
                flex h-11 w-11
                items-center justify-center
                rounded-xl bg-green-50
                text-green-600
              "
            >
              <Users size={21} />
            </motion.div>
          </div>
        </motion.div>

        {/* Active Users */}

        <motion.div
          variants={itemVariants}
          whileHover={{
            y: -5,
            transition: {
              duration: 0.2,
            },
          }}
          className="
            group rounded-2xl
            border border-gray-100
            bg-white p-5
            shadow-sm
            transition-shadow duration-300
            hover:shadow-md
          "
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Active Users
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
                  delay: 0.45,
                }}
                className="mt-2 text-2xl font-bold text-gray-900"
              >
                {activeUsers}
              </motion.p>
            </div>

            <motion.div
              whileHover={{
                rotate: 8,
                scale: 1.08,
              }}
              className="
                flex h-11 w-11
                items-center justify-center
                rounded-xl bg-green-50
                text-green-600
              "
            >
              <UserCheck size={21} />
            </motion.div>
          </div>
        </motion.div>

        {/* Inactive Users */}

        <motion.div
          variants={itemVariants}
          whileHover={{
            y: -5,
            transition: {
              duration: 0.2,
            },
          }}
          className="
            group rounded-2xl
            border border-gray-100
            bg-white p-5
            shadow-sm
            transition-shadow duration-300
            hover:shadow-md
          "
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Inactive Users
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
                  delay: 0.55,
                }}
                className="mt-2 text-2xl font-bold text-gray-900"
              >
                {inactiveUsers}
              </motion.p>
            </div>

            <motion.div
              whileHover={{
                rotate: 8,
                scale: 1.08,
              }}
              className="
                flex h-11 w-11
                items-center justify-center
                rounded-xl bg-gray-100
                text-gray-500
              "
            >
              <UserX size={21} />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* =====================================================
          MAIN USERS CARD
      ===================================================== */}

      <motion.div
        initial={{
          opacity: 0,
          y: 30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
          delay: 0.25,
        }}
        className="
          overflow-hidden
          rounded-2xl
          border border-gray-100
          bg-white
          shadow-sm
        "
      >
        {/* =====================================================
            SEARCH + FILTER
        ===================================================== */}

        <div
          className="
            flex flex-col gap-3
            border-b border-gray-100
            p-4
            sm:p-5
            lg:flex-row
            lg:items-center
            lg:justify-between
          "
        >
          {/* Search */}

          <div className="relative w-full lg:max-w-md">
            <Search
              size={18}
              className="
                absolute left-3.5 top-1/2
                -translate-y-1/2
                text-gray-400
              "
            />

            <input
              type="text"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search users by name or email..."
              className="
                h-11 w-full
                rounded-xl
                border border-gray-200
                bg-gray-50
                pl-10 pr-10
                text-sm text-gray-700
                outline-none
                transition-all duration-300
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
                  type="button"
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
                  whileTap={{
                    scale: 0.85,
                  }}
                  onClick={() => handleSearch("")}
                  className="
                    absolute right-3
                    top-1/2
                    -translate-y-1/2
                    cursor-pointer
                    text-gray-400
                    hover:text-gray-700
                  "
                >
                  <X size={16} />
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* Filter */}

          <div className="flex items-center gap-2">
            <div
              className="
                flex items-center gap-2
                text-sm text-gray-500
              "
            >
              <SlidersHorizontal size={17} />

              <span className="hidden sm:inline">
                Status:
              </span>
            </div>

            <select
              value={statusFilter}
              onChange={(e) => handleFilter(e.target.value)}
              className="
                h-11 cursor-pointer
                rounded-xl
                border border-gray-200
                bg-white
                px-3
                text-sm text-gray-600
                outline-none
                transition-all
                focus:border-green-500
                focus:ring-4
                focus:ring-green-50
              "
            >
              <option value="All">All Users</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Admin">Admin ({adminUsers})</option>
            </select>
          </div>
        </div>

        {/* =====================================================
            LOADING
        ===================================================== */}

        {loading ? (
          <div className="flex min-h-[350px] items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div
                className="
                  h-10 w-10
                  animate-spin
                  rounded-full
                  border-4
                  border-green-100
                  border-t-green-600
                "
              />

              <p className="text-sm text-gray-400">
                Loading users...
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* =================================================
                DESKTOP TABLE
            ================================================= */}

            <div className="hidden overflow-x-auto md:block">
              <table className="w-full min-w-[850px]">
                <thead>
                  <tr
                    className="
                      border-b border-gray-100
                      bg-gray-50/70
                    "
                  >
                    <th
                      className="
                        px-6 py-4
                        text-left
                        text-xs font-semibold
                        uppercase tracking-wider
                        text-gray-400
                      "
                    >
                      User
                    </th>

                    <th
                      className="
                        px-6 py-4
                        text-left
                        text-xs font-semibold
                        uppercase tracking-wider
                        text-gray-400
                      "
                    >
                      Phone
                    </th>

                    <th
                      className="
                        px-6 py-4
                        text-left
                        text-xs font-semibold
                        uppercase tracking-wider
                        text-gray-400
                      "
                    >
                      Joined
                    </th>

                    <th
                      className="
                        px-6 py-4
                        text-center
                        text-xs font-semibold
                        uppercase tracking-wider
                        text-gray-400
                      "
                    >
                      Trips
                    </th>

                    <th
                      className="
                        px-6 py-4
                        text-left
                        text-xs font-semibold
                        uppercase tracking-wider
                        text-gray-400
                      "
                    >
                      Status
                    </th>

                    <th
                      className="
                        px-6 py-4
                        text-right
                        text-xs font-semibold
                        uppercase tracking-wider
                        text-gray-400
                      "
                    >
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                 <AnimatePresence mode="popLayout">
  {paginatedUsers.map((user, index) => (
    <motion.tr
      key={user.id}
      initial={{
        opacity: 0,
        y: 25,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: -15,
      }}
      transition={{
        duration: 0.4,
        delay: index * 0.08,
      }}
      whileHover={{
        backgroundColor: "rgba(240, 253, 244, 0.5)",
      }}
      className="border-b border-gray-100"
    >
      {/* Name */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.08 }}
            className="
              flex h-10 w-10 shrink-0
              items-center justify-center
              rounded-full
              bg-green-100
              font-bold
              text-green-700
            "
          >
            {user.name.charAt(0).toUpperCase()}
          </motion.div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-gray-800">
              {user.name}
            </p>

            <p className="truncate text-xs text-gray-400">
              {user.email}
            </p>
          </div>
        </div>
      </td>

      {/* Phone */}
      <td className="px-6 py-4">
        <p className="text-sm text-gray-600">
          {user.phone || "—"}
        </p>
      </td>

      {/* Location */}
      <td className="px-6 py-4">
        <p className="text-sm text-gray-600">
          {user.location || "—"}
        </p>
      </td>

      {/* Joined */}
      <td className="px-6 py-4">
        <p className="text-sm text-gray-600">
          {user.joined}
        </p>
      </td>

      {/* Trips */}
      <td className="px-6 py-4">
        <p className="text-sm font-medium text-gray-700">
          {user.trips}
        </p>
      </td>

      {/* Status */}
      <td className="px-6 py-4">
        <span
          className={`
            inline-flex
            rounded-full
            px-3 py-1
            text-xs font-semibold
            ${
              user.status === "Active"
                ? "bg-green-50 text-green-700"
                : "bg-gray-100 text-gray-500"
            }
          `}
        >
          {user.status}
        </span>
      </td>

      {/* Actions */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <select
            value={user.role}
            disabled={actionLoading === user.id}
            onChange={(e) =>
              handleRoleUpdate(user.id, e.target.value as UserRole)
            }
            title="Change User Role"
            className="
              h-9 cursor-pointer
              rounded-lg
              border border-gray-200
              bg-white
              px-2.5
              text-xs font-semibold
              text-gray-600
              outline-none
              transition-all
              focus:border-green-500
              focus:ring-2
              focus:ring-green-50
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            <option value="Registered User">Registered User</option>
            <option value="admin">Admin</option>
          </select>

          <motion.button
            type="button"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setDeleteUser(user)}
            title="Delete User"
            className="
              cursor-pointer
              rounded-lg
              p-2
              text-gray-400
              transition-colors
              hover:bg-red-50
              hover:text-red-600
            "
          >
            <Trash2 size={17} />
          </motion.button>
        </div>
      </td>
    </motion.tr>
  ))}
</AnimatePresence>
                </tbody>
              </table>
            </div>

            {/* =================================================
                MOBILE USER CARDS
            ================================================= */}

            <div className="divide-y divide-gray-100 md:hidden">
              <AnimatePresence mode="popLayout">
                {paginatedUsers.map((user, index) => (
                  <motion.div
                    key={user.id}
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
                      y: -10,
                    }}
                    transition={{
                      duration: 0.35,
                      delay: index * 0.05,
                    }}
                    className="p-4"
                  >
                    <div className="flex items-start gap-3">
                      {/* Avatar */}

                      <motion.div
                        whileHover={{
                          scale: 1.08,
                        }}
                        className="
                          flex h-11 w-11
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          bg-green-100
                          font-bold
                          text-green-700
                        "
                      >
                        {user.name.charAt(0).toUpperCase()}
                      </motion.div>

                      {/* Content */}

                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <p
                              className="
                                truncate
                                text-sm font-semibold
                                text-gray-800
                              "
                            >
                              {user.name}
                            </p>

                            <p
                              className="
                                truncate
                                text-xs
                                text-gray-400
                              "
                            >
                              {user.email}
                            </p>
                          </div>

                          <span
                            className={`
                              shrink-0
                              rounded-full
                              px-2.5 py-1
                              text-[10px]
                              font-semibold
                              ${
                                user.status === "Active"
                                  ? "bg-green-50 text-green-700"
                                  : "bg-gray-100 text-gray-500"
                              }
                            `}
                          >
                            {user.status}
                          </span>
                        </div>

                        {/* Info */}

                        <div className="mt-3 grid grid-cols-2 gap-3">
                          <div>
                            <span className="text-xs text-gray-400">
                              Joined
                            </span>

                            <p
                              className="
                                mt-0.5
                                text-xs font-medium
                                text-gray-600
                              "
                            >
                              {user.joined}
                            </p>
                          </div>

                          <div>
                            <span className="text-xs text-gray-400">
                              Trips
                            </span>

                            <p
                              className="
                                mt-0.5
                                text-xs font-medium
                                text-gray-600
                              "
                            >
                              {user.trips}
                            </p>
                          </div>
                        </div>

                        {/* Actions */}

                        <div className="mt-3 flex gap-2">
                          <select
                            value={user.role}
                            disabled={actionLoading === user.id}
                            onChange={(e) =>
                              handleRoleUpdate(
                                user.id,
                                e.target.value as UserRole
                              )
                            }
                            className="
                              h-9 min-w-0 flex-1
                              cursor-pointer
                              rounded-lg
                              border border-gray-200
                              bg-white
                              px-2
                              text-xs font-semibold
                              text-gray-600
                              outline-none
                              focus:border-green-500
                              focus:ring-2
                              focus:ring-green-50
                              disabled:cursor-not-allowed
                              disabled:opacity-50
                            "
                          >
                            <option value="Registered User">
                              Registered User
                            </option>
                            <option value="admin">Admin</option>
                          </select>

                          <motion.button
                            type="button"
                            whileTap={{
                              scale: 0.95,
                            }}
                            onClick={() =>
                              setDeleteUser(user)
                            }
                            className="
                              flex cursor-pointer
                              items-center
                              justify-center
                              gap-1.5
                              rounded-lg
                              bg-red-50
                              px-3
                              py-2
                              text-xs font-semibold
                              text-red-500
                              transition-colors
                              hover:bg-red-100
                            "
                          >
                            <Trash2 size={14} />
                            Delete
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* =================================================
                EMPTY STATE
            ================================================= */}

            {paginatedUsers.length === 0 && (
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.95,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                className="px-5 py-16 text-center"
              >
                <motion.div
                  animate={{
                    y: [0, -5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="
                    mx-auto
                    flex h-14 w-14
                    items-center
                    justify-center
                    rounded-2xl
                    bg-green-50
                    text-green-600
                  "
                >
                  <Users size={24} />
                </motion.div>

                <h3
                  className="
                    mt-4
                    text-base font-semibold
                    text-gray-800
                  "
                >
                  No users found
                </h3>

                <p
                  className="
                    mt-1
                    text-sm
                    text-gray-400
                  "
                >
                  Try changing your search or filter.
                </p>

                <motion.button
                  type="button"
                  whileHover={{
                    scale: 1.03,
                  }}
                  whileTap={{
                    scale: 0.95,
                  }}
                  onClick={clearFilters}
                  className="
                    mt-4
                    cursor-pointer
                    text-sm font-semibold
                    text-green-600
                    hover:text-green-700
                  "
                >
                  Clear filters
                </motion.button>
              </motion.div>
            )}

            {/* =================================================
                PAGINATION
            ================================================= */}

            {filteredUsers.length > 0 && (
              <div
                className="
                  flex flex-col gap-3
                  border-t border-gray-100
                  px-4 py-4
                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                  sm:px-6
                "
              >
                <p
                  className="
                    text-center
                    text-xs
                    text-gray-400
                    sm:text-left
                  "
                >
                  Showing{" "}
                  <span className="font-semibold text-gray-600">
                    {(currentPage - 1) * ITEMS_PER_PAGE + 1}
                  </span>{" "}
                  to{" "}
                  <span className="font-semibold text-gray-600">
                    {Math.min(
                      currentPage * ITEMS_PER_PAGE,
                      filteredUsers.length
                    )}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-gray-600">
                    {filteredUsers.length}
                  </span>{" "}
                  users
                </p>

                <div className="flex items-center justify-center gap-1">
                  {/* Previous */}

                  <motion.button
                    type="button"
                    whileTap={{
                      scale: 0.9,
                    }}
                    disabled={currentPage === 1}
                    onClick={() =>
                      setCurrentPage((page) =>
                        Math.max(page - 1, 1)
                      )
                    }
                    className="
                      cursor-pointer
                      rounded-lg
                      p-2
                      text-gray-500
                      transition-colors
                      hover:bg-green-50
                      hover:text-green-600
                      disabled:cursor-not-allowed
                      disabled:opacity-30
                    "
                  >
                    <ChevronLeft size={17} />
                  </motion.button>

                  {/* Page Numbers */}

                  {Array.from(
                    {
                      length: totalPages,
                    },
                    (_, index) => index + 1
                  ).map((page) => (
                    <motion.button
                      type="button"
                      key={page}
                      whileTap={{
                        scale: 0.9,
                      }}
                      onClick={() =>
                        setCurrentPage(page)
                      }
                      className={`
                        h-8
                        min-w-8
                        cursor-pointer
                        rounded-lg
                        px-2
                        text-xs
                        font-semibold
                        transition-colors
                        ${
                          currentPage === page
                            ? "bg-green-600 text-white shadow-sm"
                            : "text-gray-500 hover:bg-green-50 hover:text-green-600"
                        }
                      `}
                    >
                      {page}
                    </motion.button>
                  ))}

                  {/* Next */}

                  <motion.button
                    type="button"
                    whileTap={{
                      scale: 0.9,
                    }}
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
                      cursor-pointer
                      rounded-lg
                      p-2
                      text-gray-500
                      transition-colors
                      hover:bg-green-50
                      hover:text-green-600
                      disabled:cursor-not-allowed
                      disabled:opacity-30
                    "
                  >
                    <ChevronRight size={17} />
                  </motion.button>
                </div>
              </div>
            )}
          </>
        )}
      </motion.div>

      {/* =====================================================
          VIEW USER MODAL
      ===================================================== */}

      <AnimatePresence>
        {selectedUser && (
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
            onClick={() => setSelectedUser(null)}
            className="
              fixed inset-0
              z-[100]
              flex items-center
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
                y: 15,
              }}
              transition={{
                duration: 0.25,
              }}
              onClick={(e) => e.stopPropagation()}
              className="
                w-full
                max-w-md
                rounded-2xl
                bg-white
                p-6
                shadow-2xl
              "
            >
              {/* Header */}

              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <motion.div
                    initial={{
                      scale: 0.7,
                    }}
                    animate={{
                      scale: 1,
                    }}
                    transition={{
                      delay: 0.1,
                    }}
                    className="
                      flex h-12 w-12
                      items-center
                      justify-center
                      rounded-full
                      bg-green-100
                      font-bold
                      text-green-700
                    "
                  >
                    {selectedUser.name.charAt(0).toUpperCase()}
                  </motion.div>

                  <div>
                    <h3 className="font-bold text-gray-900">
                      {selectedUser.name}
                    </h3>

                    <p className="text-xs text-gray-400">
                      {selectedUser.role}
                    </p>
                  </div>
                </div>

                <motion.button
                  type="button"
                  whileHover={{
                    rotate: 90,
                  }}
                  whileTap={{
                    scale: 0.9,
                  }}
                  onClick={() =>
                    setSelectedUser(null)
                  }
                  className="
                    cursor-pointer
                    rounded-lg
                    p-2
                    text-gray-400
                    hover:bg-gray-100
                    hover:text-gray-700
                  "
                >
                  <X size={18} />
                </motion.button>
              </div>

              {/* Details */}

              <div className="mt-6 space-y-4">
                {/* Email */}

                <div className="flex items-start gap-3">
                  <div
                    className="
                      mt-0.5
                      flex h-8 w-8
                      items-center
                      justify-center
                      rounded-lg
                      bg-green-50
                      text-green-600
                    "
                  >
                    <Mail size={15} />
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">
                      Email
                    </p>

                    <p
                      className="
                        mt-1
                        break-all
                        text-sm font-medium
                        text-gray-700
                      "
                    >
                      {selectedUser.email}
                    </p>
                  </div>
                </div>

                {/* Phone */}

                <div className="flex items-start gap-3">
                  <div
                    className="
                      mt-0.5
                      flex h-8 w-8
                      items-center
                      justify-center
                      rounded-lg
                      bg-green-50
                      text-green-600
                    "
                  >
                    <Phone size={15} />
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">
                      Phone
                    </p>

                    <p
                      className="
                        mt-1
                        text-sm font-medium
                        text-gray-700
                      "
                    >
                      {selectedUser.phone}
                    </p>
                  </div>
                </div>

                {/* Location */}

                <div className="flex items-start gap-3">
                  <div
                    className="
                      mt-0.5
                      flex h-8 w-8
                      items-center
                      justify-center
                      rounded-lg
                      bg-green-50
                      text-green-600
                    "
                  >
                    <MapPin size={15} />
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">
                      Location
                    </p>

                    <p
                      className="
                        mt-1
                        text-sm font-medium
                        text-gray-700
                      "
                    >
                      {selectedUser.location}
                    </p>
                  </div>
                </div>

                {/* Joined + Trips */}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-400">
                      Joined
                    </p>

                    <p
                      className="
                        mt-1
                        text-sm font-medium
                        text-gray-700
                      "
                    >
                      {selectedUser.joined}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">
                      Total Trips
                    </p>

                    <p
                      className="
                        mt-1
                        text-sm font-medium
                        text-gray-700
                      "
                    >
                      {selectedUser.trips}
                    </p>
                  </div>
                </div>

                {/* Status */}

                <div>
                  <p className="text-xs text-gray-400">
                    Status
                  </p>

                  <span
                    className={`
                      mt-1
                      inline-flex
                      rounded-full
                      px-3 py-1
                      text-xs font-semibold
                      ${
                        selectedUser.status === "Active"
                          ? "bg-green-50 text-green-700"
                          : "bg-gray-100 text-gray-500"
                      }
                    `}
                  >
                    {selectedUser.status}
                  </span>
                </div>
              </div>

              {/* Close */}

              <motion.button
                type="button"
                whileHover={{
                  scale: 1.02,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                onClick={() =>
                  setSelectedUser(null)
                }
                className="
                  mt-6
                  w-full
                  cursor-pointer
                  rounded-xl
                  bg-green-600
                  py-2.5
                  text-sm
                  font-semibold
                  text-white
                  transition-colors
                  hover:bg-green-700
                "
              >
                Close
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =====================================================
          DELETE MODAL
      ===================================================== */}

      <AnimatePresence>
        {deleteUser && (
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
            onClick={() => {
              if (!deleteLoading) {
                setDeleteUser(null);
              }
            }}
            className="
              fixed inset-0
              z-[100]
              flex items-center
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
              transition={{
                duration: 0.25,
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
              {/* Delete Icon */}

              <motion.div
                initial={{
                  scale: 0.5,
                  rotate: -10,
                }}
                animate={{
                  scale: 1,
                  rotate: 0,
                }}
                className="
                  mx-auto
                  flex h-14 w-14
                  items-center
                  justify-center
                  rounded-full
                  bg-red-50
                  text-red-500
                "
              >
                <Trash2 size={24} />
              </motion.div>

              <h3
                className="
                  mt-4
                  text-lg
                  font-bold
                  text-gray-900
                "
              >
                Delete User?
              </h3>

              <p
                className="
                  mt-2
                  text-sm
                  leading-6
                  text-gray-500
                "
              >
                Are you sure you want to delete{" "}
                <span className="font-semibold text-gray-700">
                  {deleteUser.name}
                </span>
                ? This action cannot be undone.
              </p>

              <div className="mt-6 flex gap-3">
                {/* Cancel */}

                <motion.button
                  type="button"
                  whileTap={{
                    scale: 0.96,
                  }}
                  disabled={deleteLoading}
                  onClick={() =>
                    setDeleteUser(null)
                  }
                  className="
                    flex-1
                    cursor-pointer
                    rounded-xl
                    border border-gray-200
                    py-2.5
                    text-sm
                    font-semibold
                    text-gray-600
                    transition-colors
                    hover:bg-gray-50
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                >
                  Cancel
                </motion.button>

              
                {/* Delete */}

                <motion.button
                  type="button"
                  whileHover={{
                    scale: 1.02,
                  }}
                  whileTap={{
                    scale: 0.96,
                  }}
                  disabled={deleteLoading}
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
                    transition-colors
                    hover:bg-red-600
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                >
                  {deleteLoading ? "Deleting..." : "Delete"}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =====================================================
    ADD / EDIT USER MODAL
===================================================== */}

<AnimatePresence>
  {showUserModal && (
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
      onClick={() => {
        if (!formLoading) {
          setShowUserModal(false);
        }
      }}
      className="
        fixed inset-0
        z-[110]
        flex items-center
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
          y: 15,
        }}
        transition={{
          duration: 0.25,
        }}
        onClick={(e) => e.stopPropagation()}
        className="
          max-h-[90vh]
          w-full
          max-w-lg
          overflow-y-auto
          rounded-2xl
          bg-white
          p-6
          shadow-2xl
        "
      >
        {/* Header */}

        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-900">
              {editingUser ? "Edit User" : "Add New User"}
            </h3>

            <p className="mt-1 text-sm text-gray-400">
              {editingUser
                ? "Update user information."
                : "Create a new registered user."}
            </p>
          </div>

          <button
            type="button"
            disabled={formLoading}
            onClick={() => setShowUserModal(false)}
            className="
              cursor-pointer
              rounded-lg
              p-2
              text-gray-400
              transition-colors
              hover:bg-gray-100
              hover:text-gray-700
              disabled:cursor-not-allowed
            "
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}

        <form
          onSubmit={handleUserSubmit}
          className="mt-6 space-y-4"
        >
          {/* Name */}

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Name
            </label>

            <input
              type="text"
              required
              value={userForm.name}
              onChange={(e) =>
                setUserForm((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
              placeholder="Enter user name"
              className="
                h-11 w-full
                rounded-xl
                border border-gray-200
                bg-gray-50
                px-3.5
                text-sm text-gray-700
                outline-none
                transition-all
                placeholder:text-gray-400
                focus:border-green-500
                focus:bg-white
                focus:ring-4
                focus:ring-green-50
              "
            />
          </div>

          {/* Email */}

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Email
            </label>

            <input
              type="email"
              required
              value={userForm.email}
              onChange={(e) =>
                setUserForm((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
              placeholder="example@email.com"
              className="
                h-11 w-full
                rounded-xl
                border border-gray-200
                bg-gray-50
                px-3.5
                text-sm text-gray-700
                outline-none
                transition-all
                placeholder:text-gray-400
                focus:border-green-500
                focus:bg-white
                focus:ring-4
                focus:ring-green-50
              "
            />
          </div>

          {/* Phone */}

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Phone
            </label>

            <input
              type="text"
              value={userForm.phone}
              onChange={(e) =>
                setUserForm((prev) => ({
                  ...prev,
                  phone: e.target.value,
                }))
              }
              placeholder="+880 1XXXXXXXXX"
              className="
                h-11 w-full
                rounded-xl
                border border-gray-200
                bg-gray-50
                px-3.5
                text-sm text-gray-700
                outline-none
                transition-all
                placeholder:text-gray-400
                focus:border-green-500
                focus:bg-white
                focus:ring-4
                focus:ring-green-50
              "
            />
          </div>

          {/* Location */}

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Location
            </label>

            <input
              type="text"
              value={userForm.location}
              onChange={(e) =>
                setUserForm((prev) => ({
                  ...prev,
                  location: e.target.value,
                }))
              }
              placeholder="Sylhet, Bangladesh"
              className="
                h-11 w-full
                rounded-xl
                border border-gray-200
                bg-gray-50
                px-3.5
                text-sm text-gray-700
                outline-none
                transition-all
                placeholder:text-gray-400
                focus:border-green-500
                focus:bg-white
                focus:ring-4
                focus:ring-green-50
              "
            />
          </div>

          {/* Role + Status */}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Role */}

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Role
              </label>

              <select
                value={userForm.role}
                onChange={(e) =>
                  setUserForm((prev) => ({
                    ...prev,
                    role: e.target.value,
                  }))
                }
                className="
                  h-11 w-full
                  cursor-pointer
                  rounded-xl
                  border border-gray-200
                  bg-gray-50
                  px-3
                  text-sm text-gray-700
                  outline-none
                  focus:border-green-500
                  focus:bg-white
                  focus:ring-4
                  focus:ring-green-50
                "
              >
                <option value="Registered User">
                  Registered User
                </option>
                <option value="Admin">Admin</option>
              </select>
            </div>

            {/* Status */}

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Status
              </label>

              <select
                value={userForm.status}
                onChange={(e) =>
                  setUserForm((prev) => ({
                    ...prev,
                    status: e.target.value as UserStatus,
                  }))
                }
                className="
                  h-11 w-full
                  cursor-pointer
                  rounded-xl
                  border border-gray-200
                  bg-gray-50
                  px-3
                  text-sm text-gray-700
                  outline-none
                  focus:border-green-500
                  focus:bg-white
                  focus:ring-4
                  focus:ring-green-50
                "
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* Buttons */}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              disabled={formLoading}
              onClick={() => setShowUserModal(false)}
              className="
                flex-1
                cursor-pointer
                rounded-xl
                border border-gray-200
                py-2.5
                text-sm
                font-semibold
                text-gray-600
                transition-colors
                hover:bg-gray-50
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={formLoading}
              className="
                flex-1
                cursor-pointer
                rounded-xl
                bg-green-600
                py-2.5
                text-sm
                font-semibold
                text-white
                transition-colors
                hover:bg-green-700
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              {formLoading
                ? editingUser
                  ? "Updating..."
                  : "Creating..."
                : editingUser
                  ? "Update User"
                  : "Create User"}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>


    </div>
  );
}
