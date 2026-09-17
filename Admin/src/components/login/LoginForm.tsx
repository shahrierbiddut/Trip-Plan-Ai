"use client";

import { authClient } from "@/lib/auth-client";
import { motion } from "framer-motion";
import {
  AlertCircle,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Plane,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type ChangeEvent, type FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { showLoginToast } from "@/components/TripPlanToast";
import { FcGoogle } from "react-icons/fc";

interface LoginFormData {
  email: string;
  password: string;
}

type LoginFormProps = {
  prefersReducedMotion: boolean;
};

const initialFormData: LoginFormData = {
  email: "",
  password: "",
};

export default function LoginForm({
  prefersReducedMotion,
}: LoginFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<LoginFormData>(initialFormData);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    if (errorMessage) setErrorMessage("");
  };

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = formData.email.trim().toLowerCase();

    if (!email || !formData.password) {
      setErrorMessage("Enter your email address and password.");
      return;
    }

    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password: formData.password,
        rememberMe,
      });

      if (error || !data?.user) {
        setErrorMessage(error?.message ?? "Unable to sign in. Please try again.");
        return;
      }

      showLoginToast(data.user.name ?? "Traveler");
      router.replace("/");
      router.refresh();
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? `Unable to reach the authentication server: ${error.message}`
          : "Unable to reach the authentication server. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setErrorMessage("");
    setIsSubmitting(true);
    try {
      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
      if (error) {
        const message = error.message ?? "Unable to continue with Google.";
        toast.error(message);
        setErrorMessage(message);
      }
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? `Unable to reach the authentication server: ${error.message}`
          : "Unable to reach the authentication server. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form
        className="mt-7"
        onSubmit={handleLogin}
        autoComplete="off"
        noValidate
      >
        <div>
          <label
            htmlFor="login-email"
            className="text-[12px] font-bold text-[#203C32] sm:text-[13px]"
          >
            Email address
          </label>
          <div className="relative mt-2">
            <Mail
              size={17}
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#7B8A84]"
            />
            <input
              id="login-email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="off"
              data-lpignore="true"
              data-1p-ignore="true"
              required
              placeholder="you@example.com"
              className="h-13 w-full rounded-[14px] border border-[#D8E2DD] bg-[#FCFDFB] py-3 pl-11 pr-4 text-[13px] font-medium text-[#17211D] outline-none transition-all placeholder:text-[#9AA7A1] focus:border-[#087F5B]/60 focus:ring-4 focus:ring-[#087F5B]/10 disabled:cursor-not-allowed disabled:opacity-60 sm:h-14 sm:text-[14px]"
            />
          </div>
        </div>

        <div className="mt-5">
          <label
            htmlFor="login-password"
            className="text-[12px] font-bold text-[#203C32] sm:text-[13px]"
          >
            Password
          </label>
          <div className="relative mt-2">
            <LockKeyhole
              size={17}
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#7B8A84]"
            />
            <input
              id="login-password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              autoComplete="new-password"
              data-lpignore="true"
              data-1p-ignore="true"
              required
              placeholder="Enter your password"
              className="h-13 w-full rounded-[14px] border border-[#D8E2DD] bg-[#FCFDFB] py-3 pl-11 pr-12 text-[13px] font-medium text-[#17211D] outline-none transition-all placeholder:text-[#9AA7A1] focus:border-[#087F5B]/60 focus:ring-4 focus:ring-[#087F5B]/10 disabled:cursor-not-allowed disabled:opacity-60 sm:h-14 sm:text-[14px]"
            />
            <button
              type="button"
              onClick={() => setShowPassword((current) => !current)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-2 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-xl text-[#74827C] transition-colors hover:bg-[#EDF7F3] hover:text-[#087F5B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087F5B]/35"
            >
              {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <label className="flex cursor-pointer items-center gap-2 text-[11px] font-medium text-[#5F7069] sm:text-[12px]">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(event) => setRememberMe(event.target.checked)}
              className="h-4 w-4 rounded border-[#C9D6D0] accent-[#F4A934]"
            />
            Remember me
          </label>

          <Link
            href="/forgot-password"
            className="text-[11px] font-bold text-[#D37E1F] transition-colors hover:text-[#B76512] hover:underline sm:text-[12px]"
          >
            Forgot password?
          </Link>
        </div>

        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            role="alert"
            className="mt-4 flex items-start gap-2 rounded-[14px] border border-rose-200 bg-rose-50 p-3 text-[12px] font-medium leading-5 text-rose-700"
          >
            <AlertCircle size={17} className="mt-0.5 shrink-0" />
            <span>{errorMessage}</span>
          </motion.div>
        )}

        <motion.button
          whileHover={
            prefersReducedMotion ? undefined : { scale: 1.01, y: -1 }
          }
          whileTap={{ scale: 0.985 }}
          type="submit"
          disabled={isSubmitting}
          className="mt-5 flex h-13 w-full items-center justify-center gap-2 rounded-[14px] border border-[#FFD078]/60 bg-linear-to-r from-[#F4A934] via-[#F6AC32] to-[#E89022] px-5 text-[13px] font-bold text-white shadow-[0_10px_26px_rgba(232,144,34,0.27),inset_0_1px_0_rgba(255,255,255,0.35)] transition-[filter,box-shadow] hover:brightness-105 hover:shadow-[0_13px_30px_rgba(232,144,34,0.34)] disabled:cursor-not-allowed disabled:opacity-65 sm:h-14 sm:text-[14px]"
        >
          <Plane size={17} fill="currentColor" />
          {isSubmitting ? "Signing in..." : "Continue Planning"}
        </motion.button>
      </form>

      <div className="my-5 flex items-center gap-3">
        <span className="h-px flex-1 bg-[#E2E8E5]" />
        <span className="text-[10px] font-medium text-[#89958F] sm:text-[11px]">
          or continue with
        </span>
        <span className="h-px flex-1 bg-[#E2E8E5]" />
      </div>

      <motion.button
        whileTap={{ scale: 0.985 }}
        type="button"
        onClick={handleGoogleLogin}
        disabled={isSubmitting}
        className="flex h-13 w-full items-center justify-center gap-2.5 rounded-[14px] border border-[#D8E2DD] bg-white text-[12px] font-bold text-[#203C32] shadow-sm transition-colors hover:border-[#B7CEC4] hover:bg-[#FBFCFA] disabled:cursor-not-allowed disabled:opacity-65 sm:h-14 sm:text-[13px]"
      >
       <FcGoogle size={20} />
        {isSubmitting ? "Please wait..." : "Continue with Google"}
      </motion.button>

      <p className="mt-5 text-center text-[11px] font-medium text-[#6E7D77] sm:text-[12px]">
        New to TripPlan AI?{" "}
        <Link
          href="/signup"
          className="font-bold text-[#087F5B] transition-colors hover:text-[#065F46] hover:underline"
        >
          Create an account
        </Link>
      </p>
    </>
  );
}
