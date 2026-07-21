"use client";
import React, { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const Nails_Cntr = () => {
  useGSAP(() => {
    gsap.to(".line-wrapper svg path", {
      scrollTrigger: {
        trigger: ".line_cntr_trigger",
        start: "top 10%",
        end: "bottom 100%",
        scrub: 0.5,
        duration: 2,
      },
      strokeDashoffset: 0,
    });
    gsap.to(".mask-memoji-wrapper .memoji img", {
      scrollTrigger: {
        trigger: ".how_we_picture",
        start: "top 80%",
        end: "bottom 50%",
        scrub: 2,
        duration: 1,
      },
      transform: "rotateZ(0deg)",
    });
    gsap.to(".title_inner-nail h2 span", {
      scrollTrigger: {
        trigger: ".title_inner-nail h2 span",
        start: "top 80%",
        end: "bottom 90%",
        duration: 0.5,
      },
      stagger: 0.1,
      transform: `translateY(0%) skewX(0deg)`,
      opacity: 1,
    });
    gsap.to(".title_inner-nail .arrow", {
      scrollTrigger: {
        trigger: ".title_inner-nail .arrow",
        start: "top 80%",
        end: "bottom 90%",
        duration: 1,
      },
      transform: `translate(0px, -0.0938px)`,
      opacity: 1,
    });
  });

  const headingRef = useRef(null);
  const paraRef = useRef(null);

  useEffect(() => {
    gsap.set(paraRef.current, { opacity: 0, y: 30 });
    gsap.set(headingRef.current, { opacity: 0, y: 30 });

    gsap
      .timeline({ defaults: { ease: "power3.out" } })
      .to(headingRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
      })
      .to(
        paraRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
        },
        "-=0.2",
      );
  }, []);

  // Single source of truth for the itinerary — used to render the mobile text-only list
  const itineraryDays = [
    {
      day: "DAY ONE: 20 OCTOBER, 2026",
      events: [
        {
          title: "AZUL",
          name: "Welcome Dinner",
          time: "19:00",
          location: "Secret Location",
          
        },
      ],
    },
    {
      day: "DAY TWO: 21 OCTOBER, 2026",
      events: [
        {
          title: "HERE COMES THE SUN",
          name: "Haldi Ceremony",
          time: "13:00",
          location: "Main Pool, The Oberoi",
          
        },
        {
          title: "NAMASTE MARRAKECH",
          name: "Sangeet",
          time: "19:30",
          location: "The Oberoi",
          
        },
      ],
    },
    {
      day: "DAY THREE: 22 OCTOBER, 2026",
      events: [
        {
          title: "DILWALE DULHANIA LE JAAYENGE ",
          name: "Baraat",
          time: "12:00",
          location: "Olive tree driveway, The Oberoi",
          
        },
        {
          title: "PYAAR DOSTI HAI",
          name: "Wedding Ceremony",
          time: "15:00",
          location: "The Patio, The Oberoi",
          
        },
        {
          title: "DESINTATION: FOREVER",
          name: "Reception",
          time: "19:00",
          location: "Grand Canal, The Oberoi",
          
        },
        {
          title: "DRUNK IN LOVE",
          name: "After Party",
          time: "22:00 till late",
          location: "The Oberoi",
          
        },
      ],
    },
  ];

  return (
    <div className="w-full h-fit bg-[#D25F28]">
      <div id="How_to_Nail_it_Cntr" className=" BGCLR relative">
        <div className="row title  max-sm:my-[10vh]">
          <div className="mx-auto flex flex-col gap-10 justify-center max-sm:text-center items-center">
            <h3
              ref={headingRef}
              className="text-[5rem] font-semibold leading-none Font_CV mx-auto uppercase max-sm:text-[2.5rem]"
            >
              Wedding itinerary
            </h3>

            <p
              ref={paraRef}
              className="max-w-[800px]  tracking-tight text-[#F1E2C6] text-[0.9rem] leading-[1.1rem] max-sm:px-6"
            >
              We've thoughtfully planned each moment of our special day. Please
              find the itinerary below and join us in celebrating every chapter
              of our wedding journey. Join us as we celebrate our wedding day
              with love, laughter, and unforgettable moments. Below is a
              schedule of the day's events to help you enjoy every special
              moment with us.
            </p>
          </div>
        </div>

        {/* ===================== DESKTOP / TABLET ONLY (absolute-positioned art + text) ===================== */}
        <div className="max-sm:hidden">
          <div className="row line_cntr_trigger ">
            <div className="pictos-wrapper">
              <div className="line-wrapper">
                <svg
                  id="line"
                  x="0px"
                  y="0px"
                  viewBox="0 0 1500 2200"
                  xmlSpace="preserve"
                >
                  <path
                    d="M504.5,1741.3c132.6,11.5,188,125.5,149.4,232.6c-31.1,86.4,65.3,127,170.3,84.4
	c149.7-60.7,53.6-299.5,75.5-413.2c17.6-91.1,58.4-113.1,136-115.9c174.2-6.3,167.2,25.6,256.7,46.9
	c166.6,39.7,182.1-266.4,14.6-414.3c-90.4-79.9-321.9-93.2-481.5-12.3c-254.2,128.7-450.4,44.8-450.4-123.8c0-84.8,0-70.6,0-70.6
	c0-13.8,11.2-24.9,24.9-24.9h128.4c13.8,0,24.9,11.2,24.9,24.9v11.5c0,13.8-11.2,24.9-24.9,24.9H414.9c-13.8,0-24.9-11.2-24.9-24.9
	V823.8c0-13.8,11.2-24.9,24.9-24.9h88.2c13.8,0,24.9,11.2,24.9,24.9v17.1c0,12.3-10,22.3-22.3,22.3H426c-12.3,0-22.3-10-22.3-22.3
	v-4.7c0-12.3,10-22.3,22.3-22.3h105c12.3,0,22.3-10,22.3-22.3v-27.9c0-12.3-10-22.3-22.3-22.3h-86.7c-12.3,0-22.3,10-22.3,22.3l0,0
	c0,12.3,10,22.3,22.3,22.3h61.4c12.3,0,22.3-10,22.3-22.3v-50.8c0-36.6-29.6-66.2-66.2-66.2H127.7c-11.6,0-21-9.4-21-21l0,0
	c0-11.6,9.4-21,21-21h406.4c203.5,0,201.7,352.9,445.2,352.9c125.8,0,267.2-113.8,267.2-257c0-115.8-69.2-258.1-296.5-249V134.8
	c0-11.9-9.6-21.5-21.5-21.5h-32.8c-11.9,0-21.5,9.6-21.5,21.5V180c0,6.7,5.4,12.1,12.1,12.1h41c6.7,0,12.1-5.4,12.1-12.1v-26.3
	c0-6.7-5.4-12.1-12.1-12.1h-62.7c-10.3,0-18.6-8.3-18.6-18.6V83.2c0-10.3-8.3-18.6-18.6-18.6H656.8c-10.3,0-18.6,8.3-18.6,18.6v59.3
	c0,10.3,8.3,18.6,18.6,18.6h105.7c14,0,25.3-11.3,25.3-25.3v-33.4c0-14-11.3-25.3-25.3-25.3h-78.2c-14,0-25.3,11.3-25.3,25.3v53
	v63.4c0,9.9-8,18-18,18h-40h-89.1c-14.3,0-26-11.6-26-26v-37.4c0-14.3,11.6-26,26-26h57.3c14.3,0,26,11.6,26,26V228v79"
                    className="st0"
                  />
                  <g>
                    <ellipse
                      transform="matrix(3.327790e-02 -0.9994 0.9994 3.327790e-02 -492.1457 742.9949)"
                      cx={138}
                      cy="625.9"
                      rx="12.6"
                      ry="12.6"
                      className="st1"
                    />
                    <circle cx="179.3" cy="625.9" r="12.6" className="st1" />
                    <circle cx="220.5" cy="625.9" r="12.6" className="st1" />
                  </g>
                </svg>
              </div>
              <div className="pictos">
                <div className="anime-container">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 1500 2200"
                    width={1500}
                    height={2200}
                    preserveAspectRatio="xMidYMid meet"
                  >
                    <defs>
                      <clipPath id="__lottie_element_234">
                        <rect width={1500} height={2200} x={0} y={0} />
                      </clipPath>
                    </defs>
                    {/* lottie animation group intentionally left commented out, unchanged from original */}
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Detail-SVG-1-Data */}
          <div className=" h-[18vw]  absolute top-[23%] left-[53%] -translate-x-1/2 overflow-hidden">
            <img
              src={`/icons/T1.svg`}
              alt="IMG"
              className=" h-full object-cover object-center"
            />
          </div>
          {/* Detail-Text-1-Data */}
          <div className="  w-fit Font_CV absolute top-[23%] left-[75%] -translate-x-1/2  text-[1rem] leading-[1rem]  text-[#F1E2C6] flex gap-1 flex-col  justify-start items-start">
            <h1 className="mb-2 text-[1.5rem] leading-[1.5rem]">
              DAY ONE: 20 OCTOBER, 2026
            </h1>
            <p className="text-[1.3rem] leading-[1.3rem]">AZUL</p>
            <p>Welcome Dinner</p>
            <p>19:00</p>
            <p>Secret Location</p>
            <p className="flex "></p>
          </div>

          {/* Detail-SVG-2-Data */}
          <div className=" h-[15vw]   absolute top-[35%] left-[70%] -translate-x-1/2 overflow-hidden">
            <img
              src={`/icons/HALDI.svg`}
              alt="IMG"
              className=" h-full object-cover object-center"
            />
          </div>
          {/* Detail-Text-2-Data */}
          <div className="  w-fit Font_CV absolute top-[36%] left-[88%] -translate-x-1/2  text-[1rem] leading-[1rem]  text-[#F1E2C6] flex gap-1 flex-col  justify-start items-start">
            <h1 className="mb-2 text-[1.5rem] leading-[1.5rem]">
              DAY TWO: 21 OCTOBER, 2026
            </h1>
            <p className="text-[1.3rem] leading-[1.3rem]">HERE COMES THE SUN</p>
            <p>Haldi Ceremony</p>
            <p>13:00</p>
            <p>Main Pool, The Oberoi</p>
            <p className="flex "></p>
          </div>

          {/* Detail-SVG-3-Data */}
          <div className="  h-[15vw]  absolute top-[39%] left-[15%] -translate-x-1/2 overflow-hidden">
            <img
              src={`/icons/BARAAT.svg`}
              alt="IMG"
              className=" h-full object-cover object-center"
            />
          </div>
          {/* Detail-Text-3-Data */}
          <div className="  w-fit Font_CV absolute top-[49%] left-[15%] -translate-x-1/2  text-[1rem] leading-[1rem]  text-[#F1E2C6] flex gap-1 flex-col  justify-start items-start">
            <h1 className="mb-2 text-[1.5rem] leading-[1.5rem]">
              DAY TWO: 21 OCTOBER, 2026
            </h1>
            <p className="text-[1.2rem] leading-[1.2rem] max-w-[400px]">
              NAMASTE MARRAKECH
            </p>
            <p>Sangeet</p>
            <p>19:30</p>
            <p>Gardens, The Oberoi</p>
            <p className="flex "></p>
          </div>

          {/* Detail-SVG-4-Data */}
          <div className=" h-[15vw]   absolute top-[57%] left-[55%] -translate-x-1/2 overflow-hidden">
            <img
              src={`/icons/WEDDING.svg`}
              alt="IMG"
              className=" h-full object-cover object-center"
            />
          </div>
          {/* Detail-Text-4-Data */}
          <div className="  w-fit Font_CV absolute top-[56%] left-[73%] -translate-x-1/2  text-[1rem] leading-[1rem]  text-[#F1E2C6] flex gap-1 flex-col  justify-start items-start">
            <h1 className="mb-2 text-[1.5rem] leading-[1.5rem]">
              DAY THREE: 22 OCTOBER, 2026
            </h1>
            <p className="text-[1.3rem] leading-[1.3rem]">
              DILWALE DULHANIA LE JAAYENGE
            </p>
            <p>Baraat</p>
            <p>12:00 </p>
            <p>Location: Olive tree driveway, The Oberoi</p>
            <p className="flex "></p>

            <p className="mt-8 mb-2 text-[1.3rem] leading-[1.3rem]">
              PYAAR DOSTI HAI
            </p>
            <p>Wedding Ceremony </p>
            <p>15:00 </p>
            <p>Location, Patio, The Oberoi</p>
            <p className="flex "></p>
          </div>

          {/* Detail-SVG-5-Data */}
          <div className=" h-[15vw]  absolute top-[72%] left-[20%] -translate-x-1/2 overflow-hidden">
            <img
              src={`/icons/RECEPTION.svg`}
              alt="IMG"
              className=" h-full object-cover object-center text-[#F1E2C6]"
            />
          </div>
          {/* Detail-Text-5-Data */}
          <div className="  w-fit Font_CV absolute top-[82%] left-[20%] -translate-x-1/2  text-[1rem] leading-[1rem]  text-[#F1E2C6] flex gap-1 flex-col  justify-start items-start">
            <h1 className="mb-2 text-[1.5rem] leading-[1.5rem]">
              DAY THREE: 22 OCTOBER, 2026
            </h1>
            <p className="text-[1.3rem] leading-[1.3rem]">
              DESINTATION: FOREVER
            </p>
            <p>Reception</p>
            <p>20:00</p>
            <p>Grand Canal, The Oberoi</p>
            <p className="flex "></p>

            <p className="mt-8 mb-2 text-[1.3rem] leading-[1.3rem]">
              DRUNK IN LOVE
            </p>
            <p>After Party </p>
            <p>23:00 to Sunrise</p>
            <p> The Oberoi</p>
            <p className="flex "></p>
          </div>
        </div>
        {/* ===================== END DESKTOP / TABLET ONLY ===================== */}

        {/* ===================== MOBILE ONLY: text-only stacked itinerary, no images ===================== */}
        <div className="hidden max-sm:block px-6 ">
          <div className="flex flex-col gap-12">
            {itineraryDays.map((d, di) => (
              <div key={di} className="flex flex-col gap-8">
                <h1 className="Font_CV text-[1.3rem] leading-[1.3rem] text-[#F1E2C6] uppercase tracking-wide border-b border-white/20 pb-2">
                  {d.day}
                </h1>
                {d.events.map((e, ei) => (
                  <div
                    key={ei}
                    className="Font_CV text-[#F1E2C6] flex flex-col gap-1 text-[1rem] leading-[1.2rem]"
                  >
                    <p className="text-[1.15rem] leading-[1.2rem] mb-1">
                      {e.title}
                    </p>
                    <p>{e.name}</p>
                    <p>{e.time}</p>
                    <p>{e.location}</p>
                    <p>Dress Code : {e.dress}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        {/* ===================== END MOBILE ONLY ===================== */}
      </div>

      <div className="w-full pb-[5vh] pt-[10vh]  uppercase text-[1.3rem] leading-[1.3rem] px-5 text-center flex flex-col sm:translate-y-[-100%]  justify-center items-center bg-[#D25F28] text-[#F1E2C6] ">
       

        <a
          href="/pdf/WP.pdf"
          download
          className="w-fit h-fit flex px-5 py-2 uppercase Font_CV  text-[1.5rem] leading-[1.5rem] font-semibold  select-none cursor-pointer text-[#F1E2C6] hover:underline  items-center gap-2 py-2 transition-colors"
        >
           Click here for a detailed wardrobe planner.
        </a>
      </div>
    </div>
  );
};

export default Nails_Cntr;
