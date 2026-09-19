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
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type ChangeEvent, type FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import {
  TripPlanToaster,
  showSignupToast,
} from "@/components/TripPlanToast";

interface RegisterFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

type RegisterFormProps = {
  prefersReducedMotion: boolean;
};

const initialFormData: RegisterFormData = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function RegisterForm({
  prefersReducedMotion,
}: RegisterFormProps) {
  const router = useRouter();
  const [formData, setFormData] =
    useState<RegisterFormData>(initialFormData);
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
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

  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = formData.fullName.trim();
    const email = formData.email.trim().toLowerCase();

    if (!name || !email || !formData.password || !formData.confirmPassword) {
      setErrorMessage("Please complete every required field.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Your passwords do not match.");
      return;
    }

    if (!acceptTerms) {
      setErrorMessage("Please accept the Terms and Privacy Policy to continue.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const { data, error } = await authClient.signUp.email({
        name,
        email,
        password: formData.password,
      });

      if (error) {
        setErrorMessage(error.message ?? "Unable to create your account.");
        return;
      }

      showSignupToast(data?.user?.name ?? name);
      window.setTimeout(() => {
        router.replace("/");
        router.refresh();
      }, 1800);
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

  const handleGoogleRegister = async () => {
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
      <TripPlanToaster />

      <form
        className="mt-6"
        onSubmit={handleRegister}
        autoComplete="off"
        noValidate
      >
        <div>
          <label
            htmlFor="register-name"
            className="text-[12px] font-bold text-[#203C32] sm:text-[13px]"
          >
            Full name
          </label>
          <div className="relative mt-2">
            <UserRound
              size={17}
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#7B8A84]"
            />
            <input
              id="register-name"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              autoComplete="off"
              data-lpignore="true"
              data-1p-ignore="true"
              required
              placeholder="Your full name"
              className="h-12.5 w-full rounded-[14px] border border-[#D8E2DD] bg-[#FCFDFB] py-3 pl-11 pr-4 text-[13px] font-medium text-[#17211D] outline-none transition-all placeholder:text-[#9AA7A1] focus:border-[#087F5B]/60 focus:ring-4 focus:ring-[#087F5B]/10 sm:h-13 sm:text-[14px]"
            />
          </div>
        </div>

        <div className="mt-4">
          <label
            htmlFor="register-email"
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
              id="register-email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="off"
              data-lpignore="true"
              data-1p-ignore="true"
              required
              placeholder="you@example.com"
              className="h-12.5 w-full rounded-[14px] border border-[#D8E2DD] bg-[#FCFDFB] py-3 pl-11 pr-4 text-[13px] font-medium text-[#17211D] outline-none transition-all placeholder:text-[#9AA7A1] focus:border-[#087F5B]/60 focus:ring-4 focus:ring-[#087F5B]/10 sm:h-13 sm:text-[14px]"
            />
          </div>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="register-password"
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
                id="register-password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                autoComplete="new-password"
                data-lpignore="true"
                data-1p-ignore="true"
                required
                placeholder="Create password"
                className="h-12.5 w-full rounded-[14px] border border-[#D8E2DD] bg-[#FCFDFB] py-3 pl-11 pr-11 text-[12px] font-medium text-[#17211D] outline-none transition-all placeholder:text-[#9AA7A1] focus:border-[#087F5B]/60 focus:ring-4 focus:ring-[#087F5B]/10 sm:h-13 sm:text-[13px]"
              />
              <button
                type="button"
                onClick={() => setShowPassword((current) => !current)}
                aria-label={
                  showPassword ? "Hide passwords" : "Show passwords"
                }
                className="absolute right-1.5 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-xl text-[#74827C] transition-colors hover:bg-[#EDF7F3] hover:text-[#087F5B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087F5B]/35"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div>
            <label
              htmlFor="register-confirm-password"
              className="text-[12px] font-bold text-[#203C32] sm:text-[13px]"
            >
              Confirm password
            </label>
            <div className="relative mt-2">
              <LockKeyhole
                size={17}
                aria-hidden="true"
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#7B8A84]"
              />
              <input
                id="register-confirm-password"
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                autoComplete="new-password"
                data-lpignore="true"
                data-1p-ignore="true"
                required
                placeholder="Repeat password"
                className="h-12.5 w-full rounded-[14px] border border-[#D8E2DD] bg-[#FCFDFB] py-3 pl-11 pr-4 text-[12px] font-medium text-[#17211D] outline-none transition-all placeholder:text-[#9AA7A1] focus:border-[#087F5B]/60 focus:ring-4 focus:ring-[#087F5B]/10 sm:h-13 sm:text-[13px]"
              />
            </div>
          </div>
        </div>

        <label className="mt-4 flex cursor-pointer items-start gap-2 text-[10px] font-medium leading-5 text-[#5F7069] sm:text-[11px]">
          <input
            type="checkbox"
            checked={acceptTerms}
            onChange={(event) => setAcceptTerms(event.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-[#C9D6D0] accent-[#F4A934]"
          />
          <span>I agree to the Terms and Privacy Policy.</span>
        </label>

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
          className="mt-5 flex h-12.5 w-full items-center justify-center gap-2 rounded-[14px] border border-[#FFD078]/60 bg-linear-to-r from-[#F4A934] via-[#F6AC32] to-[#E89022] px-5 text-[13px] font-bold text-white shadow-[0_10px_26px_rgba(232,144,34,0.27),inset_0_1px_0_rgba(255,255,255,0.35)] transition-[filter,box-shadow] hover:brightness-105 hover:shadow-[0_13px_30px_rgba(232,144,34,0.34)] sm:h-14 sm:text-[14px]"
        >
          <Plane size={17} fill="currentColor" />
          {isSubmitting ? "Creating account..." : "Create My Account"}
        </motion.button>
      </form>

      <div className="my-4 flex items-center gap-3">
        <span className="h-px flex-1 bg-[#E2E8E5]" />
        <span className="text-[10px] font-medium text-[#89958F] sm:text-[11px]">
          or continue with
        </span>
        <span className="h-px flex-1 bg-[#E2E8E5]" />
      </div>

      <motion.button
        whileTap={{ scale: 0.985 }}
        type="button"
        onClick={handleGoogleRegister}
        disabled={isSubmitting}
        className="flex h-12.5 w-full items-center justify-center gap-2.5 rounded-[14px] border border-[#D8E2DD] bg-white text-[12px] font-bold text-[#203C32] shadow-sm transition-colors hover:border-[#B7CEC4] hover:bg-[#FBFCFA] sm:h-13 sm:text-[13px]"
      >
        
          <FcGoogle size={20} />
        {isSubmitting ? "Please wait..." : "Continue with Google"}
      </motion.button>

      <p className="mt-4 text-center text-[11px] font-medium text-[#6E7D77] sm:text-[12px]">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-bold text-[#087F5B] transition-colors hover:text-[#065F46] hover:underline"
        >
          Sign in
        </Link>
      </p>
    </>
  );
}
