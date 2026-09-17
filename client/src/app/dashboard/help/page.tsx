"use client";

import React, { useState, useMemo, FormEvent } from "react";
import { 
  Search, 
  Bot, 
  Map, 
  Settings, 
  CreditCard, 
  ChevronDown, 
  Mail, 
  MessageCircle, 
  ArrowRight,
  LifeBuoy,
  X,
  Send,
  Phone,
  Sparkles
} from "lucide-react";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";

// --- Data ---
const CATEGORIES = [
  {
    id: "ai-planning",
    title: "AI Trip Planning",
    description: "Learn how to use AI to generate personalized itineraries.",
    icon: Bot,
    gradient: "from-blue-500 to-indigo-500",
    shadow: "shadow-blue-500/20",
    bg: "bg-blue-50"
  },
  {
    id: "managing-trips",
    title: "Managing Trips",
    description: "How to edit, save, download, and share your trips.",
    icon: Map,
    gradient: "from-emerald-400 to-teal-500",
    shadow: "shadow-emerald-500/20",
    bg: "bg-emerald-50"
  },
  {
    id: "account",
    title: "Account & Profile",
    description: "Update your profile, password, and preferences.",
    icon: Settings,
    gradient: "from-rose-400 to-red-500",
    shadow: "shadow-rose-500/20",
    bg: "bg-rose-50"
  },
  {
    id: "billing",
    title: "Billing & Payments",
    description: "Manage your subscription, invoices, and payments.",
    icon: CreditCard,
    gradient: "from-amber-400 to-orange-500",
    shadow: "shadow-amber-500/20",
    bg: "bg-amber-50"
  }
];

const FAQS = [
  {
    id: "faq-1",
    question: "How does TripPlan AI generate my itinerary?",
    answer: "Our advanced AI analyzes your selected destination, budget, dates, and travel style to create a fully customized, day-by-day itinerary. It intelligently factors in travel time, opening hours, and logical routing to ensure a seamless experience."
  },
  {
    id: "faq-2",
    question: "Can I edit the AI-generated trip?",
    answer: "Absolutely! Once your trip is generated, you have full control. You can drag and drop activities, change hotel preferences, swap out restaurants, or adjust your daily budget directly from the Trip Details page."
  },
  {
    id: "faq-3",
    question: "How do I share my trip with friends?",
    answer: "Open your saved trip and click the 'Share' button in the top right corner. You can generate a shareable link for collaborative viewing, or download it as a beautifully formatted PDF to share offline."
  },
  {
    id: "faq-4",
    question: "Are the budget estimates accurate?",
    answer: "The estimates are based on real-time data and historical averages for the region. While they provide a highly reliable baseline, actual prices may vary slightly depending on the season, local events, and your personal spending habits."
  },
  {
    id: "faq-5",
    question: "Is my payment information secure?",
    answer: "Yes. We use industry-standard encryption and partner with Stripe for all transaction processing. We do not store any of your credit card details on our servers."
  }
];

