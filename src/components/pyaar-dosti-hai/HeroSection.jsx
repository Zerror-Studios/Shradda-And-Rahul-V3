// // "use client";

// // import { useEffect, useState } from "react";
// // import { RiArrowDropDownLine } from "react-icons/ri";
// // import { HiPlay, HiSpeakerWave } from "react-icons/hi2";

// // export default function HeroSection() {
// //   const [isLoaded, setIsLoaded] = useState(false);

// //   const translations = {
// //     Hindi: {
// //       text: "प्यार दोस्ती है",
// //       lang: "hi-IN",
// //       symbol: "अ",
// //     },
// //     English: {
// //       text: "Love is Friendship",
// //       lang: "en-US",
// //       symbol: "A",
// //     },
// //     Tamil: {
// //       text: "காதல் என்பது நட்பு",
// //       lang: "ta-IN",
// //       symbol: "அ",
// //     },
// //     Spanish: {
// //       text: "El amor es amistad",
// //       lang: "es-ES",
// //       symbol: "A",
// //     },
// //     French: {
// //       text: "L'amour est l'amitié",
// //       lang: "fr-FR",
// //       symbol: "A",
// //     },
// //     Japanese: {
// //       text: "愛は友情です",
// //       lang: "ja-JP",
// //       symbol: "あ",
// //     },
// //   };

// //   const [selectedLanguage, setSelectedLanguage] = useState("Hindi");
// //   const [isLanguageOpen, setIsLanguageOpen] = useState(false);
// //   const [isPlaying, setIsPlaying] = useState(false);

// //   useEffect(() => {
// //     setIsLoaded(true);
// //   }, []);

// //   const speakText = (text, languageCode) => {
// //     if (typeof window === "undefined") return;

// //     window.speechSynthesis.cancel();

// //     const utterance = new SpeechSynthesisUtterance(text);
// //     utterance.lang = languageCode;
// //     utterance.rate = 0.9;

// //     const voices = window.speechSynthesis.getVoices();
// //     const matchingVoice = voices.find((voice) =>
// //       voice.lang.toLowerCase().includes(languageCode.split("-")[0].toLowerCase())
// //     );
// //     if (matchingVoice) utterance.voice = matchingVoice;

// //     utterance.onstart = () => setIsPlaying(true);
// //     utterance.onend = () => setIsPlaying(false);
// //     utterance.onerror = () => setIsPlaying(false);

// //     window.speechSynthesis.speak(utterance);
// //   };

// //   useEffect(() => {
// //     return () => {
// //       window.speechSynthesis.cancel();
// //     };
// //   }, []);

// //   return (
// //     <section className="min-h-screen w-full relative flex items-center justify-center px-[4vw] py-[8vh] bg-[#D25F27]">
// //       <style>{`
// //         @keyframes fadeInUp {
// //           from { opacity: 0; transform: translateY(30px); }
// //           to { opacity: 1; transform: translateY(0); }
// //         }
// //         @keyframes scaleIn {
// //           from { opacity: 0; transform: scale(0.95); }
// //           to { opacity: 1; transform: scale(1); }
// //         }
// //         @keyframes slideInDown {
// //           from { opacity: 0; transform: translateY(-20px); }
// //           to { opacity: 1; transform: translateY(0); }
// //         }
// //         .animate-fade-in-up { animation: fadeInUp 0.8s ease-out forwards; }
// //         .animate-scale-in { animation: scaleIn 0.8s ease-out forwards; }
// //         .animate-slide-in-down { animation: slideInDown 0.8s ease-out forwards; }
// //         .delay-100 { animation-delay: 100ms; }
// //         .delay-200 { animation-delay: 200ms; }
// //         .delay-300 { animation-delay: 300ms; }
// //         .delay-400 { animation-delay: 400ms; }

// //         @keyframes sound-wave {
// //           0%, 100% { transform: scaleY(1); }
// //           50% { transform: scaleY(2); }
// //         }
// //         .animate-sound-wave {
// //           animation: sound-wave 0.6s ease-in-out infinite;
// //         }
// //       `}</style>

