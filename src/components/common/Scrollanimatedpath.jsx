"use client";

/**
 * ScrollAnimatedPath.jsx
 * -----------------------------------------------------------------------
 * Next.js (App Router) client component.
 * Draws the decorative "spine" path from the artwork as the user scrolls,
 * while keeping every other decorative motif (compass, leaf, flower,
 * footprints) visible as static line art. Built mobile-first.
 *
 * Install:
 *   npm install gsap
 *
 * Usage (e.g. app/page.js):
 *   import ScrollAnimatedPath from "@/components/ScrollAnimatedPath";
 *   export default function Page() {
 *     return <ScrollAnimatedPath />;
 *   }
 *
 * How the draw-on-scroll effect works (no paid GSAP plugin needed):
 *   1. We measure the spine path's real length with path.getTotalLength().
 *   2. We set stroke-dasharray to that length and stroke-dashoffset to the
 *      same value, which visually "hides" the whole stroke.
 *   3. ScrollTrigger scrubs stroke-dashoffset from length -> 0 as the user
 *      scrolls through the section, which "draws" the line in sync with
 *      scroll position.
 * -----------------------------------------------------------------------
 */

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/* -------------------------------------------------------------------- */
/* Modal component                                                       */
/* -------------------------------------------------------------------- */
function EventModal({ day, onClose }) {
  if (!day) return null;

  return (
    // Backdrop — covers the whole screen, blurs everything behind it
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40 backdrop-blur-sm"
      onClick={onClose} // click outside the card closes the modal
    >
      {/* Card — stop propagation so clicks inside don't close it */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md max-h-[85vh] overflow-y-auto  bg-[#D25F28] border border-[#F1E2C6]/40 text-[#F1E2C6] p-6 shadow-2xl"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full border border-[#F1E2C6] text-[#F1E2C6] hover:bg-[#F1E2C6] hover:text-[#D25F28] transition-colors duration-200"
        >
          ×
        </button>

        <h2 className="Font_CV text-[1.4rem] leading-[1.4rem] mb-6 pr-8">
          {day.day}
        </h2>

        <div className="flex flex-col gap-6">
          {day.events.map((event, idx) => (
            <div
              key={idx}
              className="border-t border-[#F1E2C6]/30 pt-4 first:border-t-0 first:pt-0"
            >
              <p className="uppercase tracking-[0.15em] text-[0.75rem] mb-1 opacity-80">
                {event.title}
              </p>
              <h3 className="Font_CV text-[1.15rem] mb-3">{event.name}</h3>

              <dl className="space-y-1 text-[0.9rem]">
                <div className="flex gap-2">
                  <dt className="opacity-70 min-w-[70px]">Time</dt>
                  <dd>{event.time}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="opacity-70 min-w-[70px]">Location</dt>
                  <dd>{event.location}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="opacity-70 min-w-[70px]">Dress</dt>
                  <dd>{event.dress}</dd>
                </div>
              </dl>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ScrollAnimatedPath() {
  const containerRef = useRef(null);
  const pathRef = useRef(null);
  const [selectedDay, setSelectedDay] = useState(null); // ✅ moved here

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const path = pathRef.current;
    const container = containerRef.current;
    if (!path || !container) return;

    const ctx = gsap.context(() => {
      const length = path.getTotalLength();

      // Prime the path so it starts fully hidden.
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });

      // Draw the path as the artwork scrolls through the viewport.
      // "top bottom"  -> starts the instant the container's top edge enters the viewport
      // "bottom top"  -> finishes when the container's bottom edge leaves the viewport
      // This works correctly even if the component is the very first thing on the page
      // (unlike "top 85%", which can sit behind an unreachable scroll position at page load).
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          scrub: 1, // smooth scroll-linked scrubbing (1s catch-up); use `true` for 1:1 tracking
          //   markers: true, // uncomment while debugging start/end positions
          invalidateOnRefresh: true,
        },
      });

      // Re-measure length on resize / orientation change (mobile rotation etc.)
      const handleResize = () => {
        const newLength = path.getTotalLength();
        gsap.set(path, { strokeDasharray: newLength });
        ScrollTrigger.refresh();
      };
      window.addEventListener("resize", handleResize);

      // Fonts/images loading after mount can change page height and throw off
      // ScrollTrigger's cached start/end positions — refresh once everything has settled.
      window.addEventListener("load", () => ScrollTrigger.refresh());

      return () => window.removeEventListener("resize", handleResize);
    }, container);

    // Give the browser a frame to finish layout, then recalc positions —
    // guards against ScrollTrigger measuring before web fonts/images settle.
    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => ctx.revert();
  }, []);

  // Lock body scroll while the modal is open
  useEffect(() => {
    document.body.style.overflow = selectedDay ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedDay]);

  const itineraryDays = [
    {
      day: "DAY 1: 20 OCTOBER, 2026",
      events: [
        {
          title: "AZUL",
          name: "Welcome Dinner",
          time: "19:00",
          location: "Secret Location",
          dress: "__",
        },
      ],
    },
    {
      day: "DAY 2: 21 OCTOBER, 2026",
      events: [
        {
          title: "HERE COMES THE SUN",
          name: "Haldi Ceremony",
          time: "13:00",
          location: "Main Pool, The Oberoi",
          dress: "__",
        },
        {
          title: "NAMASTE MARRAKECH",
          name: "Sangeet",
          time: "19:30",
          location: "The Oberoi",
          dress: "__",
        },
      ],
    },
    {
      day: "DAY 3: 22 OCTOBER, 2026",
      events: [
        {
          title: "DILWALE DULHANIA LE JAAYENGE",
          name: "Baraat",
          time: "12:00",
          location: "Olive tree driveway, The Oberoi",
          dress: "__",
        },
      ],
    },
    {
      day: "DAY 3: 22 OCTOBER, 2026",
      events: [
        {
          title: "DILWALE DULHANIA LE JAAYENGE",
          name: "Baraat",
          time: "12:00",
          location: "Olive tree driveway, The Oberoi",
          dress: "__",
        },
      ],
    },
    {
      day: "DAY 3: 22 OCTOBER, 2026",
      events: [
        {
          title: "PYAAR DOSTI HAI",
          name: "Wedding Ceremony",
          time: "15:00",
          location: "The Patio, The Oberoi",
          dress: "__",
        },
        {
          title: "DESTINATION: FOREVER",
          name: "Reception",
          time: "19:00",
          location: "Grand Canal, The Oberoi",
          dress: "__",
        },
        {
          title: "DRUNK IN LOVE",
          name: "After Party",
          time: "22:00 till late",
          location: "The Oberoi",
          dress: "__",
        },
      ],
    },
  ];

  // top offsets + alignment for each day section (mirrors your original layout)
  const positions = [
    { top: "10%", align: "items-end", textAlign: "text-right" },
    { top: "29%", align: "items-start", textAlign: "text-left" },
    { top: "45%", align: "items-end", textAlign: "text-right" },
    { top: "62%", align: "items-start", textAlign: "text-left" },
    { top: "80%", align: "items-end", textAlign: "text-right" },
  ];

  return (
    <div className="bg-[#D25F28] text-[#F1E2C6]">
      <div className="row title  max-sm:pt-[10vh]">
        <div className="mx-auto flex flex-col gap-10 justify-center max-sm:text-center items-center">
          <h3 className="text-[5rem] font-semibold leading-none  Font_CV mx-auto uppercase max-sm:text-[3.5rem]!">
            Wedding itinerary
          </h3>

          <p className="max-w-[800px] capitalize! tracking-tight text-[#F1E2C6] text-[0.9rem] leading-[1.1rem] max-sm:px-6">
            We've thoughtfully planned each moment of our special day. Please
            find the itinerary below and join us in celebrating every chapter of
            our wedding journey. Join us as we celebrate our wedding day with
            love, laughter, and unforgettable moments. Below is a schedule of
            the day's events to help you enjoy every special moment with us.
          </p>
        </div>
      </div>

      <div
        ref={containerRef}
        className="relative w-full min-h-[150vh] bg-[#D25F28] flex items-start justify-center overflow-hidden px-4 py-8"
      >
        <svg
          viewBox="0 0 402 1211"
          className="w-full max-w-[420px] h-auto"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="402" height="1211" fill="#D25F28" />
          <path
            ref={pathRef}
            id="spine-path"
            d="M382 60H129.055C68.8256 60 20 108.826 20 169.055C20 229.284 68.8256 278.11 129.055 278.11H273.055C333.224 278.11 382 326.886 382 387.055C382 447.224 333.224 496 273.055 496H129C68.801 496 20 544.801 20 605C20 665.199 68.801 714 129 714H273C333.199 714 382 762.801 382 823C382 883.199 333.199 932 273 932H129C68.801 932 20 980.801 20 1041C20 1101.2 68.801 1150 129 1150H382"
            stroke="#F0E2C6"
            strokeWidth="2"
            fill="none"
          />
          <g clipPath="url(#clip0_2576_788)">
            <path
              d="M87.6993 186.292L86.7186 181.866L82.8946 184.3L76.6997 184.372L76.7711 178.177L79.2051 174.353L74.7794 173.372L70.3483 169.04L74.7794 164.71L79.2051 163.727L76.7711 159.906L76.6997 153.711L82.8946 153.779L86.7186 156.216L87.6993 151.791L92.0316 147.359L96.3611 151.791L97.3419 156.216L101.166 153.779L107.361 153.711L107.292 159.906L104.855 163.727L109.281 164.71L113.712 169.04L109.281 173.372L104.855 174.353L107.292 178.177L107.361 184.372L101.166 184.3L97.3419 181.866L96.3611 186.292L92.0316 190.723L87.6993 186.292Z"
              stroke="#F0E2C6"
              strokeWidth="1.2"
              strokeMiterlimit="10"
            />
            <path
              d="M82.5264 191.986L65.8786 195.192L69.0845 178.544L55.0465 169.039L69.0845 159.536L65.8786 142.889L82.5264 146.095L92.0315 132.057L101.534 146.095L118.182 142.889L114.976 159.536L129.014 169.039L114.976 178.544L118.182 195.192L101.534 191.986L92.0315 206.024L82.5264 191.986Z"
              stroke="#F0E2C6"
              strokeWidth="1.2"
              strokeMiterlimit="10"
            />
            <path
              d="M84.6224 186.926L71.6448 189.426L74.1448 176.449L63.2001 169.04L74.1448 161.633L71.6448 148.656L84.6224 151.156L92.0315 140.211L99.4379 151.156L112.415 148.656L109.916 161.633L120.86 169.04L109.916 176.449L112.415 189.426L99.4379 186.926L92.0315 197.868L84.6224 186.926Z"
              stroke="#F0E2C6"
              strokeWidth="1.2"
              strokeMiterlimit="10"
            />
            <path
              d="M99.7977 172.256L104.548 169.04L99.7977 165.823L100.883 160.188L95.2484 161.273L92.0315 156.523L88.8146 161.273L83.1774 160.188L84.2653 165.823L79.5127 169.04L84.2653 172.256L83.1774 177.891L88.8146 176.806L92.0315 181.558L95.2484 176.806L100.883 177.891L99.7977 172.256Z"
              stroke="#F0E2C6"
              strokeWidth="1.2"
              strokeMiterlimit="10"
            />
            <path
              d="M92.0315 130.186C92.5974 130.186 93.0562 129.727 93.0562 129.161C93.0562 128.595 92.5974 128.137 92.0315 128.137C91.4656 128.137 91.0068 128.595 91.0068 129.161C91.0068 129.727 91.4656 130.186 92.0315 130.186Z"
              stroke="#F0E2C6"
              strokeWidth="1.2"
              strokeMiterlimit="10"
            />
            <path
              d="M120.193 141.878C120.759 141.878 121.217 141.419 121.217 140.853C121.217 140.287 120.759 139.828 120.193 139.828C119.627 139.828 119.168 140.287 119.168 140.853C119.168 141.419 119.627 141.878 120.193 141.878Z"
              stroke="#F0E2C6"
              strokeWidth="1.2"
              strokeMiterlimit="10"
            />
            <path
              d="M131.835 170.055C132.401 170.055 132.86 169.596 132.86 169.031C132.86 168.465 132.401 168.006 131.835 168.006C131.269 168.006 130.811 168.465 130.811 169.031C130.811 169.596 131.269 170.055 131.835 170.055Z"
              stroke="#F0E2C6"
              strokeWidth="1.2"
              strokeMiterlimit="10"
            />
            <path
              d="M120.146 198.217C120.712 198.217 121.171 197.759 121.171 197.193C121.171 196.627 120.712 196.168 120.146 196.168C119.58 196.168 119.121 196.627 119.121 197.193C119.121 197.759 119.58 198.217 120.146 198.217Z"
              stroke="#F0E2C6"
              strokeWidth="1.2"
              strokeMiterlimit="10"
            />
            <path
              d="M91.9684 209.86C92.5343 209.86 92.9931 209.401 92.9931 208.835C92.9931 208.269 92.5343 207.811 91.9684 207.811C91.4025 207.811 90.9437 208.269 90.9437 208.835C90.9437 209.401 91.4025 209.86 91.9684 209.86Z"
              stroke="#F0E2C6"
              strokeWidth="1.2"
              strokeMiterlimit="10"
            />
            <path
              d="M63.8073 198.17C64.3732 198.17 64.832 197.712 64.832 197.146C64.832 196.58 64.3732 196.121 63.8073 196.121C63.2414 196.121 62.7826 196.58 62.7826 197.146C62.7826 197.712 63.2414 198.17 63.8073 198.17Z"
              stroke="#F0E2C6"
              strokeWidth="1.2"
              strokeMiterlimit="10"
            />
            <path
              d="M52.162 169.993C52.7279 169.993 53.1867 169.534 53.1867 168.968C53.1867 168.402 52.7279 167.943 52.162 167.943C51.5961 167.943 51.1373 168.402 51.1373 168.968C51.1373 169.534 51.5961 169.993 52.162 169.993Z"
              stroke="#F0E2C6"
              strokeWidth="1.2"
              strokeMiterlimit="10"
            />
            <path
              d="M63.8539 141.831C64.4198 141.831 64.8786 141.372 64.8786 140.806C64.8786 140.24 64.4198 139.781 63.8539 139.781C63.288 139.781 62.8292 140.24 62.8292 140.806C62.8292 141.372 63.288 141.831 63.8539 141.831Z"
              stroke="#F0E2C6"
              strokeWidth="1.2"
              strokeMiterlimit="10"
            />
          </g>
          <g clipPath="url(#clip1_2576_788)">
            <path
              d="M291.309 380.879C289.901 384.917 290.614 389.378 291.75 393.503C292.886 397.627 294.434 401.694 294.683 405.964C294.886 409.452 293.922 413.387 290.923 415.191C288.015 416.941 284.08 416.019 281.476 413.847C278.871 411.672 277.337 408.507 276.041 405.376C274.744 402.245 273.585 398.991 271.49 396.325C274.905 396.383 278.408 396.457 281.581 397.715C286.324 399.596 289.855 404.209 290.425 409.266"
              stroke="#F0E2C6"
              strokeWidth="1.2"
              strokeMiterlimit="10"
            />
            <path
              d="M277.901 401.199C280.929 405.041 284.818 408.203 289.2 410.39C291.735 411.654 294.532 412.67 296.372 414.819C297.665 416.332 298.358 418.287 298.613 420.256C298.867 422.226 298.71 424.229 298.464 426.201C298.077 429.327 296.415 432.278 293.936 434.233C291.461 436.188 288.198 437.127 285.059 436.787C283.871 436.659 282.626 436.311 281.839 435.414C280.763 434.187 280.892 432.215 281.825 430.874C282.755 429.532 284.312 428.744 285.891 428.328C289.603 427.343 293.765 428.205 296.775 430.585C298.956 432.309 300.791 434.878 303.552 435.195C305.238 435.389 307.004 434.581 307.957 433.18C308.91 431.778 309.007 429.846 308.203 428.353"
              stroke="#F0E2C6"
              strokeWidth="1.2"
              strokeMiterlimit="10"
            />
            <path
              d="M318.755 389.619C315.215 388.686 311.302 390.047 308.701 392.613C306.099 395.179 304.714 398.798 304.345 402.431C303.976 406.064 304.554 409.729 305.427 413.277C305.207 410.822 306.746 408.273 309.013 407.283C311.151 406.35 313.638 406.746 315.85 407.483C318.062 408.219 320.18 409.289 322.478 409.695C321.694 410.834 320.555 411.587 319.771 412.726C318.692 414.29 317.579 415.891 316.005 416.958C313.446 418.691 309.817 418.62 307.284 416.879"
              stroke="#F0E2C6"
              strokeWidth="1.2"
              strokeMiterlimit="10"
            />
            <path
              d="M316.94 411.32C312.647 410.821 308.36 413.812 306.852 417.85C305.344 421.889 306.414 426.633 309.084 430.02C311.755 433.408 315.841 435.512 320.086 436.328C324.33 437.144 328.729 436.759 332.95 435.837C336.576 435.047 340.145 433.848 343.313 431.918C346.481 429.989 349.237 427.292 350.877 423.973"
              stroke="#F0E2C6"
              strokeWidth="1.2"
              strokeMiterlimit="10"
            />
            <path
              d="M284.953 356.228C282.171 356.083 279.761 354.068 278.388 351.65C277.014 349.233 276.49 346.441 275.989 343.707C277.807 344.737 280.005 345.051 281.999 345.676C283.994 346.301 286.015 347.146 287.385 348.719C288.756 350.291 289.291 352.76 288.118 354.487"
              stroke="#F0E2C6"
              strokeWidth="1.2"
              strokeMiterlimit="10"
            />
            <path
              d="M293.733 352.971C292.173 353.057 290.734 351.909 290.107 350.482C289.48 349.055 289.54 347.417 289.852 345.89C290.482 342.819 292.059 340.036 293.613 337.311C294.323 338.852 295.339 340.122 296.263 341.543C297.187 342.965 298.052 344.457 298.464 346.104C298.876 347.751 298.784 349.58 297.886 351.019C296.987 352.457 295.433 352.877 293.736 352.971H293.733Z"
              stroke="#F0E2C6"
              strokeWidth="1.2"
              strokeMiterlimit="10"
            />
            <path
              d="M299.314 353.971C298.181 353.919 297.167 353.092 296.721 352.05C296.274 351.008 296.34 349.801 296.715 348.731C297.09 347.66 297.748 346.716 298.472 345.845C300.378 343.556 302.754 341.709 305.112 339.883C305.713 341.844 306.111 343.767 306.237 345.817C306.363 347.863 305.962 350.012 304.726 351.648C303.489 353.283 301.369 354.065 299.314 353.971Z"
              stroke="#F0E2C6"
              strokeWidth="1.2"
              strokeMiterlimit="10"
            />
            <path
              d="M301.912 353.573C301.666 351.732 302.728 349.896 304.216 348.778C305.704 347.659 307.559 347.148 309.391 346.805C311.222 346.463 313.091 346.272 314.863 345.689C314.491 348.261 314.21 351.067 312.776 353.236C311.342 355.405 308.575 356.932 306.105 356.101"
              stroke="#F0E2C6"
              strokeWidth="1.2"
              strokeMiterlimit="10"
            />
            <path
              d="M306.025 357.781C306.091 356.189 306.921 354.693 308.254 353.811C309.894 352.726 311.952 352.472 313.921 352.458C315.89 352.444 317.83 352.638 319.754 352.347C319.825 352.335 319.88 352.41 319.845 352.472C318.915 354.205 317.739 355.94 316.399 357.364C314.883 358.977 312.856 360.004 310.661 360.324C308.466 360.644 305.908 360.624 306.025 357.781Z"
              stroke="#F0E2C6"
              strokeWidth="1.2"
              strokeMiterlimit="10"
            />
            <path
              d="M307.021 361.683C306.949 359.993 308.266 358.472 309.843 357.844C311.42 357.216 313.188 357.313 314.863 357.59C317.415 358.012 319.882 358.826 322.338 359.636C320.346 361.686 317.859 363.107 315.177 364.106C313.609 364.688 311.889 365.071 310.269 364.66C308.649 364.249 307.095 363.35 307.024 361.683H307.021Z"
              stroke="#F0E2C6"
              strokeWidth="1.2"
              strokeMiterlimit="10"
            />
            <path
              d="M317.352 363.104C319.107 363.786 320.864 364.468 322.618 365.147C321.342 366.979 319.296 368.264 317.221 369.094C315.146 369.925 312.822 370.133 310.633 369.685C309.685 369.491 308.741 369.169 307.977 368.575C307.213 367.981 306.64 367.091 306.6 366.126C306.56 365.161 307.133 364.157 308.048 363.84"
              stroke="#F0E2C6"
              strokeWidth="1.2"
              strokeMiterlimit="10"
            />
            <path
              d="M315.472 369.657L319.356 373.598C315.558 375.81 310.258 375.074 306.858 372.291C306.122 371.689 305.441 370.941 305.247 370.013C305.052 369.086 305.513 367.973 306.429 367.719"
              stroke="#F0E2C6"
              strokeWidth="1.2"
              strokeMiterlimit="10"
            />
            <path
              d="M309.894 369.434C310.827 369.805 311.308 370.821 311.646 371.765C312.524 374.214 313.042 376.772 313.558 379.32C311.053 379.38 308.586 378.498 306.54 377.06"
              stroke="#F0E2C6"
              strokeWidth="1.2"
              strokeMiterlimit="10"
            />
            <path
              d="M300.959 370.853C302.843 370.642 304.711 371.798 305.684 373.419C306.658 375.04 306.841 377.038 306.569 378.907C306.294 380.777 305.599 382.555 304.906 384.316C302.697 382.663 300.782 380.848 298.804 378.922"
              stroke="#F0E2C6"
              strokeWidth="1.2"
              strokeMiterlimit="10"
            />
            <path
              d="M284.223 346.342C284.378 343.773 284.529 341.202 284.684 338.633C286.721 340.471 288.441 342.554 290.179 344.678"
              stroke="#F0E2C6"
              strokeWidth="1.2"
              strokeMiterlimit="10"
            />
            <path
              d="M277.472 349.806L268.88 349.432C270.111 351.604 271.565 353.798 273.227 355.659C274.89 357.523 277.028 359.059 279.478 359.564C280.52 359.778 281.642 359.795 282.615 359.364C283.588 358.933 284.375 357.988 284.395 356.927"
              stroke="#F0E2C6"
              strokeWidth="1.2"
              strokeMiterlimit="10"
            />
            <path
              d="M282.869 363.108C282.583 361.125 280.683 359.661 278.702 359.327C276.722 358.993 274.699 359.575 272.847 360.354C270.995 361.133 269.218 362.115 267.283 362.646C268.966 364.239 270.617 365.823 272.658 366.919C274.699 368.017 277.145 368.56 279.361 367.88C281.576 367.201 283.201 365.395 282.869 363.106V363.108Z"
              stroke="#F0E2C6"
              strokeWidth="1.2"
              strokeMiterlimit="10"
            />
            <path
              d="M282.964 365.686C284.512 366.205 285.185 368.22 284.609 369.747C284.034 371.274 282.537 372.296 280.969 372.761C279.401 373.226 277.744 373.235 276.11 373.326C274.475 373.417 272.921 373.594 271.528 374.314C271.47 374.342 271.405 374.291 271.425 374.228C272.189 371.97 273.23 369.57 274.65 367.666"
              stroke="#F0E2C6"
              strokeWidth="1.2"
              strokeMiterlimit="10"
            />
            <path
              d="M285.001 369.193C286.627 368.714 288.416 370.001 288.842 371.639C289.269 373.275 288.57 375.044 287.428 376.294C286.286 377.544 284.755 378.361 283.23 379.097C281.705 379.833 280.13 380.518 278.811 381.58C279.309 378.703 279.773 375.749 280.271 372.872"
              stroke="#F0E2C6"
              strokeWidth="1.2"
              strokeMiterlimit="10"
            />
            <path
              d="M292.44 372.143C290.651 370.904 288.049 371.309 286.398 372.725C284.747 374.14 283.948 376.347 283.794 378.513C283.639 380.679 284.057 382.84 284.472 384.972C287.056 383.73 289.246 381.538 290.754 379.107"
              stroke="#F0E2C6"
              strokeWidth="1.2"
              strokeMiterlimit="10"
            />
            <path
              d="M294.875 371.948C292.872 371.599 290.94 373.306 290.448 375.273C289.955 377.239 290.579 379.32 291.478 381.138C292.377 382.956 293.559 384.64 294.288 386.532C294.795 385.022 295.862 383.735 296.775 382.428C297.688 381.121 298.61 379.794 299.122 378.289C299.634 376.785 299.689 375.047 298.899 373.666C298.109 372.284 296.369 371.391 294.875 371.95V371.948Z"
              stroke="#F0E2C6"
              strokeWidth="1.2"
              strokeMiterlimit="10"
            />
            <path
              d="M284.452 356.868C285.534 354.836 288.009 354.005 290.287 353.643C293.487 353.135 296.844 353.203 299.866 354.368C302.888 355.532 305.536 357.898 306.552 360.966C307.568 364.035 306.703 367.762 304.128 369.723C302.159 371.221 299.566 371.547 297.104 371.821C294.191 372.146 291.057 371.815 288.421 370.536C285.786 369.258 283.633 366.883 282.932 364.046C282.231 361.209 283.075 359.448 284.452 356.868Z"
              stroke="#F0E2C6"
              strokeWidth="1.2"
              strokeMiterlimit="10"
            />
            <path
              d="M326.027 392.545C325.217 390.976 324.834 389.135 325.237 387.414C325.641 385.693 326.92 384.137 328.623 383.652C330.998 382.976 333.502 384.465 335.042 386.389C336.187 387.819 337.005 389.56 337.085 391.39C337.166 393.219 336.427 395.123 334.959 396.222C331.396 398.89 327.632 395.656 326.024 392.545H326.027Z"
              stroke="#F0E2C6"
              strokeWidth="1.2"
              strokeMiterlimit="10"
            />
            <path
              d="M328.105 395.955C326.991 397.177 326.47 398.915 326.731 400.545C327.094 402.825 328.846 404.703 329.215 406.981C330.048 406.11 330.74 405.051 331.384 404.035C332.028 403.019 332.469 401.837 332.423 400.636C332.372 399.306 331.722 398.044 330.809 397.071"
              stroke="#F0E2C6"
              strokeWidth="1.2"
              strokeMiterlimit="10"
            />
            <path
              d="M331.47 397.316C330.474 398.161 330.242 399.66 330.595 400.915C330.947 402.171 331.774 403.236 332.635 404.218C333.496 405.199 334.418 406.153 335.019 407.312C335.855 405.551 336.416 403.558 336.55 401.615"
              stroke="#F0E2C6"
              strokeWidth="1.2"
              strokeMiterlimit="10"
            />
            <path
              d="M334.962 396.226C334.169 397.185 334.578 398.749 335.142 399.856C335.706 400.964 336.742 401.769 337.852 402.337C338.963 402.905 340.159 403.273 341.315 403.741C341.407 402.388 341.447 400.97 341.272 399.625C341.098 398.281 340.634 396.937 339.738 395.915C338.843 394.893 337.469 394.237 336.121 394.411"
              stroke="#F0E2C6"
              strokeWidth="1.2"
              strokeMiterlimit="10"
            />
            <path
              d="M340.826 397.794C342.637 398.054 344.478 398.103 346.301 397.94C345.797 396.613 345.167 395.286 344.392 394.095C343.616 392.905 342.546 391.855 341.212 391.361C339.879 390.867 338.259 391.004 337.18 391.929"
              stroke="#F0E2C6"
              strokeWidth="1.2"
              strokeMiterlimit="10"
            />
            <path
              d="M337.374 391.758C338.485 393.105 340.568 393.299 342.197 392.663C343.825 392.026 345.093 390.73 346.269 389.44C344.438 388.644 343.201 387.816 341.227 387.508C339.876 387.297 337.706 387.625 336.57 388.387"
              stroke="#F0E2C6"
              strokeWidth="1.2"
              strokeMiterlimit="10"
            />
            <path
              d="M336.593 387.898C339.318 386.759 341.427 384.259 342.082 381.385C340.591 380.891 338.949 381.111 337.538 381.801C336.127 382.492 335.008 383.748 334.487 385.223"
              stroke="#F0E2C6"
              strokeWidth="1.2"
              strokeMiterlimit="10"
            />
            <path
              d="M336.994 382.063C337.457 379.589 337.369 377.012 336.736 374.574C335.093 375.348 333.849 376.715 333.001 378.319C332.154 379.923 331.851 381.804 332.146 383.593"
              stroke="#F0E2C6"
              strokeWidth="1.2"
              strokeMiterlimit="10"
            />
            <path
              d="M327.22 384.213C328.036 383.18 328.176 381.715 327.776 380.462C327.375 379.209 326.488 378.153 325.449 377.346C324.41 376.538 323.216 375.95 322.023 375.391C322.052 376.766 321.886 378.096 321.906 379.472C321.926 380.848 322.198 382.28 323.039 383.368C323.88 384.455 325.932 384.715 327.217 384.213H327.22Z"
              stroke="#F0E2C6"
              strokeWidth="1.2"
              strokeMiterlimit="10"
            />
            <path
              d="M325.289 390.588C324.633 388.939 322.773 388.93 321.528 388.939C320.283 388.947 319.09 389.495 318.117 390.269C317.144 391.042 316.371 392.032 315.655 393.048C316.843 393.751 318.005 394.261 319.324 394.67C320.644 395.078 322.115 395.152 323.38 394.601C324.645 394.05 325.643 392.78 325.609 391.404"
              stroke="#F0E2C6"
              strokeWidth="1.2"
              strokeMiterlimit="10"
            />
            <path
              d="M340.803 384.246C342.111 384.16 343.43 384.232 344.724 384.457C344.123 385.642 343.539 386.832 342.938 388.013"
              stroke="#F0E2C6"
              strokeWidth="1.2"
              strokeMiterlimit="10"
            />
            <path
              d="M330.483 383.484C329.676 383.49 328.932 382.951 328.537 382.248C328.142 381.546 328.053 380.71 328.122 379.908C328.319 377.505 329.776 375.413 331.181 373.449C332.266 374.702 332.83 376.323 333.093 377.956"
              stroke="#F0E2C6"
              strokeWidth="1.2"
              strokeMiterlimit="10"
            />
            <path
              d="M328.989 382.964C329.928 382.565 330.357 381.412 330.225 380.401C330.094 379.391 329.524 378.498 328.943 377.659C327.907 376.163 326.785 374.725 325.586 373.357C325.406 374.508 325.326 375.621 325.148 376.771"
              stroke="#F0E2C6"
              strokeWidth="1.2"
              strokeMiterlimit="10"
            />
            <path
              d="M321.522 379.986C320.315 379.666 319.092 379.401 317.859 379.189C318.257 381.287 318.995 383.274 320.14 385.078C320.792 386.105 321.685 387.138 322.896 387.275C324.21 387.424 325.512 386.239 325.48 384.921"
              stroke="#F0E2C6"
              strokeWidth="1.2"
              strokeMiterlimit="10"
            />
            <path
              d="M318.812 389.307C317.264 388.483 315.884 387.344 314.785 385.98C316.082 384.826 317.816 384.236 319.542 384.027"
              stroke="#F0E2C6"
              strokeWidth="1.2"
              strokeMiterlimit="10"
            />
            <path
              d="M319.834 394.619L317.836 398.241C319.224 398.464 320.684 398.621 322.08 398.45C323.477 398.278 324.879 397.651 325.669 396.492C326.459 395.333 326.456 393.595 325.426 392.639"
              stroke="#F0E2C6"
              strokeWidth="1.2"
              strokeMiterlimit="10"
            />
            <path
              d="M322.959 398.211C322.896 400.157 322.833 402.101 322.77 404.048C324.244 403.514 325.609 402.726 326.963 401.933"
              stroke="#F0E2C6"
              strokeWidth="1.2"
              strokeMiterlimit="10"
            />
          </g>
          <path
            d="M106.138 613.873C110.754 612.369 115.198 610.552 119.55 608.445"
            stroke="#F0E2C6"
            strokeWidth="1.2"
            strokeMiterlimit="10"
          />
          <path
            d="M101.924 569.021C88.0138 569.415 71.6498 574.094 59.959 581.234C57.4451 581.74 55.5962 583.299 54.3731 585.674C53.3848 587.595 51.189 591.296 52.579 602.313C53.5804 610.255 58.4596 615.766 62.7468 618.394C66.3456 620.597 68.5048 618.824 68.5048 618.824C79.6949 619.197 89.5759 618.185 98.6928 615.985"
            stroke="#F0E2C6"
            strokeWidth="1.2"
            strokeMiterlimit="10"
          />
          <path
            d="M92.3089 578.964C88.2042 578.859 84.6732 578.849 79.3272 579.172C73.6813 579.514 63.9021 580.72 58.6943 582.928C58.8247 583.278 58.7621 583.692 58.5326 583.989C58.3031 584.287 57.9172 584.451 57.5469 584.412C56.5402 586.239 55.6249 588.017 54.8895 589.917C54.6131 590.634 54.853 591.419 55.4085 591.95C55.4371 591.979 55.4658 592.008 55.4919 592.039C55.7788 592.396 55.7814 592.951 55.4971 593.311C55.3641 593.481 55.1712 593.601 54.9625 593.658C54.5505 593.77 54.2767 594.161 54.2949 594.589C54.441 598.089 54.8269 601.596 55.9874 604.888C56.0995 605.206 56.4046 605.396 56.741 605.417C57.0123 605.433 57.2809 605.542 57.4791 605.727C57.8076 606.037 57.9276 606.551 57.7711 606.976C57.719 607.114 57.6381 607.242 57.539 607.351C57.187 607.732 57.1244 608.295 57.4113 608.725C58.5769 610.474 59.6566 612.257 60.8353 614.004C61.0648 614.345 61.4742 614.538 61.881 614.476C62.1183 614.439 62.3609 614.457 62.5825 614.549C62.9946 614.718 63.2945 615.172 63.2136 615.61C63.1849 615.761 63.1067 615.902 62.9972 616.011C62.7494 616.259 62.799 616.678 63.0858 616.879C64.6062 617.94 66.4186 618.67 68.2363 618.839"
            stroke="#F0E2C6"
            strokeWidth="1.2"
            strokeMiterlimit="10"
          />
          <path
            d="M99.8115 579.171C98.4842 579.14 97.2663 579.106 96.1267 579.072"
            stroke="#F0E2C6"
            strokeWidth="1.2"
            strokeMiterlimit="10"
          />
          <path
            d="M55.4998 592.115C67.6626 583.562 84.9758 575.277 102.06 570.572"
            stroke="#F0E2C6"
            strokeWidth="1.2"
            strokeMiterlimit="10"
          />
          <path
            d="M97.78 593.852C98.6693 593.904 100.403 594.055 101.293 594.112"
            stroke="#F0E2C6"
            strokeWidth="1.2"
            strokeMiterlimit="10"
          />
          <path
            d="M55.4893 592.959C66.9584 592.813 78.4327 592.993 89.8914 593.499"
            stroke="#F0E2C6"
            strokeWidth="1.2"
            strokeMiterlimit="10"
          />
          <path
            d="M96.5178 582.022C97.6366 581.263 98.7501 580.499 99.861 579.73"
            stroke="#F0E2C6"
            strokeWidth="1.2"
            strokeMiterlimit="10"
          />
          <path
            d="M57.4999 605.79C69.4619 599.289 81.1396 592.261 92.481 584.732"
            stroke="#F0E2C6"
            strokeWidth="1.2"
            strokeMiterlimit="10"
          />
          <path
            d="M103.236 605.704C104.276 605.545 105.314 605.375 106.349 605.195"
            stroke="#F0E2C6"
            strokeWidth="1.2"
            strokeMiterlimit="10"
          />
          <path
            d="M57.5807 606.987C71.1882 608.309 84.9418 608.097 98.5024 606.369"
            stroke="#F0E2C6"
            strokeWidth="1.2"
            strokeMiterlimit="10"
          />
          <path
            d="M62.9919 615.154C72.4087 612.578 81.051 607.805 89.5889 603.074C93.8266 600.728 98.1139 598.343 101.637 595.021"
            stroke="#F0E2C6"
            strokeWidth="1.2"
            strokeMiterlimit="10"
          />
          <path
            d="M104.897 608.65C105.643 608.087 106.357 607.488 107.04 606.844"
            stroke="#F0E2C6"
            strokeWidth="1.2"
            strokeMiterlimit="10"
          />
          <path
            d="M62.9137 615.604C72.1427 617.415 81.7681 617.17 90.8928 614.889C93.013 614.36 95.1227 613.708 97.162 612.9"
            stroke="#F0E2C6"
            strokeWidth="1.2"
            strokeMiterlimit="10"
          />
          <path
            d="M107.051 568.857C106.331 568.898 105.637 568.632 105.095 568.158C105.03 568.101 104.957 568.049 104.884 568.007C104.213 567.624 103.316 567.668 102.696 568.127C102.075 568.586 101.765 569.433 101.955 570.181C102.145 570.929 102.829 571.529 103.595 571.615C104.088 571.669 104.597 571.505 104.983 571.198C105.489 570.793 106.096 570.538 106.746 570.546C107.348 570.551 107.953 570.564 108.54 570.538C108.808 570.525 109.08 570.512 109.33 570.413C109.58 570.314 109.805 570.116 109.862 569.855C109.94 569.498 109.679 569.138 109.351 568.979C109.022 568.82 108.644 568.815 108.279 568.815C107.854 568.815 107.45 568.833 107.051 568.857Z"
            stroke="#F0E2C6"
            strokeWidth="1.2"
            strokeMiterlimit="10"
          />
          <path
            d="M105.043 578.692C104.323 578.718 103.635 578.434 103.105 577.947C103.04 577.887 102.97 577.835 102.899 577.79C102.239 577.391 101.342 577.415 100.709 577.861C100.075 578.306 99.7489 579.146 99.921 579.899C100.093 580.653 100.761 581.268 101.527 581.372C102.02 581.437 102.531 581.289 102.925 580.989C103.442 580.598 104.054 580.355 104.701 580.379C105.304 580.4 105.909 580.426 106.495 580.413C106.764 580.405 107.035 580.4 107.288 580.306C107.541 580.212 107.771 580.019 107.833 579.761C107.919 579.407 107.666 579.042 107.343 578.875C107.019 578.708 106.639 578.695 106.276 578.684C105.851 578.671 105.447 578.684 105.045 578.697L105.043 578.692Z"
            stroke="#F0E2C6"
            strokeWidth="1.2"
            strokeMiterlimit="10"
          />
          <path
            d="M106.352 592.183C105.663 592.402 104.928 592.316 104.284 591.988C104.206 591.948 104.125 591.917 104.041 591.894C103.296 591.688 102.44 591.954 101.953 592.551C101.465 593.148 101.374 594.047 101.744 594.725C102.114 595.402 102.923 595.817 103.687 595.707C104.18 595.64 104.631 595.355 104.928 594.959C105.319 594.443 105.846 594.044 106.474 593.893C107.059 593.75 107.648 593.614 108.211 593.442C108.467 593.364 108.728 593.283 108.944 593.127C109.161 592.97 109.33 592.723 109.322 592.454C109.309 592.089 108.968 591.805 108.61 591.732C108.253 591.659 107.885 591.748 107.531 591.836C107.116 591.941 106.73 592.058 106.349 592.18L106.352 592.183Z"
            stroke="#F0E2C6"
            strokeWidth="1.2"
            strokeMiterlimit="10"
          />
          <path
            d="M110.976 603.132C110.318 603.431 109.578 603.431 108.9 603.184C108.816 603.153 108.733 603.132 108.649 603.119C107.885 603.001 107.066 603.369 106.652 604.021C106.237 604.672 106.255 605.574 106.704 606.205C107.152 606.836 108.005 607.149 108.751 606.951C109.231 606.823 109.646 606.489 109.896 606.062C110.222 605.504 110.699 605.045 111.304 604.818C111.867 604.607 112.436 604.401 112.976 604.164C113.221 604.054 113.471 603.945 113.667 603.763C113.862 603.58 114.003 603.314 113.961 603.051C113.907 602.691 113.531 602.449 113.169 602.42C112.806 602.391 112.449 602.522 112.11 602.652C111.711 602.803 111.343 602.967 110.978 603.134L110.976 603.132Z"
            stroke="#F0E2C6"
            strokeWidth="1.2"
            strokeMiterlimit="10"
          />
          <path
            d="M106.683 578.701C106.824 577.165 107.074 575.638 107.439 574.129C107.737 572.903 108.123 571.67 108.67 570.531"
            stroke="#F0E2C6"
            strokeWidth="1.2"
            strokeMiterlimit="10"
          />
          <path
            d="M107.937 591.748C106.91 588.043 106.417 584.211 106.571 580.408"
            stroke="#F0E2C6"
            strokeWidth="1.2"
            strokeMiterlimit="10"
          />
          <path
            d="M112.509 602.321C110.816 599.513 109.434 596.5 108.425 593.377"
            stroke="#F0E2C6"
            strokeWidth="1.2"
            strokeMiterlimit="10"
          />
          <path
            d="M109.502 569.071C109.93 568.442 110.425 567.864 111.007 567.361C112.968 565.666 116.859 565.296 120.635 569.019C130.229 578.478 130.195 598.866 126.907 604.325C125.475 606.702 124.132 608.433 121.365 608.636C117.722 608.902 114.199 604.953 113.375 603.694C113.346 603.65 113.317 603.605 113.289 603.561"
            stroke="#F0E2C6"
            strokeWidth="1.2"
            strokeMiterlimit="10"
          />
          <path
            d="M120.632 569.022C117.779 566.939 115.427 565.052 112.303 569.022C109.179 572.992 109.466 581.573 111.002 589.78C112.303 596.742 116.376 606.129 121.874 606.844C125.78 607.349 127.686 603.53 128.143 600.947"
            stroke="#F0E2C6"
            strokeWidth="1.2"
            strokeMiterlimit="10"
          />
          <path
            d="M119.24 580.043C120.416 579.801 122.012 582.387 122.638 585.809C123.297 589.42 122.964 593.106 121.237 593.127C120.085 593.14 118.225 591.333 117.719 587.134C117.213 582.934 117.406 580.421 119.242 580.043H119.24Z"
            stroke="#F0E2C6"
            strokeWidth="1.2"
            strokeMiterlimit="10"
          />
          <path
            d="M108.751 606.949C110.034 608.792 110.618 611.97 109.982 614.12"
            stroke="#F0E2C6"
            strokeWidth="1.2"
            strokeMiterlimit="10"
          />
          <path
            d="M111.711 616.886C111.594 616.798 111.588 616.623 111.685 616.511C112.097 616.031 112.141 615.249 111.8 614.699C111.395 614.05 110.574 613.732 109.81 613.8C109.335 613.842 108.863 614.022 108.516 614.35C108.17 614.678 107.964 615.163 108.016 615.638C108.055 615.992 108.256 616.331 108.545 616.534C108.668 616.621 108.699 616.782 108.61 616.905C108.425 617.16 108.352 617.562 108.409 617.843C108.488 618.232 108.79 618.55 109.153 618.709C109.515 618.868 109.925 618.888 110.316 618.839C110.835 618.771 111.351 618.578 111.685 618.145C111.854 617.924 111.948 617.648 111.938 617.369C111.93 617.147 111.857 616.996 111.711 616.884V616.886Z"
            stroke="#F0E2C6"
            strokeWidth="1.2"
            strokeMiterlimit="10"
          />
          <path
            d="M109.022 618.842C108.548 619.186 108.243 619.725 108.073 620.286C107.903 620.846 107.857 621.435 107.812 622.019C107.7 623.466 107.588 624.913 107.473 626.357C107.434 626.86 108.008 627.176 108.54 627.17C108.756 627.17 108.952 627.28 109.059 627.47C109.231 627.775 109.51 628.02 109.846 628.109C110.201 628.203 110.592 628.132 110.902 627.937C111.054 627.84 111.247 627.819 111.408 627.895C111.76 628.059 112.191 628.046 112.548 627.872C112.864 627.718 113.101 627.426 113.208 627.095C113.283 626.863 113.492 626.714 113.737 626.696C113.995 626.675 114.248 626.584 114.473 626.435C114.757 626.245 114.971 625.956 115.072 625.63C115.119 625.479 115.088 625.312 115.005 625.176C114.342 624.1 114.011 622.851 113.586 621.657C113.135 620.39 112.545 619.11 111.492 618.273"
            stroke="#F0E2C6"
            strokeWidth="1.2"
            strokeMiterlimit="10"
          />
          <path
            d="M109.612 621.312C109.552 622.895 109.124 625.887 109.061 627.47"
            stroke="#F0E2C6"
            strokeWidth="1.2"
            strokeMiterlimit="10"
          />
          <path
            d="M111.406 621.312C111.839 623.163 112.457 624.97 113.25 626.695"
            stroke="#F0E2C6"
            strokeWidth="1.2"
            strokeMiterlimit="10"
          />
          <path
            d="M92.9426 583.852C92.88 583.826 92.8174 583.794 92.7574 583.763C92.3402 583.536 91.9985 583.132 91.9386 582.661C91.8968 582.324 92.0846 581.923 92.361 581.673C92.4914 581.555 92.4914 581.344 92.3636 581.227C91.8551 580.755 91.743 579.869 92.1081 579.248C92.5462 578.497 93.4798 578.143 94.3456 578.187C95.2322 578.234 96.1397 578.701 96.5074 579.512C96.8151 580.187 96.6196 581.076 96.0589 581.521C95.9285 581.623 95.8868 581.805 95.9885 581.936C96.1736 582.178 96.231 582.572 96.1893 582.874C96.1293 583.304 95.8007 583.667 95.4095 583.857C95.0184 584.047 94.5698 584.089 94.1343 584.079C93.7901 584.071 93.3389 583.87 93.0182 583.909C92.7574 583.943 92.5201 584.212 92.3558 584.402C91.9099 584.921 91.6752 585.593 91.477 586.234C90.7885 588.448 90.2722 590.71 89.7558 592.97C89.5759 593.763 90.812 594.188 91.5917 593.95C92.082 594.764 93.2764 595.082 94.0978 594.6C94.5437 594.905 95.1175 594.993 95.6442 594.876C96.171 594.759 96.6456 594.414 96.9221 593.948C97.3654 594.052 97.8426 593.898 98.179 593.591C98.5154 593.283 98.6849 592.803 98.6171 592.353C98.3955 590.856 97.7201 589.472 97.3132 588.012C96.9064 586.555 96.3405 585.087 95.2739 584.013"
            stroke="#F0E2C6"
            strokeWidth="1.2"
            strokeMiterlimit="10"
          />
          <path
            d="M95.7042 589.117C96.2127 591.484 96.0771 591.974 96.69 594.258"
            stroke="#F0E2C6"
            strokeWidth="1.2"
            strokeMiterlimit="10"
          />
          <path
            d="M91.5917 593.949C92.108 592.239 92.2306 592.273 92.4809 590.506"
            stroke="#F0E2C6"
            strokeWidth="1.2"
            strokeMiterlimit="10"
          />
          <path
            d="M94.3221 578.229C94.6403 576.208 95.2792 574.24 96.2076 572.418C96.8282 571.203 97.1438 570.036 97.9053 568.904C98.6667 567.773 99.7985 566.824 101.142 566.589C102.32 566.384 103.585 566.772 104.446 567.604"
            stroke="#F0E2C6"
            strokeWidth="1.2"
            strokeMiterlimit="10"
          />
          <path
            d="M104.443 567.504C107.296 567.082 110.9 566.602 113.753 566.18"
            stroke="#F0E2C6"
            strokeWidth="1.2"
            strokeMiterlimit="10"
          />
          <path
            d="M98.9874 602.966C99.0839 602.885 99.0448 602.734 98.9223 602.705C98.518 602.609 98.1608 602.291 98.0147 601.895C97.8165 601.352 97.9834 600.719 98.3564 600.281C98.7293 599.843 99.2847 599.582 99.8506 599.483C100.505 599.369 101.217 599.462 101.76 599.846C102.302 600.229 102.636 600.933 102.487 601.579C102.383 602.025 102.023 602.4 101.595 602.541C101.47 602.583 101.465 602.757 101.582 602.815C101.788 602.916 101.986 603.036 102.127 603.164C102.406 603.417 102.589 603.811 102.492 604.175C102.367 604.658 101.838 604.905 101.355 605.038C100.829 605.182 100.284 605.265 99.7385 605.286C99.4516 605.296 99.1543 605.286 98.8988 605.158C98.4607 604.939 98.2442 604.392 98.3433 603.915C98.4137 603.576 98.6771 603.216 98.9848 602.963L98.9874 602.966Z"
            stroke="#F0E2C6"
            strokeWidth="1.2"
            strokeMiterlimit="10"
          />
          <path
            d="M99.9159 605.291C99.5325 605.288 98.9614 605.606 98.7397 605.922C98.5181 606.237 98.4085 606.61 98.3068 606.978C97.6862 609.212 97.2715 611.503 97.0681 613.813C97.0238 614.31 97.7357 614.576 98.2338 614.506C98.2104 615.267 98.5754 616.041 99.2196 616.451C99.8637 616.86 100.719 616.904 101.4 616.563C102.046 616.787 102.8 616.763 103.431 616.492C104.062 616.221 104.581 615.705 104.86 615.077C105.351 614.892 105.799 614.582 106.036 614.115C106.274 613.648 106.334 613.091 106.198 612.585C105.601 610.364 104.759 608.203 103.52 606.266C103.418 606.104 103.311 605.943 103.194 605.792C103.181 605.776 103.17 605.76 103.157 605.745C103.003 605.552 102.829 605.374 102.625 605.239C102.245 604.986 101.731 604.976 100.977 605.135"
            stroke="#F0E2C6"
            strokeWidth="1.2"
            strokeMiterlimit="10"
          />
          <path
            d="M99.5065 608.336C99.3448 609.866 98.6224 613.461 98.2651 614.957"
            stroke="#F0E2C6"
            strokeWidth="1.2"
            strokeMiterlimit="10"
          />
          <path
            d="M102.221 608.148C102.524 611.003 103.953 614.444 104.618 614.981"
            stroke="#F0E2C6"
            strokeWidth="1.2"
            strokeMiterlimit="10"
          />
          <path
            d="M101.335 616.595C101.142 613.845 101.014 611.089 100.951 608.334"
            stroke="#F0E2C6"
            strokeWidth="1.2"
            strokeMiterlimit="10"
          />
          <path
            d="M125.717 605.676C130.474 605.942 134.574 609.938 135.588 614.591C136.6 619.244 134.816 624.246 131.556 627.716C128.297 631.188 123.725 633.232 119.039 634.092C114.355 634.95 109.533 634.7 104.805 634.121C100.078 633.542 95.3913 632.64 90.6477 632.202C84.0343 631.59 77.3401 631.884 70.8049 633.073C67.6547 633.647 64.4315 634.429 61.2917 633.803C58.1519 633.177 55.1086 630.625 55.1738 627.424C55.2129 625.519 56.6054 623.822 58.3266 622.998C60.0477 622.174 62.0375 622.098 63.9334 622.31C71.5873 623.159 78.0181 628.224 83.9926 633.081C89.9671 637.937 96.4136 642.989 104.073 643.803C105.218 643.925 106.435 643.933 107.45 643.385C108.464 642.838 109.168 641.574 108.735 640.505C108.344 639.538 107.226 639.089 106.195 638.917C103.994 638.55 101.668 638.99 99.7568 640.137"
            stroke="#F0E2C6"
            strokeWidth="1.2"
            strokeMiterlimit="10"
          />
          <path
            d="M277.773 784.557C279.127 783.878 279.706 782.053 279.114 780.659C278.521 779.266 276.929 778.422 275.423 778.564C273.917 778.707 272.628 779.774 271.963 781.133C270.558 781.382 269.276 782.275 268.562 783.516C269.807 783.089 271.137 782.923 272.449 783.029C273.065 784.355 274.411 784.953 275.85 784.699C277.056 786.476 276.896 788.874 276.034 790.845C275.172 792.815 273.738 794.463 272.47 796.198C271.202 797.933 270.055 799.878 269.926 802.022C269.701 805.761 271.3 809.301 273.495 812.337C275.69 815.372 278.769 817.759 282.255 819.129C279.077 816.747 276.616 813.468 275.255 809.736"
            stroke="#F0E2C6"
            strokeWidth="1.2"
            strokeMiterlimit="10"
          />
          <path
            d="M279.183 781.729C280.949 783.8 281.554 786.667 281.399 789.386C281.244 792.105 280.402 794.731 279.569 797.324C282.377 797.899 285.335 797.324 288.094 798.103C290.912 798.901 293.221 801.017 294.779 803.497C296.337 805.978 297.227 808.817 297.975 811.65C298.441 813.416 298.912 815.288 300.204 816.578C301.399 817.769 303.107 818.266 304.758 818.613C306.41 818.963 308.126 819.225 309.575 820.087C311.094 820.993 312.189 822.495 312.89 824.119C313.591 825.743 313.933 827.499 314.231 829.242C311.868 830.676 308.604 830.731 306.089 829.586C303.573 828.441 301.686 826.002 301.213 823.275"
            stroke="#F0E2C6"
            strokeWidth="1.2"
            strokeMiterlimit="10"
          />
          <path
            d="M309.099 832.467C308.915 832.327 309.034 832.035 309.264 832.063C310.714 832.247 312.199 832.13 313.661 831.998C315.421 831.838 317.204 831.656 318.949 831.946C320.693 832.237 322.427 833.063 323.413 834.531C324.777 836.561 324.505 839.444 325.988 841.35C326.081 841.469 326.03 841.642 325.89 841.697C324.461 842.248 322.999 842.74 321.48 842.935C319.857 843.144 318.118 842.919 316.777 841.979C314.702 840.524 314.047 837.786 312.605 835.702C311.731 834.438 310.364 833.43 309.099 832.467Z"
            stroke="#F0E2C6"
            strokeWidth="1.2"
            strokeMiterlimit="10"
          />
          <path
            d="M295.586 820.189C295.41 823.344 293.951 826.26 292.773 829.191C291.596 832.123 290.672 835.388 291.596 838.41C292.113 840.104 293.185 841.588 294.448 842.831C295.711 844.074 297.168 845.097 298.62 846.115C299.437 843.686 301.303 841.741 301.798 839.226C302.289 836.725 301.174 834.192 299.846 832.017C298.519 829.841 296.924 827.751 296.301 825.278C295.889 823.644 295.542 821.875 295.584 820.192L295.586 820.189Z"
            stroke="#F0E2C6"
            strokeWidth="1.2"
            strokeMiterlimit="10"
          />
          <path
            d="M299.435 848.266C299.51 848.186 299.435 848.062 299.329 848.09C296.06 848.942 292.377 847.36 289.191 848.564C286.451 849.597 284.846 852.381 283.462 854.966C284.727 855.717 286.086 856.318 287.457 856.854C288.829 857.39 290.32 857.695 291.78 857.514C293.985 857.239 296.008 855.792 296.979 853.795C297.424 852.878 297.654 851.876 297.999 850.918C298.294 850.097 298.788 848.963 299.435 848.269V848.266Z"
            stroke="#F0E2C6"
            strokeWidth="1.2"
            strokeMiterlimit="10"
          />
          <path
            d="M299.052 821.424C298.534 824.068 299.445 826.834 300.957 829.066C302.468 831.298 304.539 833.08 306.599 834.815C308.659 836.55 310.758 838.29 312.349 840.463C313.941 842.636 314.999 845.329 314.681 848.004"
            stroke="#F0E2C6"
            strokeWidth="1.2"
            strokeMiterlimit="10"
          />
          <path
            d="M301.891 830.82C303.98 832.675 304.805 835.609 304.878 838.4C304.95 841.192 304.373 843.96 304.143 846.744C303.912 849.528 304.06 852.47 305.45 854.894C307.178 857.914 310.486 859.602 313.61 861.127C313.607 858.887 314.205 856.546 315.483 854.708"
            stroke="#F0E2C6"
            strokeWidth="1.2"
            strokeMiterlimit="10"
          />
          <path
            d="M324.316 862.678C326.581 860.736 327.709 857.641 327.554 854.66C327.399 851.679 326.048 848.831 324.086 846.58C323.478 845.884 322.795 845.226 321.961 844.83C321.128 844.434 320.116 844.325 319.283 844.721C318.162 845.257 317.618 846.539 317.31 847.743C316.534 850.781 316.666 854.072 317.844 856.978C318.478 858.545 319.402 859.979 320.069 861.533C320.693 862.989 321.089 864.623 320.75 866.158C320.734 866.231 320.828 866.275 320.874 866.215L322.334 864.395"
            stroke="#F0E2C6"
            strokeWidth="1.2"
            strokeMiterlimit="10"
          />
          <path
            d="M323.097 845.517C326.622 848.01 330.654 849.738 334.829 850.841C337.489 851.545 340.287 851.999 342.989 851.475C345.691 850.952 348.294 849.303 349.374 846.767C350.021 845.245 350.067 843.44 349.337 841.956C348.608 840.472 347.065 839.374 345.414 839.335C343.763 839.296 342.101 840.407 341.654 841.997C341.206 843.587 342.137 845.491 343.719 845.975"
            stroke="#F0E2C6"
            strokeWidth="1.2"
            strokeMiterlimit="10"
          />
          <path
            d="M291.663 872.857C294.515 873.544 297.478 874.232 300.354 873.65C302.559 873.204 304.601 871.995 306.055 870.278C307.51 868.561 308.366 866.347 308.446 864.096C308.496 862.68 308.219 861.196 307.354 860.072C306.102 858.446 303.778 857.884 301.793 858.397C299.808 858.909 298.154 860.341 296.989 862.03C295.825 863.718 295.09 865.661 294.401 867.595C293.713 869.53 293.053 871.487 291.663 872.852V872.857Z"
            stroke="#F0E2C6"
            strokeWidth="1.2"
            strokeMiterlimit="10"
          />
          <path
            d="M286.917 821.818C288.739 823.944 288.537 827.293 287.046 829.663C285.555 832.032 283.042 833.57 280.467 834.668C277.892 835.766 275.169 836.507 272.662 837.75C270.154 838.993 267.799 840.847 266.735 843.437C265.353 846.804 266.468 850.807 268.743 853.646C271.018 856.484 274.287 858.341 277.589 859.863C281.228 861.539 285.289 862.909 289.184 861.984C289.691 861.863 290.211 861.692 290.573 861.316C290.936 860.941 291.081 860.311 290.773 859.892C290.491 859.511 289.96 859.431 289.486 859.405C283.819 859.105 278.143 862.647 275.92 867.871C276.197 867.64 276.658 867.459 277.002 867.57C277.346 867.682 277.644 867.894 277.941 868.096C279.815 869.355 282.007 870.17 284.259 870.282C286.51 870.393 288.821 869.769 290.623 868.412C292.872 866.716 294.168 864.064 295.26 861.466C296.355 858.869 297.37 856.155 299.277 854.078"
            stroke="#F0E2C6"
            strokeWidth="1.2"
            strokeMiterlimit="10"
          />
          <path
            d="M276.94 807.981C276.241 806.578 276.611 804.778 277.654 803.605C278.697 802.432 280.312 801.865 281.88 801.885C283.449 801.906 284.97 802.471 286.319 803.271C288.314 804.454 289.989 806.171 291.122 808.196C293.017 811.579 293.415 815.753 295.838 818.78C290.969 818.299 285.817 816.173 281.968 813.148C280.977 812.368 280.025 811.496 279.403 810.4C278.782 809.305 278.524 807.943 278.966 806.762C279.409 805.581 280.656 804.674 281.901 804.861"
            stroke="#F0E2C6"
            strokeWidth="1.2"
            strokeMiterlimit="10"
          />
          <path
            d="M274.282 781.168C274.196 781.349 274.246 781.58 274.383 781.727C274.52 781.875 274.732 781.94 274.934 781.921C275.201 781.896 275.475 781.66 275.415 781.396C275.322 780.984 274.494 780.722 274.282 781.168Z"
            stroke="#F0E2C6"
            strokeWidth="1.2"
            strokeMiterlimit="10"
          />
          <path
            d="M274.748 778.836C274.238 777.422 273.283 776.174 272.051 775.314C272.377 774.993 272.237 774.32 271.808 774.164C271.378 774.009 270.855 774.421 270.904 774.874C270.954 775.327 271.549 775.62 271.937 775.381"
            stroke="#F0E2C6"
            strokeWidth="1.2"
            strokeMiterlimit="10"
          />
          <path
            d="M275.514 778.469C275.835 776.819 275.943 775.128 275.837 773.45C276.272 773.476 276.549 772.958 276.401 772.546C276.254 772.134 275.648 771.989 275.33 772.285C275.012 772.58 275.113 773.196 275.509 773.375"
            stroke="#F0E2C6"
            strokeWidth="1.2"
            strokeMiterlimit="10"
          />
          <path
            d="M277.594 779.261C278.487 778.306 279.145 777.133 279.497 775.874C279.173 775.641 279.07 775.201 279.321 774.89C279.572 774.579 280.097 774.546 280.382 774.825C280.666 775.105 280.633 775.639 280.315 775.879C279.996 776.12 279.468 775.993 279.297 775.633"
            stroke="#F0E2C6"
            strokeWidth="1.2"
            strokeMiterlimit="10"
          />
          <path
            d="M298.596 836.768C298.172 835.963 297.176 835.507 296.29 835.712C295.405 835.916 294.712 836.766 294.686 837.675C294.631 837.061 294.484 836.258 294.585 835.649C294.686 835.041 294.958 834.44 295.447 834.067C296.045 833.611 296.906 833.573 297.587 833.894C298.268 834.215 298.767 834.86 299.003 835.574C299.238 836.289 299.228 837.069 299.073 837.807C298.928 838.485 298.648 839.158 298.146 839.635C297.644 840.111 296.886 840.357 296.231 840.127C295.465 839.855 295.027 839.021 294.924 838.213"
            stroke="#F0E2C6"
            strokeWidth="1.2"
            strokeMiterlimit="10"
          />
          <path
            d="M305.315 824.962C305.079 824.222 305.535 823.39 306.203 822.992C306.87 822.593 307.691 822.549 308.465 822.629C307.807 822.14 307.114 821.622 306.298 821.544C305.483 821.466 304.588 821.808 304.202 822.531C303.894 823.108 303.959 823.823 304.187 824.439C304.492 825.265 305.082 825.98 305.835 826.439C306.588 826.897 307.494 827.094 308.366 826.99C308.879 826.928 309.404 826.749 309.746 826.358C310.168 825.874 310.222 825.149 310.03 824.535C309.839 823.921 309.435 823.398 309.016 822.911"
            stroke="#F0E2C6"
            strokeWidth="1.2"
            strokeMiterlimit="10"
          />
          <path
            d="M307.176 822.535C307.623 822.76 307.864 823.328 307.714 823.807C307.564 824.286 307.044 824.615 306.549 824.547C306.055 824.48 305.641 824.019 305.628 823.519"
            stroke="#F0E2C6"
            strokeWidth="1.2"
            strokeMiterlimit="10"
          />
          <path
            d="M319.658 835.822C318.894 836.03 318.24 836.604 317.934 837.335C317.629 838.065 317.681 838.935 318.071 839.624C317.569 839.168 317.008 838.681 316.679 838.091C316.35 837.501 316.224 836.75 316.524 836.144C316.767 835.654 317.254 835.32 317.771 835.139C318.905 834.742 320.207 835.014 321.195 835.695C321.93 836.203 322.528 836.959 322.683 837.837C322.839 838.715 322.471 839.71 321.692 840.147C321.221 840.411 320.652 840.458 320.121 840.365C319.591 840.271 319.091 840.051 318.61 839.805"
            stroke="#F0E2C6"
            strokeWidth="1.2"
            strokeMiterlimit="10"
          />
          <path
            d="M317.701 838.114C317.986 838.485 318.54 838.614 318.959 838.404C319.378 838.195 319.609 837.674 319.484 837.226C319.36 836.778 318.894 836.449 318.429 836.483"
            stroke="#F0E2C6"
            strokeWidth="1.2"
            strokeMiterlimit="10"
          />
          <path
            d="M308.074 848.961C308.54 848.083 309.668 847.707 310.646 847.891C311.625 848.075 312.455 848.72 313.128 849.453C312.887 848.787 312.631 848.096 312.238 847.508C311.844 846.92 311.278 846.417 310.592 846.247C309.52 845.98 308.348 846.617 307.82 847.588C307.292 848.559 307.346 849.774 307.771 850.794C308.195 851.814 308.956 852.661 309.797 853.379C310.087 853.627 310.426 853.873 310.807 853.855C311.192 853.837 311.508 853.549 311.754 853.254C312.429 852.446 312.854 851.431 312.96 850.385"
            stroke="#F0E2C6"
            strokeWidth="1.2"
            strokeMiterlimit="10"
          />
          <path
            d="M320.693 852.816C321.345 852.252 322.264 852.014 323.108 852.19C323.951 852.366 324.699 852.954 325.069 853.731C325.033 852.677 324.598 851.529 323.68 851.009C322.761 850.488 321.513 850.571 320.732 851.281C320.054 851.897 319.798 852.881 319.888 853.795C319.979 854.709 320.377 855.561 320.835 856.354C321.18 856.947 321.607 857.555 322.254 857.781C323.056 858.06 323.982 857.633 324.492 856.952C325.002 856.271 325.17 855.393 325.22 854.541"
            stroke="#F0E2C6"
            strokeWidth="1.2"
            strokeMiterlimit="10"
          />
          <path
            d="M301.428 864.318C302.352 864.473 303.201 865.03 303.716 865.812C304.231 866.594 304.401 867.596 304.176 868.505C304.934 867.734 305.421 866.664 305.442 865.582C305.462 864.499 304.865 863.375 303.86 862.963C303.444 862.793 302.981 862.749 302.53 862.774C301.518 862.834 300.535 863.251 299.782 863.929C299.029 864.608 298.511 865.54 298.327 866.537C298.206 867.2 298.237 867.925 298.591 868.498C299.021 869.192 299.867 869.552 300.685 869.562C301.503 869.572 302.292 869.28 303.022 868.909"
            stroke="#F0E2C6"
            strokeWidth="1.2"
            strokeMiterlimit="10"
          />
          <path
            d="M281.554 865.503C282.01 866.275 282.812 866.811 283.682 867.023C284.551 867.235 285.48 867.137 286.321 866.829C286.989 866.585 287.626 866.194 288.035 865.614C288.444 865.034 288.591 864.237 288.288 863.592"
            stroke="#F0E2C6"
            strokeWidth="1.2"
            strokeMiterlimit="10"
          />
          <path
            d="M285.058 862.988C285.744 863.245 286.326 863.765 286.66 864.415C286.994 865.065 287.077 865.842 286.886 866.549"
            stroke="#F0E2C6"
            strokeWidth="1.2"
            strokeMiterlimit="10"
          />
          <path
            d="M291.497 851.234C292.429 852.003 292.781 853.398 292.326 854.52C292.833 854.238 293.348 853.896 293.674 853.411C294 852.927 294.171 852.326 294.065 851.754C293.925 850.993 293.296 850.369 292.556 850.143C291.816 849.918 290.99 850.066 290.32 850.451C289.65 850.837 289.122 851.441 288.739 852.114C288.412 852.684 288.182 853.375 288.405 853.994C288.599 854.533 289.119 854.911 289.675 855.043C290.232 855.175 290.822 855.09 291.368 854.916"
            stroke="#F0E2C6"
            strokeWidth="1.2"
            strokeMiterlimit="10"
          />
          <path
            d="M292.589 853.501C292.315 853.679 291.93 853.661 291.673 853.459C291.417 853.257 291.314 852.884 291.425 852.576C291.536 852.268 291.857 852.051 292.183 852.061"
            stroke="#F0E2C6"
            strokeWidth="1.2"
            strokeMiterlimit="10"
          />
          <g clipPath="url(#clip2_2576_788)">
            <path
              d="M63.7589 1027.23V1032.53"
              stroke="#F0E2C6"
              strokeWidth="1.2"
              strokeMiterlimit="10"
            />
            <path
              d="M63.7589 1020.01V1023.83"
              stroke="#F0E2C6"
              strokeWidth="1.2"
              strokeMiterlimit="10"
            />
            <path
              d="M63.7589 991.828V1016.6"
              stroke="#F0E2C6"
              strokeWidth="1.2"
              strokeMiterlimit="10"
            />
            <path
              d="M93.7112 1006.98V1012.18"
              stroke="#F0E2C6"
              strokeWidth="1.2"
              strokeMiterlimit="10"
            />
            <path
              d="M93.7112 999.469V1003.57"
              stroke="#F0E2C6"
              strokeWidth="1.2"
              strokeMiterlimit="10"
            />
            <path
              d="M93.7112 974V996.066"
              stroke="#F0E2C6"
              strokeWidth="1.2"
              strokeMiterlimit="10"
            />
            <path
              d="M63.7589 1020.01C64.8112 1020.01 65.6642 1019.25 65.6642 1018.31C65.6642 1017.37 64.8112 1016.61 63.7589 1016.61C62.7067 1016.61 61.8536 1017.37 61.8536 1018.31C61.8536 1019.25 62.7067 1020.01 63.7589 1020.01Z"
              stroke="#F0E2C6"
              strokeWidth="1.2"
              strokeMiterlimit="10"
            />
            <path
              d="M63.7589 1027.23C64.8112 1027.23 65.6642 1026.47 65.6642 1025.53C65.6642 1024.59 64.8112 1023.83 63.7589 1023.83C62.7067 1023.83 61.8536 1024.59 61.8536 1025.53C61.8536 1026.47 62.7067 1027.23 63.7589 1027.23Z"
              stroke="#F0E2C6"
              strokeWidth="1.2"
              strokeMiterlimit="10"
            />
            <path
              d="M63.7589 1035.93C64.8112 1035.93 65.6642 1035.17 65.6642 1034.23C65.6642 1033.29 64.8112 1032.53 63.7589 1032.53C62.7067 1032.53 61.8536 1033.29 61.8536 1034.23C61.8536 1035.17 62.7067 1035.93 63.7589 1035.93Z"
              stroke="#F0E2C6"
              strokeWidth="1.2"
              strokeMiterlimit="10"
            />
            <path
              d="M93.7112 1016.61C95.0792 1016.61 96.1881 1015.62 96.1881 1014.39C96.1881 1013.17 95.0792 1012.18 93.7112 1012.18C92.3433 1012.18 91.2344 1013.17 91.2344 1014.39C91.2344 1015.62 92.3433 1016.61 93.7112 1016.61Z"
              stroke="#F0E2C6"
              strokeWidth="1.2"
              strokeMiterlimit="10"
            />
            <path
              d="M93.7112 1006.98C94.7635 1006.98 95.6165 1006.22 95.6165 1005.28C95.6165 1004.33 94.7635 1003.57 93.7112 1003.57C92.6589 1003.57 91.8059 1004.33 91.8059 1005.28C91.8059 1006.22 92.6589 1006.98 93.7112 1006.98Z"
              stroke="#F0E2C6"
              strokeWidth="1.2"
              strokeMiterlimit="10"
            />
            <path
              d="M93.7112 999.473C94.7635 999.473 95.6165 998.71 95.6165 997.77C95.6165 996.829 94.7635 996.066 93.7112 996.066C92.6589 996.066 91.8059 996.829 91.8059 997.77C91.8059 998.71 92.6589 999.473 93.7112 999.473Z"
              stroke="#F0E2C6"
              strokeWidth="1.2"
              strokeMiterlimit="10"
            />
            <path
              d="M64.751 1035.37C65.293 1036.97 66.8008 1038.15 68.2987 1039.16C69.7967 1040.17 71.4129 1041.14 72.359 1042.59C73.7419 1044.71 73.2689 1047.66 71.2749 1049.35"
              stroke="#F0E2C6"
              strokeWidth="1.2"
              strokeMiterlimit="10"
            />
            <path
              d="M62.7504 1035.71C61.5941 1038.55 57.7408 1039.79 56.0753 1042.41C54.6891 1044.6 55.1982 1047.6 57.2415 1049.32"
              stroke="#F0E2C6"
              strokeWidth="1.2"
              strokeMiterlimit="10"
            />
            <path
              d="M55.5037 1052.56C54.8172 1052.39 54.1602 1051.45 54.308 1050.83C54.4558 1050.21 55.0175 1049.72 55.6581 1049.44C56.2987 1049.17 57.0181 1049.08 57.7244 1049.01C61.5744 1048.6 65.4802 1048.47 69.3335 1048.87C70.1777 1048.96 71.0384 1049.07 71.8005 1049.41C72.5626 1049.75 73.2261 1050.34 73.397 1051.08C73.5678 1051.83 73.1079 1052.45 72.2965 1052.69L55.5037 1052.55V1052.56Z"
              stroke="#F0E2C6"
              strokeWidth="1.2"
              strokeMiterlimit="10"
            />
            <path
              d="M85.42 1031.67C83.045 1029.82 82.4931 1026.37 84.1947 1024C85.2689 1022.5 87.0198 1021.52 88.6459 1020.5C90.2719 1019.47 91.9013 1018.25 92.5123 1016.55"
              stroke="#F0E2C6"
              strokeWidth="1.2"
              strokeMiterlimit="10"
            />
            <path
              d="M94.4373 1016.42C94.8282 1017.82 96.0206 1018.92 97.2952 1019.8C98.5697 1020.69 99.9724 1021.44 101.079 1022.48C103.592 1024.86 104.118 1028.73 102.315 1031.58"
              stroke="#F0E2C6"
              strokeWidth="1.2"
              strokeMiterlimit="10"
            />
            <path
              d="M93.5043 1016.75C94.4471 1018.22 94.0529 1020.1 93.3007 1021.67C92.5484 1023.23 91.4644 1024.68 91.0275 1026.34C90.5906 1027.99 91.0209 1030.01 92.6667 1030.87"
              stroke="#F0E2C6"
              strokeWidth="1.2"
              strokeMiterlimit="10"
            />
            <path
              d="M63.772 1035.9C64.3403 1036.94 64.0052 1038.19 63.4172 1039.22C62.8292 1040.24 62.0014 1041.16 61.5218 1042.23C60.5494 1044.39 61.2393 1047.07 63.1774 1048.63"
              stroke="#F0E2C6"
              strokeWidth="1.2"
              strokeMiterlimit="10"
            />
            <path
              d="M102.794 1035.54C103.422 1035.26 103.891 1034.71 104.033 1034.09C104.174 1033.47 103.977 1032.81 103.523 1032.33C103.073 1031.86 102.407 1031.59 101.73 1031.47C101.053 1031.36 100.353 1031.37 99.6636 1031.39C97.4232 1031.45 95.1796 1031.51 92.9392 1031.57C91.0405 1031.49 89.0991 1031.43 87.2004 1031.51C86.3923 1031.54 85.548 1031.61 84.868 1032C84.1749 1032.4 83.7314 1033.13 83.7314 1033.86C83.7314 1034.6 84.1749 1035.33 84.8713 1035.73L102.801 1035.53L102.794 1035.54Z"
              stroke="#F0E2C6"
              strokeWidth="1.2"
              strokeMiterlimit="10"
            />
            <path
              d="M55.5038 1052.56L51.4994 1057.18V1084.47L59.022 1085.9H70.6639L76.5966 1084.54V1057.18L72.2965 1052.69"
              stroke="#F0E2C6"
              strokeWidth="1.2"
              strokeMiterlimit="10"
            />
            <path
              d="M52.3534 1084.63L57.3071 1088.52H72.2012L76.5965 1084.54"
              stroke="#F0E2C6"
              strokeWidth="1.2"
              strokeMiterlimit="10"
            />
            <path
              d="M61.0849 1088.52L59.022 1085.9"
              stroke="#F0E2C6"
              strokeWidth="1.2"
              strokeMiterlimit="10"
            />
            <path
              d="M70.6639 1085.9L67.9045 1088.52"
              stroke="#F0E2C6"
              strokeWidth="1.2"
              strokeMiterlimit="10"
            />
            <path
              d="M72.3951 1088.52H56.6831C56.1696 1088.52 55.7534 1088.9 55.7534 1089.35V1089.36C55.7534 1089.82 56.1696 1090.19 56.6831 1090.19H72.3951C72.9085 1090.19 73.3247 1089.82 73.3247 1089.36V1089.35C73.3247 1088.9 72.9085 1088.52 72.3951 1088.52Z"
              stroke="#F0E2C6"
              strokeWidth="1.2"
              strokeMiterlimit="10"
            />
            <path
              d="M57.3565 1090.38C56.9952 1091.2 57.4123 1092.16 58.0923 1092.8C58.7723 1093.44 59.679 1093.85 60.5331 1094.29C61.3083 1094.69 61.916 1095.16 62.5139 1095.83C62.6223 1095.95 62.6453 1096.12 62.5698 1096.26C62.2051 1096.89 62.0639 1097.65 62.2708 1098.33C62.5008 1099.1 63.0921 1099.77 63.8673 1100.15C64.9415 1100 65.8449 1099.35 66.1044 1098.41C66.3376 1097.57 66.2785 1096.47 65.6412 1095.83C65.5229 1095.72 65.5427 1095.53 65.6938 1095.44C66.4 1095.03 66.9289 1094.82 67.783 1094.49C68.7521 1094.11 69.7244 1093.69 70.5095 1093.05C71.2946 1092.41 71.8826 1091.53 71.8794 1090.58"
              stroke="#F0E2C6"
              strokeWidth="1.2"
              strokeMiterlimit="10"
            />
            <path
              d="M52.7082 1065.54V1083.1C54.3408 1083.1 55.9504 1083.28 57.5732 1083.43V1083.41V1065.5C57.9608 1065.01 57.9838 1064.41 57.8229 1063.83C57.6619 1063.24 57.202 1062.73 56.6041 1062.45C57.1199 1061.14 55.8749 1059.92 55.0011 1058.99C54.1963 1060.04 53.1812 1061.27 53.8875 1062.56C52.5965 1063.18 52.0118 1064.38 52.7082 1065.54Z"
              stroke="#F0E2C6"
              strokeWidth="1.2"
              strokeMiterlimit="10"
            />
            <path
              d="M75.7654 1065.54V1083.1C74.4481 1083.1 73.1473 1083.28 71.8366 1083.43V1083.41V1065.5C71.5245 1065.01 71.5048 1064.41 71.6362 1063.83C71.7676 1063.24 72.1355 1062.73 72.6217 1062.45C72.2045 1061.14 73.2097 1059.92 73.9193 1058.99C74.5697 1060.04 75.3876 1061.27 74.8193 1062.56C75.864 1063.18 76.3337 1064.38 75.772 1065.54H75.7654Z"
              stroke="#F0E2C6"
              strokeWidth="1.2"
              strokeMiterlimit="10"
            />
            <path
              d="M60.1783 1083.64V1066.19C59.4884 1065.61 59.1731 1064.69 59.3768 1063.86C59.5804 1063.03 60.3721 1062.37 61.2722 1062.09C60.8583 1061.46 61.1014 1060.63 61.5941 1060.04C62.0869 1059.45 62.78 1059.04 63.391 1058.55C64.002 1058.06 64.59 1057.45 64.636 1056.71C64.5933 1057.41 65.1386 1058.04 65.743 1058.48C66.3475 1058.93 67.0537 1059.28 67.5563 1059.82C68.1312 1060.43 68.4039 1061.23 68.256 1062.02C69.0477 1062.3 69.6916 1062.89 69.9872 1063.6C70.2829 1064.31 70.1843 1065.14 69.7868 1065.81V1083.68L60.175 1083.64H60.1783Z"
              stroke="#F0E2C6"
              strokeWidth="1.2"
              strokeMiterlimit="10"
            />
            <path
              d="M81.0443 1049.18V1068.67C82.8543 1068.67 84.6447 1068.87 86.4448 1069.03V1069.02V1049.14C86.8751 1048.59 86.9014 1047.93 86.7208 1047.28C86.5401 1046.63 86.0342 1046.06 85.3673 1045.76C85.9422 1044.3 84.5592 1042.94 83.5869 1041.91C82.6967 1043.08 81.5666 1044.45 82.3517 1045.88C80.9195 1046.57 80.2724 1047.9 81.041 1049.18H81.0443Z"
              stroke="#F0E2C6"
              strokeWidth="1.2"
              strokeMiterlimit="10"
            />
            <path
              d="M106.634 1049.18V1068.67C105.173 1068.67 103.727 1068.87 102.272 1069.03V1069.02V1049.14C101.924 1048.59 101.904 1047.93 102.049 1047.28C102.193 1046.63 102.604 1046.06 103.142 1045.76C102.679 1044.3 103.796 1042.94 104.581 1041.91C105.301 1043.08 106.211 1044.45 105.58 1045.88C106.736 1046.57 107.258 1047.9 106.638 1049.18H106.634Z"
              stroke="#F0E2C6"
              strokeWidth="1.2"
              strokeMiterlimit="10"
            />
            <path
              d="M89.3323 1069.27V1049.91C88.5669 1049.26 88.2187 1048.24 88.4454 1047.32C88.672 1046.4 89.5491 1045.66 90.551 1045.36C90.0911 1044.66 90.3638 1043.73 90.9091 1043.08C91.4544 1042.43 92.2264 1041.97 92.9031 1041.42C93.5798 1040.88 94.2335 1040.2 94.286 1039.39C94.2401 1040.17 94.8412 1040.86 95.5146 1041.35C96.188 1041.84 96.9699 1042.23 97.5283 1042.83C98.1656 1043.51 98.4711 1044.4 98.3068 1045.28C99.1839 1045.59 99.9001 1046.24 100.229 1047.03C100.557 1047.82 100.445 1048.74 100.005 1049.48V1069.31L89.3389 1069.27H89.3323Z"
              stroke="#F0E2C6"
              strokeWidth="1.2"
              strokeMiterlimit="10"
            />
            <path
              d="M51.0099 1057.13C54.3179 1057.29 57.639 1055.47 58.9661 1052.75"
              stroke="#F0E2C6"
              strokeWidth="1.2"
              strokeMiterlimit="10"
            />
            <path
              d="M77.1287 1057.13C73.8207 1057.29 70.4996 1055.47 69.1725 1052.75"
              stroke="#F0E2C6"
              strokeWidth="1.2"
              strokeMiterlimit="10"
            />
            <path
              d="M84.8648 1035.73L79.829 1040.37V1071.21L87.8607 1072.24H101.28L107.909 1071.21V1040.51L102.794 1035.54"
              stroke="#F0E2C6"
              strokeWidth="1.2"
              strokeMiterlimit="10"
            />
            <path
              d="M79.829 1040.29C83.0088 1039.66 85.916 1037.99 87.8739 1035.66"
              stroke="#F0E2C6"
              strokeWidth="1.2"
              strokeMiterlimit="10"
            />
            <path
              d="M99.8443 1035.52C100.429 1037.35 102.203 1038.68 104.075 1039.59C105.948 1040.49 108.001 1041.08 109.808 1042.09C112.902 1043.8 115.073 1046.6 116.578 1049.57C119.866 1056.05 120.26 1063.61 118.063 1070.45C115.865 1077.3 111.158 1083.42 105.064 1088.02C101.996 1090.33 98.9311 1092.64 95.8629 1094.95C94.4898 1095.99 93.097 1097.04 92.0688 1098.36C91.0373 1099.67 90.3901 1101.31 90.6891 1102.89C91.0898 1105.01 93.1298 1106.65 95.3964 1107.36C100.248 1108.88 105.734 1106.68 109.266 1103.34C112.797 1100 114.876 1095.68 117.297 1091.62C119.718 1087.57 122.757 1083.52 127.359 1081.47C128.713 1080.86 130.243 1080.44 131.735 1080.68C133.226 1080.91 134.635 1081.93 134.813 1083.28C134.924 1084.12 134.566 1084.94 134.146 1085.7C132.237 1089.13 128.933 1091.87 125.109 1093.62C121.289 1095.36 116.972 1096.15 112.679 1096.22C109.137 1096.28 105.547 1095.85 102.282 1094.62C99.0165 1093.39 96.0961 1091.31 94.3452 1088.55"
              stroke="#F0E2C6"
              strokeWidth="1.2"
              strokeMiterlimit="10"
            />
            <path
              d="M81.087 1071.69L85.2885 1075.44H102.249L106.9 1071.37"
              stroke="#F0E2C6"
              strokeWidth="1.2"
              strokeMiterlimit="10"
            />
            <path
              d="M102.058 1075.44H85.5383C85.043 1075.44 84.6415 1075.8 84.6415 1076.25C84.6415 1076.69 85.043 1077.05 85.5383 1077.05H102.058C102.554 1077.05 102.955 1076.69 102.955 1076.25C102.955 1075.8 102.554 1075.44 102.058 1075.44Z"
              stroke="#F0E2C6"
              strokeWidth="1.2"
              strokeMiterlimit="10"
            />
            <path
              d="M86.2904 1076.96C86.2182 1078.56 87.1215 1080.08 88.3632 1081.23C89.605 1082.37 91.1588 1083.2 92.6928 1084C91.6811 1085.02 91.6581 1086.71 92.6403 1087.74C92.9294 1088.05 93.3137 1088.31 93.7572 1088.36C94.5193 1088.46 95.2288 1087.94 95.5803 1087.33C96.1979 1086.26 95.9745 1084.85 95.0514 1083.98C95.9318 1083.47 96.8122 1082.93 97.6958 1082.42C98.7175 1081.83 99.7555 1081.23 100.511 1080.38C101.267 1079.53 101.71 1078.39 101.352 1077.35"
              stroke="#F0E2C6"
              strokeWidth="1.2"
              strokeMiterlimit="10"
            />
          </g>
          <defs>
            <clipPath id="clip0_2576_788">
              <rect
                width="84"
                height="84"
                fill="white"
                transform="translate(50 127)"
              />
            </clipPath>
            <clipPath id="clip1_2576_788">
              <rect
                width="86"
                height="102"
                fill="white"
                transform="translate(266 336)"
              />
            </clipPath>
            <clipPath id="clip2_2576_788">
              <rect
                width="85"
                height="135"
                fill="white"
                transform="translate(50 974)"
              />
            </clipPath>
          </defs>
        </svg>

        {itineraryDays.map((day, index) => {
          const pos = positions[index] || positions[positions.length - 1];
          return (
            <div
              key={day.day}
              className={`w-full absolute left-0 px-10 text-[1rem] leading-[1rem] text-[#F1E2C6] flex flex-col ${pos.align}`}
              style={{ top: pos.top }}
            >
              <h1
                className={`mb-4 Font_CV text-[1.5rem] leading-[1.5rem] ${pos.textAlign}`}
              >
                {day.day.split(":")[0]}: <br />
                {day.day.split(":")[1]}
              </h1>

              <button
                type="button"
                onClick={() => setSelectedDay(day)}
                className="group inline-flex items-center gap-2 l border border-[#F1E2C6] px-5 py-2 text-[0.9rem] uppercase tracking-[0.15em] transition-all duration-300 bg-[#F1E2C6] text-[#D25F28] hover:bg-transparent hover:text-[#F1E2C6]"
              >
                View Event
                {/* <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span> */}
              </button>
            </div>
          );
        })}

        <EventModal day={selectedDay} onClose={() => setSelectedDay(null)} />
      </div>

      <div className="w-full pb-[5vh]    uppercase text-[1.3rem] leading-[1.3rem] px-5 text-center flex flex-col sm:translate-y-[-100%]  justify-center items-center bg-[#D25F28] text-[#F1E2C6] ">
        <p className=" Font_CV"> Click here for a detailed wardrobe planner.</p>

        <a
          href="/path/to/file.pdf"
          download
          className="w-fit h-fit flex px-5 py-2 capitalize text-[0.9rem] mt-5 leading-[0.9rem]  select-none cursor-pointer text-[#F1E2C6] hover:underline  items-center gap-2 py-2 transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16"
            />
          </svg>
          Download PDF
        </a>
      </div>
    </div>
  );
}
