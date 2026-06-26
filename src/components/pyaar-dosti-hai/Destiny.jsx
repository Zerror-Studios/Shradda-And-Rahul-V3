"use client";
import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Destiny = () => {
  useEffect(() => {
    const TLD = gsap.timeline({
      scrollTrigger: {
        trigger: ".Destiny_cont",
        start: "top top",
        end: "top -20%",
        scrub: true,
      },
    });

    gsap.to(".SecondInnerContDestiny", {
      opacity: 1,
      ease: "none",
      scrollTrigger: {
        trigger: ".SecondInnerContDestiny",
        start: "top 70%",
        end: "top 40%",
        scrub: true,
        // markers: true
      },
    });
  }, []);

  useGSAP(() => {
    gsap.from(".T2T2T", {
      yPercent: 20,
      opacity: 0,
      stagger: {
        each: 1,
        ease: "none",
      },
      ease: "none",
      scrollTrigger: {
        trigger: ".innderDestinyCont",
        start: "top 80%",
        end: "top 50%",
        scrub: true,
        // markers: true
      },
    });
    gsap.from(".TT2T", {
      yPercent: 20,
      opacity: 0,
      ease: "none",
      scrollTrigger: {
        trigger: ".TT2T",
        start: "top 90%",
        end: "top 60%",
        scrub: true,
        // markers: true
      },
    });
    gsap.from(".TT3T", {
      yPercent: 5,
      opacity: 0,
      ease: "none",
      scrollTrigger: {
        trigger: ".TT3T",
        start: "top 90%",
        end: "top 60%",
        scrub: true,
        // markers: true
      },
    });
  }, []);

  return (
    <div className="w-full h-fit Destiny_cont relative p-10 max-sm:px-[10px] ">
      {/* Bg */}
      <img
        src={`/images/home/S2.jpg`}
        className="w-full h-full object-cover object-center fixed top-0 left-0  z-[-1]"
        alt="BG-IMG"
      />

      <div className="w-full h-fit bg-[#fdf8f1] flex flex-col px-[5vw] innderDestinyCont opacity-100 mt-[0vh] max-sm:pt-[3vh] max-sm:pt-0 ">
        <div className="w-full h-full px-[10vw] max-sm:px-3 pt-[10vw] max-sm:pb-[10vw] flex flex-col gap-[1srem]  ">
          <div className="w-full h-fit flex justify-center T2T2T items-center">
            {" "}
            <span className="Font_CV uppercase text-[#4f322d] text-[1rem] COLOR_TEXT_RED font-semibold ">
              Sharadda and Rahul Story:
            </span>
          </div>
          {/* <img src={`/svgs/Title1Destiny.svg`} className='w-full T2T2T object-cover' alt="SVG" /> */}

          <div className="w-full h-fit flex justify-center gap-[2vw] items-center COLOR_TEXT_RED">
            <h1 className="Font_CV uppercase text-[#4f322d] text-[5vw] leading-[5vw] max-sm:text-[10vw] max-sm:text-center max-sm:mt-5 max-sm:leading-[10vw]">
              Pyaar Everywhere
            </h1>
            {/* <h1 className='Font_CI text-[8vw] leading-[8vw]'></h1> */}
            {/* <h1 className='Font_CV uppercase text-[8vw] leading-[8vw] max-sm:text-[10vw]'></h1> */}
          </div>
        </div>

        <div className="w-full h-fit flex mt-[2vw]  TT2T COLOR_TEXT_RED gap-[2rem] max-sm:gap-[20px] max-sm:flex-col">
          <div className="w-1/2  max-sm:w-full mx-auto   text-center max-sm:text-justify max-sm:pr-0">
            <p className="Font_CI text-[1.2rem] text-[#4f322d]">
              {" "}
              Envision a timeline of all the destinations we visited as
              long-distance lovers. Starts with Covid lockdown- park walk chats
              to country-hopping to meet. Different countries/ cities are 3D
              interactive icons on a timeline with single core memory of each
              location with a photo popping out when toggled i.e. Mumbai 10/2020
              is symbolized by a Mumbai taxi tile (kaali peeli), and when toggle
              mouse over other symbols from our visit pops out (Bademiya, khala
              ghoda- 2 elements max to keep it focused and clean)
              {/* <br></br>
                            <br></br>
                            For a year, they stayed in touch, their connection never fading. Then fate stepped in. Sonal moved to New York City, and when Kush reached out, he discovered she was living just a ten minute walk from his apartment. Some call it destiny, some call it great real estate planning, but either way, their first date was pure magic.  */}
            </p>
          </div>
        </div>

        <div className="w-full h-fit flex max-sm:flex-col mt-[5vw] mb-[4vh] max-sm:mb-[8vh] gap-[5vw] relative  will-change-transform ">
          <div className="w-full relative z-20 DCD2 mb-[10vh] max-sm:mb-0 ">
            <div className="w-full h-auto">
              {/* aspect-[2/2] */}
              <img
                src={`/images/home/lastIMG.jpg`}
                className="w-full  max-sm:aspect-auto object-center object-cover  z-20 "
                alt="IMG"
              />
            </div>
          </div>
        </div>

        {/* Destinations Timeline */}
        {/* <div className="w-full pb-[8vw] TT3T">
          <div className="w-full text-center mb-[4vw]">
            

            <h2 className="Font_CV uppercase text-[4vw] leading-none COLOR_TEXT_RED mt-4 max-sm:text-[10vw]">
              Destinations
            </h2>

            <p className="Font_CI text-[1rem] COLOR_TEXT_RED/80 max-w-[700px] mx-auto mt-4">
              From city strolls to international adventures, each destination
              became a chapter in our story together.
            </p>
          </div>

          <div className="max-w-[1000px] mx-auto border-t border-[#B66B5A]/30">
            {[
              { place: "Atlanta", date: "08/2022" },
              { place: "Bangkok", date: "12/2022" },
              { place: "Singapore", date: "12/2022" },
              { place: "New York", date: "08/2023" },
              { place: "Ithaca", date: "07/2024" },
              { place: "New Orleans", date: "07/2024" },
              { place: "Sri Lanka", date: "01/2025" },
              { place: "Kampala", date: "04/2025" },
              { place: "Savannah (Civil Ceremony)", date: "09/2025" },
              { place: "Key West / Miami", date: "10/2025" },
              { place: "Egypt", date: "12/2025" },
            ].map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center py-6 border-b border-[#B66B5A]/20 max-sm:flex-col max-sm:items-start max-sm:gap-2"
              >
                <h3 className="Font_CV uppercase text-[1.4rem] COLOR_TEXT_RED">
                  {item.place}
                </h3>

                <span className="Font_CI text-[1rem] COLOR_TEXT_RED/70">
                  {item.date}
                </span>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Destiny;