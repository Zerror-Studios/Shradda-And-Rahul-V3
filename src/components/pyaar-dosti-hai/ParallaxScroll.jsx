"use client";

import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(ScrollTrigger);

const DATA = [
  { img: "/clientImg/2.webp", text: "Atlanta", year: "2022" },
  { img: "/clientImg/5.webp", text: "Bangkok", year: "2022" },
  { img: "/clientImg/12.webp", text: "Singapore", year: "2022" },
  { img: "/clientImg/26.webp", text: "New York", year: "2023" },
  { img: "/clientImg/13.webp", text: "Ithaca", year: "2024" },
  { img: "/clientImg/24.webp", text: "New Orleans", year: "2024" },
  { img: "/clientImg/31.webp", text: "Sri Lanka", year: "2025" },
  { img: "/clientImg/16.webp", text: "Kampala", year: "2025" },
  { img: "/clientImg/21.webp", text: "Key West / Miami", year: "2025" },
  { img: "/clientImg/29.webp", text: "Savannah (Civil Ceremony)", year: "2025" },
  { img: "/clientImg/10.webp", text: "Egypt", year: "2025" },
];

const IMAGES = [
  '/clientImg/1.webp',
  '/clientImg/2.webp',
  '/clientImg/3.webp',
  '/clientImg/4.webp',
  '/clientImg/5.webp',
  '/clientImg/6.webp',
  '/clientImg/7.webp',
  '/clientImg/8.webp',
  '/clientImg/9.webp',
  '/clientImg/10.webp',
  '/clientImg/11.webp',
  '/clientImg/12.webp',
  '/clientImg/13.webp',
  '/clientImg/14.webp',
  '/clientImg/15.webp',
  '/clientImg/16.webp',
  '/clientImg/17.webp',
  '/clientImg/18.webp',
  '/clientImg/19.webp',
  '/clientImg/20.webp',
  '/clientImg/21.webp',
  '/clientImg/22.webp',
  '/clientImg/23.webp',
  '/clientImg/24.webp',
  '/clientImg/25.webp',
  '/clientImg/26.webp',
  '/clientImg/27.webp',
  '/clientImg/28.webp',
  '/clientImg/29.webp',
  '/clientImg/30.webp',
  '/clientImg/31.webp',
  '/clientImg/32.webp',
];

const LAYOUT = [
  { x: 4, y: 12, o: 1 },
  { x: 22, y: 26, o: 0.1 },
  { x: 48, y: 10, o: 1 },
  { x: 88, y: 6, o: 1 },

  { x: 10, y: 46, o: 0.1 },
  { x: 30, y: 58, o: 1 },
  { x: 52, y: 48, o: 0.1 },
  { x: 74, y: 42, o: 1 },
  { x: 92, y: 54, o: 0.1 },

  { x: 12, y: 82, o: 1 },
  { x: 34, y: 90, o: 0.1 },
  { x: 86, y: 78, o: 1 },
  { x: 82, y: 86, o: 0.1 },

  { x: 4, y: 118, o: 1 },
  { x: 26, y: 132, o: 0.1 },
  { x: 50, y: 120, o: 1 },
  { x: 74, y: 128, o: 0.1 },

  { x: 8, y: 160, o: 1 },
  { x: 32, y: 174, o: 0.1 },
  { x: 56, y: 164, o: 1 },
  { x: 82, y: 170, o: 0.1 },
];

