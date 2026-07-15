"use client";
import { FaUmbrellaBeach } from "react-icons/fa";
import { IoMusicalNotes } from "react-icons/io5";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { GoArrowUpRight } from "react-icons/go";
import {
  GraduationCap,
  Gamepad2,
  Utensils,
  Music2,
  Waves,
  Bike,
  Pizza,
  Wine,
  Heart,
  Landmark,
  TreePine,
  Fish,
  MapPin,
  
} from "lucide-react";
gsap.registerPlugin(ScrollTrigger);

// Each stop has a main photo ("us"), city/year (shown as an overlay on
// that photo), a short story line, and 2-3 `landmarks`. A landmark can
// carry a real photo (`img`) once you have one - until then it renders
// as an icon tile. `href` makes the whole tile + its caption a link.
const DATA = [
   {
    img: "/clientImg/Miami.jpg",
    text: "Miami",
    year: "2023",
    pTxt: "  ",
    landmarks: [
      // { icon: Pizza, label: "Joe's Pizza", href: "https://www.joespizzanyc.com/" },
      // { icon: Utensils, label: "Kati Roll Company", href: "https://www.tkrc.co.uk/" },
    ],
  },
  {
    img: "/clientImg/Boston1.jpg",
    text: "Boston",
    year: "2013",
    pTxt: "Where their Dosti began.",
    landmarks: [
      { icon: GraduationCap, label: "Boston University" },
      { icon: Gamepad2, label: "Mario Kart" },
    ],
  },
  {
    img: "/clientImg/21.webp",
    text: "Mumbai",
    year: "2021",
    pTxt: "Wandering Kala Ghoda's art streets and chasing the best kebabs in the city.",
    landmarks: [
      { icon: Landmark, label: "Kala Ghoda" },
      { icon: Utensils, label: "Bademiya" },
    ],
  },
  {
    img: "/clientImg/2.webp",
    text: "Atlanta",
    year: "2022",
    pTxt: "Managing mischief on the dance floor, chasing waffles at sunrise, then waterfalls at sunset. ",
    landmarks: [
      { icon: Music2, label: "Tongue and Groove", href: "https://tandgonline.com/" },
      { icon: Waves, label: "Amicalola Falls State Park" },
      { icon: Utensils, label: "Waffle House" },
    ],
  },
  {
    img: "/clientImg/Thailan.JPG",
    text: "Thailand",
    year: "2022",
    pTxt: "Painting Bangkok red, celebrating love on the beach, overdosing on pad thai",
    landmarks: [
      { icon: IoMusicalNotes, label: "Bangkok \u2014 Muay Thai & The Bamboo Bar" },
      { icon: FaUmbrellaBeach, label: "Phuket \u2014 Friend's Wedding" },
    ],
  },
  {
    img: "/clientImg/Singapore.jpeg",
    text: "Singapore",
    year: "2022",
    pTxt: "Food market fun, racing on bikes, watching the sunrise from Singapore’s roof",
    landmarks: [
      { icon: Bike, label: "Gardens by the Bay", href: "https://www.gardensbythebay.com.sg/" },
      { icon: Utensils, label: "Maxwell Food Centre", href: "https://chinatown.sg/dine/maxwell-hawker-centre/" },
    ],
  },
  {
    img: "/clientImg/25.webp",
    text: "New York",
    year: "2023",
    pTxt: "Our city, Joe's Pizza at 00:00 cause we said so, new rooftop who dis, Kati Rolls for breakfast",
    landmarks: [
      { icon: Pizza, label: "Joe's Pizza", href: "https://www.joespizzanyc.com/" },
      { icon: Utensils, label: "Kati Roll Company", href: "https://www.tkrc.co.uk/" },
    ],
  },
 
  {
    img: "/clientImg/12.webp",
    text: "Ithaca",
    year: "2024",
    pTxt: "Wandering Cornell's campus and sipping cider above the gorges.",
    landmarks: [
      { icon: GraduationCap, label: "Cornell University" },
      { icon: Wine, label: "Finger Lakes Cider House", href: "https://www.fingerlakesciderhouse.com/" },
    ],
  },
  {
    img: "/clientImg/24.webp",
    text: "New Orleans",
    year: "2024",
    pTxt: "Jazz spilling out of the Spotted Cat and beignets on Bourbon Street.",
    landmarks: [
      { icon: MapPin, label: "Bourbon Street" },
      { icon: Utensils, label: "Felix's Restaurant" },
      { icon: Music2, label: "The Spotted Cat Music Club", href: "https://www.spottedcatmusicclub.com/" },
    ],
  },
  {
    img: "/clientImg/1.webp",
    text: "Atlanta",
    year: "2024",
    pTxt: "The question, the answer, and a museum full of history to remember it by.",
    landmarks: [
      { icon: Heart, label: "The Proposal" },
      { icon: Landmark, label: "Millennium Gate Museum", href: "https://www.thegatemuseum.org/" },
    ],
  },
  {
    img: "/clientImg/31.webp",
    text: "Sri Lanka",
    year: "2025",
    pTxt: "Surf lessons on the southern coast and sunsets from Ishq Villa.",
    landmarks: [
      { icon: MapPin, label: "Colombo" },
      { icon: Waves, label: "Ishq Villa \u2014 Surf & Sea" },
    ],
  },
  {
    img: "/clientImg/17.webp",
    text: "Kampala",
    year: "2025",
    pTxt: "Chasing Murchison’s mist, smiles on the Nile, Matoke madness, reliving childhood mischief of little Shradds",
    landmarks: [
      { icon: Waves, label: "Murchison Falls National Park" },
      { icon: Utensils, label: "Matoke" },
      { icon: MapPin, label: "The Nile River" },
    ],
  },
  {
    img: "/clientImg/28.webp",
    text: "Savannah",
    year: "2025",
    pTxt: "Saying \u201cI do\u201d under Spanish oak trees at the county courthouse.",
    landmarks: [
      { icon: Heart, label: "Our Court Wedding" },
      { icon: TreePine, label: "Spanish Oak Trees" },
      { icon: Landmark, label: "Chatham County Courthouse" },
    ],
  },
  {
    img: "/clientImg/KeyWest.jpg",
    text: "Key West",
    year: "2025",
    pTxt: "Key lime pie, dolphin sightings, and mangroves stretching to the horizon.",
    landmarks: [
      { icon: Utensils, label: "Key Lime Pie" },
      { icon: Fish, label: "Dolphins & Mangrove Forest", href: "https://floridakeys.noaa.gov/plants/mangroves.html" },
    ],
  },
  {
    img: "/clientImg/Egypt.jpeg",
    text: "Egypt",
    year: "2026",
    pTxt: "Steeped in history, wrapped in family warmth and sailing into our wedding year with big love and gratitude",
    landmarks: [
      { icon: Landmark, label: "Pyramids of Giza" },
      { icon: Landmark, label: "Hatshepsut & Ramses" },
    ],
  },
  {
    img: "/clientImg/20.webp",
    text: "London",
    year: "2026",
    pTxt: "The next chapter, waiting to be written.",
    landmarks: [],
  },
];

