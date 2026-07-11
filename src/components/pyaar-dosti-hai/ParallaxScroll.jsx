// // // // // "use client";

// // // // // import { useEffect, useMemo, useRef } from "react";
// // // // // import gsap from "gsap";
// // // // // import ScrollTrigger from "gsap/dist/ScrollTrigger";
// // // // // import { useGSAP } from "@gsap/react";
// // // // // gsap.registerPlugin(ScrollTrigger);

// // // // // const DATA = [
// // // // //   { img: "/clientImg/2.webp", text: "Atlanta", year: "2022" },
// // // // //   { img: "/clientImg/5.webp", text: "Bangkok", year: "2022" },
// // // // //   { img: "/clientImg/12.webp", text: "Singapore", year: "2022" },
// // // // //   { img: "/clientImg/26.webp", text: "New York", year: "2023" },
// // // // //   { img: "/clientImg/13.webp", text: "Ithaca", year: "2024" },
// // // // //   { img: "/clientImg/24.webp", text: "New Orleans", year: "2024" },
// // // // //   { img: "/clientImg/31.webp", text: "Sri Lanka", year: "2025" },
// // // // //   { img: "/clientImg/16.webp", text: "Kampala", year: "2025" },
// // // // //   { img: "/clientImg/21.webp", text: "Key West / Miami", year: "2025" },
// // // // //   { img: "/clientImg/29.webp", text: "Savannah (Civil Ceremony)", year: "2025" },
// // // // //   { img: "/clientImg/10.webp", text: "Egypt", year: "2025" },
// // // // // ];

// // // // // const IMAGES = [
// // // // //   '/clientImg/1.webp',
// // // // //   '/clientImg/2.webp',
// // // // //   '/clientImg/3.webp',
// // // // //   '/clientImg/4.webp',
// // // // //   '/clientImg/5.webp',
// // // // //   '/clientImg/6.webp',
// // // // //   '/clientImg/7.webp',
// // // // //   '/clientImg/8.webp',
// // // // //   '/clientImg/9.webp',
// // // // //   '/clientImg/10.webp',
// // // // //   '/clientImg/11.webp',
// // // // //   '/clientImg/12.webp',
// // // // //   '/clientImg/13.webp',
// // // // //   '/clientImg/14.webp',
// // // // //   '/clientImg/15.webp',
// // // // //   '/clientImg/16.webp',
// // // // //   '/clientImg/17.webp',
// // // // //   '/clientImg/18.webp',
// // // // //   '/clientImg/19.webp',
// // // // //   '/clientImg/20.webp',
// // // // //   '/clientImg/21.webp',
// // // // //   '/clientImg/22.webp',
// // // // //   '/clientImg/23.webp',
// // // // //   '/clientImg/24.webp',
// // // // //   '/clientImg/25.webp',
// // // // //   '/clientImg/26.webp',
// // // // //   '/clientImg/27.webp',
// // // // //   '/clientImg/28.webp',
// // // // //   '/clientImg/29.webp',
// // // // //   '/clientImg/30.webp',
// // // // //   '/clientImg/31.webp',
// // // // //   '/clientImg/32.webp',
// // // // // ];

// // // // // const LAYOUT = [
// // // // //   { x: 4, y: 12, o: 1 },
// // // // //   { x: 22, y: 26, o: 0.1 },
// // // // //   { x: 48, y: 10, o: 1 },
// // // // //   { x: 88, y: 6, o: 1 },

// // // // //   { x: 10, y: 46, o: 0.1 },
// // // // //   { x: 30, y: 58, o: 1 },
// // // // //   { x: 52, y: 48, o: 0.1 },
// // // // //   { x: 74, y: 42, o: 1 },
// // // // //   { x: 92, y: 54, o: 0.1 },

// // // // //   { x: 12, y: 82, o: 1 },
// // // // //   { x: 34, y: 90, o: 0.1 },
// // // // //   { x: 86, y: 78, o: 1 },
// // // // //   { x: 82, y: 86, o: 0.1 },

// // // // //   { x: 4, y: 118, o: 1 },
// // // // //   { x: 26, y: 132, o: 0.1 },
// // // // //   { x: 50, y: 120, o: 1 },
// // // // //   { x: 74, y: 128, o: 0.1 },

// // // // //   { x: 8, y: 160, o: 1 },
// // // // //   { x: 32, y: 174, o: 0.1 },
// // // // //   { x: 56, y: 164, o: 1 },
// // // // //   { x: 82, y: 170, o: 0.1 },
// // // // // ];

// // // // // function FloatingImage({ item, index }) {
// // // // //   const ref = useRef(null);

// // // // //   useEffect(() => {
// // // // //     // Disable mouse parallax on touch/mobile devices
// // // // //     const isMobile = window.matchMedia("(max-width: 768px)").matches;

// // // // //     let mouseX = 0;
// // // // //     let mouseY = 0;
// // // // //     let currentX = 0;
// // // // //     let currentY = 0;
// // // // //     let sectionProgress = 0;

// // // // //     const lerp = (a, b, t) => a + (b - a) * t;

// // // // //     const onMove = (e) => {
// // // // //       if (isMobile) return;
// // // // //       mouseX = (e.clientX / window.innerWidth - 0.5) * 120;
// // // // //       mouseY = (e.clientY / window.innerHeight - 0.5) * 120;
// // // // //     };

// // // // //     window.addEventListener("mousemove", onMove);

// // // // //     const st = ScrollTrigger.create({
// // // // //       trigger: ".paren_nn",
// // // // //       start: "top top",
// // // // //       end: "bottom bottom",
// // // // //       scrub: true,
// // // // //       onUpdate(self) {
// // // // //         sectionProgress = self.progress;
// // // // //       },
// // // // //       onLeave: () => { sectionProgress = 1; },
// // // // //       onLeaveBack: () => { sectionProgress = 0; },
// // // // //     });

// // // // //     let raf;
// // // // //     const section = document.querySelector(".paren_nn");
// // // // //     const sectionHeight = section?.offsetHeight || 1;

// // // // //     const update = () => {
// // // // //       const targetX = mouseX * (item.o > 0.5 ? 0.6 : 0.3);
// // // // //       const progressY = sectionProgress * sectionHeight;
// // // // //       const scrollOffset = -(progressY * 0.12);
// // // // //       const targetY = mouseY * (item.o > 0.5 ? 0.5 : 0.25) + scrollOffset;

// // // // //       currentX = lerp(currentX, targetX, 0.08);
// // // // //       currentY = lerp(currentY, targetY, 0.08);

// // // // //       gsap.set(ref.current, { x: currentX, y: currentY, force3D: true });
// // // // //       raf = requestAnimationFrame(update);
// // // // //     };

// // // // //     update();

// // // // //     return () => {
// // // // //       cancelAnimationFrame(raf);
// // // // //       st.kill();
// // // // //       window.removeEventListener("mousemove", onMove);
// // // // //     };
// // // // //   }, [item]);

// // // // //   return (
// // // // //     <div
// // // // //       ref={ref}
// // // // //       className="absolute will-change-transform"
// // // // //       style={{ left: `${item.x}%`, top: `${item.y}%`, opacity: item.o }}
// // // // //     >
// // // // //       <img
// // // // //         src={IMAGES[index % IMAGES.length]}
// // // // //         alt=""
// // // // //         draggable={false}
// // // // //         className={`w-[16vw] sm:w-[12vw] md:w-[8vw] ${item.o === 1 ? "hover:scale-115 transition-all duration-700" : ""
// // // // //           }`}
// // // // //       />
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // export default function ParallaxScroll() {
// // // // //   const scope = useRef();

// // // // //   useGSAP(
// // // // //     () => {
// // // // //       const images = gsap.utils.toArray(".img_item");
// // // // //       const texts = gsap.utils.toArray(".text_item");
// // // // //       const years = document.querySelector(".year_track");

// // // // //       gsap.set(images, { opacity: 0 });
// // // // //       gsap.set(texts, { opacity: 0 });
// // // // //       gsap.set(images[0], { opacity: 1 });
// // // // //       gsap.set(texts[0], { opacity: 1 });

// // // // //       gsap.to(".fill_x", {
// // // // //         width: "100%",
// // // // //         ease: "none",
// // // // //         scrollTrigger: {
// // // // //           trigger: ".paren_nn",
// // // // //           start: "top top",
// // // // //           end: "bottom bottom",
// // // // //           scrub: true,
// // // // //         },
// // // // //       });

// // // // //       gsap.to(".sticky_child", {
// // // // //         opacity: 1,
// // // // //         scale: 1,
// // // // //         scrollTrigger: {
// // // // //           trigger: ".sticky_child",
// // // // //           start: "5% top",
// // // // //           toggleActions: "play none none reverse",
// // // // //         },
// // // // //       });

// // // // //       let current = 0;

// // // // //       function changeSlide(index) {
// // // // //         if (index === current) return;

// // // // //         gsap.killTweensOf(images);
// // // // //         gsap.killTweensOf(texts);
// // // // //         gsap.killTweensOf(years);

// // // // //         const tl = gsap.timeline({ defaults: { duration: 0.5, ease: "power2.out" } });

// // // // //         tl.to(images[current], { opacity: 0 })
// // // // //           .to(texts[current], { opacity: 0 }, "<")
// // // // //           .to(images[index], { opacity: 1 }, "<")
// // // // //           .to(texts[index], { opacity: 1 }, "<")
// // // // //           .to(years, { y: `${-index * 1}rem` }, "<");

// // // // //         current = index;
// // // // //       }

// // // // //       ScrollTrigger.create({
// // // // //         trigger: ".paren_nn",
// // // // //         start: "top top",
// // // // //         end: "bottom bottom",
// // // // //         onUpdate(self) {
// // // // //           const total = DATA.length;
// // // // //           const index = Math.min(total - 1, Math.floor(self.progress * total));
// // // // //           changeSlide(index);
// // // // //         },
// // // // //       });

// // // // //       return () => {
// // // // //         ScrollTrigger.getAll().forEach((s) => s.kill());
// // // // //       };
// // // // //     },
// // // // //     { scope }
// // // // //   );

// // // // //   const repeated = useMemo(() => {
// // // // //     const arr = [];
// // // // //     for (let i = 0; i < 6; i++) {
// // // // //       LAYOUT.forEach((l) => {
// // // // //         arr.push({ ...l, y: l.y + i * 25 });
// // // // //       });
// // // // //     }
// // // // //     return arr;
// // // // //   }, []);

// // // // //   return (
// // // // //     <main ref={scope} className="paren_nn relative h-[800vh] BGCLR">

// // // // //       {/* Floating background images */}
// // // // //       <section className="absolute inset-0 overflow-hidden">
// // // // //         {repeated.map((item, i) => (
// // // // //           <FloatingImage key={i} item={item} index={i} />
// // // // //         ))}
// // // // //       </section>

// // // // //       {/* Sticky content */}
// // // // //       <div className="sticky_child opacity-0 scale-90 sticky pointer-events-none top-0 h-screen flex flex-col items-center justify-center gap-y-6 sm:gap-y-10 px-4 sm:px-8">

