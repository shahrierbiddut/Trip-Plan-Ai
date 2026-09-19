"use client";

import { useState } from "react";
import {
  Bot,
  Check,
  Loader2,
  Send,
  Sparkles,
  X,
} from "lucide-react";

import { applyAITripProposal } from "@/lib/services/tripAssistant";
import type {
  AITripProposal,
  GeneratedTrip,
} from "@/types/tripPlan";

interface ChatMessage {
  role: "assistant" | "user";
  content: string;
}

interface ReplanResponse {
  reply: string;
  proposal: AITripProposal | null;
}

interface ErrorResponse {
  message?: string;
}

const QUICK_PROMPTS = [
  "Day 2 ektu relaxed koro.",
  "Make this trip cheaper.",
  "Aro local food add koro.",
  "Hiking remove koro.",
  "Cheaper hotel suggest koro.",
];

/*
|--------------------------------------------------------------------------
| IMPORTANT
|--------------------------------------------------------------------------
| Debug করার জন্য আপাতত সরাসরি localhost:5000 use করছি।
|
| পরে সব ঠিক হলে এটাকে আবার env variable করতে পারবে:
|
| const API_BASE =
|   process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
|--------------------------------------------------------------------------
*/

const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/+$/, "");

interface AITravelAssistantProps {
  trip: GeneratedTrip | null;
  onTripUpdate?: (
    trip: GeneratedTrip
  ) => void | Promise<void>;
}

