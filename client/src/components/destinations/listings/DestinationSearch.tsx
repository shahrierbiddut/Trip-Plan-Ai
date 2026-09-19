"use client";

import { useState } from "react";
import { Search, MapPin } from "lucide-react";


export default function DestinationSearch() {
  const [query, setQuery] = useState("");

  const popularSearches = [
    "Cox's Bazar",
    "Sajek Valley",
    "Bandarban",
    "Saint Martin",
    "Sylhet",
    "Rangamati",
    "Kuakata",
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search implementation would go here (e.g. updating URL params or context)
    console.log("Searching for:", query);
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-8">
      <form
        onSubmit={handleSearch}
        className="flex items-center bg-white rounded-full p-2 relative z-10 w-[90%] md:w-[80%] mx-auto"
      >
        <div className="flex-1 flex items-center pl-4 gap-3">
          <Search size={20} className="text-[#66736D]" />
          <input
            type="text"
            placeholder="Where do you want to go?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent border-none outline-none text-[#17211D] placeholder:text-[#66736D] text-[15px] font-medium"
          />
        </div>
        <div className="flex items-center gap-3 pr-2">
          <MapPin size={20} className="text-[#66736D]" />
          <button
            type="submit"
            className="bg-[#F4B942] text-[#17211D] px-8 py-3 rounded-full font-bold text-[15px] transition-colors hover:bg-[#F4A62A]"
          >
            Explore
          </button>
        </div>
      </form>

      <div className="mt-5 flex flex-wrap items-center justify-center gap-2 w-full mx-auto">
        <span className="text-[13px] font-bold text-white mr-2">
          Popular searches:
        </span>
        {popularSearches.map((term) => (
          <button
            key={term}
            type="button"
            onClick={() => setQuery(term)}
            className="bg-white/10 hover:bg-white/20 border border-white/20 text-white/90 text-[12px] font-medium px-4 py-1.5 rounded-full transition-colors"
          >
            {term}
          </button>
        ))}
      </div>
    </div>
  );
}
