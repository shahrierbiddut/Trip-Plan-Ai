import { Lightbulb, Info } from "lucide-react";

interface TipsProps {
  data: string[];
}

export default function SmartTravelTips({ data }: TipsProps) {
  return (
    <div className="bg-gradient-to-br from-[#E8F3EF] to-white border border-[#087F5B]/15 rounded-3xl p-6 md:p-8 shadow-lg shadow-[#087F5B]/5 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute -top-12 -right-12 w-40 h-40 bg-white rounded-full blur-[40px] pointer-events-none" />

      <h3 className="text-2xl font-serif text-[#17211D] font-bold mb-8 flex items-center gap-3 relative z-10">
         <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center shrink-0">
           <Lightbulb className="w-5 h-5 text-[#F4A62A]" strokeWidth={2.5} />
         </div>
         Smart Travel Tips
      </h3>
      
      <ul className="flex flex-col gap-5 relative z-10">
        {data.map((tip, index) => (
          <li key={index} className="flex items-start gap-4 group">
             {/* Custom bullet icon */}
             <div className="mt-1 shrink-0 w-5 h-5 rounded-full bg-white shadow-sm border border-[#087F5B]/20 flex items-center justify-center group-hover:bg-[#087F5B] group-hover:border-[#087F5B] transition-colors">
               <div className="w-1.5 h-1.5 rounded-full bg-[#087F5B] group-hover:bg-white transition-colors" />
             </div>
             
             <p className="text-[14.5px] text-[#17211D] font-medium leading-relaxed group-hover:text-[#0B2522] transition-colors">{tip}</p>
          </li>
        ))}
      </ul>
      
      <div className="mt-8 pt-6 border-t border-[#087F5B]/10 flex items-start gap-3">
        <Info className="w-4 h-4 text-[#087F5B] shrink-0 mt-0.5" />
        <p className="text-[12px] text-[#66736D] leading-relaxed">
          These tips are curated by AI based on real traveler feedback and seasonal conditions in Cox&apos;s Bazar.
        </p>
      </div>
    </div>
  );
}