// // // // //         {/* Main image */}
// // // // //         <div className="relative w-[55vw] sm:w-[38vw] md:w-[25vw] aspect-[3.5/4]">
// // // // //           {DATA.map((item, i) => (
// // // // //             <div key={i} className="img_item absolute inset-0">
// // // // //               <img src={item.img} className="w-full h-full object-cover" alt="" />
// // // // //             </div>
// // // // //           ))}
// // // // //         </div>

// // // // //         {/* Text -> country / location name */}
// // // // //         <div className="relative w-[85vw] sm:w-[60vw] md:w-[30vw] h-[80px] sm:h-[100px] md:h-[120px] flex items-center justify-center">
// // // // //           {DATA.map((item, i) => (
// // // // //             <div
// // // // //               key={i}
// // // // //               className="text_item leading-snug max-sm:text-[1.7rem] max-sm:leading-[1.7rem] text-[#F1E2C6] Font_CV font-medium absolute inset-0 flex items-center justify-center text-xl sm:text-2xl md:text-3xl text-center"
// // // // //             >
// // // // //               {item.text}
// // // // //             </div>
// // // // //           ))}
// // // // //         </div>

// // // // //         {/* Progress bar + year pill -> year */}
// // // // //         <div className="absolute flex items-center bottom-8 sm:bottom-16 w-[80vw] sm:w-[60vw] md:w-[30vw] h-0.5 bg-black/5">
// // // // //           <div className="fill_x h-full w-0 bg-[#F1E2C6]" />
// // // // //           <div className="overflow-hidden bg-[#F1E2C6] text-[#D25F28] px-2 h-4 rounded-full">
// // // // //             <div className="year_track h-4 text-xs">
// // // // //               {DATA.map((item, i) => (
// // // // //                 <div key={i} className="h-4 flex font-medium items-center justify-center">
// // // // //                   {item.year}
// // // // //                 </div>
// // // // //               ))}
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>

// // // // //       </div>

// // // // //       <div className="h-[500vh]" />
// // // // //     </main>
// // // // //   );
// // // // // }


// // // // "use client";

// // // // import { useCallback, useEffect, useMemo, useRef, useState } from "react";
// // // // import gsap from "gsap";
// // // // import ScrollTrigger from "gsap/dist/ScrollTrigger";
// // // // import { useGSAP } from "@gsap/react";
// // // // gsap.registerPlugin(ScrollTrigger);

// // // // const DATA = [
// // // //   { img: "/clientImg/2.webp", text: "Atlanta", year: "2022" },
// // // //   { img: "/clientImg/5.webp", text: "Bangkok", year: "2022" },
// // // //   { img: "/clientImg/12.webp", text: "Singapore", year: "2022" },
// // // //   { img: "/clientImg/26.webp", text: "New York", year: "2023" },
// // // //   { img: "/clientImg/13.webp", text: "Ithaca", year: "2024" },
// // // //   { img: "/clientImg/24.webp", text: "New Orleans", year: "2024" },
// // // //   { img: "/clientImg/31.webp", text: "Sri Lanka", year: "2025" },
// // // //   { img: "/clientImg/16.webp", text: "Kampala", year: "2025" },
// // // //   { img: "/clientImg/21.webp", text: "Key West / Miami", year: "2025" },
// // // //   { img: "/clientImg/29.webp", text: "Savannah (Civil Ceremony)", year: "2025" },
// // // //   { img: "/clientImg/10.webp", text: "Egypt", year: "2025" },
// // // // ];

// // // // const IMAGES = [
// // // //   "/clientImg/1.webp",
// // // //   "/clientImg/2.webp",
// // // //   "/clientImg/3.webp",
// // // //   "/clientImg/4.webp",
// // // //   "/clientImg/5.webp",
// // // //   "/clientImg/6.webp",
// // // //   "/clientImg/7.webp",
// // // //   "/clientImg/8.webp",
// // // //   "/clientImg/9.webp",
// // // //   "/clientImg/10.webp",
// // // //   "/clientImg/11.webp",
// // // //   "/clientImg/12.webp",
// // // //   "/clientImg/13.webp",
// // // //   "/clientImg/14.webp",
// // // //   "/clientImg/15.webp",
// // // //   "/clientImg/16.webp",
// // // //   "/clientImg/17.webp",
// // // //   "/clientImg/18.webp",
// // // //   "/clientImg/19.webp",
// // // //   "/clientImg/20.webp",
// // // //   "/clientImg/21.webp",
// // // //   "/clientImg/22.webp",
// // // //   "/clientImg/23.webp",
// // // //   "/clientImg/24.webp",
// // // //   "/clientImg/25.webp",
// // // //   "/clientImg/26.webp",
// // // //   "/clientImg/27.webp",
// // // //   "/clientImg/28.webp",
// // // //   "/clientImg/29.webp",
// // // //   "/clientImg/30.webp",
// // // //   "/clientImg/31.webp",
// // // //   "/clientImg/32.webp",
// // // // ];

// // // // const LAYOUT = [
// // // //   { x: 4, y: 12, o: 1 },
// // // //   { x: 22, y: 26, o: 0.1 },
// // // //   { x: 48, y: 10, o: 1 },
// // // //   { x: 88, y: 6, o: 1 },
// // // //   { x: 10, y: 46, o: 0.1 },
// // // //   { x: 30, y: 58, o: 1 },
// // // //   { x: 52, y: 48, o: 0.1 },
// // // //   { x: 74, y: 42, o: 1 },
// // // //   { x: 92, y: 54, o: 0.1 },
// // // //   { x: 12, y: 82, o: 1 },
// // // //   { x: 34, y: 90, o: 0.1 },
// // // //   { x: 86, y: 78, o: 1 },
// // // //   { x: 82, y: 86, o: 0.1 },
// // // //   { x: 4, y: 118, o: 1 },
// // // //   { x: 26, y: 132, o: 0.1 },
// // // //   { x: 50, y: 120, o: 1 },
// // // //   { x: 74, y: 128, o: 0.1 },
// // // //   { x: 8, y: 160, o: 1 },
// // // //   { x: 32, y: 174, o: 0.1 },
// // // //   { x: 56, y: 164, o: 1 },
// // // //   { x: 82, y: 170, o: 0.1 },
// // // // ];

// // // // function FloatingImage({ item, index }) {
// // // //   const ref = useRef(null);

// // // //   useEffect(() => {
// // // //     const isMobile = window.matchMedia("(max-width: 768px)").matches;
// // // //     let mouseX = 0;
// // // //     let mouseY = 0;
// // // //     let currentX = 0;
// // // //     let currentY = 0;
// // // //     let sectionProgress = 0;
// // // //     const lerp = (a, b, t) => a + (b - a) * t;

// // // //     const onMove = (e) => {
// // // //       if (isMobile) return;
// // // //       mouseX = (e.clientX / window.innerWidth - 0.5) * 120;
// // // //       mouseY = (e.clientY / window.innerHeight - 0.5) * 120;
// // // //     };

// // // //     window.addEventListener("mousemove", onMove);

// // // //     const st = ScrollTrigger.create({
// // // //       trigger: ".paren_nn",
// // // //       start: "top top",
// // // //       end: "bottom bottom",
// // // //       scrub: true,
// // // //       onUpdate(self) {
// // // //         sectionProgress = self.progress;
// // // //       },
// // // //       onLeave: () => {
// // // //         sectionProgress = 1;
// // // //       },
// // // //       onLeaveBack: () => {
// // // //         sectionProgress = 0;
// // // //       },
// // // //     });

// // // //     let raf;
// // // //     const section = document.querySelector(".paren_nn");
// // // //     const sectionHeight = section?.offsetHeight || 1;

// // // //     const update = () => {
// // // //       const targetX = mouseX * (item.o > 0.5 ? 0.6 : 0.3);
// // // //       const progressY = sectionProgress * sectionHeight;
// // // //       const scrollOffset = -(progressY * 0.12);
// // // //       const targetY = mouseY * (item.o > 0.5 ? 0.5 : 0.25) + scrollOffset;

// // // //       currentX = lerp(currentX, targetX, 0.08);
// // // //       currentY = lerp(currentY, targetY, 0.08);

// // // //       gsap.set(ref.current, { x: currentX, y: currentY, force3D: true });
// // // //       raf = requestAnimationFrame(update);
// // // //     };

// // // //     update();

// // // //     return () => {
// // // //       cancelAnimationFrame(raf);
// // // //       st.kill();
// // // //       window.removeEventListener("mousemove", onMove);
// // // //     };
// // // //   }, [item]);

// // // //   return (
// // // //     <div
// // // //       ref={ref}
// // // //       className="absolute will-change-transform"
// // // //       style={{ left: `${item.x}%`, top: `${item.y}%`, opacity: item.o }}
// // // //     >
// // // //       <img
// // // //         src={IMAGES[index % IMAGES.length]}
// // // //         alt=""
// // // //         draggable={false}
// // // //         className={`w-[16vw] sm:w-[12vw] md:w-[8vw] ${
// // // //           item.o === 1 ? "hover:scale-115 transition-all duration-700" : ""
// // // //         }`}
// // // //       />
// // // //     </div>
// // // //   );
// // // // }

// // // // export default function ParallaxScroll() {
// // // //   const scope = useRef(null);
// // // //   const [activeIndex, setActiveIndex] = useState(0);
// // // //   const [isExpanded, setIsExpanded] = useState(false);

// // // //   const progress = DATA.length > 1 ? activeIndex / (DATA.length - 1) : 0;
// // // //   const activeItem = DATA[activeIndex];

// // // //   useGSAP(
// // // //     () => {
// // // //       gsap.to(".sticky_child", {
// // // //         opacity: 1,
// // // //         scale: 1,
// // // //         scrollTrigger: {
// // // //           trigger: ".sticky_child",
// // // //           start: "5% top",
// // // //           toggleActions: "play none none reverse",
// // // //         },
// // // //       });

// // // //       ScrollTrigger.create({
// // // //         trigger: ".paren_nn",
// // // //         start: "top top",
// // // //         end: "bottom bottom",
// // // //         onUpdate(self) {
// // // //           const total = DATA.length;
// // // //           const index = Math.min(total - 1, Math.floor(self.progress * total));
// // // //           setActiveIndex(index);
// // // //         },
// // // //       });

// // // //       return () => {
// // // //         ScrollTrigger.getAll().forEach((s) => s.kill());
// // // //       };
// // // //     },
// // // //     { scope }
// // // //   );

// // // //   const repeated = useMemo(() => {
// // // //     const arr = [];
// // // //     for (let i = 0; i < 6; i++) {
// // // //       LAYOUT.forEach((l) => {
// // // //         arr.push({ ...l, y: l.y + i * 25 });
// // // //       });
// // // //     }
// // // //     return arr;
// // // //   }, []);

// // // //   const selectItem = useCallback((index) => {
// // // //     setActiveIndex(index);

// // // //     const section = scope.current;
// // // //     if (!section) return;

// // // //     const maxScroll = section.offsetHeight - window.innerHeight;
// // // //     const targetProgress = DATA.length > 1 ? index / (DATA.length - 1) : 0;
// // // //     const targetY = section.offsetTop + maxScroll * targetProgress;

// // // //     window.scrollTo({
// // // //       top: targetY,
// // // //       behavior: "smooth",
// // // //     });
// // // //   }, []);

// // // //   const openFromPointer = (event) => {
// // // //     if (event.pointerType !== "touch") setIsExpanded(true);
// // // //   };

