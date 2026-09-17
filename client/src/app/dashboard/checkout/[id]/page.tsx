"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { CheckCircle2, ChevronLeft, CreditCard, Loader2, Lock, ShieldCheck, Wallet, Smartphone, Building2 } from "lucide-react";
import toast from "react-hot-toast";

export default function CheckoutPage() {
  const { id } = useParams();
  const router = useRouter();
  
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "mobile" | "bank">("mobile");
  const [mobileProvider, setMobileProvider] = useState<"bkash" | "nagad" | "rocket">("bkash");
  
  // Mock Payment States
  const [mockStep, setMockStep] = useState<"initial" | "processing" | "success">("initial");
  const [phone, setPhone] = useState("");
  const [pin, setPin] = useState("");
  
  // Card States
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [cardName, setCardName] = useState("");
  
  // Bank States
  const [bankName, setBankName] = useState("brac");
  const [bankAccount, setBankAccount] = useState("");
  const [bankPassword, setBankPassword] = useState("");
  
  useEffect(() => {
    if (id) {
      fetchBookingDetails(id as string);
    }
  }, [id]);

  const fetchBookingDetails = async (bookingId: string) => {
    try {
      setLoading(true);
      const res = await fetch(`${(process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/+$/, "")}/api/tour-bookings/${bookingId}`);
      const data = await res.json();
      if (data.success) {
        setBooking(data.data);
      } else {
        toast.error("Booking not found!");
        router.push("/dashboard/my-bookings");
      }
    } catch (error) {
      console.error("Failed to fetch booking:", error);
      toast.error("Failed to load checkout details");
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (value: number) => new Intl.NumberFormat("en-BD", { style: "currency", currency: "BDT" }).format(value);

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (paymentMethod === "mobile") {
      if (!phone || !pin) {
        toast.error("Please enter your mobile number and PIN");
        return;
      }
      if (pin.length < 4) {
        toast.error("Invalid PIN length");
        return;
      }
    } else if (paymentMethod === "card") {
      if (!cardNumber || !expiry || !cvc || !cardName) {
        toast.error("Please fill in all card details");
        return;
      }
      if (cardNumber.length < 16) {
        toast.error("Invalid Card Number");
        return;
      }
    } else if (paymentMethod === "bank") {
      if (!bankAccount || !bankPassword) {
        toast.error("Please enter your account details");
        return;
      }
    }
    
    // Start Mock Processing
    setMockStep("processing");
    
    // Simulate gateway delay
    setTimeout(async () => {
      try {
        const res = await fetch(`${(process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/+$/, "")}/api/tour-bookings/confirm-payment/${id}`, {
          method: "POST"
        });
        const data = await res.json();
        
        if (data.success) {
          setMockStep("success");
          toast.success("Payment Successful!");
          
          setTimeout(() => {
            router.push("/dashboard/my-bookings");
          }, 3000);
        } else {
          setMockStep("initial");
          toast.error(data.message || "Payment Failed");
        }
      } catch (error) {
        setMockStep("initial");
        toast.error("Network error during payment");
      }
    }, 2500);
  };

  if (loading) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-[#F8FAFC]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 animate-spin text-[#073D31]" />
          <p className="text-[#073D31] font-medium animate-pulse">Loading Secure Checkout...</p>
        </div>
      </div>
    );
  }

  if (!booking) return null;

  return (
    <div className="min-h-full w-full bg-[#F8FAFC] pb-20">
      {/* Checkout Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6 sticky top-0 z-40 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button 
            onClick={() => router.back()} 
            className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors font-medium"
          >
            <ChevronLeft className="w-5 h-5" /> Back
          </button>
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-emerald-600" />
            <span className="font-bold text-gray-900 text-lg">Secure Checkout</span>
          </div>
          <div className="w-[70px]"></div> {/* Spacer for centering */}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Side - Payment Methods */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          
          <div className="bg-white rounded-3xl p-8 shadow-[0_4px_24px_rgba(0,0,0,0.02)] border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Wallet className="w-6 h-6 text-[#073D31]" />
              Select Payment Method
            </h2>

            {/* Method Tabs */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <button 
                onClick={() => setPaymentMethod("mobile")}
                className={`flex flex-col items-center justify-center gap-3 p-4 rounded-2xl border-2 transition-all ${paymentMethod === "mobile" ? "border-[#073D31] bg-emerald-50 text-[#073D31]" : "border-gray-100 bg-gray-50 text-gray-500 hover:border-gray-200"}`}
              >
                <Smartphone className="w-6 h-6" />
                <span className="font-bold text-sm">Mobile Banking</span>
              </button>
              <button 
                onClick={() => setPaymentMethod("card")}
                className={`flex flex-col items-center justify-center gap-3 p-4 rounded-2xl border-2 transition-all ${paymentMethod === "card" ? "border-[#073D31] bg-emerald-50 text-[#073D31]" : "border-gray-100 bg-gray-50 text-gray-500 hover:border-gray-200"}`}
              >
                <CreditCard className="w-6 h-6" />
                <span className="font-bold text-sm">Card</span>
              </button>
              <button 
                onClick={() => setPaymentMethod("bank")}
                className={`flex flex-col items-center justify-center gap-3 p-4 rounded-2xl border-2 transition-all ${paymentMethod === "bank" ? "border-[#073D31] bg-emerald-50 text-[#073D31]" : "border-gray-100 bg-gray-50 text-gray-500 hover:border-gray-200"}`}
              >
                <Building2 className="w-6 h-6" />
                <span className="font-bold text-sm">Net Banking</span>
              </button>
            </div>

            {/* Mock Payment Form */}
            <form onSubmit={handlePaymentSubmit} className="relative overflow-hidden rounded-2xl bg-white border border-gray-200">
              
              {/* Payment Overlay States */}
              {mockStep === "processing" && (
                <div className="absolute inset-0 z-10 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center">
                  <Loader2 className="w-12 h-12 animate-spin text-[#E2136E] mb-4" />
                  <p className="font-bold text-gray-800 text-lg">Processing Payment...</p>
                  <p className="text-sm text-gray-500 mt-2">Please do not close this window</p>
                </div>
              )}
              
              {mockStep === "success" && (
                <div className="absolute inset-0 z-10 bg-emerald-50 flex flex-col items-center justify-center">
                  <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-10 h-10 text-white" />
                  </div>
                  <p className="font-bold text-emerald-900 text-xl">Payment Successful!</p>
                  <p className="text-sm text-emerald-600 mt-2">Redirecting to your bookings...</p>
                </div>
              )}

              {/* Mobile Banking MOCK UI */}
              {paymentMethod === "mobile" && (
                <div className="flex flex-col">
                  {/* Provider Tabs */}
                  <div className="flex border-b border-gray-100">
                    <button type="button" onClick={() => setMobileProvider("bkash")} className={`flex-1 py-4 font-bold text-sm transition-colors ${mobileProvider === "bkash" ? "text-[#E2136E] border-b-2 border-[#E2136E] bg-pink-50/30" : "text-gray-500 hover:bg-gray-50"}`}>bKash</button>
                    <button type="button" onClick={() => setMobileProvider("nagad")} className={`flex-1 py-4 font-bold text-sm transition-colors ${mobileProvider === "nagad" ? "text-[#F7931E] border-b-2 border-[#F7931E] bg-orange-50/30" : "text-gray-500 hover:bg-gray-50"}`}>Nagad</button>
                    <button type="button" onClick={() => setMobileProvider("rocket")} className={`flex-1 py-4 font-bold text-sm transition-colors ${mobileProvider === "rocket" ? "text-[#8C1595] border-b-2 border-[#8C1595] bg-purple-50/30" : "text-gray-500 hover:bg-gray-50"}`}>Rocket</button>
                  </div>
                  
                  {/* Provider Form */}
                  <div className={`p-8 ${mobileProvider === 'bkash' ? 'bg-[#E2136E]' : mobileProvider === 'nagad' ? 'bg-[#F7931E]' : 'bg-[#8C1595]'}`}>
                    <div className="bg-white p-8 rounded-xl shadow-lg max-w-sm mx-auto flex flex-col items-center">
                      <div className="w-full text-center mb-6 border-b border-gray-100 pb-4">
                        <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Merchant</p>
                        <p className="font-bold text-gray-900">TripPlan AI</p>
                      </div>
                      
                      <div className="w-full space-y-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-500 mb-1.5">Your Account Number</label>
                          <input 
                            type="text" 
                            placeholder="e.g 017XXXXXXXX"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-center font-medium tracking-wide"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-500 mb-1.5">PIN</label>
                          <input 
                            type="password" 
                            placeholder="•••••"
                            value={pin}
                            onChange={(e) => setPin(e.target.value)}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-center font-bold tracking-[0.3em]"
                            required
                          />
                        </div>
                      </div>

                      <button 
                        type="submit"
                        className={`w-full mt-8 py-3.5 rounded-lg font-bold text-white transition-transform active:scale-[0.98] ${mobileProvider === 'bkash' ? 'bg-[#E2136E] hover:bg-[#c2105e]' : mobileProvider === 'nagad' ? 'bg-[#F7931E] hover:bg-[#d87c12]' : 'bg-[#8C1595] hover:bg-[#721179]'}`}
                      >
                        Confirm Payment
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Card Payment MOCK UI */}
              {paymentMethod === "card" && (
                <div className="p-8 bg-[#F8FAFC]">
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 max-w-md mx-auto">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="font-bold text-gray-900">Pay with Card</h3>
                      <div className="flex gap-2">
                        <div className="w-8 h-5 bg-blue-600 rounded flex items-center justify-center text-[8px] font-bold text-white italic">VISA</div>
                        <div className="w-8 h-5 bg-red-500 rounded flex items-center justify-center text-[8px] font-bold text-white relative overflow-hidden"><div className="w-4 h-4 bg-orange-400 rounded-full absolute -left-1 opacity-80"></div><div className="w-4 h-4 bg-yellow-400 rounded-full absolute -right-1 opacity-80"></div></div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1.5">Card Number</label>
                        <input type="text" placeholder="0000 0000 0000 0000" maxLength={16} value={cardNumber} onChange={(e) => setCardNumber(e.target.value.replace(/[^0-9]/g, ''))} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#073D31] font-mono tracking-widest text-sm" required />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-500 mb-1.5">Expiry Date</label>
                          <input type="text" placeholder="MM/YY" maxLength={5} value={expiry} onChange={(e) => setExpiry(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#073D31] font-mono tracking-widest text-sm" required />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-500 mb-1.5">CVC / CVV</label>
                          <input type="password" placeholder="•••" maxLength={4} value={cvc} onChange={(e) => setCvc(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#073D31] font-mono tracking-widest text-center" required />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1.5">Cardholder Name</label>
                        <input type="text" placeholder="John Doe" value={cardName} onChange={(e) => setCardName(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#073D31] font-medium" required />
                      </div>
                    </div>

                    <button type="submit" className="w-full mt-8 py-3.5 bg-[#073D31] rounded-lg font-bold text-white transition-all hover:bg-[#0a4d3e] active:scale-[0.98]">
                      Pay {formatPrice(booking.totalPrice)}
                    </button>
                  </div>
                </div>
              )}

              {/* Net Banking MOCK UI */}
              {paymentMethod === "bank" && (
                <div className="p-8 bg-[#F8FAFC]">
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 max-w-md mx-auto">
                    <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2 border-b border-gray-100 pb-4">
                      <Building2 className="w-5 h-5 text-indigo-600" /> Secure Bank Transfer
                    </h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1.5">Select Your Bank</label>
                        <select value={bankName} onChange={(e) => setBankName(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 font-medium">
                          <option value="brac">BRAC Bank</option>
                          <option value="city">City Bank</option>
                          <option value="dbbl">Dutch-Bangla Bank (DBBL)</option>
                          <option value="islami">Islami Bank</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1.5">Account Number</label>
                        <input type="text" placeholder="e.g. 1500XXXXXXXXX" value={bankAccount} onChange={(e) => setBankAccount(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 font-mono text-sm tracking-wider" required />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1.5">iBanking Password</label>
                        <input type="password" placeholder="••••••••" value={bankPassword} onChange={(e) => setBankPassword(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 tracking-widest text-lg" required />
                      </div>
                    </div>

                    <button type="submit" className="w-full mt-8 py-3.5 bg-indigo-600 rounded-lg font-bold text-white transition-all hover:bg-indigo-700 active:scale-[0.98]">
                      Login & Pay {formatPrice(booking.totalPrice)}
                    </button>
                  </div>
                </div>
              )}

            </form>
          </div>
          
          <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
            <Lock className="w-4 h-4" />
            Payments are securely processed via MockSSLCommerz
          </div>

        </div>

        {/* Right Side - Order Summary */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-3xl shadow-[0_4px_24px_rgba(0,0,0,0.02)] border border-gray-100 overflow-hidden sticky top-32">
            <div className="bg-[#04271C] p-6 text-white text-center">
              <h3 className="font-bold text-lg">Order Summary</h3>
            </div>
            
            <div className="p-8">
              <h4 className="text-xl font-extrabold text-gray-900 mb-1">{booking.packageTitle}</h4>
              <p className="text-emerald-600 font-medium text-sm mb-8 flex items-center gap-1">
                {booking.destination} <span className="text-gray-300">•</span> {booking.duration}
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 font-medium">Customer</span>
                  <span className="font-bold text-gray-900">{booking.customer.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 font-medium">Travellers</span>
                  <span className="font-bold text-gray-900">{booking.travellers} Person(s)</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 font-medium">Base Price</span>
                  <span className="font-bold text-gray-900">{formatPrice(booking.unitPrice)}</span>
                </div>
              </div>

              <div className="border-t border-dashed border-gray-200 pt-6 pb-6 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 font-bold uppercase tracking-wider text-xs">Subtotal</span>
                  <span className="font-bold text-gray-900">{formatPrice(booking.totalPrice)}</span>
                </div>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-gray-500 font-bold uppercase tracking-wider text-xs">Gateway Fee</span>
                  <span className="font-bold text-emerald-600">Free</span>
                </div>
              </div>

              <div className="bg-emerald-50 p-5 rounded-2xl flex justify-between items-center">
                <span className="font-bold text-emerald-900">Total</span>
                <span className="text-2xl font-extrabold text-emerald-700">{formatPrice(booking.totalPrice)}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
