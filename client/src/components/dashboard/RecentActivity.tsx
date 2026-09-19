import { Sparkles, Heart, User, CheckCircle2, FileText, ChevronRight, Clock, Plus, PenLine } from "lucide-react";
import { useDashboard } from "@/components/dashboard/DashboardContext";

export default function RecentActivity() {
  const { dashboardData, isLoading } = useDashboard();

  if (isLoading || !dashboardData) {
    return <div className="h-64 flex items-center justify-center">Loading activity...</div>;
  }

  const getIconConfig = (type: string) => {
    switch (type) {
      case "generated":
        return { icon: <Sparkles size={14} className="text-amber-500" />, bg: "bg-amber-100/50" };
      case "saved":
        return { icon: <Heart size={14} className="text-rose-500" />, bg: "bg-rose-100/50" };
      case "updated":
        return { icon: <User size={14} className="text-blue-500" />, bg: "bg-blue-100/50" };
      case "completed":
        return { icon: <CheckCircle2 size={14} className="text-emerald-500" />, bg: "bg-emerald-100/50" };
      case "submitted":
        return { icon: <FileText size={14} className="text-indigo-500" />, bg: "bg-indigo-100/50" };
      default:
        return { icon: <Sparkles size={14} className="text-gray-500" />, bg: "bg-gray-100" };
    }
  };

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-[24px] border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-300">
      <h2 className="font-serif text-[20px] font-bold text-gray-900 mb-6">Recent Activity</h2>

      <div className="flex flex-col gap-5 relative">
        <div className="absolute left-[15px] top-4 bottom-4 w-[2px] bg-gray-50 rounded-full" />
        
        {dashboardData.recentActivity.map((activity: any) => {
          const config = getIconConfig(activity.type);
          return (
            <div key={activity.id} className="group flex cursor-pointer items-start justify-between relative z-10">
              <div className="flex items-start gap-4">
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${config.bg} shadow-sm border border-white transition-transform group-hover:scale-110`}>
                  {config.icon}
                </div>
                <div className="flex flex-col mt-0.5">
                  <span className="text-[10px] font-bold tracking-wide text-gray-400 mb-0.5 uppercase">{activity.timeLabel}</span>
                  <span className="text-[13px] font-medium text-gray-700 leading-snug transition-colors group-hover:text-gray-900 line-clamp-2 pr-2">
                    {activity.description}
                  </span>
                </div>
              </div>
              <ChevronRight size={14} className="text-gray-300 mt-2 transition-colors group-hover:text-gray-500 shrink-0" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
