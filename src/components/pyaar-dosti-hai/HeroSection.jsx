// // "use client";

// // import { useEffect, useState } from "react";
// // import { RiArrowDropDownLine } from "react-icons/ri";
// // import { HiPlay, HiSpeakerWave } from "react-icons/hi2";

// // export default function HeroSection() {
// //   const translations = {
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

// //   const [selectedLanguage, setSelectedLanguage] = useState("English");
// //   const [isLanguageOpen, setIsLanguageOpen] = useState(false);
// //   const [isHindiPlaying, setIsHindiPlaying] = useState(false);
// //   const [isEnglishPlaying, setIsEnglishPlaying] = useState(false);

// //   const speakText = (text, languageCode, type) => {
// //     if (typeof window === "undefined") return;

// //     window.speechSynthesis.cancel();

// //     setIsHindiPlaying(false);
// //     setIsEnglishPlaying(false);

// //     const utterance = new SpeechSynthesisUtterance(text);

// //     utterance.lang = languageCode;
// //     utterance.rate = 0.9;

// //     const voices = window.speechSynthesis.getVoices();

// //     const matchingVoice = voices.find((voice) =>
// //       voice.lang
// //         .toLowerCase()
// //         .includes(languageCode.split("-")[0].toLowerCase())
// //     );

// //     if (matchingVoice) {
// //       utterance.voice = matchingVoice;
// //     }

// //     utterance.onstart = () => {
// //       if (type === "hindi") {
// //         setIsHindiPlaying(true);
// //       } else {
// //         setIsEnglishPlaying(true);
// //       }
// //     };

// //     utterance.onend = () => {
// //       setIsHindiPlaying(false);
// //       setIsEnglishPlaying(false);
// //     };

// //     utterance.onerror = () => {
// //       setIsHindiPlaying(false);
// //       setIsEnglishPlaying(false);
// //     };

// //     window.speechSynthesis.speak(utterance);
// //   };

// //   useEffect(() => {
// //     return () => {
// //       window.speechSynthesis.cancel();
// //     };
// //   }, []);

// //   return (
// //     <section className="min-h-screen w-full relative flex items-center justify-center px-[4vw] pt-[10vh]">
// //       <div className="absolute top-0 scale-[1.4] left-0 w-full h-full overflow-hidden">
// //         <img
// //           src="/images/home/SkyBg.png"
// //           className="w-full h-full object-cover object-center z-[1]"
// //         />
// //       </div>

// //       <div className="w-full max-w-[90vw] z-10">
// //         <div className="text-center">
// //           <h1 className="text-[4.5rem] font-semibold leading-none Font_CV uppercase text-[#F1E2C6]">
// //             Pyaar Dosti Hai
// //           </h1>

// //           <div className="flex justify-center items-center gap-[0.8rem] mt-[1.5rem]">
// //             <p className="uppercase Font_CV tracking-[0.25rem] text-[#F1E2C6] text-[1.1rem]">
// //               Love Is Friendship
// //             </p>
// //           </div>
// //         </div>

// //         {/* Smaller Translation Section */}
// //         <div className="mt-[3rem] flex flex-col lg:flex-row items-center gap-[1.2vw] mx-auto  justify-center">

// //           {/* Left Card */}
// //           <div className="flex-1 w-full sm:max-w-[30vw]">
// //             <p className="uppercase text-[0.8rem] Font_CV tracking-[0.25rem] text-[#F1E2C6] mb-[0.6rem]">
// //               From
// //             </p>

// //             <div className="bg-white border border-[#e7ddd4] rounded-[1.1rem] px-[1.2vw] py-[0.7rem] flex justify-between items-center">
// //               <div className="flex items-center gap-[0.8rem]">
// //                 <span className="text-[1.4rem]">अ</span>

// //                 <span className="text-[0.95rem] Font_CV uppercase text-[#4b403d]">
// //                   Hindi
// //                 </span>
// //               </div>
// //             </div>

// //             <div className="mt-[1rem] bg-white border border-[#e7ddd4] rounded-[1.3rem] p-[1.4rem] min-h-[14rem] flex flex-col justify-between">

// //               <div>
// //                 <h2 className="text-[2.2rem] Font_CV text-[#651624]">
// //                   प्यार दोस्ती है
// //                 </h2>

// //                 <p className="mt-[0.8rem] Font_CV text-[1.15rem] text-[#7c6d68]">
// //                   Pyaar Dosti Hai
// //                 </p>
// //               </div>
// //               <div className="flex justify-between items-end">
// //                 <div className="flex items-center gap-[0.8rem]">
// //                   <button
// //                     onClick={() =>
// //                       speakText("प्यार दोस्ती है", "hi-IN", "hindi")
// //                     }
// //                     className={`
// //                       group relative overflow-hidden
// //                       w-[3.5rem] h-[3.5rem]
// //                       rounded-full bg-[#651624]
// //                       flex items-center justify-center
// //                       transition-all duration-500
// //                       hover:scale-[1.08]
// //                       active:scale-[0.95]
// //                     `}
// //                   >
// //                     <span
// //                       className={`
// //                         absolute inset-0 rounded-full
// //                         border border-[#8f4a55]
// //                         scale-0 group-hover:scale-100
// //                         transition-all duration-500
// //                       `}
// //                     />