export default function HelpCenterPage() {
  const { data: session } = useSession();
  const user = session?.user;

  const [searchQuery, setSearchQuery] = useState("");
  const [openFaqId, setOpenFaqId] = useState<string | null>("faq-1");
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  
  // Support Form State
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  // Filter FAQs based on search query
  const filteredFaqs = useMemo(() => {
    if (!searchQuery.trim()) return FAQS;
    const query = searchQuery.toLowerCase();
    return FAQS.filter(faq => 
      faq.question.toLowerCase().includes(query) || 
      faq.answer.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const handleSupportSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!subject || !message) return;
    
    setIsSubmitting(true);
    try {
      const response = await fetch(`${(process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/+$/, "")}/api/support/ticket`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user?.id,
          name: user?.name,
          email: user?.email,
          subject,
          message
        })
      });
      
      if (response.ok) {
        setSubmitSuccess(true);
        setSubject("");
        setMessage("");
        setTimeout(() => {
          setIsSupportModalOpen(false);
          setSubmitSuccess(false);
        }, 3000);
      }
    } catch (error) {
      console.error("Failed to submit ticket:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-[#F3F4F6] overflow-y-auto selection:bg-[#073D31] selection:text-white relative">
      
      {/* Premium Hero Section */}
      <div className="relative bg-[#04271C] px-6 py-28 lg:px-12 flex flex-col items-center justify-center overflow-hidden shrink-0 border-b-[6px] border-[#073D31]">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-30%] left-[-10%] w-[60%] h-[150%] rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-500/30 via-transparent to-transparent blur-[120px] transform rotate-12 animate-pulse" style={{ animationDuration: '6s' }} />
          <div className="absolute bottom-[-30%] right-[-10%] w-[70%] h-[150%] rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-500/15 via-transparent to-transparent blur-[120px] transform -rotate-12" />
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.05] bg-repeat pointer-events-none" />
        </div>

        <div className="relative z-10 w-full max-w-4xl flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 border border-white/20 text-emerald-300 text-sm font-bold mb-6 backdrop-blur-md shadow-lg transform hover:scale-105 transition-transform cursor-default">
            <Sparkles className="w-4 h-4 text-yellow-400" /> 24/7 Support Center
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white mb-6 tracking-tight drop-shadow-xl">
            How can we <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">help you?</span>
          </h1>
          <p className="text-[#A5C0B5] text-lg sm:text-xl mb-12 max-w-2xl font-light leading-relaxed">
            Search our knowledge base for guides, tutorials, and answers to frequently asked questions to make your trip planning flawless.
          </p>

          <div className="w-full relative group max-w-3xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-8 flex items-center pointer-events-none">
              <Search className="h-7 w-7 text-emerald-600/50 group-focus-within:text-[#073D31] transition-colors duration-300" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-20 pr-8 py-6 rounded-full border border-white/20 bg-white/95 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] text-gray-900 placeholder-gray-400 focus:ring-4 focus:ring-emerald-500/30 focus:border-emerald-500 text-lg transition-all duration-300 outline-none font-medium"
              placeholder="Search for 'How to edit trip'..."
            />
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <div className="hidden sm:flex items-center gap-1 bg-gray-100 text-gray-400 px-3 py-1.5 rounded-full text-xs font-bold border border-gray-200">
                    CTRL + K
                </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 w-full max-w-7xl mx-auto px-6 py-16 lg:px-10 space-y-24 -mt-12 relative z-20">
        
        {/* Popular Categories Grid */}
        <section>
          <div className="flex flex-col items-center text-center mb-16 pt-8">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-4">Browse by Category</h2>
            <div className="w-20 h-1.5 bg-gradient-to-r from-emerald-400 to-[#073D31] rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {CATEGORIES.map((category) => (
              <div 
                key={category.id} 
                className="bg-white/80 backdrop-blur-xl rounded-[32px] p-8 border border-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500 cursor-pointer group relative overflow-hidden"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 bg-gradient-to-br ${category.gradient} translate-x-1/2 -translate-y-1/2`} />
                
                <div className={`relative w-16 h-16 rounded-2xl flex items-center justify-center mb-8 bg-gradient-to-br ${category.gradient} shadow-lg ${category.shadow} group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}>
                  <category.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="relative text-xl font-extrabold text-gray-900 mb-3">{category.title}</h3>
                <p className="relative text-gray-500 leading-relaxed text-sm mb-8 font-medium">
                  {category.description}
                </p>
                
                <div className={`absolute bottom-8 left-8 flex items-center text-sm font-bold opacity-0 group-hover:opacity-100 transform translate-x-[-15px] group-hover:translate-x-0 transition-all duration-300 bg-clip-text text-transparent bg-gradient-to-r ${category.gradient}`}>
                  Explore guides <ArrowRight className="w-4 h-4 ml-1.5 text-gray-900" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Dynamic FAQs Section */}
        <section className="max-w-4xl mx-auto scroll-mt-20" id="faqs">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-4">Frequently Asked Questions</h2>
            <div className="w-20 h-1.5 bg-gradient-to-r from-[#073D31] to-emerald-400 rounded-full mx-auto mb-6"></div>
            <p className="text-gray-500 max-w-lg mx-auto font-medium">
              {searchQuery ? `Search results for "${searchQuery}"` : "Can't find the answer you're looking for? Check out our most common questions below."}
            </p>
          </div>
          
          <div className="space-y-6">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq) => {
                const isOpen = openFaqId === faq.id || (searchQuery.trim() !== "" && filteredFaqs.length === 1);
                return (
                  <div 
                    key={faq.id} 
                    className={`bg-white/90 backdrop-blur-md rounded-[28px] border transition-all duration-300 overflow-hidden ${
                      isOpen ? "border-emerald-500/30 shadow-[0_10px_40px_rgba(16,185,129,0.1)]" : "border-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:border-emerald-500/10 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
                    }`}
                  >
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full px-8 py-6 sm:py-8 flex items-center justify-between text-left focus:outline-none group"
                    >
                      <span className={`font-extrabold text-lg sm:text-xl transition-colors duration-300 pr-8 ${isOpen ? "text-[#073D31]" : "text-gray-800 group-hover:text-emerald-700"}`}>
                        {faq.question}
                      </span>
                      <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 shadow-sm ${isOpen ? "bg-emerald-100 rotate-180" : "bg-gray-50 group-hover:bg-emerald-50"}`}>
                        <ChevronDown className={`w-6 h-6 transition-colors ${isOpen ? "text-emerald-700" : "text-gray-400 group-hover:text-emerald-600"}`} />
                      </div>
                    </button>
                    <div 
                      className={`px-8 overflow-hidden transition-all duration-500 ease-in-out ${
                        isOpen ? "max-h-[500px] opacity-100 pb-8 sm:pb-10" : "max-h-0 opacity-0 pb-0"
                      }`}
                    >
                      <div className="w-full h-px bg-gradient-to-r from-gray-100 via-emerald-100 to-gray-100 mb-6 sm:mb-8" />
                      <p className="text-gray-600 leading-relaxed text-base sm:text-lg font-medium">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-20 bg-white/80 backdrop-blur-xl rounded-[40px] border border-white shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
                <Search className="w-16 h-16 text-gray-300 mx-auto mb-6" />
                <h3 className="text-2xl font-extrabold text-gray-900 mb-3">No results found</h3>
                <p className="text-gray-500 font-medium">We couldn't find any FAQs matching "{searchQuery}".</p>
                <button 
                  onClick={() => setSearchQuery("")}
                  className="mt-8 text-white bg-[#073D31] px-6 py-3 rounded-full font-bold hover:bg-emerald-700 transition-colors shadow-md hover:shadow-lg"
                >
                  Clear search
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Premium Contact Support Section */}
        <section className="pb-24 pt-10">
          <div className="bg-gradient-to-br from-[#073D31] to-[#04271C] rounded-[48px] p-10 md:p-16 lg:p-20 relative overflow-hidden shadow-[0_20px_50px_rgba(4,39,28,0.3)] border border-emerald-900">
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-500/20 rounded-full blur-[120px] transform translate-x-1/3 -translate-y-1/3 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-yellow-500/10 rounded-full blur-[100px] transform -translate-x-1/3 translate-y-1/3 pointer-events-none" />
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-xs font-bold mb-8 tracking-wide uppercase border border-white/20 shadow-lg backdrop-blur-sm">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse shadow-[0_0_10px_rgba(74,222,128,0.8)]"></span> Support Online
                </div>
                <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-8 leading-tight drop-shadow-md">Need more help?</h2>
                <p className="text-[#A5C0B5] text-xl mb-12 leading-relaxed font-light">
                  Our dedicated travel experts and support team are always ready to help you craft the perfect trip or resolve any issues.
                </p>
                
                <button 
                  onClick={() => setIsSupportModalOpen(true)}
                  className="group relative inline-flex items-center gap-6 text-white overflow-hidden bg-white/5 border border-white/20 hover:border-white/40 px-8 py-5 rounded-[28px] w-full sm:w-auto text-left shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] backdrop-blur-md"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/10 to-emerald-500/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 shadow-lg">
                    <Mail className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <div className="font-extrabold text-xl text-white">Send us a message</div>
                    <div className="text-sm text-[#A5C0B5] mt-1 font-medium">Submit a support ticket</div>
                  </div>
                </button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {/* Live Chat triggers Tawk.to via ID */}
                <button onClick={() => (window as any)?.Tawk_API?.toggle()} className="bg-white/10 hover:bg-white/15 border border-white/20 rounded-[32px] p-10 flex flex-col items-center text-center transition-all duration-500 group backdrop-blur-xl hover:-translate-y-3 hover:shadow-[0_30px_60px_rgba(0,0,0,0.3)] relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2" />
                  
                  <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-400 to-indigo-500 text-white flex items-center justify-center mb-8 group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-500 shadow-lg shadow-blue-500/30">
                    <div className="absolute inset-0 rounded-2xl bg-white animate-ping opacity-20"></div>
                    <MessageCircle className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl text-white font-extrabold mb-3">Live Chat</h3>
                  <p className="text-[#A5C0B5] text-sm leading-relaxed font-medium">Connect with our support team in real-time for immediate answers.</p>
                </button>
                
                {/* WhatsApp */}
                <a href="https://wa.me/8801738803106" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white/15 border border-white/20 rounded-[32px] p-10 flex flex-col items-center text-center transition-all duration-500 group backdrop-blur-xl hover:-translate-y-3 hover:shadow-[0_30px_60px_rgba(0,0,0,0.3)] relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/20 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2" />
                  
                  <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-[#25D366] to-green-600 text-white flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 shadow-lg shadow-green-500/30">
                    <Phone className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl text-white font-extrabold mb-3">WhatsApp</h3>
                  <p className="text-[#A5C0B5] text-sm leading-relaxed font-medium">Directly message us on WhatsApp for fast and easy support.</p>
                </a>
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* Support Ticket Modal (Glassmorphism Premium Design) */}
      {isSupportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#04271C]/60 backdrop-blur-xl">
          <div className="bg-white rounded-[40px] w-full max-w-xl shadow-[0_40px_80px_rgba(0,0,0,0.4)] overflow-hidden animate-in fade-in zoom-in-95 duration-300 border border-white/20">
            <div className="flex justify-between items-center p-8 pb-6 border-b border-gray-100 bg-gray-50/50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#073D31]/10 flex items-center justify-center text-[#073D31]">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-extrabold text-gray-900">Contact Support</h3>
                  <p className="text-sm font-medium text-gray-500">We usually reply within 2 hours</p>
                </div>
              </div>
              <button 
                onClick={() => setIsSupportModalOpen(false)}
                className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 hover:text-red-500 transition-colors shadow-sm"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            
            <div className="p-8">
              {submitSuccess ? (
                <div className="flex flex-col items-center text-center py-12 animate-in slide-in-from-bottom-4">
                  <div className="w-24 h-24 bg-gradient-to-br from-emerald-100 to-green-50 text-emerald-600 rounded-full flex items-center justify-center mb-6 shadow-inner border border-emerald-200">
                    <Send className="w-10 h-10 translate-x-1 -translate-y-1" />
                  </div>
                  <h4 className="text-3xl font-extrabold text-gray-900 mb-3">Message Sent!</h4>
                  <p className="text-gray-500 text-lg max-w-xs font-medium">We've received your ticket and will get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSupportSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Subject</label>
                    <input 
                      type="text"
                      required
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="e.g. Issue with generating trip"
                      className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-gray-50 hover:bg-white focus:bg-white focus:ring-4 focus:ring-[#073D31]/10 focus:border-[#073D31] transition-all outline-none font-medium text-gray-900 shadow-sm hover:border-gray-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Message</label>
                    <textarea 
                      required
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Describe your issue in detail..."
                      className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-gray-50 hover:bg-white focus:bg-white focus:ring-4 focus:ring-[#073D31]/10 focus:border-[#073D31] transition-all outline-none resize-none font-medium text-gray-900 shadow-sm hover:border-gray-300"
                    />
                  </div>
                  <div className="pt-4">
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-[#073D31] to-[#0a4d3e] text-white py-4 rounded-2xl font-bold text-xl hover:shadow-[0_10px_30px_rgba(7,61,49,0.3)] hover:-translate-y-1 active:translate-y-0 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                    >
                      {isSubmitting ? "Sending Message..." : "Submit Ticket"}
                      <Send className="w-6 h-6" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Floating WhatsApp Button (Global feeling for this page) */}
      <a 
        href="https://wa.me/8801738803106" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-10 right-10 z-40 bg-gradient-to-r from-[#25D366] to-green-500 text-white p-5 rounded-full shadow-[0_10px_30px_rgba(37,211,102,0.4)] hover:scale-110 hover:shadow-[0_20px_40px_rgba(37,211,102,0.6)] transition-all duration-500 group flex items-center gap-3 pr-6"
      >
        <Phone className="w-7 h-7 animate-pulse" />
        <span className="font-bold text-lg w-0 overflow-hidden group-hover:w-auto transition-all duration-500 whitespace-nowrap">Chat with Admin</span>
      </a>

    </div>
  );
}
