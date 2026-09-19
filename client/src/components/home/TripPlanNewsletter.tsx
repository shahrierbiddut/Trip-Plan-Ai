"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import type { FormEvent } from "react";

type TripPlanNewsletterProps = {
  /** Connect this callback to your existing newsletter/API logic later. */
  onSubscribe?: (email: string) => void;
  className?: string;
};

export default function TripPlanNewsletter({
  onSubscribe,
  className = "",
}: TripPlanNewsletterProps) {
  const reduceMotion = useReducedMotion();
  const [email, setEmail] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim()) return;
    onSubscribe?.(email.trim());
  };

  return (
    <section
      aria-labelledby="tripplan-newsletter-heading"
      className={`relative isolate w-full overflow-hidden bg-[#f7f7f6] px-5 py-24 sm:px-8 sm:py-28 lg:py-32 ${className}`}
    >
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto flex max-w-4xl flex-col items-center text-center"
      >
        <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#bd642f] sm:text-xs">
          Curated travel inspiration &amp; updates
        </p>

        <h2
          id="tripplan-newsletter-heading"
          className="mt-6 font-serif text-4xl font-normal leading-tight tracking-tight text-[#1d1a18] sm:text-5xl lg:text-6xl"
        >
          Join the TripPlan Circle
        </h2>

        <motion.span
          aria-hidden="true"
          initial={reduceMotion ? false : { scaleX: 0 }}
          whileInView={reduceMotion ? undefined : { scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.25 }}
          className="mt-5 h-px w-16 origin-center bg-[#c97745]"
        />

        <p className="mt-10 max-w-3xl font-serif text-base leading-7 tracking-wide text-[#847d78] sm:text-lg sm:leading-8">
          Subscribe to receive destination inspiration, seasonal travel alerts,
          hotel discoveries and smarter planning notes directly to your inbox.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-10 flex w-full max-w-3xl flex-col gap-3 sm:flex-row"
        >
          <label htmlFor="tripplan-newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="tripplan-newsletter-email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter your email address..."
            className="min-h-16 min-w-0 flex-1 rounded-sm border border-[#d3cfcb] bg-white px-6 font-serif text-base text-[#24211f] outline-none transition placeholder:text-[#a7a09b] focus:border-[#a9663d] focus:ring-2 focus:ring-[#bd642f]/10"
          />

          <motion.button
  type="submit"
  whileHover={reduceMotion ? undefined : { y: -2 }}
  whileTap={reduceMotion ? undefined : { scale: 0.985 }}
  className="min-h-16  border border-[#ffc85c] bg-gradient-to-r from-[#f7b63f] via-[#f4aa2f] to-[#ed971b] px-11 font-serif text-sm font-semibold uppercase tracking-wide text-[#073c32] shadow-[0_10px_24px_rgba(238,151,29,0.28)] transition hover:from-[#ffc34f] hover:to-[#f2a226] focus:outline-none focus:ring-2 focus:ring-[#ed971b] focus:ring-offset-2 sm:min-w-48"
>
  Subscribe
</motion.button>
        </form>

        <p className="mt-5 font-serif text-sm text-[#aaa39e] sm:text-base">
          We respect your privacy. Unsubscribe securely in one click at any
          time.
        </p>
      </motion.div>
    </section>
  );
}