// //                     {!isHindiPlaying ? (
// //                       <HiPlay className="text-[1.1rem] text-[#F1E2C6] transition-all duration-300 group-hover:scale-110" />
// //                     ) : (
// //                       <HiSpeakerWave className="text-[1.2rem] text-[#F1E2C6] animate-pulse" />
// //                     )}
// //                   </button>

// //                   <div className="flex items-center gap-[0.2rem]">
// //                     {[...Array(12)].map((_, i) => (
// //                       <span
// //                         key={i}
// //                         className={`
// //                           w-[0.1rem]
// //                           rounded-full
// //                           transition-all duration-300
// //                           ${isHindiPlaying
// //                             ? "bg-[#651624] animate-sound-wave"
// //                             : "bg-[#d7c9c2]"
// //                           }
// //                         `}
// //                         style={{
// //                           height: i % 2 === 0 ? "0.8rem" : "0.4rem",
// //                           animationDelay: `${i * 0.08}s`,
// //                         }}
// //                       />
// //                     ))}
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Center Swap */}
// //           <div className="w-[3rem] h-[3rem] rounded-full flex items-center justify-center text-[#F1E2C6] text-[1.2rem]">
// //             ⇄
// //           </div>

// //           {/* Right Card */}
// //           <div className="flex-1 w-full sm:max-w-[30vw]">
// //             <p className="uppercase text-[0.8rem] Font_CV tracking-[0.25rem] text-[#F1E2C6] mb-[0.6rem]">
// //               To
// //             </p>

// //             {/* Language Dropdown */}
// //             <div className="relative">
// //               <button
// //                 onClick={() => setIsLanguageOpen(!isLanguageOpen)}
// //                 className="w-full bg-white border border-[#e7ddd4] rounded-[1.1rem] px-[1.2vw] py-[0.7rem] flex justify-between items-center cursor-pointer"
// //               >
// //                 <div className="flex items-center gap-[0.8rem]">
// //                   <span className="text-[1.4rem] Font_CV">
// //                     {selectedLanguage === "Tamil"
// //                       ? "அ"
// //                       : selectedLanguage === "Japanese"
// //                         ? "あ"
// //                         : "A"}
// //                   </span>

// //                   <span className="text-[0.95rem] Font_CV uppercase text-[#4b403d]">
// //                     {selectedLanguage}
// //                   </span>
// //                 </div>

// //                 <RiArrowDropDownLine
// //                   className={`text-[1.8rem] transition-all duration-300 ${isLanguageOpen ? "rotate-180" : ""
// //                     }`}
// //                 />
// //               </button>

// //               {isLanguageOpen && (
// //                 <div className="absolute top-[110%] left-0 w-full bg-white border border-[#e7ddd4] rounded-[1.1rem] overflow-hidden z-50 shadow-xl">
// //                   {Object.entries(translations).map(([lang]) => (
// //                     <button
// //                       key={lang}
// //                       onClick={() => {
// //                         setSelectedLanguage(lang);
// //                         setIsLanguageOpen(false);
// //                       }}
// //                       className={`
// //                         w-full flex items-center gap-[0.8rem]
// //                         px-[1.2vw] py-[0.7rem]
// //                         text-left transition-all duration-300
// //                         hover:bg-[#f8f4ef]
// //                         ${selectedLanguage === lang
// //                           ? "bg-[#f8f4ef] text-[#651624]"
// //                           : "text-[#4b403d]"
// //                         }
// //                       `}
// //                     >
// //                       <span className="text-[1.1rem] Font_CV">
// //                         {lang === "Tamil"
// //                           ? "அ"
// //                           : lang === "Japanese"
// //                             ? "あ"
// //                             : "A"}
// //                       </span>

// //                       <span className="text-[0.9rem] Font_CV">
// //                         {lang}
// //                       </span>
// //                     </button>
// //                   ))}
// //                 </div>
// //               )}
// //             </div>