// // // //   const closeFromPointer = (event) => {
// // // //     if (event.pointerType !== "touch") setIsExpanded(false);
// // // //   };

// // // //   const toggleFromClick = () => {
// // // //     const isTouchScreen =
// // // //       typeof window !== "undefined" &&
// // // //       window.matchMedia("(hover: none), (pointer: coarse)").matches;

// // // //     if (isTouchScreen) setIsExpanded((value) => !value);
// // // //   };

// // // //   return (
// // // //     <main ref={scope} className="paren_nn relative h-[800vh] BGCLR">
// // // //       <section className="absolute inset-0 overflow-hidden">
// // // //         {repeated.map((item, i) => (
// // // //           <FloatingImage key={i} item={item} index={i} />
// // // //         ))}
// // // //       </section>

// // // //       <div className="sticky_child opacity-0 scale-90 sticky pointer-events-none top-0 h-screen flex flex-col items-center justify-center gap-y-6 sm:gap-y-10 px-4 sm:px-8">
// // // //         <div className="relative w-[55vw] sm:w-[38vw] md:w-[25vw] aspect-[3.5/4] overflow-hidden">
// // // //           {DATA.map((item, i) => (
// // // //             <div
// // // //               key={item.text}
// // // //               className={`absolute inset-0 transition-all duration-700 ease-out ${
// // // //                 i === activeIndex ? "opacity-100 scale-100" : "opacity-0 scale-105"
// // // //               }`}
// // // //             >
// // // //               <img src={item.img} className="w-full h-full object-cover" alt={item.text} />
// // // //             </div>
// // // //           ))}
// // // //         </div>

// // // //         <div className="relative w-[85vw] sm:w-[60vw] md:w-[30vw] h-[80px] sm:h-[100px] md:h-[120px] flex items-center justify-center">
// // // //           {DATA.map((item, i) => (
// // // //             <div
// // // //               key={item.text}
// // // //               className={`leading-snug max-sm:text-[1.7rem] max-sm:leading-[1.7rem] text-[#F1E2C6] Font_CV font-medium absolute inset-0 flex items-center justify-center text-xl sm:text-2xl md:text-3xl text-center transition-all duration-500 ease-out ${
// // // //                 i === activeIndex
// // // //                   ? "opacity-100 translate-y-0"
// // // //                   : "opacity-0 translate-y-3 pointer-events-none"
// // // //               }`}
// // // //             >
// // // //               {item.text}
// // // //             </div>
// // // //           ))}
// // // //         </div>

// // // //         <div
// // // //           className="pointer-events-auto absolute bottom-4 sm:bottom-10 left-1/2 z-20 w-[88vw] max-w-[560px] -translate-x-1/2 px-2 pb-4 pt-10"
// // // //           onPointerEnter={openFromPointer}
// // // //           onPointerLeave={closeFromPointer}
// // // //         >
// // // //           <div
// // // //             className={`mx-auto mb-3 grid origin-bottom grid-cols-2 gap-x-2 gap-y-1 overflow-hidden rounded-[8px] bg-[#F1E2C6]/95 p-2 text-[#D25F28] shadow-[0_14px_40px_rgba(0,0,0,0.18)] backdrop-blur-sm transition-all duration-500 ease-out sm:gap-y-1.5 sm:p-3 ${
// // // //               isExpanded
// // // //                 ? "max-h-[360px] translate-y-0 opacity-100"
// // // //                 : "max-h-0 translate-y-4 p-0 opacity-0"
// // // //             }`}
// // // //           >
// // // //             {DATA.map((item, i) => {
// // // //               const isActive = i === activeIndex;
// // // //               const isRowEnd = i % 2 === 1 || i === DATA.length - 1;

// // // //               return (
// // // //                 <button
// // // //                   key={item.text}
// // // //                   type="button"
// // // //                   onClick={() => selectItem(i)}
// // // //                   className={`group flex min-h-9 items-center justify-between rounded-[6px] px-3 py-2 text-left Font_CV text-sm font-medium transition-all duration-300 ease-out sm:text-base ${
// // // //                     isActive
// // // //                       ? "bg-[#D25F28] text-[#F1E2C6]"
// // // //                       : "text-[#D25F28] hover:bg-[#D25F28] hover:text-[#F1E2C6]"
// // // //                   }`}
// // // //                 >
// // // //                   <span className="flex min-w-0 items-center">
// // // //                     <span className="mr-0 w-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:mr-2 group-hover:w-4 group-hover:opacity-100">
// // // //                       -
// // // //                     </span>
// // // //                     <span className="truncate">
// // // //                       {item.text}
// // // //                       {isRowEnd ? "." : ","}
// // // //                     </span>
// // // //                   </span>
// // // //                   <span className="ml-2 translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
// // // //                     &gt;
// // // //                   </span>
// // // //                 </button>
// // // //               );
// // // //             })}
// // // //           </div>

// // // //           <button
// // // //             type="button"
// // // //             aria-expanded={isExpanded}
// // // //             onClick={toggleFromClick}
// // // //             className="group w-full cursor-pointer border-0 bg-transparent p-0"
// // // //           >
// // // //             <div className="flex items-center">
// // // //               <div className="relative h-0.5 flex-1 overflow-hidden rounded-full bg-black/10">
// // // //                 <div
// // // //                   className="h-full bg-[#F1E2C6] transition-[width] duration-500 ease-out"
// // // //                   style={{ width: `${progress * 100}%` }}
// // // //                 />
// // // //               </div>

// // // //               <div className="ml-2 overflow-hidden rounded-full bg-[#F1E2C6] px-3 py-1 text-[#D25F28] shadow-[0_8px_18px_rgba(0,0,0,0.12)] transition-all duration-300 group-hover:bg-[#D25F28] group-hover:text-[#F1E2C6]">
// // // //                 <div className="h-4 overflow-hidden text-xs font-medium leading-4">
// // // //                   <div
// // // //                     className="transition-transform duration-500 ease-out"
// // // //                     style={{ transform: `translateY(-${activeIndex}rem)` }}
// // // //                   >
// // // //                     {DATA.map((item) => (
// // // //                       <div key={item.text} className="h-4 flex items-center justify-center">
// // // //                         {item.year}
// // // //                       </div>
// // // //                     ))}
// // // //                   </div>
// // // //                 </div>
// // // //               </div>
// // // //             </div>

// // // //             <div
// // // //               className={`mt-3 flex items-center justify-between rounded-[8px] bg-[#F1E2C6]/95 px-3 py-2 text-xs font-medium text-[#D25F28] shadow-[0_10px_28px_rgba(0,0,0,0.14)] transition-all duration-500 ease-out ${
// // // //                 isExpanded ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
// // // //               }`}
// // // //             >
// // // //               <span>{activeItem.text}</span>
// // // //               <span>
// // // //                 {activeIndex + 1}/{DATA.length} - {activeItem.year}
// // // //               </span>
// // // //             </div>
// // // //           </button>
// // // //         </div>
// // // //       </div>

// // // //       <div className="h-[500vh]" />
// // // //     </main>
// // // //   );
// // // // }

// // // "use client";

// // // import { useCallback, useEffect, useMemo, useRef, useState } from "react";
// // // import gsap from "gsap";
// // // import ScrollTrigger from "gsap/dist/ScrollTrigger";
// // // import { useGSAP } from "@gsap/react";
// // // import { GoArrowUpRight } from "react-icons/go";
// // // gsap.registerPlugin(ScrollTrigger);


// // // const DATA = [
// // //   {
// // //     img: "/clientImg/2.webp",
// // //     text: "Atlanta",
// // //     year: "2022",
// // //     pTxt: "A timeless celebration filled with elegant moments and unforgettable memories."
// // //   },
// // //   {
// // //     img: "/clientImg/5.webp",
// // //     text: "Bangkok",
// // //     year: "2022",
// // //     pTxt: "A vibrant destination wedding blending culture, luxury, and modern romance."
// // //   },
// // //   {
// // //     img: "/clientImg/12.webp",
// // //     text: "Singapore",
// // //     year: "2022",
// // //     pTxt: "A sophisticated wedding experience captured with style and authenticity."
// // //   },
// // //   {
// // //     img: "/clientImg/26.webp",
// // //     text: "New York",
// // //     year: "2023",
// // //     pTxt: "Iconic city views paired with intimate moments and contemporary elegance."
// // //   },
// // //   {
// // //     img: "/clientImg/13.webp",
// // //     text: "Ithaca",
// // //     year: "2024",
// // //     pTxt: "A heartfelt celebration surrounded by breathtaking natural landscapes."
// // //   },
// // //   {
// // //     img: "/clientImg/24.webp",
// // //     text: "New Orleans",
// // //     year: "2024",
// // //     pTxt: "Rich traditions, vibrant streets, and a wedding full of joyful energy."
// // //   },
// // //   {
// // //     img: "/clientImg/31.webp",
// // //     text: "Sri Lanka",
// // //     year: "2025",
// // //     pTxt: "An unforgettable destination wedding set against tropical beauty and serenity."
// // //   },
// // //   {
// // //     img: "/clientImg/16.webp",
// // //     text: "Kampala",
// // //     year: "2025",
// // //     pTxt: "A meaningful celebration honoring love, family, and timeless traditions."
// // //   },
// // //   {
// // //     img: "/clientImg/21.webp",
// // //     text: "Key West / Miami",
// // //     year: "2025",
// // //     pTxt: "Coastal elegance meets vibrant city charm in this unforgettable celebration."
// // //   },
// // //   {
// // //     img: "/clientImg/29.webp",
// // //     text: "Savannah (Civil Ceremony)",
// // //     year: "2025",
// // //     pTxt: "An intimate civil ceremony captured with grace, warmth, and genuine emotion."
// // //   },
// // //   {
// // //     img: "/clientImg/10.webp",
// // //     text: "Egypt",
// // //     year: "2025",
// // //     pTxt: "A magical wedding journey surrounded by ancient history and timeless romance."
// // //   },
// // // ];

// // // const IMAGES = [
// // //   "/clientImg/1.webp",
// // //   "/clientImg/2.webp",
// // //   "/clientImg/3.webp",
// // //   "/clientImg/4.webp",
// // //   "/clientImg/5.webp",
// // //   "/clientImg/6.webp",
// // //   "/clientImg/7.webp",
// // //   "/clientImg/8.webp",
// // //   "/clientImg/9.webp",
// // //   "/clientImg/10.webp",
// // //   "/clientImg/11.webp",
// // //   "/clientImg/12.webp",
// // //   "/clientImg/13.webp",
// // //   "/clientImg/14.webp",
// // //   "/clientImg/15.webp",
// // //   "/clientImg/16.webp",
// // //   "/clientImg/17.webp",
// // //   "/clientImg/18.webp",
// // //   "/clientImg/19.webp",
// // //   "/clientImg/20.webp",
// // //   "/clientImg/21.webp",
// // //   "/clientImg/22.webp",
// // //   "/clientImg/23.webp",
// // //   "/clientImg/24.webp",
// // //   "/clientImg/25.webp",
// // //   "/clientImg/26.webp",
// // //   "/clientImg/27.webp",
// // //   "/clientImg/28.webp",
// // //   "/clientImg/29.webp",
// // //   "/clientImg/30.webp",
// // //   "/clientImg/31.webp",
// // //   "/clientImg/32.webp",
// // // ];

