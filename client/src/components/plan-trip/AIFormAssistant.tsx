"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Mic, Send, Square, Volume2, Sparkles } from "lucide-react";
import type { TripPlanFormState } from "@/types/tripPlan";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type Props = {
  form: TripPlanFormState;
  destinations: {
    slug: string;
    name: string;
  }[];
  onApply: (patch: Partial<TripPlanFormState>) => void;
};

type PlanResponse = {
  reply: string;
  proposal: Partial<TripPlanFormState>;
};

const labels: Record<string, string> = {
  destinationSlug: "গন্তব্য",
  startDate: "শুরুর তারিখ",
  endDate: "শেষ তারিখ",
  travelers: "যাত্রী",
  travelerType: "ভ্রমণসঙ্গী",
  customBudget: "মোট বাজেট (৳)",
  budgetTier: "বাজেট ধরন",
  travelStyles: "ভ্রমণের ধরন",
  accommodation: "থাকার ধরন",
  foodPreferences: "খাবার",
  transport: "যাতায়াত",
  activities: "কার্যক্রম",
  travelPace: "ভ্রমণের গতি",
};

const API_BASE = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
).replace(/\/+$/, "");

const MAX_AUDIO_SIZE = 8 * 1024 * 1024;
const MAX_RECORDING_MS = 60_000;

async function request(path: string, init: RequestInit) {
  const response = await fetch(`${API_BASE}/api/ai/${path}`, {
    ...init,
    credentials: "include",
    signal: AbortSignal.timeout(65_000),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => null);

    throw new Error(
      typeof data?.message === "string"
        ? data.message
        : "Request ব্যর্থ হয়েছে। আবার চেষ্টা করুন।"
    );
  }

  return response;
}

