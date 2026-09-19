import Link from "next/link";
import { Wallet, TrendingUp, PiggyBank, ArrowUpRight, MoreHorizontal, ArrowRight } from "lucide-react";
import { useDashboard } from "@/components/dashboard/DashboardContext";

export default function BudgetTracker() {
  const { dashboardData, isLoading } = useDashboard();

  if (isLoading || !dashboardData) {
    return <div className="h-full flex items-center justify-center bg-white rounded-2xl">Loading...</div>;
  }

  const { budgetOverview } = dashboardData;
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (budgetOverview.usedPercentage / 100) * circumference;

  return (
    <div className="flex h-full flex-col justify-between rounded-2xl border border-[#E2E7E3] bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-[20px] font-bold text-[#17211D]">Trip Budget</h2>
        <button className="text-[#66736D] hover:text-[#17211D]">
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Top Stats */}
      <div className="mt-4 flex items-center justify-between">
        <div>
          <p className="text-[11px] font-medium text-[#66736D]">Total Budget</p>
          <p className="text-[18px] font-bold text-[#17211D]">
            ৳{budgetOverview.total.toLocaleString()}
          </p>
        </div>
        <div className="text-right">
          <p className="text-[11px] font-medium text-[#66736D]">Spent</p>
          <p className="text-[18px] font-bold text-[#17211D]">
            ৳{budgetOverview.spent.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Donut Chart Visualization */}
      <div className="mt-6 flex items-center justify-between px-2">
        {/* SVG Donut */}
        <div className="relative flex h-[100px] w-[100px] items-center justify-center">
          <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 100 100">
            {/* Background Track */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              stroke="#E2E7E3"
              strokeWidth="10"
              fill="transparent"
            />
            {/* Progress Arc */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              stroke="#087F5B"
              strokeWidth="10"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[18px] font-bold text-[#17211D] leading-none">
              {budgetOverview.usedPercentage}%
            </span>
            <span className="text-[8px] font-medium uppercase tracking-wider text-[#66736D] text-center w-[50px] leading-tight mt-1">
              of budget used
            </span>
          </div>
        </div>

        {/* Remaining */}
        <div className="text-right">
          <p className="text-[11px] font-medium text-[#66736D]">Remaining</p>
          <p className="text-[20px] font-bold text-[#17211D]">
            ৳{budgetOverview.remaining.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Categories Legend */}
      <div className="mt-6 flex flex-col gap-2.5 border-t border-[#E2E7E3] pt-5">
        {budgetOverview.breakdown.map((item: any) => (
          <div key={item.category} className="flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="font-medium text-[#66736D]">{item.category}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-semibold text-[#17211D]">৳{item.amount.toLocaleString()}</span>
              <span className="w-8 text-right font-medium text-[#66736D]">{item.percentage}%</span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Link */}
      <div className="mt-6">
        <Link
          href="/dashboard/budget"
          className="group inline-flex items-center gap-1.5 text-[12px] font-bold text-[#087F5B] transition-colors hover:text-[#073D31]"
        >
          Manage Budget <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
