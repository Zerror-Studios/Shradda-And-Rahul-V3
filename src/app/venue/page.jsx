'use client'
import BackgroundMusic from "@/components/common/BackgroundMusic";
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


  const handleDownload = () => {
    // 1. एक नया anchor <a> टैग बनाएं
    const link = document.createElement("a");
    // 2. पब्लिक फोल्डर में रखे PDF का पाथ दें
    link.href = "/Morocco-Desert-Tour-Itinerary-Oct-23-26.pdf";
    // 3. डाउनलोड होने वाली फाइल का नाम सेट करें
    link.download = "/Morocco-Desert-Tour-Itinerary-Oct-23-26.pdf";

    // 4. लिंक को क्लिक करवाएं और फिर हटा दें
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div className="w-full h-fit overflow-x-hidden BGCLR relative">

        <BackgroundMusic />

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
            <p className="max-w-[70vw] mx-auto max-sm:max-w-[95vw] max-sm:text-justify COLOR_TEXT_RED text-[1.1rem] leading-[1.1rem] max-sm:text-[1.2rem] max-sm:leading-[1.4rem]">
              Marrakech has always had our hearts - rich history, ochre walls, lush gardens, and vibrant souks. It strikes a beautiful balance of calm vs chaos and features magic around every corner. True to us, this city embraces a warm spirit and dynamic rhythm that makes its guests feel alive!

              <br />
              <br />
              Set on 28 acres of ancient olive groves and citrus orchards, The Oberoi Marrakech is home to our celebrations. It’s hard to feign nonchalance upon entering this property’s stunning grounds. With an intentionally unassuming entryway, guests are greeted by a breathtaking juxtaposition when they step inside - revealing a grandeur inspired by the Moorish palaces of Andalusia. At the helm of its culinary experience is Michelin-starred chef Rohit Ghai.

              <br />
              <br />

              The Oberoi Marrakech is a monument to artisanal refinement and patience. Look up and you’ll notice a jaw-dropping domed-ceiling that was intricately handcrafted over years. While taking a leisurely stroll through the courtyard, feel the cool touch of marble as you gracefully swan through towering arches. It’s difficult not to be captivated by the stunning attention-to-detail at every turn. Past the zellige tiles, you’ll find Berber and Moghul paintings, studded sofas handmade in Casablanca, and elegant fireplaces. To bring this entire vision to life, they enlisted a collective of 250 master craftsmen including specialist tilers from Fez, Nejjarine Square carpenters, and plaster carvers from Sidi Ghanem.

              <br />
              <br />

              Beyond the grand canal, a panoramic view of the Atlas mountains hugs the horizon. Such was the uncompromising scale and ambition of this project that construction was heavily delayed by a world shortage of Carrara marble. It took a decade to complete, only to be met with a new challenge: Covid. Ironically, Rahul and Shradda's romance was quietly blossoming during this same period. Perhaps above all, the Oberoi Marrakech is an ode to our Indian heritage which is deeply woven into our souls and very existence. We extend a warm welcome to celebrate a love that grew across continents, is grounded by our desi roots, and is nurtured by four pillars: love, family, respect, and flow. We simply cannot wait for you to join us as our worlds and hearts collide - under a single roof and beneath the sacred skies of Marrakech!

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
            <p className="max-w-[70vw] mx-auto max-sm:max-w-[95vw] max-sm:text-justify COLOR_TEXT_RED text-[1.1rem] leading-[1.1rem] max-sm:text-[1.2rem] max-sm:leading-[1.4rem]">
              Marrakech rewards the unhurried. The medina has a way of folding in on itself; take the wrong turn down an alley, and you'll often end up somewhere better than where you meant to go. We've mapped our favourite corners of the city, so you can wander with intention or with none at all. Whether you’ve got a free afternoon or you’re arriving a few days early to make the most of it, here is a brief guide on attractions, food, shopping and general fun.
            </p>
          </div>
        </section>

        <section className="h-fit max-md:h-fit  mx-auto mt-10  WeddingTextCont pt-5 flex items-center justify-center BGCLR px-6">
          <div className=" text-center text-[#F1E2C6]  ">
            <p className="max-w-[70vw] mx-auto max-sm:max-w-[95vw] max-sm:text-justify COLOR_TEXT_RED text-[1.1rem] leading-[1.1rem] max-sm:text-[1.2rem] max-sm:leading-[1.4rem]">
              We have teamed up with I Morocco Tours to design a bespoke tour for you. This is an optional tour to the Atlas Mountains and Sahara’s desert that you can book directly with the agency. 
              <a 
  href="/Morocco-Desert-Tour-Itinerary-Oct-23-26.pdf" 
  download="Morocco-Desert-Tour-Itinerary-Oct-23-26.pdf"
  target="_blank"
  style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}
>
  Click
</a> here to find out more!
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
