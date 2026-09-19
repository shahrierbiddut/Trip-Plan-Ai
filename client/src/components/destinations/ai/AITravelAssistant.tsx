"use client";

import { useState } from "react";
import { Sparkles, Send, Bot, X } from "lucide-react";
import { Input, Button } from "@heroui/react";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
).replace(/\/+$/, "");

function ChatLauncherIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 40 40"
      className="h-9 w-9"
      fill="none"
    >
      <circle cx="20" cy="20" r="12.5" fill="white" />
      <path
        d="M12.5 19.5c0-4.35 3.45-7.5 7.9-7.5 4.42 0 7.6 3.1 7.6 7.35 0 4.25-3.27 7.45-7.68 7.45-1.23 0-2.37-.25-3.36-.73l-4.1 1.34 1.34-3.84a7.16 7.16 0 0 1-1.7-4.07Z"
        fill="#0B4A3B"
        stroke="#F4A934"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle cx="17.1" cy="19.55" r="1.25" fill="#F4A934" />
      <circle cx="20.35" cy="19.55" r="1.25" fill="#F4A934" />
      <circle cx="23.6" cy="19.55" r="1.25" fill="#F4A934" />
    </svg>
  );
}

export default function AITravelAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: "Hi! I'm your AI Travel Assistant. Ask me anything about Cox's Bazar!"
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState("");

  const handleSend = async () => {
    if (!query.trim() || isTyping) return;

    const userMsg = query.trim();
    const nextMessages: ChatMessage[] = [
      ...messages,
      { role: "user", content: userMsg },
    ];

    setMessages(nextMessages);
    setQuery("");
    setError("");
    setIsTyping(true);

    try {
      const response = await fetch(`${API_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages.slice(-20) }),
        signal: AbortSignal.timeout(65_000),
      });

      const data = (await response.json().catch(() => ({}))) as {
        reply?: string;
        error?: string;
        message?: string;
      };

      if (!response.ok || !data.reply?.trim()) {
        throw new Error(
          data.error || data.message || "AI could not answer. Please try again."
        );
      }

      setMessages((current) => [
        ...current,
        { role: "assistant", content: data.reply!.trim() },
      ]);
    } catch (cause) {
      if (cause instanceof Error && cause.name === "TimeoutError") {
        setError("The answer is taking too long. Please try again.");
      } else if (cause instanceof TypeError) {
        setError("Could not connect to the server.");
      } else {
        setError(
          cause instanceof Error
            ? cause.message
            : "AI could not answer. Please try again."
        );
      }
    } finally {
      setIsTyping(false);
    }
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
          aria-label="Open AI travel chat"
          className="group pointer-events-auto flex h-20 w-20 items-center justify-center rounded-full border border-white/90 bg-[#0B4A3B] shadow-[0_14px_36px_rgba(6,55,43,0.32)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_42px_rgba(6,55,43,0.4)] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#F4A934]/40"
        >
          <span className="transition-transform duration-300 group-hover:scale-110">
            <ChatLauncherIcon />
          </span>
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
                <p className="text-[11px] text-white/70">Cox&apos;s Bazar Expert</p>
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
            {error && (
              <p className="rounded-lg border border-red-300/25 bg-red-400/10 px-3 py-2 text-xs leading-relaxed text-red-100">
                {error}
              </p>
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
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  void handleSend();
                }
              }}
              disabled={isTyping}
              placeholder="Ask anything..."
              className="flex-1 bg-white/10 border-white/20 hover:border-white/40 focus-within:!border-[#F4A62A] text-white placeholder:text-white/40 text-sm"
            />
            <Button 
              onClick={() => void handleSend()}
              isIconOnly
              isDisabled={isTyping || !query.trim()}
              aria-label="Send message"
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
