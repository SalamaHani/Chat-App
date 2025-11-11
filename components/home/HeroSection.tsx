import Link from "next/link";
import React from "react";
import { MessageCircleHeart } from "../animate-ui/icons/message-circle-heart";
import { AnimateIcon } from "../animate-ui/icons/icon";
import { GravityStarsBackground } from "@/components/animate-ui/components/backgrounds/gravity-stars";
import { WritingText } from "../ui/shadcn-io/writing-text";

export const GravityStarsBackgroundDemo = () => {
  return (
    <GravityStarsBackground className="absolute inset-0 flex items-center justify-center rounded-xl" />
  );
};
function HeroSection() {
  return (
    <div>
      <GravityStarsBackgroundDemo />
      <section className="relative h-screen w-full bg-cover bg-center flex items-center justify-center object-cover ">
        <div className="absolute inset-0 " />
        <div className="relative w-full z-10 text-center  max-w-3xl">
          <h1 className="text-5xl md:text-5xl italic font-medium mb-6">
            <WritingText
              text="Start  Chatting  with  your  Friends"
              inView={true}
              transition={{
                type: "spring",
                bounce: 0,
                duration: 2,
                delay: 0.3,
              }}
            />
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Explore the best products and services we offer
          </p>
          <div>
            <div className=" flex flex-wrap justify-center  gap-4">
              <Link
                href="/chats"
                className="px-6 py-3  flex items-center bg-[#0ea5e9] italic  rounded-md shadow-lg text-lg font-semibold 
             transition-all duration-300 ease-in-out 
               hover:scale-105"
              >
                Go to Chat
                <AnimateIcon className="w-6 h-6 ml-3" animateOnHover>
                  <MessageCircleHeart animateOnHover />
                </AnimateIcon>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HeroSection;