const IMAGES = [
  "/clientImg/1.webp",
  "/clientImg/2.webp",
  "/clientImg/3.webp",
  "/clientImg/4.webp",
  "/clientImg/5.webp",
  "/clientImg/6.webp",
  "/clientImg/7.webp",
  "/clientImg/8.webp",
  "/clientImg/9.webp",
  "/clientImg/10.webp",
  "/clientImg/11.webp",
  "/clientImg/12.webp",
  "/clientImg/13.webp",
  "/clientImg/14.webp",
  "/clientImg/15.webp",
  "/clientImg/16.webp",
  "/clientImg/17.webp",
  "/clientImg/18.webp",
  "/clientImg/19.webp",
  "/clientImg/20.webp",
  "/clientImg/21.webp",
  "/clientImg/22.webp",
  "/clientImg/23.webp",
  "/clientImg/24.webp",
  "/clientImg/25.webp",
  "/clientImg/26.webp",
  "/clientImg/27.webp",
  "/clientImg/28.webp",
  "/clientImg/29.webp",
  "/clientImg/30.webp",
  "/clientImg/31.webp",
  "/clientImg/32.webp",
];

// Desktop keeps the original dense 64-image, 4-column (2 per side) layout.
// Mobile switches to a single column per side with fewer, bigger tiles and
// no horizontal jitter, so nothing can collide.
const BACKGROUND_IMAGE_COUNT_DESKTOP = 64;
const BACKGROUND_IMAGE_COUNT_MOBILE = 18;

