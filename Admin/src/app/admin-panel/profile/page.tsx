"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  MapPin,
  CalendarDays,
  ShieldCheck,
  Pencil,
  Camera,
  Lock,
  Eye,
  EyeOff,
  Check,
  X,
  Activity,
  Users,
  Map,
  Star,
  Save,
} from "lucide-react";

export default function ProfilePage() {
  const [editing, setEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // States for password change
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSecuritySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");
    
    if (newPassword !== confirmPassword) {
      return setErrorMsg("New passwords do not match.");
    }
    
    setIsSubmitting(true);
    try {
      const res = await fetch(`${(process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/+$/, "")}/api/users/password`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: profile.email, currentPassword, newPassword })
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

  const [profile, setProfile] = useState({
    name: "Admin User",
    email: "admin@tripplan.ai",
    phone: "+880 1700-000000",
    location: "Sylhet, Bangladesh",
    role: "Super Admin",
    joined: "January 15, 2026",
    bio: "Managing Trip Plan AI platform, users, destinations and travel content.",
  });

  const [formData, setFormData] = useState(profile);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const saveProfile = () => {
    setProfile(formData);
    setEditing(false);
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
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Profile
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Manage your admin account and profile information.
        </p>
      </motion.div>

      {/* ================= MAIN GRID ================= */}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

        {/* ================= LEFT PROFILE CARD ================= */}

        <motion.div
          initial={{ opacity: 0, x: -25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="xl:col-span-1"
        >
          <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">

            {/* GREEN COVER */}

            <div className="relative h-32 overflow-hidden bg-gradient-to-br from-green-700 via-green-600 to-emerald-500">

              <div className="absolute -right-10 -top-12 h-40 w-40 rounded-full bg-white/10" />

              <div className="absolute -bottom-16 -left-10 h-40 w-40 rounded-full bg-white/10" />

            </div>

            {/* PROFILE */}

            <div className="relative px-5 pb-6 sm:px-6">

              {/* AVATAR */}

              <div className="-mt-14 flex justify-center">

                <div className="relative">

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="
                      flex
                      h-28
                      w-28
                      items-center
                      justify-center
                      rounded-full
                      border-4
                      border-white
                      bg-green-100
                      text-3xl
                      font-bold
                      text-green-700
                      shadow-lg
                    "
                  >
                    AU
                  </motion.div>

                  <button
                    className="
                      absolute
                      bottom-1
                      right-1
                      flex
                      h-9
                      w-9
                      cursor-pointer
                      items-center
                      justify-center
                      rounded-full
                      border-2
                      border-white
                      bg-green-600
                      text-white
                      shadow
                      transition
                      hover:bg-green-700
                    "
                  >
                    <Camera size={16} />
                  </button>

                </div>

              </div>

              {/* NAME */}

              <div className="mt-4 text-center">

                <h2 className="text-xl font-bold text-gray-900">
                  {profile.name}
                </h2>

                <div className="mt-2 flex items-center justify-center gap-2">

                  <span className="
                    inline-flex
                    items-center
                    gap-1.5
                    rounded-full
                    bg-green-50
                    px-3
                    py-1
                    text-xs
                    font-semibold
                    text-green-600
                  ">
                    <ShieldCheck size={13} />
                    {profile.role}
                  </span>

                </div>

              </div>

              {/* INFO */}

              <div className="mt-6 space-y-4">

                <ProfileInfo
                  icon={<Mail size={17} />}
                  label="Email"
                  value={profile.email}
                />

                <ProfileInfo
                  icon={<Phone size={17} />}
                  label="Phone"
                  value={profile.phone}
                />

                <ProfileInfo
                  icon={<MapPin size={17} />}
                  label="Location"
                  value={profile.location}
                />

                <ProfileInfo
                  icon={<CalendarDays size={17} />}
                  label="Joined"
                  value={profile.joined}
                />

              </div>

            </div>

          </div>
        </motion.div>

        {/* ================= RIGHT CONTENT ================= */}

        <div className="space-y-6 xl:col-span-2">

          {/* ================= PERSONAL INFORMATION ================= */}

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.45 }}
            className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6"
          >

            <div className="
              flex
              flex-col
              gap-3
              sm:flex-row
              sm:items-center
              sm:justify-between
            ">

              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Personal Information
                </h2>

                <p className="mt-1 text-xs text-gray-400">
                  Update your personal account information.
                </p>
              </div>

              {!editing && (
                <button
                  onClick={() => {
                    setFormData(profile);
                    setEditing(true);
                  }}
                  className="
                    flex
                    w-fit
                    cursor-pointer
                    items-center
                    gap-2
                    rounded-xl
                    bg-green-50
                    px-4
                    py-2
                    text-sm
                    font-medium
                    text-green-600
                    transition
                    hover:bg-green-100
                  "
                >
                  <Pencil size={15} />
                  Edit Profile
                </button>
              )}

            </div>

            <AnimatePresence mode="wait">

              {editing ? (

                <motion.div
                  key="edit"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-6"
                >

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                    <InputField
                      label="Full Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />

                    <InputField
                      label="Email Address"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />

                    <InputField
                      label="Phone Number"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />

                    <InputField
                      label="Location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                    />

                  </div>

                  {/* BIO */}

                  <div className="mt-5">

                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Bio
                    </label>

                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      rows={4}
                      className="
                        w-full
                        resize-none
                        rounded-xl
                        border
                        border-gray-200
                        bg-gray-50
                        px-4
                        py-3
                        text-sm
                        text-gray-700
                        outline-none
                        transition
                        focus:border-green-500
                        focus:bg-white
                        focus:ring-2
                        focus:ring-green-100
                      "
                    />

                  </div>

                  {/* BUTTONS */}

                  <div className="mt-5 flex flex-wrap gap-2">

                    <button
                      onClick={saveProfile}
                      className="
                        flex
                        cursor-pointer
                        items-center
                        gap-2
                        rounded-xl
                        bg-green-600
                        px-5
                        py-2.5
                        text-sm
                        font-medium
                        text-white
                        transition
                        hover:bg-green-700
                      "
                    >
                      <Save size={16} />
                      Save Changes
                    </button>

                    <button
                      onClick={() => setEditing(false)}
                      className="
                        flex
                        cursor-pointer
                        items-center
                        gap-2
                        rounded-xl
                        bg-gray-100
                        px-5
                        py-2.5
                        text-sm
                        font-medium
                        text-gray-600
                        transition
                        hover:bg-gray-200
                      "
                    >
                      <X size={16} />
                      Cancel
                    </button>

                  </div>

                </motion.div>

              ) : (

                <motion.div
                  key="view"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-6"
                >

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                    <ViewField
                      label="Full Name"
                      value={profile.name}
                    />

                    <ViewField
                      label="Email Address"
                      value={profile.email}
                    />

                    <ViewField
                      label="Phone Number"
                      value={profile.phone}
                    />

                    <ViewField
                      label="Location"
                      value={profile.location}
                    />

                  </div>

                  <div className="mt-5">

                    <p className="text-xs font-medium text-gray-400">
                      BIO
                    </p>

                    <p className="mt-2 text-sm leading-6 text-gray-600">
                      {profile.bio}
                    </p>

                  </div>

                </motion.div>

              )}

            </AnimatePresence>

          </motion.div>

          {/* ================= STATISTICS ================= */}

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.45 }}
          >

            <h2 className="mb-4 text-lg font-bold text-gray-900">
              Admin Overview
            </h2>

            <div className="
              grid
              grid-cols-2
              gap-4
              lg:grid-cols-4
            ">

              <MiniStat
                icon={<Users size={18} />}
                value="1,248"
                label="Users"
              />

              <MiniStat
                icon={<Map size={18} />}
                value="86"
                label="Destinations"
              />

              <MiniStat
                icon={<Star size={18} />}
                value="4.8"
                label="Avg Rating"
              />

              <MiniStat
                icon={<Activity size={18} />}
                value="2,450"
                label="Activities"
              />

            </div>

          </motion.div>

          {/* ================= SECURITY ================= */}

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.45 }}
            className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6"
          >

            <div className="flex items-center gap-3">

              <div className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                bg-green-50
                text-green-600
              ">
                <Lock size={19} />
              </div>

              <div>

                <h2 className="text-lg font-bold text-gray-900">
                  Security
                </h2>

                <p className="text-xs text-gray-400">
                  Keep your admin account secure.
                </p>

              </div>

            </div>

            <div className="mt-6">

              <label className="mb-2 block text-sm font-medium text-gray-700">
                Current Password
              </label>

              <div className="relative">

                  <form onSubmit={handleSecuritySubmit}>
                  {successMsg && (
                    <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-xl text-sm font-medium">
                      {successMsg}
                    </div>
                  )}
                  {errorMsg && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm font-medium">
                      {errorMsg}
                    </div>
                  )}
                  <input
                    type={showPassword ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Current Password"
                    className="
                      w-full
                      rounded-xl
                    border
                    border-gray-200
                    bg-gray-50
                    px-4
                    py-3
                    pr-11
                    text-sm
                    outline-none
                    transition
                    focus:border-green-500
                    focus:bg-white
                    focus:ring-2
                    focus:ring-green-100
                  "
                />

                <button
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="
                    absolute
                    right-3
                    top-1/2
                    -translate-y-1/2
                    cursor-pointer
                    text-gray-400
                    transition
                    hover:text-green-600
                  "
                >
                  {showPassword ? (
                    <EyeOff size={17} />
                  ) : (
                    <Eye size={17} />
                  )}
                </button>

              </div>

              <div className="mt-4">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="New Password"
                  className="
                    w-full
                    rounded-xl
                    border
                    border-gray-200
                    bg-gray-50
                    px-4
                    py-3
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

              <div className="mt-4">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Confirm New Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm New Password"
                  className="
                    w-full
                    rounded-xl
                    border
                    border-gray-200
                    bg-gray-50
                    px-4
                    py-3
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

              <div className="
                mt-6
                flex
                flex-col
                gap-3
                sm:flex-row
                sm:items-center
              ">

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="
                    flex
                    w-fit
                    cursor-pointer
                    items-center
                    gap-2
                    rounded-xl
                    bg-green-600
                    px-5
                    py-2.5
                    text-sm
                    font-medium
                    text-white
                    transition
                    hover:bg-green-700
                    disabled:opacity-70
                  "
                >
                  <Lock size={15} />
                  {isSubmitting ? "Changing..." : "Change Password"}
                </button>

                <span className="text-xs text-gray-400">
                  Keep your password secure and do not share it.
                </span>

              </div>
              </form>

            </div>

          </motion.div>

          {/* ================= RECENT ACTIVITY ================= */}

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.45 }}
            className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6"
          >

            <div className="flex items-center justify-between">

              <div>

                <h2 className="text-lg font-bold text-gray-900">
                  Recent Activity
                </h2>

                <p className="mt-1 text-xs text-gray-400">
                  Your latest admin actions.
                </p>

              </div>

              <Activity
                size={20}
                className="text-green-600"
              />

            </div>

            <div className="mt-5 space-y-4">

              <ActivityItem
                title="Approved a user review"
                time="10 minutes ago"
              />

              <ActivityItem
                title="Added a new destination"
                time="2 hours ago"
              />

              <ActivityItem
                title="Updated destination information"
                time="Yesterday"
              />

              <ActivityItem
                title="Reviewed reported content"
                time="2 days ago"
              />

            </div>

          </motion.div>

        </div>

      </div>

    </div>
  );
}

