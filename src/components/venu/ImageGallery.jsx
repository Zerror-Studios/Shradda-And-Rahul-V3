"use client";

import Image from "next/image";

const images = [
  { src: "/new_img/A3.png", span: "row-span-2 col-span-1" },
  { src: "/new_img/S1.png", span: "row-span-1 col-span-1" },
  { src: "/new_img/S2.png", span: "row-span-2 col-span-1" },
  { src: "/new_img/S3.png", span: "row-span-1 col-span-1" },
  { src: "/new_img/A3.png", span: "row-span-1 col-span-1" },
  { src: "/new_img/S1.png", span: "row-span-1 col-span-1" },
];

export default function ImageGallery() {
  return (
    <section className="w-full py-16 px-4 ">
      <div
        className="
          mx-auto
         
          grid
          grid-cols-1
          md:grid-cols-4
          auto-rows-[180px]
          md:auto-rows-[220px]
          gap-2
        "
      >
        {images.map((item, index) => (
          <div
            key={index}
            className={`relative overflow-hidden ${item.span}`}
          >
            <Image
              src={item.src}
              alt=""
              fill
              className="object-cover transition duration-500 hover:scale-105"
            />
          </div>
        ))}
      </div>
    </section>
  );
}