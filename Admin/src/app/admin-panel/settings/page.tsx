"use client";

import { useState, useEffect, ReactNode } from "react";
import { motion } from "framer-motion";
import {
  Settings as SettingsIcon,
  Bell,
  Shield,
  Lock,
  Globe,
  Moon,
  Mail,
  Smartphone,
  Save,
  Check,
} from "lucide-react";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    reviewNotifications: true,
    userNotifications: true,
    darkMode: false,
    twoFactor: false,
    language: "English",
    timezone: "Asia/Dhaka",
  });

  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch(`${(process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/+$/, "")}/api/settings`);
        const data = await res.json();
        if (data.success && data.data) {
          setSettings(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch settings", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleToggle = (name: string) => {
    setSettings((prev: any) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`${(process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/+$/, "")}/api/settings`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => {
          setSaved(false);
        }, 2500);
      }
    } catch (error) {
      console.error("Failed to save settings", error);
    }
  };

  if (loading) return <div className="p-10 text-center">Loading settings...</div>;

  return (
    <div className="w-full min-w-0 overflow-x-hidden p-4 sm:p-6 lg:p-8">

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="mb-7"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-green-600">
            <SettingsIcon size={22} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Settings
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Manage your admin panel preferences and account settings.
            </p>
          </div>
        </div>
      </motion.div>

      <div className="space-y-6">

        {/* NOTIFICATIONS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6"
        >
          <div className="flex items-center gap-3 border-b border-gray-100 pb-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600">
              <Bell size={19} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Notifications
              </h2>

              <p className="text-xs text-gray-400">
                Choose which notifications you want to receive.
              </p>
            </div>
          </div>

          <div className="mt-5 divide-y divide-gray-100">

            <ToggleSetting
              icon={<Mail size={18} />}
              title="Email Notifications"
              description="Receive important updates through email."
              enabled={settings.emailNotifications}
              onClick={() => handleToggle("emailNotifications")}
            />

            <ToggleSetting
              icon={<Smartphone size={18} />}
              title="Push Notifications"
              description="Receive notifications directly on your device."
              enabled={settings.pushNotifications}
              onClick={() => handleToggle("pushNotifications")}
            />

            <ToggleSetting
              icon={<Bell size={18} />}
              title="Review Notifications"
              description="Get notified when a new review is submitted."
              enabled={settings.reviewNotifications}
              onClick={() => handleToggle("reviewNotifications")}
            />

            <ToggleSetting
              icon={<Bell size={18} />}
              title="User Notifications"
              description="Get notified about new users and account activity."
              enabled={settings.userNotifications}
              onClick={() => handleToggle("userNotifications")}
            />

          </div>
        </motion.div>

        {/* SECURITY */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6"
        >
          <div className="flex items-center gap-3 border-b border-gray-100 pb-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600">
              <Shield size={19} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Security
              </h2>

              <p className="text-xs text-gray-400">
                Protect your admin account.
              </p>
            </div>
          </div>

          <div className="mt-5">
            <ToggleSetting
              icon={<Lock size={18} />}
              title="Two-Factor Authentication"
              description="Add an extra layer of security to your account."
              enabled={settings.twoFactor}
              onClick={() => handleToggle("twoFactor")}
            />
          </div>
        </motion.div>

        {/* PREFERENCES */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6"
        >
          <div className="flex items-center gap-3 border-b border-gray-100 pb-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600">
              <Globe size={19} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Preferences
              </h2>

              <p className="text-xs text-gray-400">
                Customize your admin panel experience.
              </p>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">

            {/* LANGUAGE */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Language
              </label>

              <select
                value={settings.language}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    language: e.target.value,
                  })
                }
                className="w-full cursor-pointer rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-100"
              >
                <option>English</option>
                <option>Bangla</option>
              </select>
            </div>

            {/* TIMEZONE */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Timezone
              </label>

              <select
                value={settings.timezone}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    timezone: e.target.value,
                  })
                }
                className="w-full cursor-pointer rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-100"
              >
                <option value="Asia/Dhaka">
                  Asia/Dhaka (GMT+6)
                </option>

                <option value="Asia/Kolkata">
                  Asia/Kolkata (GMT+5:30)
                </option>

                <option value="UTC">
                  UTC
                </option>
              </select>
            </div>

          </div>

          {/* DARK MODE */}
          <div className="mt-5">
            <ToggleSetting
              icon={<Moon size={18} />}
              title="Dark Mode"
              description="Use a darker appearance for the admin panel."
              enabled={settings.darkMode}
              onClick={() => handleToggle("darkMode")}
            />
          </div>
        </motion.div>

        {/* SAVE */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="text-xs text-gray-400">
            Your settings will be saved for your admin account.
          </p>

          <button
            onClick={handleSave}
            className="flex w-fit cursor-pointer items-center gap-2 rounded-xl bg-green-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-green-700 hover:shadow-md"
          >
            {saved ? (
              <>
                <Check size={16} />
                Saved
              </>
            ) : (
              <>
                <Save size={16} />
                Save Settings
              </>
            )}
          </button>
        </motion.div>

      </div>
    </div>
  );
}


/* =========================
   TOGGLE SETTING
========================= */

function ToggleSetting({
  icon,
  title,
  description,
  enabled,
  onClick,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  enabled: boolean;
  onClick: () => void;
}) {
  return (
    <motion.div
      whileHover={{ x: 3 }}
      className="flex items-center justify-between gap-4 py-4"
    >
      <div className="flex min-w-0 items-center gap-3">

        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-50 text-gray-500">
          {icon}
        </div>

        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-gray-800">
            {title}
          </h3>

          <p className="mt-0.5 text-xs leading-5 text-gray-400">
            {description}
          </p>
        </div>

      </div>

      <button
        type="button"
        onClick={onClick}
        className={`relative h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ${
          enabled ? "bg-green-600" : "bg-gray-300"
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${
            enabled ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </motion.div>
  );
}
