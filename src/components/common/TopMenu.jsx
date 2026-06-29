// // "use client";
// // import Link from "next/link";
// // import React, { useEffect, useRef, useState } from "react";
// // import gsap from "gsap";
// // import ScrollTrigger from "gsap/ScrollTrigger";
// // import { RiMenu4Fill, RiMenu3Line } from "react-icons/ri";
// // import { usePathname } from "next/navigation";
// // import { useTransitionRouter } from "next-view-transitions"

// // gsap.registerPlugin(ScrollTrigger);

// // const TopMenu = () => {
// //   const router = useTransitionRouter();
// //   const navRef = useRef(null);
// //   const pathname = usePathname();

// //   const [isNavOpen, SetIsNavOpen] = useState(false);


// //    if (pathname === "/") return null;


// //   // MOBILE MENU
// //   const clickCheck = () => {
// //     if (!isNavOpen) {
// //       const tl = gsap.timeline();

// //       tl.to(".MOBILENAV", {
// //         right: "0%",
// //         duration: 0.35,
// //         ease: "power3.out",
// //       });

// //       tl.to(
// //         ".smNavItem",
// //         {
// //           opacity: 1,
// //           y: 0,
// //           stagger: 0.06,
// //           duration: 0.3,
// //           ease: "power3.out",
// //         },
// //         "-=0.2",
// //       );

// //       SetIsNavOpen(true);
// //     } else {
// //       const tl = gsap.timeline();

// //       tl.to(".smNavItem", {
// //         opacity: 0,
// //         y: 20,
// //         stagger: 0.04,
// //         duration: 0.15,
// //       });

// //       tl.to(
// //         ".MOBILENAV",
// //         {
// //           right: "-100%",
// //           duration: 0.3,
// //           ease: "power3.out",
// //         },
// //         "-=0.05",
// //       );

// //       SetIsNavOpen(false);
// //     }
// //   };

// //   const closeMenu = () => {
// //     if (isNavOpen) clickCheck();
// //   };


// //   const navLinks = [

// //      {

// //     name: "Pyaar Dosti Hai",
// //     path: "/pyaar-dosti-hai",
// //   },
// //   {

// //     name: "From Marrakech, with Love",
// //     path: "/venu",
// //   },
// //   {

// //     name: "Wedding Itinerary",
// //     path: "/wedding-itinerary",
// //   },
// //   {

// //     name: "Travel and FAQs",
// //     path: "/travel-and-faqs",
// //   },

// //   ];

// //   return (
// //     <>
// //       {/* MAIN NAVBAR */}
// //       <div
// //         ref={navRef}
// //         className="w-full h-[80px] fixed top-0 left-0 z-[9999] px-5 lg:px-8 flex items-center justify-between"
// //       >
// //         {/* LOGO */}
// //         <Link href={`/`} className="w-fit h-[40px] z-[1000]"
// //         onClick={(e) => {
// //                 e.preventDefault();
// //                 router.push(`/`, {
// //                   onTransitionReady: pageAnimation,
// //                 });
// //               }}
// //         >
// //           <img
// //             src={`/logo.svg`}
// //             alt="Logo"
// //             className="h-full object-contain text-[#F1E2C6]"
// //           />
// //         </Link>

// //         {/* DESKTOP NAV */}
// //         <div className="hidden lg:flex items-center gap-[2vw]">
// //           {navLinks.map((item, index) => (
// //             <Link key={index} href={item.path}
// //             onClick={(e) => {
// //                 e.preventDefault();
// //                 router.push(item.path, {
// //                   onTransitionReady: pageAnimation,
// //                 });
// //               }}
// //             >
// //               <div
// //                 className={`relative text-[14px] F1 text-[#F1E2C6] uppercase cursor-pointer group ${
// //                   pathname === item.path ? "border-b border-[#F1E2C6]" : ""
// //                 }`}
// //               >
// //                 <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#F1E2C6] group-hover:w-full duration-300"></div>

// //                 {item.name}
// //               </div>
// //             </Link>
// //           ))}


// //         </div>