// // // const LAYOUT = [
// // //   { x: 4, y: 12, o: 1 },
// // //   { x: 22, y: 26, o: 0.1 },
// // //   { x: 48, y: 10, o: 1 },
// // //   { x: 88, y: 6, o: 1 },
// // //   { x: 10, y: 46, o: 0.1 },
// // //   { x: 30, y: 58, o: 1 },
// // //   { x: 52, y: 48, o: 0.1 },
// // //   { x: 74, y: 42, o: 1 },
// // //   { x: 92, y: 54, o: 0.1 },
// // //   { x: 12, y: 82, o: 1 },
// // //   { x: 34, y: 90, o: 0.1 },
// // //   { x: 86, y: 78, o: 1 },
// // //   { x: 82, y: 86, o: 0.1 },
// // //   { x: 4, y: 118, o: 1 },
// // //   { x: 26, y: 132, o: 0.1 },
// // //   { x: 50, y: 120, o: 1 },
// // //   { x: 74, y: 128, o: 0.1 },
// // //   { x: 8, y: 160, o: 1 },
// // //   { x: 32, y: 174, o: 0.1 },
// // //   { x: 56, y: 164, o: 1 },
// // //   { x: 82, y: 170, o: 0.1 },
// // // ];

// // // function FloatingImage({ item, index }) {
// // //   const ref = useRef(null);

// // //   useEffect(() => {
// // //     const isMobile = window.matchMedia("(max-width: 768px)").matches;
// // //     let mouseX = 0;
// // //     let mouseY = 0;
// // //     let currentX = 0;
// // //     let currentY = 0;
// // //     let sectionProgress = 0;
// // //     const lerp = (a, b, t) => a + (b - a) * t;

// // //     const onMove = (e) => {
// // //       if (isMobile) return;
// // //       mouseX = (e.clientX / window.innerWidth - 0.5) * 120;
// // //       mouseY = (e.clientY / window.innerHeight - 0.5) * 120;
// // //     };

// // //     window.addEventListener("mousemove", onMove);

// // //     const st = ScrollTrigger.create({
// // //       trigger: ".paren_nn",
// // //       start: "top top",
// // //       end: "bottom bottom",
// // //       scrub: true,
// // //       onUpdate(self) {
// // //         sectionProgress = self.progress;
// // //       },
// // //       onLeave: () => {
// // //         sectionProgress = 1;
// // //       },
// // //       onLeaveBack: () => {
// // //         sectionProgress = 0;
// // //       },
// // //     });

// // //     let raf;
// // //     const section = document.querySelector(".paren_nn");
// // //     const sectionHeight = section?.offsetHeight || 1;

// // //     const update = () => {
// // //       const targetX = mouseX * (item.o > 0.5 ? 0.6 : 0.3);
// // //       const progressY = sectionProgress * sectionHeight;
// // //       const scrollOffset = -(progressY * 0.12);
// // //       const targetY = mouseY * (item.o > 0.5 ? 0.5 : 0.25) + scrollOffset;

// // //       currentX = lerp(currentX, targetX, 0.08);
// // //       currentY = lerp(currentY, targetY, 0.08);

// // //       gsap.set(ref.current, { x: currentX, y: currentY, force3D: true });
// // //       raf = requestAnimationFrame(update);
// // //     };

// // //     update();

// // //     return () => {
// // //       cancelAnimationFrame(raf);
// // //       st.kill();
// // //       window.removeEventListener("mousemove", onMove);
// // //     };
// // //   }, [item]);

// // //   return (
// // //     <div
// // //       ref={ref}
// // //       className="absolute will-change-transform"
// // //       style={{ left: `${item.x}%`, top: `${item.y}%`, opacity: item.o }}
// // //     >
// // //       <img
// // //         src={IMAGES[index % IMAGES.length]}
// // //         alt=""
// // //         draggable={false}
// // //         className={`w-[16vw] sm:w-[12vw] md:w-[8vw] ${
// // //           item.o === 1 ? "hover:scale-115 transition-all duration-700" : ""
// // //         }`}
// // //       />
// // //     </div>
// // //   );
// // // }

// // // export default function ParallaxScroll() {
// // //   const scope = useRef(null);
// // //   const [activeIndex, setActiveIndex] = useState(0);
// // //   const [isExpanded, setIsExpanded] = useState(false);

// // //   const progress = DATA.length > 1 ? activeIndex / (DATA.length - 1) : 0;
// // //   const activeItem = DATA[activeIndex];

// // //   useGSAP(
// // //     () => {
// // //       gsap.to(".sticky_child", {
// // //         opacity: 1,
// // //         scale: 1,
// // //         scrollTrigger: {
// // //           trigger: ".sticky_child",
// // //           start: "5% top",
// // //           toggleActions: "play none none reverse",
// // //         },
// // //       });

// // //       ScrollTrigger.create({
// // //         trigger: ".paren_nn",
// // //         start: "top top",
// // //         end: "bottom bottom",
// // //         onUpdate(self) {
// // //           const total = DATA.length;
// // //           const index = Math.min(total - 1, Math.floor(self.progress * total));
// // //           setActiveIndex(index);
// // //         },
// // //       });

// // //       return () => {
// // //         ScrollTrigger.getAll().forEach((s) => s.kill());
// // //       };
// // //     },
// // //     { scope }
// // //   );

// // //   const repeated = useMemo(() => {
// // //     const arr = [];
// // //     for (let i = 0; i < 6; i++) {
// // //       LAYOUT.forEach((l) => {
// // //         arr.push({ ...l, y: l.y + i * 25 });
// // //       });
// // //     }
// // //     return arr;
// // //   }, []);

// // //   const selectItem = useCallback((index) => {
// // //     setActiveIndex(index);

// // //     const section = scope.current;
// // //     if (!section) return;

// // //     const maxScroll = section.offsetHeight - window.innerHeight;
// // //     const targetProgress = DATA.length > 1 ? index / (DATA.length - 1) : 0;
// // //     const targetY = section.offsetTop + maxScroll * targetProgress;

// // //     window.scrollTo({
// // //       top: targetY,
// // //       behavior: "smooth",
// // //     });
// // //   }, []);

// // //   const openFromPointer = (event) => {
// // //     if (event.pointerType !== "touch") setIsExpanded(true);
// // //   };

// // //   const closeFromPointer = (event) => {
// // //     if (event.pointerType !== "touch") setIsExpanded(false);
// // //   };

// // //   const toggleFromClick = () => {
// // //     const isTouchScreen =
// // //       typeof window !== "undefined" &&
// // //       window.matchMedia("(hover: none), (pointer: coarse)").matches;

// // //     if (isTouchScreen) setIsExpanded((value) => !value);
// // //   };

// // //   return (
// // //     <main ref={scope} className="paren_nn relative h-[800vh] BGCLR">
// // //       <section className="absolute inset-0 overflow-hidden">
// // //         {repeated.map((item, i) => (
// // //           <FloatingImage key={i} item={item} index={i} />
// // //         ))}
// // //       </section>

// // //       <div className="sticky_child opacity-0 scale-90 sticky pointer-events-none top-0 h-screen flex flex-col items-center justify-center gap-y-6 sm:gap-y-10 px-4 sm:px-8">
// // //         <div className="relative w-[55vw] sm:w-[38vw] md:w-[25vw] aspect-[3.5/4] overflow-hidden">
// // //           {DATA.map((item, i) => (
// // //             <div
// // //               key={item.text}
// // //               className={`absolute inset-0 transition-all duration-700 ease-out ${
// // //                 i === activeIndex ? "opacity-100 scale-100" : "opacity-0 scale-105"
// // //               }`}
// // //             >
// // //               <img src={item.img} className="w-full h-full object-cover" alt={item.text} />
// // //             </div>
// // //           ))}
// // //         </div>

// // //         <div className="relative w-[85vw] sm:w-[60vw] md:w-[30vw] h-[80px] sm:h-[100px] md:h-[120px] flex items-center justify-center">
// // //           {DATA.map((item, i) => (
// // //             <div
// // //               key={item.text}
// // //               className={`leading-snug max-sm:text-[1.7rem] max-sm:leading-[1.7rem] text-[#F1E2C6] Font_CV font-medium absolute inset-0 flex items-center justify-center text-xl sm:text-2xl md:text-3xl text-center transition-all duration-500 ease-out ${
// // //                 i === activeIndex
// // //                   ? "opacity-100 translate-y-0"
// // //                   : "opacity-0 translate-y-3 pointer-events-none"
// // //               }`}
// // //             >
// // //               {item.text}
// // //             </div>
// // //           ))}
// // //         </div>

// // //         <div
// // //           className="pointer-events-auto absolute bottom-4 sm:bottom-0 left-1/2 z-20 w-[88vw] max-w-[560px] -translate-x-1/2 px-2 pb-4 pt-10"
// // //           onPointerEnter={openFromPointer}
// // //           onPointerLeave={closeFromPointer}
// // //         >
// // //           <div
// // //             className={`mx-auto mb-3 grid origin-bottom grid-cols-2 gap-x-2 gap-y-1 overflow-hidden rounded-[8px] bg-[#F1E2C6]/95 p-2 text-[#D25F28] shadow-[0_14px_40px_rgba(0,0,0,0.18)] backdrop-blur-sm transition-all duration-500 ease-out sm:gap-y-1.5 sm:p-3 ${
// // //               isExpanded
// // //                 ? "max-h-[360px] translate-y-0 opacity-100"
// // //                 : "max-h-0 translate-y-4 p-0 opacity-0"
// // //             }`}
// // //           >
// // //             {DATA.map((item, i) => {
// // //               const isActive = i === activeIndex;
// // //               const isRowEnd = i % 2 === 1 || i === DATA.length - 1;

// // //               return (
// // //                 <button
// // //                   key={item.text}
// // //                   type="button"
// // //                   onClick={() => selectItem(i)}
// // //                   className={`group flex min-h-9 items-center border border-[#D25F28]/10 justify-between  px-3 py-2 text-left Font_CV text-sm font-medium transition-all duration-300 ease-out sm:text-base ${
// // //                     isActive
// // //                       ? "bg-[#D25F28] text-[#F1E2C6]"
// // //                       : "text-[#D25F28] hover:bg-[#D25F28] hover:text-[#F1E2C6]"
// // //                   }`}
// // //                 >
// // //                   <span className="flex min-w-0 items-center">
// // //                     {/* <span className="mr-0 w-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:mr-2 group-hover:w-4 group-hover:opacity-100">
// // //                       -
// // //                     </span> */}
// // //                     <span className="truncate uppercase">
// // //                       {item.text}
// // //                       {isRowEnd ? "." : ","}
// // //                     </span>
// // //                   </span>
// // //                   <span className="ml-2 translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
// // //                     <GoArrowUpRight />
// // //                   </span>
// // //                 </button>
// // //               );
// // //             })}
// // //           </div>

