"use client";

import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { Bot, LoaderCircle, Send, X } from "lucide-react";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type ChatResponse = {
  reply?: string;
  error?: string;
  message?: string;
};

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
).replace(/\/+$/, "");

const initialMessage: ChatMessage = {
  role: "assistant",
  content:
    "স্বাগতম! বাংলাদেশের যেকোনো ভ্রমণ স্থান, রুট, হোটেল, খাবার বা আনুমানিক বাজেট সম্পর্কে আমাকে প্রশ্ন করতে পারেন।",
};

const quickQuestions = [
  "৩ দিনের সাজেক ট্যুর প্ল্যান",
  "কক্সবাজার ভ্রমণের বাজেট",
  "শ্রীমঙ্গল যাওয়ার সেরা সময়",
];

function ChatLauncherIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 40 40"
      className="h-8 w-8"
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

export default function TravelChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([initialMessage]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    chatEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, loading, isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 180);
    return () => window.clearTimeout(focusTimer);
  }, [isOpen]);

  const sendMessage = async (question?: string) => {
    const userText = (question ?? input).trim();
    if (!userText || loading) return;

    const userMessage: ChatMessage = { role: "user", content: userText };
    const nextMessages = [...messages, userMessage];

    setMessages(nextMessages);
    setInput("");
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages.slice(-20) }),
        signal: AbortSignal.timeout(65_000),
      });

      const data = (await response.json().catch(() => ({}))) as ChatResponse;

      if (!response.ok || !data.reply?.trim()) {
        throw new Error(
          data.error || data.message || "তথ্য আনতে সমস্যা হয়েছে। আবার চেষ্টা করুন।"
        );
      }

      setMessages((current) => [
        ...current,
        { role: "assistant", content: data.reply!.trim() },
      ]);
    } catch (cause) {
      if (cause instanceof Error && cause.name === "TimeoutError") {
        setError("উত্তর পেতে বেশি সময় লাগছে। আবার চেষ্টা করুন।");
      } else if (cause instanceof TypeError) {
        setError("সার্ভারের সঙ্গে সংযোগ করা যায়নি।");
      } else {
        setError(
          cause instanceof Error
            ? cause.message
            : "তথ্য আনতে সমস্যা হয়েছে। আবার চেষ্টা করুন।"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void sendMessage();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void sendMessage();
    }
  };

  return (
    <div className="fixed bottom-5 right-4 z-[90] flex flex-col items-end sm:bottom-7 sm:right-7">
      <div
        aria-hidden={!isOpen}
        className={`mb-3 flex h-[min(620px,calc(100vh-112px))] w-[calc(100vw-32px)] max-w-[390px] origin-bottom-right flex-col overflow-hidden rounded-[24px] border border-[#DCE6E1] bg-[#F8FAF7] shadow-[0_24px_80px_rgba(5,45,35,0.24)] transition-all duration-300 ease-out ${
          isOpen
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none translate-y-5 scale-95 opacity-0"
        }`}
      >
        <header className="relative overflow-hidden bg-[#0B4A3B] px-5 py-4 text-white">
          <div className="pointer-events-none absolute -right-8 -top-10 h-28 w-28 rounded-full bg-[#F4A934]/15 blur-2xl" />
          <div className="relative flex items-center justify-between gap-4">
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white shadow-[0_6px_18px_rgba(0,0,0,0.18)]">
                <ChatLauncherIcon />
              </span>
              <div className="min-w-0">
                <h2 className="truncate font-serif text-[18px] font-bold">
                  BD Trip Guide
                </h2>
                <p className="mt-0.5 flex items-center gap-1.5 text-[11px] text-white/75">
                  <span className="h-2 w-2 rounded-full bg-emerald-300" />
                  AI travel assistant · Live Search
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close AI chat"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-white/80 transition hover:bg-white/20 hover:text-white"
            >
              <X size={17} />
            </button>
          </div>
        </header>

        <div className="flex-1 space-y-4 overflow-y-auto px-4 py-5 [scrollbar-width:thin] [scrollbar-color:#BDD2C9_transparent]">
          {messages.map((message, index) => (
            <div
              key={`${message.role}-${index}`}
              className={`flex items-end gap-2 ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {message.role === "assistant" && (
                <span className="mb-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0B4A3B] text-[#F4A934]">
                  <Bot size={14} />
                </span>
              )}

              <div
                className={`max-w-[82%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-[13px] leading-6 shadow-sm ${
                  message.role === "user"
                    ? "rounded-br-md bg-[#0B4A3B] text-white"
                    : "rounded-bl-md border border-[#E0E9E5] bg-white text-[#29443B]"
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-end gap-2">
              <span className="mb-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0B4A3B] text-[#F4A934]">
                <Bot size={14} />
              </span>
              <div className="flex items-center gap-2 rounded-2xl rounded-bl-md border border-[#E0E9E5] bg-white px-4 py-3 text-[12px] text-[#647970] shadow-sm">
                <LoaderCircle size={15} className="animate-spin text-[#0B4A3B]" />
                তথ্য খোঁজা হচ্ছে...
              </div>
            </div>
          )}

          {messages.length === 1 && !loading && (
            <div className="flex flex-wrap gap-2 pt-1">
              {quickQuestions.map((question) => (
                <button
                  key={question}
                  type="button"
                  onClick={() => void sendMessage(question)}
                  className="rounded-full border border-[#C9D9D2] bg-white px-3 py-2 text-left text-[11px] font-medium text-[#315248] transition hover:border-[#F4A934] hover:bg-[#FFF8E9]"
                >
                  {question}
                </button>
              ))}
            </div>
          )}

          {error && (
            <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-[12px] leading-5 text-red-700">
              {error}
            </p>
          )}
          <div ref={chatEndRef} />
        </div>

        <form
          onSubmit={handleSubmit}
          className="border-t border-[#DFE8E4] bg-white p-3.5"
        >
          <div className="flex items-end gap-2 rounded-2xl border border-[#CAD9D3] bg-[#F7F9F7] p-1.5 pl-3 transition focus-within:border-[#0B4A3B] focus-within:ring-2 focus-within:ring-[#0B4A3B]/10">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
              maxLength={3000}
              disabled={loading}
              placeholder="ভ্রমণ সম্পর্কে প্রশ্ন করুন..."
              className="max-h-24 min-h-10 flex-1 resize-none bg-transparent py-2 text-[13px] leading-5 text-[#173B31] outline-none placeholder:text-[#80928B] disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="Send message"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F4A934] text-[#123D32] shadow-[0_5px_14px_rgba(244,169,52,0.28)] transition hover:bg-[#FFBC4E] disabled:cursor-not-allowed disabled:opacity-45"
            >
              {loading ? (
                <LoaderCircle size={17} className="animate-spin" />
              ) : (
                <Send size={17} />
              )}
            </button>
          </div>
          <p className="mt-2 text-center text-[10px] text-[#82948D]">
            ভাড়া ও রিসোর্টের মূল্য মৌসুম বা ছুটির দিনে পরিবর্তিত হতে পারে।
          </p>
        </form>
      </div>

      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        aria-label={isOpen ? "Close AI travel chat" : "Open AI travel chat"}
        aria-expanded={isOpen}
        className={`group flex h-[66px] w-[66px] items-center justify-center rounded-full bg-[#0B4A3B] shadow-[0_14px_36px_rgba(6,55,43,0.32)] ring-1 ring-white/80 transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_42px_rgba(6,55,43,0.4)] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#F4A934]/40 ${
          isOpen ? "rotate-0 scale-95" : "rotate-0 scale-100"
        }`}
      >
        {isOpen ? (
          <X size={25} className="text-white transition-transform group-hover:rotate-90" />
        ) : (
          <ChatLauncherIcon />
        )}
      </button>
    </div>
  );
}