// //         {/* MOBILE MENU BTN */}
// //         <div onClick={clickCheck} className="lg:hidden z-[99999] cursor-pointer ">
// //           {isNavOpen ? (
// //             <RiMenu3Line className="text-[2rem] text-[#F1E2C6]" />
// //           ) : (
// //             <RiMenu4Fill className="text-[2rem] text-[#F1E2C6]" />
// //           )}
// //         </div>
// //       </div>

// //       {/* MOBILE NAVIGATION */}
// //       <div className="MOBILENAV fixed top-0 right-[-100%] w-full sm:w-[80%] h-screen bg-[#5C3723] z-[999] flex flex-col px-8 pt-[120px] pb-10">
// //         {/* LINKS */}
// //         <div className="flex flex-col gap-6">
// //           {navLinks.map((item, index) => (
// //             <Link key={index} href={item.path}
// //              onClick={(e) => {
// //                e.preventDefault();
// //                closeMenu
// //                 router.push(item.path, {
// //                   onTransitionReady: pageAnimation,
// //                 });
// //               }}
// //             >
// //               <div
// //                 className={`smNavItem opacity-0 translate-y-[20px] text-[1.3rem] text-[#F1E2C6] uppercase tracking-wide ${
// //                   pathname === item.path ? "underline" : ""
// //                 }`}
// //               >
// //                 {item.name}
// //               </div>
// //             </Link>
// //           ))}
// //         </div>


// //       </div>
// //     </>
// //   );
// // };


// // const pageAnimation = () => {
// //   document.documentElement.animate(
// //     [
// //       {
// //         opacity: 1,
// //         scale: 1,
// //         transform: "translateY(0)",
// //       },
// //       {
// //         opacity: 0.5,
// //         scale: 0.9,
// //         transform: "translateY(-100px)",
// //       },
// //     ],
// //     {
// //       duration: 1000,
// //       easing: "cubic-bezier(0.76, 0, 0.24, 1)",
// //       fill: "forwards",
// //       pseudoElement: "::view-transition-old(root)",
// //     }
// //   );

// //   document.documentElement.animate(
// //     [
// //       {
// //         transform: "translateY(100%)",
// //       },
// //       {
// //         transform: "translateY(0)",
// //       },
// //     ],
// //     {
// //       duration: 1000,
// //       easing: "cubic-bezier(0.76, 0, 0.24, 1)",
// //       fill: "forwards",
// //       pseudoElement: "::view-transition-new(root)",
// //     }
// //   );
// // };

// // export default TopMenu;

// "use client";
// import Link from "next/link";
// import React, { useEffect, useRef, useState } from "react";
// import gsap from "gsap";
// import ScrollTrigger from "gsap/ScrollTrigger";
// import { RiMenu4Fill, RiMenu3Line } from "react-icons/ri";
// import { usePathname } from "next/navigation";
// import { useTransitionRouter } from "next-view-transitions"

// gsap.registerPlugin(ScrollTrigger);

// const TopMenu = () => {
//   const router = useTransitionRouter();
//   const navRef = useRef(null);
//   const pathname = usePathname();

//   const [isNavOpen, SetIsNavOpen] = useState(false);


//   if (pathname === "/") return null;


//   // MOBILE MENU
//   const clickCheck = () => {
//     if (!isNavOpen) {
//       const tl = gsap.timeline();

//       tl.to(".MOBILENAV", {
//         right: "0%",
//         duration: 0.35,
//         ease: "power3.out",
//       });

//       tl.to(
//         ".smNavItem",
//         {
//           opacity: 1,
//           y: 0,
//           stagger: 0.06,
//           duration: 0.3,
//           ease: "power3.out",
//         },
//         "-=0.2",
//       );

//       SetIsNavOpen(true);
//     } else {
//       const tl = gsap.timeline();

//       tl.to(".smNavItem", {
//         opacity: 0,
//         y: 20,
//         stagger: 0.04,
//         duration: 0.15,
//       });

//       tl.to(
//         ".MOBILENAV",
//         {
//           right: "-100%",
//           duration: 0.3,
//           ease: "power3.out",
//         },
//         "-=0.05",
//       );

