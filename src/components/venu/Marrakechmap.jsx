// "use client";

// import React, { useEffect, useRef } from "react";
// import "leaflet/dist/leaflet.css";

// // Brand colors
// const BG = "#D25F27";
// const OFFWHITE = "#F7F3EA";

// // Real coordinates for well-known Marrakech attractions
// const PLACES = [
//   { name: "Jemaa el-Fnaa", lat: 31.6258, lng: -7.9891 },
//   { name: "Koutoubia Mosque", lat: 31.6238, lng: -7.9932 },
//   { name: "Bahia Palace", lat: 31.6215, lng: -7.9836 },
//   { name: "Saadian Tombs", lat: 31.6198, lng: -7.9885 },
//   { name: "El Badi Palace", lat: 31.6178, lng: -7.9832 },
//   { name: "Majorelle Garden", lat: 31.6417, lng: -8.0031 },
//   { name: "Menara Gardens", lat: 31.6089, lng: -8.0186 },
//   { name: "Souks / Medina", lat: 31.6295, lng: -7.9811 },
// ];

// const MarrakechMap = () => {
//   const mapRef = useRef(null);
//   const containerRef = useRef(null);

//   useEffect(() => {
//     if (mapRef.current || !containerRef.current) return;

//     // Leaflet needs to be imported dynamically since it touches `window`,
//     // which doesn't exist during Next.js server rendering.
//     import("leaflet").then((L) => {
//       if (mapRef.current) return;

//       const map = L.map(containerRef.current, {
//         center: [31.629, -7.99],
//         zoom: 14,
//         scrollWheelZoom: false,
//       });
//       mapRef.current = map;

//       // CARTO Voyager basemap — free, no API key, clean/minimal styling
//       // with English/Latin place labels.
//       L.tileLayer(
//         "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
//         {
//           attribution:
//             '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
//           maxZoom: 19,
//         }
//       ).addTo(map);

//       const icon = L.divIcon({
//         className: "",
//         html: `<div style="
//           width: 16px; height: 16px; border-radius: 50%;
//           background: ${OFFWHITE}; border: 2px solid ${BG};
//           box-shadow: 0 1px 3px rgba(0,0,0,0.35);
//         "></div>`,
//         iconSize: [16, 16],
//         iconAnchor: [8, 8],
//         popupAnchor: [0, -8],
//       });

//       PLACES.forEach((place) => {
//         L.marker([place.lat, place.lng], { icon })
//           .addTo(map)
//           .bindTooltip(place.name, {
//             permanent: true,
//             direction: "top",
//             offset: [0, -10],
//             className: "marrakech-map-label",
//           })
//           .bindPopup(place.name);
//       });
//     });

//     return () => {
//       if (mapRef.current) {
//         mapRef.current.remove();
//         mapRef.current = null;
//       }
//     };
//   }, []);

//   return (
//     <section
//       className="w-full py-16 px-6 flex flex-col items-center"
//       style={{ backgroundColor: BG }}
//     >
//       <h2
//         className="text-2xl md:text-5xl uppercase Font_CV tracking-wide mb-8 text-center"
//         style={{ color: OFFWHITE }}
//       >
//         Marrakech Map
//       </h2>
//       {/* <p
//         className="text-sm md:text-base opacity-80 mb-8 text-center max-w-md"
//         style={{ color: OFFWHITE }}
//       >
//         A few of the city&apos;s must-see spots,
//       </p> */}

//       <div className="w-full max-w-4xl  overflow-hidden" style={{ border: `2px solid ${OFFWHITE}` }}>
//         <div ref={containerRef} style={{ width: "100%", height: "480px" }} />
//       </div>

//       {/* <p
//         className="text-xs opacity-60 mt-6 text-center max-w-md"
//         style={{ color: OFFWHITE }}
//       >
//         Concept draft — a fully custom-styled map can follow once this
//         direction is approved.
//       </p> */}