export default function AITravelAssistant({
  trip,
  onTripUpdate,
}: AITravelAssistantProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Hi! Ami tomar TripPlan AI Copilot. Trip niye Bangla, Banglish ba English-e ja change korte chao bolo — Apply korar age ami proposal dekhabo.",
    },
  ]);

  const [input, setInput] = useState("");
  const [proposal, setProposal] =
    useState<AITripProposal | null>(null);

  const [isTyping, setIsTyping] = useState(false);
  const [isApplying, setIsApplying] =
    useState(false);

  const [error, setError] = useState("");

  /*
  |--------------------------------------------------------------------------
  | SEND MESSAGE
  |--------------------------------------------------------------------------
  */

  const send = async (text: string) => {
    const trimmed = text.trim();

    if (!trimmed || isTyping || isApplying) {
      return;
    }

    const userMessage: ChatMessage = {
      role: "user",
      content: trimmed,
    };

    /*
    |--------------------------------------------------------------------------
    | Last 14 messages পাঠাবো
    |--------------------------------------------------------------------------
    */

    const nextMessages = [
      ...messages,
      userMessage,
    ].slice(-14);

    setMessages(nextMessages);
    setInput("");
    setProposal(null);
    setError("");

    /*
    |--------------------------------------------------------------------------
    | Trip না থাকলে AI replan করা যাবে না
    |--------------------------------------------------------------------------
    */

    if (!trip) {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content:
            "Age ekta trip generate koro. Tarpor ami itinerary, hotel, food, pace ar budget niye live proposal dite parbo.",
        },
      ]);

      return;
    }

    setIsTyping(true);

    try {
      /*
      |--------------------------------------------------------------------------
      | API URL
      |--------------------------------------------------------------------------
      */

      const url = `${API_BASE}/api/ai/replan`;



      /*
      |--------------------------------------------------------------------------
      | Backend request
      |--------------------------------------------------------------------------
      */

      const response = await fetch(url, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        /*
        |--------------------------------------------------------------------------
        | Better Auth session cookie পাঠানোর জন্য
        |--------------------------------------------------------------------------
        */

        credentials: "include",

        body: JSON.stringify({
          messages: nextMessages,
          currentTrip: trip,
        }),
      });



      /*
      |--------------------------------------------------------------------------
      | আগে raw text পড়বো
      |
      | এতে server JSON না দিয়ে HTML/error দিলে actual response দেখা যাবে
      |--------------------------------------------------------------------------
      */

      const rawText = await response.text();



      /*
      |--------------------------------------------------------------------------
      | JSON parse
      |--------------------------------------------------------------------------
      */

      let data:
        | ReplanResponse
        | ErrorResponse
        | null = null;

      if (rawText) {
        try {
          data = JSON.parse(rawText);
        } catch {
          throw new Error(
            `Server JSON return koreni. Status: ${
              response.status
            }. Response: ${rawText.slice(
              0,
              200
            )}`
          );
        }
      }

      /*
      |--------------------------------------------------------------------------
      | HTTP error
      |--------------------------------------------------------------------------
      */

      if (!response.ok) {
        const message =
          data &&
          "message" in data &&
          typeof data.message === "string"
            ? data.message
            : `TripPlan AI request failed. Status: ${response.status}`;

        throw new Error(message);
      }

      /*
      |--------------------------------------------------------------------------
      | Successful response validate
      |--------------------------------------------------------------------------
      */

      if (
        !data ||
        !("reply" in data) ||
        typeof data.reply !== "string"
      ) {
        throw new Error(
          "TripPlan AI valid response dey ni. Backend response check koro."
        );
      }

      const result =
        data as ReplanResponse;

      /*
      |--------------------------------------------------------------------------
      | AI message UI-তে add
      |--------------------------------------------------------------------------
      */

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: result.reply,
        },
      ]);

      /*
      |--------------------------------------------------------------------------
      | Proposal থাকলে proposal UI show
      |--------------------------------------------------------------------------
      */

      setProposal(
        result.proposal ?? null
      );
    } catch (cause) {
      console.error(
        "❌ TripPlan Replan Error:",
        cause
      );

      /*
      |--------------------------------------------------------------------------
      | Network error
      |--------------------------------------------------------------------------
      */

      if (cause instanceof TypeError) {
        setError(
          "AI server-er sathe connection hocche na. localhost:5000 server, CORS ar credentials check koro."
        );

        return;
      }

      /*
      |--------------------------------------------------------------------------
      | Normal backend / Gemini error
      |--------------------------------------------------------------------------
      */

      if (cause instanceof Error) {
        setError(cause.message);
        return;
      }

      setError(
        "TripPlan AI request complete hoyni. Abar try koro."
      );
    } finally {
      setIsTyping(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | APPLY AI PROPOSAL
  |--------------------------------------------------------------------------
  */

  const applyProposal = async () => {
    if (
      !trip ||
      !proposal ||
      isApplying
    ) {
      return;
    }

    setError("");
    setIsApplying(true);

    try {
      /*
      |--------------------------------------------------------------------------
      | Deterministic client-side change
      |--------------------------------------------------------------------------
      */

      const {
        trip: updatedTrip,
        appliedCount,
      } = applyAITripProposal(
        trip,
        proposal
      );

      /*
      |--------------------------------------------------------------------------
      | কোনো change apply না হলে
      |--------------------------------------------------------------------------
      */

      if (appliedCount === 0) {
        throw new Error(
          "Proposal-er kono valid change apply kora jayni. Notun kore request koro."
        );
      }

      /*
      |--------------------------------------------------------------------------
      | Parent page update
      |
      | /plan-trip:
      | React state update হবে
      |
      | /dashboard/trips/[id]:
      | Parent callback চাইলে MongoDB-তেও save করতে পারবে
      |--------------------------------------------------------------------------
      */

      await onTripUpdate?.(
        updatedTrip
      );

      setProposal(null);

      /*
      |--------------------------------------------------------------------------
      | Success message
      |--------------------------------------------------------------------------
      */

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: `${appliedCount} ta change apply hoyeche. Chaile aro kichu change korte bolo.`,
        },
      ]);
    } catch (cause) {
      console.error(
        "❌ Apply Proposal Error:",
        cause
      );

      setError(
        cause instanceof Error
          ? cause.message
          : "Changes apply kora jayni. Abar try koro."
      );
    } finally {
      setIsApplying(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | UI
  |--------------------------------------------------------------------------
  */

  return (
    <div className="rounded-[22px] border border-[#DCE6E1] bg-white p-5 shadow-[0_10px_30px_rgba(7,26,22,0.05)]">
      {/* Header */}

      <div className="flex items-center gap-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F4A934]">
          <Sparkles
            size={16}
            className="text-[#17211D]"
          />
        </span>

        <div className="min-w-0 flex-1">
          <p className="font-serif text-[16px] font-bold text-[#12342D]">
            Ask TripPlan AI
          </p>

          <p className="text-[10px] text-[#66736D]">
            Live Trip Replanner
          </p>
        </div>

        <span className="rounded-full bg-[#E8F7F1] px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.08em] text-[#087F5B]">
          Gemini
        </span>
      </div>

      {/* Chat messages */}

      <div className="mt-3 max-h-64 space-y-3 overflow-y-auto pr-1">
        {messages.map(
          (message, index) => (
            <div
              key={`${message.role}-${index}`}
              className={`flex max-w-[92%] gap-2 ${
                message.role === "user"
                  ? "ml-auto flex-row-reverse"
                  : ""
              }`}
            >
              {message.role ===
                "assistant" && (
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#087F5B] text-white">
                  <Bot size={13} />
                </span>
              )}

              <p
                className={`whitespace-pre-line rounded-xl p-2.5 text-[12px] leading-5 ${
                  message.role ===
                  "user"
                    ? "rounded-tr-sm bg-[#F4A934] text-[#17211D]"
                    : "rounded-tl-sm bg-[#EEF5F1] text-[#30483F]"
                }`}
              >
                {message.content}
              </p>
            </div>
          )
        )}

        {/* Loading */}

        {isTyping && (
          <div className="flex items-center gap-1.5 pl-9 text-[11px] text-[#66736D]">
            <Loader2
              size={13}
              className="animate-spin"
            />

            Trip ta bujhe proposal
            banacchi…
          </div>
        )}
      </div>

      {/* AI Proposal */}

      {proposal && (
        <div className="mt-4 overflow-hidden rounded-2xl border border-[#F0D59E] bg-[#FFFBF2]">
          {/* Proposal header */}

          <div className="border-b border-[#F0D59E] px-4 py-3">
            <div className="flex items-center gap-2">
              <Sparkles
                size={14}
                className="text-[#B96D09]"
              />

              <p className="text-[12px] font-bold text-[#17332A]">
                {proposal.title}
              </p>
            </div>

            <p className="mt-1 text-[11px] leading-5 text-[#617069]">
              {proposal.summary}
            </p>
          </div>

          {/* Proposed operations */}

          <div className="space-y-2 px-4 py-3">
            {proposal.operations.map(
              (operation, index) => (
                <div
                  key={`${operation.type}-${index}`}
                  className="rounded-xl border border-[#E8E3D6] bg-white px-3 py-2.5"
                >
                  <div className="flex gap-2">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#E8F7F1] text-[#087F5B]">
                      <Check
                        size={11}
                        strokeWidth={3}
                      />
                    </span>

                    <div>
                      <p className="text-[11px] font-bold text-[#17332A]">
                        {operation.label}
                      </p>

                      <p className="mt-0.5 text-[10px] leading-4 text-[#718078]">
                        {operation.reason}
                      </p>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>

          {/* Proposal buttons */}

          <div className="grid grid-cols-2 gap-2 border-t border-[#F0D59E] p-3">
            <button
              type="button"
              onClick={() =>
                setProposal(null)
              }
              disabled={isApplying}
              className="flex h-9 items-center justify-center gap-1.5 rounded-xl border border-[#DCE6E1] bg-white text-[11px] font-bold text-[#50625B] transition-colors hover:bg-[#F7F8F5] disabled:opacity-50"
            >
              <X size={13} />

              Keep current
            </button>

            <button
              type="button"
              onClick={
                applyProposal
              }
              disabled={isApplying}
              className="flex h-9 items-center justify-center gap-1.5 rounded-xl bg-[#073D31] text-[11px] font-bold text-white transition-colors hover:bg-[#0A4C3D] disabled:cursor-wait disabled:opacity-60"
            >
              {isApplying ? (
                <Loader2
                  size={13}
                  className="animate-spin"
                />
              ) : (
                <Check size={13} />
              )}

              Apply{" "}
              {
                proposal.operations
                  .length
              }{" "}
              change
              {proposal.operations
                .length === 1
                ? ""
                : "s"}
            </button>
          </div>
        </div>
      )}

      {/* Error */}

      {error && (
        <div className="mt-3 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-[10px] leading-4 text-red-700">
          {error}
        </div>
      )}

      {/* Quick prompts */}

      <div className="mt-3 flex flex-wrap gap-1.5">
        {QUICK_PROMPTS.map(
          (prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() =>
                void send(prompt)
              }
              disabled={
                isTyping ||
                isApplying
              }
              className="rounded-full border border-[#DCE6E1] bg-[#FAFAF7] px-2.5 py-1 text-[10px] font-semibold text-[#30483F] transition-colors hover:border-[#087F5B]/40 hover:bg-[#EEF5F1] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {prompt}
            </button>
          )
        )}
      </div>

      {/* Input */}

      <form
        onSubmit={(event) => {
          event.preventDefault();

          void send(input);
        }}
        className="mt-3 flex items-center gap-2"
      >
        <label
          htmlFor="assistant-input"
          className="sr-only"
        >
          Ask TripPlan AI
        </label>

        <input
          id="assistant-input"
          type="text"
          value={input}
          onChange={(event) =>
            setInput(
              event.target.value
            )
          }
          placeholder="Jemon: Day 2 ektu relaxed koro…"
          disabled={
            isTyping ||
            isApplying
          }
          className="h-10 min-w-0 flex-1 rounded-full border border-[#DCE6E1] bg-[#FAFAF7] px-4 text-[12px] text-[#12342D] outline-none placeholder:text-[#66736D] focus:border-[#087F5B]/50 focus:ring-4 focus:ring-[#087F5B]/[0.08] disabled:opacity-60"
        />

        <button
          type="submit"
          aria-label="Send message"
          disabled={
            !input.trim() ||
            isTyping ||
            isApplying
          }
          
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#04271C] text-white transition-colors hover:bg-[#073D31] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Send size={15} />
        </button>
      </form>
    </div>
  );
}
