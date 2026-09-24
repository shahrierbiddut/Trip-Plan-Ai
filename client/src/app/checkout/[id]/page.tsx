"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { CheckCircle2, ChevronLeft, CreditCard, Loader2, Lock, ShieldCheck, Wallet, Smartphone, Building2 } from "lucide-react";
import toast from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";

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
      <div className="flex min-h-screen w-full items-center justify-center bg-[#f6f8f3] px-5 pt-28">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center gap-5 rounded-[2rem] border border-[#dce9df] bg-white px-12 py-10 shadow-[0_24px_70px_rgba(12,54,38,0.07)]">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#e8f5eb]"><Loader2 className="h-8 w-8 animate-spin text-[#0b6047]" /></div>
          <p className="font-semibold text-[#173b30]">Loading Secure Checkout...</p>
        </motion.div>
      </div>
    );
  }

  if (!booking) return null;

  return (
    <div className="relative isolate min-h-screen w-full overflow-hidden bg-[#f6f8f3] pb-24 pt-28 text-[#173b30]">
      <div aria-hidden="true" className="pointer-events-none absolute -left-36 top-72 h-96 w-96 rounded-full bg-[#dff0e4]/70 blur-[100px]" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 top-[520px] h-96 w-96 rounded-full bg-[#f9e9c4]/60 blur-[110px]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.button
          initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
          onClick={() => router.back()}
          className="group mb-6 inline-flex items-center gap-2 rounded-full border border-[#dce7df] bg-white/85 px-4 py-2.5 text-sm font-semibold text-[#34564a] shadow-sm transition hover:border-[#9fc4ac] hover:bg-white"
        >
          <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /> Back to package
        </motion.button>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="relative mb-8 overflow-hidden rounded-[2rem] bg-[#073b2e] px-6 py-8 text-white shadow-[0_24px_65px_rgba(8,59,43,0.18)] sm:px-10 sm:py-10 lg:px-12">
          <motion.div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-36 h-80 w-80 rounded-full border border-white/10 bg-white/[0.04]" animate={{ y: [0, 14, 0], rotate: [0, 8, 0] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }} />
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 right-44 h-72 w-72 rounded-full bg-[#e9b75d]/10 blur-3xl" />
          <div className="relative flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[#e9c889]"><ShieldCheck className="h-3.5 w-3.5" /> TripPlan AI checkout</span>
              <h1 className="font-serif text-3xl leading-tight font-semibold tracking-tight sm:text-4xl lg:text-[44px]">One step closer to <span className="text-[#f6c971]">your journey.</span></h1>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/70 sm:text-base">Review your trip and choose how you would like to pay.</p>
            </div>
            <div className="flex shrink-0 items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-sm"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f6c971]/20 text-[#f6c971]"><Lock className="h-5 w-5" /></div><div><p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/55">Checkout</p><p className="text-sm font-semibold">Payment details</p></div></div>
          </div>
        </motion.div>

      <div className="grid grid-cols-1 items-start gap-7 lg:grid-cols-12 lg:gap-8">
        
        {/* Left Side - Payment Methods */}
        <motion.div initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.12 }} className="flex flex-col gap-5 lg:col-span-7">
          
          <div className="rounded-[2rem] border border-[#e2e9e1] bg-white p-5 shadow-[0_18px_60px_rgba(19,57,40,0.055)] sm:p-8">
            <div className="mb-7 flex items-start gap-4"><div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#e8f4e9] text-[#0a6044]"><Wallet className="h-6 w-6" /></div><div><p className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#ad813c]">Choose your method</p><h2 className="font-serif text-2xl font-semibold text-[#173b30] sm:text-[28px]">How would you like to pay?</h2></div></div>

            {/* Method Tabs */}
            <div className="mb-7 grid grid-cols-3 gap-2 sm:gap-3">
              <button 
                onClick={() => setPaymentMethod("mobile")}
                className={`relative flex min-h-28 flex-col items-center justify-center gap-2 rounded-2xl border px-1 py-4 text-center transition-all duration-300 hover:-translate-y-1 sm:min-h-32 sm:gap-3 ${paymentMethod === "mobile" ? "border-[#0c7652] bg-[#eaf8ed] text-[#0c5d44] shadow-[0_10px_25px_rgba(10,102,72,0.12)]" : "border-[#e5ece6] bg-[#f8faf7] text-[#6a7c72] hover:border-[#afcbbb] hover:bg-white"}`}
              >
                <Smartphone className="w-6 h-6" />
                <span className="text-xs font-bold sm:text-sm">Mobile Banking</span>
              </button>
              <button 
                onClick={() => setPaymentMethod("card")}
                className={`relative flex min-h-28 flex-col items-center justify-center gap-2 rounded-2xl border px-1 py-4 text-center transition-all duration-300 hover:-translate-y-1 sm:min-h-32 sm:gap-3 ${paymentMethod === "card" ? "border-[#0c7652] bg-[#eaf8ed] text-[#0c5d44] shadow-[0_10px_25px_rgba(10,102,72,0.12)]" : "border-[#e5ece6] bg-[#f8faf7] text-[#6a7c72] hover:border-[#afcbbb] hover:bg-white"}`}
              >
                <CreditCard className="w-6 h-6" />
                <span className="text-xs font-bold sm:text-sm">Card</span>
              </button>
              <button 
                onClick={() => setPaymentMethod("bank")}
                className={`relative flex min-h-28 flex-col items-center justify-center gap-2 rounded-2xl border px-1 py-4 text-center transition-all duration-300 hover:-translate-y-1 sm:min-h-32 sm:gap-3 ${paymentMethod === "bank" ? "border-[#0c7652] bg-[#eaf8ed] text-[#0c5d44] shadow-[0_10px_25px_rgba(10,102,72,0.12)]" : "border-[#e5ece6] bg-[#f8faf7] text-[#6a7c72] hover:border-[#afcbbb] hover:bg-white"}`}
              >
                <Building2 className="w-6 h-6" />
                <span className="text-xs font-bold sm:text-sm">Net Banking</span>
              </button>
            </div>

            {/* Mock Payment Form */}
            <form onSubmit={handlePaymentSubmit} className="relative overflow-hidden rounded-[1.5rem] border border-[#e4ebe4] bg-white shadow-[0_12px_35px_rgba(10,58,39,0.04)]">
              
              {/* Payment Overlay States */}
              <AnimatePresence>
              {mockStep === "processing" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/95 px-5 text-center backdrop-blur-md">
                  <motion.div animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 1.6, repeat: Infinity }} className="mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-[#e6f5eb]"><Loader2 className="h-10 w-10 animate-spin text-[#0b7652]" /></motion.div>
                  <p className="text-lg font-bold text-[#173b30]">Processing Payment...</p>
                  <p className="mt-2 text-sm text-[#718578]">Please do not close this window</p>
                </motion.div>
              )}
              
              {mockStep === "success" && (
                <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#ebf8ef] px-5 text-center">
                  <motion.div initial={{ scale: 0.4, rotate: -20 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 220, damping: 15 }} className="mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-[#0b805b] shadow-[0_18px_35px_rgba(11,128,91,0.25)]"><CheckCircle2 className="h-10 w-10 text-white" /></motion.div>
                  <p className="text-xl font-bold text-[#173b30]">Payment Successful!</p>
                  <p className="mt-2 text-sm text-[#44846a]">Redirecting to your bookings...</p>
                </motion.div>
              )}
              </AnimatePresence>

              <AnimatePresence mode="wait" initial={false}>

              {/* Mobile Banking MOCK UI */}
              {paymentMethod === "mobile" && (
                <motion.div key="mobile" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.22 }} className="flex flex-col">
                  {/* Provider Tabs */}
                  <div className="grid grid-cols-3 gap-2 border-b border-[#e8ede8] bg-[#fcfdfb] p-3">
                    <button type="button" onClick={() => setMobileProvider("bkash")} className={`rounded-xl py-3 text-xs font-bold transition-all sm:text-sm ${mobileProvider === "bkash" ? "bg-[#fce7ef] text-[#d41463] shadow-sm" : "text-[#687c70] hover:bg-[#f5f7f4]"}`}>bKash</button>
                    <button type="button" onClick={() => setMobileProvider("nagad")} className={`rounded-xl py-3 text-xs font-bold transition-all sm:text-sm ${mobileProvider === "nagad" ? "bg-[#fff0dd] text-[#c36a09] shadow-sm" : "text-[#687c70] hover:bg-[#f5f7f4]"}`}>Nagad</button>
                    <button type="button" onClick={() => setMobileProvider("rocket")} className={`rounded-xl py-3 text-xs font-bold transition-all sm:text-sm ${mobileProvider === "rocket" ? "bg-[#f5e9f8] text-[#80168a] shadow-sm" : "text-[#687c70] hover:bg-[#f5f7f4]"}`}>Rocket</button>
                  </div>
                  
                  {/* Provider Form */}
                  <div className={`p-4 transition-colors duration-300 sm:p-7 ${mobileProvider === 'bkash' ? 'bg-[#fce9f0]' : mobileProvider === 'nagad' ? 'bg-[#fff0dd]' : 'bg-[#f6ebf9]'}`}>
                    <div className="mx-auto flex max-w-md flex-col items-center rounded-[1.5rem] border border-white bg-white p-5 shadow-[0_18px_48px_rgba(34,54,37,0.09)] sm:p-8">
                      <div className="w-full text-center mb-6 border-b border-gray-100 pb-4">
                        <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Merchant</p>
                        <p className="font-serif text-xl font-semibold text-[#173b30]">TripPlan AI</p>
                      </div>
                      
                      <div className="w-full space-y-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-500 mb-1.5">Your Account Number</label>
                          <input 
                            type="text" 
                            placeholder="e.g 017XXXXXXXX"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full rounded-xl border border-[#e1e8e1] bg-[#f9fbf8] px-4 py-3.5 text-center font-medium tracking-wide outline-none transition focus:border-[#0b805b] focus:ring-2 focus:ring-[#0b805b]/20"
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
                            className="w-full rounded-xl border border-[#e1e8e1] bg-[#f9fbf8] px-4 py-3.5 text-center font-bold tracking-[0.3em] outline-none transition focus:border-[#0b805b] focus:ring-2 focus:ring-[#0b805b]/20"
                            required
                          />
                        </div>
                      </div>

                      <button 
                        type="submit"
                        className={`mt-8 w-full rounded-xl py-3.5 font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 active:scale-[0.98] ${mobileProvider === 'bkash' ? 'bg-[#E2136E] hover:bg-[#c2105e]' : mobileProvider === 'nagad' ? 'bg-[#F7931E] hover:bg-[#d87c12]' : 'bg-[#8C1595] hover:bg-[#721179]'}`}
                      >
                        Confirm Payment
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Card Payment MOCK UI */}
              {paymentMethod === "card" && (
                <motion.div key="card" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.22 }} className="bg-[#f5f9f5] p-4 sm:p-8">
                  <div className="mx-auto max-w-md rounded-[1.5rem] border border-[#e4ebe4] bg-white p-5 shadow-[0_18px_48px_rgba(34,54,37,0.07)] sm:p-7">
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
                </motion.div>
              )}

              {/* Net Banking MOCK UI */}
              {paymentMethod === "bank" && (
                <motion.div key="bank" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.22 }} className="bg-[#f5f9f5] p-4 sm:p-8">
                  <div className="mx-auto max-w-md rounded-[1.5rem] border border-[#e4ebe4] bg-white p-5 shadow-[0_18px_48px_rgba(34,54,37,0.07)] sm:p-7">
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
                </motion.div>
              )}
              </AnimatePresence>

            </form>
          </div>
          
          <div className="flex items-center justify-center gap-2 rounded-2xl border border-[#e2e9e1] bg-white/70 px-4 py-3 text-center text-xs font-medium text-[#6f8576] sm:text-sm">
            <Lock className="h-4 w-4 shrink-0 text-[#0b805b]" />
            Demo checkout · Please do not enter real payment credentials
          </div>

        </motion.div>

        {/* Right Side - Order Summary */}
        <motion.div initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.22 }} className="lg:col-span-5">
          <div className="overflow-hidden rounded-[2rem] border border-[#e2e9e1] bg-white shadow-[0_18px_60px_rgba(19,57,40,0.07)] lg:sticky lg:top-28">
            <div className="relative overflow-hidden bg-[#0c4937] px-6 py-7 text-white sm:px-8">
              <div aria-hidden="true" className="absolute -right-9 -top-12 h-32 w-32 rounded-full border border-white/15" />
              <div aria-hidden="true" className="absolute -right-3 -top-16 h-32 w-32 rounded-full border border-white/10" />
              <div className="relative flex items-center gap-3"><div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15"><ShieldCheck className="h-5 w-5 text-[#f6c971]" /></div><div><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#f6c971]">Your booking</p><h3 className="font-serif text-xl font-semibold">Order Summary</h3></div></div>
            </div>
            
            <div className="p-6 sm:p-8">
              <h4 className="font-serif text-2xl font-semibold leading-tight text-[#173b30]">{booking.packageTitle}</h4>
              <p className="mt-2 mb-7 flex items-center gap-2 text-sm font-medium text-[#668575]">
                {booking.destination} <span className="text-[#b9cbbd]">•</span> {booking.duration}
              </p>

              <div className="mb-7 space-y-4 rounded-2xl bg-[#f7faf6] p-5">
                <div className="flex items-start justify-between gap-4 text-sm">
                  <span className="font-medium text-[#75897a]">Customer</span>
                  <span className="text-right font-semibold text-[#173b30]">{booking.customer.name}</span>
                </div>
                <div className="flex items-start justify-between gap-4 text-sm">
                  <span className="font-medium text-[#75897a]">Travellers</span>
                  <span className="text-right font-semibold text-[#173b30]">{booking.travellers} Person(s)</span>
                </div>
                <div className="flex items-start justify-between gap-4 text-sm">
                  <span className="font-medium text-[#75897a]">Base Price</span>
                  <span className="text-right font-semibold text-[#173b30]">{formatPrice(booking.unitPrice)}</span>
                </div>
              </div>

              <div className="mb-6 border-t border-dashed border-[#d8e3d9] pt-6 pb-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#75897a]">Subtotal</span>
                  <span className="font-semibold text-[#173b30]">{formatPrice(booking.totalPrice)}</span>
                </div>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#75897a]">Gateway Fee</span>
                  <span className="font-semibold text-[#0b805b]">Free</span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 rounded-2xl border border-[#d7e9d9] bg-gradient-to-r from-[#eaf7ed] to-[#f7fbef] p-5">
                <span className="font-semibold text-[#173b30]">Total to pay</span>
                <span className="text-right text-xl font-extrabold tracking-tight text-[#0a6748] sm:text-2xl">{formatPrice(booking.totalPrice)}</span>
              </div>
              <p className="mt-5 flex items-center justify-center gap-2 text-xs font-medium text-[#798d80]"><Lock className="h-3.5 w-3.5" /> Your booking details stay together</p>
            </div>
          </div>
        </motion.div>

      </div>
      </div>
    </div>
  );
}
