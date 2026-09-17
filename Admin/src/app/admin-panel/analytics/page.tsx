"use client";

import { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  TrendingUp,
  Users,
  Plane,
  MapPin,
  Star,
  DollarSign,
  CalendarDays,
  Activity,
} from "lucide-react";

/* =========================
   DATA
========================= */

const destinationData = [
  {
    name: "Cox's Bazar",
    trips: 245,
  },
  {
    name: "Sajek",
    trips: 198,
  },
  {
    name: "Sylhet",
    trips: 176,
  },
  {
    name: "Bandarban",
    trips: 154,
  },
  {
    name: "Saint Martin",
    trips: 132,
  },
  {
    name: "Rangamati",
    trips: 110,
  },
];

const categoryData = [
  {
    name: "Beach",
    value: 32,
  },
  {
    name: "Mountain",
    value: 25,
  },
  {
    name: "Nature",
    value: 21,
  },
  {
    name: "Adventure",
    value: 14,
  },
  {
    name: "Cultural",
    value: 8,
  },
];

const ratingData = [
  {
    rating: "5★",
    reviews: 520,
  },
  {
    rating: "4★",
    reviews: 310,
  },
  {
    rating: "3★",
    reviews: 120,
  },
  {
    rating: "2★",
    reviews: 45,
  },
  {
    rating: "1★",
    reviews: 18,
  },
];

/* =========================
   COLORS
========================= */

const pieColors = [
  "#16a34a",
  "#22c55e",
  "#4ade80",
  "#86efac",
  "#bbf7d0",
];

/* =========================
   ANIMATION
========================= */

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
      ease: "easeOut",
    },
  },
};

/* =========================
   PAGE
========================= */

