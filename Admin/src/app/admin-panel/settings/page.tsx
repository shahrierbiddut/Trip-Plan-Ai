"use client";

import {
  useState,
  useEffect,
  type ReactNode,
} from "react";

import { motion, AnimatePresence, type Variants } from "framer-motion";

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
  RotateCcw,
  Loader2,
  Sun,
  MessageSquare,
  Users,
  Star,
  Clock,
} from "lucide-react";

/* =========================================================
   TYPES
========================================================= */

interface Settings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  reviewNotifications: boolean;
  userNotifications: boolean;
  darkMode: boolean;
  twoFactor: boolean;
  language: string;
  timezone: string;
}

interface ApiResponse {
  success?: boolean;
  data?: Partial<Settings>;
  message?: string;
}

/* =========================================================
   DEFAULT SETTINGS
========================================================= */

const DEFAULT_SETTINGS: Settings = {
  emailNotifications: true,
  pushNotifications: true,
  reviewNotifications: true,
  userNotifications: true,
  darkMode: false,
  twoFactor: false,
  language: "English",
  timezone: "Asia/Dhaka",
};

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
).replace(/\/+$/, "");

/* =========================================================
   ANIMATION
========================================================= */

const containerVariants:Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: "easeOut",
    },
  },
};

/* =========================================================
   SETTINGS PAGE
========================================================= */

