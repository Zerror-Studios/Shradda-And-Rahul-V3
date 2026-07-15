

// // "use client";

// // import React, { useEffect, useRef, useState } from "react";
// // import "leaflet/dist/leaflet.css";

// // // Brand colors
// // const BG = "#D25F27";
// // const OFFWHITE = "#F7F3EA";

// // // Small inline SVG glyphs per category (kept simple/monoline, colored via `currentColor`)
// // const CATEGORY_ICONS = {
// //   landmark: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3 7h7l-5.5 4.5L18.5 21 12 16.5 5.5 21l2-7.5L2 9h7z"/></svg>`,
// //   palace: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18M4 21V10l8-6 8 6v11M9 21v-6h6v6M12 4v3"/></svg>`,
// //   garden: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22c0-5 4-6 4-11a4 4 0 0 0-8 0c0 5 4 6 4 11z"/><path d="M12 11V2"/></svg>`,
// //   market: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8h16l-1.5 11a2 2 0 0 1-2 2H7.5a2 2 0 0 1-2-2L4 8z"/><path d="M8 8V6a4 4 0 0 1 8 0v2"/></svg>`,
// //   museum: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="1"/><circle cx="9.5" cy="9.5" r="1.5"/><path d="M20 15l-4.5-4.5a1 1 0 0 0-1.4 0L8 17"/></svg>`,
// // };

// // const CATEGORY_LABELS = {
// //   landmark: "Landmarks & squares",
// //   palace: "Palaces & tombs",
// //   garden: "Gardens",
// //   market: "Medina & souks",
// //   museum: "Museums",
// // };

// // // Real coordinates for Marrakech tourist attractions, grouped by category
// // const PLACES = [
// //   { id: "jemaa", name: "Jemaa el-Fnaa", category: "landmark", lat: 31.6258, lng: -7.9891 },
// //   { id: "koutoubia", name: "Koutoubia Mosque", category: "landmark", lat: 31.6238, lng: -7.9932 },
// //   { id: "qubba", name: "Almoravid Qubba", category: "landmark", lat: 31.6294, lng: -7.9836 },
// //   { id: "madrasa", name: "Ben Youssef Madrasa", category: "landmark", lat: 31.6314, lng: -7.9838 },

// //   { id: "bahia", name: "Bahia Palace", category: "palace", lat: 31.6215, lng: -7.9836 },
// //   { id: "badi", name: "El Badi Palace", category: "palace", lat: 31.6178, lng: -7.9832 },
// //   { id: "saadian", name: "Saadian Tombs", category: "palace", lat: 31.6198, lng: -7.9885 },
// //   { id: "darbacha", name: "Dar El Bacha", category: "palace", lat: 31.6303, lng: -7.9903 },

// //   { id: "majorelle", name: "Majorelle Garden", category: "garden", lat: 31.6417, lng: -8.0031 },
// //   { id: "menara", name: "Menara Gardens", category: "garden", lat: 31.6089, lng: -8.0186 },
// //   { id: "agdal", name: "Agdal Gardens", category: "garden", lat: 31.6055, lng: -7.9865 },
// //   { id: "secret", name: "Le Jardin Secret", category: "garden", lat: 31.6294, lng: -7.9868 },

// //   { id: "souks", name: "Souks / Medina", category: "market", lat: 31.6295, lng: -7.9811 },
// //   { id: "mellah", name: "Mellah (Jewish Quarter)", category: "market", lat: 31.6198, lng: -7.9822 },

// //   { id: "musee", name: "Marrakech Museum", category: "museum", lat: 31.6308, lng: -7.9835 },
// //   { id: "ysl", name: "Yves Saint Laurent Museum", category: "museum", lat: 31.6421, lng: -8.0016 },
// // ];

// // const GROUPED = Object.keys(CATEGORY_LABELS).map((category) => ({
// //   category,
// //   label: CATEGORY_LABELS[category],
// //   places: PLACES.filter((p) => p.category === category),
// // }));

// // const MarrakechMap = () => {
// //   const mapRef = useRef(null);
// //   const containerRef = useRef(null);
// //   const markersRef = useRef({});
// //   const leafletRef = useRef(null);
// //   const [hoveredId, setHoveredId] = useState(null);

// //   useEffect(() => {
// //     if (mapRef.current || !containerRef.current) return;

// //     import("leaflet").then((L) => {
// //       if (mapRef.current) return;
// //       leafletRef.current = L;

// //       const map = L.map(containerRef.current, {
// //         center: [31.624, -7.985],
// //         zoom: 15,
// //         scrollWheelZoom: false,
// //       });
// //       mapRef.current = map;

// //       // CARTO Voyager basemap — free, no API key, clean/minimal styling.
// //       L.tileLayer(
// //         "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
// //         {
// //           attribution:
// //             '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
// //           maxZoom: 19,
// //         }
// //       ).addTo(map);

// //       PLACES.forEach((place) => {
// //         const icon = L.divIcon({
// //           className: "",
// //           html: `<div class="marrakech-pin" data-id="${place.id}" style="
// //             width: 30px; height: 30px; border-radius: 50%;
// //             background: ${OFFWHITE}; border: 2px solid ${BG}; color: ${BG};
// //             display: flex; align-items: center; justify-content: center;
// //             box-shadow: 0 1px 4px rgba(0,0,0,0.35);
// //             transition: transform 0.15s ease, box-shadow 0.15s ease;
// //           ">
// //             <span style="width:16px;height:16px;display:block;">${CATEGORY_ICONS[place.category]}</span>
// //           </div>`,
// //           iconSize: [30, 30],
// //           iconAnchor: [15, 15],
// //           popupAnchor: [0, -15],
// //         });