//       {/* Marker label styling, matching the brand palette */}
//       <style jsx global>{`
//         .marrakech-map-label {
//           background: ${OFFWHITE} !important;
//           color: ${BG} !important;
//           border: none !important;
//           border-radius: 4px !important;
//           padding: 2px 6px !important;
//           font-size: 12px !important;
//           font-weight: 500 !important;
//           box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25) !important;
//         }
//         .marrakech-map-label::before {
//           display: none !important;
//         }
//       `}</style>
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
  landmark: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3 7h7l-5.5 4.5L18.5 21 12 16.5 5.5 21l2-7.5L2 9h7z"/></svg>`,
  palace: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18M4 21V10l8-6 8 6v11M9 21v-6h6v6M12 4v3"/></svg>`,
  garden: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22c0-5 4-6 4-11a4 4 0 0 0-8 0c0 5 4 6 4 11z"/><path d="M12 11V2"/></svg>`,
  market: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8h16l-1.5 11a2 2 0 0 1-2 2H7.5a2 2 0 0 1-2-2L4 8z"/><path d="M8 8V6a4 4 0 0 1 8 0v2"/></svg>`,
  museum: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="1"/><circle cx="9.5" cy="9.5" r="1.5"/><path d="M20 15l-4.5-4.5a1 1 0 0 0-1.4 0L8 17"/></svg>`,
};

const CATEGORY_LABELS = {
  landmark: "Landmarks & squares",
  palace: "Palaces & tombs",
  garden: "Gardens",
  market: "Medina & souks",
  museum: "Museums",
};

// Real coordinates for Marrakech tourist attractions, grouped by category
const PLACES = [
  { id: "jemaa", name: "Jemaa el-Fnaa", category: "landmark", lat: 31.6258, lng: -7.9891 },
  { id: "koutoubia", name: "Koutoubia Mosque", category: "landmark", lat: 31.6238, lng: -7.9932 },
  { id: "qubba", name: "Almoravid Qubba", category: "landmark", lat: 31.6294, lng: -7.9836 },
  { id: "madrasa", name: "Ben Youssef Madrasa", category: "landmark", lat: 31.6314, lng: -7.9838 },

  { id: "bahia", name: "Bahia Palace", category: "palace", lat: 31.6215, lng: -7.9836 },
  { id: "badi", name: "El Badi Palace", category: "palace", lat: 31.6178, lng: -7.9832 },
  { id: "saadian", name: "Saadian Tombs", category: "palace", lat: 31.6198, lng: -7.9885 },
  { id: "darbacha", name: "Dar El Bacha", category: "palace", lat: 31.6303, lng: -7.9903 },

  { id: "majorelle", name: "Majorelle Garden", category: "garden", lat: 31.6417, lng: -8.0031 },
  { id: "menara", name: "Menara Gardens", category: "garden", lat: 31.6089, lng: -8.0186 },
  { id: "agdal", name: "Agdal Gardens", category: "garden", lat: 31.6055, lng: -7.9865 },
  { id: "secret", name: "Le Jardin Secret", category: "garden", lat: 31.6294, lng: -7.9868 },

  { id: "souks", name: "Souks / Medina", category: "market", lat: 31.6295, lng: -7.9811 },
  { id: "mellah", name: "Mellah (Jewish Quarter)", category: "market", lat: 31.6198, lng: -7.9822 },

  { id: "musee", name: "Marrakech Museum", category: "museum", lat: 31.6308, lng: -7.9835 },
  { id: "ysl", name: "Yves Saint Laurent Museum", category: "museum", lat: 31.6421, lng: -8.0016 },
];

const GROUPED = Object.keys(CATEGORY_LABELS).map((category) => ({
  category,
  label: CATEGORY_LABELS[category],
  places: PLACES.filter((p) => p.category === category),
}));

const MarrakechMap = () => {
  const mapRef = useRef(null);
  const containerRef = useRef(null);
  const markersRef = useRef({});
  const leafletRef = useRef(null);
  const [hoveredId, setHoveredId] = useState(null);

  useEffect(() => {
    if (mapRef.current || !containerRef.current) return;

    import("leaflet").then((L) => {
      if (mapRef.current) return;
      leafletRef.current = L;

      const map = L.map(containerRef.current, {
        center: [31.624, -7.985],
        zoom: 15,
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
          .bindPopup(
            `<strong style="color:${BG}">${place.name}</strong>`
          );

        markersRef.current[place.id] = marker;
      });
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Highlight the matching marker whenever a sidebar item is hovered
  useEffect(() => {
    Object.entries(markersRef.current).forEach(([id, marker]) => {
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

  return (
    <section className="w-full py-16 px-4 md:px-6" style={{ backgroundColor: BG }}>
      <div className="max-w-6xl mx-auto">
        <h2
          className="text-2xl md:text-5xl uppercase Font_CV text-[#F1E2C6] tracking-wide mb-2 text-center"
          style={{ color: OFFWHITE }}
        >
          Marrakech Map
        </h2>
        <p
          className="text-sm md:text-base Font_CV text-[#F1E2C6] opacity-80 mb-8 text-center max-w-md mx-auto"
          style={{ color: OFFWHITE }}
        >
          Hover a place on the list to see it on the map.
        </p>

        <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-stretch">
          {/* Sidebar list */}
          <div
            className="w-full md:w-72 shrink-0  p-4 md:max-h-[560px] overflow-y-auto"
            style={{ backgroundColor: OFFWHITE }}
          >
            {GROUPED.map((group) => (
              <div key={group.category} className="mb-5 last:mb-0">
                <p
                  className="text-xs font-medium uppercase tracking-wide mb-2 opacity-70"
                  style={{ color: BG }}
                >
                  {group.label}
                </p>
                <ul>
                  {group.places.map((place) => (
                    <li key={place.id}>
                      <button
                        type="button"
                        onMouseEnter={() => setHoveredId(place.id)}
                        onMouseLeave={() => setHoveredId((cur) => (cur === place.id ? null : cur))}
                        onFocus={() => setHoveredId(place.id)}
                        onBlur={() => setHoveredId((cur) => (cur === place.id ? null : cur))}
                        onClick={() => setHoveredId(place.id)}
                        className="w-full flex items-center gap-2 text-left rounded-lg px-2 py-1.5 mb-1 transition-colors"
                        style={{
                          color: BG,
                          backgroundColor: hoveredId === place.id ? "rgba(210,95,39,0.12)" : "transparent",
                        }}
                      >
                        <span
                          style={{ width: 16, height: 16, display: "block", color: BG }}
                          dangerouslySetInnerHTML={{ __html: CATEGORY_ICONS[place.category] }}
                        />
                        <span className="text-sm">{place.name}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Map */}
          <div
            className="flex-1  overflow-hidden"
            style={{ border: `2px solid ${OFFWHITE}` }}
          >
            <div ref={containerRef} style={{ width: "100%", height: "560px" }} />
          </div>
        </div>

        {/* <p
          className="text-xs opacity-60 mt-6 text-center max-w-md mx-auto"
          style={{ color: OFFWHITE }}
        >
          Concept draft — a fully custom-styled map can follow once this
          direction is approved.
        </p> */}
      </div>
    </section>
  );
};

export default MarrakechMap;