// // //           <button
// // //             type="button"
// // //             aria-expanded={isExpanded}
// // //             onClick={toggleFromClick}
// // //             className="group w-full cursor-pointer border-0 bg-transparent p-0"
// // //           >
// // //             <div className="relative h-8">
// // //               <div className="absolute left-0 right-0 top-1/2 h-0.5 -translate-y-1/2 overflow-hidden  bg-black/10">
// // //                 <div
// // //                   className="h-full bg-[#F1E2C6] transition-[width] duration-500 ease-out"
// // //                   style={{ width: `${progress * 100}%` }}
// // //                 />
// // //               </div>

// // //               <div
// // //                 className="absolute top-1/2 overflow-hidden  bg-[#F1E2C6] px-3 py-1 text-[#D25F28] shadow-[0_8px_18px_rgba(0,0,0,0.12)] transition-all duration-500 ease-out group-hover:bg-[#D25F28] group-hover:text-[#F1E2C6]"
// // //                 style={{
// // //                   left: `clamp(1.65rem, ${progress * 100}%, calc(100% - 1.65rem))`,
// // //                   transform: "translate(-50%, -50%)",
// // //                 }}
// // //               >
// // //                 <div className="h-4 overflow-hidden text-xs font-medium leading-4">
// // //                   <div
// // //                     className="transition-transform duration-500 ease-out"
// // //                     style={{ transform: `translateY(-${activeIndex}rem)` }}
// // //                   >
// // //                     {DATA.map((item) => (
// // //                       <div key={item.text} className="h-4 flex items-center justify-center">
// // //                         {item.year}
// // //                       </div>
// // //                     ))}
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //             </div>

// // //             <div
// // //               className={`mt-3 flex items-center justify-between  bg-[#F1E2C6]/95 px-3 py-2 text-xs font-medium text-[#D25F28] shadow-[0_10px_28px_rgba(0,0,0,0.14)] transition-all duration-500 ease-out ${
// // //                 isExpanded ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
// // //               }`}
// // //             >
// // //               <span>{activeItem.text}</span>
// // //               <span>
// // //                 {activeIndex + 1}/{DATA.length} - {activeItem.year}
// // //               </span>
// // //             </div>
// // //           </button>
// // //         </div>
// // //       </div>

// // //       <div className="h-[500vh]" />
// // //     </main>
// // //   );
// // // }

// // "use client";

// // import { useCallback, useEffect, useMemo, useRef, useState } from "react";
// // import gsap from "gsap";
// // import ScrollTrigger from "gsap/dist/ScrollTrigger";
// // import { useGSAP } from "@gsap/react";
// // import { GoArrowUpRight } from "react-icons/go";
// // gsap.registerPlugin(ScrollTrigger);

// // const DATA = [
// //   {
// //     img: "/clientImg/2.webp",
// //     text: "Atlanta",
// //     year: "2022",
// //     pTxt: "A timeless celebration filled with elegant moments and unforgettable memories.",
// //   },
// //   {
// //     img: "/clientImg/5.webp",
// //     text: "Bangkok",
// //     year: "2022",
// //     pTxt: "A vibrant destination wedding blending culture, luxury, and modern romance.",
// //   },
// //   {
// //     img: "/clientImg/12.webp",
// //     text: "Singapore",
// //     year: "2022",
// //     pTxt: "A sophisticated wedding experience captured with style and authenticity.",
// //   },
// //   {
// //     img: "/clientImg/26.webp",
// //     text: "New York",
// //     year: "2023",
// //     pTxt: "Iconic city views paired with intimate moments and contemporary elegance.",
// //   },
// //   {
// //     img: "/clientImg/13.webp",
// //     text: "Ithaca",
// //     year: "2024",
// //     pTxt: "A heartfelt celebration surrounded by breathtaking natural landscapes.",
// //   },
// //   {
// //     img: "/clientImg/24.webp",
// //     text: "New Orleans",
// //     year: "2024",
// //     pTxt: "Rich traditions, vibrant streets, and a wedding full of joyful energy.",
// //   },
// //   {
// //     img: "/clientImg/31.webp",
// //     text: "Sri Lanka",
// //     year: "2025",
// //     pTxt: "An unforgettable destination wedding set against tropical beauty and serenity.",
// //   },
// //   {
// //     img: "/clientImg/16.webp",
// //     text: "Kampala",
// //     year: "2025",
// //     pTxt: "A meaningful celebration honoring love, family, and timeless traditions.",
// //   },
// //   {
// //     img: "/clientImg/21.webp",
// //     text: "Key West / Miami",
// //     year: "2025",
// //     pTxt: "Coastal elegance meets vibrant city charm in this unforgettable celebration.",
// //   },
// //   {
// //     img: "/clientImg/29.webp",
// //     text: "Savannah (Civil Ceremony)",
// //     year: "2025",
// //     pTxt: "An intimate civil ceremony captured with grace, warmth, and genuine emotion.",
// //   },
// //   {
// //     img: "/clientImg/10.webp",
// //     text: "Egypt",
// //     year: "2025",
// //     pTxt: "A magical wedding journey surrounded by ancient history and timeless romance.",
// //   },
// // ];

// // const IMAGES = [
// //   "/clientImg/1.webp",
// //   "/clientImg/2.webp",
// //   "/clientImg/3.webp",
// //   "/clientImg/4.webp",
// //   "/clientImg/5.webp",
// //   "/clientImg/6.webp",
// //   "/clientImg/7.webp",
// //   "/clientImg/8.webp",
// //   "/clientImg/9.webp",
// //   "/clientImg/10.webp",
// //   "/clientImg/11.webp",
// //   "/clientImg/12.webp",
// //   "/clientImg/13.webp",
// //   "/clientImg/14.webp",
// //   "/clientImg/15.webp",
// //   "/clientImg/16.webp",
// //   "/clientImg/17.webp",
// //   "/clientImg/18.webp",
// //   "/clientImg/19.webp",
// //   "/clientImg/20.webp",
// //   "/clientImg/21.webp",
// //   "/clientImg/22.webp",
// //   "/clientImg/23.webp",
// //   "/clientImg/24.webp",
// //   "/clientImg/25.webp",
// //   "/clientImg/26.webp",
// //   "/clientImg/27.webp",
// //   "/clientImg/28.webp",
// //   "/clientImg/29.webp",
// //   "/clientImg/30.webp",
// //   "/clientImg/31.webp",
// //   "/clientImg/32.webp",
// // ];

// // const BACKGROUND_IMAGE_COUNT = 64;

// // function createBackgroundLayout() {
// //   const columns = 4;
// //   const rows = Math.ceil(BACKGROUND_IMAGE_COUNT / columns);
// //   const xPadding = 12;
// //   const yPadding = 8;
// //   const usableWidth = 100 - xPadding * 2;
// //   const usableHeight = 100 - yPadding * 2;
// //   const directionOffsets = [
// //     { x: 0, y: -2.4 },
// //     { x: 0, y: 2.4 },
// //     { x: -4.4, y: 0 },
// //     { x: 4.4, y: 0 },
// //   ];

// //   return Array.from({ length: BACKGROUND_IMAGE_COUNT }, (_, index) => {
// //     const row = Math.floor(index / columns);
// //     const col = index % columns;
// //     const lineDirection = directionOffsets[index % directionOffsets.length];
// //     const rowShift = row % 2 === 0 ? -2 : 2;
// //     const baseX = ((col + 0.5) / columns) * usableWidth + xPadding;
// //     const baseY = ((row + 0.5) / rows) * usableHeight + yPadding;

// //     return {
// //       x: Math.min(88, Math.max(12, baseX + lineDirection.x + rowShift)),
// //       y: Math.min(92, Math.max(8, baseY + lineDirection.y)),
// //       o: index % 3 === 1 ? 0.16 : 1,
// //     };
// //   });
// // }

// // function FloatingImage({ item, index }) {
// //   const ref = useRef(null);

// //   useEffect(() => {
// //     const isMobile = window.matchMedia("(max-width: 768px)").matches;
// //     let mouseX = 0;
// //     let mouseY = 0;
// //     let currentX = 0;
// //     let currentY = 0;
// //     let sectionProgress = 0;
// //     const lerp = (a, b, t) => a + (b - a) * t;

// //     const onMove = (e) => {
// //       if (isMobile) return;
// //       mouseX = (e.clientX / window.innerWidth - 0.5) * 120;
// //       mouseY = (e.clientY / window.innerHeight - 0.5) * 120;
// //     };

// //     window.addEventListener("mousemove", onMove);

// //     const st = ScrollTrigger.create({
// //       trigger: ".paren_nn",
// //       start: "top top",
// //       end: "bottom bottom",
// //       scrub: true,
// //       onUpdate(self) {
// //         sectionProgress = self.progress;
// //       },
// //       onLeave: () => {
// //         sectionProgress = 1;
// //       },
// //       onLeaveBack: () => {
// //         sectionProgress = 0;
// //       },
// //     });

// //     let raf;
// //     const section = document.querySelector(".paren_nn");
// //     const sectionHeight = section?.offsetHeight || 1;

// //     const update = () => {
// //       const targetX = mouseX * (item.o > 0.5 ? 0.6 : 0.3);
// //       const progressY = sectionProgress * sectionHeight;
// //       const scrollOffset = -(progressY * 0.12);
// //       const targetY = mouseY * (item.o > 0.5 ? 0.5 : 0.25) + scrollOffset;

// //       currentX = lerp(currentX, targetX, 0.08);
// //       currentY = lerp(currentY, targetY, 0.08);

// //       gsap.set(ref.current, {
// //         xPercent: -50,
// //         yPercent: -50,
// //         x: currentX,
// //         y: currentY,
// //         force3D: true,
// //       });
// //       raf = requestAnimationFrame(update);
// //     };

// //     update();

// //     return () => {
// //       cancelAnimationFrame(raf);
// //       st.kill();
// //       window.removeEventListener("mousemove", onMove);
// //     };
// //   }, [item]);

// //   return (
// //     <div
// //       ref={ref}
// //       className="absolute will-change-transform "
// //       // opacity: item.o 
// //       style={{ left: `${item.x}%`, top: `${item.y}%`, opacity: 0.6 }}
// //     >
// //       <img
// //         src={IMAGES[index % IMAGES.length]}
// //         alt=""
// //         draggable={false}
// //         className={`w-[16vw] sm:w-[12vw] md:w-[8vw] ${
// //           item.o === 1 ? "hover:scale-115 transition-all duration-700" : ""
// //         }`}
// //       />
// //     </div>
// //   );
// // }

// // export default function ParallaxScroll() {
// //   const scope = useRef(null);
// //   const [activeIndex, setActiveIndex] = useState(0);
// //   const [isExpanded, setIsExpanded] = useState(false);

// //   const progress = DATA.length > 1 ? activeIndex / (DATA.length - 1) : 0;
// //   const activeItem = DATA[activeIndex];

// //   useGSAP(
// //     () => {
// //       gsap.to(".sticky_child", {
// //         opacity: 1,
// //         scale: 1,
// //         scrollTrigger: {
// //           trigger: ".sticky_child",
// //           start: "5% top",
// //           toggleActions: "play none none reverse",
// //         },
// //       });

// //       ScrollTrigger.create({
// //         trigger: ".paren_nn",
// //         start: "top top",
// //         end: "bottom bottom",
// //         onUpdate(self) {
// //           const total = DATA.length;
// //           const index = Math.min(total - 1, Math.floor(self.progress * total));
// //           setActiveIndex(index);
// //         },
// //       });

