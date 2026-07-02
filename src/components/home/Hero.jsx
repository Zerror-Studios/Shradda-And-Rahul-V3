
// "use client";
// import { useEffect, useRef, useState } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Link from "next/link";
// import { useTransitionRouter } from "next-view-transitions";
// gsap.registerPlugin(ScrollTrigger);

// const Hero = () => {
//   const router = useTransitionRouter();
//   const MainContHome = useRef();
//   const Wall = useRef();
//   const LeftDoor = useRef();
//   const RightDoor = useRef();
//   const doorContainer = useRef();
//   const menuItemsRef = useRef([]);
//   const bgLayerRef = useRef(); // wraps BG image + wall/doors for blur
//   const [isAnimating, setIsAnimating] = useState(false);

//   const menuItems = [
//     {
//       img:"/images/home/Tile1.png",
//       title:"Pyaar Dosti Hai",
//       link:"/pyaar-dosti-hai",
//     },
//     {
//       img:"/images/home/Tile2.png",
//       title:"From Marrakech, with Love",
//       link:"/venu",
//     },
//     {
//       img:"/images/home/Tile3.png",
//       title:"Wedding Itinerary",
//       link:"/wedding-itinerary",
//     },
//     {
//       img:"/images/home/Tile4.png",
//       title:"Travel and FAQs",
//       link:"/travel-and-faqs",
//     },
//   ];

//   const handleMenuItemClick = (e, index, link) => {
//     e.preventDefault();

//     if (isAnimating) return; // Prevent multiple clicks while navigating
//     setIsAnimating(true);

//     router.push(link);
//   };

//   useEffect(() => {
//     const TL1 = gsap.timeline({
//       scrollTrigger: {
//         trigger: MainContHome.current,
//         start: "top top",
//         end: "bottom bottom",
//         scrub: true,
//         ease: "none",
//       },
//     });
//     // Left door opens to the left (rotate from right edge)
//     TL1.to(
//       LeftDoor.current,
//       {
//         rotateY: -110,
//         transformOrigin: "left center",
//         ease: "none",
//       },
//       0,
//     );

//     // Right door opens to the right (rotate from left edge)
//     TL1.to(
//       RightDoor.current,
//       {
//         rotateY: -110,
//         transformOrigin: "right center",
//         ease: "none",
//       },
//       0,
//     );
//     TL1.to(doorContainer.current, { autoAlpha: 0, duration: 0.01 });
//     TL1.to(Wall.current, {
//       scale: 6,
//       transformOrigin: "center",
//       ease: "none",
//     });

//     // ================================================== ── Timeline 2: Menu Items (toggleActions — NOT scrub) ====================================== ──
//     const TL2 = gsap.timeline({
//       scrollTrigger: {
//         trigger: MainContHome.current, // starts when door is done
//         start: "85% bottom",
//         toggleActions: "play reverse play reverse",
//         // markers:true,
//       },
//     });
//     TL2.to(".wedding-title", {
//       opacity: 1,
//       y: 0,
//       duration: 0.6,
//       ease: "power2.out",
//     });

//     TL2.fromTo(
//       ".menu-item",
//       {
//         opacity: 0,
//         rotationY: -90,
//         scale: 0.7,
//         z: -300,
//         y: 40,
//         transformOrigin: "center center",
//       },
//       {
//         opacity: 1,
//         rotationY: 0,
//         scale: 1,
//         z: 0,
//         y: 0,
//         stagger: 0.12,
//         duration: 0.9,
//         ease: "back.out(1.8)",
//       }
//     );
//   }, []);

//   return (
//     <div ref={MainContHome} className="w-full  max-sm:h-[300svh] sm:h-[400svh] relative flex">
//       <div className=" w-full h-svh sticky top-0 left-0">
//         {/* All-Content-Container */}
//         <div className="w-full h-svh relative overflow-hidden">
//           {/* bgLayerRef wraps the BG image AND the wall/doors so both blur together */}
//           <div ref={bgLayerRef} className="w-full h-svh absolute top-0 left-0">
//             {/* Background image */}
//             <img
//               src={`/new_img/BG.jpeg`}
//               alt="Img"
//               className=" w-full h-full object-cover object-bottom z-45"
//             />

