
import Header from '@/components/common/Header'
import ScrollAnimatedPath from '@/components/common/Scrollanimatedpath'
import Nails_Cntr from '@/components/itineary/Nails_Cntr'
import React from 'react'

const page = () => {
  return (
    <>

    {/* Desktop */}
      <div className="hidden lg:block">
        <Nails_Cntr />
      </div>

      {/* Mobile & Tablet */}
      <div className="block lg:hidden">
        <ScrollAnimatedPath />
      </div>

    {/* Both */}
    <Header/>
    </>
  )
}

export default page