//       SetIsNavOpen(false);
//     }
//   };

//   const closeMenu = () => {
//     if (isNavOpen) clickCheck();
//   };


//   const navLinks = [

//     {

//       name: "Pyaar Dosti Hai",
//       path: "/pyaar-dosti-hai",
//     },
//     {

//       name: "From Marrakech, with Love",
//       path: "/venu",
//     },
//     {

//       name: "Wedding Itinerary",
//       path: "/wedding-itinerary",
//     },
//     {

//       name: "Travel and FAQs",
//       path: "/travel-and-faqs",
//     },

//   ];

//   return (
//     <>
//       {/* MAIN NAVBAR */}
//       <div
//         ref={navRef}
//         className="w-full h-[80px] fixed top-0 left-0 z-[9999] px-5 lg:px-8 flex items-center justify-between"
//       >
//         {/* LOGO */}
//         <Link href={`/`} className="w-fit h-[40px] z-[1000]"
//           onClick={(e) => {
//             e.preventDefault();
//             router.push(`/`);
//           }}
//         >
//           <img
//             src={`/logo.svg`}
//             alt="Logo"
//             className="h-full object-contain text-[#F1E2C6]"
//           />
//         </Link>

//         {/* DESKTOP NAV */}
//         <div className="hidden lg:flex items-center gap-[2vw]">
//           {navLinks.map((item, index) => (
//             <Link key={index} href={item.path}
//               onClick={(e) => {
//                 e.preventDefault();
//                 router.push(item.path);
//               }}
//             >
//               <div
//                 className={`relative text-[14px] F1 text-[#F1E2C6] uppercase cursor-pointer group ${pathname === item.path ? "border-b border-[#F1E2C6]" : ""
//                   }`}
//               >
//                 <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#F1E2C6] group-hover:w-full duration-300"></div>

//                 {item.name}
//               </div>
//             </Link>
//           ))}


//         </div>

//         {/* MOBILE MENU BTN */}
//         <div onClick={clickCheck} className="lg:hidden z-[99999] cursor-pointer ">
//           {isNavOpen ? (
//             <RiMenu3Line className="text-[2rem] text-[#F1E2C6]" />
//           ) : (
//             <RiMenu4Fill className="text-[2rem] text-[#F1E2C6]" />
//           )}
//         </div>
//       </div>

//       {/* MOBILE NAVIGATION */}
//       <div className="MOBILENAV fixed top-0 right-[-100%] w-full sm:w-[80%] h-screen bg-[#1E4858] z-[999] flex flex-col px-8 pt-[120px] pb-10">
//         {/* LINKS */}
//         <div className="flex flex-col gap-6">
//           {navLinks.map((item, index) => (
//             <Link key={index} href={item.path}
//               onClick={(e) => {
//                 e.preventDefault();
//                 closeMenu();
//                 router.push(item.path);
//               }}
//             >
//               <div
//                 className={`smNavItem opacity-0 translate-y-[20px] text-[1.3rem] text-[#F1E2C6] uppercase tracking-wide ${pathname === item.path ? "underline" : ""
//                   }`}
//               >
//                 {item.name}
//               </div>
//             </Link>
//           ))}
//         </div>


//       </div>
//     </>
//   );
// };

// export default TopMenu;

"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { RiMenu4Fill, RiMenu3Line } from "react-icons/ri";
import { usePathname } from "next/navigation";
import { useTransitionRouter } from "next-view-transitions"

gsap.registerPlugin(ScrollTrigger);

