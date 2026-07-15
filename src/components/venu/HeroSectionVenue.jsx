"use client";
import Image from "next/image";
import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const HeroSectionVenue = () => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  useGSAP(() => {
    gsap.to(imageRef.current, {
      yPercent: 20, // parallax strength
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
        // markers:true
      },
    });
  }, []);

  // PRE-PRE-ANIMATION
  useGSAP(() => {
    const tt = gsap.timeline();

    tt.to(".Igm", {
      opacity: 1,
      duration: 1,
      //  stagger:{
      //     each:'0.2',
      //     ease:'none'
      //  },
      ease: "power-in",
    });
    tt.to(".WEDMAIMTT2", {
      delay: 0.1,
      y: 0,
      duration: 0.5,
      //  stagger:{
      //     each:'0.2',
      //     ease:'none'
      //  },
      ease: "power-in",
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-[100vh] max-md:h-svh flex overflow-hidden  relative BGCLR"
    >
      <img
        src={`/new_img/AA.jpeg`}
        alt="IMG"
        className="w-full h-full object-cover absolute top-0 left-0  object-bottom Igm  opacity-0 "
      />

      <div className="w-2/2 absolute max-sm:top-[20%] sm:top-[14%] left-1/2  justify-center items-center max-md:w-full -translate-x-1/2 flex flex-col  max-sm:px-5">
        {/* <p className=' uppercase Font_CV  COLOR_TEXT_RED text-[6rem] leading-[6rem] max-md:text-[15vw] max-md:leading-[16vw] ' >THE wedding Venue</p> */}
        {/* <h1 className=" uppercase Font_CV  COLOR_TEXT_RED text-[2.5vw] leading-[2.5vw] max-md:text-[1rem] max-md:leading-[1rem] mt-[2vh] overflow-hidden ">
          <span className="flex WEDMAIMTT2 translate-y-[100%]">
            
          </span>
        </h1> */}
        <h1
          style={{
            fontSize: "clamp(2.8rem, 6vw, 5.5rem)",
            lineHeight: "clamp(3rem, 6.5vw, 6rem)",
          }}
          className=" capitalize Font_CV   mt-[21vh] max-md:mt-[0.5vh] text-[#F1E2C6] overflow-hidden ">
          <span className="flex WEDMAIMTT2 text-center uppercase  translate-y-[100%] max-md:text-center">
            {" "}
            Marrakech,
            <br />
            with Love
          </span>
        </h1>
      </div>
    </div>
  );
};

export default HeroSectionVenue;