export default function AnalyticsPage() {
  const [range, setRange] = useState("Year");
  const [monthlyData, setMonthlyData] = useState<any[]>([]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await fetch(`${(process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/+$/, "")}/api/stats/analytics`);
        const data = await res.json();
        if (data.success) {
          setMonthlyData(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch analytics", error);
      }
    };
    fetchAnalytics();
  }, []);

  const totalTrips = useMemo(
    () =>
      monthlyData.reduce(
        (sum, item) => sum + item.trips,
        0
      ),
    [monthlyData]
  );

  const totalUsers = useMemo(
    () =>
      monthlyData.length > 0 ? monthlyData[
        monthlyData.length - 1
      ].users : 0,
    [monthlyData]
  );

  const totalReviews = ratingData.reduce(
    (sum, item) => sum + item.reviews,
    0
  );

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
        className="
          mb-7
          flex
          flex-col
          gap-4
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        <div className="flex items-center gap-3">

          <div className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            bg-green-50
            text-green-600
          ">
            <TrendingUp size={22} />
          </div>

          <div>
            <h1 className="
              text-2xl
              font-bold
              text-gray-900
              sm:text-3xl
            ">
              Analytics
            </h1>

            <p className="
              mt-1
              text-sm
              text-gray-500
            ">
              Monitor your platform performance and growth.
            </p>
          </div>

        </div>

        {/* RANGE */}

        <div className="
          flex
          w-full
          rounded-xl
          border
          border-gray-200
          bg-white
          p-1
          sm:w-auto
        ">

          {["Week", "Month", "Year"].map(
            (item) => (
              <button
                key={item}
                onClick={() => setRange(item)}
                className={`
                  flex-1
                  cursor-pointer
                  rounded-lg
                  px-4
                  py-2
                  text-sm
                  font-medium
                  transition
                  sm:flex-none
                  ${
                    range === item
                      ? "bg-green-600 text-white shadow-sm"
                      : "text-gray-500 hover:bg-green-50 hover:text-green-600"
                  }
                `}
              >
                {item}
              </button>
            )
          )}

        </div>
      </motion.div>

      {/* ================= STAT CARDS ================= */}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="
          grid
          grid-cols-1
          gap-4
          sm:grid-cols-2
          xl:grid-cols-4
        "
      >

        <AnalyticsStat
          title="Total Trips"
          value={totalTrips}
          percentage="+18.6%"
          icon={<Plane size={21} />}
        />

        <AnalyticsStat
          title="Active Users"
          value={totalUsers}
          percentage="+24.8%"
          icon={<Users size={21} />}
        />

        <AnalyticsStat
          title="Destinations"
          value="48"
          percentage="+8.2%"
          icon={<MapPin size={21} />}
        />

        <AnalyticsStat
          title="Total Reviews"
          value={totalReviews}
          percentage="+15.4%"
          icon={<Star size={21} />}
        />

      </motion.div>

      {/* ================= MAIN CHART ================= */}

      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="show"
        className="
          mt-6
          rounded-2xl
          border
          border-gray-100
          bg-white
          p-4
          shadow-sm
          sm:p-6
        "
      >

        <div className="
          mb-5
          flex
          flex-col
          gap-2
          sm:flex-row
          sm:items-center
          sm:justify-between
        ">

          <div>
            <h2 className="
              text-lg
              font-bold
              text-gray-800
            ">
              Trips & Users Growth
            </h2>

            <p className="
              mt-1
              text-xs
              text-gray-400
            ">
              Monthly platform performance
            </p>
          </div>

          <div className="
            flex
            items-center
            gap-4
            text-xs
          ">

            <div className="
              flex
              items-center
              gap-1.5
            ">
              <span className="
                h-2.5
                w-2.5
                rounded-full
                bg-green-600
              " />
              Trips
            </div>

            <div className="
              flex
              items-center
              gap-1.5
            ">
              <span className="
                h-2.5
                w-2.5
                rounded-full
                bg-green-200
              " />
              Users
            </div>

          </div>

        </div>

        <div className="
          h-[280px]
          w-full
          sm:h-[340px]
        ">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <AreaChart
              data={monthlyData}
              margin={{
                top: 10,
                right: 10,
                left: -15,
                bottom: 0,
              }}
            >

              <defs>

                <linearGradient
                  id="tripGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="#16a34a"
                    stopOpacity={0.25}
                  />

                  <stop
                    offset="95%"
                    stopColor="#16a34a"
                    stopOpacity={0}
                  />
                </linearGradient>

                <linearGradient
                  id="userGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="#86efac"
                    stopOpacity={0.25}
                  />

                  <stop
                    offset="95%"
                    stopColor="#86efac"
                    stopOpacity={0}
                  />
                </linearGradient>

              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f1f5f1"
              />

              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "#9ca3af",
                  fontSize: 12,
                }}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "#9ca3af",
                  fontSize: 12,
                }}
              />

              <Tooltip
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid #e5e7eb",
                  boxShadow:
                    "0 10px 25px rgba(0,0,0,0.08)",
                }}
              />

              <Area
                type="monotone"
                dataKey="users"
                stroke="#86efac"
                strokeWidth={2}
                fill="url(#userGradient)"
                animationDuration={1200}
              />

              <Area
                type="monotone"
                dataKey="trips"
                stroke="#16a34a"
                strokeWidth={3}
                fill="url(#tripGradient)"
                animationDuration={1200}
              />

            </AreaChart>
          </ResponsiveContainer>

        </div>

      </motion.div>

      {/* ================= SECOND ROW ================= */}

      <div className="
        mt-6
        grid
        grid-cols-1
        gap-6
        xl:grid-cols-2
      ">

        {/* ================= DESTINATION CHART ================= */}

        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="show"
          className="
            min-w-0
            rounded-2xl
            border
            border-gray-100
            bg-white
            p-4
            shadow-sm
            sm:p-6
          "
        >

          <div className="mb-5">

            <h2 className="
              text-lg
              font-bold
              text-gray-800
            ">
              Popular Destinations
            </h2>

            <p className="
              mt-1
              text-xs
              text-gray-400
            ">
              Trips by destination
            </p>

          </div>

          <div className="
            h-[300px]
            w-full
          ">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <BarChart
                data={destinationData}
                layout="vertical"
                margin={{
                  top: 5,
                  right: 10,
                  left: 5,
                  bottom: 5,
                }}
              >

                <CartesianGrid
                  strokeDasharray="3 3"
                  horizontal={false}
                  stroke="#f1f5f1"
                />

                <XAxis
                  type="number"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: "#9ca3af",
                    fontSize: 11,
                  }}
                />

                <YAxis
                  type="category"
                  dataKey="name"
                  width={90}
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: "#6b7280",
                    fontSize: 11,
                  }}
                />

                <Tooltip
                  cursor={{
                    fill: "#f0fdf4",
                  }}
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid #e5e7eb",
                  }}
                />

                <Bar
                  dataKey="trips"
                  fill="#16a34a"
                  radius={[
                    0,
                    6,
                    6,
                    0,
                  ]}
                  barSize={22}
                  animationDuration={1000}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </motion.div>

        {/* ================= CATEGORY PIE ================= */}

        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="show"
          className="
            min-w-0
            rounded-2xl
            border
            border-gray-100
            bg-white
            p-4
            shadow-sm
            sm:p-6
          "
        >

          <div className="mb-3">

            <h2 className="
              text-lg
              font-bold
              text-gray-800
            ">
              Travel Categories
            </h2>

            <p className="
              mt-1
              text-xs
              text-gray-400
            ">
              User preferences
            </p>

          </div>

          <div className="
            flex
            flex-col
            items-center
            gap-5
            sm:flex-row
            sm:justify-center
          ">

            <div className="
              h-[220px]
              w-full
              max-w-[280px]
            ">

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <PieChart>

                  <Pie
                    data={categoryData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={58}
                    outerRadius={88}
                    paddingAngle={3}
                    animationDuration={1000}
                  >

                    {categoryData.map(
                      (entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            pieColors[
                              index %
                                pieColors.length
                            ]
                          }
                        />
                      )
                    )}

                  </Pie>

                  <Tooltip
                    contentStyle={{
                      borderRadius: "12px",
                      border:
                        "1px solid #e5e7eb",
                    }}
                  />

                </PieChart>

              </ResponsiveContainer>

            </div>

            {/* LEGEND */}

            <div className="
              grid
              w-full
              grid-cols-2
              gap-3
              sm:w-auto
              sm:grid-cols-1
            ">

              {categoryData.map(
                (item, index) => (
                  <div
                    key={item.name}
                    className="
                      flex
                      items-center
                      gap-2
                    "
                  >

                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{
                        backgroundColor:
                          pieColors[index],
                      }}
                    />

                    <span className="
                      text-xs
                      text-gray-500
                    ">
                      {item.name}
                    </span>

                    <span className="
                      ml-auto
                      text-xs
                      font-bold
                      text-gray-700
                    ">
                      {item.value}%
                    </span>

                  </div>
                )
              )}

            </div>

          </div>

        </motion.div>

      </div>

      {/* ================= REVIEWS + OVERVIEW ================= */}

      <div className="
        mt-6
        grid
        grid-cols-1
        gap-6
        xl:grid-cols-2
      ">

        {/* REVIEW CHART */}

        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="show"
          className="
            min-w-0
            rounded-2xl
            border
            border-gray-100
            bg-white
            p-4
            shadow-sm
            sm:p-6
          "
        >

          <div className="mb-5">

            <h2 className="
              text-lg
              font-bold
              text-gray-800
            ">
              Review Ratings
            </h2>

            <p className="
              mt-1
              text-xs
              text-gray-400
            ">
              Rating distribution from travelers
            </p>

          </div>

          <div className="
            h-[280px]
            w-full
          ">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <BarChart
                data={ratingData}
                margin={{
                  top: 5,
                  right: 10,
                  left: -15,
                  bottom: 5,
                }}
              >

                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f1f5f1"
                />

                <XAxis
                  dataKey="rating"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: "#6b7280",
                    fontSize: 12,
                  }}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: "#9ca3af",
                    fontSize: 11,
                  }}
                />

                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid #e5e7eb",
                  }}
                />

                <Bar
                  dataKey="reviews"
                  fill="#22c55e"
                  radius={[
                    6,
                    6,
                    0,
                    0,
                  ]}
                  barSize={36}
                  animationDuration={1000}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </motion.div>

        {/* OVERVIEW */}

        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="show"
          className="
            rounded-2xl
            border
            border-gray-100
            bg-white
            p-4
            shadow-sm
            sm:p-6
          "
        >

          <div className="mb-5">

            <h2 className="
              text-lg
              font-bold
              text-gray-800
            ">
              Performance Overview
            </h2>

            <p className="
              mt-1
              text-xs
              text-gray-400
            ">
              Key metrics from your platform
            </p>

          </div>

          <div className="space-y-4">

            <OverviewItem
              icon={<Users size={19} />}
              title="User Growth"
              value="24.8%"
              text="Compared to last month"
            />

            <OverviewItem
              icon={<Plane size={19} />}
              title="Trip Creation"
              value="18.6%"
              text="Increase in planned trips"
            />

            <OverviewItem
              icon={<DollarSign size={19} />}
              title="Revenue Growth"
              value="21.4%"
              text="Compared to previous period"
            />

            <OverviewItem
              icon={<Star size={19} />}
              title="Average Rating"
              value="4.7 / 5"
              text="Based on traveler reviews"
            />

            <OverviewItem
              icon={<Activity size={19} />}
              title="Engagement"
              value="82.3%"
              text="Monthly active users"
            />

          </div>

        </motion.div>

      </div>

    </div>
  );
}

