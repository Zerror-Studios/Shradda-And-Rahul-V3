"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Countdown = () => {
  const targetDate = new Date("2026-11-14T00:00:00");

  const calculateTimeLeft = () => {
    const now = new Date();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { days: "00", hours: "00", minutes: "00", seconds: "00" };
    }

    return {
      days: String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(
        2,
        "0",
      ),
      hours: String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(
        2,
        "0",
      ),
      minutes: String(Math.floor((difference / (1000 * 60)) % 60)).padStart(
        2,
        "0",
      ),
      seconds: String(Math.floor((difference / 1000) % 60)).padStart(2, "0"),
    };
  };

  // 👇 IMPORTANT: stable initial state
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    // run only on client
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
   
      {/* ================================================================ */}
      <section className="pb-[20vh] bg-[#D25F27] text-[#F1E2C6] max-md:pb-[0vh] max-md:pb-0 pt-22  max-md:pt-0 w-full   max-md:h-fit max-md:pb-[5vh] select-none   max-md:mt-0 flex flex-col justify-center items-center text-center">
        <div className="w-full h-fit flex justify-center gap-10 max-md:gap-1 COLOR_TEXT_RED CDD1 Font_CV">
          {[
            { label: "Days", value: timeLeft.days },
            { label: "Hours", value: timeLeft.hours },
            { label: "Minutes", value: timeLeft.minutes },
            { label: "Seconds", value: timeLeft.seconds },
          ].map((item, index) => (
            <div key={index} className="flex items-center Font_C">
              <div className="text-center Font_CV">
                <div className="text-[6vw]  leading-[6vw] max-md:text-[2.5rem] max-md:leading-[2.5rem] Font_C  tracking-wide">
                  {item.value}
                </div>
                <div className="mt-2 text-[1rem]  max-md:text-[0.7rem] max-md:leading-[0.7rem]   tracking-widest uppercase">
                  {item.label}
                </div>
              </div>

              {index !== 3 && (
                <div className="text-[5vw] max-md:text-[2rem] font-serif ml-8 max-md:mx-3">
                  :
                </div>
              )}
            </div>
          ))}
        </div>

        <h2 className=" Font_CV text-[3vw] leading-[3vw] max-sm:text-[9vw] tracking-tighter uppercase COLOR_TEXT_RED mt-10 max-md:mt-20 CDD1">
          Until the wedding
        </h2>
      </section>
    </>
  );
};

export default Countdown;