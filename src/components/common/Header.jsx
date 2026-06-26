'use client'
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <>
      <footer className="w-full bg-[#F1E2C6]  border-t border-[#5513013b] max-md:px-5  flex flex-col max-md:justify-center max-sm:items-center  overflow-hidden z-998">
        <div className="flex max-md:flex-col max-md:justify-center max-sm:items-center py-8 px-10 z-998">
          <div className="w-fit h-fit flex justify-center items-center   md:my-auto">
            <Link href={`/`}>
              <img
                src={`/logo2.svg`}
                alt="Logo"
                className="h-[50px] object-cover object-center"
              />
            </Link>
          </div>

          <div className="w-[1px] h-[50px] COLOR_BG_RED mx-10 COLOR_TEXT_RED md:my-auto max-md:w-[50px] max-md:h-[1px] max-md:hidden "></div>

          <div className="w-1/2 flex flex-col  w-fit  text-[#1E4858] font-medium max-sm:w-full max-md:mt-5 ml-auto   max-md:text-center   justify-center">
            <span className=" ">
              ⁠For any wedding-related questions, please reach out to Shradda &
              Rahul wedding planning team at:
            </span>

            <span className="  flex gap-2 max-md:gap-0 max-md:mt-2 sm:ml-auto  max-md:flex-col max-md:text-[14px] max-md:mx-auto max-md:text-center">
              <a href="mailto:sonalskushie@gmail.com">
                <span className=" relative flex flex-col w-fit  group  cursor-pointer select-none max-md:mx-auto ">
                  {" "}
                  shraddarahul@gmail.com
                  <div className="h-[1px] w-[0px] COLOR_BG_RED transition-all duration-150 ease-in-out group-hover:w-full select-none  "></div>
                </span>
              </a>

              <span className="max-md:hidden">|</span>

              <a href="https://wa.me/+919358800614">
                <span className=" relative flex flex-col w-fit  group  cursor-pointer select-none max-md:mx-auto ">
                  {" "}
                  +91 93588 00614
                  <div className="h-[1px] w-[0px] COLOR_BG_RED transition-all duration-150 ease-in-out group-hover:w-full select-none  "></div>
                </span>
              </a>

            </span>
          </div>
          {/* 
          <div className="w-fit ml-auto  flex  flex-col COLOR_TEXT_RED max-md:text-[14px] max-md:mx-auto max-md:text-center max-md:mt-5 my-auto ">
            <span className=" Font_CV flex md:justify-end max-md:mx-auto font-semibold whitespace-nowrap ">
              Payments are securely processed by EDD United Pvt. Ltd.
            </span>

            <Link
              href="/termsandconditions"
              className="underline ml-1 hover:COLOR_TEXT_RED transition-colors max-md:mx-auto"
            >
              <span className=" text-[16px] Font_CV flex md:justify-end max-md:mx-auto font-semibold whitespace-nowrap ">
                Terms And Conditions
              </span>
            </Link>

            
          </div> */}
        </div>

        {/* <span className=" Font_CV flex ml-auto COLOR_BG_CREAM  border-t border-[#5513013b] w-full justify-end px-10 py-2 COLOR_TEXT_RED font-semibold">Payments are securely processed by EDD United Pvt. Ltd.</span> */}
      </footer>
    </>
  );
};

export default Header;