function FloatingImage({ item, index }) {
  const ref = useRef(null);

  useEffect(() => {
    // Disable mouse parallax on touch/mobile devices
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
      onLeave: () => { sectionProgress = 1; },
      onLeaveBack: () => { sectionProgress = 0; },
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

      gsap.set(ref.current, { x: currentX, y: currentY, force3D: true });
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
      className="absolute will-change-transform"
      style={{ left: `${item.x}%`, top: `${item.y}%`, opacity: item.o }}
    >
      <img
        src={IMAGES[index % IMAGES.length]}
        alt=""
        draggable={false}
        className={`w-[16vw] sm:w-[12vw] md:w-[8vw] ${item.o === 1 ? "hover:scale-115 transition-all duration-700" : ""
          }`}
      />
    </div>
  );
}

export default function ParallaxScroll() {
  const scope = useRef();

  useGSAP(
    () => {
      const images = gsap.utils.toArray(".img_item");
      const texts = gsap.utils.toArray(".text_item");
      const years = document.querySelector(".year_track");

      gsap.set(images, { opacity: 0 });
      gsap.set(texts, { opacity: 0 });
      gsap.set(images[0], { opacity: 1 });
      gsap.set(texts[0], { opacity: 1 });

      gsap.to(".fill_x", {
        width: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: ".paren_nn",
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });

      gsap.to(".sticky_child", {
        opacity: 1,
        scale: 1,
        scrollTrigger: {
          trigger: ".sticky_child",
          start: "5% top",
          toggleActions: "play none none reverse",
        },
      });

      let current = 0;

      function changeSlide(index) {
        if (index === current) return;

        gsap.killTweensOf(images);
        gsap.killTweensOf(texts);
        gsap.killTweensOf(years);

        const tl = gsap.timeline({ defaults: { duration: 0.5, ease: "power2.out" } });

        tl.to(images[current], { opacity: 0 })
          .to(texts[current], { opacity: 0 }, "<")
          .to(images[index], { opacity: 1 }, "<")
          .to(texts[index], { opacity: 1 }, "<")
          .to(years, { y: `${-index * 1}rem` }, "<");

        current = index;
      }

      ScrollTrigger.create({
        trigger: ".paren_nn",
        start: "top top",
        end: "bottom bottom",
        onUpdate(self) {
          const total = DATA.length;
          const index = Math.min(total - 1, Math.floor(self.progress * total));
          changeSlide(index);
        },
      });

      return () => {
        ScrollTrigger.getAll().forEach((s) => s.kill());
      };
    },
    { scope }
  );

  const repeated = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 6; i++) {
      LAYOUT.forEach((l) => {
        arr.push({ ...l, y: l.y + i * 25 });
      });
    }
    return arr;
  }, []);

  return (
    <main ref={scope} className="paren_nn relative h-[800vh] BGCLR">

      {/* Floating background images */}
      <section className="absolute inset-0 overflow-hidden">
        {repeated.map((item, i) => (
          <FloatingImage key={i} item={item} index={i} />
        ))}
      </section>

      {/* Sticky content */}
      <div className="sticky_child opacity-0 scale-90 sticky pointer-events-none top-0 h-screen flex flex-col items-center justify-center gap-y-6 sm:gap-y-10 px-4 sm:px-8">

        {/* Main image */}
        <div className="relative w-[55vw] sm:w-[38vw] md:w-[25vw] aspect-[3.5/4]">
          {DATA.map((item, i) => (
            <div key={i} className="img_item absolute inset-0">
              <img src={item.img} className="w-full h-full object-cover" alt="" />
            </div>
          ))}
        </div>

        {/* Text -> country / location name */}
        <div className="relative w-[85vw] sm:w-[60vw] md:w-[30vw] h-[80px] sm:h-[100px] md:h-[120px] flex items-center justify-center">
          {DATA.map((item, i) => (
            <div
              key={i}
              className="text_item leading-snug max-sm:text-[1.7rem] max-sm:leading-[1.7rem] text-[#F1E2C6] Font_CV font-medium absolute inset-0 flex items-center justify-center text-xl sm:text-2xl md:text-3xl text-center"
            >
              {item.text}
            </div>
          ))}
        </div>

        {/* Progress bar + year pill -> year */}
        <div className="absolute flex items-center bottom-8 sm:bottom-16 w-[80vw] sm:w-[60vw] md:w-[30vw] h-0.5 bg-black/5">
          <div className="fill_x h-full w-0 bg-[#F1E2C6]" />
          <div className="overflow-hidden bg-[#F1E2C6] text-[#D25F28] px-2 h-4 rounded-full">
            <div className="year_track h-4 text-xs">
              {DATA.map((item, i) => (
                <div key={i} className="h-4 flex font-medium items-center justify-center">
                  {item.year}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      <div className="h-[500vh]" />
    </main>
  );
}
