'use client'
import Header from "@/components/common/Header";
import PageWrapper from "@/components/common/PageWrapper";
import TravelFaq from "@/components/travel-and-faq/TravelFaq";
import React, { useEffect } from "react";

const page = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <TravelFaq />
      <Header />
    </>
  );
};

export default page;
