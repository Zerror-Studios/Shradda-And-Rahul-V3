"use client";

import Image from "next/image";

const images = [
  { src: "https://preview.redd.it/the-main-courtyard-and-mihrab-of-the-ben-youssef-madrasa-a-v0-sxdjpmiynw9d1.jpeg?auto=webp&s=96d3a3f3a545196a396454f6f653b825ef5149d3", span: "md:col-span-2 md:row-span-2" },
  { src: "https://www.oberoihotels.com/-/media/oberoi-hotel/marrakech-resized/Overview/Home-banner/Desktop-1920x980/banner3-1.jpg", span: "md:col-span-2 md:row-span-1" },
  { src: "https://www.oberoihotels.com/-/media/oberoi-hotel/marrakech-resized/marrakech_latest/overview/main-banner/desktop1920x980/banner1.jpg", span: "md:col-span-2 md:row-span-1" },
];

export default function ImageGallery() {
  return (
    <section className="w-full py-16 px-4">
      <div
        className="
          mx-auto
          grid
          grid-cols-1
          md:grid-cols-4
          auto-rows-[220px]
          md:auto-rows-[450px]
          gap-3
        "
      >
        {images.map((item, index) => (
          <div
            key={index}
            className={`relative overflow-hidden ${item.span}`}
          >
            <img
              src={item.src}
              alt={`Gallery Image ${index + 1}`}
             
              className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
            />
          </div>
        ))}
      </div>
    </section>
  );
}