// //       return () => {
// //         ScrollTrigger.getAll().forEach((s) => s.kill());
// //       };
// //     },
// //     { scope }
// //   );

// //   const backgroundLayout = useMemo(() => createBackgroundLayout(), []);

// //   const selectItem = useCallback((index) => {
// //     setActiveIndex(index);

// //     const section = scope.current;
// //     if (!section) return;

// //     const maxScroll = section.offsetHeight - window.innerHeight;
// //     const targetProgress = DATA.length > 1 ? index / (DATA.length - 1) : 0;
// //     const targetY = section.offsetTop + maxScroll * targetProgress;

// //     window.scrollTo({
// //       top: targetY,
// //       behavior: "smooth",
// //     });
// //   }, []);

// //   const openFromPointer = (event) => {
// //     if (event.pointerType !== "touch") setIsExpanded(true);
// //   };

// //   const closeFromPointer = (event) => {
// //     if (event.pointerType !== "touch") setIsExpanded(false);
// //   };

// //   const toggleFromClick = () => {
// //     const isTouchScreen =
// //       typeof window !== "undefined" &&
// //       window.matchMedia("(hover: none), (pointer: coarse)").matches;

// //     if (isTouchScreen) setIsExpanded((value) => !value);
// //   };

// //   return (
// //     <main ref={scope} className="paren_nn relative h-[800vh] BGCLR">
// //       <section className="absolute inset-0 overflow-hidden ">
// //         {backgroundLayout.map((item, i) => (
// //           <FloatingImage key={i} item={item} index={i} />
// //         ))}
// //       </section>

// //       <div className="sticky_child opacity-0 scale-90 sticky pointer-events-none top-0 h-screen flex flex-col items-center justify-center gap-y-6 sm:gap-y-4 px-4 sm:px-8">
// //         <div className="relative w-[55vw] sm:w-[38vw] md:w-[25vw] aspect-[3.5/4] overflow-hidden">
// //           {DATA.map((item, i) => (
// //             <div
// //               key={item.text}
// //               className={`absolute inset-0 transition-all duration-700 ease-out ${
// //                 i === activeIndex ? "opacity-100 scale-100" : "opacity-0 scale-105"
// //               }`}
// //             >
// //               <img src={item.img} className="w-full h-full object-cover" alt={item.text} />
// //             </div>
// //           ))}
// //         </div>

// //         <div className="relative w-[85vw] sm:w-[60vw] md:w-[34vw] h-[150px] sm:h-[165px] md:h-[175px]  flex items-center justify-center">
// //           {DATA.map((item, i) => (
// //             <div
// //               key={item.text}
// //               className={`absolute inset-0 flex flex-col items-center justify-center text-center transition-all duration-500 ease-out ${
// //                 i === activeIndex
// //                   ? "opacity-100 translate-y-0"
// //                   : "opacity-0 translate-y-3 pointer-events-none"
// //               }`}
// //             >
// //               <h2 className="leading-snug max-sm:text-[1.7rem] max-sm:leading-[1.7rem] text-[#F1E2C6] Font_CV font-medium text-xl sm:text-2xl md:text-3xl">
// //                 {item.text}
// //               </h2>
// //               <p className="mt-2 max-w-[34rem] text-[1rem] Font_CV leading-[1.1rem] text-[#F1E2C6]/85 sm:text-base md:text-lg">
// //                 {item.pTxt}
// //               </p>
// //             </div>
// //           ))}
// //         </div>

// //         <div
// //           className="pointer-events-auto absolute bottom-4 sm:bottom-0 left-1/2 z-20 w-[88vw] max-w-[560px] -translate-x-1/2 px-2 pb-4 pt-10"
// //           onPointerEnter={openFromPointer}
// //           onPointerLeave={closeFromPointer}
// //         >
// //           <div
// //             className={`mx-auto mb-3 grid origin-bottom grid-cols-2 gap-x-2 gap-y-1 overflow-hidden  bg-[#F1E2C6]/95 p-2 text-[#D25F28] shadow-[0_14px_40px_rgba(0,0,0,0.18)] backdrop-blur-sm transition-all duration-500 ease-out sm:gap-y-1.5 sm:p-3 ${
// //               isExpanded
// //                 ? "max-h-[360px] translate-y-0 opacity-100"
// //                 : "max-h-0 translate-y-4 p-0 opacity-0"
// //             }`}
// //           >
// //             {DATA.map((item, i) => {
// //               const isActive = i === activeIndex;
// //               const isRowEnd = i % 2 === 1 || i === DATA.length - 1;

// //               return (
// //                 <button
// //                   key={item.text}
// //                   type="button"
// //                   onClick={() => selectItem(i)}
// //                   className={`group flex min-h-9 items-center justify-between r border border-[#D25F28]/10 px-3 py-2 text-left Font_CV text-sm font-medium transition-all duration-300 ease-out sm:text-base ${
// //                     isActive
// //                       ? "bg-[#D25F28] text-[#F1E2C6]"
// //                       : "text-[#D25F28] hover:bg-[#D25F28] hover:text-[#F1E2C6]"
// //                   }`}
// //                 >
// //                   <span className="flex min-w-0 items-center">
// //                     {/* <span className="mr-0 w-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:mr-2 group-hover:w-4 group-hover:opacity-100">
// //                       -
// //                     </span> */}
// //                     <span className="truncate uppercase Font_CV">
// //                       {item.text}
// //                       {isRowEnd ? "." : ","}
// //                     </span>
// //                   </span>
// //                   <span className="ml-2 translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
// //                     <GoArrowUpRight />
// //                   </span>
// //                 </button>
// //               );
// //             })}
// //           </div>

// //           <button
// //             type="button"
// //             aria-expanded={isExpanded}
// //             onClick={toggleFromClick}
// //             className="group w-full cursor-pointer border-0 bg-transparent p-0"
// //           >
// //             <div className="relative h-8">
// //               <div className="absolute left-0 right-0 top-1/2 h-0.5 -translate-y-1/2 overflow-hidden rounded-full bg-black/10">
// //                 <div
// //                   className="h-full bg-[#F1E2C6] transition-[width] duration-500 ease-out"
// //                   style={{ width: `${progress * 100}%` }}
// //                 />
// //               </div>

// //               <div
// //                 className="absolute top-1/2 overflow-hidden  bg-[#F1E2C6] px-3 py-1 text-[#D25F28] shadow-[0_8px_18px_rgba(0,0,0,0.12)] transition-all duration-500 ease-out group-hover:bg-[#D25F28] group-hover:text-[#F1E2C6]"
// //                 style={{
// //                   left: `clamp(1.65rem, ${progress * 100}%, calc(100% - 1.65rem))`,
// //                   transform: "translate(-50%, -50%)",
// //                 }}
// //               >
// //                 <div className="h-4 overflow-hidden text-xs font-medium leading-4">
// //                   <div
// //                     className="transition-transform duration-500 ease-out"
// //                     style={{ transform: `translateY(-${activeIndex}rem)` }}
// //                   >
// //                     {DATA.map((item) => (
// //                       <div key={item.text} className="h-4 flex items-center justify-center">
// //                         {item.year}
// //                       </div>
// //                     ))}
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>

// //             <div
// //               className={`mt-3 flex items-center justify-between  uppercase bg-[#F1E2C6]/95 px-3 py-2 Font_CV text-[1rem] font-medium text-[#D25F28] shadow-[0_10px_28px_rgba(0,0,0,0.14)] transition-all duration-500 ease-out ${
// //                 isExpanded ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
// //               }`}
// //             >
// //               <span>{activeItem.text}</span>
// //               <span>
// //                 {activeIndex + 1}/{DATA.length} - {activeItem.year}
// //               </span>
// //             </div>
// //           </button>
// //         </div>
// //       </div>

     
// //     </main>
// //   );
// // }


// "use client";

// import { useCallback, useEffect, useMemo, useRef, useState } from "react";
// import gsap from "gsap";
// import ScrollTrigger from "gsap/dist/ScrollTrigger";
// import { useGSAP } from "@gsap/react";
// import { GoArrowUpRight } from "react-icons/go";
// gsap.registerPlugin(ScrollTrigger);

// const DATA = [
//   {
//     img: "/clientImg/2.webp",
//     text: "Atlanta",
//     year: "2022",
//     pTxt: "A timeless celebration filled with elegant moments and unforgettable memories.",
//   },
//   {
//     img: "/clientImg/5.webp",
//     text: "Bangkok",
//     year: "2022",
//     pTxt: "A vibrant destination wedding blending culture, luxury, and modern romance.",
//   },
//   {
//     img: "/clientImg/12.webp",
//     text: "Singapore",
//     year: "2022",
//     pTxt: "A sophisticated wedding experience captured with style and authenticity.",
//   },
//   {
//     img: "/clientImg/26.webp",
//     text: "New York",
//     year: "2023",
//     pTxt: "Iconic city views paired with intimate moments and contemporary elegance.",
//   },
//   {
//     img: "/clientImg/13.webp",
//     text: "Ithaca",
//     year: "2024",
//     pTxt: "A heartfelt celebration surrounded by breathtaking natural landscapes.",
//   },
//   {
//     img: "/clientImg/24.webp",
//     text: "New Orleans",
//     year: "2024",
//     pTxt: "Rich traditions, vibrant streets, and a wedding full of joyful energy.",
//   },
//   {
//     img: "/clientImg/31.webp",
//     text: "Sri Lanka",
//     year: "2025",
//     pTxt: "An unforgettable destination wedding set against tropical beauty and serenity.",
//   },
//   {
//     img: "/clientImg/16.webp",
//     text: "Kampala",
//     year: "2025",
//     pTxt: "A meaningful celebration honoring love, family, and timeless traditions.",
//   },
//   {
//     img: "/clientImg/21.webp",
//     text: "Key West / Miami",
//     year: "2025",
//     pTxt: "Coastal elegance meets vibrant city charm in this unforgettable celebration.",
//   },
//   {
//     img: "/clientImg/29.webp",
//     text: "Savannah (Civil Ceremony)",
//     year: "2025",
//     pTxt: "An intimate civil ceremony captured with grace, warmth, and genuine emotion.",
//   },
//   {
//     img: "/clientImg/10.webp",
//     text: "Egypt",
//     year: "2025",
//     pTxt: "A magical wedding journey surrounded by ancient history and timeless romance.",
//   },
// ];

// const IMAGES = [
//   "/clientImg/1.webp",
//   "/clientImg/2.webp",
//   "/clientImg/3.webp",
//   "/clientImg/4.webp",
//   "/clientImg/5.webp",
//   "/clientImg/6.webp",
//   "/clientImg/7.webp",
//   "/clientImg/8.webp",
//   "/clientImg/9.webp",
//   "/clientImg/10.webp",
//   "/clientImg/11.webp",
//   "/clientImg/12.webp",
//   "/clientImg/13.webp",
//   "/clientImg/14.webp",
//   "/clientImg/15.webp",
//   "/clientImg/16.webp",
//   "/clientImg/17.webp",
//   "/clientImg/18.webp",
//   "/clientImg/19.webp",
//   "/clientImg/20.webp",
//   "/clientImg/21.webp",
//   "/clientImg/22.webp",
//   "/clientImg/23.webp",
//   "/clientImg/24.webp",
//   "/clientImg/25.webp",
//   "/clientImg/26.webp",
//   "/clientImg/27.webp",
//   "/clientImg/28.webp",
//   "/clientImg/29.webp",
//   "/clientImg/30.webp",
//   "/clientImg/31.webp",
//   "/clientImg/32.webp",
// ];