// //         const marker = L.marker([place.lat, place.lng], { icon })
// //           .addTo(map)
// //           .bindPopup(
// //             `<strong style="color:${BG}">${place.name}</strong>`
// //           );

// //         markersRef.current[place.id] = marker;
// //       });
// //     });

// //     return () => {
// //       if (mapRef.current) {
// //         mapRef.current.remove();
// //         mapRef.current = null;
// //       }
// //     };
// //   }, []);

// //   // Highlight the matching marker whenever a sidebar item is hovered
// //   useEffect(() => {
// //     Object.entries(markersRef.current).forEach(([id, marker]) => {
// //       const el = marker.getElement && marker.getElement();
// //       const pin = el && el.querySelector(".marrakech-pin");
// //       if (!pin) return;

// //       if (id === hoveredId) {
// //         pin.style.transform = "scale(1.35)";
// //         pin.style.boxShadow = "0 2px 8px rgba(0,0,0,0.45)";
// //         pin.style.zIndex = "1000";
// //         marker.openPopup();
// //         if (mapRef.current) {
// //           mapRef.current.panTo(marker.getLatLng(), { animate: true });
// //         }
// //       } else {
// //         pin.style.transform = "scale(1)";
// //         pin.style.boxShadow = "0 1px 4px rgba(0,0,0,0.35)";
// //         pin.style.zIndex = "auto";
// //         marker.closePopup();
// //       }
// //     });
// //   }, [hoveredId]);

// //   return (
// //     <section className="w-full py-16 px-4 md:px-6" style={{ backgroundColor: BG }}>
// //       <div className="max-w-6xl mx-auto">
// //         <h2
// //           className="text-2xl md:text-5xl uppercase Font_CV text-[#F1E2C6] tracking-wide mb-2 text-center"
// //           style={{ color: OFFWHITE }}
// //         >
// //           Marrakech Map
// //         </h2>
// //         <p
// //           className="text-sm md:text-base Font_CV text-[#F1E2C6] opacity-80 mb-8 text-center max-w-md mx-auto"
// //           style={{ color: OFFWHITE }}
// //         >
// //           Hover a place on the list to see it on the map.
// //         </p>

// //         <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-stretch">
// //           {/* Sidebar list */}
// //           <div
// //             className="w-full md:w-72 shrink-0  p-4 md:max-h-[560px] overflow-y-auto"
// //             style={{ backgroundColor: OFFWHITE }}
// //           >
// //             {GROUPED.map((group) => (
// //               <div key={group.category} className="mb-5 last:mb-0">
// //                 <p
// //                   className="text-xs font-medium uppercase tracking-wide mb-2 opacity-70"
// //                   style={{ color: BG }}
// //                 >
// //                   {group.label}
// //                 </p>
// //                 <ul>
// //                   {group.places.map((place) => (
// //                     <li key={place.id}>
// //                       <button
// //                         type="button"
// //                         onMouseEnter={() => setHoveredId(place.id)}
// //                         onMouseLeave={() => setHoveredId((cur) => (cur === place.id ? null : cur))}
// //                         onFocus={() => setHoveredId(place.id)}
// //                         onBlur={() => setHoveredId((cur) => (cur === place.id ? null : cur))}
// //                         onClick={() => setHoveredId(place.id)}
// //                         className="w-full flex items-center gap-2 text-left rounded-lg px-2 py-1.5 mb-1 transition-colors"
// //                         style={{
// //                           color: BG,
// //                           backgroundColor: hoveredId === place.id ? "rgba(210,95,39,0.12)" : "transparent",
// //                         }}
// //                       >
// //                         <span
// //                           style={{ width: 16, height: 16, display: "block", color: BG }}
// //                           dangerouslySetInnerHTML={{ __html: CATEGORY_ICONS[place.category] }}
// //                         />
// //                         <span className="text-sm">{place.name}</span>
// //                       </button>
// //                     </li>
// //                   ))}
// //                 </ul>
// //               </div>
// //             ))}
// //           </div>

// //           {/* Map */}
// //           <div
// //             className="flex-1  overflow-hidden"
// //             style={{ border: `2px solid ${OFFWHITE}` }}
// //           >
// //             <div ref={containerRef} style={{ width: "100%", height: "560px" }} />
// //           </div>
// //         </div>

// //         {/* <p
// //           className="text-xs opacity-60 mt-6 text-center max-w-md mx-auto"
// //           style={{ color: OFFWHITE }}
// //         >
// //           Concept draft — a fully custom-styled map can follow once this
// //           direction is approved.
// //         </p> */}
// //       </div>
// //     </section>
// //   );
// // };

// // export default MarrakechMap;


// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import "leaflet/dist/leaflet.css";

// // Brand colors
// const BG = "#D25F27";
// const OFFWHITE = "#F7F3EA";

