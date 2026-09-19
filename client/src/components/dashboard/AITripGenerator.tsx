"use client";

import { useState } from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import { useDashboard } from "@/components/dashboard/DashboardContext";

export default function AITripGenerator() {
  const { dashboardData, isLoading } = useDashboard();

  if (isLoading || !dashboardData) {
    return <div className="h-full flex items-center justify-center bg-white rounded-2xl">Loading...</div>;
  }
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    // Mock API delay
    setTimeout(() => {
      setIsGenerating(false);
      setPrompt("");
      alert("This is a mock. Backend integration pending!");
    }, 1500);
  };

  return (
    <div className="flex h-[280px] w-full flex-col justify-between rounded-2xl bg-[#F4F6F4] p-6 shadow-sm">
      <div>
        <h3 className="flex items-center gap-2 font-serif text-2xl font-bold text-[#04271C]">
          <Sparkles size={20} className="text-[#087F5B]" />
          Where should we go next?
        </h3>
        <p className="mt-1 text-[13px] text-[#66736D]">
          Tell TripPlan AI what kind of experience you want.
        </p>
      </div>

      <div className="mt-4 flex-1">
        <div className="flex h-full flex-col gap-3">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="I want a relaxing 3-day trip under ৳15,000..."
            className="w-full flex-1 resize-none rounded-t-xl border-none bg-white p-4 text-[13px] text-[#17211D] shadow-[0_4px_12px_rgba(0,0,0,0.03)] placeholder:text-[#66736D]/60 focus:outline-none focus:ring-1 focus:ring-[#F4A934] transition-all"
          />
          <button
            onClick={handleGenerate}
            disabled={isGenerating || !prompt.trim()}
            className="flex h-11 w-full items-center justify-start gap-2 rounded-b-xl bg-[#04271C] px-5 text-[13px] font-bold text-white transition-colors hover:bg-[#073D31] disabled:opacity-70"
          >
            {isGenerating ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Generating...
              </span>
            ) : (
              <>
                Generate Trip <Sparkles size={14} className="text-[#F4A934]" />
              </>
            )}
          </button>
        </div>
      </div>

      <div className="mt-5">
        <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-[#66736D]">
          Quick suggestions
        </p>
        <div className="flex flex-wrap gap-2">
          {dashboardData.quickSuggestions.map((suggestion: any) => (
            <button
              key={suggestion}
              onClick={() => setPrompt(`I want a ${suggestion.toLowerCase()}...`)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#E2E7E3] bg-white px-3 py-1.5 text-[11px] font-medium text-[#17211D] transition-colors hover:border-[#087F5B] hover:text-[#087F5B]"
            >
              <Sparkles size={10} className="text-[#087F5B]" />
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
