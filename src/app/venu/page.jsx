import Header from '@/components/common/Header';
import HeroSectionVenue from '@/components/venu/HeroSectionVenue';
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

  const slideImg1 = [
    "/new_img/A1.png",
    "/new_img/A2.png",
    "/new_img/A3.png",

  ];

  return (
    <>
      <div className='w-full h-fit overflow-x-hidden BGCLR relative'>

        {/* <VenueHero /> */}
        <HeroSectionVenue />
        <WeddingVenue />
        {/* <MarrakechMap /> */}
        <VenueGallery slideImg={slideImg2} STA1Txt={'The Oberoi'} STA2Txt={'Marrakech'} />
        <VenueGallery slideImg={slideImg1} STA1Txt={'Marrakech,'} STA2Txt={'Morocco'} />
        {/* <OberoiSection /> */}

        <MarrakechMap/>
        <Header />
      </div>
    </>
  )
}

export default page