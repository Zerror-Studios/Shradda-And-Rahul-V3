

"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaArrowRight } from "react-icons/fa6";
import Link from "next/link";
import { GradFlow } from "gradflow";
import DotField from "../common/DotField";

gsap.registerPlugin(ScrollTrigger);

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState(null);

  const contentRefs = useRef([]);
  const innerRefs = useRef([]);

  // Scroll animation refs
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const btnRef = useRef(null);
  const faqRowRefs = useRef([]);
  const lineRefs = useRef([]);
  const leftSideRef = useRef(null);
  const rightSideRef = useRef(null);

  const faqData = [
    {
      id: 1,
      question: "Are children invited?",
      answer: `While we love your little ones, this will be an adults-only celebration. We hope you enjoy a relaxing weekend with us!`,
    },
    {
      id: 2,
      question: "Is there a gift registry?",
      answer: `Your presence at our wedding is the greatest gift. However, if you wish to honor us with a gift, we will be sharing registry details soon.`,
    },
    {
      id: 3,
      question: "Will there be parking available at the venue?",
      answer: `Yes, complimentary parking will be available at the venue for all guests. Valet service will also be provided.`,
    },
    {
      id: 4,
      question: "Can I take photos during the",
      answer: `We kindly request guests to limit phone usage during the ceremony and enjoy the moment with us. A professional photographer will capture all special moments.`,
    },
    {
      id: 5,
      question: "Are dietary restrictions accommodated?",
      answer: `Absolutely! Please inform us of any dietary restrictions in advance, and we will ensure suitable arrangements are made.`,
    },
    {
      id: 6,
      question: "Will there be Wi-Fi at the venue?",
      answer: `Yes, complimentary Wi-Fi will be available at the venue for all guests.`,
    },
    {
      id: 7,
      question: "What should I do if I arrive early?",
      answer: `If you arrive early, feel free to explore the city, relax at the hotel, or connect with other guests before the celebrations begin.`,
    },
    {
      id: 8,
      question: "Is there a backup plan for outdoor events?",
      answer: `Yes, in case of unexpected weather, all outdoor events will have a beautiful indoor backup arranged.`,
    },
    {
      id: 9,
      question: "Will there be live music or entertainment?",
      answer: `Yes! We have planned live music and special performances to make the celebration even more memorable.`,
    },
    {
      id: 10,
      question: "Can I share the event details on social media?",
      answer: `Of course! We'd love for you to share the joy. Please use our wedding hashtag when posting your photos.`,
    },
    {
      id: 11,
      question: "Is there a dress code for the events?",
      answer: ``,
    },
  ];

  // ── Accordion GSAP logic ─────────────────────────────────────────
  useEffect(() => {
    contentRefs.current.forEach((content, index) => {
      const inner = innerRefs.current[index];
      if (index === activeIndex) {
        gsap.to(content, {
          height: inner.offsetHeight,
          duration: 0.5,
          ease: "power3.inOut",
        });
      } else {
        gsap.to(content, {
          height: 0,
          duration: 0.5,
          ease: "power3.inOut",
        });
      }
    });
  }, [activeIndex]);

  // ── Page Load animation: lines only, width 0 -> 100% ───────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRefs.current,
        { width: "0%" },
        {
          width: "100%",
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.08,
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (

    // #1E4858
    <section ref={sectionRef} className="w-full py-10 relative overflow-hidden BGCLR">
      {/* <div className="fixed top-0 left-0 inset-0 w-full h-full z-[-1]  ">
      </div> */}

      <div className="grid lg:grid-cols-2 min-h-screen pt-[10vh]">
        {/* LEFT SIDE */}
        <div
          ref={leftSideRef}
          className="lg:sticky lg:top-0 flex items-start max-sm:pb-[5vh] justify-center"
        >
          <div className="w-full px-4 md:px-8 lg:px-16 max-sm:text-center ">
            <h1
              ref={headingRef}
              className="Font_CV  text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#F1E2C6] uppercase"
            >
              Frequently Asked
              <br />
              Questions
            </h1>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div ref={rightSideRef} className="px-4 md:px-8 lg:px-16">
          <div>
            {faqData.map((item, index) => (
              <div
                key={index}
                ref={(el) => (faqRowRefs.current[index] = el)}
                className="pb-2 relative"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-start justify-between gap-6 pt-5 text-left"
                >
                  <h3
                    className={`
                    text-[#F1E2C6]
                    Font_CV
                    text-[1.5rem]
                     capitalize
                    sm:text-[1.4rem]
                    md:text-[1.8rem]
                    leading-[1.2]
                    max-w-[90%]
                    pb-4
                  `}
                  >
                    {item.question}
                  </h3>

                  <div
                    className={`
                    flex-shrink-0
                    w-10 h-10
                    md:w-12 md:h-12
                    rounded-lg
                    BgBlue
                    text-[#F1E2C6]
                    flex items-center justify-center
                    text-lg md:text-xl
                    transition-transform duration-300
                  `}
                  >
                    {activeIndex === index ? "−" : "+"}
                  </div>
                </button>

                <div
                  ref={(el) => (contentRefs.current[index] = el)}
                  className="overflow-hidden h-0"
                >
                  <div
                    ref={(el) => (innerRefs.current[index] = el)}
                    className="pb-5 pr-4 sm:pr-8 md:pr-16"
                  >
                    <p
                      className={`
                      capitalize tracking-tight font-light text-[#F1E2C6] text-[0.9rem]  leading-[1.1rem]
                      max-w-[700px]
                    `}
                    >
                      {item.answer}
                    </p>
                  </div>
                </div>

                {/* animated line, width 0 -> 100% on load */}
                <div
                  ref={(el) => (lineRefs.current[index] = el)}
                  className="h-[1px] bg-[#F1E2C6] w-0"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}