// //       {/* Background Image */}
// //       <div className="absolute inset-0 w-full h-full">
// //         <img
// //           src={`/new_img/AA2.jpg`}
// //           alt="img"
// //           className="w-full h-full object-cover object-top"
// //         />
// //       </div>

// //       <div className="w-full max-w-[90vw] z-10">

// //         {/* Heading */}
// //         <div className={`text-center ${isLoaded ? "animate-fade-in-up" : "opacity-0"}`}>
// //           <h1 className="text-[3rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem] font-semibold leading-none Font_CV uppercase text-[#F1E2C6]">
// //             Pyaar Dosti Hai
// //           </h1>

// //           <div
// //             className={`flex justify-center items-center mt-[0.8rem] sm:mt-[1rem] ${isLoaded ? "animate-fade-in-up delay-100" : "opacity-0"
// //               }`}
// //           >
// //             <p className="capitalize tracking-tight text-[#F1E2C6] text-[1rem] sm:text-[0.9rem] leading-[1.3rem] px-2 sm:px-0">
// //               Every great love story is built on friendship, and every
// //               friendship deserves a forever. <br className="hidden sm:block" />
// //               Together, we celebrate a bond that began with friendship, grew
// //               with love.
// //             </p>
// //           </div>
// //         </div>

// //         {/* Translation Section */}
// //         <div
// //           className={`mt-[2rem] sm:mt-[3rem] flex justify-center ${isLoaded ? "animate-fade-in-up delay-200" : "opacity-0"
// //             }`}
// //         >
// //           <div className="w-full max-w-[42rem] flex flex-col gap-4 sm:gap-5">

// //             {/* Language Dropdown */}
// //             <div className="relative">
// //               <button
// //                 onClick={() => setIsLanguageOpen(!isLanguageOpen)}
// //                 className="w-full bg-[#F1E2C6] border border-[#e7ddd4] rounded-sm px-[1rem] sm:px-[1.2rem] py-[0.7rem] sm:py-[0.8rem] flex justify-between items-center transition-all duration-300 hover:shadow-lg"
// //               >
// //                 <div className="flex items-center gap-[0.6rem] sm:gap-[0.8rem]">
// //                   <span className="text-[1.2rem] sm:text-[1.5rem] Font_CV">
// //                     {translations[selectedLanguage].symbol}
// //                   </span>
// //                   <span className="text-[0.85rem] sm:text-[0.95rem] Font_CV uppercase text-[#4b403d]">
// //                     {selectedLanguage}
// //                   </span>
// //                 </div>
// //                 <RiArrowDropDownLine
// //                   className={`text-[1.6rem] sm:text-[1.8rem] transition-transform duration-300 ease-out ${isLanguageOpen ? "rotate-180" : ""
// //                     }`}
// //                 />
// //               </button>

// //               {/* Animated dropdown wrapper */}
// //               <div
// //                 className={`
// //                   absolute top-[110%] left-0 w-full z-50
// //                   grid transition-all duration-300 ease-out
// //                   ${isLanguageOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}
// //                 `}
// //                 style={{ pointerEvents: isLanguageOpen ? "auto" : "none" }}
// //               >
// //                 <div
// //                   className={`
// //                     overflow-hidden
// //                     bg-[#F1E2C6] border border-[#e7ddd4] rounded-sm shadow-xl
// //                     transition-transform duration-300 ease-out
// //                     ${isLanguageOpen ? "translate-y-0" : "-translate-y-2"}
// //                   `}
// //                 >
// //                   {Object.entries(translations).map(([lang, data]) => (
// //                     <button
// //                       key={lang}
// //                       onClick={() => {
// //                         setSelectedLanguage(lang);
// //                         setIsLanguageOpen(false);
// //                       }}
// //                       className={`
// //                         w-full flex items-center gap-[0.6rem] sm:gap-[0.8rem]
// //                         px-[1rem] sm:px-[1.2rem] py-[0.7rem] sm:py-[0.8rem]
// //                         transition-all duration-300
// //                         hover:bg-[#d4c3a2]
// //                         ${selectedLanguage === lang
// //                           ? "bg-[#F1E2C6] text-[#651624]"
// //                           : "text-[#4b403d]"
// //                         }
// //                       `}
// //                     >
// //                       <span className="text-[1rem] sm:text-[1.2rem] Font_CV">{data.symbol}</span>
// //                       <span className="Font_CV text-[0.9rem] sm:text-[1rem]">{lang}</span>
// //                     </button>
// //                   ))}
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Translation Card */}
// //             <div className="bg-[#F1E2C6] border border-[#e7ddd4] rounded-sm p-[1.2rem] sm:p-[1.6rem] min-h-[12rem] sm:min-h-[16rem] flex flex-col justify-between">
// //               <div>
// //                 <h2 className="text-[2rem] sm:text-[2.8rem] leading-[1.1] Font_CV text-[#651624]">
// //                   {translations[selectedLanguage].text}
// //                 </h2>
// //                 <p className="mt-[0.6rem] sm:mt-[0.8rem] text-[0.85rem] sm:text-[1rem] Font_CV tracking-[0.12rem] sm:tracking-[0.15rem] uppercase text-[#6C1D35]">
// //                   Pyaar Dosti Hai
// //                 </p>
// //               </div>

