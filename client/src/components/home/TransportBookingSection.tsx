"use client";

import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { useRef, useState } from "react";
import type { MouseEvent } from "react";

type Transport = {
  name: string;
  logo: string;
  href: string;
};

/* =========================
   BUS TRANSPORT
========================= */

const buses: Transport[] = [
  {
    name: "Shohagh Paribahan",
    logo: "https://shohagh.com/static/media/logo.ff834e7c5592e2a0f5d02eb84356b2fd.svg",
    href: "https://shohagh.com/",
  },
  {
    name: "Ena Paribahan",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPOvX7_dckiEmOr6AaqvTUrN3NaF3eDFGjgquOhy0m9JbpaP5C9RSjdBc&s=10",
    href: "https://www.bookaway.com/suppliers/ena-paribahan",
  },
  {
    name: "Green Line Paribahan",
    logo: "https://greenlinebd.com/wp-content/uploads/2020/08/glp-logo.png",
    href: "https://greenlinebd.com/",
  },
  {
    name: "Hanif Enterprise",
    logo: "https://hanifenterprisebd.com/images/hanif/hanif-logo.png",
    href: "https://hanifenterprisebd.com/",
  },
  {
    name: "Soudia Coach Service",
    logo: "https://www.soudiabus.com/_next/image?url=%2FSoudialogo.png&w=256&q=75",
    href: "https://www.soudiabus.com/",
  },
  {
    name: "Desh Travels",
    logo: "https://static-busbd.bdtickets.com/busbdmedia/company_sunaqo6obybjlswoorz34gdlrs5kirdplo9",
    href: "https://www.deshtravelsbd.com/",
  },
  {
    name: "Saintmartin Paribahan",
    logo: "https://static-busbd.bdtickets.com/busbdmedia/company_gdx3zlllkryn8u2d8r4rqjyzfw1i4ikplan",
    href: "https://www.saintmartinparibahanbd.com/",
  },
  {
    name: "Royal Coach",
    logo: "https://bus-promotion-bucket.s3-ap-southeast-1.amazonaws.com/production/company_subdomain_images/SHOHOZ.COM_TICKET1e75c82d5eb179f8450a22e4b556e441.png",
    href: "https://www.royalcoach-bd.com/",
  },
  {
    name: "Eagle Paribahan",
    logo: "https://www.eagleparibahan.com/images/logo.png",
    href: "https://www.eagleparibahan.com/",
  },
  {
    name: "Unique Service",
    logo: "https://uniqueservice.com.bd/assets/demo/images/login/avatar.png",
    href: "https://uniqueservice.com.bd/",
  },
  {
    name: "Relax Transport",
    logo: "https://static-busbd.bdtickets.com/busbdmedia/company_n91ese6u1iegtlcv3grx4vqleulv231n38z",
    href: "https://relaxtransport.com/",
  },
];

/* =========================
   AIR TRANSPORT
========================= */

const airlines: Transport[] = [
  {
    name: "Biman Bangladesh Airlines",
    logo: "https://www.logo.wine/a/logo/Biman_Bangladesh_Airlines/Biman_Bangladesh_Airlines-Logo.wine.svg",
    href: "https://www.biman-airlines.com/",
  },
  {
    name: "US-Bangla Airlines",
    logo: "https://cdn.usbair.com/website/public/images/home_page/homepage_logo.png.svg",
    href: "https://www.us-bangla.com/book-a-flight",
  },
  {
    name: "NOVOAIR",
    logo: "https://www.flynovoair.com/assets/images/logo-novoair2.png",
    href: "https://www.flynovoair.com/",
  },
  {
    name: "Air Astra",
    logo: "https://airastra.com/themes/airastra/logo.svg",
    href: "https://airastra.com/",
  },
  {
    name: "Emirates",
    logo: "/transport/air/emirates.png",
    href: "https://www.emirates.com/bd/english/",
  },
  {
    name: "Qatar Airways",
    logo: "https://dmassets.qatarairways.com/adobe/assets/urn:aaid:aem:3dee91a6-4fa3-4b4a-9f23-73de476b2173/as/hn-europe-city.jpg?quality=95&width=1600",
    href: "https://www.qatarairways.com/en-bd/homepage.html",
  },
  {
    name: "Singapore Airlines",
    logo: "https://i.scdn.co/image/ab67616d0000b273a8d6cba9aba57c7a2e75200c",
    href: "https://www.singaporeair.com/",
  },
  {
    name: "Malaysia Airlines",
    logo: "https://www.malaysiaairlines.com/content/dam/mh/my/en/header-footer/mh-logo-light-theme-142x35px.png",
    href: "https://www.malaysiaairlines.com/",
  },
  {
    name: "Turkish Airlines",
    logo: "https://www.evaair.com/nl-nl/images/Turkish_576x324_tcm50-71508.jpg",
    href: "https://www.turkishairlines.com/",
  },
  {
    name: "Air Arabia",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj4FbN10SY9qIK8df8BXv5_efCpggKZOSjS8m3KLyIyNt6xYl9xttuIlg&s=10",
    href: "https://www.airarabia.com/",
  },
];

/* =========================
   DRAG ROW
========================= */