const TopMenu = () => {
  const router = useTransitionRouter();
  const navRef = useRef(null);
  const pathname = usePathname();

  const [isNavOpen, SetIsNavOpen] = useState(false);

  if (pathname === "/") return null;

  const clickCheck = () => {
    if (!isNavOpen) {
      const tl = gsap.timeline();
      tl.to(".MOBILENAV", { right: "0%", duration: 0.35, ease: "power3.out" });
      tl.to(".smNavItem", { opacity: 1, y: 0, stagger: 0.06, duration: 0.3, ease: "power3.out" }, "-=0.2");
      SetIsNavOpen(true);
    } else {
      const tl = gsap.timeline();
      tl.to(".smNavItem", { opacity: 0, y: 20, stagger: 0.04, duration: 0.15 });
      tl.to(".MOBILENAV", { right: "-100%", duration: 0.3, ease: "power3.out" }, "-=0.05");
      SetIsNavOpen(false);
    }
  };

  const closeMenu = () => {
    if (isNavOpen) clickCheck();
  };

  const navLinks = [
    { name: "Pyaar Dosti Hai", path: "/pyaar-dosti-hai" },
    { name: "From Marrakech, with Love", path: "/venu" },
    { name: "Wedding Itinerary", path: "/wedding-itinerary" },
    { name: "Travel and FAQs", path: "/travel-and-faqs" },
  ];

  return (
    <>
      {/* MAIN NAVBAR */}
      <div
        ref={navRef}
        className="w-full h-[80px] fixed top-0 left-0 z-[9999] px-5 lg:px-8 flex items-center justify-between"
      >
        {/* LOGO */}
        <Link href={`/`} className="w-fit h-[40px] z-[1000]"
          onClick={(e) => { e.preventDefault(); router.push(`/`); }}
        >
          <img src={`/logo.svg`} alt="Logo" className="h-full object-contain text-[#F1E2C6]" />
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden lg:flex items-center gap-[2vw]">
          {navLinks.map((item, index) => (
            <Link key={index} href={item.path}
              onClick={(e) => { e.preventDefault(); router.push(item.path); }}
            >
              <div
                className={`relative text-[14px] F1 text-[#F1E2C6] uppercase cursor-pointer group ${pathname === item.path ? "border-b border-[#F1E2C6]" : ""
                  }`}
              >
                <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#F1E2C6] group-hover:w-full duration-300"></div>
                {item.name}
              </div>
            </Link>
          ))}

          {/* DESKTOP RSVP BUTTON */}
          <button

            className="ml-2 px-5 py-2  text-[13px] F1 uppercase tracking-widest text-[#F1E2C6] bg-[#D25F28] rounded-sm cursor-pointer transition-all duration-300 hover:bg-[#dd500e] hover:text-[#F1E2C6] border border-[#f1e2c638]"
          >
            RSVP
          </button>
        </div>

        {/* MOBILE MENU BTN */}
        <div onClick={clickCheck} className="lg:hidden z-[99999] cursor-pointer">
          {isNavOpen ? (
            <RiMenu3Line className="text-[2rem] text-[#F1E2C6]" />
          ) : (
            <RiMenu4Fill className="text-[2rem] text-[#F1E2C6]" />
          )}
        </div>
      </div>

      {/* MOBILE NAVIGATION */}
      <div className="MOBILENAV fixed top-0 right-[-100%] w-full sm:w-[80%] h-screen bg-[#1E4858] z-[999] flex flex-col px-8 pt-[120px] pb-10">
        <div className="flex flex-col gap-6">
          {navLinks.map((item, index) => (
            <Link key={index} href={item.path}
              onClick={(e) => { e.preventDefault(); closeMenu(); router.push(item.path); }}
            >
              <div
                className={`smNavItem opacity-0 translate-y-[20px] text-[1.3rem] text-[#F1E2C6] uppercase tracking-wide ${pathname === item.path ? "underline" : ""
                  }`}
              >
                {item.name}
              </div>
            </Link>
          ))}
        </div>

        {/* MOBILE RSVP BUTTON */}
        <button

          className="smNavItem opacity-0 translate-y-[20px] font-semibold mt-10 w-full py-3 text-[1rem] F1 uppercase tracking-widest text-[#D25F28] bg-[#F1E2C6] border border-[#F1E2C6] rounded-sm cursor-pointer transition-all duration-300 hover:bg-transparent hover:text-[#dd5618] active:scale-95"
        >
          RSVP
        </button>
      </div>
    </>
  );
};

export default TopMenu;