/* =========================
   STAT COMPONENT
========================= */

function AnalyticsStat({
  title,
  value,
  percentage,
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
        items-start
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

        <div className="
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-xl
          bg-green-50
          text-green-600
        ">
          {icon}
        </div>

      </div>

      <div className="
        mt-4
        flex
        items-center
        gap-1.5
        text-xs
      ">

        <TrendingUp
          size={14}
          className="text-green-600"
        />

        <span className="
          font-semibold
          text-green-600
        ">
          {percentage}
        </span>

        <span className="text-gray-400">
          this period
        </span>

      </div>

    </motion.div>
  );
}

/* =========================
   OVERVIEW ITEM
========================= */

function OverviewItem({
  icon,
  title,
  value,
  text,
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
        border
        border-gray-100
        p-3.5
        transition
        hover:border-green-100
        hover:bg-green-50/40
      "
    >

      <div className="
        flex
        h-10
        w-10
        shrink-0
        items-center
        justify-center
        rounded-xl
        bg-green-50
        text-green-600
      ">
        {icon}
      </div>

      <div className="min-w-0 flex-1">

        <p className="
          text-sm
          font-semibold
          text-gray-700
        ">
          {title}
        </p>

        <p className="
          mt-0.5
          truncate
          text-xs
          text-gray-400
        ">
          {text}
        </p>

      </div>

      <p className="
        shrink-0
        text-sm
        font-bold
        text-green-600
      ">
        {value}
      </p>

    </motion.div>
  );
}
