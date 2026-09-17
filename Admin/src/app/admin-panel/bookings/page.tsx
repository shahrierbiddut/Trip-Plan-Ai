"use client";

import React, { useEffect, useState } from "react";
import { Loader2, Ticket, Search, User, MapPin, Calendar, CreditCard, Hash, Clock, CheckCircle2, ChevronRight, XCircle } from "lucide-react";

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${(process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/+$/, "")}/api/tour-bookings/all/admin`);
      const data = await res.json();
      if (data.success) {
        setBookings(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (value: number) => new Intl.NumberFormat("en-BD", { style: "currency", currency: "BDT" }).format(value);
  const formatDate = (dateStr: string) => new Date(dateStr).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

  const filteredBookings = bookings.filter((booking) => 
    booking.packageTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking._id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 lg:p-8">
      {/* Header Section */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
            <Ticket className="w-8 h-8 text-emerald-600" />
            Bookings Management
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            View and manage all tour package reservations.
          </p>
        </div>
        
        {/* Search */}
        <div className="relative w-full sm:max-w-xs">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-3 text-sm placeholder:text-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all shadow-sm"
            placeholder="Search bookings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Content Section */}
      {loading ? (
        <div className="flex h-[400px] w-full items-center justify-center rounded-2xl bg-white shadow-sm border border-gray-100">
          <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
        </div>
      ) : filteredBookings.length === 0 ? (
        <div className="flex h-[400px] w-full flex-col items-center justify-center rounded-2xl bg-white shadow-sm border border-gray-100 p-8 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
            <Ticket className="h-8 w-8 text-emerald-500" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">No bookings found</h3>
          <p className="mt-1 max-w-sm text-sm text-gray-500">
            {searchTerm ? "No bookings match your search criteria. Try a different term." : "There are currently no bookings in the system."}
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {filteredBookings.map((booking) => {
            const getInitials = (name: string) => {
              return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
            };
            
            return (
              <div key={booking._id} className="group flex flex-col rounded-2xl bg-white shadow-md border border-gray-200 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-emerald-300">
                
                {/* Top Status Bar */}
                <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 bg-gray-50/80">
                  <div className="flex items-center gap-2">
                    <div className="bg-emerald-100/50 text-emerald-800 text-[10px] font-bold px-2.5 py-1 rounded-md flex items-center gap-1.5 uppercase tracking-widest">
                      <Hash className="w-3 h-3 text-emerald-600" />
                      {booking._id.substring(booking._id.length - 8)}
                    </div>
                  </div>
                  
                  <div className={`flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${
                      booking.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}>
                      {booking.status === 'Confirmed' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                      {booking.status}
                  </div>
                </div>

                {/* Package Info */}
                <div className="px-5 pt-5 pb-4">
                  <h3 className="text-[17px] font-extrabold text-gray-900 line-clamp-1 group-hover:text-emerald-700 transition-colors">
                    {booking.packageTitle}
                  </h3>
                  <div className="flex items-center gap-1.5 mt-2 text-sm font-medium text-gray-500">
                    <MapPin className="w-4 h-4 text-emerald-600/70" />
                    <span className="truncate">{booking.destination}</span>
                  </div>
                </div>

                <div className="px-5">
                  <div className="border-t-2 border-dashed border-gray-200 w-full" />
                </div>

                {/* Customer Details */}
                <div className="px-5 py-4">
                  <div className="flex items-center gap-3.5">
                    <div className="h-10 w-10 shrink-0 rounded-full bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white font-bold shadow-inner">
                      {getInitials(booking.customer.name)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-bold text-gray-900">{booking.customer.name}</p>
                      <p className="truncate text-[13px] text-gray-500 mt-0.5 flex items-center gap-1">
                        {booking.customer.email}
                      </p>
                      {booking.customer.phone && (
                        <p className="truncate text-[13px] font-medium text-gray-600 mt-0.5">{booking.customer.phone}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="px-5">
                  <div className="border-t-2 border-dashed border-gray-200 w-full" />
                </div>

                {/* Travel Details Grid */}
                <div className="px-5 py-4 bg-gray-50/50">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">Travel Date</p>
                      <p className="text-[13px] font-bold text-gray-800 flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-emerald-500" />
                        {formatDate(booking.travelDate)}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">Travellers</p>
                      <p className="text-[13px] font-bold text-gray-800 flex items-center gap-1.5">
                        <User className="w-4 h-4 text-blue-500" />
                        {booking.travellers} Person(s)
                      </p>
                    </div>
                  </div>
                </div>

                {/* Footer / Payment */}
                <div className="mt-auto border-t border-gray-100 bg-white p-5 flex items-center justify-between rounded-b-2xl">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Total Amount</p>
                    <p className="text-lg font-black text-gray-900 tracking-tight">{formatPrice(booking.totalPrice)}</p>
                  </div>
                  
                  <div className="flex flex-col items-end">
                     <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Payment Status</p>
                     <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-bold text-xs uppercase tracking-wider ${
                        booking.paymentStatus === 'Paid' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' :
                        booking.paymentStatus === 'Processing' ? 'bg-blue-50 border-blue-200 text-blue-700' :
                        'bg-rose-50 border-rose-200 text-rose-700'
                      }`}>
                        <CreditCard className="w-3.5 h-3.5" />
                        {booking.paymentStatus}
                      </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