// Percentage width of the empty gap in the center of the screen.
// e.g. 40 means the middle 40% of the width (30%-70%) stays empty.
const CENTER_GAP_PERCENT = 40;

function createBackgroundLayout(isMobile) {
  // Desktop: 4 columns (2 per side). Mobile: 2 columns (1 per side) so
  // tiles never sit next to another tile on the same side.
  const columns = isMobile ? 2 : 4;
  const count = isMobile ? BACKGROUND_IMAGE_COUNT_MOBILE : BACKGROUND_IMAGE_COUNT_DESKTOP;
  const rows = Math.ceil(count / columns);

  const xPadding = 2;
  const yPadding = 2;

  // Split the usable width into a LEFT half and a RIGHT half,
  // with CENTER_GAP_PERCENT reserved as empty space in the middle.
  const halfGap = CENTER_GAP_PERCENT / 2;
  const leftStart = xPadding;
  const leftEnd = 50 - halfGap;
  const rightStart = 50 + halfGap;
  const rightEnd = 100 - xPadding;

  const leftWidth = leftEnd - leftStart;
  const rightWidth = rightEnd - rightStart;

  const usableHeight = 100 - yPadding * 2;

  const sideColumns = columns / 2; // 1 on mobile, 2 on desktop

  // On mobile we drop the horizontal jitter entirely (x stays 0) so each
  // side's single column of tiles can never drift into its neighbor or
  // into the center gap. A small vertical jitter keeps it from feeling
  // like a rigid grid.
  const directionOffsets = isMobile
    ? [
        { x: 0, y: -1.5 },
        { x: 0, y: 1.5 },
      ]
    : [
        { x: 0, y: -2.4 },
        { x: 0, y: 2.4 },
        { x: -2, y: 0 },
        { x: 2, y: 0 },
      ];

  return Array.from({ length: count }, (_, index) => {
    const row = Math.floor(index / columns);
    const col = index % columns;
    const lineDirection = directionOffsets[index % directionOffsets.length];
    const rowShift = isMobile ? 0 : row % 2 === 0 ? -2 : 2;

    // First half of columns go in the left half, rest go in the right half.
    const isLeftSide = col < columns / 2;
    const sideColIndex = isLeftSide ? col : col - columns / 2;

    const baseX = isLeftSide
      ? leftStart + ((sideColIndex + 0.5) / sideColumns) * leftWidth
      : rightStart + ((sideColIndex + 0.5) / sideColumns) * rightWidth;

    const baseY = ((row + 0.5) / rows) * usableHeight + yPadding;

    const minX = isLeftSide ? leftStart : rightStart;
    const maxX = isLeftSide ? leftEnd : rightEnd;

    return {
      x: Math.min(maxX, Math.max(minX, baseX + lineDirection.x + rowShift)),
      y: Math.min(98, Math.max(2, baseY + lineDirection.y)),
      o: index % 3 === 1 ? 0.16 : 1,
    };
  });
}

// =================================================================================================================

