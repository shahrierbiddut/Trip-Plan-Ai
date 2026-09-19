"use client";

import { useState, useEffect } from "react";
import { Sparkles, TrendingDown, Loader2 } from "lucide-react";

interface PricePredictorProps {
  destination: string;
  title: string;
  price: number;
}

export default function PricePredictor({ destination, title, price }: PricePredictorProps) {
  const [prediction, setPrediction] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchPrediction() {
      try {
        const response = await fetch(`${(process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/+$/, "")}/api/chat/predict-price`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ destination, title, price })
        });
        
        if (!response.ok) {
          throw new Error("API Route not found or failed");
        }
        
        const data = await response.json();
        if (data.success) {
          setPrediction(data.prediction);
        } else {
          setPrediction("AI প্রেডিকশন এই মুহূর্তে কাজ করছে না।");
        }
      } catch (err) {
        setPrediction("AI সার্ভারে সমস্যা হচ্ছে।");
      } finally {
        setLoading(false);
      }
    }
    fetchPrediction();
  }, [destination, title, price]);

  return (
    <div className="mb-6 rounded-2xl border border-white/20 bg-white/5 p-5 shadow-sm backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="text-[#FBBF24]" size={20} />
        <h3 className="font-serif text-lg font-bold text-white">AI Insights: Price Predictor</h3>
      </div>
      
      {loading ? (
        <div className="flex items-center gap-2 text-sm text-white/70">
          <Loader2 className="animate-spin" size={16} />
          <span>অ্যানালাইজ করা হচ্ছে...</span>
        </div>
      ) : (
        <div className="flex items-start gap-3 text-sm text-white/90">
          <TrendingDown className="mt-0.5 text-[#FBBF24] shrink-0" size={18} />
          <p className="leading-relaxed font-medium">{prediction}</p>
        </div>
      )}
    </div>
  );
}
