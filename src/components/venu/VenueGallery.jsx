"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);

const VenueGallery = ({ slideImg, STA1Txt, STA2Txt }) => {
  const sliderRef = useRef(null);

  const images = [...slideImg, ...slideImg]; // duplicate for loop

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const totalWidth = slider.scrollWidth / 2;
    const wrap = gsap.utils.wrap(-totalWidth, 0);

    // ✅ Detect mobile (runs only on client, safe in Next.js)
    const isMobile = window.innerWidth < 640;

    let tween = null;

    // ✅ ONLY DESKTOP → auto scroll
    if (!isMobile) {
      tween = gsap.to(slider, {
        x: `-=${totalWidth}`,
        duration: 20,
        ease: "none",
        repeat: -1,
        modifiers: {
          x: (x) => wrap(parseFloat(x)) + "px",
        },
      });
    }

    // ✅ Draggable (works on both)
    const draggable = Draggable.create(slider, {
      type: "x",
      inertia: true,

      onPress() {
        if (tween) tween.pause();
      },

      onDrag() {
        gsap.set(slider, {
          x: wrap(this.x),
        });
      },

      onThrowUpdate() {
        gsap.set(slider, {
          x: wrap(this.x),
        });
      },

      onRelease() {
        if (!tween) return; // ❌ mobile → no auto resume

        const currentX = wrap(this.x);
        gsap.set(slider, { x: currentX });

        tween.progress(0);
        tween.invalidate();
        tween.play();
      },
    })[0];

    return () => {
      if (tween) tween.kill();
      draggable.kill();
    };
  }, []);

  return (
    <>
      <div className={`w-full h-fit flex flex-col justify-center BGCLR text-center items-center ${STA1Txt == "" ? " pt-0vh" : " pt-[5vh]"}  pb-[10vh]`}>
        <div className="COLOR_TEXT_RED Font_CV text-[3vw] w-fit h-fit leading-[3vw]  max-md:text-[10vw] max-md:leading-[12vw] tracking-tight overflow-hidden">
          <span className="flex MainTI Font_CV text-[#F1E2C6]  uppercase">
            {STA1Txt} <span className="max-md:hidden ml-4">{STA2Txt}</span>
          </span>
        </div>
        {/* <div className="COLOR_TEXT_RED Font_CV text-[6vw] w-fit h-fit leading-[6vw]  max-md:text-[10vw] max-md:leading-[12vw] tracking-tight overflow-hidden">
          <span className="flex sm:hidden   MainTI uppercase">{STA2Txt}</span>
        </div> */}
      </div>

      <div className="w-full h-[60vh] overflow-hidden mb-[10vh] BGCLR">
        <div
          ref={sliderRef}
          className="flex gap-6 h-full cursor-grab active:cursor-grabbing"
        >
          {images.map((img, index) => (
            <div
              key={index}
              className="min-w-[250px] max-md:w-[90%] sm:min-w-[300px] md:min-w-[350px] lg:min-w-[400px] h-full flex-shrink-0"
            >
              <img
                src={img}
                alt="slide"
                className="w-full h-full object-cover object-center pointer-events-none"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default VenueGallery;