// //             <div className="mt-[1rem] bg-[#fdf8f1] border border-[#e7ddd4] rounded-[1.3rem] p-[1.4rem] min-h-[14rem] flex flex-col justify-between">
// //               <div>
// //                 <h2 className="text-[2.2rem] Font_CV text-[#4f322d]">
// //                   {translations[selectedLanguage].text}
// //                 </h2>
// //               </div>
// //               <div className="flex justify-between items-center">
// //                 <div className="flex items-center gap-[0.8rem]">
// //                   <button
// //                     onClick={() =>
// //                       speakText(
// //                         translations[selectedLanguage].text,
// //                         translations[selectedLanguage].lang,
// //                         "english"
// //                       )
// //                     }
// //                     className={`
// //                       group relative overflow-hidden
// //                       w-[3.5rem] h-[3.5rem]
// //                       rounded-full bg-[#f1dfc4]
// //                       flex items-center justify-center
// //                       transition-all duration-500
// //                       hover:scale-[1.08]
// //                       active:scale-[0.95]
// //                     `}
// //                   >
// //                     <span
// //                       className={`
// //                         absolute inset-0 rounded-full
// //                         border border-[#dcbf94]
// //                         scale-0 group-hover:scale-100
// //                         transition-all duration-500
// //                       `}
// //                     />

// //                     {!isEnglishPlaying ? (
// //                       <HiPlay className="text-[1.1rem] text-[#8c6034] transition-all duration-300 group-hover:scale-110" />
// //                     ) : (
// //                       <HiSpeakerWave className="text-[1.2rem] text-[#8c6034] animate-pulse" />
// //                     )}
// //                   </button>

// //                   <div className="flex items-center gap-[0.2rem]">
// //                     {[...Array(12)].map((_, i) => (
// //                       <span
// //                         key={i}
// //                         className={`
// //                           w-[0.1rem]
// //                           rounded-full
// //                           transition-all duration-300
// //                           ${isEnglishPlaying
// //                             ? "bg-[#b98b57] animate-sound-wave"
// //                             : "bg-[#d7c9c2]"
// //                           }
// //                         `}
// //                         style={{
// //                           height: i % 2 === 0 ? "0.8rem" : "0.4rem",
// //                           animationDelay: `${i * 0.08}s`,
// //                         }}
// //                       />
// //                     ))}
// //                   </div>
// //                 </div>
// //               </div>

// //             </div>
// //           </div>

// //         </div>
// //       </div>
// //     </section>
// //   );
// // }

// // "use client";

// // import { useEffect, useState } from "react";
// // import { RiArrowDropDownLine } from "react-icons/ri";
// // import { HiPlay, HiSpeakerWave } from "react-icons/hi2";
// // import DotField from "../common/DotField";
// // import BorderGlow from "../common/BorderGlow";

// // export default function HeroSection() {
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

// //   const speakText = (text, languageCode) => {
// //     if (typeof window === "undefined") return;

// //     window.speechSynthesis.cancel();

// //     const utterance = new SpeechSynthesisUtterance(text);

// //     utterance.lang = languageCode;
// //     utterance.rate = 0.9;

// //     const voices = window.speechSynthesis.getVoices();

// //     const matchingVoice = voices.find((voice) =>
// //       voice.lang
// //         .toLowerCase()
// //         .includes(languageCode.split("-")[0].toLowerCase()),
// //     );

// //     if (matchingVoice) {
// //       utterance.voice = matchingVoice;
// //     }

// //     utterance.onstart = () => {
// //       setIsPlaying(true);
// //     };

// //     utterance.onend = () => {
// //       setIsPlaying(false);
// //     };

// //     utterance.onerror = () => {
// //       setIsPlaying(false);
// //     };

// //     window.speechSynthesis.speak(utterance);
// //   };

// //   useEffect(() => {
// //     return () => {
// //       window.speechSynthesis.cancel();
// //     };
// //   }, []);

// //   return (
// //     <section className="h-screen w-full relative  flex items-center justify-center px-[4vw] pt-[0vh]">
// //       <div className="absolute inset-0 w-full h-full bg-[#6C1D35]">
// //         <DotField
// //           dotRadius={2.5}
// //           dotSpacing={14}
// //           bulgeStrength={67}
// //           glowRadius={160}
// //           sparkle={false}
// //           waveAmplitude={0}
// //           cursorRadius={500}
// //           cursorForce={0.1}
// //           bulgeOnly
// //           gradientFrom="rgba(240, 225, 196, 0.2)"
// //           gradientTo="rgba(214, 184, 146, 0.2)"
// //           glowColor="rgba(214, 184, 146, 0.0)"
// //         />
// //       </div>

// //       {/* <div className="absolute inset-0 opacity-[0.08] mix-blend-overlay bg-[url('/noisy.png')] bg-repeat" /> */}

// //       {/* Background */}
// //       {/* <div className="absolute top-0 left-0 w-full h-full overflow-hidden scale-[1.4]">
// //         <img
// //           src="/images/home/SkyBg.png"
// //           alt="IMG"
// //           className="w-full h-full object-cover object-center"
// //         />
// //       </div> */}

