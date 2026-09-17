"use client";

import { motion } from "framer-motion";
import { LogOut, ShieldCheck, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function LogoutPage() {
  const handleLogout = () => {
    // Later you can add:
    // localStorage.removeItem("token");
    // cookies remove
    // API logout request

    window.location.href = "/";
  };

  return (
    <div className="flex min-h-[calc(100vh-0px)] w-full items-center justify-center p-4 sm:p-6 lg:p-8">

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >

        <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-lg">

          {/* TOP */}
          <div className="relative overflow-hidden bg-gradient-to-br from-green-700 via-green-600 to-emerald-500 px-6 py-8 text-center sm:px-8">

            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10" />

            <div className="absolute -bottom-16 -left-10 h-36 w-36 rounded-full bg-white/10" />

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                delay: 0.2,
                type: "spring",
                stiffness: 180,
              }}
              className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm"
            >
              <LogOut size={28} />
            </motion.div>

            <h1 className="relative mt-4 text-xl font-bold text-white">
              Logout
            </h1>

            <p className="relative mt-1 text-sm text-green-50">
              Sign out from your admin account
            </p>

          </div>

          {/* CONTENT */}
          <div className="p-6 text-center sm:p-8">

            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-600">
              <ShieldCheck size={23} />
            </div>

            <h2 className="mt-4 text-lg font-bold text-gray-900">
              Are you sure you want to logout?
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              You will be signed out of your admin account and
              redirected to the home page.
            </p>

            {/* BUTTONS */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">

              <Link
                href="/admin-panel"
                className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-gray-100 px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-200"
              >
                <ArrowLeft size={16} />
                Cancel
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-red-500 px-4 py-3 text-sm font-medium text-white transition hover:bg-red-600 hover:shadow-md"
              >
                <LogOut size={16} />
                Logout
              </button>

            </div>

          </div>

        </div>

      </motion.div>

    </div>
  );
}