// //               {/* Audio Controls */}
// //               <div className="flex max-sm:w-[90%] items-center gap-[0.8rem] sm:gap-[1rem] mt-[1rem] sm:mt-0">
// //                 <button
// //                   onClick={() =>
// //                     speakText(
// //                       translations[selectedLanguage].text,
// //                       translations[selectedLanguage].lang
// //                     )
// //                   }
// //                   className={`
// //                     group relative overflow-hidden flex-shrink-0
// //                     w-[3rem] sm:w-[3.5rem]
// //                     h-[3rem] sm:h-[3.5rem]
// //                     rounded-full
// //                     bg-[#651624]
// //                     flex items-center justify-center
// //                     transition-all duration-500
// //                     hover:scale-[1.08]
// //                     active:scale-[0.95]
// //                   `}
// //                 >
// //                   <span
// //                     className={`
// //                       absolute inset-0 rounded-full border border-[#8f4a55]
// //                       scale-0 group-hover:scale-100 transition-all duration-500
// //                     `}
// //                   />
// //                   {!isPlaying ? (
// //                     <HiPlay className="text-[#F1E2C6] text-[1rem] sm:text-[1.1rem] transition-all duration-300 group-hover:scale-110" />
// //                   ) : (
// //                     <HiSpeakerWave className="text-[#F1E2C6] text-[1.1rem] sm:text-[1.3rem] animate-pulse" />
// //                   )}
// //                 </button>

// //                 {/* Sound wave bars — fewer bars on mobile */}
// //                 <div className="flex items-center gap-[0.2rem] overflow-hidden flex-1">
// //                   {[...Array(60)].map((_, i) => {
// //                     const center = 30;
// //                     const distance = Math.abs(i - center);
// //                     return (
// //                       <span
// //                         key={i}
// //                         className={`
// //                           w-[0.1rem] rounded-full transition-all duration-300
// //                           ${isPlaying
// //                             ? "bg-[#651624] animate-sound-wave"
// //                             : "bg-[#65162457]"
// //                           }
// //                         `}
// //                         style={{
// //                           height:
// //                             i % 6 === 0
// //                               ? "1rem"
// //                               : i % 4 === 0
// //                                 ? "0.8rem"
// //                                 : i % 2 === 0
// //                                   ? "0.6rem"
// //                                   : "0.4rem",
// //                           animationDelay: `${distance * 0.02}s`,
// //                           flexShrink: 0,
// //                         }}
// //                       />
// //                     );
// //                   })}
// //                 </div>
// //               </div>
// //             </div>

// //           </div>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // }





// "use client";

// import { useEffect, useState } from "react";
// import { RiArrowDropDownLine } from "react-icons/ri";
// import { HiPlay, HiSpeakerWave } from "react-icons/hi2";

// export default function HeroSection() {
//   const [isLoaded, setIsLoaded] = useState(false);

//   const translations = {