function FloatingImage({ item, index, isMobile }) {
  const ref = useRef(null);

  useEffect(() => {
    const mobileMQ = window.matchMedia("(max-width: 768px)").matches;
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    let sectionProgress = 0;
    const lerp = (a, b, t) => a + (b - a) * t;

    const onMove = (e) => {
      if (mobileMQ) return;
      mouseX = (e.clientX / window.innerWidth - 0.5) * 120;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 120;
    };

    window.addEventListener("mousemove", onMove);

    const st = ScrollTrigger.create({
      trigger: ".paren_nn",
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate(self) {
        sectionProgress = self.progress;
      },
      onLeave: () => {
        sectionProgress = 1;
      },
      onLeaveBack: () => {
        sectionProgress = 0;
      },
    });

    let raf;
    const section = document.querySelector(".paren_nn");
    const sectionHeight = section?.offsetHeight || 1;

    const update = () => {
      const targetX = mouseX * (item.o > 0.5 ? 0.6 : 0.3);
      const progressY = sectionProgress * sectionHeight;
      const scrollOffset = -(progressY * 0.12);
      const targetY = mouseY * (item.o > 0.5 ? 0.5 : 0.25) + scrollOffset;

      currentX = lerp(currentX, targetX, 0.08);
      currentY = lerp(currentY, targetY, 0.08);

      gsap.set(ref.current, {
        xPercent: -50,
        yPercent: -50,
        x: currentX,
        y: currentY,
        force3D: true,
      });
      raf = requestAnimationFrame(update);
    };

    update();

    return () => {
      cancelAnimationFrame(raf);
      st.kill();
      window.removeEventListener("mousemove", onMove);
    };
  }, [item]);

  return (
    <div
      ref={ref}
      className="absolute will-change-transform block"
      style={{ left: `${item.x}%`, top: `${item.y}%`, opacity: 0.6 }}
    >
      <img
        src={IMAGES[index % IMAGES.length]}
        alt=""
        draggable={false}
        className={`${isMobile ? "w-[26vw]" : "w-[14vw] sm:w-[10vw] md:w-[8vw]"} ${
          item.o === 1 ? "hover:scale-115 transition-all duration-700" : ""
        }`}
      />
    </div>
  );
}

// One "extra photo" slot: a real photo if `landmark.img` is set,
// otherwise an icon stands in for it. The label always shows as
// visible text underneath, and the whole tile links out if `href`
// is provided.
function LandmarkTile({ landmark }) {
  const Icon = landmark.icon;
  const isLink = Boolean(landmark.href);
  const Wrapper = isLink ? "a" : "div";
  const wrapperProps = isLink
    ? { href: landmark.href, target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <Wrapper
      {...wrapperProps}
      className={`group flex w-4 shrink-0 flex-col  items-center gap-1 text-center max-sm:w-1/4 max-sm:h-fit sm:w-[4.5rem] md:w-20 ${
        isLink ? "cursor-pointer" : ""
      }`}
    >
      <div className="relative sm:aspect-square w-full max-sm:w-fit overflow-hidden  transition-transform duration-500 ease-out group-hover:-translate-y-1">
        {landmark.img ? (
          <img
            src={landmark.img}
            alt={landmark.label}
            className="h-full w-full object-cover"
            draggable={false}
          />
        ) : (
          <div className="flex h-full w-full items-end justify-center  max-sm:mx-auto max-sm:mt-10  max-sm:w-fit max-sm:h-fit pb-2 text-[#F1E2C6] ">
            {Icon && <Icon size={27} strokeWidth={1.5} />}
          </div>
        )}
      </div>
      <span
        className={`Font_CV text-[0.55rem] max-sm:text-[0.7rem] leading-tight tracking-wide text-[#F1E2C6] sm:text-[0.8rem] sm:leading-[0.8rem] ${
          isLink ? "underline decoration-[#F1E2C6]/50 underline-offset-2 group-hover:decoration-[#F1E2C6]" : ""
        }`}
      >
        {landmark.label}
      </span>
    </Wrapper>
  );
}