function TransportRow({ items }: { items: Transport[] }) {
  const rowRef = useRef<HTMLDivElement>(null);

  const mouseDown = useRef(false);
  const startX = useRef(0);
  const startScrollLeft = useRef(0);
  const hasDragged = useRef(false);

  const [dragging, setDragging] = useState(false);

  const handleMouseDown = (
    event: MouseEvent<HTMLDivElement>
  ) => {
    if (event.button !== 0) return;

    const row = rowRef.current;

    if (!row) return;

    mouseDown.current = true;
    hasDragged.current = false;

    startX.current = event.pageX;
    startScrollLeft.current = row.scrollLeft;

    setDragging(true);
  };

  const handleMouseMove = (
    event: MouseEvent<HTMLDivElement>
  ) => {
    if (!mouseDown.current) return;

    const row = rowRef.current;

    if (!row) return;

    const distance = event.pageX - startX.current;

    if (Math.abs(distance) > 7) {
      hasDragged.current = true;
    }

    row.scrollLeft =
      startScrollLeft.current - distance;
  };

  const stopDragging = () => {
    mouseDown.current = false;
    setDragging(false);
  };

  return (
    <div
      ref={rowRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={stopDragging}
      onMouseLeave={stopDragging}
      onDragStart={(event) => event.preventDefault()}
      className={`
        flex
        overflow-x-auto
        select-none
        touch-pan-x
        [scrollbar-width:none]
        [&::-webkit-scrollbar]:hidden
        ${dragging ? "cursor-grabbing" : "cursor-grab"}
      `}
    >
      {items.map((item) => (
        <a
          key={item.name}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          draggable={false}
          onClick={(event) => {
            if (hasDragged.current) {
              event.preventDefault();
              event.stopPropagation();

              hasDragged.current = false;
            }
          }}
          className="
            group
            flex
            min-h-[135px]
            w-[340px]
            shrink-0
            items-center
            justify-between
            border-r
            border-[#dfe5eb]
            px-6
            transition-all
            duration-300
            hover:bg-white
            sm:w-[380px]
            sm:px-7
            lg:w-[420px]
          "
        >
          <div className="flex min-w-0 items-center gap-4 sm:gap-5 lg:gap-6">
            {/* BIGGER LOGO */}
            <div
              className="
                flex
                h-[90px]
                w-[120px]
                shrink-0
                items-center
                justify-center
                sm:h-[95px]
                sm:w-[130px]
                lg:h-[100px]
                lg:w-[145px]
              "
            >
              <Image
                src={item.logo}
                alt={`${item.name} logo`}
                width={145}
                height={100}
                draggable={false}
                className="
                  pointer-events-none
                  max-h-[85px]
                  max-w-[120px]
                  object-contain
                  sm:max-h-[90px]
                  sm:max-w-[130px]
                  lg:max-h-[95px]
                  lg:max-w-[145px]
                "
              />
            </div>

            {/* NAME */}
            <h3
              className="
                max-w-[165px]
                text-[16px]
                font-semibold
                leading-[1.25]
                text-[#08264a]
                sm:max-w-[190px]
                sm:text-[17px]
                lg:max-w-[205px]
                lg:text-[18px]
              "
            >
              {item.name}
            </h3>
          </div>

          {/* ARROW */}
          <ChevronRight
            size={24}
            strokeWidth={2}
            className="
              ml-3
              shrink-0
              text-[#a7b2bd]
              transition-all
              duration-300
              group-hover:translate-x-1
              group-hover:text-[#08264a]
            "
          />
        </a>
      ))}
    </div>
  );
}

/* =========================
   MAIN SECTION
========================= */

export default function TransportBookingSection() {
  return (
    <section className="overflow-hidden bg-[#f4f7fa] py-16 md:py-20">
      {/* HEADING */}
      <div className="mx-auto mb-10 max-w-7xl px-5 text-center sm:px-6 lg:px-8">
        <h2
          className="
            text-3xl
            font-bold
            tracking-[-0.03em]
            text-[#08264a]
            sm:text-4xl
            md:text-[42px]
          "
        >
          Travel with trusted operators
        </h2>

        <p
          className="
            mx-auto
            mt-3
            max-w-2xl
            text-[15px]
            leading-7
            text-[#56667a]
            sm:text-base
          "
        >
          Choose your preferred transport operator and continue
          directly to their booking platform.
        </p>
      </div>

      {/* BUS TRANSPORT */}
      <div className="border-y border-[#dde3e9]">
        <div className="mx-auto max-w-[1600px]">
          <div className="flex items-center px-6 pb-3 pt-6 sm:px-8">
            <h3
              className="
                text-[14px]
                font-bold
                uppercase
                tracking-[0.16em]
                text-[#08264a]
              "
            >
              Bus Transport
            </h3>

            <span className="ml-3 text-xs text-[#96a2af]">
              Drag left or right
            </span>
          </div>

          <TransportRow items={buses} />
        </div>
      </div>

      {/* AIR TRANSPORT */}
      <div className="border-b border-[#dde3e9]">
        <div className="mx-auto max-w-[1600px]">
          <div className="flex items-center px-6 pb-3 pt-6 sm:px-8">
            <h3
              className="
                text-[14px]
                font-bold
                uppercase
                tracking-[0.16em]
                text-[#08264a]
              "
            >
              Air Transport
            </h3>

            <span className="ml-3 text-xs text-[#96a2af]">
              Drag left or right
            </span>
          </div>

          <TransportRow items={airlines} />
        </div>
      </div>
    </section>
  );
}