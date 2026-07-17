import Header from "@/components/common/Header";
import HeroSectionVenue from "@/components/venu/HeroSectionVenue";
import ImageGallery from "@/components/venu/ImageGallery";
import MarrakechMap from "@/components/venu/Marrakechmap";
import VenueGallery from "@/components/venu/VenueGallery";
import WeddingVenue from "@/components/venu/WeddingVenue";
import React from "react";

const page = () => {
  const slideImg2 = [
    "/new_img/A3.png",
    "/new_img/S1.png",
    "/new_img/S2.png",
    "/new_img/S3.png",
  ];

  return (
    <>
      <div className="w-full h-fit overflow-x-hidden BGCLR relative">
        {/* <VenueHero /> */}
        <HeroSectionVenue />
        <WeddingVenue />

        <div className="COLOR_TEXT_RED Font_CV text-[3vw] w-fit h-fit mx-auto text-center leading-[3vw]  max-md:text-[10vw] max-md:leading-[12vw] tracking-tight overflow-hidden">
          <span className="flex MainTI Font_CV text-[#F1E2C6]  uppercase">
            The Oberoi Marrakech
          </span>
        </div>

        <section className="h-fit max-md:h-fit  mx-auto  WeddingTextCont pt-5 flex items-center justify-center BGCLR px-6">
          <div className=" text-center text-[#F1E2C6]  ">
            <p className="max-w-[70vw] mx-auto max-sm:max-w-[95vw] max-sm:text-justify   text-[1rem] leading-[1rem] max-sm:text-[1.2rem] max-sm:leading-[1.4rem] COLOR_TEXT_RED  ">
              Marrakech has always had our hearts- the ochre walls, the lush
              gardens, the vibrant souks with both loud and quiet magic tucked
              into every corner. It's the kind of beauty that is true to us- a
              perfect blend of chaos and calm.
              <br />
              <br />
              Set on 113,312 square meters of citrus orchards and centuries-old
              olive groves, The Oberoi, Marrakech draws on the grandeur of
              ancient palaces. Its central courtyard echoes the 14th-century
              Medersa Ben Youssef, one of the city's most iconic landmarks,
              while landscaped gardens, tranquil water features, and the Atlas
              Mountains bless it all. Most importantly, The Oberoi is an ode to
              our Indian heritage- something that has been deeply woven into our
              being, despite us growing up outside India. At the Oberoi, where
              Indian soul meets Moroccan architecture, we celebrate a love that
              grew across continents, is grounded by desi culture, and is
              nurtured by love, family, respect, and flow (our four pillars). We
              can’t wait to bring all our worlds together with you, in one
              place, under one sky, in one heart.
            </p>
          </div>
        </section>

        <ImageGallery />

         <div className="COLOR_TEXT_RED Font_CV text-[3vw] w-fit h-fit mx-auto text-center leading-[3vw]  max-md:text-[10vw] max-md:leading-[12vw] tracking-tight overflow-hidden">
          <span className="flex MainTI Font_CV text-[#F1E2C6]  uppercase">
            Marrakech, Morocco
          </span>
        </div>

        <section className="h-fit max-md:h-fit  mx-auto  WeddingTextCont pt-5 flex items-center justify-center BGCLR px-6">
          <div className=" text-center text-[#F1E2C6]  ">
            <p className="max-w-[70vw] mx-auto  max-sm:max-w-[95vw] max-sm:text-justify  text-[1rem] leading-[1rem] max-sm:text-[1.2rem] max-sm:leading-[1.4rem] COLOR_TEXT_RED  ">
              Marrakech rewards the unhurried. The medina has a way of folding in on itself; take the wrong turn down an alley, and you'll often end up somewhere better than where you meant to go. We've mapped our favourite corners of the city, so you can wander with intention or with none at all. Whether you’ve got a free afternoon or you’re arriving a few days early to make the most of it, here is a brief guide on attractions, food, shopping and general fun.
            </p>
          </div>
        </section>
        <MarrakechMap />
        <Header />
      </div>
    </>
  );
};

export default page;
