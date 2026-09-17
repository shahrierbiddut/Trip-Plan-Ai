import { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

interface StatCardProps {
  icon: ReactNode;
  title: string;
  value: string | number;
  detail: string;
  iconBgColor?: string;
}

export default function StatCard({ icon, title, value, detail, iconBgColor = "bg-[#E2E7E3]" }: StatCardProps) {
  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#E2E7E3] bg-white p-5 transition-all hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(7,61,49,0.1)]">
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${iconBgColor}`}>
          {icon}
        </div>
        
        {/* Content */}
        <div className="flex flex-col">
          <span className="text-[12px] font-semibold text-[#17211D]">{title}</span>
          <span className="mt-1 text-3xl font-bold tracking-tight text-[#17211D]">
            {value}
          </span>
          <span className="mt-1 text-[11px] text-[#66736D]">{detail}</span>
        </div>
      </div>
      
      {/* Arrow */}
      <div className="absolute bottom-4 right-4 text-[#087F5B] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
        <ArrowUpRight size={18} />
      </div>
    </div>
  );
}