// // Small inline SVG glyphs per category (kept simple/monoline, colored via `currentColor`)
// const CATEGORY_ICONS = {
//   square: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 21V11a8 8 0 0 1 16 0v10"/><path d="M4 21h16"/></svg>`,
//   landmark: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/><path d="M12 7v13M8 20h8"/></svg>`,
//   palace: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18M4 21V10l8-6 8 6v11M9 21v-6h6v6M12 4v3"/></svg>`,
//   madrasa: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="1"/><rect x="9" y="9" width="6" height="6" rx="0.5"/></svg>`,
//   garden: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22c0-5 4-6 4-11a4 4 0 0 0-8 0c0 5 4 6 4 11z"/><path d="M12 11V2"/></svg>`,
//   riad_garden: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="2.5"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3"/></svg>`,
//   mountains: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 20l6-11 4 6.5L16 9l5 11z"/></svg>`,
//   valley: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 8c2 0 2 3 4 3s2-3 4-3 2 3 4 3 2-3 4-3 2 3 4 3"/><path d="M2 14c2 0 2 3 4 3s2-3 4-3 2 3 4 3 2-3 4-3 2 3 4 3"/></svg>`,
//   desert: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3"/><path d="M2 18c2.5 0 3.5-3 6-3s3.5 3 6 3 3.5-3 6-3 1.5 2 2 2"/></svg>`,
//   multi_day: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none"/><path d="M12 2v3M12 19v3M22 12h-3M5 12H2M18.4 5.6l-2 2M7.6 16.4l-2 2M18.4 18.4l-2-2M7.6 7.6l-2-2"/></svg>`,
//   garden_riad: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22c0-5 4-6 4-11a4 4 0 0 0-8 0c0 5 4 6 4 11z"/><path d="M12 11V2"/></svg>`,
//   rooftop: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-5h4v5"/></svg>`,
//   cafe: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8h13v6a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V8z"/><path d="M17 9h1.5a2.5 2.5 0 0 1 0 5H17"/><path d="M8 2c0 1-1 1-1 2s1 1 1 2M12 2c0 1-1 1-1 2s1 1 1 2"/></svg>`,
// };

// const CATEGORY_LABELS = {
//   square: "Square",
//   landmark: "Landmark",
//   palace: "Palace",
//   madrasa: "Madrasa",
//   garden: "Garden",
//   riad_garden: "Riad Garden",
//   mountains: "Mountains",
//   valley: "Valley",
//   desert: "Desert",
//   multi_day: "Multi-day",
//   garden_riad: "Garden Riad",
//   rooftop: "Rooftop",
//   cafe: "Café",
// };

// // Real-world places, grouped into the sections from the trip notes.
// // Each place carries its own description + short "note" line (shown on hover),
// // and Ben Youssef Madrasa carries an extra personal note.
// const SECTIONS = [
//   {
//     id: "medina",
//     title: "The Medina",
//     places: [
//       {
//         id: "jemaa",
//         name: "Jemaa el-Fnaa",
//         category: "square",
//         lat: 31.6258,
//         lng: -7.9891,
//         description:
//           "The beating heart of the medina, and a UNESCO-listed open-air theatre by night. Juice stalls, storytellers, and food carts that fill the square as the sun drops.",
//         note: "Best after 6pm — go hungry",
//       },
//       {
//         id: "koutoubia",
//         name: "Koutoubia Mosque",
//         category: "landmark",
//         lat: 31.6238,
//         lng: -7.9932,
//         description:
//           "A 12th-century minaret that still anchors the skyline. Non-Muslim visitors can't enter, but the gardens and exterior at dusk are worth the walk alone.",
//         note: "15 min, viewed from outside",
//       },
//       {
//         id: "bahia",
//         name: "Bahia Palace",
//         category: "palace",
//         lat: 31.6215,
//         lng: -7.9836,
//         description:
//           'A 19th-century palace built to be "the brilliant one" — and it is. Carved cedar ceilings, painted courtyards, and zellige tilework in every direction you look.',
//         note: "Allow 1 hour",
//       },
//       {
//         id: "madrasa",
//         name: "Ben Youssef Madrasa",
//         category: "madrasa",
//         lat: 31.6314,
//         lng: -7.9838,
//         description:
//           "Once one of the largest Islamic colleges in North Africa. The central courtyard — carved stucco, zellige, cedar lattice — is almost overwhelming in the best way.",
//         note: "45 min",
//         personalNote:
//           "A little personal note: this very courtyard is the architectural inspiration behind the patio at The Osera — where we'll be saying our vows.",
//       },
//     ],
//   },
//   {
//     id: "gardens",
//     title: "Gardens and Gueliz",
//     places: [
//       {
//         id: "majorelle",
//         name: "Jardin Majorelle & YSL Museum",
//         category: "garden",
//         lat: 31.6417,
//         lng: -8.0031,
//         description:
//           "The cobalt-blue villa garden built by Jacques Majorelle, later restored by Yves Saint Laurent. The blue that gives the garden its name is the same one we borrowed for this page.",
//         note: "Book timed tickets online in advance · 1.5–3 hrs",
//       },
//       {
//         id: "secret",
//         name: "Le Jardin Secret",
//         category: "riad_garden",
//         lat: 31.6294,
//         lng: -7.9868,
//         description:
//           "A restored riad garden tucked inside the medina itself, split into an Islamic garden and an exotic one. Quieter than Majorelle, with a tower view over the rooftops.",
//         note: "Good midday escape from the heat",
//       },
//     ],
//   },
//   {
//     id: "beyond",
//     title: "Beyond the City",
//     places: [
//       {
//         id: "atlas",
//         name: "Atlas Mountains & Imlil",
//         category: "mountains",
//         lat: 31.1449,
//         lng: -7.9146,
//         description:
//           "Berber villages, walnut groves, and trailheads into the High Atlas — about 90 minutes from the city by car. A full reset from the pace of the medina.",
//         note: "Half or full day",
//       },
//       {
//         id: "ourika",
//         name: "Ourika Valley",
//         category: "valley",
//         lat: 31.4928,
//         lng: -7.7645,
//         description:
//           "Waterfalls, riverside cafes built right into the rock, and a green, fast-running valley that feels nothing like the city below it.",
//         note: "Half day, roughly an hour each way",
//       },
//       {
//         id: "agafay",
//         name: "Agafay Desert",
//         category: "desert",
//         lat: 31.4700,
//         lng: -8.2600,
//         description:
//           "A rocky, lunar stretch of desert just 30 minutes from Marrakech — no need for the full Sahara trek. Camel rides and sunset dinners under open sky.",
//         note: "Best for golden hour",
//       },
//       {
//         id: "sahara",
//         name: "The Sahara",
//         category: "multi_day",
//         lat: 31.0801,
//         lng: -4.0133,
//         description:
//           "The real thing — endless dunes at Erg Chebbi or Erg Chegaga — sits two to three days from Marrakech, over the Atlas passes and down through the Draa Valley. Camel treks, a night camped under more stars than you knew existed, and dune-gold sunrises.",
//         note: "2–3 days round trip, book in advance",
//       },
//     ],
//   },
//   {
//     id: "eat",
//     title: "Eat and Unwind",
//     places: [
//       {
//         id: "lejardin",
//         name: "Le Jardin",
//         category: "garden_riad",
//         lat: 31.6298,
//         lng: -7.9819,
//         description:
//           "Down a quiet medina alleyway, a 16th-century mansion turned peaceful courtyard restaurant. Excellent for a slow lunch out of the sun.",
//         note: "Best for lunch or brunch",
//       },
//       {
//         id: "cafearabe",
//         name: "Café Arabe",
//         category: "rooftop",
//         lat: 31.6294,
//         lng: -7.9862,
//         description:
//           "Set inside a 17th-century palace, with a rooftop bar built for a sunset cocktail before dinner. One of the most atmospheric rooms in the medina.",
//         note: "Go for golden hour drinks",
//       },
//       {
//         id: "bacha",
//         name: "Bacha Coffee",
//         category: "cafe",
//         lat: 31.6303,
//         lng: -7.9903,
//         description:
//           "A coffee house dating back to 1910, recently reopened and instantly the most photographed café in the city. Palatial interiors, a tea and coffee list that runs for pages, and pastries worth the queue.",
//         note: "Go mid-morning, expect a line",
//       },
//     ],
//   },
// ];

