import Header from '@/components/common/Header';
import HeroSectionVenue from '@/components/venu/HeroSectionVenue';
import ImageGallery from '@/components/venu/ImageGallery';
import MarrakechMap from '@/components/venu/Marrakechmap';
import VenueGallery from '@/components/venu/VenueGallery';
import WeddingVenue from '@/components/venu/WeddingVenue';
import React from 'react'



const page = () => {


  const slideImg2 = [
    "/new_img/A3.png",
    "/new_img/S1.png",
    "/new_img/S2.png",
    "/new_img/S3.png",
  ];

 

  return (
    <>
      <div className='w-full h-fit overflow-x-hidden BGCLR relative'>

        {/* <VenueHero /> */}
        <HeroSectionVenue />
        <WeddingVenue />
    
         <div className="COLOR_TEXT_RED Font_CV text-[3vw] w-fit h-fit mx-auto text-center leading-[3vw]  max-md:text-[10vw] max-md:leading-[12vw] tracking-tight overflow-hidden">
          <span className="flex MainTI Font_CV text-[#F1E2C6]  uppercase">
            The Oberoi Marrakech
          </span>
        </div>
        <ImageGallery />
        <MarrakechMap/>
        <Header />
      </div>
    </>
  )
}

export default page