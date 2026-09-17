"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Plane } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

const Facebook = ({
  size = 24,
  className = "",
}: {
  size?: number;
  className?: string;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const Instagram = ({
  size = 24,
  className = "",
}: {
  size?: number;
  className?: string;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const Youtube = ({
  size = 24,
  className = "",
}: {
  size?: number;
  className?: string;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);

const Linkedin = ({
  size = 24,
  className = "",
}: {
  size?: number;
  className?: string;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const footerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.04,
    },
  },
};

const fadeInUpVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const linkClass =
  "text-[13px] font-medium text-white/65 transition-colors duration-300 hover:text-[#F4A62A]";

const socialClass =
  "flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-white transition-colors duration-300 hover:border-[#F4A62A] hover:bg-[#F4A62A] hover:text-[#0B2522]";

export default function Footer() {
  return (
    <footer className="w-full overflow-hidden border-t-[3px] border-[#F4A62A] bg-[#0B2522] font-serif text-white">
      <motion.div
        variants={footerContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.12 }}
        className="mx-auto max-w-[1920px] px-[18px] py-9 sm:px-8 sm:py-12 md:px-12 md:py-16 lg:px-16 xl:px-24"
      >
        <motion.h2
          variants={fadeInUpVariant}
          className="hidden w-full text-center font-light uppercase leading-[1.08] tracking-[0.1em] text-white sm:block sm:text-5xl md:text-6xl xl:text-7xl"
        >
          <span>Plan Smarter</span>
          <span className="my-2 font-sans text-2xl font-extralight text-[#F4A62A]/55 sm:mx-4 sm:my-0 sm:text-inherit">
            /
          </span>
          <span>Travel Better</span>
        </motion.h2>

        <motion.div
          variants={fadeInUpVariant}
          className="grid grid-cols-1 gap-10 font-sans sm:mt-11 sm:grid-cols-2 sm:gap-10 sm:border-t sm:border-white/10 sm:pt-9 md:pt-10 lg:grid-cols-4 lg:gap-12"
        >
          <div>
            <Link
            href="/"
            aria-label="TripPlan AI Home"
            className="group z-20 flex shrink-0 items-center"
          >
            <div className="flex items-center gap-2.5">
              {/* Logo */}

              <div className="relative flex h-[38px] w-[38px] items-center justify-center rounded-full bg-gradient-to-br from-[#FFD16F] via-[#F4A934] to-[#D9861F] shadow-[0_7px_18px_rgba(217,134,31,0.30),inset_0_1px_0_rgba(255,255,255,0.45)] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:rotate-[-5deg] group-hover:shadow-[0_10px_24px_rgba(217,134,31,0.38)]">
                <span className="pointer-events-none absolute inset-[3px] rounded-full border border-[#FFF0C2]/70" />

                <Plane
                  size={20}
                  strokeWidth={2.3}
                  className="relative rotate-[-45deg] text-[#123B31] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </div>

              {/* Logo text */}

              <span className="text-[18px] font-extrabold leading-none tracking-[-0.035em] text-white transition-colors duration-300 group-hover:text-[#087F5B] sm:text-[20px]">
                TripPlan <span className="text-[#D88928]">AI</span>
              </span>
            </div>
          </Link>
            <p className="mt-4 max-w-sm text-[13px] font-light leading-6 text-white/65">
              Plan Smarter. Travel Better. Discover your perfect destination
              with AI.
            </p>
          </div>

          <FooterColumn title="Product">
            <li><Link href="/destinations" className={linkClass}>Explore Destinations</Link></li>
            <li><Link href="/plan-trip" className={linkClass}>Plan My Trip</Link></li>
            <li><Link href="/my-trips" className={linkClass}>My Trips</Link></li>
            <li><Link href="/reviews" className={linkClass}>Reviews</Link></li>
            <li><Link href="/wishlist" className={linkClass}>Wishlist</Link></li>
          </FooterColumn>

          <FooterColumn title="Resources">
            <li><Link href="#" className={linkClass}>Travel Guides</Link></li>
            <li><Link href="#" className={linkClass}>Travel Tips</Link></li>
            <li><Link href="#" className={linkClass}>Travel Stories</Link></li>
            <li><Link href="#" className={linkClass}>Budget Travel</Link></li>
            <li><Link href="#" className={linkClass}>Help Center</Link></li>
          </FooterColumn>

          <FooterColumn title="Company">
            <li><Link href="#" className={linkClass}>About</Link></li>
            <li><Link href="#" className={linkClass}>Contact</Link></li>
            <li><Link href="#" className={linkClass}>Privacy Policy</Link></li>
            <li><Link href="#" className={linkClass}>Terms &amp; Conditions</Link></li>
          </FooterColumn>
        </motion.div>

        <motion.div
          variants={fadeInUpVariant}
          className="mt-12 flex flex-col items-center gap-7 border-t border-white/10 pt-10 font-sans sm:mt-9 sm:flex-row sm:flex-wrap sm:justify-between sm:gap-5 sm:pt-7 lg:flex-nowrap"
        >
          <p className="w-full text-center text-[11px] font-medium uppercase tracking-[0.16em] text-white/70 sm:w-auto sm:text-left">
            Plan Smarter. Travel Better.
          </p>

          <div className="flex w-full items-center justify-center gap-3 sm:w-auto">
            <motion.a
              href="#"
              aria-label="Facebook"
              whileHover={{ y: -3, scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className={socialClass}
            >
              <Facebook size={14} />
            </motion.a>
            <motion.a
              href="#"
              aria-label="Instagram"
              whileHover={{ y: -3, scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className={socialClass}
            >
              <Instagram size={14} />
            </motion.a>
            <motion.a
              href="#"
              aria-label="YouTube"
              whileHover={{ y: -3, scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className={socialClass}
            >
              <Youtube size={14} />
            </motion.a>
            <motion.a
              href="#"
              aria-label="LinkedIn"
              whileHover={{ y: -3, scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className={socialClass}
            >
              <Linkedin size={14} />
            </motion.a>
          </div>

          <div className="flex w-full flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] font-medium tracking-wide text-white/70 sm:w-auto sm:justify-start">
            <Link href="/destinations" className="transition-colors hover:text-[#F4A62A]">Destinations</Link>
            <Link href="/reviews" className="transition-colors hover:text-[#F4A62A]">Reviews</Link>
            <Link href="#" className="transition-colors hover:text-[#F4A62A]">About</Link>
          </div>
        </motion.div>
      </motion.div>

      <div className="border-t border-white/5 bg-black/10 py-5 font-sans">
        <div className="mx-auto flex max-w-[1920px] flex-col items-center justify-between gap-3 px-4 text-center text-[11px] tracking-wide text-white/45 sm:flex-row sm:px-8 sm:text-left md:px-12 lg:px-16 xl:px-24">
          <p>© 2026 TRIP PLAN AI. All rights reserved.</p>
          <p className="font-serif italic">Plan Smarter. Travel Better.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div>
      <h4 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white">
        {title}
      </h4>
      <ul className="mt-4 grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-1">
        {children}
      </ul>
    </div>
  );
}