// const BACKGROUND_IMAGE_COUNT = 64;

// function createBackgroundLayout() {
//   const columns = 4;
//   const rows = Math.ceil(BACKGROUND_IMAGE_COUNT / columns);
//   // Reduced padding so images fill out to the edges instead of
//   // being boxed into the center of the section.
//   const xPadding = 2;
//   const yPadding = 2;
//   const usableWidth = 100 - xPadding * 2;
//   const usableHeight = 100 - yPadding * 2;
//   const directionOffsets = [
//     { x: 0, y: -2.4 },
//     { x: 0, y: 2.4 },
//     { x: -4.4, y: 0 },
//     { x: 4.4, y: 0 },
//   ];

//   return Array.from({ length: BACKGROUND_IMAGE_COUNT }, (_, index) => {
//     const row = Math.floor(index / columns);
//     const col = index % columns;
//     const lineDirection = directionOffsets[index % directionOffsets.length];
//     const rowShift = row % 2 === 0 ? -2 : 2;
//     const baseX = ((col + 0.5) / columns) * usableWidth + xPadding;
//     const baseY = ((row + 0.5) / rows) * usableHeight + yPadding;

//     return {
//       // Clamp range widened to match the smaller padding so items
//       // can sit much closer to the true edges of the section.
//       x: Math.min(98, Math.max(2, baseX + lineDirection.x + rowShift)),
//       y: Math.min(98, Math.max(2, baseY + lineDirection.y)),
//       o: index % 3 === 1 ? 0.16 : 1,
//     };
//   });
// }

// function FloatingImage({ item, index }) {
//   const ref = useRef(null);

//   useEffect(() => {
//     const isMobile = window.matchMedia("(max-width: 768px)").matches;
//     let mouseX = 0;
//     let mouseY = 0;
//     let currentX = 0;
//     let currentY = 0;
//     let sectionProgress = 0;
//     const lerp = (a, b, t) => a + (b - a) * t;

//     const onMove = (e) => {
//       if (isMobile) return;
//       mouseX = (e.clientX / window.innerWidth - 0.5) * 120;
//       mouseY = (e.clientY / window.innerHeight - 0.5) * 120;
//     };

//     window.addEventListener("mousemove", onMove);

//     const st = ScrollTrigger.create({
//       trigger: ".paren_nn",
//       start: "top top",
//       end: "bottom bottom",
//       scrub: true,
//       onUpdate(self) {
//         sectionProgress = self.progress;
//       },
//       onLeave: () => {
//         sectionProgress = 1;
//       },
//       onLeaveBack: () => {
//         sectionProgress = 0;
//       },
//     });

//     let raf;
//     const section = document.querySelector(".paren_nn");
//     const sectionHeight = section?.offsetHeight || 1;

//     const update = () => {
//       const targetX = mouseX * (item.o > 0.5 ? 0.6 : 0.3);
//       const progressY = sectionProgress * sectionHeight;
//       const scrollOffset = -(progressY * 0.12);
//       const targetY = mouseY * (item.o > 0.5 ? 0.5 : 0.25) + scrollOffset;

//       currentX = lerp(currentX, targetX, 0.08);
//       currentY = lerp(currentY, targetY, 0.08);

//       gsap.set(ref.current, {
//         xPercent: -50,
//         yPercent: -50,
//         x: currentX,
//         y: currentY,
//         force3D: true,
//       });
//       raf = requestAnimationFrame(update);
//     };

//     update();

//     return () => {
//       cancelAnimationFrame(raf);
//       st.kill();
//       window.removeEventListener("mousemove", onMove);
//     };
//   }, [item]);

//   return (
//     <div
//       ref={ref}
//       className="absolute will-change-transform "
//       // opacity: item.o 
//       style={{ left: `${item.x}%`, top: `${item.y}%`, opacity: 0.6 }}
//     >
//       <img
//         src={IMAGES[index % IMAGES.length]}
//         alt=""
//         draggable={false}
//         className={`w-[16vw] sm:w-[12vw] md:w-[8vw] ${
//           item.o === 1 ? "hover:scale-115 transition-all duration-700" : ""
//         }`}
//       />
//     </div>
//   );
// }

// export default function ParallaxScroll() {
//   const scope = useRef(null);
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [isExpanded, setIsExpanded] = useState(false);

//   const progress = DATA.length > 1 ? activeIndex / (DATA.length - 1) : 0;
//   const activeItem = DATA[activeIndex];

//   useGSAP(
//     () => {
//       gsap.to(".sticky_child", {
//         opacity: 1,
//         scale: 1,
//         scrollTrigger: {
//           trigger: ".sticky_child",
//           start: "5% top",
//           toggleActions: "play none none reverse",
//         },
//       });

//       ScrollTrigger.create({
//         trigger: ".paren_nn",
//         start: "top top",
//         end: "bottom bottom",
//         onUpdate(self) {
//           const total = DATA.length;
//           const index = Math.min(total - 1, Math.floor(self.progress * total));
//           setActiveIndex(index);
//         },
//       });

//       return () => {
//         ScrollTrigger.getAll().forEach((s) => s.kill());
//       };
//     },
//     { scope }
//   );

//   const backgroundLayout = useMemo(() => createBackgroundLayout(), []);

//   const selectItem = useCallback((index) => {
//     setActiveIndex(index);

//     const section = scope.current;
//     if (!section) return;

//     const maxScroll = section.offsetHeight - window.innerHeight;
//     const targetProgress = DATA.length > 1 ? index / (DATA.length - 1) : 0;
//     const targetY = section.offsetTop + maxScroll * targetProgress;

//     window.scrollTo({
//       top: targetY,
//       behavior: "smooth",
//     });
//   }, []);

//   const openFromPointer = (event) => {
//     if (event.pointerType !== "touch") setIsExpanded(true);
//   };

//   const closeFromPointer = (event) => {
//     if (event.pointerType !== "touch") setIsExpanded(false);
//   };

//   const toggleFromClick = () => {
//     const isTouchScreen =
//       typeof window !== "undefined" &&
//       window.matchMedia("(hover: none), (pointer: coarse)").matches;

//     if (isTouchScreen) setIsExpanded((value) => !value);
//   };

//   return (
//     <main ref={scope} className="paren_nn relative h-[800vh] BGCLR">
//       <section className="absolute inset-0 overflow-hidden ">
//         {backgroundLayout.map((item, i) => (
//           <FloatingImage key={i} item={item} index={i} />
//         ))}
//       </section>

//       <div className="sticky_child opacity-0 scale-90 sticky pointer-events-none top-0 h-screen flex flex-col items-center justify-center gap-y-6 sm:gap-y-4 px-4 sm:px-8">
//         <div className="relative w-[55vw] sm:w-[38vw] md:w-[25vw] aspect-[3.5/4] overflow-hidden">
//           {DATA.map((item, i) => (
//             <div
//               key={item.text}
//               className={`absolute inset-0 transition-all duration-700 ease-out ${
//                 i === activeIndex ? "opacity-100 scale-100" : "opacity-0 scale-105"
//               }`}
//             >
//               <img src={item.img} className="w-full h-full object-cover" alt={item.text} />
//             </div>
//           ))}
//         </div>

//         <div className="relative w-[85vw] sm:w-[60vw] md:w-[34vw] h-[150px] sm:h-[165px] md:h-[175px]  flex items-center justify-center">
//           {DATA.map((item, i) => (
//             <div
//               key={item.text}
//               className={`absolute inset-0 flex flex-col items-center justify-center text-center transition-all duration-500 ease-out ${
//                 i === activeIndex
//                   ? "opacity-100 translate-y-0"
//                   : "opacity-0 translate-y-3 pointer-events-none"
//               }`}
//             >
//               <h2 className="leading-snug max-sm:text-[1.7rem] max-sm:leading-[1.7rem] text-[#F1E2C6] Font_CV font-medium text-xl sm:text-2xl md:text-3xl">
//                 {item.text}
//               </h2>
//               <p className="mt-2 max-w-[34rem] text-[1rem] Font_CV leading-[1.1rem] text-[#F1E2C6]/85 sm:text-base md:text-lg">
//                 {item.pTxt}
//               </p>
//             </div>
//           ))}
//         </div>

//         <div
//           className="pointer-events-auto absolute bottom-4 sm:bottom-0 left-1/2 z-20 w-[88vw] max-w-[560px] -translate-x-1/2 px-2 pb-4 pt-10"
//           onPointerEnter={openFromPointer}
//           onPointerLeave={closeFromPointer}
//         >
//           <div
//             className={`mx-auto mb-3 grid origin-bottom grid-cols-2 gap-x-2 gap-y-1 overflow-hidden  bg-[#F1E2C6]/95 p-2 text-[#D25F28] shadow-[0_14px_40px_rgba(0,0,0,0.18)] backdrop-blur-sm transition-all duration-500 ease-out sm:gap-y-1.5 sm:p-3 ${
//               isExpanded
//                 ? "max-h-[360px] translate-y-0 opacity-100"
//                 : "max-h-0 translate-y-4 p-0 opacity-0"
//             }`}
//           >
//             {DATA.map((item, i) => {
//               const isActive = i === activeIndex;
//               const isRowEnd = i % 2 === 1 || i === DATA.length - 1;

//               return (
//                 <button
//                   key={item.text}
//                   type="button"
//                   onClick={() => selectItem(i)}
//                   className={`group flex min-h-9 items-center justify-between r border border-[#D25F28]/10 px-3 py-2 text-left Font_CV text-sm font-medium transition-all duration-300 ease-out sm:text-base ${
//                     isActive
//                       ? "bg-[#D25F28] text-[#F1E2C6]"
//                       : "text-[#D25F28] hover:bg-[#D25F28] hover:text-[#F1E2C6]"
//                   }`}
//                 >
//                   <span className="flex min-w-0 items-center">
//                     {/* <span className="mr-0 w-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:mr-2 group-hover:w-4 group-hover:opacity-100">
//                       -
//                     </span> */}
//                     <span className="truncate uppercase Font_CV">
//                       {item.text}
//                       {isRowEnd ? "." : ","}
//                     </span>
//                   </span>
//                   <span className="ml-2 translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
//                     <GoArrowUpRight />
//                   </span>
//                 </button>
//               );
//             })}
//           </div>

//           <button
//             type="button"
//             aria-expanded={isExpanded}
//             onClick={toggleFromClick}
//             className="group w-full cursor-pointer border-0 bg-transparent p-0"
//           >
//             <div className="relative h-8">
//               <div className="absolute left-0 right-0 top-1/2 h-0.5 -translate-y-1/2 overflow-hidden rounded-full bg-black/10">
//                 <div
//                   className="h-full bg-[#F1E2C6] transition-[width] duration-500 ease-out"
//                   style={{ width: `${progress * 100}%` }}
//                 />
//               </div>

