"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, PenLine, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export default function ReviewJourneyCTA() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      className="
        relative
        overflow-hidden
        px-5
        pb-0
        sm:px-8
        lg:px-12
      "
    >
      <div
        className="
          relative
          mx-auto
          max-w-[1440px]
          overflow-hidden
          rounded-t-[18px]
        "
      >
        {/* =====================================================
            BACKGROUND IMAGE
        ====================================================== */}

        <Image
          src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=90"
          alt="Beautiful travel landscape"
          fill
          priority
          sizes="(max-width: 1440px) 100vw, 1440px"
          className="
            object-cover
            object-center
          "
        />

        {/* =====================================================
            DARK GREEN OVERLAY
        ====================================================== */}

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-r
            from-[#032E27]/95
            via-[#063A2F]/88
            to-[#063A2F]/55
          "
        />

        {/* =====================================================
            SOFT GOLD GLOW
        ====================================================== */}

        <motion.div
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  scale: [1, 1.12, 1],
                  opacity: [0.15, 0.25, 0.15],
                }
          }
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            pointer-events-none
            absolute
            -right-24
            -top-24
            h-72
            w-72
            rounded-full
            bg-[#F4A62A]
            opacity-20
            blur-[90px]
          "
        />

        {/* =====================================================
            CONTENT
        ====================================================== */}

        <div
          className="
            relative
            z-10
            flex
            min-h-[175px]
            flex-col
            items-start
            justify-between
            gap-6
            px-6
            py-7
            sm:px-9
            sm:py-8
            lg:flex-row
            lg:items-center
            lg:px-10
          "
        >
          {/* LEFT */}

          <div className="max-w-[590px]">
            {/* Eyebrow */}

            <motion.div
              initial={
                shouldReduceMotion
                  ? false
                  : {
                      opacity: 0,
                      x: -15,
                    }
              }
              whileInView={
                shouldReduceMotion
                  ? undefined
                  : {
                      opacity: 1,
                      x: 0,
                    }
              }
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.5,
              }}
              className="
                mb-2
                flex
                items-center
                gap-1.5
              "
            >
              <Sparkles
                size={13}
                className="text-[#F4B942]"
                fill="currentColor"
              />

              <span
                className="
                  text-[8px]
                  font-bold
                  uppercase
                  tracking-[0.14em]
                  text-[#F4B942]
                "
              >
                Share Your Experience
              </span>
            </motion.div>

            {/* Heading */}

            <motion.h2
              initial={
                shouldReduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 15,
                    }
              }
              whileInView={
                shouldReduceMotion
                  ? undefined
                  : {
                      opacity: 1,
                      y: 0,
                    }
              }
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.55,
                delay: 0.05,
              }}
              className="
                font-serif
                text-[24px]
                font-bold
                leading-[1.1]
                tracking-[-0.02em]
                text-white
                sm:text-[27px]
              "
            >
              Your Journey Could Help
              <br />
              <span className="text-[#F5C56B]">Someone Else.</span>
            </motion.h2>

            {/* Description */}

            <motion.p
              initial={
                shouldReduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 10,
                    }
              }
              whileInView={
                shouldReduceMotion
                  ? undefined
                  : {
                      opacity: 1,
                      y: 0,
                    }
              }
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.5,
                delay: 0.12,
              }}
              className="
                mt-2
                max-w-135
                text-[9px]
                leading-[1.65]
                text-white/70
                sm:text-[10px]
              "
            >
              Share your travel experience and help fellow travelers make better
              decisions. Your honest story could become someone else's perfect
              trip.
            </motion.p>
          </div>

          {/* =================================================
              ACTIONS
          ================================================= */}

          <motion.div
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    x: 20,
                  }
            }
            whileInView={
              shouldReduceMotion
                ? undefined
                : {
                    opacity: 1,
                    x: 0,
                  }
            }
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.55,
              delay: 0.15,
            }}
            className="
              flex
              w-full
              flex-col
              gap-2
              sm:w-auto
              sm:flex-row
            "
          >
            {/* Write Review */}

            <Link href="/reviews/write-review">
              <motion.div
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        y: -3,
                        scale: 1.02,
                      }
                }
                whileTap={
                  shouldReduceMotion
                    ? undefined
                    : {
                        scale: 0.98,
                      }
                }
                className="
                  group
                  flex
                  h-10
                  items-center
                  justify-center
                  gap-2
                  rounded-lg
                  bg-[#F4A62A]
                  px-5
                  text-[9px]
                  font-bold
                  text-[#173329]
                  shadow-[0_7px_18px_rgba(244,166,42,0.22)]
                  transition-colors
                  hover:bg-[#F7B84A]
                "
              >
                <PenLine size={12} />
                Write a Review
                <motion.span
                  whileHover={
                    shouldReduceMotion
                      ? undefined
                      : {
                          x: 3,
                        }
                  }
                >
                  <ArrowRight size={11} />
                </motion.span>
              </motion.div>
            </Link>

            {/* My Reviews */}

            <Link href="/reviews">
              <motion.div
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        y: -3,
                        scale: 1.02,
                        backgroundColor: "rgba(255,255,255,0.08)",
                      }
                }
                whileTap={
                  shouldReduceMotion
                    ? undefined
                    : {
                        scale: 0.98,
                      }
                }
                className="
                  flex
                  h-10
                  items-center
                  justify-center
                  gap-2
                  rounded-lg
                  border
                  border-white/35
                  bg-transparent
                  px-5
                  text-[9px]
                  font-semibold
                  text-white
                  transition-colors
                  hover:border-white/60
                "
              >
                View My Reviews
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