//             {/* Wall-With-MainDoor */}
//             <div className=" w-full h-svh absolute  top-0 left-0 overflow-hidden z-50 pointer-events-none">
//               {/* Wall-Image */}
              
//               <img
//                 ref={Wall}
//                 src={`/images/home/Wall.png`}
//                 alt="wall"
//                 className="w-full h-full object-bottom object-cover max-sm:object-[51.1%_100%]  relative z-50"
//               />

//               {/* Door-Container */}
//               <div
//                 ref={doorContainer}
//                 className="  DoorHeight Doorwidth w-[95vw] h-[95vh] sm:w-[70vw] sm:h-[90vh] md:w-[55vw]  lg:w-[40vw]  lg:h-[95vh] xl:w-[30vw] 2xl:w-[26vw] absolute left-[51.2%]  flex justify-center items-center -translate-x-1/2  bottom-[7.5%] z-49 "
//               >
//                 {/* Left-Door */}
//                 <div
//                   ref={LeftDoor}
//                   className="w-1/2 h-full overflow-hidden "
//                   style={{
//                     transformStyle: "preserve-3d",
//                     backfaceVisibility: "hidden",
//                   }}
//                 >
//                   <img
//                     src={`/images/home/DOOR-L.png`}
//                     alt="left"
//                     className=" h-full  w-full object-center"
//                   />
//                 </div>

//                 {/* Right-Door */}
//                 <div
//                   ref={RightDoor}
//                   className="w-1/2 h-full  overflow-hidden "
//                   style={{
//                     transformStyle: "preserve-3d",
//                     backfaceVisibility: "hidden",
//                   }}
//                 >
//                   <img
//                     src={`/images/home/DOOR-R.png`}
//                     alt="Right"
//                     className=" h-full w-full object-center "
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Middel-Cont */}
//           <div className="w-full h-full absolute top-0 left-0 z-47 flex flex-col justify-center items-center">
//             {/* Logo */}
//             <div className="w-[40px] aspect-square absolute top-[5%] left-1/2 -translate-x-1/2">
//               <img
//                 src="/logo.svg"
//                 className="w-full object-cover object-center"
//               />
//             </div>

//             <div className="wedding-container text-center pb-[5vh]">
//               <div className="wedding-title w-[50vw] max-sm:w-[90vw] opacity-0 translate-y-10  flex mx-auto">
//                <h1 className=" my-2 flex mx-auto Font_CV uppercase text-[#F1E2C6] font-bold">The Wedding Of</h1>
//               </div>
//               <div className="wedding-title w-[50vw] max-sm:w-[90vw] opacity-0 translate-y-10  flex mx-auto">
//                  <h1 className=" text-[5vw] leading-[5vw] flex mx-auto Font_CV uppercase text-[#F1E2C6]">Shradda & Rahul</h1>
//               </div>
//             </div>

//             {/* Menu_Cont */}
//             <div className="grid w-fit grid-cols-4 menuScaler gap-[2vw] max-sm:grid-cols-2">
//               {menuItems.map((item, index) => (
//                 <Link key={index} href={item.link}>
//                   <div
//                     ref={(el) => (menuItemsRef.current[index] = el)}
//                     onClick={(e) => handleMenuItemClick(e, index, item.link)}
//                     className="menu-item flex cursor-pointer group flex-col opacity-0 translate-y-10 items-center gap-3 relative"
//                     style={{
//                       opacity: 0,
//                       transformStyle: "preserve-3d",
//                       backfaceVisibility: "hidden",
//                       transformOrigin: "50% 50%",
//                     }}
//                   >
//                     {/* Icon with click-hint animations */}
//                     <div className="menu-icon h-[100px] w-[100px] relative transition-all duration-500 ease-out group-hover:rotate-45 group-hover:scale-[0.7]">
//                       <img
//                         src={item.img}
//                         alt={item.title}
//                         className="h-full w-full object-cover object-center"
//                       />
//                       {/* Cursor-click dot */}
//                       <span className="cursor-hint " />
//                     </div>

//                     <p className="menu-text F1 font-semibold Font_CV transition-all duration-500 ease-out   opacity-100 text-[14px] text-[#F1E2C6] leading-[15px] uppercase max-w-[150px] text-center">
//                       {item.title}
//                     </p>
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Hero;


