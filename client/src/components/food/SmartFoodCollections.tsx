import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Baby,
  Banknote,
  Beef,
  Coffee,
  Fish,
  Salad,
  Soup,
  UtensilsCrossed,
} from "lucide-react";
import Link from "next/link";

type FoodCollection = {
  title: string;
  description: string;
  icon: LucideIcon;
  tone: string;
};

const collections: FoodCollection[] = [
  {
    title: "Local meals under ৳300",
    description: "Filling regional favourites that keep the trip budget practical.",
    icon: Banknote,
    tone: "from-[#184f40] to-[#0b2e25]",
  },
  {
    title: "Best family restaurants",
    description: "Comfortable seating, shareable meals and child-friendly choices.",
    icon: Baby,
    tone: "from-[#bd7620] to-[#74420b]",
  },
  {
    title: "Fresh seafood places",
    description: "Popular coastal kitchens for fish, crab and grilled seafood.",
    icon: Fish,
    tone: "from-[#0c705a] to-[#075043]",
  },
  {
    title: "Must-try street food",
    description: "Fuchka, chotpoti, kebab and local snacks travellers love.",
    icon: Soup,
    tone: "from-[#3f6b56] to-[#183e31]",
  },
  {
    title: "Breakfast near your hotel",
    description: "Easy morning meals close to popular hotel areas.",
    icon: Coffee,
    tone: "from-[#9b6823] to-[#50330f]",
  },
  {
    title: "Regional meat favourites",
    description: "Discover mezban, chui jhal and destination-specific recipes.",
    icon: Beef,
    tone: "from-[#315b53] to-[#163730]",
  },
  {
    title: "Vegetarian-friendly food",
    description: "Clearly presented meat-free dishes and flexible local kitchens.",
    icon: Salad,
    tone: "from-[#155d4b] to-[#0b352b]",
  },
  {
    title: "Group-friendly dining",
    description: "Large tables, sharing platters and sensible group pricing.",
    icon: UtensilsCrossed,
    tone: "from-[#af6f27] to-[#653d10]",
  },
];

export function SmartFoodCollections() {
  return (
    <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
      {collections.map(({ title, description, icon: Icon, tone }) => (
        <Link
          key={title}
          href={`/food/search?collection=${encodeURIComponent(title)}`}
          className={`group relative min-h-52 overflow-hidden rounded-[24px] bg-gradient-to-br ${tone} p-5 text-white shadow-[0_14px_32px_rgba(12,58,45,0.14)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_42px_rgba(12,58,45,0.2)]`}
        >
          <span className="inline-flex rounded-2xl bg-white/12 p-3 text-[#f4b43c] backdrop-blur">
            <Icon size={23} />
          </span>
          <h3 className="mt-6 max-w-[220px] font-serif text-xl font-semibold leading-tight">
            {title}
          </h3>
          <p className="mt-2 line-clamp-2 pr-5 text-xs leading-5 text-white/68">
            {description}
          </p>
          <ArrowRight
            className="absolute bottom-5 right-5 transition group-hover:translate-x-1"
            size={19}
          />
        </Link>
      ))}
    </div>
  );
}