//      Sindhi: {
//       text: "Muhabbat dosti aahe",
//       symbol: "هي",
//       audio:`/audio/sindhi.mp3`
//     },
//      Italian: {
//       text: "L'amore è amicizia.",
//       symbol: "i",
//       audio:`/audio/italian.mp3`
//     },
//      French: {
//       text: "L'amour est une amitié.",
//       symbol: "F",
//       audio:`/audio/french.mp3`
//     },
//      Amharic: {
//       text: "ፍቅር ጓደኝነት ነው",
//       symbol: "ፍ",
//       audio:`public/audio/amharic.mp3`
//     },

//     // Hindi: {
//     //   text: "प्यार दोस्ती है",
//     //   lang: "hi-IN",
//     //   symbol: "अ",
//     // },
//     // English: {
//     //   text: "Love is Friendship",
//     //   lang: "en-US",
//     //   symbol: "A",
//     // },
//     // Tamil: {
//     //   text: "காதல் என்பது நட்பு",
//     //   lang: "ta-IN",
//     //   symbol: "அ",
//     // },
//     // Spanish: {
//     //   text: "El amor es amistad",
//     //   lang: "es-ES",
//     //   symbol: "A",
//     // },
//     // French: {
//     //   text: "L'amour est l'amitié",
//     //   lang: "fr-FR",
//     //   symbol: "A",
//     // },
//     // Japanese: {
//     //   text: "愛は友情です",
//     //   lang: "ja-JP",
//     //   symbol: "あ",
//     // },
//   };

//   const [selectedLanguage, setSelectedLanguage] = useState("Sindhi");
//   const [isLanguageOpen, setIsLanguageOpen] = useState(false);
//   const [isPlaying, setIsPlaying] = useState(false);

//   useEffect(() => {
//     setIsLoaded(true);
//   }, []);

//   const speakText = (text, languageCode) => {
//     if (typeof window === "undefined") return;

//     window.speechSynthesis.cancel();

//     const utterance = new SpeechSynthesisUtterance(text);
//     utterance.lang = languageCode;
//     utterance.rate = 0.9;

//     const voices = window.speechSynthesis.getVoices();
//     const matchingVoice = voices.find((voice) =>
//       voice.lang.toLowerCase().includes(languageCode.split("-")[0].toLowerCase())
//     );
//     if (matchingVoice) utterance.voice = matchingVoice;

//     utterance.onstart = () => setIsPlaying(true);
//     utterance.onend = () => setIsPlaying(false);
//     utterance.onerror = () => setIsPlaying(false);

//     window.speechSynthesis.speak(utterance);
//   };

//   useEffect(() => {
//     return () => {
//       window.speechSynthesis.cancel();
//     };
//   }, []);

//   return (
//     <section className="min-h-screen w-full relative flex items-center justify-center px-[4vw] py-[8vh] bg-[#D25F27]">
//       <style>{`
//         @keyframes fadeInUp {
//           from { opacity: 0; transform: translateY(30px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes scaleIn {
//           from { opacity: 0; transform: scale(0.95); }
//           to { opacity: 1; transform: scale(1); }
//         }
//         @keyframes slideInDown {
//           from { opacity: 0; transform: translateY(-20px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         .animate-fade-in-up { animation: fadeInUp 0.8s ease-out forwards; }
//         .animate-scale-in { animation: scaleIn 0.8s ease-out forwards; }
//         .animate-slide-in-down { animation: slideInDown 0.8s ease-out forwards; }
//         .delay-100 { animation-delay: 100ms; }
//         .delay-200 { animation-delay: 200ms; }
//         .delay-300 { animation-delay: 300ms; }
//         .delay-400 { animation-delay: 400ms; }

//         @keyframes sound-wave {
//           0%, 100% { transform: scaleY(1); }
//           50% { transform: scaleY(2); }
//         }
//         .animate-sound-wave {
//           animation: sound-wave 0.6s ease-in-out infinite;
//         }
//       `}</style>

//       {/* Background Image */}
//       <div className="absolute inset-0 w-full h-full">
//         <img
//           src={`/new_img/AA2.jpg`}
//           alt="img"
//           className="w-full h-full object-cover object-top"
//         />
//       </div>