// //       <div className="w-full max-w-[90vw] z-10">
// //         {/* Heading */}
// //         <div className="text-center">
// //           <h1 className="text-[5.5rem] font-semibold leading-none Font_CV uppercase text-[#F1E2C6]">
// //             Pyaar Dosti Hai
// //           </h1>

// //           <div className="flex justify-center items-center mt-[1rem]">
// //             <p className=" capitalize tracking-tight text-[#F1E2C6] text-[0.9rem] leading-[1.1rem]">
// //               Every great love story is built on friendship, and every
// //               friendship deserves a forever. <br />
// //               Together, we celebrate a bond that began with friendship, grew
// //               with love.
// //             </p>
// //           </div>
// //         </div>

// //         {/* Translation Section */}
// //         <div className="mt-[3rem] flex justify-center">
// //           <div className="w-full max-w-[42rem] flex flex-col gap-5">
// //             {/* <p className="uppercase text-[0.8rem] Font_CV tracking-[0.25rem] text-[#F1E2C6] mb-[0.6rem]">
// //               Translation
// //             </p> */}

// //             {/* Language Dropdown */}
// //             {/* <div className="relative">
// //               <BorderGlow
// //                 edgeSensitivity={30}
// //                 glowColor="40 80 80"
// //                 backgroundColor="#120F17"
// //                 borderRadius={28}
// //                 glowRadius={40}
// //                 glowIntensity={1}
// //                 coneSpread={25}
// //                 animated={false}
// //                 colors={["#F1E0C5", "#D6B892", "#B76E79"]}
// //               >
// //                 <button
// //                   onClick={() => setIsLanguageOpen(!isLanguageOpen)}
// //                   className="w-full bg-[#F1E2C6] border border-[#e7ddd4] rounded-sm px-[1.2rem] py-[0.8rem] flex justify-between items-center"
// //                 >
// //                   <div className="flex items-center gap-[0.8rem]">
// //                     <span className="text-[1.5rem] Font_CV">
// //                       {translations[selectedLanguage].symbol}
// //                     </span>

// //                     <span className="text-[0.95rem] Font_CV uppercase text-[#4b403d]">
// //                       {selectedLanguage}
// //                     </span>
// //                   </div>

// //                   <RiArrowDropDownLine
// //                     className={`text-[1.8rem] transition-all duration-300 ${
// //                       isLanguageOpen ? "rotate-180" : ""
// //                     }`}
// //                   />
// //                 </button>
// //               </BorderGlow>

// //               {isLanguageOpen && (
// //                 <div className="absolute top-[110%] left-0 w-full bg-[#F1E2C6] border border-[#e7ddd4] rounded-sm overflow-hidden shadow-xl z-50">
// //                   {Object.entries(translations).map(([lang, data]) => (
// //                     <button
// //                       key={lang}
// //                       onClick={() => {
// //                         setSelectedLanguage(lang);
// //                         setIsLanguageOpen(false);
// //                       }}
// //                       className={`
// //                         w-full flex items-center gap-[0.8rem]
// //                         px-[1.2rem] py-[0.8rem]
// //                         transition-all duration-300
// //                         hover:bg-[#d4c3a2]
// //                         ${
// //                           selectedLanguage === lang
// //                             ? "bg-[#F1E2C6] text-[#651624]"
// //                             : "text-[#4b403d]"
// //                         }
// //                       `}
// //                     >
// //                       <span className="text-[1.2rem] Font_CV">
// //                         {data.symbol}
// //                       </span>

// //                       <span className="Font_CV">{lang}</span>
// //                     </button>
// //                   ))}
// //                 </div>
// //               )}
// //             </div> */}

// //             <div className="relative">
// //               <BorderGlow
// //                 edgeSensitivity={30}
// //                 glowColor="40 80 80"
// //                 backgroundColor="#120F17"
// //                 borderRadius={28}
// //                 glowRadius={40}
// //                 glowIntensity={1}
// //                 coneSpread={25}
// //                 animated={false}
// //                 colors={["#F1E0C5", "#D6B892", "#B76E79"]}
// //               >
// //                 <button
// //                   onClick={() => setIsLanguageOpen(!isLanguageOpen)}
// //                   className="w-full bg-[#F1E2C6] border border-[#e7ddd4] rounded-sm px-[1.2rem] py-[0.8rem] flex justify-between items-center"
// //                 >
// //                   <div className="flex items-center gap-[0.8rem]">
// //                     <span className="text-[1.5rem] Font_CV">
// //                       {translations[selectedLanguage].symbol}
// //                     </span>

// //                     <span className="text-[0.95rem] Font_CV uppercase text-[#4b403d]">
// //                       {selectedLanguage}
// //                     </span>
// //                   </div>

// //                   <RiArrowDropDownLine
// //                     className={`text-[1.8rem] transition-transform duration-300 ease-out ${
// //                       isLanguageOpen ? "rotate-180" : ""
// //                     }`}
// //                   />
// //                 </button>
// //               </BorderGlow>

