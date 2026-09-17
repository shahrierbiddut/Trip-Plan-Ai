"use client";

import {
  CalendarDays,
  CheckCircle2,
  Loader2,
  Minus,
  Plus,
  Users,
  X,
} from "lucide-react";

import {
  FormEvent,
  useMemo,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useSession } from "@/lib/auth-client";

type PackageBookingProps = {
  packageId: number;
  packageSlug: string;
  packageTitle: string;
  destination: string;
  duration: string;
  operator: string;
  price: number;
};

type BookingForm = {
  name: string;
  email: string;
  phone: string;
  travelDate: string;
  travellers: number;
  note: string;
};

export default function PackageBooking({
  packageId,
  packageSlug,
  packageTitle,
  destination,
  duration,
  operator,
  price,
}: PackageBookingProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] =
    useState<BookingForm>({
      name: "",
      email: "",
      phone: "",
      travelDate: "",
      travellers: 1,
      note: "",
    });

  /* ============================================================
     TOTAL PRICE
  ============================================================ */

  const totalPrice = useMemo(() => {
    return price * form.travellers;
  }, [price, form.travellers]);

  /* ============================================================
     PRICE FORMAT
  ============================================================ */

  const formatPrice = (
    value: number
  ) =>
    new Intl.NumberFormat(
      "en-BD"
    ).format(value);

  /* ============================================================
     TRAVELLERS
  ============================================================ */

  const changeTravellers = (
    value: number
  ) => {
    setForm((previous) => ({
      ...previous,

      travellers: Math.max(
        1,
        Math.min(
          10,
          previous.travellers + value
        )
      ),
    }));
  };

  /* ============================================================
     SUBMIT BOOKING
  ============================================================ */

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    try {
      setLoading(true);

      const response = await fetch(
        `${(process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/+$/, "")}/api/tour-bookings`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            packageId,
            packageSlug,
            packageTitle,
            destination,
            duration,
            operator,

            unitPrice: price,

            travellers:
              form.travellers,

            totalPrice,

            customer: {
              name: session?.user?.name || form.name,
              email: session?.user?.email || form.email,
              phone: form.phone,
            },

            userId: session?.user?.id,

            travelDate:
              form.travelDate,

            note: form.note,
          }),
        }
      );

      const data =
        await response.json();

      if (
        !response.ok ||
        !data.success
      ) {
        throw new Error(
          data.message ||
            "Booking failed"
        );
      }

      /* ========================================================
         SUCCESS HANDLER (No Payment System Yet)
      ======================================================== */

      setIsSuccess(true);
      toast.success("Booking Request Submitted Successfully!");
      
      // Delay slightly to allow the toast to render and success animation to play before navigating
      setTimeout(() => {
        setForm({ name: "", email: "", phone: "", travelDate: "", travellers: 1, note: "" });
        setOpen(false);
        setIsSuccess(false);
        setLoading(false);
        router.push("/dashboard/my-bookings");
      }, 2500);
      
    } catch (error) {
      console.error(error);
      setLoading(false); // Stop loading on error

      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    }
  };

  return (
    <>
      {/* ========================================================
          REQUEST BUTTON
      ======================================================== */}

      <button
        type="button"
        onClick={() => {
          if (!session?.user) {
            router.push(`/login?redirect=/tour-packages/${packageSlug}`);
            return;
          }
          setForm((prev) => ({
            ...prev,
            name: session.user.name || prev.name,
            email: session.user.email || prev.email,
          }));
          setOpen(true);
        }}
        className="
          mt-7
          w-full
          rounded-full
          bg-[#f1bf62]
          px-5
          py-3.5
          text-sm
          font-bold
          text-[#18352c]
          transition-all
          duration-300
          hover:-translate-y-0.5
          hover:bg-[#ffd17c]
          active:scale-[0.99]
        "
      >
        Request this package
      </button>

      {/* ========================================================
          BOOKING MODAL
      ======================================================== */}

      {open && (
        <div
          className="
            fixed
            inset-0
            z-[200]
            flex
            items-center
            justify-center
            bg-black/50
            px-4
            backdrop-blur-sm
          "
        >
          <div
            className="
              relative
              max-h-[92vh]
              w-full
              max-w-[760px]
              overflow-y-auto
              rounded-[30px]
              bg-[#f8f6f1]
              text-[#17392f]
              shadow-[0_30px_100px_rgba(0,0,0,0.25)]
              transition-all duration-500 overflow-hidden
            "
          >
            {/* ==================================================
                SUCCESS OVERLAY
            ================================================== */}
            {isSuccess && (
              <div className="absolute inset-0 z-50 bg-[#073D31] flex flex-col items-center justify-center text-center px-6 animate-in fade-in duration-500">
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-14 h-14 text-white" />
                </div>
                <h2 className="text-3xl font-serif font-bold text-white mb-2">Booking Confirmed!</h2>
                <p className="text-emerald-100 text-lg">Taking you to payment in a moment...</p>
              </div>
            )}

            {/* ==================================================
                CLOSE BUTTON
            ================================================== */}

            <button
              type="button"
              aria-label="Close booking"
              onClick={() =>
                setOpen(false)
              }
              className="
                absolute
                right-5
                top-5
                z-20
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                bg-white
                text-[#28453c]
                shadow-sm
                transition
                hover:bg-[#ecefe9]
              "
            >
              <X size={19} />
            </button>

            {/* ==================================================
                HEADER
            ================================================== */}

            <div className="border-b border-[#e4e6e0] p-6 sm:p-8">
              <p
                className="
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[0.16em]
                  text-[#a2742d]
                "
              >
                Book your journey
              </p>

              <h2
                className="
                  mt-2
                  pr-12
                  font-serif
                  text-3xl
                  font-semibold
                  text-[#17392f]
                "
              >
                {packageTitle}
              </h2>

              <p className="mt-2 text-sm text-[#78827d]">
                {destination} ·{" "}
                {duration}
              </p>
            </div>

            {/* ==================================================
                FORM
            ================================================== */}

            <form
              onSubmit={handleSubmit}
              className="
                grid
                gap-7
                p-6
                sm:p-8
                lg:grid-cols-[1fr_290px]
              "
            >
              {/* ================================================
                  LEFT SIDE FORM
              ================================================ */}

              <div className="space-y-5">
                {/* FULL NAME */}

                <div>
                  <label
                    htmlFor="booking-name"
                    className="mb-2 block text-sm font-semibold text-[#31453e]"
                  >
                    Full name
                  </label>

                  <input
                    id="booking-name"
                    type="text"
                    required
                    value={form.name}
                    onChange={(
                      event
                    ) =>
                      setForm({
                        ...form,
                        name:
                          event
                            .target
                            .value,
                      })
                    }
                    placeholder="Your full name"
                    className="
                      h-12
                      w-full
                      rounded-xl
                      border
                      border-[#d9dfdb]
                      bg-white
                      px-4
                      text-sm
                      text-[#17392f]
                      caret-[#173d32]
                      outline-none
                      transition
                      placeholder:text-[#9ba5a0]
                      focus:border-[#1c5c49]
                      focus:ring-2
                      focus:ring-[#1c5c49]/10
                    "
                  />
                </div>

                {/* EMAIL + PHONE */}

                <div className="grid gap-4 sm:grid-cols-2">
                  {/* EMAIL */}

                  <div>
                    <label
                      htmlFor="booking-email"
                      className="mb-2 block text-sm font-semibold text-[#31453e]"
                    >
                      Email
                    </label>

                    <input
                      id="booking-email"
                      type="email"
                      required
                      value={
                        form.email
                      }
                      onChange={(
                        event
                      ) =>
                        setForm({
                          ...form,
                          email:
                            event
                              .target
                              .value,
                        })
                      }
                      placeholder="you@email.com"
                      className="
                        h-12
                        w-full
                        rounded-xl
                        border
                        border-[#d9dfdb]
                        bg-white
                        px-4
                        text-sm
                        text-[#17392f]
                        caret-[#173d32]
                        outline-none
                        transition
                        placeholder:text-[#9ba5a0]
                        focus:border-[#1c5c49]
                        focus:ring-2
                        focus:ring-[#1c5c49]/10
                      "
                    />
                  </div>

                  {/* PHONE */}

                  <div>
                    <label
                      htmlFor="booking-phone"
                      className="mb-2 block text-sm font-semibold text-[#31453e]"
                    >
                      Phone
                    </label>

                    <input
                      id="booking-phone"
                      type="tel"
                      required
                      value={
                        form.phone
                      }
                      onChange={(
                        event
                      ) =>
                        setForm({
                          ...form,
                          phone:
                            event
                              .target
                              .value,
                        })
                      }
                      placeholder="01XXXXXXXXX"
                      className="
                        h-12
                        w-full
                        rounded-xl
                        border
                        border-[#d9dfdb]
                        bg-white
                        px-4
                        text-sm
                        text-[#17392f]
                        caret-[#173d32]
                        outline-none
                        transition
                        placeholder:text-[#9ba5a0]
                        focus:border-[#1c5c49]
                        focus:ring-2
                        focus:ring-[#1c5c49]/10
                      "
                    />
                  </div>
                </div>

                {/* ==============================================
                    TRAVEL DATE
                ============================================== */}

                <div>
                  <label
                    htmlFor="booking-date"
                    className="mb-2 block text-sm font-semibold text-[#31453e]"
                  >
                    Travel date
                  </label>

                  <div className="relative">
                    <CalendarDays
                      size={17}
                      className="
                        pointer-events-none
                        absolute
                        left-4
                        top-1/2
                        -translate-y-1/2
                        text-[#76847e]
                      "
                    />

                    <input
                      id="booking-date"
                      type="date"
                      required
                      value={
                        form.travelDate
                      }
                      onChange={(
                        event
                      ) =>
                        setForm({
                          ...form,

                          travelDate:
                            event
                              .target
                              .value,
                        })
                      }
                      className="
                        h-12
                        w-full
                        rounded-xl
                        border
                        border-[#d9dfdb]
                        bg-white
                        pl-11
                        pr-4
                        text-sm
                        text-[#17392f]
                        caret-[#173d32]
                        outline-none
                        transition
                        focus:border-[#1c5c49]
                        focus:ring-2
                        focus:ring-[#1c5c49]/10
                      "
                    />
                  </div>
                </div>

                {/* ==============================================
                    TRAVELLERS
                ============================================== */}

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#31453e]">
                    Travellers
                  </label>

                  <div
                    className="
                      flex
                      h-12
                      items-center
                      justify-between
                      rounded-xl
                      border
                      border-[#d9dfdb]
                      bg-white
                      px-3
                      text-[#17392f]
                    "
                  >
                    <div className="flex items-center gap-2 text-sm text-[#52625c]">
                      <Users
                        size={17}
                      />

                      Number of
                      travellers
                    </div>

                    <div className="flex items-center gap-3">
                      {/* MINUS */}

                      <button
                        type="button"
                        aria-label="Decrease travellers"
                        onClick={() =>
                          changeTravellers(
                            -1
                          )
                        }
                        disabled={
                          form.travellers <=
                          1
                        }
                        className="
                          flex
                          h-8
                          w-8
                          items-center
                          justify-center
                          rounded-full
                          bg-[#edf1ee]
                          text-[#52625c]
                          transition
                          hover:bg-[#dfe7e2]
                          disabled:cursor-not-allowed
                          disabled:opacity-40
                        "
                      >
                        <Minus
                          size={14}
                        />
                      </button>

                      {/* COUNT */}

                      <strong className="w-5 text-center text-[#17392f]">
                        {
                          form.travellers
                        }
                      </strong>

                      {/* PLUS */}

                      <button
                        type="button"
                        aria-label="Increase travellers"
                        onClick={() =>
                          changeTravellers(
                            1
                          )
                        }
                        disabled={
                          form.travellers >=
                          10
                        }
                        className="
                          flex
                          h-8
                          w-8
                          items-center
                          justify-center
                          rounded-full
                          bg-[#173d32]
                          text-white
                          transition
                          hover:bg-[#225548]
                          disabled:cursor-not-allowed
                          disabled:opacity-40
                        "
                      >
                        <Plus
                          size={14}
                        />
                      </button>
                    </div>
                  </div>
                </div>

                {/* ==============================================
                    SPECIAL REQUEST
                ============================================== */}

                <div>
                  <label
                    htmlFor="booking-note"
                    className="mb-2 block text-sm font-semibold text-[#31453e]"
                  >
                    Special request
                  </label>

                  <textarea
                    id="booking-note"
                    rows={4}
                    value={form.note}
                    onChange={(
                      event
                    ) =>
                      setForm({
                        ...form,

                        note:
                          event
                            .target
                            .value,
                      })
                    }
                    placeholder="Pickup, child, senior traveller or other request..."
                    className="
                      w-full
                      resize-none
                      rounded-xl
                      border
                      border-[#d9dfdb]
                      bg-white
                      p-4
                      text-sm
                      text-[#17392f]
                      caret-[#173d32]
                      outline-none
                      transition
                      placeholder:text-[#9ba5a0]
                      focus:border-[#1c5c49]
                      focus:ring-2
                      focus:ring-[#1c5c49]/10
                    "
                  />
                </div>
              </div>

              {/* ================================================
                  BOOKING SUMMARY
              ================================================ */}

              <aside
                className="
                  h-fit
                  rounded-[24px]
                  bg-[#173d32]
                  p-5
                  text-white
                "
              >
                <p
                  className="
                    text-[11px]
                    font-semibold
                    uppercase
                    tracking-[0.14em]
                    text-white/45
                  "
                >
                  Booking summary
                </p>

                <h3 className="mt-3 text-lg font-semibold text-white">
                  {packageTitle}
                </h3>

                <div className="my-5 h-px bg-white/10" />

                {/* PACKAGE PRICE */}

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between gap-4">
                    <span className="text-white/55">
                      Package
                    </span>

                    <span className="font-medium text-white">
                      ৳
                      {formatPrice(
                        price
                      )}
                    </span>
                  </div>

                  {/* TRAVELLERS */}

                  <div className="flex justify-between gap-4">
                    <span className="text-white/55">
                      Travellers
                    </span>

                    <span className="font-medium text-white">
                      ×{" "}
                      {
                        form.travellers
                      }
                    </span>
                  </div>
                </div>

                <div className="my-5 h-px bg-white/10" />

                {/* TOTAL */}

                <div className="flex items-end justify-between">
                  <span className="text-sm text-white/60">
                    Total
                  </span>

                  <strong className="text-2xl text-white">
                    ৳
                    {formatPrice(
                      totalPrice
                    )}
                  </strong>
                </div>

                {/* ==============================================
                    CONTINUE PAYMENT
                ============================================== */}

                <button
                  type="submit"
                  disabled={loading}
                  className="
                    mt-6
                    flex
                    h-12
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-full
                    bg-[#f2c15f]
                    text-sm
                    font-bold
                    text-[#17382f]
                    transition
                    hover:bg-[#ffd377]
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                >
                  {loading ? (
                    <>
                      <Loader2
                        size={17}
                        className="animate-spin"
                      />

                      Processing...
                    </>
                  ) : (
                    <>
                      Continue to
                      payment

                      <ArrowPayment />
                    </>
                  )}
                </button>

                {/* SECURITY INFO */}

                <div className="mt-5 flex items-start gap-2 text-[11px] leading-5 text-white/45">
                  <CheckCircle2
                    size={14}
                    className="mt-0.5 shrink-0"
                  />

                  <span>
                    Secure booking.
                    Your reservation is
                    confirmed after
                    successful payment.
                  </span>
                </div>
              </aside>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

/* ============================================================
   PAYMENT ARROW
============================================================ */

function ArrowPayment() {
  return (
    <span className="text-lg leading-none">
      →
    </span>
  );
}