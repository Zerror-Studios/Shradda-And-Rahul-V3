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
    question: "What to wear in Marrakech",
    answer:
      "Modest dress is appreciated in the medina and around mosque exteriors. Shoulders and knees covered travels well in any weather.",
  },
  {
    id: 2,
    question: "Getting around",
    answer:
      "Petit taxis are cheap and everywhere. Agree on a fare (or ask for the meter) before you get in, especially near tourist spots. Hotel taxis and Ubers are great options too!",
  },
  {
    id: 3,
    question: "Bargaining in the souks",
    answer:
      "It's expected (and respected), and a big part of the fun. Carry small dirham notes—fewer vendors can break a large bill than you'd think.",
  },
  {
    id: 4,
    question: "Fridays run differently",
    answer:
      "Many shops close or shorten hours around midday prayer. Worth checking before you plan a Friday souk trip.",
  },
  {
    id: 5,
    question: "Best light",
    answer:
      "Early morning or golden hour, especially at Jemaa el-Fnaa and Menara Gardens, when the crowds and the heat both thin out.",
  },
  {
    id: 6,
    question: "Book ahead",
    answer:
      "Jardín Majorelle now requires timed tickets booked in advance. Walk-up entry isn't reliable, especially in October.",
  },
  {
    id: 7,
    question: "When should I depart?",
    answer:
      "We sadly bid farewell on the 23rd of October with check-out from all hotels at 12:00 PM. We totally recommend exploring Morocco further if you have any fuel left in the tank!",
  },
  {
    id: 8,
    question: "Do you have any tour recommendations for after the celebration?",
    answer:
      "We are currently working with I Morocco Tours to put together an epic 3-night itinerary for our guests to explore the beauty of the Moroccan desert landscape. We will send more information soon!",
  },
  {
    id: 9,
    question: "Do I need a visa?",
    answer:
      "Citizens of over 70 countries, including the US, UK, EU/Schengen countries, Canada, Australia, and many others, can visit Morocco for up to 90 days without a visa. Simply bring an undamaged passport with at least two blank pages that is valid for at least six months from your date of entry.",
  },
  {
    id: 10,
    question: "Who can apply for an electronic visa?",
    answer:
      "You may apply for an e-visa if you reside in the EU, USA, Australia, Canada, UK, Japan, Norway, New Zealand, UAE, or Switzerland with a valid passport and residency permit, or if you hold a valid Schengen, US, or UK tourist visa. The electronic visa is valid for 180 days from the date of issue, allows a single entry, and permits a stay of up to 30 days.",
  },
  {
    id: 11,
    question: "Do I need to apply for a paper visa?",
    answer:
      "If you are not eligible for a visa-free entry or an e-visa, you will need to apply for a paper visa at your nearest Moroccan Consulate. We recommend applying at least three months before travel. If you need supporting documents for your application, we are happy to help.",
  },
  {
    id: 12,
    question: "Important note on visas",
    answer:
      "Visa requirements may change, so please double-check with your local Moroccan embassy or consulate before booking flights. More information is available at https://www.acces-maroc.ma/#/.",
  },
  {
    id: 13,
    question: "Which airport do I need to fly into?",
    answer:
      "Fly into Marrakech Menara Airport (RAK), located about 6 km from the medina and approximately 40 minutes from The Oberoi. Many flights connect through Casablanca Mohammed V International Airport. If transiting via Casablanca, allow extra time for immigration, as you'll clear immigration at your first point of entry into Morocco.",
  },
  {
    id: 14,
    question: "Recommended flight routes",
    intro:
      "We love and appreciate you all for making this massive journey to celebrate with us! Here are a few flight routes to get you smoothly to Marrakech, RAK:",
    answer: [
      { label: "From Uganda", text: "Turkish Airlines via Istanbul, Etihad via Abu Dhabi, Ethiopian Airlines via Addis Ababa." },
      { label: "From the USA", text: "Delta flies direct from ATL to RAK; Air France via Paris; TAP Portugal via Lisbon; and Royal Air Maroc from JFK to RAK." },
      { label: "From India", text: "Emirates/Flydubai via Dubai, Qatar Airways via Doha, or Turkish Airlines via Istanbul." },
      { label: "From Hong Kong", text: "Turkish Airlines via Istanbul or Air France via Paris." },
      { label: "From UK/Europe", text: "Many direct flights to Marrakech." },
      { label: "From a more exotic location", text: "please reach out, and we can get mapping!" },
    ],
  },
  {
    id: 15,
    question: "Accommodation",
    answer:
      "Your accommodation will be organized by the Vadodaria and Modi families. We appreciate your patience while everything is finalized and will be in touch soon.",
  },
  {
    id: 16,
    question: "Transport",
    answer:
      "Transfers will be arranged for all guests between the hotels and wedding events, including airport shuttle services.",
  },
  {
    id: 17,
    question: "May I extend my stay?",
    answer:
      "Absolutely! Subject to availability at your assigned hotel, your stay can be extended at our group rate.",
  },
  {
    id: 18,
    question: "What is the weather like in Marrakech in October?",
    answer:
      "Literally perfect! A stunning 22-27°C in the day and 16-20°C in the evening. USA folks, we got you: 71 to 80°F in the day and 60-68°F- pack accordingly!",
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
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    // #1E4858
    <section
      ref={sectionRef}
      className="w-full py-10 relative overflow-hidden BGCLR"
    >
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
                    {Array.isArray(item.answer) ? (
                      <div className="max-w-[700px]">
                        {item.intro && (
                          <p
                            className={`
                            tracking-tight font-medium text-[#F1E2C6]  text-[1rem] leading-[1rem] max-sm:text-[1.2rem] max-sm:leading-[1.4rem] 
                            mb-3
                          `}
                          >
                            {item.intro}
                          </p>
                        )}
                        <div className="flex flex-col gap-2">
                          {item.answer.map((line, lineIndex) => (
                            <p
                              key={lineIndex}
                              className={`
                              tracking-tight  text-[#F1E2C6]  text-[1rem] leading-[1rem] max-sm:text-[1.2rem] max-sm:leading-[1.4rem] 
                            `}
                            >
                              <span className="font-semibold">
                                {line.label}:
                              </span>{" "}
                              <span>{line.text}</span>
                            </p>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <p
                        className={`
                        tracking-tight font-medium text-[#F1E2C6]  text-[1rem] leading-[1rem] max-sm:text-[1.2rem] max-sm:leading-[1.4rem] 
                        max-w-[700px]
                      `}
                      >
                        {item.answer}
                      </p>
                    )}
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