/* =========================
   PROFILE INFO
========================= */

function ProfileInfo({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3">

      <div className="
        mt-0.5
        flex
        h-9
        w-9
        shrink-0
        items-center
        justify-center
        rounded-lg
        bg-green-50
        text-green-600
      ">
        {icon}
      </div>

      <div className="min-w-0">

        <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
          {label}
        </p>

        <p className="mt-1 break-words text-sm font-medium text-gray-700">
          {value}
        </p>

      </div>

    </div>
  );
}

/* =========================
   INPUT
========================= */

function InputField({
  label,
  name,
  value,
  onChange,
}) {
  return (
    <div>

      <label className="mb-2 block text-sm font-medium text-gray-700">
        {label}
      </label>

      <input
        name={name}
        value={value}
        onChange={onChange}
        className="
          w-full
          rounded-xl
          border
          border-gray-200
          bg-gray-50
          px-4
          py-3
          text-sm
          text-gray-700
          outline-none
          transition
          focus:border-green-500
          focus:bg-white
          focus:ring-2
          focus:ring-green-100
        "
      />

    </div>
  );
}

/* =========================
   VIEW FIELD
========================= */

function ViewField({ label, value }) {
  return (
    <div>

      <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
        {label}
      </p>

      <p className="mt-2 break-words text-sm font-semibold text-gray-700">
        {value}
      </p>

    </div>
  );
}

