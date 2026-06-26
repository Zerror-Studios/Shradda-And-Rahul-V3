'use client'
import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ImgArr = [
  "/try/1.jpeg", "/try/2.jpeg", "/try/3.jpeg", "/try/4.jpeg",
  "/try/5.jpeg", "/try/6.jpeg", "/try/7.jpeg", "/try/8.jpeg",
  "/try/9.jpeg", "/try/10.jpeg", "/try/11.jpeg", "/try/12.jpeg",
  "/try/1.jpeg", "/try/2.jpeg", "/try/3.jpeg", "/try/4.jpeg",
  "/try/5.jpeg", "/try/6.jpeg", "/try/7.jpeg", "/try/8.jpeg",
  "/try/9.jpeg", "/try/10.jpeg", "/try/11.jpeg", "/try/12.jpeg",
];

// Heart-shape positions (relative to an 820x820 box) — START state
const positions = [
  { top: 30, left: 120 }, { top: 50, left: 260 }, { top: 50, left: 400 }, { top: 30, left: 540 },
  { top: 110, left: 30 }, { top: 110, left: 150 }, { top: 140, left: 280 }, { top: 110, left: 410 },
  { top: 110, left: 530 }, { top: 130, left: 650 },
  { top: 220, left: 10 }, { top: 220, left: 140 }, { top: 210, left: 270 }, { top: 220, left: 400 },
  { top: 220, left: 530 }, { top: 220, left: 660 },
  { top: 340, left: 80 }, { top: 340, left: 220 }, { top: 340, left: 360 }, { top: 340, left: 500 },
  { top: 470, left: 180 }, { top: 470, left: 310 }, { top: 470, left: 450 },
  { top: 580, left: 310 },
];

const rotations = [
  -8, 17, -17, 7,
  -6, 4, -3, 5, -4, 7,
  5, -7, 3, -5, 6, -4,
  -6, 4, -5, 7,
  -4, 5, -6,
  3,
];

const imageSizes = [
  { w: 110, h: 140 }, { w: 140, h: 110 }, { w: 120, h: 120 }, { w: 100, h: 140 },
  { w: 130, h: 100 }, { w: 110, h: 150 }, { w: 145, h: 110 }, { w: 120, h: 140 },
  { w: 135, h: 100 }, { w: 110, h: 130 },
  { w: 150, h: 150 }, { w: 140, h: 120 }, { w: 110, h: 150 }, { w: 150, h: 110 },
  { w: 120, h: 130 }, { w: 100, h: 140 },
  { w: 130, h: 110 }, { w: 150, h: 140 }, { w: 200, h: 200 }, { w: 120, h: 150 },
  { w: 110, h: 130 }, { w: 140, h: 110 }, { w: 100, h: 140 },
  { w: 120, h: 120 },
];

const HEART_BOX_SIZE = 820;

const HeartSection = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const imageRefs = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    if (!section || !container) return;

    let tl;

    const buildAnimation = () => {
      const areaWidth = container.offsetWidth;
      const areaHeight = container.offsetHeight; // 400vh in px
      const viewportH = window.innerHeight;
      const count = positions.length;

      // --- START state: heart box, centered horizontally near the top ---
      const heartLeftOffset = areaWidth / 2 - HEART_BOX_SIZE / 2;
      const heartTopOffset = viewportH * 0.4;

      // --- END state: zigzag spread on BOTH axes (not a flat grid) ---
      const aspect = areaHeight / areaWidth;
      let cols = Math.max(1, Math.round(Math.sqrt(count / aspect)));
      let rows = Math.ceil(count / cols);
      while (cols * rows < count) rows++;

      const cellW = areaWidth / cols;
      const cellH = areaHeight / rows;

      // Vertical zigzag: alternating columns shift up/down
      const ZIGZAG_Y_RATIO = 0.32;
      const zigzagY = cellH * ZIGZAG_Y_RATIO;

      // Horizontal zigzag: alternating rows shift left/right
      const ZIGZAG_X_RATIO = 0.22;
      const zigzagX = cellW * ZIGZAG_X_RATIO;

      const spreadPositions = Array.from({ length: count }, (_, idx) => {
        const row = Math.floor(idx / cols);
        const col = idx % cols;
        const size = imageSizes[idx];

        // Column-based up/down stagger
        const colStaggerY = col % 2 === 0 ? -zigzagY : zigzagY;

        // Row-based left/right stagger
        const rowStaggerX = row % 2 === 0 ? -zigzagX : zigzagX;

        // Small deterministic wobble so it doesn't look mechanical
        const wobbleY = ((idx * 37) % 17) - 8;
        const wobbleX = ((idx * 23) % 13) - 6;

        const cx = col * cellW + cellW / 2 + rowStaggerX + wobbleX;
        const cy = row * cellH + cellH / 2 + colStaggerY + wobbleY;

        return {
          left: cx - (size.w + 12) / 2,
          top: cy - (size.h + 12) / 2,
        };
      });

      // Set initial heart positions
      imageRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.set(el, {
          left: heartLeftOffset + positions[i].left,
          top: heartTopOffset + positions[i].top,
          rotation: rotations[i % rotations.length],
          autoAlpha: 1,
        });
      });

      if (tl) {
        tl.scrollTrigger?.kill();
        tl.kill();
      }

      // Timeline that PLAYS once on trigger (no scrub)
      tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top -10%",
          toggleActions: "play none none reverse",
        },
        defaults: { duration: 1.4, ease: "power3.out" },
      });

      imageRefs.current.forEach((el, i) => {
        if (!el) return;
        tl.to(
          el,
          {
            left: spreadPositions[i].left,
            top: spreadPositions[i].top,
            rotation: 0,
          },
          i * 0.02 // slight stagger for smoothness
        );
      });
    };

    buildAnimation();

    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        buildAnimation();
        ScrollTrigger.refresh();
      }, 200);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
      if (tl) {
        tl.scrollTrigger?.kill();
        tl.kill();
      }
    };
  }, []);

  return (
    <section
      id="heart"
      ref={sectionRef}
      className="relative w-full h-[400vh] bg-[#F1E2C6]"
    >
      <div ref={containerRef} className="absolute inset-0 w-full h-full">
        {positions.map((pos, index) => {
          const size = imageSizes[index];
          return (
            <div
              key={index}
              ref={(el) => (imageRefs.current[index] = el)}
              className="absolute  shadow-xl opacity-0"
              style={{
                width: size.w + 12,
                height: size.h + 12,
                zIndex: index,
                willChange: "top, left, transform",
              }}
            >
              <img
                src={ImgArr[index % ImgArr.length]}
                alt={`img-${index}`}
                className="w-full h-full object-cover"
              />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default HeartSection;