//       <div className="w-full max-w-[90vw] z-10">

//         {/* Heading */}
//         <div className={`text-center ${isLoaded ? "animate-fade-in-up" : "opacity-0"}`}>
//           <h1 className="text-[3rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem] font-semibold leading-none Font_CV uppercase text-[#F1E2C6]">
//             Pyaar Dosti Hai
//           </h1>

//           <div
//             className={`flex justify-center items-center mt-[0.8rem] sm:mt-[1rem] ${isLoaded ? "animate-fade-in-up delay-100" : "opacity-0"
//               }`}
//           >
//             <p className="capitalize tracking-tight text-[#F1E2C6] sm:max-w-[50vw] text-[1rem] sm:text-[0.9rem] leading-[1.3rem] px-2 sm:px-0">
//               Pyaar dosti hai," Rahul told Shradda, the line every 2000s Bollywood has tattooed somewhere on their heart. Under the pillars of the Millennium Gate Museum, he asked her to be his forever. No spoilers here: you already know how she answered
//               We can't wait to celebrate our journey through time, space, and destiny with you,  from Dosti in Boston to Pyaar everywhere.
//             </p>
//           </div>
//         </div>

//         {/* Translation Section */}
//         <div
//           className={`mt-[2rem] sm:mt-[3rem] flex justify-center ${isLoaded ? "animate-fade-in-up delay-200" : "opacity-0"
//             }`}
//         >
//           <div className="w-full max-w-[42rem] flex flex-col gap-4 sm:gap-5">

//             {/* Language Dropdown */}
//             <div className="relative">
//               <button
//                 onClick={() => setIsLanguageOpen(!isLanguageOpen)}
//                 className="w-full bg-[#F1E2C6] border border-[#e7ddd4] rounded-sm px-[1rem] sm:px-[1.2rem] py-[0.7rem] sm:py-[0.8rem] flex justify-between items-center transition-all duration-300 hover:shadow-lg"
//               >
//                 <div className="flex items-center gap-[0.6rem] sm:gap-[0.8rem]">
//                   <span className="text-[1.2rem] sm:text-[1.5rem] Font_CV">
//                     {translations[selectedLanguage].symbol}
//                   </span>
//                   <span className="text-[0.85rem] sm:text-[0.95rem] Font_CV uppercase text-[#4b403d]">
//                     {selectedLanguage}
//                   </span>
//                 </div>
//                 <RiArrowDropDownLine
//                   className={`text-[1.6rem] sm:text-[1.8rem] transition-transform duration-300 ease-out ${isLanguageOpen ? "rotate-180" : ""
//                     }`}
//                 />
//               </button>

//               {/* Animated dropdown wrapper */}
//               <div
//                 className={`
//                   absolute top-[110%] left-0 w-full z-50
//                   grid transition-all duration-300 ease-out
//                   ${isLanguageOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}
//                 `}
//                 style={{ pointerEvents: isLanguageOpen ? "auto" : "none" }}
//               >
//                 <div
//                   className={`
//                     overflow-hidden
//                     bg-[#F1E2C6] border border-[#e7ddd4] rounded-sm shadow-xl
//                     transition-transform duration-300 ease-out
//                     ${isLanguageOpen ? "translate-y-0" : "-translate-y-2"}
//                   `}
//                 >
//                   {Object.entries(translations).map(([lang, data]) => (
//                     <button
//                       key={lang}
//                       onClick={() => {
//                         setSelectedLanguage(lang);
//                         setIsLanguageOpen(false);
//                       }}
//                       className={`
//                         w-full flex items-center gap-[0.6rem] sm:gap-[0.8rem]
//                         px-[1rem] sm:px-[1.2rem] py-[0.7rem] sm:py-[0.8rem]
//                         transition-all duration-300
//                         hover:bg-[#D25F27]
//                         ${selectedLanguage === lang
//                           ? "bg-[#F1E2C6] text-[#651624]"
//                           : "text-[#4b403d]"
//                         }
//                       `}
//                     >
//                       <span className="text-[1rem] sm:text-[1.2rem] Font_CV">{data.symbol}</span>
//                       <span className="Font_CV text-[0.9rem] sm:text-[1rem]">{lang}</span>
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* Translation Card */}
//             <div className="  border-2 border-[#e7ddd4] rounded-sm p-[1.2rem] sm:p-[1.6rem] min-h-[12rem] sm:min-h-[16rem] flex flex-col justify-between">
//               <div>
//                 <h2 className="text-[2rem] sm:text-[2.8rem] leading-[1.1] Font_CV text-[#e7ddd4]">
//                   {translations[selectedLanguage].text}
//                 </h2>
//                 <p className="mt-[0.6rem] sm:mt-[0.8rem] text-[0.85rem] sm:text-[1rem] Font_CV tracking-[0.12rem] sm:tracking-[0.15rem] uppercase text-[#e7ddd4]">
//                   Pyaar Dosti Hai
//                 </p>
//               </div>