//               <div
//                 className="absolute top-1/2 overflow-hidden  bg-[#F1E2C6] px-3 py-1 text-[#D25F28] shadow-[0_8px_18px_rgba(0,0,0,0.12)] transition-all duration-500 ease-out group-hover:bg-[#D25F28] group-hover:text-[#F1E2C6]"
//                 style={{
//                   left: `clamp(1.65rem, ${progress * 100}%, calc(100% - 1.65rem))`,
//                   transform: "translate(-50%, -50%)",
//                 }}
//               >
//                 <div className="h-4 overflow-hidden text-xs font-medium leading-4">
//                   <div
//                     className="transition-transform duration-500 ease-out"
//                     style={{ transform: `translateY(-${activeIndex}rem)` }}
//                   >
//                     {DATA.map((item) => (
//                       <div key={item.text} className="h-4 flex items-center justify-center">
//                         {item.year}
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* <div
//               className={`mt-3 flex items-center justify-between  uppercase bg-[#F1E2C6]/95 px-3 py-2 Font_CV text-[1rem] font-medium text-[#D25F28] shadow-[0_10px_28px_rgba(0,0,0,0.14)] transition-all duration-500 ease-out ${
//                 isExpanded ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
//               }`}
//             >
//               <span>{activeItem.text}</span>
//               <span>
//                 {activeIndex + 1}/{DATA.length} - {activeItem.year}
//               </span>
//             </div> */}
//           </button>
//         </div>
//       </div>

     
//     </main>
//   );
// }

"use client";

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
    img: "/clientImg/9.webp",
    text: "Boston",
    year: "2013",
    pTxt: "Where two college students became inseparable, one late-night Mario Kart match at a time.",
    landmarks: [
      { icon: GraduationCap, label: "Boston University" },
      { icon: Gamepad2, label: "Mario Kart" },
    ],
  },
  {
    img: "/clientImg/21.webp ",
    text: "Mumbai",
    year: "2021",
    pTxt: "Wandering Kala Ghoda's art streets and chasing the best kebabs in the city.",
    landmarks: [
      { icon: Landmark, label: "Kala Ghoda" },
      { icon: Utensils, label: "Bademiya" },
    ],
  },
  {
    img: "/clientImg/2.webp ",
    text: "Atlanta",
    year: "2022",
    pTxt: "Dancing until 2am, chasing waterfalls, and Waffle House at sunrise.",
    landmarks: [
      { icon: Music2, label: "Tongue and Groove", href: "https://tandgonline.com/" },
      { icon: Waves, label: "Amicalola Falls State Park" },
      { icon: Utensils, label: "Waffle House" },
    ],
  },
  {
    img: "/clientImg/19.webp ",
    text: "Thailand",
    year: "2022",
    pTxt: "Muay Thai bouts, bamboo bars, and a friend's wedding on Phuket's shores.",
    landmarks: [
      { icon: Music2, label: "Bangkok \u2014 Muay Thai & The Bamboo Bar" },
      { icon: Heart, label: "Phuket \u2014 Friend's Wedding" },
    ],
  },
  {
    img: "/clientImg/13.webp ",
    text: "Singapore",
    year: "2022",
    pTxt: "Biking past the Supertrees and hawker-stall feasts at Maxwell.",
    landmarks: [
      { icon: Bike, label: "Gardens by the Bay", href: "https://www.gardensbythebay.com.sg/" },
      { icon: Utensils, label: "Maxwell Food Centre", href: "https://chinatown.sg/dine/maxwell-hawker-centre/" },
    ],
  },
  {
    img: "/clientImg/25.webp",
    text: "New York",
    year: "2023",
    pTxt: "Skyline views, folded slices, and kati rolls between avenues.",
    landmarks: [
      { icon: Pizza, label: "Joe's Pizza", href: "https://www.joespizzanyc.com/" },
      { icon: Utensils, label: "Kati Roll Company", href: "https://www.tkrc.co.uk/" },
    ],
  },
  {
    img: "/clientImg/12.webp",
    text: "Ithaca",
    year: " 2024",
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
    pTxt: "Chasing Murchison's mist, tasting matoke, and floating down the Nile.",
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
    img: "/clientImg/27.webp",
    text: "Key West",
    year: "2025",
    pTxt: "Key lime pie, dolphin sightings, and mangroves stretching to the horizon.",
    landmarks: [
      { icon: Utensils, label: "Key Lime Pie" },
      { icon: Fish, label: "Dolphins & Mangrove Forest", href: "https://floridakeys.noaa.gov/plants/mangroves.html" },
    ],
  },
  {
    img: "/clientImg/10.webp",
    text: "Egypt",
    year: "2025",
    pTxt: "Standing before the pyramids, tracing the names of pharaohs long gone.",
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

//  ------------------------------------------------------------------------------- OLD BACK

// const BACKGROUND_IMAGE_COUNT = 64;

// function createBackgroundLayout() {
//   const columns = 4;
//   const rows = Math.ceil(BACKGROUND_IMAGE_COUNT / columns);
//   // Reduced padding so images fill out to the edges instead of
//   // being boxed into the center of the section.
//   const xPadding = 2;
//   const yPadding = 2;
//   const usableWidth = 100 - xPadding * 2;
//   const usableHeight = 100 - yPadding * 2;
//   const directionOffsets = [
//     { x: 0, y: -2.4 },
//     { x: 0, y: 2.4 },
//     { x: -4.4, y: 0 },
//     { x: 4.4, y: 0 },
//   ];

//   return Array.from({ length: BACKGROUND_IMAGE_COUNT }, (_, index) => {
//     const row = Math.floor(index / columns);
//     const col = index % columns;
//     const lineDirection = directionOffsets[index % directionOffsets.length];
//     const rowShift = row % 2 === 0 ? -2 : 2;
//     const baseX = ((col + 0.5) / columns) * usableWidth + xPadding;
//     const baseY = ((row + 0.5) / rows) * usableHeight + yPadding;

//     return {
//       // Clamp range widened to match the smaller padding so items
//       // can sit much closer to the true edges of the section.
//       x: Math.min(98, Math.max(2, baseX + lineDirection.x + rowShift)),
//       y: Math.min(98, Math.max(2, baseY + lineDirection.y)),
//       o: index % 3 === 1 ? 0.16 : 1,
//     };
//   });
// }

//  ------------------------------------------------------------------------------- New BACK

const BACKGROUND_IMAGE_COUNT = 64;

// Percentage width of the empty gap in the center of the screen.
// e.g. 30 means the middle 30% of the width (35%–65%) stays empty.
const CENTER_GAP_PERCENT = 40;

function createBackgroundLayout() {
  const columns = 4;
  const rows = Math.ceil(BACKGROUND_IMAGE_COUNT / columns);

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

  const directionOffsets = [
    { x: 0, y: -2.4 },
    { x: 0, y: 2.4 },
    { x: -2, y: 0 },
    { x: 2, y: 0 },
  ];

  return Array.from({ length: BACKGROUND_IMAGE_COUNT }, (_, index) => {
    const row = Math.floor(index / columns);
    const col = index % columns;
    const lineDirection = directionOffsets[index % directionOffsets.length];
    const rowShift = row % 2 === 0 ? -2 : 2;

    // First 2 columns go in the left half, last 2 columns go in the right half.
    const isLeftSide = col < columns / 2;
    const sideColIndex = isLeftSide ? col : col - columns / 2;
    const sideColumns = columns / 2;

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

function FloatingImage({ item, index }) {
  const ref = useRef(null);

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    let sectionProgress = 0;
    const lerp = (a, b, t) => a + (b - a) * t;

    const onMove = (e) => {
      if (isMobile) return;
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
      className="absolute will-change-transform hidden sm:block"
      // opacity: item.o
      style={{ left: `${item.x}%`, top: `${item.y}%`, opacity: 0.6 }}
    >
      <img
        src={IMAGES[index % IMAGES.length]}
        alt=""
        draggable={false}
        className={`w-[14vw] sm:w-[10vw] md:w-[8vw] ${
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
      className={`group flex w-4 shrink-0 flex-col items-center gap-1 text-center sm:w-[4.5rem] md:w-20 ${
        isLink ? "cursor-pointer" : ""
      }`}
    >
      <div className="relative aspect-square w-full overflow-hidden  transition-transform duration-500 ease-out group-hover:-translate-y-1">
        {landmark.img ? (
          <img
            src={landmark.img}
            alt={landmark.label}
            className="h-full w-full object-cover"
            draggable={false}
          />
        ) : (
          <div className="flex h-full w-full items-end justify-center pb-2 text-[#F1E2C6] ">
            {Icon && <Icon size={27} strokeWidth={1.5} />}
          </div>
        )}
      </div>
      <span
        className={`Font_CV text-[0.55rem] uppercase leading-tight tracking-wide text-[#F1E2C6] sm:text-[0.62rem] ${
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

  const progress = DATA.length > 1 ? activeIndex / (DATA.length - 1) : 0;
  const activeItem = DATA[activeIndex];

  useGSAP(
    () => {
      gsap.to(".sticky_child", {
        opacity: 1,
        scale: 1,
        scrollTrigger: {
          trigger: ".sticky_child",
          start: "5% top",
          toggleActions: "play none none reverse",
        },
      });

      ScrollTrigger.create({
        trigger: ".paren_nn",
        start: "top top",
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

  const backgroundLayout = useMemo(() => createBackgroundLayout(), []);

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
          <FloatingImage key={i} item={item} index={i} />
        ))}
      </section>

      <div className="sticky_child opacity-0 scale-90 sticky pointer-events-none top-0 flex h-screen flex-col items-center justify-center gap-y-2 px-3 sm:gap-y-4 sm:px-8">
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
        <div className="relative min-h-[68px] w-[92vw] max-w-[420px] sm:min-h-[84px] mt-10 sm:mt-2 sm:w-[70vw] md:w-[40vw]">
          {DATA.map((item, i) => (
            <div
              key={i}
              className={`pointer-events-auto absolute inset-0 flex flex-wrap items-start justify-center gap-x-3 gap-y-2 transition-all duration-500 ease-out ${
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
              className={`Font_CV absolute inset-0 flex items-center justify-center px-1 text-[1.5rem] leading-[1.5rem]  text-[#F1E2C6]/85 transition-all duration-500 ease-out   ${
                i === activeIndex
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-3 pointer-events-none"
              }`}
            >
              {item.pTxt}
            </p>
          ))}
        </div>

        <div
          className="pointer-events-auto absolute bottom-3 sm:bottom-0 left-1/2 z-20 w-[92vw] max-w-[560px] -translate-x-1/2 px-2 pb-3 pt-8 sm:pb-4 sm:pt-10"
          onPointerEnter={openFromPointer}
          onPointerLeave={closeFromPointer}
        >
          <div
            className={`mx-auto mb-3 grid origin-bottom grid-cols-2 gap-x-2 gap-y-1 overflow-hidden  bg-[#F1E2C6]/95 p-2 text-[#D25F28] shadow-[0_14px_40px_rgba(0,0,0,0.18)] backdrop-blur-sm transition-all duration-500 ease-out sm:gap-y-1.5 sm:p-3 ${
              isExpanded
                ? "max-h-[360px] translate-y-0 opacity-100"
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
                    <span className="truncate uppercase Font_CV">
                      {item.text}
                      {isRowEnd ? "." : ","}
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