// //               {/* Animated dropdown wrapper */}
// //               <div
// //                 className={`
// //       absolute top-[110%] left-0 w-full z-50
// //       grid transition-all duration-300 ease-out
// //       ${isLanguageOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}
// //     `}
// //                 style={{ pointerEvents: isLanguageOpen ? "auto" : "none" }}
// //               >
// //                 <div
// //                   className={`
// //         overflow-hidden
// //         bg-[#F1E2C6] border border-[#e7ddd4] rounded-sm shadow-xl
// //         transition-transform duration-300 ease-out
// //         ${isLanguageOpen ? "translate-y-0" : "-translate-y-2"}
// //       `}
// //                 >
// //                   {Object.entries(translations).map(([lang, data]) => (
// //                     <button
// //                       key={lang}
// //                       onClick={() => {
// //                         setSelectedLanguage(lang);
// //                         setIsLanguageOpen(false);
// //                       }}
// //                       className={`
// //             w-full flex items-center gap-[0.8rem]
// //             px-[1.2rem] py-[0.8rem]
// //             transition-all duration-300
// //             hover:bg-[#d4c3a2]
// //             ${
// //               selectedLanguage === lang
// //                 ? "bg-[#F1E2C6] text-[#651624]"
// //                 : "text-[#4b403d]"
// //             }
// //           `}
// //                     >
// //                       <span className="text-[1.2rem] Font_CV">
// //                         {data.symbol}
// //                       </span>
// //                       <span className="Font_CV">{lang}</span>
// //                     </button>
// //                   ))}
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Translation Card */}
// //             <BorderGlow
// //               edgeSensitivity={30}
// //               glowColor="40 80 80"
// //               backgroundColor="#120F17"
// //               borderRadius={28}
// //               glowRadius={40}
// //               glowIntensity={1}
// //               coneSpread={25}
// //               animated={false}
// //               colors={["#F1E0C5", "#D6B892", "#B76E79"]}
// //             >
// //               <div className=" bg-[#F1E2C6] border border-[#e7ddd4] rounded-sm p-[1.6rem] min-h-[16rem] flex flex-col justify-between">
// //                 <div>
// //                   <h2 className="text-[2.8rem] leading-[1.1] Font_CV text-[#651624]">
// //                     {translations[selectedLanguage].text}
// //                   </h2>

// //                   <p className="mt-[0.8rem] text-[1rem] Font_CV tracking-[0.15rem] uppercase text-[#6C1D35]">
// //                     Pyaar Dosti Hai
// //                   </p>
// //                 </div>

// //                 {/* Audio Controls */}
// //                 <div className="flex items-center gap-[1rem]">
// //                   <button
// //                     onClick={() =>
// //                       speakText(
// //                         translations[selectedLanguage].text,
// //                         translations[selectedLanguage].lang,
// //                       )
// //                     }
// //                     className={`
// //                     group relative overflow-hidden
// //                     w-[3.5rem]
// //                     h-[3.5rem]
// //                     rounded-full
// //                     bg-[#651624]
// //                     flex items-center justify-center
// //                     transition-all duration-500
// //                     hover:scale-[1.08]
// //                     active:scale-[0.95]
// //                   `}
// //                   >
// //                     <span
// //                       className={`
// //                       absolute inset-0
// //                       rounded-full
// //                       border border-[#8f4a55]
// //                       scale-0
// //                       group-hover:scale-100
// //                       transition-all duration-500
// //                     `}
// //                     />

// //                     {!isPlaying ? (
// //                       <HiPlay className="text-[#F1E2C6] text-[1.1rem] transition-all duration-300 group-hover:scale-110" />
// //                     ) : (
// //                       <HiSpeakerWave className="text-[#F1E2C6] text-[1.3rem] animate-pulse" />
// //                     )}
// //                   </button>

// //                   {/* Sound Wave */}
// //                   {/* <div className="flex items-center gap-[0.2rem]">
// //                     {[...Array(80)].map((_, i) => (
// //                       <span
// //                         key={i}
// //                         className={`
// //                         w-[0.1rem]
// //                         rounded-full
// //                         transition-all duration-300
// //                         ${
// //                           isPlaying
// //                             ? "bg-[#651624] animate-sound-wave"
// //                             : "bg-[#d7c9c2]"
// //                         }
// //                       `}
// //                         style={{
// //                           height: i % 2 === 0 ? "0.8rem" : "0.4rem",
// //                           animationDelay: `${i * 0.08}s`,
// //                         }}
// //                       />
// //                     ))}
// //                   </div> */}
// //                   <div className="flex items-center gap-[0.2rem]">
// //   {[...Array(80)].map((_, i) => {
// //     const center = 40;
// //     const distance = Math.abs(i - center);