//               {/* Audio Controls */}
//               <div className="flex max-sm:w-[90%] items-center gap-[0.8rem] sm:gap-[1rem] mt-[1rem] sm:mt-0">
//                 <button
//                   onClick={() =>
//                     speakText(
//                       translations[selectedLanguage].text,
//                       translations[selectedLanguage].lang
//                     )
//                   }
//                   className={`
//                     group relative overflow-hidden flex-shrink-0
//                     w-[3rem] sm:w-[3.5rem]
//                     h-[3rem] sm:h-[3.5rem]
//                     rounded-full
//                     bg-[#e7ddd4]
//                     flex items-center justify-center
//                     transition-all duration-500
//                     hover:scale-[1.08]
//                     active:scale-[0.95]
//                   `}
//                 >
//                   <span
//                     className={`
//                       absolute inset-0 rounded-full border border-[#D25F27]
//                       scale-0 group-hover:scale-100 transition-all duration-500
//                     `}
//                   />
//                   {!isPlaying ? (
//                     <HiPlay className="text-[#D25F27] text-[1rem] sm:text-[1.1rem] transition-all duration-300 group-hover:scale-110" />
//                   ) : (
//                     <HiSpeakerWave className="text-[#D25F27] text-[1.1rem] sm:text-[1.3rem] animate-pulse" />
//                   )}
//                 </button>

//                 {/* Sound wave bars — fewer bars on mobile */}
//                 <div className="flex items-center gap-[0.2rem] overflow-hidden flex-1">
//                   {[...Array(60)].map((_, i) => {
//                     const center = 30;
//                     const distance = Math.abs(i - center);
//                     return (
//                       <span
//                         key={i}
//                         className={`
//                           w-[0.1rem] rounded-full transition-all duration-300
//                           ${isPlaying
//                             ? "bg-[#D25F27] animate-sound-wave"
//                             : "bg-[#e7ddd4]"
//                           }
//                         `}
//                         style={{
//                           height:
//                             i % 6 === 0
//                               ? "1rem"
//                               : i % 4 === 0
//                                 ? "0.8rem"
//                                 : i % 2 === 0
//                                   ? "0.6rem"
//                                   : "0.4rem",
//                           animationDelay: `${distance * 0.02}s`,
//                           flexShrink: 0,
//                         }}
//                       />
//                     );
//                   })}
//                 </div>
//               </div>
//             </div>

//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import { useEffect, useRef, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { HiPlay, HiPause, HiSpeakerWave } from "react-icons/hi2";

