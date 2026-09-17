import { Sparkles, Check, AlertCircle } from "lucide-react";
import { Button } from "@heroui/react";

interface AIReviewSummaryProps {
  data: {
    loved: string[];
    concerns: string[];
    verdict: string;
  };
}

export default function AIReviewSummary({ data }: AIReviewSummaryProps) {
  return (
    <div className="bg-[#0B2522] rounded-3xl p-6 md:p-8 text-white shadow-xl shadow-[#17211D]/10 h-full flex flex-col relative overflow-hidden border border-white/5">
      {/* Subtle Background Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#F4A62A]/5 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      
      <div className="flex items-center gap-2.5 text-[#F4A62A] font-bold text-[15px] mb-3 relative z-10">
        <Sparkles className="w-4 h-4" />
        AI Review Summary
      </div>
      
      <p className="text-[13px] text-white/70 mb-8 relative z-10 leading-relaxed max-w-sm">
        AI analyzed traveler feedback to bring you these insights.
      </p>

      <div className="flex flex-col gap-8 mb-10 flex-1 relative z-10">
        <div>
          <h4 className="text-[11px] font-bold text-[#087F5B] uppercase tracking-wider mb-4 bg-[#087F5B]/10 w-fit px-3 py-1.5 rounded-full border border-[#087F5B]/20 flex items-center gap-1.5">
             Travelers Love
          </h4>
          <div className="grid grid-cols-2 gap-y-3 gap-x-2">
            {data.loved.map((item, i) => (
              <div key={i} className="flex items-center gap-2.5 text-[13px] text-white/90">
                <div className="w-4 h-4 rounded-full bg-[#087F5B]/20 flex items-center justify-center shrink-0">
                  <Check className="w-2.5 h-2.5 text-[#20C997]" strokeWidth={3} />
                </div>
                <span className="truncate font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-[11px] font-bold text-[#F4A62A] uppercase tracking-wider mb-4 bg-[#F4A62A]/10 w-fit px-3 py-1.5 rounded-full border border-[#F4A62A]/20 flex items-center gap-1.5">
             Common Concerns
          </h4>
          <div className="flex flex-col gap-3">
            {data.concerns.map((item, i) => (
              <div key={i} className="flex items-center gap-2.5 text-[13px] text-white/90">
                <div className="w-4 h-4 rounded-full bg-[#F4A62A]/15 flex items-center justify-center shrink-0">
                  <AlertCircle className="w-2.5 h-2.5 text-[#F4A62A]" strokeWidth={3} />
                </div>
                <span className="font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-[#122B27]/80 backdrop-blur-sm p-5 rounded-2xl border border-white/5 mb-5 relative z-10">
        <span className="text-[10px] font-bold text-[#F4A62A] uppercase tracking-widest block mb-2">AI Verdict</span>
        <p className="text-[13px] text-white/90 leading-relaxed font-medium">{data.verdict}</p>
      </div>

      <Button
        variant="primary"
        className="bg-[#163D36] hover:bg-[#1C4D44] text-white font-bold w-full rounded-xl py-6 transition-all hover:shadow-lg relative z-10"
      >
        View All Review Insights
      </Button>
    </div>
  );
}