// //     return (
// //       <span
// //         key={i}
// //         className={`
// //           w-[0.1rem]
// //           rounded-full
// //           transition-all duration-300
// //           ${
// //             isPlaying
// //               ? "bg-[#651624] animate-sound-wave"
// //               : "bg-[#65162457]"
// //           }
// //         `}
// //         style={{
// //           height:
// //             i % 6 === 0
// //               ? "1rem"
// //               : i % 4 === 0
// //               ? "0.8rem"
// //               : i % 2 === 0
// //               ? "0.6rem"
// //               : "0.4rem",
// //           animationDelay: `${distance * 0.02}s`,
// //         }}
// //       />
// //     );
// //   })}
// // </div>


// //                 </div>
// //               </div>
// //             </BorderGlow>
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
// import DotField from "../common/DotField";
// import BorderGlow from "../common/BorderGlow";

// export default function HeroSection() {
//   const [isLoaded, setIsLoaded] = useState(false);

//   const translations = {
//     Hindi: {
//       text: "प्यार दोस्ती है",
//       lang: "hi-IN",
//       symbol: "अ",
//     },
//     English: {
//       text: "Love is Friendship",
//       lang: "en-US",
//       symbol: "A",
//     },
//     Tamil: {
//       text: "காதல் என்பது நட்பு",
//       lang: "ta-IN",
//       symbol: "அ",
//     },
//     Spanish: {
//       text: "El amor es amistad",
//       lang: "es-ES",
//       symbol: "A",
//     },
//     French: {
//       text: "L'amour est l'amitié",
//       lang: "fr-FR",
//       symbol: "A",
//     },
//     Japanese: {
//       text: "愛は友情です",
//       lang: "ja-JP",
//       symbol: "あ",
//     },
//   };

//   const [selectedLanguage, setSelectedLanguage] = useState("Hindi");
//   const [isLanguageOpen, setIsLanguageOpen] = useState(false);
//   const [isPlaying, setIsPlaying] = useState(false);

//   // Trigger animation on mount
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
//       voice.lang
//         .toLowerCase()
//         .includes(languageCode.split("-")[0].toLowerCase()),
//     );

//     if (matchingVoice) {
//       utterance.voice = matchingVoice;
//     }

//     utterance.onstart = () => {
//       setIsPlaying(true);
//     };

//     utterance.onend = () => {
//       setIsPlaying(false);
//     };

//     utterance.onerror = () => {
//       setIsPlaying(false);
//     };

//     window.speechSynthesis.speak(utterance);
//   };

//   useEffect(() => {
//     return () => {
//       window.speechSynthesis.cancel();
//     };
//   }, []);

//   return (
//     <section className="h-screen w-full relative flex items-center justify-center px-[4vw] pt-[0vh] bg-[#1E4858]">
//       <style>{`
//         @keyframes fadeInUp {
//           from {
//             opacity: 0;
//             transform: translateY(30px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         @keyframes scaleIn {
//           from {
//             opacity: 0;
//             transform: scale(0.95);
//           }
//           to {
//             opacity: 1;
//             transform: scale(1);
//           }
//         }

//         @keyframes slideInDown {
//           from {
//             opacity: 0;
//             transform: translateY(-20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         .animate-fade-in-up {
//           animation: fadeInUp 0.8s ease-out forwards;
//         }

//         .animate-scale-in {
//           animation: scaleIn 0.8s ease-out forwards;
//         }

//         .animate-slide-in-down {
//           animation: slideInDown 0.8s ease-out forwards;
//         }

//         .delay-100 { animation-delay: 100ms; }
//         .delay-200 { animation-delay: 200ms; }
//         .delay-300 { animation-delay: 300ms; }
//         .delay-400 { animation-delay: 400ms; }
//       `}</style>

//       <div className="absolute inset-0 w-full h-full ">
//         <img src={`/new_img/AA2.jpg`} alt="img" className="w-full h-full object-cover object-top" />
//       </div>

//       <div className="w-full max-w-[90vw] z-10">
//         {/* Heading */}
//         <div
//           className={`text-center ${isLoaded ? "animate-fade-in-up" : "opacity-0"
//             }`}
//         >
//           <h1 className="text-[5.5rem] font-semibold leading-none Font_CV uppercase text-[#F1E2C6]">
//             Pyaar Dosti Hai
//           </h1>

//           <div
//             className={`flex justify-center items-center mt-[1rem] ${isLoaded ? "animate-fade-in-up delay-100" : "opacity-0"
//               }`}
//           >
//             <p className="capitalize tracking-tight text-[#F1E2C6] text-[0.9rem] leading-[1.1rem]">
//               Every great love story is built on friendship, and every
//               friendship deserves a forever. <br />
//               Together, we celebrate a bond that began with friendship, grew
//               with love.
//             </p>
//           </div>
//         </div>

