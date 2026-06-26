"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IoCloseSharp } from "react-icons/io5";
import { GoArrowUpRight } from "react-icons/go";

gsap.registerPlugin(ScrollTrigger);

const ChaptersAccordion = () => {
  const [isOpen, setIsOpen] = useState(false);

  const lineRef = useRef(null);
  const panelRef = useRef(null);

  const ARR = [
    { name: "Mumbai" },
    { name: "NYC" },
    { name: "Singapore" },
    { name: "Atlanta" },
    { name: "Goa" },
    { name: "Bangkok" },
    { name: "Sri Lanka" },
    { name: "Boston" },
  ];

  useEffect(() => {
    const itemHeight = 12.8;

    gsap.to(lineRef.current  , {
      opacity: 1,
      ease: "none",

      scrollTrigger: {
        trigger: ".Collector",
        start: "top -60%",
        end: "top 65%",
        scrub: true,
      },
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".Collector",
        start: "top -60%",
        end: "bottom bottom",
        scrub: true,
      },
    });

    tl.to(
      ".LineDiv",
      {
        width: "100%",
        ease: "none",
      },
      "a1",
    );

    tl.to(
      ".TXTwrap",
      {
        y: -(ARR.length - 0.8) * itemHeight,
        ease: "none",
      },
      "a1",
    );

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  const openAccordion = () => {
    setIsOpen(true);

    gsap.fromTo(
      panelRef.current,
      {
        opacity: 0,
        y: 50,
        scale: 0.95,
        height: 0,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        height: "auto",
        duration: 0.6,
        ease: "power3.out",
      },
    );

    gsap.to(lineRef.current, {
      y: -220,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out",
    });
  };

  const closeAccordion = () => {
    gsap.to(panelRef.current, {
      opacity: 0,
      y: 50,
      scale: 0.95,
      height: 0,
      duration: 0.5,
      ease: "power3.inOut",
      onComplete: () => setIsOpen(false),
    });

    gsap.to(lineRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.5,
      ease: "power3.inOut",
    });
  };

  return (
    <>
      {/* Line */}
      <div
        ref={lineRef}
        className="w-[60vh] h-[2px] fixed bottom-[5%] left-1/2 -translate-x-1/2 z-[9999] cursor-pointer opacity-0"
        onClick={openAccordion}
      >
        <div className="w-0 h-full bg-[#212121] rounded-full LineDiv relative">
          <div className="w-fit h-[0.8rem] text-[0.8rem] leading-[0.8rem] absolute top-1/2 -translate-y-1/2 right-0 overflow-hidden bg-[#f6f6f6]">
            <div className="TXTwrap flex flex-col">
              {ARR.map((itm, index) => (
                <div
                  key={index}
                  className="w-fit text-black tracking-tight whitespace-nowrap mx-auto"
                >
                  {itm.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Open Panel */}
      {isOpen && (
        <div
          ref={panelRef}
          className="w-[60vh] bg-black/5 backdrop-blur-md fixed bottom-[5%] left-1/2 -translate-x-1/2 z-[10000] rounded-lg p-4 shadow-xl overflow-hidden"
        >
          <div className="flex justify-between items-center mb-4">
            <p className="font-medium">Chapters</p>

            <button onClick={closeAccordion} className="cursor-pointer text-lg">
              <IoCloseSharp />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {ARR.map((item, index) => (
              <div
                key={index}
                className="cursor-pointer py-2 px-3 bg-[#f5f5f5] text-[0.8rem] rounded-md flex justify-between items-center transition-all duration-300 hover:bg-[#202020] hover:text-white"
              >
                {item.name}

                <GoArrowUpRight />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ChaptersAccordion;