export default function ParallaxScroll() {
  const scope = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  const progress = DATA.length > 1 ? activeIndex / (DATA.length - 1) : 0;
  const activeItem = DATA[activeIndex];

  useGSAP(
    () => {
      // NOTE: previously there was a second ScrollTrigger here that faded
      // ".sticky_child" in/out (opacity 0->1, scale 0.9->1) once the user
      // scrolled past 5% of the section, and reversed it on scroll-up.
      // That trigger fired independently of the one below that sets
      // activeIndex, so the very first slide (Boston) lived entirely in
      // the window where the wrapper was still invisible / reversing back
      // to invisible - meaning it never actually appeared on screen, and
      // scrolling back to the top (e.g. via the nav) re-hid everything.
      // Each slide already fades itself in/out based on activeIndex, so
      // the wrapper no longer needs its own separate visibility trigger -
      // it's just kept visible and in sync with the index trigger below.

      ScrollTrigger.create({
        trigger: ".paren_nn",
        start: "top -50%",
        end: "bottom bottom",
        onUpdate(self) {
          const total = DATA.length;
          const index = Math.min(total - 1, Math.floor(self.progress * total));
          setActiveIndex(index);
        },
      });

      return () => {
        ScrollTrigger.getAll().forEach((s) => s.kill());
      };
    },
    { scope }
  );

  const backgroundLayout = useMemo(() => createBackgroundLayout(isMobile), [isMobile]);

  const selectItem = useCallback((index) => {
    setActiveIndex(index);

    const section = scope.current;
    if (!section) return;

    const maxScroll = section.offsetHeight - window.innerHeight;
    const targetProgress = DATA.length > 1 ? index / (DATA.length - 1) : 0;
    const targetY = section.offsetTop + maxScroll * targetProgress;

    window.scrollTo({
      top: targetY,
      behavior: "smooth",
    });
  }, []);

  const openFromPointer = (event) => {
    if (event.pointerType !== "touch") setIsExpanded(true);
  };

  const closeFromPointer = (event) => {
    if (event.pointerType !== "touch") setIsExpanded(false);
  };

  const toggleFromClick = () => {
    const isTouchScreen =
      typeof window !== "undefined" &&
      window.matchMedia("(hover: none), (pointer: coarse)").matches;

    if (isTouchScreen) setIsExpanded((value) => !value);
  };

  return (
    <main ref={scope} className="paren_nn relative h-[800vh] BGCLR">
      <section className="absolute inset-0 overflow-hidden ">
        {backgroundLayout.map((item, i) => (
          <FloatingImage key={i} item={item} index={i} isMobile={isMobile} />
        ))}
      </section>

      <div className="sticky_child sticky pointer-events-none top-0 flex h-screen flex-col items-center z-89 justify-center gap-y-2 px-3 sm:gap-y-4 sm:px-8">
        {/* Main photo with city + year overlaid */}
        <div className="relative w-[68vw] max-w-[280px] h-[32vh]  sm:w-[36vw] sm:h-[38vh] sm:max-w-none md:w-[24vw] md:h-[50vh]">
          {DATA.map((item, i) => (
            <div
              key={i}
              className={`absolute inset-0 transition-all duration-700 ease-out ${
                i === activeIndex ? "opacity-100 scale-100" : "opacity-0 scale-105"
              }`}


            >

               <div className=" absolute bottom-[-15%] sm:bottom-[-8%] left-0 inset-x-0 flex justify-center items-center to-transparent  z-99">
                <h2 className="Font_CV  font-medium leading-none text-[1.5rem]! text-[#F1E2C6] sm:text-xs md:text-sm">
                  {item.text}
                </h2>
                {/* <p className="Font_CV  text-[1.5rem]!   leading-none text-[#F1E2C6] sm:text-xs md:text-sm">
                  {item.year}
                </p> */}
              </div>

              <img src={item.img} className="h-full w-full object-cover" alt={item.text} />

              {/* <div className="absolute bottom-0 left-0 h-[10vh] w-full bg-gradient-to-t from-[#D25F28] via-[#D25F28]/60 to-transparent" /> */}
             
            </div>
          ))}
        </div>

        {/* Landmark tiles - photo or icon, with a visible link + label */}
        <div className="relative min-h-[68px] w-[92vw]  max-w-[420px] sm:min-h-[84px] mt-10 sm:mt-2 sm:w-[70vw] md:w-[40vw]">
          {DATA.map((item, i) => (
            <div
              key={i}
              className={`pointer-events-auto absolute inset-0 flex flex-wrap  items-start justify-center gap-x-3 gap-y-2 transition-all duration-500 ease-out ${
                i === activeIndex ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
              }`}
            >
              {item.landmarks.map((landmark, li) => (
                <LandmarkTile key={li} landmark={landmark} />
              ))}
            </div>
          ))}
        </div>

        {/* Story text */}
        <div className="relative flex h-[70px] w-[88vw] max-w-[420px] mt-15 items-center justify-center text-center sm:h-[64px] sm:w-[60vw] md:w-[34vw]">
          {DATA.map((item, i) => (
            <p
              key={i}
              className={`Font_CV absolute inset-0 flex items-center justify-center px-1 max-sm:text-[2rem] text-[1.5rem] leading-[1.5rem]  text-[#F1E2C6]/85 transition-all duration-500 ease-out   ${
                i === activeIndex
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-3 pointer-events-none"
              }`}
            >
              {item.pTxt}
            </p>
          ))}
        </div>


        <div className="w-full h-svh absolute left-0 bottom-0 flex justify-end items-center  sm:hidden">

         <div className="   w-full h-[80vh] absolute bottom-0 left-0  bg-gradient-to-t sm:hidden from-[#D25F28] to-transparent -z-1" />
        </div>



        <div
          className="pointer-events-auto absolute bottom-3 sm:bottom-0 left-1/2 z-20 w-[92vw] max-w-[660px] -translate-x-1/2 px-2 pb-3 pt-8 sm:pb-4 sm:pt-10"
          onPointerEnter={openFromPointer}
          onPointerLeave={closeFromPointer}
        >

          
          <div
            className={`mx-auto mb-3 grid origin-bottom grid-cols-2 gap-x-2 gap-y-1 overflow-hidden  bg-[#F1E2C6]/95 p-2 text-[#D25F28] shadow-[0_14px_40px_rgba(0,0,0,0.18)] backdrop-blur-sm transition-all duration-500 ease-out sm:gap-y-1.5 sm:p-3 ${
              isExpanded
                ? " translate-y-0 opacity-100"
                : "max-h-0 translate-y-4 p-0 opacity-0"
            }`}
          >

            
            {DATA.map((item, i) => {
              const isActive = i === activeIndex;
              const isRowEnd = i % 2 === 1 || i === DATA.length - 1;

              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => selectItem(i)}
                  className={`group flex min-h-9 items-center justify-between r border border-[#D25F28]/10 px-3 py-2 text-left Font_CV text-sm font-medium transition-all duration-300 ease-out sm:text-base ${
                    isActive
                      ? "bg-[#D25F28] text-[#F1E2C6]"
                      : "text-[#D25F28] hover:bg-[#D25F28] hover:text-[#F1E2C6]"
                  }`}
                >
                  <span className="flex min-w-0 items-center">
                    <span className="truncate  Font_CV">
                      {item.text}
                      {/* {isRowEnd ? "." : ","} */}
                    </span>
                  </span>
                  <span className="ml-2 translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                    <GoArrowUpRight />
                  </span>
                </button>
              );
            })}
          </div>

                  

          <button
            type="button"
            aria-expanded={isExpanded}
            onClick={toggleFromClick}
            className="group w-full cursor-pointer border-0 bg-transparent p-0"
          >
            <div className="relative h-8">
              <div className="absolute left-0 right-0 top-1/2 h-0.5 -translate-y-1/2 overflow-hidden rounded-full bg-black/10">
                <div
                  className="h-full bg-[#F1E2C6] transition-[width] duration-500 ease-out"
                  style={{ width: `${progress * 100}%` }}
                />
              </div>

              <div
                className="absolute top-1/2 overflow-hidden  bg-[#F1E2C6] px-5 py-1 text-[#D25F28] shadow-[0_8px_18px_rgba(0,0,0,0.12)] transition-all duration-500 ease-out group-hover:bg-[#D25F28] group-hover:text-[#F1E2C6]"
                style={{
                  left: `clamp(1.65rem, ${progress * 100}%, calc(100% - 1.65rem))`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div className="h-4 overflow-hidden text-xs font-medium leading-4">
                  <div
                    className="transition-transform duration-500 ease-out"
                    style={{ transform: `translateY(-${activeIndex}rem)` }}
                  >
                    {DATA.map((item, i) => (
                      <div key={i} className="h-4 flex items-center justify-center">
                        {item.year}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </button>
        </div>
      </div>
    </main>
  );
}