export default function SettingsPage() {
  const [settings, setSettings] =
    useState<Settings>(DEFAULT_SETTINGS);

  const [originalSettings, setOriginalSettings] =
    useState<Settings>(DEFAULT_SETTINGS);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [saveError, setSaveError] = useState("");

  /* =======================================================
     APPLY DARK MODE
  ======================================================= */

  const applyTheme = (dark: boolean) => {
    if (typeof window === "undefined") return;

    const html = document.documentElement;

    if (dark) {
      html.classList.add("dark");
      html.style.colorScheme = "dark";
    } else {
      html.classList.remove("dark");
      html.style.colorScheme = "light";
    }

    localStorage.setItem(
      "tripplan-admin-dark-mode",
      String(dark)
    );
  };

  /* =======================================================
     FETCH SETTINGS
  ======================================================= */

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        setError("");



        /*
         * First check locally saved theme.
         * This prevents flash when user refreshes.
         */
        const localDarkMode =
          localStorage.getItem(
            "tripplan-admin-dark-mode"
          );

        if (localDarkMode !== null) {
          applyTheme(localDarkMode === "true");
        }

        const res = await fetch(
          `${API_URL}/api/settings`,
          {
            method: "GET",
            cache: "no-store",
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch settings");
        }

        const data: ApiResponse = await res.json();

        if (data.success && data.data) {
          const mergedSettings: Settings = {
            ...DEFAULT_SETTINGS,
            ...data.data,
          };

          setSettings(mergedSettings);
          setOriginalSettings(mergedSettings);

          applyTheme(mergedSettings.darkMode);
        }
      } catch (err) {
        console.error(
          "Failed to fetch settings:",
          err
        );

        /*
         * Local fallback
         */
        const localSettings =
          localStorage.getItem(
            "tripplan-admin-settings"
          );

        if (localSettings) {
          try {
            const parsed = JSON.parse(
              localSettings
            ) as Partial<Settings>;

            const mergedSettings: Settings = {
              ...DEFAULT_SETTINGS,
              ...parsed,
            };

            setSettings(mergedSettings);
            setOriginalSettings(mergedSettings);

            applyTheme(
              mergedSettings.darkMode
            );
          } catch {
            setSettings(DEFAULT_SETTINGS);
          }
        } else {
          setSettings(DEFAULT_SETTINGS);
        }

        setError(
          "Could not connect to the settings server. Local settings are being used."
        );
      } finally {
        setLoading(false);
      }

      const fetchWithTimeout = async (
  url: string,
  options?: RequestInit,
  timeout = 8000
) => {
  const controller = new AbortController();

  const timer = setTimeout(() => {
    controller.abort();
  }, timeout);

  try {
    return await fetch(url, {
      ...options,
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timer);
  }
};

const res = await fetchWithTimeout(
  `${API_URL}/api/settings`,
  {
    method: "GET",
    cache: "no-store",
  },
  8000
);
    };

    fetchSettings();
  }, []);

  /* =======================================================
     HANDLE TOGGLE
  ======================================================= */

  const handleToggle = (
    name: keyof Settings
  ) => {
    if (
      typeof settings[name] !== "boolean"
    ) {
      return;
    }

    const newValue =
      !settings[name];

    setSettings((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    setSaved(false);
    setSaveError("");

    /*
     * Dark mode should apply immediately
     */
    if (name === "darkMode") {
      applyTheme(newValue);
    }
  };

  /* =======================================================
     HANDLE SELECT
  ======================================================= */

  const handleSelectChange = (
    name: "language" | "timezone",
    value: string
  ) => {
    setSettings((prev) => ({
      ...prev,
      [name]: value,
    }));

    setSaved(false);
  };

  /* =======================================================
     SAVE SETTINGS
  ======================================================= */

  const handleSave = async () => {
    try {
      setSaving(true);
      setSaved(false);
      setSaveError("");

      /*
       * Always save locally
       */
      localStorage.setItem(
        "tripplan-admin-settings",
        JSON.stringify(settings)
      );

      applyTheme(settings.darkMode);

      const res = await fetch(
        `${API_URL}/api/settings`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(settings),
        }
      );

      if (!res.ok) {
        throw new Error(
          "Failed to save settings"
        );
      }

      const data: ApiResponse =
        await res.json();

      if (data.success === false) {
        throw new Error(
          data.message ||
            "Failed to save settings"
        );
      }

      setOriginalSettings(settings);
      setSaved(true);

      setTimeout(() => {
        setSaved(false);
      }, 2500);
    } catch (err) {
      console.error(
        "Failed to save settings:",
        err
      );

      /*
       * Local storage already contains
       * the latest settings.
       */
      setOriginalSettings(settings);
      setSaved(true);

      setSaveError(
        "Saved locally. Server connection is unavailable."
      );

      setTimeout(() => {
        setSaved(false);
      }, 2500);
    } finally {
      setSaving(false);
    }
  };

  /* =======================================================
     RESET CHANGES
  ======================================================= */

  const handleReset = () => {
    setSettings(originalSettings);
    applyTheme(originalSettings.darkMode);
    setSaved(false);
    setSaveError("");
  };

  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-gray-50 dark:bg-gray-950">
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.9,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          className="flex flex-col items-center gap-4"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-green-600 dark:bg-green-950 dark:text-green-400">
            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                repeat: Infinity,
                duration: 1.2,
                ease: "linear",
              }}
            >
              <SettingsIcon size={25} />
            </motion.div>
          </div>

          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Loading settings...
          </p>
        </motion.div>
      </div>
    );
  }

  /* =======================================================
     PAGE
  ======================================================= */

  return (
    <div className="mt-[95px] min-h-screen w-full min-w-0 overflow-x-hidden bg-gray-50 p-4 transition-colors duration-300 dark:bg-gray-950 sm:p-6 lg:p-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="mx-auto max-w-6xl space-y-6"
      >
        {/* =================================================
            HEADER
        ================================================= */}

        <motion.div
          variants={itemVariants}
          className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{
                rotate: 8,
                scale: 1.05,
              }}
              className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 text-green-600 shadow-sm dark:bg-green-950 dark:text-green-400"
            >
              <SettingsIcon size={23} />
            </motion.div>

            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
                Settings
              </h1>

              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Manage your admin panel preferences
                and account settings.
              </p>
            </div>
          </div>

          {/* Theme indicator */}
          <motion.div
            whileHover={{
              scale: 1.03,
            }}
            className="flex w-fit items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-medium text-gray-600 shadow-sm dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300"
          >
            {settings.darkMode ? (
              <>
                <Moon
                  size={15}
                  className="text-green-500"
                />
                Dark Mode
              </>
            ) : (
              <>
                <Sun
                  size={15}
                  className="text-green-500"
                />
                Light Mode
              </>
            )}
          </motion.div>
        </motion.div>

        {/* =================================================
            ERROR
        ================================================= */}

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{
                opacity: 0,
                height: 0,
                y: -10,
              }}
              animate={{
                opacity: 1,
                height: "auto",
                y: 0,
              }}
              exit={{
                opacity: 0,
                height: 0,
              }}
              className="rounded-xl border border-yellow-200 bg-yellow-50 px-4 py-3 text-sm text-yellow-700 dark:border-yellow-900 dark:bg-yellow-950/40 dark:text-yellow-300"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* =================================================
            NOTIFICATIONS
        ================================================= */}

        <motion.div
          variants={itemVariants}
          className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-colors duration-300 dark:border-gray-800 dark:bg-gray-900"
        >
          <SettingsSectionHeader
            icon={<Bell size={19} />}
            title="Notifications"
            description="Choose which notifications you want to receive."
          />

          <div className="divide-y divide-gray-100 px-5 dark:divide-gray-800 sm:px-6">
            <ToggleSetting
              icon={<Mail size={18} />}
              title="Email Notifications"
              description="Receive important updates through email."
              enabled={settings.emailNotifications}
              onClick={() =>
                handleToggle(
                  "emailNotifications"
                )
              }
            />

            <ToggleSetting
              icon={<Smartphone size={18} />}
              title="Push Notifications"
              description="Receive notifications directly on your device."
              enabled={settings.pushNotifications}
              onClick={() =>
                handleToggle(
                  "pushNotifications"
                )
              }
            />

            <ToggleSetting
              icon={<Star size={18} />}
              title="Review Notifications"
              description="Get notified when a new review is submitted."
              enabled={settings.reviewNotifications}
              onClick={() =>
                handleToggle(
                  "reviewNotifications"
                )
              }
            />

            <ToggleSetting
              icon={<Users size={18} />}
              title="User Notifications"
              description="Get notified about new users and account activity."
              enabled={settings.userNotifications}
              onClick={() =>
                handleToggle(
                  "userNotifications"
                )
              }
            />
          </div>
        </motion.div>

        {/* =================================================
            SECURITY
        ================================================= */}

        <motion.div
          variants={itemVariants}
          className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-colors duration-300 dark:border-gray-800 dark:bg-gray-900"
        >
          <SettingsSectionHeader
            icon={<Shield size={19} />}
            title="Security"
            description="Protect your admin account."
          />

          <div className="px-5 sm:px-6">
            <ToggleSetting
              icon={<Lock size={18} />}
              title="Two-Factor Authentication"
              description="Add an extra layer of security to your account."
              enabled={settings.twoFactor}
              onClick={() =>
                handleToggle("twoFactor")
              }
            />
          </div>
        </motion.div>

        {/* =================================================
            PREFERENCES
        ================================================= */}

        <motion.div
          variants={itemVariants}
          className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-colors duration-300 dark:border-gray-800 dark:bg-gray-900"
        >
          <SettingsSectionHeader
            icon={<Globe size={19} />}
            title="Preferences"
            description="Customize your admin panel experience."
          />

          <div className="px-5 pb-6 pt-5 sm:px-6">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {/* LANGUAGE */}

              <SelectSetting
                label="Language"
                value={settings.language}
                onChange={(value) =>
                  handleSelectChange(
                    "language",
                    value
                  )
                }
                options={[
                  {
                    value: "English",
                    label: "English",
                  },
                  {
                    value: "Bangla",
                    label: "বাংলা (Bangla)",
                  },
                ]}
              />

              {/* TIMEZONE */}

              <SelectSetting
                label="Timezone"
                value={settings.timezone}
                onChange={(value) =>
                  handleSelectChange(
                    "timezone",
                    value
                  )
                }
                options={[
                  {
                    value: "Asia/Dhaka",
                    label: "Asia/Dhaka (GMT+6)",
                  },
                  {
                    value: "Asia/Kolkata",
                    label: "Asia/Kolkata (GMT+5:30)",
                  },
                  {
                    value: "UTC",
                    label: "UTC",
                  },
                ]}
              />
            </div>

            {/* DARK MODE */}

            <div className="mt-5 border-t border-gray-100 pt-2 dark:border-gray-800">
              <ToggleSetting
                icon={<Moon size={18} />}
                title="Dark Mode"
                description="Use a darker appearance throughout the admin panel."
                enabled={settings.darkMode}
                onClick={() =>
                  handleToggle("darkMode")
                }
              />
            </div>
          </div>
        </motion.div>

        {/* =================================================
            SAVE AREA
        ================================================= */}

        <motion.div
          variants={itemVariants}
          className="flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-colors duration-300 dark:border-gray-800 dark:bg-gray-900 sm:flex-row sm:items-center sm:justify-between sm:p-6"
        >
          <div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
              Your settings
            </p>

            <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
              Changes are saved to your admin account.
            </p>

            <AnimatePresence>
              {saveError && (
                <motion.p
                  initial={{
                    opacity: 0,
                    y: 5,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                  }}
                  className="mt-2 text-xs text-yellow-600 dark:text-yellow-400"
                >
                  {saveError}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* RESET */}

            <motion.button
              whileHover={{
                scale: 1.02,
              }}
              whileTap={{
                scale: 0.97,
              }}
              type="button"
              onClick={handleReset}
              className="flex cursor-pointer items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              <RotateCcw size={15} />
              Reset
            </motion.button>

            {/* SAVE */}

            <motion.button
              whileHover={{
                scale: 1.02,
              }}
              whileTap={{
                scale: 0.97,
              }}
              disabled={saving}
              onClick={handleSave}
              className={`flex min-w-[145px] cursor-pointer items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition ${
                saved
                  ? "bg-green-700"
                  : "bg-green-600 hover:bg-green-700 hover:shadow-md"
              } disabled:cursor-not-allowed disabled:opacity-70`}
            >
              <AnimatePresence mode="wait">
                {saving ? (
                  <motion.span
                    key="saving"
                    initial={{
                      opacity: 0,
                    }}
                    animate={{
                      opacity: 1,
                    }}
                    exit={{
                      opacity: 0,
                    }}
                    className="flex items-center gap-2"
                  >
                    <Loader2
                      size={16}
                      className="animate-spin"
                    />
                    Saving...
                  </motion.span>
                ) : saved ? (
                  <motion.span
                    key="saved"
                    initial={{
                      opacity: 0,
                      scale: 0.8,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                    className="flex items-center gap-2"
                  >
                    <Check size={16} />
                    Saved
                  </motion.span>
                ) : (
                  <motion.span
                    key="save"
                    initial={{
                      opacity: 0,
                    }}
                    animate={{
                      opacity: 1,
                    }}
                    className="flex items-center gap-2"
                  >
                    <Save size={16} />
                    Save Settings
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

/* =========================================================
   SECTION HEADER
========================================================= */

function SettingsSectionHeader({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-center gap-3 border-b border-gray-100 px-5 py-5 dark:border-gray-800 sm:px-6">
      <motion.div
        whileHover={{
          scale: 1.08,
          rotate: 4,
        }}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-600 dark:bg-green-950/60 dark:text-green-400"
      >
        {icon}
      </motion.div>

      <div className="min-w-0">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
          {title}
        </h2>

        <p className="text-xs text-gray-400 dark:text-gray-500">
          {description}
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   TOGGLE SETTING
========================================================= */

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
      layout
      whileHover={{
        x: 3,
      }}
      className="group flex items-center justify-between gap-4 py-4"
    >
      <div className="flex min-w-0 items-center gap-3">
        <motion.div
          animate={{
            scale: enabled ? 1 : 0.96,
          }}
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${
            enabled
              ? "bg-green-50 text-green-600 dark:bg-green-950/60 dark:text-green-400"
              : "bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500"
          }`}
        >
          {icon}
        </motion.div>

        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
            {title}
          </h3>

          <p className="mt-0.5 text-xs leading-5 text-gray-400 dark:text-gray-500">
            {description}
          </p>
        </div>
      </div>

      {/* BEAUTIFUL TOGGLE */}

      <motion.button
        type="button"
        onClick={onClick}
        aria-label={`Toggle ${title}`}
        aria-pressed={enabled}
        whileTap={{
          scale: 0.92,
        }}
        className={`relative h-7 w-[50px] shrink-0 cursor-pointer rounded-full p-1 transition-all duration-300 ${
          enabled
            ? "bg-green-600 shadow-[0_0_0_4px_rgba(22,163,74,0.10)]"
            : "bg-gray-300 dark:bg-gray-700"
        }`}
      >
        <motion.span
          layout
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
          }}
          className={`block h-5 w-5 rounded-full bg-white shadow-md ${
            enabled
              ? "ml-[22px]"
              : "ml-0"
          }`}
        />

        {/* Small active glow */}

        {enabled && (
          <motion.span
            initial={{
              opacity: 0,
              scale: 0.5,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            className="absolute inset-0 rounded-full ring-2 ring-green-400/20"
          />
        )}
      </motion.button>
    </motion.div>
  );
}

/* =========================================================
   SELECT SETTING
========================================================= */

function SelectSetting({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: {
    value: string;
    label: string;
  }[];
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
        {label}
      </label>

      <div className="relative">
        <select
          value={value}
          onChange={(e) =>
            onChange(e.target.value)
          }
          className="w-full cursor-pointer appearance-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 outline-none transition-all duration-200 hover:border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:border-gray-600 dark:focus:border-green-500 dark:focus:bg-gray-800 dark:focus:ring-green-900/40"
        >
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>

        <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
          <Globe size={15} />
        </div>
      </div>
    </div>
  );
}