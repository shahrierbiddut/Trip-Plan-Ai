"use client";
import React, { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { 
  Wallet, Plus, Trash2, Calendar, Receipt, 
  Utensils, Bus, Bed, Activity, HelpCircle, AlertCircle, Compass
} from "lucide-react";
import { format } from "date-fns";

const CATEGORY_ICONS: Record<string, React.FC<any>> = {
  Food: Utensils,
  Transport: Bus,
  Hotel: Bed,
  Activities: Activity,
  Other: HelpCircle
};

const CATEGORY_COLORS: Record<string, string> = {
  Food: "bg-orange-100 text-orange-600",
  Transport: "bg-blue-100 text-blue-600",
  Hotel: "bg-indigo-100 text-indigo-600",
  Activities: "bg-emerald-100 text-emerald-600",
  Other: "bg-gray-100 text-gray-600"
};

export default function BudgetPage() {
  const [trips, setTrips] = useState<any[]>([]);
  const [selectedTrip, setSelectedTrip] = useState<any>(null);
  const [expenses, setExpenses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Form state
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchTrips = async () => {
    try {
      const { data: session } = await authClient.getSession();
      if (!session?.user?.id) return;
      
      const url = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/+$/, "");
      const response = await fetch(`${url}/api/trips/user/${session.user.id}`);
      
      if (!response.ok) throw new Error("Failed to fetch trips");
      const data = await response.json();
      if (data.success) {
        setTrips(data.data);
        if (data.data.length > 0) setSelectedTrip(data.data[0]);
      }
    } catch (error) {
      console.error("Failed to fetch trips", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchExpenses = async () => {
    if (!selectedTrip) return;
    try {
      const url = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/+$/, "");
      const response = await fetch(`${url}/api/expenses/trip/${selectedTrip._id}`);
      if (!response.ok) throw new Error("Failed to fetch expenses");
      const data = await response.json();
      if (data.success) setExpenses(data.data);
    } catch (error) {
      console.error("Failed to fetch expenses", error);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  useEffect(() => {
    fetchExpenses();
  }, [selectedTrip]);

  const handleAddExpense = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !amount || isSubmitting) return;

    try {
      setIsSubmitting(true);
      const { data: session } = await authClient.getSession();
      if (!session?.user?.id) return;

      const url = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/+$/, "");
      const response = await fetch(`${url}/api/expenses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tripId: selectedTrip._id,
          userId: session.user.id,
          title,
          amount: parseFloat(amount),
          category
        })
      });

      const data = await response.json();
      if (data.success) {
        setTitle("");
        setAmount("");
        fetchExpenses();
      }
    } catch (error) {
      console.error("Failed to add expense", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteExpense = async (id: string) => {
    try {
      const url = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/+$/, "");
      const response = await fetch(`${url}/api/expenses/${id}`, {
        method: "DELETE"
      });
      const data = await response.json();
      if (data.success) {
        fetchExpenses();
      }
    } catch (error) {
      console.error("Failed to delete expense", error);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full w-full py-20 bg-[#FAFAFA]">
        <div className="w-10 h-10 border-4 border-[#087F5B]/20 border-t-[#087F5B] rounded-full animate-spin" />
        <p className="mt-4 text-gray-500 font-medium text-sm">Loading budget tracker...</p>
      </div>
    );
  }

  const totalBudget = selectedTrip?.formState?.customBudget || 
    (selectedTrip?.formState?.budgetTier === 'luxury' ? 5000 : 
     selectedTrip?.formState?.budgetTier === 'premium' ? 3000 : 
     selectedTrip?.formState?.budgetTier === 'standard' ? 1500 : 1000);

  const totalSpent = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const remaining = totalBudget - totalSpent;
  const spentPercent = totalBudget > 0 ? Math.min((totalSpent / totalBudget) * 100, 100) : 0;
  const isOverBudget = remaining < 0;

  return (
    <div className="flex h-full w-full flex-col bg-[#FAFAFA] overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-md px-6 lg:px-8 py-5 border-b border-gray-200/60 shadow-sm">
        <h1 className="text-2xl font-bold font-serif text-[#17211D] flex items-center gap-2">
          <Wallet className="text-[#087F5B]" size={24} />
          Budget Tracker
        </h1>
        <p className="text-[13px] text-gray-500 mt-0.5 ml-8">Keep track of your spending across all your journeys</p>
      </div>

      <div className="flex flex-col lg:flex-row flex-1 p-6 lg:p-8 gap-8 max-w-[1600px] w-full">
        {/* Left Sidebar: Trip Selection */}
        <div className="w-full lg:w-1/3 xl:w-1/4 shrink-0 flex flex-col gap-4">
          <h2 className="text-[11px] font-bold tracking-widest text-gray-400 uppercase ml-1">
            Your Trips
          </h2>
          
          <div className="flex flex-col gap-3">
            {trips.length === 0 ? (
              <div className="p-6 bg-white border border-dashed border-gray-300 rounded-2xl text-center">
                <Receipt className="mx-auto text-gray-300 mb-2" size={24} />
                <p className="text-[13px] text-gray-500 font-medium">No trips planned yet.</p>
              </div>
            ) : (
              trips.map(trip => {
                const isActive = selectedTrip?._id === trip._id;
                return (
                  <div 
                    key={trip._id} 
                    onClick={() => setSelectedTrip(trip)}
                    className={`
                      w-full cursor-pointer rounded-2xl p-4 transition-all duration-200 border
                      ${isActive 
                        ? 'border-[#087F5B] bg-[#087F5B]/[0.02] shadow-[0_4px_20px_rgba(8,127,91,0.08)]' 
                        : 'border-gray-100 bg-white hover:border-gray-300 hover:shadow-sm'}
                    `}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="truncate">
                        <h3 className={`font-bold text-[15px] truncate ${isActive ? 'text-[#087F5B]' : 'text-gray-800'}`}>
                          {trip.destination?.name || trip.title || "Unnamed Trip"}
                        </h3>
                        <div className="flex items-center gap-1.5 mt-1.5 text-gray-500">
                          <Calendar size={12} />
                          <span className="text-[11px] font-medium">
                            {format(new Date(trip.createdAt), "MMM dd, yyyy")}
                          </span>
                        </div>
                      </div>
                      {isActive && (
                        <div className="w-2 h-2 rounded-full bg-[#F4A934] mt-1 shrink-0" />
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Main Content: Budget Details */}
        <div className="flex-1 w-full flex flex-col gap-6">
          {selectedTrip ? (
            <>
              {/* Overview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-5">
                    <Wallet size={64} />
                  </div>
                  <p className="text-[13px] font-bold text-gray-500 uppercase tracking-wider mb-2">Total Budget</p>
                  <p className="text-3xl font-bold font-serif text-gray-900">৳{totalBudget.toLocaleString()}</p>
                </div>
                
                <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-3xl p-6 border border-red-100 shadow-sm flex flex-col justify-between">
                  <p className="text-[13px] font-bold text-red-500 uppercase tracking-wider mb-2">Total Spent</p>
                  <p className="text-3xl font-bold font-serif text-red-600">৳{totalSpent.toLocaleString()}</p>
                </div>

                <div className={`bg-gradient-to-br rounded-3xl p-6 border shadow-sm flex flex-col justify-between ${
                  isOverBudget 
                    ? "from-red-50 to-red-100 border-red-200" 
                    : "from-emerald-50 to-teal-50 border-emerald-100"
                }`}>
                  <p className={`text-[13px] font-bold uppercase tracking-wider mb-2 ${isOverBudget ? "text-red-600" : "text-[#087F5B]"}`}>
                    {isOverBudget ? "Over Budget By" : "Remaining"}
                  </p>
                  <p className={`text-3xl font-bold font-serif ${isOverBudget ? "text-red-700" : "text-[#087F5B]"}`}>
                    ৳{Math.abs(remaining).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="flex justify-between items-end mb-3">
                  <h3 className="text-sm font-bold text-gray-700">Budget Usage</h3>
                  <span className={`text-sm font-bold ${spentPercent > 90 ? 'text-red-500' : 'text-[#087F5B]'}`}>
                    {spentPercent.toFixed(1)}%
                  </span>
                </div>
                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ease-out ${
                      spentPercent > 100 
                        ? 'bg-red-500' 
                        : spentPercent > 80 
                          ? 'bg-gradient-to-r from-[#F4A934] to-orange-500' 
                          : 'bg-gradient-to-r from-[#087F5B] to-emerald-400'
                    }`} 
                    style={{ width: `${Math.min(spentPercent, 100)}%` }}
                  />
                </div>
                {isOverBudget && (
                  <div className="flex items-center gap-1.5 mt-3 text-red-500 text-xs font-medium bg-red-50 w-fit px-3 py-1.5 rounded-full">
                    <AlertCircle size={14} />
                    You have exceeded your planned budget!
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {/* Add Expense Form */}
                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm h-fit sticky top-24">
                  <h2 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
                    <Plus className="text-[#087F5B]" size={18} />
                    Add New Expense
                  </h2>
                  <form onSubmit={handleAddExpense} className="flex flex-col gap-4">
                    <div>
                      <label className="text-[12px] font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">Description</label>
                      <input 
                        type="text"
                        placeholder="E.g. Dinner at beachfront restaurant" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        className="w-full bg-gray-50 border border-gray-200 focus:border-[#087F5B] focus:ring-2 focus:ring-[#087F5B]/20 rounded-xl px-4 py-3 text-[14px] transition-all outline-none"
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[12px] font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">Amount (৳)</label>
                        <input 
                          type="number" 
                          placeholder="0.00" 
                          value={amount} 
                          onChange={(e) => setAmount(e.target.value)}
                          className="w-full bg-gray-50 border border-gray-200 focus:border-[#087F5B] focus:ring-2 focus:ring-[#087F5B]/20 rounded-xl px-4 py-3 text-[14px] transition-all outline-none"
                          required
                          step="0.01"
                          min="0"
                        />
                      </div>
                      <div>
                        <label className="text-[12px] font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">Category</label>
                        <select 
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          className="w-full bg-gray-50 border border-gray-200 focus:border-[#087F5B] focus:ring-2 focus:ring-[#087F5B]/20 rounded-xl px-4 py-3 text-[14px] transition-all outline-none appearance-none"
                        >
                          <option value="Food">Food</option>
                          <option value="Transport">Transport</option>
                          <option value="Hotel">Hotel</option>
                          <option value="Activities">Activities</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>

                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="mt-2 w-full flex items-center justify-center gap-2 bg-[#04271C] text-white rounded-xl py-3.5 font-bold hover:bg-[#0B3D2E] transition-all shadow-[0_4px_14px_rgba(4,39,28,0.2)] disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <Plus size={18} />
                          Save Expense
                        </>
                      )}
                    </button>
                  </form>
                </div>

                {/* Expenses List */}
                <div className="flex flex-col gap-4">
                  <h2 className="text-lg font-bold text-gray-900 mb-1 flex items-center gap-2">
                    <Receipt className="text-[#087F5B]" size={18} />
                    Recent Expenses
                  </h2>
                  
                  {expenses.length === 0 ? (
                    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-10 text-center h-full flex flex-col items-center justify-center">
                      <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                        <Wallet className="text-gray-300" size={28} />
                      </div>
                      <p className="text-gray-500 text-[14px] font-medium max-w-[200px]">No expenses recorded for this trip yet.</p>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3">
                      {expenses.map(expense => {
                        const Icon = CATEGORY_ICONS[expense.category] || HelpCircle;
                        const colorClass = CATEGORY_COLORS[expense.category] || CATEGORY_COLORS.Other;

                        return (
                          <div 
                            key={expense._id} 
                            className="group flex justify-between items-center p-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
                          >
                            <div className="flex items-center gap-4">
                              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${colorClass}`}>
                                <Icon size={20} />
                              </div>
                              <div>
                                <p className="font-bold text-[14px] text-gray-900">{expense.title}</p>
                                <div className="flex items-center gap-2 mt-1">
                                  <span className="text-[11px] font-bold text-gray-500 tracking-wide uppercase">
                                    {expense.category}
                                  </span>
                                  <span className="w-1 h-1 rounded-full bg-gray-300" />
                                  <span className="text-[11px] text-gray-400 font-medium">
                                    {expense.date || expense.createdAt ? format(new Date(expense.date || expense.createdAt), "MMM dd") : "N/A"}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <p className="font-bold text-[16px] text-gray-900">
                                ৳{expense.amount.toLocaleString()}
                              </p>
                              <button 
                                onClick={() => handleDeleteExpense(expense._id)} 
                                className="text-red-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200"
                                aria-label="Delete expense"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            // No trips selected empty state
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-16 text-center h-full flex flex-col items-center justify-center min-h-[500px]">
              <div className="w-24 h-24 bg-[#F4A934]/10 rounded-full flex items-center justify-center mb-6">
                <Compass className="text-[#F4A934]" size={40} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Ready to track?</h2>
              <p className="text-gray-500 max-w-sm mx-auto mb-8 text-[14px] leading-relaxed">
                Select a trip from the sidebar to view its budget, or plan a new trip to start tracking your expenses automatically.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
