"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Languages, Loader2 } from "lucide-react";
import Image from "next/image";

interface GuideChatModalProps {
  guideName: string;
}

export default function GuideChatModal({ guideName }: GuideChatModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ id: number; text: string; sender: "user" | "guide"; translatedText?: string }[]>([
    { id: 1, text: "Hello! I am your local guide. Let me know if you need any help with this tour package.", sender: "guide" }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTranslatingId, setIsTranslatingId] = useState<number | null>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    
    const newUserMsg = { id: Date.now(), text: inputValue, sender: "user" as const };
    setMessages(prev => [...prev, newUserMsg]);
    setInputValue("");
    
    // Simulate guide response
    setTimeout(() => {
      const guideResponses = [
        "That sounds great! I can arrange that for you.",
        "The weather usually stays pleasant during this time.",
        "Yes, food is included in the premium package.",
        "Please let me know if you have any special requests."
      ];
      const randomResponse = guideResponses[Math.floor(Math.random() * guideResponses.length)];
      setMessages(prev => [...prev, { id: Date.now(), text: randomResponse, sender: "guide" }]);
    }, 1500);
  };

  const handleTranslate = async (msgId: number, text: string) => {
    setIsTranslatingId(msgId);
    try {
      const res = await fetch(`${(process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/+$/, "")}/api/chat/translate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, targetLang: "Bengali" })
      });
      const data = await res.json();
      if (data.translatedText) {
        setMessages(prev => prev.map(m => m.id === msgId ? { ...m, translatedText: data.translatedText } : m));
      }
    } catch (error) {
      console.error("Failed to translate:", error);
    } finally {
      setIsTranslatingId(null);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#087F5B] text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
      >
        <MessageSquare size={24} />
      </button>

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[350px] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl animate-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="flex items-center justify-between bg-[#087F5B] p-4 text-white">
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-white/20">
                <Image
                  src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100&auto=format&fit=crop"
                  alt="Guide"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-bold">{guideName}</h3>
                <p className="text-xs text-white/80">Local Guide • Online</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="rounded-full p-1 hover:bg-white/20">
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div ref={chatRef} className="flex h-[350px] flex-col gap-4 overflow-y-auto bg-gray-50 p-4">
            <div className="text-center text-xs text-gray-400 my-2">
              AI Real-time translation is enabled.
            </div>
            
            {messages.map((msg) => (
              <div key={msg.id} className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}>
                <div className={`max-w-[85%] rounded-2xl p-3 text-sm ${msg.sender === "user" ? "bg-[#087F5B] text-white rounded-br-none" : "bg-white text-gray-800 border border-gray-100 shadow-sm rounded-bl-none"}`}>
                  <p>{msg.text}</p>
                  
                  {/* Translated Text Display */}
                  {msg.translatedText && (
                    <div className="mt-2 border-t border-black/10 pt-2 text-[#087F5B] font-medium">
                      {msg.translatedText}
                    </div>
                  )}
                </div>

                {/* Translate Button for Guide Messages */}
                {msg.sender === "guide" && !msg.translatedText && (
                  <button
                    onClick={() => handleTranslate(msg.id, msg.text)}
                    disabled={isTranslatingId === msg.id}
                    className="mt-1 flex items-center gap-1 text-[11px] font-medium text-gray-500 hover:text-[#087F5B] transition-colors"
                  >
                    {isTranslatingId === msg.id ? (
                      <Loader2 size={12} className="animate-spin" />
                    ) : (
                      <Languages size={12} />
                    )}
                    Translate to Bengali
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-100 bg-white p-3">
            <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type a message..."
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-gray-400"
              />
              <button
                onClick={handleSend}
                disabled={!inputValue.trim()}
                className="rounded-full bg-[#087F5B] p-1.5 text-white disabled:opacity-50 hover:bg-[#065b41] transition-colors"
              >
                <Send size={14} className="ml-0.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
