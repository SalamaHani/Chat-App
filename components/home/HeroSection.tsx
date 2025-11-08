import { House } from "lucide-react";
import Link from "next/link";
import React from "react";

function HeroSection() {
  return (
    <div>
      <section className="relative h-screen w-full bg-cover bg-center flex items-center justify-center object-cover ">
        <div className="absolute inset-0 bg-red-500" />
        <div className="relative z-10 text-center text-white max-w-2xl">
          <h1 className="text-6xl md:text-6xl italic  font-medium  mb-6">
            Confidence and Clarity in Every Move
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Explore the best products and services we offer
          </p>
          <div>
            <div className=" flex flex-wrap justify-center  gap-4">
              <Link
                href="/sell"rftgft4gtyg
                className="px-6 py-3  flex items-center italic bg-white text-black rounded-md shadow-lg text-lg font-semibold 
             transition-all duration-300 ease-in-out 
               hover:scale-105"
              >
                Search Sell Home
                <House className="w-4 h-4 ml-2" />
              </Link>
              <Link
                href="/listing"
                className="px-6 py-3 bg-black flex items-center text-white italic  rounded-md shadow-lg text-lg font-semibold 
             transition-all duration-300 ease-in-out 
             hover:scale-105"
              >
                Search Buy Homes
                <House className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HeroSection;
