"use client";
import React, { useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const WeddingVenue = () => {
  useGSAP(() => {
    const isMobile = window.innerWidth < 700;

    gsap.from(".WeddingText", {
      opacity: 0,
      yPercent: 20,
      stagger: { each: 0.5 },
      ease: "none",
      scrollTrigger: {
        trigger: ".WeddingTextCont",
        start: isMobile ? "top 90%" : "top 70%",
        end: isMobile ? "top 50%" : "top 20%",
        scrub: true,
        // markers: true
      },
    });
  }, []);

  return (
    <section className="h-fit max-md:h-fit  WeddingTextCont py-[10vh] flex items-center justify-center BGCLR px-6">
      <div className=" text-center text-[#F1E2C6]  ">
        <p className="max-w-[70vw] mx-auto   text-[1rem] leading-[1rem] max-sm:text-[1.2rem] max-sm:leading-[1.4rem] COLOR_TEXT_RED  ">
          ⴰⵣⵓⵍ, Azul
          <br />
          <br />A greeting from the native berber tongue conveying peace and
          love. “Azul” is derived from the roots “Az” meaning to come close, and
          “Oul” translating to heart. Welcome to our heart.
        </p>

        {/* <br />
        <br /> */}

        {/* Description */}
        {/* <p className="max-w-[70vw] mx-auto   text-[1rem] leading-[1rem] max-sm:text-[1.2rem] max-sm:leading-[1.4rem] COLOR_TEXT_RED  ">
          Marrakech rewards the unhurried. The medina has a way of folding in on itself; take the wrong turn down an alley, and you'll often end up somewhere better than where you meant to go. We've mapped our favorite corners of the city, so you can wander with intention or with none at all. Whether you’ve got a free afternoon or you’re arriving a few days early to make the most of it, here is a brief guide on attractions, food, shopping and general fun.</p> */}
      </div>
    </section>
  );
};

export default WeddingVenue;