// // Flat lookup used by the map layer
// const PLACES = SECTIONS.flatMap((s) => s.places);

// const popupHTML = (place) => `
//   <div style="min-width:220px;max-width:260px;font-family:inherit;">
//     <div style="display:flex;align-items:center;gap:6px;margin-bottom:6px;">
//       <span style="width:16px;height:16px;display:block;color:${BG};">${CATEGORY_ICONS[place.category]}</span>
//       <span style="font-size:10px;text-transform:uppercase;letter-spacing:0.06em;color:${BG};opacity:0.7;">${CATEGORY_LABELS[place.category]}</span>
//     </div>
//     <strong style="color:${BG};font-size:14px;display:block;margin-bottom:4px;">${place.name}</strong>
//     <p style="color:#4a3a2f;font-size:12.5px;line-height:1.45;margin:0 0 6px 0;">${place.description}</p>
//     <p style="color:${BG};font-style:italic;font-size:11.5px;margin:0;">${place.note}</p>
//     ${
//       place.personalNote
//         ? `<div style="margin-top:8px;padding:6px 8px;background:#EAF1F7;border-radius:6px;color:#2c4a63;font-size:11px;line-height:1.4;">${place.personalNote}</div>`
//         : ""
//     }
//   </div>
// `;

// const MarrakechMap = () => {
//   const mapRef = useRef(null);
//   const containerRef = useRef(null);
//   const markersRef = useRef({});
//   const leafletRef = useRef(null);
//   const [hoveredId, setHoveredId] = useState(null);

//   useEffect(() => {
//     if (mapRef.current || !containerRef.current) return;

//     import("leaflet").then((L) => {
//       if (mapRef.current) return;
//       leafletRef.current = L;

//       const map = L.map(containerRef.current, {
//         scrollWheelZoom: false,
//       });
//       mapRef.current = map;

//       // CARTO Voyager basemap — free, no API key, clean/minimal styling.
//       L.tileLayer(
//         "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
//         {
//           attribution:
//             '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
//           maxZoom: 19,
//         }
//       ).addTo(map);

//       PLACES.forEach((place) => {
//         const icon = L.divIcon({
//           className: "",
//           html: `<div class="marrakech-pin" data-id="${place.id}" style="
//             width: 30px; height: 30px; border-radius: 50%;
//             background: ${OFFWHITE}; border: 2px solid ${BG}; color: ${BG};
//             display: flex; align-items: center; justify-content: center;
//             box-shadow: 0 1px 4px rgba(0,0,0,0.35);
//             transition: transform 0.15s ease, box-shadow 0.15s ease;
//           ">
//             <span style="width:16px;height:16px;display:block;">${CATEGORY_ICONS[place.category]}</span>
//           </div>`,
//           iconSize: [30, 30],
//           iconAnchor: [15, 15],
//           popupAnchor: [0, -15],
//         });

//         const marker = L.marker([place.lat, place.lng], { icon })
//           .addTo(map)
//           .bindPopup(popupHTML(place), { maxWidth: 280 });

//         marker.on("mouseover", () => setHoveredId(place.id));
//         marker.on("mouseout", () =>
//           setHoveredId((cur) => (cur === place.id ? null : cur))
//         );

//         markersRef.current[place.id] = marker;
//       });

//       // Fit the map to every marker (locations range from the medina to the
//       // Sahara, so bounds-fitting beats a fixed center/zoom).
//       const bounds = L.latLngBounds(PLACES.map((p) => [p.lat, p.lng]));
//       map.fitBounds(bounds, { padding: [30, 30] });
//     });

//     return () => {
//       if (mapRef.current) {
//         mapRef.current.remove();
//         mapRef.current = null;
//       }
//     };
//   }, []);

