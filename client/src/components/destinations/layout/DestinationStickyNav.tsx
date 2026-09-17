"use client";

import { useEffect, useState } from "react";
import { 
  FileText, 
  Map, 
  MapPin, 
  Bed, 
  Utensils, 
  MessageSquare, 
  Info, 
  Sparkles, 
  Calendar 
} from "lucide-react";
import { Link } from "@heroui/react";

const NAV_ITEMS = [
  { id: "overview", label: "Overview", icon: FileText },
  { id: "things-to-do", label: "Things to Do", icon: Map },
  { id: "places", label: "Places", icon: MapPin },
  { id: "stay", label: "Stay", icon: Bed },
  { id: "food", label: "Food", icon: Utensils },
  { id: "reviews", label: "Reviews", icon: MessageSquare },
  { id: "travel-info", label: "Travel Info", icon: Info },
  { id: "ai-insights", label: "AI Insights", icon: Sparkles },
  { id: "plan-trip", label: "Plan Trip", icon: Calendar },
];

export default function DestinationStickyNav() {
  const [activeSection, setActiveSection] = useState("overview");
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Check sticky state based on scroll
      const heroHeight = window.innerHeight * 0.7; // approximate hero height
      if (window.scrollY > heroHeight) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }

      // Check active section
      const sections = NAV_ITEMS.map((item) => document.getElementById(item.id));
      
      let current = "";
      for (const section of sections) {
        if (section) {
          const rect = section.getBoundingClientRect();
          // If the top of the section is near the top of the viewport
          if (rect.top <= 150) {
            current = section.id;
          }
        }
      }

      if (current) {
        setActiveSection(current);
      } else if (window.scrollY < heroHeight) {
         setActiveSection("overview");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div 
      className={`w-full bg-white border-b border-[#E2E7E3] z-40 transition-all duration-300 ${
        isSticky ? "fixed top-[72px] left-0 right-0 shadow-sm" : "relative"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        <div className="flex items-center gap-6 md:gap-8 overflow-x-auto scrollbar-hide py-4">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`flex items-center gap-2 whitespace-nowrap text-sm font-medium transition-colors border-b-2 pb-1 -mb-[18px] ${
                activeSection === item.id
                  ? "text-[#F4A62A] border-[#F4A62A]"
                  : "text-[#66736D] border-transparent hover:text-[#17211D]"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