export default function AIFormAssistant({
  form,
  destinations,
  onApply,
}: Props) {
  const inputId = useId();

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const [proposal, setProposal] =
    useState<Partial<TripPlanFormState> | null>(null);

  const [busy, setBusy] = useState(false);
  const [busyText, setBusyText] = useState("");
  const [recording, setRecording] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const lock = useRef(false);
  const alive = useRef(true);

  const recorder = useRef<MediaRecorder | null>(null);
  const stream = useRef<MediaStream | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const voicesRef = useRef<SpeechSynthesisVoice[]>([]);

  const chatArea = useRef<HTMLDivElement | null>(null);
  const snapshot = useRef("");
  const formRef = useRef(form);

  useEffect(() => {
    formRef.current = form;
  }, [form]);

  useEffect(() => {
    alive.current = true;

    const synthesis =
      typeof window !== "undefined" && "speechSynthesis" in window
        ? window.speechSynthesis
        : null;

    const loadVoices = () => {
      voicesRef.current = synthesis?.getVoices() ?? [];
    };

    loadVoices();
    synthesis?.addEventListener("voiceschanged", loadVoices);

    return () => {
      alive.current = false;

      if (timer.current) {
        clearTimeout(timer.current);
      }

      const currentRecorder = recorder.current;

      if (currentRecorder) {
        // Leaving the page must not upload an unfinished recording.
        currentRecorder.onstop = null;
        currentRecorder.ondataavailable = null;
        currentRecorder.onerror = null;

        if (currentRecorder.state === "recording") {
          currentRecorder.stop();
        }
      }

      stream.current?.getTracks().forEach((track) => track.stop());

      const utterance = utteranceRef.current;

      if (utterance) {
        utterance.onstart = null;
        utterance.onend = null;
        utterance.onerror = null;
      }

      synthesis?.cancel();
      synthesis?.removeEventListener("voiceschanged", loadVoices);
    };
  }, []);

  useEffect(() => {
    const container = chatArea.current;

    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages, busy]);

  function report(cause: unknown) {
    if (!alive.current) return;

    if (cause instanceof Error) {
      if (
        cause.name === "TimeoutError" ||
        cause.name === "AbortError"
      ) {
        setError("Request-এর সময় শেষ হয়েছে। আবার চেষ্টা করুন।");
        return;
      }

      if (
        cause.name === "NotAllowedError" ||
        cause.name === "PermissionDeniedError"
      ) {
        setError(
          "Microphone permission দেওয়া হয়নি। Browser settings থেকে Allow করুন।"
        );
        return;
      }

      if (cause.name === "NotFoundError") {
        setError("Microphone পাওয়া যায়নি। Mic সংযুক্ত আছে কি না দেখুন।");
        return;
      }

      if (cause instanceof TypeError) {
        setError(
          "Server-এর সঙ্গে যোগাযোগ হয়নি। Backend চলছে কি না এবং API URL যাচাই করুন।"
        );
        return;
      }

      setError(cause.message);
      return;
    }

    setError("কাজটি সম্পন্ন হয়নি। আবার চেষ্টা করুন।");
  }

  function stopAudio() {
    const utterance = utteranceRef.current;

    if (utterance) {
      utterance.onstart = null;
      utterance.onend = null;
      utterance.onerror = null;
    }

    utteranceRef.current = null;

    if (
      typeof window !== "undefined" &&
      "speechSynthesis" in window
    ) {
      window.speechSynthesis.cancel();
    }

    if (alive.current) {
      setSpeaking(false);
    }
  }

  function speak(text: string) {
    if (lock.current || recording) return;

    if (!("speechSynthesis" in window)) {
      setError("এই browser-এ উত্তর শোনার সুবিধা নেই।");
      return;
    }

    stopAudio();
    setError("");

    const synthesis = window.speechSynthesis;
    const currentVoices = synthesis.getVoices();

    if (currentVoices.length > 0) {
      voicesRef.current = currentVoices;
    }

    const isBangla = /[\u0980-\u09FF]/.test(text);
    const languagePrefix = isBangla ? "bn" : "en";

    const voice = voicesRef.current.find((item) =>
      item.lang.toLowerCase().startsWith(languagePrefix)
    );

    if (!voice) {
      setError(
        isBangla
          ? "এই device/browser-এ বাংলা voice পাওয়া যায়নি। Text chat ও mic ব্যবহার করতে পারবেন।"
          : "English voice পাওয়া যায়নি। একটু পরে আবার চেষ্টা করুন।"
      );
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);

    utterance.voice = voice;
    utterance.lang = voice.lang;
    utterance.rate = 1;
    utteranceRef.current = utterance;

    utterance.onstart = () => {
      if (alive.current && utteranceRef.current === utterance) {
        setSpeaking(true);
      }
    };

    utterance.onend = () => {
      if (utteranceRef.current !== utterance) return;

      utteranceRef.current = null;

      if (alive.current) {
        setSpeaking(false);
      }
    };

    utterance.onerror = (event) => {
      if (utteranceRef.current !== utterance) return;

      utteranceRef.current = null;

      if (!alive.current) return;

      setSpeaking(false);

      if (
        event.error !== "canceled" &&
        event.error !== "interrupted"
      ) {
        setError("উত্তর শোনানো যায়নি। আবার চেষ্টা করুন।");
      }
    };

    try {
      setSpeaking(true);
      synthesis.speak(utterance);
    } catch {
      stopAudio();
      setError("উত্তর শোনানো যায়নি। আবার চেষ্টা করুন।");
    }
  }

  async function send() {
    const text = input.trim();

    if (!text || lock.current || recording) return;

    lock.current = true;

    setBusy(true);
    setBusyText("AI উত্তর তৈরি করছে…");
    setError("");
    setNotice("");
    setProposal(null);
    stopAudio();

    const currentForm = formRef.current;
    const previousMessages = messages;

    const nextMessages: Message[] = [
      ...previousMessages,
      { role: "user", content: text },
    ];

    // Show the user's message immediately.
    setMessages(nextMessages);
    setInput("");

    try {
      const response = await request("plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: nextMessages.slice(-29),
          currentForm,
        }),
      });

      const data = (await response.json()) as PlanResponse;

      if (
        typeof data.reply !== "string" ||
        !data.reply.trim() ||
        !data.proposal ||
        typeof data.proposal !== "object" ||
        Array.isArray(data.proposal)
      ) {
        throw new Error("AI-এর response সঠিক নয়। আবার চেষ্টা করুন।");
      }

      if (!alive.current) return;

      setMessages([
        ...nextMessages,
        {
          role: "assistant",
          content: data.reply,
        },
      ]);

      snapshot.current = JSON.stringify(currentForm);
      setProposal(data.proposal);
    } catch (cause) {
      if (alive.current) {
        // Restore the text so the user can retry.
        setMessages(previousMessages);
        setInput(text);
      }

      report(cause);
    } finally {
      lock.current = false;

      if (alive.current) {
        setBusy(false);
        setBusyText("");
      }
    }
  }

  async function toggleMic() {
    const activeRecorder = recorder.current;

    if (activeRecorder?.state === "recording") {
      activeRecorder.stop();
      return;
    }

    if (lock.current) return;

    lock.current = true;

    setBusy(true);
    setBusyText("Microphone চালু হচ্ছে…");
    setError("");
    setNotice("");
    stopAudio();

    try {
      if (
        !navigator.mediaDevices?.getUserMedia ||
        typeof MediaRecorder === "undefined"
      ) {
        throw new Error(
          "Mic-এর জন্য HTTPS বা localhost-এ supported browser ব্যবহার করুন।"
        );
      }

      const media = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      if (!alive.current) {
        media.getTracks().forEach((track) => track.stop());
        lock.current = false;
        return;
      }

      stream.current = media;

      const mime = [
        "audio/webm;codecs=opus",
        "audio/webm",
        "audio/mp4",
        "audio/ogg;codecs=opus",
      ].find((type) => MediaRecorder.isTypeSupported(type));

      if (!mime) {
        throw new Error(
          "এই browser-এর recording format সমর্থিত নয়। Chrome বা Edge দিয়ে চেষ্টা করুন।"
        );
      }

      const rec = new MediaRecorder(media, {
        mimeType: mime,
      });

      recorder.current = rec;

      const chunks: BlobPart[] = [];
      let totalBytes = 0;
      let recordingFailed = false;

      rec.ondataavailable = (event) => {
        if (event.data.size === 0) return;

        totalBytes += event.data.size;

        if (totalBytes > MAX_AUDIO_SIZE) {
          recordingFailed = true;

          report(
            new Error("Audio অনেক বড়। ছোট করে আবার রেকর্ড করুন।")
          );

          if (rec.state === "recording") {
            rec.stop();
          }

          return;
        }

        chunks.push(event.data);
      };

      rec.onerror = () => {
        recordingFailed = true;

        report(
          new Error("রেকর্ড করা যায়নি। Microphone যাচাই করে আবার চেষ্টা করুন।")
        );

        if (rec.state === "recording") {
          rec.stop();
        }
      };

      rec.onstop = async () => {
        if (timer.current) {
          clearTimeout(timer.current);
          timer.current = null;
        }

        media.getTracks().forEach((track) => track.stop());
        recorder.current = null;
        stream.current = null;

        if (!alive.current) {
          lock.current = false;
          return;
        }

        setRecording(false);

        if (recordingFailed) {
          lock.current = false;
          setBusy(false);
          setBusyText("");
          return;
        }

        setBusy(true);
        setBusyText("Audio থেকে লেখা তৈরি হচ্ছে…");

        try {
          const blob = new Blob(chunks, {
            type: rec.mimeType,
          });

          if (!blob.size || blob.size > MAX_AUDIO_SIZE) {
            throw new Error(
              "Audio খালি বা অনেক বড়। ছোট করে আবার বলুন।"
            );
          }

          const filename = rec.mimeType.includes("mp4")
            ? "voice.mp4"
            : rec.mimeType.includes("ogg")
              ? "voice.ogg"
              : "voice.webm";

          const formData = new FormData();
          formData.append("audio", blob, filename);

          const response = await request("transcribe", {
            method: "POST",
            body: formData,
          });

          const result = (await response.json()) as {
            text?: unknown;
          };

          if (
            typeof result.text !== "string" ||
            !result.text.trim()
          ) {
            throw new Error(
              "কথা স্পষ্ট বোঝা যায়নি। আবার রেকর্ড করুন।"
            );
          }

          const transcript = result.text.trim();

          if (transcript.length > 3000) {
            throw new Error("কথাটি অনেক বড়। ছোট করে আবার বলুন।");
          }

          if (alive.current) {
            setInput(transcript);
            setNotice("লেখাটি দেখে প্রয়োজন হলে সংশোধন করে Send চাপুন।");
          }
        } catch (cause) {
          report(cause);
        } finally {
          lock.current = false;

          if (alive.current) {
            setBusy(false);
            setBusyText("");
          }
        }
      };

      // Collect chunks periodically to enforce the size limit.
      rec.start(1000);

      setRecording(true);
      setBusy(false);
      setBusyText("");

      timer.current = setTimeout(() => {
        if (rec.state === "recording") {
          rec.stop();
        }
      }, MAX_RECORDING_MS);
    } catch (cause) {
      stream.current?.getTracks().forEach((track) => track.stop());

      stream.current = null;
      recorder.current = null;
      lock.current = false;

      if (alive.current) {
        setRecording(false);
        setBusy(false);
        setBusyText("");
      }

      report(cause);
    }
  }

  function apply() {
    if (!proposal || lock.current || recording) return;

    if (snapshot.current !== JSON.stringify(form)) {
      setProposal(null);
      setError(
        "Form পরিবর্তিত হয়েছে। নতুন তথ্যসহ AI-কে আবার বলুন।"
      );
      return;
    }

    onApply(proposal);
    setProposal(null);
    setError("");

    setNotice(
      "Form পূরণ হয়েছে। Review step-এ তথ্য দেখে trip তৈরি করুন।"
    );
  }

  function display(key: string, value: unknown) {
    if (key === "destinationSlug") {
      return (
        destinations.find((destination) => destination.slug === value)
          ?.name || String(value)
      );
    }

    if (key === "travelers") {
      const travelers = value as {
        adults: number;
        children: number;
      };

      return `${travelers.adults} জন প্রাপ্তবয়স্ক, ${travelers.children} জন শিশু`;
    }

    if (Array.isArray(value)) {
      return value.join(", ") || "কোনোটিই নয়";
    }

    return String(value);
  }

  const buttonClass =
    "rounded-full px-4 py-2 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <section className="min-w-0 rounded-[22px] border border-[#DCE6E1] bg-white p-5 shadow-sm">
      <h2 className="flex items-center gap-2 font-semibold text-[#12342D]">
        <Sparkles size={20} className="text-[#B87510]" />
        কথা বলে Trip সাজান
      </h2>

      <p className="mt-2 text-sm text-[#66736D]">
        বাংলায় লিখুন বা mic-এ বলুন। AI প্রস্তাব দেবে; আপনি দেখে
        form-এ বসাবেন।
      </p>

      <div
        ref={chatArea}
        className="mt-4 max-h-72 space-y-3 overflow-y-auto"
        aria-live="polite"
        aria-relevant="additions text"
      >
        {!messages.length && (
          <p className="rounded-xl bg-[#EEF5F1] p-3 text-sm text-[#12342D]">
            কোথায় যেতে চান? কত দিনের জন্য এবং কতজন যাবেন?
          </p>
        )}

        {messages.map((message, index) => (
          <div
            key={index}
            className={`rounded-xl p-3 text-sm ${
              message.role === "user"
                ? "ml-5 bg-[#FFF3D6] text-[#48340C]"
                : "mr-3 bg-[#EEF5F1] text-[#12342D]"
            }`}
          >
            <p className="whitespace-pre-wrap break-words">
              {message.content}
            </p>

            {message.role === "assistant" && (
              <button
                type="button"
                disabled={busy || recording}
                onClick={() => speak(message.content)}
                className="mt-2 flex items-center gap-1 text-xs underline disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Volume2 size={14} />
                উত্তর শুনুন
              </button>
            )}
          </div>
        ))}

        {busy && (
          <p className="text-sm text-[#66736D]" role="status">
            {busyText || "কাজ চলছে…"}
          </p>
        )}
      </div>

      {proposal && Object.keys(proposal).length > 0 && (
        <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-3">
          <p className="mb-2 text-sm font-bold text-[#12342D]">
            প্রস্তাবিত তথ্য
          </p>

          <dl className="space-y-2 text-sm">
            {Object.entries(proposal).map(([key, value]) => (
              <div key={key}>
                <dt className="text-[#66736D]">
                  {labels[key] || key}
                </dt>

                <dd className="break-words font-medium text-[#12342D]">
                  {display(key, value)}
                </dd>
              </div>
            ))}
          </dl>

          <button
            type="button"
            disabled={busy || recording}
            onClick={apply}
            className={`${buttonClass} mt-3 bg-[#04271C] text-white hover:bg-[#0B4534]`}
          >
            Apply to form
          </button>
        </div>
      )}

      <form
        onSubmit={(event) => {
          event.preventDefault();
          void send();
        }}
        className="mt-4 space-y-2"
      >
        <label htmlFor={inputId} className="sr-only">
          আপনার ভ্রমণের কথা লিখুন
        </label>

        <textarea
          id={inputId}
          maxLength={3000}
          value={input}
          disabled={busy || recording}
          onChange={(event) => setInput(event.target.value)}
          rows={3}
          placeholder="আমরা ৪ জন, ৩ দিনের জন্য Sylhet যাব…"
          className="w-full resize-y rounded-xl border border-[#DCE6E1] p-3 text-sm text-[#12342D] focus:outline-none focus:ring-2 focus:ring-amber-400 disabled:opacity-50"
        />

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => void toggleMic()}
            disabled={busy}
            aria-pressed={recording}
            className={`${buttonClass} flex items-center gap-2 ${
              recording
                ? "bg-red-100 text-red-800 hover:bg-red-200"
                : "bg-[#EEF5F1] text-[#12342D] hover:bg-[#DFECE4]"
            }`}
          >
            {recording ? <Square size={16} /> : <Mic size={16} />}
            {recording ? "রেকর্ড বন্ধ" : "কথা বলুন"}
          </button>

          <button
            type="submit"
            disabled={busy || recording || !input.trim()}
            className={`${buttonClass} flex items-center gap-2 bg-[#04271C] text-white hover:bg-[#0B4534]`}
          >
            <Send size={16} />
            Send
          </button>

          {speaking && (
            <button
              type="button"
              onClick={stopAudio}
              className={`${buttonClass} bg-red-50 text-red-800 hover:bg-red-100`}
            >
              শোনা বন্ধ
            </button>
          )}
        </div>
      </form>

      {recording && (
        <p className="mt-2 text-sm text-red-700" role="status">
          রেকর্ড হচ্ছে… সর্বোচ্চ ৬০ সেকেন্ড।
        </p>
      )}

      {error && (
        <p role="alert" className="mt-3 text-sm text-red-700">
          {error}
        </p>
      )}

      {notice && (
        <p role="status" className="mt-3 text-sm text-emerald-800">
          {notice}
        </p>
      )}

      <p className="mt-3 text-xs text-[#66736D]">
        Mic audio লেখা তৈরির জন্য Google Gemini-তে পাঠানো হয়।
        উত্তর শোনানো হয় আপনার browser-এর voice দিয়ে।
      </p>
    </section>
  );
}