//   // Highlight the matching marker whenever a sidebar item (or map marker) is hovered
//   useEffect(() => {
//     Object.entries(markersRef.current).forEach(([id, marker]) => {
//       const el = marker.getElement && marker.getElement();
//       const pin = el && el.querySelector(".marrakech-pin");
//       if (!pin) return;

//       if (id === hoveredId) {
//         pin.style.transform = "scale(1.35)";
//         pin.style.boxShadow = "0 2px 8px rgba(0,0,0,0.45)";
//         pin.style.zIndex = "1000";
//         marker.openPopup();
//         if (mapRef.current) {
//           mapRef.current.panTo(marker.getLatLng(), { animate: true });
//         }
//       } else {
//         pin.style.transform = "scale(1)";
//         pin.style.boxShadow = "0 1px 4px rgba(0,0,0,0.35)";
//         pin.style.zIndex = "auto";
//         marker.closePopup();
//       }
//     });
//   }, [hoveredId]);

//   return (
//     <section className="w-full py-16 px-4 md:px-6" style={{ backgroundColor: BG }}>
//       <div className="max-w-6xl mx-auto">
//         <h2
//           className="text-2xl md:text-5xl uppercase Font_CV text-[#F1E2C6] tracking-wide mb-2 text-center"
//           // style={{ color: OFFWHITE }}
//         >
//           Marrakech Map
//         </h2>
//         <p
//           className="text-sm md:text-base Font_CV text-[#F1E2C6] opacity-80 mb-8 text-center max-w-md mx-auto"
//           // style={{ color: OFFWHITE }}
//         >
//           Hover a place on the list to see its story on the map.
//         </p>

//         <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-stretch">
//           {/* Sidebar list */}
//           <div
//             className="w-full md:w-72 shrink-0 p-4 md:max-h-[560px] overflow-y-auto"
//             style={{ backgroundColor: OFFWHITE }}
//           >
//             {SECTIONS.map((section) => (
//               <div key={section.id} className="mb-5 last:mb-0">
//                 <p
//                   className="text-xs font-medium uppercase tracking-wide mb-2 opacity-70"
//                   style={{ color: BG }}
//                 >
//                   {section.title}
//                 </p>
//                 <ul>
//                   {section.places.map((place) => (
//                     <li key={place.id}>
//                       <button
//                         type="button"
//                         onMouseEnter={() => setHoveredId(place.id)}
//                         onMouseLeave={() =>
//                           setHoveredId((cur) => (cur === place.id ? null : cur))
//                         }
//                         onFocus={() => setHoveredId(place.id)}
//                         onBlur={() =>
//                           setHoveredId((cur) => (cur === place.id ? null : cur))
//                         }
//                         onClick={() => setHoveredId(place.id)}
//                         className="w-full flex items-start gap-2 text-left rounded-lg px-2 py-1.5 mb-1 transition-colors"
//                         style={{
//                           color: BG,
//                           backgroundColor:
//                             hoveredId === place.id
//                               ? "rgba(210,95,39,0.12)"
//                               : "transparent",
//                         }}
//                       >
//                         <span
//                           style={{
//                             width: 16,
//                             height: 16,
//                             display: "block",
//                             color: BG,
//                             marginTop: 2,
//                             flexShrink: 0,
//                           }}
//                           dangerouslySetInnerHTML={{
//                             __html: CATEGORY_ICONS[place.category],
//                           }}
//                         />
//                         <span className="flex flex-col">
//                           <span className="text-sm font-medium">{place.name}</span>
//                           {hoveredId === place.id && (
//                             <span
//                               className="text-xs mt-0.5"
//                               style={{ color: BG, opacity: 0.85 }}
//                             >
//                               {place.description}
//                             </span>
//                           )}
//                         </span>
//                       </button>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </div>

//           {/* Map */}
//           <div
//             className="flex-1 overflow-hidden"
//             style={{ border: `2px solid ${OFFWHITE}` }}
//           >
//             <div ref={containerRef} style={{ width: "100%", height: "560px" }} />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default MarrakechMap;


"use client";

