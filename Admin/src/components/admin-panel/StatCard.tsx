import {
  Users,
  Map,
  MapPin,
  Star,
  ArrowUpRight,
} from "lucide-react";

const iconMap = {
  users: Users,
  trips: Map,
  destinations: MapPin,
  reviews: Star,
};

export default function StatCard({
  title,
  value,
  change,
  icon,
  description,
}) {
  const Icon = iconMap[icon];

  return (
    <div className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-green-100 hover:shadow-md">
      {/* Top */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">
            {title}
          </p>

          <h3 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
            {value}
          </h3>
        </div>

        {/* Icon */}
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600 transition-colors group-hover:bg-green-600 group-hover:text-white">
          <Icon size={21} strokeWidth={2} />
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-5 flex items-center gap-2">
        <span className="flex items-center gap-1 rounded-lg bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
          <ArrowUpRight size={13} />
          {change}
        </span>

        <span className="text-xs text-gray-400">
          {description}
        </span>
      </div>
    </div>
  );
}