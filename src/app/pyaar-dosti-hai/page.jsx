
import Header from "@/components/common/Header";
import Countdown from "@/components/pyaar-dosti-hai/Countdown";
import HeartSection from "@/components/pyaar-dosti-hai/HeartSection";
import HeroSection from "@/components/pyaar-dosti-hai/HeroSection";
import ParallaxScroll from "@/components/pyaar-dosti-hai/ParallaxScroll";
import React from "react";

const page = () => {
  return (
    <>
      <div className="w-full h-fit  relative">
        <HeroSection />
        {/* <HeartSection /> */}
        <ParallaxScroll />
        <Countdown/>
        <Header />
      </div>
    </>
  );
};

export default page;
