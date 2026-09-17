"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  MapPin,
  CalendarDays,
  ArrowRight,
  User,
} from "lucide-react";

const recentTrips = [
  {
    id: 1,
    user: "Nishat Yeasmin",
    destination: "Cox's Bazar",
    date: "Aug 20, 2026",
    status: "Completed",
  },
  {
    id: 2,
    user: "Sadia Rahman",
    destination: "Sajek Valley",
    date: "Aug 19, 2026",
    status: "Planning",
  },
  {
    id: 3,
    user: "Tanvir Ahmed",
    destination: "Sylhet",
    date: "Aug 18, 2026",
    status: "Completed",
  },
  {
    id: 4,
    user: "Mehedi Hasan",
    destination: "Bandarban",
    date: "Aug 17, 2026",
    status: "Planning",
  },
  {
    id: 5,
    user: "Sumaiya Islam",
    destination: "Rangamati",
    date: "Aug 16, 2026",
    status: "Completed",
  },
];

const recentUsers = [
  {
    id: 1,
    name: "Nishat Yeasmin",
    email: "nishat@example.com",
    joined: "Today",
  },
  {
    id: 2,
    name: "Sadia Rahman",
    email: "sadia@example.com",
    joined: "Yesterday",
  },
  {
    id: 3,
    name: "Tanvir Ahmed",
    email: "tanvir@example.com",
    joined: "2 days ago",
  },
  {
    id: 4,
    name: "Mehedi Hasan",
    email: "mehedi@example.com",
    joined: "3 days ago",
  },
];

export default function RecentActivity() {
  const router = useRouter();
  
  return (
    <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">

      {/* Recent Trips */}
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm xl:col-span-2">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-5 sm:px-6">
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              Recent Trips
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Latest trips created by users
            </p>
          </div>

          <Link
            href="/admin-panel/trips"
            onClick={() => router.push("/admin-panel/trips")}

            className="flex items-center gap-1 text-sm font-semibold text-green-600 transition-colors hover:text-green-700"
          >
            View All
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[650px]">

            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/70">
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-400 sm:px-6">
                  User
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Destination
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Date
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {recentTrips.map((trip) => (
                <tr
                  key={trip.id}
                  className="border-b border-gray-50 transition-colors last:border-0 hover:bg-green-50/40"
                >

                  {/* User */}
                  <td className="px-5 py-4 sm:px-6">
                    <div className="flex items-center gap-3">

                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-100 text-sm font-semibold text-green-700">
                        {trip.user.charAt(0)}
                      </div>

                      <span className="whitespace-nowrap text-sm font-medium text-gray-800">
                        {trip.user}
                      </span>

                    </div>
                  </td>

                  {/* Destination */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <MapPin
                        size={15}
                        className="text-green-600"
                      />

                      <span className="whitespace-nowrap text-sm text-gray-600">
                        {trip.destination}
                      </span>
                    </div>
                  </td>

                  {/* Date */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <CalendarDays
                        size={15}
                        className="text-gray-400"
                      />

                      <span className="whitespace-nowrap text-sm text-gray-500">
                        {trip.date}
                      </span>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                        trip.status === "Completed"
                          ? "bg-green-50 text-green-700"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {trip.status}
                    </span>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>

      {/* Recent Users */}
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-5">
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              Recent Users
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Recently registered users
            </p>
          </div>

          <Link
            href="/admin-panel/users"
            className="rounded-lg p-2 text-green-600 transition-colors hover:bg-green-50"
          >
            <ArrowRight size={18} />
          </Link>
        </div>

        {/* Users */}
        <div className="divide-y divide-gray-50">

          {recentUsers.map((user) => (
            <div
              key={user.id}
              className="flex items-center gap-3 px-5 py-4 transition-colors hover:bg-green-50/40"
            >

              {/* Avatar */}
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100 text-sm font-semibold text-green-700">
                {user.name.charAt(0)}
              </div>

              {/* User Info */}
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-gray-800">
                  {user.name}
                </p>

                <p className="truncate text-xs text-gray-400">
                  {user.email}
                </p>
              </div>

              {/* Joined */}
              <div className="hidden text-right sm:block">
                <p className="text-xs text-gray-400">
                  Joined
                </p>

                <p className="mt-0.5 text-xs font-medium text-gray-600">
                  {user.joined}
                </p>
              </div>

            </div>
          ))}

        </div>

        {/* Bottom */}
        <div className="border-t border-gray-100 px-5 py-4">
          <Link
            href="/admin-panel/users"
            className="flex items-center justify-center gap-2 rounded-xl bg-green-50 py-2.5 text-sm font-semibold text-green-700 transition-colors hover:bg-green-100"
          >
            <User size={16} />
            Manage Users
          </Link>
        </div>

      </div>

    </div>
  );
}