//         {/* Translation Section */}
//         <div
//           className={`mt-[3rem] flex justify-center ${isLoaded ? "animate-fade-in-up delay-200" : "opacity-0"
//             }`}
//         >
//           <div className="w-full max-w-[42rem] flex flex-col gap-5">
//             {/* Language Dropdown */}
//             <div className="relative">
//               {/* <BorderGlow
//                 edgeSensitivity={30}
//                 glowColor="40 80 80"
//                 backgroundColor="#120F17"
//                 borderRadius={28}
//                 glowRadius={40}
//                 glowIntensity={1}
//                 coneSpread={25}
//                 animated={false}
//                 colors={["#F1E0C5", "#D6B892", "#B76E79"]}
//               > */}
//               <button
//                 onClick={() => setIsLanguageOpen(!isLanguageOpen)}
//                 className="w-full bg-[#F1E2C6] border border-[#e7ddd4] rounded-sm px-[1.2rem] py-[0.8rem] flex justify-between items-center transition-all duration-300 hover:shadow-lg"
//               >
//                 <div className="flex items-center gap-[0.8rem]">
//                   <span className="text-[1.5rem] Font_CV">
//                     {translations[selectedLanguage].symbol}
//                   </span>

//                   <span className="text-[0.95rem] Font_CV uppercase text-[#4b403d]">
//                     {selectedLanguage}
//                   </span>
//                 </div>

//                 <RiArrowDropDownLine
//                   className={`text-[1.8rem] transition-transform duration-300 ease-out ${isLanguageOpen ? "rotate-180" : ""
//                     }`}
//                 />
//               </button>
//               {/* </BorderGlow> */}

//               {/* Animated dropdown wrapper */}
//               <div
//                 className={`
//       absolute top-[110%] left-0 w-full z-50
//       grid transition-all duration-300 ease-out
//       ${isLanguageOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}
//     `}
//                 style={{ pointerEvents: isLanguageOpen ? "auto" : "none" }}
//               >
//                 <div
//                   className={`
//         overflow-hidden
//         bg-[#F1E2C6] border border-[#e7ddd4] rounded-sm shadow-xl
//         transition-transform duration-300 ease-out
//         ${isLanguageOpen ? "translate-y-0" : "-translate-y-2"}
//       `}
//                 >
//                   {Object.entries(translations).map(([lang, data]) => (
//                     <button
//                       key={lang}
//                       onClick={() => {
//                         setSelectedLanguage(lang);
//                         setIsLanguageOpen(false);
//                       }}
//                       className={`
//             w-full flex items-center gap-[0.8rem]
//             px-[1.2rem] py-[0.8rem]
//             transition-all duration-300
//             hover:bg-[#d4c3a2]
//             ${selectedLanguage === lang
//                           ? "bg-[#F1E2C6] text-[#651624]"
//                           : "text-[#4b403d]"
//                         }
//           `}
//                     >
//                       <span className="text-[1.2rem] Font_CV">
//                         {data.symbol}
//                       </span>
//                       <span className="Font_CV">{lang}</span>
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* Translation Card */}
//             {/* <BorderGlow
//               edgeSensitivity={30}
//               glowColor="40 80 80"
//               backgroundColor="#120F17"
//               borderRadius={28}
//               glowRadius={40}
//               glowIntensity={1}
//               coneSpread={25}
//               animated={false}
//               colors={["#F1E0C5", "#D6B892", "#B76E79"]}
//             > */}
//             <div className=" bg-[#F1E2C6] border border-[#e7ddd4] rounded-sm p-[1.6rem] min-h-[16rem] flex flex-col justify-between">
//               <div>
//                 <h2 className="text-[2.8rem] leading-[1.1] Font_CV text-[#651624]">
//                   {translations[selectedLanguage].text}
//                 </h2>

//                 <p className="mt-[0.8rem] text-[1rem] Font_CV tracking-[0.15rem] uppercase text-[#6C1D35]">
//                   Pyaar Dosti Hai
//                 </p>
//               </div>

//               {/* Audio Controls */}
//               <div className="flex items-center gap-[1rem]">
//                 <button
//                   onClick={() =>
//                     speakText(
//                       translations[selectedLanguage].text,
//                       translations[selectedLanguage].lang,
//                     )
//                   }
//                   className={`
//                     group relative overflow-hidden
//                     w-[3.5rem]
//                     h-[3.5rem]
//                     rounded-full
//                     bg-[#651624]
//                     flex items-center justify-center
//                     transition-all duration-500
//                     hover:scale-[1.08]
//                     active:scale-[0.95]
//                   `}
//                 >
//                   <span
//                     className={`
//                       absolute inset-0
//                       rounded-full
//                       border border-[#8f4a55]
//                       scale-0
//                       group-hover:scale-100
//                       transition-all duration-500
//                     `}
//                   />

