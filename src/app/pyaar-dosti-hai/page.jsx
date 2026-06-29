
import Header from "@/components/common/Header";
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
        <div className="w-full h-[100px] BGCLR" />
        <Header />
      </div>
    </>
  );
};

export default page;
