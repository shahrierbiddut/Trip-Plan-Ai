"use client";

import { useState } from "react";
import { Sparkles, Send, Bot, X } from "lucide-react";
import { Input, Button } from "@heroui/react";

export default function AITravelAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi! I'm your AI Travel Assistant. Ask me anything about Cox's Bazar!"
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const predefinedResponses: Record<string, string> = {
    "where should i go for sunset?": "Cox's Bazar Sea Beach is a popular choice for a relaxing sunset experience. For a quieter coastal atmosphere, consider exploring Inani Beach or walking along Marine Drive.",
    "what's best for a family trip?": "Cox's Bazar Sea Beach, Himchari National Park, and selected Marine Drive stops can work well for a relaxed family itinerary.",
    "can i plan this in 3 days?": "Yes, 3 days is perfect! Day 1: Beach & local food. Day 2: Himchari & Marine Drive. Day 3: Inani beach & relaxing.",
    "where should i eat seafood?": "You can find excellent fresh seafood at the beachside restaurants in Kolatoli point. Grilled pomfret and lobsters are local specialties.",
  };

  const handleSend = () => {
    if (!query.trim()) return;

    // Add user message
    const userMsg = query.trim();
    setMessages(prev => [...prev, { role: "user", content: userMsg }]);
    setQuery("");
    setIsTyping(true);

    // Mock AI response
    setTimeout(() => {
      const lowerQuery = userMsg.toLowerCase();
      let aiResponse = "I can help you plan your perfect trip to Cox's Bazar! For specific itineraries or real-time booking, try the 'Plan My Trip' feature.";
      
      for (const [key, val] of Object.entries(predefinedResponses)) {
        if (lowerQuery.includes(key.replace("?", ""))) {
          aiResponse = val;
          break;
        }
      }

      setMessages(prev => [...prev, { role: "assistant", content: aiResponse }]);
      setIsTyping(false);
    }, 1000);
  };

  const handleQuickPrompt = (prompt: string) => {
    setQuery(prompt);
  };

  const quickPrompts = [
    "Where should I go for sunset?",
    "What's best for a family trip?",
    "Can I plan this in 3 days?",
    "Where should I eat seafood?"
  ];

  return (
    <div className="fixed bottom-24 right-6 z-50 md:bottom-8 md:right-8 flex flex-col items-end pointer-events-none">
      
      {/* Floating Action Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-[#F4A62A] hover:bg-[#F4B942] rounded-full flex items-center justify-center shadow-[0_8px_30px_rgba(244,166,42,0.4)] hover:shadow-[0_10px_40px_rgba(244,166,42,0.5)] transition-all duration-300 hover:-translate-y-1 group pointer-events-auto border-4 border-white/20"
        >
          <Sparkles className="w-7 h-7 text-[#17211D] group-hover:scale-110 transition-transform" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-[340px] md:w-[380px] bg-[#163D36] rounded-2xl p-5 text-white shadow-2xl pointer-events-auto origin-bottom-right transition-all duration-300 transform scale-100 opacity-100 border border-white/10 flex flex-col max-h-[80vh]">
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#F4A62A] flex items-center justify-center shrink-0 shadow-lg">
                <Sparkles className="w-5 h-5 text-[#17211D]" />
              </div>
              <div>
                <h3 className="text-lg font-serif font-bold leading-tight">Ask AI</h3>
                <p className="text-[11px] text-white/70">Cox's Bazar Expert</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white/70 hover:text-white bg-white/5 hover:bg-white/10 rounded-full p-2 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Area */}
          <div className="bg-[#0B2522] rounded-xl border border-white/10 p-4 mb-4 h-64 overflow-y-auto flex flex-col gap-4 shadow-inner">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-3 max-w-[85%] ${msg.role === "user" ? "ml-auto flex-row-reverse" : ""}`}>
                {msg.role === "assistant" && (
                  <div className="w-8 h-8 rounded-full bg-[#087F5B] flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                )}
                <div 
                  className={`p-3 rounded-xl text-sm leading-relaxed ${
                    msg.role === "user" 
                      ? "bg-[#F4A62A] text-[#17211D] rounded-tr-sm" 
                      : "bg-white/10 text-white rounded-tl-sm border border-white/5"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-3 max-w-[85%]">
                <div className="w-8 h-8 rounded-full bg-[#087F5B] flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="p-3 bg-white/10 rounded-xl rounded-tl-sm border border-white/5 flex gap-1 items-center h-[44px]">
                   <div className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" />
                   <div className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                   <div className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
                </div>
              </div>
            )}
          </div>

          {/* Quick Prompts */}
          <div className="flex flex-wrap gap-2 mb-4">
            {quickPrompts.map((prompt, i) => (
              <button 
                key={i}
                onClick={() => handleQuickPrompt(prompt)}
                className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-[11px] transition-colors text-left leading-tight"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Area */}
          <div className="flex gap-2">
            <Input 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask anything..."
              className="flex-1 bg-white/10 border-white/20 hover:border-white/40 focus-within:!border-[#F4A62A] text-white placeholder:text-white/40 text-sm"
            />
            <Button 
              onClick={handleSend}
              isIconOnly
              className="bg-[#F4A62A] text-[#17211D] hover:bg-[#F4B942]"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>

        </div>
      )}

    </div>
  );
}
