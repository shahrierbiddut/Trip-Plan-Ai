"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Calendar, CreditCard, Ticket, MapPin, Users, Loader2, ArrowRight, DownloadCloud, Clock, Hash } from "lucide-react";
import toast from "react-hot-toast";

export default function MyBookingsPage() {
  const { data: session, isPending } = useSession();
  const user = session?.user;
  const router = useRouter();

  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isPending) return;
    
    if (user?.email) {
      fetchBookings(user.email, user.id);
    } else {
      setLoading(false); // Stop loading if not logged in
    }
  }, [user?.email, isPending, user?.id]);

  const fetchBookings = async (email: string, userId: string) => {
    try {
      setLoading(true);
      const res = await fetch(`${(process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/+$/, "")}/api/tour-bookings/user/${userId}?email=${email}`);
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

  const handlePayment = (bookingId: string) => {
    router.push(`/dashboard/checkout/${bookingId}`);
  };

  const handleDownloadReceipt = (booking: any) => {
    const receiptContent = `
=========================================
          TRIP PLAN AI - RECEIPT
=========================================

Booking ID: ${booking._id}
Package: ${booking.packageTitle}
Destination: ${booking.destination}
Duration: ${booking.duration}
Travel Date: ${new Date(booking.travelDate).toLocaleDateString()}
Travellers: ${booking.travellers} Person(s)

-----------------------------------------
Total Amount: BDT ${booking.totalPrice.toLocaleString('en-IN')}
Payment Status: PAID
-----------------------------------------

Thank you for choosing Trip Plan AI!
Have a safe and wonderful journey!
=========================================
    `.trim();

    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `Receipt-${booking._id.substring(booking._id.length - 8).toUpperCase()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast.success("Receipt downloaded successfully!");
  };

  const formatPrice = (value: number) => new Intl.NumberFormat("en-BD", { style: "currency", currency: "BDT" }).format(value);
  const formatDate = (dateStr: string) => new Date(dateStr).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  if (loading) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-[#F3F4F6]">
        <Loader2 className="w-8 h-8 animate-spin text-[#073D31]" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full bg-[#F3F4F6] overflow-y-auto selection:bg-[#073D31] selection:text-white">
      
      {/* Header Section */}
      <div className="bg-[#04271C] px-8 py-16 flex flex-col items-center justify-center relative overflow-hidden shrink-0">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-50%] right-[-10%] w-[50%] h-[200%] rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-500/20 via-transparent to-transparent blur-3xl transform -rotate-12" />
        </div>
        
        <div className="relative z-10 w-full max-w-5xl flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-emerald-300 text-xs font-bold mb-6 tracking-wider uppercase">
            <Ticket className="w-4 h-4" /> Your Travel Plans
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">My Bookings</h1>
          <p className="text-[#A5C0B5] text-lg max-w-xl font-light">
            Manage your package reservations and complete your payments securely.
          </p>
        </div>
      </div>

      {/* Bookings List */}
      <div className="flex-1 w-full max-w-5xl mx-auto px-6 py-12 -mt-8 relative z-20">
        {bookings.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-gray-100 flex flex-col items-center justify-center">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
              <Ticket className="w-10 h-10 text-gray-300" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No bookings yet</h3>
            <p className="text-gray-500 mb-8 max-w-md">You haven't requested any tour packages yet. Explore our amazing packages and start your next adventure!</p>
            <a href="/tour-packages" className="bg-[#073D31] text-white px-8 py-3.5 rounded-full font-bold hover:bg-[#0a4d3e] transition-all shadow-md flex items-center gap-2">
              Explore Packages <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <div key={booking._id} className="bg-white rounded-[24px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col md:flex-row transition-all hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
                
                {/* Left side: Booking Details */}
                <div className="flex-1 p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">
                          <Hash className="w-3 h-3" /> 
                          {booking._id.substring(booking._id.length - 8).toUpperCase()}
                        </span>
                        <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest border flex items-center gap-1 ${
                          booking.status === 'Confirmed' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-orange-50 text-orange-700 border-orange-100'
                        }`}>
                          {booking.status === 'Pending' && <Clock className="w-3 h-3" />}
                          {booking.status}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-1.5">{booking.packageTitle}</h3>
                      <div className="flex items-center text-gray-500 text-sm gap-2">
                        <MapPin className="w-4 h-4 text-[#073D31]" />
                        <span className="font-medium">{booking.destination}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-300 mx-1"></span>
                        <span>{booking.duration}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6 mt-8">
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Travel Date</p>
                      <div className="flex items-center gap-2 text-gray-900 font-medium">
                        <Calendar className="w-4 h-4 text-emerald-600" />
                        {formatDate(booking.travelDate)}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Travellers</p>
                      <div className="flex items-center gap-2 text-gray-900 font-medium">
                        <Users className="w-4 h-4 text-emerald-600" />
                        {booking.travellers} Person(s)
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right side: Payment Action */}
                <div className="bg-gray-50 p-8 border-t md:border-t-0 md:border-l border-gray-100 flex flex-col justify-center min-w-[280px]">
                  <p className="text-sm font-semibold text-gray-500 mb-1">Total Amount</p>
                  <p className="text-3xl font-extrabold text-gray-900 mb-2">
                    {formatPrice(booking.totalPrice)}
                  </p>
                  
                  <div className="mb-6 flex items-center gap-2 text-sm font-medium">
                    Payment Status: 
                    <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                      booking.paymentStatus === 'Paid' ? 'bg-green-100 text-green-700' :
                      booking.paymentStatus === 'Processing' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {booking.paymentStatus}
                    </span>
                  </div>

                  {(booking.paymentStatus === "Unpaid" || booking.paymentStatus === "Processing") && (
                    <button
                      onClick={() => handlePayment(booking._id)}
                      className="w-full flex items-center justify-center gap-2 bg-[#073D31] text-white py-3.5 rounded-xl font-bold hover:bg-[#0a4d3e] transition-all shadow-md active:scale-[0.98]"
                    >
                      <CreditCard className="w-5 h-5" /> Pay Now
                    </button>
                  )}
                  
                  {booking.paymentStatus === "Paid" && (
                    <button 
                      onClick={() => handleDownloadReceipt(booking)}
                      className="w-full flex items-center justify-center gap-2 py-3 bg-white border-2 border-gray-100 rounded-xl text-sm font-bold text-[#073D31] hover:bg-emerald-50 hover:border-emerald-100 transition-all shadow-sm"
                    >
                      <DownloadCloud className="w-4 h-4" /> Download Receipt
                    </button>
                  )}
                </div>
                
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