"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useTransitionRouter } from "next-view-transitions";
gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const router = useTransitionRouter();
  const MainContHome = useRef();
  const Wall = useRef();
  const LeftDoor = useRef();
  const RightDoor = useRef();
  const doorContainer = useRef();
  const menuItemsRef = useRef([]);
  const bgLayerRef = useRef(); // wraps BG image + wall/doors for blur
  const [isAnimating, setIsAnimating] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  const menuItems = [
    {
      img:"/images/home/Tile1.png",
      title:"Pyaar Dosti Hai",
      link:"/pyaar-dosti-hai",
    },
    {
      img:"/images/home/Tile2.png",
      title:"From Marrakech, with Love",
      link:"/venu",
    },
    {
      img:"/images/home/Tile3.png",
      title:"Wedding Itinerary",
      link:"/wedding-itinerary",
    },
    {
      img:"/images/home/Tile4.png",
      title:"Travel and FAQs",
      link:"/travel-and-faqs",
    },
  ];

  const handleMenuItemClick = (e, index, link) => {
    e.preventDefault();

    if (isAnimating) return; // Prevent multiple clicks while navigating
    setIsAnimating(true);

    router.push(link);
  };

  // ── Detect tablet / iPad viewport (768px–1024px) ───────────────────────
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 768px) and (max-width: 1024px)");

    const updateMatch = (e) => setIsTablet(e.matches);
    updateMatch(mql); // set initial value

    mql.addEventListener("change", updateMatch);
    setHasMounted(true);

    return () => mql.removeEventListener("change", updateMatch);
  }, []);

  useEffect(() => {
    if (!hasMounted) return; // wait until we know the device type

    const ctx = gsap.context(() => {
      // ── Timeline 1: Door + Wall animation — SKIPPED entirely for tablets/iPads ──
      if (!isTablet) {
        const TL1 = gsap.timeline({
          scrollTrigger: {
            trigger: MainContHome.current,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            ease: "none",
          },
        });
        // Left door opens to the left (rotate from right edge)
        TL1.to(
          LeftDoor.current,
          {
            rotateY: -110,
            transformOrigin: "left center",
            ease: "none",
          },
          0,
        );

        // Right door opens to the right (rotate from left edge)
        TL1.to(
          RightDoor.current,
          {
            rotateY: -110,
            transformOrigin: "right center",
            ease: "none",
          },
          0,
        );
        TL1.to(doorContainer.current, { autoAlpha: 0, duration: 0.01 });
        TL1.to(Wall.current, {
          scale: 6,
          transformOrigin: "center",
          ease: "none",
        });
      }

      // ── Timeline 2: Menu Items ──────────────────────────────────────────
      // Tablet/iPad → plays automatically on load, no scroll needed
      // Other devices → scroll-triggered (toggleActions), as before
      const TL2 = gsap.timeline(
        isTablet
          ? { delay: 0.2 } // small delay so it doesn't feel too abrupt on load
          : {
              scrollTrigger: {
                trigger: MainContHome.current,
                start: "85% bottom",
                toggleActions: "play reverse play reverse",
                // markers:true,
              },
            }
      );

      TL2.to(".wedding-title", {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
      });

      TL2.fromTo(
        ".menu-item",
        {
          opacity: 0,
          rotationY: -90,
          scale: 0.7,
          z: -300,
          y: 40,
          transformOrigin: "center center",
        },
        {
          opacity: 1,
          rotationY: 0,
          scale: 1,
          z: 0,
          y: 0,
          stagger: 0.12,
          duration: 0.9,
          ease: "back.out(1.8)",
        }
      );
    }, MainContHome);

    return () => ctx.revert(); // cleanup all ScrollTriggers/animations on unmount or re-run
  }, [isTablet, hasMounted]);

  return (
    <div
      ref={MainContHome}
      className={`w-full relative flex ${
        isTablet ? "h-svh" : "max-sm:h-[300svh] sm:h-[400svh]"
      }`}
    >
      <div className=" w-full h-svh sticky top-0 left-0">
        {/* All-Content-Container */}
        <div className="w-full h-svh relative overflow-hidden">
          {/* bgLayerRef wraps the BG image AND the wall/doors so both blur together */}
          <div ref={bgLayerRef} className="w-full h-svh absolute top-0 left-0">
            {/* Background image */}
            <img
              src={`/new_img/BG.jpeg`}
              alt="Img"
              className=" w-full h-full object-cover object-bottom z-45"
            />

            {/* Wall-With-MainDoor — entirely removed for tablets/iPads */}
            {!isTablet && (
              <div className=" w-full h-svh absolute  top-0 left-0 overflow-hidden z-50 pointer-events-none">
                {/* Wall-Image */}
                <img
                  ref={Wall}
                  src={`/images/home/Wall.png`}
                  alt="wall"
                  className="w-full h-full object-bottom object-cover max-sm:object-[51.1%_100%]  relative z-50"
                />

                {/* Door-Container */}
                <div
                  ref={doorContainer}
                  className="  DoorHeight Doorwidth w-[95vw] h-[95vh] sm:w-[70vw] sm:h-[90vh] md:w-[55vw]  lg:w-[40vw]  lg:h-[95vh] xl:w-[30vw] 2xl:w-[26vw] absolute left-[51.2%]  flex justify-center items-center -translate-x-1/2  bottom-[7.5%] z-49 "
                >
                  {/* Left-Door */}
                  <div
                    ref={LeftDoor}
                    className="w-1/2 h-full overflow-hidden "
                    style={{
                      transformStyle: "preserve-3d",
                      backfaceVisibility: "hidden",
                    }}
                  >
                    <img
                      src={`/images/home/DOOR-L.png`}
                      alt="left"
                      className=" h-full  w-full object-center"
                    />
                  </div>

                  {/* Right-Door */}
                  <div
                    ref={RightDoor}
                    className="w-1/2 h-full  overflow-hidden "
                    style={{
                      transformStyle: "preserve-3d",
                      backfaceVisibility: "hidden",
                    }}
                  >
                    <img
                      src={`/images/home/DOOR-R.png`}
                      alt="Right"
                      className=" h-full w-full object-center "
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Middel-Cont */}
          <div className="w-full h-full absolute top-0 left-0 z-47 flex flex-col justify-center items-center">
            {/* Logo */}
            <div className="w-[40px] aspect-square absolute top-[5%] left-1/2 -translate-x-1/2">
              <img
                src="/logo.svg"
                className="w-full object-cover object-center"
              />
            </div>

            <div className="wedding-container text-center pb-[5vh]">
              <div className="wedding-title w-[50vw] max-sm:w-[90vw] opacity-0 translate-y-10  flex mx-auto">
               <h1 className=" my-2 flex mx-auto Font_CV uppercase text-[#F1E2C6] text-[1.2rem] max-sm:text-[1rem] font-bold">The Wedding Of</h1>
              </div>
              <div className="wedding-title w-[50vw] max-lg:w-[99vw] opacity-0 translate-y-10  flex mx-auto">
                 <h1 className=" text-[5vw] leading-[5vw] max-lg:text-[6vw] max-lg:leading-[6vw] max-sm:text-[8vw] max-sm:leading-[8vw]  flex mx-auto Font_CV uppercase text-[#F1E2C6]">Shradda & Rahul</h1>
              </div>
            </div>

            {/* Menu_Cont */}
            <div className="grid w-fit grid-cols-4 menuScaler gap-[2vw] max-sm:grid-cols-2">
              {menuItems.map((item, index) => (
                <Link key={index} href={item.link}>
                  <div
                    ref={(el) => (menuItemsRef.current[index] = el)}
                    onClick={(e) => handleMenuItemClick(e, index, item.link)}
                    className="menu-item flex cursor-pointer group flex-col opacity-0 translate-y-10 items-center gap-3 relative"
                    style={{
                      opacity: 0,
                      transformStyle: "preserve-3d",
                      backfaceVisibility: "hidden",
                      transformOrigin: "50% 50%",
                    }}
                  >
                    {/* Icon with click-hint animations */}
                    <div className="menu-icon h-[100px] w-[100px] relative transition-all duration-500 ease-out group-hover:rotate-45 group-hover:scale-[0.7]">
                      <img
                        src={item.img}
                        alt={item.title}
                        className="h-full w-full object-cover object-center"
                      />
                      {/* Cursor-click dot */}
                      <span className="cursor-hint " />
                    </div>

                    <p className="menu-text F1 font-semibold Font_CV transition-all duration-500 ease-out   opacity-100 text-[14px] text-[#F1E2C6] leading-[15px] uppercase max-w-[150px] text-center">
                      {item.title}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;