//                   {!isPlaying ? (
//                     <HiPlay className="text-[#F1E2C6] text-[1.1rem] transition-all duration-300 group-hover:scale-110" />
//                   ) : (
//                     <HiSpeakerWave className="text-[#F1E2C6] text-[1.3rem] animate-pulse" />
//                   )}
//                 </button>

//                 <div className="flex items-center gap-[0.2rem]">
//                   {[...Array(80)].map((_, i) => {
//                     const center = 40;
//                     const distance = Math.abs(i - center);

//                     return (
//                       <span
//                         key={i}
//                         className={`
//                             w-[0.1rem]
//                             rounded-full
//                             transition-all duration-300
//                             ${isPlaying
//                             ? "bg-[#651624] animate-sound-wave"
//                             : "bg-[#65162457]"
//                           }
//                           `}
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
//                         }}
//                       />
//                     );
//                   })}
//                 </div>
//               </div>
//             </div>
//             {/* </BorderGlow> */}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { HiPlay, HiSpeakerWave } from "react-icons/hi2";

export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);

  const translations = {
    Hindi: {
      text: "प्यार दोस्ती है",
      lang: "hi-IN",
      symbol: "अ",
    },
    English: {
      text: "Love is Friendship",
      lang: "en-US",
      symbol: "A",
    },
    Tamil: {
      text: "காதல் என்பது நட்பு",
      lang: "ta-IN",
      symbol: "அ",
    },
    Spanish: {
      text: "El amor es amistad",
      lang: "es-ES",
      symbol: "A",
    },
    French: {
      text: "L'amour est l'amitié",
      lang: "fr-FR",
      symbol: "A",
    },
    Japanese: {
      text: "愛は友情です",
      lang: "ja-JP",
      symbol: "あ",
    },
  };

  const [selectedLanguage, setSelectedLanguage] = useState("Hindi");
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const speakText = (text, languageCode) => {
    if (typeof window === "undefined") return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = languageCode;
    utterance.rate = 0.9;

    const voices = window.speechSynthesis.getVoices();
    const matchingVoice = voices.find((voice) =>
      voice.lang.toLowerCase().includes(languageCode.split("-")[0].toLowerCase())
    );
    if (matchingVoice) utterance.voice = matchingVoice;

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  return (
    <section className="min-h-screen w-full relative flex items-center justify-center px-[4vw] py-[8vh] bg-[#1E4858]">
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
            <p className="capitalize tracking-tight text-[#F1E2C6] text-[1rem] sm:text-[0.9rem] leading-[1.3rem] px-2 sm:px-0">
              Every great love story is built on friendship, and every
              friendship deserves a forever. <br className="hidden sm:block" />
              Together, we celebrate a bond that began with friendship, grew
              with love.
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
                        hover:bg-[#d4c3a2]
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
            <div className="bg-[#F1E2C6] border border-[#e7ddd4] rounded-sm p-[1.2rem] sm:p-[1.6rem] min-h-[12rem] sm:min-h-[16rem] flex flex-col justify-between">
              <div>
                <h2 className="text-[2rem] sm:text-[2.8rem] leading-[1.1] Font_CV text-[#651624]">
                  {translations[selectedLanguage].text}
                </h2>
                <p className="mt-[0.6rem] sm:mt-[0.8rem] text-[0.85rem] sm:text-[1rem] Font_CV tracking-[0.12rem] sm:tracking-[0.15rem] uppercase text-[#6C1D35]">
                  Pyaar Dosti Hai
                </p>
              </div>

              {/* Audio Controls */}
              <div className="flex max-sm:w-[90%] items-center gap-[0.8rem] sm:gap-[1rem] mt-[1rem] sm:mt-0">
                <button
                  onClick={() =>
                    speakText(
                      translations[selectedLanguage].text,
                      translations[selectedLanguage].lang
                    )
                  }
                  className={`
                    group relative overflow-hidden flex-shrink-0
                    w-[3rem] sm:w-[3.5rem]
                    h-[3rem] sm:h-[3.5rem]
                    rounded-full
                    bg-[#651624]
                    flex items-center justify-center
                    transition-all duration-500
                    hover:scale-[1.08]
                    active:scale-[0.95]
                  `}
                >
                  <span
                    className={`
                      absolute inset-0 rounded-full border border-[#8f4a55]
                      scale-0 group-hover:scale-100 transition-all duration-500
                    `}
                  />
                  {!isPlaying ? (
                    <HiPlay className="text-[#F1E2C6] text-[1rem] sm:text-[1.1rem] transition-all duration-300 group-hover:scale-110" />
                  ) : (
                    <HiSpeakerWave className="text-[#F1E2C6] text-[1.1rem] sm:text-[1.3rem] animate-pulse" />
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
                            ? "bg-[#651624] animate-sound-wave"
                            : "bg-[#65162457]"
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