/* =========================
   MINI STAT
========================= */

function MiniStat({
  icon,
  value,
  label,
}) {
  return (
    <motion.div
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

      <div className="
        flex
        h-9
        w-9
        items-center
        justify-center
        rounded-lg
        bg-green-50
        text-green-600
      ">
        {icon}
      </div>

      <p className="
        mt-3
        text-xl
        font-bold
        text-gray-900
      ">
        {value}
      </p>

      <p className="
        mt-1
        text-xs
        text-gray-400
      ">
        {label}
      </p>

    </motion.div>
  );
}

/* =========================
   ACTIVITY ITEM
========================= */

function ActivityItem({
  title,
  time,
}) {
  return (
    <motion.div
      whileHover={{
        x: 4,
      }}
      className="
        flex
        items-center
        gap-3
        rounded-xl
        p-2
        transition
        hover:bg-green-50/50
      "
    >

      <div className="
        flex
        h-9
        w-9
        shrink-0
        items-center
        justify-center
        rounded-full
        bg-green-100
        text-green-600
      ">
        <Check size={15} />
      </div>

      <div className="min-w-0">

        <p className="truncate text-sm font-medium text-gray-700">
          {title}
        </p>

        <p className="mt-0.5 text-xs text-gray-400">
          {time}
        </p>

      </div>

    </motion.div>
  );
}