export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);

  const translations = {
    Sindhi: {
      text: "Muhabbat dosti aahe",
      symbol: "هي",
      audio: `/audio/sindhi.mp3`,
    },
    Italian: {
      text: "L'amore è amicizia.",
      symbol: "i",
      audio: `/audio/italian.mp3`,
    },
    French: {
      text: "L'amour est une amitié.",
      symbol: "F",
      audio: `/audio/french.mp3`,
    },
    Amharic: {
      text: "ፍቅር ጓደኝነት ነው",
      symbol: "ፍ",
      audio: `/audio/amharic.mp3`,
    },
  };

  const [selectedLanguage, setSelectedLanguage] = useState("Sindhi");
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Create the audio element once
  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;

    const handleEnded = () => setIsPlaying(false);
    const handlePause = () => setIsPlaying(false);
    const handlePlay = () => setIsPlaying(true);

    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("play", handlePlay);

    return () => {
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("play", handlePlay);
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  // When language changes, stop any playing audio and load the new source
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
    setIsPlaying(false);
    audio.src = translations[selectedLanguage].audio;
    audio.load();
  }, [selectedLanguage]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      // Ensure the correct src is loaded (in case it hasn't been set yet)
      if (!audio.src.includes(translations[selectedLanguage].audio)) {
        audio.src = translations[selectedLanguage].audio;
      }
      audio.play().catch((err) => {
        console.error("Audio playback failed:", err);
        setIsPlaying(false);
      });
    }
  };

  return (
    <section className="min-h-screen w-full relative flex items-center justify-center px-[4vw] py-[8vh] bg-[#D25F27]">
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes slideInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fadeInUp 0.8s ease-out forwards; }
        .animate-scale-in { animation: scaleIn 0.8s ease-out forwards; }
        .animate-slide-in-down { animation: slideInDown 0.8s ease-out forwards; }
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
        .delay-400 { animation-delay: 400ms; }

        @keyframes sound-wave {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(2); }
        }
        .animate-sound-wave {
          animation: sound-wave 0.6s ease-in-out infinite;
        }
      `}</style>

      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={`/new_img/AA2.jpg`}
          alt="img"
          className="w-full h-full object-cover object-top"
        />
      </div>

      <div className="w-full max-w-[90vw] z-10">

        {/* Heading */}
        <div className={`text-center ${isLoaded ? "animate-fade-in-up" : "opacity-0"}`}>
          <h1 className="text-[3rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem] font-semibold leading-none Font_CV uppercase text-[#F1E2C6]">
            Pyaar Dosti Hai
          </h1>

          <div
            className={`flex justify-center items-center mt-[0.8rem] sm:mt-[1rem] ${isLoaded ? "animate-fade-in-up delay-100" : "opacity-0"
              }`}
          >
            <p className="capitalize tracking-tight text-[#F1E2C6] sm:max-w-[50vw] text-[1rem] sm:text-[0.9rem] leading-[1.3rem] px-2 sm:px-0">
              Pyaar dosti hai," Rahul told Shradda, the line every 2000s Bollywood has tattooed somewhere on their heart. Under the pillars of the Millennium Gate Museum, he asked her to be his forever. No spoilers here: you already know how she answered
              We can't wait to celebrate our journey through time, space, and destiny with you,  from Dosti in Boston to Pyaar everywhere.
            </p>
          </div>
        </div>

        {/* Translation Section */}
        <div
          className={`mt-[2rem] sm:mt-[3rem] flex justify-center ${isLoaded ? "animate-fade-in-up delay-200" : "opacity-0"
            }`}
        >
          <div className="w-full max-w-[42rem] flex flex-col gap-4 sm:gap-5">

            {/* Language Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="w-full bg-[#F1E2C6] border border-[#e7ddd4] rounded-sm px-[1rem] sm:px-[1.2rem] py-[0.7rem] sm:py-[0.8rem] flex justify-between items-center transition-all duration-300 hover:shadow-lg"
              >
                <div className="flex items-center gap-[0.6rem] sm:gap-[0.8rem]">
                  <span className="text-[1.2rem] sm:text-[1.5rem] Font_CV">
                    {translations[selectedLanguage].symbol}
                  </span>
                  <span className="text-[0.85rem] sm:text-[0.95rem] Font_CV uppercase text-[#4b403d]">
                    {selectedLanguage}
                  </span>
                </div>
                <RiArrowDropDownLine
                  className={`text-[1.6rem] sm:text-[1.8rem] transition-transform duration-300 ease-out ${isLanguageOpen ? "rotate-180" : ""
                    }`}
                />
              </button>

              {/* Animated dropdown wrapper */}
              <div
                className={`
                  absolute top-[110%] left-0 w-full z-50
                  grid transition-all duration-300 ease-out
                  ${isLanguageOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}
                `}
                style={{ pointerEvents: isLanguageOpen ? "auto" : "none" }}
              >
                <div
                  className={`
                    overflow-hidden
                    bg-[#F1E2C6] border border-[#e7ddd4] rounded-sm shadow-xl
                    transition-transform duration-300 ease-out
                    ${isLanguageOpen ? "translate-y-0" : "-translate-y-2"}
                  `}
                >
                  {Object.entries(translations).map(([lang, data]) => (
                    <button
                      key={lang}
                      onClick={() => {
                        setSelectedLanguage(lang);
                        setIsLanguageOpen(false);
                      }}
                      className={`
                        w-full flex items-center gap-[0.6rem] sm:gap-[0.8rem]
                        px-[1rem] sm:px-[1.2rem] py-[0.7rem] sm:py-[0.8rem]
                        transition-all duration-300
                        hover:bg-[#D25F27]
                        ${selectedLanguage === lang
                          ? "bg-[#F1E2C6] text-[#651624]"
                          : "text-[#4b403d]"
                        }
                      `}
                    >
                      <span className="text-[1rem] sm:text-[1.2rem] Font_CV">{data.symbol}</span>
                      <span className="Font_CV text-[0.9rem] sm:text-[1rem]">{lang}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Translation Card */}
            <div className="  border-2 border-[#e7ddd4] rounded-sm p-[1.2rem] sm:p-[1.6rem] min-h-[12rem] sm:min-h-[16rem] flex flex-col justify-between">
              <div>
                <h2 className="text-[2rem] sm:text-[2.8rem] leading-[1.1] Font_CV text-[#e7ddd4]">
                  {translations[selectedLanguage].text}
                </h2>
                <p className="mt-[0.6rem] sm:mt-[0.8rem] text-[0.85rem] sm:text-[1rem] Font_CV tracking-[0.12rem] sm:tracking-[0.15rem] uppercase text-[#e7ddd4]">
                  Pyaar Dosti Hai
                </p>
              </div>

              {/* Audio Controls */}
              <div className="flex max-sm:w-[90%] items-center gap-[0.8rem] sm:gap-[1rem] mt-[1rem] sm:mt-0">
                <button
                  onClick={togglePlay}
                  className={`
                    group relative overflow-hidden flex-shrink-0
                    w-[3rem] sm:w-[3.5rem]
                    h-[3rem] sm:h-[3.5rem]
                    rounded-full
                    bg-[#e7ddd4]
                    flex items-center justify-center
                    transition-all duration-500
                    hover:scale-[1.08]
                    active:scale-[0.95]
                  `}
                >
                  <span
                    className={`
                      absolute inset-0 rounded-full border border-[#D25F27]
                      scale-0 group-hover:scale-100 transition-all duration-500
                    `}
                  />
                  {!isPlaying ? (
                    <HiPlay className="text-[#D25F27] text-[1rem] sm:text-[1.1rem] transition-all duration-300 group-hover:scale-110" />
                  ) : (
                    <HiPause className="text-[#D25F27] text-[1.1rem] sm:text-[1.3rem]" />
                  )}
                </button>

                {/* Sound wave bars — fewer bars on mobile */}
                <div className="flex items-center gap-[0.2rem] overflow-hidden flex-1">
                  {[...Array(60)].map((_, i) => {
                    const center = 30;
                    const distance = Math.abs(i - center);
                    return (
                      <span
                        key={i}
                        className={`
                          w-[0.1rem] rounded-full transition-all duration-300
                          ${isPlaying
                            ? "bg-[#D25F27] animate-sound-wave"
                            : "bg-[#e7ddd4]"
                          }
                        `}
                        style={{
                          height:
                            i % 6 === 0
                              ? "1rem"
                              : i % 4 === 0
                                ? "0.8rem"
                                : i % 2 === 0
                                  ? "0.6rem"
                                  : "0.4rem",
                          animationDelay: `${distance * 0.02}s`,
                          flexShrink: 0,
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}