import React, { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";

// Brand colors
const BG = "#D25F27";
const OFFWHITE = "#F7F3EA";

// Small inline SVG glyphs per category (kept simple/monoline, colored via `currentColor`)
const CATEGORY_ICONS = {
  hotel: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21V7a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v14"/><path d="M13 21V11a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v10"/><path d="M7 9h.01M7 13h.01M7 17h.01"/><path d="M3 21h18"/></svg>`,
  square: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 21V11a8 8 0 0 1 16 0v10"/><path d="M4 21h16"/></svg>`,
  landmark: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/><path d="M12 7v13M8 20h8"/></svg>`,
  palace: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18M4 21V10l8-6 8 6v11M9 21v-6h6v6M12 4v3"/></svg>`,
  madrasa: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="1"/><rect x="9" y="9" width="6" height="6" rx="0.5"/></svg>`,
  garden: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22c0-5 4-6 4-11a4 4 0 0 0-8 0c0 5 4 6 4 11z"/><path d="M12 11V2"/></svg>`,
  riad_garden: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="2.5"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3"/></svg>`,
  mountains: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 20l6-11 4 6.5L16 9l5 11z"/></svg>`,
  valley: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 8c2 0 2 3 4 3s2-3 4-3 2 3 4 3 2-3 4-3 2 3 4 3"/><path d="M2 14c2 0 2 3 4 3s2-3 4-3 2 3 4 3 2-3 4-3 2 3 4 3"/></svg>`,
  desert: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3"/><path d="M2 18c2.5 0 3.5-3 6-3s3.5 3 6 3 3.5-3 6-3 1.5 2 2 2"/></svg>`,
  multi_day: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none"/><path d="M12 2v3M12 19v3M22 12h-3M5 12H2M18.4 5.6l-2 2M7.6 16.4l-2 2M18.4 18.4l-2-2M7.6 7.6l-2-2"/></svg>`,
  garden_riad: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22c0-5 4-6 4-11a4 4 0 0 0-8 0c0 5 4 6 4 11z"/><path d="M12 11V2"/></svg>`,
  rooftop: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-5h4v5"/></svg>`,
  cafe: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8h13v6a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V8z"/><path d="M17 9h1.5a2.5 2.5 0 0 1 0 5H17"/><path d="M8 2c0 1-1 1-1 2s1 1 1 2M12 2c0 1-1 1-1 2s1 1 1 2"/></svg>`,
};

const CATEGORY_LABELS = {
  hotel: "Hotel",
  square: "Square",
  landmark: "Landmark",
  palace: "Palace",
  madrasa: "Madrasa",
  garden: "Garden",
  riad_garden: "Riad Garden",
  mountains: "Mountains",
  valley: "Valley",
  desert: "Desert",
  multi_day: "Multi-day",
  garden_riad: "Garden Riad",
  rooftop: "Rooftop",
  cafe: "Café",
};

// Real-world places, grouped into the sections from the trip notes.
// Each place carries its own description + short "note" line (shown on hover),
// and Ben Youssef Madrasa carries an extra personal note.
const SECTIONS = [
  {
    id: "stay",
    title: "Where We're Staying",
    places: [
      {
        id: "oberoi",
        name: "The Oberoi Marrakech",
        category: "hotel",
        // Approximate — the resort sits off Route de Ouarzazate, ~25 min
        // south of the medina near the palmeraie/golf belt. Worth a quick
        // check against Google Maps for the exact gate before this ships.
        lat: 31.5985,
        lng: -7.9105,
        description:
          "Twenty-eight acres of citrus orchards and olive groves on the edge of the city, with a central courtyard modeled on the Ben Youssef Madrasa and views out to the snow-capped Atlas Mountains.",
        note: "~25 min from the medina",
      },
    ],
  },
  {
    id: "medina",
    title: "The Medina",
    places: [
      {
        id: "jemaa",
        name: "Jemaa el-Fnaa",
        category: "square",
        lat: 31.6258,
        lng: -7.9891,
        description:
          "The beating heart of the medina, and a UNESCO-listed open-air theatre by night. Juice stalls, storytellers, and food carts that fill the square as the sun drops.",
        note: "Best after 6pm — go hungry",
      },
      {
        id: "koutoubia",
        name: "Koutoubia Mosque",
        category: "landmark",
        lat: 31.6238,
        lng: -7.9932,
        description:
          "A 12th-century minaret that still anchors the skyline. Non-Muslim visitors can't enter, but the gardens and exterior at dusk are worth the walk alone.",
        note: "15 min, viewed from outside",
      },
      {
        id: "bahia",
        name: "Bahia Palace",
        category: "palace",
        lat: 31.6215,
        lng: -7.9836,
        description:
          'A 19th-century palace built to be "the brilliant one" — and it is. Carved cedar ceilings, painted courtyards, and zellige tilework in every direction you look.',
        note: "Allow 1 hour",
      },
      {
        id: "madrasa",
        name: "Ben Youssef Madrasa",
        category: "madrasa",
        lat: 31.6314,
        lng: -7.9838,
        description:
          "Once one of the largest Islamic colleges in North Africa. The central courtyard — carved stucco, zellige, cedar lattice — is almost overwhelming in the best way.",
        note: "45 min",
        personalNote:
          "A little personal note: this very courtyard is the architectural inspiration behind the patio at The Osera — where we'll be saying our vows.",
      },
    ],
  },
  {
    id: "gardens",
    title: "Gardens and Gueliz",
    places: [
      {
        id: "majorelle",
        name: "Jardin Majorelle & YSL Museum",
        category: "garden",
        lat: 31.6417,
        lng: -8.0031,
        description:
          "The cobalt-blue villa garden built by Jacques Majorelle, later restored by Yves Saint Laurent. The blue that gives the garden its name is the same one we borrowed for this page.",
        note: "Book timed tickets online in advance · 1.5–3 hrs",
      },
      {
        id: "secret",
        name: "Le Jardin Secret",
        category: "riad_garden",
        lat: 31.6294,
        lng: -7.9868,
        description:
          "A restored riad garden tucked inside the medina itself, split into an Islamic garden and an exotic one. Quieter than Majorelle, with a tower view over the rooftops.",
        note: "Good midday escape from the heat",
      },
    ],
  },
  {
    id: "beyond",
    title: "Beyond the City",
    places: [
      {
        id: "atlas",
        name: "Atlas Mountains & Imlil",
        category: "mountains",
        lat: 31.1449,
        lng: -7.9146,
        description:
          "Berber villages, walnut groves, and trailheads into the High Atlas — about 90 minutes from the city by car. A full reset from the pace of the medina.",
        note: "Half or full day",
      },
      {
        id: "ourika",
        name: "Ourika Valley",
        category: "valley",
        lat: 31.4928,
        lng: -7.7645,
        description:
          "Waterfalls, riverside cafes built right into the rock, and a green, fast-running valley that feels nothing like the city below it.",
        note: "Half day, roughly an hour each way",
      },
      {
        id: "agafay",
        name: "Agafay Desert",
        category: "desert",
        lat: 31.4700,
        lng: -8.2600,
        description:
          "A rocky, lunar stretch of desert just 30 minutes from Marrakech — no need for the full Sahara trek. Camel rides and sunset dinners under open sky.",
        note: "Best for golden hour",
      },
      {
        id: "sahara",
        name: "The Sahara",
        category: "multi_day",
        lat: 31.0801,
        lng: -4.0133,
        description:
          "The real thing — endless dunes at Erg Chebbi or Erg Chegaga — sits two to three days from Marrakech, over the Atlas passes and down through the Draa Valley. Camel treks, a night camped under more stars than you knew existed, and dune-gold sunrises.",
        note: "2–3 days round trip, book in advance",
      },
    ],
  },
  {
    id: "eat",
    title: "Eat and Unwind",
    places: [
      {
        id: "lejardin",
        name: "Le Jardin",
        category: "garden_riad",
        lat: 31.6298,
        lng: -7.9819,
        description:
          "Down a quiet medina alleyway, a 16th-century mansion turned peaceful courtyard restaurant. Excellent for a slow lunch out of the sun.",
        note: "Best for lunch or brunch",
      },
      {
        id: "cafearabe",
        name: "Café Arabe",
        category: "rooftop",
        lat: 31.6294,
        lng: -7.9862,
        description:
          "Set inside a 17th-century palace, with a rooftop bar built for a sunset cocktail before dinner. One of the most atmospheric rooms in the medina.",
        note: "Go for golden hour drinks",
      },
      {
        id: "bacha",
        name: "Bacha Coffee",
        category: "cafe",
        lat: 31.6303,
        lng: -7.9903,
        description:
          "A coffee house dating back to 1910, recently reopened and instantly the most photographed café in the city. Palatial interiors, a tea and coffee list that runs for pages, and pastries worth the queue.",
        note: "Go mid-morning, expect a line",
      },
    ],
  },
];

// Flat lookup used by the map layer
const PLACES = SECTIONS.flatMap((s) => s.places);

// Only show filter pills for categories that are actually in use, in the
// order they first appear across the sections above.
const USED_CATEGORIES = Array.from(new Set(PLACES.map((p) => p.category)));

const popupHTML = (place) => `
  <div style="min-width:220px;max-width:260px;font-family:inherit;">
    <div style="display:flex;align-items:center;gap:6px;margin-bottom:6px;">
      <span style="width:16px;height:16px;display:block;color:${BG};">${CATEGORY_ICONS[place.category]}</span>
      <span style="font-size:10px;text-transform:uppercase;letter-spacing:0.06em;color:${BG};opacity:0.7;">${CATEGORY_LABELS[place.category]}</span>
    </div>
    <strong style="color:${BG};font-size:14px;display:block;margin-bottom:4px;">${place.name}</strong>
    <p style="color:#4a3a2f;font-size:12.5px;line-height:1.45;margin:0 0 6px 0;">${place.description}</p>
    <p style="color:${BG};font-style:italic;font-size:11.5px;margin:0;">${place.note}</p>
    ${
      place.personalNote
        ? `<div style="margin-top:8px;padding:6px 8px;background:#EAF1F7;border-radius:6px;color:#2c4a63;font-size:11px;line-height:1.4;">${place.personalNote}</div>`
        : ""
    }
  </div>
`;

const MarrakechMap = () => {
  const mapRef = useRef(null);
  const containerRef = useRef(null);
  const markersRef = useRef({}); // id -> { marker, category }
  const leafletRef = useRef(null);
  const activeCategoriesRef = useRef(new Set(USED_CATEGORIES));
  const [hoveredId, setHoveredId] = useState(null);
  const [activeCategories, setActiveCategories] = useState(
    new Set(USED_CATEGORIES)
  );

  // Keep a ref in sync so the async Leaflet setup can read the latest
  // filter state without re-running the whole init effect.
  useEffect(() => {
    activeCategoriesRef.current = activeCategories;
    applyVisibility();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategories]);

  const applyVisibility = () => {
    Object.values(markersRef.current).forEach(({ marker, category }) => {
      const el = marker.getElement && marker.getElement();
      if (!el) return;
      const visible = activeCategoriesRef.current.has(category);
      el.style.display = visible ? "" : "none";
      el.style.pointerEvents = visible ? "auto" : "none";
    });
  };

  const toggleCategory = (cat) => {
    setActiveCategories((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) {
        next.delete(cat);
      } else {
        next.add(cat);
      }
      return next;
    });
  };

  const showAllCategories = () => setActiveCategories(new Set(USED_CATEGORIES));

  useEffect(() => {
    if (mapRef.current || !containerRef.current) return;

    import("leaflet").then((L) => {
      if (mapRef.current) return;
      leafletRef.current = L;

      const map = L.map(containerRef.current, {
        scrollWheelZoom: false,
      });
      mapRef.current = map;

      // CARTO Voyager basemap — free, no API key, clean/minimal styling.
      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          maxZoom: 19,
        }
      ).addTo(map);

      PLACES.forEach((place) => {
        const icon = L.divIcon({
          className: "",
          html: `<div class="marrakech-pin" data-id="${place.id}" style="
            width: 30px; height: 30px; border-radius: 50%;
            background: ${OFFWHITE}; border: 2px solid ${BG}; color: ${BG};
            display: flex; align-items: center; justify-content: center;
            box-shadow: 0 1px 4px rgba(0,0,0,0.35);
            transition: transform 0.15s ease, box-shadow 0.15s ease;
          ">
            <span style="width:16px;height:16px;display:block;">${CATEGORY_ICONS[place.category]}</span>
          </div>`,
          iconSize: [30, 30],
          iconAnchor: [15, 15],
          popupAnchor: [0, -15],
        });

        const marker = L.marker([place.lat, place.lng], { icon })
          .addTo(map)
          .bindPopup(popupHTML(place), { maxWidth: 280 });

        marker.on("mouseover", () => setHoveredId(place.id));
        marker.on("mouseout", () =>
          setHoveredId((cur) => (cur === place.id ? null : cur))
        );

        markersRef.current[place.id] = { marker, category: place.category };
      });

      // Fit the map to every marker (locations range from the medina to the
      // Sahara, so bounds-fitting beats a fixed center/zoom).
      const bounds = L.latLngBounds(PLACES.map((p) => [p.lat, p.lng]));
      map.fitBounds(bounds, { padding: [30, 30] });

      // Apply whatever filter state exists at mount time (in case a
      // category was toggled off before Leaflet finished loading).
      applyVisibility();
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Highlight the matching marker whenever a sidebar item (or map marker) is hovered
  useEffect(() => {
    Object.entries(markersRef.current).forEach(([id, { marker }]) => {
      const el = marker.getElement && marker.getElement();
      const pin = el && el.querySelector(".marrakech-pin");
      if (!pin) return;

      if (id === hoveredId) {
        pin.style.transform = "scale(1.35)";
        pin.style.boxShadow = "0 2px 8px rgba(0,0,0,0.45)";
        pin.style.zIndex = "1000";
        marker.openPopup();
        if (mapRef.current) {
          mapRef.current.panTo(marker.getLatLng(), { animate: true });
        }
      } else {
        pin.style.transform = "scale(1)";
        pin.style.boxShadow = "0 1px 4px rgba(0,0,0,0.35)";
        pin.style.zIndex = "auto";
        marker.closePopup();
      }
    });
  }, [hoveredId]);

  const allActive = activeCategories.size === USED_CATEGORIES.length;

  return (
    <section className="w-full py-16 px-4 md:px-6" style={{ backgroundColor: BG }}>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-5xl uppercase Font_CV text-[#F1E2C6] tracking-wide mb-2 text-center">
          Marrakech Map
        </h2>
        <p className="text-sm md:text-base Font_CV text-[#F1E2C6] opacity-80 mb-6 text-center max-w-md mx-auto">
          Hover a place on the list to see its story on the map.
        </p>

        {/* Category filter pills */}
        {/* <div className="flex flex-wrap justify-center gap-2 mb-6">
          <button
            type="button"
            onClick={showAllCategories}
            className="text-xs uppercase tracking-wide px-3 py-1.5 rounded-full border transition-colors"
            style={{
              borderColor: OFFWHITE,
              color: allActive ? BG : OFFWHITE,
              backgroundColor: allActive ? OFFWHITE : "transparent",
            }}
          >
            All
          </button>
          {USED_CATEGORIES.map((cat) => {
            const active = activeCategories.has(cat);
            return (
              <button
                key={cat}
                type="button"
                onClick={() => toggleCategory(cat)}
                className="flex items-center gap-1.5 text-xs uppercase tracking-wide px-3 py-1.5 rounded-full border transition-colors"
                style={{
                  borderColor: OFFWHITE,
                  color: active ? BG : OFFWHITE,
                  backgroundColor: active ? OFFWHITE : "transparent",
                }}
              >
                <span
                  style={{ width: 12, height: 12, display: "block" }}
                  dangerouslySetInnerHTML={{ __html: CATEGORY_ICONS[cat] }}
                />
                {CATEGORY_LABELS[cat]}
              </button>
            );
          })}
        </div> */}

        <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-stretch">
          {/* Sidebar list */}
          <div
            className="w-full md:w-72 shrink-0 p-4 md:max-h-[560px] overflow-y-auto"
            style={{ backgroundColor: OFFWHITE }}
          >
            {SECTIONS.map((section) => {
              const visiblePlaces = section.places.filter((p) =>
                activeCategories.has(p.category)
              );
              if (visiblePlaces.length === 0) return null;

              return (
                <div key={section.id} className="mb-5 last:mb-0">
                  <p
                    className="text-xs font-medium uppercase tracking-wide mb-2 opacity-70"
                    style={{ color: BG }}
                  >
                    {section.title}
                  </p>
                  <ul>
                    {visiblePlaces.map((place) => (
                      <li key={place.id}>
                        <button
                          type="button"
                          onMouseEnter={() => setHoveredId(place.id)}
                          onMouseLeave={() =>
                            setHoveredId((cur) => (cur === place.id ? null : cur))
                          }
                          onFocus={() => setHoveredId(place.id)}
                          onBlur={() =>
                            setHoveredId((cur) => (cur === place.id ? null : cur))
                          }
                          onClick={() => setHoveredId(place.id)}
                          className="w-full flex items-start gap-2 text-left rounded-lg px-2 py-1.5 mb-1 transition-colors"
                          style={{
                            color: BG,
                            backgroundColor:
                              hoveredId === place.id
                                ? "rgba(210,95,39,0.12)"
                                : "transparent",
                          }}
                        >
                          <span
                            style={{
                              width: 16,
                              height: 16,
                              display: "block",
                              color: BG,
                              marginTop: 2,
                              flexShrink: 0,
                            }}
                            dangerouslySetInnerHTML={{
                              __html: CATEGORY_ICONS[place.category],
                            }}
                          />
                          <span className="flex flex-col">
                            <span className="text-sm font-medium">{place.name}</span>
                            {hoveredId === place.id && (
                              <span
                                className="text-xs mt-0.5"
                                style={{ color: BG, opacity: 0.85 }}
                              >
                                {place.description}
                              </span>
                            )}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          {/* Map */}
          <div
            className="flex-1 overflow-hidden"
            style={{ border: `2px solid ${OFFWHITE}` }}
          >
            <div ref={containerRef} style={{ width: "100%", height: "560px" }} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarrakechMap;